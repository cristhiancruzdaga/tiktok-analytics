import React from "react";
import clsx from "clsx";
import { Radio, Upload, Database } from "lucide-react";
import { C } from "../lib/data";

export default function Header({ source, live, setLive, setShowLoad }) {
  return (
    <>
{/* Cabecera */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#09090b]/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 rounded-lg bg-black ring-1 ring-white/10">
              <span className="absolute inset-0 flex items-center justify-center font-bold" style={{ color: C.cyan, transform: "translate(-1px,-1px)" }}>$</span>
              <span className="absolute inset-0 flex items-center justify-center font-bold" style={{ color: C.pink, transform: "translate(1px,1px)", mixBlendMode: "screen" }}>$</span>
            </div>
            <div>
              <h1 className="text-base font-semibold leading-none">$TIKTOK Analytics</h1>
              <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500"><Database size={11} />{source}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLive((v) => !v)}
              className={clsx("flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs transition",
                live ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" : "border-white/10 text-zinc-400 hover:text-white")}>
              <Radio size={14} className={live ? "animate-pulse" : ""} />{live ? "En vivo" : "Pausado"}
            </button>
            <button onClick={() => setShowLoad(true)} className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-black hover:bg-zinc-200">
              <Upload size={14} />Cargar / simular datos
            </button>
          </div>
        </div>
      </header>

      
    </>
  );
}
