import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DesignCard } from "@/components/DesignCard";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import { AdminAnalytics } from "@/components/AdminAnalytics";
import { DesignerAnalytics } from "@/components/DesignerAnalytics";
import { MakerAnalytics } from "@/components/MakerAnalytics";

const trendingDesigns = [
  {
    title: "Modular Storage System",
    author: "MakerPro",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    rating: 4.8,
    purchases: 325,
  },
  {
    title: "Smart Home Controller",
    author: "TechCreator",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    rating: 4.6,
    purchases: 189,
  },
  {
    title: "Ergonomic Laptop Stand",
    author: "DesignMaster",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    rating: 4.9,
    purchases: 412,
  },
  {
    title: "Desktop Organizer",
    author: "WorkspaceGuru",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    rating: 4.7,
    purchases: 267,
  },
];

const Index = () => {
  const userType = localStorage.getItem('userType') || 'customer';
  const isAdmin = userType === 'admin';
  const isDesigner = userType === 'designer';
  const isMaker = userType === 'maker';

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 bg-secondary/20">
          <header className="flex justify-between items-center p-4 bg-white border-b">
            <SidebarTrigger />
            <Button variant="ghost" className="flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              Sign In
            </Button>
          </header>
          <div className="container py-8">
            {isAdmin && (
              <div className="mb-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Analytics</h1>
                <AdminAnalytics />
              </div>
            )}
            {isDesigner && (
              <div className="mb-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Designer Dashboard</h1>
                <DesignerAnalytics />
              </div>
            )}
            {isMaker && (
              <div className="mb-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Maker Dashboard</h1>
                <MakerAnalytics />
              </div>
            )}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Trending Designs</h1>
                <p className="text-gray-500">Discover popular community creations</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingDesigns.map((design, index) => (
                <DesignCard key={index} {...design} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
