import { useState, useEffect, useMemo } from "react";
import { DollarSign, BarChart3, Activity, Users, Droplets, Eye, Heart, Zap, Hash } from "lucide-react";
import { SUPPLY, rng, initial, tick, buildVideo } from "../lib/data";
import { compact, usd, change } from "../lib/format";
import { parseCSV, ingest } from "../lib/importers";

/** Estado, simulación en vivo, métricas derivadas e importación de archivos. */
export function useDashboard() {
  const [data, setData] = useState(initial);
  const [live, setLive] = useState(true);
  const [range, setRange] = useState(30);
  const [metric, setMetric] = useState("impact");
  const [sort, setSort] = useState({ key: "views", dir: -1 });
  const [selected, setSelected] = useState(null);
  const [showLoad, setShowLoad] = useState(false);
  const [source, setSource] = useState("Datos simulados");
  const [link, setLink] = useState("");
  const [linkErr, setLinkErr] = useState("");
  const [analyzed, setAnalyzed] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setData(tick), 2000);
    return () => clearInterval(id);
  }, [live]);

  const view = useMemo(() => data.series.slice(-range), [data.series, range]);

  const cards = useMemo(() => {
    const s = data.series, l = s[s.length - 1], p = s[s.length - 2] || l;
    const V = data.videos, tv = V.reduce((a, v) => a + v.views, 0) || 1;
    const likesRatio = V.reduce((a, v) => a + v.likes, 0) / tv;
    const er = (V.reduce((a, v) => a + v.likes + v.shares + v.comments, 0) / tv) * 100;
    const views = view.reduce((a, x) => a + x.views, 0);
    const mcap = l.price * SUPPLY, pc = change(l.price, p.price);
    return {
      fin: [
        { icon: DollarSign, label: "Precio $TIKTOK", value: usd(l.price), change: pc },
        { icon: BarChart3, label: "Market cap", value: "$" + compact(mcap), change: pc },
        { icon: Activity, label: "Volumen 24h", value: "$" + compact(l.volume), change: change(l.volume, p.volume) },
        { icon: Users, label: "Holders", value: data.acct.holders.toLocaleString("en-US"), change: change(data.acct.holders, 47200) },
        { icon: Droplets, label: "Liquidez", value: "$" + compact(mcap * 0.09), change: pc * 0.8 },
      ],
      soc: [
        { icon: Eye, label: `Visualizaciones (${range}d)`, value: compact(views), change: change(l.views, p.views) },
        { icon: Heart, label: "Likes totales", value: compact(views * likesRatio), change: change(l.views, p.views) * 0.8 },
        { icon: Zap, label: "Engagement rate", value: er.toFixed(2) + "%", change: 0.6 },
        { icon: Hash, label: "Menciones #TIKTOK", value: data.acct.mentions.toLocaleString("en-US"), change: change(data.acct.mentions, 11200) },
      ],
    };
  }, [data, range, view]);

  const byType = useMemo(() => {
    const m = {};
    data.videos.forEach((v) => {
      const t = (m[v.type] ??= { type: v.type, n: 0, impact: 0, buys: 0 });
      t.n++; t.impact += v.impact; t.buys += v.buys;
    });
    return Object.values(m).map((t) => ({ type: t.type, impact: +(t.impact / t.n).toFixed(2), buys: t.buys }));
  }, [data.videos]);

  const rows = useMemo(
    () => [...data.videos].sort((a, b) => (a[sort.key] > b[sort.key] ? 1 : -1) * sort.dir),
    [data.videos, sort]
  );

  const analyze = () => {
    if (!/tiktok\.com\//i.test(link)) return setLinkErr("Pega un enlace válido de tiktok.com");
    setLinkErr("");
    const h = [...link].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
    const r = rng(h);
    const creator = (link.match(/@[\w.]+/) || ["@desconocido"])[0];
    const v = buildVideo(`Video analizado …${link.slice(-6)}`, creator, Math.round(80000 + r() * 4e6), ["Creador", "Meme", "Trend", "Oficial"][h % 4], link);
    setData((d) => ({ ...d, videos: [v, ...d.videos.filter((x) => x.url !== link)] }));
    setAnalyzed(v);
  };

  const onFile = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    try {
      const text = await f.text();
      const { videos, series } = ingest(f.name.toLowerCase().endsWith(".json") ? JSON.parse(text) : parseCSV(text));
      setData((d) => ({ ...d, videos: videos.length ? videos : d.videos, series: series.length >= 2 ? series : d.series }));
      setLive(false);
      setSource(`Archivo: ${f.name}`);
      setMsg({ ok: true, t: `Cargados ${videos.length} videos y ${series.length} puntos de serie.` });
    } catch (err) {
      setMsg({ ok: false, t: err.message });
    }
    e.target.value = "";
  };

  const reset = () => { setData(initial()); setSource("Datos simulados"); setLive(true); setMsg(null); };

  return { source, live, setLive, showLoad, setShowLoad, link, setLink, analyze, linkErr, analyzed, selected, setSelected, cards, view, range, setRange, metric, setMetric, byType, rows, sort, setSort, msg, onFile, reset };
}
