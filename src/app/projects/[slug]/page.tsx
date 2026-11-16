import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { FlowDiagram, Maturity, StatusBadge, Tags } from "@/components/site";
import { getProject, projects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: project.title, description: project.tagline };
}

function Block({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-line py-12 md:grid-cols-12 md:gap-8 md:py-16">
      <div className="md:col-span-4">
        <p className="font-mono text-xs text-accent">{number}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="md:col-span-8">{children}</div>
    </section>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-prose space-y-4 text-[1.0625rem] leading-relaxed text-muted">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="max-w-prose space-y-3 text-[1.0625rem] leading-relaxed text-muted">
      {items.map((item) => (
        <li key={item} className="relative pl-5 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2.5 before:bg-accent">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const facts = [
    ["Context", project.context],
    ["My role", project.role],
    ...(project.period ? [["Period", project.period]] : []),
    ["Classification", project.classification],
  ];

  return (
    <article className="mx-auto max-w-page px-5 sm:px-8">
      <header className="pt-14 pb-12 md:pt-20 md:pb-16">
        <Link href={project.category === "professional" ? "/#work" : "/#independent"} className="text-sm text-muted transition-colors hover:text-fg">
          ← {project.category === "professional" ? "Professional projects" : "Independent projects"}
        </Link>
        <div className="mt-10">
          <StatusBadge>{project.status}</StatusBadge>
        </div>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl md:text-6xl">
          {project.title}
        </h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted md:text-xl md:leading-relaxed">{project.tagline}</p>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(([label, value]) => (
            <div key={label} className="bg-surface p-5">
              <dt className="eyebrow">{label}</dt>
              <dd className="mt-2.5 text-[0.9375rem] leading-snug">{value}</dd>
            </div>
          ))}
        </dl>

        {project.maturity ? (
          <div className="mt-4">
            <Maturity maturity={project.maturity} />
          </div>
        ) : null}
      </header>

      <Block number="01" title="Overview">
        <Prose paragraphs={project.overview} />
      </Block>
      <Block number="02" title="Problem">
        <Prose paragraphs={project.problem} />
      </Block>
      <Block number="03" title="Engineering challenges">
        <List items={project.challenges} />
      </Block>
      <Block number="04" title="Architecture">
        <FlowDiagram flow={project.architecture.flow} caption={project.architecture.caption} />
        <div className="mt-8">
          <List items={project.architecture.notes} />
        </div>
      </Block>
      <Block number="05" title="Technology stack">
        <Tags items={project.stack} />
      </Block>
      <Block number="06" title="My contribution">
        <List items={project.contribution} />
        {project.team ? (
          <p className="mt-8 max-w-prose rounded-md border border-line bg-surface p-5 text-[0.9375rem] leading-relaxed text-muted">
            <span className="font-medium text-fg">Team context. </span>
            {project.team}
          </p>
        ) : null}
      </Block>
      <Block number="07" title="Decisions and trade-offs">
        <div className="max-w-prose divide-y divide-line border-y border-line">
          {project.decisions.map((item) => (
            <div key={item.decision} className="py-6">
              <h3 className="text-[1.0625rem] font-medium">{item.decision}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{item.tradeoff}</p>
            </div>
          ))}
        </div>
      </Block>
      <Block number="08" title="Verified outcomes">
        <List items={project.outcomes} />
        {project.notBuilt ? (
          <div className="mt-8 max-w-prose rounded-md border border-line bg-surface p-5">
            <h3 className="eyebrow">Not built yet</h3>
            <ul className="mt-4 space-y-2 text-[0.9375rem] text-muted">
              {project.notBuilt.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </Block>
      <Block number="09" title="Lessons learned">
        <List items={project.lessons} />
      </Block>

      {project.confidentiality || project.repo ? (
        <div className="border-t border-line py-10 text-sm text-dim">
          {project.confidentiality ? <p className="max-w-prose">{project.confidentiality}</p> : null}
          {project.repo ? (
            <p>
              Source:{" "}
              <a className="link" href={project.repo} target="_blank" rel="noreferrer">
                {project.repo.replace("https://", "")}
              </a>
            </p>
          ) : null}
        </div>
      ) : null}

      <Link
        href={`/projects/${next.slug}/`}
        className="group mb-20 flex items-center justify-between gap-6 rounded-md border border-line bg-surface p-6 transition-colors hover:border-line-strong hover:bg-raised sm:p-8"
      >
        <span>
          <span className="eyebrow">Next case study</span>
          <span className="mt-2 block text-xl font-semibold tracking-tight">{next.title}</span>
        </span>
        <span aria-hidden className="text-2xl transition-transform duration-200 group-hover:translate-x-1">→</span>
      </Link>
    </article>
  );
}
