import Link from "next/link";
import AppShell from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { EARN_RULES } from "@/lib/demo";

export const metadata = {
  title: "How it works",
  description: "Upload, verify, earn and redeem: how clothing swaps work on WYST.",
};

const STEPS = [
  {
    title: "Upload what you don't wear",
    text: "Add photos, pick the size and condition, and set a points value between 50 and 500. It takes about a minute.",
    tag: "You set the value",
  },
  {
    title: "We verify the listing",
    text: "Every item is reviewed for condition and hygiene before it appears on the rack. Most checks finish within a day.",
    tag: "+50 pts when it goes live",
  },
  {
    title: "Earn points when it is taken",
    text: "Someone requests your item and their points are held. Once you both confirm the handover, the points are yours.",
    tag: "+25 pts bonus per swap",
  },
  {
    title: "Redeem on anything you like",
    text: "Spend your points on any listing. Meet on campus, or choose WYST Verified delivery and we handle the rest.",
    tag: "No cash, ever",
  },
];

export default function HowItWorksPage() {
  return (
    <AppShell bare>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">How it works</span>
          <h1>
            From closet to currency in <span className="grad-text">four steps</span>
          </h1>
          <p>WYST replaces money with points. Give clothes to earn them, spend them to get clothes back.</p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="wrap wrap-narrow">
          <ol className="timeline">
            {STEPS.map((step, index) => (
              <li key={step.title}>
                <span className="n">0{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <span className={index % 2 === 0 ? "pill pill-green" : "pill pill-blue"}>{step.tag}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-tight section-alt">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow is-blue">Two ways to swap</span>
            <h2>Choose how the item reaches you</h2>
          </div>
          <div className="duo">
            <article className="mode">
              <span className="pill pill-green">
                <Icon name="users" size={14} /> Peer to peer
              </span>
              <h3>Campus meetup</h3>
              <p>Agree a public spot and time in chat. Check the item in person, then confirm the swap.</p>
              <ul className="ticks">
                <li>
                  <Icon name="check" size={18} strokeWidth={2.2} /> Free for both people
                </li>
                <li>
                  <Icon name="check" size={18} strokeWidth={2.2} /> See and try the item first
                </li>
                <li>
                  <Icon name="check" size={18} strokeWidth={2.2} /> Scheduling built into chat
                </li>
              </ul>
            </article>
            <article className="mode is-blue">
              <span className="pill pill-blue">
                <Icon name="shield" size={14} /> WYST Verified
              </span>
              <h3>Verified delivery</h3>
              <p>We pick the item up, run a quality check, and deliver it with tracking.</p>
              <ul className="ticks">
                <li>
                  <Icon name="check" size={18} strokeWidth={2.2} /> Hygiene, condition and size checked
                </li>
                <li>
                  <Icon name="check" size={18} strokeWidth={2.2} /> No need to meet anyone
                </li>
                <li>
                  <Icon name="check" size={18} strokeWidth={2.2} /> Points returned on a mismatch
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="wrap wrap-narrow">
          <div className="section-head">
            <span className="eyebrow">Points</span>
            <h2>How you earn</h2>
            <p>Item values are set by the lister. These bonuses are added on top.</p>
          </div>
          <ul className="earn-list" style={{ marginTop: 0 }}>
            {EARN_RULES.map((rule) => (
              <li className="earn-row" key={rule.title}>
                <span className="earn-icon">
                  <Icon name="points" size={19} />
                </span>
                <div>
                  <strong>{rule.title}</strong>
                  <span>{rule.note}</span>
                </div>
                <span className="points">+{rule.points}</span>
              </li>
            ))}
          </ul>
          <div className="hero-cta" style={{ justifyContent: "flex-start" }}>
            <Link href="/signup" className="btn btn-primary btn-lg">
              Start with 100 points
            </Link>
            <Link href="/help" className="btn btn-secondary btn-lg">
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
