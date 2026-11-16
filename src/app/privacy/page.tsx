import Link from "next/link";
import AppShell from "@/components/AppShell";

export const metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <AppShell bare>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Legal</span>
          <h1>Privacy</h1>
          <p>What WYST stores, where it lives, and how to remove it.</p>
        </div>
      </section>
      <section className="section section-tight">
        <div className="wrap wrap-narrow prose">
          <h2 style={{ marginTop: 0 }}>This preview build</h2>
          <p>
            This version of WYST runs entirely in your browser. The account details you enter, your points,
            listings, wishlist and messages are saved in your browser&apos;s local storage on this device. They are
            not sent to a WYST server.
          </p>
          <h2>What is stored</h2>
          <ul>
            <li>The username, email, college and city you type in.</li>
            <li>Your points balance, listings, swap requests, wishlist and chat messages.</li>
            <li>Your notification and profile preferences.</li>
          </ul>
          <p>Passwords are not stored in this preview.</p>
          <h2>Removing your data</h2>
          <p>
            Logging out from <Link href="/dashboard/settings">Settings</Link> clears your account from this
            device. Clearing your browser&apos;s site data does the same.
          </p>
          <h2>When accounts go live</h2>
          <p>
            When WYST moves to real accounts, this page will be updated before launch to explain what is
            collected, why, and who can see it.
          </p>
          <h2>Questions</h2>
          <p>
            Contact us through the <Link href="/help#contact">help centre</Link>.
          </p>
        </div>
      </section>
    </AppShell>
  );
}
