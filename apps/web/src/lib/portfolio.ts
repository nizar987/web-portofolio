export const profile = {
  brand: "NIZAR_AULIA",
  name: "Muhammad Nizar Aulia",
  role: "Technical Lead & Software Engineer",
  headline: "Designing scalable backend systems and reliable web applications.",
  summary:
    "Results-driven Software Engineer with 7+ years of experience specializing in backend architecture, database optimization, and high-performance microservices. Proven track record of reducing infrastructure costs and mentoring high-performing engineering teams.",
  location: "West Java, Indonesia",
  email: "nizar.aulia90@gmail.com",
  resumeUrl: "/muhammad_nizar_aulia_cv.docx",
  socials: [
    { label: "GitHub", href: "https://github.com/nizar987" },
    { label: "LinkedIn", href: "https://linkedin.com/in/muhammad-nizar-aulia-64138315b" },
    { label: "Email", href: "mailto:nizar.aulia90@gmail.com" },
    { label: "Instagram", href: "https://www.instagram.com/muhammadnizaraulia/" }
  ]
};

export const stats = [
  { label: "Years Experience", value: "7+" },
  { label: "Major Projects", value: "8+" },
  { label: "Load Reduced", value: "35%" }
];

export const techStack = [
  { name: "Python", category: "Language", icon: "braces" },
  { name: "Golang", category: "Language", icon: "braces" },
  { name: "Django / Frappe", category: "Backend", icon: "server" },
  { name: "React / Next.js", category: "Frontend", icon: "layers" },
  { name: "TypeScript / JS", category: "Language", icon: "code" },
  { name: "Vue.js", category: "Frontend", icon: "code" },
  { name: "Tailwind CSS", category: "Design", icon: "palette" },
  { name: "PostgreSQL / MySQL", category: "Database", icon: "database" },
  { name: "Redis", category: "Database", icon: "database" },
  { name: "AWS & Docker", category: "Platform", icon: "container" }
];

export const projects = [
  {
    title: "Scalable Queue Microservice",
    description:
      "Architected and deployed a highly scalable background processing system using Django and Redis, reducing core application processing load by 35% and enhancing system stability.",
    tags: ["Python", "Django", "Redis", "Microservices"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    sourceUrl: "#",
    liveUrl: "#"
  },
  {
    title: "Enterprise WMS System Migration",
    description:
      "Spearheaded the complex migration of a core Frappe ERP system, refactoring database queries and REST APIs to ensure zero data loss and minimal operational downtime.",
    tags: ["Frappe", "Python", "MariaDB", "AWS"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    sourceUrl: "#",
    liveUrl: "https://simpan.praktis.co"
  },
  {
    title: "Operational Workflow Automation",
    description:
      "Streamlined business operations by automating critical workflows and cron-based scheduling using n8n, eliminating repetitive manual tasks across various teams.",
    tags: ["n8n", "CI/CD", "Automation", "Docker"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    sourceUrl: "#",
    liveUrl: "#"
  }
];

export const experience = [
  {
    role: "Technical Lead",
    company: "Praktis",
    period: "Apr 2023 - Present",
    description:
      "Drove significant annual savings in server costs through resource optimization and advanced SQL tuning. Architected a scalable queue microservice (Django + Redis) reducing load by 35%. Mentored junior developers and aligned technical strategies with business goals."
  },
  {
    role: "Software Engineer",
    company: "Praktis",
    period: "Apr 2019 - Apr 2023",
    description:
      "Spearheaded core Frappe system migration with zero downtime. Refactored complex database queries and APIs. Built modern web interfaces using React.js, Next.js, Vue.js, and Tailwind CSS."
  }
];
