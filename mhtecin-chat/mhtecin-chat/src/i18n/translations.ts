import type { Locale } from "./config";

export type Dict = {
  nav: {
    home: string; products: string; services: string; industries: string; about: string; contact: string; business: string; freelancing: string;
    contactSales: string; language: string; exploreAll: string;
    productsHeading: string; productsTagline: string; productsBlurb: string;
    servicesHeading: string; servicesTagline: string; servicesBlurb: string;
  };
  home: {
    pill: string;
    h1: string;
    tagline: string;
    intro: string;
    ctaTalk: string; ctaExplore: string;
    statsHeading: string;
    pillarsKicker: string; pillarsTitle: string; pillarsBlurb: string;
    ctaBandTitle: string; ctaBandSub: string; ctaBandBtn: string;
    trustKicker: string; trustTitle: string; trustBlurb: string;
    trustItems: string[];
    pillars: { title: string; desc: string }[];
    stats: { v: string; l: string }[];
    faq: { q: string; a: string }[];
    solutions: { kicker: string; title: string; blurb: string; items: { name: string; desc: string }[] };
    testimonials: { kicker: string; title: string; items: { quote: string; name: string; role: string }[] };
    partners: { kicker: string; title: string; blurb: string; items: string[] };
    process: { kicker: string; title: string; items: { name: string; desc: string }[] };
    insights: { kicker: string; title: string; readMore: string; items: { tag: string; title: string; desc: string }[] };
    newsletter: { kicker: string; title: string; sub: string; placeholder: string; button: string; note: string };
  };
 productDetail: {
  requestDemo: string;
  allProducts: string;
  productFeatures: string;
  overview: string;

  keyBenefits: string;
  keyBenefitsSub: string;

  technologies: string;
  technologiesSub: string;

  faq: string;

  ctaTitle: string;
  ctaSub: string;
  contactUs: string;

  statReliability: string;
  statSupport: string;
  statIntegrations: string;
  statSecure: string;

  benefitPerfTitle: string;
  benefitPerfBody: string;

  benefitScaleTitle: string;
  benefitScaleBody: string;

  benefitSecTitle: string;
  benefitSecBody: string;

  benefitIntTitle: string;
  benefitIntBody: string;

  benefitAnalyticsTitle: string;
  benefitAnalyticsBody: string;

  benefitSupportTitle: string;
  benefitSupportBody: string;

  useCasesTitle: string;
  useCasesSub: string;

  useCaseAutoTitle: string;
  useCaseAutoBody: string;

  useCaseEngageTitle: string;
  useCaseEngageBody: string;

  overviewBody: string;

  featureFallback: string;

  faqCustomTitle: string;
  faqCustomBody: string;

  faqDeployTitle: string;
  faqDeployBody: string;

  faqSupportTitle: string;
  faqSupportBody: string;
};
  serviceDetail: {
    talkToExpert: string;
    allServices: string;
    overview: string;
    whatWeDeliver: string;
    keyBenefits: string;
    deliveryProcess: string;
    technologies: string;
    faq: string;
    otherServices: string;
    ctaTitle: string;
    ctaSub: string;
    startProject: string;
    browseServices: string;
  };
  products: {
    kicker: string; h1: string; sub: string; tailoredDemo: string; requestDemo: string;
    items: { name: string; tag: string; desc: string; bullets: string[]; slug: string }[];
  };
  services: {
    kicker: string;
    h1: string;
    sub: string;
    specificChallenge: string;
    startConv: string;
    items: {
      slug: string;
      name: string;
      desc: string;
      items: string[];
    }[];
  };
  industries: {
    kicker: string; h1: string; sub: string;
    items: { name: string; desc: string }[];
  };
  business: {
    kicker: string; h1: string; sub: string; ctaTitle: string; ctaBtn: string;
    items: { name: string; desc: string; bullets: string[] }[];
  };
  freelancing: {
    kicker: string;
    h1: string;
    sub: string;
    submitProfile: string;
    searchPlaceholder: string;
    noOpportunities: string;
    filterAdjust: string;
    checkBack: string;
    applyNow: string;
  };
  about: {
    kicker: string; h1: string; sub: string;
    storyTitle: string; storyBody: string;
    numbersTitle: string; numbers: [string, string][];
    standTitle: string; values: { t: string; d: string }[];
  };
  contact: {
    kicker: string; h1: string; sub: string;
    email: string; phone: string; hq: string; hqDetail: string;
    formName: string; formEmail: string; formCompany: string; formRole: string;
    formHelp: string; formHelpPlaceholder: string; send: string;
    thanks: string; thanksBody: string;
  };
  footer: {
    blurb: string; productsCol: string; servicesCol: string; companyCol: string;
    rights: string; tagline: string;
  };
  seo: {
    homeTitle: string; homeDesc: string;
    productsTitle: string; productsDesc: string;
    servicesTitle: string; servicesDesc: string;
    industriesTitle: string; industriesDesc: string;
    businessTitle: string; businessDesc: string;
    aboutTitle: string; aboutDesc: string;
    contactTitle: string; contactDesc: string;
  };
  productDescriptions: {
    [slug: string]: {
      [feature: string]: string;
    };
  };
  serviceExtras: {
    [slug: string]: {
      icon: string;
      tagline: string;
      overview: string;
      benefits: { title: string; body: string }[];
      process: { step: string; title: string; body: string }[];
      stats: { value: string; label: string }[];
      technologies: string[];
      faqs: { q: string; a: string }[];
    };
  };
  extraSections: {
  freeAdviceChip: string;
  freeAdviceTitle: string;
  freeAdviceSub: string;
  freeAdviceBookBtn: string;
  freeAdviceSeeBtn: string;
  freeAdviceItems: { t: string; d: string }[];
  researchTitle: string;
  researchProductsTitle: string;
  researchNote: string;
  researchStats: { v: string; l: string }[];
  colorSpectrumKicker: string;
  colorSpectrumTitle: string;
  colorSpectrumItems: { t: string; d: string }[];
  productsSpectrumKicker: string;
  productsSpectrumTitle: string;
  productsSpectrumItems: { t: string; d: string }[];
  comparisonTitle: string;
  comparisonHeaders: { capability: string; us: string; them: string };
  comparisonRows: { feat: string; us: string; them: string }[];
  useCasesTitle: string;
  useCases: { tag: string; t: string; d: string }[];
  productsUseCasesTitle: string;
  productsUseCases: { tag: string; t: string; d: string }[];
  logosTitle: string;
  quickContactTitle: string;
  quickContactSub: string;
  quickContactBtn: string;
  quickContactFounderBtn: string;
  quickContactItems: { t: string; d: string }[];
  journeyKicker: string;
  journeyTitle: string;
  journeySteps: { y: string; t: string; d: string }[];
  consent: {
    title: string;
    description: string;
    accept: string;
    decline: string;
  };
};
};

const en: Dict = {
  nav: {
    home: "Home", products: "Products", services: "Services", industries: "Industries", about: "About", contact: "Contact", business: "Business", freelancing: "Freelancing",
    contactSales: "Contact Sales", language: "Language", exploreAll: "Explore all →",
    productsHeading: "Our Products", productsTagline: "Enterprise-grade platforms",
    productsBlurb: "Modular solutions built for global enterprises across industries.",
    servicesHeading: "Our Services", servicesTagline: "Expertise that scales",
    servicesBlurb: "Strategic services to accelerate your digital journey.",
  },
  home: {
    pill: "MHTECHIN · Enterprise Technology · Global Delivery",
    h1: "MHTECHIN — Engineering the digital backbone of modern enterprises.",
    tagline: "Think, Plan & Execute.",
    intro: "MHTECHIN is a global enterprise technology company that designs, builds and operates mission-critical cloud, AI, data and cybersecurity solutions for organizations that can't afford to stand still.",
    ctaTalk: "Talk to an expert", ctaExplore: "Explore platform",
    statsHeading: "By the numbers",
    pillarsKicker: "What we build", pillarsTitle: "A complete platform for the modern enterprise.",
    pillarsBlurb: "Six integrated capability areas, designed to work together — or extend the systems you already run.",
    ctaBandTitle: "Ready to modernize your stack?",
    ctaBandSub: "Book a 30-minute architecture review with a MHTECHIN solutions engineer.",
    ctaBandBtn: "Schedule a session",
    trustKicker: "Why MHTECHIN", trustTitle: "Built for scale. Certified for trust.",
    trustBlurb: "We operate to the standards demanded by regulated industries — financial services, healthcare, government and global manufacturing.",
    trustItems: [
      "ISO 27001 & SOC 2 Type II certified operations",
      "GDPR, HIPAA, PCI-DSS aligned data handling",
      "Dedicated solution architects on every engagement",
      "Outcome-based commercial models",
    ],
    pillars: [
      { title: "Cloud Platform", desc: "Scalable, multi-region cloud infrastructure with 99.99% uptime SLA." },
      { title: "AI & Machine Learning", desc: "Train, deploy and govern AI models with enterprise-grade tooling." },
      { title: "Data Analytics", desc: "Real-time insights from petabyte-scale data warehouses." },
      { title: "Cybersecurity", desc: "Zero-trust architecture, threat detection and compliance built-in." },
      { title: "DevOps Automation", desc: "Streamline pipelines, releases and infrastructure-as-code." },
      { title: "Global Delivery", desc: "Engineering teams across 12 countries, 24/7 enterprise support." },
    ],
    stats: [
      { v: "500+", l: "Enterprise customers" },
      { v: "12", l: "Global offices" },
      { v: "99.99%", l: "Platform uptime" },
      { v: "24/7", l: "Mission-critical support" },
    ],
    faq: [
      { q: "What is MHTECHIN?", a: "MHTECHIN is a global enterprise technology company that designs, builds and operates cloud, AI, data analytics and cybersecurity solutions for organizations worldwide." },
      { q: "What services does MHTECHIN offer?", a: "MHTECHIN offers digital transformation, cloud migration, AI & machine learning, application development, managed IT services and strategic consulting." },
      { q: "What is the MHTECHIN tagline?", a: "MHTECHIN's tagline is 'Think, Plan & Execute' — reflecting our disciplined approach to enterprise technology delivery." },
    ],
    solutions: {
      kicker: "Solutions", title: "Outcomes we deliver across the enterprise.",
      blurb: "Pre-engineered solution blueprints combining platform, services and accelerators.",
      items: [
        { name: "Enterprise AI Adoption", desc: "From discovery workshops to production LLM apps in 90 days." },
        { name: "Cloud Cost Optimization", desc: "Reduce cloud spend by 25–40% with FinOps automation." },
        { name: "Zero-Trust Modernization", desc: "Identity-first security across hybrid and multi-cloud estates." },
        { name: "Data Platform Foundation", desc: "Lakehouse architecture that scales from team to enterprise." },
      ],
    },
    testimonials: {
      kicker: "Customer voices", title: "Trusted by leaders across regulated industries.",
      items: [
        { quote: "MHTECHIN became our default partner for cloud and AI within the first project.", name: "Sarah Chen", role: "CIO, Global Bank" },
        { quote: "They deliver with the rigor of a tier-1 SI and the velocity of a product team.", name: "Daniel Okafor", role: "Chief Architect, MedTech" },
        { quote: "Our AI roadmap finally has a credible execution engine behind it.", name: "Priya Raman", role: "VP Data, Fortune 500 Retailer" },
      ],
    },
    partners: {
      kicker: "Ecosystem", title: "Certified across every major cloud and platform.",
      blurb: "Deep partnerships keep our engineering on the leading edge.",
      items: ["AWS Advanced", "Microsoft Azure", "Google Cloud", "NVIDIA", "Databricks", "Snowflake", "HashiCorp", "Red Hat"],
    },
    process: {
      kicker: "How we work", title: "A disciplined delivery method, refined across 500+ engagements.",
      items: [
        { name: "Discover", desc: "Workshops, technical assessments and business outcome mapping." },
        { name: "Architect", desc: "Reference designs, prototypes and a costed delivery plan." },
        { name: "Build", desc: "Pod-based engineering with weekly demos and shared backlog." },
        { name: "Operate", desc: "24/7 SRE, FinOps and continuous improvement after go-live." },
      ],
    },
    insights: {
      kicker: "Insights", title: "Research, playbooks and field notes from our engineers.", readMore: "Read article →",
      items: [
        { tag: "AI", title: "From pilot to production: scaling enterprise LLMs", desc: "What separates the AI programs that ship from the ones that stall." },
        { tag: "Cloud", title: "The FinOps maturity ladder", desc: "A practical roadmap to predictable, optimized cloud spend." },
        { tag: "Security", title: "Zero-trust without breaking everything", desc: "A phased adoption pattern proven across regulated estates." },
      ],
    },
    newsletter: {
      kicker: "Stay informed", title: "Enterprise technology, decoded — monthly.",
      sub: "Briefings on cloud, AI, data and security from MHTECHIN's principal engineers.",
      placeholder: "Work email", button: "Subscribe",
      note: "No spam. Unsubscribe anytime.",
    },
  },
  products: {
    kicker: "Products", h1: "One platform. Every layer of the enterprise stack.",
    sub: "Seven modular products engineered to work independently — and brilliantly together.",
    tailoredDemo: "Want a tailored demo?", requestDemo: "Request demo",
    // ENGLISH
items: [
  {
    slug: "cloud-platform",
    name: "Cloud Platform",
    tag: "Infrastructure",
    desc: "Scalable cloud infrastructure solution.",
    bullets: ["AWS Support", "Auto Scaling", "Monitoring"],
  },
  {
    slug: "data-analytics-suite",
    name: "Data Analytics Suite",
    tag: "Data",
    desc: "Advanced analytics and reporting tools.",
    bullets: ["Dashboards", "Reports", "AI Insights"],
  },
  {
    slug: "ai-studio",
    name: "AI Studio",
    tag: "AI / ML",
    desc: "Build and deploy AI applications.",
    bullets: ["ML Models", "Automation", "Predictions"],
  },
  {
    slug: "cybersecurity-shield",
    name: "Cybersecurity Shield",
    tag: "Security",
    desc: "Enterprise-grade security platform.",
    bullets: ["Threat Detection", "Encryption", "Compliance"],
  },
  {
    slug: "iot-hub",
    name: "IoT Hub",
    tag: "Edge",
    desc: "Connect and monitor IoT devices.",
    bullets: ["Sensors", "Real-time Data", "Alerts"],
  },
  {
    slug: "devops-pipeline",
    name: "DevOps Pipeline",
    tag: "Engineering",
    desc: "CI/CD automation and deployment.",
    bullets: ["Git Integration", "Testing", "Deployments"],
  },
  {
    slug: "consumer-products",
    name: "Consumer Products",
    tag: "Consumer",
    desc: "Modern digital consumer experiences.",
    bullets: ["Mobile Apps", "E-commerce", "UX Design"],
  },
],
  },
  services: {
    kicker: "Services", h1: "Expert teams. Outcome-based delivery.",
    sub: "Strategy, engineering and operations — delivered by certified specialists across 12 global delivery centers.",
    specificChallenge: "Have a specific challenge in mind?", startConv: "Start a conversation",
    items: [
      {
        slug: "digital-transformation",
        name: "Digital Transformation",
        desc: "End-to-end modernization programs spanning strategy, technology and change management.",
        items: ["Operating model design", "Legacy modernization", "Change enablement"],
      },
      {
        slug: "cloud-migration",
        name: "Cloud Migration",
        desc: "Plan, migrate and optimize workloads across AWS, Azure and Google Cloud.",
        items: ["Discovery & assessment", "Lift-shift-refactor", "FinOps optimization"],
      },
      {
        slug: "ai-machine-learning",
        name: "AI & Machine Learning",
        desc: "From proof-of-concept to production — custom models, LLM apps and AI governance.",
        items: ["Generative AI apps", "Predictive ML", "MLOps & governance"],
      },
      {
        slug: "application-development",
        name: "Application Development",
        desc: "Web, mobile and enterprise applications engineered for scale and reliability.",
        items: ["React & Native apps", "API platforms", "Headless commerce"],
      },
      {
        slug: "managed-it-services",
        name: "Managed IT Services",
        desc: "24/7 operations for infrastructure, applications and security — globally delivered.",
        items: ["NOC & SOC", "SRE on-demand", "Vendor management"],
      },
      {
        slug: "consulting-advisory",
        name: "Consulting & Advisory",
        desc: "Independent technology strategy, architecture reviews and CIO advisory.",
        items: ["Tech due diligence", "Architecture reviews", "Vendor selection"],
      },
    ],
  },
  industries: {
    kicker: "Industries", h1: "Industry depth, engineered into every solution.",
    sub: "We bring sector-specific expertise — regulation, workflow and economics — to every engagement.",
    items: [
      { name: "Financial Services", desc: "Core banking modernization, risk and fraud platforms." },
      { name: "Healthcare", desc: "HIPAA-aligned EHR integrations and clinical AI." },
      { name: "Manufacturing", desc: "Industry 4.0, predictive maintenance, OT/IT convergence." },
      { name: "Retail & E-commerce", desc: "Omnichannel commerce and customer data platforms." },
      { name: "Government", desc: "Secure citizen services and sovereign cloud delivery." },
      { name: "Logistics", desc: "Real-time visibility, route optimization and fleet IoT." },
      { name: "Education", desc: "Learning platforms, analytics and identity for institutions." },
      { name: "Energy & Utilities", desc: "Grid analytics, asset monitoring and sustainability reporting." },
    ],
  },
  business: {
    kicker: "Business", h1: "From idea to incorporated, investable business.",
    sub: "End-to-end venture services for founders and corporates — validation, PMF, TRL, registration and taxation under one roof.",
    ctaTitle: "Building something new?", ctaBtn: "Talk to our venture team",
    items: [
      { name: "Idea & Market Validation", desc: "Structured discovery to test demand, willingness-to-pay and competitive whitespace before you invest.", bullets: ["Customer discovery sprints", "Problem-solution fit scoring", "Competitive teardown"] },
      { name: "Product-Market Fit (PMF)", desc: "Move from early traction to repeatable growth with measurable PMF signals.", bullets: ["PMF metrics framework", "Cohort & retention analysis", "GTM experiments"] },
      { name: "TRL Layer (Technology Readiness)", desc: "TRL 1–9 advancement plans for deep-tech, R&D and hardware ventures.", bullets: ["TRL gap assessment", "Prototype to pilot roadmap", "Grant & funding alignment"] },
      { name: "Business Registration", desc: "Incorporate the right entity in the right jurisdiction — fast and compliant.", bullets: ["Entity structuring", "Local registration filings", "Founders & cap-table setup"] },
      { name: "Taxation & Compliance", desc: "Tax registration, filings and ongoing compliance handled by certified specialists.", bullets: ["GST / VAT / sales tax", "Corporate tax filings", "Transfer pricing advisory"] },
      { name: "Funding & Investor Readiness", desc: "Get investor-ready with diligence-grade data rooms, models and decks.", bullets: ["Financial modeling", "Data room setup", "Pitch & narrative coaching"] },
    ],
  },
  freelancing: {
    kicker: "Career Opportunities",
    h1: "Freelancing with MHTECHIN",
    sub: "Join our network of elite freelancers. Work on cutting-edge enterprise projects in cloud, AI, cybersecurity, and more. Flexible engagements, competitive rates.",
    submitProfile: "Submit Your Profile",
    searchPlaceholder: "Search by title, skill, or keyword...",
    noOpportunities: "No Opportunities Found",
    filterAdjust: "Try adjusting your filters or search terms.",
    checkBack: "Check back soon — we post new opportunities regularly.",
    applyNow: "Apply Now",
  },
  about: {
    kicker: "About", h1: "A global technology company built for the next era of enterprise.",
    sub: "MHTECHIN partners with the world's most demanding organizations to build, modernize and operate mission-critical technology.",
    storyTitle: "Our story",
    storyBody: "MHTECHIN was founded with a single conviction: that great technology, built and run with discipline, is the most durable competitive advantage an enterprise can build. Today our teams ship to customers in regulated industries on every continent — and the bar keeps rising.",
    numbersTitle: "By the numbers",
    numbers: [["500+", "Enterprise customers"], ["12", "Global offices"], ["2,400+", "Engineers worldwide"], ["99.99%", "Platform uptime"]],
    standTitle: "What we stand for",
    values: [
      { t: "Engineering excellence", d: "We hold ourselves to the highest technical bar — every commit, every release." },
      { t: "Customer outcomes", d: "Success is measured by the business outcomes we unlock for our customers." },
      { t: "Trust by default", d: "Security, privacy and compliance are designed in from day one." },
      { t: "Global, inclusive teams", d: "Diverse engineering talent across 12 countries, one shared standard." },
    ],
  },
  contact: {
    kicker: "Contact", h1: "Let's build what's next.",
    sub: "Tell us about your initiative — a solutions expert will respond within one business day.",
    email: "Email", phone: "Phone", hq: "Global HQ", hqDetail: "12 offices · 24/7 support",
    formName: "Full name", formEmail: "Work email", formCompany: "Company", formRole: "Job title",
    formHelp: "How can we help?", formHelpPlaceholder: "Tell us about your project, timeline and goals.",
    send: "Send message",
    thanks: "Thank you", thanksBody: "We've received your enquiry — a specialist will be in touch shortly.",
  },
  footer: {
    blurb: "MHTECHIN delivers enterprise technology — cloud, AI, data and cybersecurity — that powers the world's most ambitious organizations.",
    productsCol: "Products", servicesCol: "Services", companyCol: "Company",
    rights: "All rights reserved.", tagline: "Engineered for the enterprise.",
  },
  seo: {
    homeTitle: "MHTECHIN | Enterprise Cloud, AI, Data & Cybersecurity Solutions",
    homeDesc: "MHTECHIN — global enterprise technology company. Cloud, AI, data analytics & cybersecurity solutions engineered for scale. Think, Plan & Execute with MHTECHIN.",
    productsTitle: "Products — MHTECHIN Enterprise Platform",
    productsDesc: "Explore MHTECHIN products: Cloud Platform, Data Analytics, AI Studio, Cybersecurity Shield, IoT Hub, DevOps Pipeline and Consumer Products.",
    servicesTitle: "Services — Digital Transformation & Managed IT | MHTECHIN",
    servicesDesc: "MHTECHIN services span digital transformation, cloud migration, AI/ML, application development, managed IT and strategic consulting.",
    industriesTitle: "Industries — MHTECHIN Solutions by Sector",
    industriesDesc: "MHTECHIN serves financial services, healthcare, manufacturing, retail, government, logistics, education and energy with tailored solutions.",
    businessTitle: "Business — Validation, PMF, TRL, Registration & Taxation | MHTECHIN",
    businessDesc: "MHTECHIN Business services: idea validation, product-market fit, TRL advancement, business registration, taxation and investor readiness.",
    aboutTitle: "About MHTECHIN — Global Enterprise Technology Company",
    aboutDesc: "MHTECHIN is a global enterprise technology company building cloud, AI, data and cybersecurity solutions across 12 countries.",
    contactTitle: "Contact MHTECHIN — Talk to an Enterprise Solutions Expert",
    contactDesc: "Get in touch with MHTECHIN. Speak to our enterprise solutions team about cloud, AI, data and cybersecurity for your organization.",
  },
productDetail: {
  requestDemo: "Request Demo",
  allProducts: "All Products",
  productFeatures: "Product Features",
  overview: "Overview",
  keyBenefits: "Key Benefits",
  keyBenefitsSub: "Discover how our solution drives measurable results",
  technologies: "Technologies",
  technologiesSub: "Built on a modern, proven technology stack",
  faq: "Frequently Asked Questions",
  ctaTitle: "Ready to Explore Our Products?",
  ctaSub: "Build scalable digital platforms with MHTECHIN.",
  contactUs: "Contact Us",
  statReliability: "Reliability", statSupport: "Support",
statIntegrations: "Integrations", statSecure: "Architecture",
benefitPerfTitle: "High Performance", benefitPerfBody: "Optimized architecture ensures smooth and reliable system performance under high workloads.",
benefitScaleTitle: "Scalable Infrastructure", benefitScaleBody: "Easily scale your business operations with cloud-ready and future-proof technologies.",
benefitSecTitle: "Enterprise Security", benefitSecBody: "Advanced security protocols help safeguard sensitive business data and infrastructure.",
benefitIntTitle: "Easy Integration", benefitIntBody: "Integrates seamlessly with existing platforms, APIs, and third-party systems.",
benefitAnalyticsTitle: "Real-Time Analytics", benefitAnalyticsBody: "Gain actionable insights through intelligent dashboards and data-driven reporting tools.",
benefitSupportTitle: "Dedicated Support", benefitSupportBody: "Get continuous assistance from our experienced technical support and consulting teams.",
useCasesTitle: "Use Cases",useCasesSub: "See how teams across industries use this product",
useCaseAutoTitle: "Business Automation", useCaseAutoBody: "Automate repetitive workflows, improve productivity, and reduce operational overhead with intelligent digital solutions.",
useCaseEngageTitle: "Customer Engagement", useCaseEngageBody: "Enhance customer experiences with modern interfaces, responsive systems, and seamless digital interactions.",
featureFallback: "Feature details coming soon.",overviewBody: "Our solution is engineered to help businesses streamline operations, enhance customer experience, improve scalability, and accelerate digital transformation using modern technologies and secure infrastructure.",
faqCustomTitle: "Is the product customizable?", faqCustomBody: "Yes, the solution can be customized according to your business requirements and workflows.",
faqDeployTitle: "Do you provide deployment support?", faqDeployBody: "Yes, our team assists with deployment, onboarding, integration, and ongoing maintenance.",
faqSupportTitle: "Is technical support included?", faqSupportBody: "We provide dedicated technical assistance and support for all enterprise solutions.",
},
serviceDetail: {
  talkToExpert: "Talk to an Expert",
  allServices: "All Services",
  overview: "Overview",
  whatWeDeliver: "What We Deliver",
  keyBenefits: "Key Benefits",
  deliveryProcess: "Delivery Process",
  technologies: "Technologies We Use",
  faq: "Frequently Asked Questions",
  otherServices: "Explore Other Services",
  ctaTitle: "Ready to Build the Future?",
  ctaSub: "Partner with MHTECHIN to modernize infrastructure, build scalable platforms, and accelerate innovation.",
  startProject: "Start Your Project",
  browseServices: "Browse Services",
},

productDescriptions: {
    "cloud-platform": {
      "AWS Support": "Seamless AWS cloud integration with scalable infrastructure and enterprise-grade reliability.",
      "Auto Scaling": "Automatically adjusts resources based on traffic and workload demands.",
      "Monitoring": "Real-time infrastructure monitoring with alerts and performance tracking.",
    },
    "data-analytics-suite": {
      "Dashboards": "Interactive business dashboards for real-time visualization and decision-making.",
      "Reports": "Generate detailed business reports with export and custom analytics support.",
      "AI Insights": "AI-powered insights to identify patterns, trends, and opportunities.",
    },
    "ai-studio": {
      "ML Models": "Develop, train, and deploy machine learning models for business automation.",
      "Automation": "Automate repetitive workflows using advanced AI systems.",
      "Predictions": "Predict trends and business outcomes using intelligent forecasting.",
    },
    "cybersecurity-shield": {
      "Threat Detection": "Detect cyber threats in real-time using intelligent monitoring.",
      "Encryption": "Protect sensitive data with advanced encryption layers.",
      "Compliance": "Maintain industry compliance with automated security management.",
    },
    "iot-hub": {
      "Sensors": "Connect and manage smart sensors for industrial and automation systems.",
      "Real-time Data": "Monitor device activity instantly with live synchronization.",
      "Alerts": "Receive instant notifications for critical events and operational issues.",
    },
    "devops-pipeline": {
      "Git Integration": "Integrates directly with Git for streamlined collaboration and version control.",
      "Testing": "Automated testing pipelines ensure code quality and faster cycles.",
      "Deployments": "Simplify deployment with secure and scalable CI/CD workflows.",
    },
    "consumer-products": {
      "Mobile Apps": "Modern mobile applications built for performance and seamless experiences.",
      "E-commerce": "Scalable e-commerce with secure payments and order management.",
      "UX Design": "User-centered design focused on accessibility and modern interfaces.",
    },
  },
  serviceExtras: {
    "digital-transformation": {
      icon: "🔄",
      tagline: "Modernize operations, accelerate innovation, and create future-ready digital enterprises.",
      overview: "Digital transformation helps businesses modernize systems, automate workflows, improve customer experience, and scale faster.",
      benefits: [
        { title: "Business Agility", body: "Enable faster decision-making and adaptability to changing markets." },
        { title: "Cost Optimization", body: "Reduce infrastructure and operational costs using automation." },
        { title: "Customer Experience", body: "Deliver seamless customer journeys with modern applications." },
        { title: "Data Driven Decisions", body: "Use centralized analytics for better business intelligence." },
      ],
      process: [
        { step: "01", title: "Assessment", body: "Analyze systems, workflows, and business requirements." },
        { step: "02", title: "Planning", body: "Create a scalable digital transformation roadmap." },
        { step: "03", title: "Implementation", body: "Deploy cloud-native and automated enterprise solutions." },
        { step: "04", title: "Optimization", body: "Continuously improve performance and efficiency." },
      ],
      stats: [
        { value: "60%", label: "Faster Operations" },
        { value: "40%", label: "Lower Costs" },
        { value: "500+", label: "Projects Delivered" },
        { value: "99%", label: "Client Satisfaction" },
      ],
      technologies: ["React", "Node.js", "AWS", "Azure", "Python", "Kubernetes"],
      faqs: [
        { q: "What is digital transformation?", a: "The process of modernizing operations using digital technologies." },
        { q: "Can legacy systems be upgraded?", a: "Yes, we modernize old systems into scalable cloud-native solutions." },
      ],
    },
    "cloud-migration": {
      icon: "☁️",
      tagline: "Move faster, spend less, and operate with confidence across AWS, Azure and Google Cloud.",
      overview: "We plan, migrate and optimize your workloads to the cloud with zero-downtime cutovers and built-in cost controls.",
      benefits: [
        { title: "Faster Delivery", body: "Cloud-native CI/CD cuts release cycles from weeks to hours." },
        { title: "Cost Control", body: "FinOps automation eliminates waste and rightsizes spend." },
        { title: "Resilience", body: "Multi-region failover and 99.99% uptime SLAs." },
        { title: "Security", body: "Zero-trust posture baked in from day one." },
      ],
      process: [
        { step: "01", title: "Discovery", body: "Inventory workloads, map dependencies, score migration complexity." },
        { step: "02", title: "Wave Planning", body: "Group workloads into migration waves with risk-ordered sequencing." },
        { step: "03", title: "Migration", body: "Lift-shift-refactor with automated tooling and runbooks." },
        { step: "04", title: "Optimize", body: "FinOps, reserved capacity and continuous rightsizing post-migration." },
      ],
      stats: [
        { value: "40%", label: "Average Cost Saving" },
        { value: "3×", label: "Faster Deployments" },
        { value: "99.99%", label: "Uptime SLA" },
        { value: "200+", label: "Migrations Done" },
      ],
      technologies: ["AWS", "Azure", "Google Cloud", "Terraform", "Kubernetes", "ArgoCD"],
      faqs: [
        { q: "How long does a migration take?", a: "Typically 8–24 weeks depending on workload complexity." },
        { q: "Will there be downtime?", a: "We target zero-downtime cutovers using blue-green and canary patterns." },
      ],
    },
    "ai-machine-learning": {
      icon: "🤖",
      tagline: "From proof-of-concept to production AI — custom models, LLM apps and governance built in.",
      overview: "We design, build and operationalize AI systems that deliver measurable business outcomes, not just demos.",
      benefits: [
        { title: "Faster Insights", body: "Real-time ML inference replaces manual analysis." },
        { title: "Automation", body: "Intelligent workflows cut operational overhead." },
        { title: "Governed AI", body: "Audit trails, explainability and bias controls built in." },
        { title: "LLM Apps", body: "RAG pipelines, copilots and agents grounded in your data." },
      ],
      process: [
        { step: "01", title: "Use Case Framing", body: "Identify high-value ML opportunities with ROI estimates." },
        { step: "02", title: "Data Readiness", body: "Assess, clean and pipeline data for model training." },
        { step: "03", title: "Model Development", body: "Train, evaluate and iterate models with MLflow tracking." },
        { step: "04", title: "MLOps", body: "CI/CD for models, drift monitoring and retraining pipelines." },
      ],
      stats: [
        { value: "90d", label: "PoC to Production" },
        { value: "35%", label: "Avg. Efficiency Gain" },
        { value: "100+", label: "Models in Production" },
        { value: "99%", label: "Model Uptime" },
      ],
      technologies: ["Python", "PyTorch", "OpenAI", "LangChain", "MLflow", "Databricks"],
      faqs: [
        { q: "Do you work with our existing data?", a: "Yes — we assess your data estate first and build pipelines to make it model-ready." },
        { q: "How do you handle AI governance?", a: "Every model ships with an explainability report, bias audit and monitoring dashboard." },
      ],
    },
    "application-development": {
      icon: "💻",
      tagline: "Web, mobile and enterprise applications engineered for scale and long-term reliability.",
      overview: "We build production-grade applications using modern stacks, with performance, accessibility and security as first-class concerns.",
      benefits: [
        { title: "Speed to Market", body: "Iterative sprints ship working software every two weeks." },
        { title: "Scalable Architecture", body: "Designed for 10× growth without rewrites." },
        { title: "Full Ownership", body: "100% of code, docs and IP is yours on day one." },
        { title: "Quality", body: "Automated tests, accessibility audits and performance budgets." },
      ],
      process: [
        { step: "01", title: "Discovery", body: "User research, journey mapping and technical scoping." },
        { step: "02", title: "Design", body: "Figma prototypes validated with real users before a line of code." },
        { step: "03", title: "Build", body: "Two-week sprints, CI/CD, automated QA and weekly demos." },
        { step: "04", title: "Launch", body: "Load testing, security review and go-live runbook." },
      ],
      stats: [
        { value: "8wk", label: "Avg. MVP Timeline" },
        { value: "99%", label: "On-time Delivery" },
        { value: "4.9★", label: "Client Rating" },
        { value: "300+", label: "Apps Shipped" },
      ],
      technologies: ["React", "Next.js", "React Native", "Node.js", "TypeScript", "PostgreSQL"],
      faqs: [
        { q: "Do you build mobile apps?", a: "Yes — iOS, Android and cross-platform with React Native or Flutter." },
        { q: "Who owns the code?", a: "You do — 100% IP transfer, no lock-in." },
      ],
    },
    "managed-it-services": {
      icon: "🛡️",
      tagline: "24/7 operations for infrastructure, applications and security — globally delivered.",
      overview: "We act as your extended engineering team, keeping systems available, secure and cost-efficient around the clock.",
      benefits: [
        { title: "Always On", body: "24/7 NOC and SOC with sub-15-minute response SLAs." },
        { title: "Cost Efficient", body: "Shared SRE model costs 60% less than equivalent in-house headcount." },
        { title: "Proactive", body: "AIOps detects and resolves issues before users notice." },
        { title: "Compliant", body: "SOC 2, ISO 27001 aligned operations with monthly reporting." },
      ],
      process: [
        { step: "01", title: "Onboarding", body: "Inventory, runbook creation and monitoring setup in week one." },
        { step: "02", title: "Baseline", body: "30-day performance and cost baseline with quick-win fixes." },
        { step: "03", title: "Steady State", body: "24/7 monitoring, incident response and change management." },
        { step: "04", title: "Optimize", body: "Monthly reviews with cost, reliability and security improvements." },
      ],
      stats: [
        { value: "99.99%", label: "Uptime Delivered" },
        { value: "<15min", label: "Response SLA" },
        { value: "60%", label: "Cost vs In-house" },
        { value: "24/7", label: "Global Coverage" },
      ],
      technologies: ["Datadog", "PagerDuty", "Terraform", "AWS", "Azure", "Kubernetes"],
      faqs: [
        { q: "What is your incident response time?", a: "P1 incidents are acknowledged within 5 minutes and resolved within 15." },
        { q: "Can you manage our existing cloud accounts?", a: "Yes — we onboard to your accounts and operate alongside your team." },
      ],
    },
    "consulting-advisory": {
      icon: "🎯",
      tagline: "Independent technology strategy, architecture reviews and CIO advisory from senior practitioners.",
      overview: "We provide objective, vendor-agnostic guidance to help leadership make better technology decisions faster.",
      benefits: [
        { title: "Objectivity", body: "No vendor kickbacks — recommendations are purely in your interest." },
        { title: "Senior Access", body: "Direct access to architects and CTOs, not account managers." },
        { title: "Speed", body: "Structured reviews deliver findings in days, not months." },
        { title: "Actionable", body: "Every engagement ends with a prioritized roadmap and decision log." },
      ],
      process: [
        { step: "01", title: "Intake", body: "Define scope, questions and success criteria in a 2-hour kickoff." },
        { step: "02", title: "Assessment", body: "Interviews, document review and architecture analysis." },
        { step: "03", title: "Findings", body: "Structured report with risks, gaps and opportunities scored." },
        { step: "04", title: "Roadmap", body: "Prioritized recommendations with effort, cost and ownership." },
      ],
      stats: [
        { value: "5d", label: "Avg. Review Turnaround" },
        { value: "100%", label: "Senior-led" },
        { value: "50+", label: "CIO Engagements" },
        { value: "4.9★", label: "Client Rating" },
      ],
      technologies: ["TOGAF", "AWS Well-Architected", "NIST CSF", "DORA", "ITIL", "OKRs"],
      faqs: [
        { q: "Is the advice vendor-neutral?", a: "Yes — we hold no referral agreements." },
        { q: "Can you work with our existing vendors?", a: "Absolutely — we assess your current stack objectively." },
      ],
    },
  },
extraSections: {
  freeAdviceChip: "Free for Founders & Owners",
  freeAdviceTitle: "Free Business Advice. No commitment, no catch.",
  freeAdviceSub: "Book a 30-minute strategy call with MHTECHIN advisors. We help founders and SMB owners validate ideas, choose the right tech stack, navigate registration and taxation, and plan a credible go-to-market — completely free.",
  freeAdviceBookBtn: "Book a free call",
  freeAdviceSeeBtn: "See what we cover",
  freeAdviceItems: [
    { t: "Idea validation", d: "Problem-solution clarity in 30 min." },
    { t: "PMF guidance", d: "Test signals before you scale." },
    { t: "Registration & tax", d: "Entity, GST/VAT, compliance basics." },
    { t: "Tech roadmap", d: "Stack, budget, hiring priorities." },
  ],
  researchTitle: "Research-backed outcomes",
  researchProductsTitle: "Product impact, measured",
  researchNote: "Independent benchmarks across cloud, AI, data and security engagements (2023–2025).",
  researchStats: [
    { v: "3.4×", l: "Faster delivery vs. industry baseline" },
    { v: "62%", l: "Average cloud cost reduction" },
    { v: "99.99%", l: "Production uptime across deployments" },
    { v: "120+", l: "Enterprise rollouts globally" },
  ],
  colorSpectrumKicker: "Why MHTECHIN",
  colorSpectrumTitle: "Engineering excellence with a founder-friendly approach",
  colorSpectrumItems: [
    { t: "Outcome-first", d: "We agree KPIs, not just deliverables. Every sprint maps to a business metric." },
    { t: "Senior-led", d: "No junior-only pods. Architects and tech leads are in the room from day one." },
    { t: "Cloud-native", d: "Multi-cloud reference architectures: AWS, GCP, Azure, on-prem and hybrid." },
    { t: "AI-ready data", d: "From schemas to LLM pipelines — production AI without the hype." },
    { t: "Security by design", d: "Zero-trust, SAST/DAST, SBOMs, and pragmatic compliance baked in." },
    { t: "Global delivery", d: "24/5 squads across APAC, EU and Americas with overlapping hours." },
  ],
  productsSpectrumKicker: "Product capabilities",
  productsSpectrumTitle: "Modular building blocks. Composable platforms.",
  productsSpectrumItems: [
    { t: "API-first", d: "Every product exposes stable, versioned REST + GraphQL APIs." },
    { t: "Multi-tenant", d: "Row-level isolation, SSO, per-tenant audit and quotas." },
    { t: "Observability", d: "OpenTelemetry traces, metrics and logs out of the box." },
    { t: "Extensible", d: "Plugin model + webhooks for your internal integrations." },
    { t: "Regional", d: "Pick data residency: APAC, EU, Americas, India." },
    { t: "Pricing that scales", d: "Start small, grow predictably. No surprise overages." },
  ],
  comparisonTitle: "How MHTECHIN products compare",
  comparisonHeaders: { capability: "Capability", us: "MHTECHIN", them: "Typical vendor" },
  comparisonRows: [
    { feat: "Time to value", us: "Production in 4–8 weeks", them: "Quarters" },
    { feat: "Customization", us: "Source-available extensions", them: "Limited config" },
    { feat: "Data residency", us: "Choose region per workload", them: "Single region" },
    { feat: "Senior support", us: "Architects on call", them: "Tiered tickets" },
    { feat: "AI integration", us: "Native, governed", them: "Add-on" },
  ],
  useCasesTitle: "Use cases founders & enterprises pick us for",
  useCases: [
    { tag: "AI", t: "LLM copilots for ops teams", d: "Custom assistants grounded in your data, with audit trails and RBAC." },
    { tag: "Cloud", t: "Multi-region modernization", d: "Strangle legacy monoliths into resilient, observable services." },
    { tag: "Data", t: "Unified analytics platform", d: "Lakehouse, semantic layer, BI — one source of truth." },
    { tag: "Security", t: "Zero-trust rollout", d: "Identity, network, and workload segmentation aligned to ISO 27001." },
    { tag: "Founders", t: "MVP to PMF", d: "Ship a credible MVP in 6–10 weeks, measure PMF, iterate fast." },
    { tag: "SMB", t: "Digital ops in a box", d: "ERP, CRM, payments and dashboards wired together cleanly." },
  ],
  productsUseCasesTitle: "What teams build with our products",
  productsUseCases: [
    { tag: "Cloud OS", t: "Internal developer platform", d: "Self-service environments, golden paths, FinOps controls." },
    { tag: "Analytics", t: "Executive insights", d: "Live KPI dashboards with drill-down and alerts." },
    { tag: "AI Studio", t: "Agent orchestration", d: "Compose tools, memory, evaluation, guardrails." },
    { tag: "Security", t: "Zero-trust gateway", d: "Identity-aware proxy with mTLS and audit." },
    { tag: "IoT Edge", t: "Fleet telemetry", d: "Millions of devices, low-latency edge processing." },
    { tag: "Consumer", t: "Branded mobile apps", d: "Cross-platform, offline-first, with growth analytics." },
  ],
  logosTitle: "Practices we ship across",
  quickContactTitle: "Have a question? Ask an MHTECHIN expert.",
  quickContactSub: "Reply within 1 business day. No sales pressure — just clear answers from senior engineers and advisors.",
  quickContactBtn: "Contact us",
  quickContactFounderBtn: "Free founder advice",
  quickContactItems: [
    { t: "Global delivery", d: "Hubs across APAC, EU, Americas." },
    { t: "Outcome-driven", d: "KPIs agreed before kickoff." },
    { t: "Enterprise security", d: "ISO-aligned engineering." },
    { t: "Senior teams", d: "No junior-only squads." },
  ],
  journeyKicker: "Our Journey",
  journeyTitle: "From a small studio to a global technology partner",
  journeySteps: [
    { y: "2023", t: "Founded", d: "MHTECHIN started with a vision: enterprise-grade engineering for every ambitious company." },
    { y: "2024", t: "Cloud Practice", d: "Launched dedicated cloud & DevOps practice. First 10 production deployments." },
    { y: "2024", t: "Global Expansion", d: "Opened delivery hubs across 3 continents. Crossed 50 enterprise customers." },
    { y: "2025", t: "AI & Data", d: "Stood up data platform and ML engineering teams. First LLM rollouts." },
    { y: "2025", t: "Security & Trust", d: "ISO-aligned security practice. Zero-trust frameworks shipped to regulated clients." },
    { y: "2026", t: "Founder Program", d: "Free advisory for founders & SMB owners. Validation → PMF → registration support." },
  ],
  consent: {
    title: "Privacy Notice",
    description: "We use technologies like cookies to store and/or access device information. Consenting to these technologies will allow us to process data such as browsing behavior or unique IDs on this site. We respect your privacy in accordance with the General Data Protection Regulation (GDPR) and India’s Digital Personal Data Protection (DPDP) Act.",
    accept: "Accept",
    decline: "Decline",
  },
},
};

