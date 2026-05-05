import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface ComingSoonProps {
  templateName: string;
}

export default function ComingSoonTemplate({ templateName }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center font-serif">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md space-y-8"
      >
        <div className="w-20 h-20 bg-[#991B1B]/10 rounded-full flex items-center justify-center mx-auto text-[#991B1B]">
          <Sparkles className="w-10 h-10" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight">
            Coming Soon
          </h1>
          <p className="text-lg text-neutral-500 font-light italic">
            The <span className="font-bold text-[#991B1B]">{templateName}</span> template is currently under development. 
            We're crafting something truly special for you.
          </p>
        </div>
        <div className="pt-4">
          <Button asChild className="rounded-full bg-neutral-900 text-white hover:bg-neutral-800 px-8 h-12 transition-all">
            <Link to="/templates">Explore Other Templates</Link>
          </Button>
        </div>
      </motion.div>
      
      {/* Decorative background elements */}
      <div className="fixed top-0 right-0 w-64 h-64 bg-[#991B1B]/5 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full" />
      <div className="fixed bottom-0 left-0 w-64 h-64 bg-[#991B1B]/5 blur-3xl translate-y-1/2 -translate-x-1/2 rounded-full" />
    </div>
  );
}
