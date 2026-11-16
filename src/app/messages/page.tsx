import AppShell from "@/components/AppShell";
import MessagesView from "@/components/MessagesView";
import RequireAuth from "@/components/RequireAuth";

export const metadata = {
  title: "Messages",
};

export default function MessagesPage() {
  return (
    <AppShell>
      <div className="wrap">
        <div className="page-head">
          <div>
            <span className="eyebrow">Messages</span>
            <h1 style={{ marginTop: 10 }}>Chat</h1>
            <p>Arrange meetups and handovers with the people you swap with.</p>
          </div>
        </div>
        <RequireAuth title="Log in to see your messages">
          <MessagesView />
        </RequireAuth>
      </div>
    </AppShell>
  );
}
