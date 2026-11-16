"use client";

import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import type { Notice } from "@/lib/demo";
import { useUserStore } from "@/store/userStore";

const ICONS: Record<Notice["kind"], IconName> = {
  swap: "swap",
  points: "points",
  verify: "shield",
  message: "chat",
};

export default function NotificationsView() {
  const notices = useUserStore((s) => s.notices);
  const markNoticesRead = useUserStore((s) => s.markNoticesRead);
  const unread = notices.filter((notice) => !notice.read).length;

  if (notices.length === 0) {
    return (
      <div className="empty">
        <span className="empty-icon">
          <Icon name="bell" size={24} />
        </span>
        <h3>Nothing new</h3>
        <p>Swap requests, messages and points updates will show up here.</p>
      </div>
    );
  }

  return (
    <section className="card card-pad">
      <div className="card-head">
        <h2>{unread > 0 ? `${unread} unread` : "All caught up"}</h2>
        {unread > 0 && (
          <button type="button" className="btn btn-secondary btn-sm" onClick={markNoticesRead}>
            <Icon name="check" size={15} strokeWidth={2.2} />
            Mark all read
          </button>
        )}
      </div>
      <ul className="rows">
        {notices.map((notice) => (
          <li className={notice.read ? "rowitem" : "rowitem is-unread"} key={notice.id}>
            <span className={notice.kind === "points" || notice.kind === "verify" ? "ic is-in" : "ic is-blue"}>
              <Icon name={ICONS[notice.kind]} size={18} />
            </span>
            <div className="grow">
              <div className="t">{notice.title}</div>
              <div className="s">{notice.body}</div>
            </div>
            <div className="end">
              <span className="s">{notice.when}</span>
              <Link href={notice.href} className="icon-btn" aria-label={`Open: ${notice.title}`}>
                <Icon name="chevron-right" size={17} />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
