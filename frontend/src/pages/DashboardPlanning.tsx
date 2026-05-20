import React, { useState, useEffect } from "react";
import {
  ClipboardList,
  Plus,
  CheckCircle2,
  Circle,
  Trash2,
  Calendar,
  Tag,
  StickyNote,
  AlertCircle,
  Sparkles
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

export default function DashboardPlanning() {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newTask, setNewTask] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const res = await api.get('user/dashboard');
        setInvitations(res.data);
        if (res.data.length > 0) {
          setSelectedSlug(res.data[0].slug);
          setSelectedId(res.data[0]._id);
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
    const fetchTasks = async () => {
      try {
        const res = await api.get(`invitations/${selectedId}/tasks`);
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [selectedId]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim() || !selectedId) return;

    try {
      const res = await api.post(`invitations/${selectedId}/tasks`, {
        title: newTask,
        category: "General"
      });
      setTasks([...tasks, res.data]);
      setNewTask("");
      toast.success("Task added!");
    } catch (error) {
      toast.error("Failed to add task");
    }
  };

  const toggleTask = async (id: string, completed: boolean) => {
    try {
      const res = await api.patch(`tasks/${id}`, { completed: !completed });
      setTasks(tasks.map(t => t._id === id ? res.data : t));
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
      toast.success("Task removed");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const filteredTasks = tasks.filter(t => {
    const matchesTab = activeTab === "all" || 
                      (activeTab === "pending" && !t.completed) || 
                      (activeTab === "completed" && t.completed);
    const matchesSearch = t.title.toLowerCase().includes(newTask.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const completionRate = tasks.length > 0
    ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)
    : 0;

  return (
    <DashboardLayout 
      invitationSlug={selectedSlug || undefined}
      invitationId={selectedId || undefined}
    >
      <div className="space-y-8 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#006884]/10 rounded-lg text-[#006884]">
                <ClipboardList className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[2px] text-[#006884]">Planning Center</span>
            </div>
            <div className="flex flex-col xl:flex-row xl:items-center gap-8">
              <div>
                <h1 className="text-4xl font-bold text-[#1F1F1F] mb-1">Task Checklist</h1>
                <p className="text-neutral-500 font-medium font-serif italic text-lg">Your wedding command center and to-do list.</p>
              </div>
              
              {/* Quick Add aligned with title */}
              <form onSubmit={handleAddTask} className="relative flex-1 max-w-xl">
                <input 
                  type="text" 
                  placeholder="What needs to be done? Add or search tasks..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="w-full bg-white border border-[#E8D5C8]/50 rounded-[2rem] h-16 pl-8 pr-32 text-lg shadow-sm focus:ring-4 focus:ring-[#006884]/5 outline-none transition-all"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-6 bg-[#006884] text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-[#967d3f] transition-all shadow-lg shadow-[#006884]/10"
                >
                  <Plus className="h-5 w-5" />
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          {/* Horizontal Highlight Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Overall Progress */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-[#E8D5C8]/50 shadow-sm flex items-center gap-8 h-full min-h-[180px]">
              <div className="w-20 h-20 rounded-full border-4 border-[#F7F3EF] relative flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full absolute inset-0 -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke="#006884"
                    strokeWidth="5"
                    strokeDasharray={226.2}
                    strokeDashoffset={226.2 - (226.2 * completionRate) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <span className="text-xl font-black text-[#006884] relative z-10">{completionRate}%</span>
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Overall Progress</p>
                <p className="text-sm font-serif italic text-neutral-500">
                  {completionRate === 100 ? "All tasks completed!" : `${tasks.filter(t => !t.completed).length} tasks remaining`}
                </p>
              </div>
            </div>

            {/* Wedding Notes */}
            <div className="dash-card p-0 overflow-hidden flex flex-col h-full min-h-[180px]">
              <div className="p-6 border-b border-[#E8D5C8]/30 flex items-center justify-between bg-[#FDFBF7]">
                <h3 className="font-bold text-[#1F1F1F] flex items-center gap-2">
                  <StickyNote className="h-5 w-5 text-[#006884]" />
                  Wedding Notes
                </h3>
              </div>
              <textarea 
                placeholder="Jot down your inspiration, color palettes..."
                className="flex-1 p-6 !bg-white border-none focus:ring-0 text-[#1F1F1F] font-serif text-base leading-relaxed resize-none placeholder:text-neutral-300 outline-none"
              />
            </div>

            {/* Planning Tip */}
            <div className="dash-card p-8 bg-[#006884] text-black border-none shadow-xl shadow-[#006884]/20 overflow-hidden relative h-full min-h-[180px] flex flex-col justify-center">
              <Sparkles className="absolute -right-4 -top-4 h-24 w-24 opacity-10 rotate-12" />
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Planning Tip
              </h3>
              <p className="font-serif italic text-lg leading-relaxed">
                "Start with the venue and guest list. Everything else flows from your budget and count!"
              </p>
            </div>
          </div>

          {/* Main Task Area (Full Width) */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[#E8D5C8]/30 pb-6">
              <div className="flex gap-2 p-1.5 bg-[#E8D5C8]/20 rounded-2xl w-fit">
                {['all', 'pending', 'completed'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all",
                      activeTab === tab 
                        ? "bg-white text-[#006884] shadow-sm" 
                        : "text-neutral-500 hover:text-[#1F1F1F]"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest">
                Showing <span className="text-[#006884]">{filteredTasks.length}</span> Tasks
              </div>
            </div>

            {/* Task List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredTasks.map((task) => (
                  <motion.div
                    key={task._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={cn(
                      "dash-card p-6 flex items-center gap-4 group hover:border-[#006884]/20 transition-all",
                      task.completed && "bg-[#FDFBF7]/50"
                    )}
                  >
                    <button 
                      onClick={() => toggleTask(task._id, task.completed)}
                      className={cn(
                        "transition-all transform active:scale-90",
                        task.completed ? "text-[#10B981]" : "text-neutral-300 hover:text-[#006884]"
                      )}
                    >
                      {task.completed ? <CheckCircle2 className="h-8 w-8" /> : <Circle className="h-8 w-8" />}
                    </button>
                    
                    <div className="flex-1">
                      <h3 className={cn(
                        "text-lg font-bold transition-all",
                        task.completed ? "text-neutral-400 line-through" : "text-[#1F1F1F]"
                      )}>
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-[#006884] uppercase tracking-widest">
                          <Tag className="h-3 w-3" />
                          {task.category}
                        </span>
                        {task.dueDate && (
                          <span className="flex items-center gap-1.5 text-xs font-medium text-neutral-400">
                            <Calendar className="h-3 w-3" />
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <button 
                      onClick={() => deleteTask(task._id)}
                      className="p-3 text-neutral-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredTasks.length === 0 && (
                <div className="col-span-full py-20 text-center space-y-4 bg-white/50 rounded-[3rem] border border-dashed border-[#E8D5C8]">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto text-[#E8D5C8]">
                    <StickyNote className="h-8 w-8" />
                  </div>
                  <p className="text-neutral-400 font-serif italic text-lg">No tasks found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
