// Project definitions. Each entry drives a card and a full case study page.
// Rule: describe only what exists. Planned work goes in `notBuilt`.

export type Stage = "yes" | "partial" | "no";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: "professional" | "independent";
  classification: string;
  status: string;
  context: string;
  role: string;
  period?: string;
  stack: string[];
  /** Six independent maturity stages. Omitted where it is not mine to state. */
  maturity?: {
    conceptualized: Stage;
    architected: Stage;
    implemented: Stage;
    tested: Stage;
    deployed: Stage;
    production: Stage;
  };
  overview: string[];
  problem: string[];
  challenges: string[];
  architecture: {
    caption: string;
    flow: { name: string; note: string }[];
    notes: string[];
  };
  contribution: string[];
  team?: string;
  decisions: { decision: string; tradeoff: string }[];
  outcomes: string[];
  notBuilt?: string[];
  lessons: string[];
  confidentiality?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    slug: "imdash-digital-asset-platform",
    title: "ImDash: digital asset integration platform",
    tagline:
      "Backend integration between product data in Stibo STEP and creative assets in Adobe Experience Manager for a retail health enterprise's photo studio.",
    category: "professional",
    classification: "Enterprise Client Engagement",
    status: "Client delivery",
    context: "Dexian India Technologies, for CVS Health's Photo Studio",
    role: "Senior Software Engineer & Tech Lead, backend integration",
    period: "2025 – Present",
    stack: ["Laravel 12", "PHP 8.2", "PostgreSQL", "Redis", "Apache Kafka", "Docker", "Stibo STEP PIM", "Adobe Experience Manager", "Azure"],
    overview: [
      "ImDash is an enterprise digital asset management and integration platform used by a photo studio operation. It keeps product records and the images produced for them in step across the systems that own each side.",
      "I work on the backend integration architecture: the services that talk to Stibo STEP and Adobe Experience Manager, the event-driven processing between them, and the data and reporting layer underneath.",
    ],
    problem: [
      "Product information lives in a product information management system. Photographs and creative assets live in a digital asset management system. A studio needs to know, for any product, which assets exist, which are missing and what state each is in.",
      "Without an integration layer, that link is maintained by hand and drifts. The platform exists to make product-to-asset synchronisation automatic, validated and reportable.",
    ],
    challenges: [
      "Two external enterprise systems with their own data models, rate limits and failure modes, joined through REST APIs that the platform does not control.",
      "Synchronisation that must be safe to repeat. A retried or replayed event cannot create duplicate links or overwrite newer state.",
      "Validation of incoming product and asset data before it is trusted, with failures surfaced for people to act on.",
      "Long-running batch work that used to run as cron scripts and needed to become observable, containerised jobs.",
      "Secrets for several environments and several external systems, kept out of code and configuration files.",
    ],
    architecture: {
      caption: "Simplified integration landscape. Component names are generic; internal detail is omitted.",
      flow: [
        { name: "Stibo STEP PIM", note: "Product data" },
        { name: "Integration API", note: "Laravel 12" },
        { name: "Apache Kafka", note: "Sync events" },
        { name: "Workers", note: "Validate, link" },
        { name: "PostgreSQL", note: "State, reports" },
        { name: "Adobe AEM", note: "Assets" },
      ],
      notes: [
        "REST integrations with Stibo STEP and AEM sit behind service classes so the rest of the application deals with one internal model.",
        "Product-to-asset synchronisation runs as event-driven processing over Kafka; Redis supports caching and queues.",
        "Batch jobs run as Docker containers scheduled through Rundeck, replacing host-level cron entries.",
        "Secrets are read from Azure Key Vault, with environment variables as a fallback for local and constrained environments.",
      ],
    },
    contribution: [
      "Backend integration architecture for the platform.",
      "REST API integrations with Adobe Experience Manager and Stibo STEP.",
      "Product-to-asset synchronisation and the event-driven processing behind it.",
      "Validation of incoming data.",
      "PostgreSQL data management and reporting workflows.",
      "Migration of legacy cron jobs to containerised batch workflows on Docker and Rundeck.",
      "Azure Key Vault integration for centralised secrets management.",
    ],
    team: "The platform is built and delivered by a wider team. The items above are the areas I worked on; overall platform delivery is shared.",
    decisions: [
      {
        decision: "Asynchronous, event-driven synchronisation instead of direct system-to-system calls.",
        tradeoff: "An outage in one external system no longer blocks the other, and work can be retried. The cost is eventual consistency and the need for idempotent handlers.",
      },
      {
        decision: "Containerised batch jobs under a scheduler instead of cron on a host.",
        tradeoff: "Each run has logs, an exit status and a reproducible environment. It adds an orchestration component to operate.",
      },
      {
        decision: "Central secret store with an environment-variable fallback.",
        tradeoff: "One place to rotate credentials across environments, while the application still starts where the vault is unreachable. Two code paths must be kept consistent.",
      },
    ],
    outcomes: [
      "Integrations with AEM and Stibo STEP delivered as part of the platform.",
      "Legacy cron and script-based processes now run as containerised workflows.",
      "Secrets for multiple environments are managed centrally in Azure Key Vault.",
      "No usage or business metrics are published for this engagement.",
    ],
    lessons: [
      "With two systems of record, decide early which one wins for each field. Most synchronisation bugs are ownership questions in disguise.",
      "Structured logs with a correlation identifier are worth more than any dashboard when a product is missing its asset and three systems are involved.",
    ],
    confidentiality:
      "This is client work. Internal endpoints, data models, volumes and business figures are deliberately left out.",
  },
  {
    slug: "pmo-assist",
    title: "PMO Assist: project and resource management platform",
    tagline:
      "An internal enterprise platform for project tracking, resource allocation and capacity planning, with Azure DevOps migration and fine-grained permissions.",
    category: "professional",
    classification: "Professional / Internal Enterprise Platform",
    status: "Internal platform",
    context: "Dexian India Technologies, internal platform",
    role: "Senior Software Engineer, contributor across integration, authorization and resource management",
    stack: ["Next.js", "React", "Redis", "Azure DevOps REST APIs", "Server-side rendering"],
    overview: [
      "PMO Assist is an internal platform for running delivery: project tracking, resource allocation, capacity planning and reporting, with AI-powered capabilities. It covers ground that teams often split between a work-tracking tool and spreadsheets.",
      "I contributed to several of its larger capabilities: bringing existing Azure DevOps backlogs into the platform, replacing the role model with fine-grained permissions, the resource management workflows, AI features, reporting, and moving the frontend to server-side rendering.",
    ],
    problem: [
      "Delivery teams track work in one tool and plan people in another. Nobody can answer, in one place, who is allocated to what, whether capacity matches demand, and how actual effort compares with the plan.",
      "Teams already had years of backlog history in Azure DevOps. A new platform is only adopted if that history arrives intact, with its hierarchy and its original identifiers.",
    ],
    challenges: [
      "Importing a backlog is not a copy. Area paths must be recreated to keep the hierarchy, work-item states must be mapped to the platform's own workflow, and original item information must be preserved for traceability.",
      "Imports have to be re-runnable. Running the same import twice must update rather than duplicate.",
      "People need to see what an import will do before it changes anything.",
      "A fixed set of roles could not express who may do what across accounts, programmes and projects.",
      "Capacity depends on leave and public holidays, so allocation has to be calendar-aware.",
    ],
    architecture: {
      caption: "Azure DevOps backlog migration, simplified.",
      flow: [
        { name: "Azure DevOps", note: "Source backlog" },
        { name: "Connect", note: "Validate access" },
        { name: "Read", note: "Items, area paths" },
        { name: "Dry run", note: "Report only" },
        { name: "Import", note: "Idempotent" },
        { name: "PMO Assist", note: "Hierarchy kept" },
      ],
      notes: [
        "Connection and credentials are validated before any backlog is read.",
        "Area paths are recreated so the imported backlog keeps its original hierarchy.",
        "Original work-item information is preserved; the Azure DevOps state Resolved maps to the platform's development-complete status.",
        "A dry-run mode reads and validates the backlog and reports what would change without writing.",
        "Work is organised as Account → Programme → Project, and the platform supports four delivery models: Dedicated Capacity, Time & Material, Fixed Price and Managed Service.",
      ],
    },
    contribution: [
      "Azure DevOps integration and backlog migration: connection validation, backlog reading, area-path recreation, state mapping, dry-run validation and re-runnable imports.",
      "Account, programme and project hierarchy, including automated provisioning of linked accounts.",
      "Fine-grained authorization to replace the earlier fixed-role model: a permission grant model, permission templates and defaults by designation.",
      "Resource management: capacity planning, allocation, demand and actuals, approval workflows, leave and holiday awareness, notifications. HR, manager and employee functions were brought together in one area.",
      "AI feature development and reporting.",
      "Frontend modernisation from client-side to server-side rendering, with permission-aware interfaces.",
    ],
    team: "PMO Assist is a team platform. I did not build all of it. The list above covers the areas I contributed to, working with the wider team on overall delivery.",
    decisions: [
      {
        decision: "Dry run before every import.",
        tradeoff: "More code paths to maintain, but migrations stop being one-way doors. Users correct mapping problems before data is written.",
      },
      {
        decision: "Idempotent imports keyed on the original work-item identity.",
        tradeoff: "Requires storing source identifiers and comparing on each run. In return, a failed or partial import is fixed by running it again.",
      },
      {
        decision: "Granular permission grants with templates instead of a fixed list of roles.",
        tradeoff: "Far more flexible and closer to how organisations actually delegate. Harder to reason about, so templates and designation defaults keep the common cases simple.",
      },
      {
        decision: "Server-side rendering for the application frontend.",
        tradeoff: "Faster first render and permission checks made on the server before data reaches the browser. More care is needed around caching and per-user data.",
      },
    ],
    outcomes: [
      "Existing Azure DevOps backlogs can be imported with hierarchy and original item information preserved, validated first by dry run.",
      "Authorization moved from fixed roles to fine-grained, template-driven permissions.",
      "Resource management for HR, managers and employees is unified in one workflow area.",
      "No adoption or business figures are published for this platform.",
    ],
    lessons: [
      "Migration tooling is a product feature. Dry runs and re-runnable imports decide whether people trust the new system with their history.",
      "Permission models should be designed around the questions people ask (\"can this manager approve this allocation?\"), not around a list of job titles.",
    ],
    confidentiality:
      "Internal employer platform. No screens, URLs, schema, employee data or project data are shown. Diagrams are simplified and redrawn.",
  },
  {
    slug: "ibm-ace-modernization",
    title: "IBM App Connect Enterprise modernization",
    tagline:
      "A client proof of concept that re-expresses legacy ACE integration flows as containerised, Kafka-based microservices with a target architecture on AWS.",
    category: "professional",
    classification: "Professional / Enterprise Proof of Concept",
    status: "Proof of concept",
    context: "Dexian India Technologies, client proof of concept",
    role: "Design and implementation of the proof of concept",
    period: "2026",
    stack: ["Java 21", "Spring Boot 3", "Apache Kafka", "PostgreSQL", "Docker", "Kong API Gateway", "Node.js", "KafkaJS", "AWS ECS Fargate", "Amazon RDS", "Application Load Balancer"],
    maturity: {
      conceptualized: "yes",
      architected: "yes",
      implemented: "yes",
      tested: "partial",
      deployed: "partial",
      production: "no",
    },
    overview: [
      "IBM App Connect Enterprise is an integration broker. Flows written in ESQL receive messages, transform them and call downstream systems. It works, but the skills are scarce, licensing is costly and every change goes through one central platform.",
      "This proof of concept asked a specific question: can an existing ACE flow be reproduced as ordinary services on a modern stack, behaving identically, and what would the target platform look like? It is a proof of concept and was not a production migration.",
    ],
    problem: [
      "The legacy flow accepted a binary EDIFACT request, sometimes EBCDIC-encoded, parsed it against message models, transformed it to JSON, called a downstream HTTP service and transformed the JSON reply back into a binary EDIFACT response.",
      "All of that logic lived in ESQL modules and message-model definitions. Before anything could be modernised, the actual behaviour had to be recovered from the source, including the cases nobody had written down.",
    ],
    challenges: [
      "Behaviour had to be preserved exactly. The new service detects whether input is ASCII/UTF-8 or EBCDIC from marker bytes, rejects unknown encodings, and writes the response in IBM-500, as the original does.",
      "ESQL transformations encode business rules implicitly: date conversion, leading-zero normalisation, value fallbacks, sender and recipient reversal in the response envelope. Each one had to be found and specified before it was coded.",
      "The real downstream system was not available, so a realistic mock service was built to complete the end-to-end path.",
      "Kafka networking in containers: clients bootstrap successfully and then fail if advertised listeners are wrong. Separate listeners were needed for the host and the Docker network.",
      "Deciding which interactions stay synchronous. A request that needs an immediate reply cannot simply be turned into an event.",
    ],
    architecture: {
      caption: "Target event-driven flow built in the proof of concept.",
      flow: [
        { name: "Client", note: "HTTP request" },
        { name: "Kong Gateway", note: "Routing, policy" },
        { name: "Producer service", note: "Validate, publish" },
        { name: "Apache Kafka", note: "Durable events" },
        { name: "Consumer service", note: "Transform, persist" },
        { name: "PostgreSQL", note: "Amazon RDS" },
      ],
      notes: [
        "The API gateway owns cross-cutting concerns such as routing and access policy, so services do not each reimplement them.",
        "The producer validates at the boundary, attaches a correlation ID and publishes. The consumer transforms to a canonical model, validates and persists.",
        "Request-reply flows that need an immediate answer stay synchronous; work that can be decoupled moves to Kafka.",
        "Configuration is externalised. Kafka bootstrap servers are a setting, so moving from a local broker to a managed one is a configuration change.",
        "Everything runs locally as a multi-container Docker Compose environment with health checks.",
      ],
    },
    contribution: [
      "Designed the cloud-native modernization approach and the target AWS architecture.",
      "Analysed the legacy flow and wrote the behavioural specification: flow, request mapping and response mapping.",
      "Built the event-driven path in two forms: a Node.js version behind Kong, and Java 21 / Spring Boot producer and consumer services.",
      "Built a Spring Boot service that reproduces the legacy flow's parsing, encoding handling and transformations, with unit tests per stage and a handover package for Java developers.",
      "Built the local multi-container environment and a mock downstream service.",
      "Wrote the architecture documents, decision records and diagrams.",
      "Presented the modernization strategy and findings to leadership.",
      "Used AI-assisted development throughout, with behaviour checked against real sample messages and tests.",
    ],
    decisions: [
      {
        decision: "Behavioural migration first, redesign later.",
        tradeoff: "Reproducing existing behaviour byte for byte is less elegant than a clean redesign, but it gives a result that can be verified against real messages and removes the argument about what the system should do.",
      },
      {
        decision: "Kafka between producer and consumer.",
        tradeoff: "Decouples services and allows replay and independent scaling. Adds operational weight and eventual consistency, and does not suit request-reply paths.",
      },
      {
        decision: "Kafka in KRaft mode for local development.",
        tradeoff: "No ZooKeeper to run. Listener configuration becomes the thing to get right.",
      },
      {
        decision: "ECS Fargate over Kubernetes for the target platform.",
        tradeoff: "Much less to operate for a small number of services. Fewer scheduling and networking options than Kubernetes.",
      },
      {
        decision: "A monorepo for the proof of concept.",
        tradeoff: "One place for services, infrastructure and documents while the design is still moving. Would be revisited for independently owned services.",
      },
    ],
    outcomes: [
      "The gateway → producer → Kafka → consumer → PostgreSQL path runs end to end on Docker Compose.",
      "The legacy flow's request handling, including EBCDIC detection and decoding, is reproduced in Java with unit tests for each stage.",
      "A Spring Boot service was deployed to AWS ECS Fargate behind an Application Load Balancer, with images in ECR, logs in CloudWatch and PostgreSQL on Amazon RDS.",
      "Amazon MSK is the intended managed Kafka service in the target design. It was not provisioned during the proof of concept; Kafka ran locally.",
      "Findings and the modernization strategy were presented to leadership. This was not taken to production as part of the proof of concept.",
    ],
    notBuilt: [
      "Managed Kafka (Amazon MSK) in the deployed environment",
      "Infrastructure as code and a continuous-deployment pipeline",
      "Retry and dead-letter handling, metrics and dashboards",
      "Production cut-over of any flow",
    ],
    lessons: [
      "The hard part of leaving an integration broker is archaeology. Most of the effort goes into finding out what the flows really do.",
      "Sample messages are the specification. Tests built on real binary fixtures caught things no document mentioned.",
      "AI assistance is fast at translating transformation code and unreliable about encodings and edge cases. It needs fixtures and tests around it.",
      "Asynchronous messaging is a choice per interaction, not a property of the whole system.",
    ],
    confidentiality:
      "Client proof of concept. The client, its domain, message contents and original source are not shown. The diagram is redrawn in generic terms.",
  },
  {
    slug: "businesspilot",
    title: "BusinessPilot: AI business analyst",
    tagline:
      "A multi-tenant platform where managers ask questions about their own business data and every number in the answer traces to an authorised query.",
    category: "independent",
    classification: "Independent Product",
    status: "In development",
    context: "Independent product, solo",
    role: "Product, architecture and all engineering",
    period: "2026",
    stack: ["TypeScript", "NestJS", "Next.js", "Python", "FastAPI", "PostgreSQL", "Row-level security", "Redis", "Keycloak", "OpenTelemetry", "Docker", "GitHub Actions"],
    maturity: {
      conceptualized: "yes",
      architected: "yes",
      implemented: "partial",
      tested: "yes",
      deployed: "no",
      production: "no",
    },
    overview: [
      "BusinessPilot is aimed at small and mid-sized businesses that have data in spreadsheets and databases but no analyst. A manager asks \"Which customers have the highest outstanding payments?\" or \"Why did revenue fall this month?\" and gets an answer with its sources.",
      "It is not a chatbot over documents and it is not text-to-SQL. Six of ten planned milestones are built. It runs locally with synthetic data; there are no customers and no hosted environment yet.",
    ],
    problem: [
      "Letting a language model write SQL against business data fails in two ways that matter: it can produce numbers that look right and are wrong, and it can read rows the person asking should not see.",
      "A product for real businesses needs answers that are checkable and access rules that hold regardless of what the model does.",
    ],
    challenges: [
      "Tenant isolation that does not depend on every query remembering a WHERE clause.",
      "Keeping the model away from both SQL and permissions, while still letting it handle open-ended questions and follow-ups.",
      "Different users in the same company see different data: a sales manager sees assigned branches, a finance manager sees receivables.",
      "Customer data arrives as Excel files and database tables with their own column names, and must be mapped to a shared business model that a human approves.",
      "Caching answers without leaking them across tenants or across users with different access.",
      "Testing a system whose central component is non-deterministic.",
    ],
    architecture: {
      caption: "Path of one question through the system.",
      flow: [
        { name: "Web app", note: "Next.js" },
        { name: "API", note: "NestJS, authz" },
        { name: "AI engine", note: "FastAPI planner" },
        { name: "Plan compiler", note: "Plan → SQL" },
        { name: "PostgreSQL", note: "Row-level security" },
        { name: "Answer", note: "Sources, freshness" },
      ],
      notes: [
        "The model produces a structured query plan that refers to measures and dimensions in the tenant's approved semantic model. Code validates the plan and compiles it to SQL. The model never writes SQL.",
        "Every data access is re-authorised by the API. The model does not decide permissions.",
        "PostgreSQL row-level security enforces tenant boundaries in the database itself, with separate owner and application roles.",
        "Row filters and column masks narrow each user's view; fields tagged as personal or sensitive are excluded from what the model sees.",
        "An exact result cache in Redis is keyed on tenant, authorisation scope, normalised plan and data version, and is read only after the authorisation check.",
        "AI processing is off per workspace until an administrator explicitly enables it.",
      ],
    },
    contribution: [
      "Everything: product definition, architecture decision records, implementation, tests and CI.",
      "Tenant management, role and attribute-based access control, audit log and envelope encryption for stored credentials.",
      "Versioned semantic model with an approval workflow, and a wholesale-distribution template.",
      "Connector framework with PostgreSQL and Excel connectors, human-approved mappings and a sync engine.",
      "AI pipeline: planner, plan validation, SQL compiler, grounded explanations, bounded multi-step investigation for \"why\" questions, and rule-based recommendations.",
    ],
    decisions: [
      {
        decision: "Validated query plans instead of model-written SQL.",
        tradeoff: "The system can only answer what the semantic model describes, which is narrower than free SQL. In exchange, every answer is checkable and the model cannot reach data it was not given.",
      },
      {
        decision: "Row-level security in the database for tenant isolation.",
        tradeoff: "Isolation holds even if application code has a bug. It complicates migrations, connection handling and testing, which must run against a real PostgreSQL.",
      },
      {
        decision: "A modular monolith plus one Python service.",
        tradeoff: "One developer can operate it. Module boundaries are enforced by convention and lint rules, not by the network.",
      },
      {
        decision: "Exact-match result caching before any semantic caching.",
        tradeoff: "Lower hit rate than similarity-based caching, but no risk of returning a near-match answer to a different question. The cache key includes the authorisation scope.",
      },
      {
        decision: "Recommendations come from coded playbooks, not from the model.",
        tradeoff: "Less fluent and less varied. Each recommendation can be traced to a rule and to the numbers that triggered it.",
      },
    ],
    outcomes: [
      "Milestones 1 to 6 of 10 are built: foundation, tenancy and security, semantic model, connectors, sync, and the AI pipeline with a first chat interface.",
      "As recorded in the project's status file on 15 November 2026: 199 tenant-isolation tests against a real PostgreSQL, 216 API unit tests, 133 AI-engine tests and 27 web tests.",
      "On the same date, a 57-case evaluation set passed 56 cases. The prompts were tuned on those cases and the model is non-deterministic, so that figure is a development check, not a benchmark.",
      "The project's own data-processing review concludes it is acceptable with synthetic data and not yet approved for real customer data.",
    ],
    notBuilt: [
      "Retrieval over documents and glossary, semantic plan cache",
      "Customer onboarding flow and a pilot",
      "Hosted environment, production identity provider and object storage",
      "Any customer usage",
    ],
    lessons: [
      "Put the model where a mistake is cheap. Planning can be validated; arithmetic and access control should not be delegated.",
      "An isolation test suite that fails when a tenant key is removed from a cache key is worth more than a design document saying tenants are isolated.",
      "A status file that separates \"built\", \"tested\" and \"not done\" keeps a solo project honest with itself.",
    ],
  },
  {
    slug: "price-action-ai",
    title: "Price Action AI",
    tagline:
      "A rule-based price-action analysis and trade-planning tool for swing traders, designed so that deterministic code computes and a language model only explains.",
    category: "independent",
    classification: "Independent Product",
    status: "In development, early stage",
    context: "Independent product, solo",
    role: "Product, architecture and all engineering",
    period: "2026",
    stack: ["Next.js 16", "React 19", "Tailwind CSS", "Lightweight Charts", "Laravel 13", "Python", "FastAPI", "PostgreSQL 17", "Redis", "Docker", "GitHub Actions"],
    maturity: {
      conceptualized: "yes",
      architected: "yes",
      implemented: "partial",
      tested: "partial",
      deployed: "no",
      production: "no",
    },
    overview: [
      "Price Action AI is a decision-support tool for analysing market structure on daily charts and planning trades with defined risk. It does not place orders and does not give investment advice.",
      "The project is at an early stage. The architecture and specification are complete, the interface is built on sample data, and the database schema is in place. The analysis engine itself has not been built yet.",
    ],
    problem: [
      "Discretionary price-action analysis is inconsistent. The same chart read on two days gives two answers, and risk sizing is often done after the decision, not before.",
      "Tools that hand the analysis to a language model make this worse, because the output cannot be reproduced or tested.",
    ],
    challenges: [
      "Specifying trading rules precisely enough to implement and test: swing points, structure breaks, support and resistance zones, setups and position sizing.",
      "Avoiding look-ahead: a calculation for a given day must never use data from later days.",
      "Keeping analysis results reproducible when rules change, which means versioned rule sets and immutable analysis records.",
      "Market-data providers have limits and licence terms that shape the ingestion design.",
      "Giving a language model a useful role without letting it invent levels or numbers.",
    ],
    architecture: {
      caption: "Target architecture. Shaded steps beyond the web app and database are specified, not yet built.",
      flow: [
        { name: "Web app", note: "Next.js, built" },
        { name: "Application API", note: "Laravel, skeleton" },
        { name: "Quant engine", note: "FastAPI, skeleton" },
        { name: "PostgreSQL", note: "Schema built" },
        { name: "Market data", note: "Planned" },
        { name: "LLM explainer", note: "Planned" },
      ],
      notes: [
        "Laravel owns authentication, tenancy, the public API and the schema. All trading calculations belong to one Python service as pure, testable functions.",
        "The language model's role is fixed by design: it explains results that deterministic code has already produced, and its output is validated against them.",
        "Database roles follow a single-writer rule, and analysis tables carry immutability triggers.",
        "A provider abstraction separates demo data from a live market-data source.",
      ],
    },
    contribution: [
      "Product and trading-rule specification: 58 specification documents and 12 architecture decision records.",
      "Complete first-phase interface: dashboard, scanner, analysis charts, watchlists, trade plans, journal and backtesting screens, running on a mock data adapter.",
      "Docker Compose environment for all services with health checks, and a CI pipeline with a required gate, secret scanning and dependency audits.",
      "Database schema for identity, market data, analysis and trading, with database tests.",
    ],
    decisions: [
      {
        decision: "Deterministic engine for every calculation; the model only explains.",
        tradeoff: "Rules must be written out in full, which is slow. Results are reproducible, testable and the same every time.",
      },
      {
        decision: "Laravel for the application, Python for the numerical engine.",
        tradeoff: "Two languages and a service boundary to maintain. Each side uses the ecosystem that suits it.",
      },
      {
        decision: "Manual trade execution only.",
        tradeoff: "No broker order integration, so less convenience. It removes a whole class of financial and regulatory risk from a first version.",
      },
      {
        decision: "Specification before engine code.",
        tradeoff: "Weeks of documents before a single rule runs. For rules where a subtle error is invisible in the UI, test vectors written first are the only real check.",
      },
    ],
    outcomes: [
      "Foundation milestone complete: repository, containers and CI.",
      "Interface complete for phase one, on sample data only.",
      "Database schema migrated with 60 backend tests, as recorded in the project's status file on 16 November 2026.",
      "No analysis results exist yet, and no claims are made about trading outcomes.",
    ],
    notBuilt: [
      "Market-data ingestion",
      "Swing-point, structure, zone and setup detection",
      "Risk sizing engine and the public API",
      "LLM explanations",
      "Backtesting and paper trading",
    ],
    lessons: [
      "Building the interface on a mock adapter first exposed two dozen mismatches between the screens and the specification before any backend existed.",
      "Writing down what is not built is as useful as writing down what is.",
    ],
    repo: "https://github.com/anirbancodes69/price-action-ai",
  },
  {
    slug: "semantic-cache-engine",
    title: "Semantic Cache Engine",
    tagline:
      "A two-tier cache for LLM applications: exact matching first, then vector similarity over embeddings in Redis, with per-tenant isolation.",
    category: "independent",
    classification: "Personal Technical R&D",
    status: "Technical R&D",
    context: "Personal research project",
    role: "Design and implementation",
    period: "2026",
    stack: ["Python", "FastAPI", "Redis Stack", "Redis vector search", "sentence-transformers", "Streamlit", "Docker Compose", "pytest"],
    maturity: {
      conceptualized: "yes",
      architected: "yes",
      implemented: "yes",
      tested: "partial",
      deployed: "no",
      production: "no",
    },
    overview: [
      "Applications built on language models pay, in money and latency, for every call. Many of those calls repeat a question that has already been answered, often in slightly different words.",
      "This project is an experiment in how much of that repetition a cache can absorb, and what it costs in correctness when \"similar enough\" is decided by a number.",
    ],
    problem: [
      "A conventional cache keys on the exact request. \"How do I reset my password?\" and \"What should I do if I forgot my password?\" are different strings, so the second one misses.",
      "Matching on meaning fixes the miss and creates a new risk: two questions can be close in embedding space and still need different answers.",
    ],
    challenges: [
      "Choosing a similarity threshold. Too high and the semantic tier never hits; too low and users get an answer to a question they did not ask.",
      "Keeping tenants apart inside a shared vector index.",
      "Expiry: vector entries need a time to live and must not be returned once stale.",
      "Making cache decisions observable, including the near-matches that were rejected.",
    ],
    architecture: {
      caption: "Lookup path for one query.",
      flow: [
        { name: "Query", note: "tenant + question" },
        { name: "Exact cache", note: "SHA-256 key" },
        { name: "Embed", note: "384 dimensions" },
        { name: "Vector search", note: "KNN, cosine" },
        { name: "Threshold", note: "Accept / reject" },
        { name: "LLM", note: "On miss only" },
      ],
      notes: [
        "ExactCache normalises whitespace and case, hashes the question and stores the answer under a tenant-scoped key with a TTL.",
        "SemanticVectorStore keeps question, answer and embedding as Redis JSON documents under a vector index (flat index, cosine distance, 384 dimensions from the all-MiniLM-L6-v2 model).",
        "Searches filter by a tenant tag before the nearest-neighbour step; tenant identifiers are restricted to a safe character set.",
        "The similarity threshold and the cache mode (exact only, or exact plus semantic) can be changed at runtime through the API.",
        "Every request is recorded with its best similarity score and whether the match was accepted or rejected, and a Streamlit dashboard displays this history.",
      ],
    },
    contribution: [
      "Designed and built the FastAPI service, both cache tiers and the Redis index.",
      "Built the dashboard for statistics, request history and threshold tuning.",
      "Wrote a benchmark script that compares exact-only caching with exact-plus-semantic caching over groups of paraphrased questions.",
      "Unit tests for the exact cache: hits, misses, normalisation, tenant isolation and expiry.",
    ],
    decisions: [
      {
        decision: "Exact cache first, semantic second.",
        tradeoff: "An exact hit costs one Redis read and no embedding. The semantic tier only pays for an embedding when it is needed.",
      },
      {
        decision: "A flat vector index instead of an approximate one.",
        tradeoff: "Exact nearest-neighbour results and no tuning. Search time grows linearly with entries, so an approximate index would be the next step at scale.",
      },
      {
        decision: "A small local embedding model.",
        tradeoff: "No external API call and no per-request cost. Lower semantic resolution than larger models, which makes the threshold more sensitive.",
      },
      {
        decision: "Record rejected matches as well as accepted ones.",
        tradeoff: "More data kept per request. Without it there is no way to see what a different threshold would have done.",
      },
    ],
    outcomes: [
      "Working service with both tiers, runtime configuration, statistics and a dashboard, running on Docker Compose.",
      "The language model in this project is a stand-in that returns a fixed-format reply after a delay. Latency figures against it would describe the stand-in, so none are published.",
      "A benchmark script exists. No measured hit-ratio or latency results are published here yet.",
    ],
    notBuilt: [
      "Integration with a real language model",
      "Tests for the vector store",
      "Published benchmark results",
      "Invalidation when the underlying answer changes",
    ],
    lessons: [
      "The threshold is a product decision as much as a technical one. For some questions a wrong cached answer is harmless, for others it is not.",
      "Semantic caching is safest for questions whose answers do not depend on who is asking or when.",
    ],
  },
];

export const professionalProjects = projects.filter((p) => p.category === "professional");
export const independentProjects = projects.filter((p) => p.category === "independent");
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
