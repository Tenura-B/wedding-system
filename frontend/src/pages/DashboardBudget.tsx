import React, { useState, useEffect } from "react";
import { 
  Wallet, 
  Plus, 
  DollarSign, 
  TrendingDown, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Trash2,
  PieChart,
  Settings2
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

export default function DashboardBudget() {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [budget, setBudget] = useState<any>({ totalBudget: 0, expenses: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingTotal, setIsEditingTotal] = useState(false);
  const [tempTotal, setTempTotal] = useState("");

  // Form for new expense
  const [expenseForm, setExpenseForm] = useState({
    name: "",
    category: "Venue",
    amount: "",
    status: "Pending"
  });

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const res = await api.get('user/dashboard');
        setInvitations(res.data);
        if (res.data.length > 0) {
          setSelectedId(res.data[0]._id);
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
    if (!selectedId) return;
    const fetchBudget = async () => {
      try {
        const res = await api.get(`invitations/${selectedId}/budget`);
        setBudget(res.data);
        setTempTotal(res.data.totalBudget.toString());
      } catch (error) {
        console.error("Error fetching budget:", error);
      }
    };
    fetchBudget();
  }, [selectedId]);

  const updateBudget = async (newTotal?: number, newExpenses?: any[]) => {
    if (!selectedId) return;
    try {
      const res = await api.post(`invitations/${selectedId}/budget`, {
        totalBudget: newTotal !== undefined ? newTotal : budget.totalBudget,
        expenses: newExpenses !== undefined ? newExpenses : budget.expenses
      });
      setBudget(res.data);
    } catch (error) {
      toast.error("Failed to update budget");
    }
  };

  const handleSetTotal = () => {
    const val = parseFloat(tempTotal);
    if (isNaN(val)) return;
    updateBudget(val);
    setIsEditingTotal(false);
    toast.success("Budget updated!");
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(expenseForm.amount);
    if (!expenseForm.name || isNaN(amt)) return;

    const newExpenses = [...budget.expenses, { ...expenseForm, amount: amt, date: new Date() }];
    updateBudget(undefined, newExpenses);
    setExpenseForm({ name: "", category: "Venue", amount: "", status: "Pending" });
    toast.success("Expense added");
  };

  const deleteExpense = (idx: number) => {
    const newExpenses = budget.expenses.filter((_: any, i: number) => i !== idx);
    updateBudget(undefined, newExpenses);
    toast.success("Expense removed");
  };

  const toggleStatus = (idx: number) => {
    const newExpenses = budget.expenses.map((exp: any, i: number) => 
      i === idx ? { ...exp, status: exp.status === 'Paid' ? 'Pending' : 'Paid' } : exp
    );
    updateBudget(undefined, newExpenses);
  };

  const totalSpent = budget.expenses.reduce((acc: number, curr: any) => acc + curr.amount, 0);
  const remaining = budget.totalBudget - totalSpent;
  const percentSpent = budget.totalBudget > 0 ? Math.round((totalSpent / budget.totalBudget) * 100) : 0;

  return (
    <DashboardLayout 
      invitationSlug={selectedSlug || undefined}
      invitationId={selectedId || undefined}
    >
      <div className="space-y-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#AF944F]/10 rounded-lg text-[#AF944F]">
                <Wallet className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[2px] text-[#AF944F]">Finance Manager</span>
            </div>
            <h1 className="text-4xl font-bold text-[#1F1F1F] mb-1">Wedding Budget</h1>
            <p className="text-neutral-500 font-medium font-serif italic text-lg">Keep your wedding finances in perfect harmony.</p>
          </div>

          <div className="flex items-center gap-4">
             {isEditingTotal ? (
               <div className="flex gap-2">
                 <input 
                   type="number" 
                   value={tempTotal}
                   onChange={(e) => setTempTotal(e.target.value)}
                   className="w-40 h-14 bg-white border-2 border-[#AF944F] rounded-2xl px-4 text-xl font-bold text-[#1F1F1F] outline-none"
                   autoFocus
                 />
                 <button 
                   onClick={handleSetTotal}
                   className="px-6 bg-[#AF944F] text-white rounded-2xl font-bold hover:bg-[#967d3f] transition-all"
                 >
                   Save
                 </button>
               </div>
             ) : (
               <button 
                 onClick={() => setIsEditingTotal(true)}
                 className="group flex items-center gap-4 bg-white p-2 pr-8 rounded-[2rem] border border-[#E8D5C8]/50 shadow-sm hover:border-[#AF944F]/30 transition-all"
               >
                 <div className="w-12 h-12 rounded-full bg-[#FDFBF7] flex items-center justify-center text-[#AF944F] transition-all group-hover:bg-[#AF944F] group-hover:text-white">
                   <Settings2 className="h-5 w-5" />
                 </div>
                 <div className="text-left">
                   <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-none mb-1">Total Budget</p>
                   <p className="text-xl font-black text-[#1F1F1F]">${budget.totalBudget.toLocaleString()}</p>
                 </div>
               </button>
             )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="dash-card p-8 border-none !bg-emerald-500/10 shadow-xl shadow-[#AF944F]/5 relative overflow-hidden">
             <div className="flex items-center justify-between mb-8">
               <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                 <DollarSign className="h-7 w-7" />
               </div>
               <div className="text-right">
                 <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Spent</p>
                 <h3 className="text-3xl font-black text-[#1F1F1F]">${totalSpent.toLocaleString()}</h3>
               </div>
             </div>
             <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-neutral-400">{percentSpent}% used</span>
                  <span className="text-emerald-600">Within limits</span>
                </div>
                <div className="h-2 w-full bg-emerald-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(percentSpent, 100)}%` }}
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      percentSpent > 100 ? "bg-rose-500" : "bg-emerald-500"
                    )}
                  />
                </div>
             </div>
          </div>

          <div className="dash-card p-8 border-none !bg-[#AF944F] text-white shadow-xl shadow-[#AF944F]/20 relative overflow-hidden group">
             <TrendingUp className="absolute -right-4 -bottom-4 h-32 w-32 opacity-10 rotate-12 transition-transform group-hover:scale-110" />
             <div className="flex items-center justify-between mb-8 relative z-10">
               <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                 <Wallet className="h-7 w-7" />
               </div>
               <div className="text-right">
                 <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Remaining</p>
                 <h3 className="text-3xl font-black text-white">${remaining.toLocaleString()}</h3>
               </div>
             </div>
             <p className="text-white/80 font-serif italic text-lg leading-tight relative z-10">
               "Small steps in savings lead to big results on the wedding day."
             </p>
          </div>

          <div className="dash-card p-8 border-none !bg-[#D9BDB5] text-[#1F1F1F] shadow-xl shadow-[#D9BDB5]/20 relative overflow-hidden group">
             <div className="flex items-center justify-between mb-8 relative z-10">
               <div className="w-14 h-14 rounded-2xl bg-white/40 flex items-center justify-center text-[#1F1F1F]">
                 <PieChart className="h-7 w-7" />
               </div>
               <div className="text-right">
                 <p className="text-xs font-bold text-[#1F1F1F]/40 uppercase tracking-widest mb-1">Avg. Category</p>
                 <h3 className="text-3xl font-black text-[#1F1F1F]">${budget.expenses.length > 0 ? Math.round(totalSpent / (new Set(budget.expenses.map((e:any)=>e.category)).size)).toLocaleString() : 0}</h3>
               </div>
             </div>
             <div className="flex gap-2 relative z-10">
               {['Venue', 'Catering', 'Dress'].map(c => (
                 <span key={c} className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest text-white/60">
                   {c}
                 </span>
               ))}
             </div>
          </div>
        </div>

        <div className="space-y-12 max-w-[1000px] mx-auto">
           {/* 1. Expense Tracking Table (Full Width) */}
           <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-[#1F1F1F]">Expense Tracking</h3>
                <div className="flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Live Updates</span>
                </div>
              </div>

              <div className="dash-card p-0 overflow-hidden bg-white border-[#E8D5C8]/30 shadow-sm">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#FDFBF7] border-b border-[#E8D5C8]/30">
                      <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-neutral-400">Expense</th>
                      <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-neutral-400">Category</th>
                      <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-neutral-400">Amount</th>
                      <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-neutral-400">Status</th>
                      <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-neutral-400"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8D5C8]/10">
                    {budget.expenses.map((exp: any, i: number) => (
                      <tr key={i} className="hover:bg-[#FDFBF7]/50 transition-colors group">
                        <td className="px-8 py-6">
                          <span className="font-bold text-[#1F1F1F]">{exp.name}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="px-3 py-1 bg-[#AF944F]/5 text-[#AF944F] text-[10px] font-bold uppercase tracking-widest rounded-lg">
                            {exp.category}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="font-mono font-bold text-[#1F1F1F] text-lg">${exp.amount.toLocaleString()}</span>
                        </td>
                        <td className="px-8 py-6">
                          <button 
                            onClick={() => toggleStatus(i)}
                            className={cn(
                              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all",
                              exp.status === 'Paid' 
                                ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                                : "bg-amber-50 text-amber-600 border-amber-100"
                            )}
                          >
                            {exp.status === 'Paid' ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                            {exp.status}
                          </button>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button 
                            onClick={() => deleteExpense(i)}
                            className="p-2 text-neutral-300 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {budget.expenses.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-20 text-center text-neutral-400 font-serif italic text-lg">
                          No expenses recorded yet. Start by adding your first vendor payment.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
           </div>

           {/* 2. Add New Expense Form (Full Width) */}
           <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#1F1F1F]">Add New Expense</h3>
              <div className="dash-card p-10 bg-white border-[#E8D5C8]/50 shadow-xl shadow-[#AF944F]/5">
                <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Item Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g., Wedding Cake"
                          value={expenseForm.name}
                          onChange={(e) => setExpenseForm({...expenseForm, name: e.target.value})}
                          className="w-full bg-white border border-[#E8D5C8] rounded-2xl h-16 px-6 text-[#1F1F1F] font-bold outline-none focus:ring-2 focus:ring-[#AF944F]/20 transition-all shadow-inner"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Category</label>
                        <select 
                          value={expenseForm.category}
                          onChange={(e) => setExpenseForm({...expenseForm, category: e.target.value})}
                          className="w-full bg-[#F7F3EF] border-none rounded-2xl h-16 px-6 text-[#1F1F1F] font-bold outline-none focus:ring-2 focus:ring-[#AF944F]/20 transition-all appearance-none"
                        >
                          {['Venue', 'Catering', 'Attire', 'Music', 'Flowers', 'Photo', 'Other'].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Amount ($)</label>
                        <input 
                          type="number" 
                          placeholder="0.00"
                          value={expenseForm.amount}
                          onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})}
                          className="w-full bg-white border border-[#E8D5C8] rounded-2xl h-16 px-6 text-[#1F1F1F] font-bold outline-none focus:ring-2 focus:ring-[#AF944F]/20 transition-all shadow-inner"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 flex flex-col justify-between">
                    <div>
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Payment Status</label>
                      <div className="flex gap-3">
                         {['Pending', 'Paid'].map(s => (
                           <button
                             key={s}
                             type="button"
                             onClick={() => setExpenseForm({...expenseForm, status: s})}
                             className={cn(
                               "flex-1 h-16 rounded-2xl font-bold transition-all border-2",
                               expenseForm.status === s 
                                ? "bg-[#AF944F] border-[#AF944F] text-white shadow-lg shadow-[#AF944F]/20" 
                                : "bg-white border-[#E8D5C8]/50 text-neutral-400 hover:border-[#AF944F]/20"
                             )}
                           >
                             {s}
                           </button>
                         ))}
                      </div>
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-[#AF944F] text-white rounded-2xl h-18 font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#AF944F]/30"
                    >
                      <Plus className="h-6 w-6" />
                      <span className="text-lg">Record Expense</span>
                    </button>
                  </div>
                </form>
              </div>
           </div>

           {/* 3. Footer Insights (Moved Down & Side-by-Side) */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#E8D5C8]/30">
              <div className="dash-card p-8 !bg-[#FDFBF7] border-2 border-[#AF944F]/30 shadow-xl shadow-[#AF944F]/5 relative overflow-hidden group">
                <TrendingDown className="absolute -right-4 -bottom-4 h-24 w-24 text-[#AF944F]/10 rotate-12 transition-transform group-hover:scale-110" />
                <h4 className="font-bold text-[#AF944F] mb-4 flex items-center gap-2 relative z-10">
                  <TrendingDown className="h-5 w-5" />
                  Budget Insight
                </h4>
                <p className="text-lg text-[#1F1F1F] font-serif italic leading-relaxed relative z-10">
                  {percentSpent > 80 ? "You're close to your limit! Time to review upcoming vendor quotes." : "Great job! You still have plenty of room for those extra decorative touches."}
                </p>
              </div>
              
              <div className="dash-card p-8 !bg-emerald-50 border-2 border-emerald-100 shadow-xl shadow-emerald-500/5 flex flex-col justify-center relative overflow-hidden group">
                 <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-emerald-200/20 rounded-full blur-3xl transition-transform group-hover:scale-150" />
                 <h4 className="text-xl font-bold mb-2 relative z-10 text-emerald-600 flex items-center gap-2">
                   <CheckCircle2 className="h-5 w-5" />
                   Financial Success
                 </h4>
                 <p className="text-base text-emerald-800/80 font-serif italic relative z-10">
                   "Tracking every dollar is the first step toward a stress-free wedding day. Your future self will thank you!"
                 </p>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
