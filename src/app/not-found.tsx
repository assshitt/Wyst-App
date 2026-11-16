import Link from "next/link";
import AppShell from "@/components/AppShell";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <AppShell>
      <div className="wrap wrap-narrow">
        <div className="empty">
          <span className="empty-icon">
            <Icon name="compass" size={24} />
          </span>
          <h3>We couldn&apos;t find that page</h3>
          <p>The link may be old, or the item may already have been swapped.</p>
          <Link href="/browse" className="btn btn-primary">
            Browse the rack
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
