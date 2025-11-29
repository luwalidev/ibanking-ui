// pages/ClientGenericPage.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { CiCreditCard1 } from "react-icons/ci";
import { ClientLayout } from '../../../components/ClientLayout';

interface ClientGenericPageProps {
  language: 'PT' | 'EN';
}

const ClientGenericPage: React.FC<ClientGenericPageProps> = ({ language }) => {
  const location = useLocation();
  
  // Extrair o título da URL e converter para português
  const getTitleFromPath = (pathname: string) => {
    const pathParts = pathname.split('/').filter(part => part);
    
    if (pathParts.length < 2) {
      return language === 'PT' ? 'Dashboard' : 'Dashboard';
    }
    
    const pageName = pathParts[pathParts.length - 1];
    
    // Mapeamento das URLs para títulos em português
    const titleMap: { [key: string]: { PT: string; EN: string } } = {
      'national': { PT: 'Transferências Nacionais', EN: 'National Transfers' },
      'multiple': { PT: 'Transferências Múltiplas', EN: 'Multiple Transfers' },
      'digital-wallet': { PT: 'Carteira Digital', EN: 'Digital Wallet' },
      'scheduled': { PT: 'Operações Agendadas', EN: 'Scheduled Operations' },
      'services': { PT: 'Pagamentos de Serviços', EN: 'Service Payments' },
      'prepaid-cards': { PT: 'Cartões Pré-pagos', EN: 'Prepaid Cards' },
      'extract': { PT: 'Partilhar Extracto', EN: 'Share Statement' },
      'accounts': { PT: 'Contas', EN: 'Accounts' },
      'cards': { PT: 'Cartões', EN: 'Cards' },
      'recharges': { PT: 'Recargas', EN: 'Recharges' },
      'loans': { PT: 'Empréstimos', EN: 'Loans' },
      'investments': { PT: 'Investimentos', EN: 'Investments' },
      'insurance': { PT: 'Seguros', EN: 'Insurance' },
      'profile': { PT: 'Perfil', EN: 'Profile' },
      'security': { PT: 'Segurança', EN: 'Security' },
      'settings': { PT: 'Configurações', EN: 'Settings' },
      'movements': { PT: 'Movimentos', EN: 'Movements' }
    };

    if (titleMap[pageName]) {
      return titleMap[pageName][language];
    }

    // Fallback: converte kebab-case para Title Case
    const fallbackTitle = pageName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return fallbackTitle;
  };

  const getDescriptionFromTitle = (title: string) => {
    const descriptions = {
      PT: {
        'Transferências Nacionais': 'Realize transferências entre contas nacionais',
        'Transferências Múltiplas': 'Realize múltiplas transferências em simultâneo',
        'Carteira Digital': 'Gerencie a sua carteira digital',
        'Operações Agendadas': 'Consulte e gerencie as suas operações agendadas',
        'Pagamentos de Serviços': 'Efetue pagamentos de serviços usando entidade e referência',
        'Cartões Pré-pagos': 'Gerencie os seus cartões pré-pagos',
        'Partilhar Extracto': 'Partilhe o seu extrato bancário com terceiros de forma segura',
        'Contas': 'Gerencie as suas contas bancárias',
        'Cartões': 'Gerencie os seus cartões de débito e crédito',
        'Recargas': 'Carregue o seu telemóvel, electricidade e outros serviços',
        'Empréstimos': 'Consulte as suas opções de empréstimo',
        'Investimentos': 'Invista o seu dinheiro de forma inteligente',
        'Seguros': 'Proteja o que é importante para si',
        'Perfil': 'Gerencie o seu perfil de utilizador',
        'Segurança': 'Configurações de segurança da conta',
        'Configurações': 'Configurações gerais da conta',
        'Movimentos': 'Consulte e gere o seu extrato bancário',
        'Dashboard': 'Visão geral da sua conta bancária'
      },
      EN: {
        'National Transfers': 'Make transfers between national accounts',
        'Multiple Transfers': 'Make multiple transfers simultaneously',
        'Digital Wallet': 'Manage your digital wallet',
        'Scheduled Operations': 'Check and manage your scheduled operations',
        'Service Payments': 'Make service payments using entity and reference',
        'Prepaid Cards': 'Manage your prepaid cards',
        'Share Statement': 'Share UBA Moçambique statement with third parties securely',
        'Accounts': 'Manage UBA Moçambique accounts',
        'Cards': 'Manage your debit and credit cards',
        'Recharges': 'Top up your phone, electricity and other services',
        'Loans': 'Check your loan options',
        'Investments': 'Invest your money smartly',
        'Insurance': 'Protect what matters to you',
        'Profile': 'Manage your user profile',
        'Security': 'Account security settings',
        'Settings': 'General account settings',
        'Movements': 'Check and generate UBA Moçambique statement',
        'Dashboard': 'Overview of UBA Moçambique account'
      }
    };

    const langDescriptions = descriptions[language];
    return langDescriptions[title as keyof typeof langDescriptions] || title;
  };

  const pageTitle = getTitleFromPath(location.pathname);
  const pageDescription = getDescriptionFromTitle(pageTitle);

  const currentTexts = {
    PT: {
      noData: "Não tens nenhuma Informação disponível",
      noDataDescription: "Quando tiveres informações disponíveis, elas aparecerão aqui."
    },
    EN: {
      noData: "You don't have any Information available",
      noDataDescription: "When you have available information, it will appear here."
    }
  }[language];

  return (
    <ClientLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {/* Header da Página */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <CiCreditCard1 size={24} className="text-gray-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
                <p className="text-gray-600">{pageDescription}</p>
              </div>
            </div>
          </div>

          {/* Conteúdo Vazio */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              {/* Ícone grande */}
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <CiCreditCard1 size={48} className="text-gray-400" />
              </div>
              
              {/* Mensagem principal */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {currentTexts.noData}
              </h3>
              
              {/* Descrição */}
              <p className="text-gray-500 max-w-md">
                {currentTexts.noDataDescription}
              </p>
              
              {/* Indicador visual */}
              <div className="mt-8 w-24 h-1 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientGenericPage;