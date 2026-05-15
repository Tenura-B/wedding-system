import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  MapPin,
  Clock,
  Heart,
  Check,
  Music,
  Camera
} from "lucide-react";
import { format, parseISO, subDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TemplateProps {
  data: any;
  timeLeft: any;
  onRSVP: (rsvpData: any) => Promise<void>;
  isSubmitted: boolean;
}

export default function MinimalTemplate({ data, timeLeft, onRSVP, isSubmitted }: TemplateProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({ name: "", status: "coming", guests: 1, message: "" });

  const agenda = data.agenda?.length > 0 ? data.agenda.map((item: any) => {
    const iconMap: Record<string, any> = { Heart, Music, Calendar, Camera, Clock };
    return {
      ...item,
      icon: iconMap[item.icon] || Heart
    };
  }) : [
    { time: data.time || "04:00 PM", title: "Ceremony Begins", description: "Exchange of vows", icon: Heart },
    { time: "05:30 PM", title: "Cocktail Hour", description: "Drinks and appetizers", icon: Music },
    { time: "07:00 PM", title: "Reception & Dinner", description: "Banquet", icon: Calendar },
    { time: "09:00 PM", title: "Party & Dancing", description: "Celebration till midnight", icon: Camera }
  ];

  const galleryImages = data.gallery?.length > 0 ? data.gallery : [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800",
    "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800"
  ];

  const rsvpByDate = data.rsvpDate 
    ? format(parseISO(data.rsvpDate), 'MMMM d, yyyy')
    : (data.date ? format(subDays(parseISO(data.date), 14), 'MMMM d, yyyy') : 'September 14, 2026');

  const getOrdinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  return (
    <div className="font-sans bg-white text-black">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] } }}
            onClick={() => setIsOpened(true)}
            className="fixed inset-0 z-[100] cursor-pointer overflow-hidden flex flex-col items-center justify-center bg-white"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-xl md:text-2xl font-bold tracking-widest uppercase text-[#593A60] flex flex-col items-center"
            >
              <div className="w-[4px] h-32 bg-[#593A60] mb-4 rounded-full relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-14 bg-[#593A60] rounded-b-full flex items-end justify-center pb-2 shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <span className="mt-4">Tap to Unzip</span>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full flex flex-col items-center bg-white"
          >
            {/* Main Wrapper for Desktop Constraint */}
            <div className="w-full max-w-[1920px] relative bg-white overflow-x-hidden shadow-2xl">
              
              {/* 1. Hero Section */}
              <section className="relative w-full bg-white flex flex-col items-center justify-center min-h-[100dvh] md:min-h-screen overflow-hidden py-12 md:py-0">
                
                <div className="container mx-auto px-4 relative z-20 flex flex-col items-center justify-center h-full">
                  {/* Center Text Area */}
                  <div className="flex flex-col items-center text-center w-full max-w-[400px] md:max-w-[800px] pointer-events-none mb-20 md:mb-0">
                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="text-[24px] sm:text-[28px] md:text-6xl font-black uppercase text-[#31244A] leading-[1.2] tracking-widest mb-6 md:mb-12"
                    >
                      OUR LOVE<br/>STORY BEGINS.
                    </motion.h1>
                    
                    <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-[#80788C] text-sm md:text-2xl leading-relaxed mb-6 md:mb-12 font-light"
                    >
                      We invite you to<br/>celebrate the<br/>wedding of
                    </motion.p>
                    
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-col items-center text-[#31244A]"
                    >
                       <span className="text-[50px] sm:text-[60px] md:text-[120px] leading-none" style={{ fontFamily: "'Dancing Script', cursive" }}>{data.groomName || 'Michael'}</span>
                       <span className="text-3xl md:text-6xl my-2 md:my-4 font-light" style={{ fontFamily: "'Dancing Script', cursive" }}>&amp;</span>
                       <span className="text-[50px] sm:text-[60px] md:text-[120px] leading-none" style={{ fontFamily: "'Dancing Script', cursive" }}>{data.brideName || 'Sarah'}</span>
                    </motion.div>
                  </div>
                </div>

                {/* Statues */}
                <motion.img 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  src="/MinimalImage/boy.png" 
                  className="absolute left-0 bottom-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 w-[45%] md:w-[22%] max-w-[500px] h-auto max-h-[60vh] md:max-h-[90vh] object-contain z-10 mix-blend-multiply pointer-events-none"
                />
                
                <motion.img 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  src="/MinimalImage/girl.png" 
                  className="absolute right-0 bottom-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 w-[45%] md:w-[22%] max-w-[500px] h-auto max-h-[60vh] md:max-h-[90vh] object-contain z-10 mix-blend-multiply pointer-events-none"
                />
              </section>

              {/* 2. Purple Wave Section (Countdown & Date) */}
              <section className="relative w-full flex flex-col items-center z-30 -mt-48 md:-mt-64">
                <div className="absolute top-0 left-0 w-full h-[150%] md:h-[120%] z-0 pointer-events-none">
                  <img src="/MinimalImage/purple-wave.png.png" className="w-full h-full object-cover md:object-fill object-top" />
                </div>
                
                <div className="w-full relative z-10 flex items-center justify-start md:justify-center pt-48 sm:pt-64 md:pt-80 pb-32 overflow-visible">
                  <div className="container mx-auto px-4 flex justify-start md:justify-center">
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="relative top-[8rem] sm:top-[10rem] md:top-[2rem] flex items-center justify-start md:justify-center -ml-2 sm:-ml-4 md:ml-0 gap-4 md:gap-8"
                    >
                      <img src="/MinimalImage/clock.png" className="w-[220px] sm:w-[280px] md:w-[600px] h-auto object-contain mix-blend-screen opacity-90" />
                      <div className="flex flex-col items-center text-white mt-4 md:mt-10">
                        <div className="flex items-start justify-center">
                          <span
                            className="font-sans font-black leading-none"
                            style={{ fontSize: 'clamp(50px, 15vw, 120px)' }}
                          >
                            {data.date ? format(parseISO(data.date), 'd') : '12'}
                          </span>
                          <div className="flex flex-col items-start mt-2 md:mt-5 ml-1">
                            <span className="text-xs md:text-base font-black leading-none uppercase">
                              {data.date
                                ? getOrdinal(parseInt(format(parseISO(data.date), 'd')))
                                : 'th'}
                            </span>
                            <span className="text-[8px] md:text-[11px] font-medium mt-1 whitespace-nowrap opacity-80 uppercase tracking-widest">
                              {data.date ? format(parseISO(data.date), 'EEEE') : 'Saturday'}
                            </span>
                          </div>
                        </div>
                        <p
                          className="font-sans font-bold -mt-1 md:-mt-2 uppercase tracking-widest"
                          style={{ fontSize: 'clamp(14px, 4vw, 28px)' }}
                        >
                          {data.date ? format(parseISO(data.date), 'MMMM yyyy') : 'December 2026'}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* 3. Combined Moon & Journey Section */}
              <section className="relative w-full flex flex-col items-center z-20 -mt-32 sm:-mt-48 md:-mt-80 bg-white overflow-visible">
                <div className="absolute top-0 left-0 w-full h-[80vh] md:h-[100vh] z-0 overflow-hidden pointer-events-none">
                  <img src="/MinimalImage/moon.png" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-x-0 bottom-0 h-24 md:h-40 bg-gradient-to-t from-white to-transparent"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center text-center mt-[60vh] md:mt-[85vh] px-4 w-full pb-10">
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="mb-8 md:mb-16">
                    <div className="flex gap-6 md:gap-16 items-center justify-center">
                      {[
                        { label: 'Days', value: timeLeft?.days ?? 0 },
                        { label: 'Hours', value: timeLeft?.hours ?? 0 },
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <span className="text-4xl md:text-8xl font-black text-[#31244A] tracking-tighter leading-none">
                            {String(item.value).padStart(2, '0')}
                          </span>
                          <span className="text-[10px] md:text-sm uppercase font-bold text-[#80788C] tracking-[0.2em] mt-2">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    onClick={() => {
                      const dateStr = data.date
                        ? format(parseISO(data.date), 'yyyyMMdd')
                        : '20261212';
                      const title = encodeURIComponent(
                        `${data.groomName || 'Michael'} & ${data.brideName || 'Sarah'} Wedding`
                      );
                      const location = encodeURIComponent(data.address || "Grand Ballroom, Cinnamon Grand Hotel");
                      window.open(
                        `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}/${dateStr}&location=${location}`,
                        '_blank'
                      );
                    }}
                    className="focus:outline-none cursor-pointer mb-10 md:mb-20"
                  >
                    <img src="/MinimalImage/addbtn.png" className="w-[180px] sm:w-[240px] md:w-[350px] h-auto drop-shadow-lg" />
                  </motion.button>
                </div>

                <div className="relative z-10 w-full flex flex-row items-start justify-center max-w-7xl pb-20 md:pb-40 px-0 -mt-20 md:mt-0 md:mx-auto">
                  <div className="flex flex-row items-start justify-center w-full max-w-[1200px] md:mx-auto relative">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="w-[75%] md:w-[55%] -ml-10 sm:-ml-16 md:ml-0">
                      <img src="/MinimalImage/couple.png" className="w-full h-auto" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 200 }} whileInView={{ opacity: 1, x: 120 }} className="w-[65%] md:w-[50%] pt-[22rem] sm:pt-[28rem] md:pt-[45rem] -ml-[55%] md:-ml-[20%] z-20">
                      <div className="flex flex-col items-start text-left space-y-1 md:space-y-2">
                        <p className="text-[10px] md:text-2xl text-[#80788C] font-light tracking-[0.2em] uppercase">as we begin</p>
                        <p className="text-[10px] md:text-2xl text-[#80788C] font-light tracking-[0.2em] uppercase">our new</p>
                        <p className="text-[10px] md:text-2xl text-[#80788C] font-light tracking-[0.2em] uppercase mb-1 md:mb-4">journey</p>
                        <p className="text-3xl md:text-8xl font-black text-[#31244A] leading-none mb-1 md:mb-4 uppercase tracking-tighter">Join us</p>
                        <p className="text-[10px] md:text-2xl text-[#80788C] font-light tracking-[0.2em] uppercase">filled with</p>
                        <p className="text-2xl md:text-7xl font-bold text-[#31244A] leading-tight uppercase tracking-tight">love and</p>
                        <p className="text-2xl md:text-7xl font-bold text-[#31244A] leading-tight uppercase tracking-tight">happiness.</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* 4. Location Section */}
              <section className="relative w-full bg-white -mt-20 md:-mt-32 pb-12 md:pb-32 flex flex-col items-center z-30">
                <div className="container mx-auto px-4 flex flex-col items-center text-center">
                  <span className="text-lg md:text-3xl tracking-[0.3em] md:tracking-[0.5em] font-semibold md:font-bold text-[#31244A] mb-6 md:mb-16 uppercase">LOCATION</span>
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="w-full max-w-[280px] md:max-w-[550px] mb-8 md:mb-16">
                    <img src="/MinimalImage/location.png" className="w-full h-auto" />
                  </motion.div>
                  <div className="text-[#31244A] space-y-1 md:space-y-4">
                    <h3 className="text-xl md:text-4xl font-normal">Grand Ballroom, Cinnamon Grand Hotel</h3>
                    <p className="text-lg md:text-2xl font-light opacity-80">77 Galle Road, Colombo 03</p>
                  </div>
                </div>
              </section>

              {/* 5. Gallery & RSVP Section */}
              <section className="relative w-full min-h-screen flex flex-col items-center z-40 overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img src="/MinimalImage/pbg.png" className="w-full h-full object-cover object-top" />
                </div>

                <div className="relative z-10 w-full flex flex-col items-center pt-24 md:pt-48 max-w-7xl mx-auto">
                  {/* og.png */}
                  {/* OUR GALLERY - Slanted background text */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, rotate: 14 }} 
                    whileInView={{ opacity: 1, scale: 1, rotate: 18 }} 
                    className="absolute top-10 md:top-20 left-1/2 -translate-x-1/2 w-full flex justify-center z-0 pointer-events-none"
                  >
                    <h2 className="text-[50px] sm:text-[80px] md:text-[180px] font-black text-gray-600/50 uppercase tracking-tighter whitespace-nowrap">
                      OUR GALLERY
                    </h2>
                  </motion.div>

                  {/* Carousel */}
                  <div className="w-full overflow-visible px-0 mb-16 md:mb-40 mt-20 md:mt-64">
                    <div className="flex items-center justify-center gap-4 md:gap-24 scale-90 md:scale-110">
                       <div className="w-[15%] h-[350px] md:h-[600px] rounded-[3.5rem] md:rounded-[4rem] border-[6px] md:border-[12px] border-white/20 bg-black/10 opacity-30 shrink-0"></div>
                       <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="w-[70%] md:w-[50%] max-w-[550px] h-[450px] md:h-[800px] rounded-[4rem] md:rounded-[5rem] border-[10px] md:border-[16px] border-white/40 overflow-hidden shadow-2xl shrink-0">
                         <img src="/MinimalImage/couple2.png" className="w-full h-full object-cover" />
                       </motion.div>
                       <div className="w-[15%] h-[350px] md:h-[600px] rounded-[3.5rem] md:rounded-[4rem] border-[6px] md:border-[12px] border-white/20 bg-black/10 opacity-30 shrink-0"></div>
                    </div>
                  </div>

                  {/* RSVP */}
                  <div className="flex items-center gap-4 md:gap-16 mb-10 md:mb-20">
                    <span className="text-white text-sm md:text-3xl tracking-[0.4em] md:tracking-[0.6em] font-light uppercase">YOUR RESPONSE</span>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative cursor-pointer">
                      <img src="/MinimalImage/yesbtn.png" className="w-24 md:w-56 h-auto" />
                      <span className="absolute inset-0 flex items-center justify-center text-black text-[10px] md:text-[18px] font-black tracking-widest">YES</span>
                    </motion.button>
                  </div>

                  {/* Thank You */}
                  <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-white text-3xl md:text-8xl mb-10 md:mb-32" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    Thank You
                  </motion.span>
                </div>
              </section>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
