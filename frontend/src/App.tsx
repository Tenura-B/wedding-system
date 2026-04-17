/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import CreateInvitation from "./pages/CreateInvitation";
import InvitationView from "./pages/InvitationView";
import Vendors from "./pages/Vendors";
import VendorProfile from "./pages/VendorProfile";
import { ScrollToTop } from "./components/layout/ScrollToTop";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/create" element={<CreateInvitation />} />
        <Route path="/invite/:slug" element={<InvitationView />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/vendors/:id" element={<VendorProfile />} />
      </Routes>
    </Router>
  );
}

