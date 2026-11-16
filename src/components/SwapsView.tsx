"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import SwapRow from "@/components/SwapRow";
import { useUserStore } from "@/store/userStore";

type Tab = "incoming" | "outgoing" | "history";

export default function SwapsView() {
  const swaps = useUserStore((s) => s.swaps);
  const [tab, setTab] = useState<Tab>("incoming");

  const open = (status: string) => status === "pending" || status === "accepted";
  const groups: Record<Tab, typeof swaps> = {
    incoming: swaps.filter((swap) => swap.direction === "incoming" && open(swap.status)),
    outgoing: swaps.filter((swap) => swap.direction === "outgoing" && open(swap.status)),
    history: swaps.filter((swap) => !open(swap.status)),
  };
  const labels: Record<Tab, string> = { incoming: "Incoming", outgoing: "Outgoing", history: "History" };
  const visible = groups[tab];

  return (
    <>
      <div className="page-head" style={{ marginBottom: 0 }}>
        <div>
          <span className="eyebrow">Swaps</span>
          <h1 style={{ marginTop: 10 }}>Swap requests</h1>
          <p>Accept, arrange the handover in chat, then confirm to move the points.</p>
        </div>
        <Link href="/messages" className="btn btn-secondary">
          <Icon name="chat" size={17} />
          Open chat
        </Link>
      </div>

      <div className="segmented" role="group" aria-label="Swap groups" style={{ alignSelf: "flex-start" }}>
        {(["incoming", "outgoing", "history"] as Tab[]).map((option) => (
          <button
            type="button"
            key={option}
            className={tab === option ? "is-active" : undefined}
            aria-pressed={tab === option}
            onClick={() => setTab(option)}
          >
            {labels[option]} · {groups[option].length}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <section className="card card-pad">
          <ul className="rows">
            {visible.map((swap) => (
              <SwapRow key={swap.id} swap={swap} />
            ))}
          </ul>
        </section>
      ) : (
        <div className="empty">
          <span className="empty-icon">
            <Icon name="swap" size={24} />
          </span>
          <h3>
            {tab === "incoming" ? "No incoming requests" : tab === "outgoing" ? "No outgoing requests" : "No history yet"}
          </h3>
          <p>
            {tab === "incoming"
              ? "When someone wants one of your items, it shows up here."
              : tab === "outgoing"
                ? "Find something you like and send a request."
                : "Completed, declined and cancelled swaps are kept here."}
          </p>
          <Link href={tab === "incoming" ? "/upload" : "/browse"} className="btn btn-primary">
            {tab === "incoming" ? "List an item" : "Browse the rack"}
          </Link>
        </div>
      )}
    </>
  );
}
