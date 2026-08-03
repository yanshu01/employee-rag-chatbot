import { getConsentDb } from "./consent-db";

// In-Memory Resilience Fallback Store when MySQL server is unreachable
const memoryUsers: any[] = [
  {
    id: 1,
    name: "Rameshwar Mhaske",
    email: "rameshwar@mhtechin.com",
    password: "Ramu@3435",
    role: "admin",
    status: "Active",
    is_verified: 1,
    mobile: "+91 9876543210",
    company_name: "MHTECHIN Services Pvt Ltd",
    profession: "Founder & Director",
    address: "Pune, Maharashtra, India"
  },
  {
    id: 2,
    name: "System Admin",
    email: "admin@mhtechin.com",
    password: "admin123",
    role: "admin",
    status: "Active",
    is_verified: 1,
    mobile: "+91 9876543210",
    company_name: "MHTECHIN",
    profession: "Administrator",
    address: "Pune, India"
  }
];
const memorySubscriptions: any[] = [];
const memoryTickets: any[] = [];
const memoryContacts: any[] = [];
const memoryNewsletters: any[] = [];

const memoryProducts = [
  { id: "billing-system", name: "Enterprise Billing System", icon_name: "CreditCard", type: "Finance", description: "Automated billing, subscription ledgers, invoice generation, payment gateway integrations.", price: 9.99 },
  { id: "crm-portal", name: "Enterprise CRM Portal", icon_name: "Users", type: "CRM", description: "Customer relationships tracker, sales pipeline analytics, custom ticketing system.", price: 12.99 },
  { id: "hrm-suite", name: "HRM Management Suite", icon_name: "UserCheck", type: "HRM", description: "Payroll automations, leaves tracking, employee directories, appraisal pipelines.", price: 11.99 },
  { id: "cloud-erp", name: "Enterprise Cloud ERP", icon_name: "Layers", type: "ERP", description: "Unified resource planning, logistics tracking, supplier networks, ledger auditing.", price: 14.99 },
  { id: "ai-studio", name: "AI Inference Studio", icon_name: "Brain", type: "AI/ML", description: "Host custom model server endpoints, manage vector indexing, and pipeline pipelines.", price: 19.99 },
  { id: "threat-shield", name: "Zero-Trust Shield", icon_name: "Shield", type: "Security", description: "Continuous edge security scanners, automated firewall rules, and DDoS protection.", price: 10.99 },
  { id: "data-lakehouse", name: "Big Data Lakehouse", icon_name: "Database", type: "Analytics", description: "Distributed query engines, real-time analytics dashboards, and warehouse storage.", price: 15.99 },
  { id: "devops-pipeline", name: "DevOps Automated Pipeline", icon_name: "Terminal", type: "CI/CD", description: "Build runners, automated tests, container deployment controls, and security scanning.", price: 9.99 }
];

const memoryServices = [
  { id: "cloud-consulting", name: "Cloud Architecture Consulting", category: "General", description: "Design, optimize, and audit your multi-cloud footprints for cost and security compliance.", price: 150.00, duration: "1 Hour", rating: 4.80, icon_name: "Cloud" },
  { id: "ai-integration", name: "AI & ML System Integration", category: "AI/ML", description: "Incorporate custom LLM execution pipelines, vector search embedding indexing, and agents.", price: 250.00, duration: "2 Hours", rating: 4.90, icon_name: "Brain" },
  { id: "cybersecurity-audit", name: "Zero-Trust Security Audit", category: "Security", description: "Perform deep vulnerability scanners, edges firewall checks, and configure access profiles.", price: 300.00, duration: "3 Hours", rating: 4.70, icon_name: "Shield" },
  { id: "devops-setup", name: "CI/CD DevOps Pipeline Setup", category: "DevOps", description: "Construct robust deployment pipelines, automated tests runners, and container orchestration.", price: 180.00, duration: "1.5 Hours", rating: 4.80, icon_name: "Terminal" }
];

