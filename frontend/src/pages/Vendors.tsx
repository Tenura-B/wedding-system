import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Filter, Star, Heart, Camera, Hotel, Music, Utensils, Scissors } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const categories = [
   { id: "all", label: "All Services", icon: null },
   { id: "photography", label: "Photography", icon: <Camera className="h-4 w-4" /> },
   { id: "venues", label: "Venues", icon: <Hotel className="h-4 w-4" /> },
   { id: "music", label: "Music & DJ", icon: <Music className="h-4 w-4" /> },
   { id: "catering", label: "Catering", icon: <Utensils className="h-4 w-4" /> },
   { id: "beauty", label: "Beauty & Style", icon: <Scissors className="h-4 w-4" /> },
];

const vendors = [
  {
    id: "v1",
    name: "Golden Hour Studio",
    category: "Photography",
    rating: 4.9,
    reviews: 124,
    price: 150000,
    priceLabel: "LKR 150,000",
    img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=2070&auto=format&fit=crop",
    desc: "Capturing authentic emotion through cinematic storytelling and natural light."
  },
  {
    id: "v2",
    name: "The Rosewood Mansion",
    category: "Venues",
    rating: 5.0,
    reviews: 86,
    price: 500000,
    priceLabel: "LKR 500,000",
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
    desc: "A historic estate offering breathtaking gardens and a grand ballroom for your reception."
  },
  {
    id: "v3",
    name: "Midnight Symphony",
    category: "Music",
    rating: 4.8,
    reviews: 52,
    price: 45000,
    priceLabel: "LKR 45,000",
    img: "/images/music.png",
    desc: "Live jazz quartet and expert DJs to keep your celebration alive all night long."
  },
  {
    id: "v4",
    name: "Culinaria Boutique",
    category: "Catering",
    rating: 4.9,
    reviews: 210,
    price: 120000,
    priceLabel: "LKR 120,000",
    img: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop",
    desc: "Farm-to-table gourmet experiences tailored to your specific palate and theme."
  },
  {
    id: "v5",
    name: "Luxe Glamour Team",
    category: "Beauty",
    rating: 4.7,
    reviews: 94,
    price: 35000,
    priceLabel: "LKR 35,000",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop",
    desc: "Premium bridal makeup and hair styling for you and your entire bridal party."
  },
  {
    id: "v6",
    name: "Silver Lake Gardens",
    category: "Venues",
    rating: 4.8,
    reviews: 42,
    price: 180000,
    priceLabel: "LKR 180,000",
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop",
    desc: "A serene waterfront venue with modern glass pavilion and lush outdoor ceremony space."
  }
];

