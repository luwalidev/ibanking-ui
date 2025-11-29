// pages/ClientExtract.tsx
import React, { useState } from 'react';
import {
    FaShareAlt,
    FaQrcode,
    FaCode,
    FaCopy,
    FaDownload,
    FaCalendarAlt,
    FaFilter,
    FaChevronDown
} from 'react-icons/fa';
import {
    CiShare1,
    CiMail,
    CiBank
} from "react-icons/ci";
import { ClientLayout } from '../../../components/ClientLayout';

interface ClientExtractProps {
    language: 'PT' | 'EN';
}

interface Movement {
    id: string;
    date: string;
    reference: string;
    description: string;
    debit: number;
    credit: number;
    balance: number;
    category: string;
}

interface Account {
    id: string;
    number: string;
    name: string;
    type: string;
    balance: number;
    currency: string;
}

const ClientExtract: React.FC<ClientExtractProps> = ({ language }) => {
    const [selectedMovements, setSelectedMovements] = useState<string[]>([]);
    const [dateFilter, setDateFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [selectedAccount, setSelectedAccount] = useState<string>('');
    const [showShareModal, setShowShareModal] = useState(false);
    const [shareMethod, setShareMethod] = useState<'api' | 'qr' | 'email' | null>(null);
    const [email, setEmail] = useState('');
    const [isSharing, setIsSharing] = useState(false);
    const [apiKey] = useState('ext_sk_1234567890abcdef');
    const [webhookUrl] = useState('https://api.terceiro.com/v1/extract');
    const [showAccountsDropdown, setShowAccountsDropdown] = useState(false);

    const currentTexts = {
        PT: {
            title: "Partilhar Extracto",
            subtitle: "Partilhe o seu extrato bancário com terceiros de forma segura",
            date: "Data MOV",
            reference: "Referência",
            description: "Descrição",
            debit: "Débito",
            credit: "Crédito",
            balance: "Saldo",
            category: "Categoria",
            allCategories: "Todas as categorias",
            selectAll: "Selecionar todos",
            shareExtract: "Partilhar Extracto",
            shareViaAPI: "Partilhar via API",
            shareViaQR: "Partilhar via QR Code",
            shareViaEmail: "Partilhar via Email",
            downloadExtract: "Descarregar",
            filterByDate: "Filtrar por data",
            filterByCategory: "Filtrar por categoria",
            movements: "Movimentos",
            totalRecords: "registos encontrados",
            noMovements: "Nenhum movimento encontrado",
            emailPlaceholder: "Digite o email do destinatário",
            send: "Partilhar",
            cancel: "Cancelar",
            sharing: "A partilhar...",
            sharedSuccess: "Extrato partilhado com sucesso!",
            selectMovements: "Selecione os movimentos para partilhar",
            apiKey: "Chave da API",
            webhookUrl: "URL do Webhook",
            copy: "Copiar",
            copied: "Copiado!",
            generateQR: "Gerar QR Code",
            scanQR: "Scanee o QR Code para aceder ao extrato",
            secureSharing: "Partilha Segura",
            shareDescription: "Selecione o método de partilha para enviar o extrato",
            apiDescription: "Gere uma chave API para integração com sistemas externos",
            qrDescription: "Gere um QR Code para partilha rápida e segura",
            emailDescription: "Envie o extrato por email para terceiros",
            selectAccount: "Selecionar Conta",
            currentAccount: "Conta Corrente",
            savingsAccount: "Conta Poupança",
            businessAccount: "Conta Empresarial",
            accountNumber: "Número da Conta",
            accountType: "Tipo de Conta",
            currentBalance: "Saldo Actual",
            chooseAccount: "Escolha a conta para visualizar o extrato",
            allAccounts: "Todas as contas"
        },
        EN: {
            title: "Share Statement",
            subtitle: "Share UBA Moçambique statement with third parties securely",
            date: "Date MOV",
            reference: "Reference",
            description: "Description",
            debit: "Debit",
            credit: "Credit",
            balance: "Balance",
            category: "Category",
            allCategories: "All categories",
            selectAll: "Select all",
            shareExtract: "Share Statement",
            shareViaAPI: "Share via API",
            shareViaQR: "Share via QR Code",
            shareViaEmail: "Share via Email",
            downloadExtract: "Download",
            filterByDate: "Filter by date",
            filterByCategory: "Filter by category",
            movements: "Movements",
            totalRecords: "records found",
            noMovements: "No movements found",
            emailPlaceholder: "Enter recipient email",
            send: "Share",
            cancel: "Cancel",
            sharing: "Sharing...",
            sharedSuccess: "Statement shared successfully!",
            selectMovements: "Select movements to share",
            apiKey: "API Key",
            webhookUrl: "Webhook URL",
            copy: "Copy",
            copied: "Copied!",
            generateQR: "Generate QR Code",
            scanQR: "Scan QR Code to access statement",
            secureSharing: "Secure Sharing",
            shareDescription: "Select sharing method to send the statement",
            apiDescription: "Generate API key for integration with external systems",
            qrDescription: "Generate QR Code for quick and secure sharing",
            emailDescription: "Send statement by email to third parties",
            selectAccount: "Select Account",
            currentAccount: "Current Account",
            savingsAccount: "Savings Account",
            businessAccount: "Business Account",
            accountNumber: "Account Number",
            accountType: "Account Type",
            currentBalance: "Current Balance",
            chooseAccount: "Choose account to view statement",
            allAccounts: "All accounts"
        }
    }[language];

    // Dados de exemplo para contas
    const accountsData: Account[] = [
        {
            id: '1',
            number: 'PT50 0000 0000 0000 0000 0001',
            name: 'Conta Principal',
            type: 'currentAccount',
            balance: 15000,
            currency: 'MT'
        },
        {
            id: '2',
            number: 'PT50 0000 0000 0000 0000 0002',
            name: 'Conta Poupança',
            type: 'savingsAccount',
            balance: 50000,
            currency: 'MT'
        },
        {
            id: '3',
            number: 'PT50 0000 0000 0000 0000 0003',
            name: 'Conta Empresarial',
            type: 'businessAccount',
            balance: 75000,
            currency: 'MT'
        },
        {
            id: '4',
            number: 'PT50 0000 0000 0000 0000 0004',
            name: 'Conta Salário',
            type: 'currentAccount',
            balance: 12000,
            currency: 'MT'
        }
    ];

    // Dados de exemplo para movimentos (agora organizados por conta)
    const movementsData: { [key: string]: Movement[] } = {
        '1': [
            {
                id: '1',
                date: '2024-01-15',
                reference: 'TRF123456789',
                description: 'Transferência recebida - João Silva',
                debit: 0,
                credit: 5000,
                balance: 15000,
                category: 'Transferência'
            },
            {
                id: '2',
                date: '2024-01-14',
                reference: 'PAG987654321',
                description: 'Pagamento de serviços - Electricidade',
                debit: 1250,
                credit: 0,
                balance: 10000,
                category: 'Pagamento'
            }
        ],
        '2': [
            {
                id: '3',
                date: '2024-01-13',
                reference: 'DEP456123789',
                description: 'Depósito em caixa automático',
                debit: 0,
                credit: 2000,
                balance: 52000,
                category: 'Depósito'
            },
            {
                id: '4',
                date: '2024-01-12',
                reference: 'INT789456123',
                description: 'Juros de poupança',
                debit: 0,
                credit: 150,
                balance: 52150,
                category: 'Juros'
            }
        ],
        '3': [
            {
                id: '5',
                date: '2024-01-15',
                reference: 'VEN123456789',
                description: 'Venda - Cliente A',
                debit: 0,
                credit: 15000,
                balance: 90000,
                category: 'Venda'
            },
            {
                id: '6',
                date: '2024-01-14',
                reference: 'FOR987654321',
                description: 'Pagamento a fornecedor',
                debit: 5000,
                credit: 0,
                balance: 75000,
                category: 'Fornecedor'
            }
        ],
        '4': [
            {
                id: '7',
                date: '2024-01-15',
                reference: 'SAL123456789',
                description: 'Salário recebido',
                debit: 0,
                credit: 12000,
                balance: 12000,
                category: 'Salário'
            },
            {
                id: '8',
                date: '2024-01-14',
                reference: 'PAG987654321',
                description: 'Pagamento de renda',
                debit: 3500,
                credit: 0,
                balance: 8500,
                category: 'Renda'
            }
        ]
    };

    const categories = ['Transferência', 'Pagamento', 'Depósito', 'Juros', 'Venda', 'Fornecedor', 'Salário', 'Renda'];

    // Conta selecionada
    const selectedAccountData = accountsData.find(account => account.id === selectedAccount);
    const accountMovements = selectedAccount ? movementsData[selectedAccount] || [] : [];

    // Filtros
    const filteredMovements = accountMovements.filter(movement => {
        const matchesDate = !dateFilter || movement.date === dateFilter;
        const matchesCategory = !categoryFilter || movement.category === categoryFilter;
        return matchesDate && matchesCategory;
    });

    // Seleção de movimentos
    const toggleMovementSelection = (id: string) => {
        setSelectedMovements(prev =>
            prev.includes(id)
                ? prev.filter(movementId => movementId !== id)
                : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedMovements.length === filteredMovements.length) {
            setSelectedMovements([]);
        } else {
            setSelectedMovements(filteredMovements.map(movement => movement.id));
        }
    };

    // Funções de partilha
    const handleShare = (method: 'api' | 'qr' | 'email') => {
        if (!selectedAccount) {
            alert(language === 'PT' ? 'Por favor, selecione uma conta primeiro' : 'Please select an account first');
            return;
        }
        setShareMethod(method);
        setShowShareModal(true);
    };

    const handleConfirmShare = () => {
        if (shareMethod === 'email' && !email) {
            alert('Por favor, digite um email válido');
            return;
        }

        setIsSharing(true);

        // Simular partilha
        setTimeout(() => {
            setIsSharing(false);
            setShowShareModal(false);
            setEmail('');
            setShareMethod(null);
            alert(currentTexts.sharedSuccess);
        }, 2000);
    };

    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert(currentTexts.copied);
    };

    const handleDownload = () => {
        if (!selectedAccount) {
            alert(language === 'PT' ? 'Por favor, selecione uma conta primeiro' : 'Please select an account first');
            return;
        }

        const movementsToExport = selectedMovements.length > 0
            ? filteredMovements.filter(movement => selectedMovements.includes(movement.id))
            : filteredMovements;

        alert(`Extrato da conta ${selectedAccountData?.number} descarregado - ${movementsToExport.length} movimentos`);
    };

    // Formatar valores monetários
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-MZ', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    // Formatar data
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-MZ');
    };

    // QR Code placeholder
    const renderQRCode = () => (
        <div className="bg-white p-8 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <div className="text-center">
                <FaQrcode className="mx-auto text-6xl text-gray-400 mb-4" />
                <p className="text-gray-500 text-sm">{currentTexts.scanQR}</p>
                {selectedAccountData && (
                    <p className="text-xs text-gray-400 mt-2">
                        Conta: {selectedAccountData.number}
                    </p>
                )}
            </div>
        </div>
    );

    // Tipo de conta traduzido
    const getAccountTypeText = (type: string) => {
        switch (type) {
            case 'currentAccount': return currentTexts.currentAccount;
            case 'savingsAccount': return currentTexts.savingsAccount;
            case 'businessAccount': return currentTexts.businessAccount;
            default: return type;
        }
    };

    return (
        <ClientLayout>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <CiShare1 size={24} className="text-red-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{currentTexts.title}</h1>
                                <p className="text-gray-600">{currentTexts.subtitle}</p>
                            </div>
                        </div>
                    </div>

                    {/* Selecção de Conta */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            {currentTexts.selectAccount}
                        </h3>

                        <div className="relative">
                            <button
                                onClick={() => setShowAccountsDropdown(!showAccountsDropdown)}
                                className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:border-red-300 transition-colors"
                            >
                                <div className="flex items-center space-x-3">
                                    <CiBank size={20} className="text-gray-400" />
                                    <div className="text-left">
                                        {selectedAccountData ? (
                                            <>
                                                <p className="font-medium text-gray-900">{selectedAccountData.name}</p>
                                                <p className="text-sm text-gray-600">{selectedAccountData.number}</p>
                                            </>
                                        ) : (
                                            <p className="text-gray-500">{currentTexts.chooseAccount}</p>
                                        )}
                                    </div>
                                </div>
                                <FaChevronDown
                                    size={16}
                                    className={`text-gray-400 transition-transform ${showAccountsDropdown ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {showAccountsDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
                                    {accountsData.map((account) => (
                                        <button
                                            key={account.id}
                                            onClick={() => {
                                                setSelectedAccount(account.id);
                                                setSelectedMovements([]);
                                                setShowAccountsDropdown(false);
                                            }}
                                            className={`w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors ${selectedAccount === account.id ? 'bg-red-50 border-r-4 border-red-500' : ''
                                                }`}
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <p className="font-medium text-gray-900">{account.name}</p>
                                                    <p className="font-semibold text-gray-900">
                                                        {formatCurrency(account.balance)} {account.currency}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm text-gray-600">{account.number}</p>
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${account.type === 'currentAccount' ? 'bg-blue-50 text-blue-700' :
                                                            account.type === 'savingsAccount' ? 'bg-green-50 text-green-700' :
                                                                'bg-purple-50 text-purple-700'
                                                        }`}>
                                                        {getAccountTypeText(account.type)}
                                                    </span>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Informações da Conta Selecionada */}
                        {selectedAccountData && (
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-gray-700">{currentTexts.accountNumber}</p>
                                    <p className="text-lg font-semibold text-gray-900">{selectedAccountData.number}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700">{currentTexts.accountType}</p>
                                    <p className="text-lg font-semibold text-gray-900">{getAccountTypeText(selectedAccountData.type)}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700">{currentTexts.currentBalance}</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {formatCurrency(selectedAccountData.balance)} {selectedAccountData.currency}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Métodos de Partilha */}
                    {selectedAccount && (
                        <>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    {currentTexts.secureSharing}
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Partilha via API */}
                                    <div className="border border-gray-200 rounded-lg p-6 hover:border-red-300 transition-colors">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <FaCode size={20} className="text-blue-600" />
                                            </div>
                                            <h4 className="font-semibold text-gray-900">{currentTexts.shareViaAPI}</h4>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4">
                                            {currentTexts.apiDescription}
                                        </p>
                                        <button
                                            onClick={() => handleShare('api')}
                                            className="w-full bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                        >
                                            {currentTexts.shareViaAPI}
                                        </button>
                                    </div>

                                    {/* Partilha via QR Code */}
                                    <div className="border border-gray-200 rounded-lg p-6 hover:border-red-300 transition-colors">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="p-2 bg-green-100 rounded-lg">
                                                <FaQrcode size={20} className="text-green-600" />
                                            </div>
                                            <h4 className="font-semibold text-gray-900">{currentTexts.shareViaQR}</h4>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4">
                                            {currentTexts.qrDescription}
                                        </p>
                                        <button
                                            onClick={() => handleShare('qr')}
                                            className="w-full bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                        >
                                            {currentTexts.shareViaQR}
                                        </button>
                                    </div>

                                    {/* Partilha via Email */}
                                    <div className="border border-gray-200 rounded-lg p-6 hover:border-red-300 transition-colors">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="p-2 bg-orange-100 rounded-lg">
                                                <CiMail size={20} className="text-orange-600" />
                                            </div>
                                            <h4 className="font-semibold text-gray-900">{currentTexts.shareViaEmail}</h4>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4">
                                            {currentTexts.emailDescription}
                                        </p>
                                        <button
                                            onClick={() => handleShare('email')}
                                            className="w-full bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                        >
                                            {currentTexts.shareViaEmail}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Filtros e Tabela */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                {/* Filtros */}
                                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                                            {/* Filtro por Data */}
                                            <div className="flex items-center space-x-2">
                                                <FaCalendarAlt className="text-gray-400" />
                                                <input
                                                    type="date"
                                                    value={dateFilter}
                                                    onChange={(e) => setDateFilter(e.target.value)}
                                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                                />
                                            </div>

                                            {/* Filtro por Categoria */}
                                            <div className="flex items-center space-x-2">
                                                <FaFilter className="text-gray-400" />
                                                <select
                                                    value={categoryFilter}
                                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                                >
                                                    <option value="">{currentTexts.allCategories}</option>
                                                    {categories.map(category => (
                                                        <option key={category} value={category}>{category}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Botão Descarregar */}
                                        <button
                                            onClick={handleDownload}
                                            className="flex items-center space-x-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <FaDownload size={16} />
                                            <span>{currentTexts.downloadExtract}</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Tabela */}
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedMovements.length === filteredMovements.length && filteredMovements.length > 0}
                                                        onChange={toggleSelectAll}
                                                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500 border-gray-300"
                                                    />
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {currentTexts.date}
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {currentTexts.reference}
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {currentTexts.description}
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {currentTexts.category}
                                                </th>
                                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {currentTexts.debit}
                                                </th>
                                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {currentTexts.credit}
                                                </th>
                                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {currentTexts.balance}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredMovements.length > 0 ? (
                                                filteredMovements.map((movement) => (
                                                    <tr key={movement.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedMovements.includes(movement.id)}
                                                                onChange={() => toggleMovementSelection(movement.id)}
                                                                className="w-4 h-4 text-red-600 rounded focus:ring-red-500 border-gray-300"
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {formatDate(movement.date)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                                                            {movement.reference}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                                                            <div className="truncate" title={movement.description}>
                                                                {movement.description}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${movement.category === 'Transferência' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                                                    movement.category === 'Pagamento' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                                                                        movement.category === 'Depósito' ? 'bg-green-50 text-green-700 border border-green-200' :
                                                                            movement.category === 'Juros' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                                                                                movement.category === 'Venda' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                                                                                    'bg-gray-50 text-gray-700 border border-gray-200'
                                                                }`}>
                                                                {movement.category}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-red-600">
                                                            {movement.debit > 0 ? `${formatCurrency(movement.debit)} MT` : '-'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-green-600">
                                                            {movement.credit > 0 ? `${formatCurrency(movement.credit)} MT` : '-'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-gray-900">
                                                            {formatCurrency(movement.balance)} MT
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={8} className="px-6 py-12 text-center">
                                                        <div className="flex flex-col items-center justify-center">
                                                            <FaShareAlt className="h-16 w-16 text-gray-300 mb-4" />
                                                            <p className="text-lg font-medium text-gray-900 mb-2">{currentTexts.noMovements}</p>
                                                            <p className="text-gray-500">Ajuste os filtros para ver movimentos</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Mensagem quando nenhuma conta está selecionada */}
                    {!selectedAccount && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                            <CiBank className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {currentTexts.selectAccount}
                            </h3>
                            <p className="text-gray-500">
                                {currentTexts.chooseAccount}
                            </p>
                        </div>
                    )}
                </div>

                {/* Modal de Partilha */}
                {showShareModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 max-w-2xl w-full p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                {currentTexts.shareExtract}
                            </h3>

                            {/* Informação da Conta no Modal */}
                            {selectedAccountData && (
                                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm font-medium text-gray-700">Conta selecionada:</p>
                                    <p className="font-semibold text-gray-900">{selectedAccountData.name} - {selectedAccountData.number}</p>
                                </div>
                            )}

                            <div className="space-y-6 mb-6">
                                {/* Método API */}
                                {shareMethod === 'api' && (
                                    <div className="space-y-4">
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <p className="text-sm text-blue-700">
                                                {currentTexts.apiDescription}
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {currentTexts.apiKey}
                                            </label>
                                            <div className="flex space-x-2">
                                                <input
                                                    type="text"
                                                    value={apiKey}
                                                    readOnly
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                                                />
                                                <button
                                                    onClick={() => handleCopyToClipboard(apiKey)}
                                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                                >
                                                    <FaCopy size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {currentTexts.webhookUrl}
                                            </label>
                                            <div className="flex space-x-2">
                                                <input
                                                    type="text"
                                                    value={webhookUrl}
                                                    readOnly
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                                                />
                                                <button
                                                    onClick={() => handleCopyToClipboard(webhookUrl)}
                                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                                >
                                                    <FaCopy size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Método QR Code */}
                                {shareMethod === 'qr' && (
                                    <div className="space-y-4">
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                            <p className="text-sm text-green-700">
                                                {currentTexts.qrDescription}
                                            </p>
                                        </div>
                                        {renderQRCode()}
                                    </div>
                                )}

                                {/* Método Email */}
                                {shareMethod === 'email' && (
                                    <div className="space-y-4">
                                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                            <p className="text-sm text-orange-700">
                                                {currentTexts.emailDescription}
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder={currentTexts.emailPlaceholder}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => {
                                        setShowShareModal(false);
                                        setShareMethod(null);
                                        setEmail('');
                                    }}
                                    className="flex-1 bg-white text-gray-700 border border-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                >
                                    {currentTexts.cancel}
                                </button>
                                <button
                                    onClick={handleConfirmShare}
                                    disabled={isSharing || (shareMethod === 'email' && !email)}
                                    className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-400 transition-colors"
                                >
                                    {isSharing ? currentTexts.sharing : currentTexts.send}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ClientLayout>
    );
};

export default ClientExtract;