"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { MoreVertical, X } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  API                                                                       */
/* -------------------------------------------------------------------------- */

// NOTE: client components can only read env vars prefixed with NEXT_PUBLIC_.
// `process.env.NEST_API_URL` is undefined in the browser, so use this instead.
export const API_URL = `${
  process.env.NEXT_PUBLIC_NEST_API_URL ?? "http://localhost:4000"
}/api`;

export async function api<T = unknown>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      // TODO: attach admin auth token, e.g. Authorization: `Bearer ${token}`
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      message = Array.isArray(body.message)
        ? body.message.join(", ")
        : (body.message ?? message);
    } catch {
      /* no JSON body */
    }
    throw new Error(message);
  }

  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

/* -------------------------------------------------------------------------- */
/*  Formatting                                                                */
/* -------------------------------------------------------------------------- */

const ACRONYMS: Record<string, string> = { ugc: "UGC", kyc: "KYC" };

/** "ugc_creator" -> "UGC creator", "short_video" -> "Short video" */
export const humanize = (value?: string | null) =>
  !value
    ? "—"
    : value
        .replace(/_/g, " ")
        .split(" ")
        .map((w) => ACRONYMS[w.toLowerCase()] ?? w)
        .join(" ")
        .replace(/^./, (c) => c.toUpperCase());

export const formatDate = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

/* -------------------------------------------------------------------------- */
/*  Toast                                                                     */
/* -------------------------------------------------------------------------- */

export function useToast() {
  const [toast, setToast] = useState<{ text: string; error: boolean } | null>(
    null,
  );
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = useCallback((text: string, error = false) => {
    if (timer.current) clearTimeout(timer.current);
    setToast({ text, error });
    timer.current = setTimeout(() => setToast(null), 3500);
  }, []);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const toastNode = toast ? (
    <div
      role="status"
      className={`fixed bottom-6 right-6 z-[60] rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg ${
        toast.error ? "bg-red-600" : "bg-gray-900"
      }`}
    >
      {toast.text}
    </div>
  ) : null;

  return { notify, toastNode };
}

/* -------------------------------------------------------------------------- */
/*  Modal                                                                     */
/* -------------------------------------------------------------------------- */

export function Modal({
  title,
  onClose,
  children,
  size = "md",
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  size?: "md" | "lg";
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={`flex max-h-[90vh] w-full flex-col rounded-lg bg-white shadow-xl ${
          size === "lg" ? "max-w-2xl" : "max-w-md"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Action menu                                                               */
/* -------------------------------------------------------------------------- */

export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
  hidden?: boolean;
  separatorBefore?: boolean;
}

const MENU_WIDTH = 208;

/**
 * Row action dropdown. The menu is position:fixed (anchored to the button)
 * so it is never clipped by the table's overflow-x-auto wrapper.
 */
export function ActionMenu({
  items,
  label,
}: {
  items: MenuItem[];
  label: string;
}) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const visible = items.filter((i) => !i.hidden);

  const close = useCallback(() => setPos(null), []);

  const toggle = () => {
    if (pos) return close();
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const menuHeight = visible.length * 38 + 16;
    const opensUp = window.innerHeight - rect.bottom < menuHeight + 8;
    setPos({
      top: opensUp ? rect.top - menuHeight - 4 : rect.bottom + 4,
      left: Math.max(
        8,
        Math.min(rect.right - MENU_WIDTH, window.innerWidth - MENU_WIDTH - 8),
      ),
    });
  };

  useEffect(() => {
    if (!pos) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !buttonRef.current?.contains(t)) {
        close();
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, true);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close, true);
    };
  }, [pos, close]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggle}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={!!pos}
        className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {pos && (
        <div
          ref={menuRef}
          role="menu"
          style={{ top: pos.top, left: pos.left, width: MENU_WIDTH }}
          className="fixed z-50 rounded-lg border border-gray-200 bg-white py-1 text-left shadow-lg"
        >
          {visible.map((item) => (
            <React.Fragment key={item.label}>
              {item.separatorBefore && (
                <div className="my-1 border-t border-gray-100" />
              )}
              <button
                role="menuitem"
                onClick={() => {
                  close();
                  item.onClick();
                }}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm ${
                  item.danger
                    ? "text-red-600 hover:bg-red-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
}