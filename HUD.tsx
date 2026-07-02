import { Flame, Gem, Heart } from "lucide-react";
import avatar from "@/assets/avatar.jpg";

export function HUD() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200 px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Stat icon={<Flame className="size-4 text-brand-streak" />} value="12" tint="bg-orange-50 text-orange-700" />
          <Stat icon={<Gem className="size-4 text-brand-gem" />} value="2,430" tint="bg-violet-50 text-violet-700" />
          <Stat icon={<Heart className="size-4 text-brand-heart" fill="currentColor" />} value="5" tint="bg-rose-50 text-rose-700" />
        </div>
        <div className="size-9 rounded-full outline outline-2 outline-offset-2 outline-slate-100 overflow-hidden">
          <img src={avatar} alt="Profile" className="w-full h-full object-cover" width={100} height={100} loading="lazy" />
        </div>
      </div>
    </header>
  );
}

function Stat({ icon, value, tint }: { icon: React.ReactNode; value: string; tint: string }) {
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${tint}`}>
      {icon}
      <span className="text-sm font-bold tabular-nums">{value}</span>
    </div>
  );
}