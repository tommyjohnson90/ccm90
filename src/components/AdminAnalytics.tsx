import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, FileUp, Clock, ShoppingBag } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

const mockData = [
  { date: "Jan", value: 400 },
  { date: "Feb", value: 300 },
  { date: "Mar", value: 600 },
  { date: "Apr", value: 800 },
  { date: "May", value: 700 },
];

const statsCards = [
  {
    title: "New Users",
    value: "2,340",
    description: "+20.1% from last month",
    icon: Users,
    chartData: mockData,
  },
  {
    title: "Design Submissions",
    value: "456",
    description: "+12.3% from last month",
    icon: FileUp,
    chartData: mockData,
  },
  {
    title: "Avg. Visit Duration",
    value: "12m 30s",
    description: "+5.2% from last month",
    icon: Clock,
    chartData: mockData,
  },
  {
    title: "Total Orders",
    value: "1,234",
    description: "+15.7% from last month",
    icon: ShoppingBag,
    chartData: mockData,
  },
];

export function AdminAnalytics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
            <div className="h-[80px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={stat.chartData}
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
}