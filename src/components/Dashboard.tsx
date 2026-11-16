"use client";

import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import SwapRow from "@/components/SwapRow";
import { useUserStore } from "@/store/userStore";

export default function Dashboard() {
  const user = useUserStore((s) => s.user);
  const points = useUserStore((s) => s.points);
  const swaps = useUserStore((s) => s.swaps);
  const txns = useUserStore((s) => s.txns);
  const myListings = useUserStore((s) => s.myListings);
  const wishlistCount = useUserStore((s) => s.wishlist.length);

  if (!user) return null;

  const live = myListings.filter((item) => item.status === "live").length;
  const inReview = myListings.filter((item) => item.status === "review").length;
  const completed = swaps.filter((swap) => swap.status === "completed").length;
  const attention = swaps.filter(
    (swap) => (swap.direction === "incoming" && swap.status === "pending") || swap.status === "accepted"
  );
  const isNew = myListings.length === 0 && swaps.length === 0;

  const kpis: { label: string; value: string; sub: string; icon: IconName; hero?: boolean }[] = [
    { label: "Points balance", value: String(points), sub: "Ready to spend", icon: "points", hero: true },
    { label: "Live listings", value: String(live), sub: inReview > 0 ? `${inReview} in review` : "On the rack now", icon: "tag" },
    { label: "Swaps completed", value: String(completed), sub: "All time", icon: "swap" },
    { label: "Wishlist", value: String(wishlistCount), sub: "Saved items", icon: "heart" },
  ];

  const steps: { done: boolean; title: string; note: string; href: string; cta: string }[] = [
    { done: true, title: "Create your account", note: "100 welcome points added", href: "/dashboard/wallet", cta: "View wallet" },
    { done: myListings.length > 0, title: "List your first item", note: "Earn 50 points when it is verified", href: "/upload", cta: "List an item" },
    { done: swaps.length > 0, title: "Request your first swap", note: "Spend points on something you'll wear", href: "/browse", cta: "Browse the rack" },
    { done: user.city !== "", title: "Complete your profile", note: "Add your city so nearby swappers find you", href: "/dashboard/settings", cta: "Edit profile" },
  ];

  return (
    <>
      <div className="page-head" style={{ marginBottom: 0 }}>
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1 style={{ marginTop: 10 }}>Hi, {user.name}</h1>
          <p>
            {attention.length > 0
              ? `${attention.length} ${attention.length === 1 ? "swap needs" : "swaps need"} your attention.`
              : "You're all caught up."}
          </p>
        </div>
        <Link href="/upload" className="btn btn-primary">
          <Icon name="plus" size={18} strokeWidth={2.2} />
          List an item
        </Link>
      </div>

      <div className="kpis">
        {kpis.map((kpi) => (
          <div className={kpi.hero ? "kpi is-hero" : "kpi"} key={kpi.label}>
            <div className="k-label">
              <Icon name={kpi.icon} size={16} />
              {kpi.label}
            </div>
            <div className="k-value">{kpi.value}</div>
            <div className="k-sub">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {isNew ? (
        <section className="card card-pad">
          <div className="card-head">
            <h2>Get started</h2>
            <span className="pill pill-green">
              {steps.filter((step) => step.done).length} of {steps.length} done
            </span>
          </div>
          <ul className="rows">
            {steps.map((step) => (
              <li className="rowitem" key={step.title}>
                <span className={step.done ? "ic is-in" : "ic"}>
                  <Icon name={step.done ? "check" : "arrow-right"} size={18} strokeWidth={step.done ? 2.2 : 1.75} />
                </span>
                <div className="grow">
                  <div className="t">{step.title}</div>
                  <div className="s">{step.note}</div>
                </div>
                {!step.done && (
                  <div className="end">
                    <Link href={step.href} className="btn btn-secondary btn-sm">
                      {step.cta}
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <div className="two-col">
          <section className="card card-pad">
            <div className="card-head">
              <h2>Needs your attention</h2>
              <Link href="/dashboard/swaps" className="link-arrow">
                All swaps <Icon name="arrow-right" size={15} />
              </Link>
            </div>
            {attention.length > 0 ? (
              <ul className="rows">
                {attention.slice(0, 4).map((swap) => (
                  <SwapRow key={swap.id} swap={swap} compact />
                ))}
              </ul>
            ) : (
              <p className="muted">No open requests right now.</p>
            )}
          </section>

          <section className="card card-pad">
            <div className="card-head">
              <h2>Recent points</h2>
              <Link href="/dashboard/wallet" className="link-arrow">
                Wallet <Icon name="arrow-right" size={15} />
              </Link>
            </div>
            <ul className="rows">
              {txns.slice(0, 5).map((txn) => (
                <li className="rowitem" key={txn.id}>
                  <div className="grow">
                    <div className="t">{txn.label}</div>
                    <div className="s">{txn.when}</div>
                  </div>
                  <span className={txn.amount > 0 ? "mono amt-in" : "mono amt-out"} style={{ fontWeight: 600 }}>
                    {txn.amount > 0 ? "+" : "−"}
                    {Math.abs(txn.amount)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </>
  );
}
