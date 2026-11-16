"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/Icon";
import { useUserStore } from "@/store/userStore";

const ITEMS: { href: string; label: string; icon: IconName }[] = [
  { href: "/dashboard", label: "Overview", icon: "grid" },
  { href: "/dashboard/wallet", label: "Wallet", icon: "wallet" },
  { href: "/dashboard/listings", label: "My listings", icon: "tag" },
  { href: "/dashboard/swaps", label: "Swaps", icon: "swap" },
  { href: "/dashboard/wishlist", label: "Wishlist", icon: "heart" },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const pending = useUserStore(
    (s) => s.swaps.filter((swap) => swap.direction === "incoming" && swap.status === "pending").length
  );
  const unread = useUserStore((s) => s.threads.reduce((sum, thread) => sum + thread.unread, 0));

  return (
    <nav className="dash-nav" aria-label="Account">
      {ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={pathname === item.href ? "is-active" : undefined}
          aria-current={pathname === item.href ? "page" : undefined}
        >
          <Icon name={item.icon} size={18} />
          {item.label}
          {item.href === "/dashboard/swaps" && pending > 0 && <span className="count-badge">{pending}</span>}
        </Link>
      ))}
      <hr />
      <Link href="/messages">
        <Icon name="chat" size={18} />
        Messages
        {unread > 0 && <span className="count-badge">{unread}</span>}
      </Link>
      <Link
        href="/dashboard/settings"
        className={pathname === "/dashboard/settings" ? "is-active" : undefined}
        aria-current={pathname === "/dashboard/settings" ? "page" : undefined}
      >
        <Icon name="settings" size={18} />
        Settings
      </Link>
    </nav>
  );
}
