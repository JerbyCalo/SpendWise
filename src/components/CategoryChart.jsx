import { useMemo } from "react";
import { PieChart as PieChartIcon } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { CATEGORIES } from "../utils/categories";
import { formatPHP } from "../utils/formatCurrency";

const CategoryChart = ({ spentByCategory }) => {
  const chartData = useMemo(() => {
    return CATEGORIES.filter((cat) => (spentByCategory[cat.id] || 0) > 0).map(
      (cat) => ({
        name: cat.label,
        value: spentByCategory[cat.id],
        color: cat.color,
        id: cat.id,
      }),
    );
  }, [spentByCategory]);

  const isEmpty = chartData.length === 0;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-surface-muted">
        <PieChartIcon className="h-12 w-12 mb-3 opacity-30" />
        <p className="text-sm font-medium">No expenses this month</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Pie chart */}
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry) => (
              <Cell key={entry.id} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "0.5rem",
              color: "#fff",
              fontSize: "0.8rem",
            }}
            formatter={(value) => [formatPHP(value), "Spent"]}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-2">
        {chartData.map((entry) => (
          <div key={entry.id} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-300 truncate">{entry.name}</span>
            <span className="text-xs text-surface-muted mono ml-auto shrink-0">
              {formatPHP(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryChart;
