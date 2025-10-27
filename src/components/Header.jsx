import { BarChart3 } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-indigo-600/10 text-indigo-600">
          <BarChart3 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Retail Store KPI Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            A quick snapshot of sales, customers, and growth using sample data.
          </p>
        </div>
      </div>
    </header>
  );
}
