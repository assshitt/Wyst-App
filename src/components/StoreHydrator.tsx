"use client";

import { useEffect } from "react";
import { Icon } from "@/components/Icon";
import { useUserStore } from "@/store/userStore";

/** Loads the saved account from this device after first paint, and shows toasts. */
export default function StoreHydrator() {
  const toast = useUserStore((s) => s.toast);
  const clearToast = useUserStore((s) => s.clearToast);

  useEffect(() => {
    let active = true;
    Promise.resolve(useUserStore.persist.rehydrate()).then(() => {
      if (active) useUserStore.getState().markHydrated();
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(clearToast, 2600);
    return () => window.clearTimeout(timer);
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <div className="toast" role="status">
      <Icon name="check" size={16} strokeWidth={2.4} />
      {toast}
    </div>
  );
}
