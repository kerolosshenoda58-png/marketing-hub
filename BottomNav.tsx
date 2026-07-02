import { Link, useRouterState } from "@tanstack/react-router";
import { GraduationCap, Trophy, Target, User } from "lucide-react";

const items = [
  { to: "/", label: "Learn", icon: GraduationCap },
  { to: "/leaderboard", label: "Ranks", icon: Trophy },
  { to: "/quests", label: "Quests", icon: Target },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 px-6 pt-3 pb-6">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-1 transition-colors ${
                active ? "text-brand-primary" : "text-slate-400"
              }`}
            >
              <Icon className="size-6" strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-extrabold uppercase tracking-widest">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}