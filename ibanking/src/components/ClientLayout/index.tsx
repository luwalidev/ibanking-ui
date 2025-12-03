// components/ClientLayout.tsx (versão com ambas as funções)
import React, { useState } from 'react';
import { ClientNavbar } from '../Navbar/ClientNavbar';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ 
  children 
}) => {
  const [language, setLanguage] = useState<'PT' | 'EN' | 'ES' | 'FR' | 'DE' | 'IT' | 'NL' | 'ZH' | 'AR'>('PT');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Função para alternar entre PT e EN (como exemplo)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Navbar Lateral - usando setLanguage (conforme a interface do ClientNavbar) */}
      <ClientNavbar
        language={language}
        setLanguage={setLanguage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        userName="Darken Machava"
        userAccount="PT50 1234 5678 9012 3456 7890"
      />
      
      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Mobile */}
        <header className="lg:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Abrir menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <img 
              className="h-6 w-auto" 
              src="/bank-logo.png" 
              alt="UBA Moçambique" 
            />
            <div className="w-10"></div>
          </div>
        </header>

        {/* Conteúdo da Página */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};