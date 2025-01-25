import { DollarSign, Package, Star, TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { StatCard } from "./analytics/StatCard";
import { generateMockData, getTimeDescription } from "@/utils/analyticsUtils";
import { ChartDataPoint } from "@/types/analytics";

export function MakerAnalytics() {
  const [duration, setDuration] = useState("30d");

  const statsCards = [
    {
      title: "Total Makes",
      value: "156",
      description: `+15.3% ${getTimeDescription(duration)}`,
      icon: Package,
      chartData: generateMockData(duration, 'maker-makes') as ChartDataPoint[],
    },
    {
      title: "Average Review",
      value: "4.8",
      description: `+0.2 ${getTimeDescription(duration)}`,
      icon: Star,
      chartData: generateMockData(duration, 'maker-reviews') as ChartDataPoint[],
    },
    {
      title: "Revenue",
      value: "$2,340",
      description: `+22.4% ${getTimeDescription(duration)}`,
      icon: TrendingUp,
      chartData: generateMockData(duration, 'maker-revenue') as ChartDataPoint[],
    },
    {
      title: "Profit",
      value: "$890",
      description: `+18.7% ${getTimeDescription(duration)}`,
      icon: DollarSign,
      chartData: generateMockData(duration, 'maker-profit') as ChartDataPoint[],
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
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>
    </div>
  );
}