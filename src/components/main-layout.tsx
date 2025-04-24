
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { MainHeader } from "@/components/main-header";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

const getPageTitle = (pathname: string): string => {
  switch(pathname) {
    case "/":
      return "Portfolio Dashboard";
    case "/companies":
      return "Company Details";
    case "/deals":
      return "Deal Search";
    case "/pipeline":
      return "Diligence Pipeline";
    case "/admin":
      return "Admin & Integrations";
    default:
      if (pathname.startsWith("/companies/")) {
        return "Company Details";
      }
      return "Venture Sage";
  }
};

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const title = getPageTitle(location.pathname);

  return (
    <SidebarProvider>
      <div className="app-container">
        <AppSidebar />
        <div className="main-content flex flex-col">
          <div className="flex items-center px-4 py-2 lg:hidden">
            <SidebarTrigger />
          </div>
          <MainHeader title={title} />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
