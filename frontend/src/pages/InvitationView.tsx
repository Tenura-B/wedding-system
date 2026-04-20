import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Heart, Share2, Map as MapIcon, ExternalLink, ChevronRight, Check, Gift } from "lucide-react";
import { format, parseISO, intervalToDuration } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface InvitationViewProps {
  previewData?: any;
}

export default function InvitationView({ previewData }: InvitationViewProps) {
  const { slug } = useParams();
  const [data, setData] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<any>(null);
  const [rsvpData, setRsvpData] = useState({ name: "", status: "coming", guests: 1, message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (previewData) {
      setData(previewData);
      return;
    }
    
    const saved = localStorage.getItem(`wedding-${slug}`);
    if (saved) {
      setData(JSON.parse(saved));
    } else {
      // Demo data if none found
      setData({
        brideName: "Amelia Thorne",
        groomName: "Jameson Grey",
        date: "2026-06-12",
        time: "16:00",
        venueName: "The Grand Rose Estate",
        address: "123 Lavender Lane, Napa Valley, CA 94558",
        message: "We are joyfully announcing our marriage and would be honored if you could join us for this special celebration of love and commitment.",
        template: "classic"
      });
    }
  }, [slug, previewData]);

  useEffect(() => {
    if (!data?.date) return;
    
    try {
      const targetDate = parseISO(`${data.date}T${data.time || '00:00'}:00`);
      if (isNaN(targetDate.getTime())) return;
      
      const timer = setInterval(() => {
        const now = new Date();
        if (now >= targetDate) {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          return;
        }
        
        const duration = intervalToDuration({ start: now, end: targetDate });
        setTimeLeft(duration);
      }, 1000);

      return () => clearInterval(timer);
    } catch (error) {
      console.error("Error setting up countdown:", error);
    }
  }, [data]);

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    const existingRSVPs = JSON.parse(localStorage.getItem(`wedding-rsvps-${slug}`) || "[]");
    const updatedRSVPs = [...existingRSVPs, { ...rsvpData, id: Date.now() }];
    localStorage.setItem(`wedding-rsvps-${slug}`, JSON.stringify(updatedRSVPs));
    setIsSubmitted(true);
  };

  if (!data) return null;

  const isDark = data.template === "luxury";
  const isMinimal = data.template === "minimal";
  const isFloral = data.template === "floral";

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${
      isDark ? 'bg-neutral-950 text-white' : 
      isFloral ? 'bg-rose-50 text-neutral-900 font-serif' : 
      'bg-white text-neutral-900'
    }`}>
      
      {/* Dynamic Template Rendering */}
      
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Decorative elements based on template */}
        {isFloral && (
          <>
            <img src="https://images.unsplash.com/photo-1555529731-118a8a46bd3b?w=400&auto=format&fit=crop" className="absolute top-0 right-0 w-64 opacity-20 rotate-180" alt="" />
            <img src="https://images.unsplash.com/photo-1555529731-118a8a46bd3b?w=400&auto=format&fit=crop" className="absolute bottom-0 left-0 w-64 opacity-20" alt="" />
          </>
        )}
        
        {isDark && (
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black z-0" />
        )}
        
        <div className="relative z-10 max-w-4xl space-y-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className={`flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 ${isMinimal ? 'font-sans text-center' : 'font-serif text-center md:text-left'}`}
          >
            <h1 className="text-5xl md:text-8xl lg:text-9xl tracking-tight break-words px-4">
              {data.brideName ? data.brideName.split(' ')[0] : 'Bride'}
            </h1>
            <Heart className={`h-8 w-8 md:h-12 md:w-12 ${isDark ? 'text-amber-500' : 'text-rose-400'} animate-pulse`} />
            <h1 className="text-5xl md:text-8xl lg:text-9xl tracking-tight break-words px-4">
              {data.groomName ? data.groomName.split(' ')[0] : 'Groom'}
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="space-y-6 text-center"
          >
            <p className={`text-lg md:text-2xl font-light tracking-wide ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Are Tying the Knot
            </p>
            <div className={`h-[1px] w-24 mx-auto ${isDark ? 'bg-amber-500' : 'bg-neutral-900'}`} />
            <p 
              className={`text-xl md:text-3xl font-serif max-w-2xl mx-auto leading-relaxed px-6 ${isMinimal ? 'font-sans italic' : ''}`}
            >
              "{data.message}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Details Section */}
      <section className={`py-24 border-t ${isDark ? 'border-neutral-800' : 'border-neutral-100'}`}>
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${isDark ? 'bg-amber-500/10 text-amber-500' : 'bg-neutral-100'}`}>
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-sm uppercase font-bold tracking-[0.2em] text-muted-foreground">The Date</h3>
              <p className="text-2xl font-serif">
                {data.date ? format(parseISO(data.date), 'MMMM d, yyyy') : 'Date to be announced'}
              </p>
            </div>
            
            <div className="space-y-4">
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${isDark ? 'bg-amber-500/10 text-amber-500' : 'bg-neutral-100'}`}>
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-sm uppercase font-bold tracking-[0.2em] text-muted-foreground">The Ceremony</h3>
              <p className="text-2xl font-serif">
                {data.time || '4:00 PM'}
              </p>
            </div>
            
            <div className="space-y-4">
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${isDark ? 'bg-amber-500/10 text-amber-500' : 'bg-neutral-100'}`}>
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-sm uppercase font-bold tracking-[0.2em] text-muted-foreground">The Venue</h3>
              <p className="text-2xl font-serif leading-tight">
                {data.venueName}
              </p>
              <p className="text-sm text-muted-foreground mb-4">{data.address}</p>
              
              <div className="rounded-2xl overflow-hidden h-48 w-full border border-neutral-200">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(data.address)}&t=&z=13&ie=UTF8&iwloc=B&output=embed`}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      {timeLeft && (
        <section className={`py-24 ${isDark ? 'bg-neutral-900 shadow-inner' : 'bg-neutral-50'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-center text-sm uppercase font-bold tracking-[0.3em] text-muted-foreground mb-12">Countdown To I Do</h2>
            <div className="flex justify-center gap-4 md:gap-12">
              {[
                { label: 'Days', value: timeLeft.days ?? 0 },
                { label: 'Hours', value: timeLeft.hours ?? 0 },
                { label: 'Minutes', value: timeLeft.minutes ?? 0 },
                { label: 'Seconds', value: timeLeft.seconds ?? 0 }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`text-5xl md:text-7xl font-serif mb-2 ${isDark ? 'text-amber-500' : ''}`}>
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-[16px] md:text-[16px] uppercase font-bold tracking-widest opacity-60">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Placeholder */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-serif text-4xl mb-12">Capturing Today, Remembering Forever</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-200">
                <img 
                  src={`https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop&sig=${i}`} 
                  alt="" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 cursor-copy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registry Section */}
      {data.registries && data.registries.length > 0 && (
        <section className={`py-24 ${isDark ? 'bg-neutral-900 shadow-inner' : 'bg-neutral-50'}`}>
          <div className="container mx-auto px-4 max-w-4xl">
             <div className="text-center mb-12">
               <span className={`text-[16px] tracking-[0.4em] uppercase font-bold opacity-60 mb-4 block`}>Curation of Love</span>
               <h2 className="text-4xl md:text-5xl font-serif">Gift Registry</h2>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {data.registries.map((reg: any, i: number) => (
                 <a 
                   key={i} 
                   href={reg.url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className={`group flex items-center justify-between p-6 rounded-[2rem] border transition-all duration-500 ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-neutral-100 hover:shadow-xl'}`}
                 >
                   <div className="flex items-center gap-4">
                     <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-amber-500/20 text-amber-500' : 'bg-neutral-100 text-neutral-900 group-hover:bg-black group-hover:text-white transition-colors'}`}>
                       <Gift className="h-6 w-6" />
                     </div>
                     <span className="font-serif text-xl">{reg.name}</span>
                   </div>
                   <ExternalLink className="h-5 w-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                 </a>
               ))}
             </div>
          </div>
        </section>
      )}

      {/* RSVP Section in place of footer */}
      <section className={`py-32 px-4 transition-all duration-1000 border-t ${isDark ? 'border-neutral-800' : 'border-neutral-100'}`}>
        <div className="max-w-2xl mx-auto">
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-12"
            >
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${isDark ? 'bg-amber-500/10 text-amber-500' : 'bg-black text-white'}`}>
                <Check className="h-10 w-10" />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif">Thank You</h2>
              <p className="text-xl text-muted-foreground">Your response has been saved. We can't wait to see you!</p>
              <Button 
                variant="outline" 
                className="rounded-full px-8"
                onClick={() => setIsSubmitted(false)}
              >
                Update Response
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-serif">Are You Joining Us?</h2>
                <p className="text-muted-foreground">Please respond by the 14th of September, 2026</p>
              </div>

              <form onSubmit={handleRSVP} className="bg-white/5 p-8 md:p-12 rounded-[3rem] border border-white/10 space-y-8 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Label htmlFor="name" className="text-base uppercase tracking-widest opacity-60 ml-1">Full Name</Label>
                    <Input 
                      id="name" 
                      required 
                      placeholder="e.g. Elena Gilbert"
                      value={rsvpData.name}
                      onChange={(e) => setRsvpData(prev => ({ ...prev, name: e.target.value }))}
                      className={`h-14 rounded-2xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-50'} text-lg`}
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="guests" className="text-base uppercase tracking-widest opacity-60 ml-1">Number of Guests</Label>
                    <Input 
                      id="guests" 
                      type="number" 
                      min="1" 
                      max="10" 
                      placeholder="1"
                      value={rsvpData.guests}
                      onChange={(e) => setRsvpData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                      className={`h-14 rounded-2xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-50'} text-lg`}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base uppercase tracking-widest opacity-60 ml-1">Attendance</Label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setRsvpData(prev => ({ ...prev, status: 'coming' }))}
                      className={`flex-1 h-14 rounded-2xl border transition-all flex items-center justify-center gap-2 ${rsvpData.status === 'coming' ? (isDark ? 'bg-amber-500 border-amber-500 text-black' : 'bg-black border-black text-white') : (isDark ? 'border-white/10 text-white/40' : 'border-neutral-200 text-neutral-400')}`}
                    >
                      I'm Coming
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpData(prev => ({ ...prev, status: 'declined' }))}
                      className={`flex-1 h-14 rounded-2xl border transition-all flex items-center justify-center gap-2 ${rsvpData.status === 'declined' ? (isDark ? 'bg-amber-500 border-amber-500 text-black' : 'bg-black border-black text-white') : (isDark ? 'border-white/10 text-white/40' : 'border-neutral-200 text-neutral-400')}`}
                    >
                      Regretfully Decline
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="rsvp-message" className="text-base uppercase tracking-widest opacity-60 ml-1">Message (Optional)</Label>
                  <Textarea 
                    id="rsvp-message"
                    placeholder="Any special notes or dietary requirements?"
                    value={rsvpData.message}
                    onChange={(e) => setRsvpData(prev => ({ ...prev, message: e.target.value }))}
                    className={`min-h-[120px] rounded-2xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-50'} text-lg p-4`}
                  />
                </div>

                <Button type="submit" size="lg" className={`w-full h-16 rounded-full text-xl shadow-xl transition-all ${isDark ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-black text-white hover:bg-neutral-800'}`}>
                  Confirm Response
                </Button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Floating Action Bar */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex gap-2 p-2 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl">
        <Button size="icon" variant="ghost" className="rounded-full w-12 h-12 text-white bg-black/80 hover:bg-black">
          <Share2 className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="ghost" className="rounded-full w-12 h-12 text-black bg-white hover:bg-neutral-100">
          <MapIcon className="h-5 w-5" />
        </Button>
        <Button asChild className="rounded-full px-8 h-12 bg-white text-black hover:bg-neutral-100 border border-black/10">
           <Link to="/">Create Your Own</Link>
        </Button>
      </div>

    </div>
  );
}
