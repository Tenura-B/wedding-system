import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { AnimatePresence, motion } from 'motion/react';
import AIAssistant from '../ai/AIAssistant';
import useIsDesktop from '@/hooks/useIsDesktop';

interface DashboardLayoutProps {
  children: React.ReactNode;
  invitationSlug?: string;
  invitationId?: string;
}

export default function DashboardLayout({ children, invitationSlug, invitationId }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop
  const isDesktop = useIsDesktop();

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#F7F3EF] flex transition-colors duration-300">
      {/* Sidebar - Desktop Collapsible & Mobile Drawer */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        invitationSlug={invitationSlug}
        isDesktop={isDesktop}
      />
      
      {/* Sidebar Overlay (Mobile only) */}
      <AnimatePresence>
        {isSidebarOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
        isDesktop ? (isCollapsed ? 'ml-20' : 'ml-72') : 'ml-0'
      }`}>
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} isDesktop={isDesktop} />
        <main className="p-4 md:p-10 flex-1 w-full max-w-full overflow-x-auto">
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
