import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BusinessDashboardContent: React.FC = () => {
  const navigate = useNavigate();

  // Cores profissionais da aplicação
  const COLOR_SCHEME = {
    primary: {
      50: '#FEF2F2',
      100: '#FEE5E5',
      200: '#FECACA',
      300: '#FDA4A4',
      400: '#FB7185',
      500: '#F43F5E',
      600: '#E11D48',
      700: '#BE123C',
      800: '#9F1239',
      900: '#881337'
    },
    accent: {
      green: '#10B981',
      blue: '#3B82F6',
      purple: '#8B5CF6',
      orange: '#F59E0B',
      teal: '#14B8A6',
      pink: '#EC4899'
    }
  };

  const [quickActions] = useState([
    {
      title: 'Transferências',
      description: 'Realizar transferências',
      icon: '↗️',
      color: 'bg-red-50 text-red-600',
      path: '/business/transfers/multiple'
    },
    {
      title: 'Operadores',
      description: 'Gestão de utilizadores',
      icon: '👥',
      color: 'bg-blue-50 text-blue-600',
      path: '/business/operators'
    },
    {
      title: 'Produtos',
      description: 'Meus produtos bancários',
      icon: '💳',
      color: 'bg-indigo-50 text-indigo-600',
      path: '/business/products'
    },
    {
      title: 'Carteira Digital',
      description: 'Transferências para carteira',
      icon: '💼',
      color: 'bg-teal-50 text-teal-600',
      path: '/business/transfers/digital-wallet'
    },
    {
      title: 'Pag. Fornecedores',
      description: 'Pagar fornecedores',
      icon: '🏢',
      color: 'bg-cyan-50 text-cyan-600',
      path: '/business/payments/suppliers'
    },
    {
      title: 'Pag. Salários',
      description: 'Pagar salários',
      icon: '👨‍💼',
      color: 'bg-amber-50 text-amber-600',
      path: '/business/payments/salaries'
    },
    {
      title: 'Pag. Serviços',
      description: 'Pagar serviços',
      icon: '🔧',
      color: 'bg-lime-50 text-lime-600',
      path: '/business/payments/services'
    },
    {
      title: 'Recargas',
      description: 'Carregar contas',
      icon: '📱',
      color: 'bg-pink-50 text-pink-600',
      path: '/business/payments/recharges'
    },
    {
      title: 'Cartões',
      description: 'Gestão de cartões',
      icon: '💳',
      color: 'bg-violet-50 text-violet-600',
      path: '/business/credit-cards'
    }
  ]);

  const [recentTransactions] = useState([
    { id: 1, description: 'Pagamento Fornecedor - Tech Lda', amount: -2500.00, date: '15/12/2023', type: 'debit', category: 'supplier' },
    { id: 2, description: 'Transferência recebida - Cliente XYZ', amount: 8500.00, date: '14/12/2023', type: 'credit', category: 'revenue' },
    { id: 3, description: 'Pagamento Salários', amount: -15200.00, date: '13/12/2023', type: 'debit', category: 'salaries' },
    { id: 4, description: 'Fatura Eletricidade', amount: -450.80, date: '12/12/2023', type: 'debit', category: 'utilities' },
    { id: 5, description: 'Venda Produto A', amount: 3200.00, date: '11/12/2023', type: 'credit', category: 'revenue' },
    { id: 6, description: 'Pagamento Aluguer', amount: -1800.00, date: '10/12/2023', type: 'debit', category: 'rent' },
  ]);

  const [businessAccounts] = useState([
    { name: 'Conta Corrente Empresa', number: 'PT50 1234 5678 9012 3456 7890', balance: 85420.15, type: 'current' },
    { name: 'Conta de Investimento', number: 'PT50 1234 5678 9012 3456 7891', balance: 125000.75, type: 'investment' },
    { name: 'Fundo de Maneio', number: 'PT50 1234 5678 9012 3456 7892', balance: 25000.30, type: 'operational' },
  ]);

  const [financialOverview] = useState({
    totalRevenue: 125000,
    totalExpenses: 87500,
    pendingInvoices: 15200,
    cashFlow: 37500
  });

  const handleQuickAction = (path: string) => {
    navigate(path);
  };

  return (
    <div className="space-y-6">
      {/* Header do Dashboard Empresarial */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bem-vindo, Energias renováveis, S.A!</h1>
            <p className="text-gray-600 mt-1">Visão geral das suas finanças empresariais</p>
          </div>
          <div className="mt-4 lg:mt-0 flex items-center space-x-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Conta ativa
            </span>
            <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
              Suporte Empresarial
            </button>
          </div>
        </div>
      </div>

      {/* Saldo Total Empresarial */}
      <div
        className="rounded-2xl shadow-lg p-6 text-white"
        style={{
          background: `linear-gradient(135deg, ${COLOR_SCHEME.primary[600]}, ${COLOR_SCHEME.primary[800]})`
        }}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-red-100">Saldo Total Empresarial</p>
            <p className="text-3xl font-bold mt-2">MZN 235.421,20</p>
            <p className="text-red-100 text-sm mt-1">Última atualização: hoje às 14:30</p>
          </div>
          <div className="flex space-x-2">
            <button
              className="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors"
            >
              Extrato Detalhado
            </button>
            <button
              onClick={() => navigate('/business/transfers/multiple')}
              className="bg-red-900 bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-70 transition-colors"
            >
              Nova Transferência
            </button>
          </div>
        </div>
      </div>


      {/* Visão Geral Financeira */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Créditos</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">MZN {financialOverview.totalRevenue.toLocaleString('pt-PT')}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Débitos</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">MZN {financialOverview.totalExpenses.toLocaleString('pt-PT')}</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Operações Favoritas */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Operações Favoritas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.path)}
              className="flex flex-col items-center p-4 rounded-xl border border-gray-100 hover:border-red-200 hover:bg-red-50 transition-all duration-200 group"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl mb-3 ${action.color}`}>
                {action.icon}
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900 group-hover:text-red-600 text-sm leading-tight">
                  {action.title}
                </p>
                <p className="text-xs text-gray-500 mt-1 leading-tight">
                  {action.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Contas Empresariais e Movimentos Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contas Empresariais */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Contas Empresariais</h2>
            <button className="text-red-600 text-sm font-medium hover:text-red-700">
              Gerir contas
            </button>
          </div>
          <div className="space-y-4">
            {businessAccounts.map((account, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${account.type === 'current' ? 'bg-red-100 text-red-600' :
                    account.type === 'investment' ? 'bg-green-100 text-green-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                    {account.type === 'current' ? '🏦' : account.type === 'investment' ? '📈' : '⚡'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{account.name}</p>
                    <p className="text-xs text-gray-500">{account.number.slice(0, 8)}...</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 text-sm">MZN {account.balance.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</p>
                  <p className="text-xs text-gray-500">Disponível</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Movimentos Recentes Empresariais */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Movimentos Recentes</h2>
            <button className="text-red-600 text-sm font-medium hover:text-red-700">
              Ver extrato completo
            </button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                    {transaction.type === 'credit' ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{transaction.description}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className={`font-semibold text-sm ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {transaction.type === 'credit' ? '+' : '-'}MZN {Math.abs(transaction.amount).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Operadores e Acessos */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Gestão de Operadores</h2>
          <button
            onClick={() => navigate('/business/operators')}
            className="text-red-600 text-sm font-medium hover:text-red-700"
          >
            Gerir operadores
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-red-600 text-xl">👤</span>
            </div>
            <p className="font-semibold text-gray-900">5 Operadores</p>
            <p className="text-sm text-gray-600">Ativos</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 text-xl">🔒</span>
            </div>
            <p className="font-semibold text-gray-900">3 Níveis de Acesso</p>
            <p className="text-sm text-gray-600">Configurados</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-600 text-xl">📋</span>
            </div>
            <p className="font-semibold text-gray-900">Última Atividade</p>
            <p className="text-sm text-gray-600">Hoje 09:45</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboardContent;