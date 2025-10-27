import { useMemo } from "react";

function formatCurrency(v) {
  return v.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function MonthlyTrends({ data }) {
  const width = 900; // virtual width for scaling
  const height = 260;
  const padding = { top: 16, right: 24, bottom: 36, left: 40 };

  const { points, maxY, minY, xTicks } = useMemo(() => {
    const ys = data.map((d) => d.revenue);
    const min = Math.min(...ys);
    const max = Math.max(...ys);
    const range = max - min || 1;
    const xStep = (width - padding.left - padding.right) / (data.length - 1 || 1);

    const pts = data.map((d, i) => {
      const x = padding.left + xStep * i;
      const y = padding.top + (1 - (d.revenue - min) / range) * (height - padding.top - padding.bottom);
      return [x, y];
    });

    const ticks = data.map((d, i) => ({ x: padding.left + xStep * i, label: d.month }));

    return { points: pts, maxY: max, minY: min, xTicks: ticks };
  }, [data]);

  const pathD = useMemo(() => {
    if (points.length === 0) return "";
    const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
    return d;
  }, [points]);

  const areaD = useMemo(() => {
    if (points.length === 0) return "";
    const start = `M${points[0][0]},${points[0][1]}`;
    const lines = points.slice(1).map((p) => `L${p[0]},${p[1]}`).join(" ");
    const baseY = height - padding.bottom;
    const close = `L${points[points.length - 1][0]},${baseY} L${points[0][0]},${baseY} Z`;
    return `${start} ${lines} ${close}`;
  }, [points]);

  return (
    <section className="rounded-xl border border-gray-200/60 dark:border-gray-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur p-5">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Monthly Revenue Trend</h3>
          <p className="text-xs text-muted-foreground/70">Growth over time</p>
        </div>
        <div className="text-xs text-muted-foreground">
          <span>Range: {formatCurrency(minY)} – {formatCurrency(maxY)}</span>
        </div>
      </div>

      <div className="w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-64">
          <defs>
            <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g>
            {/* Y gridlines */}
            {Array.from({ length: 4 }).map((_, i) => {
              const y = padding.top + ((height - padding.top - padding.bottom) / 3) * i;
              return <line key={i} x1={padding.left} x2={width - padding.right} y1={y} y2={y} className="stroke-gray-200 dark:stroke-neutral-800" strokeWidth="1" />;
            })}
          </g>

          {/* X axis labels */}
          <g>
            {xTicks.map((t, i) => (
              <text key={i} x={t.x} y={height - padding.bottom + 18} textAnchor="middle" className="fill-gray-500 dark:fill-neutral-400 text-[10px]">
                {t.label}
              </text>
            ))}
          </g>

          {/* Area */}
          <path d={areaD} fill="url(#lineGrad)" />

          {/* Line */}
          <path d={pathD} stroke="#6366f1" strokeWidth="2.5" fill="none" />

          {/* Points */}
          {points.map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r="3" className="fill-white" stroke="#6366f1" strokeWidth="2" />
          ))}
        </svg>
      </div>
    </section>
  );
}
