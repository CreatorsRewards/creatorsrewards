"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

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

const BODY = "text-sm leading-relaxed text-cr-dark/75";

/**
 * The content files use a section with an empty title to mean "more text for
 * the section above" (for example a closing paragraph after a list). Here we
 * fold those paragraphs into the section they belong to, so each one stays in
 * the same grid cell. Only the paragraphs (`content`) are carried over.
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
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <main className="mx-auto w-full max-w-[1140px] px-6 pb-10 pt-10">
      {/* CHANGED: Animate the back link */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-dark/70 transition-colors hover:text-cr-pink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cr-pink"
        >
          <span aria-hidden="true">←</span> Back
        </Link>
      </motion.div>

      {/* CHANGED: Animate the page title */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="mb-4 text-[clamp(1.5rem,5vw,2.5rem)] font-bold uppercase tracking-tight text-cr-pink"
      >
        {title}
      </motion.h1>

      {/* CHANGED: Animate the existing legal card */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="cr-card rounded-3xl p-4 sm:p-8"
      >
        <div className="mb-6 space-y-3">
          {intro.map((text, i) => (
            <p key={i} className={BODY}>
              {text}
            </p>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-x-8 gap-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.07,
                delayChildren: shouldReduceMotion ? 0 : 0.15,
              },
            },
          }}
        >
          {foldContinuations(sections).map(({ section, closing }) => (
            <motion.section key={section.id} variants={sectionVariants}>
              {section.title && (
                <h2 className="mb-1.5 text-sm font-bold uppercase leading-snug tracking-wider text-cr-dark">
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
            </motion.section>
          ))}
        </motion.div>

        <p className="mt-5 border-t border-cr-dark/10 pt-4 text-xs text-cr-dark/60">
          Last updated: {lastUpdated}
        </p>
      </motion.div>
    </main>
  );
}
