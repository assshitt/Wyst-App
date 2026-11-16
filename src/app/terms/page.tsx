import Link from "next/link";
import AppShell from "@/components/AppShell";

export const metadata = {
  title: "Terms of use",
};

export default function TermsPage() {
  return (
    <AppShell bare>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Legal</span>
          <h1>Terms of use</h1>
          <p>The ground rules for swapping on WYST, in plain language.</p>
        </div>
      </section>
      <section className="section section-tight">
        <div className="wrap wrap-narrow prose">
          <h2 style={{ marginTop: 0 }}>Using WYST</h2>
          <p>
            WYST is a platform for swapping clothing using points. By creating an account you agree to list only
            items you own, describe them honestly, and treat other members with respect.
          </p>
          <h2>Points</h2>
          <p>
            Points are a way to keep swaps fair. They have no cash value, cannot be bought, sold or transferred
            outside a swap, and cannot be exchanged for money.
          </p>
          <h2>Listings</h2>
          <ul>
            <li>Items must be clean, wearable and accurately described.</li>
            <li>Counterfeit goods, innerwear and damaged items are not allowed.</li>
            <li>We may remove a listing or decline to verify it at our discretion.</li>
          </ul>
          <h2>Swaps and meetups</h2>
          <p>
            Swaps are agreements between members. Meet in public places and check items before confirming. WYST
            is not a party to peer-to-peer meetups, but we will help resolve disputes raised through the app.
          </p>
          <h2>Accounts</h2>
          <p>
            We may suspend accounts that misuse the platform, including false listings, harassment or attempts to
            trade points for money.
          </p>
          <h2>Questions</h2>
          <p>
            Reach us through the <Link href="/help#contact">help centre</Link>.
          </p>
        </div>
      </section>
    </AppShell>
  );
}
