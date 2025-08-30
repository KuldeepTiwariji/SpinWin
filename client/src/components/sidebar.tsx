
import React from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { navigationItems } from "@/lib/mockData";

function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-4 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center">SpinWin</h1>
      </div>
      
      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <a
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200",
                location === item.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <i className={`${item.icon} w-5 h-5`}></i>
              <span>{item.name}</span>
            </a>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export { Sidebar };
export default Sidebar;
