"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ConditionBadge } from "@/components/ConditionBadge";
import { LISTINGS } from "@/lib/listings";
import { useUserStore } from "@/store/userStore";

const TABS = [
  { id: "wallet", label: "Points Wallet" },
  { id: "listings", label: "My Listings" },
  { id: "requests", label: "Swap Requests", badge: 3 },
  { id: "wishlist", label: "Wishlist" },
  { id: "messages", label: "Messages" },
  { id: "settings", label: "Profile Settings" },
];

const TRANSACTIONS = [
  { type: "earn", desc: "Upload verified — Nike Hoodie", amount: 50, date: "May 20, 2026" },
  { type: "spend", desc: "Swap — Zara Floral Dress", amount: -200, date: "May 18, 2026" },
  { type: "earn", desc: "Swap completed bonus", amount: 25, date: "May 18, 2026" },
  { type: "earn", desc: "5-star review bonus", amount: 10, date: "May 15, 2026" },
  { type: "spend", desc: "Swap — H&M Crop Top", amount: -80, date: "May 12, 2026" },
  { type: "earn", desc: "Welcome bonus", amount: 100, date: "May 1, 2026" },
];

const MY_LISTINGS = LISTINGS.slice(0, 4).map((l, i) => ({
  ...l,
  status: (["Available", "Pending", "Swapped", "Available"] as const)[i],
}));

const INCOMING_REQUESTS = [
  {
    item: LISTINGS[0],
    user: "priya_fashion",
    rating: 4.6,
    points: 150,
    swapType: "Meetup",
  },
  {
    item: LISTINGS[4],
    user: "denim_lover",
    rating: 4.9,
    points: 180,
    swapType: "Delivery",
  },
];

const OUTGOING_REQUESTS = [
  {
    item: LISTINGS[1],
    user: "sporty_swaps",
    rating: 4.3,
    points: 200,
    status: "Pending",
  },
];