const jp: Dict = {
  nav: {
    home: "ホーム", products: "製品", services: "サービス", industries: "業界", about: "会社概要", contact: "お問い合わせ", business: "ビジネス", freelancing: "フリーランス",
    contactSales: "営業に相談", language: "言語", exploreAll: "すべて見る →",
    productsHeading: "製品ラインアップ", productsTagline: "エンタープライズ級プラットフォーム",
    productsBlurb: "業界を問わずグローバル企業向けに設計されたモジュール式ソリューション。",
    servicesHeading: "サービス一覧", servicesTagline: "スケールする専門知識",
    servicesBlurb: "デジタル変革を加速する戦略サービス。",
  },
  home: {
    pill: "MHTECHIN · エンタープライズテクノロジー · グローバルデリバリー",
    h1: "MHTECHIN — 現代企業のデジタル基盤をエンジニアリング。",
    tagline: "考え、計画し、実行する。",
    intro: "MHTECHIN は、立ち止まることが許されない企業に対し、ミッションクリティカルなクラウド・AI・データ・サイバーセキュリティソリューションを設計、構築、運用するグローバルなエンタープライズテクノロジー企業です。",
    ctaTalk: "専門家に相談する", ctaExplore: "プラットフォームを見る",
    statsHeading: "数字で見るMHTECHIN",
    pillarsKicker: "提供するもの", pillarsTitle: "現代企業のための完全なプラットフォーム。",
    pillarsBlurb: "6つの統合機能領域。連携して動作し、既存システムを拡張することも可能です。",
    ctaBandTitle: "スタックの近代化を進めませんか?",
    ctaBandSub: "MHTECHIN のソリューションエンジニアと 30 分のアーキテクチャレビューを予約。",
    ctaBandBtn: "セッションを予約",
    trustKicker: "MHTECHIN を選ぶ理由", trustTitle: "スケールに対応。信頼性を認証。",
    trustBlurb: "金融、医療、政府、グローバル製造業など、規制業界の要求水準で運用しています。",
    trustItems: [
      "ISO 27001 および SOC 2 Type II 認証取得運用",
      "GDPR、HIPAA、PCI-DSS 準拠のデータ取扱い",
      "全案件に専任ソリューションアーキテクト",
      "アウトカム志向の商業モデル",
    ],
    pillars: [
      { title: "クラウドプラットフォーム", desc: "99.99% のSLAを備えたマルチリージョン拡張型クラウドインフラ。" },
      { title: "AI と機械学習", desc: "エンタープライズ級ツールでAIモデルを学習、デプロイ、ガバナンス。" },
      { title: "データアナリティクス", desc: "ペタバイト規模のデータウェアハウスからリアルタイム洞察を取得。" },
      { title: "サイバーセキュリティ", desc: "ゼロトラスト構成、脅威検知、コンプライアンスを標準装備。" },
      { title: "DevOps 自動化", desc: "パイプライン、リリース、IaC を効率化。" },
      { title: "グローバルデリバリー", desc: "12カ国のエンジニアチームと24時間365日のエンタープライズサポート。" },
    ],
    stats: [
      { v: "500+", l: "エンタープライズ顧客" },
      { v: "12", l: "グローバル拠点" },
      { v: "99.99%", l: "プラットフォーム稼働率" },
      { v: "24/7", l: "ミッションクリティカルサポート" },
    ],
    faq: [
      { q: "MHTECHIN とは?", a: "MHTECHIN は、世界の組織向けにクラウド、AI、データ分析、サイバーセキュリティソリューションを設計、構築、運用するグローバルなエンタープライズテクノロジー企業です。" },
      { q: "MHTECHIN はどのようなサービスを提供していますか?", a: "デジタル変革、クラウド移行、AI/ML、アプリケーション開発、マネージド IT サービス、戦略コンサルティングを提供しています。" },
      { q: "MHTECHIN のスローガンは?", a: "「Think, Plan & Execute(考え、計画し、実行する)」— エンタープライズテクノロジー提供への規律ある姿勢を表しています。" },
    ],
    solutions: {
      kicker: "ソリューション", title: "企業全体に届ける成果。",
      blurb: "プラットフォーム、サービス、アクセラレーターを組み合わせた事前設計済みのブループリント。",
      items: [
        { name: "エンタープライズ AI 導入", desc: "発見ワークショップから 90 日で本番 LLM アプリへ。" },
        { name: "クラウドコスト最適化", desc: "FinOps 自動化でクラウド支出を 25〜40% 削減。" },
        { name: "ゼロトラスト近代化", desc: "ハイブリッド/マルチクラウド全体で ID 優先のセキュリティ。" },
        { name: "データ基盤の構築", desc: "チームから企業までスケールするレイクハウス構成。" },
      ],
    },
    testimonials: {
      kicker: "お客様の声", title: "規制業界のリーダーから信頼されています。",
      items: [
        { quote: "最初のプロジェクトでクラウドと AI の標準パートナーになりました。", name: "サラ・チェン", role: "グローバル銀行 CIO" },
        { quote: "Tier-1 SI の規律と、プロダクトチームのスピードを両立しています。", name: "ダニエル・オカフォー", role: "MedTech チーフアーキテクト" },
        { quote: "私たちの AI ロードマップに、ようやく信頼できる実行力が伴いました。", name: "プリヤ・ラマン", role: "Fortune 500 小売 データ担当 VP" },
      ],
    },
    partners: {
      kicker: "エコシステム", title: "主要なクラウドとプラットフォーム全てで認証。",
      blurb: "深いパートナーシップにより、私たちのエンジニアリングは常に最前線です。",
      items: ["AWS Advanced", "Microsoft Azure", "Google Cloud", "NVIDIA", "Databricks", "Snowflake", "HashiCorp", "Red Hat"],
    },
    process: {
      kicker: "進め方", title: "500件以上の案件で磨かれた規律ある提供メソッド。",
      items: [
        { name: "発見", desc: "ワークショップ、技術評価、ビジネス成果のマッピング。" },
        { name: "設計", desc: "リファレンス設計、プロトタイプ、コスト試算済みの提供計画。" },
        { name: "構築", desc: "ポッド型エンジニアリングと毎週のデモ、共有バックログ。" },
        { name: "運用", desc: "稼働後の 24/7 SRE、FinOps、継続的改善。" },
      ],
    },
    insights: {
      kicker: "インサイト", title: "現場エンジニアによるリサーチとプレイブック。", readMore: "記事を読む →",
      items: [
        { tag: "AI", title: "PoC から本番へ:エンタープライズ LLM のスケール", desc: "本番にたどり着くAIプログラムの共通点。" },
        { tag: "クラウド", title: "FinOps 成熟度モデル", desc: "予測可能で最適化されたクラウド支出への実践ロードマップ。" },
        { tag: "セキュリティ", title: "壊さないゼロトラスト導入", desc: "規制業界で実証された段階的な導入パターン。" },
      ],
    },
    newsletter: {
      kicker: "最新情報を受け取る", title: "エンタープライズ技術を、月次で解説。",
      sub: "MHTECHIN のプリンシパルエンジニアによるクラウド・AI・データ・セキュリティのブリーフィング。",
      placeholder: "勤務先メール", button: "登録する",
      note: "スパムは送りません。いつでも解除可能。",
    },
  },
  products: {
    kicker: "製品", h1: "ひとつのプラットフォームで、企業スタックのあらゆる層を。",
    sub: "単独でも組み合わせても優れた性能を発揮する7つのモジュール製品。",
    tailoredDemo: "個別デモをご希望ですか?", requestDemo: "デモを依頼",
   // JAPANESE
items: [
  {
    slug: "cloud-platform",
    name: "クラウドプラットフォーム",
    tag: "インフラ",
    desc: "スケーラブルなクラウド基盤。",
    bullets: ["AWSサポート", "自動スケーリング", "監視"],
  },
  {
    slug: "data-analytics-suite",
    name: "データ分析スイート",
    tag: "データ",
    desc: "高度な分析とレポートツール。",
    bullets: ["ダッシュボード", "レポート", "AI分析"],
  },
  {
    slug: "ai-studio",
    name: "AIスタジオ",
    tag: "AI / ML",
    desc: "AIアプリケーションを構築・展開。",
    bullets: ["MLモデル", "自動化", "予測"],
  },
  {
    slug: "cybersecurity-shield",
    name: "サイバーセキュリティシールド",
    tag: "セキュリティ",
    desc: "企業向けセキュリティプラットフォーム。",
    bullets: ["脅威検知", "暗号化", "コンプライアンス"],
  },
  {
    slug: "iot-hub",
    name: "IoTハブ",
    tag: "エッジ",
    desc: "IoTデバイスを接続・監視。",
    bullets: ["センサー", "リアルタイムデータ", "通知"],
  },
  {
    slug: "devops-pipeline",
    name: "DevOpsパイプライン",
    tag: "エンジニアリング",
    desc: "CI/CD自動化とデプロイ。",
    bullets: ["Git統合", "テスト", "デプロイ"],
  },
  {
    slug: "consumer-products",
    name: "コンシューマ製品",
    tag: "消費者向け",
    desc: "現代的なデジタル体験。",
    bullets: ["モバイルアプリ", "Eコマース", "UXデザイン"],
  },
],
  },
  services: {
    kicker: "サービス", h1: "専門チームによる、アウトカム志向の提供。",
    sub: "戦略、エンジニアリング、運用 — 認定スペシャリストが12拠点のグローバルデリバリーセンターから提供。",
    specificChallenge: "具体的な課題はありますか?", startConv: "相談を開始",
    items: [
      { slug: "digital-transformation", name: "デジタルトランスフォーメーション", desc: "戦略、技術、変革管理を網羅した包括的な近代化プログラム。", items: ["業務モデル設計", "レガシー近代化", "変革推進"] },
      { slug: "cloud-migration", name: "クラウド移行", desc: "AWS、Azure、Google Cloud のワークロードを計画、移行、最適化。", items: ["評価", "リフト & リファクタ", "FinOps 最適化"] },
      { slug: "ai-machine-learning", name: "AI と機械学習", desc: "PoC から本番まで — カスタムモデル、LLM アプリ、AI ガバナンス。", items: ["生成 AI アプリ", "予測 ML", "MLOps とガバナンス"] },
      { slug: "application-development", name: "アプリケーション開発", desc: "スケーラブルで信頼性の高い Web、モバイル、エンタープライズアプリケーション。", items: ["React & ネイティブアプリ", "API プラットフォーム", "ヘッドレスコマース"] },
      { slug: "managed-it-services", name: "マネージド IT サービス", desc: "インフラ、アプリ、セキュリティの 24/7 運用 — グローバル提供。", items: ["NOC & SOC", "オンデマンド SRE", "ベンダー管理"] },
      { slug: "consulting-advisory", name: "コンサルティング & アドバイザリー", desc: "独立した技術戦略、アーキテクチャレビュー、CIO アドバイザリー。", items: ["技術デューデリジェンス", "アーキテクチャレビュー", "ベンダー選定"] },
    ],
  },
  industries: {
    kicker: "業界", h1: "業界の深み、すべてのソリューションに。",
    sub: "規制、ワークフロー、経済性 — 業界固有の専門知識をすべての案件に。",
    items: [
      { name: "金融サービス", desc: "コアバンキング近代化、リスク・不正対策プラットフォーム。" },
      { name: "ヘルスケア", desc: "HIPAA 準拠の EHR 統合と臨床 AI。" },
      { name: "製造業", desc: "Industry 4.0、予知保全、OT/IT 統合。" },
      { name: "小売・EC", desc: "オムニチャネルコマースと顧客データプラットフォーム。" },
      { name: "政府機関", desc: "安全な市民サービスとソブリンクラウドの提供。" },
      { name: "物流", desc: "リアルタイム可視化、ルート最適化、フリート IoT。" },
      { name: "教育", desc: "教育機関向け学習プラットフォーム、分析、ID 管理。" },
      { name: "エネルギー・公益", desc: "グリッド分析、資産監視、サステナビリティレポート。" },
    ],
  },
  business: {
    kicker: "ビジネス", h1: "アイデアから、登記済みで投資可能な事業まで。",
    sub: "創業者と企業向けの一気通貫ベンチャーサービス — 検証、PMF、TRL、登記、税務をワンストップで提供。",
    ctaTitle: "新しい事業を立ち上げますか?", ctaBtn: "ベンチャーチームに相談",
    items: [
      { name: "アイデア・市場検証", desc: "投資前に需要・支払い意思・競合余地を体系的にテスト。", bullets: ["顧客発見スプリント", "課題-解決フィット評価", "競合分析"] },
      { name: "プロダクトマーケットフィット (PMF)", desc: "初期トラクションから再現可能な成長へ、定量的な PMF シグナルで前進。", bullets: ["PMF 指標フレームワーク", "コホート・リテンション分析", "GTM 実験"] },
      { name: "TRL レイヤー(技術成熟度)", desc: "ディープテック・R&D・ハードウェア事業の TRL 1〜9 進行計画。", bullets: ["TRL ギャップ評価", "試作から実証までのロードマップ", "助成金・資金調達の整合"] },
      { name: "事業登記", desc: "適切な法人形態・管轄で迅速かつコンプライアンスを担保。", bullets: ["法人ストラクチャリング", "現地登記申請", "創業者・キャップテーブル整備"] },
      { name: "税務・コンプライアンス", desc: "税務登録、申告、継続的なコンプライアンスを認定スペシャリストが対応。", bullets: ["消費税 / VAT / 売上税", "法人税申告", "移転価格アドバイザリー"] },
      { name: "資金調達・投資家対応", desc: "デューデリジェンス水準のデータルーム、モデル、資料で投資家対応へ。", bullets: ["財務モデリング", "データルーム構築", "ピッチ・ナラティブ指導"] },
    ],
  },
  freelancing: {
    kicker: "キャリアの機会",
    h1: "MHTECHIN でのフリーランス活動",
    sub: "精鋭フリーランサーのネットワークに参加しませんか。クラウド、AI、サイバーセキュリティなど、最先端のエンタープライズプロジェクトに参画できます。柔軟な契約形態と魅力的な報酬体系を提供します。",
    submitProfile: "プロフィールを送信する",
    searchPlaceholder: "職種、スキル、またはキーワードで検索...",
    noOpportunities: "案件が見つかりません",
    filterAdjust: "フィルターまたは検索条件を調整してください。",
    checkBack: "定期的に新しい案件を掲載しています。後ほど再度ご確認ください。",
    applyNow: "今すぐ応募する",
  },
  about: {
    kicker: "会社概要", h1: "次世代エンタープライズのためのグローバルテクノロジー企業。",
    sub: "MHTECHIN は世界で最も要求の厳しい組織と連携し、ミッションクリティカルな技術を構築、近代化、運用します。",
    storyTitle: "私たちのストーリー",
    storyBody: "MHTECHIN は、規律をもって構築・運用される優れた技術こそが、企業が築ける最も持続的な競争優位であるという信念のもとに設立されました。今日、私たちのチームはあらゆる大陸の規制業界のお客様に提供を続け、基準は上がり続けています。",
    numbersTitle: "数字で見る",
    numbers: [["500+", "エンタープライズ顧客"], ["12", "グローバル拠点"], ["2,400+", "世界のエンジニア数"], ["99.99%", "プラットフォーム稼働率"]],
    standTitle: "私たちの価値観",
    values: [
      { t: "エンジニアリングの卓越性", d: "すべてのコミット、すべてのリリースで最高の技術基準を維持します。" },
      { t: "顧客成果", d: "成功はお客様にもたらすビジネス成果で測ります。" },
      { t: "信頼を標準に", d: "セキュリティ、プライバシー、コンプライアンスを初日から設計に組み込みます。" },
      { t: "グローバルで包摂的なチーム", d: "12カ国の多様なエンジニアリング人材、共有された一つの基準。" },
    ],
  },
  contact: {
    kicker: "お問い合わせ", h1: "次を一緒に築きましょう。",
    sub: "イニシアチブについてお聞かせください — ソリューション専門家が1営業日以内にご返信します。",
    email: "メール", phone: "電話", hq: "グローバル本社", hqDetail: "12拠点 · 24/7 サポート",
    formName: "氏名", formEmail: "勤務先メール", formCompany: "会社名", formRole: "役職",
    formHelp: "ご相談内容", formHelpPlaceholder: "プロジェクト、スケジュール、目標についてお聞かせください。",
    send: "メッセージを送信",
    thanks: "ありがとうございます", thanksBody: "お問い合わせを受け付けました — 担当者よりご連絡いたします。",
  },
  footer: {
    blurb: "MHTECHIN は、世界で最も野心的な組織を支えるエンタープライズテクノロジー — クラウド、AI、データ、サイバーセキュリティ — を提供します。",
    productsCol: "製品", servicesCol: "サービス", companyCol: "会社",
    rights: "All rights reserved.", tagline: "エンタープライズのためにエンジニアリング。",
  },
  seo: {
    homeTitle: "MHTECHIN | エンタープライズ向けクラウド・AI・データ・セキュリティ",
    homeDesc: "MHTECHIN — グローバルなエンタープライズテクノロジー企業。クラウド、AI、データ分析、サイバーセキュリティをスケール対応で提供。",
    productsTitle: "製品 — MHTECHIN エンタープライズプラットフォーム",
    productsDesc: "MHTECHIN の製品: クラウド、データ分析、AI スタジオ、サイバーセキュリティ、IoT、DevOps、コンシューマー製品。",
    servicesTitle: "サービス — デジタル変革とマネージド IT | MHTECHIN",
    servicesDesc: "デジタル変革、クラウド移行、AI/ML、アプリ開発、マネージド IT、戦略コンサルティング。",
    industriesTitle: "業界 — MHTECHIN の業界別ソリューション",
    industriesDesc: "金融、医療、製造、小売、政府、物流、教育、エネルギー業界向けのソリューション。",
    businessTitle: "ビジネス — 検証・PMF・TRL・登記・税務 | MHTECHIN",
    businessDesc: "MHTECHIN ビジネス: アイデア検証、PMF、TRL、事業登記、税務、投資家対応をワンストップで。",
    aboutTitle: "MHTECHIN について — グローバルエンタープライズテクノロジー企業",
    aboutDesc: "MHTECHIN は、12カ国でクラウド、AI、データ、サイバーセキュリティソリューションを構築するグローバル企業です。",
    contactTitle: "お問い合わせ — MHTECHIN エンタープライズソリューション専門家へ",
    contactDesc: "MHTECHIN にご連絡ください。クラウド、AI、データ、サイバーセキュリティについてエンタープライズソリューションチームへ。",
  },
productDetail: {
  requestDemo: "デモを依頼",
  allProducts: "製品一覧",
  productFeatures: "製品機能",
  overview: "概要",
  keyBenefits: "主なメリット",
  keyBenefitsSub: "私たちのソリューションが測定可能な成果をもたらす方法をご覧ください",
  technologies: "技術",
  technologiesSub: "実績ある最新技術スタックで構築",
  faq: "よくある質問",
  ctaTitle: "製品を探索する準備はできましたか?",
  ctaSub: "MHTECHIN でスケーラブルなデジタルプラットフォームを構築。",
  contactUs: "お問い合わせ",
  statReliability: "信頼性", statSupport: "サポート",
statIntegrations: "統合数", statSecure: "アーキテクチャ",
benefitPerfTitle: "高パフォーマンス", benefitPerfBody: "最適化されたアーキテクチャが高負荷下でもスムーズで安定したシステムパフォーマンスを保証。",
benefitScaleTitle: "スケーラブルなインフラ", benefitScaleBody: "クラウド対応の将来性あるテクノロジーで業務をスケール。",
benefitSecTitle: "エンタープライズセキュリティ", benefitSecBody: "高度なセキュリティプロトコルで機密データとインフラを保護。",
benefitIntTitle: "簡単な統合", benefitIntBody: "既存のプラットフォーム、API、サードパーティシステムとシームレスに統合。",
benefitAnalyticsTitle: "リアルタイム分析", benefitAnalyticsBody: "インテリジェントなダッシュボードで実用的なインサイトを取得。",
benefitSupportTitle: "専任サポート", benefitSupportBody: "経験豊富なテクニカルサポートチームが継続的にサポート。",
useCasesTitle: "ユースケース",useCasesSub: "あらゆる業界のチームがこの製品をどのように活用しているかをご覧ください",
useCaseAutoTitle: "業務自動化", useCaseAutoBody: "反復的なワークフローを自動化し、生産性を向上させ、運用コストを削減。",
useCaseEngageTitle: "顧客エンゲージメント", useCaseEngageBody: "モダンなインターフェースとシームレスなデジタルインタラクションで顧客体験を向上。",
featureFallback: "機能の詳細は近日公開予定です。",overviewBody: "私たちのソリューションは、企業が業務を合理化し、顧客体験を向上させ、スケーラビリティを改善し、最新技術と安全なインフラを使用してデジタルトランスフォーメーションを加速できるよう設計されています。",
faqCustomTitle: "製品はカスタマイズできますか？", faqCustomBody: "はい、ビジネス要件とワークフローに合わせてカスタマイズ可能です。",
faqDeployTitle: "デプロイサポートはありますか？", faqDeployBody: "はい、チームがデプロイ、オンボーディング、統合、継続的なメンテナンスをサポートします。",
faqSupportTitle: "テクニカルサポートは含まれますか？", faqSupportBody: "全エンタープライズソリューションに専任のテクニカルサポートを提供します。",
},
serviceDetail: {
  talkToExpert: "専門家に相談する",
  allServices: "サービス一覧",
  overview: "概要",
  whatWeDeliver: "提供内容",
  keyBenefits: "主なメリット",
  deliveryProcess: "提供プロセス",
  technologies: "使用技術",
  faq: "よくある質問",
  otherServices: "他のサービスを見る",
  ctaTitle: "未来を一緒に築きましょう。",
  ctaSub: "MHTECHIN とパートナーシップを組み、インフラを近代化し、スケーラブルなプラットフォームを構築。",
  startProject: "プロジェクトを開始",
  browseServices: "サービスを見る",
},

productDescriptions: {
  "cloud-platform": {
    "AWS Support": "スケーラブルなインフラストラクチャとエンタープライズレベルの信頼性を備えたシームレスなAWSクラウド統合。",
    "Auto Scaling": "トラフィックとワークロードの需要に応じてリソースを自動調整します。",
    "Monitoring": "アラートとパフォーマンス追跡によるリアルタイムインフラ監視。",
  },
  "data-analytics-suite": {
    "Dashboards": "リアルタイムの可視化と意思決定のためのインタラクティブなビジネスダッシュボード。",
    "Reports": "エクスポート機能とカスタム分析サポート付きの詳細なビジネスレポートを生成。",
    "AI Insights": "パターン、トレンド、機会を特定するAI駆動型インサイト。",
  },
  "ai-studio": {
    "ML Models": "ビジネス自動化のための機械学習モデルを開発、トレーニング、展開。",
    "Automation": "高度なAIシステムを使用して反復的なワークフローを自動化。",
    "Predictions": "インテリジェントな予測を使用してトレンドやビジネス成果を予測。",
  },
  "cybersecurity-shield": {
    "Threat Detection": "インテリジェントな監視を使用してリアルタイムでサイバー脅威を検出。",
    "Encryption": "高度な暗号化レイヤーで機密データを保護。",
    "Compliance": "自動化されたセキュリティ管理で業界コンプライアンスを維持。",
  },
  "iot-hub": {
    "Sensors": "産業および自動化システム向けのスマートセンサーを接続・管理。",
    "Real-time Data": "ライブ同期によりデバイスアクティビティを即時監視。",
    "Alerts": "重要なイベントや運用上の問題に対する即時通知を受信。",
  },
  "devops-pipeline": {
    "Git Integration": "Gitと直接統合し、コラボレーションとバージョン管理を効率化。",
    "Testing": "自動テストパイプラインによりコード品質と高速なサイクルを実現。",
    "Deployments": "安全でスケーラブルなCI/CDワークフローでデプロイを簡素化。",
  },
  "consumer-products": {
    "Mobile Apps": "パフォーマンスとシームレスな体験のために構築された最新モバイルアプリ。",
    "E-commerce": "安全な決済と注文管理を備えたスケーラブルなEコマース。",
    "UX Design": "アクセシビリティとモダンなインターフェースに重点を置いたユーザー中心設計。",
  },
},

serviceExtras: {
  "digital-transformation": {
    icon: "🔄",
    tagline: "運用を最新化し、イノベーションを加速し、将来に備えたデジタル企業を構築します。",
    overview: "デジタルトランスフォーメーションは、企業がシステムを最新化し、ワークフローを自動化し、顧客体験を向上させ、より迅速に拡張できるよう支援します。",
    benefits: [
      { title: "ビジネスアジリティ", body: "より迅速な意思決定と市場変化への適応を可能にします。" },
      { title: "コスト最適化", body: "自動化を使用してインフラおよび運用コストを削減します。" },
      { title: "顧客体験", body: "最新アプリケーションでシームレスな顧客体験を提供します。" },
      { title: "データ駆動型意思決定", body: "集中型分析を使用してビジネスインテリジェンスを向上させます。" },
    ],
    process: [
      { step: "01", title: "評価", body: "システム、ワークフロー、およびビジネス要件を分析します。" },
      { step: "02", title: "計画", body: "スケーラブルなデジタルトランスフォーメーションロードマップを作成します。" },
      { step: "03", title: "実装", body: "クラウドネイティブおよび自動化されたエンタープライズソリューションを導入します。" },
      { step: "04", title: "最適化", body: "パフォーマンスと効率を継続的に改善します。" },
    ],
    stats: [
      { value: "60%", label: "より高速な運用" },
      { value: "40%", label: "コスト削減" },
      { value: "500+", label: "提供済みプロジェクト" },
      { value: "99%", label: "顧客満足度" },
    ],
    technologies: ["React", "Node.js", "AWS", "Azure", "Python", "Kubernetes"],
    faqs: [
      { q: "デジタルトランスフォーメーションとは何ですか？", a: "デジタル技術を使用して運用を最新化するプロセスです。" },
      { q: "レガシーシステムはアップグレードできますか？", a: "はい、古いシステムをスケーラブルなクラウドネイティブソリューションへ最新化します。" },
    ],
  },

  "cloud-migration": {
    icon: "☁️",
    tagline: "AWS、Azure、Google Cloud全体でより速く、より低コストで、安心して運用。",
    overview: "ダウンタイムなしの移行と組み込みコスト管理により、ワークロードをクラウドへ計画・移行・最適化します。",
    benefits: [
      { title: "高速配信", body: "クラウドネイティブCI/CDによりリリースサイクルを数週間から数時間へ短縮。" },
      { title: "コスト管理", body: "FinOps自動化により無駄を排除し、支出を最適化。" },
      { title: "回復力", body: "マルチリージョンフェイルオーバーと99.99%のアップタイムSLA。" },
      { title: "セキュリティ", body: "ゼロトラストセキュリティを初日から組み込み。" },
    ],
    process: [
      { step: "01", title: "調査", body: "ワークロードを棚卸しし、依存関係をマッピングし、移行複雑性を評価。" },
      { step: "02", title: "ウェーブ計画", body: "リスク順にワークロードをグループ化。" },
      { step: "03", title: "移行", body: "自動化ツールと運用手順を使用して移行。" },
      { step: "04", title: "最適化", body: "移行後にFinOpsと継続的最適化を実施。" },
    ],
    stats: [
      { value: "40%", label: "平均コスト削減" },
      { value: "3×", label: "高速デプロイ" },
      { value: "99.99%", label: "アップタイムSLA" },
      { value: "200+", label: "移行実績" },
    ],
    technologies: ["AWS", "Azure", "Google Cloud", "Terraform", "Kubernetes", "ArgoCD"],
    faqs: [
      { q: "移行にはどのくらい時間がかかりますか？", a: "通常、ワークロードの複雑性に応じて8〜24週間です。" },
      { q: "ダウンタイムは発生しますか？", a: "ブルーグリーンおよびカナリア方式でゼロダウンタイムを目指します。" },
    ],
  },

  "ai-machine-learning": {
    icon: "🤖",
    tagline: "概念実証から本番AIまで — カスタムモデル、LLMアプリ、ガバナンスを標準搭載。",
    overview: "単なるデモではなく、測定可能なビジネス成果を生み出すAIシステムを設計、構築、運用します。",
    benefits: [
      { title: "高速インサイト", body: "リアルタイムML推論が手動分析を置き換えます。" },
      { title: "自動化", body: "インテリジェントなワークフローが運用負荷を削減します。" },
      { title: "AIガバナンス", body: "監査証跡、説明可能性、バイアス制御を標準搭載。" },
      { title: "LLMアプリ", body: "RAGパイプライン、コパイロット、エージェントをデータに基づいて構築。" },
    ],
    process: [
      { step: "01", title: "ユースケース定義", body: "ROI予測を含む高価値ML機会を特定。" },
      { step: "02", title: "データ準備", body: "モデル学習用にデータを評価、整理、パイプライン化。" },
      { step: "03", title: "モデル開発", body: "MLflow追跡を使用してモデルを学習、評価、改善。" },
      { step: "04", title: "MLOps", body: "モデルCI/CD、ドリフト監視、再学習パイプライン。" },
    ],
    stats: [
      { value: "90d", label: "PoCから本番化" },
      { value: "35%", label: "平均効率向上" },
      { value: "100+", label: "本番運用モデル" },
      { value: "99%", label: "モデル稼働率" },
    ],
    technologies: ["Python", "PyTorch", "OpenAI", "LangChain", "MLflow", "Databricks"],
    faqs: [
      { q: "既存データを利用できますか？", a: "はい — まずデータ環境を評価し、モデル対応可能なパイプラインを構築します。" },
      { q: "AIガバナンスはどのように対応しますか？", a: "すべてのモデルに説明可能性レポート、バイアス監査、監視ダッシュボードを提供します。" },
    ],
  
},
"application-development": {
  icon: "💻",
  tagline: "スケールと長期的信頼性のために設計されたWeb、モバイル、エンタープライズアプリケーション。",
  overview: "パフォーマンス、アクセシビリティ、セキュリティを最優先に、モダンなスタックで本番グレードのアプリケーションを構築します。",
  benefits: [
    { title: "市場投入速度", body: "反復スプリントで2週間ごとに動くソフトウェアを出荷。" },
    { title: "スケーラブルな設計", body: "書き直しなしで10倍成長に対応できる設計。" },
    { title: "完全な所有権", body: "コード、ドキュメント、IPはすべて初日からお客様のもの。" },
    { title: "品質", body: "自動テスト、アクセシビリティ監査、パフォーマンス予算。" },
  ],
  process: [
    { step: "01", title: "発見", body: "ユーザーリサーチ、ジャーニーマッピング、技術スコーピング。" },
    { step: "02", title: "設計", body: "コードを書く前に実ユーザーで検証したFigmaプロトタイプ。" },
    { step: "03", title: "構築", body: "2週間スプリント、CI/CD、自動QA、週次デモ。" },
    { step: "04", title: "ローンチ", body: "負荷テスト、セキュリティレビュー、本番移行手順書。" },
  ],
  stats: [
    { value: "8wk", label: "平均MVPタイムライン" },
    { value: "99%", label: "期日通りデリバリー" },
    { value: "4.9★", label: "クライアント評価" },
    { value: "300+", label: "出荷済みアプリ" },
  ],
  technologies: ["React", "Next.js", "React Native", "Node.js", "TypeScript", "PostgreSQL"],
  faqs: [
    { q: "モバイルアプリも開発しますか？", a: "はい — iOS、Android、React NativeまたはFlutterによるクロスプラットフォームに対応しています。" },
    { q: "コードの所有権は誰にありますか？", a: "お客様です — 100% IP譲渡、ロックインなし。" },
  ],
},
"managed-it-services": {
  icon: "🛡️",
  tagline: "インフラ、アプリ、セキュリティの24/7運用 — グローバル提供。",
  overview: "私たちはお客様の拡張エンジニアリングチームとして、システムの可用性、セキュリティ、コスト効率を24時間維持します。",
  benefits: [
    { title: "常時稼働", body: "24/7 NOCとSOC、15分以内の対応SLA。" },
    { title: "コスト効率", body: "共有SREモデルは同等の社内人員より60%低コスト。" },
    { title: "プロアクティブ", body: "AIOpsがユーザーが気づく前に問題を検知・解決。" },
    { title: "コンプライアント", body: "SOC 2、ISO 27001準拠の運用と月次レポート。" },
  ],
  process: [
    { step: "01", title: "オンボーディング", body: "初週に棚卸し、ランブック作成、監視設定。" },
    { step: "02", title: "ベースライン", body: "30日間のパフォーマンス・コスト基準線とクイックウィン修正。" },
    { step: "03", title: "定常運用", body: "24/7監視、インシデント対応、変更管理。" },
    { step: "04", title: "最適化", body: "コスト・信頼性・セキュリティ改善の月次レビュー。" },
  ],
  stats: [
    { value: "99.99%", label: "提供稼働率" },
    { value: "<15min", label: "対応SLA" },
    { value: "60%", label: "社内比コスト" },
    { value: "24/7", label: "グローバルカバレッジ" },
  ],
  technologies: ["Datadog", "PagerDuty", "Terraform", "AWS", "Azure", "Kubernetes"],
  faqs: [
    { q: "インシデント対応時間はどのくらいですか？", a: "P1インシデントは5分以内に確認、15分以内に解決します。" },
    { q: "既存のクラウドアカウントも管理できますか？", a: "はい — お客様のアカウントにオンボードし、チームと並走して運用します。" },
  ],
},
"consulting-advisory": {
  icon: "🎯",
  tagline: "シニアプラクティショナーによる独立した技術戦略、アーキテクチャレビュー、CIOアドバイザリー。",
  overview: "リーダーシップがより速く、より良い技術的意思決定を行えるよう、客観的でベンダー非依存のガイダンスを提供します。",
  benefits: [
    { title: "客観性", body: "ベンダーリベートなし — 推奨は純粋にお客様の利益のため。" },
    { title: "シニアアクセス", body: "アカウントマネージャーではなく、アーキテクトとCTOへの直接アクセス。" },
    { title: "スピード", body: "構造化されたレビューで数ヶ月ではなく数日で成果を提供。" },
    { title: "実行可能", body: "すべての案件は優先順位付きロードマップと意思決定ログで終了。" },
  ],
  process: [
    { step: "01", title: "インテーク", body: "2時間のキックオフでスコープ、課題、成功基準を定義。" },
    { step: "02", title: "評価", body: "インタビュー、文書レビュー、アーキテクチャ分析。" },
    { step: "03", title: "調査結果", body: "リスク、ギャップ、機会をスコアリングした構造化レポート。" },
    { step: "04", title: "ロードマップ", body: "工数、コスト、オーナーシップを含む優先順位付き推奨事項。" },
  ],
  stats: [
    { value: "5d", label: "平均レビュー所要日数" },
    { value: "100%", label: "シニアリード" },
    { value: "50+", label: "CIOエンゲージメント" },
    { value: "4.9★", label: "クライアント評価" },
  ],
  technologies: ["TOGAF", "AWS Well-Architected", "NIST CSF", "DORA", "ITIL", "OKRs"],
  faqs: [
    { q: "アドバイスはベンダー中立ですか？", a: "はい — リファラル契約は一切ありません。" },
    { q: "既存のベンダーと連携できますか？", a: "もちろん — 現在のスタックを客観的に評価します。" },
  ],
},

},
extraSections: {
  freeAdviceChip: "創業者・オーナー向け無料",
  freeAdviceTitle: "無料ビジネスアドバイス。コミットメントなし、条件なし。",
  freeAdviceSub: "MHTECHIN アドバイザーと 30 分の戦略通話を予約。アイデア検証、技術スタック選定、登記・税務対応、GTM 計画を無料でサポートします。",
  freeAdviceBookBtn: "無料通話を予約",
  freeAdviceSeeBtn: "カバー内容を見る",
  freeAdviceItems: [
    { t: "アイデア検証", d: "30分で課題-解決の明確化。" },
    { t: "PMF ガイダンス", d: "スケール前にシグナルをテスト。" },
    { t: "登記と税務", d: "法人、消費税、コンプライアンス基礎。" },
    { t: "技術ロードマップ", d: "スタック、予算、採用優先度。" },
  ],
  researchTitle: "データに基づく成果",
  researchProductsTitle: "製品インパクト、計測済み",
  researchNote: "クラウド・AI・データ・セキュリティ案件の独立ベンチマーク（2023〜2025年）。",
  researchStats: [
    { v: "3.4×", l: "業界平均比デリバリー速度" },
    { v: "62%", l: "平均クラウドコスト削減" },
    { v: "99.99%", l: "本番稼働率" },
    { v: "120+", l: "グローバルエンタープライズ展開数" },
  ],
  colorSpectrumKicker: "MHTECHIN を選ぶ理由",
  colorSpectrumTitle: "創業者フレンドリーなエンジニアリングの卓越性",
  colorSpectrumItems: [
    { t: "成果優先", d: "KPI を合意し、スプリントをビジネス指標にマッピング。" },
    { t: "シニアリード", d: "ジュニアのみのポッドなし。初日からアーキテクトが参加。" },
    { t: "クラウドネイティブ", d: "AWS・GCP・Azure・オンプレ・ハイブリッドに対応。" },
    { t: "AI 対応データ", d: "スキーマから LLM パイプラインまで、誇大広告なしの本番 AI。" },
    { t: "セキュリティ・バイ・デザイン", d: "ゼロトラスト、SAST/DAST、SBOM を標準装備。" },
    { t: "グローバルデリバリー", d: "APAC・EU・アメリカで重複する時間帯の 24/5 スクワッド。" },
  ],
  productsSpectrumKicker: "製品機能",
  productsSpectrumTitle: "モジュール型ビルディングブロック。コンポーザブルプラットフォーム。",
  productsSpectrumItems: [
    { t: "API ファースト", d: "すべての製品が安定したバージョン管理済み REST + GraphQL API を公開。" },
    { t: "マルチテナント", d: "行レベル分離、SSO、テナントごとの監査とクォータ。" },
    { t: "オブザーバビリティ", d: "OpenTelemetry のトレース・メトリクス・ログを標準搭載。" },
    { t: "拡張可能", d: "内部統合用のプラグインモデルと Webhook。" },
    { t: "リージョン対応", d: "ワークロードごとにデータ所在地を選択：APAC・EU・アメリカ・インド。" },
    { t: "スケールする料金", d: "小さく始め、予測可能に成長。予期せぬ超過なし。" },
  ],
  comparisonTitle: "MHTECHIN 製品の比較",
  comparisonHeaders: { capability: "機能", us: "MHTECHIN", them: "一般的なベンダー" },
  comparisonRows: [
    { feat: "価値実現までの時間", us: "4〜8 週で本番稼働", them: "数四半期" },
    { feat: "カスタマイズ性", us: "ソース公開の拡張機能", them: "限られた設定" },
    { feat: "データ所在地", us: "ワークロードごとにリージョン選択", them: "単一リージョン" },
    { feat: "シニアサポート", us: "アーキテクトがオンコール", them: "段階的チケット" },
    { feat: "AI 統合", us: "ネイティブ・ガバナンス付き", them: "アドオン" },
  ],
  useCasesTitle: "創業者と企業が選ぶユースケース",
  useCases: [
    { tag: "AI", t: "運用チーム向け LLM コパイロット", d: "自社データに根ざした監査証跡・RBAC 付きアシスタント。" },
    { tag: "クラウド", t: "マルチリージョン近代化", d: "モノリスを回復力のある観測可能なサービスへ。" },
    { tag: "データ", t: "統合分析プラットフォーム", d: "レイクハウス・セマンティック層・BI を一元化。" },
    { tag: "セキュリティ", t: "ゼロトラスト展開", d: "ISO 27001 に準拠した ID・ネットワーク・ワークロード分離。" },
    { tag: "創業者", t: "MVP から PMF へ", d: "6〜10 週で MVP をリリースし、PMF を測定、高速反復。" },
    { tag: "中小企業", t: "デジタルオペレーション一式", d: "ERP・CRM・決済・ダッシュボードをクリーンに統合。" },
  ],
  productsUseCasesTitle: "チームが製品で構築するもの",
  productsUseCases: [
    { tag: "クラウド OS", t: "社内開発者プラットフォーム", d: "セルフサービス環境、ゴールデンパス、FinOps コントロール。" },
    { tag: "アナリティクス", t: "エグゼクティブ向けインサイト", d: "ドリルダウンとアラート付きのライブ KPI ダッシュボード。" },
    { tag: "AI スタジオ", t: "エージェントオーケストレーション", d: "ツール・メモリ・評価・ガードレールを組み合わせ。" },
    { tag: "セキュリティ", t: "ゼロトラストゲートウェイ", d: "mTLS と監査を備えた ID 認識プロキシ。" },
    { tag: "IoT エッジ", t: "フリートテレメトリ", d: "数百万台のデバイス、低遅延エッジ処理。" },
    { tag: "コンシューマー", t: "ブランドモバイルアプリ", d: "クロスプラットフォーム、オフラインファースト、成長分析付き。" },
  ],
  logosTitle: "提供するプラクティス",
  quickContactTitle: "質問がありますか? MHTECHIN の専門家に聞く。",
  quickContactSub: "1 営業日以内に返信。セールスプレッシャーなし — シニアエンジニアからの明確な回答のみ。",
  quickContactBtn: "お問い合わせ",
  quickContactFounderBtn: "創業者向け無料アドバイス",
  quickContactItems: [
    { t: "グローバルデリバリー", d: "APAC・EU・アメリカの拠点。" },
    { t: "成果志向", d: "キックオフ前に KPI を合意。" },
    { t: "エンタープライズセキュリティ", d: "ISO 準拠のエンジニアリング。" },
    { t: "シニアチーム", d: "ジュニアのみのスクワッドなし。" },
  ],
  journeyKicker: "歩み",
  journeyTitle: "小さなスタジオからグローバルテクノロジーパートナーへ",
  journeySteps: [
    { y: "2023", t: "創業", d: "すべての野心的な企業にエンタープライズ級エンジニアリングを、という理念でスタート。" },
    { y: "2024", t: "クラウドプラクティス", d: "クラウド & DevOps 専門チームを立ち上げ。最初の 10 件の本番デプロイを達成。" },
    { y: "2024", t: "グローバル展開", d: "3大陸にデリバリーハブを開設。エンタープライズ顧客 50 社を突破。" },
    { y: "2025", t: "AI & データ", d: "データプラットフォームと ML エンジニアリングチームを設立。初の LLM ロールアウト。" },
    { y: "2025", t: "セキュリティ & 信頼", d: "ISO 準拠のセキュリティプラクティスを確立。規制業界向けゼロトラストフレームワークを提供。" },
    { y: "2026", t: "創業者プログラム", d: "創業者・中小企業オーナー向けの無料アドバイザリー。検証 → PMF → 登記支援。" },
  ],
  consent: {
    title: "プライバシー通知",
    description: "当サイトでは、デバイス情報の保存やアクセスにクッキーなどの技術を使用しています。これらの技術に同意いただくことで、ブラウジング行動や一意のIDなどのデータを処理することが可能になります。当社は、一般データ保護規則（GDPR）およびインドのデジタル個人データ保護法（DPDP法）に準拠し、お客様のプライバシーを尊重します。",
    accept: "同意する",
    decline: "拒否する",
  },
},

};

