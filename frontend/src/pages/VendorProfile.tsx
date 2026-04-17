import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Star, Heart, MapPin, Phone, Mail, Globe, ArrowLeft, Camera, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function VendorProfile() {
   const { id } = useParams();

   // Data for demo
   const vendor = {
      id: id || "v1",
      name: "Golden Hour Studio",
      category: "Photography",
      rating: 4.9,
      reviews: 124,
      priceLabel: "LKR 150,000",
      img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=2070&auto=format&fit=crop",
      desc: "Capturing authentic emotion through cinematic storytelling and natural light. We believe every wedding is a collection of fleeting, beautiful moments that deserve to be preserved forever. Our approach is discreet yet intentional, ensuring we capture the real 'you' on your most special day.",
      services: [
         "Full Day Coverage (10 Hours)",
         "Two Professional Photographers",
         "High-Resolution Digital Gallery",
         "Complimentary Engagement Session",
         "Professional Retouching",
         "Custom Wedding Album"
      ],
      gallery: [
         "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069",
         "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
         "https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=2070",
         "https://images.unsplash.com/photo-1549611016-3a70d82b5040?q=80&w=2052",
         "https://images.unsplash.com/photo-1519225495810-758b63bf5007?q=80&w=2070",
         "https://images.unsplash.com/photo-1555244162-803834f70033?w=800"
      ]
   };

   return (
      <div className="flex flex-col min-h-screen">
         <Navbar />

         <main className="flex-grow pt-20">
            <section className="relative h-[60vh] overflow-hidden">
               <img src={vendor.img} className="w-full h-full object-cover object-[center_30%]" alt={vendor.name} />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
               <div className="absolute inset-x-4 bottom-12">
                  <div className="container mx-auto">
                     <Button asChild variant="outline" className="text-white border-white/20 hover:bg-white/10 backdrop-blur-md mb-8 rounded-full">
                        <Link to="/vendors">
                           <ArrowLeft className="mr-2 h-4 w-4" />
                           Back to Marketplace
                        </Link>
                     </Button>

                     <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div>
                           <div className="flex items-center gap-2 mb-2">
                              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-lg text-white text-[16px] font-bold uppercase tracking-wider">{vendor.category}</span>
                           </div>
                           <h1 className="text-4xl md:text-6xl font-serif text-white mb-2">{vendor.name}</h1>
                           <div className="flex items-center gap-4 text-white/80">
                              <div className="flex items-center gap-1">
                                 <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                 <span className="font-bold">{vendor.rating}</span>
                                 <span>({vendor.reviews} reviews)</span>
                              </div>
                              <span>•</span>
                              <span>{vendor.priceLabel}</span>
                           </div>
                        </div>

                        <div className="flex gap-4">
                           <Button size="lg" className="rounded-full bg-white text-black hover:bg-neutral-100 flex-grow sm:flex-grow-0 px-8 h-14">
                              Book Consultation
                           </Button>
                           <Button size="icon" variant="outline" className="rounded-full w-14 h-14 border-white/20 text-white hover:bg-white/10 backdrop-blur-md">
                              <Heart className="h-6 w-6" />
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            <section className="py-20 bg-white">
               <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                     {/* Left Column - Info */}
                     <div className="lg:col-span-2 space-y-12">
                        <div>
                           <h2 className="text-3xl font-serif mb-6">About the Vendor</h2>
                           <p className="text-muted-foreground text-lg leading-relaxed">
                              {vendor.desc}
                           </p>
                        </div>

                        <div>
                           <h2 className="text-3xl font-serif mb-6">Portfolio Gallery</h2>
                           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {vendor.gallery.map((img, i) => (
                                 <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.02 }}
                                    className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100"
                                 >
                                    <img src={img} className="w-full h-full object-cover" alt="" />
                                 </motion.div>
                              ))}
                           </div>
                        </div>
                     </div>

                     {/* Right Column - Sidebar */}
                     <aside className="w-full lg:w-84 space-y-8">
                        <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 sticky top-24">
                           <h3 className="text-xl font-medium mb-6">Services Included</h3>
                           <ul className="space-y-4">
                              {vendor.services.map((service, i) => (
                                 <li key={i} className="flex gap-3 text-[16px] text-neutral-600">
                                    <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                                    {service}
                                 </li>
                              ))}
                           </ul>

                           <div className="mt-10 pt-10 border-t border-neutral-200 space-y-4">
                              <div className="flex items-center gap-3 text-[16px] text-neutral-600 hover:text-black transition-colors cursor-pointer group">
                                 <MapPin className="h-5 w-5 text-neutral-400 group-hover:text-black" />
                                 New York, NY 10012
                              </div>
                              <div className="flex items-center gap-3 text-[16px] text-neutral-600 hover:text-black transition-colors cursor-pointer group">
                                 <Phone className="h-5 w-5 text-neutral-400 group-hover:text-black" />
                                 +1 (555) 123-4567
                              </div>
                              <div className="flex items-center gap-3 text-[16px] text-neutral-600 hover:text-black transition-colors cursor-pointer group">
                                 <Mail className="h-5 w-5 text-neutral-400 group-hover:text-black" />
                                 hello@goldenhour.com
                              </div>
                              <div className="flex items-center gap-3 text-[16px] text-neutral-600 hover:text-black transition-colors cursor-pointer group">
                                 <Globe className="h-5 w-5 text-neutral-400 group-hover:text-black" />
                                 www.goldenhour.studio
                              </div>
                           </div>
                        </div>
                     </aside>
                  </div>
               </div>
            </section>
         </main>

         <Footer />
      </div>
   );
}
