"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import ListingCard from "@/components/ListingCard";
import {
  CATEGORIES,
  CONDITIONS,
  LISTINGS,
  SIZES,
  type Category,
  type Condition,
  type SwapMode,
} from "@/lib/listings";

type SortKey = "newest" | "points-low" | "points-high" | "rating";

const SORTS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "points-low", label: "Points: low to high" },
  { value: "points-high", label: "Points: high to low" },
  { value: "rating", label: "Top rated sellers" },
];

const MAX_POINTS = 300;

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export default function BrowsePage() {
  const params = useSearchParams();
  const urlQuery = params.get("q") ?? "";

  const [query, setQuery] = useState(urlQuery);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [modes, setModes] = useState<SwapMode[]>([]);
  const [maxPoints, setMaxPoints] = useState(MAX_POINTS);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = LISTINGS.filter((listing) => {
      if (q) {
        const haystack = `${listing.title} ${listing.brand} ${listing.category} ${listing.size} ${listing.color}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (categories.length > 0 && !categories.includes(listing.category)) return false;
      if (sizes.length > 0 && !sizes.includes(listing.size)) return false;
      if (conditions.length > 0 && !conditions.includes(listing.condition)) return false;
      if (modes.length > 0 && !modes.some((mode) => listing.modes.includes(mode))) return false;
      if (listing.points > maxPoints) return false;
      if (verifiedOnly && !listing.verified) return false;
      return true;
    });
    const sorted = [...filtered];
    if (sort === "points-low") sorted.sort((a, b) => a.points - b.points);
    if (sort === "points-high") sorted.sort((a, b) => b.points - a.points);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [query, categories, sizes, conditions, modes, maxPoints, verifiedOnly, sort]);

  const activeCount =
    categories.length +
    sizes.length +
    conditions.length +
    modes.length +
    (maxPoints < MAX_POINTS ? 1 : 0) +
    (verifiedOnly ? 1 : 0);

  const clearAll = () => {
    setQuery("");
    setCategories([]);
    setSizes([]);
    setConditions([]);
    setModes([]);
    setMaxPoints(MAX_POINTS);
    setVerifiedOnly(false);
  };

  return (
    <div className="wrap">
      <div className="page-head">
        <div>
          <span className="eyebrow">The rack</span>
          <h1 style={{ marginTop: 10 }}>Browse swaps</h1>
          <p>Everything here costs points, never cash.</p>
        </div>
        <div className="input-icon head-search">
          <Icon name="search" size={17} />
          <input
            className="input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search brands, items, sizes"
            aria-label="Search listings"
          />
        </div>
      </div>

      <div className="browse">
        {filtersOpen && (
          <button
            type="button"
            className="sheet-backdrop only-mobile"
            aria-label="Close filters"
            onClick={() => setFiltersOpen(false)}
          />
        )}

        <aside className={filtersOpen ? "filters is-open" : "filters"} aria-label="Filters">
          <div className="filters-head">
            <h2>Filters</h2>
            <div className="row gap-8">
              {activeCount > 0 && (
                <button type="button" className="link" style={{ fontSize: 13 }} onClick={clearAll}>
                  Clear all
                </button>
              )}
              <button
                type="button"
                className="icon-btn only-mobile"
                style={{ width: 34, height: 34 }}
                aria-label="Close filters"
                onClick={() => setFiltersOpen(false)}
              >
                <Icon name="x" size={16} />
              </button>
            </div>
          </div>

          <div className="filter-group">
            <h3>Category</h3>
            {CATEGORIES.map((category) => (
              <label className="check" key={category}>
                <input
                  type="checkbox"
                  checked={categories.includes(category)}
                  onChange={() => setCategories((list) => toggle(list, category))}
                />
                {category}
                <span className="count">{LISTINGS.filter((l) => l.category === category).length}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h3>Size</h3>
            <div className="size-grid">
              {SIZES.map((size) => (
                <button
                  type="button"
                  key={size}
                  className={sizes.includes(size) ? "chip chip-sm is-active" : "chip chip-sm"}
                  aria-pressed={sizes.includes(size)}
                  onClick={() => setSizes((list) => toggle(list, size))}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Condition</h3>
            {CONDITIONS.map((condition) => (
              <label className="check" key={condition}>
                <input
                  type="checkbox"
                  checked={conditions.includes(condition)}
                  onChange={() => setConditions((list) => toggle(list, condition))}
                />
                {condition}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <div className="row between" style={{ marginBottom: 12 }}>
              <h3 style={{ marginBottom: 0 }}>Max points</h3>
              <span className="points" style={{ fontSize: 13 }}>
                {maxPoints}
                {maxPoints === MAX_POINTS ? "+" : ""}
              </span>
            </div>
            <input
              className="range"
              type="range"
              min={50}
              max={MAX_POINTS}
              step={10}
              value={maxPoints}
              onChange={(event) => setMaxPoints(Number(event.target.value))}
              aria-label="Maximum points"
            />
          </div>

          <div className="filter-group">
            <h3>Swap type</h3>
            <label className="check">
              <input
                type="checkbox"
                checked={modes.includes("meetup")}
                onChange={() => setModes((list) => toggle(list, "meetup"))}
              />
              Campus meetup
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={modes.includes("delivery")}
                onChange={() => setModes((list) => toggle(list, "delivery"))}
              />
              Verified delivery
            </label>
          </div>

          <div className="filter-group">
            <div className="row between gap-12">
              <div>
                <strong style={{ fontSize: 14 }}>Verified sellers only</strong>
                <div className="hint">Profiles checked by WYST</div>
              </div>
              <button
                type="button"
                className="switch"
                role="switch"
                aria-checked={verifiedOnly}
                aria-label="Verified sellers only"
                onClick={() => setVerifiedOnly((value) => !value)}
              />
            </div>
          </div>

          <button type="button" className="btn btn-primary btn-block only-mobile" onClick={() => setFiltersOpen(false)}>
            Show {results.length} {results.length === 1 ? "item" : "items"}
          </button>
        </aside>

        <section aria-label="Listings">
          <div className="toolbar">
            <div className="scroll-x grow">
              <button
                type="button"
                className={categories.length === 0 ? "chip is-active" : "chip"}
                onClick={() => setCategories([])}
              >
                All
              </button>
              {CATEGORIES.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={categories.includes(category) ? "chip is-active" : "chip"}
                  aria-pressed={categories.includes(category)}
                  onClick={() => setCategories((list) => toggle(list, category))}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="row gap-8">
              <button type="button" className="chip only-mobile" onClick={() => setFiltersOpen(true)}>
                <Icon name="sliders" size={16} />
                Filters
                {activeCount > 0 && <span className="count-badge">{activeCount}</span>}
              </button>
              <select
                className="select"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                aria-label="Sort listings"
              >
                {SORTS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="muted" style={{ marginBottom: 16, fontSize: 13.5 }} aria-live="polite">
            {results.length} {results.length === 1 ? "item" : "items"}
            {query.trim() ? ` for “${query.trim()}”` : ""}
          </p>

          {results.length > 0 ? (
            <div className="grid-cards">
              {results.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <span className="empty-icon">
                <Icon name="search" size={24} />
              </span>
              <h3>Nothing matches yet</h3>
              <p>Try removing a filter or searching for a different brand or size.</p>
              <button type="button" className="btn btn-secondary" onClick={clearAll}>
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
