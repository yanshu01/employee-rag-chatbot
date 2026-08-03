import React, { useState, useRef, useEffect } from "react";
import { chatService, ChatSource } from "@/services/chatService";
import { Send, Bot, User, RefreshCw, FileText, Code2, Copy, Check, Sparkles } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  sources?: ChatSource[];
  intent?: string;
  timestamp: Date;
  isStreaming?: boolean;
  error?: boolean;
}

export const RAGChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! I am your AI Assistant. You can ask me questions about company policies, your leave balance, shift timings, remaining work hours, or team details.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const simulateTypingEffect = async (
    messageId: string,
    fullText: string,
    sources: ChatSource[],
    intent: string
  ) => {
    let currentLength = 0;
    const chunkSize = 4;
    const interval = 20;

    return new Promise<void>((resolve) => {
      const timer = setInterval(() => {
        currentLength += chunkSize;
        if (currentLength >= fullText.length) {
          clearInterval(timer);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === messageId
                ? {
                    ...msg,
                    text: fullText,
                    sources,
                    intent,
                    isStreaming: false,
                  }
                : msg
            )
          );
          resolve();
        } else {
          const slicedText = fullText.slice(0, currentLength);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === messageId
                ? {
                    ...msg,
                    text: slicedText,
                    isStreaming: true,
                  }
                : msg
            )
          );
        }
      }, interval);
    });
  };

  const handleSend = async (overrideText?: string) => {
    const questionText = (overrideText || input).trim();
    if (!questionText || loading) return;

    const userMessageId = `user-${Date.now()}`;
    const botMessageId = `bot-${Date.now()}`;

    const userMsg: Message = {
      id: userMessageId,
      sender: "user",
      text: questionText,
      timestamp: new Date(),
    };

    const placeholderBotMsg: Message = {
      id: botMessageId,
      sender: "bot",
      text: "Thinking...",
      isStreaming: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg, placeholderBotMsg]);
    if (!overrideText) setInput("");
    setLoading(true);

    try {
      const response = await chatService.sendMessage(questionText);
      await simulateTypingEffect(
        botMessageId,
        response.answer,
        response.sources || [],
        response.intent
      );
    } catch (err: any) {
      const errorMsg = err?.message || "Failed to generate response. Please try again.";
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                text: errorMsg,
                isStreaming: false,
                error: true,
              }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = (text: string) => {
    handleSend(text);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderFormattedText = (text: string, messageId: string) => {
    // Check if text contains code blocks ```code```
    const parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const lines = part.slice(3, -3).trim().split("\n");
        const language = lines[0].match(/^[a-z0-9_-]+$/i) ? lines[0] : "";
        const codeContent = language ? lines.slice(1).join("\n") : lines.join("\n");
        const codeId = `${messageId}-code-${index}`;

        return (
          <div key={index} className="my-3 rounded-lg overflow-hidden border border-border bg-slate-950 text-slate-100 font-mono text-xs">
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Code2 className="h-3.5 w-3.5 text-primary" />
                {language || "code"}
              </span>
              <button
                onClick={() => copyToClipboard(codeContent, codeId)}
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                {copiedId === codeId ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 overflow-x-auto whitespace-pre leading-relaxed">{codeContent}</pre>
          </div>
        );
      }

      // Format bullet points and lines
      return (
        <div key={index} className="whitespace-pre-wrap leading-relaxed">
          {part}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-[650px] border border-border rounded-xl bg-card shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold flex items-center gap-1.5">
              Employee RAG Assistant
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            </h3>
            <p className="text-[11px] text-muted-foreground">Powered by Groq LLM & LangChain RAG</p>
          </div>
        </div>
        <button
          onClick={() =>
            setMessages([
              {
                id: "welcome",
                sender: "bot",
                text: "Conversation reset. How can I help you?",
                timestamp: new Date(),
              },
            ])
          }
          className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1 px-2.5 py-1 rounded border border-border hover:bg-accent transition-colors"
        >
          <RefreshCw className="h-3 w-3" /> Reset
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "bot" && (
              <div className="p-2 rounded-full bg-primary/10 text-primary h-8 w-8 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="h-4 w-4" />
              </div>
            )}

            <div className={`max-w-[80%] space-y-2`}>
              <div
                className={`p-3.5 rounded-2xl text-xs ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-none shadow-sm"
                    : msg.error
                    ? "bg-destructive/10 text-destructive border border-destructive/20 rounded-tl-none"
                    : "bg-muted/50 border border-border/60 rounded-tl-none text-foreground"
                }`}
              >
                {renderFormattedText(msg.text, msg.id)}

                {msg.isStreaming && (
                  <span className="inline-block w-1.5 h-3 bg-primary animate-pulse ml-1" />
                )}
              </div>

              {/* Citations Box */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 p-2.5 rounded-lg border border-border/60 bg-muted/20 text-[11px]">
                  <p className="font-semibold text-muted-foreground flex items-center gap-1 mb-1.5">
                    <FileText className="h-3 w-3 text-primary" /> Sources & Citations:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.sources.map((src, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-background border border-border text-foreground font-mono text-[10px]"
                      >
                        📄 {src.source}
                        {src.page && <span className="text-muted-foreground">(p. {src.page})</span>}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Retry Button if error */}
              {msg.error && (
                <button
                  onClick={() => {
                    const lastUserMsg = [...messages]
                      .reverse()
                      .find((m) => m.sender === "user")?.text;
                    if (lastUserMsg) handleRetry(lastUserMsg);
                  }}
                  className="text-[11px] font-semibold text-destructive hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="h-3 w-3" /> Retry Message
                </button>
              )}
            </div>

            {msg.sender === "user" && (
              <div className="p-2 rounded-full bg-secondary text-secondary-foreground h-8 w-8 flex items-center justify-center shrink-0 mt-0.5">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-4 py-2 bg-muted/20 border-t border-border flex items-center gap-2 overflow-x-auto text-[11px]">
        <span className="text-muted-foreground font-semibold shrink-0">Try asking:</span>
        <button
          onClick={() => handleSend("What is my leave balance?")}
          className="px-2.5 py-1 rounded-full border border-border bg-background hover:bg-accent text-foreground shrink-0 transition-colors"
        >
          🏖️ Leave balance
        </button>
        <button
          onClick={() => handleSend("What is my shift timing?")}
          className="px-2.5 py-1 rounded-full border border-border bg-background hover:bg-accent text-foreground shrink-0 transition-colors"
        >
          ⏰ Shift timing
        </button>
        <button
          onClick={() => handleSend("What is the company leave policy?")}
          className="px-2.5 py-1 rounded-full border border-border bg-background hover:bg-accent text-foreground shrink-0 transition-colors"
        >
          📜 Policy search
        </button>
      </div>

      {/* Chat Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 border-t border-border bg-card flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about employee policies, leave, shift, or team..."
          disabled={loading}
          className="flex-1 bg-muted/40 border border-border rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary/95 disabled:opacity-50 flex items-center gap-1.5 shrink-0 transition-colors"
        >
          <Send className="h-3.5 w-3.5" />
          Send
        </button>
      </form>
    </div>
  );
};
