import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  MessageSquare, 
  Plus, 
  ExternalLink,
  Settings,
  Calendar,
  MapPin,
  ChevronRight,
  Download,
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  XCircle,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import api from "@/lib/api";
import { toast } from "sonner";
import { Copy, Check } from "lucide-react";

export default function Dashboard() {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRsvpLoading, setIsRsvpLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [isCopying, setIsCopying] = useState(false);
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
    total: rsvps.reduce((acc, curr) => acc + (curr.status === 'coming' ? (curr.guests || 1) : 0), 0),
    responses: rsvps.length,
    coming: rsvps.filter(r => r.status === 'coming').length,
    declined: rsvps.filter(r => r.status === 'declined').length,
  };

  const copyInviteLink = () => {
    if (!selectedSlug) return;
    const url = `${window.location.origin}/invite/${selectedSlug}`;
    navigator.clipboard.writeText(url);
    setIsCopying(true);
    toast.success("Invitation link copied to clipboard!");
    setTimeout(() => setIsCopying(false), 2000);
  };

  const filteredRSVPs = rsvps.filter(rsvp => 
    rsvp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-neutral-200" />
          <div className="h-4 w-32 bg-neutral-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      
      <main className="pt-40 pb-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[1440px]">
          {/* Welcome Header */}
          <header className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-serif mb-4">
                Grand Atelier de <span className="italic block md:inline">{user.name?.split(' ')[0]}</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl">
                Manage your invitations and guests with effortless grace in your central sanctuary.
              </p>
            </div>
            <Button asChild size="lg" className="rounded-full bg-black text-white hover:bg-neutral-800 shadow-xl px-8 h-14 text-lg">
              <Link to="/create">
                Create New Invitation
              </Link>
            </Button>
          </header>

          {invitations.length === 0 ? (
            <div className="bg-white rounded-[3rem] border border-neutral-100 p-20 text-center shadow-sm">
              <div className="max-w-md mx-auto space-y-6">
                <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto">
                  <Plus className="h-10 w-10 text-neutral-300" />
                </div>
                <h2 className="text-3xl font-serif">Compose Your First Invitation</h2>
                <p className="text-muted-foreground">Start your journey by selecting a curated template or building a custom experience for your special day.</p>
                <Button asChild size="lg" className="rounded-full bg-black text-white px-8">
                  <Link to="/templates">Browse Templates</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Invitation Switcher (Tabs) */}
              <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar">
                {invitations.map((inv) => (
                  <button
                    key={inv._id}
                    onClick={() => setSelectedSlug(inv.slug)}
                    className={`flex-shrink-0 px-8 py-4 rounded-full transition-all text-sm font-bold uppercase tracking-widest border-2 whitespace-nowrap ${
                      selectedSlug === inv.slug 
                        ? "bg-black text-white border-black shadow-lg shadow-black/10" 
                        : "bg-white text-ink border-black/10 hover:border-black"
                    }`}
                  >
                    {inv.brideName.split(' ')[0]} & {inv.groomName.split(' ')[0]}
                  </button>
                ))}
              </div>

              {selectedInvitation && (
                <motion.div
                  key={selectedSlug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-12"
                >
                  {/* Stats & Actions Row */}
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 items-start">
                    {/* Active Wedding Info Card */}
                    <div className="bg-white rounded-[2.5rem] p-10 border-2 border-black shadow-sm flex flex-col h-full">
                      <div className="mb-8">
                        <h3 className="text-3xl font-serif mb-2">
                          {selectedInvitation.brideName} & {selectedInvitation.groomName}
                        </h3>
                        <p className="text-muted-foreground flex items-center gap-2">
                          <Calendar className="h-4 w-4" /> 
                          {new Date(selectedInvitation.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 text-sm">
                          <MapPin className="h-4 w-4 text-gold" />
                          <span className="text-muted-foreground">{selectedInvitation.venueName}</span>
                        </div>
                      </div>

                      <div className="mt-auto grid grid-cols-2 gap-3">
                        <Button asChild className="rounded-full bg-neutral-50 text-ink hover:bg-neutral-100 border border-neutral-100 h-12 whitespace-nowrap">
                          <Link to={`/invite/${selectedSlug}`} target="_blank" className="flex items-center">
                            <ExternalLink className="h-4 w-4 mr-2" /> View
                          </Link>
                        </Button>
                        <Button 
                          onClick={copyInviteLink}
                          className={`rounded-full border-2 h-12 whitespace-nowrap transition-all duration-300 ${isCopying ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white text-black border-black hover:bg-black hover:text-white'}`}
                        >
                          {isCopying ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                          {isCopying ? "Copied" : "Copy Link"}
                        </Button>
                      </div>
                    </div>

                    {/* Stats Grid - Taking 2/3 space on xl */}
                    <div className="xl:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-6">
                      {[
                        { label: "Total Guests", value: stats.total, icon: <Users className="h-5 w-5" />, color: "bg-blue-500" },
                        { label: "Responses", value: stats.responses, icon: <MessageSquare className="h-5 w-5" />, color: "bg-amber-500" },
                        { label: "Attending", value: stats.coming, icon: <CheckCircle2 className="h-5 w-5" />, color: "bg-emerald-500" },
                        { label: "Declined", value: stats.declined, icon: <XCircle className="h-5 w-5" />, color: "bg-rose-500" },
                      ].map((stat, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2.5rem] border-2 border-black shadow-sm transition-all hover:shadow-xl hover:shadow-black/5">
                          <div className={`w-12 h-12 rounded-2xl ${stat.color} text-white flex items-center justify-center mb-6`}>
                            {stat.icon}
                          </div>
                          <p className="text-[10px] uppercase font-bold tracking-[2px] text-muted-foreground mb-1">{stat.label}</p>
                          <p className="text-4xl font-serif">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Guest List Management */}
                  <div className="bg-white rounded-[3rem] border-2 border-black shadow-sm overflow-hidden">
                    <div className="p-10 border-b border-neutral-50 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-4">
                        <Users className="h-6 w-6 text-gold" />
                        <h3 className="text-2xl md:text-3xl font-serif">Guest List</h3>
                      </div>
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-grow">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
                          <input 
                            placeholder="Search names..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-80 h-14 pl-12 pr-6 bg-neutral-50 border-none rounded-full text-sm focus:ring-2 focus:ring-black/5 transition-all"
                          />
                        </div>
                        <Button variant="outline" className="rounded-full h-14 px-8 border-neutral-100 bg-neutral-50 hover:bg-neutral-100 whitespace-nowrap">
                          <Download className="h-5 w-5 mr-2" /> Export
                        </Button>
                      </div>
                    </div>

                    <div className="overflow-x-auto min-h-[300px]">
                      {isRsvpLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                          <div className="w-10 h-10 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
                          <p className="text-muted-foreground font-serif italic">Curating your guest list...</p>
                        </div>
                      ) : (
                        <table className="w-full text-left">
                          <thead className="bg-neutral-50/50">
                            <tr>
                              <th className="px-10 py-5 text-xs font-bold uppercase tracking-[2px] text-muted-foreground">Guest Name</th>
                              <th className="px-10 py-5 text-xs font-bold uppercase tracking-[2px] text-muted-foreground">Status</th>
                              <th className="px-10 py-5 text-xs font-bold uppercase tracking-[2px] text-muted-foreground">Party Size</th>
                              <th className="px-10 py-5 text-xs font-bold uppercase tracking-[2px] text-muted-foreground">Words from Guest</th>
                              <th className="px-10 py-5 text-xs font-bold uppercase tracking-[2px] text-muted-foreground text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-50">
                            {filteredRSVPs.length === 0 ? (
                              <tr>
                                <td colSpan={5} className="px-10 py-24 text-center">
                                  <div className="max-w-xs mx-auto space-y-4">
                                    <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto">
                                      <Users className="h-8 w-8 text-neutral-200" />
                                    </div>
                                    <p className="text-xl font-serif">No responses yet</p>
                                    <p className="text-muted-foreground text-sm">Share your invitation link to start collecting RSVPs from your loved ones.</p>
                                  </div>
                                </td>
                              </tr>
                            ) : (
                              filteredRSVPs.map((rsvp, idx) => (
                                <tr key={idx} className="hover:bg-neutral-50/30 transition-colors">
                                  <td className="px-10 py-8 font-serif text-xl">{rsvp.name}</td>
                                  <td className="px-10 py-8">
                                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border ${
                                      rsvp.status === 'coming' 
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                        : 'bg-rose-50 text-rose-700 border-rose-100'
                                    }`}>
                                      {rsvp.status === 'coming' ? 'Attending' : 'Declined'}
                                    </span>
                                  </td>
                                  <td className="px-10 py-8 text-2xl font-serif">{rsvp.guests || 1}</td>
                                  <td className="px-10 py-8 text-muted-foreground text-sm max-w-sm italic leading-relaxed">
                                    {rsvp.message ? `"${rsvp.message}"` : <span className="opacity-30">—</span>}
                                  </td>
                                  <td className="px-10 py-8 text-right">
                                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-neutral-100">
                                      <MoreVertical className="h-5 w-5 text-neutral-400" />
                                    </Button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
