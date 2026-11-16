"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { useUserStore } from "@/store/userStore";

export default function MessagesView() {
  const threads = useUserStore((s) => s.threads);
  const sendMessage = useUserStore((s) => s.sendMessage);
  const openThread = useUserStore((s) => s.openThread);

  const [openId, setOpenId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  const active = threads.find((thread) => thread.id === openId) ?? threads[0];
  const messageCount = active ? active.messages.length : 0;

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [openId, messageCount]);

  if (threads.length === 0 || !active) {
    return (
      <div className="empty">
        <span className="empty-icon">
          <Icon name="chat" size={24} />
        </span>
        <h3>No conversations yet</h3>
        <p>Chats open automatically when a swap request is sent or received.</p>
        <Link href="/browse" className="btn btn-primary">
          Browse the rack
        </Link>
      </div>
    );
  }

  return (
    <div className={openId ? "chat has-open" : "chat"}>
      <div className="chat-list" role="list" aria-label="Conversations">
        {threads.map((thread) => {
          const last = thread.messages[thread.messages.length - 1];
          return (
            <button
              type="button"
              key={thread.id}
              role="listitem"
              className={thread.id === active.id ? "is-active" : undefined}
              onClick={() => {
                setOpenId(thread.id);
                openThread(thread.id);
              }}
            >
              <span className="avatar avatar-alt">{thread.person.slice(0, 2)}</span>
              <span className="grow">
                <span className="t">
                  @{thread.person}
                  <time>{last ? last.time : ""}</time>
                </span>
                <span className="s" style={{ display: "block" }}>
                  {last ? `${last.from === "me" ? "You: " : ""}${last.text}` : thread.about}
                </span>
              </span>
              {thread.unread > 0 && <span className="count-badge">{thread.unread}</span>}
            </button>
          );
        })}
      </div>

      <div className="chat-pane">
        <div className="chat-head">
          <button
            type="button"
            className="icon-btn only-mobile"
            aria-label="Back to conversations"
            onClick={() => setOpenId(null)}
          >
            <Icon name="arrow-left" size={18} />
          </button>
          <span className="avatar avatar-alt">{active.person.slice(0, 2)}</span>
          <div className="grow">
            <strong>@{active.person}</strong>
            <div className="muted" style={{ fontSize: 13 }}>
              About: {active.about}
            </div>
          </div>
          <Link href="/dashboard/swaps" className="btn btn-secondary btn-sm">
            View swap
          </Link>
        </div>

        <div className="chat-body" ref={bodyRef}>
          {active.messages.map((message, index) => (
            <div className={message.from === "me" ? "bubble is-me" : "bubble"} key={`${active.id}-${index}`}>
              {message.text}
              <time>{message.time}</time>
            </div>
          ))}
        </div>

        <form
          className="chat-form"
          onSubmit={(event) => {
            event.preventDefault();
            if (!draft.trim()) return;
            sendMessage(active.id, draft);
            setDraft("");
          }}
        >
          <input
            className="input"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={`Message @${active.person}`}
            aria-label="Message"
            maxLength={500}
          />
          <button type="submit" className="btn btn-primary" aria-label="Send message" disabled={!draft.trim()}>
            <Icon name="send" size={17} />
          </button>
        </form>
      </div>
    </div>
  );
}
