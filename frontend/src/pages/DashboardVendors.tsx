import React, { useState, useEffect } from "react";
import { 
  Store, 
  Search, 
  Plus, 
  MoreVertical,
  ExternalLink,
  MapPin,
  Tag,
  CheckCircle2,
  Clock,
  FileText,
  DollarSign
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function DashboardVendors() {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [selectedInvitation, setSelectedInvitation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('user/dashboard');
        setInvitations(res.data);
        if (res.data.length > 0) {
          setSelectedInvitation(res.data[0]);
        }
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const vendors = selectedInvitation?.vendors || [];

  return (
    <DashboardLayout 
      invitationSlug={selectedInvitation?.slug}
      invitationId={selectedInvitation?._id}
    >
      <div className="space-y-8 max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-[#1F1F1F] mb-1">Wedding Vendors</h1>
            <p className="text-neutral-500 font-medium">Coordinate with your event partners.</p>
          </div>
          <button className="dash-btn-primary px-8 py-4 flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Book New Vendor
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Providers Booked", value: vendors.filter((v: any) => v.status === 'Booked').length, icon: CheckCircle2, color: "#10B981" },
            { label: "Active Quotes", value: vendors.filter((v: any) => v.status === 'Quote Sent').length, icon: FileText, color: "#AF944F" },
            { label: "Est. Budget Spent", value: "$12,400", icon: DollarSign, color: "#D9BDB5" },
          ].map((stat, i) => (
            <div key={i} className="dash-card p-8 border-2" style={{ borderColor: stat.color }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-[2px] mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-[#1F1F1F]">{stat.value}</p>
                </div>
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                >
                  <stat.icon className="h-7 w-7" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {vendors.map((vendor: any, i: number) => (
            <div key={i} className="dash-card p-6 border-2 hover:shadow-xl transition-all group" style={{ borderColor: '#E8D5C8' }}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#FDFBF7] rounded-2xl border border-[#E8D5C8]/30 flex items-center justify-center text-[#AF944F]">
                    <Store className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1F1F1F] text-lg group-hover:text-[#AF944F] transition-colors">{vendor.name}</h3>
                    <p className="text-sm font-bold text-[#AF944F] flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {vendor.category}
                    </p>
                  </div>
                </div>
                <button className="p-2 text-neutral-400 hover:text-[#1F1F1F] transition-colors">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-neutral-500">
                  <MapPin className="h-4 w-4" />
                  Zurich, Switzerland
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-500 font-serif italic">
                  "Specializing in high-end floral installations for luxury weddings."
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#E8D5C8]/30">
                <div className={cn(
                  "flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg",
                  vendor.status === 'Booked' ? "bg-emerald-50 text-emerald-600" : 
                  vendor.status === 'Quote Sent' ? "bg-amber-50 text-amber-600" :
                  "bg-rose-50 text-rose-600"
                )}>
                  {vendor.status === 'Booked' ? <CheckCircle2 className="h-4 w-4" /> : (vendor.status === 'Quote Sent' ? <FileText className="h-4 w-4" /> : <Clock className="h-4 w-4" />)}
                  {vendor.status}
                </div>
                <button className="text-xs font-bold text-[#1F1F1F] hover:text-[#AF944F] flex items-center gap-1 uppercase tracking-widest transition-colors">
                  Details <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}

          {/* Add Vendor Card */}
          <button className="dash-card p-6 border-2 border-dashed border-[#E8D5C8] flex flex-col items-center justify-center gap-4 hover:bg-[#FDFBF7] hover:border-[#AF944F] transition-all min-h-[300px] group">
            <div className="w-16 h-16 rounded-full bg-[#F7F3EF] flex items-center justify-center text-neutral-300 group-hover:bg-[#AF944F] group-hover:text-white transition-all">
              <Plus className="h-8 w-8" />
            </div>
            <p className="font-bold text-neutral-400 group-hover:text-[#AF944F] transition-colors uppercase tracking-[2px] text-xs">Add New Partner</p>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
