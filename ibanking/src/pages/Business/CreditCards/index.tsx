// pages/Business/PrepaidCards.tsx
import React, { useState } from 'react';
import { CiCreditCard1, CiMoneyBill, CiUser, CiLock } from "react-icons/ci";
import { TbCreditCard, TbPlus } from "react-icons/tb";
import { BusinessLayout } from '../../../components/BusinessLayout';

interface PrepaidCard {
  id: string;
  number: string;
  holderName: string;
  balance: number;
  currency: string;
  expiryDate: string;
  status: 'active' | 'blocked' | 'expired' | 'inactive';
  type: 'virtual' | 'physical';
  limit: number;
}

interface PrepaidCardsProps {
  language: 'PT' | 'EN';
}

const CreditCards: React.FC<PrepaidCardsProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'blocked' | 'expired'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const texts = {
    PT: {
      title: 'Gerir Cartões',
      subtitle: 'Gerencie os seus cartões',
      allCards: 'Todos os Cartões',
      activeCards: 'Ativos',
      blockedCards: 'Bloqueados',
      expiredCards: 'Expirados',
      issueNewCard: 'Associar novo',
      cardNumber: 'Número do Cartão',
      holderName: 'Titular',
      balance: 'Saldo',
      expiryDate: 'Validade',
      status: 'Estado',
      type: 'Tipo',
      limit: 'Limite',
      actions: 'Ações',
      viewDetails: 'Ver Detalhes',
      blockCard: 'Bloquear Cartão',
      topUp: 'Carregar',
      transactions: 'Transações',
      searchPlaceholder: 'Pesquisar por número, titular...',
      totalCards: 'Cartões Totais',
      totalBalance: 'Saldo Total',
      activeBalance: 'Saldo Ativo',
      virtual: 'Virtual',
      physical: 'Físico',
      newCard: 'Novo Cartão'
    },
    EN: {
      title: 'Prepaid Cards',
      subtitle: 'Manage your business prepaid cards',
      allCards: 'All Cards',
      activeCards: 'Active',
      blockedCards: 'Blocked',
      expiredCards: 'Expired',
      issueNewCard: 'Issue New',
      cardNumber: 'Card Number',
      holderName: 'Holder Name',
      balance: 'Balance',
      expiryDate: 'Expiry Date',
      status: 'Status',
      type: 'Type',
      limit: 'Limit',
      actions: 'Actions',
      viewDetails: 'View Details',
      blockCard: 'Block Card',
      topUp: 'Top Up',
      transactions: 'Transactions',
      searchPlaceholder: 'Search by number, holder...',
      totalCards: 'Total Cards',
      totalBalance: 'Total Balance',
      activeBalance: 'Active Balance',
      virtual: 'Virtual',
      physical: 'Physical',
      newCard: 'New Card'
    }
  };

  const t = texts[language];

  // Dados de exemplo
  const [cards, setCards] = useState<PrepaidCard[]>([
    {
      id: '1',
      number: '**** **** **** 1234',
      holderName: 'João Silva - Viagens',
      balance: 5000.00,
      currency: 'MZN',
      expiryDate: '2024-12-31',
      status: 'active',
      type: 'virtual',
      limit: 10000.00
    },
    {
      id: '2',
      number: '**** **** **** 5678',
      holderName: 'Maria Santos - Despesas',
      balance: 2500.50,
      currency: 'MZN',
      expiryDate: '2024-11-30',
      status: 'active',
      type: 'physical',
      limit: 5000.00
    },
    {
      id: '3',
      number: '**** **** **** 9012',
      holderName: 'Carlos Lima - Emergência',
      balance: 0.00,
      currency: 'MZN',
      expiryDate: '2024-10-15',
      status: 'blocked',
      type: 'virtual',
      limit: 2000.00
    },
    {
      id: '4',
      number: '**** **** **** 3456',
      holderName: 'Ana Costa - Marketing',
      balance: 750.00,
      currency: 'MZN',
      expiryDate: '2023-12-31',
      status: 'expired',
      type: 'physical',
      limit: 3000.00
    }
  ]);

  const filteredCards = cards.filter(card => {
    const matchesSearch = searchTerm === '' ||
      card.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.holderName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab = activeTab === 'all' || card.status === activeTab;

    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-orange-100 text-orange-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return language === 'PT' ? 'Ativo' : 'Active';
      case 'blocked': return language === 'PT' ? 'Bloqueado' : 'Blocked';
      case 'expired': return language === 'PT' ? 'Expirado' : 'Expired';
      case 'inactive': return language === 'PT' ? 'Inativo' : 'Inactive';
      default: return status;
    }
  };

  const handleBlockCard = (cardId: string) => {
    if (window.confirm(language === 'PT'
      ? 'Tem certeza que deseja bloquear este cartão?'
      : 'Are you sure you want to block this card?')) {
      setCards(cards.map(card =>
        card.id === cardId ? { ...card, status: 'blocked' } : card
      ));
    }
  };

  const handleTopUp = (cardId: string) => {
    // Lógica para carregar saldo
    console.log('Top up card:', cardId);
  };

  const stats = {
    total: cards.length,
    active: cards.filter(c => c.status === 'active').length,
    blocked: cards.filter(c => c.status === 'blocked').length,
    totalBalance: cards.reduce((sum, c) => sum + c.balance, 0),
    activeBalance: cards.filter(c => c.status === 'active').reduce((sum, c) => sum + c.balance, 0)
  };

  return (
    <BusinessLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <TbCreditCard size={24} className="text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
                <p className="text-gray-600">{t.subtitle}</p>
              </div>
            </div>
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center space-x-2">
              <TbPlus size={20} />
              <span>{t.issueNewCard}</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.totalCards}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <CiCreditCard1 size={24} className="text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.activeCards}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <CiUser size={24} className="text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {(['all', 'active', 'blocked', 'expired'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab
                      ? 'bg-white text-red-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {t[`${tab}Cards` as keyof typeof t]}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <CiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 w-full lg:w-80"
              />
            </div>
          </div>
        </div>

        {/* Grid de Cartões */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <div key={card.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              {/* Header do Cartão */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <CiCreditCard1 size={20} className={card.type === 'virtual' ? 'text-red-600' : 'text-blue-600'} />
                  <span className="text-sm font-medium text-gray-500">
                    {card.type === 'virtual' ? t.virtual : t.physical}
                  </span>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(card.status)}`}>
                  {getStatusText(card.status)}
                </span>
              </div>

              {/* Número do Cartão */}
              <div className="mb-4">
                <p className="text-lg font-mono font-bold text-gray-900 mb-1">{card.number}</p>
                <p className="text-sm text-gray-600">{card.holderName}</p>
              </div>

              {/* Informações */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{t.balance}:</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {card.balance.toLocaleString('pt-PT', { style: 'currency', currency: card.currency })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{t.limit}:</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {card.limit.toLocaleString('pt-PT', { style: 'currency', currency: card.currency })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{t.expiryDate}:</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {new Date(card.expiryDate).toLocaleDateString('pt-PT')}
                  </span>
                </div>
              </div>

              {/* Ações */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                  {t.viewDetails}
                </button>
                {card.status === 'active' && (
                  <>
                    <button
                      onClick={() => handleTopUp(card.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title={t.topUp}
                    >
                      <CiMoneyBill size={16} />
                    </button>
                    <button
                      onClick={() => handleBlockCard(card.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title={t.blockCard}
                    >
                      <CiLock size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredCards.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            <TbCreditCard size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">
              {language === 'PT' ? 'Nenhum cartão encontrado' : 'No cards found'}
            </p>
          </div>
        )}
      </div>
    </BusinessLayout>
  );
};

export default CreditCards;