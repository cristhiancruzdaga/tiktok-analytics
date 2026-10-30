import React from "react";
import { Card, Delta, Th } from "./ui";
import { compact } from "../lib/format";

export default function VideoTable({ rows, sort, setSort, setSelected }) {
  return (
    <>
{/* Tabla de videos */}
        <Card className="overflow-hidden p-0">
          <div className="border-b border-white/10 p-4">
            <h3 className="font-medium">Videos y correlación on-chain</h3>
            <p className="text-xs text-zinc-500">Haz clic en una cabecera para ordenar. El impacto es una estimación a 24h tras la publicación.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead className="text-left text-xs text-zinc-400">
                <tr className="border-b border-white/10">
                  <Th k="title" sort={sort} setSort={setSort}>Video</Th>
                  <Th k="views" sort={sort} setSort={setSort} right>Vistas</Th>
                  <Th k="likes" sort={sort} setSort={setSort} right>Likes</Th>
                  <Th k="retention" sort={sort} setSort={setSort} right>Retención</Th>
                  <Th k="impact" sort={sort} setSort={setSort} right>Impacto en precio</Th>
                  <Th k="buys" sort={sort} setSort={setSort} right>Compras est.</Th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {rows.map((v) => (
                  <tr key={v.id} className="border-b border-white/5 transition hover:bg-white/[0.03]">
                    <td className="max-w-xs px-4 py-3">
                      <div className="truncate font-medium">{v.title}</div>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <span>{v.creator}</span>
                        <span className="rounded bg-white/10 px-1.5 py-0.5 text-zinc-300">{v.type}</span>
                        <a href={v.url} target="_blank" rel="noreferrer" className="truncate hover:text-cyan-300">enlace</a>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">{compact(v.views)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{compact(v.likes)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{v.retention.toFixed(1)}%</td>
                    <td className="px-4 py-3 text-right"><Delta v={v.impact} /></td>
                    <td className="px-4 py-3 text-right tabular-nums">{v.buys.toLocaleString("en-US")}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => setSelected(v)} className="rounded-md border border-white/10 px-2.5 py-1 text-xs hover:border-cyan-400/60 hover:text-cyan-300">Ver detalles</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      
    </>
  );
}
