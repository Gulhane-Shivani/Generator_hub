import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import DashboardLayout from './layouts/DashboardLayout';
import LandingPage from './pages/LandingPage';
import CategoryPage from './pages/CategoryPage';
import ToolDetailPage from './pages/ToolDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AllToolsPage from './pages/AllToolsPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/tools" element={<AllToolsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/:categoryId" element={<CategoryPage />} />
            <Route path="/tool/:toolId" element={<ToolDetailPage />} />
          </Routes>
        </DashboardLayout>
      </Router>
    </AppProvider>
  );
}

export default App;
