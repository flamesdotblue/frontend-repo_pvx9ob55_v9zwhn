import { useMemo, useState } from "react";
import Header from "./components/Header";
import KPICards from "./components/KPICards";
import CategoryRevenue from "./components/CategoryRevenue";
import MonthlyTrends from "./components/MonthlyTrends";

const SAMPLE_MONTHS = [
  { month: "Apr", revenue: 42000, customers: 310, orders: 380 },
  { month: "May", revenue: 47000, customers: 340, orders: 410 },
  { month: "Jun", revenue: 52000, customers: 355, orders: 430 },
  { month: "Jul", revenue: 56000, customers: 372, orders: 455 },
  { month: "Aug", revenue: 61000, customers: 395, orders: 480 },
  { month: "Sep", revenue: 59000, customers: 388, orders: 470 },
  { month: "Oct", revenue: 65000, customers: 420, orders: 505 },
  { month: "Nov", revenue: 72000, customers: 455, orders: 545 },
  { month: "Dec", revenue: 81000, customers: 498, orders: 590 },
  { month: "Jan", revenue: 62000, customers: 405, orders: 490 },
  { month: "Feb", revenue: 67000, customers: 430, orders: 515 },
  { month: "Mar", revenue: 74000, customers: 465, orders: 555 },
];

const SAMPLE_CATEGORIES = [
  { category: "Apparel", revenue: 128000 },
  { category: "Electronics", revenue: 164000 },
  { category: "Home & Kitchen", revenue: 94000 },
  { category: "Beauty", revenue: 68000 },
  { category: "Sports", revenue: 51000 },
];

function computeTotals(months) {
  const revenue = months.reduce((sum, m) => sum + m.revenue, 0);
  const customers = months.reduce((sum, m) => sum + m.customers, 0);
  const orders = months.reduce((sum, m) => sum + m.orders, 0);
  const last = months[months.length - 1]?.revenue ?? 0;
  const prev = months[months.length - 2]?.revenue ?? last;
  const growth = last && prev ? (last - prev) / prev : 0;
  return { revenue, customers, orders, growth };
}

export default function App() {
  const [range, setRange] = useState("12m");

  const months = useMemo(() => {
    if (range === "6m") return SAMPLE_MONTHS.slice(-6);
    if (range === "3m") return SAMPLE_MONTHS.slice(-3);
    return SAMPLE_MONTHS;
  }, [range]);

  const totals = useMemo(() => computeTotals(months), [months]);

  const categoriesScaled = useMemo(() => {
    // Scale by selected range to keep the chart relatable
    const factor = months.length / SAMPLE_MONTHS.length;
    return SAMPLE_CATEGORIES.map((c) => ({ ...c, revenue: Math.round(c.revenue * factor) }));
  }, [months]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-neutral-950 dark:to-neutral-900 text-slate-900 dark:text-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Header />

        <div className="mt-6 mb-4 flex items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">
            View: <span className="font-medium text-slate-900 dark:text-slate-100">Sample Data</span>
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-gray-200/60 dark:border-gray-800 bg-white/70 dark:bg-neutral-900/70 p-1">
            {[
              { key: "3m", label: "3M" },
              { key: "6m", label: "6M" },
              { key: "12m", label: "12M" },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setRange(opt.key)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  range === opt.key
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-neutral-800/60"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <KPICards totals={totals} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <MonthlyTrends data={months} />
          </div>
          <div className="lg:col-span-1">
            <CategoryRevenue data={categoriesScaled} />
          </div>
        </div>

        <footer className="mt-10 text-center text-xs text-muted-foreground">
          Built for quick insights with zero setup. Data shown is illustrative only.
        </footer>
      </div>
    </div>
  );
}
