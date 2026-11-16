import { Suspense } from "react";
import AppShell from "@/components/AppShell";
import BrowsePage from "@/components/BrowsePage";

export const metadata = {
  title: "Browse",
  description: "Browse clothing swaps on WYST and spend your points.",
};

export default function Browse() {
  return (
    <AppShell>
      <Suspense
        fallback={
          <div className="wrap">
            <div className="skeleton" style={{ height: 480 }} />
          </div>
        }
      >
        <BrowsePage />
      </Suspense>
    </AppShell>
  );
}
