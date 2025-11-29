// pages/ClientOtherInsurance.tsx
import React, { useState } from 'react';
import {
    FaHome,
    FaHeartbeat,
    FaUmbrella,
    FaShieldAlt,
    FaHistory,
    FaCheckCircle,
    FaGraduationCap,
    FaMobileAlt,
    FaPaw
} from 'react-icons/fa';
import { ClientLayout } from '../../../components/ClientLayout';

interface ClientOtherInsuranceProps {
    language: 'PT' | 'EN';
}

const ClientOtherInsurance: React.FC<ClientOtherInsuranceProps> = ({ language }) => {
    const [insuranceType, setInsuranceType] = useState<string>('');
    const [coverage, setCoverage] = useState<string>('basic');
    const [customAmount, setCustomAmount] = useState<string>('');
    const [duration, setDuration] = useState<string>('12');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const currentTexts = {
        PT: {
            title: "Outros Seguros",
            subtitle: "Proteção completa para todas as áreas da sua vida",
            insuranceType: "Tipo de Seguro",
            coverage: "Cobertura",
            customAmount: "Valor Segurado",
            duration: "Duração",
            totalPrice: "Prémio Total",
            createInsurance: "Contratar Seguro",
            processing: "Processando...",
            success: "Seguro contratado com sucesso!",
            recentInsurances: "Seguros Recentes",
            noRecentInsurances: "Nenhum seguro recente",
            continue: "Continuar",
            cancel: "Cancelar",
            confirm: "Confirmar Contratação",
            selectInsuranceType: "Selecione o tipo de seguro",
            enterCustomAmount: "Digite o valor segurado",
            selectCoverage: "Selecione a cobertura",
            selectDuration: "Selecione a duração",
            confirmMessage: "Confirme os detalhes do seu seguro",
            health: "Saúde",
            home: "Residência",
            life: "Vida",
            education: "Educação",
            mobile: "Dispositivos",
            pet: "Animal de Estimação",
            basic: "Básica",
            complete: "Completa",
            premium: "Premium",
            coverageDetails: "Detalhes da Cobertura",
            medicalCare: "Assistência Médica",
            hospitalization: "Internação Hospitalar",
            propertyProtection: "Proteção Patrimonial",
            personalAccident: "Acidentes Pessoais",
            legalAssistance: "Assistência Jurídica",
            features: "Tipos de Seguro Disponíveis",
            feature1: "Seguro Saúde",
            feature2: "Seguro Residência",
            feature3: "Seguro Vida",
            feature4: "Seguros Especiais",
            months: "meses"
        },
        EN: {
            title: "Other Insurances",
            subtitle: "Complete protection for all areas of your life",
            insuranceType: "Insurance Type",
            coverage: "Coverage",
            customAmount: "Insured Amount",
            duration: "Duration",
            totalPrice: "Total Premium",
            createInsurance: "Get Insurance",
            processing: "Processing...",
            success: "Insurance purchased successfully!",
            recentInsurances: "Recent Insurances",
            noRecentInsurances: "No recent insurances",
            continue: "Continue",
            cancel: "Cancel",
            confirm: "Confirm Purchase",
            selectInsuranceType: "Select insurance type",
            enterCustomAmount: "Enter insured amount",
            selectCoverage: "Select coverage",
            selectDuration: "Select duration",
            confirmMessage: "Confirm your insurance details",
            health: "Health",
            home: "Home",
            life: "Life",
            education: "Education",
            mobile: "Devices",
            pet: "Pet",
            basic: "Basic",
            complete: "Complete",
            premium: "Premium",
            coverageDetails: "Coverage Details",
            medicalCare: "Medical Care",
            hospitalization: "Hospitalization",
            propertyProtection: "Property Protection",
            personalAccident: "Personal Accidents",
            legalAssistance: "Legal Assistance",
            features: "Available Insurance Types",
            feature1: "Health Insurance",
            feature2: "Home Insurance",
            feature3: "Life Insurance",
            feature4: "Special Insurances",
            months: "months"
        }
    }[language];

    const insuranceTypes = [
        {
            id: 'health',
            name: currentTexts.health,
            icon: FaHeartbeat,
            description: "Cobertura médica e hospitalar",
            baseRate: 0.02
        },
        {
            id: 'home',
            name: currentTexts.home,
            icon: FaHome,
            description: "Proteção para sua residência",
            baseRate: 0.015
        },
        {
            id: 'life',
            name: currentTexts.life,
            icon: FaUmbrella,
            description: "Proteção financeira para sua família",
            baseRate: 0.025
        },
        {
            id: 'education',
            name: currentTexts.education,
            icon: FaGraduationCap,
            description: "Garantia de estudos",
            baseRate: 0.018
        },
        {
            id: 'mobile',
            name: currentTexts.mobile,
            icon: FaMobileAlt,
            description: "Proteção para dispositivos",
            baseRate: 0.08
        },
        {
            id: 'pet',
            name: currentTexts.pet,
            icon: FaPaw,
            description: "Cuidados veterinários",
            baseRate: 0.12
        }
    ];

    const coverageOptions = [
        {
            id: 'basic',
            name: currentTexts.basic,
            multiplier: 1.0,
            features: [
                { name: currentTexts.medicalCare, covered: true },
                { name: currentTexts.hospitalization, covered: true },
                { name: currentTexts.propertyProtection, covered: false },
                { name: currentTexts.personalAccident, covered: false },
                { name: currentTexts.legalAssistance, covered: false }
            ]
        },
        {
            id: 'complete',
            name: currentTexts.complete,
            multiplier: 1.8,
            features: [
                { name: currentTexts.medicalCare, covered: true },
                { name: currentTexts.hospitalization, covered: true },
                { name: currentTexts.propertyProtection, covered: true },
                { name: currentTexts.personalAccident, covered: true },
                { name: currentTexts.legalAssistance, covered: false }
            ]
        },
        {
            id: 'premium',
            name: currentTexts.premium,
            multiplier: 2.5,
            features: [
                { name: currentTexts.medicalCare, covered: true },
                { name: currentTexts.hospitalization, covered: true },
                { name: currentTexts.propertyProtection, covered: true },
                { name: currentTexts.personalAccident, covered: true },
                { name: currentTexts.legalAssistance, covered: true }
            ]
        }
    ];

    const recentInsurances = [
        {
            id: 1,
            type: currentTexts.health,
            coverage: currentTexts.complete,
            amount: 500000,
            price: 9000,
            date: '2024-01-15',
            status: 'Ativo'
        },
        {
            id: 2,
            type: currentTexts.home,
            coverage: currentTexts.basic,
            amount: 1000000,
            price: 15000,
            date: '2024-01-10',
            status: 'Ativo'
        }
    ];

    const selectedInsuranceData = insuranceTypes.find(t => t.id === insuranceType);
    const selectedCoverageData = coverageOptions.find(opt => opt.id === coverage);

    // Calcular preço
    const calculatePrice = () => {
        if (!customAmount || !selectedInsuranceData || !selectedCoverageData || !duration) return 0;

        const amount = parseFloat(customAmount);
        const basePremium = amount * selectedInsuranceData.baseRate;
        const coveragePremium = basePremium * selectedCoverageData.multiplier;
        const durationMultiplier = parseInt(duration) / 12;

        return coveragePremium * durationMultiplier;
    };

    const totalPrice = calculatePrice();

    const handleCreateInsurance = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setShowConfirmation(false);
            alert(currentTexts.success);
        }, 2000);
    };

    const isFormValid = insuranceType && customAmount && coverage && duration;

    return (
        <ClientLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-sm border mb-5 border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <FaShieldAlt size={24} className="text-red-600" />
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
                            {/* Insurance Types */}
                            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    {currentTexts.features}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {insuranceTypes.map((type) => {
                                        const IconComponent = type.icon;
                                        return (
                                            <button
                                                key={type.id}
                                                onClick={() => setInsuranceType(type.id)}
                                                className={`flex flex-col items-center space-y-3 p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${insuranceType === type.id
                                                        ? 'border-red-500 bg-red-50 shadow-md'
                                                        : 'border-red-100 hover:border-red-300'
                                                    }`}
                                            >
                                                <IconComponent className={`text-2xl ${insuranceType === type.id ? 'text-red-600' : 'text-gray-400'
                                                    }`} />
                                                <div className="text-center">
                                                    <h3 className="font-semibold text-gray-900 text-sm">{type.name}</h3>
                                                    <p className="text-xs text-gray-600 mt-1">{type.description}</p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Insurance Configuration */}
                            {selectedInsuranceData && (
                                <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Configurar {selectedInsuranceData.name}
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Custom Amount */}
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                {currentTexts.customAmount} (MT)
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={customAmount}
                                                    onChange={(e) => setCustomAmount(e.target.value)}
                                                    placeholder={currentTexts.enterCustomAmount}
                                                    className="w-full px-4 py-3 border-2 border-red-100 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-lg font-semibold"
                                                    min="1000"
                                                />
                                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                    <span className="text-red-600 font-semibold">MT</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Duration */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                {currentTexts.duration}
                                            </label>
                                            <select
                                                value={duration}
                                                onChange={(e) => setDuration(e.target.value)}
                                                className="w-full px-4 py-3 border-2 border-red-100 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                            >
                                                <option value="12">12 {currentTexts.months}</option>
                                                <option value="6">6 {currentTexts.months}</option>
                                                <option value="3">3 {currentTexts.months}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Coverage Options */}
                            {selectedInsuranceData && (
                                <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        {currentTexts.coverage}
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {coverageOptions.map((option) => (
                                            <div
                                                key={option.id}
                                                className={`rounded-xl border-2 p-6 transition-all duration-300 cursor-pointer transform hover:scale-105 ${coverage === option.id
                                                        ? 'border-red-500 bg-red-50 shadow-lg'
                                                        : 'border-red-100 hover:border-red-300'
                                                    }`}
                                                onClick={() => setCoverage(option.id)}
                                            >
                                                <div className="text-center mb-4">
                                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{option.name}</h3>
                                                    {customAmount && (
                                                        <div className="bg-red-100 rounded-lg p-3">
                                                            <div className="text-lg font-bold text-red-600">
                                                                {((parseFloat(customAmount) * selectedInsuranceData.baseRate * option.multiplier) / 12).toFixed(2)} MT
                                                            </div>
                                                            <div className="text-xs text-gray-600">por mês</div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    {option.features.map((feature, index) => (
                                                        <div key={index} className="flex items-center text-sm">
                                                            {feature.covered ? (
                                                                <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                                                            ) : (
                                                                <div className="w-4 h-4 border border-gray-300 rounded mr-2 flex-shrink-0" />
                                                            )}
                                                            <span className={feature.covered ? 'text-gray-700' : 'text-gray-400'}>
                                                                {feature.name}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-6">
                            {/* Action Panel */}
                            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 sticky top-6">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <FaShieldAlt className="text-red-600 text-2xl" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">{currentTexts.createInsurance}</h2>
                                </div>

                                {coverage ? (
                                    <div className="space-y-6">
                                        {/* Summary */}
                                        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                                            <h3 className="font-semibold text-gray-900 mb-3">Resumo do Seguro</h3>
                                            <div className="space-y-2 text-sm">
                                                {insuranceType && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Tipo:</span>
                                                        <span className="font-semibold">
                                                            {insuranceTypes.find(t => t.id === insuranceType)?.name}
                                                        </span>
                                                    </div>
                                                )}
                                                {customAmount && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Valor Segurado:</span>
                                                        <span className="font-semibold">{parseFloat(customAmount).toLocaleString()} MT</span>
                                                    </div>
                                                )}
                                                {duration && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Duração:</span>
                                                        <span className="font-semibold">{duration} {currentTexts.months}</span>
                                                    </div>
                                                )}
                                                {selectedCoverageData && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Cobertura:</span>
                                                        <span className="font-semibold text-red-600">{selectedCoverageData.name}</span>
                                                    </div>
                                                )}
                                                {totalPrice > 0 && (
                                                    <div className="flex justify-between border-t border-red-200 pt-2">
                                                        <span className="font-bold">{currentTexts.totalPrice}:</span>
                                                        <span className="font-bold text-red-600 text-lg">{totalPrice.toFixed(2)} MT</span>
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
                                        <FaShieldAlt className="mx-auto text-gray-300 mb-3 text-4xl" />
                                        <p className="font-semibold">Selecione uma cobertura</p>
                                    </div>
                                )}
                            </div>

                            {/* Recent Insurances */}
                            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">{currentTexts.recentInsurances}</h2>
                                    <FaHistory className="text-red-500" />
                                </div>

                                {recentInsurances.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentInsurances.map((insurance) => (
                                            <div key={insurance.id} className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200">
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-gray-900 truncate">{insurance.type}</p>
                                                    <p className="text-sm text-gray-600 truncate">
                                                        {insurance.coverage} • {insurance.amount.toLocaleString()} MT
                                                    </p>
                                                </div>
                                                <div className="text-right flex-shrink-0 ml-4">
                                                    <p className="font-bold text-red-600">{insurance.price} MT</p>
                                                    <p className="text-xs text-gray-500">{insurance.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <FaShieldAlt className="mx-auto text-gray-300 mb-3 text-3xl" />
                                        <p className="text-gray-500">{currentTexts.noRecentInsurances}</p>
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
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentTexts.createInsurance}</h3>
                                <p className="text-gray-600">{currentTexts.confirmMessage}</p>
                            </div>

                            <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200">
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tipo de Seguro:</span>
                                        <span className="font-semibold">
                                            {insuranceTypes.find(t => t.id === insuranceType)?.name}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Valor Segurado:</span>
                                        <span className="font-semibold">{parseFloat(customAmount).toLocaleString()} MT</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Duração:</span>
                                        <span className="font-semibold">{duration} {currentTexts.months}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Cobertura:</span>
                                        <span className="font-semibold text-red-600">{selectedCoverageData?.name}</span>
                                    </div>
                                    {totalPrice > 0 && (
                                        <div className="flex justify-between border-t border-red-200 pt-2">
                                            <span className="font-bold">{currentTexts.totalPrice}:</span>
                                            <span className="font-bold text-red-600 text-lg">{totalPrice.toFixed(2)} MT</span>
                                        </div>
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
                                    onClick={handleCreateInsurance}
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

export default ClientOtherInsurance;