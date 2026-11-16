import Link from "next/link";
import Footer from "@/components/Footer";
import HeroVideo from "@/components/HeroVideo";
import { Icon, type IconName } from "@/components/Icon";
import ListingCard from "@/components/ListingCard";
import PhoneMock from "@/components/PhoneMock";
import SiteHeader from "@/components/SiteHeader";
import { EARN_RULES } from "@/lib/demo";
import { LISTINGS } from "@/lib/listings";

const STEPS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "camera",
    title: "Upload",
    text: "Photograph the pieces you no longer wear and set a points value.",
  },
  {
    icon: "shield",
    title: "Verify",
    text: "We review every listing for condition and hygiene before it goes live.",
  },
  {
    icon: "points",
    title: "Earn",
    text: "Points land in your wallet when your item is verified and when it is taken.",
  },
  {
    icon: "swap",
    title: "Redeem",
    text: "Spend points on anything on the rack. Meet on campus or get it delivered.",
  },
];

const EARN_ICONS: IconName[] = ["sparkle", "tag", "swap", "star"];

const BARRIERS = [
  {
    value: "84%",
    title: "worry about hygiene",
    text: "The biggest reason students told us they avoid second-hand clothes.",
    answer: "Every item is checked before listing, and again for delivery swaps.",
  },
  {
    value: "58%",
    title: "are unsure of quality",
    text: "Photos alone don't say enough about wear, fading or damage.",
    answer: "Clear condition grades, public ratings and verified profiles.",
  },
  {
    value: "53%",
    title: "fear the size won't fit",
    text: "Nobody wants to be stuck with something they can't wear.",
    answer: "Try it at a meetup, or get your points back on a delivery mismatch.",
  },
];

