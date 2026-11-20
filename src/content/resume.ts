// Resume content. Three role-specific variants are generated from this file and
// from the experience data in profile.ts by `pnpm resumes` (scripts/build-resumes.mjs).
// Keep this file free of imports so the build script can load it directly.

export const resumeContact = {
  phone: "+91 70030 64842",
  location: "Kolkata, West Bengal, India",
};

// Dexian bullets, referenced by key so each variant can order them for its audience.
export const dexianPoints: Record<string, string> = {
  imdash:
    "Contributed to the backend integration architecture of ImDash, an enterprise digital asset management platform for CVS Health's Photo Studio, built on Laravel 12, PHP 8.2, PostgreSQL, Redis, Kafka and Docker.",
  integrations:
    "Built REST API integrations with Adobe Experience Manager and Stibo STEP PIM, covering product-to-asset synchronisation, event-driven processing, validation and reporting workflows.",
  batch:
    "Migrated legacy cron jobs and script-based processes into containerised batch workflows run with Docker and Rundeck.",
  secrets:
    "Integrated Azure Key Vault for centralised secrets management across deployment environments, with an environment-variable fallback strategy.",
  delivery:
    "Managed a multi-repository architecture of a Laravel API and React frontend with GitHub Actions CI/CD and container registries; improved observability through structured logging.",
  ado:
    "Built Azure DevOps backlog migration for PMO Assist, an internal project and resource management platform (Next.js, React, Redis): connection validation, area-path recreation, dry-run validation and re-runnable imports.",
  authz:
    "Replaced PMO Assist's fixed-role access control with fine-grained permissions (grant model, templates, designation defaults).",
  aiFeatures:
    "Building AI features in PMO Assist, an internal project and resource management platform (Next.js, React, Redis), alongside resource allocation, capacity planning, reporting and the move to server-side rendering.",
  aiAssist:
    "Use AI-assisted engineering (Claude and other tooling) for design, code review and test generation, with human review of every change.",
  ace:
    "Designed and built a client proof of concept modernising IBM App Connect Enterprise integration flows into Java 21 / Spring Boot microservices communicating over Kafka behind a Kong gateway, with a target AWS architecture (ECS Fargate, RDS, ALB); presented findings to leadership.",
};

export const resumeProjects: Record<string, { title: string; label: string; stack: string; points: string[] }> = {
  businesspilot: {
    title: "BusinessPilot: AI business analyst",
    label: "Independent product, since Nov 2026",
    stack: "NestJS, Next.js, Python, FastAPI, PostgreSQL, Redis, Docker, GitHub Actions",
    points: [
      "Designed and built a multi-tenant platform that answers business questions from a company's own data; the language model produces validated query plans and never writes SQL or decides permissions.",
      "Enforced tenant isolation with PostgreSQL row-level security, role and attribute-based access control, and an isolation test suite that runs against a real database in CI.",
      "Built connectors for PostgreSQL and Excel, a versioned semantic model with human approval, and an authorisation-scoped result cache in Redis. Six of ten planned milestones are complete; not yet deployed.",
    ],
  },
  semanticCache: {
    title: "Semantic Cache Engine",
    label: "Personal technical R&D, since Oct 2026",
    stack: "Python, FastAPI, Redis Stack, sentence-transformers, Docker Compose",
    points: [
      "Built a two-tier cache for LLM applications: exact matching on a normalised hash, then vector similarity search over 384-dimension embeddings in Redis, with per-tenant isolation and TTL expiry.",
      "Added runtime-adjustable similarity thresholds, request history recording accepted and rejected matches, and a dashboard for tuning.",
    ],
  },
  priceAction: {
    title: "Price Action AI",
    label: "Independent product, early stage, since Nov 2026",
    stack: "Next.js, Laravel, Python, FastAPI, PostgreSQL, Redis, Docker, GitHub Actions",
    points: [
      "Architected a rule-based market analysis tool in which a deterministic engine performs every calculation and a language model only explains results; documented in 12 architecture decision records.",
      "Built the interface on a mock data adapter, the containerised environment, a CI pipeline with a required quality gate, and the database schema with tests. Analysis engine not yet built.",
    ],
  },
};

export type ResumeVariant = {
  id: string;
  file: string;
  label: string;
  audience: string;
  headline: string;
  summary: string;
  skills: [string, string][];
  dexianOrder: string[];
  projects: string[];
};

