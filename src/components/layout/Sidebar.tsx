import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Truck,
  Wrench,
  Boxes,
  Settings,
  FileOutput,
  Users,
  BarChart2,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Tableau de bord", href: "/", icon: LayoutDashboard },
  { name: "Équipements", href: "/equipment", icon: Package },
  { name: "Fournisseurs", href: "/suppliers", icon: Truck },
  { name: "Maintenance", href: "/maintenance", icon: Wrench },
  { name: "Inventaire", href: "/inventory", icon: Boxes },
  { name: "Décharges", href: "/discharge", icon: FileOutput },
  { name: "Personnel", href: "/staff", icon: Users },
  { name: "Statistiques", href: "/statistics", icon: BarChart2 },
  { name: "Calendrier", href: "/calendar", icon: Calendar },
  { name: "Paramètres", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 bg-white border-r border-gray-200 w-64">
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Symphony</h1>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  location.pathname === item.href
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    location.pathname === item.href
                      ? "text-gray-900"
                      : "text-gray-400 group-hover:text-gray-900"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};