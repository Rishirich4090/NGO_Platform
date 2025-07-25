import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HopeHandsLogo from "@/components/HopeHandsLogo";
import {
  Menu,
  X,
  Heart,
  Users,
  Phone,
  FileText,
  LogIn,
  UserPlus,
  Shield,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("authToken");
      const role = localStorage.getItem("userRole");
      const email = localStorage.getItem("userEmail");

      setIsLoggedIn(!!token);
      setUserRole(role);
      setUserEmail(email);
      setIsAuthLoading(false);
    };

    // Check on mount and location change
    checkAuthStatus();

    // Listen for storage events (when localStorage changes in other tabs)
    window.addEventListener("storage", checkAuthStatus);

    // Listen for custom auth events (when localStorage changes in same tab)
    window.addEventListener("authChange", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      window.removeEventListener("authChange", checkAuthStatus);
    };
  }, [location]);

  // Base navigation - conditional based on user role
  const getBaseNavigation = () => {
    const baseItems = [
      { name: "Home", href: "/", icon: Heart },
      { name: "About", href: "/about", icon: Users },
      { name: "Projects", href: "/projects", icon: FileText },
    ];

    // Add Donate and Contact only if not admin
    if (userRole !== "admin") {
      baseItems.push(
        { name: "Donate", href: "/donate", icon: Heart },
        { name: "Contact", href: "/contact", icon: Phone },
      );
    }

    return baseItems;
  };

  const baseNavigation = getBaseNavigation();

  // Authentication-based navigation
  const authNavigation = isLoggedIn
    ? userRole === "admin"
      ? [
          { name: "Admin Dashboard", href: "/admin/dashboard", icon: Shield },
          { name: "Profile", href: "/admin/profile", icon: UserPlus },
        ]
      : [{ name: "Profile", href: "/member/dashboard", icon: UserPlus }]
    : [{ name: "Membership", href: "/membership", icon: UserPlus }];

  const fullNavigation = [...baseNavigation, ...authNavigation];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserRole(null);
    setUserEmail(null);

    // Dispatch custom event to notify of auth change
    window.dispatchEvent(new Event("authChange"));

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-theme">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 transition-transform hover:scale-105"
          >
            <HopeHandsLogo size="md" variant="full" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {fullNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-all duration-200 hover:text-primary hover:scale-105 flex items-center space-x-1 ${
                  isActive(item.href)
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                {item.name === "Admin Dashboard" && (
                  <Shield className="h-4 w-4" />
                )}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {!isAuthLoading && !isLoggedIn && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="hover:bg-accent transition-all duration-200"
                >
                  <Link to="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="bg-gradient-yellow-green hover:opacity-90 transition-all duration-200 shadow-theme"
                >
                  <Link to="/membership">Join Us</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="container space-y-1 py-4">
              {fullNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:scale-105 ${
                      isActive(item.href)
                        ? "bg-accent text-accent-foreground font-semibold"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="flex flex-col space-y-2 pt-4 border-t">
                {!isAuthLoading && !isLoggedIn && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="hover:bg-accent transition-all duration-200"
                    >
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="bg-gradient-yellow-green hover:opacity-90 transition-all duration-200 shadow-theme"
                    >
                      <Link to="/membership" onClick={() => setIsMenuOpen(false)}>
                        Join Us
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-gradient-to-br from-accent/20 to-secondary/30">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div className="space-y-3">
              <HopeHandsLogo size="sm" variant="full" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Empowering communities through compassionate action and
                sustainable change. Creating hope, building futures.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-primary">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-primary transition-all duration-200 hover:translate-x-1"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects"
                    className="hover:text-primary transition-all duration-200 hover:translate-x-1"
                  >
                    Our Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to="/membership"
                    className="hover:text-primary transition-all duration-200 hover:translate-x-1"
                  >
                    Become a Member
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-primary">
                Contact Info
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <span className="w-1 h-1 rounded-full bg-primary"></span>
                  <span>info@hopehands.org</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1 h-1 rounded-full bg-primary"></span>
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1 h-1 rounded-full bg-primary"></span>
                  <span>123 Hope Street, City, State 12345</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-primary">
                Stay Updated
              </h4>
              <p className="text-sm text-muted-foreground">
                Subscribe to our newsletter for updates.
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
                />
                <Button
                  size="sm"
                  className="bg-gradient-yellow-green hover:opacity-90 transition-all duration-200 shadow-theme"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-primary/20 pt-6 text-center text-sm text-muted-foreground">
            <p>
              &copy; 2024 HopeHands NGO. All rights reserved. Made with{" "}
              <span className="text-primary">&hearts;</span> for a better world.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
