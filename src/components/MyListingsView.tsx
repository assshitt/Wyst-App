"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import ProductImage from "@/components/ProductImage";
import type { MyListing } from "@/lib/demo";
import { useUserStore } from "@/store/userStore";

type Filter = "all" | MyListing["status"];

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "live", label: "Live" },
  { value: "review", label: "In review" },
  { value: "swapped", label: "Swapped" },
];

const STATUS: Record<MyListing["status"], { label: string; tone: string }> = {
  live: { label: "Live", tone: "pill-green" },
  review: { label: "In review", tone: "pill-amber" },
  swapped: { label: "Swapped", tone: "" },
};

export default function MyListingsView() {
  const myListings = useUserStore((s) => s.myListings);
  const removeListing = useUserStore((s) => s.removeListing);
  const showToast = useUserStore((s) => s.showToast);
  const [filter, setFilter] = useState<Filter>("all");

  const visible = myListings.filter((item) => filter === "all" || item.status === filter);

  return (
    <>
      <div className="page-head" style={{ marginBottom: 0 }}>
        <div>
          <span className="eyebrow">My listings</span>
          <h1 style={{ marginTop: 10 }}>Your items</h1>
          <p>Everything you have put on the rack.</p>
        </div>
        <Link href="/upload" className="btn btn-primary">
          <Icon name="plus" size={18} strokeWidth={2.2} />
          List an item
        </Link>
      </div>

      {myListings.length === 0 ? (
        <div className="empty">
          <span className="empty-icon">
            <Icon name="tag" size={24} />
          </span>
          <h3>No listings yet</h3>
          <p>List something you no longer wear and earn 50 points when it is verified.</p>
          <Link href="/upload" className="btn btn-primary">
            List your first item
          </Link>
        </div>
      ) : (
        <>
          <div className="scroll-x">
            {FILTERS.map((option) => (
              <button
                type="button"
                key={option.value}
                className={filter === option.value ? "chip is-active" : "chip"}
                aria-pressed={filter === option.value}
                onClick={() => setFilter(option.value)}
              >
                {option.label}
                <span className="mono" style={{ opacity: 0.7 }}>
                  {option.value === "all"
                    ? myListings.length
                    : myListings.filter((item) => item.status === option.value).length}
                </span>
              </button>
            ))}
          </div>

          {visible.length > 0 ? (
            <div className="grid-cards">
              {visible.map((item, index) => (
                <article className="lcard" key={item.id}>
                  <div className="lcard-media">
                    <ProductImage src={item.image} alt={item.title} kind={item.kind} tone={index} />
                    <div className="lcard-tags">
                      <span className={`pill pill-solid ${STATUS[item.status].tone}`}>{STATUS[item.status].label}</span>
                    </div>
                  </div>
                  <div className="lcard-body">
                    <div className="lcard-brand">
                      <span>{item.brand}</span>
                      <span>Size {item.size}</span>
                    </div>
                    <h3 className="lcard-title">{item.title}</h3>
                    <div className="lcard-meta">
                      <Icon name="eye" size={14} />
                      <span>{item.views}</span>
                      <i />
                      <Icon name="heart" size={14} />
                      <span>{item.saves}</span>
                    </div>
                    <div className="lcard-foot" style={{ alignItems: "center" }}>
                      <span className="points">
                        {item.points} <small>PTS</small>
                      </span>
                      {item.status !== "swapped" && (
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            removeListing(item.id);
                            showToast(`${item.title} removed`);
                          }}
                        >
                          <Icon name="trash" size={15} />
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="muted">Nothing in this group.</p>
          )}
        </>
      )}
    </>
  );
}
