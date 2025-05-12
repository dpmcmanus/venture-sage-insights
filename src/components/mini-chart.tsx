
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis } from "recharts";

interface MiniChartProps {
  data: number[];
  color?: string;
  height?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  dataLabel?: string;
}

export function MiniChart({
  data,
  color = "#0747A6",
  height = 40,
  xAxisLabel,
  yAxisLabel,
  dataLabel = "Value",
}: MiniChartProps) {
  const chartData = data.map((value, index) => ({
    value,
    label: `M${index + 1}`,
  }));

  // Determine if this is a small chart (like in the dashboard cards) or a larger one
  const isSmallChart = height <= 50;
  
  return (
    <div className={`${isSmallChart ? 'h-10' : ''}`}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart 
          data={chartData} 
          margin={isSmallChart 
            ? { top: 0, right: 5, left: 5, bottom: 0 } 
            : { top: 10, right: 30, left: 40, bottom: 30 }
          }
        >
          <defs>
            <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          
          {!isSmallChart && (
            <>
              <XAxis 
                dataKey="label"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={true}
                label={{ 
                  value: xAxisLabel,
                  position: 'bottom',
                  offset: 20,
                  fontSize: 12,
                  fill: "#64748b"
                }}
              />
              <YAxis
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={true}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                label={{
                  value: yAxisLabel,
                  angle: -90,
                  position: 'left',
                  offset: 0,
                  fontSize: 12,
                  fill: "#64748b"
                }}
              />
            </>
          )}
          
          <Tooltip
            contentStyle={{ 
              background: "white", 
              border: "none", 
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)", 
              fontSize: "12px" 
            }}
            formatter={(value: number) => [`$${(value / 1000000).toFixed(1)}M`, dataLabel]}
            labelFormatter={(label) => `Month ${label.replace('M', '')}`}
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
