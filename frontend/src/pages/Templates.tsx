import { useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Filter, Eye, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";

const templates = [
  {
    id: "classic",
    name: "Classic Elegant",
    description: "Time-honored serif fonts with sophisticated gold accents and traditional layout.",
    img: "/images/1.jpg",
    tags: ["Serif", "Gold", "Traditional"],
    color: "bg-amber-50"
  },
  {
    id: "minimal",
    name: "Modern Minimal",
    description: "Stripped-back aesthetics with bold typography and expansive white space.",
    img: "/images/2.jpg",
    tags: ["Sans-Serif", "Clean", "Contemporary"],
    color: "bg-neutral-50"
  },
  {
    id: "floral",
    name: "Floral Romantic",
    description: "Soft pastel palettes adorned with delicate hand-drawn botanical illustrations.",
    img: "/images/3.jpg",
    tags: ["Serif", "Pink", "Organic"],
    color: "bg-rose-50"
  },
  {
    id: "luxury",
    name: "Dark Luxury",
    description: "High-contrast cinematic aesthetic with deep obsidian tones and metallic highlights.",
    img: "/images/88.jpg",
    tags: ["Bold", "Cinematic", "Exclusive"],
    color: "bg-neutral-900"
  }
];

export const templateDemoData: Record<string, any> = {
  classic: {
    brideName: "Amelia Thorne",
    groomName: "Jameson Grey",
    date: "2026-06-12",
    time: "16:00",
    venueName: "The Grand Rose Estate",
    address: "123 Lavender Lane, Napa Valley, CA 94558",
    message: "We are joyfully announcing our marriage and would be honored if you could join us for this special celebration of love and commitment.",
    template: "classic"
  },
  minimal: {
    brideName: "Sarah",
    groomName: "Michael",
    date: "2026-09-18",
    time: "15:00",
    venueName: "The Modern Art Gallery",
    address: "450 Abstract Avenue, New York, NY 10012",
    message: "Join us as we celebrate our love.",
    template: "minimal"
  },
  floral: {
    brideName: "Lily Evans",
    groomName: "Jack Thompson",
    date: "2026-05-24",
    time: "14:30",
    venueName: "Botanical Gardens",
    address: "88 Floral Way, Springville, FL 32004",
    message: "Surrounded by nature and the people we love, we will be exchanging our vows.",
    template: "floral"
  },
  luxury: {
    brideName: "Victoria",
    groomName: "Sebastian",
    date: "2026-11-05",
    time: "19:00",
    venueName: "The Obsidian Palace",
    address: "1 Royal Boulevard, Paris",
    message: "Request the honor of your presence at their black-tie wedding celebration.",
    template: "luxury"
  }
};

export default function Templates() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <header className="py-16 px-6 md:px-12 bg-white border-b border-neutral-100 relative overflow-hidden">
          <div className="container mx-auto relative z-10">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-7xl font-serif mb-6"
            >
              Exquisite Templates
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground max-w-2xl text-base md:text-xl font-light leading-relaxed"
            >
              Every wedding is a unique story. Find the perfect design to announce your celebration of love.
            </motion.p>
          </div>
          {/* Subtle background glow to keep it premium but contained */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        </header>

        <section className="px-6 md:px-12 py-12">
          <div className="container mx-auto">
          {/* Filters - Simplified for Demo */}
          <div className="flex flex-col sm:flex-row justify-between items-start mb-12 gap-8">
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="rounded-full px-8 py-6 border-black bg-black text-white shadow-xl">All Styles</Button>
              <Button variant="ghost" className="rounded-full px-8 py-6 text-neutral-500 hover:text-black transition-all">Minimal</Button>
              <Button variant="ghost" className="rounded-full px-8 py-6 text-neutral-500 hover:text-black transition-all">Classic</Button>
              <Button variant="ghost" className="rounded-full px-8 py-6 text-neutral-500 hover:text-black transition-all">Floral</Button>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                placeholder="Search templates..."
                className="w-full bg-white rounded-full py-2.5 pl-10 pr-4 border-2 border-black focus:outline-none focus:ring-0 transition-all text-[16px] placeholder:text-neutral-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {templates.map((template, i) => (
              <motion.div 
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] shadow-xl border border-neutral-200 mb-6 bg-white">
                  <img 
                    src={template.img} 
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      onClick={() => window.open(`/preview/${template.id}`, '_blank')}
                      className="rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 px-8 shadow-lg transition-all"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Live Preview
                    </Button>
                  </div>
                </div>
                
                <div className="px-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
                    <h3 className="text-2xl font-serif text-neutral-900">{template.name}</h3>
                    <div className="flex gap-2 flex-wrap">
                      {template.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="border-black text-black px-3 py-1 text-[16px] uppercase font-bold tracking-wider">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {template.description}
                  </p>
                  <Button asChild size="lg" className="w-fit px-10 rounded-full bg-black text-white hover:bg-neutral-800 transition-colors">
                    <Link to={`/create?template=${template.id}`}>Use This Template</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
          </div>
        </section>

        {/* Feature Banner */}
        <section className="px-6 md:px-12 py-16 overflow-hidden">
          <div className="container mx-auto">
          <div className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden text-center text-white min-h-[400px] md:h-[450px] flex items-center justify-center shadow-2xl py-12 md:py-0">
              {/* Background Image */}
              <img 
                src="/images/88.jpg" 
                className="absolute inset-0 w-full h-full object-cover" 
                alt="Bespoke Design" 
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 z-0" />

             <div className="relative z-10 max-w-2xl mx-auto px-6">
               <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">Can't find exactly what you're looking for?</h2>
               <p className="text-white/70 mb-10 text-lg">Our designers are constantly crafting new collections. Contact us for custom bespoke design services.</p>
               <Button variant="outline" size="lg" className="rounded-full bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/20 px-10 h-16 text-lg transition-all">
                 Request Custom Design
               </Button>
             </div>
             {/* Decorative blobs */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/10 blur-3xl translate-y-1/2 -translate-x-1/2 rounded-full" />
          </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
