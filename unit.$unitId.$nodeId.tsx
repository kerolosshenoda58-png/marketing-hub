import { createFileRoute, useNavigate, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Play, BookOpen, HelpCircle, Wrench, Check, Lock } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { findNode, type LessonKind, type Lesson, type Unit, type ModuleNode } from "@/data/modules";

export const Route = createFileRoute("/unit/$unitId/$nodeId")({
  loader: ({ params }) => {
    const { unit, node } = findNode(params.unitId, params.nodeId);
    if (!unit || !node) throw notFound();
    return { unit, node };
  },
  component: NodeDetail,
  notFoundComponent: () => (
    <div className="p-8 text-center">
      <p className="text-sm text-slate-600">Lesson not found.</p>
      <Link to="/" className="text-brand-primary font-bold text-sm mt-2 inline-block">Back to Learn</Link>
    </div>
  ),
});

const kindIcon: Record<LessonKind, React.ComponentType<{ className?: string }>> = {
  video: Play,
  reading: BookOpen,
  quiz: HelpCircle,
  practice: Wrench,
};

const kindLabel: Record<LessonKind, string> = {
  video: "Video",
  reading: "Reading",
  quiz: "Quiz",
  practice: "Practice",
};

function NodeDetail() {
  const { unit, node } = Route.useLoaderData() as { unit: Unit; node: ModuleNode };
  const navigate = useNavigate();

  const hasLessons = node.lessons.length > 0;
  const firstLesson = node.lessons[0];

  return (
    <AppShell>
      <div className="px-4 pt-4 pb-2">
        <Link to="/" className="inline-flex items-center gap-1 text-slate-600 text-sm font-semibold">
          <ArrowLeft className="size-4" /> Learn path
        </Link>
      </div>

      <section className="px-4 pt-2">
        <div className="bg-brand-primary rounded-3xl p-6 text-white shadow-xl shadow-sky-200/50 relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-md">
              Unit {unit.index} · {unit.title}
            </span>
            <h1 className="font-heading text-2xl font-extrabold mt-2 leading-tight text-balance">
              {node.title}
            </h1>
            <p className="text-sky-100 text-sm mt-1 opacity-90">
              {node.lessons.length} lessons · {node.lessons.reduce((s, l) => s + l.xp, 0)} XP total
            </p>

            {hasLessons && firstLesson && (
              <button
                onClick={() =>
                  navigate({
                    to: "/lesson/$unitId/$nodeId/$lessonId",
                    params: { unitId: unit.id, nodeId: node.id, lessonId: firstLesson.id },
                  })
                }
                className="mt-6 bg-white text-brand-primary font-extrabold px-5 py-3 rounded-xl text-sm shadow-sm active:scale-95 transition-transform inline-flex items-center gap-2"
              >
                <Play className="size-4" fill="currentColor" /> Start lesson
              </button>
            )}
          </div>
          <div className="absolute -right-8 -top-8 size-32 bg-white/10 rounded-full blur-2xl" />
        </div>
      </section>

      <section className="px-4 py-6">
        <h2 className="font-heading font-extrabold text-slate-900 uppercase tracking-tighter text-sm mb-3">
          Lessons
        </h2>

        {hasLessons ? (
          <ul className="space-y-2">
            {node.lessons.map((lesson: Lesson, i: number) => {
              const Icon = kindIcon[lesson.kind];
              const done = node.status === "completed" || (node.status === "current" && i === 0);
              return (
                <li key={lesson.id}>
                  <button
                    onClick={() =>
                      navigate({
                        to: "/lesson/$unitId/$nodeId/$lessonId",
                        params: { unitId: unit.id, nodeId: node.id, lessonId: lesson.id },
                      })
                    }
                    className="w-full flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-4 text-left active:scale-[0.99] transition-transform"
                  >
                    <div className={`size-11 rounded-xl grid place-items-center shrink-0 ${
                      done ? "bg-brand-success text-white" : "bg-sky-50 text-brand-primary"
                    }`}>
                      {done ? <Check className="size-5" strokeWidth={3} /> : <Icon className="size-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-bold text-sm text-slate-900 truncate">{lesson.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {kindLabel[lesson.kind]} · {lesson.minutes} min · +{lesson.xp} XP
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-6 text-center">
            <Lock className="size-6 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-slate-700 mt-2">Locked</p>
            <p className="text-xs text-slate-500 mt-1">
              Finish earlier lessons to unlock this module.
            </p>
          </div>
        )}
      </section>
    </AppShell>
  );
}