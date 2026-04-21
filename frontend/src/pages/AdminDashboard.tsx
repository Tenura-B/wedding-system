import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  ArrowLeft, 
  Download, 
  ExternalLink,
  Search,
  MoreVertical,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import api from "@/lib/api";

export default function AdminDashboard() {
  const { slug } = useParams();
  const [weddingData, setWeddingData] = useState<any>(null);
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!slug) return;

    const loadData = async () => {
      try {
        // Load wedding details
        const weddingRes = await api.get(`/invitations/${slug}`);
        setWeddingData(weddingRes.data);

        // Load RSVPs
        const rsvpsRes = await api.get(`/invitations/${slug}/rsvps`);
        setRsvps(rsvpsRes.data);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    loadData();
  }, [slug]);

  const filteredRSVPs = rsvps.filter(rsvp => 
    rsvp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: rsvps.reduce((acc, curr) => acc + (curr.status === 'coming' ? curr.guests : 0), 0),
    responses: rsvps.length,
    coming: rsvps.filter(r => r.status === 'coming').length,
    declined: rsvps.filter(r => r.status === 'declined').length,
  };

  if (!weddingData) return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-serif">Wedding Not Found</h1>
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Button asChild variant="ghost" size="sm" className="rounded-full -ml-2">
                  <Link to={`/invite/${slug}`}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Invitation
                  </Link>
                </Button>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif mb-2">
                {weddingData.brideName.split(' ')[0]} & {weddingData.groomName.split(' ')[0]}'s Atelier
              </h1>
              <p className="text-muted-foreground">Manage your guests and digital presence in one place.</p>
            </div>
            <div className="flex gap-3">
              <Button size="lg" className="rounded-full bg-black text-white hover:bg-neutral-800 shadow-lg">
                <Download className="h-4 w-4 mr-2" /> Export CSV
              </Button>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Total Guests Expected", value: stats.total, icon: <Users className="h-5 w-5" />, color: "bg-blue-500" },
              { label: "Total Responses", value: stats.responses, icon: <MessageSquare className="h-5 w-5" />, color: "bg-amber-500" },
              { label: "Attending", value: stats.coming, icon: <CheckCircle2 className="h-5 w-5" />, color: "bg-emerald-500" },
              { label: "Declined", value: stats.declined, icon: <XCircle className="h-5 w-5" />, color: "bg-rose-500" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm"
              >
                <div className={`w-10 h-10 rounded-2xl ${stat.color} text-white flex items-center justify-center mb-4`}>
                  {stat.icon}
                </div>
                <p className="text-sm uppercase font-bold tracking-widest text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-serif">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Guest List Area */}
          <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-neutral-50 flex flex-col md:flex-row justify-between items-center gap-6">
              <h3 className="text-2xl font-serif">Guest List</h3>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input 
                    placeholder="Search guests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-64 h-10 pl-10 pr-4 bg-neutral-50 border-none rounded-full text-sm focus:ring-2 focus:ring-black/5 transition-all"
                  />
                </div>
                <Button variant="outline" size="icon" className="rounded-full shrink-0">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-neutral-50/50">
                  <tr>
                    <th className="px-8 py-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">Guest Name</th>
                    <th className="px-8 py-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                    <th className="px-8 py-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">Count</th>
                    <th className="px-8 py-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">Message</th>
                    <th className="px-8 py-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {filteredRSVPs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center text-muted-foreground">
                        <div className="max-w-xs mx-auto space-y-4">
                          <Users className="h-12 w-12 mx-auto opacity-20" />
                          <p className="text-lg">No responses collected yet.</p>
                          <Button asChild size="sm" variant="link" className="text-black underline underline-offset-4">
                            <Link to={`/invite/${slug}`}>Share Invitation Link</Link>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredRSVPs.map((rsvp, idx) => (
                      <tr key={idx} className="hover:bg-neutral-50/30 transition-colors">
                        <td className="px-8 py-6 font-medium">{rsvp.name}</td>
                        <td className="px-8 py-6">
                          <Badge className={`rounded-full border-0 ${rsvp.status === 'coming' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                            {rsvp.status === 'coming' ? 'Attending' : 'Declined'}
                          </Badge>
                        </td>
                        <td className="px-8 py-6">{rsvp.guests}</td>
                        <td className="px-8 py-6 text-sm text-muted-foreground max-w-xs truncate">
                          {rsvp.message || "—"}
                        </td>
                        <td className="px-8 py-6">
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
