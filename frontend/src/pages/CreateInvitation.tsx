import React, { useState, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  ArrowLeft,
  Heart,
  Calendar,
  MapPin,
  CheckCircle2,
  Upload,
  Gift,
  Plus,
  Trash2,
  Layers,
  Layout,
  Globe,
  Smartphone,
  Eye,
  Copy,
  Check,
  Zap,
  Sparkles,
  ExternalLink
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { TemplatePreview } from "@/components/invitation/TemplatePreview";

const steps = [
  { id: "details", title: "Wedding Details", icon: <Heart className="h-5 w-5" /> },
  { id: "format", title: "Choose Format", icon: <Layers className="h-5 w-5" /> },
  { id: "finish", title: "Preview & Publish", icon: <Globe className="h-5 w-5" /> }
];

const templates = [
  {
    id: "classic",
    name: "Classic Elegant",
    description: "Time-honored serif fonts with gold accents.",
    img: "/images/1.jpg",
    tags: ["Serif", "Gold"]
  },
  {
    id: "minimal",
    name: "Modern Minimal",
    description: "Stripped-back aesthetics with bold typography.",
    img: "/images/2.jpg",
    tags: ["Clean", "Modern"]
  },
  {
    id: "floral",
    name: "Floral Romantic",
    description: "Soft pastel palettes with botanical illustrations.",
    img: "/images/3.jpg",
    tags: ["Organic", "Serif"]
  },
  {
    id: "luxury",
    name: "Dark Luxury",
    description: "High-contrast cinematic aesthetic.",
    img: "/images/88.jpg",
    tags: ["Bold", "Exclusive"]
  }
];

export default function CreateInvitation() {
  const [searchParams] = useSearchParams();
  const initialTemplate = searchParams.get("template") || "classic";
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentStep, setCurrentStep] = useState(0);
  const [format, setFormat] = useState<"website" | "card" | null>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const [formData, setFormData] = useState({
    brideName: "",
    groomName: "",
    date: "",
    time: "",
    venueName: "",
    address: "",
    message: "We are joyfully announcing our marriage and would be honored if you could join us for this special celebration.",
    template: initialTemplate,
    photo: null as string | null,
    registries: [] as { name: string; url: string }[]
  });

  // Details sub-steps
  const [detailsStep, setDetailsStep] = useState(0);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addRegistry = () => {
    setFormData(prev => ({
      ...prev,
      registries: [...prev.registries, { name: "", url: "" }]
    }));
  };

  const updateRegistry = (index: number, field: "name" | "url", value: string) => {
    setFormData(prev => ({
      ...prev,
      registries: prev.registries.map((r, i) => i === index ? { ...r, [field]: value } : r)
    }));
  };

  const removeRegistry = (index: number) => {
    setFormData(prev => ({
      ...prev,
      registries: prev.registries.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep === 0) {
      if (detailsStep < 3) {
        setDetailsStep(prev => prev + 1);
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(curr => curr + 1);
    }
  };

  const prevStep = () => {
    if (currentStep === 0) {
      if (detailsStep > 0) {
        setDetailsStep(prev => prev - 1);
        return;
      }
    }

    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
    }
  };

  const publishInvitation = () => {
    setIsPublishing(true);
    // Simulate a brief premium "creation" moment
    setTimeout(() => {
      const slug = `${formData.brideName.toLowerCase().split(' ')[0]}-${formData.groomName.toLowerCase().split(' ')[0]}-${Date.now().toString().slice(-4)}`;
      localStorage.setItem(`wedding-${slug}`, JSON.stringify(formData));
      setIsPublished(true);
      setPublishedSlug(slug);
      setIsPublishing(false);
    }, 2000);
  };

  const handlePreview = () => {
    localStorage.setItem('wedding-preview-draft', JSON.stringify(formData));
    window.open('/preview/draft', '_blank');
  };

  const [publishedSlug, setPublishedSlug] = useState("");

  const copyToClipboard = () => {
    const url = `${window.location.origin}/invite/${publishedSlug}`;
    navigator.clipboard.writeText(url);
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 2000);
  };

  const isDetailsValid = formData.brideName && formData.groomName && formData.date && formData.venueName;

  return (
    <div className="min-h-screen bg-[#FBFBFD]">
      <Navbar isDark={false} />

      <main className="pt-20 md:pt-24 pb-20 px-4 md:px-12 transition-colors duration-1000 bg-[#FBFBFD]">
        <div className="container mx-auto">

          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-3xl md:text-7xl font-serif mb-4 text-neutral-900 transition-colors duration-500">
                {currentStep === 2 ? 'Final Polish' : 'Invitation Details'}
              </h1>
              <p className="text-[10px] md:text-md uppercase tracking-[0.3em] font-bold text-neutral-400 transition-colors duration-500">
                Step {currentStep + 1} <span className="mx-2 opacity-30">/</span> {steps[currentStep].title}
              </p>
            </motion.div>

            <div className="flex p-1 rounded-[1.5rem] md:rounded-[2rem] border transition-all duration-700 shadow-sm relative z-10 overflow-hidden bg-neutral-100 border-neutral-200">
              {steps.map((step, i) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-[1.2rem] md:rounded-2xl transition-all duration-500 whitespace-nowrap ${currentStep === i ? 'bg-white text-black shadow-md' : 'text-neutral-400'}`}
                >
                  {currentStep > i ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <div className="h-4 w-4 flex items-center justify-center shrink-0">{step.icon}</div>}
                  <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] hidden sm:inline">{step.title}</span>
                </div>
              ))}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Form Side - Becomes Full Width and Centered for steps 0-1 */}
            <div className={`transition-all duration-1000 mx-auto w-full ${currentStep === 2 ? 'lg:col-span-12 max-w-[1440px]' : 'lg:col-span-12 max-w-5xl'}`}>
              <div className={`transition-all duration-1000 ${currentStep === 2 ? 'bg-transparent border-none shadow-none p-0' : 'bg-white rounded-3xl md:rounded-[2.5rem] p-5 md:p-10 shadow-xl border border-neutral-200/50 min-h-[500px] md:min-h-[600px] flex flex-col justify-between relative overflow-hidden'}`}>

                <AnimatePresence mode="wait">
                  {/* Phase 1: Details */}
                  {currentStep === 0 && (
                    <motion.div
                      key="phase-details"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-8"
                    >
                      <div className="flex gap-2 mb-6">
                        {[0, 1, 2, 3].map(i => (
                          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${detailsStep >= i ? 'bg-black' : 'bg-neutral-100'}`} />
                        ))}
                      </div>

                      {detailsStep === 0 && (
                        <div className="space-y-6">
                          <h2 className="text-2xl font-serif">The Happy Couple</h2>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label className="text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Bride's Full Name</Label>
                              <Input
                                placeholder="Elena Gilbert"
                                className="h-12 md:h-14 rounded-xl md:rounded-2xl px-4 md:px-6 text-base md:text-lg border-neutral-100 bg-neutral-50/50"
                                value={formData.brideName}
                                onChange={(e) => setFormData(prev => ({ ...prev, brideName: e.target.value }))}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Groom's Full Name</Label>
                              <Input
                                placeholder="Damon Salvatore"
                                className="h-12 md:h-14 rounded-xl md:rounded-2xl px-4 md:px-6 text-base md:text-lg border-neutral-100 bg-neutral-50/50"
                                value={formData.groomName}
                                onChange={(e) => setFormData(prev => ({ ...prev, groomName: e.target.value }))}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {detailsStep === 1 && (
                        <div className="space-y-6">
                          <h2 className="text-2xl font-serif">Date & Ceremony</h2>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label className="text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Wedding Date</Label>
                              <Input
                                type="date"
                                className="h-12 md:h-14 rounded-xl md:rounded-2xl px-4 md:px-6 text-base md:text-lg border-neutral-100 bg-neutral-50/50"
                                value={formData.date}
                                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Start Time</Label>
                              <Input
                                type="time"
                                className="h-12 md:h-14 rounded-xl md:rounded-2xl px-4 md:px-6 text-base md:text-lg border-neutral-100 bg-neutral-50/50"
                                value={formData.time}
                                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {detailsStep === 2 && (
                        <div className="space-y-6">
                          <h2 className="text-2xl font-serif">Venue Location</h2>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label className="text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Venue Name</Label>
                              <Input
                                placeholder="The Grand Palace"
                                className="h-12 md:h-14 rounded-xl md:rounded-2xl px-4 md:px-6 text-base md:text-lg border-neutral-100 bg-neutral-50/50"
                                value={formData.venueName}
                                onChange={(e) => setFormData(prev => ({ ...prev, venueName: e.target.value }))}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Full Address</Label>
                              <Textarea
                                placeholder="123 Wedding Lane, Estate Valley..."
                                className="min-h-[100px] md:min-h-[120px] rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-base md:text-lg border-neutral-100 bg-neutral-50/50"
                                value={formData.address}
                                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {detailsStep === 3 && (
                        <div className="space-y-6">
                          <h2 className="text-2xl font-serif">Final Touches</h2>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label className="text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Invitee Message</Label>
                              <Textarea
                                className="min-h-[80px] md:min-h-[100px] rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-base md:text-lg border-neutral-100 bg-neutral-50/50"
                                value={formData.message}
                                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                              />
                            </div>

                            <div className="bg-neutral-50 rounded-3xl p-6 border-2 border-dashed border-neutral-200 flex flex-col items-center text-center">
                              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                              {formData.photo ? (
                                <div className="relative group">
                                  <img src={formData.photo} className="h-24 md:h-32 w-40 md:w-48 object-cover rounded-2xl shadow-lg" alt="" />
                                  <Button size="icon" variant="destructive" className="absolute -top-2 -right-2 rounded-full h-8 w-8" onClick={() => setFormData(prev => ({ ...prev, photo: null }))}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ) : (
                                <>
                                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center mb-2 md:mb-3 shadow-sm text-neutral-400">
                                    <Upload className="h-5 w-5 md:h-6 md:w-6" />
                                  </div>
                                  <p className="font-bold text-xs mb-1">Add a Photo of You Both</p>
                                  <Button variant="outline" size="sm" className="rounded-full mt-2 h-9" onClick={() => fileInputRef.current?.click()}>Upload Image</Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Phase 2: Format Selection */}
                  {currentStep === 1 && (
                    <motion.div
                      key="phase-format"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="space-y-8"
                    >
                      <h2 className="text-3xl font-serif text-center">How would you like to invite?</h2>
                      <div className="grid grid-cols-1 gap-4">
                        <button
                          onClick={() => setFormat('website')}
                          className={`group p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border-2 transition-all duration-500 text-left relative overflow-hidden ${format === 'website' ? 'border-black bg-black text-white shadow-2xl scale-[1.02]' : 'border-neutral-100 bg-neutral-50 hover:border-neutral-300'}`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl transition-colors ${format === 'website' ? 'bg-white/10' : 'bg-white shadow-sm text-neutral-400'}`}>
                              <Globe className="h-6 w-6 md:h-8 md:w-8" />
                            </div>
                            {format === 'website' && <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-emerald-400 animate-in zoom-in" />}
                          </div>
                          <h3 className="text-xl md:text-2xl font-serif mb-2">Invitation Website</h3>
                          <p className={`text-xs md:text-sm leading-relaxed ${format === 'website' ? 'text-white/60' : 'text-neutral-500'}`}>
                            A high-end, responsive website with RSVPs, dynamic maps, countdowns, and galleries. Perfect for modern weddings.
                          </p>
                          {format !== 'website' && <div className="absolute right-6 md:right-8 bottom-6 md:bottom-8 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform"><ArrowRight className="h-5 w-5 md:h-6 md:w-6" /></div>}
                        </button>

                        <button
                          onClick={() => setFormat('card')}
                          className={`group p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border-2 transition-all duration-500 text-left relative overflow-hidden ${format === 'card' ? 'border-black bg-black text-white shadow-2xl scale-[1.02]' : 'border-neutral-100 bg-neutral-50 hover:border-neutral-300'}`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl transition-colors ${format === 'card' ? 'bg-white/10' : 'bg-white shadow-sm text-neutral-400'}`}>
                              <Smartphone className="h-6 w-6 md:h-8 md:w-8" />
                            </div>
                            {format === 'card' && <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-emerald-400 animate-in zoom-in" />}
                          </div>
                          <h3 className="text-xl md:text-2xl font-serif mb-2">Digital Invitation Card</h3>
                          <p className={`text-xs md:text-sm leading-relaxed ${format === 'card' ? 'text-white/60' : 'text-neutral-500'}`}>
                            An elegant single-view digital card designed for easy sharing via WhatsApp or social media.
                          </p>
                          {format !== 'card' && <div className="absolute right-6 md:right-8 bottom-6 md:bottom-8 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform"><ArrowRight className="h-5 w-5 md:h-6 md:w-6" /></div>}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Phase 3: Finish & Publish */}
                  {currentStep === 2 && (
                    <motion.div
                      key="phase-finish"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-24 h-full w-full pb-32"
                    >
                      {/* Rich Background for immersive landing style */}
                      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden -mt-24">
                        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-rose-50/30 blur-[150px] rounded-full" />
                        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-amber-50/30 blur-[150px] rounded-full" />
                      </div>

                      {isPublished ? (
                        <div className="w-full space-y-24 animate-in fade-in duration-1000">
                          {/* Success Section */}
                          <div className="text-center space-y-10 py-12">
                            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-sm border border-emerald-100">
                              <CheckCircle2 className="h-10 w-10" />
                            </div>
                            <h2 className="text-3xl md:text-[5rem] font-serif tracking-tight leading-tight text-neutral-900">
                              It's Live. Your Story Begins.
                            </h2>
                            <p className="text-xl md:text-2xl text-neutral-500 max-w-2xl mx-auto leading-relaxed font-light">
                              Your wedding invitation is now officially hosted on our global network. A digital heirloom for your eternal moment.
                            </p>
                          </div>

                          {/* Link Section - Integrated, no "card" look */}
                          <div className="max-w-4xl mx-auto border-y border-neutral-100 py-16 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="space-y-4 text-left w-full">
                              <span className="text-[10px] uppercase font-black tracking-[0.4em] text-neutral-400 block ml-2">Dedicated Invitation Link</span>
                              <div className="text-2xl md:text-4xl font-serif text-neutral-800 break-all">
                                {window.location.host}/invite/{publishedSlug}
                              </div>
                            </div>
                            <div className="flex gap-4 w-full md:w-auto shrink-0">
                              <Button
                                onClick={copyToClipboard}
                                variant="ghost"
                                className={`rounded-full h-14 md:h-20 px-6 md:px-10 transition-all duration-500 text-sm md:text-lg border-2 ${isCopying ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-black hover:bg-black hover:text-white'}`}
                              >
                                {isCopying ? <><Check className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5" /> Copied</> : <><Copy className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5" /> Copy URL</>}
                              </Button>
                              <Button
                                variant="outline"
                                className="rounded-full h-14 w-14 md:h-20 md:w-20 px-0 hover:bg-neutral-50 border-2 border-neutral-200"
                                onClick={() => window.open(`/invite/${publishedSlug}`, '_blank')}
                              >
                                <Eye className="h-5 w-5 md:h-7 md:w-7" />
                              </Button>
                            </div>
                          </div>

                          {/* Quick Stats Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
                            {[
                              { icon: <Zap className="h-6 w-6 text-amber-500" />, label: "Edge Deployment", desc: "Instant global delivery" },
                              { icon: <Sparkles className="h-6 w-6 text-purple-500" />, label: "Premium Hosting", desc: "Always available" },
                              { icon: <Globe className="h-6 w-6 text-blue-500" />, label: "Public SEO", desc: "Easily discoverable" }
                            ].map((item, idx) => (
                              <div key={idx} className="space-y-4">
                                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-neutral-100">
                                  {item.icon}
                                </div>
                                <div className="space-y-1">
                                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">{item.label}</p>
                                  <p className="text-sm text-neutral-600 italic">{item.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="w-full space-y-16 md:space-y-24 animate-in fade-in duration-1000">
                          {/* Hero Landing Section */}
                          <section className="text-center pt-12 md:pt-20 pb-6 md:pb-12 relative">
                            {/* Subtle Back Button */}
                            <motion.button
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              onClick={prevStep}
                              className="absolute top-0 left-0 flex items-center gap-2 text-neutral-400 hover:text-black transition-colors text-xs uppercase tracking-widest font-bold group"
                            >
                              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                              Back to Design
                            </motion.button>

                            <div className="w-20 h-20 bg-neutral-900 text-white rounded-full flex items-center justify-center mx-auto mb-12 shadow-2xl">
                              <Sparkles className="h-8 w-8 text-amber-400" />
                            </div>
                            <h2 className="text-4xl md:text-[6rem] font-serif leading-tight tracking-tighter text-neutral-900 mb-8 md:mb-12">
                              Masterpiece In Progress
                            </h2>
                            <p className="text-xl md:text-3xl text-neutral-500 max-w-3xl mx-auto leading-relaxed font-light mb-16">
                              Your {format === 'website' ? 'digital sanctuary' : 'invitation artifact'} is ready for the final reveal. Experience your vision in full-screen clarity.
                            </p>

                            <div className="pt-4 md:pt-6 flex justify-center">
                              <Button
                                size="lg"
                                onClick={handlePreview}
                                className="h-16 md:h-24 px-10 md:px-14 rounded-full bg-black text-white hover:bg-neutral-800 text-lg md:text-2xl shadow-2xl group transition-all duration-500 w-fit"
                              >
                                Launch Cinematic Preview
                                <ExternalLink className="ml-3 md:ml-4 h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                              </Button>
                            </div>
                          </section>

                          {/* Attribute Highlights Section - No containers, just spacing */}
                          <div className="max-w-6xl mx-auto border-t border-neutral-100 pt-12 md:pt-24">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                              <div className="space-y-8 group">
                                <div className="flex items-center gap-6">
                                  <div className="w-20 h-20 rounded-full overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-110">
                                    <img src={templates.find(t => t.id === formData.template)?.img} className="w-full h-full object-cover" alt="" />
                                  </div>
                                  <div>
                                    <p className="text-[9px] md:text-[10px] uppercase font-black tracking-[0.4em] text-neutral-400 mb-1">Aesthetic Collection</p>
                                    <h4 className="text-2xl md:text-4xl font-serif capitalize text-neutral-900">{formData.template}</h4>
                                  </div>
                                </div>
                                <p className="text-lg text-neutral-500 leading-relaxed max-w-md">
                                  A curation of {formData.template} motifs, tailored to resonate with your personal wedding atmosphere.
                                </p>
                              </div>

                              <div className="space-y-8 group">
                                <div className="flex items-center gap-6">
                                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-xl border border-neutral-100 transition-transform duration-700 group-hover:scale-110">
                                    {format === 'website' ? <Globe className="h-8 w-8" /> : <Smartphone className="h-8 w-8" />}
                                  </div>
                                  <div>
                                    <p className="text-[9px] md:text-[10px] uppercase font-black tracking-[0.4em] text-neutral-400 mb-1">Delivery Protocol</p>
                                    <h4 className="text-2xl md:text-4xl font-serif text-neutral-900">{format === 'website' ? 'Interactive Website' : 'Digital Card'}</h4>
                                  </div>
                                </div>
                                <p className="text-lg text-neutral-500 leading-relaxed max-w-md">
                                  {format === 'website'
                                    ? "A full-scale digital ecosystem including RSVP tracking and dynamic mapping."
                                    : "An elegant, high-impact digital artifact designed for seamless social sharing."}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Premium Banner Section - Like the Templates page Feature Banner */}
                          <div className="pt-12 md:pt-16">
                            <div className="relative rounded-3xl md:rounded-[3.5rem] overflow-hidden text-center text-white min-h-[320px] md:min-h-[500px] flex items-center justify-center py-12 md:py-20 px-6 md:px-8">
                              <img src="/images/88.jpg" className="absolute inset-0 w-full h-full object-cover" alt="" />
                              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                              <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                                <div className="flex justify-center gap-4">
                                  <Badge variant="outline" className="text-[11px] border-white/20 text-white/80 bg-white/5 backdrop-blur-md px-4 py-1 uppercase tracking-widest">Premium Offering</Badge>
                                  <Badge variant="secondary" className="text-[11px] bg-amber-500 text-white border-none px-4 py-1 uppercase tracking-widest">Limited Edition</Badge>
                                </div>
                                <h3 className="text-3xl md:text-6xl font-serif leading-tight tracking-tight">The Moment has Arrived.</h3>
                                <p className="text-white/70 text-base md:text-xl leading-relaxed font-light italic">
                                  "Your vision is complete. It's time to share your story with the world and let the celebration begin."
                                </p>
                                <div className="pt-4 md:pt-6 flex justify-center">
                                  <Button 
                                    onClick={publishInvitation}
                                    disabled={isPublishing}
                                    className="h-16 md:h-22 px-10 md:px-16 rounded-full bg-white text-black hover:bg-neutral-100 text-lg md:text-2xl transition-all font-serif shadow-2xl group flex items-center gap-4"
                                  >
                                    {isPublishing ? 'Creating Sanctuary...' : 'Publish My Masterpiece'}
                                    {!isPublishing && <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-amber-500 animate-pulse" />}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isPublished && (
                  <div className={`flex flex-col sm:flex-row gap-4 justify-between items-center mt-12 pt-8 border-t border-neutral-100 ${currentStep === 2 ? 'hidden' : ''}`}>
                    <Button
                      variant="ghost"
                      className="rounded-full px-6 w-full sm:w-auto order-2 sm:order-1"
                      onClick={prevStep}
                      disabled={currentStep === 0 && detailsStep === 0}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      className="rounded-full px-8 bg-black text-white hover:bg-neutral-800 w-full sm:w-auto order-1 sm:order-2 shadow-lg"
                      onClick={nextStep}
                      disabled={
                        (currentStep === 0 && detailsStep === 0 && (!formData.brideName || !formData.groomName)) ||
                        (currentStep === 0 && detailsStep === 1 && (!formData.date || !formData.time)) ||
                        (currentStep === 0 && detailsStep === 2 && !formData.venueName) ||
                        (currentStep === 1 && !format)
                      }
                    >
                      {currentStep === steps.length - 1 ? 'Publish' : (currentStep === 0 && detailsStep < 3 ? 'Continue Details' : 'Continue')}
                      {(currentStep !== steps.length - 1 || (currentStep === 0 && detailsStep < 3)) && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Preview Side (Helper) - REMOVED for centered workflow as requested */}
            {/* Keeping code structure for grid alignment if needed in future */}
            {false && currentStep < 3 && (
              <div className="lg:col-span-7 hidden lg:block">
                <div className="sticky top-24 h-[calc(100vh-160px)] min-h-[600px]">
                  <TemplatePreview data={formData} />
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

