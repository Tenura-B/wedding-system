import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Heart, 
  Gift, 
  Check, 
  Sparkles,
  ShieldCheck,
  Plus
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

export default function LuxuryTemplate({ data, timeLeft, onRSVP, isSubmitted }: TemplateProps) {
  const [rsvpForm, setRsvpForm] = useState({ name: "", status: "coming", guests: 1, message: "" });

  const agenda = [
    { time: data.time || "19:00", title: "Black Tie Reception", place: "Grand Ballroom" },
    { time: "20:30", title: "Gala Dinner", place: "Imperial Hall" },
    { time: "22:00", title: "Midnight Toast", place: "Rooftop Garden" },
    { time: "23:00", title: "After Party", place: "Exclusive Lounge" }
  ];

  return (
    <div className="font-serif bg-black text-white selection:bg-amber-500 selection:text-black">
      {/* 1. Hero / Picture */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={data.photoUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"} 
            className="w-full h-full object-cover opacity-40 grayscale"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          className="relative z-10 space-y-12"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="text-amber-500"
            >
              <Sparkles className="h-10 w-10" />
            </motion.div>
            <span className="text-xs font-bold uppercase tracking-[0.8em] text-amber-500/80">The Union of</span>
          </div>

          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-none">
            <span className="bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 bg-clip-text text-transparent">
              {data.brideName?.split(' ')[0]}
            </span>
            <br />
            <span className="text-2xl md:text-4xl font-light italic text-white/40 mx-4 md:mx-10">&</span>
            <br />
            <span className="bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 bg-clip-text text-transparent">
              {data.groomName?.split(' ')[0]}
            </span>
          </h1>

          <div className="space-y-6">
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
            <p className="text-xl md:text-2xl font-light tracking-widest text-amber-100/60 uppercase">
               Request the honor of your presence
            </p>
          </div>
        </motion.div>
      </section>

      {/* 2. Countdown + Details */}
      <section className="py-32 relative border-y border-white/5 bg-neutral-950">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
              <div className="space-y-10 lg:col-span-2">
                 <h2 className="text-4xl md:text-6xl font-bold tracking-tight">The Celebration Begins In...</h2>
                 <div className="flex flex-wrap gap-8 md:gap-16">
                   {[
                     { label: 'Days', val: timeLeft?.days ?? 0 },
                     { label: 'Hours', val: timeLeft?.hours ?? 0 },
                     { label: 'Minutes', val: timeLeft?.minutes ?? 0 }
                   ].map((item, i) => (
                     <div key={i} className="flex flex-col">
                       <span className="text-7xl md:text-[9rem] font-bold text-amber-500 leading-none">
                         {String(item.val).padStart(2, '0')}
                       </span>
                       <span className="text-xs font-bold uppercase tracking-[0.5em] text-white/30 mt-4">{item.label}</span>
                     </div>
                   ))}
                 </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl p-12 rounded-[3rem] border border-white/10 space-y-12">
                 <div className="flex items-center gap-6">
                    <Calendar className="h-8 w-8 text-amber-500" />
                    <div>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Date</p>
                       <p className="text-xl font-bold">
                         {data.date ? format(parseISO(data.date), 'MMMM d, yyyy') : 'November 5, 2026'}
                       </p>
                    </div>
                 </div>
                 <div className="flex items-center gap-6">
                    <Clock className="h-8 w-8 text-amber-500" />
                    <div>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Reception</p>
                       <p className="text-xl font-bold">{data.time || '19:00'}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 3. Photo Gallery */}
      <section className="py-32 overflow-hidden">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="space-y-4">
                 <span className="text-xs font-bold uppercase tracking-[0.6em] text-amber-500">The Visuals</span>
                 <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Bespoke Moments.</h2>
              </div>
              <p className="max-w-xs text-white/40 italic">A curated selection of our favorite pre-wedding memories captured across the globe.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1,2,3,4,5,6,7,8].map(i => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                  className="aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 relative group"
                >
                   <img src={`https://images.unsplash.com/photo-1519741497674-611481863552?w=800&sig=${i}`} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" alt="" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <p className="text-xs font-bold uppercase tracking-widest text-amber-500">Paris Session • 2026</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* 4. Ceremony Agenda */}
      <section className="py-32 bg-neutral-950">
        <div className="container mx-auto px-6 max-w-5xl">
           <div className="text-center mb-24 space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.6em] text-amber-500">The Itinerary</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Evening Agenda</h2>
           </div>

           <div className="space-y-6">
              {agenda.map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 20 }}
                  className="flex items-center justify-between p-8 md:p-12 border border-white/5 hover:border-amber-500/30 transition-all rounded-[2rem] bg-white/[0.02] group"
                >
                   <div className="flex items-center gap-12">
                      <span className="text-2xl md:text-4xl font-bold text-amber-500/40 group-hover:text-amber-500 transition-colors">{item.time}</span>
                      <div className="space-y-1">
                         <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{item.title}</h3>
                         <p className="text-white/40 uppercase tracking-widest text-[10px] font-bold">{item.place}</p>
                      </div>
                   </div>
                   <Plus className="h-6 w-6 text-white/20 group-hover:rotate-45 transition-all" />
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* 5. Venue Section with Blend */}
      <section className="relative py-32 overflow-hidden min-h-screen flex items-center">
         <div className="absolute inset-0 z-0">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(data.address || data.venueName)}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
              className="grayscale invert opacity-30 contrast-150"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
         </div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-2xl space-y-10">
               <div className="space-y-6">
                 <span className="text-xs font-bold uppercase tracking-[0.8em] text-amber-500">The Destination</span>
                 <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
                    {data.venueName}
                 </h2>
                 <p className="text-xl md:text-3xl text-white/40 italic font-light">
                   {data.address}
                 </p>
               </div>
               
               <div className="flex flex-wrap gap-4">
                  <Button 
                    className="h-16 px-10 rounded-full bg-amber-500 text-black hover:bg-amber-400 font-bold uppercase tracking-widest text-[10px] shadow-2xl shadow-amber-500/20"
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(data.address)}`, '_blank')}
                  >
                    Get VIP Directions
                  </Button>
                  <Button variant="ghost" className="h-16 px-10 rounded-full text-white/60 hover:text-white hover:bg-white/5 font-bold uppercase tracking-widest text-[10px]">
                    Travel Guide
                  </Button>
               </div>
            </div>
         </div>
      </section>

      {/* 6. RSVP Section */}
      <section className="py-32 relative">
         <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-white/5 backdrop-blur-3xl p-12 md:p-24 rounded-[4rem] border border-white/10 relative overflow-hidden">
               {/* Decorative glows */}
               <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/20 blur-[100px] rounded-full" />
               <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full" />

               {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-8"
                  >
                     <ShieldCheck className="h-20 w-20 text-amber-500 mx-auto" />
                     <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">RSVP Confirmed.</h2>
                     <p className="text-xl text-white/40 italic">You are on the exclusive guest list. We await your presence.</p>
                  </motion.div>
               ) : (
                  <div className="space-y-16">
                     <div className="text-center space-y-4">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter italic">Will You Join Us?</h2>
                        <p className="text-lg text-amber-500/60 uppercase tracking-[0.4em] font-bold">Black Tie RSVP Required</p>
                     </div>

                     <form 
                       onSubmit={(e) => { e.preventDefault(); onRSVP(rsvpForm); }}
                       className="space-y-10"
                     >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-3">
                              <Label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Full Name</Label>
                              <Input 
                                required
                                placeholder="ELENA GILBERT"
                                className="h-16 rounded-2xl border-white/10 bg-white/5 focus:border-amber-500 focus:bg-white/10 text-lg uppercase tracking-wider px-6"
                                value={rsvpForm.name}
                                onChange={(e) => setRsvpForm(prev => ({ ...prev, name: e.target.value }))}
                              />
                           </div>
                           <div className="space-y-3">
                              <Label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Guest Count</Label>
                              <Input 
                                type="number"
                                min="1"
                                className="h-16 rounded-2xl border-white/10 bg-white/5 focus:border-amber-500 focus:bg-white/10 text-lg px-6"
                                value={rsvpForm.guests}
                                onChange={(e) => setRsvpForm(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                              />
                           </div>
                        </div>

                        <div className="space-y-3">
                           <Label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Status</Label>
                           <div className="flex gap-4">
                              <button
                                type="button"
                                onClick={() => setRsvpForm(prev => ({ ...prev, status: 'coming' }))}
                                className={`flex-1 h-16 rounded-2xl border transition-all text-xs font-bold uppercase tracking-[0.3em] ${rsvpForm.status === 'coming' ? 'bg-amber-500 border-amber-500 text-black shadow-[0_0_30px_rgba(245,158,11,0.3)]' : 'border-white/10 text-white/40 hover:border-white/20'}`}
                              >
                                Joyfully Accept
                              </button>
                              <button
                                type="button"
                                onClick={() => setRsvpForm(prev => ({ ...prev, status: 'declined' }))}
                                className={`flex-1 h-16 rounded-2xl border transition-all text-xs font-bold uppercase tracking-[0.3em] ${rsvpForm.status === 'declined' ? 'bg-amber-500 border-amber-500 text-black shadow-[0_0_30px_rgba(245,158,11,0.3)]' : 'border-white/10 text-white/40 hover:border-white/20'}`}
                              >
                                Regretfully Decline
                              </button>
                           </div>
                        </div>

                        <div className="space-y-3">
                           <Label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Notes</Label>
                           <Textarea 
                             placeholder="DIETARY REQUIREMENTS..."
                             className="min-h-[150px] rounded-[2rem] border-white/10 bg-white/5 focus:border-amber-500 focus:bg-white/10 p-8 text-lg uppercase tracking-wider"
                             value={rsvpForm.message}
                             onChange={(e) => setRsvpForm(prev => ({ ...prev, message: e.target.value }))}
                           />
                        </div>

                        <button type="submit" className="w-full h-20 rounded-full bg-amber-500 text-black font-bold uppercase tracking-[0.4em] text-sm shadow-2xl shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all">
                          Submit RSVP
                        </button>
                     </form>
                  </div>
               )}
            </div>
         </div>
      </section>

      <footer className="py-24 text-center opacity-20 relative overflow-hidden">
         <Sparkles className="h-6 w-6 text-amber-500 mx-auto mb-6" />
         <p className="text-[10px] font-bold uppercase tracking-[0.8em]">Tenura Obsidian Luxury.</p>
      </footer>
    </div>
  );
}