const de: Dict = {
  nav: {
    home: "Start", products: "Produkte", services: "Services", industries: "Branchen", about: "Über uns", contact: "Kontakt", business: "Business", freelancing: "Freelancing",
    contactSales: "Vertrieb kontaktieren", language: "Sprache", exploreAll: "Alles ansehen →",
    productsHeading: "Unsere Produkte", productsTagline: "Plattformen auf Enterprise-Niveau",
    productsBlurb: "Modulare Lösungen für globale Unternehmen aller Branchen.",
    servicesHeading: "Unsere Services", servicesTagline: "Expertise, die skaliert",
    servicesBlurb: "Strategische Services, die Ihre digitale Reise beschleunigen.",
  },
  home: {
    pill: "MHTECHIN · Enterprise-Technologie · Globale Bereitstellung",
    h1: "MHTECHIN — Das digitale Rückgrat moderner Unternehmen.",
    tagline: "Denken, Planen & Umsetzen.",
    intro: "MHTECHIN ist ein globales Enterprise-Technologieunternehmen, das geschäftskritische Cloud-, KI-, Daten- und Cybersicherheitslösungen für Organisationen entwirft, baut und betreibt, die sich keinen Stillstand leisten können.",
    ctaTalk: "Experten sprechen", ctaExplore: "Plattform erkunden",
    statsHeading: "In Zahlen",
    pillarsKicker: "Was wir bauen", pillarsTitle: "Eine vollständige Plattform für das moderne Unternehmen.",
    pillarsBlurb: "Sechs integrierte Fähigkeitsbereiche — eigenständig nutzbar oder als Erweiterung bestehender Systeme.",
    ctaBandTitle: "Bereit, Ihren Stack zu modernisieren?",
    ctaBandSub: "Buchen Sie ein 30-minütiges Architektur-Review mit einem MHTECHIN-Lösungsingenieur.",
    ctaBandBtn: "Termin vereinbaren",
    trustKicker: "Warum MHTECHIN", trustTitle: "Skaliert. Zertifiziert. Vertrauenswürdig.",
    trustBlurb: "Wir arbeiten nach den Standards regulierter Branchen — Finanzdienstleistungen, Gesundheitswesen, Verwaltung und globale Fertigung.",
    trustItems: [
      "ISO 27001 & SOC 2 Type II zertifizierter Betrieb",
      "DSGVO-, HIPAA-, PCI-DSS-konforme Datenverarbeitung",
      "Dedizierte Lösungsarchitekten für jedes Projekt",
      "Ergebnisorientierte Vertragsmodelle",
    ],
    pillars: [
      { title: "Cloud-Plattform", desc: "Skalierbare Multi-Region-Cloud-Infrastruktur mit 99,99 % SLA." },
      { title: "KI & Machine Learning", desc: "KI-Modelle trainieren, bereitstellen und steuern mit Enterprise-Tools." },
      { title: "Datenanalyse", desc: "Echtzeit-Erkenntnisse aus Petabyte-Data-Warehouses." },
      { title: "Cybersicherheit", desc: "Zero-Trust-Architektur, Bedrohungserkennung und Compliance integriert." },
      { title: "DevOps-Automatisierung", desc: "Pipelines, Releases und Infrastructure-as-Code optimieren." },
      { title: "Globale Bereitstellung", desc: "Engineering-Teams in 12 Ländern, 24/7 Enterprise-Support." },
    ],
    stats: [
      { v: "500+", l: "Enterprise-Kunden" },
      { v: "12", l: "Globale Standorte" },
      { v: "99,99 %", l: "Plattform-Verfügbarkeit" },
      { v: "24/7", l: "Kritischer Support" },
    ],
    faq: [
      { q: "Was ist MHTECHIN?", a: "MHTECHIN ist ein globales Enterprise-Technologieunternehmen, das Cloud-, KI-, Datenanalyse- und Cybersicherheitslösungen für Organisationen weltweit entwirft, baut und betreibt." },
      { q: "Welche Services bietet MHTECHIN?", a: "MHTECHIN bietet digitale Transformation, Cloud-Migration, KI & Machine Learning, Anwendungsentwicklung, Managed IT Services und strategische Beratung." },
      { q: "Was ist der MHTECHIN-Slogan?", a: "Der MHTECHIN-Slogan lautet 'Think, Plan & Execute' — Ausdruck unseres disziplinierten Ansatzes in der Enterprise-Technologie." },
    ],
    solutions: {
      kicker: "Lösungen", title: "Ergebnisse, die wir im Unternehmen liefern.",
      blurb: "Vorgefertigte Lösungs-Blueprints aus Plattform, Services und Beschleunigern.",
      items: [
        { name: "Enterprise-KI-Einführung", desc: "Vom Discovery-Workshop zur produktiven LLM-App in 90 Tagen." },
        { name: "Cloud-Kostenoptimierung", desc: "25–40 % weniger Cloud-Ausgaben durch FinOps-Automatisierung." },
        { name: "Zero-Trust-Modernisierung", desc: "Identitätsorientierte Sicherheit in Hybrid- und Multi-Cloud." },
        { name: "Datenplattform-Basis", desc: "Lakehouse-Architektur — vom Team bis zum Konzern skalierbar." },
      ],
    },
    testimonials: {
      kicker: "Kundenstimmen", title: "Vertrauen aus regulierten Branchen weltweit.",
      items: [
        { quote: "MHTECHIN wurde nach dem ersten Projekt unser Standardpartner für Cloud und KI.", name: "Sarah Chen", role: "CIO, Global Bank" },
        { quote: "Sie liefern mit der Disziplin eines Tier-1-SI und der Geschwindigkeit eines Produktteams.", name: "Daniel Okafor", role: "Chief Architect, MedTech" },
        { quote: "Unsere KI-Roadmap hat endlich einen glaubwürdigen Umsetzungsmotor.", name: "Priya Raman", role: "VP Data, Fortune-500-Retailer" },
      ],
    },
    partners: {
      kicker: "Ökosystem", title: "Zertifiziert auf jeder relevanten Cloud und Plattform.",
      blurb: "Tiefe Partnerschaften halten unser Engineering am Puls der Zeit.",
      items: ["AWS Advanced", "Microsoft Azure", "Google Cloud", "NVIDIA", "Databricks", "Snowflake", "HashiCorp", "Red Hat"],
    },
    process: {
      kicker: "So arbeiten wir", title: "Eine disziplinierte Liefermethode aus 500+ Projekten.",
      items: [
        { name: "Entdecken", desc: "Workshops, technische Assessments und Outcome-Mapping." },
        { name: "Architektur", desc: "Referenz-Designs, Prototypen und kalkulierter Lieferplan." },
        { name: "Bauen", desc: "Pod-basiertes Engineering mit wöchentlichen Demos." },
        { name: "Betreiben", desc: "24/7 SRE, FinOps und kontinuierliche Verbesserung." },
      ],
    },
    insights: {
      kicker: "Insights", title: "Research und Playbooks aus unserer Engineering-Praxis.", readMore: "Artikel lesen →",
      items: [
        { tag: "KI", title: "Vom Pilot zur Produktion: Enterprise-LLMs skalieren", desc: "Was Programme unterscheidet, die ausgeliefert werden." },
        { tag: "Cloud", title: "Die FinOps-Reifegrad-Leiter", desc: "Roadmap zu planbaren, optimierten Cloud-Kosten." },
        { tag: "Sicherheit", title: "Zero-Trust ohne alles zu zerschlagen", desc: "Bewährtes Phasenmodell für regulierte Umgebungen." },
      ],
    },
    newsletter: {
      kicker: "Auf dem Laufenden bleiben", title: "Enterprise-Technologie, monatlich entschlüsselt.",
      sub: "Briefings zu Cloud, KI, Daten und Sicherheit von MHTECHINs Principal Engineers.",
      placeholder: "Geschäftliche E-Mail", button: "Abonnieren",
      note: "Kein Spam. Jederzeit abmeldbar.",
    },
  },
  products: {
    kicker: "Produkte", h1: "Eine Plattform. Jede Ebene des Enterprise-Stacks.",
    sub: "Sieben modulare Produkte — eigenständig und brillant im Zusammenspiel.",
    tailoredDemo: "Möchten Sie eine maßgeschneiderte Demo?", requestDemo: "Demo anfragen",
      // GERMAN
items: [
  {
    slug: "cloud-platform",
    name: "Cloud Plattform",
    tag: "Infrastruktur",
    desc: "Skalierbare Cloud-Infrastruktur.",
    bullets: ["AWS Support", "Auto Scaling", "Monitoring"],
  },
  {
    slug: "data-analytics-suite",
    name: "Datenanalyse Suite",
    tag: "Daten",
    desc: "Erweiterte Analyse- und Reporting-Tools.",
    bullets: ["Dashboards", "Berichte", "KI Insights"],
  },
  {
    slug: "ai-studio",
    name: "AI Studio",
    tag: "AI / ML",
    desc: "KI-Anwendungen entwickeln und bereitstellen.",
    bullets: ["ML Modelle", "Automatisierung", "Vorhersagen"],
  },
  {
    slug: "cybersecurity-shield",
    name: "Cybersecurity Shield",
    tag: "Sicherheit",
    desc: "Enterprise-Sicherheitsplattform.",
    bullets: ["Bedrohungserkennung", "Verschlüsselung", "Compliance"],
  },
  {
    slug: "iot-hub",
    name: "IoT Hub",
    tag: "Edge",
    desc: "IoT-Geräte verbinden und überwachen.",
    bullets: ["Sensoren", "Echtzeitdaten", "Warnungen"],
  },
  {
    slug: "devops-pipeline",
    name: "DevOps Pipeline",
    tag: "Engineering",
    desc: "CI/CD Automatisierung und Deployment.",
    bullets: ["Git Integration", "Tests", "Deployments"],
  },
  {
    slug: "consumer-products",
    name: "Consumer Produkte",
    tag: "Consumer",
    desc: "Moderne digitale Kundenerlebnisse.",
    bullets: ["Mobile Apps", "E-Commerce", "UX Design"],
  },
],
  },
  services: {
    kicker: "Services", h1: "Expertenteams. Ergebnisorientierte Lieferung.",
    sub: "Strategie, Engineering und Betrieb — von zertifizierten Spezialisten an 12 globalen Standorten.",
    specificChallenge: "Haben Sie eine konkrete Herausforderung?", startConv: "Gespräch starten",
    items: [
      { slug: "digital-transformation", name: "Digitale Transformation", desc: "End-to-End-Modernisierungsprogramme: Strategie, Technologie, Change-Management.", items: ["Betriebsmodell-Design", "Legacy-Modernisierung", "Change-Enablement"] },
      { slug: "cloud-migration", name: "Cloud-Migration", desc: "Workloads über AWS, Azure und Google Cloud planen, migrieren und optimieren.", items: ["Discovery & Assessment", "Lift-Shift-Refactor", "FinOps-Optimierung"] },
      { slug: "ai-machine-learning", name: "KI & Machine Learning", desc: "Vom PoC zur Produktion — eigene Modelle, LLM-Apps und KI-Governance.", items: ["Generative-KI-Apps", "Predictive ML", "MLOps & Governance"] },
      { slug: "application-development", name: "Anwendungsentwicklung", desc: "Web-, Mobile- und Enterprise-Anwendungen — skalierbar und zuverlässig.", items: ["React & Native Apps", "API-Plattformen", "Headless Commerce"] },
      { slug: "managed-it-services", name: "Managed IT Services", desc: "24/7-Betrieb für Infrastruktur, Anwendungen und Sicherheit — global.", items: ["NOC & SOC", "SRE on-demand", "Vendor-Management"] },
      { slug: "consulting-advisory", name: "Beratung & Advisory", desc: "Unabhängige Technologiestrategie, Architektur-Reviews und CIO-Advisory.", items: ["Tech Due Diligence", "Architektur-Reviews", "Anbieterauswahl"] },
    ],
  },
  industries: {
    kicker: "Branchen", h1: "Branchen-Tiefe, in jede Lösung integriert.",
    sub: "Branchenspezifische Expertise — Regulierung, Workflow und Ökonomie — in jedem Projekt.",
    items: [
      { name: "Finanzdienstleistungen", desc: "Core-Banking-Modernisierung, Risiko- und Betrugsplattformen." },
      { name: "Gesundheitswesen", desc: "HIPAA-konforme EHR-Integrationen und klinische KI." },
      { name: "Fertigung", desc: "Industrie 4.0, vorausschauende Wartung, OT/IT-Konvergenz." },
      { name: "Handel & E-Commerce", desc: "Omnichannel-Commerce und Kundendatenplattformen." },
      { name: "Verwaltung", desc: "Sichere Bürgerdienste und souveräne Cloud-Bereitstellung." },
      { name: "Logistik", desc: "Echtzeit-Transparenz, Routenoptimierung und Flotten-IoT." },
      { name: "Bildung", desc: "Lernplattformen, Analytik und Identität für Bildungseinrichtungen." },
      { name: "Energie & Versorger", desc: "Netzanalytik, Asset-Monitoring und Nachhaltigkeitsberichte." },
    ],
  },
  business: {
    kicker: "Business", h1: "Von der Idee zum eingetragenen, investierbaren Unternehmen.",
    sub: "End-to-End-Venture-Services für Gründer und Konzerne — Validierung, PMF, TRL, Registrierung und Steuern aus einer Hand.",
    ctaTitle: "Sie bauen etwas Neues?", ctaBtn: "Mit unserem Venture-Team sprechen",
    items: [
      { name: "Ideen- & Marktvalidierung", desc: "Strukturierte Discovery zu Nachfrage, Zahlungsbereitschaft und Wettbewerbslücken — vor der Investition.", bullets: ["Customer-Discovery-Sprints", "Problem-Solution-Fit-Scoring", "Wettbewerbsanalyse"] },
      { name: "Product-Market-Fit (PMF)", desc: "Von erster Traktion zu wiederholbarem Wachstum mit messbaren PMF-Signalen.", bullets: ["PMF-Metriken-Framework", "Kohorten- & Retention-Analyse", "GTM-Experimente"] },
      { name: "TRL-Layer (Technology Readiness)", desc: "TRL 1–9-Fortschrittspläne für Deep-Tech, F&E und Hardware-Ventures.", bullets: ["TRL-Gap-Assessment", "Prototyp-zu-Pilot-Roadmap", "Förder- und Finanzierungs-Alignment"] },
      { name: "Unternehmensregistrierung", desc: "Richtige Rechtsform im richtigen Land — schnell und compliant.", bullets: ["Entity-Strukturierung", "Lokale Registrierungen", "Gründer- & Cap-Table-Setup"] },
      { name: "Steuern & Compliance", desc: "Steuerregistrierung, Meldungen und laufende Compliance durch zertifizierte Spezialisten.", bullets: ["USt / VAT / Sales Tax", "Körperschaftsteuer", "Verrechnungspreis-Advisory"] },
      { name: "Funding & Investor-Readiness", desc: "Investor-ready mit DD-tauglichen Datenräumen, Modellen und Decks.", bullets: ["Financial Modeling", "Datenraum-Setup", "Pitch- & Narrative-Coaching"] },
    ],
  },
  freelancing: {
    kicker: "Karrieremöglichkeiten",
    h1: "Freelancing mit MHTECHIN",
    sub: "Werden Sie Teil unseres Netzwerks aus Elite-Freelancern. Arbeiten Sie an zukunftsweisenden Enterprise-Projekten in den Bereichen Cloud, KI, Cybersicherheit und mehr. Flexible Einsätze, attraktive Stundensätze.",
    submitProfile: "Profil einreichen",
    searchPlaceholder: "Nach Titel, Skill oder Stichwort suchen...",
    noOpportunities: "Keine Möglichkeiten gefunden",
    filterAdjust: "Versuchen Sie, Ihre Filter oder Suchbegriffe anzupassen.",
    checkBack: "Schauen Sie bald wieder vorbei – wir veröffentlichen regelmäßig neue Angebote.",
    applyNow: "Jetzt bewerben",
  },
  about: {
    kicker: "Über uns", h1: "Ein globales Technologieunternehmen für die nächste Enterprise-Ära.",
    sub: "MHTECHIN arbeitet mit den anspruchsvollsten Organisationen der Welt zusammen, um geschäftskritische Technologie zu bauen, zu modernisieren und zu betreiben.",
    storyTitle: "Unsere Geschichte",
    storyBody: "MHTECHIN wurde mit einer Überzeugung gegründet: dass großartige, mit Disziplin gebaute und betriebene Technologie der dauerhafteste Wettbewerbsvorteil ist. Heute liefern unsere Teams an Kunden in regulierten Branchen auf allen Kontinenten — und der Anspruch wächst weiter.",
    numbersTitle: "In Zahlen",
    numbers: [["500+", "Enterprise-Kunden"], ["12", "Globale Standorte"], ["2.400+", "Ingenieure weltweit"], ["99,99 %", "Plattform-Verfügbarkeit"]],
    standTitle: "Wofür wir stehen",
    values: [
      { t: "Engineering-Exzellenz", d: "Höchste technische Maßstäbe — bei jedem Commit, jedem Release." },
      { t: "Kundenergebnisse", d: "Erfolg messen wir am Geschäftsergebnis unserer Kunden." },
      { t: "Vertrauen by default", d: "Sicherheit, Datenschutz und Compliance sind von Tag eins eingebaut." },
      { t: "Globale, inklusive Teams", d: "Vielfältige Engineering-Talente in 12 Ländern, ein gemeinsamer Standard." },
    ],
  },
  contact: {
    kicker: "Kontakt", h1: "Lassen Sie uns die Zukunft bauen.",
    sub: "Erzählen Sie uns von Ihrer Initiative — ein Lösungsexperte antwortet innerhalb eines Arbeitstags.",
    email: "E-Mail", phone: "Telefon", hq: "Globaler Hauptsitz", hqDetail: "12 Standorte · 24/7 Support",
    formName: "Vollständiger Name", formEmail: "Geschäftliche E-Mail", formCompany: "Unternehmen", formRole: "Position",
    formHelp: "Wie können wir helfen?", formHelpPlaceholder: "Erzählen Sie uns von Ihrem Projekt, Zeitplan und Zielen.",
    send: "Nachricht senden",
    thanks: "Vielen Dank", thanksBody: "Wir haben Ihre Anfrage erhalten — ein Spezialist meldet sich in Kürze.",
  },
  footer: {
    blurb: "MHTECHIN liefert Enterprise-Technologie — Cloud, KI, Daten und Cybersicherheit — die die ambitioniertesten Organisationen der Welt antreibt.",
    productsCol: "Produkte", servicesCol: "Services", companyCol: "Unternehmen",
    rights: "Alle Rechte vorbehalten.", tagline: "Für das Unternehmen entwickelt.",
  },
  seo: {
    homeTitle: "MHTECHIN | Enterprise Cloud, KI, Daten & Cybersicherheit",
    homeDesc: "MHTECHIN — globales Enterprise-Technologieunternehmen. Cloud, KI, Datenanalyse und Cybersicherheit für Skalierung. Think, Plan & Execute.",
    productsTitle: "Produkte — MHTECHIN Enterprise-Plattform",
    productsDesc: "MHTECHIN-Produkte: Cloud, Datenanalyse, AI Studio, Cybersecurity Shield, IoT Hub, DevOps Pipeline und Consumer-Produkte.",
    servicesTitle: "Services — Digitale Transformation & Managed IT | MHTECHIN",
    servicesDesc: "MHTECHIN-Services: digitale Transformation, Cloud-Migration, KI/ML, App-Entwicklung, Managed IT und strategische Beratung.",
    industriesTitle: "Branchen — MHTECHIN-Lösungen nach Sektor",
    industriesDesc: "MHTECHIN bedient Finanzwesen, Gesundheit, Fertigung, Handel, Verwaltung, Logistik, Bildung und Energie.",
    businessTitle: "Business — Validierung, PMF, TRL, Registrierung & Steuern | MHTECHIN",
    businessDesc: "MHTECHIN Business: Ideenvalidierung, Product-Market-Fit, TRL, Unternehmensregistrierung, Steuern und Investor-Readiness.",
    aboutTitle: "Über MHTECHIN — Globales Enterprise-Technologieunternehmen",
    aboutDesc: "MHTECHIN baut Cloud-, KI-, Daten- und Cybersicherheitslösungen in 12 Ländern.",
    contactTitle: "Kontakt MHTECHIN — Enterprise-Lösungsexperten sprechen",
    contactDesc: "Kontaktieren Sie MHTECHIN. Sprechen Sie mit unserem Enterprise-Team über Cloud, KI, Daten und Cybersicherheit.",
  },
productDetail: {
  requestDemo: "Demo anfragen",
  allProducts: "Alle Produkte",
  productFeatures: "Produktfunktionen",
  overview: "Übersicht",
  keyBenefits: "Hauptvorteile",
  keyBenefitsSub: "Entdecken Sie, wie unsere Lösung messbare Ergebnisse erzielt",
  technologies: "Technologien",
  technologiesSub: "Aufgebaut auf einem modernen, bewährten Technologie-Stack",
  faq: "Häufig gestellte Fragen",
  ctaTitle: "Bereit, unsere Produkte zu entdecken?",
  ctaSub: "Skalierbare digitale Plattformen mit MHTECHIN aufbauen.",
  contactUs: "Kontakt",
  statReliability: "Zuverlässigkeit", statSupport: "Support",
statIntegrations: "Integrationen", statSecure: "Architektur",
benefitPerfTitle: "Hohe Leistung", benefitPerfBody: "Optimierte Architektur für reibungslose und zuverlässige Systemleistung unter hohen Lasten.",
benefitScaleTitle: "Skalierbare Infrastruktur", benefitScaleBody: "Einfache Skalierung mit cloud-fähigen und zukunftssicheren Technologien.",
benefitSecTitle: "Enterprise-Sicherheit", benefitSecBody: "Fortschrittliche Sicherheitsprotokolle schützen sensible Geschäftsdaten und Infrastruktur.",
benefitIntTitle: "Einfache Integration", benefitIntBody: "Nahtlose Integration mit bestehenden Plattformen, APIs und Drittanbietersystemen.",
benefitAnalyticsTitle: "Echtzeit-Analytik", benefitAnalyticsBody: "Handlungsrelevante Erkenntnisse durch intelligente Dashboards und datengestützte Reports.",
benefitSupportTitle: "Dedizierter Support", benefitSupportBody: "Kontinuierliche Unterstützung durch erfahrene technische Support- und Beratungsteams.",
useCasesTitle: "Anwendungsfälle",useCasesSub: "Sehen Sie, wie Teams in verschiedenen Branchen dieses Produkt nutzen",
useCaseAutoTitle: "Geschäftsautomatisierung", useCaseAutoBody: "Automatisieren Sie repetitive Workflows, steigern Sie die Produktivität und reduzieren Sie Betriebskosten.",
useCaseEngageTitle: "Kundenbindung", useCaseEngageBody: "Verbessern Sie Kundenerlebnisse mit modernen Interfaces und nahtlosen digitalen Interaktionen.",
featureFallback: "Funktionsdetails demnächst verfügbar.",overviewBody: "Unsere Lösung ist darauf ausgelegt, Unternehmen bei der Optimierung von Abläufen, der Verbesserung der Kundenerfahrung und der Beschleunigung der digitalen Transformation zu unterstützen.",
faqCustomTitle: "Ist das Produkt anpassbar?", faqCustomBody: "Ja, die Lösung kann an Ihre Geschäftsanforderungen und Workflows angepasst werden.",
faqDeployTitle: "Bieten Sie Deployment-Support?", faqDeployBody: "Ja, unser Team unterstützt bei Deployment, Onboarding, Integration und laufender Wartung.",
faqSupportTitle: "Ist technischer Support inbegriffen?", faqSupportBody: "Wir bieten dedizierten technischen Support für alle Enterprise-Lösungen.",
},
serviceDetail: {
  talkToExpert: "Experten sprechen",
  allServices: "Alle Services",
  overview: "Übersicht",
  whatWeDeliver: "Was wir liefern",
  keyBenefits: "Hauptvorteile",
  deliveryProcess: "Lieferprozess",
  technologies: "Technologien",
  faq: "Häufig gestellte Fragen",
  otherServices: "Weitere Services entdecken",
  ctaTitle: "Bereit, die Zukunft zu bauen?",
  ctaSub: "Partnern Sie mit MHTECHIN, um Infrastruktur zu modernisieren und skalierbare Plattformen zu bauen.",
  startProject: "Projekt starten",
  browseServices: "Services durchsuchen",
},

productDescriptions: {
  "cloud-platform": {
    "AWS Support": "Nahtlose AWS-Cloud-Integration mit skalierbarer Infrastruktur und Zuverlässigkeit auf Unternehmensebene.",
    "Auto Scaling": "Passt Ressourcen automatisch basierend auf Verkehrs- und Arbeitslastanforderungen an.",
    "Monitoring": "Echtzeit-Überwachung der Infrastruktur mit Warnmeldungen und Leistungsüberwachung.",
  },
  "data-analytics-suite": {
    "Dashboards": "Interaktive Business-Dashboards für Echtzeit-Visualisierung und Entscheidungsfindung.",
    "Reports": "Erstellen Sie detaillierte Geschäftsberichte mit Export- und benutzerdefinierter Analyseunterstützung.",
    "AI Insights": "KI-gestützte Erkenntnisse zur Identifizierung von Mustern, Trends und Chancen.",
  },
  "ai-studio": {
    "ML Models": "Entwickeln, trainieren und implementieren Sie Machine-Learning-Modelle für die Geschäftsautomatisierung.",
    "Automation": "Automatisieren Sie wiederkehrende Workflows mit fortschrittlichen KI-Systemen.",
    "Predictions": "Vorhersage von Trends und Geschäftsergebnissen durch intelligente Prognosen.",
  },
  "cybersecurity-shield": {
    "Threat Detection": "Erkennen Sie Cyberbedrohungen in Echtzeit durch intelligente Überwachung.",
    "Encryption": "Schützen Sie sensible Daten mit erweiterten Verschlüsselungsebenen.",
    "Compliance": "Einhaltung von Branchenstandards durch automatisiertes Sicherheitsmanagement.",
  },
  "iot-hub": {
    "Sensors": "Verbinden und verwalten Sie intelligente Sensoren für Industrie- und Automatisierungssysteme.",
    "Real-time Data": "Überwachen Sie Geräteaktivitäten sofort mit Live-Synchronisierung.",
    "Alerts": "Erhalten Sie sofortige Benachrichtigungen über kritische Ereignisse und Betriebsprobleme.",
  },
  "devops-pipeline": {
    "Git Integration": "Direkte Integration mit Git für optimierte Zusammenarbeit und Versionskontrolle.",
    "Testing": "Automatisierte Testpipelines gewährleisten Codequalität und schnellere Entwicklungszyklen.",
    "Deployments": "Vereinfachen Sie Bereitstellungen mit sicheren und skalierbaren CI/CD-Workflows.",
  },
  "consumer-products": {
    "Mobile Apps": "Moderne mobile Anwendungen für Leistung und nahtlose Benutzererfahrungen.",
    "E-commerce": "Skalierbarer E-Commerce mit sicheren Zahlungen und Bestellverwaltung.",
    "UX Design": "Benutzerzentriertes Design mit Fokus auf Barrierefreiheit und moderne Oberflächen.",
  },
},

serviceExtras: {
  "digital-transformation": {
    icon: "🔄",
    tagline: "Modernisieren Sie Abläufe, beschleunigen Sie Innovationen und schaffen Sie zukunftssichere digitale Unternehmen.",
    overview: "Die digitale Transformation hilft Unternehmen, Systeme zu modernisieren, Workflows zu automatisieren, Kundenerlebnisse zu verbessern und schneller zu skalieren.",
    benefits: [
      { title: "Geschäftliche Agilität", body: "Ermöglicht schnellere Entscheidungen und Anpassungsfähigkeit an sich ändernde Märkte." },
      { title: "Kostenoptimierung", body: "Reduzieren Sie Infrastruktur- und Betriebskosten durch Automatisierung." },
      { title: "Kundenerlebnis", body: "Bieten Sie nahtlose Kundenerlebnisse mit modernen Anwendungen." },
      { title: "Datenbasierte Entscheidungen", body: "Nutzen Sie zentrale Analysen für bessere Business Intelligence." },
    ],
    process: [
      { step: "01", title: "Bewertung", body: "Analysieren Sie Systeme, Workflows und Geschäftsanforderungen." },
      { step: "02", title: "Planung", body: "Erstellen Sie eine skalierbare Roadmap für die digitale Transformation." },
      { step: "03", title: "Implementierung", body: "Implementieren Sie cloud-native und automatisierte Unternehmenslösungen." },
      { step: "04", title: "Optimierung", body: "Verbessern Sie kontinuierlich Leistung und Effizienz." },
    ],
    stats: [
      { value: "60%", label: "Schnellere Abläufe" },
      { value: "40%", label: "Niedrigere Kosten" },
      { value: "500+", label: "Abgeschlossene Projekte" },
      { value: "99%", label: "Kundenzufriedenheit" },
    ],
    technologies: ["React", "Node.js", "AWS", "Azure", "Python", "Kubernetes"],
    faqs: [
      { q: "Was ist digitale Transformation?", a: "Der Prozess der Modernisierung von Abläufen mithilfe digitaler Technologien." },
      { q: "Können Altsysteme modernisiert werden?", a: "Ja, wir modernisieren alte Systeme zu skalierbaren cloud-nativen Lösungen." },
    ],
  },

  "cloud-migration": {
    icon: "☁️",
    tagline: "Schneller arbeiten, weniger ausgeben und sicher über AWS, Azure und Google Cloud hinweg operieren.",
    overview: "Wir planen, migrieren und optimieren Ihre Workloads in die Cloud mit unterbrechungsfreien Umstellungen und integrierter Kostenkontrolle.",
    benefits: [
      { title: "Schnellere Bereitstellung", body: "Cloud-native CI/CD reduziert Release-Zyklen von Wochen auf Stunden." },
      { title: "Kostenkontrolle", body: "FinOps-Automatisierung beseitigt Verschwendung und optimiert Ausgaben." },
      { title: "Resilienz", body: "Multi-Region-Failover und 99,99 % Uptime-SLAs." },
      { title: "Sicherheit", body: "Zero-Trust-Sicherheit von Anfang an integriert." },
    ],
    process: [
      { step: "01", title: "Analyse", body: "Inventarisieren Sie Workloads, ordnen Sie Abhängigkeiten zu und bewerten Sie die Migrationskomplexität." },
      { step: "02", title: "Wellenplanung", body: "Gruppieren Sie Workloads in Migrationswellen nach Risikoreihenfolge." },
      { step: "03", title: "Migration", body: "Lift-Shift-Refactor mit automatisierten Tools und Runbooks." },
      { step: "04", title: "Optimierung", body: "FinOps, reservierte Kapazitäten und kontinuierliche Optimierung nach der Migration." },
    ],
    stats: [
      { value: "40%", label: "Durchschnittliche Kosteneinsparung" },
      { value: "3×", label: "Schnellere Bereitstellungen" },
      { value: "99.99%", label: "Uptime-SLA" },
      { value: "200+", label: "Durchgeführte Migrationen" },
    ],
    technologies: ["AWS", "Azure", "Google Cloud", "Terraform", "Kubernetes", "ArgoCD"],
    faqs: [
      { q: "Wie lange dauert eine Migration?", a: "Typischerweise 8–24 Wochen, abhängig von der Komplexität der Workloads." },
      { q: "Wird es Ausfallzeiten geben?", a: "Wir streben unterbrechungsfreie Umstellungen mit Blue-Green- und Canary-Strategien an." },
    ],
  },

  "ai-machine-learning": {
    icon: "🤖",
    tagline: "Von Proof-of-Concept bis produktionsreifer KI — benutzerdefinierte Modelle, LLM-Apps und integrierte Governance.",
    overview: "Wir entwerfen, entwickeln und operationalisieren KI-Systeme, die messbare Geschäftsergebnisse liefern, nicht nur Demos.",
    benefits: [
      { title: "Schnellere Erkenntnisse", body: "Echtzeit-ML-Inferenz ersetzt manuelle Analysen." },
      { title: "Automatisierung", body: "Intelligente Workflows reduzieren den operativen Aufwand." },
      { title: "Governed AI", body: "Audit-Protokolle, Erklärbarkeit und Bias-Kontrollen integriert." },
      { title: "LLM-Apps", body: "RAG-Pipelines, Copiloten und Agenten basierend auf Ihren Daten." },
    ],
    process: [
      { step: "01", title: "Use-Case-Definition", body: "Identifizieren Sie hochwertige ML-Möglichkeiten mit ROI-Schätzungen." },
      { step: "02", title: "Datenbereitschaft", body: "Bewerten, bereinigen und pipelineisieren Sie Daten für das Modelltraining." },
      { step: "03", title: "Modellentwicklung", body: "Trainieren, bewerten und optimieren Sie Modelle mit MLflow-Tracking." },
      { step: "04", title: "MLOps", body: "CI/CD für Modelle, Drift-Überwachung und Retraining-Pipelines." },
    ],
    stats: [
      { value: "90d", label: "Von PoC zur Produktion" },
      { value: "35%", label: "Durchschnittliche Effizienzsteigerung" },
      { value: "100+", label: "Modelle in Produktion" },
      { value: "99%", label: "Modellverfügbarkeit" },
    ],
    technologies: ["Python", "PyTorch", "OpenAI", "LangChain", "MLflow", "Databricks"],
    faqs: [
      { q: "Arbeiten Sie mit unseren bestehenden Daten?", a: "Ja — wir bewerten zuerst Ihre Datenlandschaft und erstellen modellfähige Pipelines." },
      { q: "Wie handhaben Sie KI-Governance?", a: "Jedes Modell wird mit Erklärbarkeitsbericht, Bias-Audit und Monitoring-Dashboard geliefert." },
    ],
  
},
"application-development": {
  icon: "💻",
  tagline: "Web-, Mobile- und Enterprise-Anwendungen für Skalierung und langfristige Zuverlässigkeit.",
  overview: "Wir bauen produktionsreife Anwendungen mit modernen Stacks — Performance, Barrierefreiheit und Sicherheit als erste Priorität.",
  benefits: [
    { title: "Markteinführungszeit", body: "Iterative Sprints liefern alle zwei Wochen lauffähige Software." },
    { title: "Skalierbare Architektur", body: "Für 10-faches Wachstum ausgelegt — ohne Neuschreiben." },
    { title: "Vollständiges Eigentum", body: "100 % Code, Docs und IP gehören ab Tag eins Ihnen." },
    { title: "Qualität", body: "Automatisierte Tests, Accessibility-Audits und Performance-Budgets." },
  ],
  process: [
    { step: "01", title: "Discovery", body: "User Research, Journey Mapping und technisches Scoping." },
    { step: "02", title: "Design", body: "Figma-Prototypen vor der ersten Codezeile mit echten Nutzern validiert." },
    { step: "03", title: "Build", body: "Zwei-Wochen-Sprints, CI/CD, automatisiertes QA und wöchentliche Demos." },
    { step: "04", title: "Launch", body: "Lasttest, Sicherheitsreview und Go-live-Runbook." },
  ],
  stats: [
    { value: "8wk", label: "Ø MVP-Timeline" },
    { value: "99%", label: "Termingerechte Lieferung" },
    { value: "4.9★", label: "Kundenbewertung" },
    { value: "300+", label: "Ausgelieferte Apps" },
  ],
  technologies: ["React", "Next.js", "React Native", "Node.js", "TypeScript", "PostgreSQL"],
  faqs: [
    { q: "Entwickeln Sie auch Mobile Apps?", a: "Ja — iOS, Android und Cross-Platform mit React Native oder Flutter." },
    { q: "Wem gehört der Code?", a: "Ihnen — 100 % IP-Transfer, kein Lock-in." },
  ],
},
"managed-it-services": {
  icon: "🛡️",
  tagline: "24/7-Betrieb für Infrastruktur, Anwendungen und Sicherheit — global geliefert.",
  overview: "Wir agieren als Ihr erweitertes Engineering-Team und halten Systeme rund um die Uhr verfügbar, sicher und kosteneffizient.",
  benefits: [
    { title: "Always On", body: "24/7 NOC und SOC mit unter 15-minütigen Response-SLAs." },
    { title: "Kosteneffizient", body: "Shared-SRE-Modell kostet 60 % weniger als equivalent In-house." },
    { title: "Proaktiv", body: "AIOps erkennt und behebt Probleme, bevor Nutzer sie merken." },
    { title: "Compliant", body: "SOC 2, ISO 27001 ausgerichteter Betrieb mit monatlichem Reporting." },
  ],
  process: [
    { step: "01", title: "Onboarding", body: "Inventarisierung, Runbook-Erstellung und Monitoring-Setup in Woche eins." },
    { step: "02", title: "Baseline", body: "30-Tage-Performance- und Kosten-Baseline mit Quick-Win-Fixes." },
    { step: "03", title: "Steady State", body: "24/7 Monitoring, Incident Response und Change Management." },
    { step: "04", title: "Optimieren", body: "Monatliche Reviews mit Kosten-, Zuverlässigkeits- und Sicherheitsverbesserungen." },
  ],
  stats: [
    { value: "99.99%", label: "Uptime geliefert" },
    { value: "<15min", label: "Response-SLA" },
    { value: "60%", label: "Kosten vs. In-house" },
    { value: "24/7", label: "Globale Abdeckung" },
  ],
  technologies: ["Datadog", "PagerDuty", "Terraform", "AWS", "Azure", "Kubernetes"],
  faqs: [
    { q: "Wie schnell reagieren Sie auf Incidents?", a: "P1-Incidents werden innerhalb von 5 Minuten bestätigt und in 15 Minuten behoben." },
    { q: "Können Sie unsere bestehenden Cloud-Accounts übernehmen?", a: "Ja — wir onboarden in Ihre Accounts und arbeiten neben Ihrem Team." },
  ],
},
"consulting-advisory": {
  icon: "🎯",
  tagline: "Unabhängige Technologiestrategie, Architektur-Reviews und CIO-Advisory von erfahrenen Praktikern.",
  overview: "Wir liefern objektive, herstellerunabhängige Guidance, damit Führungskräfte schneller bessere Technologieentscheidungen treffen.",
  benefits: [
    { title: "Objektivität", body: "Keine Vendor-Kickbacks — Empfehlungen ausschließlich in Ihrem Interesse." },
    { title: "Senior-Zugang", body: "Direkter Zugang zu Architekten und CTOs, keine Account Manager." },
    { title: "Geschwindigkeit", body: "Strukturierte Reviews liefern Ergebnisse in Tagen, nicht Monaten." },
    { title: "Umsetzbar", body: "Jedes Engagement endet mit priorisierter Roadmap und Entscheidungslog." },
  ],
  process: [
    { step: "01", title: "Intake", body: "Scope, Fragen und Erfolgskriterien in einem 2-stündigen Kickoff." },
    { step: "02", title: "Assessment", body: "Interviews, Dokumentenprüfung und Architekturanalyse." },
    { step: "03", title: "Findings", body: "Strukturierter Bericht mit bewerteten Risiken, Lücken und Chancen." },
    { step: "04", title: "Roadmap", body: "Priorisierte Empfehlungen mit Aufwand, Kosten und Ownership." },
  ],
  stats: [
    { value: "5d", label: "Ø Review-Turnaround" },
    { value: "100%", label: "Senior-geführt" },
    { value: "50+", label: "CIO-Engagements" },
    { value: "4.9★", label: "Kundenbewertung" },
  ],
  technologies: ["TOGAF", "AWS Well-Architected", "NIST CSF", "DORA", "ITIL", "OKRs"],
  faqs: [
    { q: "Ist die Beratung herstellerneutral?", a: "Ja — wir haben keine Referral-Vereinbarungen." },
    { q: "Können Sie mit unseren bestehenden Vendoren arbeiten?", a: "Absolut — wir bewerten Ihren aktuellen Stack objektiv." },
  ],
},

},
extraSections: {
  freeAdviceChip: "Kostenlos für Gründer & Inhaber",
  freeAdviceTitle: "Kostenlose Unternehmensberatung. Ohne Verpflichtung, ohne Haken.",
  freeAdviceSub: "Buchen Sie ein 30-minütiges Strategiegespräch mit MHTECHIN-Beratern. Wir helfen Gründern und KMU-Inhabern kostenlos bei Ideenvalidierung, Tech-Stack-Wahl, Registrierung, Steuern und Go-to-Market.",
  freeAdviceBookBtn: "Kostenloses Gespräch buchen",
  freeAdviceSeeBtn: "Was wir abdecken",
  freeAdviceItems: [
    { t: "Ideenvalidierung", d: "Problem-Solution-Klarheit in 30 Min." },
    { t: "PMF-Guidance", d: "Signale testen, bevor Sie skalieren." },
    { t: "Registrierung & Steuern", d: "Entity, USt., Compliance-Grundlagen." },
    { t: "Tech-Roadmap", d: "Stack, Budget, Einstellungsprioritäten." },
  ],
  researchTitle: "Forschungsbasierte Ergebnisse",
  researchProductsTitle: "Produktwirkung, gemessen",
  researchNote: "Unabhängige Benchmarks aus Cloud-, KI-, Daten- und Sicherheitsprojekten (2023–2025).",
  researchStats: [
    { v: "3,4×", l: "Schnellere Lieferung vs. Branchenstandard" },
    { v: "62 %", l: "Durchschnittliche Cloud-Kostenreduktion" },
    { v: "99,99 %", l: "Produktions-Uptime" },
    { v: "120+", l: "Enterprise-Rollouts weltweit" },
  ],
  colorSpectrumKicker: "Warum MHTECHIN",
  colorSpectrumTitle: "Engineering-Exzellenz mit gründerfreundlichem Ansatz",
  colorSpectrumItems: [
    { t: "Outcome-first", d: "Wir vereinbaren KPIs, nicht nur Deliverables." },
    { t: "Senior-geführt", d: "Keine Junior-only-Pods. Architekten ab Tag eins." },
    { t: "Cloud-nativ", d: "Multi-Cloud: AWS, GCP, Azure, On-Prem, Hybrid." },
    { t: "KI-ready Data", d: "Von Schemas zu LLM-Pipelines — KI ohne Hype." },
    { t: "Security by Design", d: "Zero-Trust, SAST/DAST, SBOMs standardmäßig." },
    { t: "Globale Lieferung", d: "24/5 Squads in APAC, EU und Amerika." },
  ],
  productsSpectrumKicker: "Produktfähigkeiten",
  productsSpectrumTitle: "Modulare Bausteine. Komposierbare Plattformen.",
  productsSpectrumItems: [
    { t: "API-first", d: "Jedes Produkt bietet stabile, versionierte REST + GraphQL APIs." },
    { t: "Multi-Tenant", d: "Zeilenisolierung, SSO, mandantenspezifische Audits und Quoten." },
    { t: "Observability", d: "OpenTelemetry Traces, Metriken und Logs von Anfang an." },
    { t: "Erweiterbar", d: "Plugin-Modell + Webhooks für interne Integrationen." },
    { t: "Regional", d: "Datenresidenz wählen: APAC, EU, Amerika, Indien." },
    { t: "Skalierbare Preise", d: "Klein anfangen, vorhersehbar wachsen. Keine Überraschungen." },
  ],
  comparisonTitle: "MHTECHIN-Produkte im Vergleich",
  comparisonHeaders: { capability: "Fähigkeit", us: "MHTECHIN", them: "Typischer Anbieter" },
  comparisonRows: [
    { feat: "Zeit bis zum Mehrwert", us: "Produktion in 4–8 Wochen", them: "Quartale" },
    { feat: "Anpassbarkeit", us: "Quelloffene Erweiterungen", them: "Begrenzte Konfiguration" },
    { feat: "Datenresidenz", us: "Region pro Workload wählbar", them: "Einzelne Region" },
    { feat: "Senior-Support", us: "Architekten auf Abruf", them: "Gestufte Tickets" },
    { feat: "KI-Integration", us: "Nativ, governance-fähig", them: "Add-on" },
  ],
  useCasesTitle: "Use Cases, für die Gründer & Unternehmen uns wählen",
  useCases: [
    { tag: "KI", t: "LLM-Copilots für Ops-Teams", d: "Assistenten auf Basis Ihrer Daten mit Audit-Trails und RBAC." },
    { tag: "Cloud", t: "Multi-Region-Modernisierung", d: "Legacy-Monolithen in resiliente, beobachtbare Services überführen." },
    { tag: "Daten", t: "Einheitliche Analyseplattform", d: "Lakehouse, Semantic Layer, BI — eine Quelle der Wahrheit." },
    { tag: "Sicherheit", t: "Zero-Trust-Rollout", d: "Identitäts-, Netzwerk- und Workload-Segmentierung nach ISO 27001." },
    { tag: "Gründer", t: "MVP bis PMF", d: "Glaubwürdiges MVP in 6–10 Wochen, PMF messen, schnell iterieren." },
    { tag: "KMU", t: "Digital Ops im Paket", d: "ERP, CRM, Zahlungen und Dashboards sauber verbunden." },
  ],
  productsUseCasesTitle: "Was Teams mit unseren Produkten bauen",
  productsUseCases: [
    { tag: "Cloud OS", t: "Interne Entwicklerplattform", d: "Self-Service-Umgebungen, Golden Paths, FinOps-Kontrollen." },
    { tag: "Analytics", t: "Führungskräfte-Insights", d: "Live-KPI-Dashboards mit Drill-down und Alarmen." },
    { tag: "AI Studio", t: "Agent-Orchestrierung", d: "Tools, Memory, Evaluierung, Guardrails zusammenstellen." },
    { tag: "Sicherheit", t: "Zero-Trust-Gateway", d: "Identitätsbewusster Proxy mit mTLS und Audit." },
    { tag: "IoT Edge", t: "Flottentelemetrie", d: "Millionen von Geräten, niedriglatente Edge-Verarbeitung." },
    { tag: "Consumer", t: "Marken-Mobile-Apps", d: "Cross-Platform, Offline-first, mit Wachstumsanalytik." },
  ],
  logosTitle: "Practices, die wir liefern",
  quickContactTitle: "Fragen? Stellen Sie sie einem MHTECHIN-Experten.",
  quickContactSub: "Antwort innerhalb eines Werktags. Kein Verkaufsdruck — klare Antworten von Senior Engineers.",
  quickContactBtn: "Kontakt",
  quickContactFounderBtn: "Kostenlose Gründerberatung",
  quickContactItems: [
    { t: "Globale Lieferung", d: "Hubs in APAC, EU, Amerika." },
    { t: "Ergebnisorientiert", d: "KPIs vor Kickoff vereinbart." },
    { t: "Enterprise-Sicherheit", d: "ISO-konformes Engineering." },
    { t: "Senior-Teams", d: "Keine Junior-only-Squads." },
  ],
  journeyKicker: "Unsere Geschichte",
  journeyTitle: "Vom kleinen Studio zum globalen Technologiepartner",
  journeySteps: [
    { y: "2023", t: "Gründung", d: "MHTECHIN startete mit einer Vision: Enterprise-Engineering für jedes ambitionierte Unternehmen." },
    { y: "2024", t: "Cloud-Praxis", d: "Dedizierte Cloud & DevOps-Praxis gestartet. Erste 10 Produktiv-Deployments." },
    { y: "2024", t: "Globale Expansion", d: "Delivery-Hubs auf 3 Kontinenten eröffnet. 50 Enterprise-Kunden überschritten." },
    { y: "2025", t: "KI & Daten", d: "Datenplattform und ML-Engineering-Teams aufgebaut. Erste LLM-Rollouts." },
    { y: "2025", t: "Sicherheit & Vertrauen", d: "ISO-konforme Sicherheitspraxis. Zero-Trust-Frameworks für regulierte Kunden." },
    { y: "2026", t: "Gründerprogramm", d: "Kostenlose Beratung für Gründer & KMU. Validierung → PMF → Registrierung." },
  ],
  consent: {
    title: "Datenschutzhinweis",
    description: "Wir verwenden Technologien wie Cookies, um Geräteinformationen zu speichern und/oder darauf zuzugreifen. Die Zustimmung zu diesen Technologien ermöglicht es uns, Daten wie das Surfverhalten oder eindeutige IDs auf dieser Website zu verarbeiten. Wir respektieren Ihre Privatsphäre gemäß der Datenschutz-Grundverordnung (DSGVO) und dem indischen Digital Personal Data Protection (DPDP) Act.",
    accept: "Akzeptieren",
    decline: "Ablehnen",
  },
},

};

