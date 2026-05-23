import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const howItWorks = [
  {
    step: "01",
    title: "Upload clothes",
    description:
      "List pieces you never reach for. Photos, size, vibe — done in minutes.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    color: "text-violet-400",
    glow: "hover:shadow-violet-500/20",
  },
  {
    step: "02",
    title: "Get verified",
    description:
      "We check quality and authenticity so every swap feels legit.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    color: "text-emerald-400",
    glow: "hover:shadow-emerald-500/20",
  },
  {
    step: "03",
    title: "Earn points",
    description:
      "Every approved drop stacks points. The better the fit, the more you bank.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2m9-4a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    color: "text-lime-400",
    glow: "hover:shadow-lime-500/20",
  },
  {
    step: "04",
    title: "Swap for new ones",
    description:
      "Spend points on fits you actually want. Ship or link up — your closet levels up.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    color: "text-fuchsia-400",
    glow: "hover:shadow-fuchsia-500/20",
  },
];

const whyWyst = [
  {
    title: "Trust",
    description:
      "Verified listings and real reviews. No ghost sellers, no bait-and-switch.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    gradient: "from-violet-500/30 to-violet-600/10",
  },
  {
    title: "Sustainability",
    description:
      "Keep clothes in rotation. Less waste, more drip — planet wins either way.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    gradient: "from-emerald-500/30 to-emerald-600/10",
  },
  {
    title: "Community",
    description:
      "Swap with real people near you. Fits, DMs, and local meetups built in.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    gradient: "from-fuchsia-500/30 to-fuchsia-600/10",
  },
  {
    title: "Zero Cash",
    description:
      "Points only. Your wallet stays closed while your wardrobe stays open.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2m9-4a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    gradient: "from-lime-500/30 to-lime-600/10",
  },
];

function GradientMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="mesh-blob-a absolute -left-[15%] top-[5%] h-[60vh] w-[60vh] rounded-full bg-violet-600/45 blur-[130px]" />
      <div className="mesh-blob-b absolute -right-[10%] top-[20%] h-[55vh] w-[55vh] rounded-full bg-emerald-500/40 blur-[120px]" />
      <div className="mesh-blob-c absolute bottom-0 left-[25%] h-[50vh] w-[50vh] rounded-full bg-purple-900/35 blur-[110px]" />
      <div className="mesh-blob-d absolute right-[20%] top-[55%] h-[40vh] w-[40vh] rounded-full bg-lime-500/25 blur-[100px]" />
      <div className="absolute inset-0 bg-[#050505]/55" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <GradientMesh />

      <div className="relative z-20">
        <Navbar />
      </div>

      <section className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pb-28 pt-10 text-center md:px-10 md:pt-16">
        <div className="animate-fade-up-delay-1 mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          peer-to-peer · zero cash
        </div>

        <h1 className="animate-fade-up-delay-2 max-w-4xl text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          <span className="bg-gradient-to-r from-white via-violet-200 to-emerald-200 bg-clip-text text-transparent">
            Swap. Earn. Repeat.
          </span>
        </h1>

        <p className="animate-fade-up-delay-3 mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl">
          Trade clothes you don&apos;t wear for ones you&apos;ll love. No money.
          Just points.
        </p>

        <div className="animate-fade-up-delay-4 mt-10 flex w-full max-w-2xl flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
          <Link
            href="/signup"
            className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 px-10 text-base font-bold text-[#050505] shadow-lg shadow-emerald-500/25 transition-transform hover:scale-105 hover:shadow-[0_0_36px_rgba(34,197,94,0.4)]"
          >
            Start Swapping
          </Link>
          <Link
            href="/browse"
            className="inline-flex h-14 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-10 text-base font-semibold text-emerald-300 transition-all hover:scale-105 hover:bg-emerald-500/20"
          >
            Browse Items
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-transparent px-10 text-base font-semibold text-white transition-all hover:scale-105 hover:border-white/40 hover:bg-white/5"
          >
            How it Works
          </Link>
        </div>

        <div className="mt-16 w-full max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-md">
          <p className="text-sm text-zinc-500">
            <span className="font-semibold text-zinc-300">12,400+</span> items
            swapped · <span className="font-semibold text-zinc-300">4.9★</span>{" "}
            community · <span className="font-semibold text-emerald-400">$0</span>{" "}
            spent
          </p>
        </div>
      </section>

      <section
        id="how-it-works"
        className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">
            How it Works
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Four steps to a fresher closet
          </h2>
          <p className="mx-auto mt-4 max-w-md text-zinc-500">
            Upload → verify → earn → swap. The loop that never gets old.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {howItWorks.map((item, i) => (
            <article
              key={item.title}
              className={`group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all hover:-translate-y-1.5 hover:shadow-xl ${item.glow}`}
            >
              <span className="text-xs font-mono text-zinc-600">{item.step}</span>
              <div
                className={`mt-4 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#050505] ring-1 ring-white/10 ${item.color}`}
              >
                {item.icon}
              </div>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {item.description}
              </p>
              {i < howItWorks.length - 1 && (
                <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-zinc-700 lg:inline">
                  →
                </span>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 border-y border-white/10 bg-white/[0.02] py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="mb-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-400">
              Why WYST
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Built different. Built for you.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-zinc-500">
              Not another marketplace — a culture of swapping that actually slaps.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
            {whyWyst.map((item) => (
              <article
                key={item.title}
                className={`rounded-2xl border border-white/10 bg-gradient-to-br ${item.gradient} p-8 backdrop-blur-sm transition-transform hover:scale-[1.02]`}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#050505]/80 text-emerald-400 ring-1 ring-white/10">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
