import { useState } from "react";
import { Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onSearchChange: (query: string) => void;
}

export function Header({ onSearchChange }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border z-30">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"></i>
              <Input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring search-glow"
                data-testid="input-search"
              />
            </div>
          </div>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4 ml-6">
            <Button
              variant="ghost"
              size="icon"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-favorites"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-profile"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-login"
            >
              Log In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