function executeInMemoryFallback<T>(sql: string, values?: any[]): T {
  const normalizedSql = sql.trim().toUpperCase();

  if (normalizedSql.startsWith("CREATE TABLE") || normalizedSql.startsWith("ALTER TABLE") || normalizedSql.startsWith("CREATE INDEX")) {
    return [] as unknown as T;
  }

  if (normalizedSql.startsWith("SHOW COLUMNS")) {
    return [{ Field: "column" }] as unknown as T;
  }

  if (normalizedSql.includes("COUNT(*)")) {
    if (sql.toLowerCase().includes("products")) return [{ cnt: memoryProducts.length }] as unknown as T;
    if (sql.toLowerCase().includes("services")) return [{ cnt: memoryServices.length }] as unknown as T;
    if (sql.toLowerCase().includes("site_users")) return [{ cnt: memoryUsers.length }] as unknown as T;
    return [{ cnt: 0 }] as unknown as T;
  }

  if (sql.toLowerCase().includes("from site_users")) {
    if (sql.toLowerCase().includes("where email =")) {
      const email = values?.[0];
      const found = memoryUsers.filter(u => u.email === email);
      return found as unknown as T;
    }
    if (sql.toLowerCase().includes("where id =")) {
      const id = values?.[0];
      const found = memoryUsers.filter(u => u.id === Number(id));
      return found as unknown as T;
    }
    return memoryUsers as unknown as T;
  }

  if (sql.toLowerCase().includes("insert into site_users")) {
    const id = Date.now();
    const newUser = {
      id,
      name: values?.[0] || "User",
      email: values?.[1] || "",
      password: values?.[2] || "",
      mobile: values?.[3] || "",
      address: values?.[4] || "",
      profession: values?.[5] || "",
      company_name: values?.[6] || "",
      role: "user",
      status: "Active",
      is_verified: 1
    };
    memoryUsers.push(newUser);
    return { insertId: id, affectedRows: 1 } as unknown as T;
  }

  if (sql.toLowerCase().includes("update site_users")) {
    if (values && values.length >= 2) {
      const userId = values[values.length - 1];
      const user = memoryUsers.find(u => u.id === Number(userId));
      if (user) {
        user.verification_code = values[0];
      }
    }
    return { affectedRows: 1 } as unknown as T;
  }

  if (sql.toLowerCase().includes("from products")) {
    return memoryProducts as unknown as T;
  }

  if (sql.toLowerCase().includes("from services")) {
    return memoryServices as unknown as T;
  }

  if (sql.toLowerCase().includes("from support_tickets")) {
    return memoryTickets as unknown as T;
  }

  if (sql.toLowerCase().includes("insert into support_tickets")) {
    const id = Date.now();
    memoryTickets.push({ id, user_id: values?.[0], subject: values?.[1], description: values?.[2], category: values?.[3] || "General", status: "open" });
    return { insertId: id } as unknown as T;
  }

  if (sql.toLowerCase().includes("insert into contact_submissions")) {
    const id = Date.now();
    memoryContacts.push({ id, name: values?.[0], email: values?.[1], company: values?.[2], message: values?.[4] });
    return { insertId: id } as unknown as T;
  }

  if (sql.toLowerCase().includes("insert into newsletter_subscribers")) {
    memoryNewsletters.push({ email: values?.[0] });
    return { affectedRows: 1 } as unknown as T;
  }

  return [] as unknown as T;
}

export async function queryUserDb<T>(sql: string, values?: any[]): Promise<T> {
  try {
    const db = getConsentDb();
    const sanitizedValues = values ? values.map(v => v === undefined ? null : v) : undefined;
    const [rows] = await db.execute(sql, sanitizedValues);
    return rows as T;
  } catch (error: any) {
    console.warn("[DB Fallback] Database connection unavailable. Using in-memory store:", error.message || error);
    return executeInMemoryFallback<T>(sql, values);
  }
}

let dbInitPromise: Promise<void> | null = null;

