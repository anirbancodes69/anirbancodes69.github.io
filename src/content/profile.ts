// Single source of truth for identity, experience and skills.
// The website reads from here; the resumes will be generated from the same data.

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${basePath}${path}`;

export const profile = {
  name: "Anirban Bhowmick",
  headline: ["Senior Backend & AI Engineer", "Enterprise Modernization"],
  intro:
    "I build scalable backend platforms, modernize enterprise systems and engineer AI-enabled products in which the model is one well-tested part of a reliable system.",
  location: "Kolkata, West Bengal, India",
  email: "anirbancodes@gmail.com",
  linkedin: "https://linkedin.com/in/anirban-bhowmick",
  github: "https://github.com/anirbancodes69",
  resume: "/downloads/Anirban_Bhowmick_Backend_AI_Engineer.pdf",
  currentRole: "Senior Software Engineer & Tech Lead, Dexian India Technologies",
};

// Every figure below comes from the resume or from a project's own status file. Nothing is estimated.
export const proofPoints = [
  {
    value: "20+",
    label: "Legacy Core PHP modules migrated to Laravel, a migration I led",
    context: "Sunstone",
  },
  {
    value: "30%",
    label: "Faster API responses, with 40% less database load, through Redis caching",
    context: "Sunstone",
  },
  {
    value: "200+",
    label: "Production issues resolved on a high-traffic education platform",
    context: "Collegesearch",
  },
  {
    value: "575",
    label: "Automated tests behind BusinessPilot, 199 of them guarding tenant isolation",
    context: "Independent product",
  },
];

// The three strands of the work, drawn as small pipelines in the hero.
export const lanes = [
  { name: "Backend platforms", steps: ["REST API", "Redis cache", "PostgreSQL"] },
  { name: "Enterprise modernization", steps: ["Legacy flow", "Kafka", "Microservices"] },
  { name: "AI systems", steps: ["Question", "LLM planner", "Validated query"] },
];

export const about = [
  "I started in 2021 on a high-traffic education platform, where the job was keeping production healthy: more than 200 production issues resolved, slow MySQL queries rewritten, and Core Web Vitals pushed to a Page Experience score above 90.",
  "At Sunstone I moved from fixing systems to reshaping them. I led the migration of over 20 business modules from Core PHP to Laravel, put JWT-secured REST APIs in front of them, and used Redis caching to cut API response times by 30% and database load by 40%, on AWS infrastructure I also looked after.",
  "Today I am a tech lead at Dexian, working on enterprise integration: connecting a Laravel platform to Adobe Experience Manager and Stibo STEP, moving legacy cron jobs into containerised batch workflows, and centralising secrets in Azure Key Vault. I also designed and built a proof of concept for a client that replaces IBM App Connect Enterprise flows with Kafka-based Java microservices.",
  "Outside work I build products end to end. The most developed is BusinessPilot, a multi-tenant AI business analyst in which the language model plans queries but never writes SQL and never decides who may see what. That is the kind of AI engineering I care about: models placed inside systems that stay correct, secure and testable.",
];

export type Role = {
  company: string;
  title: string;
  period: string;
  stack: string[];
  points: string[];
};

export const experience: Role[] = [
  {
    company: "Dexian India Technologies",
    title: "Senior Software Engineer & Tech Lead",
    period: "Jul 2025 – Present",
    stack: ["Laravel", "PHP", "PostgreSQL", "Redis", "Kafka", "Docker", "Azure Key Vault", "GitHub Actions", "AEM", "Stibo STEP", "Rundeck"],
    points: [
      "Design and build integrations between Laravel backend systems and enterprise platforms, including Adobe Experience Manager, Stibo STEP and Azure services.",
      "Migrated legacy cron jobs and script-based processes into containerised batch workflows run with Docker and Rundeck.",
      "Integrated Azure Key Vault for centralised secrets management across deployment environments, with a configuration strategy that falls back to environment variables.",
      "Manage a multi-repository architecture of a Laravel API and a React frontend, with GitHub Actions pipelines and container registries.",
      "Improved observability of distributed workflows through structured logging and operational monitoring practices.",
      "Designed and built a client proof of concept that modernises IBM App Connect Enterprise integrations into Kafka-based microservices.",
    ],
  },
  {
    company: "Blackboard / Collegevidya",
    title: "Software Engineer",
    period: "Jun 2024 – Jan 2025",
    stack: ["Laravel", "PHP", "MySQL", "REST APIs"],
    points: [
      "Developed Laravel and MySQL backend services for a high-traffic education platform.",
      "Built and optimised REST APIs for frontend applications and third-party integrations.",
      "Improved database performance through query optimisation, indexing and schema changes.",
    ],
  },
  {
    company: "Sunstone",
    title: "Senior Software Engineer",
    period: "Aug 2022 – Mar 2024",
    stack: ["Laravel", "PHP", "MySQL", "Redis", "JWT", "AWS EC2", "S3", "RDS"],
    points: [
      "Led the migration of 20+ modules from Core PHP to Laravel.",
      "Improved application performance by approximately 40% through the framework migration and backend optimisation.",
      "Reduced API response times by 30% and database load by 40% with Redis caching.",
      "Designed JWT-secured REST APIs for internal systems and external platform integrations.",
      "Managed AWS infrastructure across EC2, S3 and RDS.",
    ],
  },
  {
    company: "Collegesearch",
    title: "Software Engineer",
    period: "Aug 2021 – Aug 2022",
    stack: ["PHP", "MySQL", "JavaScript"],
    points: [
      "Resolved 200+ production issues on a large-scale web application.",
      "Improved Core Web Vitals and raised the Page Experience score above 90.",
      "Optimised MySQL queries and database interactions, improving efficiency by approximately 30%.",
    ],
  },
];

export type SkillGroup = {
  name: string;
  professional: string[];
  project: string[];
};

// "professional" = used in employment. "project" = used in proofs of concept and independent products.
export const skills: SkillGroup[] = [
  {
    name: "Backend Engineering",
    professional: ["PHP", "Laravel", "REST API design", "JWT authentication", "Performance optimisation"],
    project: ["Java 21", "Spring Boot", "Node.js", "NestJS", "Python", "FastAPI"],
  },
  {
    name: "AI Engineering",
    professional: ["AI feature development", "AI-assisted engineering"],
    project: ["LLM orchestration", "Validated query planning", "Guardrails and access control for LLMs", "Evaluation sets", "Semantic caching", "Embeddings and vector search"],
  },
  {
    name: "Databases & Messaging",
    professional: ["MySQL", "PostgreSQL", "Redis", "Apache Kafka", "Query optimisation"],
    project: ["Row-level security", "Redis vector search", "KafkaJS"],
  },
  {
    name: "Cloud & Infrastructure",
    professional: ["Docker", "Docker Compose", "GitHub Actions", "Azure Key Vault", "Azure Container Registry", "AWS EC2 / S3 / RDS", "Rundeck"],
    project: ["AWS ECS Fargate", "Application Load Balancer", "Kong API Gateway", "OpenTelemetry"],
  },
  {
    name: "Enterprise Integration",
    professional: ["Adobe Experience Manager", "Stibo STEP", "Azure DevOps integration", "Legacy migration", "Batch workflow modernisation"],
    project: ["IBM App Connect Enterprise analysis", "EDIFACT / EBCDIC message handling"],
  },
];