const backend: [string, string] = ["Backend", "PHP, Laravel, REST API design, JWT authentication, API integrations, performance optimisation"];
const data: [string, string] = ["Data & Messaging", "MySQL, PostgreSQL, Redis, Apache Kafka, query optimisation, indexing"];
const cloud: [string, string] = ["Cloud & DevOps", "Docker, Docker Compose, GitHub Actions, CI/CD, Azure Key Vault, Azure Container Registry, AWS EC2 / S3 / RDS, Rundeck"];
const enterprise: [string, string] = ["Enterprise Integration", "Adobe Experience Manager, Stibo STEP PIM, Azure DevOps APIs, legacy system migration"];

export const resumeVariants: ResumeVariant[] = [
  {
    id: "ai",
    file: "Anirban_Bhowmick_Backend_AI_Engineer",
    label: "Backend & AI Engineer",
    audience: "Backend fundamentals plus LLM integration, caching, guardrails and AI-enabled products",
    headline: "Senior Backend & AI Engineer",
    summary:
      "Senior backend and AI engineer building production systems since 2021. Professionally, a technical lead delivering enterprise integrations and AI features on Laravel, PostgreSQL, Redis and Kafka. Independently, designed and built a multi-tenant AI business analyst in which the language model plans queries under validation and never touches SQL or permissions, and a semantic cache for LLM applications on Redis vector search.",
    skills: [
      backend,
      data,
      ["AI Engineering", "AI feature development, LLM orchestration, validated query planning, semantic caching, Redis vector search, embeddings, evaluation sets, AI-assisted engineering"],
      cloud,
      enterprise,
      ["Project Experience", "Python, FastAPI, NestJS, Next.js, Java 21, Spring Boot"],
    ],
    dexianOrder: ["aiFeatures", "aiAssist", "imdash", "integrations", "authz", "ado", "ace", "batch", "secrets", "delivery"],
    projects: ["businesspilot", "semanticCache", "priceAction"],
  },
  {
    id: "backend",
    file: "Anirban_Bhowmick_Senior_Backend_Engineer",
    label: "Senior Backend Engineer",
    audience: "PHP and Laravel platforms, APIs, databases, performance, enterprise integration",
    headline: "Senior Backend Engineer",
    summary:
      "Senior backend engineer building production systems since 2021, with deep experience in PHP and Laravel, REST API design, MySQL, PostgreSQL and Redis. Led the migration of 20+ legacy modules to Laravel, cutting API response times by 30% and database load by 40%. Currently a technical lead delivering enterprise integrations with Adobe Experience Manager, Stibo STEP and Azure, and modernising legacy batch processing into containerised workflows. Also builds LLM-based products independently.",
    skills: [
      backend,
      data,
      cloud,
      enterprise,
      ["Project Experience", "Java 21, Spring Boot, Node.js, NestJS, Python, FastAPI, Next.js"],
    ],
    dexianOrder: ["imdash", "integrations", "batch", "secrets", "delivery", "ado", "authz", "ace", "aiFeatures"],
    projects: ["businesspilot", "semanticCache"],
  },
  {
    id: "platform",
    file: "Anirban_Bhowmick_Senior_Software_Platform_Engineer",
    label: "Senior Software / Platform Engineer",
    audience: "Architecture, modernization, event-driven systems, cloud and CI/CD, technical leadership",
    headline: "Senior Software Engineer | Platform & Enterprise Modernization",
    summary:
      "Senior software engineer and technical lead building production systems since 2021, focused on modernising enterprise platforms. Designed a client proof of concept that moves IBM App Connect Enterprise integrations to Kafka-based Java microservices on AWS, migrated legacy cron processing to containerised batch workflows, and led a 20+ module migration from Core PHP to Laravel that improved application performance by approximately 40%. Comfortable across architecture, delivery pipelines, secrets management and observability, with independent experience building multi-tenant, LLM-based products.",
    skills: [
      ["Architecture", "Legacy modernisation, event-driven design, microservices, enterprise integration, containerised batch workflows, observability"],
      cloud,
      backend,
      data,
      enterprise,
      ["Project Experience", "Java 21, Spring Boot, Kong API Gateway, AWS ECS Fargate, Application Load Balancer, NestJS, OpenTelemetry"],
    ],
    dexianOrder: ["ace", "batch", "secrets", "delivery", "imdash", "integrations", "ado", "authz", "aiFeatures"],
    projects: ["businesspilot", "priceAction"],
  },
];

export const resumeEducation = {
  degree: "Bachelor of Technology (B.Tech) in Electronics and Communication Engineering",
  school: "Dr. Sudhir Chandra Sur Degree Engineering College",
  // TODO: add the third certification once the name, issuer and year are confirmed. Do not guess.
  certification: "Linux Mastery (Udemy, 2023); Website Performance Optimization for Developers & IT Leaders (Udemy, 2024)",
  careerNote:
    "Mar – Jun 2024: transition between roles. Jan – Jul 2025: focused study in backend architecture, containerisation and system design.",
};
