export type ProjectCategory = "AI" | "Business" | "Tools" | "Platform";

export type ProjectOrg = "Praktis" | "Personal";

export type ProjectStatus = "live" | "production" | "building" | "prototype" | "shipped" | "retired" | "contributor";

export interface ProjectLink {
  kind: "live" | "repo";
  label: string;
  href: string;
}

export interface CatalogProject {
  slug: string;
  org: ProjectOrg;
  name: string;
  /** Start year, shown in the list. */
  year: string;
  /** Full span, shown in the detail view when it differs from `year`. */
  period?: string;
  category: ProjectCategory;
  status: ProjectStatus;
  summary: string;
  description: string;
  highlights: string[];
  stack: string[];
  links: ProjectLink[];
}

export const statusLabels: Record<ProjectStatus, string> = {
  live: "Live",
  production: "In production",
  building: "In development",
  prototype: "Prototype",
  shipped: "Shipped",
  retired: "Retired",
  contributor: "Contributor"
};

export const projectCategories: ProjectCategory[] = ["AI", "Business", "Tools", "Platform"];

// Company systems (internal repos are never linked) come first, then personal work.
export const catalogProjects: CatalogProject[] = [
  {
    slug: "pts-v2",
    org: "Praktis",
    name: "Praktis ERP Core",
    year: "2021",
    period: "2021 — Present",
    category: "Business",
    status: "production",
    summary: "Frappe/ERPNext app at the heart of Praktis's warehousing and fulfillment operations.",
    description:
      "A custom Frappe application extending ERPNext for warehousing, manufacturing, and delivery — stock movements, goods receipts, stock opname, and the integration with the order management system. It is the backend behind the Simpan web and mobile apps.",
    highlights: [
      "Stock opname reconciliation and stock sync with the order management system.",
      "SQL tuning and query refactoring across business modules to cut server cost.",
      "BigQuery exports, PDF processing, and Excel reporting pipelines."
    ],
    stack: ["Python", "Frappe", "ERPNext", "MariaDB", "Redis", "BigQuery"],
    links: []
  },
  {
    slug: "simpan-web",
    org: "Praktis",
    name: "Simpan Praktis",
    year: "2022",
    period: "2022 — Present",
    category: "Business",
    status: "live",
    summary: "Warehouse management web app for fulfillment teams.",
    description:
      "The main web client of Simpan Praktis, the company's warehouse management system: inbound, picking, packing, delivery handover, stock opname, and reporting. I have been one of its core contributors since 2022.",
    highlights: [
      "Delivery handover reports with per-batch PDF export and a compact, high-contrast list.",
      "Stock opname and item-dimension CSV import and export.",
      "In-app notifications with unread badges; Jest test suite."
    ],
    stack: ["Next.js", "React", "TypeScript", "Jest"],
    links: [{ kind: "live", label: "Visit Simpan Praktis", href: "https://simpan.praktis.co" }]
  },
  {
    slug: "wms-queue",
    org: "Praktis",
    name: "WMS Queue",
    year: "2023",
    period: "2023 — Present",
    category: "Platform",
    status: "production",
    summary: "Django + Redis queue service that takes heavy warehouse jobs off the ERP.",
    description:
      "Background processing for the warehouse system: jobs are queued in Redis and run by RQ workers, with a dashboard to monitor and schedule them. It cut core processing load by 35%.",
    highlights: [
      "Custom RQ workers for high-volume, business-critical jobs.",
      "Cron-style system tasks managed from the dashboard.",
      "Bounded timeouts and retries on ledger calls so jobs never sit holding locks."
    ],
    stack: ["Django", "Redis", "RQ", "APScheduler", "Docker"],
    links: []
  },
  {
    slug: "kemas-praktis",
    org: "Praktis",
    name: "Kemas Praktis",
    year: "2024",
    period: "2024 — 2026",
    category: "Business",
    status: "live",
    summary: "B2B warehouse management for packaging operations.",
    description:
      "A business-to-business warehouse management platform for packaging: client packaging stock, delivery orders, and picking. I also started its Go service rewrite.",
    highlights: [
      "Delivery order import and picking flow on a Django backend with dashboards.",
      "Scheduled jobs with APScheduler; containerized with Docker.",
      "Go rewrite foundation with Gin, GORM, JWT auth, and middleware."
    ],
    stack: ["Django", "Python", "Go", "Gin", "GORM", "Docker"],
    links: [{ kind: "live", label: "Visit Kemas Praktis", href: "https://kemas.praktis.co" }]
  },
  {
    slug: "simpan-mobile",
    org: "Praktis",
    name: "Simpan Mobile",
    year: "2021",
    period: "2021 — Present",
    category: "Business",
    status: "building",
    summary: "Android handheld app for warehouse scanning, now rewritten in Flutter.",
    description:
      "The warehouse operators' handheld app for scanning, packing, and stock opname. I maintained the React Native app's build pipeline and wrote its Flutter rewrite — a thin client over the Frappe backend.",
    highlights: [
      "Flutter port of the WMS modules, including an operator stock opname scan flow.",
      "Packaging item master cached on-device for offline scans.",
      "GitLab CI pipeline for the React Native Android builds."
    ],
    stack: ["Flutter", "React Native", "Frappe API"],
    links: []
  },
  {
    slug: "kubernetes-platform",
    org: "Praktis",
    name: "Kubernetes Platform",
    year: "2022",
    period: "2022 — Present",
    category: "Platform",
    status: "production",
    summary: "Kubernetes, Helm, and Terraform for the company's dev and production environments.",
    description:
      "Infrastructure as code for development and production clusters: Helm charts, Kubernetes manifests, cron jobs, backups, and observability for the Praktis and omnichannel workloads.",
    highlights: [
      "Helm charts and Terraform for development and production clusters on AWS.",
      "Autoscaling with HPA and Karpenter-managed nodes.",
      "Prometheus, Loki, and Grafana observability, plus scheduled backup workloads."
    ],
    stack: ["Kubernetes", "Helm", "Terraform", "AWS", "Prometheus", "Grafana"],
    links: []
  },
  {
    slug: "simpan-web-v1",
    org: "Praktis",
    name: "Simpan Praktis v1",
    year: "2021",
    period: "2021 — 2023",
    category: "Business",
    status: "retired",
    summary: "The first React web client for the warehouse system.",
    description:
      "The original React dashboard for Simpan Praktis, used until the Next.js rewrite — shipping labels, delivery deadlines, and embedded analytics.",
    highlights: [
      "Shipping label generation for outbound orders.",
      "Delivery deadlines driven by SLA instead of fixed dates.",
      "Embedded Metabase dashboards for operations reporting."
    ],
    stack: ["React", "TypeScript", "Metabase", "Docker"],
    links: []
  },
  {
    slug: "pts-portal",
    org: "Praktis",
    name: "PTS Portal",
    year: "2018",
    period: "2018 — 2023",
    category: "Business",
    status: "retired",
    summary: "Client-facing dashboard for the PTS platform.",
    description:
      "A Vue client portal on top of the PTS platform, giving clients token-based access to their data and embedded reporting.",
    highlights: [
      "Rebuilt dashboard and the v2 token integration.",
      "Embedded Metabase reports for clients.",
      "Moved analytics endpoints over to the praktis.co domain."
    ],
    stack: ["Vue", "Bootstrap", "Node.js"],
    links: []
  },
  {
    slug: "pts-v1",
    org: "Praktis",
    name: "PTS ERP v1",
    year: "2019",
    period: "2019 — 2020",
    category: "Business",
    status: "retired",
    summary: "The original ERPNext extension for manufacturing, warehousing, and delivery.",
    description:
      "The first custom ERPNext app for the company's manufacturing, warehousing, and delivery business serving creative-industry clients, later superseded by the ERP core v2.",
    highlights: [
      "Shopify order and payment integration into sales invoices.",
      "Custom doctypes, hooks, and Swagger-documented APIs.",
      "Superseded by Praktis ERP Core (v2)."
    ],
    stack: ["Python", "Frappe", "ERPNext", "MariaDB"],
    links: []
  },
  {
    slug: "bigquery-service",
    org: "Praktis",
    name: "BigQuery Service",
    year: "2022",
    category: "Platform",
    status: "shipped",
    summary: "Django API that serves reporting queries from Google BigQuery.",
    description: "A small Django REST service that runs analytics queries against Google BigQuery for reporting, documented with OpenAPI.",
    highlights: [
      "Query endpoints on top of google-cloud-bigquery.",
      "OpenAPI documentation via drf-spectacular.",
      "Containerized with Docker."
    ],
    stack: ["Django", "DRF", "BigQuery", "Docker"],
    links: []
  },
  {
    slug: "ai-video-clipper",
    org: "Personal",
    name: "AI Video Clipper",
    year: "2026",
    category: "AI",
    status: "building",
    summary: "Turns long videos into vertical short clips with AI-picked hooks.",
    description:
      "Upload a long podcast, livestream, or tutorial and pick a genre. The pipeline finds the strongest hooks for that genre and exports ready-to-post vertical clips for TikTok, Reels, and Shorts.",
    highlights: [
      "Pipeline: transcription → genre-aware hook analysis → cutting → subtitles → export.",
      "Celery workers run heavy render jobs outside the API request cycle.",
      "MVP target: a 60-minute video becomes upload-ready clips in under 15 minutes."
    ],
    stack: ["FastAPI", "Celery", "Next.js", "PostgreSQL", "Redis"],
    links: []
  },
  {
    slug: "labelforge",
    org: "Personal",
    name: "LabelForge",
    year: "2026",
    category: "Business",
    status: "building",
    summary: "Drag-and-drop barcode label designer that prints straight to thermal printers.",
    description:
      "A web take on ZebraDesigner: design custom barcode labels on a canvas, then print them precisely to Zebra-class thermal printers via ZPL or export to PDF and PNG. Multi-tenant, with organizations, templates, print jobs, and free/premium billing.",
    highlights: [
      "Canvas editor with PDF, PNG, and ZPL export; the ZPL generator is unit-tested.",
      "NestJS + Prisma backend with organizations, audit logs, and AI usage tracking.",
      "Separate SvelteKit admin panel to onboard organizations, users, and billing plans."
    ],
    stack: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "Redis", "SvelteKit"],
    links: [{ kind: "repo", label: "Admin panel source", href: "https://github.com/nizar987/labelforge-admin" }]
  },
  {
    slug: "kelolain",
    org: "Personal",
    name: "Kelolain",
    year: "2026",
    category: "AI",
    status: "building",
    summary: "Personal finance app that logs spending by scanning receipts.",
    description:
      "A mobile finance tracker that removes manual entry: snap a receipt and AI extracts the items and prices into categorized transactions, then ask the built-in AI chat about your spending.",
    highlights: [
      "Receipt OCR with automatic item and price extraction.",
      "AI financial chat that answers questions about the user's own transactions.",
      "Go Fiber API with MariaDB, Redis, and MinIO object storage; Flutter client."
    ],
    stack: ["Go", "Fiber", "Flutter", "MariaDB", "Redis", "MinIO"],
    links: []
  },
  {
    slug: "kasirpintar",
    org: "Personal",
    name: "KasirPintar.AI",
    year: "2026",
    category: "Business",
    status: "building",
    summary: "Point-of-sale for Indonesian retail, from a single warung to multi-branch stores.",
    description:
      "A POS platform designed to scale from a one-counter warung to multi-branch retail chains, combining checkout and payments with AI-generated sales insight.",
    highlights: [
      "Cashier web app for desktop and tablet.",
      "Flutter mobile app for customer ordering and payment.",
      "Go backend shared by both clients, with AI insight on sales data."
    ],
    stack: ["Go", "Next.js", "Flutter"],
    links: []
  },
  {
    slug: "taskwidget",
    org: "Personal",
    name: "TaskWidget",
    year: "2026",
    category: "Tools",
    status: "building",
    summary: "macOS menu-bar task manager with desktop widgets and a quick-capture hotkey.",
    description:
      "A native macOS task manager in the menu bar, with small, medium, and large desktop widgets, a calendar, weekly reports, and a global ⌥Space quick capture.",
    highlights: [
      "Quick capture parses tags, priority, and dates inline — e.g. “Fix bug #wms !high besok”.",
      "A small local Rust server on 127.0.0.1 keeps all data on-device.",
      "Ships an MCP server so AI assistants can read and update tasks."
    ],
    stack: ["Swift", "SwiftUI", "WidgetKit", "Rust"],
    links: [{ kind: "repo", label: "Source on GitHub", href: "https://github.com/nizar987/personal-widget" }]
  },
  {
    slug: "agent-platform",
    org: "Personal",
    name: "Agent Platform",
    year: "2026",
    category: "AI",
    status: "building",
    summary: "Local-first desktop app for building teams of collaborating AI agents.",
    description:
      "Create specialized AI agents with their own prompts and tools, connect them to any Anthropic-, OpenAI-, or Gemini-compatible provider, and let them collaborate — with data kept on your machine.",
    highlights: [
      "Unlimited agents with custom system prompts, avatars, and tool configurations.",
      "Provider-agnostic: works with Anthropic, OpenAI, and Gemini-compatible APIs.",
      "Local-first storage, plus built-in notes and task APIs."
    ],
    stack: ["Electron", "Next.js", "TypeScript"],
    links: [{ kind: "repo", label: "Source on GitHub", href: "https://github.com/nizar987/multi-agent-fe" }]
  },
  {
    slug: "queryflow",
    org: "Personal",
    name: "QueryFlow",
    year: "2026",
    category: "Tools",
    status: "prototype",
    summary: "Visualizer and debugger for complex SQL queries.",
    description:
      "Paste a complex query — multi-JOIN, subqueries, CTEs, window functions, UNIONs — and QueryFlow walks through it in logical execution order, so it is clear what each stage does to the data.",
    highlights: [
      "Parses SQL into an AST with node-sql-parser.",
      "Shows the logical order (FROM → WHERE → GROUP BY → HAVING → SELECT), not the written order.",
      "Kept as a local tool on purpose, since it can run queries against your database."
    ],
    stack: ["SvelteKit", "Svelte 5", "node-sql-parser"],
    links: [{ kind: "repo", label: "Source on GitHub", href: "https://github.com/nizar987/queryflow" }]
  },
  {
    slug: "kubepilot",
    org: "Personal",
    name: "KubePilot",
    year: "2026",
    category: "Tools",
    status: "prototype",
    summary: "Kubernetes cost and right-sizing advisor.",
    description:
      "Compares the CPU and memory requests and limits in a cluster's manifests with real usage, then recommends right-sized values — fixing limits that were guessed at first deploy and never revisited.",
    highlights: [
      "Request/limit versus actual-usage analysis per workload.",
      "Right-sizing recommendations to cut over-provisioned spend.",
      "Go backend with a React + Vite dashboard."
    ],
    stack: ["Go", "React", "Vite", "Kubernetes"],
    links: []
  },
  {
    slug: "guyubai",
    org: "Personal",
    name: "GuyubAI",
    year: "2026",
    category: "AI",
    status: "live",
    summary: "Fast, lightweight multi-model AI chat.",
    description:
      "A responsive AI chat web app built with SvelteKit and Svelte 5 runes. It auto-detects dozens of models, groups them by provider, and supports image upload.",
    highlights: [
      "Svelte 5 runes keep the client small and reactive.",
      "Models are discovered automatically and grouped by provider.",
      "Docker Compose setups for development and production."
    ],
    stack: ["SvelteKit", "Svelte 5", "PostgreSQL", "Redis", "Docker"],
    links: [
      { kind: "live", label: "Visit live app", href: "https://guyubai.vercel.app" },
      { kind: "repo", label: "Source on GitHub", href: "https://github.com/nizar987/guyubai" }
    ]
  },
  {
    slug: "noor-ai",
    org: "Personal",
    name: "Noor AI",
    year: "2026",
    category: "AI",
    status: "live",
    summary: "AI generator for Islamic content and stories from Islamic history.",
    description:
      "Generates Islamic content — including stories from Islamic history — through a prompt builder tuned per content type, routed across multiple combined models.",
    highlights: [
      "Prompt builder tuned per content type.",
      "Routes requests across multiple models via 9router.",
      "Next.js app deployed on Vercel."
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: [
      { kind: "live", label: "Visit live app", href: "https://noor-app-nine.vercel.app" },
      { kind: "repo", label: "Source on GitHub", href: "https://github.com/nizar987/noor-app" }
    ]
  },
  {
    slug: "app-kosan",
    org: "Personal",
    name: "App Kosan",
    year: "2026",
    category: "Business",
    status: "prototype",
    summary: "Listing and search platform for kos (boarding houses).",
    description:
      "A marketplace for finding a kos: browse listings and property pages, save favorites, and manage an account.",
    highlights: [
      "Listings, property detail pages, and favorites.",
      "Account sign-up and login.",
      "Next.js App Router with Prisma for data access."
    ],
    stack: ["Next.js", "Prisma", "TypeScript"],
    links: []
  },
  {
    slug: "dentaldiary",
    org: "Personal",
    name: "DentalDiary",
    year: "2025",
    category: "Business",
    status: "contributor",
    summary: "Dental practice management — Go API and Vue admin dashboard.",
    description:
      "Practice management for dental clinics: patient medical records, examinations and diagnoses, scheduling, invoices, and WhatsApp messaging. I contributed across both the API and the dashboard.",
    highlights: [
      "Go API structured with Domain-Driven Design and a multi-database setup.",
      "WhatsApp session and messaging integration.",
      "Dashboard work: calendar filters, invoice printing, and doctor leave management."
    ],
    stack: ["Go", "Vue.js", "Tailwind CSS", "PostgreSQL", "Docker"],
    links: []
  },
  {
    slug: "hurra-store",
    org: "Personal",
    name: "Hurra Store",
    year: "2025",
    category: "Business",
    status: "prototype",
    summary: "Online store for clothes, bags, and shoes.",
    description:
      "An e-commerce storefront: a Next.js web app with Clerk authentication and React Query, backed by a FastAPI service using PostgreSQL and RabbitMQ.",
    highlights: [
      "Clerk authentication and React Query data fetching.",
      "FastAPI backend with RabbitMQ for message queuing.",
      "PostgreSQL storage with a Docker Compose local stack."
    ],
    stack: ["Next.js", "Clerk", "FastAPI", "PostgreSQL", "RabbitMQ"],
    links: [{ kind: "repo", label: "Web source on GitHub", href: "https://github.com/nizar987/hurra-web" }]
  },
  {
    slug: "genai-chat-api",
    org: "Personal",
    name: "GenAI Chat API",
    year: "2025",
    category: "AI",
    status: "prototype",
    summary: "FastAPI + LangChain backend for authenticated chat and text generation.",
    description:
      "A REST API exposing chat and text-generation endpoints over OpenAI models through LangChain, with an MVC structure and PASETO token auth guarding every AI endpoint.",
    highlights: [
      "PASETO-based register, login, and logout.",
      "LangChain integration for chat and text generation.",
      "Alembic migrations, a pytest suite, and Railway deployment config."
    ],
    stack: ["FastAPI", "LangChain", "PostgreSQL", "Alembic"],
    links: []
  }
];
