import React, { useState } from "react";
import InvitationView from "@/pages/InvitationView";
import { Laptop, Smartphone, Tablet } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TemplatePreview({ data }: { data: any }) {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const containerStyles = {
    desktop: "w-full",
    tablet: "max-w-[768px] mx-auto",
    mobile: "max-w-[430px] mx-auto"
  };

  return (
    <div className="flex flex-col h-full bg-neutral-100 rounded-[2.5rem] overflow-hidden border border-neutral-200 shadow-2xl">
      {/* Top Bar */}
      <div className="bg-white border-b border-neutral-100 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-4">
             <div className="w-2.5 h-2.5 rounded-full bg-neutral-100 border border-neutral-200" />
             <div className="w-2.5 h-2.5 rounded-full bg-neutral-100 border border-neutral-200" />
             <div className="w-2.5 h-2.5 rounded-full bg-neutral-100 border border-neutral-200" />
          </div>
          <div className="px-4 py-1.5 bg-neutral-50 rounded-full border border-neutral-100 text-xs font-medium text-neutral-400">
            {data.brideName.split(' ')[0]} & {data.groomName.split(' ')[0]}.ethereal.wedding
          </div>
        </div>
        
        <div className="flex bg-neutral-50 p-1 rounded-2xl border border-neutral-100">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`rounded-xl px-3 h-9 transition-all ${device === 'desktop' ? 'bg-white shadow-sm text-black' : 'text-neutral-400'}`}
            onClick={() => setDevice('desktop')}
          >
            <Laptop className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`rounded-xl px-3 h-9 transition-all ${device === 'tablet' ? 'bg-white shadow-sm text-black' : 'text-neutral-400'}`}
            onClick={() => setDevice('tablet')}
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`rounded-xl px-3 h-9 transition-all ${device === 'mobile' ? 'bg-white shadow-sm text-black' : 'text-neutral-400'}`}
            onClick={() => setDevice('mobile')}
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-grow overflow-auto bg-neutral-100/50 p-4 md:p-12 custom-scrollbar">
        <div className={`bg-white shadow-2xl transition-all duration-700 ease-in-out overflow-hidden rounded-2xl md:rounded-3xl h-fit border border-black/5 ${containerStyles[device]}`}>
           <div className="h-full">
              <InvitationView previewData={data} />
           </div>
        </div>
      </div>
    </div>
  );
}
