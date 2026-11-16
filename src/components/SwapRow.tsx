"use client";

import { Icon } from "@/components/Icon";
import ProductImage from "@/components/ProductImage";
import type { Swap, SwapStatus } from "@/lib/demo";
import { useUserStore } from "@/store/userStore";

const STATUS: Record<SwapStatus, { label: string; tone: string }> = {
  pending: { label: "Pending", tone: "pill-amber" },
  accepted: { label: "Accepted", tone: "pill-blue" },
  completed: { label: "Completed", tone: "pill-green" },
  declined: { label: "Declined", tone: "pill-red" },
  cancelled: { label: "Cancelled", tone: "" },
};

/** One swap request with the actions that apply to its current state. */
export default function SwapRow({ swap, compact = false }: { swap: Swap; compact?: boolean }) {
  const respondSwap = useUserStore((s) => s.respondSwap);
  const cancelSwap = useUserStore((s) => s.cancelSwap);
  const completeSwap = useUserStore((s) => s.completeSwap);
  const showToast = useUserStore((s) => s.showToast);

  const incoming = swap.direction === "incoming";
  const status = STATUS[swap.status];

  return (
    <li className="rowitem" style={{ flexWrap: "wrap" }}>
      <div className="thumb">
        <ProductImage src={swap.image} alt={swap.title} kind={swap.kind} tone={swap.title.length} />
      </div>
      <div className="grow" style={{ minWidth: 180 }}>
        <div className="t">{swap.title}</div>
        <div className="s">
          {incoming ? `@${swap.person} wants this` : `Requested from @${swap.person}`} · {swap.when}
        </div>
        {!compact && (
          <div className="s row gap-8" style={{ marginTop: 4 }}>
            <Icon name={swap.mode === "meetup" ? "pin" : "truck"} size={14} />
            {swap.place}
          </div>
        )}
      </div>
      <div className="end wrap-flex">
        <span className="points">
          {incoming ? "+" : "−"}
          {swap.points}
        </span>
        <span className={`pill ${status.tone}`}>{status.label}</span>
        {incoming && swap.status === "pending" && (
          <>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                respondSwap(swap.id, true);
                showToast(`Accepted @${swap.person}'s request`);
              }}
            >
              Accept
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                respondSwap(swap.id, false);
                showToast("Request declined");
              }}
            >
              Decline
            </button>
          </>
        )}
        {swap.status === "accepted" && (
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => {
              completeSwap(swap.id);
              showToast(incoming ? `Swap complete. +${swap.points + 25} points` : "Swap complete. +25 points");
            }}
          >
            {incoming ? "Mark handed over" : "Confirm received"}
          </button>
        )}
        {!incoming && swap.status === "pending" && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              cancelSwap(swap.id);
              showToast("Request cancelled. Points returned");
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </li>
  );
}
