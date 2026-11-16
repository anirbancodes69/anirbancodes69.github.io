# Anirban Bhowmick

**Senior Backend & AI Engineer**

Kolkata, West Bengal, India | +91 70030 64842 | anirbancodes@gmail.com | linkedin.com/in/anirban-bhowmick | github.com/anirbancodes69

## Professional Summary

Senior backend and AI engineer building production systems since 2021. Professionally, a tech lead delivering enterprise integrations and AI features on Laravel, PostgreSQL, Redis and Kafka. Independently, designed and built a multi-tenant AI business analyst in which the language model plans queries under validation and never touches SQL or permissions, and a semantic cache for LLM applications on Redis vector search.

## Technical Skills

- **Backend:** PHP, Laravel, REST API design, JWT authentication, API integrations, performance optimisation
- **Data & Messaging:** MySQL, PostgreSQL, Redis, Apache Kafka, query optimisation, indexing
- **AI Engineering (project experience):** LLM orchestration, validated query planning, semantic caching, Redis vector search, embeddings, evaluation sets, AI-assisted engineering
- **Cloud & DevOps:** Docker, Docker Compose, GitHub Actions, CI/CD, Azure Key Vault, Azure Container Registry, AWS EC2 / S3 / RDS, Rundeck
- **Enterprise Integration:** Adobe Experience Manager, Stibo STEP PIM, Azure DevOps APIs, legacy system migration
- **Project Experience:** Python, FastAPI, NestJS, Next.js, Java 21, Spring Boot

## Professional Experience

### Senior Software Engineer & Tech Lead, Dexian India Technologies
*Jul 2025 – Present*

- Contributed to the backend integration architecture of ImDash, an enterprise digital asset management platform for CVS Health's Photo Studio, built on Laravel 12, PHP 8.2, PostgreSQL, Redis, Kafka and Docker.
- Built REST API integrations with Adobe Experience Manager and Stibo STEP PIM, covering product-to-asset synchronisation, event-driven processing, validation and reporting workflows.
- Replaced PMO Assist's fixed-role access control with fine-grained permissions (grant model, templates, designation defaults) and contributed to resource allocation and capacity planning workflows, AI features, reporting and the move to server-side rendering.
- Built Azure DevOps backlog migration for PMO Assist, an internal project and resource management platform (Next.js, React, Redis): connection validation, area-path recreation, dry-run validation and re-runnable imports.
- Designed and built a client proof of concept modernising IBM App Connect Enterprise integration flows into Java 21 / Spring Boot microservices communicating over Kafka behind a Kong gateway, with a target AWS architecture (ECS Fargate, RDS, ALB); presented findings to leadership.
- Migrated legacy cron jobs and script-based processes into containerised batch workflows run with Docker and Rundeck.
- Integrated Azure Key Vault for centralised secrets management across deployment environments, with an environment-variable fallback strategy.
- Managed a multi-repository architecture of a Laravel API and React frontend with GitHub Actions CI/CD and container registries; improved observability through structured logging.

### Software Engineer, Blackboard / Collegevidya
*Jun 2024 – Jan 2025*

- Developed Laravel and MySQL backend services for a high-traffic education platform.
- Built and optimised REST APIs for frontend applications and third-party integrations.
- Improved database performance through query optimisation, indexing and schema changes.

### Senior Software Engineer, Sunstone
*Aug 2022 – Mar 2024*

- Led the migration of 20+ modules from Core PHP to Laravel.
- Improved application performance by approximately 40% through the framework migration and backend optimisation.
- Reduced API response times by 30% and database load by 40% with Redis caching.
- Designed JWT-secured REST APIs for internal systems and external platform integrations.
- Managed AWS infrastructure across EC2, S3 and RDS.

### Software Engineer, Collegesearch
*Aug 2021 – Aug 2022*

- Resolved 200+ production issues on a large-scale web application.
- Improved Core Web Vitals and raised the Page Experience score above 90.
- Optimised MySQL queries and database interactions, improving efficiency by approximately 30%.

## Selected Projects

### BusinessPilot: AI business analyst
*Independent product, in development. NestJS, Next.js, Python, FastAPI, PostgreSQL, Redis, Docker, GitHub Actions*

- Designed and built a multi-tenant platform that answers business questions from a company's own data; the language model produces validated query plans and never writes SQL or decides permissions.
- Enforced tenant isolation with PostgreSQL row-level security, role and attribute-based access control, and an isolation test suite that runs against a real database in CI.
- Built connectors for PostgreSQL and Excel, a versioned semantic model with human approval, and an authorisation-scoped result cache in Redis. Six of ten planned milestones are complete; not yet deployed.

### Semantic Cache Engine
*Personal technical R&D. Python, FastAPI, Redis Stack, sentence-transformers, Docker Compose*

- Built a two-tier cache for LLM applications: exact matching on a normalised hash, then vector similarity search over 384-dimension embeddings in Redis, with per-tenant isolation and TTL expiry.
- Added runtime-adjustable similarity thresholds, request history recording accepted and rejected matches, and a dashboard for tuning.

### Price Action AI
*Independent product, early stage. Next.js, Laravel, Python, FastAPI, PostgreSQL, Redis, Docker, GitHub Actions*

- Architected a rule-based market analysis tool in which a deterministic engine performs every calculation and a language model only explains results; documented in 12 architecture decision records.
- Built the interface on a mock data adapter, the containerised environment, a CI pipeline with a required quality gate, and the database schema with tests. Analysis engine not yet built.

## Education

Bachelor of Technology (B.Tech) in Computer Science, Dr. Sudhir Engineering College

## Certification

Linux Mastery (Udemy)

## Career Note

Mar – Jun 2024: transition between roles. Jan – Jul 2025: focused study in backend architecture, containerisation and system design.
