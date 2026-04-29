import React, { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreVertical,
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
  Clock,
  UserPlus,
  Tag
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function DashboardGuests() {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const res = await api.get('user/dashboard');
        setInvitations(res.data);
        if (res.data.length > 0) {
          setSelectedSlug(res.data[0].slug);
        }
      } catch (error) {
        console.error("Error fetching invitations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInvitations();
  }, []);

  useEffect(() => {
    if (!selectedSlug) return;
    const fetchRSVPs = async () => {
      try {
        const res = await api.get(`invitations/${selectedSlug}/rsvps`);
        setRsvps(res.data);
      } catch (error) {
        console.error("Error fetching RSVPs:", error);
      }
    };
    fetchRSVPs();
  }, [selectedSlug]);

  const filteredRsvps = rsvps.filter(rsvp => {
    const matchesSearch = rsvp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || rsvp.status === filterStatus;
    const matchesCategory = filterCategory === "all" || rsvp.category === filterCategory;
    return matchesSearch && matchesFilter && matchesCategory;
  });

  const stats = {
    total: rsvps.reduce((acc, curr) => acc + (curr.status === 'coming' ? (curr.guests || 1) : 0), 0),
    attending: rsvps.filter(r => r.status === 'coming').length,
    declined: rsvps.filter(r => r.status === 'declined').length,
    pending: rsvps.filter(r => r.status === 'pending').length,
    family: rsvps.filter(r => r.category === 'Family').length,
    friends: rsvps.filter(r => r.category === 'Friend').length,
  };

  const selectedInvitation = invitations.find(inv => inv.slug === selectedSlug);

  return (
    <DashboardLayout 
      invitationSlug={selectedSlug || undefined}
      invitationId={selectedInvitation?._id}
    >
      <div className="space-y-8 max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-[#1F1F1F] mb-1">Guest List</h1>
            <p className="text-neutral-500 font-medium">Manage your RSVPs and guest details.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-[#E8D5C8] rounded-xl font-bold text-sm text-[#1F1F1F] shadow-sm hover:bg-[#FDFBF7] transition-all">
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            <button className="dash-btn-primary px-6 py-3 flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add Guest
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Guests", value: stats.total, icon: Users, color: "#AF944F" },
            { label: "Attending", value: stats.attending, icon: CheckCircle2, color: "#10B981" },
            { label: "Declined", value: stats.declined, icon: XCircle, color: "#EF4444" },
            { label: "Pending", value: stats.pending, icon: Clock, color: "#F59E0B" },
          ].map((stat, i) => (
            <div key={i} className="dash-card p-6 border-2" style={{ borderColor: stat.color }}>
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#1F1F1F]">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-[2rem] border border-[#E8D5C8]/50 shadow-sm">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#AF944F]" />
            <input 
              type="text" 
              placeholder="Search by guest name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F7F3EF] border-none rounded-2xl h-12 pl-12 pr-4 text-base focus:ring-2 focus:ring-[#AF944F]/20 transition-all outline-none"
            />
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-[#F7F3EF] px-4 py-2 rounded-2xl border border-[#E8D5C8]/30">
              <Filter className="h-4 w-4 text-[#AF944F]" />
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-transparent border-none text-sm font-bold text-[#1F1F1F] outline-none"
              >
                <option value="pending">Pending</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-[#F7F3EF] px-4 py-2 rounded-2xl border border-[#E8D5C8]/30">
              <Tag className="h-4 w-4 text-[#AF944F]" />
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-transparent border-none text-sm font-bold text-[#1F1F1F] outline-none"
              >
                <option value="all">All Categories</option>
                <option value="Family">Family</option>
                <option value="Friend">Friend</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2 bg-[#F7F3EF] px-4 py-2 rounded-2xl border border-[#E8D5C8]/30">
              <select 
                className="bg-transparent border-none text-sm font-bold text-[#1F1F1F] outline-none min-w-[120px]"
                value={selectedSlug || ""}
                onChange={(e) => setSelectedSlug(e.target.value)}
              >
                {invitations.map(inv => (
                  <option key={inv.slug} value={inv.slug}>{inv.brideName} & {inv.groomName}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Guest Table */}
        <div className="dash-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FDFBF7] border-b border-[#E8D5C8]/30">
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-neutral-400">Guest Name</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-neutral-400">Category</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-neutral-400">Status</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-neutral-400">Guests</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-neutral-400">Message</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-neutral-400">Date Received</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-neutral-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8D5C8]/20">
                {filteredRsvps.map((rsvp, i) => (
                  <tr key={i} className="hover:bg-[#FDFBF7] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#AF944F]/10 flex items-center justify-center text-[#AF944F] font-bold">
                          {rsvp.name.charAt(0)}
                        </div>
                        <span className="font-bold text-[#1F1F1F] text-base">{rsvp.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-[#AF944F]/5 text-[#AF944F] text-[10px] font-bold uppercase tracking-widest rounded-lg">
                        {rsvp.category || 'Guest'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className={cn(
                        "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border",
                        rsvp.status === 'coming' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                        rsvp.status === 'declined' ? "bg-rose-50 text-rose-600 border-rose-100" :
                        "bg-amber-50 text-amber-600 border-amber-100"
                      )}>
                        {rsvp.status === 'coming' ? 'Confirmed' : rsvp.status === 'declined' ? 'Declined' : 'Pending'}
                      </div>
                    </td>
                    <td className="px-8 py-6 font-bold text-[#1F1F1F] text-base">{rsvp.guests || 1}</td>
                    <td className="px-8 py-6">
                      <p className="text-sm text-neutral-500 max-w-xs truncate italic">
                        "{rsvp.message || 'No message'}"
                      </p>
                    </td>
                    <td className="px-8 py-6 text-sm text-neutral-400 font-medium">
                      {new Date(rsvp.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-[#F7F3EF] rounded-lg text-neutral-400 hover:text-[#AF944F] transition-all">
                          <Mail className="h-4 w-4" />
                        </button>
                        <button className="p-2 hover:bg-[#F7F3EF] rounded-lg text-neutral-400 hover:text-[#AF944F] transition-all">
                          <Phone className="h-4 w-4" />
                        </button>
                        <button className="p-2 hover:bg-[#F7F3EF] rounded-lg text-neutral-400 hover:text-[#AF944F] transition-all">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredRsvps.length === 0 && (
            <div className="py-24 text-center">
              <div className="w-20 h-20 bg-[#FDFBF7] rounded-full flex items-center justify-center mx-auto mb-6 text-[#E8D5C8]">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-[#1F1F1F] mb-2">No guests found</h3>
              <p className="text-neutral-400 font-serif italic">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
