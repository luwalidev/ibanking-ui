// pages/Panel.tsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CreditCard from '../../components/CreditCard';
import AddNewCard from '../../components/AddNewCard';

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

// Componente para o conteúdo do dashboard
const DashboardContent: React.FC = () => {
  const navigate = useNavigate();

  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [quickActions] = useState([
    {
      title: 'Transferência Imediata',
      description: 'Envie dinheiro agora',
      icon: '↗️',
      color: `bg-blue-50 text-[${COLOR_SCHEME.accent.blue}]`,
      path: '/client/transfers/national'
    },
    {
      title: 'Pagamentos',
      description: 'Pague serviços',
      icon: '💰',
      color: `bg-green-50 text-[${COLOR_SCHEME.accent.green}]`,
      path: '/client/payments'
    },
    {
      title: 'Cartões',
      description: 'Gerir cartões',
      icon: '💳',
      color: `bg-purple-50 text-[${COLOR_SCHEME.accent.purple}]`,
      path: '/client/cards'
    },
    {
      title: 'Investir',
      description: 'Aplicações financeiras',
      icon: '📈',
      color: `bg-orange-50 text-[${COLOR_SCHEME.accent.orange}]`,
      path: '/client/investments'
    },
  ]);

  const [recentTransactions] = useState([
    { id: 1, description: 'Supermercado Continente', amount: -125.40, date: '15/12/2023', type: 'debit', category: 'alimentacao' },
    { id: 2, description: 'Transferência recebida - Maria Silva', amount: 300.00, date: '14/12/2023', type: 'credit', category: 'transferencia' },
    { id: 3, description: 'Fatura Luz EDP', amount: -45.20, date: '13/12/2023', type: 'debit', category: 'utilidades' },
    { id: 4, description: 'Depósito ATM', amount: 200.00, date: '12/12/2023', type: 'credit', category: 'deposito' },
    { id: 5, description: 'Netflix', amount: -15.99, date: '11/12/2023', type: 'debit', category: 'entretenimento' },
    { id: 6, description: 'Salário', amount: 2500.00, date: '10/12/2023', type: 'credit', category: 'salario' },
  ]);

  const [accounts] = useState([
    { name: 'Conta Principal', number: 'PT50 1234 5678 9012 3456 7890', balance: 450920.15, type: 'current' },
  ]);

  // Dados completos para o gráfico
  const [spendingData] = useState({
    week: {
      alimentacao: { amount: 85.40, percentage: 28 },
      utilidades: { amount: 45.20, percentage: 15 },
      entretenimento: { amount: 15.99, percentage: 5 },
      transporte: { amount: 65.00, percentage: 21 },
      saude: { amount: 80.00, percentage: 26 },
      outros: { amount: 15.50, percentage: 5 }
    },
    month: {
      alimentacao: { amount: 425.40, percentage: 25 },
      utilidades: { amount: 245.20, percentage: 15 },
      entretenimento: { amount: 115.99, percentage: 8 },
      transporte: { amount: 285.00, percentage: 18 },
      saude: { amount: 420.00, percentage: 24 },
      outros: { amount: 145.50, percentage: 10 }
    },
    year: {
      alimentacao: { amount: 5125.40, percentage: 22 },
      utilidades: { amount: 3245.20, percentage: 14 },
      entretenimento: { amount: 1815.99, percentage: 8 },
      transporte: { amount: 4285.00, percentage: 19 },
      saude: { amount: 6120.00, percentage: 27 },
      outros: { amount: 2145.50, percentage: 10 }
    }
  });

  // Dados para entradas e saídas
  const [incomeVsExpenses] = useState({
    week: { income: 800.00, expenses: 312.09, balance: 487.91 },
    month: { income: 3000.00, expenses: 1432.09, balance: 1567.91 },
    year: { income: 36500.00, expenses: 22742.09, balance: 13757.91 }
  });

  // Dados filtrados baseados na seleção
  const currentSpendingData = useMemo(() => {
    const data = spendingData[selectedPeriod];
    const categories = [
      {
        category: 'alimentacao',
        name: 'Alimentação',
        color: COLOR_SCHEME.primary[500],
        icon: '🛒'
      },
      {
        category: 'utilidades',
        name: 'Utilidades',
        color: COLOR_SCHEME.accent.blue,
        icon: '💡'
      },
      {
        category: 'entretenimento',
        name: 'Entretenimento',
        color: COLOR_SCHEME.accent.purple,
        icon: '🎬'
      },
      {
        category: 'transporte',
        name: 'Transporte',
        color: COLOR_SCHEME.accent.orange,
        icon: '🚗'
      },
      {
        category: 'saude',
        name: 'Saúde',
        color: COLOR_SCHEME.accent.teal,
        icon: '🏥'
      },
      {
        category: 'outros',
        name: 'Outros',
        color: COLOR_SCHEME.primary[300],
        icon: '📦'
      }
    ];

    return categories.map(cat => ({
      ...cat,
      amount: data[cat.category as keyof typeof data].amount,
      percentage: data[cat.category as keyof typeof data].percentage
    }));
  }, [selectedPeriod]);

  const currentFinancialData = useMemo(() => {
    return incomeVsExpenses[selectedPeriod];
  }, [selectedPeriod]);

  const handleQuickAction = (path: string) => {
    navigate(path);
  };

  const handleCardRequest = (cardType: string) => {
    switch (cardType) {
      case 'debit':
        navigate('/client/cards/request-debit');
        break;
      case 'credit':
        navigate('/client/cards/request-credit');
        break;
      case 'prepaid':
        navigate('/client/cards/request-prepaid');
        break;
      case 'virtual':
        navigate('/client/cards/request-virtual');
        break;
      default:
        navigate('/client/cards');
    }
  };

  // Componente do gráfico de pizza interativo
  const PieChart = ({ data, selectedCategory, onCategoryHover }: {
    data: typeof currentSpendingData;
    selectedCategory: string;
    onCategoryHover: (category: string | null) => void;
  }) => {
    const totalRadius = 80;
    const center = 100;
    let currentAngle = 0;
    const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);

    return (
      <div className="relative w-full h-64">
        <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
          {data.map((item, index) => {
            const percentage = item.percentage / 100;
            const angle = percentage * 360;
            const largeArcFlag = angle > 180 ? 1 : 0;

            const x1 = center + totalRadius * Math.cos(currentAngle * Math.PI / 180);
            const y1 = center + totalRadius * Math.sin(currentAngle * Math.PI / 180);

            const x2 = center + totalRadius * Math.cos((currentAngle + angle) * Math.PI / 180);
            const y2 = center + totalRadius * Math.sin((currentAngle + angle) * Math.PI / 180);

            const pathData = [
              `M ${center} ${center}`,
              `L ${x1} ${y1}`,
              `A ${totalRadius} ${totalRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');

            const isHighlighted = selectedCategory === 'all' || selectedCategory === item.category;
            const opacity = isHighlighted ? 1 : 0.3;

            const slice = (
              <path
                key={index}
                d={pathData}
                fill={item.color}
                opacity={opacity}
                stroke="#FFFFFF"
                strokeWidth="2"
                onMouseEnter={() => onCategoryHover(item.category)}
                onMouseLeave={() => onCategoryHover(null)}
                className="transition-all duration-300 cursor-pointer hover:opacity-100"
              />
            );

            currentAngle += angle;
            return slice;
          })}

          {/* Centro do gráfico */}
          <circle cx={center} cy={center} r="50" fill="#FFFFFF" />
          <text x={center} y={center - 10} textAnchor="middle" className="text-lg font-bold fill-gray-900">
            Total
          </text>
          <text x={center} y={center + 15} textAnchor="middle" className="text-sm fill-gray-600">
            MZN {totalAmount.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
          </text>
        </svg>
      </div>
    );
  };

  // Componente da barra de progresso melhorada
  const FinancialProgressBar = ({ income, expenses }: { income: number; expenses: number }) => {
    const expensePercentage = (expenses / income) * 100;
    const savingsPercentage = 100 - expensePercentage;

    return (
      <div className="mt-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Taxa de Poupança: <strong className="text-green-600">{savingsPercentage.toFixed(1)}%</strong></span>
          <span className="text-gray-600">Taxa de Gastos: <strong className="text-red-600">{expensePercentage.toFixed(1)}%</strong></span>
        </div>
        <div className="flex h-3 rounded-full overflow-hidden bg-gray-200">
          <div
            className="bg-green-500 transition-all duration-500 ease-out"
            style={{ width: `${savingsPercentage}%` }}
          />
          <div
            className="bg-red-500 transition-all duration-500 ease-out"
            style={{ width: `${expensePercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Poupança: MZN {(income - expenses).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</span>
          <span>Gastos: MZN {expenses.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>
    );
  };

  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header do Dashboard */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta, Darken!</h1>
            <p className="text-gray-600 mt-1">Aqui está o resumo das suas finanças</p>
          </div>
          <div className="mt-4 lg:mt-0 flex items-center space-x-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Conta ativa
            </span>
            <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
              Solicitar Apoio
            </button>
          </div>
        </div>
      </div>

      {/* Saldo Total */}
      <div
        className="rounded-2xl shadow-lg p-6 text-white"
        style={{
          background: `linear-gradient(135deg, ${COLOR_SCHEME.primary[600]}, ${COLOR_SCHEME.primary[800]})`
        }}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-red-100">Saldo Total Disponível</p>
            <p className="text-3xl font-bold mt-2">MZN 450.920,15</p>
            <p className="text-red-100 text-sm mt-1">Última atualização: hoje às 08:30</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => navigate('/client/movements')}
              className="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors"
            >
              Ver Movimentos
            </button>
            <button
              onClick={() => navigate('/client/transfers/national')}
              className="bg-red-900 bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-70 transition-colors"
            >
              Transferir
            </button>
          </div>
        </div>
      </div>

      {/* Entradas vs Saídas */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Entradas vs Saídas</h2>
          <div className="flex space-x-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as 'week' | 'month' | 'year')}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="week">Esta Semana</option>
              <option value="month">Este Mês</option>
              <option value="year">Este Ano</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Entradas */}
          <div className="text-center p-6 rounded-xl border-2 border-green-200 bg-green-50 hover:shadow-md transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-green-600">↓</span>
            </div>
            <p className="text-sm text-gray-600 mb-2 font-medium">Entradas</p>
            <p className="text-2xl font-bold text-green-600">
              MZN {currentFinancialData.income.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            </p>
          </div>

          {/* Saídas */}
          <div className="text-center p-6 rounded-xl border-2 border-red-200 bg-red-50 hover:shadow-md transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-red-600">↑</span>
            </div>
            <p className="text-sm text-gray-600 mb-2 font-medium">Saídas</p>
            <p className="text-2xl font-bold text-red-600">
              MZN {currentFinancialData.expenses.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            </p>
          </div>

          {/* Saldo */}
          <div className="text-center p-6 rounded-xl border-2 border-blue-200 bg-blue-50 hover:shadow-md transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-blue-600">⚖️</span>
            </div>
            <p className="text-sm text-gray-600 mb-2 font-medium">Saldo Líquido</p>
            <p className="text-2xl font-bold text-blue-600">
              MZN {currentFinancialData.balance.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        <FinancialProgressBar
          income={currentFinancialData.income}
          expenses={currentFinancialData.expenses}
        />
      </div>

      {/* Gráfico de Categorias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Pizza */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Gastos por Categoria</h2>
            <div className="flex space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as 'week' | 'month' | 'year')}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="week">Semana</option>
                <option value="month">Mês</option>
                <option value="year">Ano</option>
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">Todas as Categorias</option>
                {currentSpendingData.map(cat => (
                  <option key={cat.category} value={cat.category}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <PieChart
            data={currentSpendingData}
            selectedCategory={selectedCategory}
            onCategoryHover={setHoveredCategory}
          />

          {/* Legenda Interativa */}
          <div className="mt-6 space-y-3">
            {currentSpendingData.map((category, index) => {
              const isHighlighted = selectedCategory === 'all' || selectedCategory === category.category;
              const isHovered = hoveredCategory === category.category;
              const opacity = isHighlighted ? 1 : 0.4;

              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 cursor-pointer ${isHovered ? 'bg-gray-50 transform scale-105' : ''
                    }`}
                  style={{ opacity }}
                  onMouseEnter={() => setHoveredCategory(category.category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category.category ? 'all' : category.category
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-lg">{category.icon}</div>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-semibold text-gray-900">
                      MZN {category.amount.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-sm font-bold text-gray-500 w-10 text-right">
                      {category.percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ações Rápidas e Minhas Contas */}
        <div className="space-y-6">
          {/* Ações Rápidas */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.path)}
                  className="flex flex-col items-center p-4 rounded-xl border-2 border-gray-100 hover:border-red-200 hover:bg-red-50 transition-all duration-300 group hover:shadow-md"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-xl mb-3 transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: action.color.split(' ')[0].replace('bg-', ''),
                      color: 'inherit'
                    }}
                  >
                    {action.icon}
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900 group-hover:text-red-600 text-sm transition-colors">
                      {action.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Minhas Contas */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Minhas Contas</h2>
              <button className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors">
                Ver todas
              </button>
            </div>
            <div className="space-y-4">
              {accounts.map((account, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-red-200 hover:bg-red-50 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${account.type === 'current' ? 'bg-blue-100 text-blue-600' :
                        account.type === 'savings' ? 'bg-green-100 text-green-600' :
                          'bg-orange-100 text-orange-600'
                      } group-hover:scale-110 transition-transform duration-300`}>
                      {account.type === 'current' ? '🏦' : account.type === 'savings' ? '💰' : '📈'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{account.name}</p>
                      <p className="text-xs text-gray-500">{account.number.slice(0, 8)}...</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-sm">
                      MZN {account.balance.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-gray-500">Disponível</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transações Recentes */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Transações Recentes</h2>
          <button className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors">
            Ver movimento completo
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-red-200 hover:bg-red-50 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                  {transaction.type === 'credit' ? '↓' : '↑'}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{transaction.description}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className={`font-bold text-sm ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                {transaction.type === 'credit' ? '+' : '-'}MZN {Math.abs(transaction.amount).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cartões */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Meus Cartões</h2>
          <button
            onClick={() => navigate('/client/cards')}
            className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors"
          >
            Gerir cartões
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CreditCard
            type="primary"
            cardNumber="•••• •••• •••• 8588"
            holderName="Darken Machava"
            expiryDate="12/26"
          />
          <CreditCard
            type="credit"
            cardNumber="•••• •••• •••• 1284"
            holderName="Darken Machava"
            expiryDate="12/27"
            limit={5000}
            used={1245.30}
          />
          <AddNewCard
            onClick={() => handleCardRequest('')}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;