"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { ConditionBadge } from "@/components/ConditionBadge";
import type { Condition } from "@/lib/listings";

const STEPS = ["Photos", "Details", "Points", "Review"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const CONDITIONS: { value: Condition; desc: string }[] = [
  { value: "New", desc: "Never worn, with tags" },
  { value: "Like New", desc: "Worn 1-2 times" },
  { value: "Good", desc: "Some wear, no damage" },
  { value: "Fair", desc: "Visible wear" },
];

export default function UploadForm() {
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("M");
  const [condition, setCondition] = useState<Condition>("Good");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(150);
  const [swapPref, setSwapPref] = useState("Both");
  const [location, setLocation] = useState("");

  const suggestedPoints =
    condition === "New"
      ? 280
      : condition === "Like New"
        ? 200
        : condition === "Good"
          ? 120
          : 80;

  const onFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const next = [...photos];
    Array.from(files)
      .slice(0, 5 - next.length)
      .forEach((file) => {
        next.push(URL.createObjectURL(file));
      });
    setPhotos(next.slice(0, 5));
  }, [photos]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6">
      <h1 className="text-2xl font-bold text-white md:text-3xl">List an item</h1>
      <p className="mt-1 text-sm text-zinc-500">Earn points when someone swaps your fit</p>

      <div className="mt-8 flex justify-between gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                i <= step
                  ? "bg-emerald-500 text-[#050505]"
                  : "border border-white/20 text-zinc-500"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`mt-1 hidden text-xs sm:block ${
                i === step ? "text-emerald-400" : "text-zinc-500"
              }`}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <div
                className={`absolute hidden h-0.5 w-full sm:block ${
                  i < step ? "bg-emerald-500" : "bg-white/10"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-white/10 bg-[#0a0a0a] p-6 md:p-8">
        {step === 0 && (
          <div>
            <h2 className="text-lg font-semibold text-white">Upload photos</h2>
            <p className="mt-1 text-sm text-zinc-500">Up to 5 photos · Good lighting = more swaps!</p>
            <label
              className="mt-6 flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/15 bg-white/[0.02] transition-colors hover:border-emerald-500/40 hover:bg-emerald-500/5"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                onFiles(e.dataTransfer.files);
              }}
            >
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => onFiles(e.target.files)}
              />
              <svg className="h-12 w-12 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-3 font-medium text-zinc-300">Drop your photos here</p>
              <p className="text-sm text-zinc-500">or click to browse</p>
            </label>
            {photos.length > 0 && (
              <div className="mt-4 grid grid-cols-5 gap-2">
                {photos.map((src, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                    <Image src={src} alt="" fill className="object-cover" unoptimized />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Item details</h2>
            <input
              placeholder="Title (e.g. Nike Oversized Hoodie)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-zinc-500 focus:border-emerald-500/50 focus:outline-none"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
            >
              <option value="">Select category</option>
              {["Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories"].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none"
            />
            <div>
              <p className="mb-2 text-sm text-zinc-400">Size</p>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium ${
                      size === s
                        ? "border-emerald-500 bg-emerald-500/15 text-emerald-400"
                        : "border-white/10 text-zinc-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm text-zinc-400">Condition</p>
              <div className="space-y-2">
                {CONDITIONS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setCondition(c.value)}
                    className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left ${
                      condition === c.value
                        ? "border-emerald-500/50 bg-emerald-500/10"
                        : "border-white/10"
                    }`}
                  >
                    <span className="font-medium text-white">{c.value}</span>
                    <span className="text-xs text-zinc-500">{c.desc}</span>
                  </button>
                ))}
              </div>
            </div>
            <input
              placeholder="Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none"
            />
            <textarea
              placeholder="Description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none"
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold text-white">Set points value</h2>
            <p className="mt-4 text-center text-5xl font-black text-[#22c55e]">{points} pts</p>
            <p className="text-center text-sm text-zinc-500">Your item = {points} points</p>
            <input
              type="range"
              min={50}
              max={500}
              step={10}
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              className="mt-6 w-full accent-emerald-500"
            />
            <p className="mt-2 text-center text-xs text-zinc-500">
              Suggested for {condition}: ~{suggestedPoints} pts
            </p>
            <div className="mt-6 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-zinc-400">
              <p className="font-semibold text-emerald-400">How points work</p>
              <p className="mt-2">
                Buyers spend points to request your item. You earn points when swaps complete.
                Verified listings get more visibility.
              </p>
            </div>
            <div className="mt-4">
              <p className="mb-2 text-sm text-zinc-400">Swap preference</p>
              <div className="flex gap-2">
                {["Meetup", "Delivery", "Both"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setSwapPref(p)}
                    className={`rounded-lg border px-4 py-2 text-sm ${
                      swapPref === p
                        ? "border-emerald-500 bg-emerald-500/15 text-emerald-400"
                        : "border-white/10 text-zinc-400"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <input
              placeholder="Location (city / campus)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-4 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none"
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold text-white">Review & submit</h2>
            <div className="mt-6 rounded-xl border border-white/10 bg-[#050505] p-5">
              <div className="flex gap-4">
                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                  {photos[0] ? (
                    <Image src={photos[0]} alt="" fill className="object-cover" unoptimized />
                  ) : (
                    <div className="flex h-full items-center justify-center text-zinc-600 text-xs">
                      No photo
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-white">{title || "Your listing title"}</h3>
                  <p className="text-sm text-zinc-500">
                    {brand} · {size} · {category}
                  </p>
                  <ConditionBadge condition={condition} />
                  <p className="mt-2 text-2xl font-bold text-[#22c55e]">{points} pts</p>
                </div>
              </div>
            </div>
            <p className="mt-4 rounded-lg bg-violet-500/10 px-4 py-3 text-sm text-violet-300">
              You&apos;ll earn <span className="font-bold">50 bonus points</span> when verified!
            </p>
            <button
              type="button"
              className="mt-6 w-full rounded-lg bg-[#22c55e] py-3.5 font-bold text-[#050505] hover:bg-emerald-400"
            >
              List My Item
            </button>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
            className="rounded-lg border border-white/10 px-5 py-2 text-sm font-medium text-zinc-400 disabled:opacity-40"
          >
            Back
          </button>
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="rounded-lg bg-emerald-500 px-5 py-2 text-sm font-bold text-[#050505]"
            >
              Continue
            </button>
          ) : (
            <Link
              href="/dashboard"
              className="rounded-lg bg-emerald-500 px-5 py-2 text-sm font-bold text-[#050505]"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
