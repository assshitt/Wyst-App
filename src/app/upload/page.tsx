import AppShell from "@/components/AppShell";
import RequireAuth from "@/components/RequireAuth";
import UploadForm from "@/components/UploadForm";

export const metadata = {
  title: "List an item",
  description: "List clothes you no longer wear and earn points on WYST.",
};

export default function UploadPage() {
  return (
    <AppShell>
      <div className="wrap">
        <div className="page-head">
          <div>
            <span className="eyebrow">List an item</span>
            <h1 style={{ marginTop: 10 }}>Turn it into points</h1>
            <p>Four quick steps. Most listings take under a minute.</p>
          </div>
        </div>
        <RequireAuth title="Log in to list an item" note="You need a WYST account to earn points for your clothes.">
          <UploadForm />
        </RequireAuth>
      </div>
    </AppShell>
  );
}
