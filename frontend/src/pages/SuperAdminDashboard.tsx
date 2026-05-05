import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Heart, 
  MessageSquare, 
  Trash2, 
  Shield, 
  Search, 
  Filter, 
  MoreVertical,
  Activity,
  UserCheck,
  Calendar,
  Key
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import api from "@/lib/api";
import { toast } from "sonner";

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/users")
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error("Error loading admin data:", error);
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await api.patch(`/admin/users/${userId}`, { role: newRole });
      toast.success(`User role updated to ${newRole}`);
      loadData();
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleResetPassword = async (userId: string) => {
    const newPassword = prompt("Enter new password for this user (min 6 characters):");
    if (!newPassword) return;
    if (newPassword.length < 6) {
      toast.error("Password too short");
      return;
    }

    try {
      await api.patch(`/admin/users/${userId}/reset-password`, { password: newPassword });
      toast.success("Password reset successfully");
    } catch (error) {
      toast.error("Failed to reset password");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user and all their data? This cannot be undone.")) return;
    try {
      await api.delete(`/admin/users/${userId}`);
      toast.success("User deleted successfully");
      loadData();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-serif mb-4">Command Center</h1>
            <p className="text-muted-foreground text-lg">Platform-wide overview and user management.</p>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Total Users", value: stats?.totalUsers || 0, icon: <Users className="h-5 w-5" />, color: "bg-blue-500" },
              { label: "Total Weddings", value: stats?.totalInvitations || 0, icon: <Heart className="h-5 w-5" />, color: "bg-rose-500" },
              { label: "Total RSVPs", value: stats?.totalRSVPs || 0, icon: <MessageSquare className="h-5 w-5" />, color: "bg-amber-500" },
              { label: "Active Nodes", value: 1, icon: <Activity className="h-5 w-5" />, color: "bg-emerald-500" },
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

          <div className="space-y-12">
            {/* User Management Table - Full Width */}
            <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-neutral-50 flex flex-col md:flex-row justify-between items-center gap-6">
                <h3 className="text-2xl font-serif">Platform Users</h3>
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input 
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full md:w-64 h-10 pl-10 pr-4 bg-neutral-50 border-none rounded-full text-sm focus:ring-2 focus:ring-black/5 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-neutral-50/50">
                    <tr>
                      <th className="px-8 py-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">User</th>
                      <th className="px-8 py-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">Role</th>
                      <th className="px-8 py-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">Joined</th>
                      <th className="px-8 py-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50">
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-neutral-50/30 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                              {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-neutral-400 text-sm font-bold">{user.name.charAt(0)}</span>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <Badge className={`rounded-full border-0 ${
                            user.role === 'superadmin' ? 'bg-purple-100 text-purple-700' : 
                            user.role === 'admin' ? 'bg-blue-100 text-blue-700' : 
                            'bg-neutral-100 text-neutral-700'
                          }`}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="px-8 py-6 text-sm text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <select 
                              className="text-xs bg-neutral-50 border-none rounded-full px-2 py-1 focus:ring-1 focus:ring-black/5"
                              value={user.role}
                              onChange={(e) => handleRoleChange(user._id, e.target.value)}
                            >
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                              <option value="superadmin">SuperAdmin</option>
                            </select>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="rounded-full text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                                onClick={() => handleResetPassword(user._id)}
                                title="Reset Password"
                              >
                                <Key className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="rounded-full text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                                onClick={() => handleDeleteUser(user._id)}
                                title="Delete User"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Row: Recent Activity & Admin Protocol */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm">
                <h3 className="text-xl font-serif mb-6 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-emerald-500" />
                  Recent Registrations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {stats?.recentUsers.map((user: any) => (
                    <div key={user._id} className="flex items-center gap-4 p-4 rounded-3xl bg-neutral-50/50">
                      <div className="w-10 h-10 rounded-full bg-white border border-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-400 shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</p>
                      </div>
                      <Badge variant="outline" className="text-[10px] uppercase tracking-tighter shrink-0">New</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-black text-white p-8 rounded-[2.5rem] shadow-xl flex flex-col justify-center">
                <h3 className="text-xl font-serif mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-400" />
                  Admin Protocol
                </h3>
                <p className="text-sm text-neutral-400 mb-8 max-w-md">
                  Actions taken here are permanent and logged. Ensure you verify user identity before modifying permissions or performing deletions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-sm p-4 rounded-2xl bg-white/5 border border-white/10">
                    <UserCheck className="h-4 w-4 text-neutral-500" />
                    <span>Logged Modifications</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm p-4 rounded-2xl bg-white/5 border border-white/10">
                    <Calendar className="h-4 w-4 text-neutral-500" />
                    <span>Weekly Backups Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