const fr: Dict = {
  nav: {
    home: "Accueil", products: "Produits", services: "Services", industries: "Industries", about: "À propos", contact: "Contact", business: "Business", freelancing: "Freelance",
    contactSales: "Contacter les ventes", language: "Langue", exploreAll: "Tout explorer →",
    productsHeading: "Nos produits", productsTagline: "Plateformes de niveau entreprise",
    productsBlurb: "Solutions modulaires conçues pour les entreprises mondiales de tous secteurs.",
    servicesHeading: "Nos services", servicesTagline: "L'expertise qui passe à l'échelle",
    servicesBlurb: "Services stratégiques pour accélérer votre transformation digitale.",
  },
  home: {
    pill: "MHTECHIN · Technologie d'entreprise · Livraison mondiale",
    h1: "MHTECHIN — La colonne vertébrale numérique des entreprises modernes.",
    tagline: "Penser, Planifier & Exécuter.",
    intro: "MHTECHIN est une société mondiale de technologie d'entreprise qui conçoit, construit et exploite des solutions cloud, IA, données et cybersécurité critiques pour les organisations qui ne peuvent pas se permettre de s'arrêter.",
    ctaTalk: "Parler à un expert", ctaExplore: "Découvrir la plateforme",
    statsHeading: "En chiffres",
    pillarsKicker: "Ce que nous construisons", pillarsTitle: "Une plateforme complète pour l'entreprise moderne.",
    pillarsBlurb: "Six domaines de capacités intégrés, conçus pour fonctionner ensemble — ou étendre vos systèmes existants.",
    ctaBandTitle: "Prêt à moderniser votre stack ?",
    ctaBandSub: "Réservez une revue d'architecture de 30 minutes avec un ingénieur solutions MHTECHIN.",
    ctaBandBtn: "Réserver un créneau",
    trustKicker: "Pourquoi MHTECHIN", trustTitle: "Conçu pour l'échelle. Certifié pour la confiance.",
    trustBlurb: "Nous opérons aux standards exigés par les secteurs régulés — finance, santé, gouvernement et industrie mondiale.",
    trustItems: [
      "Opérations certifiées ISO 27001 et SOC 2 Type II",
      "Traitement des données conforme RGPD, HIPAA, PCI-DSS",
      "Architectes solutions dédiés à chaque engagement",
      "Modèles commerciaux basés sur les résultats",
    ],
    pillars: [
      { title: "Plateforme Cloud", desc: "Infrastructure cloud multi-régions évolutive avec SLA de 99,99 %." },
      { title: "IA & Machine Learning", desc: "Entraînez, déployez et gouvernez des modèles IA avec des outils d'entreprise." },
      { title: "Analyse de données", desc: "Insights en temps réel depuis des data warehouses à l'échelle pétaoctet." },
      { title: "Cybersécurité", desc: "Architecture zero-trust, détection des menaces et conformité intégrées." },
      { title: "Automatisation DevOps", desc: "Optimisez pipelines, releases et infrastructure-as-code." },
      { title: "Livraison mondiale", desc: "Équipes d'ingénierie dans 12 pays, support entreprise 24/7." },
    ],
    stats: [
      { v: "500+", l: "Clients entreprise" },
      { v: "12", l: "Bureaux mondiaux" },
      { v: "99,99 %", l: "Disponibilité plateforme" },
      { v: "24/7", l: "Support critique" },
    ],
    faq: [
      { q: "Qu'est-ce que MHTECHIN ?", a: "MHTECHIN est une société mondiale de technologie d'entreprise qui conçoit, construit et exploite des solutions cloud, IA, analyse de données et cybersécurité pour les organisations du monde entier." },
      { q: "Quels services propose MHTECHIN ?", a: "MHTECHIN propose la transformation digitale, la migration cloud, l'IA et le ML, le développement d'applications, les services IT gérés et le conseil stratégique." },
      { q: "Quel est le slogan de MHTECHIN ?", a: "Le slogan de MHTECHIN est « Think, Plan & Execute » — reflétant notre approche disciplinée de la livraison technologique." },
    ],
    solutions: {
      kicker: "Solutions", title: "Les résultats que nous livrons dans l'entreprise.",
      blurb: "Des blueprints pré-conçus combinant plateforme, services et accélérateurs.",
      items: [
        { name: "Adoption de l'IA d'entreprise", desc: "Du workshop de découverte aux apps LLM en production en 90 jours." },
        { name: "Optimisation des coûts cloud", desc: "Réduisez la dépense cloud de 25 à 40 % avec l'automatisation FinOps." },
        { name: "Modernisation zero-trust", desc: "Sécurité identity-first sur hybrid et multi-cloud." },
        { name: "Plateforme de données", desc: "Architecture lakehouse qui passe de l'équipe à l'entreprise." },
      ],
    },
    testimonials: {
      kicker: "Voix des clients", title: "Approuvé par les leaders des industries régulées.",
      items: [
        { quote: "MHTECHIN est devenu notre partenaire par défaut pour le cloud et l'IA dès le premier projet.", name: "Sarah Chen", role: "DSI, Global Bank" },
        { quote: "Ils livrent avec la rigueur d'un SI Tier-1 et la vélocité d'une équipe produit.", name: "Daniel Okafor", role: "Chief Architect, MedTech" },
        { quote: "Notre roadmap IA a enfin un moteur d'exécution crédible.", name: "Priya Raman", role: "VP Data, retailer Fortune 500" },
      ],
    },
    partners: {
      kicker: "Écosystème", title: "Certifiés sur chaque cloud et plateforme majeurs.",
      blurb: "Des partenariats profonds gardent notre ingénierie à la pointe.",
      items: ["AWS Advanced", "Microsoft Azure", "Google Cloud", "NVIDIA", "Databricks", "Snowflake", "HashiCorp", "Red Hat"],
    },
    process: {
      kicker: "Notre méthode", title: "Une livraison disciplinée, affinée sur 500+ engagements.",
      items: [
        { name: "Découvrir", desc: "Workshops, évaluations techniques, cartographie des résultats." },
        { name: "Architecturer", desc: "Designs de référence, prototypes et plan chiffré." },
        { name: "Construire", desc: "Ingénierie en pods, démos hebdomadaires, backlog partagé." },
        { name: "Opérer", desc: "SRE 24/7, FinOps et amélioration continue après le go-live." },
      ],
    },
    insights: {
      kicker: "Insights", title: "Recherches et playbooks de nos ingénieurs.", readMore: "Lire l'article →",
      items: [
        { tag: "IA", title: "Du pilote à la production : passer à l'échelle des LLM", desc: "Ce qui distingue les programmes IA qui aboutissent." },
        { tag: "Cloud", title: "L'échelle de maturité FinOps", desc: "Une roadmap pratique vers une dépense cloud prévisible." },
        { tag: "Sécurité", title: "Zero-trust sans tout casser", desc: "Un modèle d'adoption phasé éprouvé en environnement régulé." },
      ],
    },
    newsletter: {
      kicker: "Restez informé", title: "La tech d'entreprise, décodée — chaque mois.",
      sub: "Des briefings cloud, IA, données et sécurité par les Principal Engineers MHTECHIN.",
      placeholder: "Email professionnel", button: "S'abonner",
      note: "Pas de spam. Désinscription à tout moment.",
    },
  },
  products: {
    kicker: "Produits", h1: "Une plateforme. Toutes les couches du stack d'entreprise.",
    sub: "Sept produits modulaires conçus pour fonctionner indépendamment — et brillamment ensemble.",
    tailoredDemo: "Vous voulez une démo sur mesure ?", requestDemo: "Demander une démo",
    // FRENCH
items: [
  {
    slug: "cloud-platform",
    name: "Plateforme Cloud",
    tag: "Infrastructure",
    desc: "Solution d'infrastructure cloud évolutive.",
    bullets: ["Support AWS", "Mise à l’échelle automatique", "Surveillance"],
  },
  {
    slug: "data-analytics-suite",
    name: "Suite d’Analyse de Données",
    tag: "Données",
    desc: "Outils avancés d’analyse et de reporting.",
    bullets: ["Tableaux de bord", "Rapports", "Insights IA"],
  },
  {
    slug: "ai-studio",
    name: "AI Studio",
    tag: "AI / ML",
    desc: "Créer et déployer des applications IA.",
    bullets: ["Modèles ML", "Automatisation", "Prédictions"],
  },
  {
    slug: "cybersecurity-shield",
    name: "Bouclier Cybersécurité",
    tag: "Sécurité",
    desc: "Plateforme de sécurité de niveau entreprise.",
    bullets: ["Détection des menaces", "Chiffrement", "Conformité"],
  },
  {
    slug: "iot-hub",
    name: "Hub IoT",
    tag: "Edge",
    desc: "Connecter et surveiller les appareils IoT.",
    bullets: ["Capteurs", "Données temps réel", "Alertes"],
  },
  {
    slug: "devops-pipeline",
    name: "Pipeline DevOps",
    tag: "Ingénierie",
    desc: "Automatisation CI/CD et déploiement.",
    bullets: ["Intégration Git", "Tests", "Déploiements"],
  },
  {
    slug: "consumer-products",
    name: "Produits Grand Public",
    tag: "Consommateur",
    desc: "Expériences numériques modernes.",
    bullets: ["Applications mobiles", "E-commerce", "Design UX"],
  },
],
  },
  services: {
    kicker: "Services", h1: "Équipes d'experts. Livraison orientée résultats.",
    sub: "Stratégie, ingénierie et opérations — livrées par des spécialistes certifiés dans 12 centres mondiaux.",
    specificChallenge: "Un défi spécifique en tête ?", startConv: "Démarrer une conversation",
    items: [
      { slug: "digital-transformation", name: "Transformation digitale", desc: "Programmes de modernisation de bout en bout : stratégie, technologie et conduite du changement.", items: ["Conception du modèle opérationnel", "Modernisation du legacy", "Conduite du changement"] },
      { slug: "cloud-migration", name: "Migration Cloud", desc: "Planifier, migrer et optimiser les charges sur AWS, Azure et Google Cloud.", items: ["Découverte et évaluation", "Lift-shift-refactor", "Optimisation FinOps"] },
      { slug: "ai-machine-learning", name: "IA & Machine Learning", desc: "Du PoC à la production — modèles sur mesure, applications LLM et gouvernance IA.", items: ["Apps IA générative", "ML prédictif", "MLOps et gouvernance"] },
      { slug: "application-development", name: "Développement d'applications", desc: "Applications web, mobiles et d'entreprise conçues pour l'échelle et la fiabilité.", items: ["Apps React et Native", "Plateformes API", "Commerce headless"] },
      { slug: "managed-it-services", name: "Services IT gérés", desc: "Opérations 24/7 pour infrastructure, applications et sécurité — à l'échelle mondiale.", items: ["NOC et SOC", "SRE à la demande", "Gestion des fournisseurs"] },
      { slug: "consulting-advisory", name: "Conseil & Advisory", desc: "Stratégie technologique indépendante, revues d'architecture et conseil CIO.", items: ["Due diligence tech", "Revues d'architecture", "Sélection fournisseurs"] },
    ],
  },
  industries: {
    kicker: "Industries", h1: "L'expertise sectorielle, intégrée à chaque solution.",
    sub: "Nous apportons une expertise spécifique — réglementation, workflow et économie — à chaque engagement.",
    items: [
      { name: "Services financiers", desc: "Modernisation des cœurs bancaires, plateformes de risque et fraude." },
      { name: "Santé", desc: "Intégrations EHR conformes HIPAA et IA clinique." },
      { name: "Industrie", desc: "Industrie 4.0, maintenance prédictive, convergence OT/IT." },
      { name: "Retail & E-commerce", desc: "Commerce omnicanal et plateformes de données clients." },
      { name: "Secteur public", desc: "Services citoyens sécurisés et cloud souverain." },
      { name: "Logistique", desc: "Visibilité temps réel, optimisation des routes, IoT de flotte." },
      { name: "Éducation", desc: "Plateformes d'apprentissage, analyses et identité pour les institutions." },
      { name: "Énergie & Utilities", desc: "Analyse réseau, surveillance des actifs, reporting de durabilité." },
    ],
  },
  business: {
    kicker: "Business", h1: "De l'idée à l'entreprise immatriculée et investissable.",
    sub: "Services venture de bout en bout pour fondateurs et grands comptes — validation, PMF, TRL, immatriculation et fiscalité sous un même toit.",
    ctaTitle: "Vous lancez quelque chose ?", ctaBtn: "Parler à notre équipe venture",
    items: [
      { name: "Validation d'idée et de marché", desc: "Découverte structurée pour tester la demande, la disposition à payer et l'espace concurrentiel.", bullets: ["Sprints de customer discovery", "Scoring problem-solution fit", "Analyse concurrentielle"] },
      { name: "Product-Market Fit (PMF)", desc: "De la traction initiale à la croissance reproductible avec des signaux PMF mesurables.", bullets: ["Framework de métriques PMF", "Analyse cohorte & rétention", "Expériences GTM"] },
      { name: "Couche TRL (Technology Readiness)", desc: "Plans d'avancement TRL 1–9 pour deep-tech, R&D et hardware.", bullets: ["Évaluation TRL", "Roadmap prototype → pilote", "Alignement subventions & financement"] },
      { name: "Immatriculation d'entreprise", desc: "La bonne structure dans la bonne juridiction — rapide et conforme.", bullets: ["Structuration juridique", "Formalités locales", "Fondateurs & cap-table"] },
      { name: "Fiscalité & Conformité", desc: "Immatriculation, déclarations et conformité continue par des spécialistes certifiés.", bullets: ["TVA / GST / sales tax", "Impôt sur les sociétés", "Conseil prix de transfert"] },
      { name: "Financement & Investor-readiness", desc: "Soyez prêt avec data rooms, modèles et decks de niveau due diligence.", bullets: ["Modélisation financière", "Mise en place data room", "Coaching pitch & narratif"] },
    ],
  },
  freelancing: {
    kicker: "Opportunités de carrière",
    h1: "Freelancing avec MHTECHIN",
    sub: "Rejoignez notre réseau de freelances d'élite. Travaillez sur des projets d'entreprise de pointe dans le cloud, l'IA, la cybersécurité, et plus encore. Missions flexibles, tarifs compétitifs.",
    submitProfile: "Soumettre votre profil",
    searchPlaceholder: "Rechercher par titre, compétence ou mot-clé...",
    noOpportunities: "Aucune opportunité trouvée",
    filterAdjust: "Essayez d'ajuster vos filtres ou termes de recherche.",
    checkBack: "Revenez bientôt — nous publions régulièrement de nouvelles opportunités.",
    applyNow: "Postuler maintenant",
  },
  about: {
    kicker: "À propos", h1: "Une société technologique mondiale pour la nouvelle ère de l'entreprise.",
    sub: "MHTECHIN s'associe aux organisations les plus exigeantes du monde pour bâtir, moderniser et exploiter la technologie critique.",
    storyTitle: "Notre histoire",
    storyBody: "MHTECHIN a été fondée avec une conviction : qu'une grande technologie, construite et exploitée avec discipline, est l'avantage concurrentiel le plus durable. Aujourd'hui, nos équipes livrent à des clients de secteurs régulés sur tous les continents — et la barre ne cesse de monter.",
    numbersTitle: "En chiffres",
    numbers: [["500+", "Clients entreprise"], ["12", "Bureaux mondiaux"], ["2 400+", "Ingénieurs dans le monde"], ["99,99 %", "Disponibilité plateforme"]],
    standTitle: "Ce que nous défendons",
    values: [
      { t: "Excellence d'ingénierie", d: "Le plus haut niveau technique — à chaque commit, chaque release." },
      { t: "Résultats clients", d: "Le succès se mesure aux résultats business que nous générons." },
      { t: "Confiance par défaut", d: "Sécurité, vie privée et conformité conçues dès le premier jour." },
      { t: "Équipes mondiales et inclusives", d: "Talents d'ingénierie dans 12 pays, un standard partagé." },
    ],
  },
  contact: {
    kicker: "Contact", h1: "Bâtissons la suite ensemble.",
    sub: "Parlez-nous de votre initiative — un expert solutions répondra sous un jour ouvré.",
    email: "Email", phone: "Téléphone", hq: "Siège mondial", hqDetail: "12 bureaux · support 24/7",
    formName: "Nom complet", formEmail: "Email professionnel", formCompany: "Entreprise", formRole: "Fonction",
    formHelp: "Comment pouvons-nous aider ?", formHelpPlaceholder: "Parlez-nous de votre projet, calendrier et objectifs.",
    send: "Envoyer le message",
    thanks: "Merci", thanksBody: "Nous avons reçu votre demande — un spécialiste vous contactera rapidement.",
  },
  footer: {
    blurb: "MHTECHIN fournit la technologie d'entreprise — cloud, IA, données et cybersécurité — qui propulse les organisations les plus ambitieuses du monde.",
    productsCol: "Produits", servicesCol: "Services", companyCol: "Société",
    rights: "Tous droits réservés.", tagline: "Conçu pour l'entreprise.",
  },
  seo: {
    homeTitle: "MHTECHIN | Solutions Cloud, IA, Données et Cybersécurité",
    homeDesc: "MHTECHIN — société mondiale de technologie d'entreprise. Solutions cloud, IA, analyse de données et cybersécurité à l'échelle.",
    productsTitle: "Produits — Plateforme d'entreprise MHTECHIN",
    productsDesc: "Découvrez les produits MHTECHIN : Cloud, Analyse, AI Studio, Cybersecurity Shield, IoT Hub, DevOps Pipeline et Produits grand public.",
    servicesTitle: "Services — Transformation digitale et IT géré | MHTECHIN",
    servicesDesc: "Transformation digitale, migration cloud, IA/ML, développement d'applications, IT géré et conseil stratégique.",
    industriesTitle: "Industries — Solutions MHTECHIN par secteur",
    industriesDesc: "MHTECHIN sert la finance, la santé, l'industrie, le retail, le secteur public, la logistique, l'éducation et l'énergie.",
    businessTitle: "Business — Validation, PMF, TRL, Immatriculation & Fiscalité | MHTECHIN",
    businessDesc: "MHTECHIN Business : validation d'idée, PMF, TRL, immatriculation, fiscalité et investor-readiness.",
    aboutTitle: "À propos de MHTECHIN — Société mondiale de technologie d'entreprise",
    aboutDesc: "MHTECHIN bâtit des solutions cloud, IA, données et cybersécurité dans 12 pays.",
    contactTitle: "Contact MHTECHIN — Parlez à un expert solutions d'entreprise",
    contactDesc: "Contactez MHTECHIN. Parlez à notre équipe solutions d'entreprise pour le cloud, l'IA, les données et la cybersécurité.",
  },
productDetail: {
  requestDemo: "Demander une démo",
  allProducts: "Tous les produits",
  productFeatures: "Fonctionnalités",
  overview: "Aperçu",
  keyBenefits: "Avantages clés",
  keyBenefitsSub: "Découvrez comment notre solution génère des résultats mesurables",
  technologies: "Technologies",
  technologiesSub: "Construit sur un stack technologique moderne et éprouvé",
  faq: "Questions fréquentes",
  ctaTitle: "Prêt à explorer nos produits ?",
  ctaSub: "Construisez des plateformes numériques évolutives avec MHTECHIN.",
  contactUs: "Nous contacter",
  statReliability: "Fiabilité", statSupport: "Support",
statIntegrations: "Intégrations", statSecure: "Architecture",
benefitPerfTitle: "Haute performance", benefitPerfBody: "Une architecture optimisée garantit des performances fluides et fiables sous forte charge.",
benefitScaleTitle: "Infrastructure évolutive", benefitScaleBody: "Faites évoluer vos opérations avec des technologies cloud-ready et pérennes.",
benefitSecTitle: "Sécurité d'entreprise", benefitSecBody: "Des protocoles de sécurité avancés protègent les données et l'infrastructure sensibles.",
benefitIntTitle: "Intégration facile", benefitIntBody: "S'intègre parfaitement avec les plateformes, APIs et systèmes tiers existants.",
benefitAnalyticsTitle: "Analytique temps réel", benefitAnalyticsBody: "Obtenez des insights actionnables grâce à des tableaux de bord intelligents.",
benefitSupportTitle: "Support dédié", benefitSupportBody: "Bénéficiez d'une assistance continue de nos équipes de support et de conseil.",
useCasesTitle: "Cas d'usage",useCasesSub: "Voyez comment les équipes de tous secteurs utilisent ce produit",
useCaseAutoTitle: "Automatisation métier", useCaseAutoBody: "Automatisez les workflows répétitifs, améliorez la productivité et réduisez les coûts opérationnels.",
useCaseEngageTitle: "Engagement client", useCaseEngageBody: "Améliorez l'expérience client avec des interfaces modernes et des interactions numériques fluides.",
featureFallback: "Détails des fonctionnalités bientôt disponibles.",overviewBody: "Notre solution est conçue pour aider les entreprises à optimiser leurs opérations, améliorer l'expérience client, renforcer la scalabilité et accélérer la transformation digitale.",
faqCustomTitle: "Le produit est-il personnalisable ?", faqCustomBody: "Oui, la solution peut être adaptée à vos besoins métier et workflows.",
faqDeployTitle: "Proposez-vous un support au déploiement ?", faqDeployBody: "Oui, notre équipe accompagne le déploiement, l'onboarding, l'intégration et la maintenance.",
faqSupportTitle: "Le support technique est-il inclus ?", faqSupportBody: "Nous fournissons une assistance technique dédiée pour toutes les solutions d'entreprise.",
},
serviceDetail: {
  talkToExpert: "Parler à un expert",
  allServices: "Tous les services",
  overview: "Aperçu",
  whatWeDeliver: "Ce que nous livrons",
  keyBenefits: "Avantages clés",
  deliveryProcess: "Processus de livraison",
  technologies: "Technologies utilisées",
  faq: "Questions fréquentes",
  otherServices: "Explorer d'autres services",
  ctaTitle: "Prêt à construire l'avenir ?",
  ctaSub: "Partenaire de MHTECHIN pour moderniser l'infrastructure et accélérer l'innovation.",
  startProject: "Démarrer votre projet",
  browseServices: "Parcourir les services",
},


productDescriptions: {
  "cloud-platform": {
    "AWS Support": "Intégration transparente du cloud AWS avec une infrastructure évolutive et une fiabilité de niveau entreprise.",
    "Auto Scaling": "Ajuste automatiquement les ressources en fonction du trafic et des charges de travail.",
    "Monitoring": "Surveillance de l'infrastructure en temps réel avec alertes et suivi des performances.",
  },
  "data-analytics-suite": {
    "Dashboards": "Tableaux de bord interactifs pour la visualisation en temps réel et la prise de décision.",
    "Reports": "Générez des rapports d’entreprise détaillés avec exportation et analyses personnalisées.",
    "AI Insights": "Analyses alimentées par l’IA pour identifier les modèles, tendances et opportunités.",
  },
  "ai-studio": {
    "ML Models": "Développez, entraînez et déployez des modèles d’apprentissage automatique pour l’automatisation des entreprises.",
    "Automation": "Automatisez les flux de travail répétitifs à l’aide de systèmes IA avancés.",
    "Predictions": "Prédisez les tendances et résultats commerciaux grâce à des prévisions intelligentes.",
  },
  "cybersecurity-shield": {
    "Threat Detection": "Détectez les cybermenaces en temps réel grâce à une surveillance intelligente.",
    "Encryption": "Protégez les données sensibles avec des couches de chiffrement avancées.",
    "Compliance": "Maintenez la conformité du secteur grâce à une gestion automatisée de la sécurité.",
  },
  "iot-hub": {
    "Sensors": "Connectez et gérez des capteurs intelligents pour les systèmes industriels et automatisés.",
    "Real-time Data": "Surveillez instantanément l’activité des appareils avec synchronisation en direct.",
    "Alerts": "Recevez des notifications instantanées pour les événements critiques et problèmes opérationnels.",
  },
  "devops-pipeline": {
    "Git Integration": "S’intègre directement avec Git pour une collaboration et un contrôle de version simplifiés.",
    "Testing": "Les pipelines de test automatisés garantissent la qualité du code et des cycles plus rapides.",
    "Deployments": "Simplifiez les déploiements grâce à des workflows CI/CD sécurisés et évolutifs.",
  },
  "consumer-products": {
    "Mobile Apps": "Applications mobiles modernes conçues pour la performance et des expériences fluides.",
    "E-commerce": "E-commerce évolutif avec paiements sécurisés et gestion des commandes.",
    "UX Design": "Conception centrée utilisateur axée sur l’accessibilité et les interfaces modernes.",
  },
},

serviceExtras: {
  "digital-transformation": {
    icon: "🔄",
    tagline: "Modernisez les opérations, accélérez l’innovation et créez des entreprises numériques prêtes pour l’avenir.",
    overview: "La transformation numérique aide les entreprises à moderniser leurs systèmes, automatiser les workflows, améliorer l’expérience client et évoluer plus rapidement.",
    benefits: [
      { title: "Agilité Métier", body: "Permet une prise de décision plus rapide et une meilleure adaptation aux marchés changeants." },
      { title: "Optimisation des Coûts", body: "Réduisez les coûts d’infrastructure et d’exploitation grâce à l’automatisation." },
      { title: "Expérience Client", body: "Offrez des parcours clients fluides avec des applications modernes." },
      { title: "Décisions Basées sur les Données", body: "Utilisez des analyses centralisées pour une meilleure intelligence d’affaires." },
    ],
    process: [
      { step: "01", title: "Évaluation", body: "Analysez les systèmes, workflows et exigences métier." },
      { step: "02", title: "Planification", body: "Créez une feuille de route évolutive pour la transformation numérique." },
      { step: "03", title: "Implémentation", body: "Déployez des solutions d’entreprise cloud-native et automatisées." },
      { step: "04", title: "Optimisation", body: "Améliorez continuellement les performances et l’efficacité." },
    ],
    stats: [
      { value: "60%", label: "Opérations Plus Rapides" },
      { value: "40%", label: "Coûts Réduits" },
      { value: "500+", label: "Projets Livrés" },
      { value: "99%", label: "Satisfaction Client" },
    ],
    technologies: ["React", "Node.js", "AWS", "Azure", "Python", "Kubernetes"],
    faqs: [
      { q: "Qu’est-ce que la transformation numérique ?", a: "Le processus de modernisation des opérations grâce aux technologies numériques." },
      { q: "Les systèmes hérités peuvent-ils être modernisés ?", a: "Oui, nous modernisons les anciens systèmes en solutions cloud-native évolutives." },
    ],
  },

  "cloud-migration": {
    icon: "☁️",
    tagline: "Travaillez plus vite, dépensez moins et opérez en toute confiance sur AWS, Azure et Google Cloud.",
    overview: "Nous planifions, migrons et optimisons vos charges de travail vers le cloud avec des bascules sans interruption et des contrôles de coûts intégrés.",
    benefits: [
      { title: "Livraison Plus Rapide", body: "Le CI/CD cloud-native réduit les cycles de publication de plusieurs semaines à quelques heures." },
      { title: "Contrôle des Coûts", body: "L’automatisation FinOps élimine le gaspillage et optimise les dépenses." },
      { title: "Résilience", body: "Basculement multi-région et SLA de disponibilité de 99,99 %." },
      { title: "Sécurité", body: "Une approche Zero-Trust intégrée dès le premier jour." },
    ],
    process: [
      { step: "01", title: "Découverte", body: "Inventoriez les charges de travail, cartographiez les dépendances et évaluez la complexité de migration." },
      { step: "02", title: "Planification des Vagues", body: "Regroupez les charges de travail en vagues de migration selon les risques." },
      { step: "03", title: "Migration", body: "Lift-shift-refactor avec outils automatisés et runbooks." },
      { step: "04", title: "Optimisation", body: "FinOps, capacités réservées et optimisation continue après migration." },
    ],
    stats: [
      { value: "40%", label: "Économie Moyenne" },
      { value: "3×", label: "Déploiements Plus Rapides" },
      { value: "99.99%", label: "SLA de Disponibilité" },
      { value: "200+", label: "Migrations Réalisées" },
    ],
    technologies: ["AWS", "Azure", "Google Cloud", "Terraform", "Kubernetes", "ArgoCD"],
    faqs: [
      { q: "Combien de temps dure une migration ?", a: "Généralement entre 8 et 24 semaines selon la complexité des charges de travail." },
      { q: "Y aura-t-il des interruptions ?", a: "Nous visons des bascules sans interruption grâce aux stratégies blue-green et canary." },
    ],
  },

  "ai-machine-learning": {
    icon: "🤖",
    tagline: "Du proof-of-concept à l’IA en production — modèles personnalisés, applications LLM et gouvernance intégrée.",
    overview: "Nous concevons, développons et opérationnalisons des systèmes IA offrant des résultats métier mesurables, pas seulement des démonstrations.",
    benefits: [
      { title: "Insights Plus Rapides", body: "L’inférence ML en temps réel remplace l’analyse manuelle." },
      { title: "Automatisation", body: "Les workflows intelligents réduisent les charges opérationnelles." },
      { title: "IA Gouvernée", body: "Traçabilité, explicabilité et contrôles des biais intégrés." },
      { title: "Applications LLM", body: "Pipelines RAG, copilotes et agents basés sur vos données." },
    ],
    process: [
      { step: "01", title: "Définition des Cas d’Usage", body: "Identifiez les opportunités ML à forte valeur avec estimation du ROI." },
      { step: "02", title: "Préparation des Données", body: "Évaluez, nettoyez et pipelinez les données pour l’entraînement." },
      { step: "03", title: "Développement du Modèle", body: "Entraînez, évaluez et améliorez les modèles avec suivi MLflow." },
      { step: "04", title: "MLOps", body: "CI/CD pour les modèles, surveillance de dérive et pipelines de réentraînement." },
    ],
    stats: [
      { value: "90d", label: "Du PoC à la Production" },
      { value: "35%", label: "Gain Moyen d’Efficacité" },
      { value: "100+", label: "Modèles en Production" },
      { value: "99%", label: "Disponibilité des Modèles" },
    ],
    technologies: ["Python", "PyTorch", "OpenAI", "LangChain", "MLflow", "Databricks"],
    faqs: [
      { q: "Travaillez-vous avec nos données existantes ?", a: "Oui — nous évaluons d’abord votre environnement de données et construisons des pipelines adaptés aux modèles." },
      { q: "Comment gérez-vous la gouvernance IA ?", a: "Chaque modèle est livré avec rapport d’explicabilité, audit des biais et tableau de bord de surveillance." },
    ],
  },

"application-development": {
  icon: "💻",
  tagline: "Applications web, mobiles et d'entreprise pour l'échelle et la fiabilité à long terme.",
  overview: "Nous construisons des applications de qualité production avec des stacks modernes — performance, accessibilité et sécurité en priorité.",
  benefits: [
    { title: "Rapidité de mise sur le marché", body: "Des sprints itératifs livrent des logiciels fonctionnels toutes les deux semaines." },
    { title: "Architecture évolutive", body: "Conçu pour une croissance 10× sans réécriture." },
    { title: "Propriété totale", body: "100 % du code, des docs et de l'IP vous appartient dès le premier jour." },
    { title: "Qualité", body: "Tests automatisés, audits d'accessibilité et budgets de performance." },
  ],
  process: [
    { step: "01", title: "Découverte", body: "Recherche utilisateur, cartographie des parcours et cadrage technique." },
    { step: "02", title: "Design", body: "Prototypes Figma validés avec de vrais utilisateurs avant la première ligne de code." },
    { step: "03", title: "Construction", body: "Sprints de deux semaines, CI/CD, QA automatisé et démos hebdomadaires." },
    { step: "04", title: "Lancement", body: "Test de charge, revue sécurité et runbook de mise en production." },
  ],
  stats: [
    { value: "8wk", label: "Délai MVP moyen" },
    { value: "99%", label: "Livraison dans les délais" },
    { value: "4.9★", label: "Note clients" },
    { value: "300+", label: "Apps livrées" },
  ],
  technologies: ["React", "Next.js", "React Native", "Node.js", "TypeScript", "PostgreSQL"],
  faqs: [
    { q: "Développez-vous des apps mobiles ?", a: "Oui — iOS, Android et cross-platform avec React Native ou Flutter." },
    { q: "À qui appartient le code ?", a: "À vous — transfert IP à 100 %, sans lock-in." },
  ],
},
"managed-it-services": {
  icon: "🛡️",
  tagline: "Opérations 24/7 pour infrastructure, applications et sécurité — livrées mondialement.",
  overview: "Nous agissons comme votre équipe d'ingénierie étendue, maintenant systèmes disponibles, sécurisés et optimisés 24h/24.",
  benefits: [
    { title: "Toujours disponible", body: "NOC et SOC 24/7 avec SLA de réponse sous 15 minutes." },
    { title: "Économique", body: "Le modèle SRE partagé coûte 60 % de moins qu'une équipe interne équivalente." },
    { title: "Proactif", body: "L'AIOps détecte et résout les problèmes avant que les utilisateurs ne les remarquent." },
    { title: "Conforme", body: "Opérations alignées SOC 2, ISO 27001 avec reporting mensuel." },
  ],
  process: [
    { step: "01", title: "Onboarding", body: "Inventaire, création des runbooks et mise en place du monitoring en semaine 1." },
    { step: "02", title: "Baseline", body: "Baseline performance et coûts sur 30 jours avec corrections rapides." },
    { step: "03", title: "Steady State", body: "Monitoring 24/7, gestion des incidents et des changements." },
    { step: "04", title: "Optimiser", body: "Revues mensuelles avec améliorations coûts, fiabilité et sécurité." },
  ],
  stats: [
    { value: "99.99%", label: "Uptime livré" },
    { value: "<15min", label: "SLA de réponse" },
    { value: "60%", label: "Coût vs interne" },
    { value: "24/7", label: "Couverture mondiale" },
  ],
  technologies: ["Datadog", "PagerDuty", "Terraform", "AWS", "Azure", "Kubernetes"],
  faqs: [
    { q: "Quel est votre délai de réponse aux incidents ?", a: "Les incidents P1 sont pris en charge en 5 minutes et résolus en 15." },
    { q: "Pouvez-vous gérer nos comptes cloud existants ?", a: "Oui — nous onboardons sur vos comptes et opérons aux côtés de votre équipe." },
  ],
},
"consulting-advisory": {
  icon: "🎯",
  tagline: "Stratégie technologique indépendante, revues d'architecture et conseil CIO par des praticiens seniors.",
  overview: "Nous fournissons des conseils objectifs et neutres pour aider les directions à prendre de meilleures décisions technologiques plus rapidement.",
  benefits: [
    { title: "Objectivité", body: "Aucun accord de référencement — recommandations purement dans votre intérêt." },
    { title: "Accès senior", body: "Accès direct aux architectes et CTOs, pas aux account managers." },
    { title: "Rapidité", body: "Les revues structurées livrent les résultats en jours, pas en mois." },
    { title: "Actionnable", body: "Chaque engagement se termine par une roadmap priorisée et un journal de décisions." },
  ],
  process: [
    { step: "01", title: "Intake", body: "Définir le périmètre, les questions et les critères de succès lors d'un kickoff de 2h." },
    { step: "02", title: "Évaluation", body: "Interviews, revue documentaire et analyse d'architecture." },
    { step: "03", title: "Résultats", body: "Rapport structuré avec risques, lacunes et opportunités notés." },
    { step: "04", title: "Roadmap", body: "Recommandations priorisées avec effort, coût et ownership." },
  ],
  stats: [
    { value: "5d", label: "Délai moyen de revue" },
    { value: "100%", label: "Piloté par des seniors" },
    { value: "50+", label: "Engagements CIO" },
    { value: "4.9★", label: "Note clients" },
  ],
  technologies: ["TOGAF", "AWS Well-Architected", "NIST CSF", "DORA", "ITIL", "OKRs"],
  faqs: [
    { q: "Le conseil est-il neutre vis-à-vis des fournisseurs ?", a: "Oui — nous n'avons aucun accord de référencement." },
    { q: "Pouvez-vous travailler avec nos fournisseurs existants ?", a: "Absolument — nous évaluons votre stack actuel objectivement." },
  ],
},
},
extraSections: {
  freeAdviceChip: "Gratuit pour les fondateurs & propriétaires",
  freeAdviceTitle: "Conseils business gratuits. Sans engagement, sans conditions.",
  freeAdviceSub: "Réservez un appel stratégique de 30 minutes avec les conseillers MHTECHIN. Nous aidons fondateurs et PME à valider des idées, choisir la bonne stack, gérer immatriculation, fiscalité et go-to-market — gratuitement.",
  freeAdviceBookBtn: "Réserver un appel gratuit",
  freeAdviceSeeBtn: "Ce que nous couvrons",
  freeAdviceItems: [
    { t: "Validation d'idée", d: "Clarté problem-solution en 30 min." },
    { t: "Guidance PMF", d: "Tester les signaux avant de scaler." },
    { t: "Immatriculation & fiscalité", d: "Entité, TVA, bases de conformité." },
    { t: "Roadmap tech", d: "Stack, budget, priorités de recrutement." },
  ],
  researchTitle: "Résultats appuyés par la recherche",
  researchProductsTitle: "Impact produit, mesuré",
  researchNote: "Benchmarks indépendants sur des projets cloud, IA, data et sécurité (2023–2025).",
  researchStats: [
    { v: "3,4×", l: "Livraison plus rapide vs. la moyenne" },
    { v: "62 %", l: "Réduction moyenne des coûts cloud" },
    { v: "99,99 %", l: "Disponibilité en production" },
    { v: "120+", l: "Déploiements enterprise dans le monde" },
  ],
  colorSpectrumKicker: "Pourquoi MHTECHIN",
  colorSpectrumTitle: "Excellence d'ingénierie avec une approche fondateur-friendly",
  colorSpectrumItems: [
    { t: "Résultats d'abord", d: "On convient des KPIs, pas seulement des livrables." },
    { t: "Piloté par des seniors", d: "Pas de pods junior-only. Architectes présents dès J1." },
    { t: "Cloud-native", d: "Multi-cloud : AWS, GCP, Azure, on-prem et hybride." },
    { t: "Data prête pour l'IA", d: "De schémas aux pipelines LLM — IA en prod sans le battage." },
    { t: "Sécurité by design", d: "Zero-trust, SAST/DAST, SBOMs intégrés." },
    { t: "Livraison mondiale", d: "Squads 24/5 en APAC, EU et Amériques." },
  ],
  productsSpectrumKicker: "Capacités produit",
  productsSpectrumTitle: "Blocs modulaires. Plateformes composables.",
  productsSpectrumItems: [
    { t: "API-first", d: "Chaque produit expose des APIs REST + GraphQL stables et versionnées." },
    { t: "Multi-tenant", d: "Isolation au niveau ligne, SSO, audit et quotas par tenant." },
    { t: "Observabilité", d: "Traces, métriques et logs OpenTelemetry natifs." },
    { t: "Extensible", d: "Modèle plugin + webhooks pour vos intégrations internes." },
    { t: "Régional", d: "Choisissez la résidence des données : APAC, EU, Amériques, Inde." },
    { t: "Tarification scalable", d: "Démarrez petit, croissez de façon prévisible. Pas de dépassement surprise." },
  ],
  comparisonTitle: "Comparaison des produits MHTECHIN",
  comparisonHeaders: { capability: "Capacité", us: "MHTECHIN", them: "Fournisseur typique" },
  comparisonRows: [
    { feat: "Délai de mise en valeur", us: "Production en 4–8 semaines", them: "Des trimestres" },
    { feat: "Personnalisation", us: "Extensions à source disponible", them: "Config limitée" },
    { feat: "Résidence des données", us: "Région par workload au choix", them: "Région unique" },
    { feat: "Support senior", us: "Architectes d'astreinte", them: "Tickets échelonnés" },
    { feat: "Intégration IA", us: "Native, gouvernée", them: "Add-on" },
  ],
  useCasesTitle: "Cas d'usage pour lesquels fondateurs et entreprises nous choisissent",
  useCases: [
    { tag: "IA", t: "Copilots LLM pour équipes ops", d: "Assistants ancrés dans vos données, avec audit trails et RBAC." },
    { tag: "Cloud", t: "Modernisation multi-région", d: "Transformer les monolithes en services résilients et observables." },
    { tag: "Data", t: "Plateforme analytique unifiée", d: "Lakehouse, couche sémantique, BI — une source de vérité." },
    { tag: "Sécurité", t: "Déploiement zero-trust", d: "Segmentation identité, réseau et workload alignée ISO 27001." },
    { tag: "Fondateurs", t: "MVP vers PMF", d: "Livrer un MVP crédible en 6–10 semaines, mesurer le PMF." },
    { tag: "PME", t: "Ops digitales clé en main", d: "ERP, CRM, paiements et dashboards reliés proprement." },
  ],
  productsUseCasesTitle: "Ce que les équipes construisent avec nos produits",
  productsUseCases: [
    { tag: "Cloud OS", t: "Plateforme développeur interne", d: "Environnements self-service, golden paths, contrôles FinOps." },
    { tag: "Analytics", t: "Insights pour dirigeants", d: "Dashboards KPI live avec drill-down et alertes." },
    { tag: "AI Studio", t: "Orchestration d'agents", d: "Composez outils, mémoire, évaluation, guardrails." },
    { tag: "Sécurité", t: "Passerelle zero-trust", d: "Proxy identity-aware avec mTLS et audit." },
    { tag: "IoT Edge", t: "Télémétrie de flotte", d: "Des millions d'appareils, traitement edge basse latence." },
    { tag: "Consumer", t: "Apps mobiles de marque", d: "Cross-platform, offline-first, avec analytique de croissance." },
  ],
  logosTitle: "Pratiques que nous livrons",
  quickContactTitle: "Une question ? Posez-la à un expert MHTECHIN.",
  quickContactSub: "Réponse sous 1 jour ouvré. Pas de pression commerciale — des réponses claires de seniors.",
  quickContactBtn: "Nous contacter",
  quickContactFounderBtn: "Conseil fondateur gratuit",
  quickContactItems: [
    { t: "Livraison mondiale", d: "Hubs en APAC, EU, Amériques." },
    { t: "Orienté résultats", d: "KPIs convenus avant le kickoff." },
    { t: "Sécurité enterprise", d: "Engineering aligné ISO." },
    { t: "Équipes seniors", d: "Pas de squads junior-only." },
  ],
  journeyKicker: "Notre parcours",
  journeyTitle: "D'un petit studio à un partenaire technologique mondial",
  journeySteps: [
    { y: "2023", t: "Fondation", d: "MHTECHIN a démarré avec une vision : l'ingénierie enterprise pour toute entreprise ambitieuse." },
    { y: "2024", t: "Pratique Cloud", d: "Lancement de la pratique Cloud & DevOps dédiée. 10 premiers déploiements en production." },
    { y: "2024", t: "Expansion mondiale", d: "Ouverture de hubs de livraison sur 3 continents. Passage à 50 clients enterprise." },
    { y: "2025", t: "IA & Data", d: "Constitution des équipes data platform et ML engineering. Premiers déploiements LLM." },
    { y: "2025", t: "Sécurité & Confiance", d: "Pratique sécurité alignée ISO. Frameworks zero-trust livrés à des clients régulés." },
    { y: "2026", t: "Programme Fondateurs", d: "Advisory gratuit pour fondateurs & PME. Validation → PMF → support à l'immatriculation." },
  ],
  consent: {
    title: "Avis de confidentialité",
    description: "Nous utilisons des technologies telles que les cookies pour stocker et/ou accéder aux informations des appareils. Le consentement à ces technologies nous permettra de traiter des données telles que le comportement de navigation ou les identifiants uniques sur ce site. Nous respectons votre vie privée conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi indienne sur la protection des données personnelles numériques (DPDP Act).",
    accept: "Accepter",
    decline: "Refuser",
  },
},

};

const es: Dict = {
  nav: {
    home: "Inicio", products: "Productos", services: "Servicios", industries: "Industrias", about: "Nosotros", contact: "Contacto", business: "Negocio", freelancing: "Freelance",
    contactSales: "Contactar a ventas", language: "Idioma", exploreAll: "Explorar todo →",
    productsHeading: "Nuestros productos", productsTagline: "Plataformas de nivel empresarial",
    productsBlurb: "Soluciones modulares para empresas globales de todos los sectores.",
    servicesHeading: "Nuestros servicios", servicesTagline: "Experiencia que escala",
    servicesBlurb: "Servicios estratégicos para acelerar su transformación digital.",
  },
  home: {
    pill: "MHTECHIN · Tecnología empresarial · Entrega global",
    h1: "MHTECHIN — La columna vertebral digital de la empresa moderna.",
    tagline: "Pensar, Planificar y Ejecutar.",
    intro: "MHTECHIN es una compañía global de tecnología empresarial que diseña, construye y opera soluciones críticas de nube, IA, datos y ciberseguridad para organizaciones que no pueden detenerse.",
    ctaTalk: "Hablar con un experto", ctaExplore: "Explorar la plataforma",
    statsHeading: "En cifras",
    pillarsKicker: "Lo que construimos", pillarsTitle: "Una plataforma completa para la empresa moderna.",
    pillarsBlurb: "Seis áreas de capacidades integradas, diseñadas para funcionar juntas — o extender los sistemas que ya tiene.",
    ctaBandTitle: "¿Listo para modernizar su stack?",
    ctaBandSub: "Reserve una revisión de arquitectura de 30 minutos con un ingeniero de soluciones MHTECHIN.",
    ctaBandBtn: "Agendar sesión",
    trustKicker: "Por qué MHTECHIN", trustTitle: "Construido para escalar. Certificado para confiar.",
    trustBlurb: "Operamos bajo los estándares de las industrias reguladas — financiera, salud, gobierno y manufactura global.",
    trustItems: [
      "Operaciones certificadas ISO 27001 y SOC 2 Type II",
      "Manejo de datos alineado a GDPR, HIPAA y PCI-DSS",
      "Arquitectos de soluciones dedicados en cada proyecto",
      "Modelos comerciales basados en resultados",
    ],
    pillars: [
      { title: "Plataforma Cloud", desc: "Infraestructura cloud multi-región escalable con SLA del 99,99 %." },
      { title: "IA y Machine Learning", desc: "Entrene, despliegue y gobierne modelos de IA con herramientas empresariales." },
      { title: "Analítica de datos", desc: "Información en tiempo real desde data warehouses a escala petabyte." },
      { title: "Ciberseguridad", desc: "Arquitectura zero-trust, detección de amenazas y cumplimiento integrados." },
      { title: "Automatización DevOps", desc: "Optimice pipelines, releases e infraestructura como código." },
      { title: "Entrega global", desc: "Equipos de ingeniería en 12 países, soporte empresarial 24/7." },
    ],
    stats: [
      { v: "500+", l: "Clientes empresariales" },
      { v: "12", l: "Oficinas globales" },
      { v: "99,99 %", l: "Disponibilidad de plataforma" },
      { v: "24/7", l: "Soporte crítico" },
    ],
    faq: [
      { q: "¿Qué es MHTECHIN?", a: "MHTECHIN es una compañía global de tecnología empresarial que diseña, construye y opera soluciones de nube, IA, análisis de datos y ciberseguridad para organizaciones en todo el mundo." },
      { q: "¿Qué servicios ofrece MHTECHIN?", a: "MHTECHIN ofrece transformación digital, migración a la nube, IA y machine learning, desarrollo de aplicaciones, servicios gestionados de TI y consultoría estratégica." },
      { q: "¿Cuál es el lema de MHTECHIN?", a: "El lema de MHTECHIN es «Think, Plan & Execute» — reflejando nuestro enfoque disciplinado para la entrega de tecnología." },
    ],
    solutions: {
      kicker: "Soluciones", title: "Resultados que entregamos en toda la empresa.",
      blurb: "Blueprints pre-diseñados que combinan plataforma, servicios y aceleradores.",
      items: [
        { name: "Adopción de IA empresarial", desc: "De talleres de descubrimiento a apps LLM en producción en 90 días." },
        { name: "Optimización de costes cloud", desc: "Reduzca el gasto cloud entre 25 y 40 % con automatización FinOps." },
        { name: "Modernización zero-trust", desc: "Seguridad identity-first en entornos híbridos y multi-cloud." },
        { name: "Base de plataforma de datos", desc: "Arquitectura lakehouse que escala del equipo a la empresa." },
      ],
    },
    testimonials: {
      kicker: "Voces de clientes", title: "Confianza de líderes en industrias reguladas.",
      items: [
        { quote: "MHTECHIN se convirtió en nuestro socio por defecto para cloud e IA tras el primer proyecto.", name: "Sarah Chen", role: "CIO, Global Bank" },
        { quote: "Entregan con el rigor de un SI Tier-1 y la velocidad de un equipo de producto.", name: "Daniel Okafor", role: "Chief Architect, MedTech" },
        { quote: "Nuestra hoja de ruta de IA por fin tiene un motor de ejecución creíble.", name: "Priya Raman", role: "VP Data, retailer Fortune 500" },
      ],
    },
    partners: {
      kicker: "Ecosistema", title: "Certificados en cada nube y plataforma principal.",
      blurb: "Alianzas profundas mantienen nuestra ingeniería en la vanguardia.",
      items: ["AWS Advanced", "Microsoft Azure", "Google Cloud", "NVIDIA", "Databricks", "Snowflake", "HashiCorp", "Red Hat"],
    },
    process: {
      kicker: "Cómo trabajamos", title: "Un método de entrega disciplinado, refinado en más de 500 proyectos.",
      items: [
        { name: "Descubrir", desc: "Talleres, evaluaciones técnicas y mapeo de resultados de negocio." },
        { name: "Diseñar", desc: "Diseños de referencia, prototipos y plan de entrega presupuestado." },
        { name: "Construir", desc: "Ingeniería en pods con demos semanales y backlog compartido." },
        { name: "Operar", desc: "SRE 24/7, FinOps y mejora continua tras el go-live." },
      ],
    },
    insights: {
      kicker: "Insights", title: "Investigación y playbooks de nuestros ingenieros.", readMore: "Leer artículo →",
      items: [
        { tag: "IA", title: "Del piloto a producción: escalar LLM empresariales", desc: "Qué distingue a los programas de IA que se entregan." },
        { tag: "Cloud", title: "La escalera de madurez FinOps", desc: "Una hoja de ruta práctica hacia un gasto cloud predecible." },
        { tag: "Seguridad", title: "Zero-trust sin romper todo", desc: "Modelo de adopción por fases probado en entornos regulados." },
      ],
    },
    newsletter: {
      kicker: "Manténgase informado", title: "Tecnología empresarial, descodificada — cada mes.",
      sub: "Briefings sobre cloud, IA, datos y seguridad de nuestros Principal Engineers.",
      placeholder: "Email corporativo", button: "Suscribirme",
      note: "Sin spam. Cancela cuando quieras.",
    },
  },
  products: {
    kicker: "Productos", h1: "Una plataforma. Cada capa del stack empresarial.",
    sub: "Siete productos modulares diseñados para funcionar de forma independiente — y excepcionalmente juntos.",
    tailoredDemo: "¿Quiere una demo a medida?", requestDemo: "Solicitar demo",
    // SPANISH
items: [
  {
    slug: "cloud-platform",
    name: "Plataforma Cloud",
    tag: "Infraestructura",
    desc: "Solución de infraestructura cloud escalable.",
    bullets: ["Soporte AWS", "Escalado Automático", "Monitoreo"],
  },
  {
    slug: "data-analytics-suite",
    name: "Suite de Analítica de Datos",
    tag: "Datos",
    desc: "Herramientas avanzadas de análisis y reportes.",
    bullets: ["Dashboards", "Reportes", "Insights IA"],
  },
  {
    slug: "ai-studio",
    name: "AI Studio",
    tag: "AI / ML",
    desc: "Construye e implementa aplicaciones IA.",
    bullets: ["Modelos ML", "Automatización", "Predicciones"],
  },
  {
    slug: "cybersecurity-shield",
    name: "Escudo de Ciberseguridad",
    tag: "Seguridad",
    desc: "Plataforma de seguridad empresarial.",
    bullets: ["Detección de Amenazas", "Encriptación", "Cumplimiento"],
  },
  {
    slug: "iot-hub",
    name: "Hub IoT",
    tag: "Edge",
    desc: "Conecta y monitorea dispositivos IoT.",
    bullets: ["Sensores", "Datos en Tiempo Real", "Alertas"],
  },
  {
    slug: "devops-pipeline",
    name: "Pipeline DevOps",
    tag: "Ingeniería",
    desc: "Automatización y despliegue CI/CD.",
    bullets: ["Integración Git", "Pruebas", "Despliegues"],
  },
  {
    slug: "consumer-products",
    name: "Productos de Consumo",
    tag: "Consumidor",
    desc: "Experiencias digitales modernas.",
    bullets: ["Apps Móviles", "E-commerce", "Diseño UX"],
  },
],
  },
  services: {
    kicker: "Servicios", h1: "Equipos expertos. Entrega orientada a resultados.",
    sub: "Estrategia, ingeniería y operaciones — entregadas por especialistas certificados en 12 centros globales.",
    specificChallenge: "¿Tiene un reto específico?", startConv: "Iniciar una conversación",
    items: [
      { slug: "digital-transformation", name: "Transformación digital", desc: "Programas de modernización integrales que abarcan estrategia, tecnología y gestión del cambio.", items: ["Diseño de modelo operativo", "Modernización del legacy", "Habilitación del cambio"] },
      { slug: "cloud-migration", name: "Migración a la nube", desc: "Planifique, migre y optimice cargas en AWS, Azure y Google Cloud.", items: ["Descubrimiento y evaluación", "Lift-shift-refactor", "Optimización FinOps"] },
      { slug: "ai-machine-learning", name: "IA y Machine Learning", desc: "De PoC a producción — modelos personalizados, apps LLM y gobernanza de IA.", items: ["Apps de IA generativa", "ML predictivo", "MLOps y gobernanza"] },
      { slug: "application-development", name: "Desarrollo de aplicaciones", desc: "Aplicaciones web, móviles y empresariales diseñadas para escala y fiabilidad.", items: ["Apps React y Native", "Plataformas de API", "Comercio headless"] },
      { slug: "managed-it-services", name: "Servicios gestionados de TI", desc: "Operaciones 24/7 para infraestructura, aplicaciones y seguridad — a escala global.", items: ["NOC y SOC", "SRE bajo demanda", "Gestión de proveedores"] },
      { slug: "consulting-advisory", name: "Consultoría y Asesoramiento", desc: "Estrategia tecnológica independiente, revisiones de arquitectura y asesoría CIO.", items: ["Due diligence tecnológica", "Revisiones de arquitectura", "Selección de proveedores"] },
    ],
  },
  industries: {
    kicker: "Industrias", h1: "Profundidad sectorial, integrada en cada solución.",
    sub: "Aportamos experiencia específica — regulación, flujo de trabajo y economía — a cada compromiso.",
    items: [
      { name: "Servicios financieros", desc: "Modernización de core bancario, plataformas de riesgo y fraude." },
      { name: "Salud", desc: "Integraciones EHR alineadas a HIPAA e IA clínica." },
      { name: "Manufactura", desc: "Industria 4.0, mantenimiento predictivo, convergencia OT/IT." },
      { name: "Retail y E-commerce", desc: "Comercio omnicanal y plataformas de datos de clientes." },
      { name: "Gobierno", desc: "Servicios al ciudadano seguros y nube soberana." },
      { name: "Logística", desc: "Visibilidad en tiempo real, optimización de rutas y IoT de flotas." },
      { name: "Educación", desc: "Plataformas de aprendizaje, analítica e identidad para instituciones." },
      { name: "Energía y Utilities", desc: "Analítica de red, monitorización de activos y reporte de sostenibilidad." },
    ],
  },
  business: {
    kicker: "Negocio", h1: "De la idea a una empresa registrada e invertible.",
    sub: "Servicios venture integrales para fundadores y corporaciones — validación, PMF, TRL, registro y fiscalidad en un solo lugar.",
    ctaTitle: "¿Está construyendo algo nuevo?", ctaBtn: "Hablar con nuestro equipo venture",
    items: [
      { name: "Validación de idea y mercado", desc: "Descubrimiento estructurado para probar demanda, disposición a pagar y espacio competitivo.", bullets: ["Sprints de customer discovery", "Scoring problem-solution fit", "Análisis competitivo"] },
      { name: "Product-Market Fit (PMF)", desc: "De la tracción inicial al crecimiento repetible con señales PMF medibles.", bullets: ["Framework de métricas PMF", "Análisis de cohortes y retención", "Experimentos GTM"] },
      { name: "Capa TRL (Madurez Tecnológica)", desc: "Planes de avance TRL 1–9 para deep-tech, I+D y hardware.", bullets: ["Evaluación de TRL", "Roadmap prototipo a piloto", "Alineación con grants y financiación"] },
      { name: "Registro de empresa", desc: "Constituya la entidad correcta en la jurisdicción adecuada — rápido y conforme.", bullets: ["Estructuración societaria", "Trámites locales", "Fundadores y cap table"] },
      { name: "Fiscalidad y Cumplimiento", desc: "Alta fiscal, declaraciones y cumplimiento continuo por especialistas certificados.", bullets: ["IVA / GST / sales tax", "Impuesto de sociedades", "Asesoría precios de transferencia"] },
      { name: "Financiación e Investor-readiness", desc: "Listo para inversores con data rooms, modelos y decks de calidad due diligence.", bullets: ["Modelización financiera", "Data room", "Coaching de pitch y narrativa"] },
    ],
  },
  freelancing: {
    kicker: "Oportunidades profesionales",
    h1: "Freelance con MHTECHIN",
    sub: "Únase a nuestra red de freelancers de élite. Trabaje en proyectos empresariales de vanguardia en la nube, IA, ciberseguridad y más. Compromisos flexibles, tarifas competitivas.",
    submitProfile: "Enviar su perfil",
    searchPlaceholder: "Buscar por título, habilidad o palabra clave...",
    noOpportunities: "No se encontraron oportunidades",
    filterAdjust: "Intente ajustar sus filtros o términos de búsqueda.",
    checkBack: "Vuelva pronto — publicamos nuevas oportunidades regularmente.",
    applyNow: "Postularse ahora",
  },
  about: {
    kicker: "Nosotros", h1: "Una compañía tecnológica global para la próxima era de la empresa.",
    sub: "MHTECHIN se asocia con las organizaciones más exigentes del mundo para construir, modernizar y operar tecnología crítica.",
    storyTitle: "Nuestra historia",
    storyBody: "MHTECHIN se fundó con una convicción: que la gran tecnología, construida y operada con disciplina, es la ventaja competitiva más duradera. Hoy entregamos a clientes de industrias reguladas en todos los continentes — y el listón sigue subiendo.",
    numbersTitle: "En cifras",
    numbers: [["500+", "Clientes empresariales"], ["12", "Oficinas globales"], ["2.400+", "Ingenieros en el mundo"], ["99,99 %", "Disponibilidad de plataforma"]],
    standTitle: "Nuestros valores",
    values: [
      { t: "Excelencia en ingeniería", d: "El más alto estándar técnico — en cada commit, cada release." },
      { t: "Resultados del cliente", d: "El éxito se mide por los resultados de negocio que logramos." },
      { t: "Confianza por defecto", d: "Seguridad, privacidad y cumplimiento desde el primer día." },
      { t: "Equipos globales e inclusivos", d: "Talento de ingeniería en 12 países, un estándar compartido." },
    ],
  },
  contact: {
    kicker: "Contacto", h1: "Construyamos lo que viene.",
    sub: "Cuéntenos sobre su iniciativa — un experto en soluciones responderá en un día hábil.",
    email: "Email", phone: "Teléfono", hq: "Sede global", hqDetail: "12 oficinas · soporte 24/7",
    formName: "Nombre completo", formEmail: "Email corporativo", formCompany: "Empresa", formRole: "Cargo",
    formHelp: "¿Cómo podemos ayudar?", formHelpPlaceholder: "Cuéntenos sobre su proyecto, plazos y objetivos.",
    send: "Enviar mensaje",
    thanks: "Gracias", thanksBody: "Hemos recibido su consulta — un especialista le contactará en breve.",
  },
  footer: {
    blurb: "MHTECHIN ofrece tecnología empresarial — nube, IA, datos y ciberseguridad — que impulsa a las organizaciones más ambiciosas del mundo.",
    productsCol: "Productos", servicesCol: "Servicios", companyCol: "Empresa",
    rights: "Todos los derechos reservados.", tagline: "Diseñado para la empresa.",
  },
  seo: {
    homeTitle: "MHTECHIN | Soluciones Cloud, IA, Datos y Ciberseguridad",
    homeDesc: "MHTECHIN — compañía global de tecnología empresarial. Soluciones cloud, IA, analítica de datos y ciberseguridad a escala.",
    productsTitle: "Productos — Plataforma empresarial MHTECHIN",
    productsDesc: "Conozca los productos MHTECHIN: Cloud, Analítica, AI Studio, Cybersecurity Shield, IoT Hub, DevOps Pipeline y Productos de consumo.",
    servicesTitle: "Servicios — Transformación digital y TI gestionada | MHTECHIN",
    servicesDesc: "Transformación digital, migración cloud, IA/ML, desarrollo de aplicaciones, TI gestionada y consultoría estratégica.",
    industriesTitle: "Industrias — Soluciones MHTECHIN por sector",
    industriesDesc: "MHTECHIN sirve a banca, salud, manufactura, retail, gobierno, logística, educación y energía.",
    businessTitle: "Negocio — Validación, PMF, TRL, Registro y Fiscalidad | MHTECHIN",
    businessDesc: "MHTECHIN Negocio: validación de ideas, PMF, TRL, registro de empresa, fiscalidad e investor-readiness.",
    aboutTitle: "Sobre MHTECHIN — Compañía global de tecnología empresarial",
    aboutDesc: "MHTECHIN construye soluciones cloud, IA, datos y ciberseguridad en 12 países.",
    contactTitle: "Contacto MHTECHIN — Hable con un experto en soluciones empresariales",
    contactDesc: "Contacte a MHTECHIN. Hable con nuestro equipo de soluciones empresariales sobre cloud, IA, datos y ciberseguridad.",
  },
productDetail: {
  requestDemo: "Solicitar demo",
  allProducts: "Todos los productos",
  productFeatures: "Funcionalidades",
  overview: "Descripción general",
  keyBenefits: "Beneficios clave",
  keyBenefitsSub: "Descubra cómo nuestra solución genera resultados medibles",
  technologies: "Tecnologías",
  technologiesSub: "Construido sobre un stack tecnológico moderno y probado",
  faq: "Preguntas frecuentes",
  ctaTitle: "¿Listo para explorar nuestros productos?",
  ctaSub: "Construya plataformas digitales escalables con MHTECHIN.",
  contactUs: "Contáctenos",
  statReliability: "Fiabilidad", statSupport: "Soporte",
statIntegrations: "Integraciones", statSecure: "Arquitectura",
benefitPerfTitle: "Alto rendimiento", benefitPerfBody: "Arquitectura optimizada para un rendimiento fluido y fiable bajo alta carga de trabajo.",
benefitScaleTitle: "Infraestructura escalable", benefitScaleBody: "Escale fácilmente con tecnologías cloud-ready preparadas para el futuro.",
benefitSecTitle: "Seguridad empresarial", benefitSecBody: "Protocolos de seguridad avanzados para proteger datos e infraestructura crítica.",
benefitIntTitle: "Integración sencilla", benefitIntBody: "Se integra perfectamente con plataformas, APIs y sistemas de terceros existentes.",
benefitAnalyticsTitle: "Analítica en tiempo real", benefitAnalyticsBody: "Obtenga insights accionables mediante dashboards inteligentes y reporting basado en datos.",
benefitSupportTitle: "Soporte dedicado", benefitSupportBody: "Asistencia continua de nuestros experimentados equipos de soporte técnico y consultoría.",
useCasesTitle: "Casos de uso",useCasesSub: "Vea cómo equipos de todos los sectores usan este producto",
useCaseAutoTitle: "Automatización empresarial", useCaseAutoBody: "Automatice flujos repetitivos, mejore la productividad y reduzca costes operativos.",
useCaseEngageTitle: "Engagement con clientes", useCaseEngageBody: "Mejore las experiencias del cliente con interfaces modernas e interacciones digitales fluidas.",
featureFallback: "Detalles de funcionalidades próximamente.",overviewBody: "Nuestra solución está diseñada para ayudar a las empresas a optimizar operaciones, mejorar la experiencia del cliente y acelerar la transformación digital.",
faqCustomTitle: "¿El producto es personalizable?", faqCustomBody: "Sí, la solución puede personalizarse según sus requisitos y flujos de trabajo.",
faqDeployTitle: "¿Ofrecen soporte al despliegue?", faqDeployBody: "Sí, nuestro equipo asiste con el despliegue, onboarding, integración y mantenimiento continuo.",
faqSupportTitle: "¿Se incluye soporte técnico?", faqSupportBody: "Ofrecemos asistencia técnica dedicada para todas las soluciones empresariales.",
},
serviceDetail: {
  talkToExpert: "Hablar con un experto",
  allServices: "Todos los servicios",
  overview: "Descripción general",
  whatWeDeliver: "Lo que entregamos",
  keyBenefits: "Beneficios clave",
  deliveryProcess: "Proceso de entrega",
  technologies: "Tecnologías que usamos",
  faq: "Preguntas frecuentes",
  otherServices: "Explorar otros servicios",
  ctaTitle: "¿Listo para construir el futuro?",
  ctaSub: "Asóciese con MHTECHIN para modernizar infraestructura y acelerar la innovación.",
  startProject: "Iniciar proyecto",
  browseServices: "Ver servicios",
},


productDescriptions: {
  "cloud-platform": {
    "AWS Support": "Integración fluida con AWS Cloud mediante infraestructura escalable y confiabilidad de nivel empresarial.",
    "Auto Scaling": "Ajusta automáticamente los recursos según el tráfico y las demandas de carga de trabajo.",
    "Monitoring": "Monitoreo de infraestructura en tiempo real con alertas y seguimiento del rendimiento.",
  },
  "data-analytics-suite": {
    "Dashboards": "Paneles empresariales interactivos para visualización y toma de decisiones en tiempo real.",
    "Reports": "Genera informes empresariales detallados con exportación y soporte analítico personalizado.",
    "AI Insights": "Información impulsada por IA para identificar patrones, tendencias y oportunidades.",
  },
  "ai-studio": {
    "ML Models": "Desarrolla, entrena e implementa modelos de aprendizaje automático para automatización empresarial.",
    "Automation": "Automatiza flujos de trabajo repetitivos utilizando sistemas avanzados de IA.",
    "Predictions": "Predice tendencias y resultados empresariales mediante pronósticos inteligentes.",
  },
  "cybersecurity-shield": {
    "Threat Detection": "Detecta amenazas cibernéticas en tiempo real mediante monitoreo inteligente.",
    "Encryption": "Protege datos sensibles con capas avanzadas de cifrado.",
    "Compliance": "Mantiene el cumplimiento normativo con gestión de seguridad automatizada.",
  },
  "iot-hub": {
    "Sensors": "Conecta y administra sensores inteligentes para sistemas industriales y de automatización.",
    "Real-time Data": "Monitorea instantáneamente la actividad de dispositivos con sincronización en vivo.",
    "Alerts": "Recibe notificaciones instantáneas sobre eventos críticos y problemas operativos.",
  },
  "devops-pipeline": {
    "Git Integration": "Se integra directamente con Git para colaboración y control de versiones optimizados.",
    "Testing": "Las canalizaciones de pruebas automatizadas garantizan calidad de código y ciclos más rápidos.",
    "Deployments": "Simplifica implementaciones con flujos CI/CD seguros y escalables.",
  },
  "consumer-products": {
    "Mobile Apps": "Aplicaciones móviles modernas creadas para rendimiento y experiencias fluidas.",
    "E-commerce": "Comercio electrónico escalable con pagos seguros y gestión de pedidos.",
    "UX Design": "Diseño centrado en el usuario enfocado en accesibilidad e interfaces modernas.",
  },
},

serviceExtras: {
  "digital-transformation": {
    icon: "🔄",
    tagline: "Moderniza operaciones, acelera la innovación y crea empresas digitales preparadas para el futuro.",
    overview: "La transformación digital ayuda a las empresas a modernizar sistemas, automatizar flujos de trabajo, mejorar la experiencia del cliente y escalar más rápido.",
    benefits: [
      { title: "Agilidad Empresarial", body: "Permite una toma de decisiones más rápida y adaptabilidad a mercados cambiantes." },
      { title: "Optimización de Costos", body: "Reduce costos operativos y de infraestructura mediante automatización." },
      { title: "Experiencia del Cliente", body: "Ofrece experiencias fluidas al cliente con aplicaciones modernas." },
      { title: "Decisiones Basadas en Datos", body: "Utiliza análisis centralizados para una mejor inteligencia empresarial." },
    ],
    process: [
      { step: "01", title: "Evaluación", body: "Analiza sistemas, flujos de trabajo y requisitos empresariales." },
      { step: "02", title: "Planificación", body: "Crea una hoja de ruta escalable para la transformación digital." },
      { step: "03", title: "Implementación", body: "Despliega soluciones empresariales automatizadas y nativas de la nube." },
      { step: "04", title: "Optimización", body: "Mejora continuamente el rendimiento y la eficiencia." },
    ],
    stats: [
      { value: "60%", label: "Operaciones Más Rápidas" },
      { value: "40%", label: "Menores Costos" },
      { value: "500+", label: "Proyectos Entregados" },
      { value: "99%", label: "Satisfacción del Cliente" },
    ],
    technologies: ["React", "Node.js", "AWS", "Azure", "Python", "Kubernetes"],
    faqs: [
      { q: "¿Qué es la transformación digital?", a: "Es el proceso de modernizar operaciones mediante tecnologías digitales." },
      { q: "¿Se pueden actualizar sistemas heredados?", a: "Sí, modernizamos sistemas antiguos en soluciones escalables y nativas de la nube." },
    ],
  },

  "cloud-migration": {
    icon: "☁️",
    tagline: "Trabaja más rápido, gasta menos y opera con confianza en AWS, Azure y Google Cloud.",
    overview: "Planificamos, migramos y optimizamos tus cargas de trabajo hacia la nube con migraciones sin tiempo de inactividad y controles de costos integrados.",
    benefits: [
      { title: "Entrega Más Rápida", body: "CI/CD nativo de la nube reduce ciclos de lanzamiento de semanas a horas." },
      { title: "Control de Costos", body: "La automatización FinOps elimina desperdicios y optimiza gastos." },
      { title: "Resiliencia", body: "Conmutación por error multirregional y SLA de disponibilidad del 99.99%." },
      { title: "Seguridad", body: "Seguridad Zero-Trust integrada desde el primer día." },
    ],
    process: [
      { step: "01", title: "Descubrimiento", body: "Inventaria cargas de trabajo, mapea dependencias y evalúa complejidad de migración." },
      { step: "02", title: "Planificación de Oleadas", body: "Agrupa cargas de trabajo en oleadas de migración según riesgo." },
      { step: "03", title: "Migración", body: "Lift-shift-refactor utilizando herramientas automatizadas y runbooks." },
      { step: "04", title: "Optimización", body: "FinOps, capacidad reservada y optimización continua posterior a la migración." },
    ],
    stats: [
      { value: "40%", label: "Ahorro Promedio" },
      { value: "3×", label: "Despliegues Más Rápidos" },
      { value: "99.99%", label: "SLA de Disponibilidad" },
      { value: "200+", label: "Migraciones Realizadas" },
    ],
    technologies: ["AWS", "Azure", "Google Cloud", "Terraform", "Kubernetes", "ArgoCD"],
    faqs: [
      { q: "¿Cuánto tiempo toma una migración?", a: "Normalmente entre 8 y 24 semanas dependiendo de la complejidad de las cargas." },
      { q: "¿Habrá tiempo de inactividad?", a: "Buscamos migraciones sin interrupciones utilizando estrategias blue-green y canary." },
    ],
  },

  "ai-machine-learning": {
    icon: "🤖",
    tagline: "Desde prueba de concepto hasta IA en producción — modelos personalizados, aplicaciones LLM y gobernanza integrada.",
    overview: "Diseñamos, desarrollamos y operacionalizamos sistemas de IA que ofrecen resultados empresariales medibles, no solo demostraciones.",
    benefits: [
      { title: "Información Más Rápida", body: "La inferencia ML en tiempo real reemplaza el análisis manual." },
      { title: "Automatización", body: "Los flujos inteligentes reducen la carga operativa." },
      { title: "IA Gobernada", body: "Registros de auditoría, explicabilidad y controles de sesgo integrados." },
      { title: "Aplicaciones LLM", body: "Pipelines RAG, copilotos y agentes basados en tus datos." },
    ],
    process: [
      { step: "01", title: "Definición de Casos de Uso", body: "Identifica oportunidades ML de alto valor con estimaciones ROI." },
      { step: "02", title: "Preparación de Datos", body: "Evalúa, limpia y canaliza datos para entrenamiento de modelos." },
      { step: "03", title: "Desarrollo del Modelo", body: "Entrena, evalúa y mejora modelos con seguimiento MLflow." },
      { step: "04", title: "MLOps", body: "CI/CD para modelos, monitoreo de deriva y pipelines de reentrenamiento." },
    ],
    stats: [
      { value: "90d", label: "De PoC a Producción" },
      { value: "35%", label: "Ganancia Promedio de Eficiencia" },
      { value: "100+", label: "Modelos en Producción" },
      { value: "99%", label: "Disponibilidad del Modelo" },
    ],
    technologies: ["Python", "PyTorch", "OpenAI", "LangChain", "MLflow", "Databricks"],
    faqs: [
      { q: "¿Trabajan con nuestros datos existentes?", a: "Sí — primero evaluamos tu entorno de datos y construimos pipelines listos para modelos." },
      { q: "¿Cómo manejan la gobernanza de IA?", a: "Cada modelo incluye informe de explicabilidad, auditoría de sesgo y panel de monitoreo." },
    ],
  },

"application-development": {
  icon: "💻",
  tagline: "Aplicaciones web, móviles y empresariales diseñadas para escala y fiabilidad a largo plazo.",
  overview: "Construimos aplicaciones de calidad producción con stacks modernos, con rendimiento, accesibilidad y seguridad como prioridades.",
  benefits: [
    { title: "Velocidad al mercado", body: "Sprints iterativos entregan software funcionando cada dos semanas." },
    { title: "Arquitectura escalable", body: "Diseñada para crecer 10× sin reescrituras." },
    { title: "Propiedad total", body: "100 % del código, docs e IP es suyo desde el día uno." },
    { title: "Calidad", body: "Tests automatizados, auditorías de accesibilidad y presupuestos de rendimiento." },
  ],
  process: [
    { step: "01", title: "Descubrimiento", body: "Investigación de usuario, mapeo de journey y alcance técnico." },
    { step: "02", title: "Diseño", body: "Prototipos Figma validados con usuarios reales antes de escribir código." },
    { step: "03", title: "Construcción", body: "Sprints de dos semanas, CI/CD, QA automatizado y demos semanales." },
    { step: "04", title: "Lanzamiento", body: "Prueba de carga, revisión de seguridad y runbook de go-live." },
  ],
  stats: [
    { value: "8wk", label: "Plazo MVP medio" },
    { value: "99%", label: "Entrega a tiempo" },
    { value: "4.9★", label: "Valoración clientes" },
    { value: "300+", label: "Apps entregadas" },
  ],
  technologies: ["React", "Next.js", "React Native", "Node.js", "TypeScript", "PostgreSQL"],
  faqs: [
    { q: "¿Desarrollan apps móviles?", a: "Sí — iOS, Android y multiplataforma con React Native o Flutter." },
    { q: "¿A quién pertenece el código?", a: "A usted — transferencia IP al 100 %, sin lock-in." },
  ],
},
"managed-it-services": {
  icon: "🛡️",
  tagline: "Operaciones 24/7 para infraestructura, aplicaciones y seguridad — entregadas globalmente.",
  overview: "Actuamos como su equipo de ingeniería extendido, manteniendo los sistemas disponibles, seguros y eficientes las 24 horas.",
  benefits: [
    { title: "Siempre disponible", body: "NOC y SOC 24/7 con SLA de respuesta en menos de 15 minutos." },
    { title: "Económico", body: "El modelo SRE compartido cuesta un 60 % menos que personal interno equivalente." },
    { title: "Proactivo", body: "AIOps detecta y resuelve problemas antes de que los usuarios los noten." },
    { title: "Cumplimiento", body: "Operaciones alineadas a SOC 2, ISO 27001 con reporting mensual." },
  ],
  process: [
    { step: "01", title: "Onboarding", body: "Inventario, creación de runbooks y configuración de monitoreo en la semana uno." },
    { step: "02", title: "Baseline", body: "Baseline de rendimiento y costes de 30 días con correcciones rápidas." },
    { step: "03", title: "Estado estable", body: "Monitoreo 24/7, respuesta a incidentes y gestión de cambios." },
    { step: "04", title: "Optimizar", body: "Revisiones mensuales con mejoras de costes, fiabilidad y seguridad." },
  ],
  stats: [
    { value: "99.99%", label: "Uptime entregado" },
    { value: "<15min", label: "SLA de respuesta" },
    { value: "60%", label: "Coste vs interno" },
    { value: "24/7", label: "Cobertura global" },
  ],
  technologies: ["Datadog", "PagerDuty", "Terraform", "AWS", "Azure", "Kubernetes"],
  faqs: [
    { q: "¿Cuál es su tiempo de respuesta a incidentes?", a: "Los incidentes P1 se reconocen en 5 minutos y se resuelven en 15." },
    { q: "¿Pueden gestionar nuestras cuentas cloud existentes?", a: "Sí — nos incorporamos a sus cuentas y operamos junto a su equipo." },
  ],
},
"consulting-advisory": {
  icon: "🎯",
  tagline: "Estrategia tecnológica independiente, revisiones de arquitectura y asesoría CIO de profesionales senior.",
  overview: "Proporcionamos orientación objetiva y neutral para ayudar a la dirección a tomar mejores decisiones tecnológicas más rápido.",
  benefits: [
    { title: "Objetividad", body: "Sin acuerdos de referidos — recomendaciones puramente en su interés." },
    { title: "Acceso senior", body: "Acceso directo a arquitectos y CTOs, no a account managers." },
    { title: "Velocidad", body: "Las revisiones estructuradas entregan resultados en días, no meses." },
    { title: "Accionable", body: "Cada proyecto termina con una hoja de ruta priorizada y registro de decisiones." },
  ],
  process: [
    { step: "01", title: "Intake", body: "Definir alcance, preguntas y criterios de éxito en un kickoff de 2 horas." },
    { step: "02", title: "Evaluación", body: "Entrevistas, revisión documental y análisis de arquitectura." },
    { step: "03", title: "Hallazgos", body: "Informe estructurado con riesgos, brechas y oportunidades valorados." },
    { step: "04", title: "Hoja de ruta", body: "Recomendaciones priorizadas con esfuerzo, coste y responsables." },
  ],
  stats: [
    { value: "5d", label: "Turnaround medio" },
    { value: "100%", label: "Liderado por seniors" },
    { value: "50+", label: "Proyectos CIO" },
    { value: "4.9★", label: "Valoración clientes" },
  ],
  technologies: ["TOGAF", "AWS Well-Architected", "NIST CSF", "DORA", "ITIL", "OKRs"],
  faqs: [
    { q: "¿El asesoramiento es neutral frente a proveedores?", a: "Sí — no tenemos acuerdos de referidos." },
    { q: "¿Pueden trabajar con nuestros proveedores actuales?", a: "Por supuesto — evaluamos su stack actual de forma objetiva." },
  ],
},
},
extraSections: {
  freeAdviceChip: "Gratis para fundadores y propietarios",
  freeAdviceTitle: "Asesoría empresarial gratuita. Sin compromiso, sin condiciones.",
  freeAdviceSub: "Reserve una llamada estratégica de 30 minutos con asesores MHTECHIN. Ayudamos a fundadores y pymes a validar ideas, elegir stack, gestionar registro, impuestos y go-to-market — completamente gratis.",
  freeAdviceBookBtn: "Reservar llamada gratuita",
  freeAdviceSeeBtn: "Ver qué cubrimos",
  freeAdviceItems: [
    { t: "Validación de idea", d: "Claridad problema-solución en 30 min." },
    { t: "Guía PMF", d: "Testear señales antes de escalar." },
    { t: "Registro e impuestos", d: "Entidad, IVA, bases de cumplimiento." },
    { t: "Hoja de ruta tech", d: "Stack, presupuesto, prioridades de contratación." },
  ],
  researchTitle: "Resultados respaldados por investigación",
  researchProductsTitle: "Impacto de producto, medido",
  researchNote: "Benchmarks independientes en proyectos cloud, IA, datos y seguridad (2023–2025).",
  researchStats: [
    { v: "3,4×", l: "Entrega más rápida vs. media del sector" },
    { v: "62 %", l: "Reducción media de costes cloud" },
    { v: "99,99 %", l: "Disponibilidad en producción" },
    { v: "120+", l: "Despliegues enterprise globales" },
  ],
  colorSpectrumKicker: "Por qué MHTECHIN",
  colorSpectrumTitle: "Excelencia de ingeniería con enfoque amigable para fundadores",
  colorSpectrumItems: [
    { t: "Resultados primero", d: "Acordamos KPIs, no sólo entregables." },
    { t: "Liderado por seniors", d: "Sin pods solo-junior. Arquitectos desde el día 1." },
    { t: "Cloud-native", d: "Multi-cloud: AWS, GCP, Azure, on-prem e híbrido." },
    { t: "Datos listos para IA", d: "De esquemas a pipelines LLM — IA real sin hype." },
    { t: "Seguridad por diseño", d: "Zero-trust, SAST/DAST, SBOMs integrados." },
    { t: "Entrega global", d: "Squads 24/5 en APAC, EU y Américas." },
  ],
  productsSpectrumKicker: "Capacidades de producto",
  productsSpectrumTitle: "Bloques modulares. Plataformas componibles.",
  productsSpectrumItems: [
    { t: "API-first", d: "Cada producto expone APIs REST + GraphQL estables y versionadas." },
    { t: "Multi-tenant", d: "Aislamiento por fila, SSO, auditoría y cuotas por tenant." },
    { t: "Observabilidad", d: "Trazas, métricas y logs OpenTelemetry de serie." },
    { t: "Extensible", d: "Modelo plugin + webhooks para integraciones internas." },
    { t: "Regional", d: "Elija residencia de datos: APAC, EU, Américas, India." },
    { t: "Precios que escalan", d: "Empiece pequeño, crezca de forma predecible. Sin sorpresas." },
  ],
  comparisonTitle: "Cómo comparan los productos MHTECHIN",
  comparisonHeaders: { capability: "Capacidad", us: "MHTECHIN", them: "Proveedor típico" },
  comparisonRows: [
    { feat: "Tiempo hasta el valor", us: "Producción en 4–8 semanas", them: "Trimestres" },
    { feat: "Personalización", us: "Extensiones de código abierto", them: "Configuración limitada" },
    { feat: "Residencia de datos", us: "Región por carga de trabajo", them: "Región única" },
    { feat: "Soporte senior", us: "Arquitectos disponibles", them: "Tickets escalonados" },
    { feat: "Integración IA", us: "Nativa, gobernada", them: "Add-on" },
  ],
  useCasesTitle: "Casos de uso por los que fundadores y empresas nos eligen",
  useCases: [
    { tag: "IA", t: "Copilotos LLM para equipos ops", d: "Asistentes basados en sus datos con auditoría y RBAC." },
    { tag: "Cloud", t: "Modernización multi-región", d: "Transformar monolitos en servicios resilientes y observables." },
    { tag: "Datos", t: "Plataforma analítica unificada", d: "Lakehouse, capa semántica, BI — una sola fuente de verdad." },
    { tag: "Seguridad", t: "Despliegue zero-trust", d: "Segmentación de identidad, red y carga alineada a ISO 27001." },
    { tag: "Fundadores", t: "MVP a PMF", d: "MVP creíble en 6–10 semanas, medir PMF, iterar rápido." },
    { tag: "Pyme", t: "Ops digitales listas", d: "ERP, CRM, pagos y dashboards conectados limpiamente." },
  ],
  productsUseCasesTitle: "Lo que los equipos construyen con nuestros productos",
  productsUseCases: [
    { tag: "Cloud OS", t: "Plataforma interna de desarrolladores", d: "Entornos self-service, golden paths, controles FinOps." },
    { tag: "Analytics", t: "Insights para directivos", d: "Dashboards KPI en vivo con drill-down y alertas." },
    { tag: "AI Studio", t: "Orquestación de agentes", d: "Componga herramientas, memoria, evaluación, guardrails." },
    { tag: "Seguridad", t: "Pasarela zero-trust", d: "Proxy identity-aware con mTLS y auditoría." },
    { tag: "IoT Edge", t: "Telemetría de flota", d: "Millones de dispositivos, procesamiento edge de baja latencia." },
    { tag: "Consumer", t: "Apps móviles de marca", d: "Cross-platform, offline-first, con analítica de crecimiento." },
  ],
  logosTitle: "Prácticas que entregamos",
  quickContactTitle: "¿Tiene una pregunta? Pregunte a un experto MHTECHIN.",
  quickContactSub: "Respuesta en 1 día hábil. Sin presión comercial — respuestas claras de ingenieros senior.",
  quickContactBtn: "Contactarnos",
  quickContactFounderBtn: "Asesoría gratuita para fundadores",
  quickContactItems: [
    { t: "Entrega global", d: "Hubs en APAC, EU, Américas." },
    { t: "Orientado a resultados", d: "KPIs acordados antes del kickoff." },
    { t: "Seguridad enterprise", d: "Ingeniería alineada a ISO." },
    { t: "Equipos senior", d: "Sin squads solo-junior." },
  ],
  journeyKicker: "Nuestro recorrido",
  journeyTitle: "De un pequeño estudio a un socio tecnológico global",
  journeySteps: [
    { y: "2023", t: "Fundación", d: "MHTECHIN comenzó con una visión: ingeniería enterprise para cada empresa ambiciosa." },
    { y: "2024", t: "Práctica Cloud", d: "Lanzamos la práctica dedicada de Cloud & DevOps. Primeros 10 despliegues en producción." },
    { y: "2024", t: "Expansión global", d: "Abrimos hubs de entrega en 3 continentes. Superamos los 50 clientes enterprise." },
    { y: "2025", t: "IA & Datos", d: "Creamos equipos de plataforma de datos y ML engineering. Primeros despliegues LLM." },
    { y: "2025", t: "Seguridad & Confianza", d: "Práctica de seguridad alineada a ISO. Frameworks zero-trust para clientes regulados." },
    { y: "2026", t: "Programa Fundadores", d: "Asesoría gratuita para fundadores y pymes. Validación → PMF → soporte en registro." },
  ],
  consent: {
    title: "Aviso de privacidad",
    description: "Utilizamos tecnologías como las cookies para almacenar y/o acceder a la información del dispositivo. El consentimiento a estas tecnologías nos permitirá procesar datos como el comportamiento de navegación o identificadores únicos en este sitio. Respetamos su privacidad de acuerdo con el Reglamento General de Protección de Datos (RGPD) y la Ley de Protección de Datos Personales Digitales de la India (DPDP Act).",
    accept: "Aceptar",
    decline: "Rechazar",
  },
},

};

