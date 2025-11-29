// pages/ClientFixedDeposit.tsx
import React, { useState } from 'react';
import {
    FaCalendarAlt,
    FaCalculator,
    FaChartLine,
    FaHistory,
    FaCheckCircle,
    FaRocket,
    FaCoins
} from 'react-icons/fa';
import { ClientLayout } from '../../../components/ClientLayout';

interface ClientFixedDepositProps {
    language: 'PT' | 'EN';
}

const ClientFixedDeposit: React.FC<ClientFixedDepositProps> = ({ language }) => {
    const [depositAmount, setDepositAmount] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [interestPayout, setInterestPayout] = useState<string>('monthly');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const currentTexts = {
        PT: {
            title: "Depósito a Prazo Fixo",
            subtitle: "Maximize seus rendimentos com segurança total",
            depositAmount: "Valor do Depósito",
            duration: "Prazo do Depósito",
            interestPayout: "Pagamento de Juros",
            interestRate: "Taxa de Juro Anual",
            estimatedEarnings: "Rendimento Total",
            totalAmount: "Valor no Vencimento",
            createDeposit: "Aplicar Agora",
            processing: "Processando...",
            success: "Depósito criado com sucesso!",
            recentDeposits: "Seus Depósitos",
            noRecentDeposits: "Nenhum depósito ativo",
            continue: "Continuar",
            cancel: "Cancelar",
            confirm: "Confirmar Aplicação",
            enterAmount: "Digite o valor",
            selectDuration: "Selecione o prazo",
            selectPayout: "Forma de pagamento",
            confirmMessage: "Confirme os detalhes do seu depósito",
            monthly: "Mensal",
            quarterly: "Trimestral",
            atMaturity: "No Vencimento",
            months: "meses",
            minAmount: "Valor mínimo: 5.000 MT",
            features: "Vantagens Exclusivas",
            feature1: "Taxas Premium",
            feature2: "Capital 100% Seguro",
            feature3: "Rentabilidade Garantida",
            feature4: "Flexibilidade Total"
        },
        EN: {
            title: "Fixed Deposit",
            subtitle: "Maximize your earnings with total security",
            depositAmount: "Deposit Amount",
            duration: "Deposit Term",
            interestPayout: "Interest Payout",
            interestRate: "Annual Interest Rate",
            estimatedEarnings: "Total Earnings",
            totalAmount: "Amount at Maturity",
            createDeposit: "Apply Now",
            processing: "Processing...",
            success: "Deposit created successfully!",
            recentDeposits: "Your Deposits",
            noRecentDeposits: "No active deposits",
            continue: "Continue",
            cancel: "Cancel",
            confirm: "Confirm Application",
            enterAmount: "Enter amount",
            selectDuration: "Select term",
            selectPayout: "Payout method",
            confirmMessage: "Confirm your deposit details",
            monthly: "Monthly",
            quarterly: "Quarterly",
            atMaturity: "At Maturity",
            months: "months",
            minAmount: "Minimum amount: 5,000 MT",
            features: "Exclusive Advantages",
            feature1: "Premium Rates",
            feature2: "100% Secure Capital",
            feature3: "Guaranteed Returns",
            feature4: "Total Flexibility"
        }
    }[language];

    const durationOptions = [
        { value: '3', label: `3 ${currentTexts.months}`, rate: '5.5', premium: false },
        { value: '6', label: `6 ${currentTexts.months}`, rate: '6.0', premium: false },
        { value: '12', label: `12 ${currentTexts.months}`, rate: '6.5', premium: true },
        { value: '24', label: `24 ${currentTexts.months}`, rate: '7.0', premium: true },
        { value: '36', label: `36 ${currentTexts.months}`, rate: '7.5', premium: true }
    ];

    const payoutOptions = [
        { value: 'monthly', label: currentTexts.monthly, icon: FaCalendarAlt },
        { value: 'quarterly', label: currentTexts.quarterly, icon: FaCoins },
        { value: 'atMaturity', label: currentTexts.atMaturity, icon: FaChartLine }
    ];

    const features = [
        {
            icon: FaRocket,
            text: currentTexts.feature1,
            description: "As melhores taxas do mercado"
        },
        {
            icon: FaRocket,
            text: currentTexts.feature2,
            description: "Proteção total do seu investimento"
        },
        {
            icon: FaCalculator,
            text: currentTexts.feature3,
            description: "Retornos calculados e garantidos"
        },
        {
            icon: FaChartLine,
            text: currentTexts.feature4,
            description: "Diversas opções de prazo"
        }
    ];

    const recentDeposits = [
        {
            id: 1,
            amount: 25000,
            duration: '12',
            interestRate: '6.5',
            payout: currentTexts.monthly,
            date: '2024-01-15',
            status: 'Ativo'
        },
        {
            id: 2,
            amount: 50000,
            duration: '24',
            interestRate: '7.0',
            payout: currentTexts.quarterly,
            date: '2024-01-10',
            status: 'Ativo'
        }
    ];

    const selectedDurationData = durationOptions.find(opt => opt.value === duration);

    // Calcular estimativas
    const calculateEstimates = () => {
        if (!depositAmount || !duration || !selectedDurationData) return null;

        const principal = parseFloat(depositAmount);
        const annualRate = parseFloat(selectedDurationData.rate) / 100;
        const months = parseInt(duration);
        const years = months / 12;

        const totalInterest = principal * annualRate * years;
        const totalAmount = principal + totalInterest;

        return {
            totalInterest,
            totalAmount,
            monthlyInterest: totalInterest / months
        };
    };

    const estimates = calculateEstimates();

    const handleCreateDeposit = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setShowConfirmation(false);
            alert(currentTexts.success);
        }, 2000);
    };

    const isFormValid = depositAmount && duration && interestPayout && parseFloat(depositAmount) >= 5000;

    return (
        <ClientLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-sm border mb-5 border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <FaChartLine size={24} className="text-red-600" />
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

                            {/* Deposit Configuration */}
                            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Configurar Depósito
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Deposit Amount */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            {currentTexts.depositAmount} (MT)
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={depositAmount}
                                                onChange={(e) => setDepositAmount(e.target.value)}
                                                placeholder={currentTexts.enterAmount}
                                                className="w-full px-4 py-3 border-2 border-red-100 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-lg font-semibold"
                                                min="5000"
                                            />
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                <span className="text-red-600 font-semibold">MT</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-red-600 font-medium mt-2">
                                            {currentTexts.minAmount}
                                        </p>
                                    </div>

                                    {/* Duration Options */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            {currentTexts.duration}
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                            {durationOptions.map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => setDuration(option.value)}
                                                    className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${duration === option.value
                                                            ? 'border-red-500 bg-red-50 shadow-md'
                                                            : 'border-red-100 hover:border-red-300'
                                                        } ${option.premium ? 'relative overflow-hidden' : ''}`}
                                                >
                                                    {option.premium && (
                                                        <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                                                            ★
                                                        </div>
                                                    )}
                                                    <div className="text-center">
                                                        <div className="text-lg font-bold text-red-600 mb-1">
                                                            {option.rate}%
                                                        </div>
                                                        <div className="text-sm font-semibold text-gray-900">
                                                            {option.label}
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Interest Payout */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            {currentTexts.interestPayout}
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            {payoutOptions.map((option) => {
                                                const IconComponent = option.icon;
                                                return (
                                                    <button
                                                        key={option.value}
                                                        onClick={() => setInterestPayout(option.value)}
                                                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${interestPayout === option.value
                                                                ? 'border-red-500 bg-red-50 shadow-md'
                                                                : 'border-red-100 hover:border-red-300'
                                                            }`}
                                                    >
                                                        <div className="flex items-center space-x-3">
                                                            <IconComponent className={`text-lg ${interestPayout === option.value ? 'text-red-600' : 'text-gray-400'
                                                                }`} />
                                                            <span className={`font-semibold ${interestPayout === option.value ? 'text-red-600' : 'text-gray-600'
                                                                }`}>
                                                                {option.label}
                                                            </span>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Selected Rate Display */}
                                {selectedDurationData && (
                                    <div className="mt-6 p-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl text-white">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm opacity-90">Taxa de Juro Anual Selecionada</p>
                                                <p className="text-2xl font-bold">{selectedDurationData.rate}%</p>
                                            </div>
                                            <FaChartLine className="text-2xl opacity-90" />
                                        </div>
                                    </div>
                                )}

                                {/* Estimates */}
                                {estimates && (
                                    <div className="mt-8 pt-6 border-t border-red-100">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Projeção do Investimento</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
                                                <p className="text-sm font-semibold text-gray-600 mb-2">{currentTexts.estimatedEarnings}</p>
                                                <p className="text-2xl font-bold text-red-600">
                                                    {estimates.totalInterest.toFixed(2)} MT
                                                </p>
                                                <p className="text-xs text-gray-600 mt-1">Rendimento total do período</p>
                                            </div>
                                            <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 rounded-xl border border-red-600 text-white">
                                                <p className="text-sm font-semibold mb-2">{currentTexts.totalAmount}</p>
                                                <p className="text-2xl font-bold">
                                                    {estimates.totalAmount.toFixed(2)} MT
                                                </p>
                                                <p className="text-xs opacity-90 mt-1">Capital + Rendimentos</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-6">
                            {/* Action Panel */}
                            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 sticky top-6">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <FaChartLine className="text-red-600 text-2xl" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">{currentTexts.createDeposit}</h2>
                                </div>

                                {duration ? (
                                    <div className="space-y-6">
                                        {/* Summary */}
                                        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                                            <h3 className="font-semibold text-gray-900 mb-3">Resumo do Depósito</h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Prazo:</span>
                                                    <span className="font-semibold">{selectedDurationData?.label}</span>
                                                </div>
                                                {depositAmount && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Valor:</span>
                                                        <span className="font-semibold">{parseFloat(depositAmount).toFixed(2)} MT</span>
                                                    </div>
                                                )}
                                                {interestPayout && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Pagamento:</span>
                                                        <span className="font-semibold">
                                                            {payoutOptions.find(opt => opt.value === interestPayout)?.label}
                                                        </span>
                                                    </div>
                                                )}
                                                {selectedDurationData && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Taxa Anual:</span>
                                                        <span className="font-semibold text-red-600">{selectedDurationData.rate}%</span>
                                                    </div>
                                                )}
                                                {estimates && (
                                                    <div className="flex justify-between border-t border-red-200 pt-2">
                                                        <span className="font-semibold">Total Final:</span>
                                                        <span className="font-bold text-red-600">{estimates.totalAmount.toFixed(2)} MT</span>
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
                                        <FaCalendarAlt className="mx-auto text-gray-300 mb-3 text-4xl" />
                                        <p className="font-semibold">Selecione um prazo</p>
                                    </div>
                                )}
                            </div>

                            {/* Recent Deposits */}
                            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">{currentTexts.recentDeposits}</h2>
                                    <FaHistory className="text-red-500" />
                                </div>

                                {recentDeposits.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentDeposits.map((deposit) => (
                                            <div key={deposit.id} className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200">
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-gray-900 truncate">
                                                        {deposit.duration} {currentTexts.months} • {deposit.interestRate}%
                                                    </p>
                                                    <p className="text-sm text-gray-600 truncate">
                                                        {deposit.payout}
                                                    </p>
                                                </div>
                                                <div className="text-right flex-shrink-0 ml-4">
                                                    <p className="font-bold text-red-600">{deposit.amount.toLocaleString()} MT</p>
                                                    <p className="text-xs text-gray-500">{deposit.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <FaChartLine className="mx-auto text-gray-300 mb-3 text-3xl" />
                                        <p className="text-gray-500">{currentTexts.noRecentDeposits}</p>
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
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentTexts.createDeposit}</h3>
                                <p className="text-gray-600">{currentTexts.confirmMessage}</p>
                            </div>

                            <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200">
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Prazo:</span>
                                        <span className="font-semibold">{selectedDurationData?.label}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Valor Aplicado:</span>
                                        <span className="font-semibold">{parseFloat(depositAmount).toFixed(2)} MT</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Pagamento de Juros:</span>
                                        <span className="font-semibold">
                                            {payoutOptions.find(opt => opt.value === interestPayout)?.label}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Taxa Anual:</span>
                                        <span className="font-semibold text-red-600">{selectedDurationData?.rate}%</span>
                                    </div>
                                    {estimates && (
                                        <>
                                            <div className="flex justify-between border-t border-red-200 pt-2">
                                                <span className="font-semibold">Rendimento Total:</span>
                                                <span className="font-semibold text-red-600">{estimates.totalInterest.toFixed(2)} MT</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-bold">Valor Final:</span>
                                                <span className="font-bold text-red-600 text-lg">{estimates.totalAmount.toFixed(2)} MT</span>
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
                                    onClick={handleCreateDeposit}
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

export default ClientFixedDeposit;