export default function Home() {
  const featured = LISTINGS.slice(0, 4);

  return (
    <>
      <SiteHeader overlay />

      <main>
        {/* ------------------------------ Hero ------------------------------ */}
        <section className="hero">
          <HeroVideo />
          <div className="hero-shade" />

          <div className="hero-inner">
            <span className="hero-tag rise">
              <span className="pulse-dot" />
              Campus clothing swaps · zero cash
            </span>
            <h1 className="rise rise-1">
              Swap. Earn. <em>Repeat.</em>
            </h1>
            <p className="hero-sub rise rise-2">
              Trade the clothes you never wear for ones you will. Every item you list earns points, and every
              point gets you something new.
            </p>
            <div className="hero-cta rise rise-3">
              <Link href="/signup" className="btn btn-primary btn-lg">
                Start swapping
                <Icon name="arrow-right" size={18} />
              </Link>
              <Link href="/browse" className="btn btn-glass btn-lg">
                Browse the rack
              </Link>
            </div>
          </div>

          <div className="hero-facts rise rise-4">
            <div className="wrap">
              <ul>
                <li>
                  <strong>100 pts</strong>
                  <span>
                    welcome bonus
                    <br />
                    when you join
                  </span>
                </li>
                <li>
                  <strong>₹0</strong>
                  <span>
                    spent on clothes.
                    <br />
                    Points only.
                  </span>
                </li>
                <li>
                  <strong>2 ways</strong>
                  <span>
                    to swap: campus meetup
                    <br />
                    or verified delivery
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* -------------------------- How it works -------------------------- */}
        <section className="section" id="how">
          <div className="wrap">
            <div className="section-head is-split">
              <div>
                <span className="eyebrow">How it works</span>
                <h2>
                  Four steps from <span className="grad-text">closet to currency</span>
                </h2>
              </div>
              <Link href="/how-it-works" className="link-arrow">
                See the full guide <Icon name="arrow-right" size={16} />
              </Link>
            </div>
            <ol className="steps">
              {STEPS.map((step, index) => (
                <li className="step" key={step.title}>
                  <span className="step-num">STEP 0{index + 1}</span>
                  <div className="step-icon">
                    <Icon name={step.icon} size={22} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------- Fresh listings ------------------------- */}
        <section className="section section-alt">
          <div className="wrap">
            <div className="section-head is-split">
              <div>
                <span className="eyebrow is-blue">On the rack</span>
                <h2>Fresh this week</h2>
              </div>
              <Link href="/browse" className="link-arrow">
                Browse everything <Icon name="arrow-right" size={16} />
              </Link>
            </div>
            <div className="grid-cards is-4">
              {featured.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------- Two ways to swap ----------------------- */}
        <section className="section">
          <div className="wrap">
            <div className="section-head is-center">
              <span className="eyebrow">Two ways to swap</span>
              <h2>Meet on campus, or let us carry it</h2>
              <p>Pick what suits the swap. Your points are held safely until the item is in your hands.</p>
            </div>
            <div className="duo">
              <article className="mode">
                <span className="pill pill-green">
                  <Icon name="users" size={14} /> Peer to peer
                </span>
                <h3>Campus meetup</h3>
                <p>Agree a public spot and time in chat, check the item in person, and confirm.</p>
                <ul className="ticks">
                  <li>
                    <Icon name="check" size={18} strokeWidth={2.2} /> Free, always
                  </li>
                  <li>
                    <Icon name="check" size={18} strokeWidth={2.2} /> Try before you confirm
                  </li>
                  <li>
                    <Icon name="check" size={18} strokeWidth={2.2} /> Verified student profiles
                  </li>
                </ul>
              </article>
              <article className="mode is-blue">
                <span className="pill pill-blue">
                  <Icon name="shield" size={14} /> WYST Verified
                </span>
                <h3>Verified delivery</h3>
                <p>We collect the item, run a quality check, and deliver it to your door with tracking.</p>
                <ul className="ticks">
                  <li>
                    <Icon name="check" size={18} strokeWidth={2.2} /> Hygiene and condition check
                  </li>
                  <li>
                    <Icon name="check" size={18} strokeWidth={2.2} /> Pickup, delivery and tracking
                  </li>
                  <li>
                    <Icon name="check" size={18} strokeWidth={2.2} /> Points back on a size mismatch
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* --------------------------- Points wallet ------------------------ */}
        <section className="section section-alt">
          <div className="wrap split">
            <div>
              <span className="eyebrow">Points wallet</span>
              <div className="section-head" style={{ marginBottom: 0 }}>
                <h2>Your wardrobe is worth more than you think</h2>
                <p>
                  Points are the only currency on WYST. You earn them by giving, and spend them on anything
                  listed.
                </p>
              </div>
              <ul className="earn-list">
                {EARN_RULES.map((rule, index) => (
                  <li className="earn-row" key={rule.title}>
                    <span className="earn-icon">
                      <Icon name={EARN_ICONS[index]} size={19} />
                    </span>
                    <div>
                      <strong>{rule.title}</strong>
                      <span>{rule.note}</span>
                    </div>
                    <span className="points">+{rule.points}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="wallet-card">
              <div className="row between">
                <span className="eyebrow">Balance</span>
                <Icon name="points" size={22} className="text-green" />
              </div>
              <div className="balance">
                360<small>PTS</small>
              </div>
              <ul className="wallet-lines">
                <li>
                  <span>Swap completed · Denim Shirt</span>
                  <span className="mono amt-in">+175</span>
                </li>
                <li>
                  <span>Verified listing bonus</span>
                  <span className="mono amt-in">+50</span>
                </li>
                <li>
                  <span>Points held · Track Jacket</span>
                  <span className="mono amt-out">−180</span>
                </li>
                <li>
                  <span>Welcome bonus</span>
                  <span className="mono amt-in">+100</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------ App ------------------------------- */}
        <section className="section">
          <div className="wrap split">
            <PhoneMock />
            <div>
              <span className="eyebrow is-blue">Built for your phone</span>
              <div className="section-head" style={{ marginBottom: 0 }}>
                <h2>The whole swap, in one hand</h2>
                <p>
                  WYST works like an app on any phone. List an item in under a minute, chat to arrange a
                  meetup, and watch your points move in real time.
                </p>
              </div>
              <ul className="ticks">
                <li>
                  <Icon name="check" size={18} strokeWidth={2.2} /> One-tap listing from your camera roll
                </li>
                <li>
                  <Icon name="check" size={18} strokeWidth={2.2} /> Swap requests and chat in one place
                </li>
                <li>
                  <Icon name="check" size={18} strokeWidth={2.2} /> Wallet, wishlist and tracking a thumb away
                </li>
              </ul>
              <div className="hero-cta" style={{ justifyContent: "flex-start" }}>
                <Link href="/browse" className="btn btn-secondary">
                  Open the app
                  <Icon name="arrow-up-right" size={17} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------ Why ------------------------------- */}
        <section className="section section-alt">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Why WYST</span>
              <h2>Built around what stops people swapping</h2>
              <p>We surveyed college students aged 18 to 25. Three concerns came up again and again.</p>
            </div>
            <div className="stats">
              {BARRIERS.map((item, index) => (
                <article className="stat" key={item.title}>
                  <div className={index === 1 ? "big text-blue" : "big text-green"}>{item.value}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <div className="answer">
                    <Icon name="shield" size={17} />
                    {item.answer}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------ CTA ------------------------------- */}
        <section className="section">
          <div className="wrap">
            <div className="cta-band">
              <h2>
                Your next outfit is already
                <br />
                in someone&apos;s closet.
              </h2>
              <p>Join with your college email and start with 100 points.</p>
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
      </main>

      <Footer />
    </>
  );
}
