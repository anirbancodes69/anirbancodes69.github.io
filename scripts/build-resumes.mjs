// Generates the three role-specific resumes as Markdown, DOCX and PDF.
// Run with: pnpm resumes
// Content comes from src/content/resume.ts and src/content/profile.ts.
// PDF output uses a locally installed Chrome (set CHROME_PATH to override).

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { AlignmentType, Document, Packer, Paragraph, TabStopType, TextRun } from "docx";
import { experience, profile } from "../src/content/profile.ts";
import { dexianPoints, resumeContact, resumeEducation, resumeProjects, resumeVariants } from "../src/content/resume.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "downloads");
const mdDir = path.join(root, "resumes");
const tmpDir = path.join(root, ".next", "resume-tmp");
for (const dir of [outDir, mdDir, tmpDir]) mkdirSync(dir, { recursive: true });

const chrome =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const strip = (url) => url.replace("https://", "");
const contactLine = [
  resumeContact.location,
  resumeContact.phone,
  profile.email,
  strip(profile.linkedin),
  strip(profile.github),
];

function rolesFor(variant) {
  return experience.map((role) =>
    role.company.startsWith("Dexian")
      ? { ...role, points: variant.dexianOrder.map((key) => dexianPoints[key]) }
      : role,
  );
}

function toMarkdown(variant) {
  const lines = [`# ${profile.name}`, "", `**${variant.headline}**`, "", contactLine.join(" | "), ""];
  lines.push("## Professional Summary", "", variant.summary, "");
  lines.push("## Technical Skills", "");
  for (const [name, items] of variant.skills) lines.push(`- **${name}:** ${items}`);
  lines.push("", "## Professional Experience", "");
  for (const role of rolesFor(variant)) {
    lines.push(`### ${role.title}, ${role.company}`, `*${role.period}*`, "");
    for (const point of role.points) lines.push(`- ${point}`);
    lines.push("");
  }
  lines.push("## Selected Projects", "");
  for (const key of variant.projects) {
    const project = resumeProjects[key];
    lines.push(`### ${project.title}`, `*${project.label}. ${project.stack}*`, "");
    for (const point of project.points) lines.push(`- ${point}`);
    lines.push("");
  }
  lines.push("## Education", "", `${resumeEducation.degree}, ${resumeEducation.school}`, "");
  lines.push("## Certification", "", resumeEducation.certification, "");
  lines.push("## Career Note", "", resumeEducation.careerNote, "");
  return lines.join("\n");
}

const esc = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function toHtml(variant) {
  const roles = rolesFor(variant)
    .map(
      (role) => `
      <div class="entry">
        <div class="row"><span><b>${esc(role.title)}</b>, ${esc(role.company)}</span><span class="date">${esc(role.period)}</span></div>
        <ul>${role.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      </div>`,
    )
    .join("");
  const projects = variant.projects
    .map((key) => {
      const project = resumeProjects[key];
      return `
      <div class="entry">
        <div class="row"><span><b>${esc(project.title)}</b></span><span class="date">${esc(project.label)}</span></div>
        <div class="stack">${esc(project.stack)}</div>
        <ul>${project.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      </div>`;
    })
    .join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(profile.name)} - ${esc(variant.label)}</title>
