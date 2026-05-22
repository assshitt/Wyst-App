"use client";

import { motion } from "framer-motion";

const howItWorks = [
  {
    step: "01",
    title: "Upload clothes",
    description: "List pieces you never reach for. Photos, size, vibe — done in minutes.",
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
    glow: "shadow-violet-500/20",
  },
  {
    step: "02",
    title: "Get verified",
    description: "We check quality and authenticity so every swap feels legit.",
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
    glow: "shadow-emerald-500/20",
  },
  {
    step: "03",
    title: "Earn points",
    description: "Every approved drop stacks points. The better the fit, the more you bank.",
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
    glow: "shadow-lime-500/20",
  },
  {
    step: "04",
    title: "Swap for new ones",
    description: "Spend points on fits you actually want. Ship or link up — your closet levels up.",
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
    glow: "shadow-fuchsia-500/20",
  },
];

const whyWyst = [
  {
    title: "Trust",
    description: "Verified listings and real reviews. No ghost sellers, no bait-and-switch.",
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
    description: "Keep clothes in rotation. Less waste, more drip — planet wins either way.",
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
    description: "Swap with real people near you. Fits, DMs, and local meetups built in.",
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
    description: "Points only. Your wallet stays closed while your wardrobe stays open.",
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
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-[15%] top-[5%] h-[60vh] w-[60vh] rounded-full bg-violet-600/45 blur-[130px]"
        animate={{ x: [0, 90, 30, 0], y: [0, 50, 100, 0], scale: [1, 1.12, 0.95, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[10%] top-[20%] h-[55vh] w-[55vh] rounded-full bg-emerald-500/40 blur-[120px]"
        animate={{ x: [0, -80, -20, 0], y: [0, 70, 30, 0], scale: [1, 0.92, 1.08, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[25%] bottom-0 h-[50vh] w-[50vh] rounded-full bg-purple-900/35 blur-[110px]"
        animate={{ x: [0, 60, -50, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[20%] top-[55%] h-[40vh] w-[40vh] rounded-full bg-lime-500/25 blur-[100px]"
        animate={{ x: [0, -50, 30, 0], y: [0, 50, -70, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[#050505]/55" />
    </div>
  );
}

function WystLogo({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-8 w-8 text-xs" : "h-9 w-9 text-sm";
  const text = size === "sm" ? "text-lg" : "text-xl";
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`flex ${box} items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-emerald-400 font-black tracking-tighter text-[#050505]`}
      >
        W
      </span>
      <span className={`${text} font-bold tracking-[0.22em]`}>WYST</span>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <GradientMesh />

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10"
      >
        <WystLogo />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#050505] transition-shadow hover:shadow-[0_0_24px_rgba(255,255,255,0.25)]"
        >
          Sign Up
        </motion.button>
      </motion.nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pb-28 pt-10 text-center md:px-10 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          peer-to-peer · zero cash
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          <span className="bg-gradient-to-r from-white via-violet-200 to-emerald-200 bg-clip-text text-transparent">
            Swap. Earn. Repeat.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl"
        >
          Trade clothes you don&apos;t wear for ones you&apos;ll love. No money.
          Just points.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-10 flex w-full max-w-md flex-col gap-4 sm:max-w-none sm:flex-row sm:justify-center"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.04, boxShadow: "0 0 36px rgba(34,197,94,0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 px-10 text-base font-bold text-[#050505] shadow-lg shadow-emerald-500/25"
          >
            Start Swapping
          </motion.a>
          <motion.a
            href="#how-it-works"
            whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-transparent px-10 text-base font-semibold text-white transition-colors hover:bg-white/5"
          >
            How it Works
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-16 w-full max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-md"
        >
          <p className="text-sm text-zinc-500">
            <span className="font-semibold text-zinc-300">12,400+</span> items
            swapped · <span className="font-semibold text-zinc-300">4.9★</span>{" "}
            community · <span className="font-semibold text-emerald-400">$0</span>{" "}
            spent
          </p>
        </motion.div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">
            How it Works
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Four steps to a fresher closet
          </h2>
          <p className="mx-auto mt-4 max-w-md text-zinc-500">
            Upload → verify → earn → swap. The loop that never gets old.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {howItWorks.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              whileHover={{ y: -6 }}
              className={`group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-shadow hover:shadow-xl ${item.glow}`}
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
            </motion.article>
          ))}
        </div>
      </section>

      {/* Why WYST */}
      <section className="relative z-10 border-y border-white/10 bg-white/[0.02] py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-400">
              Why WYST
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Built different. Built for you.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-zinc-500">
              Not another marketplace — a culture of swapping that actually slaps.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
            {whyWyst.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07, duration: 0.55 }}
                whileHover={{ scale: 1.02 }}
                className={`rounded-2xl border border-white/10 bg-gradient-to-br ${item.gradient} p-8 backdrop-blur-sm`}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#050505]/80 text-emerald-400 ring-1 ring-white/10">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mx-auto max-w-6xl px-6 py-14 md:px-10">
        <div className="flex flex-col items-center justify-between gap-8 border-t border-white/10 pt-12 md:flex-row md:items-end">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <WystLogo size="sm" />
            <p className="max-w-xs text-center text-sm text-zinc-500 md:text-left">
              Swap clothes. Stack points. Stay sustainable. Your next fit is one
              upload away.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center md:items-end">
            <p className="text-xs text-zinc-600">
              © {new Date().getFullYear()} WYST. All rights reserved.
            </p>
            <p className="text-xs text-zinc-700">
              Gen-Z closets · zero cash · infinite rotation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
