export type SocialLabel = "GitHub" | "LinkedIn" | "Email" | "Instagram";

export interface Social {
  label: SocialLabel;
  href: string;
  handle: string;
}

export type DiagramKind = "queue" | "migration" | "automation";

export interface Project {
  title: string;
  description: string;
  impact: string;
  tags: string[];
  diagram: DiagramKind;
  caption: string;
  sourceUrl?: string;
  liveUrl?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  current: boolean;
  highlights: string[];
}

export interface StackGroup {
  category: string;
  items: string[];
}

export const profile = {
  name: "Muhammad Nizar Aulia",
  shortName: "Nizar Aulia",
  role: "Technical Lead & Software Engineer",
  summary:
    "Software engineer with 7+ years in backend architecture, database optimization, and high-performance microservices. I cut infrastructure costs, keep migrations boring, and mentor the engineers who ship with me.",
  location: "West Java, Indonesia",
  timezone: "GMT+7",
  availability: "Open to lead roles & freelance",
  email: "nizar.aulia90@gmail.com",
  resumeUrl: "/muhammad_nizar_aulia_cv.docx",
  socials: [
    { label: "GitHub", href: "https://github.com/nizar987", handle: "nizar987" },
    { label: "LinkedIn", href: "https://linkedin.com/in/muhammad-nizar-aulia-64138315b", handle: "muhammad-nizar-aulia" },
    { label: "Email", href: "mailto:nizar.aulia90@gmail.com", handle: "nizar.aulia90@gmail.com" },
    { label: "Instagram", href: "https://www.instagram.com/muhammadnizaraulia/", handle: "@muhammadnizaraulia" }
  ] satisfies Social[]
};

export function getSocial(label: SocialLabel): Social {
  const social = profile.socials.find((item) => item.label === label);

  if (!social) {
    throw new Error(`Missing social link: ${label}`);
  }

  return social;
}

export const stats = [
  { label: "Years building production systems", value: 7, suffix: "+" },
  { label: "Major projects delivered", value: 8, suffix: "+" },
  { label: "Core processing load removed", value: 35, suffix: "%" }
];

export const projects: Project[] = [
  {
    title: "Scalable Queue Microservice",
    description:
      "Moved heavy work out of the request cycle into a Django + Redis background processing service, so the core application stays responsive under peak load.",
    impact: "−35% processing load on the core app",
    tags: ["Python", "Django", "Redis", "Microservices"],
    diagram: "queue",
    caption: "Requests enqueue jobs; a worker pool drains the Redis queue independently."
  },
  {
    title: "Enterprise WMS Migration",
    description:
      "Led the migration of a core Frappe ERP warehouse system — refactoring database queries and REST APIs stage by stage to protect every record in flight.",
    impact: "Zero data loss, minimal operational downtime",
    tags: ["Frappe", "Python", "MariaDB", "AWS"],
    diagram: "migration",
    caption: "Legacy schema, queries, and APIs migrated in verified stages.",
    liveUrl: "https://simpan.praktis.co"
  },
  {
    title: "Operational Workflow Automation",
    description:
      "Automated critical business workflows and cron-based scheduling with n8n, replacing repetitive manual hand-offs across several teams.",
    impact: "Recurring manual tasks eliminated",
    tags: ["n8n", "CI/CD", "Automation", "Docker"],
    diagram: "automation",
    caption: "A scheduled trigger fans out into transform, branch, and delivery steps."
  }
];

export const experience: Experience[] = [
  {
    role: "Technical Lead",
    company: "Praktis",
    period: "Apr 2023 — Present",
    current: true,
    highlights: [
      "Drove significant annual server-cost savings through resource optimization and advanced SQL tuning.",
      "Architected a scalable queue microservice (Django + Redis) that reduced core load by 35%.",
      "Mentor junior developers and align technical strategy with business goals."
    ]
  },
  {
    role: "Software Engineer",
    company: "Praktis",
    period: "Apr 2019 — Apr 2023",
    current: false,
    highlights: [
      "Spearheaded the core Frappe system migration with zero downtime.",
      "Refactored complex database queries and APIs for performance.",
      "Built modern web interfaces with React, Next.js, Vue.js, and Tailwind CSS."
    ]
  }
];

export const stack: StackGroup[] = [
  { category: "Languages", items: ["Python", "Golang", "TypeScript", "JavaScript"] },
  { category: "Backend", items: ["Django", "Frappe", "REST APIs", "Microservices"] },
  { category: "Data", items: ["PostgreSQL", "MySQL / MariaDB", "Redis"] },
  { category: "Frontend", items: ["React", "Next.js", "Vue.js", "Tailwind CSS"] },
  { category: "Platform", items: ["AWS", "Docker", "CI/CD", "n8n"] }
];
