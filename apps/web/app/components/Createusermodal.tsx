"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { Modal, api } from "./shared";

const ROLES = ["Creator", "Brand", "Admin"] as const;

export default function CreateUserModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (name: string) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<(typeof ROLES)[number]>("Creator");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputClass =
    "mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500";

  const submit = async () => {
    setBusy(true);
    setError(null);
    try {
      // Adjust the payload to match your CreateUserDto
      await api("/users", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          role: role.toLowerCase(),
        }),
      });
      onCreated(name.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create the user");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal title="Add new user" onClose={onClose}>
      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Name
          <input
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name or brand name"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Email
          <input
            type="email"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Role
          <select
            className={`${inputClass} bg-white`}
            value={role}
            onChange={(e) => setRole(e.target.value as (typeof ROLES)[number])}
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            disabled={busy || !name.trim() || !email.trim()}
            onClick={submit}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            Create user
          </button>
        </div>
      </div>
    </Modal>
  );
}