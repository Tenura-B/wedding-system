import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Calendar, MapPin, Camera, Music, Hotel } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  const [videoIndex, setVideoIndex] = useState(0);
  const backgroundVideos = [
    "/images/im1.mp4",
    "/images/im2.mp4",
    "/images/im3.mp4"
  ];

  const handleVideoEnd = () => {
    setVideoIndex((prev) => (prev + 1) % backgroundVideos.length);
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1, 
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <Navbar />
      
      {/* 🎯 HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Video Loop with Overlay */}
        <div className="absolute inset-0 z-0">
          <video 
            src={backgroundVideos[videoIndex]}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]" />
        </div>

        <motion.div 
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 container mx-auto px-6 md:px-12 text-center"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-[1.1] max-w-5xl mx-auto"
          >
            Craft Your Perfect <br /> 
            <span className="italic font-normal">Wedding Invitation</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Design breathtaking digital invitations that capture the essence of your unique love story. Elegant, modern, and shared with a single click.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button asChild size="lg" className="btn-ethereal bg-white text-ink hover:bg-gold hover:text-white h-16 px-10 shadow-2xl">
              <Link to="/create">Create Invitation</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white h-16 px-10 bg-transparent">
              <Link to="/templates">Explore Templates</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* 🧩 SECTION 1: FEATURED TEMPLATES */}
      <section className="pt-32 pb-16 px-6 md:px-12 bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 md:mb-20 gap-8 text-center md:text-left">
            <div className="max-w-2xl px-4">
              <span className="text-gold text-[16px] tracking-[4px] uppercase font-bold mb-4 block">Collections</span>
              <h2 className="text-3xl md:text-6xl font-serif leading-tight">Featured Designs</h2>
            </div>
            <Link to="/templates" className="group flex items-center gap-2 text-ink/40 hover:text-gold transition-colors text-[16px] uppercase tracking-widest font-bold">
              View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                name: "Classic Elegant", 
                desc: "Serif typography & gold leaf elements", 
                img: "/images/1.jpg" 
              },
              { 
                name: "Floral Romantic", 
                desc: "Hand-painted botanical illustrations", 
                img: "/images/3.jpg" 
              },
              { 
                name: "Modern Minimal", 
                desc: "Clean lines & architectural spacing", 
                img: "/images/2.jpg" 
              }
            ].map((template, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[40px] mb-8 shadow-sm">
                  <img 
                    src={template.img} 
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <Button asChild variant="secondary" className="btn-ethereal bg-white text-ink hover:bg-gold hover:text-white">
                      <Link to="/create">Use Template</Link>
                    </Button>
                  </div>
                </div>
                <h3 className="text-2xl font-serif mb-2">{template.name}</h3>
                <p className="text-[16px] text-ink/40 font-light italic">{template.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🧩 SECTION 2: OUR PROCESS */}
      <section className="pt-16 pb-32 px-6 md:px-12 bg-white relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFF5EC] blur-[140px] rounded-full opacity-60 pointer-events-none" />
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            {/* Left Content */}
            <div className="lg:sticky lg:top-32">
              <span className="text-gold text-[16px] tracking-[4px] uppercase font-bold mb-4 block">Our Process</span>
              <h2 className="text-3xl md:text-6xl font-serif leading-tight mb-8">
                Crafting Your <br /> Perfect Celebration
              </h2>
              <p className="text-lg text-neutral-400 font-medium leading-relaxed mb-12 max-w-md">
                Experience a seamless journey from template selection to guest management with our high-end digital invitation suite.
              </p>
            </div>

            {/* Right Cards */}
            <div className="space-y-8">
              {[
                { 
                  num: "1", 
                  title: "Curated Selection", 
                  desc: "Browse our hand-picked collection of elegant, responsive invitation templates." 
                },
                { 
                  num: "2", 
                  title: "Artistic Customization", 
                  desc: "Infuse your story with personal photos, elegant typography, and wedding venue details." 
                },
                { 
                  num: "3", 
                  title: "Seamless Launch", 
                  desc: "Publish your invite instantly with a unique link and integrated RSVP guest management tools.",
                  img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group bg-white border-2 border-black rounded-[2rem] p-8 md:p-10 shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all duration-500 overflow-hidden"
                >
                  <div className="flex items-baseline gap-6 mb-2">
                    <span className="text-2xl font-black text-[#1F1F1F] leading-none">{step.num}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#1F1F1F] tracking-tight">{step.title}</h3>
                  </div>

                  {step.img && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      whileHover={{ height: "auto", opacity: 1, marginTop: "2rem" }}
                      className="overflow-hidden rounded-[1.5rem] border-2 border-black transition-all duration-700 ease-in-out"
                    >
                      <img 
                        src={step.img} 
                        alt={step.title} 
                        className="w-full h-56 object-cover"
                      />
                    </motion.div>
                  )}

                  <p className="text-lg text-neutral-400 font-medium leading-relaxed pt-2 group-hover:text-[#1F1F1F] transition-colors">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🧩 SECTION 3: VENDOR SHOWCASE */}
      <section className="py-32 px-6 md:px-12 bg-white overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 md:mb-20 gap-8 text-center md:text-left">
            <div className="max-w-2xl px-4">
              <span className="text-gold text-[16px] tracking-[4px] uppercase font-bold mb-4 block">Marketplace</span>
              <h2 className="text-3xl md:text-6xl font-serif leading-tight">Trusted Vendors</h2>
            </div>
            <Link to="/vendors" className="group flex items-center gap-2 text-ink/40 hover:text-gold transition-colors text-[16px] uppercase tracking-widest font-bold">
              Explore All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Hotels & Venues", icon: <Hotel className="w-6 h-6" />, img: "/images/venue.webp" },
              { title: "Photography", icon: <Camera className="w-6 h-6" />, img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=2070&auto=format&fit=crop" },
              { title: "Music & Bands", icon: <Music className="h-6 w-6" />, img: "/images/music.png" }
            ].map((vendor, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative h-[500px] overflow-hidden rounded-[40px] flex flex-col justify-end p-10 cursor-pointer shadow-xl"
              >
                <img 
                  src={vendor.img} 
                  alt={vendor.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent transition-opacity duration-500 opacity-90 group-hover:opacity-100" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-6 text-white group-hover:bg-gold transition-colors">
                    {vendor.icon}
                  </div>
                  <h3 className="text-3xl font-serif text-white mb-6 leading-tight">{vendor.title}</h3>
                  <Button asChild variant="link" className="text-rose p-0 h-auto font-bold uppercase tracking-widest text-[16px] group-hover:text-white transition-colors">
                    <Link to="/vendors">View Profile</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🧩 SECTION 4: TESTIMONIALS */}
      <Testimonials />

      <Footer />
    </div>
  );
}



