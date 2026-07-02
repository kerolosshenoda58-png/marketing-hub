import type { ReactNode } from "react";
import { HUD } from "./HUD";
import { BottomNav } from "./BottomNav";

export function AppShell({ children, hideHud = false }: { children: ReactNode; hideHud?: boolean }) {
  return (
    <div className="min-h-screen bg-slate-50 font-body text-slate-900 pb-28">
      {!hideHud && <HUD />}
      <main className="max-w-md mx-auto">{children}</main>
      <BottomNav />
    </div>
  );
}