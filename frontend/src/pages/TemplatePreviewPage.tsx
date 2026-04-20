import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import InvitationView from "./InvitationView";
import { templateDemoData } from "./Templates";
import { Button } from "@/components/ui/button";
import { ArrowRight, X, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function TemplatePreviewPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id === 'draft') {
      const saved = localStorage.getItem('wedding-preview-draft');
      if (saved) {
        try {
          setData(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse draft data", e);
        }
      }
    } else if (id && templateDemoData[id]) {
      setData(templateDemoData[id]);
    }
    setLoading(false);
  }, [id]);

  if (loading) return null;

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 font-serif gap-6">
        <h1 className="text-2xl">Template Not Found</h1>
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/templates">Back to Templates</Link>
        </Button>
      </div>
    );
  }

  const isDraft = id === 'draft';

  return (
    <div className="relative min-h-screen bg-black">
      {/* 
        We pass the data into the existing InvitationView component. 
        It will naturally take up the full screen width and behave completely responsively. 
      */}
      <div className="w-full h-screen overflow-auto bg-white">
         <InvitationView previewData={data} />
      </div>

      {/* Floating Action Bar */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 p-3 pr-4 rounded-full bg-white/80 backdrop-blur-2xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
      >
        <Button 
          variant="ghost" 
          size="icon" 
          asChild
          className="rounded-full w-12 h-12 bg-neutral-100 hover:bg-neutral-200 text-black shadow-sm"
        >
          <Link to={isDraft ? "/create" : "/templates"}>
            <X className="h-4 w-4" />
          </Link>
        </Button>
        
        <div className="h-8 w-[1px] bg-neutral-200/50 mx-1" />
        
        <div className="hidden md:block px-3 py-1">
          <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 leading-none mb-1">
            {isDraft ? 'Draft Preview' : 'Live Preview'}
          </p>
          <p className="text-sm font-medium text-neutral-800 leading-none capitalize">
            {isDraft ? `${data.template} Style` : `${id} Template`}
          </p>
        </div>

        {isDraft ? (
           <Button 
           size="lg" 
           onClick={() => window.close()}
           className="h-12 px-8 rounded-full bg-black text-white hover:bg-neutral-800 text-sm shadow-xl group transition-all duration-500"
         >
           Finish Preview
           <X className="ml-2 h-4 w-4" />
         </Button>
        ) : (
          <Button 
            size="lg" 
            asChild
            className="h-12 px-8 rounded-full bg-black text-white hover:bg-neutral-800 text-sm shadow-xl group transition-all duration-500"
          >
            <Link to={`/create?template=${id}`}>
              Start Creating With This
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        )}
      </motion.div>
    </div>
  );
}
