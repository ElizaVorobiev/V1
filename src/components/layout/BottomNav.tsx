import {
  Home,
  PlusSquare,
  Settings as SettingsIcon,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Feed", path: "/" },
    { icon: PlusSquare, label: "Update", path: "/update" },
    { icon: SettingsIcon, label: "Settings", path: "/settings" },
    { icon: Users, label: "My Groups", path: "/groups" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t h-16 px-4 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center space-y-1 ${isActive ? "text-primary" : "text-muted-foreground"}`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
