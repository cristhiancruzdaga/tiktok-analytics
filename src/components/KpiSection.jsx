import React from "react";
import { Kpi } from "./ui";

export default function KpiSection({ cards }) {
  return (
    <>
{/* KPIs */}
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-zinc-400">Token</h2>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">{cards.fin.map((c) => <Kpi key={c.label} {...c} />)}</div>
          <h2 className="pt-2 text-sm font-medium text-zinc-400">TikTok</h2>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{cards.soc.map((c) => <Kpi key={c.label} {...c} />)}</div>
        </section>

        
    </>
  );
}
