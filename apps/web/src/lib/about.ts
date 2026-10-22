export interface AboutFact {
  label: string;
  value: string;
}

export interface Principle {
  title: string;
  description: string;
}

export interface Milestone {
  year: string;
  title: string;
  detail: string;
}

export const aboutHeadline = "I build the backend systems operations teams rely on every day.";

export const aboutBio = [
  "I'm Muhammad Nizar Aulia, a software engineer based in West Java, Indonesia. Since 2019 I've been at Praktis, growing from software engineer to technical lead while building the systems behind its warehousing and fulfillment operations.",
  "Most of my work lives in the backend: Frappe and Django services, SQL tuning, and queue-based architecture that keeps core apps responsive under load. I like decisions backed by numbers — cost, load, response time — and migrations nobody notices.",
  "Outside of work I build my own products — AI tools, developer utilities, and business apps — and I'm deepening my Golang and cloud-native skills."
];

export const aboutFacts: AboutFact[] = [
  { label: "Based in", value: "West Java, Indonesia · GMT+7" },
  { label: "Currently", value: "Technical Lead at Praktis" },
  { label: "Experience", value: "7+ years in production systems" },
  { label: "Education", value: "Bachelor's in Computer Science, Universitas Gunadarma" },
  { label: "Languages", value: "Indonesian (native), English (professional)" }
];

export const principles: Principle[] = [
  { title: "Strategic thinker", description: "Translate business needs into technical solutions that scale." },
  { title: "Team multiplier", description: "Mentor junior developers, run code reviews, and grow a culture of learning." },
  { title: "Problem solver", description: "Take on hard architectural and performance problems head-on." },
  { title: "Data-driven", description: "Back decisions with metrics: cost, load, and response time." },
  { title: "Continuous learner", description: "Actively upskilling in Golang, cloud-native architecture, and AI tooling." },
  { title: "Stakeholder-ready", description: "Bridge engineering teams and business stakeholders." }
];

// Dates come from the CV and the history of the repositories I worked on.
export const milestones: Milestone[] = [
  {
    year: "2014",
    title: "Started Computer Science",
    detail: "Bachelor's programme at Universitas Gunadarma, graduating in 2018."
  },
  {
    year: "2019",
    title: "Joined Praktis as a Software Engineer",
    detail: "Built on the first ERPNext platform, including Shopify order and payment integrations."
  },
  {
    year: "2021",
    title: "Started the ERP core v2 and the first Simpan web app",
    detail: "The Frappe backend and React client that run warehouse operations to this day."
  },
  {
    year: "2022",
    title: "Rebuilt Simpan on Next.js and moved into infrastructure",
    detail: "Kubernetes, Helm, and Terraform for the development and production environments."
  },
  {
    year: "2023",
    title: "Promoted to Technical Lead",
    detail: "Shipped the WMS Queue service with Django + Redis, cutting core processing load by 35%."
  },
  {
    year: "2024",
    title: "Kemas Praktis",
    detail: "A B2B warehouse management platform for packaging operations."
  },
  {
    year: "2026",
    title: "Flutter rewrite and AI products",
    detail: "Rewriting the warehouse handheld app in Flutter, and building AI products on the side."
  }
];

export const interests = [
  "AI / LLM tools",
  "Open source",
  "Cloud architecture",
  "Backend performance tuning",
  "Team building"
];

export const learning = ["Golang", "Cloud-native architecture", "AI tooling"];
