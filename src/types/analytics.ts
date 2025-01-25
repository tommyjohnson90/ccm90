export interface Metric {
  type: 'revenue' | 'views' | 'purchases';
  value: number;
}

export interface DesignMetrics {
  '7d': Metric;
  '30d': Metric;
  '90d': Metric;
  '1y': Metric;
}

export interface Design {
  id: string;
  name: string;
  totalPurchases: number;
  metrics: DesignMetrics;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface StatCard {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType;
  chartData: ChartDataPoint[];
}