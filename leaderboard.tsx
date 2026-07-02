import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Medal } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — Marketly" },
      { name: "description", content: "See how you rank against other marketers this week." },
    ],
  }),
  component: Leaderboard,
});

const players = [
  { name: "Priya S.", xp: 4820, you: false },
  { name: "Marcus L.", xp: 4210, you: false },
  { name: "You", xp: 2430, you: true },
  { name: "Elena K.", xp: 2110, you: false },
  { name: "Diego R.", xp: 1870, you: false },
  { name: "Sana O.", xp: 1560, you: false },
  { name: "Kenji T.", xp: 1320, you: false },
  { name: "Alex M.", xp: 990, you: false },
];

function Leaderboard() {
  return (
    <AppShell>
      <section className="px-4 pt-6">
        <div className="text-center">
          <Trophy className="size-14 text-brand-streak mx-auto" />
          <h1 className="font-heading text-2xl font-extrabold mt-2">Growth League</h1>
          <p className="text-sm text-slate-500 mt-1">Top 3 advance next Monday</p>
        </div>

        <ul className="mt-6 bg-white border border-slate-200 rounded-3xl divide-y divide-slate-100 overflow-hidden">
          {players.map((p, i) => (
            <li key={p.name} className={`flex items-center gap-4 px-4 py-3 ${p.you ? "bg-sky-50" : ""}`}>
              <div className="w-7 text-center">
                {i < 3 ? (
                  <Medal
                    className={`size-6 mx-auto ${
                      i === 0 ? "text-yellow-500" : i === 1 ? "text-slate-400" : "text-orange-500"
                    }`}
                    fill="currentColor"
                  />
                ) : (
                  <span className="font-heading font-extrabold text-slate-400">{i + 1}</span>
                )}
              </div>
              <div className="size-10 rounded-full bg-gradient-to-br from-sky-200 to-indigo-200 grid place-items-center font-heading font-extrabold text-slate-700 text-sm">
                {p.name.split(" ").map((s) => s[0]).join("")}
              </div>
              <div className="flex-1">
                <p className={`font-heading font-bold text-sm ${p.you ? "text-brand-primary" : "text-slate-900"}`}>
                  {p.name}
                </p>
                <p className="text-[11px] text-slate-500">This week</p>
              </div>
              <div className="font-heading font-extrabold text-brand-primary tabular-nums">
                {p.xp.toLocaleString()} XP
              </div>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}