import { Link, useLocation } from "wouter";
import { gameCategories, navigationItems } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="fixed left-0 top-0 h-full w-20 lg:w-64 bg-card border-r border-border flex flex-col z-40">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <i className="fas fa-gamepad text-primary-foreground text-lg"></i>
          </div>
          <span className="hidden lg:block text-xl font-bold gradient-text">GameHub</span>
        </div>
      </div>
      
      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-lg hover:bg-accent group transition-colors",
                location === item.href && "bg-accent"
              )}
              data-testid={`nav-${item.name.toLowerCase()}`}
            >
              <i className={`${item.icon} sidebar-icon text-muted-foreground group-hover:text-primary`}></i>
              <span className="hidden lg:block text-sm font-medium group-hover:text-foreground">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
        
        {/* Categories */}
        <div className="mt-8">
          <h3 className="hidden lg:block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Categories
          </h3>
          <div className="space-y-2">
            {gameCategories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.name.toLowerCase()}`}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent group transition-colors"
                data-testid={`category-${category.name.toLowerCase()}`}
              >
                <i className={`${category.icon} sidebar-icon text-muted-foreground group-hover:text-primary`}></i>
                <span className="hidden lg:block text-sm font-medium group-hover:text-foreground">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
