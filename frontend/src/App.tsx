/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import CreateInvitation from "./pages/CreateInvitation";
import InvitationView from "./pages/InvitationView";
import Vendors from "./pages/Vendors";
import VendorProfile from "./pages/VendorProfile";
import Dashboard from "./pages/Dashboard";
import TemplatePreviewPage from "./pages/TemplatePreviewPage";
import { Navigate } from "react-router-dom";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { Toaster } from "sonner";

import DashboardGuests from "./pages/DashboardGuests";
import DashboardVendors from "./pages/DashboardVendors";
import DashboardTimeline from "./pages/DashboardTimeline";
import DashboardPlanning from "./pages/DashboardPlanning";
import DashboardBudget from "./pages/DashboardBudget";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <Toaster position="top-center" richColors />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/preview/:id" element={<TemplatePreviewPage />} />
        <Route path="/create" element={<CreateInvitation />} />
        <Route path="/invite/:slug" element={<InvitationView />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/vendors/:id" element={<VendorProfile />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/guests" 
          element={
            <ProtectedRoute>
              <DashboardGuests />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/vendors-managed" 
          element={
            <ProtectedRoute>
              <DashboardVendors />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/timeline" 
          element={
            <ProtectedRoute>
              <DashboardTimeline />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/planning" 
          element={
            <ProtectedRoute>
              <DashboardPlanning />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/budget" 
          element={
            <ProtectedRoute>
              <DashboardBudget />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

