import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { parseISO, intervalToDuration } from "date-fns";
import api from "@/lib/api";
import { toast } from "sonner";

// Import New Template Components
import ClassicTemplate from "@/components/templates/ClassicTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import FloralTemplate from "@/components/templates/FloralTemplate";
import LuxuryTemplate from "@/components/templates/LuxuryTemplate";

interface InvitationViewProps {
  previewData?: any;
}

export default function InvitationView({ previewData }: InvitationViewProps) {
  const { slug } = useParams();
  const [data, setData] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (previewData) {
      setData(previewData);
      setIsLoading(false);
      return;
    }

    if (!slug) return;

    const fetchData = async () => {
      try {
        const response = await api.get(`/invitations/${slug}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching invitation:", error);
        // Fallback to demo data
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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

  const handleRSVP = async (rsvpData: any) => {
    try {
      if (slug) {
        await api.post(`/invitations/${slug}/rsvp`, rsvpData);
      }
      setIsSubmitted(true);
      toast.success("RSVP submitted successfully!");
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      toast.error("Failed to submit RSVP. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#AF944F]/20 border-t-[#AF944F] rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  // Template Selection
  const templateProps = {
    data,
    timeLeft,
    onRSVP: handleRSVP,
    isSubmitted
  };

  switch (data.template) {
    case "minimal":
      return <MinimalTemplate {...templateProps} />;
    case "floral":
      return <FloralTemplate {...templateProps} />;
    case "luxury":
      return <LuxuryTemplate {...templateProps} />;
    case "classic":
    default:
      return <ClassicTemplate {...templateProps} />;
  }
}
