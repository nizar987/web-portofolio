export const profile = {
  brand: "NIZAR_AULIA",
  name: "Muhammad Nizar Aulia",
  role: "Full Stack Software Engineer",
  headline: "Building robust products with modern web architecture.",
  summary:
    "I design and develop production-ready applications with scalable backend services, sharp frontend experiences, and pragmatic cloud infrastructure.",
  location: "Indonesia",
  email: "hello@nizaraulia.dev",
  resumeUrl: "#",
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Email", href: "mailto:hello@nizaraulia.dev" }
  ]
};

export const stats = [
  { label: "Years Building", value: "5+" },
  { label: "Production Apps", value: "20+" },
  { label: "Core Stack", value: "TS" }
];

export const techStack = [
  { name: "Next.js", category: "Frontend", icon: "layers" },
  { name: "React", category: "Frontend", icon: "code" },
  { name: "TypeScript", category: "Language", icon: "braces" },
  { name: "Tailwind", category: "Design", icon: "palette" },
  { name: "NestJS", category: "Backend", icon: "server" },
  { name: "Node.js", category: "Runtime", icon: "terminal" },
  { name: "PostgreSQL", category: "Database", icon: "database" },
  { name: "Docker", category: "Platform", icon: "container" },
  { name: "Kubernetes", category: "Infra", icon: "workflow" },
  { name: "AWS", category: "Cloud", icon: "cloud" }
];

export const projects = [
  {
    title: "Operational Dashboard Platform",
    description:
      "A real-time internal dashboard for monitoring operational metrics, user activity, and service health across multiple product teams.",
    tags: ["Next.js", "NestJS", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    sourceUrl: "#",
    liveUrl: "#"
  },
  {
    title: "Distributed API Gateway",
    description:
      "A modular API gateway with authentication, rate limiting, request tracing, and service-level routing for microservice environments.",
    tags: ["Node.js", "Docker", "Kubernetes"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    sourceUrl: "#",
    liveUrl: "#"
  },
  {
    title: "Finance Workflow Automation",
    description:
      "A workflow engine that automates reconciliation, approval queues, and audit trails for finance teams using event-driven services.",
    tags: ["TypeScript", "Queues", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    sourceUrl: "#",
    liveUrl: "#"
  }
];

export const experience = [
  {
    role: "Senior Software Engineer",
    company: "Tech Product Team",
    period: "2022 - Present",
    description:
      "Lead full-stack delivery for operational products, API services, and deployment pipelines. Improved service reliability and reduced manual release work through CI/CD automation."
  },
  {
    role: "Full Stack Developer",
    company: "Digital Solutions Studio",
    period: "2019 - 2022",
    description:
      "Built customer-facing web apps, admin systems, and backend integrations with React, Node.js, PostgreSQL, and cloud services."
  }
];
