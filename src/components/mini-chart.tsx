
import { ResponsiveContainer, AreaChart, Area, Tooltip } from "recharts";

interface MiniChartProps {
  data: number[];
  color?: string;
  height?: number;
}

export function MiniChart({
  data,
  color = "#0747A6",
  height = 40,
}: MiniChartProps) {
  const chartData = data.map((value, index) => ({
    value,
    index,
  }));

  return (
    <div className="h-10">
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={{ background: "white", border: "none", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", fontSize: "12px" }}
            formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
            labelFormatter={() => ""}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            fill={`url(#gradient-${color.replace('#', '')})`}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
