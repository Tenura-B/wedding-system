import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import AuthModal from "../auth/AuthModal";

interface NavbarProps {
  isDark?: boolean;
}

export default function Navbar({ isDark }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Templates", href: "/templates" },
    { name: "Vendors", href: "/vendors" },
    { name: "Journal", href: "#" },
  ];

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 py-5 md:py-6 ${
    isScrolled 
      ? (isDark ? "bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-sm" : "bg-white/80 backdrop-blur-2xl border-b border-white/40 shadow-sm")
      : "bg-transparent"
  }`;

  const linkClasses = (href: string) => `text-[16px] uppercase tracking-[2px] font-medium transition-all hover:text-gold ${
    location.pathname === href ? "text-gold" : (isDark ? "text-white" : "text-ink")
  }`;

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto max-w-[1440px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className={`text-2xl font-serif tracking-[4px] uppercase font-light transition-colors ${isDark ? 'text-white' : 'text-ink'}`}>
            Ethereal
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.href} className={linkClasses(link.href)}>
              {link.name}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-6">
              <Link to="/dashboard" className={linkClasses("/dashboard")}>
                Dashboard
              </Link>
              <Button 
                onClick={handleSignOut}
                variant="outline"
                size="lg" 
                className={`rounded-full shadow-sm text-[16px] uppercase tracking-wider px-8 cursor-pointer ${isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-ink/10 text-ink hover:bg-neutral-50'}`}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => setIsAuthModalOpen(true)}
              size="lg" 
              className="btn-ethereal bg-ink text-white hover:bg-ink/90 shadow-lg text-[16px] uppercase tracking-wider px-8 cursor-pointer"
            >
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`md:hidden p-2 ${isDark ? 'text-white' : 'text-ink'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="md:hidden absolute top-full left-6 right-6 mt-4 glass-morphism rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className="text-[16px] uppercase tracking-[2px] font-medium text-ink px-2 py-2 border-b border-ink/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-[16px] uppercase tracking-[2px] font-medium text-ink px-2 py-2 border-b border-ink/5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button 
                    className="btn-ethereal w-full bg-ink text-white"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button 
                  className="btn-ethereal w-full bg-ink text-white hover:bg-ink/90 h-12"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                >
                  Sign In
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </nav>
  );
}

