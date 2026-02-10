// components/BusinessDigitalWalletPayment.tsx
import React, { useState } from 'react';
import { MdGroup } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import {
    CiMoneyBill,
    CiUser,
    CiMobile3,
    CiMail,
    CiWarning,
    CiCircleCheck,
    CiBellOn,
    CiCalendar,
    CiRepeat
} from "react-icons/ci";
import { TbTransfer } from "react-icons/tb";
import { BusinessLayout } from '../../../components/BusinessLayout';
interface BusinessDigitalWalletPaymentProps {
    language: 'PT' | 'EN';
}

interface Transaction {
    phoneNumber: string;
    amount: number;
    provider: 'mpesa' | 'emola' | 'mkesh';
    sendConfirmation: boolean;
    notificationMethod?: 'sms' | 'email';
    notificationContact?: string;
}

interface RecurringSettings {
    isRecurring: boolean;
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    startDate: string;
    endDate?: string;
    numberOfOccurrences?: number;
}

const BusinessDigitalWalletPayment: React.FC<BusinessDigitalWalletPaymentProps> = ({ language }) => {
    const navigate = useNavigate();
    const [operationType, setOperationType] = useState<'single' | 'multiple'>('single');
    const [activeProvider, setActiveProvider] = useState<'mpesa' | 'emola' | 'mkesh'>('mpesa');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Estado para configurações recorrentes
    const [recurringSettings, setRecurringSettings] = useState<RecurringSettings>({
        isRecurring: false,
        frequency: 'monthly',
        startDate: new Date().toISOString().split('T')[0],
        numberOfOccurrences: 1
    });

    // Estado para operação única
    const [singleTransaction, setSingleTransaction] = useState<Transaction>({
        phoneNumber: '',
        amount: 0,
        provider: 'mpesa',
        sendConfirmation: false,
        notificationMethod: 'sms',
        notificationContact: ''
    });

    // Estado para operação múltipla
    const [multipleTransactions, setMultipleTransactions] = useState<Transaction[]>([
        {
            phoneNumber: '',
            amount: 0,
            provider: 'mpesa',
            sendConfirmation: false,
            notificationMethod: 'sms',
            notificationContact: ''
        }
    ]);

    // Textos traduzidos
    const texts = {
        PT: {
            title: 'Carteira Digital',
            subtitle: 'Transferência para carteiras digitais',
            operationType: 'Tipo de Operação',
            singleOperation: 'Operação Simples',
            multipleOperation: 'Operação Múltipla',
            provider: 'Provedor',
            recipientInfo: 'Informações do Destinatário',
            phoneNumber: 'Número de Telemóvel',
            amount: 'Valor',
            sendConfirmation: 'Notificar o receptor',
            notificationMethod: 'Método de Notificação',
            viaSMS: 'Via SMS',
            viaEmail: 'Via Email',
            enterPhone: 'Digite o número de telemóvel',
            enterEmail: 'Digite o email',
            addRecipient: 'Adicionar Destinatário',
            removeRecipient: 'Remover',
            totalAmount: 'Valor Total',
            confirmTransfer: 'Confirmar Transferência',
            processing: 'Processando...',
            transferSuccess: 'Transferência realizada com sucesso!',
            requiredField: 'Campo obrigatório',
            invalidPhone: 'Número de telemóvel inválido',
            invalidEmail: 'Email inválido',
            insufficientBalance: 'Saldo insuficiente',
            maxAmount: 'Valor máximo: 50.000 MT',
            minAmount: 'Valor mínimo: 10 MT',
            confirmationMessage: 'O receptor será notificado sobre esta transferência',
            mpesa: 'MPesa',
            emola: 'E-mola',
            mkesh: 'M-Kesh',
            transactionFee: 'Taxa de transação',
            availableBalance: 'Saldo disponível',
            transferDetails: 'Detalhes da Transferência',
            confirmButton: 'Confirmar e Transferir',
            cancelButton: 'Cancelar',
            recipient: 'Destinatário',

            // Novos textos para funcionalidades adicionadas
            recurringTransfer: 'Transferência Recorrente',
            makeRecurring: 'Tornar esta transferência recorrente',
            frequency: 'Frequência',
            startDate: 'Data de Início',
            endDate: 'Data de Fim',
            numberOfOccurrences: 'Número de Ocorrências',
            daily: 'Diária',
            weekly: 'Semanal',
            monthly: 'Mensal',
            yearly: 'Anual',
            selectProvider: 'Selecionar Operadora'
        },
        EN: {
            title: 'Digital Wallet',
            subtitle: 'Transfer to digital wallets',
            operationType: 'Operation Type',
            singleOperation: 'Single Operation',
            multipleOperation: 'Multiple Operation',
            provider: 'Provider',
            recipientInfo: 'Recipient Information',
            phoneNumber: 'Phone Number',
            amount: 'Amount',
            sendConfirmation: 'Notify receiver',
            notificationMethod: 'Notification Method',
            viaSMS: 'Via SMS',
            viaEmail: 'Via Email',
            enterPhone: 'Enter phone number',
            enterEmail: 'Enter email address',
            addRecipient: 'Add Recipient',
            removeRecipient: 'Remove',
            totalAmount: 'Total Amount',
            confirmTransfer: 'Confirm Transfer',
            processing: 'Processing...',
            transferSuccess: 'Transfer completed successfully!',
            requiredField: 'Required field',
            invalidPhone: 'Invalid phone number',
            invalidEmail: 'Invalid email',
            insufficientBalance: 'Insufficient balance',
            maxAmount: 'Maximum amount: 50,000 MT',
            minAmount: 'Minimum amount: 10 MT',
            confirmationMessage: 'Receiver will be notified about this transfer',
            mpesa: 'MPesa',
            emola: 'E-mola',
            mkesh: 'M-Kesh',
            transactionFee: 'Transaction fee',
            availableBalance: 'Available balance',
            transferDetails: 'Transfer Details',
            confirmButton: 'Confirm and Transfer',
            cancelButton: 'Cancel',
            recipient: 'Recipient',

            // New texts for added features
            recurringTransfer: 'Recurring Transfer',
            makeRecurring: 'Make this transfer recurring',
            frequency: 'Frequency',
            startDate: 'Start Date',
            endDate: 'End Date',
            numberOfOccurrences: 'Number of Occurrences',
            daily: 'Daily',
            weekly: 'Weekly',
            monthly: 'Monthly',
            yearly: 'Yearly',
            selectProvider: 'Select Provider'
        }
    };

    const t = texts[language];

    // Provedores disponíveis com imagens e cores personalizadas
    const providers = [
        {
            id: 'mpesa',
            name: t.mpesa,
            image: '/mpesa.png',
            fee: 5,
            color: 'from-red-500 to-red-600',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            textColor: 'text-red-700',
            fallback: (
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                    MPESA
                </div>
            )
        },
        {
            id: 'emola',
            name: t.emola,
            image: '/emola.png',
            fee: 4,
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
            textColor: 'text-orange-700',
            fallback: (
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                    EMOLA
                </div>
            )
        },
        {
            id: 'mkesh',
            name: t.mkesh,
            image: '/mkesh.png',
            fee: 6,
            color: 'from-yellow-500 to-yellow-600',
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-200',
            textColor: 'text-yellow-700',
            fallback: (
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                    MKESH
                </div>
            )
        }
    ];

    // Validação do número de telefone
    const validatePhoneNumber = (phone: string): boolean => {
        const phoneRegex = /^8[2-7][0-9]{7}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    };

    // Validação de email
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Adicionar destinatário na operação múltipla
    const addRecipient = () => {
        setMultipleTransactions(prev => [
            ...prev,
            {
                phoneNumber: '',
                amount: 0,
                provider: activeProvider,
                sendConfirmation: false,
                notificationMethod: 'sms',
                notificationContact: ''
            }
        ]);
    };

    // Remover destinatário na operação múltipla
    const removeRecipient = (index: number) => {
        if (multipleTransactions.length > 1) {
            setMultipleTransactions(prev => prev.filter((_, i) => i !== index));
        }
    };

    // Atualizar transação única
    const updateSingleTransaction = (field: keyof Transaction, value: any) => {
        setSingleTransaction(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Atualizar transação múltipla
    const updateMultipleTransaction = (index: number, field: keyof Transaction, value: any) => {
        setMultipleTransactions(prev =>
            prev.map((transaction, i) =>
                i === index ? { ...transaction, [field]: value } : transaction
            )
        );
    };

    // Atualizar configurações recorrentes
    const updateRecurringSettings = (field: keyof RecurringSettings, value: any) => {
        setRecurringSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Calcular total da operação múltipla
    const calculateTotal = () => {
        return multipleTransactions.reduce((total, transaction) => total + (transaction.amount || 0), 0);
    };

    // Calcular taxa total
    const calculateTotalFee = () => {
        return multipleTransactions.reduce((total, transaction) => {
            const provider = providers.find(p => p.id === transaction.provider);
            return total + (provider?.fee || 0);
        }, 0);
    };

    // Validar formulário
    const validateForm = () => {
        if (operationType === 'single') {
            if (!singleTransaction.phoneNumber || !singleTransaction.amount) {
                alert(language === 'PT' ? 'Preencha todos os campos obrigatórios' : 'Please fill all required fields');
                return false;
            }
            if (!validatePhoneNumber(singleTransaction.phoneNumber)) {
                alert(t.invalidPhone);
                return false;
            }
            if (singleTransaction.amount < 10) {
                alert(t.minAmount);
                return false;
            }
            if (singleTransaction.amount > 50000) {
                alert(t.maxAmount);
                return false;
            }
            if (singleTransaction.sendConfirmation) {
                if (!singleTransaction.notificationContact) {
                    alert(language === 'PT' ? 'Informe o contacto para notificação' : 'Please provide notification contact');
                    return false;
                }
                if (singleTransaction.notificationMethod === 'sms' && !validatePhoneNumber(singleTransaction.notificationContact)) {
                    alert(t.invalidPhone);
                    return false;
                }
                if (singleTransaction.notificationMethod === 'email' && !validateEmail(singleTransaction.notificationContact)) {
                    alert(t.invalidEmail);
                    return false;
                }
            }
            if (recurringSettings.isRecurring && !recurringSettings.startDate) {
                alert(language === 'PT' ? 'Data de início é obrigatória para transferências recorrentes' : 'Start date is required for recurring transfers');
                return false;
            }
        } else {
            for (const transaction of multipleTransactions) {
                if (!transaction.phoneNumber || !transaction.amount) {
                    alert(language === 'PT' ? 'Preencha todos os campos obrigatórios' : 'Please fill all required fields');
                    return false;
                }
                if (!validatePhoneNumber(transaction.phoneNumber)) {
                    alert(t.invalidPhone);
                    return false;
                }
                if (transaction.amount < 10) {
                    alert(t.minAmount);
                    return false;
                }
                if (transaction.amount > 50000) {
                    alert(t.maxAmount);
                    return false;
                }
                if (transaction.sendConfirmation) {
                    if (!transaction.notificationContact) {
                        alert(language === 'PT' ? 'Informe o contacto para notificação' : 'Please provide notification contact');
                        return false;
                    }
                    if (transaction.notificationMethod === 'sms' && !validatePhoneNumber(transaction.notificationContact)) {
                        alert(t.invalidPhone);
                        return false;
                    }
                    if (transaction.notificationMethod === 'email' && !validateEmail(transaction.notificationContact)) {
                        alert(t.invalidEmail);
                        return false;
                    }
                }
            }
            if (recurringSettings.isRecurring && !recurringSettings.startDate) {
                alert(language === 'PT' ? 'Data de início é obrigatória para transferências recorrentes' : 'Start date is required for recurring transfers');
                return false;
            }
        }
        return true;
    };

    // Submeter transferência
    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Simular processamento
            await new Promise(resolve => setTimeout(resolve, 2000));

            const transactionData = {
                operationType,
                transactions: operationType === 'single' ? [singleTransaction] : multipleTransactions,
                recurring: recurringSettings.isRecurring ? recurringSettings : undefined,
                totalAmount: operationType === 'single' ? singleTransaction.amount : calculateTotal(),
                totalFee: calculateTotalFee()
            };

            console.log('Dados da transação:', transactionData);

            alert(t.transferSuccess);
            navigate('/business/transfers/digital-wallet');

        } catch (error) {
            console.error('Erro na transferência:', error);
            alert(language === 'PT' ? 'Erro na transferência' : 'Transfer error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const currentProvider = providers.find(p => p.id === activeProvider);

    return (
        <>
            <BusinessLayout>
                <div className="max-w-6xl mx-auto space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

                        {/* Header */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="p-3 bg-gradient-to-br from-red-600 to-red-700 rounded-xl">
                                    <TbTransfer size={28} className="text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
                                    <p className="text-gray-600">{t.subtitle}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* Formulário Principal */}
                            <div className="lg:col-span-2 space-y-6">

                                {/* Tipo de Operação */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.operationType}</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setOperationType('single')}
                                            className={`p-4 border-2 rounded-xl text-center transition-all ${operationType === 'single'
                                                ? 'border-red-500 bg-red-50 text-red-700'
                                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                                }`}
                                        >
                                            <CiUser size={24} className="mx-auto mb-2" />
                                            <span className="font-medium">{t.singleOperation}</span>
                                        </button>
                                        <button
                                            onClick={() => setOperationType('multiple')}
                                            className={`p-4 border-2 rounded-xl text-center transition-all ${operationType === 'multiple'
                                                ? 'border-red-500 bg-red-50 text-red-700'
                                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                                }`}
                                        >
                                            <MdGroup size={24} className="mx-auto mb-2" />
                                            <span className="font-medium">{t.multipleOperation}</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Provedores */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.provider}</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {providers.map(provider => (
                                            <button
                                                key={provider.id}
                                                onClick={() => setActiveProvider(provider.id as any)}
                                                className={`p-4 border-2 rounded-xl text-center transition-all ${activeProvider === provider.id
                                                    ? `border-red-500 bg-red-50 text-red-700`
                                                    : `border-gray-200 bg-white text-gray-700 hover:border-gray-300 ${provider.bgColor} ${provider.textColor}`
                                                    }`}
                                            >
                                                <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-white flex items-center justify-center overflow-hidden">
                                                    {provider.image ? (
                                                        <img
                                                            src={provider.image}
                                                            alt={provider.name}
                                                            className="w-full h-full object-contain p-2"
                                                            onError={(e) => {
                                                                e.currentTarget.style.display = 'none';
                                                            }}
                                                        />
                                                    ) : null}
                                                    {provider.fallback && !provider.image && provider.fallback}
                                                </div>
                                                <span className="font-medium block">{provider.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Transferência Recorrente - Para ambos os tipos de operação */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                        <CiRepeat className="mr-2 text-red-600" size={20} />
                                        {t.recurringTransfer}
                                    </h3>

                                    <div className="space-y-4">
                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={recurringSettings.isRecurring}
                                                onChange={(e) => updateRecurringSettings('isRecurring', e.target.checked)}
                                                className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                                            />
                                            <span className="font-medium text-gray-900">{t.makeRecurring}</span>
                                        </label>

                                        {recurringSettings.isRecurring && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        {t.frequency} *
                                                    </label>
                                                    <select
                                                        value={recurringSettings.frequency}
                                                        onChange={(e) => updateRecurringSettings('frequency', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                    >
                                                        <option value="daily">{t.daily}</option>
                                                        <option value="weekly">{t.weekly}</option>
                                                        <option value="monthly">{t.monthly}</option>
                                                        <option value="yearly">{t.yearly}</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        {t.startDate} *
                                                    </label>
                                                    <div className="relative">
                                                        <CiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                                        <input
                                                            type="date"
                                                            value={recurringSettings.startDate}
                                                            onChange={(e) => updateRecurringSettings('startDate', e.target.value)}
                                                            min={new Date().toISOString().split('T')[0]}
                                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        {t.numberOfOccurrences}
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={recurringSettings.numberOfOccurrences}
                                                        onChange={(e) => updateRecurringSettings('numberOfOccurrences', parseInt(e.target.value) || 1)}
                                                        min="1"
                                                        max="365"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        {t.endDate}
                                                    </label>
                                                    <div className="relative">
                                                        <CiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                                        <input
                                                            type="date"
                                                            value={recurringSettings.endDate || ''}
                                                            onChange={(e) => updateRecurringSettings('endDate', e.target.value)}
                                                            min={recurringSettings.startDate}
                                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Formulário de Transferência */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.recipientInfo}</h3>

                                    {operationType === 'single' ? (
                                        // Operação Simples
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        {t.phoneNumber} *
                                                    </label>
                                                    <div className="relative">
                                                        <CiMobile3 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                        <input
                                                            type="tel"
                                                            value={singleTransaction.phoneNumber}
                                                            onChange={(e) => updateSingleTransaction('phoneNumber', e.target.value)}
                                                            placeholder="82 123 4567"
                                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                        />
                                                    </div>
                                                    {singleTransaction.phoneNumber && !validatePhoneNumber(singleTransaction.phoneNumber) && (
                                                        <p className="text-red-500 text-sm mt-1 flex items-center">
                                                            <CiWarning className="mr-1" />
                                                            {t.invalidPhone}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        {t.amount} (MT) *
                                                    </label>
                                                    <div className="relative">
                                                        <CiMoneyBill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                        <input
                                                            type="number"
                                                            value={singleTransaction.amount || ''}
                                                            onChange={(e) => updateSingleTransaction('amount', parseFloat(e.target.value) || 0)}
                                                            min="10"
                                                            max="50000"
                                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                        />
                                                    </div>
                                                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                                                        <span>{t.minAmount}</span>
                                                        <span>{t.maxAmount}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Notificação para o receptor - Operação Simples */}
                                            <div className="border-t border-gray-200 pt-6">
                                                <label className="flex items-start space-x-3 cursor-pointer mb-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={singleTransaction.sendConfirmation}
                                                        onChange={(e) => updateSingleTransaction('sendConfirmation', e.target.checked)}
                                                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500 mt-1"
                                                    />
                                                    <div className="flex-1">
                                                        <span className="font-medium text-gray-900">{t.sendConfirmation}</span>
                                                        <p className="text-sm text-gray-500">{t.confirmationMessage}</p>

                                                        {singleTransaction.sendConfirmation && (
                                                            <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        {t.notificationMethod}
                                                                    </label>
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => updateSingleTransaction('notificationMethod', 'sms')}
                                                                            className={`p-3 border-2 rounded-lg text-center transition-all ${singleTransaction.notificationMethod === 'sms'
                                                                                ? 'border-red-500 bg-red-50 text-red-700'
                                                                                : 'border-gray-200 bg-white text-gray-700'
                                                                                }`}
                                                                        >
                                                                            <CiMobile3 size={20} className="mx-auto mb-1" />
                                                                            <span className="text-sm font-medium">{t.viaSMS}</span>
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => updateSingleTransaction('notificationMethod', 'email')}
                                                                            className={`p-3 border-2 rounded-lg text-center transition-all ${singleTransaction.notificationMethod === 'email'
                                                                                ? 'border-red-500 bg-red-50 text-red-700'
                                                                                : 'border-gray-200 bg-white text-gray-700'
                                                                                }`}
                                                                        >
                                                                            <CiMail size={20} className="mx-auto mb-1" />
                                                                            <span className="text-sm font-medium">{t.viaEmail}</span>
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <div className="relative">
                                                                        {singleTransaction.notificationMethod === 'sms' ? (
                                                                            <>

                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <CiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                                                <input
                                                                                    type="email"
                                                                                    value={singleTransaction.notificationContact || ''}
                                                                                    onChange={(e) => updateSingleTransaction('notificationContact', e.target.value)}
                                                                                    placeholder={t.enterEmail}
                                                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                                                />
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                    {singleTransaction.notificationContact && (
                                                                        <>
                                                                            {singleTransaction.notificationMethod === 'sms' && !validatePhoneNumber(singleTransaction.notificationContact) && (
                                                                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                                                                    <CiWarning className="mr-1" />
                                                                                    {t.invalidPhone}
                                                                                </p>
                                                                            )}
                                                                            {singleTransaction.notificationMethod === 'email' && !validateEmail(singleTransaction.notificationContact) && (
                                                                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                                                                    <CiWarning className="mr-1" />
                                                                                    {t.invalidEmail}
                                                                                </p>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    ) : (
                                        // Operação Múltipla
                                        <div className="space-y-6">
                                            {multipleTransactions.map((transaction, index) => (
                                                <div key={index} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h4 className="font-medium text-gray-900">
                                                            {t.recipient} {index + 1}
                                                        </h4>
                                                        {multipleTransactions.length > 1 && (
                                                            <button
                                                                onClick={() => removeRecipient(index)}
                                                                className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
                                                            >
                                                                <CiWarning className="mr-1" size={16} />
                                                                {t.removeRecipient}
                                                            </button>
                                                        )}
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                {t.phoneNumber} *
                                                            </label>
                                                            <div className="relative">
                                                                <CiMobile3 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                                <input
                                                                    type="tel"
                                                                    value={transaction.phoneNumber}
                                                                    onChange={(e) => updateMultipleTransaction(index, 'phoneNumber', e.target.value)}
                                                                    placeholder="82 123 4567"
                                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                                />
                                                            </div>
                                                            {transaction.phoneNumber && !validatePhoneNumber(transaction.phoneNumber) && (
                                                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                                                    <CiWarning className="mr-1" />
                                                                    {t.invalidPhone}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                {t.amount} (MT) *
                                                            </label>
                                                            <div className="relative">
                                                                <CiMoneyBill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                                <input
                                                                    type="number"
                                                                    value={transaction.amount || ''}
                                                                    onChange={(e) => updateMultipleTransaction(index, 'amount', parseFloat(e.target.value) || 0)}
                                                                    min="10"
                                                                    max="50000"
                                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Dropdown para seleção de operadora por destinatário */}
                                                        <div className="md:col-span-2">
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                {t.selectProvider} *
                                                            </label>
                                                            <select
                                                                value={transaction.provider}
                                                                onChange={(e) => updateMultipleTransaction(index, 'provider', e.target.value)}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                            >
                                                                {providers.map(provider => (
                                                                    <option key={provider.id} value={provider.id}>
                                                                        {provider.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    {/* Notificação para cada receptor - Operação Múltipla */}
                                                    <div className="border-t border-gray-200 pt-4">
                                                        <label className="flex items-start space-x-3 cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={transaction.sendConfirmation}
                                                                onChange={(e) => updateMultipleTransaction(index, 'sendConfirmation', e.target.checked)}
                                                                className="w-4 h-4 text-red-600 rounded focus:ring-red-500 mt-1"
                                                            />
                                                            <div className="flex-1">
                                                                <span className="font-medium text-gray-900 text-sm">{t.sendConfirmation}</span>

                                                                {transaction.sendConfirmation && (
                                                                    <div className="mt-3 space-y-3 p-3 bg-white rounded-lg border border-gray-200">
                                                                        <div>
                                                                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                                                                {t.notificationMethod}
                                                                            </label>
                                                                            <div className="grid grid-cols-2 gap-2">
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => updateMultipleTransaction(index, 'notificationMethod', 'sms')}
                                                                                    className={`p-2 border rounded text-center transition-all text-xs ${transaction.notificationMethod === 'sms'
                                                                                        ? 'border-red-500 bg-red-50 text-red-700'
                                                                                        : 'border-gray-200 bg-white text-gray-700'
                                                                                        }`}
                                                                                >
                                                                                    <CiMobile3 size={16} className="mx-auto mb-1" />
                                                                                    {t.viaSMS}
                                                                                </button>
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => updateMultipleTransaction(index, 'notificationMethod', 'email')}
                                                                                    className={`p-2 border rounded text-center transition-all text-xs ${transaction.notificationMethod === 'email'
                                                                                        ? 'border-red-500 bg-red-50 text-red-700'
                                                                                        : 'border-gray-200 bg-white text-gray-700'
                                                                                        }`}
                                                                                >
                                                                                    <CiMail size={16} className="mx-auto mb-1" />
                                                                                    {t.viaEmail}
                                                                                </button>
                                                                            </div>
                                                                        </div>

                                                                        <div>
                                                                            <div className="relative">
                                                                                {transaction.notificationMethod === 'sms' ? (
                                                                                    <>

                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        <CiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                                                                        <input
                                                                                            type="email"
                                                                                            value={transaction.notificationContact || ''}
                                                                                            onChange={(e) => updateMultipleTransaction(index, 'notificationContact', e.target.value)}
                                                                                            placeholder={t.enterEmail}
                                                                                            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                                                        />
                                                                                    </>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                            ))}

                                            <button
                                                onClick={addRecipient}
                                                className="w-full border-2 border-dashed border-gray-300 rounded-xl py-4 text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors flex items-center justify-center"
                                            >
                                                <CiUser className="mr-2" size={20} />
                                                + {t.addRecipient}
                                            </button>

                                            {/* Total da operação múltipla */}
                                            {multipleTransactions.length > 1 && (
                                                <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-4 text-white">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium">{t.totalAmount}:</span>
                                                        <span className="text-lg font-bold">
                                                            {calculateTotal().toLocaleString()} MT
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Sidebar de Resumo */}
                            <div className="space-y-6">

                                {/* Resumo da Transferência */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                        <CiCircleCheck className="mr-2 text-red-600" size={20} />
                                        {t.transferDetails}
                                    </h3>

                                    <div className="space-y-3">
                                        {operationType === 'single' ? (
                                            <>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">{t.provider}:</span>
                                                    <span className="font-medium">
                                                        {currentProvider?.name}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">{t.transactionFee}:</span>
                                                    <span className="font-medium">
                                                        {currentProvider?.fee} MT
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Número de destinatários:</span>
                                                    <span className="font-medium">
                                                        {multipleTransactions.length}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">{t.transactionFee}:</span>
                                                    <span className="font-medium">
                                                        {calculateTotalFee()} MT
                                                    </span>
                                                </div>
                                            </>
                                        )}

                                        {recurringSettings.isRecurring && (
                                            <div className="border-t border-gray-200 pt-3">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">{t.frequency}:</span>
                                                    <span className="font-medium capitalize">
                                                        {recurringSettings.frequency}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">{t.startDate}:</span>
                                                    <span className="font-medium">
                                                        {new Date(recurringSettings.startDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                {recurringSettings.numberOfOccurrences && (
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">{t.numberOfOccurrences}:</span>
                                                        <span className="font-medium">
                                                            {recurringSettings.numberOfOccurrences}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
                                            <span>{t.totalAmount}:</span>
                                            <span className="text-red-600">
                                                {operationType === 'single'
                                                    ? `${singleTransaction.amount?.toLocaleString()} MT`
                                                    : `${calculateTotal().toLocaleString()} MT`
                                                }
                                            </span>
                                        </div>

                                        <div className="flex justify-between text-sm text-gray-500">
                                            <span>{t.availableBalance}:</span>
                                            <span>250.000 MT</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Ações */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    <div className="space-y-3">
                                        <button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-br from-red-600 to-red-700 text-white py-3 px-4 rounded-xl font-medium hover:from-red-700 hover:to-red-800 disabled:from-red-300 disabled:to-red-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    {t.processing}
                                                </>
                                            ) : (
                                                <>
                                                    <CiCircleCheck className="mr-2" size={20} />
                                                    {t.confirmButton}
                                                </>
                                            )}
                                        </button>

                                        <button
                                            onClick={() => navigate('/business/transfers')}
                                            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                                        >
                                            {t.cancelButton}
                                        </button>
                                    </div>
                                </div>

                                {/* Informações Adicionais */}
                                <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-4">
                                    <div className="flex items-start space-x-3">
                                        <CiBellOn className="text-red-600 mt-0.5" size={20} />
                                        <div>
                                            <h4 className="font-medium text-red-800">
                                                {language === 'PT' ? 'Notificação Instantânea' : 'Instant Notification'}
                                            </h4>
                                            <p className="text-red-700 text-sm mt-1">
                                                {language === 'PT'
                                                    ? 'Os receptores serão notificados instantaneamente sobre a transferência via SMS ou Email.'
                                                    : 'Receivers will be instantly notified about the transfer via SMS or Email.'
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BusinessLayout>
        </>
    );
};

export default BusinessDigitalWalletPayment;