"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon, type IconName } from "@/components/Icon";
import Logo from "@/components/Logo";
import { useUserStore } from "@/store/userStore";

const NAV = [
  { href: "/browse", label: "Browse", hideMd: false },
  { href: "/upload", label: "List an item", hideMd: false },
  { href: "/how-it-works", label: "How it works", hideMd: false },
  { href: "/help", label: "Help", hideMd: true },
];

const MENU: { href: string; label: string; icon: IconName }[] = [
  { href: "/dashboard", label: "Dashboard", icon: "grid" },
  { href: "/dashboard/wallet", label: "Points wallet", icon: "wallet" },
  { href: "/dashboard/listings", label: "My listings", icon: "tag" },
  { href: "/dashboard/swaps", label: "Swaps", icon: "swap" },
  { href: "/dashboard/wishlist", label: "Wishlist", icon: "heart" },
  { href: "/dashboard/settings", label: "Settings", icon: "settings" },
];

function initials(name: string): string {
  return name.slice(0, 2);
}

export default function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const hydrated = useUserStore((s) => s.hydrated);
  const user = useUserStore((s) => s.user);
  const points = useUserStore((s) => s.points);
  const unreadNotices = useUserStore((s) => s.notices.filter((n) => !n.read).length);
  const unreadChats = useUserStore((s) => s.threads.reduce((sum, t) => sum + t.unread, 0));
  const signOut = useUserStore((s) => s.signOut);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && !target.closest(".menu-wrap")) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [menuOpen]);

  return (
    <header className={overlay ? "header is-overlay" : "header"}>
      <div className="wrap header-inner">
        <Logo />

        <nav className="nav only-desktop" aria-label="Main">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const cls = [active ? "is-active" : "", item.hideMd ? "hide-md" : ""].join(" ").trim();
            return (
              <Link key={item.href} href={item.href} className={cls || undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {!overlay && (
          <form
            className="header-search only-desktop"
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              const q = query.trim();
              router.push(q ? `/browse?q=${encodeURIComponent(q)}` : "/browse");
            }}
          >
            <div className="input-icon">
              <Icon name="search" size={17} />
              <input
                className="input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search brands, items, sizes"
                aria-label="Search listings"
              />
            </div>
          </form>
        )}

        <div className="header-actions">
          {!hydrated ? (
            <span style={{ width: 120, height: 40 }} aria-hidden="true" />
          ) : user ? (
            <>
              <Link href="/browse" className="icon-btn only-mobile" aria-label="Search listings">
                <Icon name="search" size={18} />
              </Link>
              <Link href="/dashboard/wallet" className="points-pill" aria-label={`${points} points in your wallet`}>
                <Icon name="points" size={16} />
                {points}
              </Link>
              <Link href="/messages" className="icon-btn only-desktop" aria-label="Messages">
                <Icon name="chat" size={18} />
                {unreadChats > 0 && <span className="dot" />}
              </Link>
              <Link href="/notifications" className="icon-btn" aria-label="Notifications">
                <Icon name="bell" size={18} />
                {unreadNotices > 0 && <span className="dot" />}
              </Link>
              <div className="menu-wrap only-desktop">
                <button
                  type="button"
                  className="menu-trigger"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  aria-label="Account menu"
                  onClick={() => setMenuOpen((open) => !open)}
                >
                  <span className="avatar avatar-sm">{initials(user.name)}</span>
                  <Icon name="chevron-down" size={15} />
                </button>
                {menuOpen && (
                  <div className="menu" role="menu">
                    <div className="menu-user">
                      <span className="avatar">{initials(user.name)}</span>
                      <div>
                        <strong>{user.name}</strong>
                        <span>@{user.username}</span>
                      </div>
                    </div>
                    {MENU.map((item) => (
                      <Link key={item.href} href={item.href} role="menuitem">
                        <Icon name={item.icon} size={17} />
                        {item.label}
                      </Link>
                    ))}
                    <hr />
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false);
                        signOut();
                        router.push("/");
                      }}
                    >
                      <Icon name="logout" size={17} />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm">
                Log in
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm">
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
