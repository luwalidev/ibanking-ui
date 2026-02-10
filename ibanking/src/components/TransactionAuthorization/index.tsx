// components/TransactionAuthorization.tsx
import React, { useState, useEffect } from 'react';
import {
  CiLock,
  CiCircleCheck,
  CiCircleRemove,
  CiCalendar,
  CiMoneyBill
} from "react-icons/ci";
import { TbTransfer } from 'react-icons/tb';
import { BusinessLayout } from '../BusinessLayout';

interface TransactionAuthorizationProps {
  language: 'PT' | 'EN';
}

interface Transaction {
  id: string;
  type: 'transfer' | 'payment' | 'withdrawal';
  amount: number;
  recipient: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedBy: string;
  reason?: string;
}

const TransactionAuthorization: React.FC<TransactionAuthorizationProps> = ({ language }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    type: 'approve' | 'reject';
    transactionId: string;
    reason?: string;
  } | null>(null);

  // Dados de exemplo para transações
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'T001',
      type: 'transfer',
      amount: 50000,
      recipient: 'João Silva',
      date: '2024-11-17',
      status: 'pending',
      requestedBy: 'Maria Santos'
    },
    {
      id: 'T002',
      type: 'payment',
      amount: 25000,
      recipient: 'Fornecedor ABC',
      date: '2024-11-17',
      status: 'pending',
      requestedBy: 'Carlos Lima'
    },
    {
      id: 'T003',
      type: 'transfer',
      amount: 15000,
      recipient: 'Ana Costa',
      date: '2024-11-17',
      status: 'approved',
      requestedBy: 'Pedro Alves'
    },
    {
      id: 'T004',
      type: 'withdrawal',
      amount: 100000,
      recipient: 'Cash',
      date: '2024-11-17',
      status: 'rejected',
      requestedBy: 'Luisa Fernandes',
      reason: 'Valor acima do limite'
    }
  ]);

  const texts = {
    PT: {
      title: 'Autorização de Transações',
      subtitle: 'Aprovar ou rejeitar transações pendentes',
      passwordRequired: 'Senha de Autorização Necessária',
      enterPassword: 'Digite sua senha de autorização',
      passwordPlaceholder: 'Senha de autorização...',
      authenticate: 'Autenticar',
      cancel: 'Cancelar',
      pendingTransactions: 'Transações Pendentes',
      transactionHistory: 'Histórico de Autorizações',
      noPendingTransactions: 'Nenhuma transação pendente para aprovação',
      noHistory: 'Nenhum histórico de autorizações',
      approve: 'Aprovar',
      reject: 'Rejeitar',
      transactionDetails: 'Detalhes da Transação',
      type: 'Tipo',
      amount: 'Valor',
      recipient: 'Destinatário',
      date: 'Data',
      requestedBy: 'Solicitado por',
      status: 'Status',
      reason: 'Motivo',
      enterReason: 'Digite o motivo...',
      confirmApprove: 'Confirmar Aprovação',
      confirmReject: 'Confirmar Rejeição',
      approvalSuccess: 'Transação aprovada com sucesso!',
      rejectionSuccess: 'Transação rejeitada com sucesso!',
      pending: 'Pendente',
      approved: 'Aprovada',
      rejected: 'Rejeitada',
      transfer: 'Transferência',
      payment: 'Pagamento',
      withdrawal: 'Levantamento',
      actionRequiresAuth: 'Esta ação requer autenticação'
    },
    EN: {
      title: 'Transaction Authorization',
      subtitle: 'Approve or reject pending transactions',
      passwordRequired: 'Authorization Password Required',
      enterPassword: 'Enter your authorization password',
      passwordPlaceholder: 'Authorization password...',
      authenticate: 'Authenticate',
      cancel: 'Cancel',
      pendingTransactions: 'Pending Transactions',
      transactionHistory: 'Authorization History',
      noPendingTransactions: 'No pending transactions for approval',
      noHistory: 'No authorization history',
      approve: 'Approve',
      reject: 'Reject',
      transactionDetails: 'Transaction Details',
      type: 'Type',
      amount: 'Amount',
      recipient: 'Recipient',
      date: 'Date',
      requestedBy: 'Requested By',
      status: 'Status',
      reason: 'Reason',
      enterReason: 'Enter reason...',
      confirmApprove: 'Confirm Approval',
      confirmReject: 'Confirm Rejection',
      approvalSuccess: 'Transaction approved successfully!',
      rejectionSuccess: 'Transaction rejected successfully!',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      transfer: 'Transfer',
      payment: 'Payment',
      withdrawal: 'Withdrawal',
      actionRequiresAuth: 'This action requires authentication'
    }
  };

  const t = texts[language];

  // Verificar se já está autenticado
  useEffect(() => {
    const authStatus = localStorage.getItem('transactionAuth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthentication = async () => {
    if (!password) return;

    setIsLoading(true);

    // Simular verificação de senha
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Senha de exemplo: "0123"
    if (password === '0123') {
      setIsAuthenticated(true);
      localStorage.setItem('transactionAuth', 'authenticated');
      setShowAuthModal(false);
      
      // Executar ação pendente após autenticação
      if (pendingAction) {
        if (pendingAction.type === 'approve') {
          handleApprove(pendingAction.transactionId);
        } else {
          handleReject(pendingAction.transactionId, pendingAction.reason || '');
        }
        setPendingAction(null);
      }
    } else {
      alert(language === 'PT' ? 'Senha incorreta!' : 'Incorrect password!');
    }

    setIsLoading(false);
    setPassword('');
  };

  const handleApprove = (transactionId: string) => {
    if (!isAuthenticated) {
      setPendingAction({ type: 'approve', transactionId });
      setShowAuthModal(true);
      return;
    }

    setTransactions(prev =>
      prev.map(t =>
        t.id === transactionId
          ? { ...t, status: 'approved' as const }
          : t
      )
    );
    alert(t.approvalSuccess);
  };

  const handleReject = (transactionId: string, reason: string) => {
    if (!isAuthenticated) {
      setPendingAction({ type: 'reject', transactionId, reason });
      setShowAuthModal(true);
      return;
    }

    setTransactions(prev =>
      prev.map(t =>
        t.id === transactionId
          ? { ...t, status: 'rejected' as const, reason }
          : t
      )
    );
    alert(t.rejectionSuccess);
  };

  const pendingTransactions = transactions.filter(t => t.status === 'pending');
  const historyTransactions = transactions.filter(t => t.status !== 'pending');

  return (
    <BusinessLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-red-600 to-red-700 rounded-xl">
                <CiCircleCheck size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
                <p className="text-gray-600">{t.subtitle}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'pending'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {t.pendingTransactions}
                  {pendingTransactions.length > 0 && (
                    <span className="ml-2 bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-xs">
                      {pendingTransactions.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'history'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {t.transactionHistory}
                </button>
              </nav>
            </div>
          </div>

          {/* Conteúdo das Tabs */}
          {activeTab === 'pending' ? (
            <div className="space-y-6">
              {pendingTransactions.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <CiCircleCheck size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {t.noPendingTransactions}
                  </h3>
                  <p className="text-gray-500">
                    {language === 'PT'
                      ? 'Todas as transações foram processadas.'
                      : 'All transactions have been processed.'
                    }
                  </p>
                </div>
              ) : (
                pendingTransactions.map(transaction => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    language={language}
                    texts={t}
                  />
                ))
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {historyTransactions.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <CiCalendar size={48} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {t.noHistory}
                  </h3>
                  <p className="text-gray-500">
                    {language === 'PT'
                      ? 'Nenhuma autorização foi processada ainda.'
                      : 'No authorizations have been processed yet.'
                    }
                  </p>
                </div>
              ) : (
                historyTransactions.map(transaction => (
                  <HistoryCard
                    key={transaction.id}
                    transaction={transaction}
                    language={language}
                    texts={t}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Autenticação */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <CiLock size={32} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {t.passwordRequired}
              </h1>
              <p className="text-gray-600">
                {t.actionRequiresAuth}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.passwordPlaceholder}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleAuthentication()}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleAuthentication}
                  disabled={isLoading || !password}
                  className="flex-1 bg-gradient-to-br from-red-600 to-red-700 text-white py-3 px-4 rounded-lg font-medium hover:from-red-700 hover:to-red-800 disabled:from-red-300 disabled:to-red-400 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mx-auto"></div>
                  ) : (
                    t.authenticate
                  )}
                </button>

                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    setPendingAction(null);
                    setPassword('');
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  {t.cancel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </BusinessLayout>
  );
};

// Componente para cartão de transação pendente
const TransactionCard: React.FC<{
  transaction: Transaction;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  language: 'PT' | 'EN';
  texts: any;
}> = ({ transaction, onApprove, onReject, texts }) => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'transfer': return <TbTransfer size={20} className="text-blue-600" />;
      case 'payment': return <CiMoneyBill size={20} className="text-green-600" />;
      case 'withdrawal': return <CiMoneyBill size={20} className="text-orange-600" />;
      default: return <CiMoneyBill size={20} />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'transfer': return texts.transfer;
      case 'payment': return texts.payment;
      case 'withdrawal': return texts.withdrawal;
      default: return type;
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getTypeIcon(transaction.type)}
            <div>
              <h3 className="font-semibold text-gray-900">
                {getTypeText(transaction.type)} - {transaction.id}
              </h3>
              <p className="text-sm text-gray-500">
                {texts.requestedBy}: {transaction.requestedBy}
              </p>
            </div>
          </div>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {texts.pending}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-500">{texts.amount}</label>
            <p className="text-lg font-semibold text-gray-900">
              {transaction.amount.toLocaleString()} MT
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">{texts.recipient}</label>
            <p className="text-gray-900">{transaction.recipient}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">{texts.date}</label>
            <p className="text-gray-900">{transaction.date}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">{texts.requestedBy}</label>
            <p className="text-gray-900">{transaction.requestedBy}</p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => onApprove(transaction.id)}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <CiCircleCheck size={18} />
            <span>{texts.approve}</span>
          </button>
          <button
            onClick={() => setShowRejectModal(true)}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <CiCircleRemove size={18} />
            <span>{texts.reject}</span>
          </button>
        </div>
      </div>

      {/* Modal de Rejeição */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {texts.confirmReject}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {texts.reason}
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder={texts.enterReason}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  if (rejectReason.trim()) {
                    onReject(transaction.id, rejectReason);
                    setShowRejectModal(false);
                    setRejectReason('');
                  }
                }}
                disabled={!rejectReason.trim()}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition-colors"
              >
                {texts.reject}
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason('');
                }}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {texts.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Componente para cartão de histórico
const HistoryCard: React.FC<{
  transaction: Transaction;
  language: 'PT' | 'EN';
  texts: any;
}> = ({ transaction, texts }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return texts.approved;
      case 'rejected': return texts.rejected;
      default: return texts.pending;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'transfer': return <TbTransfer size={20} className="text-blue-600" />;
      case 'payment': return <CiMoneyBill size={20} className="text-green-600" />;
      case 'withdrawal': return <CiMoneyBill size={20} className="text-orange-600" />;
      default: return <CiMoneyBill size={20} />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'transfer': return texts.transfer;
      case 'payment': return texts.payment;
      case 'withdrawal': return texts.withdrawal;
      default: return type;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getTypeIcon(transaction.type)}
          <div>
            <h3 className="font-semibold text-gray-900">
              {getTypeText(transaction.type)} - {transaction.id}
            </h3>
            <p className="text-sm text-gray-500">
              {texts.requestedBy}: {transaction.requestedBy}
            </p>
          </div>
        </div>
        <span className={`${getStatusColor(transaction.status)} text-xs font-medium px-2.5 py-0.5 rounded`}>
          {getStatusText(transaction.status)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="text-sm font-medium text-gray-500">{texts.amount}</label>
          <p className="text-lg font-semibold text-gray-900">
            {transaction.amount.toLocaleString()} MT
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">{texts.recipient}</label>
          <p className="text-gray-900">{transaction.recipient}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">{texts.date}</label>
          <p className="text-gray-900">{transaction.date}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">{texts.requestedBy}</label>
          <p className="text-gray-900">{transaction.requestedBy}</p>
        </div>
      </div>

      {transaction.reason && (
        <div className="border-t border-gray-200 pt-4">
          <label className="text-sm font-medium text-gray-500">{texts.reason}</label>
          <p className="text-gray-900">{transaction.reason}</p>
        </div>
      )}
    </div>
  );
};

export default TransactionAuthorization;