import Link from "next/link";
import { HeroSystems, ProjectCard, Section, Tags } from "@/components/site";
import { about, asset, experience, lanes, profile, proofPoints, skills } from "@/content/profile";
import { independentProjects, professionalProjects } from "@/content/projects";

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="hero-backdrop" />
        <div className="mx-auto max-w-page px-5 pt-16 pb-16 sm:px-8 md:pt-28 md:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-3 rounded-full border border-line bg-surface/80 py-1.5 pr-4 pl-3.5 font-mono text-xs text-muted">
                <span aria-hidden className="status-dot" />
                Technical Lead at Dexian · independently building BusinessPilot
              </p>
              <h1 className="mt-7 text-5xl font-semibold tracking-[-0.035em] sm:text-6xl xl:text-7xl">
                {profile.name}
              </h1>
              <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg text-fg md:text-xl">
                {profile.headline.map((part, index) => (
                  <span key={part} className="flex items-center gap-3">
                    {index > 0 ? <span aria-hidden className="text-accent">/</span> : null}
                    {part}
                  </span>
                ))}
              </p>
              <p className="mt-7 max-w-prose text-lg leading-relaxed text-muted">{profile.intro}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/#work" className="btn btn-primary">View projects</Link>
                <a href={asset(profile.resume)} download className="btn">Download resume</a>
                <Link href="/#contact" className="btn">Contact me</Link>
              </div>
              <div className="mt-6 flex gap-6 text-sm">
                <a className="link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <a className="link" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <HeroSystems lanes={lanes} />
            </div>
          </div>

          <dl className="mt-16 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
            {proofPoints.map((point) => (
              <div key={point.label} className="group flex flex-col bg-surface p-6 transition-colors duration-200 hover:bg-raised sm:p-7">
                <dd className="order-2 mt-5 text-5xl font-semibold tracking-tight">{point.value}</dd>
                <dt className="order-3 mt-3 text-sm leading-relaxed text-muted">{point.label}</dt>
                <p className="eyebrow order-1 flex items-center gap-2.5">
                  <span aria-hidden className="h-px w-5 bg-accent transition-all duration-300 group-hover:w-9" />
                  {point.context}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section id="about" index="01" eyebrow="About" title="From keeping systems running to reshaping them.">
        <div className="max-w-prose space-y-5 text-[1.0625rem] leading-relaxed text-muted">
          {about.map((paragraph, index) => (
            <p key={index} className={index === 0 ? "text-fg" : undefined}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section
        id="expertise"
        index="02"
        eyebrow="Technical expertise"
        title="What I work with, and where."
        lede="Skills are split by where I have used them: in employment, or in proofs of concept and my own products."
      >
        <div className="divide-y divide-line border-y border-line">
          {skills.map((group) => (
            <div key={group.name} className="grid gap-4 py-7 sm:grid-cols-3 sm:gap-6">
              <h3 className="text-base font-semibold">{group.name}</h3>
              <div className="space-y-5 sm:col-span-2">
                <div>
                  <p className="eyebrow mb-2.5">Professional</p>
                  <Tags items={group.professional} />
                </div>
                <div>
                  <p className="eyebrow mb-2.5">Projects and proofs of concept</p>
                  <Tags items={group.project} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="experience" index="03" eyebrow="Professional experience" title="Four companies, one direction.">
        <ol className="space-y-12">
          {experience.map((role) => (
            <li key={role.company} className="relative border-l border-line pl-6 sm:pl-8">
              <span aria-hidden className="absolute top-2 -left-[4.5px] size-2 rounded-full bg-accent" />
              <p className="font-mono text-xs tracking-wide text-dim">{role.period}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{role.company}</h3>
              <p className="mt-1 text-[0.9375rem] text-muted">{role.title}</p>
              <ul className="mt-5 max-w-prose space-y-2.5 text-[0.9375rem] leading-relaxed text-muted">
                {role.points.map((point) => (
                  <li key={point} className="relative pl-4 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2 before:bg-line-strong">
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <Tags items={role.stack} />
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="work"
        index="04"
        eyebrow="Professional engineering & enterprise projects"
        title="Work done for employers and their clients."
        lede="Delivered as part of teams at Dexian. Each case study states what I contributed and leaves out confidential detail."
      >
        <div className="grid gap-4">
          {professionalProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section
        id="independent"
        index="05"
        eyebrow="Independent product engineering & technical R&D"
        title="Products I design and build on my own."
        lede="Personal work, separate from any employer. Each is labelled with its real stage, including what is not built yet."
      >
        <div className="grid gap-4">
          {independentProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section id="contact" index="06" eyebrow="Contact" title="Let's talk about backend, platform or AI engineering roles.">
        <div className="max-w-prose">
          <a href={`mailto:${profile.email}`} className="text-2xl font-semibold tracking-tight break-all transition-colors hover:text-accent sm:text-3xl">
            {profile.email}
          </a>
          <p className="mt-4 text-muted">{profile.location}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn">LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn">GitHub</a>
            <Link href="/resume/" className="btn">Resume (3 versions)</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
