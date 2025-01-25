import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatCard as StatCardType } from "@/types/analytics";
import { AnalyticsChart } from "./AnalyticsChart";

interface StatCardProps {
  stat: StatCardType;
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
        <stat.icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stat.value}</div>
        <p className="text-xs text-muted-foreground">{stat.description}</p>
        <div className="h-[80px] mt-4">
          <AnalyticsChart data={stat.chartData} />
        </div>
      </CardContent>
    </Card>
  );
}