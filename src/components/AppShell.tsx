import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import TabBar from "@/components/TabBar";

/** Frame for every page inside the product: header, content, footer and the phone tab bar. */
export default function AppShell({
  children,
  bare = false,
}: {
  children: ReactNode;
  /** Skip the padded main wrapper (for pages with their own full-width hero). */
  bare?: boolean;
}) {
  return (
    <div className="shell">
      <SiteHeader />
      {bare ? <main>{children}</main> : <main className="app-main">{children}</main>}
      <Footer />
      <TabBar />
    </div>
  );
}
