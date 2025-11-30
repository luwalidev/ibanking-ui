import React, { useState } from 'react';
import { BsPiggyBank } from "react-icons/bs";
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CiLogout,
  CiUser,
  CiSettings,
  CiCreditCard1,
  CiBank,
  CiLock,
  CiBellOn,
  CiHome,
  CiCalendar,
  CiShare1
} from "react-icons/ci";
import { IoStatsChart, IoCardOutline } from "react-icons/io5";
import { TbTransfer } from "react-icons/tb";
import { FaWallet, FaMoneyCheckAlt, FaMobileAlt, FaFileInvoice, FaUserFriends, FaUmbrellaBeach, FaCar, FaShieldAlt } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { navbarTexts } from '../../translations/navbarTexts';
import { clientTexts } from '../../translations/clientNavbar';

// Interface para as props
interface ClientNavbarProps {
  language: 'PT' | 'EN';
  toggleLanguage: () => void;
  isOpen: boolean;
  onToggle: () => void;
  userName?: string;
  userAccount?: string;
}

const ClientNavbar: React.FC<ClientNavbarProps> = ({
  language,
  toggleLanguage,
  isOpen,
  onToggle,
  userName = "Darken Machava",
  userAccount = "PT50 0000 0000 0000 0000 0000"
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    transferencias: false,
    pagamentos: false,
    seguros: false,
    poupanca: false,
    outrosServicos: false
  });

  const handleLogout = () => {
    navigate('/');
  };

  const currentTexts = navbarTexts[language];
  const currentClientTexts = clientTexts[language];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  // Ações Rápidas (itens principais sem dropdown)
  const quickActionsItems = [
    { path: '/mypanel', icon: CiHome, label: currentClientTexts.dashboard },
    { path: '/client/accounts', icon: CiBank, label: currentClientTexts.accounts },
    { path: '/client/cards', icon: CiCreditCard1, label: currentClientTexts.cards },
    { path: '/client/recharges', icon: FaMobileAlt, label: currentClientTexts.recharges },
    { path: '/client/loans', icon: IoCardOutline, label: currentClientTexts.loans },
    { path: '/client/investments', icon: IoStatsChart, label: currentClientTexts.investments },
  ];

  // Menu Transferências (com dropdown)
  const transferItems = [
    { path: '/client/transfers/national', icon: FaMoneyCheckAlt, label: currentClientTexts.nationalTransfers },
    { path: '/client/transfers/international', icon: TbTransfer, label: language === 'PT' ? 'Internacionais' : 'International' },
    { path: '/client/transfers/same-bank', icon: TbTransfer, label: language === 'PT' ? 'Entre contas do mesmo banco' : 'Same Bank Transfers' },
    { path: '/client/transfers/my-accounts', icon: TbTransfer, label: language === 'PT' ? 'Entre as minhas contas' : 'Between My Accounts' },
    { path: '/client/transfers/multiple', icon: TbTransfer, label: currentClientTexts.multipleTransfers },
    { path: '/client/transfers/digital-wallet', icon: FaWallet, label: currentClientTexts.digitalWallet },
    { path: '/client/transfers/scheduled', icon: CiCalendar, label: currentClientTexts.scheduledOperations },
    { path: '/client/movements', icon: FaFileInvoice, label: currentClientTexts.movements || 'Movimentos' },
  ];

  // Menu Pagamentos (apenas pagamentos de serviços)
  const paymentItems = [
    { path: '/client/payments/services', icon: MdOutlinePayments, label: currentClientTexts.servicePayments },
    { path: '/client/recharges', icon: MdOutlinePayments, label: currentClientTexts.recharges },
  ];

  // Menu Seguros (novo)
  const insuranceItems = [
    { path: '/client/insurance/travel', icon: FaUmbrellaBeach, label: language === 'PT' ? 'Seguro de Viagens' : 'Travel Insurance' },
    { path: '/client/insurance/third-party', icon: FaCar, label: language === 'PT' ? 'Seguro de Terceiros' : 'Third Party Insurance' },
    { path: '/client/insurance/other', icon: FaShieldAlt, label: language === 'PT' ? 'Outros Seguros' : 'Other Insurance' },
  ];

  // Menu Poupança (novo)
  const savingsItems = [
    { path: '/client/savings/create', icon: BsPiggyBank, label: language === 'PT' ? 'Fazer Poupança' : 'Create Savings' },
    { path: '/client/savings/fixed-deposit', icon: BsPiggyBank, label: language === 'PT' ? 'Depósito a Prazo' : 'Fixed Deposit' },
  ];

  // Outros Serviços (com dropdown)
  const otherServicesItems = [
    { path: '/client/prepaid-cards', icon: MdOutlinePayments, label: currentClientTexts.prepaidCards },
    { path: '/client/beneficiaries', icon: FaUserFriends, label: language === 'PT' ? 'Beneficiários' : 'Beneficiaries' },
    { path: '/client/extract', icon: CiShare1, label: currentClientTexts.shareExtract || 'Partilhar Extracto' },
    { path: '/client/notifications', icon: CiShare1, label: currentClientTexts.notifications || 'Partilhar Extracto' },
  ];

  // Menu de configurações
  const settingsItems = [
    { path: '/client/profile', icon: CiUser, label: currentClientTexts.profile },
    { path: '/client/security', icon: CiLock, label: currentClientTexts.security },
    { path: '/client/settings', icon: CiSettings, label: currentClientTexts.settings },
  ];

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Navbar Lateral */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-lg z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-80 flex flex-col
      `}>

        {/* Header com logo e toggle */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <img
              className="h-7 w-auto"
              src="/bank-logo.png"
              alt="UBA Moçambique"
            />
            <span className="text-lg font-bold text-red-600">
              Moçambique
            </span>
          </div>

          {/* Botão para fechar no mobile */}
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-linear-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {userName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {userName}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {userAccount}
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => handleNavigation('/client/profile')}
              className="flex-1 bg-red-50 text-red-600 text-xs font-medium py-2 px-3 rounded-lg hover:bg-red-100 transition-colors"
            >
              {currentClientTexts.viewProfile}
            </button>

            <button
              onClick={() => handleNavigation('/client/notifications')}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors relative"
            >
              <CiBellOn size={18} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </div>

        {/* Menu de Navegação Principal */}
        <div className="flex-1 overflow-y-auto">
          {/* Ações Rápidas */}
          <nav className="p-4 border-b border-gray-100">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {currentClientTexts.quickAccess}
            </p>

            {quickActionsItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-left
                    ${isActive
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Transferências */}
          <div className="border-t border-gray-100">
            <button
              onClick={() => toggleSection('transferencias')}
              className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <TbTransfer size={20} />
                <span>{currentClientTexts.transfers}</span>
              </div>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${expandedSections.transferencias ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSections.transferencias && (
              <div className="pl-8 pr-3 pb-2 space-y-1">
                {transferItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`
                        flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 text-left
                        ${isActive
                          ? 'bg-red-50 text-red-600'
                          : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                        }
                      `}
                    >
                      <Icon size={16} />
                      <span className="text-xs">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pagamentos */}
          <div className="border-t border-gray-100">
            <button
              onClick={() => toggleSection('pagamentos')}
              className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <MdOutlinePayments size={20} />
                <span>{currentClientTexts.payments}</span>
              </div>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${expandedSections.pagamentos ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSections.pagamentos && (
              <div className="pl-8 pr-3 pb-2 space-y-1">
                {paymentItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`
                        flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 text-left
                        ${isActive
                          ? 'bg-red-50 text-red-600'
                          : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                        }
                      `}
                    >
                      <Icon size={16} />
                      <span className="text-xs">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Seguros (NOVO) */}
          <div className="border-t border-gray-100">
            <button
              onClick={() => toggleSection('seguros')}
              className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <FaShieldAlt size={20} />
                <span>{currentClientTexts.insurance}</span>
              </div>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${expandedSections.seguros ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSections.seguros && (
              <div className="pl-8 pr-3 pb-2 space-y-1">
                {insuranceItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`
                        flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 text-left
                        ${isActive
                          ? 'bg-red-50 text-red-600'
                          : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                        }
                      `}
                    >
                      <Icon size={16} />
                      <span className="text-xs">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Poupança (NOVO) */}
          <div className="border-t border-gray-100">
            <button
              onClick={() => toggleSection('poupanca')}
              className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <BsPiggyBank size={20} />
                <span>{language === 'PT' ? 'Poupança' : 'Savings'}</span>
              </div>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${expandedSections.poupanca ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSections.poupanca && (
              <div className="pl-8 pr-3 pb-2 space-y-1">
                {savingsItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`
                        flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 text-left
                        ${isActive
                          ? 'bg-red-50 text-red-600'
                          : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                        }
                      `}
                    >
                      <Icon size={16} />
                      <span className="text-xs">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Outros Serviços */}
          <div className="border-t border-gray-100">
            <button
              onClick={() => toggleSection('outrosServicos')}
              className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <CiSettings size={20} />
                <span>{currentClientTexts.otherServices}</span>
              </div>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${expandedSections.outrosServicos ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSections.outrosServicos && (
              <div className="pl-8 pr-3 pb-2 space-y-1">
                {otherServicesItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`
                        flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 text-left
                        ${isActive
                          ? 'bg-red-50 text-red-600'
                          : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                        }
                      `}
                    >
                      <Icon size={16} />
                      <span className="text-xs">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Menu de Configurações */}
          <nav className="p-4 border-t border-gray-100">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {currentTexts.settings}
            </p>

            {settingsItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-left
                    ${isActive
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer com linguagem e logout */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          {/* Selector de Linguagem */}
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-sm text-gray-600">{currentTexts.language}</span>
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              <span>{language}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Botão de Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-3 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
          >
            <CiLogout size={20} />
            <span>{currentClientTexts.logout}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export { ClientNavbar };