export default function Dashboard() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") ?? "wallet";
  const [activeTab, setActiveTab] = useState(
    TABS.some((t) => t.id === initialTab) ? initialTab : "wallet"
  );
  const points = useUserStore((s) => s.points);
  const wishlist = useUserStore((s) => s.wishlist);
  const wishlistItems = LISTINGS.filter((l) => wishlist.includes(l.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
      <h1 className="text-2xl font-bold text-white md:text-3xl">My Dashboard</h1>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Points", value: `${points}`, highlight: true },
          { label: "Items Listed", value: "8" },
          { label: "Swaps Completed", value: "12" },
          { label: "Rating", value: "4.8 ★" },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl border p-4 ${
              stat.highlight
                ? "border-emerald-500/30 bg-emerald-500/10"
                : "border-white/10 bg-[#0a0a0a]"
            }`}
          >
            <p className="text-xs text-zinc-500">{stat.label}</p>
            <p
              className={`mt-1 text-2xl font-bold md:text-3xl ${
                stat.highlight ? "text-[#22c55e]" : "text-white"
              }`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-6 lg:flex-row">
        <aside className="lg:w-56 shrink-0">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex shrink-0 items-center justify-between gap-2 rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {tab.label}
                {tab.badge && (
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#0a0a0a] p-5 md:p-6">
          {activeTab === "wallet" && (
            <div>
              <div className="flex items-center gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl">
                  🪙
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Your balance</p>
                  <p className="text-4xl font-black text-[#22c55e]">{points} pts</p>
                </div>
              </div>
              <h3 className="mt-8 font-semibold text-white">Earn more points</h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">+50</span> Upload item (when verified)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">+25</span> Complete a swap
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">+10</span> Get a 5-star review
                </li>
              </ul>
              <h3 className="mt-8 font-semibold text-white">Transaction history</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-zinc-500">
                      <th className="pb-2 pr-4">Activity</th>
                      <th className="pb-2 pr-4">Amount</th>
                      <th className="pb-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRANSACTIONS.map((tx, i) => (
                      <tr
                        key={i}
                        className={`border-b border-white/5 ${
                          tx.type === "earn" ? "text-emerald-400/90" : "text-red-400/90"
                        }`}
                      >
                        <td className="py-3 pr-4 text-zinc-300">{tx.desc}</td>
                        <td className="py-3 pr-4 font-semibold">
                          {tx.amount > 0 ? "+" : ""}
                          {tx.amount} pts
                        </td>
                        <td className="py-3 text-zinc-500">{tx.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "listings" && (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">My listings</h3>
                <Link
                  href="/upload"
                  className="rounded-lg bg-[#22c55e] px-4 py-2 text-sm font-bold text-[#050505]"
                >
                  Upload New Item
                </Link>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {MY_LISTINGS.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 rounded-xl border border-white/10 bg-[#050505] p-3"
                  >
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg">
                      <Image src={item.image} alt="" fill className="object-cover" sizes="64px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-white">{item.title}</p>
                      <p className="text-sm text-[#22c55e]">{item.points} pts</p>
                      <span
                        className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                          item.status === "Available"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : item.status === "Pending"
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-zinc-500/20 text-zinc-400"
                        }`}
                      >
                        {item.status}
                      </span>
                      <div className="mt-2 flex gap-2">
                        <button type="button" className="text-xs text-zinc-400 hover:text-white">
                          Edit
                        </button>
                        <button type="button" className="text-xs text-red-400 hover:text-red-300">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "requests" && (
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-white">Incoming requests</h3>
                <div className="mt-4 space-y-4">
                  {INCOMING_REQUESTS.map((req, i) => (
                    <div
                      key={i}
                      className="flex flex-wrap items-center gap-4 rounded-xl border border-white/10 bg-[#050505] p-4"
                    >
                      <div className="relative h-16 w-14 overflow-hidden rounded-lg">
                        <Image src={req.item.image} alt="" fill className="object-cover" sizes="56px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-white">{req.item.title}</p>
                        <p className="text-sm text-zinc-500">
                          @{req.user} · {req.rating} ★ · {req.swapType}
                        </p>
                        <p className="text-sm text-[#22c55e]">{req.points} pts offered</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="rounded-lg bg-[#22c55e] px-4 py-2 text-sm font-bold text-[#050505]"
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          className="rounded-lg border border-red-500/50 px-4 py-2 text-sm font-medium text-red-400"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white">Outgoing requests</h3>
                <div className="mt-4 space-y-4">
                  {OUTGOING_REQUESTS.map((req, i) => (
                    <div
                      key={i}
                      className="flex flex-wrap items-center gap-4 rounded-xl border border-white/10 bg-[#050505] p-4"
                    >
                      <div className="relative h-16 w-14 overflow-hidden rounded-lg">
                        <Image src={req.item.image} alt="" fill className="object-cover" sizes="56px" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white">{req.item.title}</p>
                        <p className="text-sm text-zinc-500">@{req.user}</p>
                        <p className="text-sm text-[#22c55e]">{req.points} pts</p>
                      </div>
                      <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400">
                        {req.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div>
              <h3 className="font-semibold text-white">Wishlist</h3>
              {wishlistItems.length === 0 ? (
                <p className="mt-4 text-zinc-500">
                  No saved items yet.{" "}
                  <Link href="/browse" className="text-emerald-400 hover:underline">
                    Browse swaps
                  </Link>
                </p>
              ) : (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {wishlistItems.map((item) => (
                    <Link
                      key={item.id}
                      href={`/listing/${item.id}`}
                      className="flex gap-3 rounded-xl border border-white/10 p-3 hover:border-white/20"
                    >
                      <div className="relative h-20 w-16 overflow-hidden rounded-lg">
                        <Image src={item.image} alt="" fill className="object-cover" sizes="64px" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{item.title}</p>
                        <p className="text-[#22c55e]">{item.points} pts</p>
                        <ConditionBadge condition={item.condition} />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "messages" && (
            <div className="py-12 text-center text-zinc-500">
              <p>No messages yet. Start a swap to chat with sellers.</p>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="max-w-md space-y-4">
              <h3 className="font-semibold text-white">Profile settings</h3>
              <input
                placeholder="Display name"
                defaultValue="You"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
              />
              <input
                placeholder="Email"
                defaultValue="you@wyst.app"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
              />
              <input
                placeholder="College / campus"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
              />
              <button
                type="button"
                className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-bold text-[#050505]"
              >
                Save changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
