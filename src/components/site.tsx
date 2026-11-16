import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { profile } from "@/content/profile";
import type { Project, Stage } from "@/content/projects";

const nav = [
  { href: "/#about", label: "About" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/#experience", label: "Experience" },
  { href: "/#work", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="shrink-0 text-[0.9375rem] font-semibold tracking-tight">
          Anirban Bhowmick
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors duration-150 hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/resume/" className="btn hidden h-9! px-3.5! text-sm! md:inline-flex">
          Resume
        </Link>
        <details className="group relative md:hidden">
          <summary className="btn h-9! cursor-pointer list-none px-3.5! text-sm! [&::-webkit-details-marker]:hidden">
            Menu
          </summary>
          <nav
            aria-label="Mobile"
            className="absolute right-0 mt-2 w-52 rounded-md border border-line bg-raised p-2 shadow-raised"
          >
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-sm px-3 py-2.5 text-sm text-muted hover:bg-surface hover:text-fg">
                {item.label}
              </Link>
            ))}
            <Link href="/resume/" className="block rounded-sm px-3 py-2.5 text-sm text-accent hover:bg-surface">
              Resume
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-page flex-col gap-4 px-5 py-10 text-sm text-dim sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} Anirban Bhowmick · {profile.location}</p>
        <div className="flex gap-6">
          <a className="hover:text-fg" href={`mailto:${profile.email}`}>Email</a>
          <a className="hover:text-fg" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="hover:text-fg" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

export function Section({
  id,
  index,
  eyebrow,
  title,
  lede,
  children,
}: {
  id?: string;
  index?: string;
  eyebrow: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line">
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 md:py-28">
        <div className="reveal grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="eyebrow">
              {index ? <span className="mr-3 text-accent">{index}</span> : null}
              {eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance md:text-[2.25rem] md:leading-[1.15]">
              {title}
            </h2>
            {lede ? <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-muted">{lede}</p> : null}
          </div>
          <div className="md:col-span-8">{children}</div>
        </div>
      </div>
    </section>
  );
}

export function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item} className="tag">{item}</li>
      ))}
    </ul>
  );
}

export function StatusBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs tracking-wide text-accent uppercase">
      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}/`}
      className="group relative flex h-full flex-col overflow-hidden rounded-md border border-line bg-surface p-6 transition-colors duration-200 before:absolute before:inset-x-0 before:top-0 before:h-px before:origin-left before:scale-x-0 before:bg-accent before:transition-transform before:duration-500 hover:border-line-strong hover:bg-raised hover:before:scale-x-100 sm:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <StatusBadge>{project.status}</StatusBadge>
        <span className="font-mono text-xs text-dim">{project.classification}</span>
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-balance">{project.title}</h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{project.tagline}</p>
      <div className="mt-6">
        <Tags items={project.stack.slice(0, 6)} />
      </div>
      <p className="mt-auto pt-7 text-sm font-medium text-fg">
        Read case study{" "}
        <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
      </p>
    </Link>
  );
}

/** Horizontal flow on wide screens, vertical on narrow ones. Built from HTML so text stays selectable and scales. */
export function FlowDiagram({ flow, caption }: { flow: { name: string; note: string }[]; caption: string }) {
  return (
    <figure className="rounded-md border border-line bg-surface p-5 sm:p-7 lg:px-4">
      <ol className="flex flex-col gap-0 lg:flex-row lg:items-stretch">
        {flow.map((step, index) => (
          <li key={step.name} className="flex flex-col lg:min-w-0 lg:flex-1 lg:flex-row lg:items-center">
            <div className="min-w-0 flex-1 rounded-sm border border-line-strong bg-bg px-3 py-3.5 lg:px-1.5 lg:text-center">
              <p className="text-sm font-medium lg:text-xs xl:text-[0.8125rem]">{step.name}</p>
              <p className="mt-1 font-mono text-[0.6875rem] text-dim">{step.note}</p>
            </div>
            {index < flow.length - 1 ? (
              <span aria-hidden className="shrink-0 py-1 pl-4 font-mono text-accent lg:px-1 lg:py-0">
                <span className="lg:hidden">↓</span>
                <span className="hidden lg:inline">→</span>
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      <figcaption className="mt-5 text-sm text-dim">{caption}</figcaption>
    </figure>
  );
}

const stageLabels: [keyof NonNullable<Project["maturity"]>, string][] = [
  ["conceptualized", "Conceptualized"],
  ["architected", "Architected"],
  ["implemented", "Implemented"],
  ["tested", "Tested"],
  ["deployed", "Deployed"],
  ["production", "Production use"],
];

const stageText: Record<Stage, string> = { yes: "Yes", partial: "Partly", no: "No" };

export function Maturity({ maturity }: { maturity: NonNullable<Project["maturity"]> }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
      {stageLabels.map(([key, label]) => {
        const value = maturity[key];
        return (
          <div key={key} className="bg-surface px-4 py-4">
            <dt className="font-mono text-[0.6875rem] tracking-wide text-dim uppercase">{label}</dt>
            <dd className={`mt-2 text-sm font-medium ${value === "yes" ? "text-fg" : value === "partial" ? "text-accent" : "text-dim"}`}>
              {stageText[value]}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

/** Three small animated pipelines, one per strand of the work. Decorative summary of the headline. */
export function HeroSystems({ lanes }: { lanes: { name: string; steps: string[] }[] }) {
  return (
    <figure
      aria-label={`Three strands of work: ${lanes.map((lane) => lane.name).join(", ")}`}
      className="rounded-md border border-line bg-surface/70 p-5 shadow-raised backdrop-blur-sm sm:p-6"
    >
      <div className="space-y-6">
        {lanes.map((lane, laneIndex) => (
          <div key={lane.name}>
            <p className="eyebrow">
              <span className="mr-2.5 text-accent">0{laneIndex + 1}</span>
              {lane.name}
            </p>
            <div className="mt-3 flex items-center">
              {lane.steps.map((step, stepIndex) => (
                <div key={step} className="contents">
                  <span className="rounded-sm border border-line-strong bg-bg px-2.5 py-2 font-mono text-[0.6875rem] whitespace-nowrap text-fg">
                    {step}
                  </span>
                  {stepIndex < lane.steps.length - 1 ? (
                    <span
                      aria-hidden
                      className="wire"
                      style={{ "--delay": `${laneIndex * 0.9 + stepIndex * 1.1}s` } as CSSProperties}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}
