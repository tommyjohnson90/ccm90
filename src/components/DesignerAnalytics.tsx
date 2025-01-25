import { DollarSign, Eye, Hammer, FileUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { StatCard } from "./analytics/StatCard";
import { generateMockData, getTimeDescription, getMetricDisplay } from "@/utils/analyticsUtils";
import { Design } from "@/types/analytics";

const mockDesigns: Design[] = [
  { 
    id: 'all', 
    name: 'All Designs', 
    totalPurchases: 1193,
    metrics: {
      '7d': { type: 'revenue' as const, value: 15.3 },
      '30d': { type: 'views' as const, value: 22.4 },
      '90d': { type: 'revenue' as const, value: 18.7 },
      '1y': { type: 'purchases' as const, value: 25.1 }
    }
  },
  { 
    id: 'design1', 
    name: 'Modular Storage System', 
    totalPurchases: 325,
    metrics: {
      '7d': { type: 'views' as const, value: -5.2 },
      '30d': { type: 'revenue' as const, value: 12.4 },
      '90d': { type: 'purchases' as const, value: 8.7 },
      '1y': { type: 'revenue' as const, value: 15.1 }
    }
  },
  { 
    id: 'design2', 
    name: 'Smart Home Controller', 
    totalPurchases: 189,
    metrics: {
      '7d': { type: 'revenue' as const, value: 8.3 },
      '30d': { type: 'views' as const, value: -3.4 },
      '90d': { type: 'purchases' as const, value: 10.7 },
      '1y': { type: 'views' as const, value: 18.1 }
    }
  },
  { 
    id: 'design3', 
    name: 'Ergonomic Laptop Stand', 
    totalPurchases: 412,
    metrics: {
      '7d': { type: 'purchases' as const, value: 12.3 },
      '30d': { type: 'revenue' as const, value: 15.4 },
      '90d': { type: 'views' as const, value: -2.7 },
      '1y': { type: 'revenue' as const, value: 20.1 }
    }
  },
  { 
    id: 'design4', 
    name: 'Desktop Organizer', 
    totalPurchases: 267,
    metrics: {
      '7d': { type: 'views' as const, value: 9.3 },
      '30d': { type: 'purchases' as const, value: -4.4 },
      '90d': { type: 'revenue' as const, value: 11.7 },
      '1y': { type: 'purchases' as const, value: 16.1 }
    }
  },
];

export function DesignerAnalytics() {
  const [duration, setDuration] = useState("30d");
  const [selectedDesign, setSelectedDesign] = useState("all");

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
                <div className="flex justify-between items-center w-full min-w-[300px]">
                  <span className="truncate mr-4">{design.name}</span>
                  <span className={getMetricDisplay(design, duration, true).colorClass}>
                    {getMetricDisplay(design, duration, true).text}
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
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>
    </div>
  );
}
