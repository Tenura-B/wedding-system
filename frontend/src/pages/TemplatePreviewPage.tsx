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


    </div>
  );
}
