import type { ReactNode } from "react";
import type { GarmentKind } from "@/lib/listings";

export type IconName =
  | "search"
  | "heart"
  | "bell"
  | "chat"
  | "user"
  | "users"
  | "plus"
  | "compass"
  | "swap"
  | "wallet"
  | "points"
  | "tag"
  | "shield"
  | "check"
  | "x"
  | "chevron-right"
  | "chevron-left"
  | "chevron-down"
  | "arrow-right"
  | "arrow-left"
  | "arrow-up-right"
  | "sliders"
  | "pin"
  | "truck"
  | "star"
  | "camera"
  | "upload"
  | "settings"
  | "logout"
  | "grid"
  | "clock"
  | "sparkle"
  | "leaf"
  | "lock"
  | "menu"
  | "send"
  | "trash"
  | "eye"
  | "info"
  | "bolt"
  | "shirt"
  | "help"
  | "calendar"
  | "mail";

const PATHS: Record<IconName, ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </>
  ),
  heart: (
    <path d="M12 20.5s-8.5-5-8.5-11.2A4.8 4.8 0 0 1 8.3 4.5c1.5 0 2.8.7 3.7 1.9.9-1.2 2.2-1.9 3.7-1.9a4.8 4.8 0 0 1 4.8 4.8c0 6.2-8.5 11.2-8.5 11.2Z" />
  ),
  bell: (
    <>
      <path d="M6 9a6 6 0 0 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9Z" />
      <path d="M10 20a2.2 2.2 0 0 0 4 0" />
    </>
  ),
  chat: <path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.6-4.4A8.5 8.5 0 1 1 20.5 11.5Z" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 5.2a3.5 3.5 0 0 1 0 6.6" />
      <path d="M18 14.3a6.5 6.5 0 0 1 3.5 5.7" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.8 8.2-2.1 5.5-5.5 2.1 2.1-5.5 5.5-2.1Z" />
    </>
  ),
  swap: (
    <>
      <path d="M7.5 3.5 4 7l3.5 3.5" />
      <path d="M4 7h16" />
      <path d="M16.5 13.5 20 17l-3.5 3.5" />
      <path d="M20 17H4" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M21 10.5h-4.5a2 2 0 0 0 0 4H21" />
    </>
  ),
  points: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5 16.5 12 12 16.5 7.5 12 12 7.5Z" />
    </>
  ),
  tag: (
    <>
      <path d="M3.5 12.5V4.5a1 1 0 0 1 1-1h8l8 8a1.5 1.5 0 0 1 0 2.1l-6.9 6.9a1.5 1.5 0 0 1-2.1 0l-8-8Z" />
      <circle cx="8" cy="8" r="1.3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.3 2.9 7.9 7 9.5 4.1-1.6 7-5.2 7-9.5V6l-7-3Z" />
      <path d="m9 12 2.2 2.2L15.2 10" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  "chevron-right": <path d="m9 6 6 6-6 6" />,
  "chevron-left": <path d="m15 6-6 6 6 6" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  "arrow-left": <path d="M19 12H5M11 6l-6 6 6 6" />,
  "arrow-up-right": <path d="M7 17 17 7M8.5 7H17v8.5" />,
  sliders: (
    <>
      <path d="M4 7h9M19 7h1M4 17h1M11 17h9" />
      <circle cx="16" cy="7" r="2.5" />
      <circle cx="8" cy="17" r="2.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6 7-11.3a7 7 0 0 0-14 0C5 15 12 21 12 21Z" />
      <circle cx="12" cy="9.7" r="2.5" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 6.5h11.5v9.5H2.5z" />
      <path d="M14 9.5h4l3.5 3.5v3h-7.5" />
      <circle cx="7" cy="17.5" r="1.9" />
      <circle cx="17.5" cy="17.5" r="1.9" />
    </>
  ),
  star: (
    <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8L12 3.5Z" />
  ),
  camera: (
    <>
      <path d="M4 8h3l1.5-2.5h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4M7 9l5-5 5 5" />
      <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
    </>
  ),
  logout: (
    <>
      <path d="M9.5 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4.5" />
      <path d="m16 8 4 4-4 4M20 12H9.5" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
  sparkle: (
    <>
      <path d="m11 3 1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9L11 3Z" />
      <path d="M18.5 15.5v5M16 18h5" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19C4 11 9.5 5 20 4.5 20.5 14 16 20 8.5 20c-1.5 0-3-.3-3.5-1Z" />
      <path d="M5 19c2.5-4.5 5.5-7.5 10-9.5" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9.5" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  send: <path d="M20.5 3.5 10 14M20.5 3.5 14 20.5l-4-6.5-6.5-4 17-6.5Z" />,
  trash: (
    <>
      <path d="M4 7h16M9.5 7V4.5h5V7" />
      <path d="m6.5 7 1 13h9l1-13" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 7.8v.2" />
    </>
  ),
  bolt: <path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12l1-8Z" />,
  shirt: <path d="M8.5 3.5 3 6.5l2 4 2.5-1V20h9V9.5l2.5 1 2-4-5.5-3a3.5 3.5 0 0 1-7 0Z" />,
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1.9-1.1 1.8M12 16.8v.2" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15.5" rx="2" />
      <path d="M4 10h16M8 3v4M16 3v4" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6.5L20.5 7" />
    </>
  ),
};

export function Icon({
  name,
  size = 20,
  strokeWidth = 1.75,
  className,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}

const GARMENTS: Record<GarmentKind, ReactNode> = {
  tee: (
    <path d="M23 9 8 16l5 11 7-3v31h24V24l7 3 5-11-15-7c-1.5 3.8-4.8 6-9 6s-7.5-2.2-9-6Z" />
  ),
  hoodie: (
    <>
      <path d="M22 11c-6 2-11 4.5-13 8.5L6 46l8 2 3-17v25h30V31l3 17 8-2-3-26.5c-2-4-7-6.5-13-8.5" />
      <path d="M22 11c1.2 6 4.8 9.5 10 9.5S40.8 17 42 11c-2.2-3-5.5-4.5-10-4.5S24.2 8 22 11Z" />
      <path d="M24 43h16v9H24zM29.5 20.5v7M34.5 20.5v7" />
    </>
  ),
  jacket: (
    <>
      <path d="M24 8 10 14 6 45l8 2 3-16v25h30V31l3 16 8-2-4-31-14-6" />
      <path d="m24 8 8 13 8-13M32 21v35" />
      <path d="M21 40h6M37 40h6" />
    </>
  ),
  dress: (
    <>
      <path d="M24 6v8l-4.5 8 4.5 6-10 28h36L40 28l4.5-6-4.5-8V6" />
      <path d="M24 14c3.5 3 12.5 3 16 0M24 28h16" />
    </>
  ),
  skirt: (
    <>
      <path d="M20 12h24v7l8 35H12l8-35v-7Z" />
      <path d="M20 19h24M26 19l-3 35M38 19l3 35M32 19v35" />
    </>
  ),
  pants: (
    <>
      <path d="M18 8h28l4 48H36l-4-30-4 30H14l4-48Z" />
      <path d="M18 15h28M32 15v11" />
    </>
  ),
};

export function GarmentArt({ kind }: { kind: GarmentKind }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {GARMENTS[kind]}
    </svg>
  );
}
