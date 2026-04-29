import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Heart, 
  Gift, 
  Check, 
  ChevronRight,
  Music,
  Camera
} from "lucide-react";
import { format, parseISO } from "date-fns";
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
  const [rsvpForm, setRsvpForm] = useState({ name: "", status: "coming", guests: 1, message: "" });

  const agenda = [
    { time: data.time || "04:00 PM", title: "Ceremony Begins", description: "Exchange of vows at the Main Chapel", icon: Heart },
    { time: "05:30 PM", title: "Cocktail Hour", description: "Drinks and appetizers on the Sunset Terrace", icon: Music },
    { time: "07:00 PM", title: "Reception & Dinner", description: "Grand Banquet Hall", icon: Calendar },
    { time: "09:00 PM", title: "Party & Dancing", description: "Celebration till midnight", icon: Camera }
  ];

  return (
    <div className="font-serif bg-[#FDFBF7] text-[#1F1F1F] selection:bg-[#AF944F]/20">
      {/* 1. Picture / Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={data.photoUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"} 
            className="w-full h-full object-cover opacity-60 scale-105"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FDFBF7]/30 to-[#FDFBF7]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 text-center space-y-8 px-4"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="w-12 h-12 border border-[#AF944F]/30 rounded-full flex items-center justify-center text-[#AF944F]"
            >
              <Heart className="h-5 w-5 fill-[#AF944F]/10" />
            </motion.div>
            <span className="text-xs font-bold uppercase tracking-[4px] text-[#AF944F]">Save the Date</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-6xl md:text-9xl font-['Great_Vibes'] text-[#AF944F] drop-shadow-sm">
              {data.brideName ? data.brideName.split(' ')[0] : 'Amelia'}
              <span className="text-3xl md:text-5xl font-serif text-[#1F1F1F] mx-4 md:mx-8">&</span>
              {data.groomName ? data.groomName.split(' ')[0] : 'Jameson'}
            </h1>
            <p className="text-xl md:text-3xl font-light italic text-neutral-500 max-w-2xl mx-auto pt-4 leading-relaxed px-6">
               "{data.message || "We are joyfully announcing our marriage"}"
            </p>
          </div>
        </motion.div>
      </section>

      {/* 2. Countdown + Calendar Details */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white border border-[#E8D5C8]/50 rounded-[4rem] p-8 md:p-16 shadow-2xl shadow-[#AF944F]/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 bg-[#AF944F]/10 rounded-2xl flex items-center justify-center text-[#AF944F]">
                      <Calendar className="h-6 w-6" />
                   </div>
                   <div>
                     <h2 className="text-sm font-bold uppercase tracking-widest text-[#AF944F]">Wedding Date</h2>
                     <p className="text-3xl font-serif">
                       {data.date ? format(parseISO(data.date), 'MMMM d, yyyy') : 'June 12, 2026'}
                     </p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 bg-[#AF944F]/10 rounded-2xl flex items-center justify-center text-[#AF944F]">
                      <Clock className="h-6 w-6" />
                   </div>
                   <div>
                     <h2 className="text-sm font-bold uppercase tracking-widest text-[#AF944F]">Ceremony Time</h2>
                     <p className="text-3xl font-serif">{data.time || '4:00 PM'}</p>
                   </div>
                </div>
              </div>

              <div className="bg-[#FDFBF7] rounded-[3rem] p-10 text-center border border-[#E8D5C8]/30">
                <h3 className="text-sm font-bold uppercase tracking-[4px] text-neutral-400 mb-8">Counting the Moments</h3>
                <div className="flex justify-center gap-6 md:gap-10">
                  {[
                    { label: 'Days', value: timeLeft?.days ?? 0 },
                    { label: 'Hrs', value: timeLeft?.hours ?? 0 },
                    { label: 'Min', value: timeLeft?.minutes ?? 0 }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <span className="text-4xl md:text-5xl font-['Cormorant_Garamond'] font-bold text-[#AF944F]">
                        {String(item.value).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mt-2">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Photo Gallery */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="text-center space-y-4 mb-20">
              <span className="text-xs font-bold uppercase tracking-[6px] text-[#AF944F]">Our Love in Frames</span>
              <h2 className="text-5xl md:text-7xl font-serif italic">Capturing Memories</h2>
           </div>
           <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
             {[
               "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
               "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
               "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800",
               "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800",
               "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800"
             ].map((src, i) => (
               <motion.div 
                 key={i}
                 whileHover={{ y: -10 }}
                 className="break-inside-avoid rounded-[2.5rem] overflow-hidden border border-[#E8D5C8]/20 shadow-lg shadow-[#AF944F]/5"
               >
                 <img src={src} className="w-full h-auto grayscale-[20%] hover:grayscale-0 transition-all duration-700" alt="Gallery" />
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* 4. Ceremony Agenda */}
      <section className="py-32 bg-[#FDFBF7] relative">
         <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center space-y-4 mb-20">
               <span className="text-xs font-bold uppercase tracking-[6px] text-[#AF944F]">The Celebration</span>
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
                       <span className="text-2xl font-bold text-[#AF944F]">{item.time}</span>
                       <h3 className="text-3xl font-serif">{item.title}</h3>
                       <p className="text-neutral-500 font-light leading-relaxed italic">{item.description}</p>
                    </div>
                    <div className="relative z-10 w-16 h-16 bg-white border border-[#E8D5C8] rounded-full flex items-center justify-center text-[#AF944F] shadow-sm">
                       <item.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 hidden md:block" />
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. Venue Section with Nice Blend */}
      <section className="relative py-32 overflow-hidden">
        {/* Decorative background blend */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#FDFBF7] to-transparent z-10" />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-[6px] text-[#AF944F]">Where We Say I Do</span>
                <h2 className="text-5xl md:text-7xl font-serif italic leading-tight">
                  {data.venueName || "The Grand Estate"}
                </h2>
                <p className="text-xl text-neutral-500 font-light max-w-md leading-relaxed italic">
                  {data.address || "123 Lavender Lane, Napa Valley, CA"}
                </p>
              </div>
              <Button 
                variant="outline" 
                className="rounded-full px-10 h-14 border-[#AF944F] text-[#AF944F] hover:bg-[#AF944F] hover:text-white transition-all uppercase tracking-widest text-xs font-bold"
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(data.address || data.venueName)}`, '_blank')}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Open in Maps
              </Button>
            </div>

            <div className="rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white h-[500px] relative group">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(data.address || data.venueName)}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                className="grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. RSVP Section */}
      <section className="py-32 bg-white">
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
              <h2 className="text-5xl font-serif italic text-[#AF944F]">Thank You</h2>
              <p className="text-xl text-neutral-500 font-light italic">Your presence will make our day even more special. We have received your RSVP.</p>
            </motion.div>
          ) : (
            <div className="space-y-16">
              <div className="text-center space-y-4">
                <span className="text-xs font-bold uppercase tracking-[6px] text-[#AF944F]">RSVP</span>
                <h2 className="text-5xl md:text-7xl font-serif italic">Will You Join Us?</h2>
                <p className="text-neutral-500 font-light italic">Please kindly respond by September 14, 2026</p>
              </div>

              <form 
                onSubmit={(e) => { e.preventDefault(); onRSVP(rsvpForm); }} 
                className="bg-[#FDFBF7] p-10 md:p-16 rounded-[4rem] border border-[#E8D5C8]/50 shadow-2xl shadow-[#AF944F]/5 space-y-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] uppercase font-bold tracking-widest text-[#AF944F] ml-1">Full Name</Label>
                    <Input 
                      required
                      placeholder="e.g. Elena Gilbert"
                      className="h-16 rounded-2xl border-[#E8D5C8] focus:border-[#AF944F] bg-white text-lg font-serif italic px-6 shadow-sm"
                      value={rsvpForm.name}
                      onChange={(e) => setRsvpForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] uppercase font-bold tracking-widest text-[#AF944F] ml-1">Number of Guests</Label>
                    <Input 
                      type="number"
                      min="1"
                      className="h-16 rounded-2xl border-[#E8D5C8] focus:border-[#AF944F] bg-white text-lg font-serif italic px-6 shadow-sm"
                      value={rsvpForm.guests}
                      onChange={(e) => setRsvpForm(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-[#AF944F] ml-1">Attendance Status</Label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setRsvpForm(prev => ({ ...prev, status: 'coming' }))}
                      className={`flex-1 h-16 rounded-2xl border transition-all text-sm font-bold uppercase tracking-widest ${rsvpForm.status === 'coming' ? 'bg-[#AF944F] border-[#AF944F] text-white shadow-lg' : 'bg-white border-[#E8D5C8] text-neutral-400 hover:border-[#AF944F]/30'}`}
                    >
                      Joyfully Attend
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpForm(prev => ({ ...prev, status: 'declined' }))}
                      className={`flex-1 h-16 rounded-2xl border transition-all text-sm font-bold uppercase tracking-widest ${rsvpForm.status === 'declined' ? 'bg-[#AF944F] border-[#AF944F] text-white shadow-lg' : 'bg-white border-[#E8D5C8] text-neutral-400 hover:border-[#AF944F]/30'}`}
                    >
                      Regretfully Decline
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-[#AF944F] ml-1">Special Notes</Label>
                  <Textarea 
                    placeholder="Dietary requirements or a message for the couple..."
                    className="min-h-[150px] rounded-[2rem] border-[#E8D5C8] focus:border-[#AF944F] bg-white text-lg font-serif italic p-8 shadow-sm"
                    value={rsvpForm.message}
                    onChange={(e) => setRsvpForm(prev => ({ ...prev, message: e.target.value }))}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full h-20 rounded-full bg-[#AF944F] text-white hover:bg-[#967E42] text-xl font-bold shadow-xl shadow-[#AF944F]/20 transition-all">
                  Confirm RSVP
                </Button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Floating Action Bar */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex gap-3 p-3 rounded-full bg-white/80 backdrop-blur-xl border border-white shadow-2xl">
         <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full w-12 h-12 text-[#AF944F] hover:bg-[#AF944F]/10"
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          >
           <Heart className="h-5 w-5" />
         </Button>
         <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full w-12 h-12 text-neutral-400 hover:bg-neutral-100"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Invitation link copied!");
            }}
          >
           <Gift className="h-5 w-5" />
         </Button>
         <Button 
           className="rounded-full px-10 h-12 bg-[#AF944F] text-white hover:bg-[#967E42] font-bold uppercase tracking-widest text-xs"
           onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          >
           RSVP Now
         </Button>
      </div>

      <footer className="py-16 text-center border-t border-[#E8D5C8]/30 text-neutral-400">
         <p className="text-xs uppercase tracking-[4px]">Designed with Love by Tenura Wedding System</p>
      </footer>
    </div>
  );
}
