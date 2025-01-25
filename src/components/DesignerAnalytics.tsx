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

// Mock data for designs with metrics
const mockDesigns = [
  { 
    id: 'all', 
    name: 'All Designs', 
    totalPurchases: 1193,
    metrics: {
      '7d': { type: 'revenue', value: 15.3 },
      '30d': { type: 'views', value: 22.4 },
      '90d': { type: 'revenue', value: 18.7 },
      '1y': { type: 'purchases', value: 25.1 }
    }
  },
  { 
    id: 'design1', 
    name: 'Modular Storage System', 
    totalPurchases: 325,
    metrics: {
      '7d': { type: 'views', value: -5.2 },
      '30d': { type: 'revenue', value: 12.4 },
      '90d': { type: 'purchases', value: 8.7 },
      '1y': { type: 'revenue', value: 15.1 }
    }
  },
  { 
    id: 'design2', 
    name: 'Smart Home Controller', 
    totalPurchases: 189,
    metrics: {
      '7d': { type: 'revenue', value: 8.3 },
      '30d': { type: 'views', value: -3.4 },
      '90d': { type: 'purchases', value: 10.7 },
      '1y': { type: 'views', value: 18.1 }
    }
  },
  { 
    id: 'design3', 
    name: 'Ergonomic Laptop Stand', 
    totalPurchases: 412,
    metrics: {
      '7d': { type: 'purchases', value: 12.3 },
      '30d': { type: 'revenue', value: 15.4 },
      '90d': { type: 'views', value: -2.7 },
      '1y': { type: 'revenue', value: 20.1 }
    }
  },
  { 
    id: 'design4', 
    name: 'Desktop Organizer', 
    totalPurchases: 267,
    metrics: {
      '7d': { type: 'views', value: 9.3 },
      '30d': { type: 'purchases', value: -4.4 },
      '90d': { type: 'revenue', value: 11.7 },
      '1y': { type: 'purchases', value: 16.1 }
    }
  },
];

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
  const [selectedDesign, setSelectedDesign] = useState("all");
  
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

  const getMetricDisplay = (design: typeof mockDesigns[0]) => {
    const metric = design.metrics[duration as keyof typeof design.metrics];
    const isPositive = metric.value > 0;
    const textColorClass = isPositive ? 'text-green-600' : 'text-red-600';
    const metricType = metric.type.charAt(0).toUpperCase() + metric.type.slice(1);
    return (
      <div className="flex items-center gap-1">
        <span>{`${design.totalPurchases} total purchases`}</span>
        <span className={`ml-2 ${textColorClass}`}>
          {`${metricType} ${isPositive ? '+' : ''}${metric.value}%`}
        </span>
      </div>
    );
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
      <div className="flex justify-end gap-4">
        <Select value={selectedDesign} onValueChange={setSelectedDesign}>
          <SelectTrigger className="w-[350px]">
            <SelectValue placeholder="Select design" />
          </SelectTrigger>
          <SelectContent>
            {mockDesigns.map((design) => (
              <SelectItem key={design.id} value={design.id}>
                <div className="flex justify-between items-center w-full">
                  <span>{design.name}</span>
                  <span className="text-sm">
                    {getMetricDisplay(design)}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
