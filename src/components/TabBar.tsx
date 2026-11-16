"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/Icon";

type Tab = { href: string; label: string; icon: IconName };

const LEFT: Tab[] = [
  { href: "/browse", label: "Explore", icon: "compass" },
  { href: "/dashboard/wishlist", label: "Saved", icon: "heart" },
];

const RIGHT: Tab[] = [
  { href: "/dashboard/swaps", label: "Swaps", icon: "swap" },
  { href: "/dashboard", label: "You", icon: "user" },
];

/** Bottom navigation shown on phones, with a raised button for listing an item. */
export default function TabBar() {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    if (href === "/dashboard") {
      return (
        pathname === "/dashboard" ||
        (pathname.startsWith("/dashboard/") &&
          !pathname.startsWith("/dashboard/wishlist") &&
          !pathname.startsWith("/dashboard/swaps"))
      );
    }
    if (href === "/browse") return pathname === "/browse" || pathname.startsWith("/listing/");
    return pathname.startsWith(href);
  };

  const renderTab = (tab: Tab) => (
    <Link
      key={tab.href}
      href={tab.href}
      className={isActive(tab.href) ? "is-active" : undefined}
      aria-current={isActive(tab.href) ? "page" : undefined}
    >
      <Icon name={tab.icon} size={22} />
      {tab.label}
    </Link>
  );

  return (
    <nav className="tabbar" aria-label="App">
      {LEFT.map(renderTab)}
      <Link href="/upload" aria-label="List an item">
        <span className="fab">
          <Icon name="plus" size={26} strokeWidth={2.2} />
        </span>
      </Link>
      {RIGHT.map(renderTab)}
    </nav>
  );
}