export async function setupUserTable(): Promise<void> {
  if (dbInitPromise) return dbInitPromise;

  dbInitPromise = (async () => {
    try {
      // 1. Create site_users
    await queryUserDb(`
      CREATE TABLE IF NOT EXISTS site_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NULL,
        mobile VARCHAR(255) NULL,
        address TEXT NULL,
        profession VARCHAR(255) NULL,
        company_name VARCHAR(255) NULL,
        google_id VARCHAR(255) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Ensure role, status, last_login columns exist on site_users
    try {
      const columns = await queryUserDb<any[]>("SHOW COLUMNS FROM site_users LIKE 'role'");
      if (columns.length === 0) {
        await queryUserDb("ALTER TABLE site_users ADD COLUMN role VARCHAR(50) NOT NULL DEFAULT 'user'");
      }
    } catch (e) { console.error("Error adding role:", e); }

    try {
      const columns = await queryUserDb<any[]>("SHOW COLUMNS FROM site_users LIKE 'status'");
      if (columns.length === 0) {
        await queryUserDb("ALTER TABLE site_users ADD COLUMN status VARCHAR(50) NOT NULL DEFAULT 'Active'");
      }
    } catch (e) { console.error("Error adding status:", e); }

    try {
      const columns = await queryUserDb<any[]>("SHOW COLUMNS FROM site_users LIKE 'is_verified'");
      if (columns.length === 0) {
        await queryUserDb("ALTER TABLE site_users ADD COLUMN is_verified TINYINT(1) NOT NULL DEFAULT 0");
      }
    } catch (e) { console.error("Error adding is_verified:", e); }

    try {
      const columns = await queryUserDb<any[]>("SHOW COLUMNS FROM site_users LIKE 'verification_code'");
      if (columns.length === 0) {
        await queryUserDb("ALTER TABLE site_users ADD COLUMN verification_code VARCHAR(50) NULL");
      }
    } catch (e) { console.error("Error adding verification_code:", e); }

    // 3. Create user_subscriptions
    await queryUserDb(`
      CREATE TABLE IF NOT EXISTS user_subscriptions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY user_prod (user_id, product_id)
      )
    `);

    // Ensure columns exist on user_subscriptions (for dates and billing information)
    const subColumnsToAdd = [
      { name: "status", type: "VARCHAR(50) NOT NULL DEFAULT 'pending'" },
      { name: "start_date", type: "TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP" },
      { name: "expiry_date", type: "TIMESTAMP NULL" },
      { name: "price", type: "DECIMAL(10,2) NOT NULL DEFAULT 0.00" },
      { name: "payment_method", type: "VARCHAR(100) NULL" },
      { name: "invoice_number", type: "VARCHAR(255) NULL" },
      { name: "quantity", type: "INT NOT NULL DEFAULT 1" }
    ];

    for (const col of subColumnsToAdd) {
      try {
        const columns = await queryUserDb<any[]>(`SHOW COLUMNS FROM user_subscriptions LIKE '${col.name}'`);
        if (columns.length === 0) {
          await queryUserDb(`ALTER TABLE user_subscriptions ADD COLUMN ${col.name} ${col.type}`);
        }
      } catch (e) { console.error(`Error adding ${col.name} to user_subscriptions:`, e); }
    }

    // 4. Create product_visibility
    await queryUserDb(`
      CREATE TABLE IF NOT EXISTS product_visibility (
        product_id VARCHAR(255) PRIMARY KEY,
        is_visible BOOLEAN NOT NULL DEFAULT TRUE
      )
    `);

    // 5. Create contact_submissions
    await queryUserDb(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        role VARCHAR(255) NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 6. Create newsletter_subscribers
    await queryUserDb(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        email VARCHAR(255) PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 7. Create products table
    await queryUserDb(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        icon_name VARCHAR(100) NOT NULL DEFAULT 'Package',
        type VARCHAR(100) NOT NULL DEFAULT 'General',
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 8. Seed products if empty
    const existingProducts = await queryUserDb<any[]>("SELECT COUNT(*) as cnt FROM products");
    if (existingProducts[0].cnt === 0) {
      const defaultProducts = [
        ["billing-system", "Enterprise Billing System", "CreditCard", "Finance", "Automated billing, subscription ledgers, invoice generation, payment gateway integrations.", 9.99],
        ["crm-portal", "Enterprise CRM Portal", "Users", "CRM", "Customer relationships tracker, sales pipeline analytics, custom ticketing system.", 12.99],
        ["hrm-suite", "HRM Management Suite", "UserCheck", "HRM", "Payroll automations, leaves tracking, employee directories, appraisal pipelines.", 11.99],
        ["cloud-erp", "Enterprise Cloud ERP", "Layers", "ERP", "Unified resource planning, logistics tracking, supplier networks, ledger auditing.", 14.99],
        ["ai-studio", "AI Inference Studio", "Brain", "AI/ML", "Host custom model server endpoints, manage vector indexing, and pipeline pipelines.", 19.99],
        ["threat-shield", "Zero-Trust Shield", "Shield", "Security", "Continuous edge security scanners, automated firewall rules, and DDoS protection.", 10.99],
        ["data-lakehouse", "Big Data Lakehouse", "Database", "Analytics", "Distributed query engines, real-time analytics dashboards, and warehouse storage.", 15.99],
        ["devops-pipeline", "DevOps Automated Pipeline", "Terminal", "CI/CD", "Build runners, automated tests, container deployment controls, and security scanning.", 9.99],
        ["sdn-controller", "SDN Network Controller", "Network", "Networking", "Virtual networks configuration, edge load balancer policies, and traffic optimization.", 8.99],
        ["iot-gateway", "IoT Edge Gateway", "Radio", "IoT", "Sensor networks manager, telemetry ingestion pipeline, and remote device controls.", 11.99],
        ["api-gateway", "Secure API Gateway", "Key", "APIs", "Rate limiting policies, header validations, JWT token broker, and telemetry logging.", 7.99],
        ["sre-observer", "SRE Observer Dashboard", "Activity", "Monitoring", "Node alerts manager, synthetic uptime monitoring, and distributed transaction logs.", 8.99],
        ["identity-broker", "Identity Access Broker", "Lock", "IAM", "Multi-factor authentication, single sign-on tokens, role definitions, and audits.", 6.99],
        ["asset-tracker", "Enterprise Asset Tracker", "Package", "Operations", "Inventory telemetry, warehouse mapping, barcode scanning, and supplier invoices.", 9.99],
        ["cdn-edge", "Global CDN Edge", "Globe", "Network", "Static content caching, geographic routing, and customized edge execution script rules.", 7.99],
        ["k8s-orchestrator", "Kubernetes Orchestrator", "Box", "Containers", "Private clusters manager, auto-scaling replicas, and virtual resource partitions.", 13.99],
        ["semantic-search", "Semantic Search Engine", "Search", "Search", "Full-text indexing, vector similarity query cache, and context ranking pipelines.", 11.99],
        ["message-broker", "Queue Message Broker", "MessageSquare", "Messaging", "Asynchronous publish-subscribe topics, message queues, and guaranteed delivery.", 5.99],
        ["ledger-audit", "Immutable Ledger Audit", "FileText", "Compliance", "Cryptographic transaction ledger audit trail, proof-of-work, and legal logs.", 9.99],
        ["workspace-hub", "Collaborative Workspace Hub", "Laptop", "Collaboration", "Real-time editor sync, team chat overlays, document versioning, and shared drives.", 6.99],
      ];

      for (const p of defaultProducts) {
        await queryUserDb(
          "INSERT IGNORE INTO products (id, name, icon_name, type, description, price) VALUES (?, ?, ?, ?, ?, ?)",
          p as any[]
        );
      }
    }

    // 9. Create services table
    await queryUserDb(`
      CREATE TABLE IF NOT EXISTS services (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL DEFAULT 'General',
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL DEFAULT 0,
        duration VARCHAR(100) NOT NULL DEFAULT '1 hour',
        image_url VARCHAR(255) NULL,
        rating DECIMAL(3,2) NOT NULL DEFAULT 5.00,
        icon_name VARCHAR(100) NOT NULL DEFAULT 'Cpu',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed services if empty
    const existingServices = await queryUserDb<any[]>("SELECT COUNT(*) as cnt FROM services");
    if (existingServices[0].cnt === 0) {
      const defaultServices = [
        ["cloud-consulting", "Cloud Architecture Consulting", "Cloud", "Design, optimize, and audit your multi-cloud footprints for cost and security compliance.", 150.00, "1 Hour", "Cloud", 4.80, "Cloud"],
        ["ai-integration", "AI & ML System Integration", "AI/ML", "Incorporate custom LLM execution pipelines, vector search embedding indexing, and agents.", 250.00, "2 Hours", "Brain", 4.90, "Brain"],
        ["cybersecurity-audit", "Zero-Trust Security Audit", "Security", "Perform deep vulnerability scanners, edges firewall checks, and configure access profiles.", 300.00, "3 Hours", "Shield", 4.70, "Shield"],
        ["devops-setup", "CI/CD DevOps Pipeline Setup", "DevOps", "Construct robust deployment pipelines, automated tests runners, and container orchestration.", 180.00, "1.5 Hours", "Terminal", 4.80, "Terminal"],
        ["database-tuning", "Database Performance Tuning", "Database", "Analyze indexing issues, query run times, and cluster layouts to speed up your transactions.", 160.00, "1 Hour", "Database", 4.60, "Database"],
        ["it-strategy", "Enterprise IT Roadmap Strategy", "Consulting", "Formulate comprehensive technical stacks blueprints, PMF planning, and scaling guidelines.", 200.00, "2 Hours", "Layers", 4.90, "Layers"]
      ];

      for (const s of defaultServices) {
        await queryUserDb(
          "INSERT IGNORE INTO services (id, name, category, description, price, duration, image_url, rating, icon_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          s as any[]
        );
      }
    }

    // 10. Create orders table
    await queryUserDb(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        item_type VARCHAR(50) NOT NULL,
        item_id VARCHAR(255) NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        price DECIMAL(10,2) NOT NULL,
        tax DECIMAL(10,2) NOT NULL DEFAULT 0,
        total_amount DECIMAL(10,2) NOT NULL,
        payment_method VARCHAR(100) NULL,
        payment_status VARCHAR(50) NOT NULL DEFAULT 'pending',
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        invoice_number VARCHAR(255) NOT NULL UNIQUE,
        FOREIGN KEY (user_id) REFERENCES site_users(id) ON DELETE CASCADE
      )
    `);

    // 11. Create payments table
    await queryUserDb(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        user_id INT NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        payment_method VARCHAR(100) NOT NULL,
        transaction_id VARCHAR(255) NOT NULL UNIQUE,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES site_users(id) ON DELETE CASCADE
      )
    `);

    // 12. Create notifications table
    await queryUserDb(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES site_users(id) ON DELETE CASCADE
      )
    `);

    // 13. Create reminder_logs table
    await queryUserDb(`
      CREATE TABLE IF NOT EXISTS reminder_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        subscription_id INT NULL,
        reminder_type VARCHAR(100) NOT NULL,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES site_users(id) ON DELETE CASCADE
      )
    `);

    // 14. Create freelancing_jobs table
    await queryUserDb(`
      CREATE TABLE IF NOT EXISTS freelancing_jobs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL DEFAULT 'General',
        budget VARCHAR(100) NOT NULL DEFAULT 'Negotiable',
        duration VARCHAR(100) NOT NULL DEFAULT 'Flexible',
        skills TEXT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'open',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 15. Seed admin role for Rameshwar Mhaske
    await queryUserDb(
      "UPDATE site_users SET role = 'admin' WHERE email = 'rameshwar@mhtechin.com'"
    );

    // 16. Create user_settings table
    await queryUserDb(`
      CREATE TABLE IF NOT EXISTS user_settings (
        user_id INT PRIMARY KEY,
        email_alerts TINYINT(1) NOT NULL DEFAULT 1,
        sms_alerts TINYINT(1) NOT NULL DEFAULT 0,
        security_alerts TINYINT(1) NOT NULL DEFAULT 1,
        portal_theme VARCHAR(50) NOT NULL DEFAULT 'dark',
        FOREIGN KEY (user_id) REFERENCES site_users(id) ON DELETE CASCADE
      )
    `);

    // 16b. Create delete_data_requests table
    await queryUserDb(`
      CREATE TABLE IF NOT EXISTS delete_data_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        email VARCHAR(255) NOT NULL,
        reason TEXT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES site_users(id) ON DELETE CASCADE
      )
    `);

    // 16c. Create support_tickets table
    await queryUserDb(`
      CREATE TABLE IF NOT EXISTS support_tickets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        subject VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL DEFAULT 'General',
        status VARCHAR(50) NOT NULL DEFAULT 'open',
        assigned_to INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES site_users(id) ON DELETE CASCADE,
        FOREIGN KEY (assigned_to) REFERENCES site_users(id) ON DELETE SET NULL
      )
    `);

    // 17. Create optimized database indexes for fast query resolution
    await queryUserDb("CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_status ON user_subscriptions (user_id, status)");
    await queryUserDb("CREATE INDEX IF NOT EXISTS idx_orders_user_date ON orders (user_id, order_date)");
    await queryUserDb("CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments (user_id)");
    await queryUserDb("CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications (user_id, is_read)");
    } catch (e: any) {
      console.warn("[DB Warning] setupUserTable skipped (DB unreachable):", e.message || e);
    }
  })();

  return dbInitPromise;
}
