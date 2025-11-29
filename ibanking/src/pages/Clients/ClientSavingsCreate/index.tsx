// pages/ClientSavingsCreate.tsx
import React, { useState } from 'react';
import {
    FaPiggyBank,
    FaCalculator,
    FaHistory,
    FaCheckCircle,
    FaClock
} from 'react-icons/fa';
import { ClientLayout } from '../../../components/ClientLayout';

interface ClientSavingsCreateProps {
    language: 'PT' | 'EN';
}

const ClientSavingsCreate: React.FC<ClientSavingsCreateProps> = ({ language }) => {
    const [savingsType, setSavingsType] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [interestRate, setInterestRate] = useState<string>('3.5');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const currentTexts = {
        PT: {
            title: "Criar Poupança",
            subtitle: "Invista no seu futuro com segurança e rentabilidade",
            savingsType: "Tipo de Poupança",
            amount: "Valor Inicial",
            duration: "Duração",
            interestRate: "Taxa de Juro Anual",
            monthlyInterest: "Juro Mensal Estimado",
            totalInterest: "Juro Total Estimado",
            maturityAmount: "Valor na Maturidade",
            createSavings: "Criar Poupança",
            processing: "Processando...",
            success: "Poupança criada com sucesso!",
            recentSavings: "Suas Poupanças",
            noRecentSavings: "Nenhuma poupança criada",
            continue: "Continuar",
            cancel: "Cancelar",
            confirm: "Confirmar Criação",
            selectType: "Selecione o tipo de poupança",
            enterAmount: "Digite o valor inicial",
            selectDuration: "Selecione a duração",
            confirmMessage: "Confirme os detalhes da sua poupança",
            regularSavings: "Poupança Regular",
            fixedSavings: "Poupança a Prazo",
            goalSavings: "Poupança Objetivo",
            descriptionRegular: "Flexibilidade para depósitos e levantamentos",
            descriptionFixed: "Maior rentabilidade com prazo fixo",
            descriptionGoal: "Poupe para objetivos específicos",
            months: "meses",
            years: "anos",
            features: "Porque Poupar Connosco?",
            feature1: "Taxas Competitivas",
            feature2: "Segurança Garantida",
            feature3: "Rentabilidade Estável",
            feature4: "Sempre Disponível"
        },
        EN: {
            title: "Create Savings",
            subtitle: "Invest in your future with security and returns",
            savingsType: "Savings Type",
            amount: "Initial Amount",
            duration: "Duration",
            interestRate: "Annual Interest Rate",
            monthlyInterest: "Estimated Monthly Interest",
            totalInterest: "Estimated Total Interest",
            maturityAmount: "Maturity Amount",
            createSavings: "Create Savings",
            processing: "Processing...",
            success: "Savings created successfully!",
            recentSavings: "Your Savings",
            noRecentSavings: "No savings created",
            continue: "Continue",
            cancel: "Cancel",
            confirm: "Confirm Creation",
            selectType: "Select savings type",
            enterAmount: "Enter initial amount",
            selectDuration: "Select duration",
            confirmMessage: "Confirm your savings details",
            regularSavings: "Regular Savings",
            fixedSavings: "Fixed Term Savings",
            goalSavings: "Goal Savings",
            descriptionRegular: "Flexibility for deposits and withdrawals",
            descriptionFixed: "Higher returns with fixed term",
            descriptionGoal: "Save for specific goals",
            months: "months",
            years: "years",
            features: "Why Save With Us?",
            feature1: "Competitive Rates",
            feature2: "Guaranteed Security",
            feature3: "Stable Returns",
            feature4: "Always Available"
        }
    }[language];

    const savingsTypes = [
        {
            id: 'regular',
            name: currentTexts.regularSavings,
            description: currentTexts.descriptionRegular,
            minAmount: 100,
            maxAmount: 50000,
            interestRates: {
                '6': '2.5',
                '12': '3.0',
                '24': '3.5'
            },
            icon: FaPiggyBank,
            color: 'bg-red-50 border-red-200'
        },
        {
            id: 'fixed',
            name: currentTexts.fixedSavings,
            description: currentTexts.descriptionFixed,
            minAmount: 1000,
            maxAmount: 100000,
            interestRates: {
                '12': '4.0',
                '24': '4.5',
                '36': '5.0'
            },
            icon: FaClock,
            color: 'bg-red-50 border-red-200'
        },
        {
            id: 'goal',
            name: currentTexts.goalSavings,
            description: currentTexts.descriptionGoal,
            minAmount: 500,
            maxAmount: 50000,
            interestRates: {
                '6': '3.0',
                '12': '3.5',
                '24': '4.0'
            },
            icon: FaClock,
            color: 'bg-red-50 border-red-200'
        }
    ];

    const durations = [
        { value: '6', label: `6 ${currentTexts.months}` },
        { value: '12', label: `12 ${currentTexts.months}` },
        { value: '24', label: `24 ${currentTexts.months}` },
        { value: '36', label: `36 ${currentTexts.months}` }
    ];

    const features = [
        {
            icon: FaClock,
            text: currentTexts.feature1,
            description: "As melhores taxas do mercado"
        },
        {
            icon: FaClock,
            text: currentTexts.feature2,
            description: "Seu dinheiro 100% protegido"
        },
        {
            icon: FaCalculator,
            text: currentTexts.feature3,
            description: "Rendimentos previsíveis"
        },
        {
            icon: FaPiggyBank,
            text: currentTexts.feature4,
            description: "Acesso quando precisar"
        }
    ];

    const recentSavings = [
        {
            id: 1,
            type: currentTexts.regularSavings,
            amount: 5000,
            duration: '12',
            interestRate: '3.0',
            date: '2024-01-15',
            status: 'Ativa'
        },
        {
            id: 2,
            type: currentTexts.fixedSavings,
            amount: 15000,
            duration: '24',
            interestRate: '4.5',
            date: '2024-01-10',
            status: 'Ativa'
        }
    ];

    const selectedTypeData = savingsTypes.find(type => type.id === savingsType);

    // Calcular estimativas
    const calculateEstimates = () => {
        if (!amount || !duration || !interestRate) return null;

        const principal = parseFloat(amount);
        const rate = parseFloat(interestRate) / 100;
        const months = parseInt(duration);

        const monthlyInterest = (principal * rate) / 12;
        const totalInterest = monthlyInterest * months;
        const maturityAmount = principal + totalInterest;

        return {
            monthlyInterest,
            totalInterest,
            maturityAmount
        };
    };

    const estimates = calculateEstimates();

    const handleCreateSavings = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setShowConfirmation(false);
            alert(currentTexts.success);
        }, 2000);
    };

    const isFormValid = savingsType && amount && duration && parseFloat(amount) > 0;

    return (
        <ClientLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-sm border mb-5 border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <FaPiggyBank size={24} className="text-red-600" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{currentTexts.title}</h1>
                                    <p className="text-gray-600">{currentTexts.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Features */}
                            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                    {currentTexts.features}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {features.map((feature, index) => (
                                        <div key={index} className="flex items-start space-x-4 p-4 bg-red-50 rounded-xl border border-red-200">
                                            <div className="p-3 bg-red-100 rounded-lg flex-shrink-0">
                                                <feature.icon className="text-red-600 text-xl" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-1">{feature.text}</h3>
                                                <p className="text-sm text-gray-600">{feature.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Savings Types */}
                            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    {currentTexts.savingsType}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {savingsTypes.map((type) => {
                                        const IconComponent = type.icon;
                                        return (
                                            <button
                                                key={type.id}
                                                onClick={() => {
                                                    setSavingsType(type.id);
                                                    setInterestRate(type.interestRates['12'] || '3.0');
                                                }}
                                                className={`flex flex-col items-center space-y-4 p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-left ${savingsType === type.id
                                                        ? 'border-red-500 bg-red-50 shadow-md'
                                                        : 'border-red-100 hover:border-red-300'
                                                    }`}
                                            >
                                                <div className="p-4 bg-red-100 rounded-xl">
                                                    <IconComponent className="text-red-600 text-2xl" />
                                                </div>
                                                <div className="text-center">
                                                    <h3 className="font-bold text-gray-900 text-lg mb-2">{type.name}</h3>
                                                    <p className="text-gray-600 text-sm mb-3">{type.description}</p>
                                                    <div className="bg-red-50 rounded-lg p-2">
                                                        <p className="text-xs text-red-600 font-semibold">
                                                            {type.minAmount} - {type.maxAmount} MT
                                                        </p>
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Savings Form */}
                            {selectedTypeData && (
                                <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Configurar Poupança
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Amount */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                {currentTexts.amount} (MT)
                                            </label>
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                placeholder={currentTexts.enterAmount}
                                                className="w-full px-4 py-3 border-2 border-red-100 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                                min={selectedTypeData.minAmount}
                                                max={selectedTypeData.maxAmount}
                                            />
                                            <p className="text-xs text-red-600 font-medium mt-2">
                                                Valor entre {selectedTypeData.minAmount} e {selectedTypeData.maxAmount} MT
                                            </p>
                                        </div>

                                        {/* Duration */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                {currentTexts.duration}
                                            </label>
                                            <select
                                                value={duration}
                                                onChange={(e) => {
                                                    setDuration(e.target.value);
                                                    setInterestRate(selectedTypeData.interestRates[e.target.value as keyof typeof selectedTypeData.interestRates] || '3.0');
                                                }}
                                                className="w-full px-4 py-3 border-2 border-red-100 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                            >
                                                <option value="">{currentTexts.selectDuration}</option>
                                                {durations.map((dur) => (
                                                    <option key={dur.value} value={dur.value}>
                                                        {dur.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Interest Rate */}
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                {currentTexts.interestRate}
                                            </label>
                                            <div className="bg-red-50 border-2 border-red-100 rounded-xl p-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-2xl font-bold text-red-600">
                                                        {interestRate}%
                                                    </span>
                                                    <    FaClock className="text-red-500 text-xl" />
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Taxa de juro anual aplicável
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Estimates */}
                                    {estimates && (
                                        <div className="mt-8 pt-6 border-t border-red-100">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">Projeção de Rendimentos</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
                                                    <p className="text-sm font-semibold text-gray-600 mb-2">{currentTexts.monthlyInterest}</p>
                                                    <p className="text-2xl font-bold text-red-600">
                                                        {estimates.monthlyInterest.toFixed(2)} MT
                                                    </p>
                                                </div>
                                                <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
                                                    <p className="text-sm font-semibold text-gray-600 mb-2">{currentTexts.totalInterest}</p>
                                                    <p className="text-2xl font-bold text-red-600">
                                                        {estimates.totalInterest.toFixed(2)} MT
                                                    </p>
                                                </div>
                                                <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 rounded-xl border border-red-600 text-white">
                                                    <p className="text-sm font-semibold mb-2">{currentTexts.maturityAmount}</p>
                                                    <p className="text-2xl font-bold">
                                                        {estimates.maturityAmount.toFixed(2)} MT
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-6">
                            {/* Action Panel */}
                            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 sticky top-6">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <FaPiggyBank className="text-red-600 text-2xl" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">{currentTexts.createSavings}</h2>
                                </div>

                                {selectedTypeData ? (
                                    <div className="space-y-6">
                                        {/* Summary */}
                                        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                                            <h3 className="font-semibold text-gray-900 mb-3">Resumo da Poupança</h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Tipo:</span>
                                                    <span className="font-semibold">{selectedTypeData.name}</span>
                                                </div>
                                                {amount && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Valor:</span>
                                                        <span className="font-semibold">{parseFloat(amount).toFixed(2)} MT</span>
                                                    </div>
                                                )}
                                                {duration && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Duração:</span>
                                                        <span className="font-semibold">{duration} {currentTexts.months}</span>
                                                    </div>
                                                )}
                                                {interestRate && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Juro Anual:</span>
                                                        <span className="font-semibold text-red-600">{interestRate}%</span>
                                                    </div>
                                                )}
                                                {estimates && (
                                                    <div className="flex justify-between border-t border-red-200 pt-2">
                                                        <span className="font-semibold">Total Final:</span>
                                                        <span className="font-bold text-red-600">{estimates.maturityAmount.toFixed(2)} MT</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            onClick={() => setShowConfirmation(true)}
                                            disabled={!isFormValid || isProcessing}
                                            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                        >
                                            {isProcessing ? (
                                                <div className="flex items-center justify-center">
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                    {currentTexts.processing}
                                                </div>
                                            ) : (
                                                currentTexts.continue
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500 py-8">
                                        <FaPiggyBank className="mx-auto text-gray-300 mb-3 text-4xl" />
                                        <p className="font-semibold">{currentTexts.selectType}</p>
                                    </div>
                                )}
                            </div>

                            {/* Recent Savings */}
                            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">{currentTexts.recentSavings}</h2>
                                    <FaHistory className="text-red-500" />
                                </div>

                                {recentSavings.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentSavings.map((saving) => (
                                            <div key={saving.id} className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200">
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-gray-900 truncate">{saving.type}</p>
                                                    <p className="text-sm text-gray-600 truncate">
                                                        {saving.duration} {currentTexts.months} • {saving.interestRate}%
                                                    </p>
                                                </div>
                                                <div className="text-right flex-shrink-0 ml-4">
                                                    <p className="font-bold text-red-600">{saving.amount.toLocaleString()} MT</p>
                                                    <p className="text-xs text-gray-500">{saving.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <FaPiggyBank className="mx-auto text-gray-300 mb-3 text-3xl" />
                                        <p className="text-gray-500">{currentTexts.noRecentSavings}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Confirmation Modal */}
                {showConfirmation && isFormValid && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-red-100">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <FaCheckCircle className="text-red-600 text-2xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentTexts.createSavings}</h3>
                                <p className="text-gray-600">{currentTexts.confirmMessage}</p>
                            </div>

                            <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200">
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tipo de Poupança:</span>
                                        <span className="font-semibold">{selectedTypeData?.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Valor Inicial:</span>
                                        <span className="font-semibold">{parseFloat(amount).toFixed(2)} MT</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Duração:</span>
                                        <span className="font-semibold">{duration} {currentTexts.months}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Taxa de Juro:</span>
                                        <span className="font-semibold text-red-600">{interestRate}%</span>
                                    </div>
                                    {estimates && (
                                        <>
                                            <div className="flex justify-between border-t border-red-200 pt-2">
                                                <span className="font-semibold">Rendimento Total:</span>
                                                <span className="font-semibold text-red-600">{estimates.totalInterest.toFixed(2)} MT</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-bold">Valor Final:</span>
                                                <span className="font-bold text-red-600 text-lg">{estimates.maturityAmount.toFixed(2)} MT</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setShowConfirmation(false)}
                                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors border border-gray-200"
                                >
                                    {currentTexts.cancel}
                                </button>
                                <button
                                    onClick={handleCreateSavings}
                                    disabled={isProcessing}
                                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-colors shadow-lg disabled:opacity-50"
                                >
                                    {isProcessing ? currentTexts.processing : currentTexts.confirm}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ClientLayout>
    );
};

export default ClientSavingsCreate;