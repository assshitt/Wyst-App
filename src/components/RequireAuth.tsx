"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { useUserStore } from "@/store/userStore";

export default function RequireAuth({
  children,
  title = "Log in to continue",
  note = "Your points, listings and swaps live in your WYST account.",
}: {
  children: ReactNode;
  title?: string;
  note?: string;
}) {
  const hydrated = useUserStore((s) => s.hydrated);
  const user = useUserStore((s) => s.user);

  if (!hydrated) {
    return <div className="skeleton" style={{ height: 360 }} aria-hidden="true" />;
  }

  if (!user) {
    return (
      <div className="empty">
        <span className="empty-icon">
          <Icon name="lock" size={24} />
        </span>
        <h3>{title}</h3>
        <p>{note}</p>
        <div className="row gap-8 wrap-flex" style={{ justifyContent: "center" }}>
          <Link href="/login" className="btn btn-primary">
            Log in
          </Link>
          <Link href="/signup" className="btn btn-secondary">
            Create account
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
