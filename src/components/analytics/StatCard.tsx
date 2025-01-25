import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { AnalyticsChart } from "./AnalyticsChart";

interface StatCardProps {
  stat: {
    title: string;
    value: string;
    description: string;
    icon: LucideIcon;
    chartData: number[];
  };
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
          <h4 className="text-2xl font-bold">{stat.value}</h4>
          <p className="text-sm text-gray-600">{stat.description}</p>
        </div>
        <stat.icon className="h-8 w-8 text-gray-400" />
      </div>
      <AnalyticsChart data={stat.chartData} />
    </Card>
  );
}