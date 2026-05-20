import React from 'react';
import { Search, Bell, User, Menu, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface TopbarProps {
  onMenuClick: () => void;
  isDesktop?: boolean;
}

export default function Topbar({ onMenuClick, isDesktop = false }: TopbarProps) {
  return (
    <header className="h-20 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-[#E8D5C8] px-4 md:px-8 flex items-center justify-between sticky top-0 z-40 transition-colors gap-4">
      <div className="flex items-center gap-4 md:gap-8 lg:gap-12 flex-1 min-w-0">
        {/* Hamburger Menu (Mobile Only) */}
        {!isDesktop && (
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 text-[#1F1F1F] hover:bg-neutral-100 rounded-xl transition-all flex-shrink-0"
          >
            <Menu className="h-6 w-6" />
          </button>
        )}

        {/* Back to Home Button */}
        <Link 
          to="/" 
          className="hidden lg:flex items-center gap-2 px-4 py-2 text-neutral-500 hover:text-[#006884] transition-all group border border-transparent hover:border-[#006884]/20 rounded-xl flex-shrink-0"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap">Back to Site</span>
        </Link>

        {/* Search Bar */}
        <div className="relative w-full max-w-[140px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-md min-w-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#006884]" />
          <input 
            type="text" 
            placeholder="Search events..." 
            className="w-full bg-[#F7F3EF] border border-[#E8D5C8]/50 rounded-2xl h-11 pl-10 pr-3 text-sm focus:ring-2 focus:ring-[#006884]/20 focus:bg-white transition-all outline-none truncate"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3 lg:gap-6 shrink-0">
        {/* Add Guest */}
        <button className="hidden lg:block text-sm font-bold text-[#006884] hover:bg-[#006884]/5 px-4 py-2 rounded-xl transition-all uppercase tracking-widest whitespace-nowrap">
          Add Guest
        </button>
        
        {/* Create Invite */}
        <button className="dash-btn-primary h-11 px-3 md:px-5 text-sm whitespace-nowrap flex-shrink-0">
          <span className="hidden sm:inline">Create Invite</span>
          <span className="sm:hidden">+</span>
        </button>

        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          {/* Notifications */}
          <button className="w-10 h-10 rounded-2xl border border-[#E8D5C8] flex items-center justify-center text-[#1F1F1F] hover:bg-white hover:text-[#006884] transition-all flex-shrink-0">
            <Bell className="h-5 w-5" />
          </button>
          
          {/* User Profile */}
          <div className="flex items-center gap-2 md:gap-3 pl-2 border-l border-[#E8D5C8]/50">
            <div className="hidden lg:block text-right">
              <p className="text-sm font-bold text-[#1F1F1F] leading-none mb-1 whitespace-nowrap truncate max-w-[120px]">{JSON.parse(localStorage.getItem('user') || '{}').name}</p>
              <p className="text-[10px] uppercase tracking-widest text-[#006884] whitespace-nowrap">Wedding Planner</p>
            </div>
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl overflow-hidden border-2 border-[#006884]/30 p-0.5 shadow-sm flex-shrink-0">
              <div className="w-full h-full bg-[#E8D5C8]/30 rounded-xl flex items-center justify-center">
                <User className="h-5 w-5 md:h-6 md:w-6 text-[#006884]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
