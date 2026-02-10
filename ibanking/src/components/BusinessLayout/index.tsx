// components/BusinessLayout.tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { BusinessNavbar } from '../Navbar/BusinessNavbar';

interface BusinessLayoutProps {
  children?: React.ReactNode;
}

export const BusinessLayout: React.FC<BusinessLayoutProps> = ({ 
  children 
}) => {
  const [language, setLanguage] = useState<'PT' | 'EN'>('PT');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'PT' ? 'EN' : 'PT');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Navbar Lateral Empresas */}
      <BusinessNavbar
        language={language}
        toggleLanguage={toggleLanguage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        companyName="Energias renováveis, S.A"
        companyTaxId="501234567"
        userName="Joaquim Armando"
      />
      
      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Mobile */}
        <header className="lg:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <img 
              className="h-6 w-auto" 
              src="/bank-logo.png" 
              alt="Business Bank" 
            />
            <div className="w-10"></div> {/* Spacer para alinhamento */}
          </div>
        </header>

        {/* Conteúdo da Página */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};