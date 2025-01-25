import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Eye, Hammer, FileUp } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const generateMockData = (duration: string) => {
  switch (duration) {
    case "7d":
      return [
        { date: "Mon", value: 100 },
        { date: "Tue", value: 150 },
        { date: "Wed", value: 200 },
        { date: "Thu", value: 180 },
        { date: "Fri", value: 250 },
        { date: "Sat", value: 300 },
        { date: "Sun", value: 280 },
      ];
    case "30d":
      return [
        { date: "Week 1", value: 400 },
        { date: "Week 2", value: 300 },
        { date: "Week 3", value: 600 },
        { date: "Week 4", value: 800 },
      ];
    case "90d":
      return [
        { date: "Jan", value: 400 },
        { date: "Feb", value: 300 },
        { date: "Mar", value: 600 },
      ];
    default:
      return [
        { date: "Jan", value: 400 },
        { date: "Feb", value: 300 },
        { date: "Mar", value: 600 },
        { date: "Apr", value: 800 },
        { date: "May", value: 700 },
      ];
  }
};

export function DesignerAnalytics() {
  const [duration, setDuration] = useState("30d");
  
  const getTimeDescription = (duration: string) => {
    switch (duration) {
      case "7d":
        return "from last week";
      case "30d":
        return "from last month";
      case "90d":
        return "from last quarter";
      case "1y":
        return "from last year";
      default:
        return "from last month";
    }
  };

  const statsCards = [
    {
      title: "Total Royalties",
      value: "$1,240",
      description: `+15.3% ${getTimeDescription(duration)}`,
      icon: DollarSign,
      chartData: generateMockData(duration),
    },
    {
      title: "Design Views",
      value: "3,456",
      description: `+22.4% ${getTimeDescription(duration)}`,
      icon: Eye,
      chartData: generateMockData(duration),
    },
    {
      title: "Designs Underway",
      value: "12",
      description: `+8.1% ${getTimeDescription(duration)}`,
      icon: Hammer,
      chartData: generateMockData(duration),
    },
    {
      title: "Total Designs",
      value: "45",
      description: `+5.7% ${getTimeDescription(duration)}`,
      icon: FileUp,
      chartData: generateMockData(duration),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={duration} onValueChange={setDuration}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
    </div>
  );
}