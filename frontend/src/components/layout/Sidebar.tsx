import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Store,
  Calendar,
  BarChart3,
  Globe,
  Settings,
  HelpCircle,
  Plus,
  Sparkles,
  ChevronLeft,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Guest List', path: '/guests' },
  { icon: Store, label: 'Vendors', path: '/vendors-managed' },
  { icon: Calendar, label: 'Timeline', path: '/timeline' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Globe, label: 'Website Preview', path: '/preview-site', isExternal: true },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  invitationSlug?: string;
}

export default function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse, invitationSlug }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile & Desktop Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-screen bg-[#FDFBF7] border-r border-[#E8D5C8] flex flex-col z-50 transition-all duration-300 shadow-xl lg:shadow-none",
        isCollapsed ? "w-20" : "w-72",
        // Mobile visibility
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Close Button (Mobile Only) */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-[#1F1F1F] lg:hidden"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Sidebar Header */}
        <div className={cn("p-8 pb-4 transition-all duration-300", isCollapsed && "px-4")}>
          <div className={cn("flex items-center gap-3 mb-10 overflow-hidden", isCollapsed && "justify-center")}>
            <button
              onClick={onToggleCollapse}
              className="w-10 h-10 bg-[#AF944F] rounded-xl flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-[#AF944F]/20 hover:scale-105 active:scale-95 transition-all outline-none"
            >
              <Menu className="h-5 w-5" />
            </button>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="whitespace-nowrap"
              >
                <h1 className="font-bold text-[20px] text-[#1F1F1F] leading-tight">Grand Ballroom</h1>
                <p className="text-xs uppercase tracking-widest text-[#AF944F]">Oct 2024 • Wedding</p>
              </motion.div>
            )}
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const path = (item as any).isExternal ? `/invite/${invitationSlug || 'preview'}` : item.path;

              const content = (
                <>
                  <item.icon className={cn(
                    "h-5 w-5 transition-colors flex-shrink-0",
                    isActive ? "text-[#AF944F]" : "text-neutral-400 group-hover:text-neutral-600"
                  )} />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-semibold text-base whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                  {isCollapsed && (
                    <div className="absolute left-full ml-4 px-3 py-2 bg-[#1F1F1F] text-white text-xs rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100] shadow-xl">
                      {item.label}
                    </div>
                  )}
                  {(item as any).isExternal && !isCollapsed && (
                    <ExternalLink className="ml-auto h-3 w-3 opacity-40" />
                  )}
                </>
              );

              return (item as any).isExternal ? (
                <a
                  key={item.label}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                    "text-neutral-500 hover:text-[#AF944F] hover:bg-[#AF944F]/5",
                    isCollapsed && "justify-center px-0"
                  )}
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && onClose()}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                    isActive
                      ? "text-[#AF944F] bg-[#AF944F]/5 shadow-sm"
                      : "text-neutral-500 hover:text-[#1F1F1F] hover:bg-neutral-100/50",
                    isCollapsed && "justify-center px-0"
                  )}
                >
                  {content}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className={cn("mt-auto p-8 pt-4 space-y-6", isCollapsed && "p-4")}>
          <button className={cn(
            "w-full dash-btn-primary flex items-center justify-center gap-2 h-14 transition-all duration-300",
            isCollapsed && "h-12 w-12 p-0 rounded-xl"
          )}>
            <Plus className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-bold">New Event</span>}
          </button>

          <div className="space-y-1">
            <Link
              to="/settings"
              className={cn(
                "flex items-center gap-4 px-4 py-2 text-neutral-500 hover:text-[#1F1F1F] transition-all group relative",
                isCollapsed && "justify-center px-0"
              )}
            >
              <Settings className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-semibold text-base">Settings</span>}
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-[#1F1F1F] text-white text-[10px] rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100]">
                  Settings
                </div>
              )}
            </Link>
            <Link
              to="/support"
              className={cn(
                "flex items-center gap-4 px-4 py-2 text-neutral-500 hover:text-[#1F1F1F] transition-all group relative",
                isCollapsed && "justify-center px-0"
              )}
            >
              <HelpCircle className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-semibold text-base">Support</span>}
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-[#1F1F1F] text-white text-[10px] rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100]">
                  Support
                </div>
              )}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
