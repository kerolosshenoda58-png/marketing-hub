import { createFileRoute } from "@tanstack/react-router";
import { Target, Flame, Zap, BookOpen } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/quests")({
  head: () => ({
    meta: [
      { title: "Quests — Marketly" },
      { name: "description", content: "Daily and weekly marketing challenges to build real skill." },
    ],
  }),
  component: Quests,
});

const daily = [
  { icon: Zap, label: "Earn 40 XP", progress: 0.6, current: 24, target: 40 },
  { icon: Flame, label: "Complete 1 lesson", progress: 1, current: 1, target: 1 },
  { icon: BookOpen, label: "Read a case study", progress: 0, current: 0, target: 1 },
];

const weekly = [
  { title: "Master Positioning", desc: "Finish all lessons in Positioning & Messaging", reward: "+200 XP" },
  { title: "Ad Sprint", desc: "Draft 3 ad hooks in the Copywriting practice", reward: "+150 XP" },
  { title: "Analytics Warm-up", desc: "Build one KPI dashboard mockup", reward: "+180 XP" },
];

function Quests() {
  return (
    <AppShell>
      <section className="px-4 pt-6">
        <div className="flex items-center gap-3">
          <Target className="size-8 text-brand-primary" />
          <div>
            <h1 className="font-heading text-2xl font-extrabold">Quests</h1>
            <p className="text-sm text-slate-500">Build real skill with hands-on missions</p>
          </div>
        </div>

        <h2 className="mt-6 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Today</h2>
        <ul className="mt-2 space-y-2">
          {daily.map((q) => (
            <li key={q.label} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4">
              <div className="size-11 rounded-xl bg-sky-50 text-brand-primary grid place-items-center shrink-0">
                <q.icon className="size-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-sm text-slate-900">{q.label}</p>
                <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-success"
                    style={{ width: `${Math.round(q.progress * 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1 tabular-nums">
                  {q.current} / {q.target}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="mt-8 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">This week</h2>
        <ul className="mt-2 space-y-2">
          {weekly.map((q) => (
            <li key={q.title} className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-heading font-bold text-sm text-slate-900">{q.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{q.desc}</p>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-primary bg-sky-50 px-2 py-1 rounded-md shrink-0">
                  {q.reward}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}