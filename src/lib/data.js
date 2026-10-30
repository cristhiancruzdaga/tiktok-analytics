import { dayLabel } from "./format";

export const SUPPLY = 1_000_000_000;
export const C = { cyan: "#25F4EE", pink: "#FE2C55", violet: "#8b5cf6", grid: "#27272a" };
export const rng = (s) => () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
export const rnd = (a, b) => a + Math.random() * (b - a);

export function genSeries(n = 90) {
  const r = rng(42);
  let price = 0.0042;
  return Array.from({ length: n }, (_, i) => {
    const spike = r() > 0.92 ? 1 + r() * 2.5 : 1; // picos virales
    const views = Math.round(380000 * (1 + i / n) * (0.7 + r() * 0.6) * spike);
    price = Math.max(0.0004, price * (1 + (r() - 0.48) * 0.05 + (spike - 1) * 0.025));
    const volume = Math.round(900000 * (0.6 + r() * 0.8) * (1 + (spike - 1) * 0.9));
    return { label: dayLabel(n - 1 - i), price, volume, views };
  });
}

export function buildVideo(title, creator, views, type, url) {
  const r = rng((views % 9973) + title.length);
  const impact = (r() * 14 - 2) * Math.min(1.6, views / 2e6 + 0.3);
  return {
    id: url, title, creator, type, url, views,
    likes: Math.round(views * (0.05 + r() * 0.1)),
    shares: Math.round(views * (0.01 + r() * 0.03)),
    comments: Math.round(views * (0.003 + r() * 0.01)),
    retention: 28 + r() * 50,
    watch: 6 + r() * 20,
    impact,
    buys: Math.round(views * (0.0004 + r() * 0.0016) * (1 + Math.max(impact, 0) / 10)),
  };
}

export const SEED_VIDEOS = [
  ["Lanzamiento oficial de $TIKTOK", "@tiktoktoken", 2400000, "Oficial"],
  ["Cómo comprar $TIKTOK en 60 segundos", "@cryptoanna", 1350000, "Creador"],
  ["Meme: cuando $TIKTOK sube 20%", "@memelord", 3100000, "Meme"],
  ["Trend #TikTokCoinChallenge", "@dance.web3", 5200000, "Trend"],
  ["AMA con el equipo fundador", "@tiktoktoken", 640000, "Oficial"],
  ["Reseña honesta del token", "@defi_dan", 980000, "Creador"],
  ["POV: tu wallet después del pump", "@memelord", 1850000, "Meme"],
].map(([t, c, v, ty], i) => buildVideo(t, c, v, ty, `https://www.tiktok.com/${c}/video/73${String(i).padStart(2, "0")}8192045`));

export const initial = () => ({ series: genSeries(), videos: SEED_VIDEOS, acct: { holders: 48210, mentions: 12840 } });

export function tick(d) {
  const s = d.series.slice();
  const l = { ...s[s.length - 1] };
  l.price *= 1 + rnd(-0.006, 0.0065);
  l.volume += Math.round(rnd(1000, 15000));
  l.views += Math.round(rnd(1500, 9000));
  s[s.length - 1] = l;
  return { ...d, series: s, acct: { holders: d.acct.holders + Math.round(rnd(0, 5)), mentions: d.acct.mentions + Math.round(rnd(0, 4)) } };
}
