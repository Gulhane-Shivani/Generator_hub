import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import DashboardLayout from './layouts/DashboardLayout';
import LandingPage from './pages/LandingPage';
import CategoryPage from './pages/CategoryPage';
import ToolDetailPage from './pages/ToolDetailPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/:categoryId" element={<CategoryPage />} />
            <Route path="/tool/:toolId" element={<ToolDetailPage />} />
          </Routes>
        </DashboardLayout>
      </Router>
    </AppProvider>
  );
}

export default App;
