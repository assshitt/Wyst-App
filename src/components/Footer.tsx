import Link from "next/link";
import Logo from "@/components/Logo";

const COLUMNS = [
  {
    title: "Swap",
    links: [
      { href: "/browse", label: "Browse the rack" },
      { href: "/upload", label: "List an item" },
      { href: "/dashboard/wallet", label: "Points wallet" },
      { href: "/dashboard/swaps", label: "Your swaps" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/help", label: "Help & FAQ" },
      { href: "/help#safety", label: "Trust & safety" },
      { href: "/about", label: "About WYST" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms of use" },
      { href: "/privacy", label: "Privacy" },
      { href: "/help#contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>
              A points-based clothing swap for campus communities. Give what you don&apos;t wear, get what you will.
            </p>
          </div>
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-base">
          <span>© 2026 WYST. Swap. Earn. Repeat.</span>
          <span>Made on campus in New Delhi</span>
        </div>
      </div>
    </footer>
  );
}