export default function Vendors() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activePreset, setActivePreset] = useState("any");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [appliedRange, setAppliedRange] = useState({ min: 0, max: Infinity });

  const handlePresetChange = (preset: string) => {
    setActivePreset(preset);
    let range = { min: 0, max: Infinity };
    
    if (preset === "upto50") range = { min: 0, max: 50000 };
    else if (preset === "50to150") range = { min: 50000, max: 150000 };
    else if (preset === "over150") range = { min: 150000, max: Infinity };
    
    setAppliedRange(range);
    setMinPrice(range.min === 0 && range.max === Infinity ? "" : range.min.toString());
    setMaxPrice(range.max === Infinity ? "" : range.max.toString());
  };

  const handleGo = () => {
    setActivePreset("custom");
    setAppliedRange({
      min: minPrice === "" ? 0 : Number(minPrice),
      max: maxPrice === "" ? Infinity : Number(maxPrice)
    });
  };

  const filteredVendors = vendors.filter(v => {
    const categoryMatch = activeCategory === "all" || v.category.toLowerCase().includes(activeCategory);
    const priceMatch = v.price >= appliedRange.min && v.price <= appliedRange.max;
    return categoryMatch && priceMatch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 bg-neutral-50">
        <header className="bg-white py-16 border-b border-neutral-100">
           <div className="container mx-auto px-4 text-center">
             <h1 className="text-4xl md:text-6xl font-serif mb-6">Curated Vendors</h1>
             <p className="text-muted-foreground max-w-2xl mx-auto text-lg">We've partnered with the finest wedding professionals to bring your vision to life with zero compromise.</p>
           </div>
        </header>

        <section className="max-w-[1600px] mx-auto px-4 py-12">
           <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filters */}
              <aside className="w-full lg:w-84 space-y-8">
                 <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm">
                    <h3 className="font-medium mb-4 flex items-center gap-2">
                       <Filter className="h-4 w-4" />
                       Categories
                    </h3>
                    <div className="space-y-2">
                       {categories.map(cat => (
                          <button 
                             key={cat.id}
                             onClick={() => setActiveCategory(cat.id)}
                             className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${activeCategory === cat.id ? 'bg-black text-white' : 'hover:bg-neutral-100 text-neutral-600'}`}
                          >
                             {cat.icon || <Star className="h-4 w-4 opacity-50" />}
                             {cat.label}
                          </button>
                       ))}
                    </div>
                 </div>

                 {/* 🏷️ IMAGE-BASED PRICE FILTER */}
                 <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                       <h3 className="font-bold text-gray-900">Filter by Price Range</h3>
                       <button className="text-neutral-400 hover:text-black transition-colors">
                          <Filter className="h-4 w-4 rotate-180" />
                       </button>
                    </div>

                    {/* Presets */}
                    <div className="space-y-4 mb-8">
                       {[
                         { id: "any", label: "Any price" },
                         { id: "upto50", label: "Upto LKR 50,000" },
                         { id: "50to150", label: "LKR 50,000 – LKR 150,000" },
                         { id: "over150", label: "Over LKR 150,000" }
                       ].map(preset => (
                          <label key={preset.id} className="flex items-center gap-3 group cursor-pointer">
                             <div className="relative flex items-center justify-center">
                                <input 
                                   type="radio" 
                                   name="pricePreset" 
                                   className="peer sr-only" 
                                   checked={activePreset === preset.id}
                                   onChange={() => handlePresetChange(preset.id)}
                                />
                                <div className="w-5 h-5 rounded-full border-2 border-neutral-300 peer-checked:border-blue-500 transition-all" />
                                <div className="absolute w-2.5 h-2.5 rounded-full bg-blue-500 scale-0 peer-checked:scale-100 transition-transform" />
                             </div>
                             <span className={`text-[16px] transition-colors ${activePreset === preset.id ? 'text-blue-500 font-medium' : 'text-neutral-600 group-hover:text-black'}`}>
                                {preset.label}
                             </span>
                          </label>
                       ))}
                    </div>

                    {/* Custom Inputs */}
                    <div className="flex items-center gap-2 mb-6">
                       <input 
                          type="number"
                          placeholder="Min"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          className="w-full h-10 px-2 border border-neutral-300 rounded focus:outline-none focus:border-blue-500 text-sm transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                       />
                       <span className="text-sm text-neutral-400">to</span>
                       <input 
                          type="number"
                          placeholder="Max"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          className="w-full h-10 px-2 border border-neutral-300 rounded focus:outline-none focus:border-blue-500 text-sm transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                       />
                       <button 
                          onClick={handleGo}
                          className="h-10 px-3 border border-neutral-300 rounded bg-neutral-50 hover:bg-white text-xs font-bold transition-all hover:border-blue-500 hover:text-blue-500 uppercase tracking-wider"
                       >
                          GO
                       </button>
                    </div>

                    {/* Visual Slider Placeholder */}
                    <div className="relative h-1.5 bg-blue-500 rounded-full w-full">
                       <div className="absolute left-0 -top-1.5 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md cursor-pointer" />
                       <div className="absolute right-0 -top-1.5 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md cursor-pointer" />
                    </div>
                 </div>
              </aside>

                  {/* Vendor Grid */}
                  <div className="flex-grow">
                     <div className="relative mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                           placeholder="Search by vendor name or keyword..."
                           className="w-full bg-white rounded-2xl py-4 pl-12 pr-6 border border-neutral-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-200 transition-all"
                        />
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredVendors.map((vendor, i) => (
                           <motion.div
                              key={vendor.id}
                              layout
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                              className="bg-white rounded-[2rem] overflow-hidden border border-neutral-100 shadow-sm group hover:shadow-xl transition-all duration-500"
                           >
                              <div className="relative h-56">
                                 <img
                                    src={vendor.img}
                                    alt={vendor.name}
                                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ${vendor.category === 'Photography' ? 'object-[center_30%]' : ''}`}
                                 />
                                 <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-rose-500 hover:text-white transition-all">
                                    <Heart className="h-5 w-5" />
                                 </button>
                                 <div className="absolute top-4 left-4">
                                    <Badge className="bg-white/90 text-black hover:bg-white border-0 backdrop-blur-md rounded-lg">
                                       {vendor.category}
                                    </Badge>
                                 </div>
                              </div>

                              <div className="p-6">
                                 <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-medium">{vendor.name}</h3>
                                    <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                                       <Star className="h-4 w-4 fill-current" />
                                       {vendor.rating}
                                    </div>
                                 </div>
                                 <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                                    {vendor.desc}
                                 </p>
                                 <div className="flex items-center justify-between border-t border-neutral-50 pt-4">
                                    <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest">{vendor.priceLabel}</span>
                                    <Button asChild variant="ghost" className="text-neutral-900 group-hover:translate-x-1 transition-transform">
                                       <Link to={`/vendors/${vendor.id}`}>View Profile</Link>
                                    </Button>
                                 </div>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                  </div>
               </div>
            </section>
         </main>

         <Footer />
      </div>
   );
}
