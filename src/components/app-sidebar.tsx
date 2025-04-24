
import { 
  BarChart2, 
  Home, 
  Search, 
  Settings, 
  Briefcase, 
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// Navigation menu items
const navItems = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/",
  },
  {
    title: "Companies",
    icon: Briefcase,
    path: "/companies",
  },
  {
    title: "Deal Search",
    icon: Search,
    path: "/deals",
  },
  {
    title: "Pipeline",
    icon: BarChart2,
    path: "/pipeline",
  },
  {
    title: "Admin",
    icon: Settings,
    path: "/admin",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="py-6 px-4">
        <div className="flex items-center">
          <div className="mr-2 rounded-md bg-vc-blue p-1 text-white">
            <ChevronRight size={20} />
          </div>
          <h1 className="text-lg font-bold text-white">Venture Sage</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className={({ isActive }) => 
                        cn("flex items-center gap-4", {
                          "bg-sidebar-accent text-white font-medium": isActive
                        })
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 rounded-full bg-vc-blue-light"></div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Alex Morgan</p>
            <p className="text-xs text-gray-400">Partner</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
