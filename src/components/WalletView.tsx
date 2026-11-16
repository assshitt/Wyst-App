"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { EARN_RULES } from "@/lib/demo";
import { useUserStore } from "@/store/userStore";

type Filter = "all" | "earned" | "spent";

export default function WalletView() {
  const points = useUserStore((s) => s.points);
  const txns = useUserStore((s) => s.txns);
  const [filter, setFilter] = useState<Filter>("all");

  const earned = txns.filter((txn) => txn.amount > 0).reduce((sum, txn) => sum + txn.amount, 0);
  const spent = txns.filter((txn) => txn.amount < 0).reduce((sum, txn) => sum - txn.amount, 0);
  const visible = txns.filter((txn) =>
    filter === "all" ? true : filter === "earned" ? txn.amount > 0 : txn.amount < 0
  );

  return (
    <>
      <div className="page-head" style={{ marginBottom: 0 }}>
        <div>
          <span className="eyebrow">Wallet</span>
          <h1 style={{ marginTop: 10 }}>Points wallet</h1>
          <p>Points are held when you request a swap and move when you both confirm.</p>
        </div>
      </div>

      <div className="two-col">
        <section className="wallet-card">
          <div className="row between">
            <span className="eyebrow">Available balance</span>
            <Icon name="points" size={22} className="text-green" />
          </div>
          <div className="balance">
            {points}
            <small>PTS</small>
          </div>
          <ul className="wallet-lines">
            <li>
              <span>Earned so far</span>
              <span className="mono amt-in">+{earned}</span>
            </li>
            <li>
              <span>Spent or held</span>
              <span className="mono amt-out">−{spent}</span>
            </li>
          </ul>
          <div className="row gap-8 wrap-flex" style={{ marginTop: 20 }}>
            <Link href="/upload" className="btn btn-primary">
              Earn points
            </Link>
            <Link href="/browse" className="btn btn-glass">
              Spend points
            </Link>
          </div>
        </section>

        <section className="card card-pad">
          <div className="card-head">
            <h2>Ways to earn</h2>
          </div>
          <ul className="rows">
            {EARN_RULES.map((rule) => (
              <li className="rowitem" key={rule.title}>
                <div className="grow">
                  <div className="t">{rule.title}</div>
                  <div className="s">{rule.note}</div>
                </div>
                <span className="points">+{rule.points}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="card card-pad">
        <div className="card-head" style={{ flexWrap: "wrap" }}>
          <h2>History</h2>
          <div className="segmented" role="group" aria-label="Filter history">
            {(["all", "earned", "spent"] as Filter[]).map((option) => (
              <button
                type="button"
                key={option}
                className={filter === option ? "is-active" : undefined}
                aria-pressed={filter === option}
                onClick={() => setFilter(option)}
              >
                {option === "all" ? "All" : option === "earned" ? "Earned" : "Spent"}
              </button>
            ))}
          </div>
        </div>
        {visible.length > 0 ? (
          <ul className="rows">
            {visible.map((txn) => (
              <li className="rowitem" key={txn.id}>
                <span className={txn.amount > 0 ? "ic is-in" : "ic"}>
                  <Icon name={txn.amount > 0 ? "arrow-up-right" : "lock"} size={18} />
                </span>
                <div className="grow">
                  <div className="t">{txn.label}</div>
                  <div className="s">{txn.detail}</div>
                </div>
                <div className="end">
                  <div>
                    <div className={txn.amount > 0 ? "mono amt-in" : "mono amt-out"} style={{ fontWeight: 600 }}>
                      {txn.amount > 0 ? "+" : "−"}
                      {Math.abs(txn.amount)}
                    </div>
                    <div className="s">{txn.when}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">Nothing here yet.</p>
        )}
      </section>
    </>
  );
}
