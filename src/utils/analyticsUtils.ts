import { Design, ChartDataPoint } from "@/types/analytics";

export const getTimeDescription = (duration: string) => {
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

export const generateMockData = (duration: string, designId: string): ChartDataPoint[] => {
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

export const getMetricDisplay = (design: Design, duration: string) => {
  const metric = design.metrics[duration as keyof typeof design.metrics];
  const isPositive = metric.value > 0;
  const textColorClass = isPositive ? 'text-green-600' : 'text-red-600';
  const metricType = metric.type.charAt(0).toUpperCase() + metric.type.slice(1);
  return {
    text: `${metricType} ${isPositive ? '+' : ''}${metric.value}%`,
    colorClass: textColorClass,
    purchases: design.totalPurchases
  };
};