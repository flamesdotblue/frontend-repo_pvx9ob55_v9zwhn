function formatCurrency(v) {
  return v.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function CategoryRevenue({ data }) {
  const max = Math.max(...data.map((d) => d.revenue), 1);

  return (
    <section className="rounded-xl border border-gray-200/60 dark:border-gray-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur p-5">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Revenue by Category</h3>
        <p className="text-xs text-muted-foreground/70">Top-performing product groups</p>
      </div>
      <div className="space-y-3">
        {data.map((d) => (
          <div key={d.category} className="">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-sm font-medium">{d.category}</span>
              <span className="text-xs text-muted-foreground">{formatCurrency(d.revenue)}</span>
            </div>
            <div className="h-2.5 w-full bg-gray-100 dark:bg-neutral-800 rounded-md overflow-hidden">
              <div
                className="h-full rounded-md bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500"
                style={{ width: `${(d.revenue / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
