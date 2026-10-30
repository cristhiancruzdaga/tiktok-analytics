export const compact = (n) => new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 2 }).format(n);
export const usd = (n) => "$" + (n < 1 ? n.toFixed(5) : n.toLocaleString("en-US", { maximumFractionDigits: 2 }));
export const pct = (n) => `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;
export const change = (a, b) => (b ? ((a - b) / b) * 100 : 0);
export const num = (v, d = 0) => (isNaN(parseFloat(v)) ? d : parseFloat(v));
export const dayLabel = (ago) => { const d = new Date(Date.now() - ago * 864e5); return `${d.getDate()}/${d.getMonth() + 1}`; };
