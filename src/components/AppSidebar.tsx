import { Home, TrendingUp, Settings, User, PlusSquare, Search, Package } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const getMenuItems = (userType: string) => {
  const baseItems = [
    { title: "Dashboard", icon: Home, url: "/" },
    { title: "Trending", icon: TrendingUp, url: "/trending" },
    { title: "Create", icon: PlusSquare, url: "/create" },
    { title: "Explore", icon: Search, url: "/explore" },
    { title: "Profile", icon: User, url: "/profile" },
    { title: "Settings", icon: Settings, url: "/settings" },
  ];

  if (userType === 'maker') {
    baseItems.splice(3, 0, { title: "Inventory", icon: Package, url: "/inventory" });
  }

  return baseItems;
};

export function AppSidebar() {
  const userType = localStorage.getItem('userType') || 'customer';
  const menuItems = getMenuItems(userType);

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4">
          <h2 className="text-2xl font-bold text-primary">CCM</h2>
          <p className="text-sm text-gray-500">Community Chain</p>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}