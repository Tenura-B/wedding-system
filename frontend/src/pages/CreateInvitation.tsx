import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, Heart, Calendar, MapPin, CheckCircle2, Upload } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const steps = [
  { id: "couple", title: "The Couple", icon: <Heart className="h-5 w-5" /> },
  { id: "details", title: "Wedding Details", icon: <Calendar className="h-5 w-5" /> },
  { id: "location", title: "Location", icon: <MapPin className="h-5 w-5" /> },
  { id: "personalize", title: "Personalize", icon: <Upload className="h-5 w-5" /> }
];

export default function CreateInvitation() {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get("template") || "classic";
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    brideName: "",
    groomName: "",
    date: "",
    time: "",
    venueName: "",
    address: "",
    message: "We are joyfully announcing our marriage and would be honored if you could join us for this special celebration.",
    template: templateId
  });

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      // Finalize and "save"
      const slug = `${formData.brideName.toLowerCase()}-${formData.groomName.toLowerCase()}`;
      localStorage.setItem(`wedding-${slug}`, JSON.stringify(formData));
      navigate(`/invite/${slug}`);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <header className="text-center mb-10 md:mb-12 px-4">
             <h1 className="text-3xl md:text-5xl font-serif mb-4 leading-tight">Create Your Invitation</h1>
             <p className="text-muted-foreground text-sm md:text-base">Follow the steps below to craft your digital masterpiece.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            {/* Progress Sidebar */}
            <div className="lg:col-span-1">
              <div className="flex lg:flex-col lg:gap-16 gap-2 justify-between lg:justify-start h-full">
                {steps.map((step, i) => (
                  <div 
                    key={step.id} 
                    className={`flex items-center gap-4 transition-opacity ${currentStep === i ? 'opacity-100' : 'opacity-70'}`}
                  >
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 ${currentStep >= i ? 'bg-black text-white border-black shadow-lg' : 'bg-white text-muted-foreground border-neutral-200'} transition-all`}>
                       {currentStep > i ? <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6" /> : step.icon}
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-[16px] uppercase font-bold tracking-[0.2em] text-muted-foreground mb-1">Step {i + 1}</p>
                      <p className="font-serif text-lg whitespace-nowrap">{step.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Area */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-5 sm:p-8 md:p-12 shadow-sm border border-neutral-100 min-h-[400px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  {currentStep === 0 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="bride" className="text-lg font-serif">Bride's Full Name</Label>
                        <Input 
                          id="bride" 
                          placeholder="e.g. Katherine Pierce" 
                          className="rounded-xl h-12 text-lg px-4"
                          value={formData.brideName}
                          onChange={(e) => updateFormData("brideName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="groom" className="text-lg font-serif">Groom's Full Name</Label>
                        <Input 
                          id="groom" 
                          placeholder="e.g. Stefan Salvatore"
                          className="rounded-xl h-12 text-lg px-4"
                          value={formData.groomName}
                          onChange={(e) => updateFormData("groomName", e.target.value)}
                        />
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 1 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="date" className="text-lg font-serif">Wedding Date</Label>
                        <Input 
                          id="date" 
                          type="date"
                          className="rounded-xl h-12 text-lg px-4"
                          value={formData.date}
                          onChange={(e) => updateFormData("date", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time" className="text-lg font-serif">Ceremony Start Time</Label>
                        <Input 
                          id="time" 
                          type="time"
                          className="rounded-xl h-12 text-lg px-4"
                          value={formData.time}
                          onChange={(e) => updateFormData("time", e.target.value)}
                        />
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="venue" className="text-lg font-serif">Venue Name</Label>
                        <Input 
                          id="venue" 
                          placeholder="e.g. St. Regis Resort"
                          className="rounded-xl h-12 text-lg px-4"
                          value={formData.venueName}
                          onChange={(e) => updateFormData("venueName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-lg font-serif">Complete Address</Label>
                        <Textarea 
                          id="address" 
                          placeholder="Street address, city, and state"
                          className="rounded-xl min-h-[100px] text-lg px-4 py-3"
                          value={formData.address}
                          onChange={(e) => updateFormData("address", e.target.value)}
                        />
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div 
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-lg font-serif">Personal Message</Label>
                        <Textarea 
                          id="message" 
                          placeholder="A special note to your guests..."
                          className="rounded-xl min-h-[120px] text-lg px-4 py-3"
                          value={formData.message}
                          onChange={(e) => updateFormData("message", e.target.value)}
                        />
                      </div>
                      <div className="bg-neutral-50 rounded-2xl p-6 border-2 border-dashed border-neutral-200 flex flex-col items-center text-center">
                         <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                           <Upload className="h-6 w-6 text-muted-foreground" />
                         </div>
                         <h3 className="font-medium mb-1">Upload Wedding Photo</h3>
                         <p className="text-[16px] text-muted-foreground mb-4">PNG, JPG up to 10MB</p>
                         <Button size="sm" variant="outline" className="rounded-full">Choose Image</Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-12 pt-8 border-t border-neutral-100">
                    <Button 
                    variant="ghost" 
                    className="rounded-full px-6 w-full sm:w-auto order-2 sm:order-1"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button 
                    className="rounded-full px-8 bg-black text-white hover:bg-neutral-800 w-full sm:w-auto order-1 sm:order-2"
                    onClick={nextStep}
                    disabled={
                      (currentStep === 0 && (!formData.brideName || !formData.groomName)) ||
                      (currentStep === 1 && (!formData.date || !formData.time)) ||
                      (currentStep === 2 && !formData.venueName)
                    }
                  >
                    {currentStep === steps.length - 1 ? 'Generate Invitation' : 'Continue'}
                    {currentStep !== steps.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
