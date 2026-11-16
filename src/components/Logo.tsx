import Link from "next/link";

export function LogoMark({ size = 18 }: { size?: number }) {
  return (
    <span className="logo-mark" aria-hidden="true">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M3.5 6.5 7.6 18l4.4-9.5L16.4 18l4.1-11.5"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function Logo({ href = "/", large = false }: { href?: string; large?: boolean }) {
  return (
    <Link href={href} className={large ? "logo logo-lg" : "logo"} aria-label="WYST home">
      <LogoMark size={large ? 22 : 18} />
      <span>WYST</span>
    </Link>
  );
}
