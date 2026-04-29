import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Heart, 
  Gift, 
  Check, 
  ArrowRight,
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

export default function MinimalTemplate({ data, timeLeft, onRSVP, isSubmitted }: TemplateProps) {
  const [rsvpForm, setRsvpForm] = useState({ name: "", status: "coming", guests: 1, message: "" });

  const agenda = [
    { time: data.time || "16:00", title: "Ceremony", venue: data.venueName },
    { time: "17:30", title: "Cocktails", venue: "The Terrace" },
    { time: "19:00", title: "Dinner", venue: "Main Hall" },
    { time: "21:00", title: "Dancing", venue: "Main Hall" }
  ];

  return (
    <div className="font-sans bg-white text-black selection:bg-black selection:text-white">
      {/* 1. Hero / Picture */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden p-6 md:p-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={data.photoUrl || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600"} 
            className="w-full h-full object-cover"
            alt="Couple"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="relative z-10 w-full h-full border-[1px] border-white/40 flex flex-col items-center justify-between py-20 px-6 backdrop-blur-[2px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-sm font-bold uppercase tracking-[1em] text-white/80">The Wedding of</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter text-white leading-none">
              {data.brideName?.split(' ')[0]} <br className="md:hidden" />
              <span className="text-4xl md:text-7xl align-middle mx-4">&</span> <br className="md:hidden" />
              {data.groomName?.split(' ')[0]}
            </h1>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1 }}
             className="flex flex-col items-center gap-4 text-white"
          >
             <p className="text-lg font-medium tracking-widest uppercase">
               {data.date ? format(parseISO(data.date), 'dd . MM . yyyy') : '12 . 06 . 2026'}
             </p>
             <div className="w-px h-20 bg-white/40" />
          </motion.div>
        </div>
      </section>

      {/* 2. Countdown + Calendar Details */}
      <section className="py-32 border-b border-black/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-end">
            <div className="space-y-12">
               <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">
                 Counting <br /> Down.
               </h2>
               <div className="flex gap-12">
                 {[
                   { label: 'Days', value: timeLeft?.days ?? 0 },
                   { label: 'Hours', value: timeLeft?.hours ?? 0 },
                   { label: 'Mins', value: timeLeft?.minutes ?? 0 }
                 ].map((item, i) => (
                   <div key={i} className="flex flex-col">
                     <span className="text-6xl md:text-8xl font-bold">{String(item.value).padStart(2, '0')}</span>
                     <span className="text-xs font-bold uppercase tracking-widest mt-2">{item.label}</span>
                   </div>
                 ))}
               </div>
            </div>

            <div className="space-y-8 pb-4">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 border border-black flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-all">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                   <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Date</p>
                   <p className="text-2xl font-bold">
                     {data.date ? format(parseISO(data.date), 'EEEE, MMMM do yyyy') : 'Friday, June 12th 2026'}
                   </p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 border border-black flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-all">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                   <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Time</p>
                   <p className="text-2xl font-bold">{data.time || '16:00'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Photo Gallery */}
      <section className="py-32 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 aspect-[16/9] overflow-hidden group relative">
               <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
               <div className="absolute bottom-10 left-10 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-sm font-bold uppercase tracking-widest">Pre-Wedding Shoot</p>
               </div>
            </div>
            <div className="aspect-square overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="" />
            </div>
            <div className="aspect-square overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
            </div>
            <div className="lg:col-span-2 aspect-[16/9] overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=1200" className="w-full h-full object-cover" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Ceremony Agenda */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">The <br /> Event.</h2>
            <p className="max-w-md text-xl font-medium leading-relaxed text-neutral-500">
               We’ve planned a day full of love, laughter, and celebration. Here is how the day will unfold.
            </p>
          </div>

          <div className="border-t border-black">
            {agenda.map((item, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-3 py-12 border-b border-black/10 items-center group hover:bg-neutral-50 transition-colors px-4">
                <span className="text-3xl font-bold text-neutral-300 group-hover:text-black transition-colors">{item.time}</span>
                <span className="text-4xl font-bold py-4 md:py-0">{item.title}</span>
                <span className="text-lg font-medium text-neutral-500 text-left md:text-right">{item.venue}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Venue Section with Blend */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(data.address || data.venueName)}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
            className="grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-white/20 pointer-events-none" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
           <motion.div 
             initial={{ x: -50, opacity: 0 }}
             whileInView={{ x: 0, opacity: 1 }}
             className="bg-black text-white p-12 md:p-20 max-w-2xl shadow-[40px_40px_0px_#f5f5f5]"
           >
              <h2 className="text-5xl font-bold mb-6 tracking-tighter">Venue.</h2>
              <div className="space-y-4 mb-10">
                 <p className="text-2xl font-bold uppercase tracking-wider">{data.venueName}</p>
                 <p className="text-lg text-white/60 leading-relaxed font-medium">
                   {data.address}
                 </p>
              </div>
              <Button 
                variant="outline" 
                className="rounded-none border-white text-white hover:bg-white hover:text-black h-16 px-10 text-xs font-bold uppercase tracking-widest transition-all"
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(data.address || data.venueName)}`, '_blank')}
              >
                Get Directions
              </Button>
           </motion.div>
        </div>
      </section>

      {/* 6. RSVP Section */}
      <section className="py-32 bg-black text-white">
        <div className="container mx-auto px-6 max-w-4xl">
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 space-y-8"
            >
              <div className="w-20 h-20 border-2 border-white flex items-center justify-center mx-auto">
                 <Check className="h-10 w-10" />
              </div>
              <h2 className="text-6xl font-bold tracking-tighter italic">Confirmed.</h2>
              <p className="text-xl text-white/60 font-medium">We've received your RSVP. See you there.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
               <div className="space-y-10">
                 <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">Will You <br /> Attend?</h2>
                 <p className="text-xl text-white/40 leading-relaxed font-medium">
                   Kindly respond by September 14. We are excited to celebrate this milestone with you.
                 </p>
               </div>

               <form 
                 onSubmit={(e) => { e.preventDefault(); onRSVP(rsvpForm); }}
                 className="space-y-8"
               >
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <Label className="text-xs font-bold uppercase tracking-widest text-white/40">Full Name</Label>
                       <input 
                         required
                         className="w-full bg-transparent border-b-2 border-white/20 focus:border-white py-4 text-2xl font-bold outline-none transition-all placeholder:text-white/10"
                         placeholder="Elena Gilbert"
                         value={rsvpForm.name}
                         onChange={(e) => setRsvpForm(prev => ({ ...prev, name: e.target.value }))}
                       />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-xs font-bold uppercase tracking-widest text-white/40">Guests</Label>
                       <input 
                         type="number"
                         min="1"
                         className="w-full bg-transparent border-b-2 border-white/20 focus:border-white py-4 text-2xl font-bold outline-none transition-all"
                         value={rsvpForm.guests}
                         onChange={(e) => setRsvpForm(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                       />
                    </div>
                 </div>

                 <div className="flex gap-6">
                    <button
                      type="button"
                      onClick={() => setRsvpForm(prev => ({ ...prev, status: 'coming' }))}
                      className={`flex-1 py-6 border-2 transition-all font-bold uppercase tracking-widest text-xs ${rsvpForm.status === 'coming' ? 'bg-white text-black border-white' : 'border-white/20 text-white/40 hover:border-white/40'}`}
                    >
                      I Am Coming
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpForm(prev => ({ ...prev, status: 'declined' }))}
                      className={`flex-1 py-6 border-2 transition-all font-bold uppercase tracking-widest text-xs ${rsvpForm.status === 'declined' ? 'bg-white text-black border-white' : 'border-white/20 text-white/40 hover:border-white/40'}`}
                    >
                      I Am Not
                    </button>
                 </div>

                 <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-white/40">Note</Label>
                    <textarea 
                      className="w-full bg-transparent border-2 border-white/20 focus:border-white p-6 text-lg font-bold outline-none transition-all min-h-[150px] placeholder:text-white/10"
                      placeholder="Dietary requirements..."
                      value={rsvpForm.message}
                      onChange={(e) => setRsvpForm(prev => ({ ...prev, message: e.target.value }))}
                    />
                 </div>

                 <button type="submit" className="w-full py-8 bg-white text-black font-bold uppercase tracking-[0.4em] text-sm hover:invert transition-all">
                   Submit RSVP
                 </button>
               </form>
            </div>
          )}
        </div>
      </section>

      {/* Floating RSVP Button */}
      <div className="fixed bottom-10 right-10 z-50">
         <button 
           onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
           className="w-20 h-20 bg-black text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl group"
         >
            <Plus className="h-8 w-8 group-hover:rotate-45 transition-transform" />
            <span className="absolute -top-10 right-0 bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">RSVP Now</span>
         </button>
      </div>

      <footer className="py-12 text-center text-[10px] font-bold uppercase tracking-[0.5em] opacity-20">
         Tenura Modern Minimal.
      </footer>
    </div>
  );
}
