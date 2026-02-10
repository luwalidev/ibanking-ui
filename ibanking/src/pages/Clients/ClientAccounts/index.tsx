// pages/ClientAccounts.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClientAccounts: React.FC = () => {
  const navigate = useNavigate();

  const accounts = [
    {
      id: '1',
      name: 'Conta Ordenado',
      number: 'PT50 1234 5678 9012 3456 7890',
      balance: 450920.15,
      available: 450920.15,
      type: 'current',
      currency: 'MZN',
      status: 'active'
    },
      ];

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'current': return '🏦';
      case 'savings': return '💰';
      case 'investment': return '📈';
      default: return '💳';
    }
  };

  const getAccountTypeName = (type: string) => {
    switch (type) {
      case 'current': return 'Conta à Ordem';
      case 'savings': return 'Conta Poupança';
      case 'investment': return 'Conta Investimento';
      default: return 'Conta';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Minhas Contas</h1>
            <p className="text-gray-600 mt-1">Gerir e visualizar todas as suas contas</p>
          </div>
          <button 
            onClick={() => navigate('/mypanel')}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>

      {/* Saldo Total */}
      <div className="bg-linear-to-r from-red-500 to-red-600 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-red-100">Saldo Total Consolidado</p>
            <p className="text-3xl font-bold mt-2">
               {accounts.reduce((total, acc) => total + acc.balance, 0).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors">
              Abrir Nova Conta
            </button>
            <button className="bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-800 transition-colors">
              Pedir Cartão
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Contas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <div key={account.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getAccountIcon(account.type)}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{account.name}</h3>
                  <p className="text-sm text-gray-500">{getAccountTypeName(account.type)}</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Ativa
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div>
                <p className="text-sm text-gray-500">Número da Conta</p>
                <p className="font-mono text-gray-900">{account.number}</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Saldo Disponível</p>
                  <p className="text-lg font-bold text-gray-900">
                     {account.available.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Saldo Contabilístico</p>
                  <p className="text-lg font-bold text-gray-900">
                     {account.balance.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button 
                onClick={() => navigate('/client/transfers')}
                className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Transferir
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                Detalhes
              </button>
            </div>
          </div>
        ))}

        {/* Card para Nova Conta */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-300 p-6 hover:border-red-300 transition-colors">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Abrir Nova Conta</h3>
            <p className="text-gray-500 text-sm mb-4">
              Descubra as nossas soluções de conta e encontre a ideal para si
            </p>
            <button className="bg-red-600 text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">
              Solicitar
            </button>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors text-left">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <span className="text-blue-600 text-lg">📥</span>
            </div>
            <p className="font-semibold text-gray-900">Depositar</p>
            <p className="text-sm text-gray-500">Por referência ou ATM</p>
          </button>

          <button 
            onClick={() => navigate('/client/transfers')}
            className="p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors text-left"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <span className="text-green-600 text-lg">↗️</span>
            </div>
            <p className="font-semibold text-gray-900">Transferir</p>
            <p className="text-sm text-gray-500">Para outra conta</p>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors text-left">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <span className="text-purple-600 text-lg">📄</span>
            </div>
            <p className="font-semibold text-gray-900">Extratos</p>
            <p className="text-sm text-gray-500">Ver movimentos</p>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors text-left">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
              <span className="text-orange-600 text-lg">🔒</span>
            </div>
            <p className="font-semibold text-gray-900">Segurança</p>
            <p className="text-sm text-gray-500">Gerir acessos</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientAccounts;