import React from "react";
import { Link2, Search } from "lucide-react";
import { Card, Delta } from "./ui";
import { compact } from "../lib/format";
import { C } from "../lib/data";

export default function LinkAnalyzer({ link, setLink, analyze, linkErr, analyzed, setSelected }) {
  return (
    <>
{/* Analizador de enlaces */}
        <Card>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex items-center gap-2 text-sm font-medium md:w-56"><Link2 size={16} style={{ color: C.cyan }} />Analizar un TikTok</div>
            <input value={link} onChange={(e) => setLink(e.target.value)} onKeyDown={(e) => e.key === "Enter" && analyze()}
              placeholder="https://www.tiktok.com/@creador/video/123…"
              className="flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none placeholder:text-zinc-600 focus:border-cyan-400/60" />
            <button onClick={analyze} className="flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-black" style={{ background: C.cyan }}>
              <Search size={14} />Simular impacto
            </button>
          </div>
          {linkErr && <p className="mt-2 text-xs text-rose-400">{linkErr}</p>}
          {analyzed && (
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1 rounded-lg bg-white/[0.04] p-3 text-sm">
              <span className="text-zinc-400">{analyzed.creator}</span>
              <span>{compact(analyzed.views)} vistas</span>
              <span className="flex items-center gap-1.5">Impacto estimado en precio <Delta v={analyzed.impact} /></span>
              <span>~{analyzed.buys.toLocaleString("en-US")} compras</span>
              <button onClick={() => setSelected(analyzed)} className="ml-auto text-xs underline underline-offset-4 hover:text-white">Ver métricas avanzadas</button>
            </div>
          )}
        </Card>

        
    </>
  );
}
