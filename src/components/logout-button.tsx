"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createSupabaseBrowserClient, hasBrowserSupabaseConfig } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    if (hasBrowserSupabaseConfig()) {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
    }

    router.push("/login");
    router.refresh();
  }

  return (
    <button type="button" onClick={handleLogout} className="button-secondary">
      <LogOut className="h-4 w-4" aria-hidden="true" />
      Logout
    </button>
  );
}
