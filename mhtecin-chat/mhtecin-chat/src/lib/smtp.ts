import net from "net";
import tls from "tls";

export interface MailOptions {
  from?: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendSmtpEmail(options: MailOptions): Promise<void> {
  const host = process.env.SMTP_HOST || "smtp.hostinger.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";
  const from = options.from || process.env.SMTP_FROM || user || "subscriptions@mhtechin.com";

  if (!user || !pass) {
    console.warn("[SMTP] User or password not configured in .env. Email will be printed to console only.");
    console.log(`\n=== MOCK SMTP EMAIL ===\nFrom: ${from}\nTo: ${options.to}\nSubject: ${options.subject}\nText Body:\n${options.text}\n=== END MOCK ===\n`);
    return;
  }

  return new Promise((resolve, reject) => {
    console.log(`[SMTP] Connecting to ${host}:${port}...`);
    const socket = net.createConnection(port, host);
    socket.setEncoding("utf-8");

    let stage = 0;
    let buffer = "";

    const write = (cmd: string) => {
      console.log(`[SMTP Client] Sending: ${cmd.trim()}`);
      socket.write(cmd + "\r\n");
    };

    const handleError = (err: Error) => {
      console.error("[SMTP Error]", err);
      socket.destroy();
      reject(err);
    };

    socket.on("error", handleError);

    socket.on("data", (data) => {
      buffer += data;
      while (buffer.includes("\r\n")) {
        const lineEnd = buffer.indexOf("\r\n");
        const line = buffer.substring(0, lineEnd);
        buffer = buffer.substring(lineEnd + 2);
        console.log(`[SMTP Server] ${line}`);

        const isFinalLine = line.charAt(3) === " ";
        if (!isFinalLine) {
          continue;
        }

        const code = Number(line.substring(0, 3));

        try {
          if (stage === 0) {
            if (code !== 220) throw new Error(`Handshake greeting failed: ${line}`);
            stage = 1;
            write(`EHLO ${host}`);
          } else if (stage === 1) {
            if (code !== 250) throw new Error(`EHLO failed: ${line}`);
            stage = 2;
            write("STARTTLS");
          } else if (stage === 2) {
            if (code !== 220) throw new Error(`STARTTLS failed: ${line}`);
            
            // Upgrade socket to TLS
            socket.removeAllListeners("data");
            socket.removeAllListeners("error");

            console.log("[SMTP] Upgrading connection to TLS...");
            const secureSocket = tls.connect({
              socket: socket,
              host: host,
              rejectUnauthorized: false
            });

            secureSocket.setEncoding("utf-8");
            
            let secureBuffer = "";
            let secureStage = 3;

            const secureWrite = (cmd: string) => {
              console.log(`[SMTP Client TLS] Sending: ${cmd.trim()}`);
              secureSocket.write(cmd + "\r\n");
            };

            secureSocket.on("error", (err) => {
              console.error("[SMTP TLS Error]", err);
              secureSocket.destroy();
              reject(err);
            });

            secureSocket.on("data", (secData) => {
              secureBuffer += secData;
              while (secureBuffer.includes("\r\n")) {
                const secLineEnd = secureBuffer.indexOf("\r\n");
                const secLine = secureBuffer.substring(0, secLineEnd);
                secureBuffer = secureBuffer.substring(secLineEnd + 2);
                console.log(`[SMTP Server TLS] ${secLine}`);

                const secIsFinalLine = secLine.charAt(3) === " ";
                if (!secIsFinalLine) continue;

                const secCode = Number(secLine.substring(0, 3));

                try {
                  if (secureStage === 3) {
                    if (secCode !== 250) throw new Error(`EHLO after STARTTLS failed: ${secLine}`);
                    secureStage = 4;
                    secureWrite("AUTH LOGIN");
                  } else if (secureStage === 4) {
                    if (secCode !== 334) throw new Error(`AUTH LOGIN request failed: ${secLine}`);
                    secureStage = 5;
                    secureWrite(Buffer.from(user).toString("base64"));
                  } else if (secureStage === 5) {
                    if (secCode !== 334) throw new Error(`AUTH Username rejection: ${secLine}`);
                    secureStage = 6;
                    secureWrite(Buffer.from(pass).toString("base64"));
                  } else if (secureStage === 6) {
                    if (secCode !== 235) throw new Error(`Authentication credentials rejected: ${secLine}`);
                    secureStage = 7;
                    const cleanFrom = from.replace(/^.*<|>.*$/g, "").trim();
                    secureWrite(`MAIL FROM:<${cleanFrom}>`);
                  } else if (secureStage === 7) {
                    if (secCode !== 250) throw new Error(`MAIL FROM rejected: ${secLine}`);
                    secureStage = 8;
                    secureWrite(`RCPT TO:<${options.to}>`);
                  } else if (secureStage === 8) {
                    if (secCode !== 250) throw new Error(`RCPT TO rejected: ${secLine}`);
                    secureStage = 9;
                    secureWrite("DATA");
                  } else if (secureStage === 9) {
                    if (secCode !== 354) throw new Error(`DATA start rejected: ${secLine}`);
                    secureStage = 10;

                    const boundary = `----=_Part_${Math.random().toString(36).substring(2)}`;
                    const dateStr = new Date().toUTCString();
                    
                    let emailPayload = "";
                    emailPayload += `From: ${from}\r\n`;
                    emailPayload += `To: ${options.to}\r\n`;
                    emailPayload += `Subject: ${options.subject}\r\n`;
                    emailPayload += `Date: ${dateStr}\r\n`;
                    emailPayload += `MIME-Version: 1.0\r\n`;
                    emailPayload += `Content-Type: multipart/alternative; boundary="${boundary}"\r\n\r\n`;

                    // Plain Text part
                    emailPayload += `--${boundary}\r\n`;
                    emailPayload += `Content-Type: text/plain; charset=UTF-8\r\n`;
                    emailPayload += `Content-Transfer-Encoding: 8bit\r\n\r\n`;
                    emailPayload += `${options.text}\r\n\r\n`;

                    // HTML part
                    emailPayload += `--${boundary}\r\n`;
                    emailPayload += `Content-Type: text/html; charset=UTF-8\r\n`;
                    emailPayload += `Content-Transfer-Encoding: 8bit\r\n\r\n`;
                    emailPayload += `${options.html}\r\n\r\n`;

                    emailPayload += `--${boundary}--`;
                    
                    secureWrite(`${emailPayload}\r\n.`);
                  } else if (secureStage === 10) {
                    if (secCode !== 250) throw new Error(`Message data transmission rejected: ${secLine}`);
                    secureStage = 11;
                    secureWrite("QUIT");
                  } else if (secureStage === 11) {
                    secureSocket.destroy();
                    resolve();
                  }
                } catch (e: any) {
                  secureSocket.destroy();
                  reject(e);
                }
              }
            });

            secureWrite(`EHLO ${host}`);
            break; 
          }
        } catch (e: any) {
          socket.destroy();
          reject(e);
        }
      }
    });
  });
}
