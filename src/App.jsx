import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import DashboardLayout from './layouts/DashboardLayout';
import LandingPage from './pages/LandingPage';
import CategoryPage from './pages/CategoryPage';
import ToolDetailPage from './pages/ToolDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AllToolsPage from './pages/AllToolsPage';
import PrivacyPage from './pages/PrivacyPage';

// Scroll to top helper on path change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/tools" element={<AllToolsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/:categoryId" element={<CategoryPage />} />
            <Route path="/tool/:toolId" element={<ToolDetailPage />} />
          </Routes>
        </DashboardLayout>
      </Router>
    </AppProvider>
  );
}

export default App;
