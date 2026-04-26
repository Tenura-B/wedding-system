import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { motion } from "motion/react"
import { Heart } from "lucide-react"

export function Testimonials() {
    return (
        <section className="py-24 md:py-32 bg-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/3" />

            <div className="container mx-auto max-w-6xl space-y-12 px-6 md:space-y-20 relative z-10">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif leading-tight">Crafted with Love, Loved by Thousands</h2>
                    <p className="text-lg md:text-xl text-ink/60 font-light leading-relaxed">
                        Ethereal Wedding is evolving to be more than just a platform. It's a curated experience helping couples and planners create moments that last a lifetime.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
                    <Card className="grid grid-rows-[auto_1fr] gap-8 sm:col-span-2 sm:p-8 lg:row-span-2 border-[#E8D5C8] shadow-2xl rounded-[3rem] bg-white group hover:shadow-gold/10 transition-all duration-500">
                        <CardHeader className="flex flex-row items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                                <Heart className="h-5 w-5 fill-gold" />
                            </div>
                            <span className="text-gold font-bold uppercase tracking-[4px] text-xs">Featured Story</span>
                        </CardHeader>
                        <CardContent>
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-8">
                                <p className="text-xl md:text-3xl font-serif italic leading-snug">
                                    "Ethereal Wedding has transformed the way we manage our invitation flow. Their extensive collection of designs and seamless RSVP tracking has significantly reduced our stress. The flexibility to personalize every aspect allowed us to create a truly unique experience. It's a game-changer for modern wedding planning."
                                </p>

                                <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                                    <Avatar className="size-14 border-2 border-gold/20">
                                        <AvatarImage
                                            src="https://images.unsplash.com/photo-1623091423310-a12192711d3?q=80&w=200&auto=format&fit=crop"
                                            alt="Sophie & Marc"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>SM</AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <cite className="text-lg font-serif not-italic">Sophie & Marc</cite>
                                        <span className="text-gold block text-sm font-bold uppercase tracking-widest leading-none mt-1">Our Happy Couple</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2 border-[#E8D5C8] rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 bg-white">
                        <CardContent className="h-full pt-10 px-8 pb-10">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-8">
                                <p className="text-xl font-serif italic">"Ethereal is really extraordinary and very practical. No need to break your head over technical details—it's a real gold mine for busy planners like me."</p>

                                <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                                    <Avatar className="size-12">
                                        <AvatarImage
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
                                            alt="Isabella Rossi"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>IR</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-base font-bold text-ink">Isabella Rossi</cite>
                                        <span className="text-gold block text-xs font-bold uppercase tracking-widest leading-none mt-1">Lead Event Designer</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    <Card className="border-[#E8D5C8] rounded-[2.5rem] shadow-xl bg-[#FDFBF7]">
                        <CardContent className="h-full pt-10 px-8 pb-10">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-8">
                                <p className="text-ink/70 italic font-light italic">"Great work on the Royal template. This is the most breathtaking website we've seen so far!"</p>

                                <div className="grid items-center gap-4 [grid-template-columns:auto_1fr]">
                                    <Avatar className="size-12">
                                        <AvatarImage
                                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                                            alt="Julian & Elena"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>JE</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-bold">Julian & Elena</cite>
                                        <span className="text-gold block text-[10px] uppercase font-bold tracking-widest mt-1 leading-none">Destination Wedding</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    <Card className="border-[#E8D5C8] rounded-[2.5rem] shadow-xl bg-white border-2">
                        <CardContent className="h-full pt-10 px-8 pb-10">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-8">
                                <p className="text-ink/70 italic font-light italic">"The support is incredible. They helped me launch my site in under an hour. Truly seamless."</p>

                                <div className="grid grid-cols-[auto_1fr] gap-4">
                                    <Avatar className="size-12">
                                        <AvatarImage
                                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
                                            alt="Claire Bennett"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>CB</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-bold text-ink">Claire Bennett</p>
                                        <span className="text-rose-500 block text-[10px] font-bold uppercase tracking-widest mt-1 leading-none">Venue Specialist</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
