import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Store,
  Download,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  User,
  Check,
  FileText,
  Link as LinkIcon
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRsvpLoading, setIsRsvpLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const selectedInvitation = invitations.find(inv => inv.slug === selectedSlug);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/user/dashboard');
        setInvitations(res.data);
        if (res.data.length > 0) {
          setSelectedSlug(res.data[0].slug);
        }
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (!selectedSlug) return;
    const fetchRSVPs = async () => {
      setIsRsvpLoading(true);
      try {
        const res = await api.get(`/invitations/${selectedSlug}/rsvps`);
        setRsvps(res.data);
      } catch (error) {
        console.error("Error fetching RSVPs:", error);
      } finally {
        setIsRsvpLoading(false);
      }
    };
    fetchRSVPs();
  }, [selectedSlug]);

  const stats = {
    total: selectedInvitation?.stats?.total || 0,
    responses: selectedInvitation?.stats?.responses || 0,
    attending: selectedInvitation?.stats?.attending || 0,
    declined: selectedInvitation?.stats?.declined || 0,
    vendorsBooked: selectedInvitation?.stats?.vendorsBooked || 0,
    totalVendors: selectedInvitation?.stats?.totalVendors || 0,
    views: selectedInvitation ? 142 : 0, // Placeholder for views
  };

  const calculateCompletion = () => {
    if (!selectedInvitation) return 0;
    let score = 25; // Base for having an invitation
    if (selectedInvitation.photoUrl) score += 25;
    if (selectedInvitation.date && selectedInvitation.venueName) score += 25;
    if (stats.vendorsBooked > 0) score += 25;
    return score;
  };

  const completion = calculateCompletion();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F3EF] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#AF944F]/20 border-t-[#AF944F] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <DashboardLayout invitationSlug={selectedSlug || undefined}>
      <div className="space-y-6 md:space-y-10 max-w-[1440px] mx-auto overflow-hidden">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1F1F1F] mb-1">
              {selectedInvitation ? `${selectedInvitation.brideName} & ${selectedInvitation.groomName}` : 'Dashboard Overview'}
            </h1>
            <p className="text-neutral-500 font-medium text-base">
              Welcome back, {user.name?.split(' ')[0]}. {selectedInvitation ? `Your wedding planning is ${completion}% complete.` : 'No upcoming weddings found.'}
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => {
                if (selectedInvitation) {
                  const url = `${window.location.origin}/invite/${selectedInvitation.slug}`;
                  navigator.clipboard.writeText(url);
                  toast.success("Link copied to clipboard!");
                }
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-[#AF944F] rounded-xl font-bold text-xs md:text-sm text-[#AF944F] shadow-sm hover:bg-[#AF944F]/5 transition-all"
            >
              <LinkIcon className="h-4 w-4" />
              Copy Site Link
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-[#E8D5C8] rounded-xl font-bold text-xs md:text-sm text-[#1F1F1F] shadow-sm hover:bg-[#FDFBF7] transition-all">
              <Download className="h-4 w-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: "Confirmed Guests", value: stats.total, icon: CheckCircle2, color: "#10B981", trend: "+12%", up: true },
            { label: "Total Responses", value: stats.responses, icon: User, color: "#AF944F" },
            { label: "Attending", value: stats.attending, icon: Check, color: "#10B981" },
            { label: "Vendors Booked", value: stats.vendorsBooked, icon: Store, color: "#D9BDB5", progress: Math.round((stats.vendorsBooked / (stats.totalVendors || 1)) * 100) },
          ].map((stat, i) => (
            <div 
              key={i} 
              className="dash-card p-6 md:p-8 group relative overflow-hidden border-2"
              style={{ borderColor: stat.color }}
            >
              <div className="flex items-start justify-between mb-6 md:mb-8">
                <div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110"
                  style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                >
                  <stat.icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                {stat.trend && (
                  <div className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm",
                    stat.up ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-rose-50 text-rose-600 border border-rose-100"
                  )}>
                    {stat.up ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    {stat.trend}
                  </div>
                )}
              </div>
              
              <div>
                <p className="text-base font-bold uppercase tracking-wider text-neutral-400 mb-1">{stat.label}</p>
                <h3 className={cn(
                  "text-[20px] md:text-[24px] font-bold text-[#1F1F1F]",
                  stat.progress ? "mb-4 md:mb-6" : "mb-0"
                )}>
                  {stat.value}
                </h3>
              </div>

              {stat.progress !== undefined && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-neutral-400 font-serif italic text-base">{stats.vendorsBooked}/{stats.totalVendors} vendors</span>
                    <span className="text-[#1F1F1F] text-base">{stat.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#E8D5C8]/20 rounded-full overflow-hidden border border-[#E8D5C8]/10">
                    <motion.div 
                      className="h-full bg-[#D9BDB5] rounded-full shadow-[0_0_10px_rgba(217,189,181,0.5)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 overflow-hidden">
          {/* Recent RSVPs */}
          <div className="lg:col-span-2 dash-card flex flex-col">
            <div className="p-6 md:p-8 flex items-center justify-between border-b border-[#E8D5C8]/30">
              <h3 className="text-lg md:text-xl font-bold text-[#1F1F1F]">Recent RSVPs</h3>
              <button className="text-xs md:text-sm font-bold text-[#AF944F] hover:underline uppercase tracking-widest">View All</button>
            </div>
            
            <div className="p-4 flex-1">
              <div className="space-y-1">
                {isRsvpLoading ? (
                   <div className="py-20 flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-[#AF944F]/20 border-t-[#AF944F] rounded-full animate-spin" />
                      <p className="text-xs text-neutral-400">Loading guests...</p>
                   </div>
                ) : rsvps.slice(0, 5).map((rsvp, idx) => (
                  <div key={idx} className="flex flex-wrap items-center justify-between p-4 hover:bg-[#FDFBF7] rounded-2xl transition-all group gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E8D5C8]/20 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm transition-transform group-hover:scale-110">
                        <User className="h-5 w-5 text-[#AF944F]/60" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1F1F1F] text-base">{rsvp.name}</h4>
                        <p className="text-sm text-neutral-400 font-medium">
                          {rsvp.guests || 1} guests confirmed • Received {idx + 1}h ago
                        </p>
                      </div>
                    </div>
                    
                    <div className={cn(
                      "dash-badge border rounded-lg md:rounded-full",
                      rsvp.status === 'coming' 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                        : "bg-rose-50 text-rose-600 border-rose-100"
                    )}>
                      {rsvp.status === 'coming' ? 'Attending' : 'Declined'}
                    </div>
                  </div>
                ))}
                
                {!isRsvpLoading && rsvps.length === 0 && (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-[#FDFBF7] rounded-full flex items-center justify-center mx-auto text-[#E8D5C8]">
                      <Users className="h-8 w-8" />
                    </div>
                    <p className="text-neutral-400 font-serif italic">No recent RSVPs yet.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 md:p-8 mt-auto border-t border-[#E8D5C8]/30">
              <div className="flex items-center justify-between text-sm font-bold uppercase tracking-wider text-neutral-400 mb-3">
                <span className="font-serif italic font-normal normal-case text-base">Overall completion</span>
                <span className="text-[#1F1F1F]">{completion}%</span>
              </div>
              <div className="h-2 w-full bg-[#E8D5C8]/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#AF944F] rounded-full shadow-[0_0_10px_rgba(175,148,79,0.3)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${completion}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Vendor Status */}
          <div className="dash-card flex flex-col">
            <div className="p-6 md:p-8 flex items-center justify-between border-b border-[#E8D5C8]/30">
              <h3 className="text-lg md:text-xl font-bold text-[#1F1F1F]">Vendor Status</h3>
              <button className="text-xs md:text-sm font-bold text-[#AF944F] hover:underline uppercase tracking-widest">Edit</button>
            </div>
            
            <div className="p-6 space-y-6 flex-1">
              {(selectedInvitation?.vendors || []).slice(0, 5).map((vendor, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-[#FDFBF7] flex items-center justify-center transition-all group-hover:bg-white group-hover:shadow-md border border-[#E8D5C8]/20 group-hover:border-[#AF944F]/20">
                      <Store className="h-5 w-5 text-[#E8D5C8]" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#1F1F1F] leading-none mb-1 group-hover:text-[#AF944F] transition-colors">{vendor.name}</h4>
                      <p className="text-sm text-neutral-400 font-medium">{vendor.category}</p>
                    </div>
                  </div>
                  
                  <div className={cn(
                    "flex items-center gap-2 text-sm font-bold whitespace-nowrap px-2 py-1 rounded-lg md:bg-transparent md:p-0",
                    vendor.status === 'Booked' && "text-emerald-500 md:bg-emerald-50/50",
                    vendor.status === 'Quote Sent' && "text-[#AF944F] md:bg-[#AF944F]/5",
                    vendor.status === 'Awaiting' && "text-[#D9BDB5] md:bg-[#D9BDB5]/5"
                  )}>
                    <div className={cn(
                      "w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm",
                      vendor.status === 'Booked' && "bg-emerald-500 text-white",
                      vendor.status === 'Quote Sent' && "bg-[#AF944F] text-white",
                      vendor.status === 'Awaiting' && "bg-[#D9BDB5] text-white"
                    )}>
                      {vendor.status === 'Booked' ? <Check className="h-3 w-3" /> : (vendor.status === 'Quote Sent' ? <FileText className="h-3 w-3" /> : <Clock className="h-3 w-3" />)}
                    </div>
                    <span className="hidden sm:inline">{vendor.status}</span>
                  </div>
                </div>
              ))}

              {(!selectedInvitation?.vendors || selectedInvitation.vendors.length === 0) && (
                <div className="py-10 text-center text-neutral-400 text-sm italic">
                  No vendors added yet.
                </div>
              )}
            </div>

            <div className="p-6">
              <button className="w-full h-12 border border-[#E8D5C8] bg-[#FDFBF7] rounded-xl text-[10px] font-bold text-[#AF944F] hover:bg-[#AF944F] hover:text-white hover:border-[#AF944F] transition-all uppercase tracking-[2px]">
                Add Vendor
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
