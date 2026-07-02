import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Target, Compass, Users, Search, Rocket, DollarSign,
  TrendingUp, Repeat, FlaskConical, LineChart,
  BarChart3, LayoutDashboard, Database,
  Sparkles, Zap, PenTool,
  Mail, Globe, Radio, Megaphone,
  MousePointer, Play, Video,
  type LucideIcon,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PathNode, type PathColor } from "@/components/PathNode";
import { units } from "@/data/modules";
import caseStudyImg from "@/assets/case-study-nike.jpg";

const iconFor: Record<string, LucideIcon> = {
  strategy: Compass, positioning: Target, consumer: Users, research: Search, gtm: Rocket, pricing: DollarSign,
  seo: Globe, content: PenTool, email: Mail, community: Radio,
  meta: Megaphone, google: MousePointer, tiktok: Video, attribution: BarChart3,
  loops: Repeat, aarrr: TrendingUp, ab: FlaskConical, lifecycle: LineChart,
  ga4: LineChart, dash: LayoutDashboard, sql: Database,
  prompts: Sparkles, automation: Zap, "content-ai": Play,
};

export const Route = createFileRoute("/")({
  component: LearnHome,
});

function LearnHome() {
  const navigate = useNavigate();
  const currentUnit = units[0];
  const currentNode = currentUnit.nodes.find((n) => n.status === "current");
  const completedInUnit = currentUnit.nodes.filter((n) => n.status === "completed").length;

  return (
    <AppShell>
      {/* Current track hero */}
      <section className="px-4 pt-6 pb-4">
        <div className="bg-brand-primary rounded-3xl p-5 text-white shadow-xl shadow-sky-200/60 relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-md">
              Current Track · Unit {currentUnit.index}
            </span>
            <h1 className="font-heading text-2xl font-extrabold mt-2 leading-tight text-balance">
              {currentUnit.title}
            </h1>
            <p className="text-sky-100 text-sm mt-1 opacity-90">{currentUnit.subtitle}</p>

            <div className="mt-5 bg-black/10 rounded-2xl p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white"
                    style={{ width: `${Math.round((completedInUnit / currentUnit.nodes.length) * 100)}%` }}
                  />
                </div>
                <p className="text-[10px] font-bold mt-2 uppercase tracking-wide truncate">
                  Lesson {completedInUnit + 1} of {currentUnit.nodes.length}: {currentNode?.title}
                </p>
              </div>
              <button
                onClick={() =>
                  navigate({
                    to: "/unit/$unitId/$nodeId",
                    params: { unitId: currentUnit.id, nodeId: currentNode?.id ?? currentUnit.nodes[0].id },
                  })
                }
                className="bg-white text-brand-primary font-extrabold px-4 py-2 rounded-xl text-sm shadow-sm active:scale-95 transition-transform shrink-0"
              >
                RESUME
              </button>
            </div>
          </div>
          <div className="absolute -right-8 -top-8 size-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -left-6 -bottom-10 size-32 bg-sky-300/30 rounded-full blur-2xl" />
        </div>
      </section>

      {/* Units + paths */}
      {units.map((unit, uIdx) => (
        <section key={unit.id} className="px-4">
          {uIdx > 0 && (
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                Unit {unit.index} · {unit.title}
              </div>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
          )}

          <div className="flex flex-col items-center gap-10 py-4">
            {unit.nodes.map((node, i) => {
              const offset = [0, 48, -32, -48, 32, 8][i % 6];
              const Icon = iconFor[node.id] ?? Compass;
              return (
                <div key={node.id} className="w-full flex flex-col items-center">
                  <PathNode
                    status={node.status}
                    label={node.short}
                    Icon={Icon}
                    color={unit.color as PathColor}
                    offset={offset}
                    progress={node.progress}
                    to={`/unit/${unit.id}/${node.id}`}
                  />
                  {i < unit.nodes.length - 1 && (
                    <div className="w-1.5 h-8 bg-slate-200 rounded-full mt-4" />
                  )}
                </div>
              );
            })}
          </div>

          {uIdx === 0 && (
            <div className="mt-8 mb-6 bg-white border border-slate-200 rounded-3xl p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="size-20 shrink-0 rounded-xl bg-slate-100 overflow-hidden">
                  <img
                    src={caseStudyImg}
                    alt="Nike Dream Crazy campaign"
                    className="w-full h-full object-cover"
                    width={200}
                    height={200}
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-slate-900 leading-snug text-sm">
                    Case Study: Nike 'Dream Crazy' Strategy
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Video · 12 mins · +50 XP</p>
                  <button
                    onClick={() =>
                      navigate({
                        to: "/unit/$unitId/$nodeId",
                        params: { unitId: "foundations", nodeId: "positioning" },
                      })
                    }
                    className="mt-3 text-brand-primary text-xs font-extrabold uppercase tracking-widest flex items-center gap-1"
                  >
                    Watch now →
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      ))}
    </AppShell>
  );
}