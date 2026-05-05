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

export default function ClassicTemplate({ data, timeLeft, onRSVP, isSubmitted }: TemplateProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({ name: "", status: "coming", guests: 1, message: "" });

  const agenda = data.agenda?.length > 0 ? data.agenda.map((item: any) => {
    // Map string icons to Lucide components
    const iconMap: Record<string, any> = { Heart, Music, Calendar, Camera, Clock };
    return {
      ...item,
      icon: iconMap[item.icon] || Heart
    };
  }) : [
    { time: data.time || "04:00 PM", title: "Ceremony Begins", description: "Exchange of vows at the Main Chapel", icon: Heart },
    { time: "05:30 PM", title: "Cocktail Hour", description: "Drinks and appetizers on the Sunset Terrace", icon: Music },
    { time: "07:00 PM", title: "Reception & Dinner", description: "Grand Banquet Hall", icon: Calendar },
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
    <div className="font-serif bg-[#FDFBF7] text-[#1F1F1F] selection:bg-[#991B1B]/20 min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] } }}
            onClick={() => setIsOpened(true)}
            className="fixed inset-0 z-[100] cursor-pointer overflow-hidden flex flex-col items-center justify-center"
            style={{
              backgroundColor: "#FDFBF7"
            }}
          >



            {/* Desktop Top Envelope Background */}
            <motion.div
              initial={{ opacity: 0, y: -20, rotate: 0, scale: 1 }}
              animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 1.5, ease: "easeOut" }}
              className="fixed -top-[10vw] left-0 w-full z-0 hidden md:block pointer-events-none"
            >
              <img src="/images/desenv.png" className="w-full h-[100vh] object-cover object-top" alt="Desktop Envelope Top" />
            </motion.div>

            {/* Overlay Image 8 - Top Left Floating */}
            <motion.div
              initial={{ opacity: 0, x: -50, y: -50, rotate: -15 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: -5 }}
              transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
              className="absolute left-0 md:left-[-5%] top-[15%] min-[390px]:top-[20%] min-[414px]:top-[15%] md:top-[8%] w-[58vw] min-[390px]:w-[65vw] md:w-[32vw] max-w-[650px] aspect-[3/4] z-10 overflow-hidden rounded-[2.5rem]"
            >
              <img src="/images/left.png" className="w-full h-full object-cover md:hidden" alt="Wedding Left" />
              <img src="/images/d1.png" className="w-full h-full object-cover hidden md:block" alt="Wedding Left Desktop" />
            </motion.div>

            {/* Overlay Image 9 - Bottom Right Floating */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: 50, rotate: 15 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 5 }}
              transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
              className="absolute right-0 md:right-[-5%] bottom-[20%] md:bottom-[8%] w-[58vw] min-[390px]:w-[65vw] md:w-[32vw] max-w-[650px] aspect-[3/4] z-10 overflow-hidden rounded-[2.5rem]"
            >
              <img src="/images/right.png" className="w-full h-full object-cover md:hidden" alt="Wedding Right" />
              <img src="/images/d2.png" className="w-full h-full object-cover hidden md:block" alt="Wedding Right Desktop" />
            </motion.div>

            {/* Envelope Image - Mobile Right Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1.5, ease: "easeOut" }}
              className="absolute right-0 top-0 w-[92%] h-full z-0 md:hidden pointer-events-none"
            >
              <img src="/images/env.png" className="w-full h-full object-cover opacity-40" alt="Envelope Background" />
            </motion.div>

            {/* Corner Flowers - Mobile */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute right-0 top-0 w-[100px] min-[414px]:w-[75px] z-10 md:hidden pointer-events-none"
            >
              <img src="/images/f1.png" className="w-full h-auto" alt="Flower Top" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="absolute right-0 bottom-0 w-[150px] z-10 md:hidden pointer-events-none"
            >
              <img src="/images/f2.png" className="w-full h-auto" alt="Flower Bottom" />
            </motion.div>

            <div className="relative z-20 flex flex-col items-center -mt-12">
              {/* Center Image 11 - Circular Container like the rose in the picture */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-[150px] md:w-[260px] aspect-square rounded-full overflow-hidden bg-[#681b1b] relative flex items-center justify-center p-0"
              >
                <img src="/images/rose.png" className="w-full h-full object-contain" alt="Rose" />
              </motion.div>

            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="overflow-x-hidden"
          >
            {/* 1. Hero Section — Red pill banner with couple statues */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#ECECEC]">

              {/* Hidden SVG clipPath definition */}
              <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                  <clipPath id="pillClip" clipPathUnits="objectBoundingBox">
                    {/* Tall rounded pill: rx/ry relative to bounding box */}
                    <rect x="0" y="0" width="1" height="1" rx="0.42" ry="0.12" />
                  </clipPath>
                </defs>
              </svg>

              {/* ── Man statue — left ── */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 bottom-0 z-20 pointer-events-none"
                style={{ width: 'clamp(220px, 35vw, 450px)' }}
              >
                <img
                  src="/images/women.png"
                  alt="Groom statue"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  style={{ filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.18))' }}
                />
              </motion.div>

              {/* ── Woman statue — right ── */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 bottom-0 z-20 pointer-events-none"
                style={{ width: 'clamp(220px, 35vw, 450px)' }}
              >
                <img
                  src="/images/men.png"
                  alt="Bride statue"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  style={{ filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.18))' }}
                />
              </motion.div>

              {/* ── Central red pill banner (SVG clipPath) ── */}
              <motion.div
                initial={{ opacity: 0, scaleY: 0.7 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col items-center justify-between text-white text-center"
                style={{
                  width: 'clamp(220px, 38vw, 420px)',
                  minHeight: 'clamp(480px, 82vh, 780px)',
                  background: '#6B1A1A',
                  clipPath: 'url(#pillClip)',
                  padding: 'clamp(40px,7vw,80px) clamp(24px,4vw,48px)',
                }}
              >
                {/* Top text */}
                <div className="flex flex-col items-center gap-3 pt-4">
                  <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.9 }}
                    className="font-sans font-extrabold uppercase leading-tight tracking-wide"
                    style={{ fontSize: 'clamp(18px, 2.6vw, 28px)' }}
                  >
                    OUR LOVE STORY<br />BEGINS.
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.85 }}
                    transition={{ delay: 0.65, duration: 0.9 }}
                    className="font-sans font-light leading-relaxed"
                    style={{ fontSize: 'clamp(15px, 1.8vw, 20px)', maxWidth: '80%' }}
                  >
                    We invite you to<br />celebrate the<br />wedding of
                  </motion.p>
                </div>

                {/* Couple names */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 1 }}
                  className="flex flex-col items-center"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  <span style={{ fontSize: 'clamp(32px, 5.5vw, 60px)', lineHeight: 1.1 }}>
                    {data.groomName || 'Sphiria'}
                  </span>
                  <span style={{ fontSize: 'clamp(22px, 3.5vw, 42px)', lineHeight: 1.2 }}>&amp;</span>
                  <span style={{ fontSize: 'clamp(32px, 5.5vw, 60px)', lineHeight: 1.1 }}>
                    {data.brideName || 'Digital'}
                  </span>
                </motion.div>

                {/* Bottom spacer so pill is full height */}
                <div />
              </motion.div>

              {/* Bottom fade into next section */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#FDFBF7] to-transparent z-30" />
            </section>

            {/* 2. Date, Countdown & Calendar Section */}
            <section className="relative overflow-hidden">
              {/* secbg background + white overlay */}
              <div className="absolute inset-0 z-0">
                <img src="/images/secbg.png" className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-white/82" />
              </div>



              {/* Content */}
              <div className="relative z-10 flex flex-col items-center px-6 pt-4 pb-16 text-center">

                {/* Bird */}
                <motion.img
                  initial={{ opacity: 0, y: -12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  src="/images/birds 1.png"
                  className="w-40 h-auto object-contain mb-2 -translate-x-8"
                  alt="Bird"
                />

                {/* Rose 4 */}
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.7 }}
                  src="/images/roses 4.png"
                  className="w-32 h-auto mb-5 -mt-14 translate-x-4"
                  alt="Rose"
                />

                {/* Date — large number with ordinal + weekday + month year */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.8 }}
                  className="flex flex-col items-center"
                >
                  <div className="flex items-start justify-center">
                    <span
                      className="font-sans font-black text-[#1A1A1A] leading-none"
                      style={{ fontSize: 'clamp(80px, 24vw, 128px)' }}
                    >
                      {data.date ? format(parseISO(data.date), 'd') : '12'}
                    </span>
                    <div className="flex flex-col items-start mt-5 ml-1">
                      <span className="text-base font-black text-[#1A1A1A] leading-none">
                        {data.date
                          ? getOrdinal(parseInt(format(parseISO(data.date), 'd')))
                          : 'th'}
                      </span>
                      <span className="text-[11px] text-neutral-500 font-medium mt-1 whitespace-nowrap">
                        {data.date ? format(parseISO(data.date), 'EEEE') : 'Saturday'}
                      </span>
                    </div>
                  </div>
                  <p
                    className="font-sans font-bold text-[#1A1A1A] -mt-2"
                    style={{ fontSize: 'clamp(22px, 6vw, 36px)' }}
                  >
                    {data.date ? format(parseISO(data.date), 'MMMM yyyy') : 'December 2026'}
                  </p>
                </motion.div>

                {/* Time */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-sm text-neutral-500 mt-3 mb-10"
                >
                  {data.time || '10:30 AM'} onwards
                </motion.p>

                {/* Invite text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25, duration: 0.8 }}
                  className="text-center mb-12 w-full max-w-[280px]"
                >
                  <p className="text-sm text-neutral-500 font-medium tracking-tight">as we begin</p>
                  <p className="text-sm text-neutral-500 font-medium tracking-tight">our new</p>
                  <p className="text-sm text-neutral-500 font-medium tracking-tight mb-2">journey</p>
                  <p className="text-5xl font-bold text-[#1A1A1A] leading-tight mb-1">Join us</p>
                  <p className="text-sm text-neutral-500 font-medium tracking-tight">filled with</p>
                  <p className="text-4xl font-bold text-[#1A1A1A] leading-tight">love and</p>
                  <p className="text-4xl font-bold text-[#1A1A1A] leading-tight">happiness.</p>
                </motion.div>

                {/* Countdown box */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="bg-[#EAEAEA]/60 backdrop-blur-sm rounded-[2rem] px-8 py-10 mb-10 flex flex-row justify-between items-center shadow-sm border border-white/20 w-full max-w-[320px] relative overflow-hidden"
                >
                  {/* Rings inside container, slightly visible */}
                  <img
                    src="/images/rings 1.png"
                    className="absolute right-[-10%] bottom-[-10%] w-40 h-auto object-contain opacity-20 pointer-events-none grayscale"
                    alt=""
                  />

                  {[
                    { label: 'Days', value: timeLeft?.days ?? 12 },
                    { label: 'Hours', value: timeLeft?.hours ?? 5 },
                    { label: 'Min', value: timeLeft?.minutes ?? 20 },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center flex-1 relative z-10">
                      <span className="text-4xl font-bold text-[#1A1A1A] leading-tight tracking-tighter">
                        {String(item.value).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest mt-1">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </motion.div>

                {/* Add to Calendar */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  onClick={() => {
                    const dateStr = data.date
                      ? format(parseISO(data.date), 'yyyyMMdd')
                      : '20261212';
                    const title = encodeURIComponent(
                      `${data.groomName || 'Groom'} & ${data.brideName || 'Bride'} Wedding`
                    );
                    const location = encodeURIComponent(data.address || data.venueName || '');
                    window.open(
                      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}/${dateStr}&location=${location}`,
                      '_blank'
                    );
                  }}
                  className="bg-[#D1D1D1] text-black text-xs font-bold uppercase tracking-[2px] px-10 py-4 rounded-xl hover:bg-neutral-300 transition-all shadow-md"
                >
                  Add to Calendar
                </motion.button>
              </div>
            </section>

            {/* 3. Venue Section */}
            <section className="py-24 bg-white overflow-hidden">
              <div className="container mx-auto px-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-16 flex flex-col items-center text-center"
                >
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    src="/images/roses 4.png"
                    className="w-32 h-auto mb-4"
                    alt="Rose"
                  />
                  <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] uppercase tracking-[10px] mb-4">Venue</h2>
                  <div className="flex flex-col items-center gap-1 text-[#1A1A1A]">
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest">{data.venueName || "The Grand Estate"}</h3>
                    <p className="text-sm md:text-base font-medium opacity-80">{data.address || "123 Lavender Lane, Napa Valley, CA"}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative rounded-[3rem] overflow-hidden mb-12 max-w-5xl mx-auto border-[12px] border-white group"
                >
                  <img
                    src={data.venueImage || "/images/venue.webp"}
                    className="w-full h-[300px] md:h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt="Venue"
                  />
                </motion.div>
                
                {/* Map Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="relative rounded-[3rem] overflow-hidden mb-12 max-w-5xl mx-auto border-[12px] border-white h-[300px] md:h-[450px]"
                >
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(data.address || "123 Lavender Lane, Napa Valley, CA")}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </motion.div>

                <Button
                  variant="outline"
                  className="rounded-full px-10 h-14 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all uppercase tracking-widest text-[10px] font-black"
                  onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(data.address || data.venueName)}`, '_blank')}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  View on Google Maps
                </Button>
              </div>
            </section>
            
            {/* 4. Ceremony Agenda */}
            <section className="pt-8 pb-16 bg-[#FDFBF7] relative">
              <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center space-y-4 mb-20">
                  <span className="text-xs font-bold uppercase tracking-[6px] text-[#991B1B]">The Celebration</span>
                  <h2 className="text-5xl md:text-7xl font-serif italic">Wedding Agenda</h2>
                </div>

                <div className="space-y-12 relative before:absolute before:left-1/2 before:top-0 before:bottom-0 before:w-[1px] before:bg-[#E8D5C8] before:hidden md:before:block">
                  {agenda.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className={`flex flex-col md:flex-row items-center gap-12 text-center md:text-left ${i % 2 !== 0 ? 'md:flex-row-reverse md:text-right' : ''}`}
                    >
                      <div className="flex-1 space-y-2">
                        <span className="text-2xl font-bold text-[#991B1B]">{item.time}</span>
                        <h3 className="text-3xl font-serif">{item.title}</h3>
                        <p className="text-neutral-500 font-light leading-relaxed italic">{item.description}</p>
                      </div>
                      <div className="relative z-10 w-16 h-16 bg-white border border-[#E8D5C8] rounded-full flex items-center justify-center text-[#991B1B] shadow-sm">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1 hidden md:block" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. Photo Gallery */}
            <section className="pt-0 pb-16 bg-white">
              <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center space-y-4 mb-20">
                  <span className="text-xs font-bold uppercase tracking-[6px] text-[#991B1B]">Our Love in Frames</span>
                  <h2 className="text-5xl md:text-7xl font-serif italic">Capturing Memories</h2>
                </div>

                <div className="hidden md:block columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                  {galleryImages.map((src: string, i: number) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -10 }}
                      className="break-inside-avoid rounded-[2.5rem] overflow-hidden border border-[#E8D5C8]/20 shadow-lg shadow-[#991B1B]/5"
                    >
                      <img src={src} className="w-full h-auto grayscale-[20%] hover:grayscale-0 transition-all duration-700" alt="Gallery" />
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Carousel */}
                <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 scrollbar-hide scroll-smooth">
                  {galleryImages.map((src: string, i: number) => (
                    <motion.div
                      key={i}
                      className="min-w-[85vw] snap-center rounded-[2rem] overflow-hidden border border-[#E8D5C8]/20 shadow-lg"
                    >
                      <img src={src} className="w-full h-[450px] object-cover" alt="Gallery" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>





            {/* 6. RSVP Section */}
            <section className="pt-0 pb-32 bg-white">
              <div className="container mx-auto px-4 max-w-3xl">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-8 py-20 bg-[#FDFBF7] rounded-[4rem] border border-[#E8D5C8]/30"
                  >
                    <div className="w-24 h-24 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto text-[#10B981]">
                      <Check className="h-12 w-12" />
                    </div>
                    <h2 className="text-5xl font-serif italic text-[#991B1B]">Thank You</h2>
                    <p className="text-xl text-neutral-500 font-light italic">Your presence will make our day even more special. We have received your RSVP.</p>
                  </motion.div>
                ) : (
                  <div className="space-y-16">
                    <div className="text-center space-y-4">
                      <span className="text-xs font-bold uppercase tracking-[6px] text-[#991B1B]">RSVP</span>
                      <h2 className="text-5xl md:text-7xl font-serif italic">Will You Join Us?</h2>
                      <p className="text-neutral-500 font-light italic">Please kindly respond by {rsvpByDate}</p>
                    </div>

                    <form
                      onSubmit={(e) => { e.preventDefault(); onRSVP(rsvpForm); }}
                      className="bg-[#FDFBF7] p-6 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-[#E8D5C8]/50 shadow-2xl shadow-[#991B1B]/5 space-y-10 mx-auto"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="text-[10px] uppercase font-bold tracking-widest text-[#991B1B] ml-1">Full Name</Label>
                          <Input
                            required
                            placeholder="e.g. Elena Gilbert"
                            className="h-16 rounded-2xl border-[#E8D5C8] focus:border-[#991B1B] bg-white text-lg font-serif italic px-6 shadow-sm"
                            value={rsvpForm.name}
                            onChange={(e) => setRsvpForm(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-[10px] uppercase font-bold tracking-widest text-[#991B1B] ml-1">Number of Guests</Label>
                          <Input
                            type="number"
                            min="1"
                            className="h-16 rounded-2xl border-[#E8D5C8] focus:border-[#991B1B] bg-white text-lg font-serif italic px-6 shadow-sm"
                            value={rsvpForm.guests}
                            onChange={(e) => setRsvpForm(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-[10px] uppercase font-bold tracking-widest text-[#991B1B] ml-1">Attendance Status</Label>
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => setRsvpForm(prev => ({ ...prev, status: 'coming' }))}
                            className={`flex-1 h-12 md:h-14 rounded-xl border transition-all text-[10px] md:text-xs font-bold uppercase tracking-widest ${rsvpForm.status === 'coming' ? 'bg-[#991B1B] border-[#991B1B] text-white shadow-lg' : 'bg-white border-[#E8D5C8] text-neutral-400 hover:border-[#991B1B]/30'}`}
                          >
                            Joyfully Attend
                          </button>
                          <button
                            type="button"
                            onClick={() => setRsvpForm(prev => ({ ...prev, status: 'declined' }))}
                            className={`flex-1 h-12 md:h-14 rounded-xl border transition-all text-[10px] md:text-xs font-bold uppercase tracking-widest ${rsvpForm.status === 'declined' ? 'bg-[#991B1B] border-[#991B1B] text-white shadow-lg' : 'bg-white border-[#E8D5C8] text-neutral-400 hover:border-[#991B1B]/30'}`}
                          >
                            Regretfully Decline
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-[10px] uppercase font-bold tracking-widest text-[#991B1B] ml-1">Special Notes</Label>
                        <Textarea
                          placeholder="Dietary requirements or a message for the couple..."
                          className="min-h-[150px] rounded-[2rem] border-[#E8D5C8] focus:border-[#991B1B] bg-white text-lg font-serif italic p-8 shadow-sm"
                          value={rsvpForm.message}
                          onChange={(e) => setRsvpForm(prev => ({ ...prev, message: e.target.value }))}
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full h-14 md:h-16 rounded-full bg-[#991B1B] text-white hover:bg-[#7F1D1D] text-lg font-bold shadow-xl shadow-[#991B1B]/20 transition-all">
                        Confirm RSVP
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </section>


            <footer className="py-16 text-center border-t border-[#E8D5C8]/30 text-neutral-400">
              <p className="text-xs uppercase tracking-[4px]">Designed with Love by Tenura Wedding System</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
