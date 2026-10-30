import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { Modal, axis, tip } from "./ui";
import { compact } from "../lib/format";
import { C } from "../lib/data";

export default function VideoDetailModal({ selected, setSelected }) {
  return (
    <>
{/* Modal: detalle del video */}
      {selected && (
        <Modal title={selected.title} onClose={() => setSelected(null)}>
          <p className="mb-4 break-all text-xs text-zinc-500">{selected.creator} · {selected.url}</p>
          <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
            {[["Vistas", compact(selected.views)], ["Likes", compact(selected.likes)], ["Compartidos", compact(selected.shares)],
              ["Comentarios", compact(selected.comments)], ["Retención", selected.retention.toFixed(1) + "%"], ["Tiempo medio", selected.watch.toFixed(1) + " s"]].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-white/[0.04] p-3"><div className="text-xs text-zinc-500">{k}</div><div className="font-semibold tabular-nums">{v}</div></div>
            ))}
          </div>
          <h4 className="mb-2 mt-5 text-sm font-medium">Impacto en precio tras la publicación</h4>
          <div className="h-40">
            <ResponsiveContainer>
              <BarChart data={[["+1h", 0.25], ["+6h", 0.6], ["+24h", 1], ["+72h", 0.8]].map(([w, f]) => ({ w, v: +(selected.impact * f).toFixed(2) }))}>
                <XAxis dataKey="w" tick={axis} tickLine={false} axisLine={false} />
                <YAxis tick={axis} tickLine={false} axisLine={false} width={36} tickFormatter={(v) => v + "%"} />
                <Tooltip {...tip} formatter={(v) => v + "%"} />
                <Bar dataKey="v" radius={[6, 6, 0, 0]}>
                  {[0, 1, 2, 3].map((i) => <Cell key={i} fill={selected.impact >= 0 ? C.cyan : C.pink} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-sm text-zinc-400">Se estiman ~{selected.buys.toLocaleString("en-US")} compras atribuibles a este video.</p>
        </Modal>
      )}

      
    </>
  );
}
