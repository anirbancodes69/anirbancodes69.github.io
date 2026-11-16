# Anirban Bhowmick, portfolio

Static portfolio built with Next.js (static export), TypeScript and Tailwind CSS. Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # static site in ./out
```

## Update content

All text lives in `src/content/`:

- `profile.ts`: identity, about, experience, skills, hero figures
- `projects.ts`: the case studies
- `resume.ts`: the three resume variants

After editing resume content, regenerate the PDF, DOCX and Markdown files (needs Google Chrome installed):

```bash
pnpm resumes
```

The generated PDFs and DOCX files in `public/downloads/` are committed, so CI does not need Chrome.

## Deployment

- User site (`<username>.github.io` repository): no configuration needed.
- Project site (any other repository name): set `NEXT_PUBLIC_BASE_PATH=/<repo-name>` in the build step of the workflow.
- Custom domain: add it under Settings → Pages, then add a `public/CNAME` file containing the domain.
