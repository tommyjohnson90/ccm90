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

const generateMockData = (duration: string, designId: string) => {
  const multiplier = designId === 'all' ? 1 : 0.4;
  
  switch (duration) {
    case "7d":
      return [
        { date: "Mon", value: 100 * multiplier },
        { date: "Tue", value: 150 * multiplier },
        { date: "Wed", value: 200 * multiplier },
        { date: "Thu", value: 180 * multiplier },
        { date: "Fri", value: 250 * multiplier },
        { date: "Sat", value: 300 * multiplier },
        { date: "Sun", value: 280 * multiplier },
      ];
    case "30d":
      return [
        { date: "Week 1", value: 400 * multiplier },
        { date: "Week 2", value: 300 * multiplier },
        { date: "Week 3", value: 600 * multiplier },
        { date: "Week 4", value: 800 * multiplier },
      ];
    case "90d":
      return [
        { date: "Jan", value: 400 * multiplier },
        { date: "Feb", value: 300 * multiplier },
        { date: "Mar", value: 600 * multiplier },
      ];
    default:
      return [
        { date: "Jan", value: 400 * multiplier },
        { date: "Feb", value: 300 * multiplier },
        { date: "Mar", value: 600 * multiplier },
        { date: "Apr", value: 800 * multiplier },
        { date: "May", value: 700 * multiplier },
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

  const selectedDesignData = mockDesigns.find(d => d.id === selectedDesign) || mockDesigns[0];
  
  const statsCards = [
    {
      title: "Total Royalties",
      value: selectedDesign === 'all' ? "$1,240" : `$${(1240 * (selectedDesignData.totalPurchases / 1193)).toFixed(0)}`,
      description: `+${selectedDesignData.metrics[duration].value}% ${getTimeDescription(duration)}`,
      icon: DollarSign,
      chartData: generateMockData(duration, selectedDesign),
    },
    {
      title: "Design Views",
      value: selectedDesign === 'all' ? "3,456" : `${(3456 * (selectedDesignData.totalPurchases / 1193)).toFixed(0)}`,
      description: `+${selectedDesignData.metrics[duration].value}% ${getTimeDescription(duration)}`,
      icon: Eye,
      chartData: generateMockData(duration, selectedDesign),
    },
    {
      title: "Designs Underway",
      value: selectedDesign === 'all' ? "12" : `${Math.max(1, Math.floor(12 * (selectedDesignData.totalPurchases / 1193)))}`,
      description: `+${selectedDesignData.metrics[duration].value}% ${getTimeDescription(duration)}`,
      icon: Hammer,
      chartData: generateMockData(duration, selectedDesign),
    },
    {
      title: "Total Designs",
      value: selectedDesign === 'all' ? "45" : "1",
      description: `+${selectedDesignData.metrics[duration].value}% ${getTimeDescription(duration)}`,
      icon: FileUp,
      chartData: generateMockData(duration, selectedDesign),
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
