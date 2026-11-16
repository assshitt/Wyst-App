"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ConditionBadge } from "@/components/ConditionBadge";
import { Icon } from "@/components/Icon";
import ProductImage from "@/components/ProductImage";
import {
  CONDITIONS,
  CONDITION_NOTES,
  SIZES,
  type Condition,
  type GarmentKind,
  type SwapMode,
} from "@/lib/listings";
import { useUserStore } from "@/store/userStore";

const STEPS = ["Photos", "Details", "Points", "Review"];
const MAX_PHOTOS = 5;

const TYPES: { kind: GarmentKind; label: string }[] = [
  { kind: "tee", label: "T-shirt or top" },
  { kind: "hoodie", label: "Hoodie or sweatshirt" },
  { kind: "jacket", label: "Jacket or blazer" },
  { kind: "dress", label: "Dress or co-ord" },
  { kind: "skirt", label: "Skirt" },
  { kind: "pants", label: "Jeans or trousers" },
];

const SUGGESTED: Record<Condition, number> = { New: 250, "Like New": 180, Good: 120, Fair: 70 };

export default function UploadForm() {
  const addListing = useUserStore((s) => s.addListing);
  const showToast = useUserStore((s) => s.showToast);

  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [kind, setKind] = useState<GarmentKind>("tee");
  const [size, setSize] = useState("M");
  const [condition, setCondition] = useState<Condition>("Like New");
  const [colour, setColour] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(SUGGESTED["Like New"]);
  const [modes, setModes] = useState<SwapMode[]>(["meetup"]);
  const [error, setError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const images = Array.from(files).filter((file) => file.type.startsWith("image/"));
    const urls = images.slice(0, MAX_PHOTOS - photos.length).map((file) => URL.createObjectURL(file));
    if (urls.length > 0) setPhotos((list) => [...list, ...urls]);
  };

  const removePhoto = (url: string) => {
    URL.revokeObjectURL(url);
    setPhotos((list) => list.filter((item) => item !== url));
  };

  const toggleMode = (mode: SwapMode) => {
    setModes((list) => {
      if (list.includes(mode)) return list.length > 1 ? list.filter((item) => item !== mode) : list;
      return [...list, mode];
    });
  };

  const next = () => {
    if (step === 1 && title.trim().length < 3) {
      setError("Give your item a title of at least 3 characters.");
      return;
    }
    setError("");
    setStep((value) => Math.min(value + 1, STEPS.length - 1));
  };

  const submit = () => {
    addListing({
      title: title.trim(),
      brand: brand.trim() || "Unbranded",
      size,
      condition,
      kind,
      points,
      image: photos[0] ?? "",
    });
    showToast("Listing submitted for review");
    setDone(true);
  };

  const reset = () => {
    setStep(0);
    setDone(false);
    setPhotos([]);
    setTitle("");
    setBrand("");
    setColour("");
    setDescription("");
    setCondition("Like New");
    setPoints(SUGGESTED["Like New"]);
    setModes(["meetup"]);
  };

  if (done) {
    return (
      <div className="empty" role="status">
        <span className="empty-icon">
          <Icon name="check" size={26} strokeWidth={2.2} />
        </span>
        <h3>{title.trim()} is in review</h3>
        <p>We usually verify listings within a day. You earn 50 points the moment it goes live.</p>
        <div className="row gap-8 wrap-flex" style={{ justifyContent: "center" }}>
          <Link href="/dashboard/listings" className="btn btn-primary">
            View my listings
          </Link>
          <button type="button" className="btn btn-secondary" onClick={reset}>
            List another item
          </button>
        </div>
      </div>
    );
  }

  const typeLabel = TYPES.find((type) => type.kind === kind)?.label ?? "";

  return (
    <div className="upload-layout">
      <div className="card card-pad">
        <ol className="stepper" aria-label="Progress">
          {STEPS.map((label, index) => (
            <li
              key={label}
              className={index < step ? "is-done" : index === step ? "is-current" : undefined}
              aria-current={index === step ? "step" : undefined}
            >
              <span>
                <span className="n">0{index + 1}</span>
                {label}
              </span>
            </li>
          ))}
        </ol>

        {step === 0 && (
          <div>
            <h2 style={{ fontSize: 22 }}>Add photos</h2>
            <p className="muted" style={{ marginTop: 6, marginBottom: 20 }}>
              Up to {MAX_PHOTOS}. Natural light and a plain background get the most requests.
            </p>
            <div
              className={dragOver ? "dropzone is-over" : "dropzone"}
              role="button"
              tabIndex={0}
              onClick={() => fileInput.current?.click()}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  fileInput.current?.click();
                }
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(event) => {
                event.preventDefault();
                setDragOver(false);
                addFiles(event.dataTransfer.files);
              }}
            >
              <span className="empty-icon" style={{ marginBottom: 6 }}>
                <Icon name="camera" size={24} />
              </span>
              <strong>Drop photos here, or tap to choose</strong>
              <span>JPG or PNG. The first photo becomes your cover.</span>
            </div>
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(event) => {
                addFiles(event.target.files);
                event.target.value = "";
              }}
            />
            <div className="photo-grid">
              {Array.from({ length: MAX_PHOTOS }).map((_, index) => {
                const url = photos[index];
                return url ? (
                  <div className="photo" key={url}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`Photo ${index + 1}`} />
                    <button type="button" aria-label={`Remove photo ${index + 1}`} onClick={() => removePhoto(url)}>
                      <Icon name="x" size={13} strokeWidth={2.2} />
                    </button>
                  </div>
                ) : (
                  <div className="photo is-empty" key={`empty-${index}`}>
                    <Icon name="plus" size={18} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 style={{ fontSize: 22, marginBottom: 20 }}>Describe your item</h2>
            <div className="form-grid">
              <div className="field span-2">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  className="input"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. Nike Oversized Hoodie"
                  maxLength={60}
                />
              </div>
              <div className="field">
                <label htmlFor="brand">Brand</label>
                <input
                  id="brand"
                  className="input"
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                  placeholder="e.g. Zara"
                  maxLength={30}
                />
              </div>
              <div className="field">
                <label htmlFor="type">Type</label>
                <select
                  id="type"
                  className="select"
                  value={kind}
                  onChange={(event) => setKind(event.target.value as GarmentKind)}
                >
                  {TYPES.map((type) => (
                    <option key={type.kind} value={type.kind}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field span-2">
                <span className="label">Size</span>
                <div className="row gap-8 wrap-flex" role="group" aria-label="Size">
                  {SIZES.map((option) => (
                    <button
                      type="button"
                      key={option}
                      className={size === option ? "chip is-active" : "chip"}
                      aria-pressed={size === option}
                      onClick={() => setSize(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="field span-2">
                <span className="label">Condition</span>
                <div className="option-grid" role="group" aria-label="Condition">
                  {CONDITIONS.map((option) => (
                    <button
                      type="button"
                      key={option}
                      className={condition === option ? "option is-active" : "option"}
                      aria-pressed={condition === option}
                      onClick={() => {
                        setCondition(option);
                        setPoints(SUGGESTED[option]);
                      }}
                    >
                      <strong>{option}</strong>
                      <span>{CONDITION_NOTES[option]}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label htmlFor="colour">Colour</label>
                <input
                  id="colour"
                  className="input"
                  value={colour}
                  onChange={(event) => setColour(event.target.value)}
                  placeholder="e.g. Charcoal"
                  maxLength={30}
                />
              </div>
              <div className="field span-2">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  className="textarea"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Fit, fabric, how often it was worn, any flaws."
                  maxLength={400}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ fontSize: 22 }}>Set a points value</h2>
            <p className="muted" style={{ marginTop: 6, marginBottom: 24 }}>
              This is what someone spends to take your item, and what lands in your wallet.
            </p>
            <div className="card card-glow card-pad" style={{ textAlign: "center" }}>
              <div className="big-value">{points}</div>
              <div className="eyebrow" style={{ marginTop: 10 }}>
                Points
              </div>
              <input
                className="range"
                style={{ marginTop: 26 }}
                type="range"
                min={50}
                max={500}
                step={10}
                value={points}
                onChange={(event) => setPoints(Number(event.target.value))}
                aria-label="Points value"
              />
              <div className="row between hint mono" style={{ marginTop: 10 }}>
                <span>50</span>
                <span>500</span>
              </div>
            </div>
            <p className="hint" style={{ marginTop: 12 }}>
              Suggested for {condition.toLowerCase()} condition: {SUGGESTED[condition]} points.
            </p>

            <div className="field" style={{ marginTop: 24 }}>
              <span className="label">How can people get it?</span>
              <div className="option-grid" role="group" aria-label="Swap type">
                <button
                  type="button"
                  className={modes.includes("meetup") ? "option is-active" : "option"}
                  aria-pressed={modes.includes("meetup")}
                  onClick={() => toggleMode("meetup")}
                >
                  <strong>Campus meetup</strong>
                  <span>Hand it over in person. Free.</span>
                </button>
                <button
                  type="button"
                  className={modes.includes("delivery") ? "option is-active" : "option"}
                  aria-pressed={modes.includes("delivery")}
                  onClick={() => toggleMode("delivery")}
                >
                  <strong>Verified delivery</strong>
                  <span>We collect, check and deliver.</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 style={{ fontSize: 22, marginBottom: 20 }}>Review and submit</h2>
            <dl className="summary-list">
              <div>
                <dt>Title</dt>
                <dd>{title.trim()}</dd>
              </div>
              <div>
                <dt>Brand</dt>
                <dd>{brand.trim() || "Unbranded"}</dd>
              </div>
              <div>
                <dt>Type</dt>
                <dd>{typeLabel}</dd>
              </div>
              <div>
                <dt>Size</dt>
                <dd>{size}</dd>
              </div>
              <div>
                <dt>Condition</dt>
                <dd>{condition}</dd>
              </div>
              <div>
                <dt>Photos</dt>
                <dd>{photos.length === 0 ? "None added" : photos.length}</dd>
              </div>
              <div>
                <dt>Swap type</dt>
                <dd>{modes.map((mode) => (mode === "meetup" ? "Meetup" : "Delivery")).join(" + ")}</dd>
              </div>
              <div>
                <dt>Points value</dt>
                <dd className="points">{points} PTS</dd>
              </div>
            </dl>
            <div className="notice" style={{ marginTop: 20 }}>
              <Icon name="sparkle" size={18} />
              <div>You earn a 50 point bonus when this listing passes verification.</div>
            </div>
          </div>
        )}

        {error && (
          <p className="form-error" role="alert" style={{ marginTop: 16 }}>
            {error}
          </p>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-ghost"
            disabled={step === 0}
            style={step === 0 ? { visibility: "hidden" } : undefined}
            onClick={() => {
              setError("");
              setStep((value) => Math.max(value - 1, 0));
            }}
          >
            <Icon name="arrow-left" size={17} />
            Back
          </button>
          {step < STEPS.length - 1 ? (
            <button type="button" className="btn btn-primary" onClick={next}>
              Continue
              <Icon name="arrow-right" size={17} />
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={submit}>
              Submit for review
            </button>
          )}
        </div>
      </div>

      <aside className="upload-aside" aria-label="Listing preview">
        <span className="eyebrow" style={{ marginBottom: 12 }}>
          Live preview
        </span>
        <div className="lcard" style={{ pointerEvents: "none" }}>
          <div className="lcard-media">
            <ProductImage src={photos[0] ?? ""} alt="Listing preview" kind={kind} tone={0} />
            <div className="lcard-tags">
              <ConditionBadge condition={condition} solid />
            </div>
          </div>
          <div className="lcard-body">
            <div className="lcard-brand">
              <span>{brand.trim() || "Brand"}</span>
              <span>Size {size}</span>
            </div>
            <h3 className="lcard-title">{title.trim() || "Your item title"}</h3>
            <div className="lcard-foot">
              <span className="points">
                {points} <small>PTS</small>
              </span>
            </div>
          </div>
        </div>
        <p className="hint" style={{ marginTop: 14 }}>
          This is how your item appears on the rack once it is verified.
        </p>
      </aside>
    </div>
  );
}
