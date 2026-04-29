import React from 'react';
import { Search, Bell, User, Menu, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="h-20 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-[#E8D5C8] px-4 md:px-8 flex items-center justify-between sticky top-0 z-40 transition-colors">
      <div className="flex items-center gap-4 md:gap-12 flex-1">
        {/* Hamburger Menu (Mobile Only) */}
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-[#1F1F1F] lg:hidden hover:bg-neutral-100 rounded-xl transition-all"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Back to Home Button */}
        <Link 
          to="/" 
          className="hidden sm:flex items-center gap-2 px-4 py-2 text-neutral-500 hover:text-[#AF944F] transition-all group border border-transparent hover:border-[#AF944F]/20 rounded-xl"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Site</span>
        </Link>

        <div className="relative max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#AF944F]" />
          <input 
            type="text" 
            placeholder="Search events..." 
            className="w-full bg-[#F7F3EF] border border-[#E8D5C8]/50 rounded-2xl h-11 pl-11 pr-4 text-sm focus:ring-2 focus:ring-[#AF944F]/20 focus:bg-white transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <button className="hidden md:block text-base font-bold text-[#AF944F] hover:bg-[#AF944F]/5 px-4 py-2 rounded-xl transition-all uppercase tracking-widest">
          Add Guest
        </button>
        <button className="dash-btn-primary h-11 px-4 md:px-6 text-base">
          <span className="hidden sm:inline">Create Invite</span>
          <span className="sm:hidden">+</span>
        </button>
        <div className="flex items-center gap-2 md:gap-4">
          <button className="w-10 h-10 md:w-11 md:h-11 rounded-2xl border border-[#E8D5C8] flex items-center justify-center text-neutral-400 hover:bg-white hover:text-[#1F1F1F] transition-all">
            <Bell className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3 pl-2">
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-[#1F1F1F] leading-none mb-1">{JSON.parse(localStorage.getItem('user') || '{}').name}</p>
              <p className="text-[10px] uppercase tracking-widest text-[#AF944F]">Wedding Planner</p>
            </div>
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl overflow-hidden border-2 border-[#AF944F]/30 p-0.5 shadow-sm">
              <div className="w-full h-full bg-[#E8D5C8]/30 rounded-xl flex items-center justify-center">
                <User className="h-5 w-5 md:h-6 md:w-6 text-[#AF944F]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
