"use client";

import Link from "next/link";
import BackButton from "../ui/BackButton";

export interface LegalSubsection {
  title?: string;
  content?: string[];
  list?: string[];
}

export interface LegalLink {
  label: string;
  href: string;
}

export interface LegalSection {
  id: string;
  title: string;
  content?: string[];
  list?: string[];
  subsections?: LegalSubsection[];
  links?: LegalLink[];
}

interface LegalDocumentProps {
  title: string;
  intro: readonly string[];
  sections: readonly LegalSection[];
  lastUpdated: string;
}

const BODY = "text-xs lg:text-sm leading-relaxed text-(--text-secondary)";

/**
 * The content files use a section with an empty title to mean "more text for
 * the section above" (for example a closing paragraph after a list). Here we
 * fold those paragraphs into the section they belong to, so each one stays
 * in the same grid cell. Only the paragraphs (`content`) are carried over.
 */
function foldContinuations(sections: readonly LegalSection[]) {
  const groups: { section: LegalSection; closing: string[] }[] = [];

  for (const section of sections) {
    const previous = groups[groups.length - 1];

    if (!section.title && previous) {
      previous.closing.push(...(section.content ?? []));
    } else {
      groups.push({ section, closing: [] });
    }
  }

  return groups;
}

function Paragraphs({ items }: { items?: readonly string[] }) {
  return items?.map((text, i) => (
    <p key={i} className={`${BODY} mb-1.5`}>
      {text}
    </p>
  ));
}

function BulletList({ items }: { items?: readonly string[] }) {
  if (!items) return null;

  return (
    <ul className="my-1 mb-2 list-disc space-y-1 pl-5">
      {items.map((text, i) => (
        <li key={i} className={BODY}>
          {text}
        </li>
      ))}
    </ul>
  );
}

/** Shared page for long legal text (Privacy Policy now, Terms of Service next). */

export default function LegalDocument({
  title,
  intro,
  sections,
  lastUpdated,
}: LegalDocumentProps) {
  return (
    <div className="bg-matcha-grad">
      <main className="mx-auto w-full max-w-[1140px] px-6 pb-10 pt-10">
        <BackButton label="Back" useHistory={true} />

        {/* CHANGED: CSS animation for the title */}
        <h1
          style={{
            animation: "popBounce 0.6s cubic-bezier(0.16,1,0.3,1) both",
          }}
          className="mb-4 font-display text-[clamp(1.5rem,5vw,2.5rem)] font-bold uppercase tracking-tight text-cr-pink motion-safe:animate-[popBounce_0.6s_cubic-bezier(0.16,1,0.3,1)_both]"
        >
          {title}
        </h1>

        {/* CHANGED: CSS animation for the legal card */}
        <div
          style={{
            animation:
              "slideUpSmooth 0.6s cubic-bezier(0.16,1,0.3,1) both 80ms",
          }}
          className="cr-card rounded-3xl p-4 sm:p-8"
        >
          <div className="mb-6 space-y-3">
            {intro.map((text, i) => (
              <p key={i} className={BODY}>
                {text}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-x-8 gap-y-6">
            {foldContinuations(sections).map(({ section, closing }) => (
              <section key={section.id}>
                {section.title && (
                  <h2 className="font-display mb-1.5 text-sm font-bold uppercase leading-snug tracking-wider text-cr-dark">
                    {section.title}
                  </h2>
                )}

                <Paragraphs items={section.content} />
                <BulletList items={section.list} />

                {section.subsections?.map((sub, i) => (
                  <div key={i} className="mt-2.5">
                    {sub.title && (
                      <h3 className="mb-1 text-[13px] font-bold leading-snug text-cr-dark">
                        {sub.title}
                      </h3>
                    )}

                    <Paragraphs items={sub.content} />
                    <BulletList items={sub.list} />
                  </div>
                ))}

                {section.links && (
                  <div className="mt-1 space-y-1">
                    {section.links.map((link) => (
                      <p key={link.href} className="text-sm leading-normal">
                        <a
                          href={link.href}
                          className="font-bold text-cr-pink hover:underline"
                        >
                          {link.label}
                        </a>
                      </p>
                    ))}
                  </div>
                )}

                <Paragraphs items={closing} />
              </section>
            ))}
          </div>

          <p className="mt-5 border-t border-(--border-subtle) pt-4 text-xs text-(--text-muted)">
            Last updated: {lastUpdated}
          </p>
        </div>
      </main>
    </div>
  );
}
