import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartDataPoint } from "@/types/analytics";

interface AnalyticsChartProps {
  data: ChartDataPoint[];
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  return (
    <div className="h-[80px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm text-muted-foreground">
                          Value
                        </span>
                        <span className="text-sm font-medium">
                          {payload[0].value}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}