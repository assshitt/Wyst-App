import Link from "next/link";
import AppShell from "@/components/AppShell";
import { Icon, type IconName } from "@/components/Icon";

export const metadata = {
  title: "About",
  description: "Why WYST exists: making clothes circulate instead of sitting unworn.",
};

const VALUES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "leaf",
    title: "Circular by default",
    text: "Every swap keeps a garment in use and one less new one being bought.",
  },
  {
    icon: "users",
    title: "Community first",
    text: "Swaps happen between real students on the same campus, not anonymous sellers.",
  },
  {
    icon: "shield",
    title: "Trust is designed in",
    text: "Verification, ratings and held points mean you never have to take someone's word for it.",
  },
  {
    icon: "points",
    title: "Access without cash",
    text: "A fresh wardrobe shouldn't depend on your budget. Points make it depend on what you give.",
  },
];

export default function AboutPage() {
  return (
    <AppShell bare>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">About WYST</span>
          <h1>Clothes are meant to be worn, not stored.</h1>
          <p>
            WYST turns forgotten pieces in our wardrobes into meaningful exchanges, and encourages a more
            thoughtful way of consuming fashion.
          </p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="wrap split">
          <div className="prose">
            <h2 style={{ marginTop: 0 }}>The problem</h2>
            <p>
              Most of us wear a small part of what we own. The rest sits unused while we keep buying new, and
              discarded clothing piles up as textile waste.
            </p>
            <p>
              Selling second-hand is slow and haggling is awkward. Swapping directly only works when two people
              happen to want each other&apos;s clothes at the same time.
            </p>
            <h2>Our answer</h2>
            <p>
              Points. You earn them for what you give and spend them on what you want, so a swap never needs a
              perfect two-way match. Campus communities make it safe, quick and close to home.
            </p>
          </div>
          <div className="stats" style={{ gridTemplateColumns: "1fr" }}>
            <article className="stat">
              <div className="big text-green">84%</div>
              <h3>of students we surveyed worry about hygiene</h3>
              <p>So every item is checked before it is listed.</p>
            </article>
            <article className="stat">
              <div className="big text-blue">58%</div>
              <h3>are unsure about quality</h3>
              <p>So condition is graded and sellers are rated.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-tight section-alt">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">What we stand for</span>
            <h2>Four principles behind every swap</h2>
          </div>
          <div className="steps">
            {VALUES.map((value) => (
              <article className="step" key={value.title}>
                <div className="step-icon" style={{ marginTop: 0 }}>
                  <Icon name={value.icon} size={22} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="wrap">
          <div className="cta-band">
            <h2>Join the swap.</h2>
            <p>Start with 100 points and list your first item today.</p>
            <div className="hero-cta">
              <Link href="/signup" className="btn btn-primary btn-lg">
                Create your account
              </Link>
              <Link href="/how-it-works" className="btn btn-glass btn-lg">
                How it works
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
