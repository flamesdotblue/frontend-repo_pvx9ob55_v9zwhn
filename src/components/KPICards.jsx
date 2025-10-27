import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react";

function formatCurrency(v) {
  return v.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function KPICards({ totals }) {
  const items = [
    {
      label: "Total Sales",
      value: formatCurrency(totals.revenue),
      icon: DollarSign,
      accent: "bg-emerald-500/10 text-emerald-600",
    },
    {
      label: "Customers",
      value: totals.customers.toLocaleString(),
      icon: Users,
      accent: "bg-sky-500/10 text-sky-600",
    },
    {
      label: "Orders",
      value: totals.orders.toLocaleString(),
      icon: ShoppingCart,
      accent: "bg-violet-500/10 text-violet-600",
    },
    {
      label: "MoM Growth",
      value: `${(totals.growth * 100).toFixed(1)}%`,
      icon: TrendingUp,
      accent: "bg-amber-500/10 text-amber-600",
    },
  ];

  return (
    <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border border-gray-200/60 dark:border-gray-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="mt-1 text-xl font-semibold">{item.value}</p>
            </div>
            <div className={`p-2 rounded-lg ${item.accent}`}>
              <item.icon className="w-5 h-5" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
