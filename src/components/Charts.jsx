import React from "react";
import { ResponsiveContainer, ComposedChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import { Card, Seg, axis, tip } from "./ui";
import { compact, usd } from "../lib/format";
import { C } from "../lib/data";

export default function Charts({ view, range, setRange, live, metric, setMetric, byType }) {
  return (
    <>
{/* Gráficos */}
        <section className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-medium">Precio y volumen vs. visualizaciones</h3>
                <p className="text-xs text-zinc-500">Los picos virales suelen anticipar movimientos de precio</p>
              </div>
              <Seg value={range} onChange={setRange} options={[[7, "7d"], [30, "30d"], [90, "90d"]]} />
            </div>
            <div className="h-80">
              <ResponsiveContainer>
                <ComposedChart data={view} margin={{ left: 0, right: 0, top: 5 }}>
                  <CartesianGrid stroke={C.grid} strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="label" tick={axis} tickLine={false} axisLine={false} minTickGap={24} />
                  <YAxis yAxisId="p" tick={axis} tickLine={false} axisLine={false} width={58} domain={["auto", "auto"]} tickFormatter={(v) => "$" + v.toFixed(4)} />
                  <YAxis yAxisId="v" orientation="right" tick={axis} tickLine={false} axisLine={false} width={44} tickFormatter={compact} />
                  <YAxis yAxisId="b" hide domain={[0, (m) => m * 4]} />
                  <Tooltip {...tip} formatter={(v, n) => (n === "Precio" ? usd(v) : compact(v))} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar yAxisId="b" dataKey="volume" name="Volumen" fill={C.violet} fillOpacity={0.3} isAnimationActive={!live} />
                  <Line yAxisId="p" dataKey="price" name="Precio" stroke={C.cyan} strokeWidth={2} dot={false} isAnimationActive={!live} />
                  <Line yAxisId="v" dataKey="views" name="Vistas TikTok" stroke={C.pink} strokeWidth={2} dot={false} isAnimationActive={!live} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-medium">Rendimiento por tipo de contenido</h3>
                <p className="text-xs text-zinc-500">Oficial, creadores, memes y trends</p>
              </div>
              <Seg value={metric} onChange={setMetric} options={[["impact", "Impacto %"], ["buys", "Compras"]]} />
            </div>
            <div className="h-80">
              <ResponsiveContainer>
                <BarChart data={byType}>
                  <CartesianGrid stroke={C.grid} strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="type" tick={axis} tickLine={false} axisLine={false} />
                  <YAxis tick={axis} tickLine={false} axisLine={false} width={44} tickFormatter={metric === "buys" ? compact : (v) => v + "%"} />
                  <Tooltip {...tip} cursor={{ fill: "rgba(255,255,255,0.04)" }} formatter={(v) => (metric === "buys" ? v.toLocaleString("en-US") : v + "%")} />
                  <Bar dataKey={metric} radius={[6, 6, 0, 0]}>
                    {byType.map((d, i) => <Cell key={i} fill={d[metric] >= 0 ? C.cyan : C.pink} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        
    </>
  );
}
