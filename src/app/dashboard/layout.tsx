import type { ReactNode } from "react";
import AppShell from "@/components/AppShell";
import DashboardNav from "@/components/DashboardNav";
import RequireAuth from "@/components/RequireAuth";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      <div className="wrap">
        <RequireAuth>
          <div className="dash">
            <DashboardNav />
            <div className="stack gap-24">{children}</div>
          </div>
        </RequireAuth>
      </div>
    </AppShell>
  );
}