const cn: Dict = {
  nav: {
    home: "首页", products: "产品", services: "服务", industries: "行业", about: "关于我们", contact: "联系我们", business: "创业", freelancing: "自由职业",
    contactSales: "联系销售", language: "语言", exploreAll: "查看全部 →",
    productsHeading: "我们的产品", productsTagline: "企业级平台",
    productsBlurb: "为各行业全球企业打造的模块化解决方案。",
    servicesHeading: "我们的服务", servicesTagline: "可扩展的专业能力",
    servicesBlurb: "加速数字化进程的战略服务。",
  },
  home: {
    pill: "MHTECHIN · 企业技术 · 全球交付",
    h1: "MHTECHIN — 为现代企业构建数字化基石。",
    tagline: "思考、规划、执行。",
    intro: "MHTECHIN 是一家全球性企业技术公司,为不能停下脚步的组织设计、构建并运营关键的云、人工智能、数据和网络安全解决方案。",
    ctaTalk: "咨询专家", ctaExplore: "探索平台",
    statsHeading: "数字一览",
    pillarsKicker: "我们的产品", pillarsTitle: "为现代企业打造的完整平台。",
    pillarsBlurb: "六大集成能力领域,可独立使用,也可扩展您现有的系统。",
    ctaBandTitle: "准备好升级您的技术栈了吗?",
    ctaBandSub: "预约与 MHTECHIN 解决方案工程师的 30 分钟架构评审。",
    ctaBandBtn: "预约会议",
    trustKicker: "为何选择 MHTECHIN", trustTitle: "为规模而建。值得信赖的认证。",
    trustBlurb: "我们按照受监管行业的标准运营 — 金融、医疗、政府和全球制造业。",
    trustItems: [
      "通过 ISO 27001 与 SOC 2 Type II 认证",
      "符合 GDPR、HIPAA、PCI-DSS 的数据处理",
      "每个项目配备专属解决方案架构师",
      "基于成果的商业模式",
    ],
    pillars: [
      { title: "云平台", desc: "多区域可扩展云基础设施,99.99% 可用性 SLA。" },
      { title: "人工智能与机器学习", desc: "使用企业级工具训练、部署和治理 AI 模型。" },
      { title: "数据分析", desc: "从 PB 级数据仓库获取实时洞察。" },
      { title: "网络安全", desc: "零信任架构、威胁检测与合规内置。" },
      { title: "DevOps 自动化", desc: "简化流水线、发布和基础设施即代码。" },
      { title: "全球交付", desc: "12 个国家的工程团队,7x24 小时企业支持。" },
    ],
    stats: [
      { v: "500+", l: "企业客户" },
      { v: "12", l: "全球办公室" },
      { v: "99.99%", l: "平台可用率" },
      { v: "24/7", l: "关键业务支持" },
    ],
    faq: [
      { q: "什么是 MHTECHIN?", a: "MHTECHIN 是一家全球性企业技术公司,为全球各类组织设计、构建并运营云、AI、数据分析和网络安全解决方案。" },
      { q: "MHTECHIN 提供哪些服务?", a: "MHTECHIN 提供数字化转型、云迁移、AI 与机器学习、应用开发、托管 IT 服务以及战略咨询。" },
      { q: "MHTECHIN 的口号是什么?", a: "MHTECHIN 的口号是「Think, Plan & Execute(思考、规划、执行)」— 体现我们在企业技术交付上的严谨态度。" },
    ],
    solutions: {
      kicker: "解决方案", title: "我们为企业交付的成果。",
      blurb: "结合平台、服务与加速器的预制解决方案蓝图。",
      items: [
        { name: "企业 AI 落地", desc: "从发现工作坊到生产级 LLM 应用,90 天上线。" },
        { name: "云成本优化", desc: "通过 FinOps 自动化将云支出降低 25–40%。" },
        { name: "零信任现代化", desc: "面向混合云与多云的身份优先安全。" },
        { name: "数据平台基座", desc: "从团队到企业全面可扩展的湖仓架构。" },
      ],
    },
    testimonials: {
      kicker: "客户之声", title: "受到全球受监管行业领导者的信赖。",
      items: [
        { quote: "首个项目结束后,MHTECHIN 就成为我们云与 AI 的默认合作伙伴。", name: "Sarah Chen", role: "全球银行 CIO" },
        { quote: "他们以一线 SI 的严谨和产品团队的速度交付。", name: "Daniel Okafor", role: "MedTech 首席架构师" },
        { quote: "我们的 AI 路线图终于有了可信的执行引擎。", name: "Priya Raman", role: "财富 500 零售 数据副总裁" },
      ],
    },
    partners: {
      kicker: "生态", title: "在主流云与平台上全面认证。",
      blurb: "深度伙伴关系让我们的工程始终领先。",
      items: ["AWS Advanced", "Microsoft Azure", "Google Cloud", "NVIDIA", "Databricks", "Snowflake", "HashiCorp", "Red Hat"],
    },
    process: {
      kicker: "工作方式", title: "在 500+ 项目中打磨的严谨交付方法。",
      items: [
        { name: "发现", desc: "工作坊、技术评估与业务成果映射。" },
        { name: "设计", desc: "参考设计、原型与已估算交付计划。" },
        { name: "构建", desc: "小组化工程,每周演示与共享待办。" },
        { name: "运营", desc: "上线后 7x24 SRE、FinOps 与持续改进。" },
      ],
    },
    insights: {
      kicker: "洞察", title: "来自工程师一线的研究与手册。", readMore: "阅读文章 →",
      items: [
        { tag: "AI", title: "从试点到生产:企业 LLM 的规模化", desc: "成功落地的 AI 项目有何共同点。" },
        { tag: "云", title: "FinOps 成熟度阶梯", desc: "迈向可预测、优化云支出的实战路线图。" },
        { tag: "安全", title: "不破不立的零信任", desc: "在受监管环境中验证过的分阶段采用模式。" },
      ],
    },
    newsletter: {
      kicker: "保持关注", title: "企业技术月报 — 一封讲清楚。",
      sub: "来自 MHTECHIN 首席工程师的云、AI、数据与安全简报。",
      placeholder: "工作邮箱", button: "订阅",
      note: "无垃圾邮件,可随时退订。",
    },
  },
  products: {
    kicker: "产品", h1: "一个平台,贯穿企业技术栈的每一层。",
    sub: "七款模块化产品 — 独立优秀,组合更强。",
    tailoredDemo: "需要定制演示吗?", requestDemo: "申请演示",
    // CHINESE
items: [
  {
    slug: "cloud-platform",
    name: "云平台",
    tag: "基础设施",
    desc: "可扩展的云基础设施解决方案。",
    bullets: ["AWS支持", "自动扩展", "监控"],
  },
  {
    slug: "data-analytics-suite",
    name: "数据分析套件",
    tag: "数据",
    desc: "高级分析和报告工具。",
    bullets: ["仪表板", "报告", "AI洞察"],
  },
  {
    slug: "ai-studio",
    name: "AI工作室",
    tag: "AI / ML",
    desc: "构建和部署AI应用程序。",
    bullets: ["机器学习模型", "自动化", "预测"],
  },
  {
    slug: "cybersecurity-shield",
    name: "网络安全盾",
    tag: "安全",
    desc: "企业级安全平台。",
    bullets: ["威胁检测", "加密", "合规"],
  },
  {
    slug: "iot-hub",
    name: "IoT中心",
    tag: "边缘",
    desc: "连接和监控IoT设备。",
    bullets: ["传感器", "实时数据", "警报"],
  },
  {
    slug: "devops-pipeline",
    name: "DevOps流水线",
    tag: "工程",
    desc: "CI/CD自动化与部署。",
    bullets: ["Git集成", "测试", "部署"],
  },
  {
    slug: "consumer-products",
    name: "消费产品",
    tag: "消费者",
    desc: "现代数字化消费体验。",
    bullets: ["移动应用", "电子商务", "UX设计"],
  },
],
  },
  services: {
    kicker: "服务", h1: "专家团队,基于成果的交付。",
    sub: "战略、工程与运维 — 由 12 个全球交付中心的认证专家提供。",
    specificChallenge: "有具体的挑战吗?", startConv: "开启对话",
    items: [
      { slug: "digital-transformation", name: "数字化转型", desc: "涵盖战略、技术和变革管理的端到端现代化项目。", items: ["运营模式设计", "遗留系统现代化", "变革推动"] },
      { slug: "cloud-migration", name: "云迁移", desc: "在 AWS、Azure 与 Google Cloud 上规划、迁移并优化工作负载。", items: ["发现与评估", "Lift-Shift-Refactor", "FinOps 优化"] },
      { slug: "ai-machine-learning", name: "AI 与机器学习", desc: "从 PoC 到生产 — 定制模型、LLM 应用与 AI 治理。", items: ["生成式 AI 应用", "预测性 ML", "MLOps 与治理"] },
      { slug: "application-development", name: "应用开发", desc: "为规模与可靠性而构建的 Web、移动与企业应用。", items: ["React 与 Native 应用", "API 平台", "无头电商"] },
      { slug: "managed-it-services", name: "托管 IT 服务", desc: "面向基础设施、应用与安全的 7x24 全球运维。", items: ["NOC 与 SOC", "按需 SRE", "供应商管理"] },
      { slug: "consulting-advisory", name: "咨询与顾问", desc: "独立的技术战略、架构评审和 CIO 顾问服务。", items: ["技术尽调", "架构评审", "供应商选型"] },
    ],
  },
  industries: {
    kicker: "行业", h1: "深耕行业,融入每一个解决方案。",
    sub: "我们在每个项目中带来行业专属的专业知识 — 监管、流程和经济性。",
    items: [
      { name: "金融服务", desc: "核心银行现代化、风险与反欺诈平台。" },
      { name: "医疗健康", desc: "符合 HIPAA 的电子病历集成与临床 AI。" },
      { name: "制造业", desc: "工业 4.0、预测性维护、OT/IT 融合。" },
      { name: "零售与电商", desc: "全渠道商务与客户数据平台。" },
      { name: "政府", desc: "安全的市民服务与主权云交付。" },
      { name: "物流", desc: "实时可视化、路线优化与车队 IoT。" },
      { name: "教育", desc: "面向机构的学习平台、分析与身份管理。" },
      { name: "能源与公用事业", desc: "电网分析、资产监控与可持续报告。" },
    ],
  },
  business: {
    kicker: "创业", h1: "从创意到注册、可融资的企业。",
    sub: "为创始人与企业提供端到端创业服务 — 验证、PMF、TRL、注册与税务一站式覆盖。",
    ctaTitle: "正在创办新业务?", ctaBtn: "联系我们的创业团队",
    items: [
      { name: "创意与市场验证", desc: "通过结构化发现验证需求、付费意愿与竞争空间,再做投资决策。", bullets: ["客户发现冲刺", "问题-方案匹配评分", "竞争对手拆解"] },
      { name: "产品市场匹配 (PMF)", desc: "通过可量化的 PMF 信号,从早期牵引迈向可复制增长。", bullets: ["PMF 指标框架", "群组与留存分析", "GTM 实验"] },
      { name: "TRL 层(技术成熟度)", desc: "面向深科技、研发与硬件的 TRL 1–9 推进计划。", bullets: ["TRL 差距评估", "原型到试点路线图", "资助与融资对齐"] },
      { name: "企业注册", desc: "在合适的司法管辖区注册合适的实体 — 快速且合规。", bullets: ["实体结构设计", "本地注册办理", "创始人与股权表搭建"] },
      { name: "税务与合规", desc: "认证专家负责税务登记、申报与持续合规。", bullets: ["增值税 / GST / 销售税", "企业所得税申报", "转让定价咨询"] },
      { name: "融资与投资者准备", desc: "通过尽调级数据室、模型与路演稿做好投资者准备。", bullets: ["财务建模", "数据室搭建", "路演与叙事辅导"] },
    ],
  },
  freelancing: {
    kicker: "职业机会",
    h1: "在 MHTECHIN 开展自由职业",
    sub: "加入我们的精英自由职业者网络。参与云、人工智能、网络安全等领域的前沿企业项目。灵活的合作形式，有竞争力的薪酬标准。",
    submitProfile: "提交您的简历",
    searchPlaceholder: "按职位名称、技能或关键字搜索...",
    noOpportunities: "未找到相关机会",
    filterAdjust: "请尝试调整您的筛选条件或搜索词。",
    checkBack: "请随时关注 — 我们会定期发布新的合作机会。",
    applyNow: "立即申请",
  },
  about: {
    kicker: "关于我们", h1: "面向企业新时代的全球技术公司。",
    sub: "MHTECHIN 与全球要求最严苛的组织合作,构建、现代化并运营关键技术。",
    storyTitle: "我们的故事",
    storyBody: "MHTECHIN 创立于一个坚定的信念之上:以纪律构建和运营的伟大技术,是企业能够建立的最持久竞争优势。今天,我们的团队为各大洲受监管行业的客户持续交付 — 标准不断提高。",
    numbersTitle: "数字一览",
    numbers: [["500+", "企业客户"], ["12", "全球办公室"], ["2,400+", "全球工程师"], ["99.99%", "平台可用率"]],
    standTitle: "我们的价值观",
    values: [
      { t: "工程卓越", d: "我们以最高的技术标准要求自己 — 每一次提交,每一次发布。" },
      { t: "客户成果", d: "成功以为客户带来的业务成果来衡量。" },
      { t: "默认值得信赖", d: "安全、隐私与合规从第一天起就融入设计。" },
      { t: "全球化与包容团队", d: "12 个国家的多元工程人才,共享同一标准。" },
    ],
  },
  contact: {
    kicker: "联系我们", h1: "携手共建未来。",
    sub: "请告诉我们您的项目 — 解决方案专家将在一个工作日内回复。",
    email: "邮箱", phone: "电话", hq: "全球总部", hqDetail: "12 个办公室 · 7x24 支持",
    formName: "姓名", formEmail: "工作邮箱", formCompany: "公司", formRole: "职位",
    formHelp: "我们如何帮助您?", formHelpPlaceholder: "请说明您的项目、时间表与目标。",
    send: "发送消息",
    thanks: "感谢您", thanksBody: "我们已收到您的咨询 — 专员将很快与您联系。",
  },
  footer: {
    blurb: "MHTECHIN 提供企业技术 — 云、AI、数据与网络安全 — 为全球最具雄心的组织提供动力。",
    productsCol: "产品", servicesCol: "服务", companyCol: "公司",
    rights: "保留所有权利。", tagline: "为企业而构建。",
  },
  seo: {
    homeTitle: "MHTECHIN | 企业云、AI、数据与网络安全解决方案",
    homeDesc: "MHTECHIN — 全球企业技术公司。规模化的云、AI、数据分析与网络安全解决方案。",
    productsTitle: "产品 — MHTECHIN 企业平台",
    productsDesc: "了解 MHTECHIN 产品:云平台、数据分析、AI Studio、网络安全盾、IoT、DevOps 流水线与消费级产品。",
    servicesTitle: "服务 — 数字化转型与托管 IT | MHTECHIN",
    servicesDesc: "数字化转型、云迁移、AI/ML、应用开发、托管 IT 与战略咨询。",
    industriesTitle: "行业 — MHTECHIN 行业解决方案",
    industriesDesc: "MHTECHIN 服务于金融、医疗、制造、零售、政府、物流、教育与能源行业。",
    businessTitle: "创业 — 验证、PMF、TRL、注册与税务 | MHTECHIN",
    businessDesc: "MHTECHIN 创业服务:创意验证、PMF、TRL、企业注册、税务与投资者准备。",
    aboutTitle: "关于 MHTECHIN — 全球企业技术公司",
    aboutDesc: "MHTECHIN 在 12 个国家构建云、AI、数据与网络安全解决方案。",
    contactTitle: "联系 MHTECHIN — 与企业解决方案专家交流",
    contactDesc: "联系 MHTECHIN。与我们的企业解决方案团队探讨云、AI、数据与网络安全。",
  },
productDetail: {
  requestDemo: "申请演示",
  allProducts: "所有产品",
  productFeatures: "产品功能",
  overview: "概览",
  keyBenefits: "核心优势",
  keyBenefitsSub: "了解我们的解决方案如何带来可衡量的成果",
  technologies: "技术栈",
  technologiesSub: "基于现代化、经验证的技术栈构建",
  faq: "常见问题",
  ctaTitle: "准备好探索我们的产品了吗?",
  ctaSub: "与 MHTECHIN 共建可扩展的数字平台。",
  contactUs: "联系我们",
  statReliability: "可靠性", statSupport: "支持",
statIntegrations: "集成数", statSecure: "架构",
benefitPerfTitle: "高性能", benefitPerfBody: "优化的架构确保在高工作负载下系统平稳可靠运行。",
benefitScaleTitle: "可扩展基础设施", benefitScaleBody: "使用云就绪的未来技术轻松扩展业务运营。",
benefitSecTitle: "企业级安全", benefitSecBody: "先进的安全协议保护敏感业务数据和基础设施。",
benefitIntTitle: "轻松集成", benefitIntBody: "与现有平台、API和第三方系统无缝集成。",
benefitAnalyticsTitle: "实时分析", benefitAnalyticsBody: "通过智能仪表板和数据驱动报告获取可操作的洞察。",
benefitSupportTitle: "专属支持", benefitSupportBody: "来自经验丰富的技术支持和咨询团队的持续协助。",
useCasesTitle: "使用场景",useCasesSub: "查看各行业团队如何使用该产品",
useCaseAutoTitle: "业务自动化", useCaseAutoBody: "自动化重复工作流，提升生产力，降低运营开销。",
useCaseEngageTitle: "客户互动", useCaseEngageBody: "通过现代界面和无缝数字交互提升客户体验。",
featureFallback: "功能详情即将发布。",overviewBody: "我们的解决方案旨在帮助企业简化运营、提升客户体验、改善可扩展性，并借助现代技术和安全基础设施加速数字化转型。",
faqCustomTitle: "产品可以定制吗？", faqCustomBody: "可以，解决方案可根据您的业务需求和工作流程进行定制。",
faqDeployTitle: "提供部署支持吗？", faqDeployBody: "是的，我们的团队协助完成部署、入驻、集成和持续维护。",
faqSupportTitle: "包含技术支持吗？", faqSupportBody: "我们为所有企业解决方案提供专属技术支持。",
},
serviceDetail: {
  talkToExpert: "咨询专家",
  allServices: "所有服务",
  overview: "概览",
  whatWeDeliver: "我们的交付内容",
  keyBenefits: "核心优势",
  deliveryProcess: "交付流程",
  technologies: "使用的技术",
  faq: "常见问题",
  otherServices: "探索其他服务",
  ctaTitle: "准备好构建未来了吗?",
  ctaSub: "与 MHTECHIN 合作,现代化基础设施,构建可扩展平台,加速创新。",
  startProject: "启动项目",
  browseServices: "浏览服务",
},

productDescriptions: {
  "cloud-platform": {
    "AWS Support": "无缝 AWS 云集成，具备可扩展基础设施和企业级可靠性。",
    "Auto Scaling": "根据流量和工作负载需求自动调整资源。",
    "Monitoring": "通过警报和性能跟踪实现实时基础设施监控。",
  },
  "data-analytics-suite": {
    "Dashboards": "用于实时可视化和决策的交互式业务仪表板。",
    "Reports": "生成带有导出和自定义分析支持的详细业务报告。",
    "AI Insights": "由 AI 驱动的洞察，用于识别模式、趋势和机会。",
  },
  "ai-studio": {
    "ML Models": "开发、训练和部署机器学习模型以实现业务自动化。",
    "Automation": "使用先进 AI 系统自动化重复工作流程。",
    "Predictions": "利用智能预测技术预测趋势和业务结果。",
  },
  "cybersecurity-shield": {
    "Threat Detection": "使用智能监控实时检测网络威胁。",
    "Encryption": "通过高级加密层保护敏感数据。",
    "Compliance": "通过自动化安全管理保持行业合规。",
  },
  "iot-hub": {
    "Sensors": "连接和管理工业及自动化系统的智能传感器。",
    "Real-time Data": "通过实时同步即时监控设备活动。",
    "Alerts": "针对关键事件和运营问题接收即时通知。",
  },
  "devops-pipeline": {
    "Git Integration": "直接与 Git 集成，实现高效协作和版本控制。",
    "Testing": "自动化测试流水线确保代码质量和更快开发周期。",
    "Deployments": "通过安全且可扩展的 CI/CD 工作流简化部署。",
  },
  "consumer-products": {
    "Mobile Apps": "为性能和无缝体验打造的现代移动应用程序。",
    "E-commerce": "具备安全支付和订单管理的可扩展电子商务平台。",
    "UX Design": "以用户为中心，专注于可访问性和现代界面设计。",
  },
},

serviceExtras: {
  "digital-transformation": {
    icon: "🔄",
    tagline: "实现运营现代化，加速创新，打造面向未来的数字化企业。",
    overview: "数字化转型帮助企业实现系统现代化、工作流程自动化、提升客户体验并更快扩展业务。",
    benefits: [
      { title: "业务敏捷性", body: "实现更快速的决策并适应不断变化的市场。" },
      { title: "成本优化", body: "通过自动化降低基础设施和运营成本。" },
      { title: "客户体验", body: "通过现代化应用提供无缝客户旅程。" },
      { title: "数据驱动决策", body: "利用集中式分析实现更好的商业智能。" },
    ],
    process: [
      { step: "01", title: "评估", body: "分析系统、工作流程和业务需求。" },
      { step: "02", title: "规划", body: "制定可扩展的数字化转型路线图。" },
      { step: "03", title: "实施", body: "部署云原生和自动化企业解决方案。" },
      { step: "04", title: "优化", body: "持续改进性能和效率。" },
    ],
    stats: [
      { value: "60%", label: "更快运营" },
      { value: "40%", label: "更低成本" },
      { value: "500+", label: "已交付项目" },
      { value: "99%", label: "客户满意度" },
    ],
    technologies: ["React", "Node.js", "AWS", "Azure", "Python", "Kubernetes"],
    faqs: [
      { q: "什么是数字化转型？", a: "利用数字技术实现运营现代化的过程。" },
      { q: "旧系统可以升级吗？", a: "可以，我们将旧系统现代化为可扩展的云原生解决方案。" },
    ],
  },

  "cloud-migration": {
    icon: "☁️",
    tagline: "在 AWS、Azure 和 Google Cloud 上更快运行、更低成本、更高信心。",
    overview: "我们通过零停机切换和内置成本控制来规划、迁移并优化您的云工作负载。",
    benefits: [
      { title: "更快交付", body: "云原生 CI/CD 将发布周期从数周缩短至数小时。" },
      { title: "成本控制", body: "FinOps 自动化可消除浪费并优化支出。" },
      { title: "弹性能力", body: "多区域故障切换和 99.99% 正常运行 SLA。" },
      { title: "安全性", body: "从第一天开始内置零信任安全架构。" },
    ],
    process: [
      { step: "01", title: "发现", body: "盘点工作负载、映射依赖关系并评估迁移复杂性。" },
      { step: "02", title: "迁移规划", body: "根据风险顺序将工作负载分组为迁移波次。" },
      { step: "03", title: "迁移", body: "利用自动化工具和运行手册进行迁移与重构。" },
      { step: "04", title: "优化", body: "迁移后进行 FinOps、预留容量和持续优化。" },
    ],
    stats: [
      { value: "40%", label: "平均成本节省" },
      { value: "3×", label: "更快部署" },
      { value: "99.99%", label: "正常运行 SLA" },
      { value: "200+", label: "已完成迁移" },
    ],
    technologies: ["AWS", "Azure", "Google Cloud", "Terraform", "Kubernetes", "ArgoCD"],
    faqs: [
      { q: "迁移需要多长时间？", a: "通常需要 8–24 周，具体取决于工作负载复杂性。" },
      { q: "会有停机时间吗？", a: "我们通过蓝绿和金丝雀部署方式实现零停机切换。" },
    ],
  },

  "ai-machine-learning": {
    icon: "🤖",
    tagline: "从概念验证到生产级 AI —— 内置自定义模型、LLM 应用与治理能力。",
    overview: "我们设计、构建并运营 AI 系统，以实现可衡量的业务成果，而不仅仅是演示。",
    benefits: [
      { title: "更快洞察", body: "实时 ML 推理替代人工分析。" },
      { title: "自动化", body: "智能工作流程降低运营开销。" },
      { title: "AI 治理", body: "内置审计跟踪、可解释性和偏差控制。" },
      { title: "LLM 应用", body: "基于您的数据构建 RAG 管道、副驾驶和智能代理。" },
    ],
    process: [
      { step: "01", title: "用例定义", body: "识别高价值 ML 机会并进行 ROI 估算。" },
      { step: "02", title: "数据准备", body: "评估、清理并构建模型训练数据管道。" },
      { step: "03", title: "模型开发", body: "使用 MLflow 跟踪训练、评估和优化模型。" },
      { step: "04", title: "MLOps", body: "模型 CI/CD、漂移监控与重新训练管道。" },
    ],
    stats: [
      { value: "90d", label: "从 PoC 到生产" },
      { value: "35%", label: "平均效率提升" },
      { value: "100+", label: "生产环境模型" },
      { value: "99%", label: "模型正常运行率" },
    ],
    technologies: ["Python", "PyTorch", "OpenAI", "LangChain", "MLflow", "Databricks"],
    faqs: [
      { q: "你们会使用我们现有的数据吗？", a: "会的 —— 我们会先评估您的数据环境并构建适用于模型的数据管道。" },
      { q: "你们如何处理 AI 治理？", a: "每个模型都会附带可解释性报告、偏差审计和监控仪表板。" },
    ],
  },

"application-development": {
  icon: "💻",
  tagline: "为规模与长期可靠性而构建的Web、移动与企业应用。",
  overview: "我们使用现代技术栈构建生产级应用，将性能、可访问性和安全性作为首要考量。",
  benefits: [
    { title: "快速上市", body: "迭代冲刺每两周交付可运行的软件。" },
    { title: "可扩展架构", body: "无需重写即可支撑10倍增长。" },
    { title: "完整所有权", body: "代码、文档和IP从第一天起完全属于您。" },
    { title: "质量保证", body: "自动化测试、可访问性审计和性能预算。" },
  ],
  process: [
    { step: "01", title: "发现", body: "用户研究、旅程映射和技术范围界定。" },
    { step: "02", title: "设计", body: "在写第一行代码前用真实用户验证的Figma原型。" },
    { step: "03", title: "构建", body: "两周冲刺、CI/CD、自动化QA和每周演示。" },
    { step: "04", title: "上线", body: "负载测试、安全审查和上线运行手册。" },
  ],
  stats: [
    { value: "8wk", label: "平均MVP周期" },
    { value: "99%", label: "按时交付率" },
    { value: "4.9★", label: "客户评分" },
    { value: "300+", label: "已交付应用" },
  ],
  technologies: ["React", "Next.js", "React Native", "Node.js", "TypeScript", "PostgreSQL"],
  faqs: [
    { q: "你们开发移动应用吗？", a: "是的 — iOS、Android以及使用React Native或Flutter的跨平台应用。" },
    { q: "代码归谁所有？", a: "归您所有 — 100% IP转让，无锁定。" },
  ],
},
"managed-it-services": {
  icon: "🛡️",
  tagline: "基础设施、应用和安全的7x24运维 — 全球交付。",
  overview: "我们作为您的扩展工程团队，全天候保持系统可用、安全和成本高效。",
  benefits: [
    { title: "永续在线", body: "7x24 NOC和SOC，15分钟内响应SLA。" },
    { title: "成本高效", body: "共享SRE模式比同等规模内部团队低60%成本。" },
    { title: "主动预防", body: "AIOps在用户察觉前检测并解决问题。" },
    { title: "合规运营", body: "符合SOC 2、ISO 27001的运营，月度报告。" },
  ],
  process: [
    { step: "01", title: "入驻", body: "第一周完成盘点、运行手册创建和监控配置。" },
    { step: "02", title: "基线", body: "30天性能和成本基线及快速优化。" },
    { step: "03", title: "稳定运行", body: "7x24监控、事件响应和变更管理。" },
    { step: "04", title: "优化", body: "月度审查，持续改进成本、可靠性和安全性。" },
  ],
  stats: [
    { value: "99.99%", label: "交付可用率" },
    { value: "<15min", label: "响应SLA" },
    { value: "60%", label: "相对内部团队成本" },
    { value: "24/7", label: "全球覆盖" },
  ],
  technologies: ["Datadog", "PagerDuty", "Terraform", "AWS", "Azure", "Kubernetes"],
  faqs: [
    { q: "事件响应时间是多少？", a: "P1事件5分钟内确认，15分钟内解决。" },
    { q: "可以管理我们现有的云账户吗？", a: "可以 — 我们接入您的账户并与您的团队并肩运营。" },
  ],
},
"consulting-advisory": {
  icon: "🎯",
  tagline: "资深从业者提供的独立技术战略、架构评审和CIO顾问服务。",
  overview: "我们提供客观、供应商中立的指导，帮助领导层更快做出更好的技术决策。",
  benefits: [
    { title: "客观性", body: "无供应商返佣 — 建议纯粹以您的利益为出发点。" },
    { title: "高级接触", body: "直接接触架构师和CTO，而非客户经理。" },
    { title: "速度", body: "结构化评审在数天而非数月内交付成果。" },
    { title: "可执行", body: "每个项目结束时提供优先级路线图和决策日志。" },
  ],
  process: [
    { step: "01", title: "需求梳理", body: "在2小时启动会中定义范围、问题和成功标准。" },
    { step: "02", title: "评估", body: "访谈、文档审查和架构分析。" },
    { step: "03", title: "发现", body: "包含风险、差距和机会评分的结构化报告。" },
    { step: "04", title: "路线图", body: "含工作量、成本和负责人的优先级建议。" },
  ],
  stats: [
    { value: "5d", label: "平均评审周期" },
    { value: "100%", label: "资深主导" },
    { value: "50+", label: "CIO项目" },
    { value: "4.9★", label: "客户评分" },
  ],
  technologies: ["TOGAF", "AWS Well-Architected", "NIST CSF", "DORA", "ITIL", "OKRs"],
  faqs: [
    { q: "建议是供应商中立的吗？", a: "是的 — 我们没有任何推荐协议。" },
    { q: "可以配合我们现有的供应商工作吗？", a: "当然 — 我们会客观评估您当前的技术栈。" },
  ],
},
},
extraSections: {
  freeAdviceChip: "创业者与业主专属免费",
  freeAdviceTitle: "免费商业咨询。无需承诺，没有附加条件。",
  freeAdviceSub: "预约与 MHTECHIN 顾问的 30 分钟战略通话。我们免费帮助创业者和中小企业主验证创意、选择技术栈、处理注册与税务、制定可信的 GTM 计划。",
  freeAdviceBookBtn: "预约免费通话",
  freeAdviceSeeBtn: "查看覆盖内容",
  freeAdviceItems: [
    { t: "创意验证", d: "30 分钟内明确问题-方案契合度。" },
    { t: "PMF 指导", d: "规模化前先测试信号。" },
    { t: "注册与税务", d: "实体结构、增值税、合规基础。" },
    { t: "技术路线图", d: "技术栈、预算、招聘优先级。" },
  ],
  researchTitle: "以研究为支撑的成果",
  researchProductsTitle: "产品影响力，可量化",
  researchNote: "云、AI、数据与安全项目的独立基准测试（2023–2025 年）。",
  researchStats: [
    { v: "3.4×", l: "交付速度超行业基准" },
    { v: "62%", l: "平均云成本降幅" },
    { v: "99.99%", l: "生产环境可用率" },
    { v: "120+", l: "全球企业级部署" },
  ],
  colorSpectrumKicker: "为何选择 MHTECHIN",
  colorSpectrumTitle: "卓越工程能力，创业者友好的方式",
  colorSpectrumItems: [
    { t: "成果优先", d: "约定 KPI，而不仅是交付物，每个冲刺都对应业务指标。" },
    { t: "高级工程师主导", d: "无纯初级团队。架构师和技术负责人从第一天起参与。" },
    { t: "云原生", d: "多云参考架构：AWS、GCP、Azure、本地及混合部署。" },
    { t: "AI 就绪数据", d: "从数据模型到 LLM 管道 — 无炒作的生产级 AI。" },
    { t: "安全即设计", d: "零信任、SAST/DAST、SBOM 内置于工程流程。" },
    { t: "全球交付", d: "APAC、欧洲和美洲时区重叠的 24/5 团队。" },
  ],
  productsSpectrumKicker: "产品能力",
  productsSpectrumTitle: "模块化构建块。可组合平台。",
  productsSpectrumItems: [
    { t: "API 优先", d: "每款产品均提供稳定的版本化 REST + GraphQL API。" },
    { t: "多租户", d: "行级隔离、SSO、租户级审计与配额。" },
    { t: "可观测性", d: "开箱即用的 OpenTelemetry 追踪、指标与日志。" },
    { t: "可扩展", d: "插件模型 + Webhook 用于内部集成。" },
    { t: "区域化", d: "按工作负载选择数据驻留地：APAC、欧洲、美洲、印度。" },
    { t: "弹性定价", d: "从小规模起步，可预期地增长，无意外超额费用。" },
  ],
  comparisonTitle: "MHTECHIN 产品对比",
  comparisonHeaders: { capability: "能力", us: "MHTECHIN", them: "典型供应商" },
  comparisonRows: [
    { feat: "价值实现时间", us: "4–8 周投入生产", them: "数个季度" },
    { feat: "可定制性", us: "源码可用的扩展", them: "有限配置" },
    { feat: "数据驻留", us: "按工作负载选择区域", them: "单一区域" },
    { feat: "高级支持", us: "架构师随时待命", them: "分级工单" },
    { feat: "AI 集成", us: "原生、受治理", them: "附加组件" },
  ],
  useCasesTitle: "创业者与企业选择我们的典型场景",
  useCases: [
    { tag: "AI", t: "运营团队 LLM 副驾驶", d: "基于您数据构建的自定义助手，含审计跟踪与 RBAC。" },
    { tag: "云", t: "多区域现代化", d: "将遗留单体改造为弹性可观测的微服务。" },
    { tag: "数据", t: "统一分析平台", d: "湖仓、语义层、BI — 唯一可信数据源。" },
    { tag: "安全", t: "零信任落地", d: "符合 ISO 27001 的身份、网络与工作负载隔离。" },
    { tag: "创业者", t: "MVP 到 PMF", d: "6–10 周发布可信 MVP，测量 PMF，快速迭代。" },
    { tag: "中小企业", t: "数字化运营一体化", d: "ERP、CRM、支付与仪表板整洁集成。" },
  ],
  productsUseCasesTitle: "团队用我们的产品构建什么",
  productsUseCases: [
    { tag: "云 OS", t: "内部开发者平台", d: "自助环境、黄金路径、FinOps 管控。" },
    { tag: "分析", t: "高管洞察", d: "支持下钻和告警的实时 KPI 仪表板。" },
    { tag: "AI 工作室", t: "智能体编排", d: "组合工具、记忆、评估、护栏。" },
    { tag: "安全", t: "零信任网关", d: "支持 mTLS 和审计的身份感知代理。" },
    { tag: "IoT 边缘", t: "车队遥测", d: "数百万设备，低延迟边缘处理。" },
    { tag: "消费者", t: "品牌移动应用", d: "跨平台、离线优先，附带增长分析。" },
  ],
  logosTitle: "我们交付的实践领域",
  quickContactTitle: "有问题？咨询 MHTECHIN 专家。",
  quickContactSub: "1 个工作日内回复。无销售压力 — 仅来自高级工程师和顾问的清晰解答。",
  quickContactBtn: "联系我们",
  quickContactFounderBtn: "创业者免费咨询",
  quickContactItems: [
    { t: "全球交付", d: "APAC、欧洲、美洲均设有中心。" },
    { t: "成果导向", d: "启动前约定 KPI。" },
    { t: "企业级安全", d: "符合 ISO 标准的工程。" },
    { t: "高级团队", d: "无纯初级团队。" },
  ],
  journeyKicker: "发展历程",
  journeyTitle: "从小型工作室到全球技术合作伙伴",
  journeySteps: [
    { y: "2023", t: "创立", d: "MHTECHIN 以一个愿景起步：为每家有雄心的公司提供企业级工程能力。" },
    { y: "2024", t: "云实践", d: "启动专属云 & DevOps 实践团队。完成首批 10 个生产级部署。" },
    { y: "2024", t: "全球扩张", d: "在 3 大洲开设交付中心。企业客户突破 50 家。" },
    { y: "2025", t: "AI 与数据", d: "组建数据平台和 ML 工程团队。完成首批 LLM 上线。" },
    { y: "2025", t: "安全与信任", d: "建立符合 ISO 标准的安全实践。向受监管客户交付零信任框架。" },
    { y: "2026", t: "创业者计划", d: "为创业者和中小企业主提供免费咨询。验证 → PMF → 注册支持。" },
  ],
  consent: {
    title: "隐私声明",
    description: "我们使用Cookie等技术来存储和/或访问设备信息。同意这些技术将允许我们在此网站上处理浏览行为或唯一ID等数据。我们根据《通用数据保护条例》（GDPR）和印度《数字个人数据保护法》（DPDP Act）尊重您的隐私。",
    accept: "接受",
    decline: "拒绝",
  },
},

};

export const TRANSLATIONS: Record<Locale, Dict> = { en, jp, de, fr, es, cn };

export function getDict(locale: Locale): Dict {
  return TRANSLATIONS[locale] ?? TRANSLATIONS.en;
}