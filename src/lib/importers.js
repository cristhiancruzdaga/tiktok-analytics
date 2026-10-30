import { num } from "./format";
import { buildVideo } from "./data";

export function parseCSV(text) {
  const [head, ...rows] = text.trim().split(/\r?\n/);
  const strip = (v) => v.trim().replace(/^"|"$/g, "");
  const keys = head.split(",").map((k) => strip(k).toLowerCase());
  return rows.filter(Boolean).map((row) => Object.fromEntries(row.split(",").map((v, i) => [keys[i], strip(v)])));
}

export function ingest(raw) {
  const rows = (Array.isArray(raw) ? raw : [...(raw.videos || []), ...(raw.series || [])]).map((r) =>
    Object.fromEntries(Object.entries(r).map(([k, v]) => [k.toLowerCase(), v]))
  );
  const videos = rows.filter((r) => r.title || r.titulo).map((r, i) => {
    const url = r.url || `https://www.tiktok.com/@import/video/${i}`;
    const b = buildVideo(r.title || r.titulo, r.creator || r.creador || "@import", num(r.views, 100000), r.type || r.tipo || "Creador", url);
    return { ...b, likes: num(r.likes, b.likes), retention: num(r.retention, b.retention), impact: num(r.impact, b.impact), buys: num(r.buys, b.buys) };
  });
  const series = rows.filter((r) => r.price != null || r.precio != null).map((r) => ({
    label: String(r.date || r.label || r.fecha || ""), price: num(r.price ?? r.precio), volume: num(r.volume ?? r.volumen), views: num(r.views),
  }));
  if (!videos.length && !series.length) throw new Error("Formato no reconocido. Revisa las columnas esperadas.");
  return { videos, series };
}
