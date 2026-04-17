import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Heart, Share2, Map as MapIcon } from "lucide-react";
import { format, parseISO, intervalToDuration } from "date-fns";

export default function InvitationView() {
  const { slug } = useParams();
  const [data, setData] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<any>(null);

  useEffect(() => {
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
  }, [slug]);

  useEffect(() => {
    if (!data?.date) return;
    
    const targetDate = parseISO(`${data.date}T${data.time || '00:00'}:00`);
    
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
  }, [data]);

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
              {data.brideName.split(' ')[0]}
            </h1>
            <Heart className={`h-8 w-8 md:h-12 md:w-12 ${isDark ? 'text-amber-500' : 'text-rose-400'} animate-pulse`} />
            <h1 className="text-5xl md:text-8xl lg:text-9xl tracking-tight break-words px-4">
              {data.groomName.split(' ')[0]}
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
                {format(parseISO(data.date), 'MMMM d, yyyy')}
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
              <p className="text-sm text-muted-foreground">{data.address}</p>
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

      {/* RSVP Section in place of footer */}
      <section className={`py-32 px-4 text-center border-t ${isDark ? 'border-neutral-800' : 'border-neutral-100'}`}>
        <div className="max-w-xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif">Are You Joining Us?</h2>
          <p className="text-muted-foreground">Please let us know by October 24th, 2026</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full px-12 bg-black text-white hover:bg-neutral-800 h-14 text-lg">
              I'm Coming
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-12 border-neutral-300 h-14 text-lg">
              Regretfully Decline
            </Button>
          </div>
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
