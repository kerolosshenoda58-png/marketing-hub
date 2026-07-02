import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { X, Play, Check, Volume2, Maximize2, Heart } from "lucide-react";
import { findLesson, type Unit, type ModuleNode, type Lesson } from "@/data/modules";
import videoThumb from "@/assets/lesson-video.jpg";

export const Route = createFileRoute("/lesson/$unitId/$nodeId/$lessonId")({
  loader: ({ params }) => {
    const { unit, node, lesson } = findLesson(params.unitId, params.nodeId, params.lessonId);
    if (!unit || !node || !lesson) throw notFound();
    return { unit, node, lesson };
  },
  component: LessonPage,
  notFoundComponent: () => (
    <div className="p-8 text-center">
      <p className="text-sm text-slate-600">Lesson not found.</p>
      <Link to="/" className="text-brand-primary font-bold text-sm mt-2 inline-block">Back to Learn</Link>
    </div>
  ),
});

const options = [
  { id: "a", text: "Low initial pricing strategy", correct: false },
  { id: "b", text: "Competitive alternatives that frame your value", correct: true },
  { id: "c", text: "Listing every feature you can think of", correct: false },
];

function LessonPage() {
  const { unit, node, lesson } = Route.useLoaderData() as {
    unit: Unit;
    node: ModuleNode;
    lesson: Lesson;
  };
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const chosen = options.find((o) => o.id === selected);
  const isCorrect = chosen?.correct === true;

  return (
    <div className="min-h-screen bg-white font-body text-slate-900 pb-8">
      {/* Progress bar / close */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur px-4 py-3 flex items-center gap-3 border-b border-slate-100">
        <button
          onClick={() =>
            navigate({ to: "/unit/$unitId/$nodeId", params: { unitId: unit.id, nodeId: node.id } })
          }
          className="text-slate-500 p-1"
          aria-label="Close"
        >
          <X className="size-6" />
        </button>
        <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-success transition-all duration-300"
            style={{ width: checked ? "66%" : "33%" }}
          />
        </div>
        <div className="flex items-center gap-1 text-brand-heart">
          <Heart className="size-5" fill="currentColor" />
          <span className="text-sm font-extrabold">5</span>
        </div>
      </header>

      <main className="max-w-md mx-auto px-5 pt-6 space-y-8">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-brand-primary">
            {unit.title} · {node.title}
          </p>
          <h1 className="font-heading text-2xl font-extrabold leading-tight mt-1 text-balance">
            {lesson.title}
          </h1>
        </div>

        {/* Video */}
        <div className="rounded-3xl overflow-hidden bg-slate-900 shadow-lg shadow-slate-200 relative aspect-video">
          <img
            src={videoThumb}
            alt="Video lesson"
            className="w-full h-full object-cover opacity-90"
            width={1024}
            height={576}
          />
          <button
            className="absolute inset-0 grid place-items-center group"
            aria-label="Play video"
          >
            <span className="size-16 rounded-full bg-white/95 grid place-items-center shadow-xl group-active:scale-95 transition-transform">
              <Play className="size-7 text-brand-primary ml-1" fill="currentColor" />
            </span>
          </button>
          <div className="absolute bottom-0 inset-x-0 p-3 flex items-center gap-2 bg-gradient-to-t from-black/70 to-transparent text-white text-xs">
            <span className="font-bold">0:00</span>
            <div className="flex-1 h-1 bg-white/30 rounded-full">
              <div className="h-full w-0 bg-white rounded-full" />
            </div>
            <span className="font-bold">{lesson.minutes}:00</span>
            <Volume2 className="size-4 ml-1" />
            <Maximize2 className="size-4" />
          </div>
        </div>

        {/* Concept card */}
        <section className="bg-sky-50 border border-sky-100 rounded-2xl p-5">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-primary">
            Key concept
          </span>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-800">
            Positioning isn't what you do to the product; it's what you do to the mind of the prospect.
            Choose your competitive alternatives carefully — they define the value scale your customers use to judge you.
          </p>
        </section>

        {/* Quiz */}
        <section>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
            Practice question
          </span>
          <h2 className="font-heading text-lg font-extrabold mt-2 text-balance leading-snug">
            What is essential to an "Obviously Awesome" positioning statement?
          </h2>

          <div className="mt-4 space-y-2.5">
            {options.map((o) => {
              const isSelected = selected === o.id;
              const showCorrect = checked && o.correct;
              const showWrong = checked && isSelected && !o.correct;
              return (
                <button
                  key={o.id}
                  onClick={() => !checked && setSelected(o.id)}
                  className={`w-full text-left p-4 rounded-2xl border-2 text-sm font-semibold transition-colors flex items-center justify-between gap-3 ${
                    showCorrect
                      ? "border-brand-success bg-green-50 text-green-800"
                      : showWrong
                      ? "border-brand-heart bg-rose-50 text-rose-800"
                      : isSelected
                      ? "border-brand-primary bg-sky-50 text-brand-primary-deep"
                      : "border-slate-200 bg-white text-slate-800"
                  }`}
                  disabled={checked}
                >
                  <span>{o.text}</span>
                  {showCorrect && <Check className="size-5 text-brand-success shrink-0" strokeWidth={3} />}
                </button>
              );
            })}
          </div>
        </section>
      </main>

      {/* Sticky footer */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 px-5 py-4">
        <div className="max-w-md mx-auto">
          {!checked ? (
            <button
              disabled={!selected}
              onClick={() => setChecked(true)}
              className={`w-full py-4 rounded-2xl font-extrabold uppercase tracking-widest text-sm shadow-lg transition-all ${
                selected
                  ? "bg-brand-success text-white active:translate-y-0.5 shadow-green-200"
                  : "bg-slate-200 text-slate-400"
              }`}
            >
              Check
            </button>
          ) : (
            <div className="space-y-3">
              <div className={`p-3 rounded-xl text-sm font-bold flex items-center gap-2 ${
                isCorrect ? "bg-green-50 text-green-800" : "bg-rose-50 text-rose-800"
              }`}>
                {isCorrect ? "Nice — that's the answer." : "Not quite. Competitive alternatives are the anchor."}
              </div>
              <button
                onClick={() =>
                  navigate({ to: "/unit/$unitId/$nodeId", params: { unitId: unit.id, nodeId: node.id } })
                }
                className="w-full py-4 rounded-2xl font-extrabold uppercase tracking-widest text-sm bg-brand-primary text-white shadow-lg shadow-sky-200 active:translate-y-0.5"
              >
                Continue · +{lesson.xp} XP
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}