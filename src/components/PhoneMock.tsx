import { GarmentArt, Icon } from "@/components/Icon";
import type { GarmentKind } from "@/lib/listings";

const ITEMS: { title: string; points: number; kind: GarmentKind }[] = [
  { title: "Oversized Hoodie", points: 150, kind: "hoodie" },
  { title: "Denim Jacket", points: 220, kind: "jacket" },
  { title: "Midi Dress", points: 200, kind: "dress" },
  { title: "Cargo Pants", points: 160, kind: "pants" },
];

/** Decorative preview of the WYST app on a phone. */
export default function PhoneMock() {
  return (
    <div className="phone" aria-hidden="true">
      <div className="phone-screen">
        <div className="phone-island" />
        <div className="phone-top">
          <div className="row between">
            <div>
              <div className="hello">Good evening</div>
              <div className="name">Your wardrobe</div>
            </div>
            <span className="avatar avatar-sm">W</span>
          </div>
          <div className="phone-balance">
            <div className="row between">
              <span className="eyebrow" style={{ fontSize: 9.5 }}>
                Points wallet
              </span>
              <span className="pill pill-green" style={{ height: 20, fontSize: 10 }}>
                +50 today
              </span>
            </div>
            <div className="mono">360</div>
          </div>
        </div>
        <div className="phone-chips">
          <span>For you</span>
          <span>Tops</span>
          <span>Outerwear</span>
          <span>Near me</span>
        </div>
        <div className="phone-grid">
          {ITEMS.map((item, index) => (
            <div className="phone-item" key={item.title}>
              <div className={`ph pimg-fallback tone-${index % 4}`} style={{ position: "relative" }}>
                <GarmentArt kind={item.kind} />
              </div>
              <div className="meta">
                <b>{item.title}</b>
                <span className="points">
                  {item.points} <small>PTS</small>
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="phone-tabs">
          <span className="is-on">
            <Icon name="compass" size={20} />
          </span>
          <span>
            <Icon name="heart" size={20} />
          </span>
          <span className="fab">
            <Icon name="plus" size={22} strokeWidth={2.2} />
          </span>
          <span>
            <Icon name="swap" size={20} />
          </span>
          <span>
            <Icon name="user" size={20} />
          </span>
        </div>
      </div>
    </div>
  );
}
