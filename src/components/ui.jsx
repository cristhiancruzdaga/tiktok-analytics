import React from "react";
import clsx from "clsx";
import { TrendingUp, TrendingDown, X } from "lucide-react";
import { pct } from "../lib/format";

export const Card = ({ className, children }) => (
  <div className={clsx("rounded-xl border border-white/10 bg-white/[0.03] p-4", className)}>{children}</div>
);

export const Delta = ({ v }) => (
  <span className={clsx("inline-flex items-center gap-1 font-medium tabular-nums", v >= 0 ? "text-emerald-400" : "text-rose-400")}>
    {v >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
    {pct(v)}
  </span>
);

export const Kpi = ({ icon: Icon, label, value, change: ch }) => (
  <Card className="transition hover:border-white/20">
    <div className="mb-3 flex items-center justify-between text-xs text-zinc-400">
      <span>{label}</span><Icon size={16} className="text-zinc-500" />
    </div>
    <div className="text-2xl font-semibold tabular-nums tracking-tight">{value}</div>
    <div className="mt-1 flex items-center gap-1.5 text-xs"><Delta v={ch} /><span className="text-zinc-500">24h</span></div>
  </Card>
);

export const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
    <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#101012] p-6" onClick={(e) => e.stopPropagation()}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold leading-snug">{title}</h3>
        <button onClick={onClose} aria-label="Cerrar" className="text-zinc-400 hover:text-white"><X size={18} /></button>
      </div>
      {children}
    </div>
  </div>
);

export const Seg = ({ options, value, onChange }) => (
  <div className="inline-flex rounded-lg border border-white/10 bg-black/40 p-0.5 text-xs">
    {options.map(([k, l]) => (
      <button key={k} onClick={() => onChange(k)}
        className={clsx("rounded-md px-3 py-1 transition", value === k ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white")}>{l}</button>
    ))}
  </div>
);

export const Th = ({ k, sort, setSort, right, children }) => (
  <th onClick={() => setSort((s) => ({ key: k, dir: s.key === k ? -s.dir : -1 }))}
    className={clsx("cursor-pointer select-none px-4 py-3 font-medium hover:text-white", right && "text-right")}>
    {children}{sort.key === k ? (sort.dir < 0 ? " ↓" : " ↑") : ""}
  </th>
);

export const axis = { fill: "#71717a", fontSize: 11 };
export const tip = { contentStyle: { background: "#111113", border: "1px solid #27272a", borderRadius: 8, fontSize: 12 }, labelStyle: { color: "#a1a1aa" } };
