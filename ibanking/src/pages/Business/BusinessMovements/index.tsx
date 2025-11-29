// pages/BusinessMovements.tsx
import React, { useState } from 'react';
import {
    FaSearch,
    FaFilePdf,
    FaCalendarAlt,
    FaFileCsv,
    FaChevronDown
} from 'react-icons/fa';
import {
    CiMail,
    CiBank
} from "react-icons/ci";
import { BusinessLayout } from '../../../components/BusinessLayout';

interface BusinessMovementsProps {
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

const BusinessMovements: React.FC<BusinessMovementsProps> = ({ language }) => {
    const [selectedMovements, setSelectedMovements] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [selectedAccount, setSelectedAccount] = useState<string>('');
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [email, setEmail] = useState('');
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [showAccountsDropdown, setShowAccountsDropdown] = useState(false);

    const currentTexts = {
        PT: {
            title: "Movimentos da Conta",
            subtitle: "Consulte e gere o seu extrato bancário",
            searchPlaceholder: "Pesquisar por descrição ou referência...",
            date: "Data MOV",
            reference: "Referência",
            description: "Descrição",
            debit: "Débito",
            credit: "Crédito",
            balance: "Saldo",
            category: "Categoria",
            allCategories: "Todas as categorias",
            selectAll: "Selecionar todos",
            downloadExtract: "Baixar Extrato PDF",
            sendEmail: "Enviar por Email",
            exportData: "Exportar CSV",
            filterByDate: "Filtrar por data",
            filterByCategory: "Filtrar por categoria",
            movements: "Movimentos",
            totalRecords: "registos encontrados",
            noMovements: "Nenhum movimento encontrado",
            emailPlaceholder: "Digite o email para envio",
            send: "Enviar",
            cancel: "Cancelar",
            sending: "Enviando...",
            emailSent: "Extrato enviado com sucesso!",
            selectMovements: "Selecione os movimentos para exportar",
            selectPeriod: "Selecione o período",
            today: "Hoje",
            last7Days: "Últimos 7 dias",
            last30Days: "Últimos 30 dias",
            thisMonth: "Este mês",
            lastMonth: "Mês anterior",
            customDate: "Data específica",
            selectAccount: "Selecionar Conta",
            currentAccount: "Conta Corrente",
            savingsAccount: "Conta Poupança",
            businessAccount: "Conta Empresarial",
            accountNumber: "Número da Conta",
            accountType: "Tipo de Conta",
            currentBalance: "Saldo Actual",
            chooseAccount: "Escolha a conta para visualizar os movimentos",
            allAccounts: "Todas as contas"
        },
        EN: {
            title: "Account Movements",
            subtitle: "Check and generate Uba statement",
            searchPlaceholder: "Search by description or reference...",
            date: "Date MOV",
            reference: "Reference",
            description: "Description",
            debit: "Debit",
            credit: "Credit",
            balance: "Balance",
            category: "Category",
            allCategories: "All categories",
            selectAll: "Select all",
            downloadExtract: "Download PDF Statement",
            sendEmail: "Send by Email",
            exportData: "Export CSV",
            filterByDate: "Filter by date",
            filterByCategory: "Filter by category",
            movements: "Movements",
            totalRecords: "records found",
            noMovements: "No movements found",
            emailPlaceholder: "Enter email for sending",
            send: "Send",
            cancel: "Cancel",
            sending: "Sending...",
            emailSent: "Statement sent successfully!",
            selectMovements: "Select movements to export",
            selectPeriod: "Select period",
            today: "Today",
            last7Days: "Last 7 days",
            last30Days: "Last 30 days",
            thisMonth: "This month",
            lastMonth: "Last month",
            customDate: "Custom date",
            selectAccount: "Select Account",
            currentAccount: "Current Account",
            savingsAccount: "Savings Account",
            businessAccount: "Business Account",
            accountNumber: "Account Number",
            accountType: "Account Type",
            currentBalance: "Current Balance",
            chooseAccount: "Choose account to view movements",
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

    // Dados de exemplo para movimentos (organizados por conta)
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
            },
            {
                id: '3',
                date: '2024-01-13',
                reference: 'DEP456123789',
                description: 'Depósito em caixa automático',
                debit: 0,
                credit: 2000,
                balance: 11250,
                category: 'Depósito'
            }
        ],
        '2': [
            {
                id: '4',
                date: '2024-01-15',
                reference: 'INT789456123',
                description: 'Juros de poupança',
                debit: 0,
                credit: 150,
                balance: 50150,
                category: 'Juros'
            },
            {
                id: '5',
                date: '2024-01-14',
                reference: 'DEP123456789',
                description: 'Depósito programado',
                debit: 0,
                credit: 1000,
                balance: 50000,
                category: 'Depósito'
            }
        ],
        '3': [
            {
                id: '6',
                date: '2024-01-15',
                reference: 'VEN123456789',
                description: 'Venda - Cliente A',
                debit: 0,
                credit: 15000,
                balance: 90000,
                category: 'Venda'
            },
            {
                id: '7',
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
                id: '8',
                date: '2024-01-15',
                reference: 'SAL123456789',
                description: 'Salário recebido',
                debit: 0,
                credit: 12000,
                balance: 12000,
                category: 'Salário'
            },
            {
                id: '9',
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

    const categories = ['Transferência', 'Pagamento', 'Depósito', 'Juros', 'Venda', 'Fornecedor', 'Salário', 'Renda', 'Cartão'];

    // Conta selecionada
    const selectedAccountData = accountsData.find(account => account.id === selectedAccount);
    const accountMovements = selectedAccount ? movementsData[selectedAccount] || [] : [];

    // Filtros
    const filteredMovements = accountMovements.filter(movement => {
        const matchesSearch = movement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movement.reference.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDate = !dateFilter || movement.date === dateFilter;

        const matchesCategory = !categoryFilter || movement.category === categoryFilter;

        return matchesSearch && matchesDate && matchesCategory;
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

    // Funções de exportação
    const handleDownloadPDF = () => {
        if (!selectedAccount) {
            alert(language === 'PT' ? 'Por favor, selecione uma conta primeiro' : 'Please select an account first');
            return;
        }

        const movementsToExport = selectedMovements.length > 0
            ? accountMovements.filter(movement => selectedMovements.includes(movement.id))
            : filteredMovements;

        alert(`${currentTexts.downloadExtract} - ${movementsToExport.length} ${currentTexts.movements.toLowerCase()}`);

        // Aqui iria a lógica real para gerar e baixar o PDF
        console.log('Gerando PDF com movimentos:', movementsToExport);
    };

    const handleSendEmail = () => {
        if (!selectedAccount) {
            alert(language === 'PT' ? 'Por favor, selecione uma conta primeiro' : 'Please select an account first');
            return;
        }

        if (!email) {
            alert('Por favor, digite um email válido');
            return;
        }

        setIsSendingEmail(true);

        // Simular envio de email
        setTimeout(() => {
            setIsSendingEmail(false);
            setShowEmailModal(false);
            setEmail('');
            alert(currentTexts.emailSent);
        }, 2000);
    };

    const handleExportData = () => {
        if (!selectedAccount) {
            alert(language === 'PT' ? 'Por favor, selecione uma conta primeiro' : 'Please select an account first');
            return;
        }

        const movementsToExport = selectedMovements.length > 0
            ? accountMovements.filter(movement => selectedMovements.includes(movement.id))
            : filteredMovements;

        // Simular exportação de dados
        const csvContent = [
            ['Data', 'Referência', 'Descrição', 'Débito', 'Crédito', 'Saldo', 'Categoria'],
            ...movementsToExport.map(movement => [
                movement.date,
                movement.reference,
                movement.description,
                movement.debit,
                movement.credit,
                movement.balance,
                movement.category
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `extrato-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
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
        <BusinessLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <FaFilePdf size={24} className="text-red-600" />
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
                                            className={`w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors ${
                                                selectedAccount === account.id ? 'bg-red-50 border-r-4 border-red-500' : ''
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
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        account.type === 'currentAccount' ? 'bg-blue-50 text-blue-700' :
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

                    {/* Filtros e Ações */}
                    {selectedAccount && (
                        <>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                    {/* Pesquisa */}
                                    <div className="md:col-span-2">
                                        <div className="relative">
                                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder={currentTexts.searchPlaceholder}
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    {/* Filtro por Data */}
                                    <div>
                                        <div className="relative">
                                            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="date"
                                                value={dateFilter}
                                                onChange={(e) => setDateFilter(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    {/* Filtro por Categoria */}
                                    <div>
                                        <select
                                            value={categoryFilter}
                                            onChange={(e) => setCategoryFilter(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        >
                                            <option value="">{currentTexts.allCategories}</option>
                                            {categories.map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Ações */}
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={handleDownloadPDF}
                                        className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        <FaFilePdf size={18} />
                                        <span>{currentTexts.downloadExtract}</span>
                                    </button>

                                    <button
                                        onClick={() => setShowEmailModal(true)}
                                        className="flex items-center space-x-2 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <CiMail size={20} />
                                        <span>{currentTexts.sendEmail}</span>
                                    </button>

                                    <button
                                        onClick={handleExportData}
                                        className="flex items-center space-x-2 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <FaFileCsv size={18} />
                                        <span>{currentTexts.exportData}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Tabela de Movimentos */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                {/* Header da Tabela */}
                                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedMovements.length === filteredMovements.length && filteredMovements.length > 0}
                                                onChange={toggleSelectAll}
                                                className="w-4 h-4 text-red-600 rounded focus:ring-red-500 border-gray-300"
                                            />
                                            <span className="text-sm text-gray-600">
                                                {selectedMovements.length > 0
                                                    ? `${selectedMovements.length} ${currentTexts.movements.toLowerCase()} ${currentTexts.selectMovements.toLowerCase()}`
                                                    : `${filteredMovements.length} ${currentTexts.totalRecords}`
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Tabela */}
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                                                    {/* Checkbox header */}
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
                                                    <tr
                                                        key={movement.id}
                                                        className="hover:bg-gray-50 transition-colors"
                                                    >
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
                                                            <FaSearch className="h-16 w-16 text-gray-300 mb-4" />
                                                            <p className="text-lg font-medium text-gray-900 mb-2">{currentTexts.noMovements}</p>
                                                            <p className="text-gray-500">Tente ajustar os seus filtros de pesquisa</p>
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

                {/* Modal de Email */}
                {showEmailModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md w-full p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                {currentTexts.sendEmail}
                            </h3>

                            {/* Informação da Conta no Modal */}
                            {selectedAccountData && (
                                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm font-medium text-gray-700">Conta selecionada:</p>
                                    <p className="font-semibold text-gray-900">{selectedAccountData.name} - {selectedAccountData.number}</p>
                                </div>
                            )}

                            <div className="space-y-4 mb-6">
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

                                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                    <p>O extrato será enviado em formato PDF para o email indicado.</p>
                                    {selectedMovements.length > 0 && (
                                        <p className="mt-2 font-medium">
                                            <strong>Movimentos selecionados:</strong> {selectedMovements.length}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => {
                                        setShowEmailModal(false);
                                        setEmail('');
                                    }}
                                    className="flex-1 bg-white text-gray-700 border border-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                >
                                    {currentTexts.cancel}
                                </button>
                                <button
                                    onClick={handleSendEmail}
                                    disabled={isSendingEmail || !email}
                                    className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-400 transition-colors"
                                >
                                    {isSendingEmail ? currentTexts.sending : currentTexts.send}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </BusinessLayout>
    );
};

export default BusinessMovements;