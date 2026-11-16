import AppShell from "@/components/AppShell";
import { Icon, type IconName } from "@/components/Icon";
import { FAQS } from "@/lib/demo";

export const metadata = {
  title: "Help & FAQ",
  description: "Answers about points, verification, meetups, delivery and safety on WYST.",
};

const SAFETY: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "shield",
    title: "Verified profiles",
    text: "Students sign up with a college email, and verified profiles carry a badge on every listing.",
  },
  {
    icon: "star",
    title: "Public ratings",
    text: "Both people rate each swap. Ratings and completed swap counts are visible before you request.",
  },
  {
    icon: "lock",
    title: "Held points",
    text: "Points are held during a swap and only move when both sides confirm the handover.",
  },
  {
    icon: "pin",
    title: "Public meetups",
    text: "Meet at busy campus spots in daylight. Never share your room number or home address.",
  },
  {
    icon: "eye",
    title: "Moderation",
    text: "Listings are reviewed before they go live, and you can report an item or a person at any time.",
  },
  {
    icon: "help",
    title: "Dispute support",
    text: "If something isn't as described, raise it from the swap screen and we'll step in.",
  },
];

export default function HelpPage() {
  return (
    <AppShell bare>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Help centre</span>
          <h1>Questions, answered</h1>
          <p>How points, verification and swaps work, and how we keep them safe.</p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="wrap wrap-narrow">
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2>The basics</h2>
          </div>
          <div className="acc" style={{ marginTop: 0 }}>
            {FAQS.map((faq, index) => (
              <details key={faq.q} open={index === 0}>
                <summary>
                  {faq.q} <Icon name="chevron-down" size={18} />
                </summary>
                <div className="acc-body">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tight section-alt" id="safety">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow is-blue">Trust and safety</span>
            <h2>Built so you can swap with confidence</h2>
          </div>
          <div className="tri">
            {SAFETY.map((item) => (
              <article className="feature" key={item.title}>
                <div className="step-icon">
                  <Icon name={item.icon} size={22} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tight" id="contact">
        <div className="wrap wrap-narrow">
          <div className="card card-glow card-pad">
            <span className="eyebrow">Contact</span>
            <h2 style={{ marginTop: 12, fontSize: 28 }}>Still stuck? Write to us.</h2>
            <p className="muted" style={{ marginTop: 10, maxWidth: 480 }}>
              Tell us what happened and include the item name if it is about a swap. We read every message.
            </p>
            <div className="hero-cta" style={{ justifyContent: "flex-start", marginTop: 22 }}>
              <a href="mailto:hello@wyst.in" className="btn btn-primary">
                <Icon name="mail" size={17} />
                hello@wyst.in
              </a>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
