import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Extend Window type for Google Identity Services
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: object) => void;
          renderButton: (element: HTMLElement, config: object) => void;
          prompt: () => void;
        };
      };
    };
  }
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);

  // Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Handle Google credential response
  const handleGoogleCredential = async (response: { credential: string }) => {
    setIsLoading(true);
    try {
      const res = await api.post('/auth/google', { credential: response.credential });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success("Welcome! Signed in with Google 🎉");
      onClose();
      navigate('/dashboard');
      window.location.reload();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Google sign-in failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize Google Identity Services when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const initGoogle = () => {
      if (!window.google || !googleButtonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleCredential,
      });

      // Render the official Google branded button
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        type: "standard",
        shape: "rectangular",
        theme: "outline",
        text: "signin_with",
        size: "large",
        logo_alignment: "center",
        width: googleButtonRef.current.offsetWidth || 380,
      });
    };

    // Wait for GSI script to load if it hasn't yet
    if (window.google) {
      initGoogle();
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          clearInterval(interval);
          initGoogle();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isOpen, activeTab]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id.replace('reg-', '')]: e.target.value });
  };

  const handleAuth = async (isRegister: boolean) => {
    setIsLoading(true);
    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const payload = isRegister ? formData : { email: formData.email, password: formData.password };

      const res = await api.post(endpoint, payload);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      toast.success(isRegister ? "Account created successfully!" : "Welcome back!");
      onClose();

      navigate('/dashboard');
      window.location.reload();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md border-none p-0 overflow-hidden bg-white/80 backdrop-blur-2xl shadow-2xl rounded-[2rem]">
        <div className="p-6 md:p-8">
          <DialogHeader className="mb-4 text-center">
            <div className="mx-auto w-10 h-10 rounded-full bg-black flex items-center justify-center text-white mb-2 shadow-lg">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <DialogTitle className="text-2xl font-serif">Welcome to Ethereal</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              Join our community of lovers and creators.
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 bg-neutral-100/50 p-1 rounded-full h-10">
              <TabsTrigger value="login" className="rounded-full data-[active]:bg-white data-[active]:shadow-sm text-[14px]">Sign In</TabsTrigger>
              <TabsTrigger value="register" className="rounded-full data-[active]:bg-white data-[active]:shadow-sm text-[14px]">Join Now</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="login" className="space-y-3 outline-none">
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-medium ml-1">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className="h-10 rounded-xl border-neutral-200 bg-white/50 focus:bg-white transition-all text-sm"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center ml-1">
                        <Label htmlFor="password" className="text-xs font-medium">Password</Label>
                        <button className="text-[10px] text-neutral-500 hover:text-black">Forgot password?</button>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        className="h-10 rounded-xl border-neutral-200 bg-white/50 focus:bg-white transition-all text-sm"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <Button
                      onClick={() => handleAuth(false)}
                      disabled={isLoading}
                      className="w-full h-10 rounded-xl bg-black text-white hover:bg-neutral-800 transition-all shadow-lg shadow-black/5 mt-1 text-sm"
                    >
                      {isLoading ? "Signing in..." : "Enter Ethereal"}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="register" className="space-y-3 outline-none">
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-xs font-medium ml-1">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Katherine Pierce"
                        className="h-10 rounded-xl border-neutral-200 bg-white/50 focus:bg-white transition-all text-sm"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="reg-email" className="text-xs font-medium ml-1">Email Address</Label>
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="name@example.com"
                        className="h-10 rounded-xl border-neutral-200 bg-white/50 focus:bg-white transition-all text-sm"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="reg-password" className="text-xs font-medium ml-1">Password</Label>
                      <Input
                        id="reg-password"
                        type="password"
                        className="h-10 rounded-xl border-neutral-200 bg-white/50 focus:bg-white transition-all text-sm"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <Button
                      onClick={() => handleAuth(true)}
                      disabled={isLoading}
                      className="w-full h-10 rounded-xl bg-black text-white hover:bg-neutral-800 transition-all shadow-lg shadow-black/5 mt-1 text-sm"
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-neutral-200"></span>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-medium">
              <span className="bg-white px-2 text-muted-foreground whitespace-nowrap">Or continue with</span>
            </div>
          </div>

          {/* Google Sign-In Button rendered by Google Identity Services SDK */}
          <div className="flex justify-center w-full overflow-hidden rounded-xl">
            <div ref={googleButtonRef} className="w-full" />
          </div>

          <p className="mt-4 text-center text-[10px] text-muted-foreground leading-relaxed">
            By continuing, you agree to our <button className="underline hover:text-black">Terms</button> and <button className="underline hover:text-black">Privacy</button>.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
