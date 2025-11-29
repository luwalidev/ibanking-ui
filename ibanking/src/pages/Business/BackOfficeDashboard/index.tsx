// pages/BackOfficeDashboard.tsx
import React, { useState } from 'react';
import {
    FaSearch,
    FaUserShield,
    FaLock,
    FaUnlock,
    FaHistory,
    FaFileInvoice,
    FaCreditCard,
    FaExchangeAlt,
    FaChartLine,
    FaBell,
    FaFilter,
    FaDownload,
    FaEye,
    FaPrint,
    FaUserCheck,
    FaExclamationTriangle,
    FaCheckCircle,
    FaClock,
    FaBan,
    FaMoneyCheckAlt,
    FaDatabase,
    FaShieldAlt,
    FaCog,
    FaUsers,
    FaChartBar,
    FaChevronDown
} from 'react-icons/fa';
import { TbTransfer } from 'react-icons/tb';

interface BackOfficeDashboardProps {
    language: 'PT' | 'EN';
}

const BackOfficeDashboard: React.FC<BackOfficeDashboardProps> = ({ language }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedAccount, setSelectedAccount] = useState<any>(null);
    const [selectedAccountForTransactions, setSelectedAccountForTransactions] = useState<string>('all');
    const [showBlockModal, setShowBlockModal] = useState<boolean>(false);
    const [showCheckModal, setShowCheckModal] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('overview');
    const [showAccountDropdown, setShowAccountDropdown] = useState<boolean>(false);

    const currentTexts = {
        PT: {
            title: "BackOffice - Linha de Suporte",
            subtitle: "Gestão operacional e suporte bancário",
            searchPlaceholder: "Pesquisar por nome, conta ou NIB...",
            overview: "Visão Geral",
            accounts: "Gestão de Contas",
            transactions: "Transações",
            history: "Histórico",
            checks: "Gestão de Cheques",
            recentOperations: "Operações Recentes",
            accountStatus: "Estado da Conta",
            blockAccount: "Bloquear Conta",
            unblockAccount: "Desbloquear Conta",
            accountHistory: "Histórico da Conta",
            issueCheck: "Emitir Cheque",
            viewDetails: "Ver Detalhes",
            all: "Todas as Contas",
            pending: "Pendentes",
            completed: "Concluídas",
            failed: "Falhadas",
            accountNumber: "Número da Conta",
            clientName: "Nome do Cliente",
            status: "Estado",
            balance: "Saldo",
            lastActivity: "Última Atividade",
            actions: "Ações",
            active: "Ativa",
            blocked: "Bloqueada",
            suspended: "Suspensa",
            type: "Tipo",
            amount: "Valor",
            date: "Data",
            description: "Descrição",
            from: "De",
            to: "Para",
            reference: "Referência",
            confirmBlock: "Confirmar Bloqueio",
            confirmUnblock: "Confirmar Desbloqueio",
            blockReason: "Motivo do Bloqueio",
            unblockReason: "Motivo do Desbloqueio",
            enterReason: "Digite o motivo...",
            cancel: "Cancelar",
            confirm: "Confirmar",
            checkNumber: "Número do Cheque",
            checkAmount: "Valor do Cheque",
            beneficiary: "Beneficiário",
            issueDate: "Data de Emissão",
            validUntil: "Válido até",
            issueNewCheck: "Emitir Novo Cheque",
            quickActions: "Ações Rápidas",
            systemHealth: "Saúde do Sistema",
            alerts: "Alertas",
            performance: "Desempenho",
            totalAccounts: "Total de Contas",
            activeAccounts: "Contas Ativas",
            pendingTransactions: "Transações Pendentes",
            systemUptime: "Uptime do Sistema",
            todayTransactions: "Transações Hoje",
            fraudAlerts: "Alertas de Fraude",
            supportTickets: "Tickets de Suporte",
            accountManagement: "Gestão de Contas",
            transactionMonitoring: "Monitorização de Transações",
            documentValidation: "Validação de Documentos",
            systemReports: "Relatórios do Sistema",
            riskManagement: "Gestão de Risco",
            compliance: "Conformidade",
            selectAccount: "Selecionar Conta",
            filterByAccount: "Filtrar por conta",
            allAccounts: "Todas as Contas"
        },
        EN: {
            title: "BackOffice - Support Line",
            subtitle: "Banking operational management and support",
            searchPlaceholder: "Search by name, account or NIB...",
            overview: "Overview",
            accounts: "Account Management",
            transactions: "Transactions",
            history: "History",
            checks: "Check Management",
            recentOperations: "Recent Operations",
            accountStatus: "Account Status",
            blockAccount: "Block Account",
            unblockAccount: "Unblock Account",
            accountHistory: "Account History",
            issueCheck: "Issue Check",
            viewDetails: "View Details",
            all: "All Accounts",
            pending: "Pending",
            completed: "Completed",
            failed: "Failed",
            accountNumber: "Account Number",
            clientName: "Client Name",
            status: "Status",
            balance: "Balance",
            lastActivity: "Last Activity",
            actions: "Actions",
            active: "Active",
            blocked: "Blocked",
            suspended: "Suspended",
            type: "Type",
            amount: "Amount",
            date: "Date",
            description: "Description",
            from: "From",
            to: "To",
            reference: "Reference",
            confirmBlock: "Confirm Block",
            confirmUnblock: "Confirm Unblock",
            blockReason: "Block Reason",
            unblockReason: "Unblock Reason",
            enterReason: "Enter reason...",
            cancel: "Cancel",
            confirm: "Confirm",
            checkNumber: "Check Number",
            checkAmount: "Check Amount",
            beneficiary: "Beneficiary",
            issueDate: "Issue Date",
            validUntil: "Valid Until",
            issueNewCheck: "Issue New Check",
            quickActions: "Quick Actions",
            systemHealth: "System Health",
            alerts: "Alerts",
            performance: "Performance",
            totalAccounts: "Total Accounts",
            activeAccounts: "Active Accounts",
            pendingTransactions: "Pending Transactions",
            systemUptime: "System Uptime",
            todayTransactions: "Today's Transactions",
            fraudAlerts: "Fraud Alerts",
            supportTickets: "Support Tickets",
            accountManagement: "Account Management",
            transactionMonitoring: "Transaction Monitoring",
            documentValidation: "Document Validation",
            systemReports: "System Reports",
            riskManagement: "Risk Management",
            compliance: "Compliance",
            selectAccount: "Select Account",
            filterByAccount: "Filter by account",
            allAccounts: "All Accounts"
        }
    }[language];

    // Dados de exemplo
    const accounts = [
        {
            id: '1',
            accountNumber: '1234567890123',
            clientName: 'Maria Santos',
            nib: '000800000123456789012',
            status: 'active',
            balance: 12500.50,
            lastActivity: '2024-01-18 14:30',
            type: 'Conta Corrente',
            email: 'maria.santos@email.com',
            phone: '+258841234567'
        },
        {
            id: '2',
            accountNumber: '9876543210987',
            clientName: 'João Silva',
            nib: '000800000987654321098',
            status: 'blocked',
            balance: 8500.00,
            lastActivity: '2024-01-17 09:15',
            type: 'Conta Poupança',
            email: 'joao.silva@email.com',
            phone: '+258821234567'
        },
        {
            id: '3',
            accountNumber: '4567890123456',
            clientName: 'Ana Pereira',
            nib: '000800000456789012345',
            status: 'active',
            balance: 23000.75,
            lastActivity: '2024-01-18 16:45',
            type: 'Conta Corrente',
            email: 'ana.pereira@email.com',
            phone: '+258851234567'
        },
        {
            id: '4',
            accountNumber: '7890123456789',
            clientName: 'Carlos Mendes',
            nib: '000800000789012345678',
            status: 'suspended',
            balance: 1500.25,
            lastActivity: '2024-01-16 11:20',
            type: 'Conta Corrente',
            email: 'carlos.mendes@email.com',
            phone: '+258871234567'
        }
    ];

    const transactions = [
        {
            id: '1',
            type: 'transfer',
            amount: 1500.00,
            date: '2024-01-18 14:30',
            description: 'Transferência Nacional',
            from: '1234567890123',
            to: '9876543210987',
            reference: 'TRF202401181430',
            status: 'completed',
            accountNumber: '1234567890123'
        },
        {
            id: '2',
            type: 'payment',
            amount: 350.50,
            date: '2024-01-18 13:15',
            description: 'Pagamento de Serviços',
            from: '4567890123456',
            to: 'MC NET',
            reference: 'PAY202401181315',
            status: 'completed',
            accountNumber: '4567890123456'
        },
        {
            id: '3',
            type: 'withdrawal',
            amount: 500.00,
            date: '2024-01-18 12:00',
            description: 'Levantamento ATM',
            from: '1234567890123',
            to: 'ATM 1234',
            reference: 'ATM202401181200',
            status: 'completed',
            accountNumber: '1234567890123'
        },
        {
            id: '4',
            type: 'transfer',
            amount: 2000.00,
            date: '2024-01-18 11:30',
            description: 'Transferência Internacional',
            from: '7890123456789',
            to: 'GB29NWBK60161331926819',
            reference: 'SWIFT202401181130',
            status: 'pending',
            accountNumber: '7890123456789'
        },
        {
            id: '5',
            type: 'payment',
            amount: 125.75,
            date: '2024-01-18 10:45',
            description: 'Pagamento de Água',
            from: '4567890123456',
            to: 'Águas da Cidade',
            reference: 'PAY202401181045',
            status: 'failed',
            accountNumber: '4567890123456'
        },
        {
            id: '6',
            type: 'deposit',
            amount: 3000.00,
            date: '2024-01-18 09:20',
            description: 'Depósito em Caixa',
            from: 'Caixa',
            to: '9876543210987',
            reference: 'DEP202401180920',
            status: 'completed',
            accountNumber: '9876543210987'
        }
    ];

    const systemMetrics = {
        totalAccounts: 15427,
        activeAccounts: 14892,
        pendingTransactions: 23,
        systemUptime: '99.98%',
        todayTransactions: 12457,
        fraudAlerts: 3,
        supportTickets: 12
    };

    const quickActions = [
        {
            icon: FaUserCheck,
            label: currentTexts.accountManagement,
            description: 'Gerir contas de clientes',
            color: 'bg-red-500',
            path: '/backoffice/accounts'
        },
        {
            icon: TbTransfer,
            label: currentTexts.transactionMonitoring,
            description: 'Monitorizar transações',
            color: 'bg-red-600',
            path: '/backoffice/transactions'
        },
        {
            icon: FaFileInvoice,
            label: currentTexts.documentValidation,
            description: 'Validar documentos',
            color: 'bg-red-700',
            path: '/backoffice/documents'
        },
        {
            icon: FaChartBar,
            label: currentTexts.systemReports,
            description: 'Gerar relatórios',
            color: 'bg-red-800',
            path: '/backoffice/reports'
        },
        {
            icon: FaShieldAlt,
            label: currentTexts.riskManagement,
            description: 'Gestão de riscos',
            color: 'bg-red-900',
            path: '/backoffice/risk'
        },
        {
            icon: FaCog,
            label: currentTexts.compliance,
            description: 'Conformidade regulatória',
            color: 'bg-red-950',
            path: '/backoffice/compliance'
        }
    ];

    // Filtrar transações pela conta selecionada
    const filteredTransactions = selectedAccountForTransactions === 'all' 
        ? transactions 
        : transactions.filter(t => t.accountNumber === selectedAccountForTransactions);

    const getStatusBadge = (status: string) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        switch (status) {
            case 'active':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'blocked':
                return `${baseClasses} bg-red-100 text-red-800`;
            case 'suspended':
                return `${baseClasses} bg-yellow-100 text-yellow-800`;
            case 'completed':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'pending':
                return `${baseClasses} bg-blue-100 text-blue-800`;
            case 'failed':
                return `${baseClasses} bg-red-100 text-red-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active':
            case 'completed':
                return <FaCheckCircle className="text-green-500" />;
            case 'blocked':
            case 'failed':
                return <FaBan className="text-red-500" />;
            case 'suspended':
                return <FaExclamationTriangle className="text-yellow-500" />;
            case 'pending':
                return <FaClock className="text-blue-500" />;
            default:
                return <FaClock className="text-gray-500" />;
        }
    };

    const handleBlockAccount = (account: any) => {
        setSelectedAccount(account);
        setShowBlockModal(true);
    };

    const handleIssueCheck = (account: any) => {
        setSelectedAccount(account);
        setShowCheckModal(true);
    };

    const confirmBlockAction = () => {
        // Aqui iria a lógica real de bloqueio/desbloqueio
        console.log(`Conta ${selectedAccount.accountNumber} alterada`);
        setShowBlockModal(false);
        setSelectedAccount(null);
    };

    const confirmIssueCheck = () => {
        // Aqui iria a lógica real de emissão de cheque
        console.log(`Cheque emitido para ${selectedAccount.accountNumber}`);
        setShowCheckModal(false);
        setSelectedAccount(null);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat(language === 'PT' ? 'pt-PT' : 'en-US', {
            style: 'currency',
            currency: 'MZN'
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString(language === 'PT' ? 'pt-PT' : 'en-US');
    };

    const getSelectedAccountName = () => {
        if (selectedAccountForTransactions === 'all') {
            return currentTexts.allAccounts;
        }
        const account = accounts.find(acc => acc.accountNumber === selectedAccountForTransactions);
        return account ? `${account.clientName} (${account.accountNumber})` : currentTexts.selectAccount;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-3">
                                <img
                                    src="/bank-logo.png"
                                    alt="UBA Moçambique"
                                    className="h-10 w-auto"
                                />
                                <div className="h-8 w-px bg-gray-300"></div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-red-600">{currentTexts.title}</h1>
                                <p className="text-gray-600">{currentTexts.subtitle}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="relative p-2 text-gray-400 hover:text-gray-600">
                                <FaBell size={20} />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">OP</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Sistema de Abas */}
                <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-200">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            {['overview', 'accounts', 'transactions', 'history', 'checks'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                                        ? 'border-red-500 text-red-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {currentTexts[tab as keyof typeof currentTexts]}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Barra de Pesquisa e Filtros */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder={currentTexts.searchPlaceholder}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex space-x-2">
                            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <FaFilter size={14} />
                                <span>{currentTexts.all}</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <FaDownload size={14} />
                                <span>Export</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Conteúdo Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Coluna Esquerda - Métricas e Ações Rápidas */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Cartões de Métricas */}
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500 border border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">{currentTexts.totalAccounts}</p>
                                            <p className="text-2xl font-bold text-gray-900">{systemMetrics.totalAccounts.toLocaleString()}</p>
                                        </div>
                                        <FaUsers className="text-red-500 text-xl" />
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-600 border border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">{currentTexts.activeAccounts}</p>
                                            <p className="text-2xl font-bold text-gray-900">{systemMetrics.activeAccounts.toLocaleString()}</p>
                                        </div>
                                        <FaCheckCircle className="text-red-600 text-xl" />
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-700 border border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">{currentTexts.pendingTransactions}</p>
                                            <p className="text-2xl font-bold text-gray-900">{systemMetrics.pendingTransactions}</p>
                                        </div>
                                        <FaClock className="text-red-700 text-xl" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Ações Rápidas */}
                        {activeTab === 'overview' && (
                            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">{currentTexts.quickActions}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {quickActions.map((action, index) => (
                                        <button
                                            key={index}
                                            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors text-left group"
                                        >
                                            <div className={`p-3 rounded-lg ${action.color} group-hover:scale-110 transition-transform`}>
                                                <action.icon className="text-white text-lg" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 group-hover:text-red-600">{action.label}</p>
                                                <p className="text-sm text-gray-600">{action.description}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tabela de Contas */}
                        {activeTab === 'accounts' && (
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                    <h2 className="text-lg font-semibold text-gray-900">{currentTexts.accountManagement}</h2>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {currentTexts.accountNumber}
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {currentTexts.clientName}
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {currentTexts.status}
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {currentTexts.balance}
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {currentTexts.lastActivity}
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {currentTexts.actions}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {accounts.map((account) => (
                                                <tr key={account.id} className="hover:bg-red-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900 font-mono">
                                                            {account.accountNumber}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {account.clientName}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {account.type}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center space-x-2">
                                                            {getStatusIcon(account.status)}
                                                            <span className={getStatusBadge(account.status)}>
                                                                {currentTexts[account.status as keyof typeof currentTexts]}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {formatCurrency(account.balance)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {formatDate(account.lastActivity)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => handleBlockAccount(account)}
                                                                className="text-red-600 hover:text-red-800 transition-colors p-1 rounded hover:bg-red-100"
                                                                title={account.status === 'active' ? currentTexts.blockAccount : currentTexts.unblockAccount}
                                                            >
                                                                {account.status === 'active' ? <FaLock size={16} /> : <FaUnlock size={16} />}
                                                            </button>
                                                            <button 
                                                                className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded hover:bg-blue-100"
                                                                title={currentTexts.viewDetails}
                                                            >
                                                                <FaEye size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleIssueCheck(account)}
                                                                className="text-green-600 hover:text-green-800 transition-colors p-1 rounded hover:bg-green-100"
                                                                title={currentTexts.issueCheck}
                                                            >
                                                                <FaPrint size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Transações Recentes */}
                        {(activeTab === 'transactions' || activeTab === 'overview') && (
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <h2 className="text-lg font-semibold text-gray-900">{currentTexts.recentOperations}</h2>
                                        
                                        {/* Dropdown para selecionar conta */}
                                        <div className="relative">
                                            <button
                                                onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                                                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 min-w-64 justify-between"
                                            >
                                                <span className="text-sm text-gray-700 truncate">
                                                    {getSelectedAccountName()}
                                                </span>
                                                <FaChevronDown className={`text-gray-400 transition-transform ${showAccountDropdown ? 'rotate-180' : ''}`} />
                                            </button>
                                            
                                            {showAccountDropdown && (
                                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedAccountForTransactions('all');
                                                            setShowAccountDropdown(false);
                                                        }}
                                                        className={`w-full text-left px-4 py-2 hover:bg-red-50 transition-colors ${selectedAccountForTransactions === 'all' ? 'bg-red-50 text-red-600' : 'text-gray-700'}`}
                                                    >
                                                        {currentTexts.allAccounts}
                                                    </button>
                                                    {accounts.map((account) => (
                                                        <button
                                                            key={account.id}
                                                            onClick={() => {
                                                                setSelectedAccountForTransactions(account.accountNumber);
                                                                setShowAccountDropdown(false);
                                                            }}
                                                            className={`w-full text-left px-4 py-2 hover:bg-red-50 transition-colors ${selectedAccountForTransactions === account.accountNumber ? 'bg-red-50 text-red-600' : 'text-gray-700'}`}
                                                        >
                                                            <div className="flex justify-between items-center">
                                                                <span className="font-medium">{account.clientName}</span>
                                                                <span className="text-xs text-gray-500 font-mono">{account.accountNumber}</span>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {currentTexts.type}
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {currentTexts.amount}
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {currentTexts.date}
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {currentTexts.description}
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {currentTexts.status}
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {currentTexts.actions}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredTransactions.map((transaction) => (
                                                <tr key={transaction.id} className="hover:bg-red-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center space-x-2">
                                                            <TbTransfer className="text-gray-400" />
                                                            <span className="text-sm font-medium text-gray-900 capitalize">
                                                                {transaction.type}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {formatCurrency(transaction.amount)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {formatDate(transaction.date)}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-900">{transaction.description}</div>
                                                        <div className="text-sm text-gray-500">{transaction.reference}</div>
                                                        <div className="text-xs text-gray-400 mt-1">
                                                            {currentTexts.from}: {transaction.from} → {currentTexts.to}: {transaction.to}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center space-x-2">
                                                            {getStatusIcon(transaction.status)}
                                                            <span className={getStatusBadge(transaction.status)}>
                                                                {currentTexts[transaction.status as keyof typeof currentTexts]}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button className="text-red-600 hover:text-red-800 transition-colors p-1 rounded hover:bg-red-100">
                                                            <FaEye size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Coluna Direita - Painel de Controlo */}
                    <div className="space-y-6">
                        {/* Estado do Sistema */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">{currentTexts.systemHealth}</h2>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">CPU Usage</span>
                                        <span className="font-medium">45%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Memory</span>
                                        <span className="font-medium">67%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-red-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Database</span>
                                        <span className="font-medium">82%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-red-700 h-2 rounded-full" style={{ width: '82%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Alertas */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">{currentTexts.alerts}</h2>
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <FaExclamationTriangle className="text-red-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-red-800">Alerta de Fraude</p>
                                        <p className="text-sm text-red-600">Transação suspeita detectada</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <FaClock className="text-yellow-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-yellow-800">Serviço Lento</p>
                                        <p className="text-sm text-yellow-600">API de pagamentos com latência</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <FaBell className="text-blue-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-blue-800">Manutenção Programada</p>
                                        <p className="text-sm text-blue-600">Sábado, 20 Jan - 02:00-04:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Estatísticas Rápidas */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">{currentTexts.performance}</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">{currentTexts.todayTransactions}</span>
                                    <span className="text-sm font-medium">{systemMetrics.todayTransactions.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Taxa de Sucesso</span>
                                    <span className="text-sm font-medium text-green-600">99.2%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Tempo Médio</span>
                                    <span className="text-sm font-medium">1.2s</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Bloqueio/Desbloqueio */}
            {showBlockModal && selectedAccount && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            {selectedAccount.status === 'active' ? currentTexts.confirmBlock : currentTexts.confirmUnblock}
                        </h3>

                        <div className="bg-gray-50 rounded-lg p-4 mb-4 border">
                            <p className="font-medium text-gray-900">{selectedAccount.clientName}</p>
                            <p className="text-sm text-gray-600">{selectedAccount.accountNumber}</p>
                            <p className="text-sm text-gray-600">{formatCurrency(selectedAccount.balance)}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {selectedAccount.status === 'active' ? currentTexts.blockReason : currentTexts.unblockReason}
                            </label>
                            <textarea
                                placeholder={currentTexts.enterReason}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowBlockModal(false)}
                                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                            >
                                {currentTexts.cancel}
                            </button>
                            <button
                                onClick={confirmBlockAction}
                                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >
                                {currentTexts.confirm}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Emissão de Cheque */}
            {showCheckModal && selectedAccount && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentTexts.issueNewCheck}</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {currentTexts.clientName}
                                </label>
                                <input
                                    type="text"
                                    value={selectedAccount.clientName}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {currentTexts.accountNumber}
                                </label>
                                <input
                                    type="text"
                                    value={selectedAccount.accountNumber}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {currentTexts.checkAmount} *
                                </label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {currentTexts.beneficiary} *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nome do beneficiário"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowCheckModal(false)}
                                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                            >
                                {currentTexts.cancel}
                            </button>
                            <button
                                onClick={confirmIssueCheck}
                                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >
                                {currentTexts.issueCheck}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BackOfficeDashboard;