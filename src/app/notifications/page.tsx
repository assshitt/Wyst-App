import AppShell from "@/components/AppShell";
import NotificationsView from "@/components/NotificationsView";
import RequireAuth from "@/components/RequireAuth";

export const metadata = {
  title: "Notifications",
};

export default function NotificationsPage() {
  return (
    <AppShell>
      <div className="wrap wrap-narrow">
        <div className="page-head">
          <div>
            <span className="eyebrow">Notifications</span>
            <h1 style={{ marginTop: 10 }}>Activity</h1>
          </div>
        </div>
        <RequireAuth title="Log in to see your notifications">
          <NotificationsView />
        </RequireAuth>
      </div>
    </AppShell>
  );
}
