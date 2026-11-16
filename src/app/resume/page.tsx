import type { Metadata } from "next";
import { asset } from "@/content/profile";
import { resumeVariants } from "@/content/resume";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download Anirban Bhowmick's resume in three role-specific versions, as PDF or editable DOCX.",
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-page px-5 pt-14 pb-24 sm:px-8 md:pt-20">
      <p className="eyebrow">Resume</p>
      <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
        One career, three emphases.
      </h1>
      <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">
        The same experience and the same facts, ordered for the role you are hiring for. Each is two pages.
      </p>

      <ul className="mt-14 grid gap-4 lg:grid-cols-3">
        {resumeVariants.map((variant) => (
          <li key={variant.id} className="flex flex-col rounded-md border border-line bg-surface p-6 sm:p-7">
            <h2 className="text-xl font-semibold tracking-tight">{variant.label}</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{variant.audience}</p>
            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <a href={asset(`/downloads/${variant.file}.pdf`)} download className="btn btn-primary">
                Download PDF
              </a>
              <a href={asset(`/downloads/${variant.file}.docx`)} download className="btn">
                DOCX
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
