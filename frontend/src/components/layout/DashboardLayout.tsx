import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { AnimatePresence, motion } from 'motion/react';
import AIAssistant from '../ai/AIAssistant';

interface DashboardLayoutProps {
  children: React.ReactNode;
  invitationSlug?: string;
  invitationId?: string;
}

export default function DashboardLayout({ children, invitationSlug, invitationId }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop

  return (
    <div className="min-h-screen bg-[#F7F3EF] flex transition-colors duration-300">
      {/* Sidebar - Desktop Collapsible & Mobile Drawer */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        invitationSlug={invitationSlug}
      />
      
      {/* Sidebar Overlay (Mobile only) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
        isCollapsed ? 'lg:ml-20' : 'lg:ml-72'
      }`}>
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="p-4 md:p-10 flex-1 w-full max-w-full overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* AI Assistant */}
      <AIAssistant invitationId={invitationId} />
    </div>
  );
}
