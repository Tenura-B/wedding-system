import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Heart, 
  Gift, 
  Check, 
  Leaf,
  Flower2
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

export default function FloralTemplate({ data, timeLeft, onRSVP, isSubmitted }: TemplateProps) {
  const [rsvpForm, setRsvpForm] = useState({ name: "", status: "coming", guests: 1, message: "" });

  const agenda = [
    { time: data.time || "14:30", title: "Wedding Vows", desc: "In the rose garden" },
    { time: "16:00", title: "Garden Party", desc: "Tea & refreshments" },
    { time: "18:00", title: "Banquet", desc: "Under the marquee" },
    { time: "20:00", title: "Midnight Dance", desc: "Moonlight celebration" }
  ];

  return (
    <div className="font-serif bg-[#fdfaf8] text-[#4a3f35] selection:bg-[#d4b59d] selection:text-white">
      {/* 1. Hero / Picture */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        {/* Floral background decorations */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-10 pointer-events-none rotate-180">
           <img src="https://images.unsplash.com/photo-1555529731-118a8a46bd3b?w=800" className="w-full h-full object-contain" alt="" />
        </div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-10 pointer-events-none">
           <img src="https://images.unsplash.com/photo-1555529731-118a8a46bd3b?w=800" className="w-full h-full object-contain" alt="" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative z-10 space-y-12"
        >
          <div className="relative inline-block px-12 py-16 border-[1px] border-[#d4b59d]/30 rounded-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fdfaf8] px-4 text-[#d4b59d]">
               <Leaf className="h-6 w-6" />
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-['Great_Vibes'] text-[#d4b59d]">
              {data.brideName?.split(' ')[0]} <span className="text-3xl font-serif text-[#4a3f35]">&</span> {data.groomName?.split(' ')[0]}
            </h1>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#fdfaf8] px-4 text-[#d4b59d]">
               <Flower2 className="h-6 w-6" />
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-6"
          >
            <p className="text-lg md:text-2xl font-light italic tracking-widest text-[#d4b59d]">Are getting married</p>
            <div className="h-px w-20 bg-[#d4b59d]/40 mx-auto" />
            <p className="max-w-2xl mx-auto text-xl md:text-2xl font-['Cormorant_Garamond'] italic leading-relaxed text-[#4a3f35]/70">
              "{data.message || "Please join us for a celebration of love, life, and family."}"
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Countdown + Details */}
      <section className="py-24 bg-[#fffcf9] border-y border-[#d4b59d]/10 relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
               <div className="text-center md:text-left space-y-2">
                 <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-[#d4b59d]">Our Special Day</h2>
                 <p className="text-4xl md:text-5xl font-['Cormorant_Garamond'] italic">The Celebration Awaits</p>
               </div>
               
               <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full border border-[#d4b59d]/40 flex items-center justify-center text-[#d4b59d]">
                       <Calendar className="h-5 w-5" />
                    </div>
                    <p className="text-2xl font-['Cormorant_Garamond'] italic">
                      {data.date ? format(parseISO(data.date), 'EEEE, MMMM d, yyyy') : 'Sunday, May 24, 2026'}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full border border-[#d4b59d]/40 flex items-center justify-center text-[#d4b59d]">
                       <Clock className="h-5 w-5" />
                    </div>
                    <p className="text-2xl font-['Cormorant_Garamond'] italic">{data.time || '14:30'}</p>
                  </div>
               </div>
            </div>

            <div className="relative aspect-square flex items-center justify-center">
               {/* Decorative floral circle */}
               <div className="absolute inset-0 border-[1px] border-[#d4b59d]/20 rounded-full animate-spin-slow" />
               <div className="text-center space-y-6 bg-[#fffcf9] z-10 px-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-[#d4b59d]">Countdown</span>
                  <div className="flex gap-6 md:gap-10">
                    {[
                      { label: 'Days', val: timeLeft?.days ?? 0 },
                      { label: 'Hrs', val: timeLeft?.hours ?? 0 },
                      { label: 'Min', val: timeLeft?.minutes ?? 0 }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-4xl md:text-6xl text-[#d4b59d] font-['Cormorant_Garamond']">{String(item.val).padStart(2, '0')}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{item.label}</span>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Photo Gallery */}
      <section className="py-32">
         <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-20 space-y-4">
               <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#d4b59d]">Captured Moments</span>
               <h2 className="text-5xl md:text-7xl font-['Great_Vibes'] text-[#d4b59d]">Our Love Story</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {[1,2,3,4,5,6,7,8].map(i => (
                 <motion.div 
                   key={i}
                   whileHover={{ scale: 0.98 }}
                   className="aspect-[3/4] rounded-[3rem] overflow-hidden bg-rose-50 border-[6px] border-white shadow-xl"
                 >
                   <img src={`https://images.unsplash.com/photo-1519741497674-611481863552?w=600&sig=${i}`} className="w-full h-full object-cover" alt="" />
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. Ceremony Agenda */}
      <section className="py-32 bg-[#fffcf9]">
        <div className="container mx-auto px-6 max-w-4xl">
           <div className="text-center mb-24 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#d4b59d]">The Day</span>
              <h2 className="text-5xl md:text-7xl font-['Cormorant_Garamond'] italic">Ceremony Agenda</h2>
           </div>

           <div className="space-y-16">
              {agenda.map((item, i) => (
                <div key={i} className="flex items-center gap-10 group">
                   <div className="w-24 text-right">
                      <span className="text-3xl font-['Cormorant_Garamond'] text-[#d4b59d] italic">{item.time}</span>
                   </div>
                   <div className="w-3 h-3 rounded-full bg-[#d4b59d]/40 group-hover:scale-150 transition-transform" />
                   <div className="flex-1 space-y-1">
                      <h3 className="text-2xl font-bold tracking-tight text-[#4a3f35]">{item.title}</h3>
                      <p className="text-lg italic text-[#4a3f35]/60 font-['Cormorant_Garamond']">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 5. Venue Section with Blend */}
      <section className="py-32 relative overflow-hidden">
         <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600" className="w-full h-full object-cover opacity-20 blur-sm" alt="" />
         </div>
         
         <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
               <div className="space-y-8 text-center md:text-left">
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#d4b59d]">The Place</span>
                    <h2 className="text-5xl md:text-7xl font-['Cormorant_Garamond'] italic leading-tight">{data.venueName}</h2>
                    <p className="text-xl italic text-[#4a3f35]/60 max-w-md mx-auto md:mx-0">{data.address}</p>
                  </div>
                  <Button 
                    className="rounded-full px-10 h-14 bg-[#d4b59d] text-white hover:bg-[#c4a58d] transition-all font-bold uppercase tracking-widest text-xs"
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(data.address)}`, '_blank')}
                  >
                    View Directions
                  </Button>
               </div>

               <div className="rounded-[4rem] overflow-hidden border-[12px] border-white shadow-2xl h-[500px]">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(data.address || data.venueName)}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                    className="sepia-[20%] opacity-80"
                  />
               </div>
            </div>
         </div>
      </section>

      {/* 6. RSVP Section */}
      <section className="py-32">
        <div className="container mx-auto px-6 max-w-3xl">
           <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-[#d4b59d]/10 relative border border-[#d4b59d]/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20 rotate-180">
                 <img src="https://images.unsplash.com/photo-1555529731-118a8a46bd3b?w=400" className="w-full h-full object-contain" alt="" />
              </div>
              
              {isSubmitted ? (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="text-center space-y-8"
                 >
                    <Heart className="h-16 w-16 text-[#d4b59d] mx-auto fill-[#d4b59d]/10" />
                    <h2 className="text-5xl font-['Great_Vibes'] text-[#d4b59d]">Thank You</h2>
                    <p className="text-xl italic font-['Cormorant_Garamond']">We've received your RSVP. We look forward to seeing you!</p>
                 </motion.div>
              ) : (
                 <div className="space-y-12">
                    <div className="text-center space-y-4">
                       <h2 className="text-5xl md:text-6xl font-['Great_Vibes'] text-[#d4b59d]">Will You Join Us?</h2>
                       <p className="text-lg italic opacity-60">Please RSVP by September 14, 2026</p>
                    </div>

                    <form 
                      onSubmit={(e) => { e.preventDefault(); onRSVP(rsvpForm); }}
                      className="space-y-8"
                    >
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <Label className="text-[10px] font-bold uppercase tracking-widest text-[#d4b59d]">Name</Label>
                             <Input 
                               required
                               placeholder="Elena Gilbert"
                               className="h-14 rounded-2xl border-[#d4b59d]/20 focus:border-[#d4b59d] italic bg-neutral-50 px-6"
                               value={rsvpForm.name}
                               onChange={(e) => setRsvpForm(prev => ({ ...prev, name: e.target.value }))}
                             />
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] font-bold uppercase tracking-widest text-[#d4b59d]">Guests</Label>
                             <Input 
                               type="number"
                               min="1"
                               className="h-14 rounded-2xl border-[#d4b59d]/20 focus:border-[#d4b59d] italic bg-neutral-50 px-6"
                               value={rsvpForm.guests}
                               onChange={(e) => setRsvpForm(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                             />
                          </div>
                       </div>

                       <div className="space-y-2 text-center">
                          <Label className="text-[10px] font-bold uppercase tracking-widest text-[#d4b59d]">Attendance</Label>
                          <div className="flex gap-4">
                             <button
                               type="button"
                               onClick={() => setRsvpForm(prev => ({ ...prev, status: 'coming' }))}
                               className={`flex-1 h-14 rounded-2xl border transition-all text-sm font-bold uppercase tracking-widest ${rsvpForm.status === 'coming' ? 'bg-[#d4b59d] border-[#d4b59d] text-white' : 'border-[#d4b59d]/20 text-[#d4b59d]/40'}`}
                             >
                               I'm Coming
                             </button>
                             <button
                               type="button"
                               onClick={() => setRsvpForm(prev => ({ ...prev, status: 'declined' }))}
                               className={`flex-1 h-14 rounded-2xl border transition-all text-sm font-bold uppercase tracking-widest ${rsvpForm.status === 'declined' ? 'bg-[#d4b59d] border-[#d4b59d] text-white' : 'border-[#d4b59d]/20 text-[#d4b59d]/40'}`}
                             >
                               Declined
                             </button>
                          </div>
                       </div>

                       <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase tracking-widest text-[#d4b59d]">Message</Label>
                          <Textarea 
                            placeholder="A message for the couple..."
                            className="min-h-[120px] rounded-2xl border-[#d4b59d]/20 focus:border-[#d4b59d] bg-neutral-50 p-6 italic"
                            value={rsvpForm.message}
                            onChange={(e) => setRsvpForm(prev => ({ ...prev, message: e.target.value }))}
                          />
                       </div>

                       <Button type="submit" className="w-full h-16 rounded-full bg-[#d4b59d] text-white hover:bg-[#c4a58d] font-bold uppercase tracking-[0.3em] text-xs shadow-xl shadow-[#d4b59d]/20">
                         Confirm RSVP
                       </Button>
                    </form>
                 </div>
              )}
           </div>
        </div>
      </section>

      <footer className="py-20 text-center opacity-30">
         <div className="flex justify-center gap-4 mb-4 text-[#d4b59d]">
            <Flower2 className="h-4 w-4" />
            <Leaf className="h-4 w-4" />
            <Flower2 className="h-4 w-4" />
         </div>
         <p className="text-[10px] font-bold uppercase tracking-[0.5em]">Tenura Floral Romantic.</p>
      </footer>
    </div>
  );
}
