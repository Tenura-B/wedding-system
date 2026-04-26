import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Music, 
  Utensils, 
  Camera, 
  Heart, 
  Sparkles,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const initialEvents = [
  { time: "14:00", label: "Wedding Ceremony", icon: Heart, category: "Ceremony", desc: "The official ceremony at the Grand Ballroom." },
  { time: "15:30", label: "Cocktail Reception", icon: Utensils, category: "Dining", desc: "Champagne and hors d'oeuvres on the terrace." },
  { time: "17:00", label: "Professional Photos", icon: Camera, category: "Media", desc: "Family and bridal party portraits in the garden." },
  { time: "19:00", label: "Grand Entrance", icon: Sparkles, category: "Reception", desc: "Welcome and first dance as a married couple." },
  { time: "20:00", label: "Dinner Service", icon: Utensils, category: "Dining", desc: "Four-course dinner served in the main hall." },
  { time: "22:00", label: "Party Starts", icon: Music, category: "Reception", desc: "DJ starts the music and dance floor opens." },
];

export default function DashboardTimeline() {
  const [events, setEvents] = useState(initialEvents);

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-[#1F1F1F] mb-1">Wedding Timeline</h1>
            <p className="text-neutral-500 font-medium">Fine-tune the schedule for your big day.</p>
          </div>
          <button className="dash-btn-primary px-8 py-4 flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Milestone
          </button>
        </div>

        {/* Timeline List */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[31px] md:left-[111px] top-4 bottom-4 w-1 bg-[#E8D5C8]/30 rounded-full" />

          <div className="space-y-12">
            {events.map((event, i) => (
              <div key={i} className="relative flex flex-col md:flex-row items-start gap-8 group">
                {/* Time Column */}
                <div className="md:w-20 pt-2 flex-shrink-0 text-right hidden md:block">
                  <span className="text-xl font-bold text-[#AF944F] font-mono tracking-tighter">
                    {event.time}
                  </span>
                </div>

                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-full bg-white border-4 border-[#F7F3EF] shadow-lg flex items-center justify-center text-[#AF944F] z-10 transition-transform group-hover:scale-110">
                  <event.icon className="h-6 w-6" />
                </div>

                {/* Content Card */}
                <div className="flex-1 dash-card p-8 border-2 border-transparent hover:border-[#AF944F]/20 transition-all relative group/card">
                  <div className="md:hidden mb-4">
                    <span className="px-3 py-1 bg-[#AF944F]/10 text-[#AF944F] text-xs font-bold rounded-lg font-mono">
                      {event.time}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#1F1F1F] mb-1">{event.label}</h3>
                      <span className="text-xs font-bold uppercase tracking-[2px] text-[#AF944F] py-1 px-2 bg-[#AF944F]/5 rounded leading-none">
                        {event.category}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-neutral-400 hover:text-[#EF4444] transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-neutral-500 font-serif italic text-base leading-relaxed">
                    "{event.desc}"
                  </p>

                  {/* Visual Drag Handle (Decorative) */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-4 opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <GripVertical className="h-6 w-6 text-neutral-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex justify-center pt-8">
          <button className="flex items-center gap-2 px-10 py-5 bg-[#FDFBF7] border border-dashed border-[#E8D5C8] rounded-3xl text-neutral-400 hover:text-[#AF944F] hover:border-[#AF944F] transition-all group">
            <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-bold uppercase tracking-[2px] text-sm">Insert Between Events</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
