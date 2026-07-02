import { createFileRoute } from "@tanstack/react-router";
import { Flame, Gem, Trophy, BookOpen, Settings } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import avatar from "@/assets/avatar.jpg";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Marketly" },
      { name: "description", content: "Your marketing learning stats, streaks, and achievements." },
    ],
  }),
  component: Profile,
});

const stats = [
  { icon: Flame, value: "12", label: "Day streak", tint: "text-brand-streak" },
  { icon: Gem, value: "2,430", label: "Total XP", tint: "text-brand-gem" },
  { icon: Trophy, value: "#3", label: "League rank", tint: "text-brand-primary" },
  { icon: BookOpen, value: "8", label: "Lessons done", tint: "text-brand-success" },
];

const achievements = [
  { title: "Strategy Starter", desc: "Completed Marketing Strategy" },
  { title: "Streak Igniter", desc: "Reach a 7-day streak" },
  { title: "First Positioning", desc: "Draft your first positioning statement" },
];

function Profile() {
  return (
    <AppShell hideHud>
      <section className="px-4 pt-8">
        <div className="flex items-center gap-4">
          <img
            src={avatar}
            alt="You"
            className="size-16 rounded-full object-cover outline outline-2 outline-offset-2 outline-slate-100"
            width={100}
            height={100}
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <h1 className="font-heading text-xl font-extrabold text-slate-900">Jordan Doe</h1>
            <p className="text-sm text-slate-500">Aspiring Head of Marketing · Joined Jul 2026</p>
          </div>
          <button className="p-2 text-slate-500" aria-label="Settings">
            <Settings className="size-5" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="bg-white border border-slate-200 rounded-2xl p-4">
              <s.icon className={`size-5 ${s.tint}`} />
              <p className="font-heading font-extrabold text-2xl text-slate-900 mt-2 tabular-nums">{s.value}</p>
              <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-widest mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-8 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Achievements</h2>
        <ul className="mt-2 space-y-2">
          {achievements.map((a) => (
            <li key={a.title} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4">
              <div className="size-11 rounded-xl bg-gradient-to-br from-amber-200 to-orange-400 grid place-items-center shrink-0">
                <Trophy className="size-5 text-white" fill="currentColor" />
              </div>
              <div>
                <p className="font-heading font-bold text-sm text-slate-900">{a.title}</p>
                <p className="text-xs text-slate-500">{a.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}