<style>
  @page { size: A4; margin: 14mm 15mm; }
  * { box-sizing: border-box; }
  body { font-family: Helvetica, Arial, sans-serif; font-size: 9.6pt; line-height: 1.38; color: #111; margin: 0; }
  h1 { font-size: 20pt; margin: 0; letter-spacing: -0.01em; }
  .headline { font-size: 10.5pt; font-weight: bold; margin: 3pt 0 4pt; color: #222; }
  .contact { font-size: 9pt; color: #333; }
  h2 { font-size: 10pt; letter-spacing: 0.06em; text-transform: uppercase; border-bottom: 0.75pt solid #999; padding-bottom: 2pt; margin: 11pt 0 5pt; break-after: avoid; }
  p { margin: 0; }
  ul { margin: 3pt 0 0; padding-left: 13pt; }
  li { margin-bottom: 2pt; }
  .skills p { margin-bottom: 2pt; }
  .entry { margin-bottom: 7pt; break-inside: avoid; }
  .row { display: flex; justify-content: space-between; gap: 12pt; break-after: avoid; }
  .date { white-space: nowrap; color: #333; }
  .stack { font-size: 9pt; color: #333; font-style: italic; }
</style></head><body>
  <h1>${esc(profile.name)}</h1>
  <p class="headline">${esc(variant.headline)}</p>
  <p class="contact">${contactLine.map(esc).join(" &nbsp;|&nbsp; ")}</p>
  <h2>Professional Summary</h2><p>${esc(variant.summary)}</p>
  <h2>Technical Skills</h2><div class="skills">${variant.skills.map(([n, i]) => `<p><b>${esc(n)}:</b> ${esc(i)}</p>`).join("")}</div>
  <h2>Professional Experience</h2>${roles}
  <h2>Selected Projects</h2>${projects}
  <h2>Education</h2><p><b>${esc(resumeEducation.degree)}</b>, ${esc(resumeEducation.school)}</p>
  <h2>Certification</h2><p>${esc(resumeEducation.certification)}</p>
  <h2>Career Note</h2><p>${esc(resumeEducation.careerNote)}</p>
</body></html>`;
}

function toDocx(variant) {
  const size = 20; // half-points
  const heading = (text) =>
    new Paragraph({
      spacing: { before: 220, after: 80 },
      border: { bottom: { style: "single", size: 6, color: "999999", space: 2 } },
      children: [new TextRun({ text: text.toUpperCase(), bold: true, size })],
    });
  const bullet = (text) =>
    new Paragraph({ bullet: { level: 0 }, spacing: { after: 40 }, children: [new TextRun({ text, size })] });
  const titled = (left, right) =>
    new Paragraph({
      spacing: { before: 100 },
      tabStops: [{ type: TabStopType.RIGHT, position: 10200 }],
      children: [...left, new TextRun({ text: `\t${right}`, size })],
    });

  const children = [
    new Paragraph({ children: [new TextRun({ text: profile.name, bold: true, size: 40 })] }),
    new Paragraph({ spacing: { before: 40, after: 60 }, children: [new TextRun({ text: variant.headline, bold: true, size: 22 })] }),
    new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: contactLine.join("  |  "), size: 18 })] }),
    heading("Professional Summary"),
    new Paragraph({ children: [new TextRun({ text: variant.summary, size })] }),
    heading("Technical Skills"),
    ...variant.skills.map(
      ([name, items]) =>
        new Paragraph({
          spacing: { after: 40 },
          children: [new TextRun({ text: `${name}: `, bold: true, size }), new TextRun({ text: items, size })],
        }),
    ),
    heading("Professional Experience"),
    ...rolesFor(variant).flatMap((role) => [
      titled([new TextRun({ text: role.title, bold: true, size }), new TextRun({ text: `, ${role.company}`, size })], role.period),
      ...role.points.map(bullet),
    ]),
    heading("Selected Projects"),
    ...variant.projects.flatMap((key) => {
      const project = resumeProjects[key];
      return [
        titled([new TextRun({ text: project.title, bold: true, size })], project.label),
        new Paragraph({ children: [new TextRun({ text: project.stack, italics: true, size: 18 })] }),
        ...project.points.map(bullet),
      ];
    }),
    heading("Education"),
    new Paragraph({
      children: [new TextRun({ text: resumeEducation.degree, bold: true, size }), new TextRun({ text: `, ${resumeEducation.school}`, size })],
    }),
    heading("Certification"),
    new Paragraph({ children: [new TextRun({ text: resumeEducation.certification, size })] }),
    heading("Career Note"),
    new Paragraph({ children: [new TextRun({ text: resumeEducation.careerNote, size })] }),
  ];

  return new Document({
    creator: profile.name,
    title: `${profile.name} - ${variant.label}`,
    styles: { default: { document: { run: { font: "Arial" } } } },
    sections: [{ properties: { page: { margin: { top: 800, bottom: 800, left: 850, right: 850 } } }, children }],
  });
}

for (const variant of resumeVariants) {
  writeFileSync(path.join(mdDir, `${variant.file}.md`), toMarkdown(variant));
  writeFileSync(path.join(outDir, `${variant.file}.docx`), await Packer.toBuffer(toDocx(variant)));

  const htmlPath = path.join(tmpDir, `${variant.file}.html`);
  writeFileSync(htmlPath, toHtml(variant));
  const pdfPath = path.join(outDir, `${variant.file}.pdf`);
  if (existsSync(chrome)) {
    execFileSync(
      chrome,
      ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${pdfPath}`, pathToFileURL(htmlPath).href],
      { stdio: "ignore" },
    );
    console.log(`built ${variant.file} (.md, .docx, .pdf)`);
  } else {
    console.warn(`built ${variant.file} (.md, .docx). PDF skipped: Chrome not found at ${chrome}`);
  }
}
