
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis } from "recharts";

interface MiniChartProps {
  data: number[];
  color?: string;
  height?: number;
  showAxes?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  hideTooltip?: boolean;
}

export function MiniChart({
  data,
  color = "#0747A6",
  height = 40,
  showAxes = false,
  xAxisLabel = "",
  yAxisLabel = "",
  hideTooltip = false
}: MiniChartProps) {
  const chartData = data.map((value, index) => ({
    value,
    index,
  }));

  return (
    <div className={`h-${height / 4}`}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart 
          data={chartData} 
          margin={{ 
            top: 5, 
            right: showAxes ? 30 : 0, 
            left: showAxes ? 30 : 0, 
            bottom: showAxes ? 20 : 0 
          }}
        >
          <defs>
            <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          
          {!hideTooltip && (
            <Tooltip
              contentStyle={{ background: "white", border: "none", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", fontSize: "12px" }}
              formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
              labelFormatter={() => ""}
            />
          )}
          
          {showAxes && (
            <>
              <XAxis 
                dataKey="index"
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#E2E8F0' }}
                tickLine={false}
                label={{ 
                  value: xAxisLabel,
                  position: 'bottom',
                  offset: 0,
                  style: { fontSize: 12, fill: '#64748B' }
                }}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#E2E8F0' }}
                tickLine={false}
                tickFormatter={(value) => `$${value/1000}k`}
                label={{
                  value: yAxisLabel,
                  angle: -90,
                  position: 'left',
                  style: { fontSize: 12, textAnchor: 'middle', fill: '#64748B' }
                }}
              />
            </>
          )}
          
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
