import { useNavigate } from "@tanstack/react-router";
import { Check, Lock, Star, type LucideIcon } from "lucide-react";
import type { NodeStatus } from "@/data/modules";

const colorMap = {
  sky: { bg: "bg-brand-primary", border: "border-sky-700", ring: "ring-sky-100", text: "text-brand-primary" },
  indigo: { bg: "bg-indigo-500", border: "border-indigo-700", ring: "ring-indigo-100", text: "text-indigo-600" },
  emerald: { bg: "bg-brand-success", border: "border-green-700", ring: "ring-green-100", text: "text-green-700" },
  rose: { bg: "bg-rose-500", border: "border-rose-700", ring: "ring-rose-100", text: "text-rose-600" },
  amber: { bg: "bg-amber-500", border: "border-amber-700", ring: "ring-amber-100", text: "text-amber-600" },
  violet: { bg: "bg-violet-500", border: "border-violet-700", ring: "ring-violet-100", text: "text-violet-600" },
} as const;

export type PathColor = keyof typeof colorMap;

export function PathNode({
  status,
  label,
  Icon,
  color,
  offset,
  to,
  progress,
}: {
  status: NodeStatus;
  label: string;
  Icon: LucideIcon;
  color: PathColor;
  offset: number;
  to: string;
  progress?: number;
}) {
  const c = colorMap[color];
  const isCurrent = status === "current";
  const isDone = status === "completed";
  const isLocked = status === "locked";

  const inner =
    isLocked ? (
      <Lock className="size-6 text-slate-500" strokeWidth={2.5} />
    ) : isDone ? (
      <Check className="size-8 text-white" strokeWidth={3} />
    ) : (
      <Icon className="size-8 text-white" strokeWidth={2.5} />
    );

  const shell = isLocked
    ? "bg-slate-200 border-b-[6px] border-slate-300"
    : isDone
    ? `${c.bg} border-b-[6px] ${c.border} shadow-lg`
    : `${c.bg} border-b-[8px] ${c.border} shadow-xl ring-8 ${c.ring}`;

  const size = isCurrent ? "size-24" : "size-20";

  return (
    <div className="relative flex flex-col items-center" style={{ transform: `translateX(${offset}px)` }}>
      {isCurrent && (
        <div className="absolute -top-11 z-10">
          <div className="relative bg-slate-900 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
            Start lesson
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-8 border-transparent border-t-slate-900" />
          </div>
        </div>
      )}
      <NodeButton to={to} disabled={isLocked} className={`${size} ${shell} rounded-full flex items-center justify-center transition-transform active:translate-y-0.5 active:border-b-2 ${isLocked ? "opacity-60" : ""}`}>
        {inner}
      </NodeButton>
      <span
        className={`mt-3 whitespace-nowrap font-heading font-extrabold text-xs uppercase tracking-tighter ${
          isCurrent ? c.text : isLocked ? "text-slate-400" : "text-slate-700"
        }`}
      >
        {label}
      </span>
      {isCurrent && typeof progress === "number" && (
        <div className="w-16 h-1.5 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
          <div className={`${c.bg} h-full`} style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
      )}
      {isDone && (
        <Star className="absolute -top-1 -right-1 size-5 text-brand-streak fill-brand-streak" />
      )}
    </div>
  );
}

function NodeButton({
  to,
  disabled,
  className,
  children,
}: {
  to: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      disabled={disabled}
      className={className}
      onClick={() => navigate({ to })}
    >
      {children}
    </button>
  );
}