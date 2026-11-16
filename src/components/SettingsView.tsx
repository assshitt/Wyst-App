"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { useUserStore, type Prefs } from "@/store/userStore";

const PREFS: { key: keyof Prefs; title: string; note: string }[] = [
  { key: "swapAlerts", title: "Swap requests", note: "When someone requests, accepts or declines" },
  { key: "messageAlerts", title: "Messages", note: "New chat messages about your swaps" },
  { key: "weeklyDigest", title: "Weekly digest", note: "New items in your sizes, once a week" },
  { key: "publicProfile", title: "Public profile", note: "Show your rating and listings to other students" },
];

export default function SettingsView() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const prefs = useUserStore((s) => s.prefs);
  const updateProfile = useUserStore((s) => s.updateProfile);
  const setPref = useUserStore((s) => s.setPref);
  const signOut = useUserStore((s) => s.signOut);
  const showToast = useUserStore((s) => s.showToast);

  const [name, setName] = useState(user?.name ?? "");
  const [username, setUsername] = useState(user?.username ?? "");
  const [college, setCollege] = useState(user?.college ?? "");
  const [city, setCity] = useState(user?.city ?? "");

  if (!user) return null;

  return (
    <>
      <div className="page-head" style={{ marginBottom: 0 }}>
        <div>
          <span className="eyebrow">Settings</span>
          <h1 style={{ marginTop: 10 }}>Profile and preferences</h1>
        </div>
      </div>

      <section className="card card-pad">
        <div className="row gap-16" style={{ marginBottom: 24 }}>
          <span className="avatar avatar-lg">{(name || user.name).slice(0, 2)}</span>
          <div>
            <strong style={{ fontSize: 18 }}>{name || user.name}</strong>
            <div className="muted">{user.email}</div>
          </div>
        </div>
        <form
          className="form-grid"
          onSubmit={(event) => {
            event.preventDefault();
            updateProfile({
              name: name.trim() || user.name,
              username: username.trim() || user.username,
              college: college.trim(),
              city: city.trim(),
            });
            showToast("Profile saved");
          }}
        >
          <div className="field">
            <label htmlFor="name">Display name</label>
            <input id="name" className="input" value={name} onChange={(event) => setName(event.target.value)} maxLength={40} />
          </div>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className="input"
              value={username}
              onChange={(event) => setUsername(event.target.value.replace(/\s/g, ""))}
              maxLength={24}
            />
          </div>
          <div className="field">
            <label htmlFor="college">College or campus</label>
            <input
              id="college"
              className="input"
              value={college}
              onChange={(event) => setCollege(event.target.value)}
              maxLength={60}
            />
          </div>
          <div className="field">
            <label htmlFor="city">City</label>
            <input id="city" className="input" value={city} onChange={(event) => setCity(event.target.value)} maxLength={40} />
          </div>
          <div className="span-2">
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </form>
      </section>

      <section className="card card-pad">
        <div className="card-head">
          <h2>Notifications and privacy</h2>
        </div>
        {PREFS.map((pref) => (
          <div className="setting-row" key={pref.key}>
            <div>
              <strong>{pref.title}</strong>
              <span>{pref.note}</span>
            </div>
            <button
              type="button"
              className="switch"
              role="switch"
              aria-checked={prefs[pref.key]}
              aria-label={pref.title}
              onClick={() => setPref(pref.key, !prefs[pref.key])}
            />
          </div>
        ))}
      </section>

      <section className="card card-pad">
        <div className="setting-row">
          <div>
            <strong>Log out</strong>
            <span>Signs you out and clears this account from this device.</span>
          </div>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => {
              signOut();
              router.push("/");
            }}
          >
            <Icon name="logout" size={16} />
            Log out
          </button>
        </div>
      </section>
    </>
  );
}
