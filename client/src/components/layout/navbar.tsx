import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, Crown, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/games", label: "GAMES" },
    { href: "/spin-wheel", label: "SPIN WHEEL" },
    { href: "/about", label: "ABOUT" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" data-testid="logo-link">
            <div className="flex items-center space-x-2 cursor-pointer">
              <Crown className="text-primary text-2xl" />
              <span className="text-xl font-serif font-bold text-primary">Ashok Gaming</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`nav-link-${item.label.toLowerCase().replace(' ', '-')}`}>
                <span
                  className={`text-foreground hover:text-primary transition-colors duration-200 font-medium cursor-pointer ${
                    location === item.href ? "text-primary" : ""
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/vault" data-testid="nav-link-vault">
              <span
                className={`text-foreground hover:text-primary transition-colors duration-200 font-medium cursor-pointer ${
                  location === "/vault" ? "text-primary" : ""
                }`}
              >
                VAULT
              </span>
            </Link>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user.username}</span>
                    {user.role === 'admin' && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                        Admin
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <Crown className="h-4 w-4 mr-2" />
                        Admin Portal
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-foreground hover:text-primary" data-testid="button-login">
                    LOG IN
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-primary text-primary-foreground hover:bg-accent" data-testid="button-signup">
                    SIGN UP
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background border-border">
              <div className="flex flex-col space-y-6 mt-8">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} data-testid={`mobile-nav-link-${item.label.toLowerCase().replace(' ', '-')}`}>
                    <span
                      className={`text-left text-foreground hover:text-primary py-3 text-lg font-medium cursor-pointer block ${
                        location === item.href ? "text-primary" : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </span>
                  </Link>
                ))}
                <div className="pt-6 space-y-3">
                  <Button variant="ghost" className="w-full text-foreground hover:text-primary" data-testid="mobile-button-login">
                    LOG IN
                  </Button>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-accent" data-testid="mobile-button-signup">
                    SIGN UP
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
