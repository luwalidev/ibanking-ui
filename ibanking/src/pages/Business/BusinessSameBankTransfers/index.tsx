// pages/BusinessSameBankTransfers.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BusinessLayout } from '../../../components/BusinessLayout';
import { CiCalendar, CiRepeat } from "react-icons/ci";

interface TransferData {
    fromAccount: string;
    toAccountNumber: string;
    toAccountName: string;
    amount: string;
    description: string;
    transferCategory: string;
    immediate: boolean;
    scheduled: boolean;
    scheduleDate: string;
}

interface RecurringSettings {
    isRecurring: boolean;
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    startDate: string;
    endDate?: string;
    numberOfOccurrences?: number;
}

const BusinessSameBankTransfers: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [transferData, setTransferData] = useState<TransferData>({
        fromAccount: '',
        toAccountNumber: '',
        toAccountName: '',
        amount: '',
        description: '',
        transferCategory: '',
        immediate: true,
        scheduled: false,
        scheduleDate: ''
    });
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailData, setEmailData] = useState({
        email: '',
        subject: 'Comprovativo de Transferência - Mesmo Banco',
        message: ''
    });
    const [, setEmailSent] = useState(false);
    const [accountVerified, setAccountVerified] = useState(false);

    // Estado para configurações recorrentes
    const [recurringSettings, setRecurringSettings] = useState<RecurringSettings>({
        isRecurring: false,
        frequency: 'monthly',
        startDate: new Date().toISOString().split('T')[0],
        numberOfOccurrences: 1
    });

    // Contas da empresa
    const companyAccounts = [
        { id: '1', name: 'Conta Principal Empresa', number: 'PT50 1234 5678 9012 3456 7890', balance: 25420.15 },
        { id: '2', name: 'Conta Operações', number: 'PT50 1234 5678 9012 3456 7891', balance: 125000.75 },
        { id: '3', name: 'Conta Investimentos', number: 'PT50 1234 5678 9012 3456 7892', balance: 500000.00 },
    ];

    // Categorias específicas para transferências mesmo banco
    const transferCategories = [
        { value: 'pagamento_fornecedor', label: '🏭 Pagamento a Fornecedor' },
        { value: 'salario_funcionario', label: '💼 Pagamento de Salário' },
        { value: 'reembolso_despesas', label: '🔄 Reembolso de Despesas' },
        { value: 'servico_prestado', label: '🔧 Pagamento por Serviço' },
        { value: 'transferencia_Businesse', label: '👥 Transferência para Businesse' },
        { value: 'antecipacao_contrato', label: '📄 Antecipação de Contrato' },
        { value: 'outros', label: '📦 Outras Transferências' }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setTransferData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));

        // Reset verification when account number changes
        if (name === 'toAccountNumber') {
            setAccountVerified(false);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEmailData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Atualizar configurações recorrentes
    const updateRecurringSettings = (field: keyof RecurringSettings, value: any) => {
        setRecurringSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const verifyAccount = () => {
        if (transferData.toAccountNumber.length < 5) {
            alert('Por favor, insira um número de conta válido');
            return;
        }

        // Simular verificação de conta
        setTimeout(() => {
            setAccountVerified(true);
            // Simular nome do titular (em produção, viria da API)
            setTransferData(prev => ({
                ...prev,
                toAccountName: 'Titular da Conta Verificado'
            }));
            alert('✅ Conta verificada com sucesso!');
        }, 1000);
    };

    const validateStep1 = () => {
        return transferData.fromAccount && 
               transferData.toAccountNumber && 
               transferData.amount && 
               transferData.transferCategory &&
               parseFloat(transferData.amount) > 0 &&
               accountVerified;
    };

    const getTotalAmount = () => {
        return parseFloat(transferData.amount || '0');
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) {
            setStep(2);
        } else if (step === 2) {
            // Simular processamento da transferência
            setTimeout(() => {
                setStep(3);
            }, 1000); // Processamento mais rápido - mesmo banco
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleNewTransfer = () => {
        setStep(1);
        setTransferData({
            fromAccount: '',
            toAccountNumber: '',
            toAccountName: '',
            amount: '',
            description: '',
            transferCategory: '',
            immediate: true,
            scheduled: false,
            scheduleDate: ''
        });
        setAccountVerified(false);
        setEmailSent(false);
        setEmailData({
            email: '',
            subject: 'Comprovativo de Transferência - Mesmo Banco',
            message: ''
        });
        // Reset das configurações recorrentes
        setRecurringSettings({
            isRecurring: false,
            frequency: 'monthly',
            startDate: new Date().toISOString().split('T')[0],
            numberOfOccurrences: 1
        });
    };

    const generateTransferReference = () => {
        return `TRF_SAME_BANK_${Date.now()}`;
    };

    const getCategoryLabel = (value: string) => {
        const category = transferCategories.find(cat => cat.value === value);
        return category ? category.label : 'Categoria não especificada';
    };

    const getFrequencyLabel = (value: string) => {
        const frequencies = {
            'daily': 'Diária',
            'weekly': 'Semanal',
            'monthly': 'Mensal',
            'yearly': 'Anual'
        };
        return frequencies[value as keyof typeof frequencies] || value;
    };

    const downloadPDFExtract = () => {
        const transferRef = generateTransferReference();
        const totalAmount = getTotalAmount();
        const fromAccount = companyAccounts.find(acc => acc.id === transferData.fromAccount);
        
        const pdfContent = `
            COMPROVATIVO DE TRANSFERÊNCIA - MESMO BANCO
            ============================================
            
            Referência: ${transferRef}
            Data: ${new Date().toLocaleDateString('pt-PT')} ${new Date().toLocaleTimeString('pt-PT')}
            Tipo: Transferência Interna - Mesmo Banco
            
            CONTA DE ORIGEM:
            ${fromAccount?.name}
            ${fromAccount?.number}
            
            CONTA DE DESTINO:
            ${transferData.toAccountName}
            ${transferData.toAccountNumber}
            
            VALOR DA TRANSFERÊNCIA:
            MZN ${totalAmount.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            
            TAXA DE TRANSFERÊNCIA:
            MZN 0,00 (Isenta - Mesmo Banco)
            
            CATEGORIA:
            ${getCategoryLabel(transferData.transferCategory)}
            
            DESCRIÇÃO:
            ${transferData.description || 'Sem descrição'}
            
            ${transferData.scheduled ? `
            DATA PROGRAMADA:
            ${new Date(transferData.scheduleDate).toLocaleDateString('pt-PT')}
            ` : ''}
            
            ${recurringSettings.isRecurring ? `
            TRANSFERÊNCIA RECORRENTE:
            Frequência: ${getFrequencyLabel(recurringSettings.frequency)}
            Data de Início: ${new Date(recurringSettings.startDate).toLocaleDateString('pt-PT')}
            ${recurringSettings.numberOfOccurrences ? `Número de Ocorrências: ${recurringSettings.numberOfOccurrences}` : ''}
            ${recurringSettings.endDate ? `Data de Fim: ${new Date(recurringSettings.endDate).toLocaleDateString('pt-PT')}` : ''}
            ` : ''}
            
            STATUS: ${transferData.scheduled ? 'Programada' : 'Processamento Imediato'}
            VANTAGEM: Transferência Instantânea - Mesmo Banco
            
            ============================================
            UBA Moçambique Business - Luwali Technologies
        `;

        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `comprovativo_mesmo_banco_${transferRef}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('Comprovativo PDF descarregado com sucesso!');
    };

    const handleSendEmail = () => {
        if (!emailData.email) {
            alert('Por favor, insira um endereço de email válido.');
            return;
        }

        // Simular envio de email
        setTimeout(() => {
            setEmailSent(true);
            setShowEmailModal(false);
            alert(`Comprovativo enviado com sucesso para: ${emailData.email}`);
        }, 2000);
    };

    // Componente Modal
    const Modal = ({ isOpen, onClose, title, children }: { 
        isOpen: boolean; 
        onClose: () => void; 
        title: string; 
        children: React.ReactNode;
    }) => {
        if (!isOpen) return null;

        return (
            <div
                className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-[rgba(0,0,0,0.35)] backdrop-blur-sm"
                onClick={onClose}
            >
                <div
                    className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        );
    };

    return (
        <BusinessLayout>
           <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Transferência - Mesmo Banco</h1>
                            <p className="text-gray-600 mt-1">Transferências instantâneas para outras contas do UBA Moçambique</p>
                        </div>
                        <button
                            onClick={() => navigate('/panel')}
                            className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                        >
                            Voltar ao Dashboard
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Conteúdo Principal */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            {/* Progress Steps */}
                            <div className="flex items-center justify-between mb-8">
                                {[1, 2, 3].map((stepNumber) => (
                                    <div key={stepNumber} className="flex items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= stepNumber
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-500'
                                            }`}>
                                            {stepNumber}
                                        </div>
                                        {stepNumber < 3 && (
                                            <div className={`w-16 h-1 mx-2 ${step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                                                }`} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Step 1: Dados da Transferência */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Dados da Transferência</h2>

                                    <div className="space-y-6">
                                        {/* Formulário Principal */}
                                        <div className="space-y-4">
                                            {/* Conta de Origem */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Conta de Origem *
                                                </label>
                                                <select
                                                    name="fromAccount"
                                                    value={transferData.fromAccount}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option value="">Selecione a conta de origem</option>
                                                    {companyAccounts.map(account => (
                                                        <option key={account.id} value={account.id}>
                                                            {account.name} - MZN {account.balance.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Conta de Destino - Mesmo Banco */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Número da Conta de Destino (UBA Moçambique) *
                                                </label>
                                                <div className="flex space-x-2">
                                                    <input
                                                        type="text"
                                                        name="toAccountNumber"
                                                        value={transferData.toAccountNumber}
                                                        onChange={handleInputChange}
                                                        placeholder="PT50 1234 5678 9012 3456 7890"
                                                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                    <button
                                                        onClick={verifyAccount}
                                                        disabled={!transferData.toAccountNumber || transferData.toAccountNumber.length < 5}
                                                        className="px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                                    >
                                                        Verificar
                                                    </button>
                                                </div>
                                                {accountVerified && (
                                                    <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                                                        <div className="flex items-center space-x-2 text-green-700">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            <span className="font-medium">Conta verificada: {transferData.toAccountName}</span>
                                                        </div>
                                                    </div>
                                                )}
                                                <p className="text-sm text-gray-500 mt-1">
                                                    A conta deve pertencer ao UBA Moçambique para transferência instantânea
                                                </p>
                                            </div>

                                            {/* Valor */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Valor (MZN) *
                                                </label>
                                                <input
                                                    type="number"
                                                    name="amount"
                                                    value={transferData.amount}
                                                    onChange={handleInputChange}
                                                    placeholder="0,00"
                                                    step="0.01"
                                                    min="0.01"
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>

                                            {/* Categoria da Transferência */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Categoria da Transferência *
                                                </label>
                                                <select
                                                    name="transferCategory"
                                                    value={transferData.transferCategory}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option value="">Selecione a categoria</option>
                                                    {transferCategories.map(category => (
                                                        <option key={category.value} value={category.value}>
                                                            {category.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Descrição */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Descrição (Opcional)
                                                </label>
                                                <input
                                                    type="text"
                                                    name="description"
                                                    value={transferData.description}
                                                    onChange={handleInputChange}
                                                    placeholder="Descrição da transferência"
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>

                                            {/* Agendamento */}
                                            <div className="space-y-3 p-4 border border-gray-200 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <input
                                                        type="checkbox"
                                                        name="scheduled"
                                                        checked={transferData.scheduled}
                                                        onChange={handleInputChange}
                                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                    />
                                                    <label className="text-sm font-medium text-gray-700">
                                                        Programar transferência
                                                    </label>
                                                </div>

                                                {transferData.scheduled && (
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Data de Execução
                                                        </label>
                                                        <input
                                                            type="date"
                                                            name="scheduleDate"
                                                            value={transferData.scheduleDate}
                                                            onChange={handleInputChange}
                                                            min={new Date().toISOString().split('T')[0]}
                                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Benefícios Mesmo Banco */}
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                <h4 className="font-semibold text-blue-900 mb-2">🎯 Vantagens - Mesmo Banco</h4>
                                                <ul className="text-blue-700 text-sm space-y-1">
                                                    <li>• Transferência instantânea</li>
                                                    <li>• Isenção total de taxas</li>
                                                    <li>• Processamento 24/7</li>
                                                    <li>• Limite elevado: MZN 500.000,00</li>
                                                    <li>• Confirmação imediata</li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Transferência Recorrente - POSICIONADA AQUI, APÓS O FORMULÁRIO */}
                                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                                <CiRepeat className="mr-2 text-blue-600" size={20} />
                                                Transferência Recorrente
                                            </h3>

                                            <div className="space-y-4">
                                                <label className="flex items-center space-x-3 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={recurringSettings.isRecurring}
                                                        onChange={(e) => updateRecurringSettings('isRecurring', e.target.checked)}
                                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                                    />
                                                    <span className="font-medium text-gray-900">Tornar esta transferência recorrente</span>
                                                </label>

                                                {recurringSettings.isRecurring && (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Frequência *
                                                            </label>
                                                            <select
                                                                value={recurringSettings.frequency}
                                                                onChange={(e) => updateRecurringSettings('frequency', e.target.value)}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            >
                                                                <option value="daily">Diária</option>
                                                                <option value="weekly">Semanal</option>
                                                                <option value="monthly">Mensal</option>
                                                                <option value="yearly">Anual</option>
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Data de Início *
                                                            </label>
                                                            <div className="relative">
                                                                <CiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                                                <input
                                                                    type="date"
                                                                    value={recurringSettings.startDate}
                                                                    onChange={(e) => updateRecurringSettings('startDate', e.target.value)}
                                                                    min={new Date().toISOString().split('T')[0]}
                                                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Número de Ocorrências
                                                            </label>
                                                            <input
                                                                type="number"
                                                                value={recurringSettings.numberOfOccurrences}
                                                                onChange={(e) => updateRecurringSettings('numberOfOccurrences', parseInt(e.target.value) || 1)}
                                                                min="1"
                                                                max="365"
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Data de Fim
                                                            </label>
                                                            <div className="relative">
                                                                <CiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                                                <input
                                                                    type="date"
                                                                    value={recurringSettings.endDate || ''}
                                                                    onChange={(e) => updateRecurringSettings('endDate', e.target.value)}
                                                                    min={recurringSettings.startDate}
                                                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Botões de Navegação */}
                                        <div className="flex space-x-4 pt-6 border-t border-gray-200">
                                            <button
                                                onClick={() => navigate('/panel')}
                                                className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                onClick={handleNext}
                                                disabled={!validateStep1()}
                                                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                            >
                                                Continuar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Confirmação */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Confirmar Transferência</h2>

                                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Conta de Origem:</span>
                                            <span className="font-semibold">
                                                {companyAccounts.find(acc => acc.id === transferData.fromAccount)?.name}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Conta de Destino:</span>
                                            <span className="font-semibold">{transferData.toAccountName}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Número da Conta:</span>
                                            <span className="font-semibold font-mono">{transferData.toAccountNumber}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Banco:</span>
                                            <span className="font-semibold text-blue-600">UBA Moçambique ✅</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Valor:</span>
                                            <span className="font-semibold text-blue-600 text-lg">
                                                MZN {getTotalAmount().toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Taxa:</span>
                                            <span className="font-semibold text-green-600">MZN 0,00</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Categoria:</span>
                                            <span className="font-semibold">
                                                {getCategoryLabel(transferData.transferCategory)}
                                            </span>
                                        </div>
                                        {transferData.description && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Descrição:</span>
                                                <span className="font-semibold">{transferData.description}</span>
                                            </div>
                                        )}
                                        {transferData.scheduled && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Data programada:</span>
                                                <span className="font-semibold">
                                                    {new Date(transferData.scheduleDate).toLocaleDateString('pt-PT')}
                                                </span>
                                            </div>
                                        )}
                                        {recurringSettings.isRecurring && (
                                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                                                <div className="flex items-center text-orange-800 mb-2">
                                                    <CiRepeat className="mr-2" size={16} />
                                                    <span className="font-medium">Transferência Recorrente</span>
                                                </div>
                                                <div className="text-sm text-orange-700 space-y-1">
                                                    <div>Frequência: {getFrequencyLabel(recurringSettings.frequency)}</div>
                                                    <div>Data de Início: {new Date(recurringSettings.startDate).toLocaleDateString('pt-PT')}</div>
                                                    {recurringSettings.numberOfOccurrences && (
                                                        <div>Número de Ocorrências: {recurringSettings.numberOfOccurrences}</div>
                                                    )}
                                                    {recurringSettings.endDate && (
                                                        <div>Data de Fim: {new Date(recurringSettings.endDate).toLocaleDateString('pt-PT')}</div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Tipo:</span>
                                            <span className="font-semibold text-blue-600">
                                                Transferência Instantânea - Mesmo Banco
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex space-x-4">
                                        <button
                                            onClick={handleBack}
                                            className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                        >
                                            Voltar
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                        >
                                            Confirmar Transferência
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Sucesso */}
                            {step === 3 && (
                                <div className="text-center space-y-6">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Transferência Realizada!</h2>
                                        <p className="text-gray-600">
                                            A transferência para <strong>{transferData.toAccountName}</strong> no valor de{' '}
                                            <strong>MZN {getTotalAmount().toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</strong> foi processada instantaneamente.
                                        </p>
                                        <div className="mt-3 p-3 bg-blue-50 rounded-lg inline-block">
                                            <p className="text-blue-700 font-semibold">
                                                ⚡ Transferência Mesmo Banco - Processamento Instantâneo
                                            </p>
                                        </div>
                                        {recurringSettings.isRecurring && (
                                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mt-3 inline-block">
                                                <div className="flex items-center text-orange-800">
                                                    <CiRepeat className="mr-2" size={16} />
                                                    <span className="font-medium">Transferência Recorrente Configurada</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Referência:</span>
                                            <span className="font-mono">{generateTransferReference()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Data e Hora:</span>
                                            <span>{new Date().toLocaleDateString('pt-PT')} {new Date().toLocaleTimeString('pt-PT')}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Conta Destino:</span>
                                            <span className="font-mono">{transferData.toAccountNumber}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Instituição:</span>
                                            <span className="text-blue-600 font-semibold">UBA Moçambique ✅</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Categoria:</span>
                                            <span>{getCategoryLabel(transferData.transferCategory)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Taxa:</span>
                                            <span className="text-green-600 font-semibold">MZN 0,00</span>
                                        </div>
                                        {recurringSettings.isRecurring && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Próxima Execução:</span>
                                                <span>{new Date(recurringSettings.startDate).toLocaleDateString('pt-PT')}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Opções de Comprovativo */}
                                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Comprovativo da Transferência</h3>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Download PDF */}
                                            <button
                                                onClick={downloadPDFExtract}
                                                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                                            >
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">Download PDF</div>
                                                    <div className="text-sm text-gray-600">Baixar comprovativo em PDF</div>
                                                </div>
                                            </button>

                                            {/* Enviar por Email */}
                                            <button
                                                onClick={() => setShowEmailModal(true)}
                                                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-left"
                                            >
                                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">Enviar por Email</div>
                                                    <div className="text-sm text-gray-600">Receber comprovativo por email</div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => navigate('/panel')}
                                            className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                        >
                                            Voltar ao Dashboard
                                        </button>
                                        <button
                                            onClick={handleNewTransfer}
                                            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                        >
                                            Nova Transferência
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Informações Úteis */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Mesmo Banco</h3>
                            <div className="space-y-3 text-sm text-gray-600">
                                <p className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    Transferência instantânea
                                </p>
                                <p className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    Isenção total de taxas
                                </p>
                                <p className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    Processamento 24/7
                                </p>
                                <p className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    Limite: MZN 500.000,00
                                </p>
                                <p className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    Confirmação imediata
                                </p>
                            </div>
                        </div>

                        {/* Resumo Rápido */}
                        {step === 1 && transferData.amount && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Valor:</span>
                                        <span className="font-semibold">
                                            MZN {getTotalAmount().toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                    {transferData.transferCategory && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Categoria:</span>
                                            <span className="font-semibold text-sm">
                                                {getCategoryLabel(transferData.transferCategory)}
                                            </span>
                                        </div>
                                    )}
                                    {recurringSettings.isRecurring && (
                                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
                                            <div className="text-xs text-orange-800 text-center">
                                                Transferência Recorrente
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Taxa:</span>
                                        <span className="font-semibold text-green-600">MZN 0,00</span>
                                    </div>
                                    <div className="border-t pt-3">
                                        <div className="flex justify-between text-lg">
                                            <span className="font-semibold">Total:</span>
                                            <span className="font-bold text-blue-600">
                                                MZN {getTotalAmount().toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Dicas Rápidas */}
                        <div className="bg-blue-50 rounded-2xl shadow-sm border border-blue-100 p-6">
                            <h3 className="text-lg font-semibold text-blue-900 mb-4">💡 Dicas Rápidas</h3>
                            <div className="space-y-2 text-sm text-blue-700">
                                <p>• Verifique sempre o número da conta</p>
                                <p>• Use categorias específicas para melhor organização</p>
                                <p>• Aproveite a isenção de taxas do mesmo banco</p>
                                <p>• Transferências processadas em segundos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Email */}
            <Modal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} title="Enviar Comprovativo por Email">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email de Destino
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={emailData.email}
                            onChange={handleEmailChange}
                            placeholder="seu@email.com"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Assunto
                        </label>
                        <input
                            type="text"
                            name="subject"
                            value={emailData.subject}
                            onChange={handleEmailChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mensagem (Opcional)
                        </label>
                        <textarea
                            name="message"
                            value={emailData.message}
                            onChange={handleEmailChange}
                            placeholder="Adicione uma mensagem personalizada..."
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={() => setShowEmailModal(false)}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSendEmail}
                            disabled={!emailData.email}
                            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            Enviar Email
                        </button>
                    </div>
                </div>
            </Modal>
        </BusinessLayout>
    );
};

export default BusinessSameBankTransfers;