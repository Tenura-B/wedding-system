import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Calendar, MapPin, Camera, Music, Hotel } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
          className="relative z-10 container mx-auto px-6 text-center"
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
      <section className="py-32 px-6 bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-gold text-[16px] tracking-[4px] uppercase font-bold mb-4 block">Collections</span>
              <h2 className="text-4xl md:text-6xl font-serif leading-tight">Featured Designs</h2>
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

      {/* 🧩 SECTION 2: HOW IT WORKS */}
      <section className="py-32 px-6 bg-cream border-y border-gold/10">
        <div className="container mx-auto">
          <div className="text-center mb-24">
            <span className="text-gold text-[16px] tracking-[4px] uppercase font-bold mb-4 block">Atelier Process</span>
            <h2 className="text-4xl md:text-5xl font-serif">Three Steps to Perfection</h2>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent z-0" />
            
            {[
              { icon: <Heart className="w-6 h-6" />, title: "Choose Template", desc: "Select a curated design that matches your wedding theme." },
              { icon: <Calendar className="w-6 h-6" />, title: "Enter Details", desc: "Personalize with your names, date, venue, and a special message." },
              { icon: <MapPin className="w-6 h-6" />, title: "Share Invitation", desc: "Instantly share your high-end digital invite with your guests." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-full glass-morphism border-gold/20 flex items-center justify-center mb-8 bg-white transition-transform duration-500 group-hover:-rotate-12 shadow-xl group-hover:text-gold">
                  {step.icon}
                </div>
                <h4 className="text-xl font-serif mb-4">{step.title}</h4>
                <p className="text-[16px] text-ink/60 font-light leading-relaxed px-4">{step.desc}</p>
                <div className="mt-8 text-gold font-serif text-5xl font-black italic select-none">0{i+1}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🧩 SECTION 3: VENDOR SHOWCASE */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-gold text-[16px] tracking-[4px] uppercase font-bold mb-4 block">Marketplace</span>
              <h2 className="text-4xl md:text-6xl font-serif leading-tight">Trusted Vendors</h2>
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

      <Footer />
    </div>
  );
}



