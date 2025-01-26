import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface InventoryLayoutProps {
  children: ReactNode;
}

export function InventoryLayout({ children }: InventoryLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-6 bg-secondary/20">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}