"use client";

import { useMemo, useState } from "react";
import ListingCard from "@/components/ListingCard";
import { LISTINGS, type Condition } from "@/lib/listings";

const CATEGORIES = ["Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const CONDITIONS: Condition[] = ["New", "Like New", "Good", "Fair"];
const BRANDS = [...new Set(LISTINGS.map((l) => l.brand))].sort();
const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "points-asc", label: "Points Low-High" },
  { value: "points-desc", label: "Points High-Low" },
  { value: "popular", label: "Most Popular" },
];

export default function BrowsePage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [maxPoints, setMaxPoints] = useState(500);
  const [swapTypes, setSwapTypes] = useState<string[]>([]);
  const [brandFilter, setBrandFilter] = useState("");
  const [sort, setSort] = useState("newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggle = <T,>(arr: T[], item: T, setter: (v: T[]) => void) => {
    setter(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
  };

  const filtered = useMemo(() => {
    let items = [...LISTINGS];

    if (sizes.length) items = items.filter((l) => sizes.includes(l.size));
    if (conditions.length) items = items.filter((l) => conditions.includes(l.condition));
    if (maxPoints < 500) items = items.filter((l) => l.points <= maxPoints);
    if (brandFilter) items = items.filter((l) => l.brand.toLowerCase().includes(brandFilter.toLowerCase()));

    switch (sort) {
      case "points-asc":
        items.sort((a, b) => a.points - b.points);
        break;
      case "points-desc":
        items.sort((a, b) => b.points - a.points);
        break;
      case "popular":
        items.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        items.sort((a, b) => b.id - a.id);
    }

    return items;
  }, [sizes, conditions, maxPoints, brandFilter, sort]);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-white">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
              <input
                type="checkbox"
                checked={categories.includes(cat)}
                onChange={() => toggle(categories, cat, setCategories)}
                className="rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500/30"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-white">Size</h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <label
              key={size}
              className={`cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                sizes.includes(size)
                  ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-400"
                  : "border-white/10 text-zinc-400 hover:border-white/20"
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={sizes.includes(size)}
                onChange={() => toggle(sizes, size, setSizes)}
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-white">Condition</h3>
        <div className="space-y-2">
          {CONDITIONS.map((c) => (
            <label key={c} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
              <input
                type="checkbox"
                checked={conditions.includes(c)}
                onChange={() => toggle(conditions, c, setConditions)}
                className="rounded border-white/20 bg-white/5 text-emerald-500"
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-white">
          Points: 0 – {maxPoints}
        </h3>
        <input
          type="range"
          min={0}
          max={500}
          step={10}
          value={maxPoints}
          onChange={(e) => setMaxPoints(Number(e.target.value))}
          className="w-full accent-emerald-500"
        />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-white">Swap type</h3>
        <div className="space-y-2">
          {["Meetup", "Delivery", "Both"].map((type) => (
            <label key={type} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
              <input
                type="checkbox"
                checked={swapTypes.includes(type)}
                onChange={() => toggle(swapTypes, type, setSwapTypes)}
                className="rounded border-white/20 bg-white/5 text-emerald-500"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-white">Brand</h3>
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-emerald-500/50 focus:outline-none"
        >
          <option value="">All brands</option>
          {BRANDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 md:px-6">
      <aside className="hidden w-56 shrink-0 lg:block xl:w-64">
        <div className="sticky top-24 rounded-xl border border-white/10 bg-[#0a0a0a] p-5">
          <h2 className="mb-4 text-lg font-bold text-white">Filters</h2>
          <FilterPanel />
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white md:text-3xl">Browse Swaps</h1>
            <p className="text-sm text-zinc-500">Showing {filtered.length} items</p>
          </div>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-zinc-300 lg:hidden"
          >
            Filters
          </button>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3">
          <span className="text-sm text-zinc-500">Sort by:</span>
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setSort(opt.value)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                sort === opt.value
                  ? "bg-emerald-500 text-[#050505]"
                  : "text-zinc-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-[#0a0a0a] py-16 text-center">
            <p className="text-zinc-400">No items match your filters. Try adjusting them.</p>
          </div>
        )}
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-white/10 bg-[#0a0a0a] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="text-zinc-400"
              >
                Done
              </button>
            </div>
            <FilterPanel />
          </div>
        </div>
      )}
    </div>
  );
}
