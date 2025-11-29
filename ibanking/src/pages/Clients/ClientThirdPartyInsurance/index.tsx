// pages/ClientThirdPartyInsurance.tsx
import React, { useState } from 'react';
import {
    FaCar,
    FaShieldAlt,
    FaUserFriends,
    FaFileContract,
    FaHistory,
    FaCheckCircle,
    FaBalanceScale,
    FaUmbrella
} from 'react-icons/fa';
import { ClientLayout } from '../../../components/ClientLayout';

interface ClientThirdPartyInsuranceProps {
    language: 'PT' | 'EN';
}

const ClientThirdPartyInsurance: React.FC<ClientThirdPartyInsuranceProps> = ({ language }) => {
    const [vehicleType, setVehicleType] = useState<string>('');
    const [vehicleValue, setVehicleValue] = useState<string>('');
    const [coverage, setCoverage] = useState<string>('basic');
    const [duration, setDuration] = useState<string>('12');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const currentTexts = {
        PT: {
            title: "Seguro de Terceiros",
            subtitle: "Proteção essencial para você e outros",
            vehicleType: "Tipo de Veículo",
            vehicleValue: "Valor do Veículo",
            coverage: "Cobertura",
            duration: "Duração do Seguro",
            totalPrice: "Prémio Total",
            createInsurance: "Contratar Seguro",
            processing: "Processando...",
            success: "Seguro contratado com sucesso!",
            recentInsurances: "Seguros Recentes",
            noRecentInsurances: "Nenhum seguro recente",
            continue: "Continuar",
            cancel: "Cancelar",
            confirm: "Confirmar Contratação",
            selectVehicleType: "Selecione o tipo de veículo",
            enterVehicleValue: "Digite o valor do veículo",
            selectCoverage: "Selecione a cobertura",
            selectDuration: "Selecione a duração",
            confirmMessage: "Confirme os detalhes do seu seguro",
            car: "Automóvel",
            motorcycle: "Motocicleta",
            truck: "Caminhão",
            basic: "Básica",
            complete: "Completa",
            premium: "Premium",
            coverageDetails: "Detalhes da Cobertura",
            thirdPartyLiability: "Responsabilidade Civil",
            personalAccident: "Acidentes Pessoais",
            legalAssistance: "Assistência Jurídica",
            medicalExpenses: "Despesas Médicas",
            propertyDamage: "Danos Materiais",
            coverageBasic: "Cobertura mínima obrigatória",
            coverageComplete: "Proteção ampla para maior segurança",
            coveragePremium: "Proteção máxima com serviços adicionais",
            features: "Vantagens do Seguro",
            feature1: "Obrigatório por Lei",
            feature2: "Proteção Financeira",
            feature3: "Assistência Jurídica",
            feature4: "Cobertura Nacional",
            months: "meses"
        },
        EN: {
            title: "Third Party Insurance",
            subtitle: "Essential protection for you and others",
            vehicleType: "Vehicle Type",
            vehicleValue: "Vehicle Value",
            coverage: "Coverage",
            duration: "Insurance Duration",
            totalPrice: "Total Premium",
            createInsurance: "Get Insurance",
            processing: "Processing...",
            success: "Insurance purchased successfully!",
            recentInsurances: "Recent Insurances",
            noRecentInsurances: "No recent insurances",
            continue: "Continue",
            cancel: "Cancel",
            confirm: "Confirm Purchase",
            selectVehicleType: "Select vehicle type",
            enterVehicleValue: "Enter vehicle value",
            selectCoverage: "Select coverage",
            selectDuration: "Select duration",
            confirmMessage: "Confirm your insurance details",
            car: "Car",
            motorcycle: "Motorcycle",
            truck: "Truck",
            basic: "Basic",
            complete: "Complete",
            premium: "Premium",
            coverageDetails: "Coverage Details",
            thirdPartyLiability: "Third Party Liability",
            personalAccident: "Personal Accidents",
            legalAssistance: "Legal Assistance",
            medicalExpenses: "Medical Expenses",
            propertyDamage: "Property Damage",
            coverageBasic: "Minimum mandatory coverage",
            coverageComplete: "Comprehensive protection for greater safety",
            coveragePremium: "Maximum protection with additional services",
            features: "Insurance Advantages",
            feature1: "Mandatory by Law",
            feature2: "Financial Protection",
            feature3: "Legal Assistance",
            feature4: "National Coverage",
            months: "months"
        }
    }[language];

    const vehicleTypes = [
        {
            id: 'car',
            name: currentTexts.car,
            icon: FaCar,
            baseRate: 0.03
        },
        {
            id: 'motorcycle',
            name: currentTexts.motorcycle,
            icon: FaCar,
            baseRate: 0.02
        },
        {
            id: 'truck',
            name: currentTexts.truck,
            icon: FaCar,
            baseRate: 0.05
        }
    ];

    const coverageOptions = [
        {
            id: 'basic',
            name: currentTexts.basic,
            description: currentTexts.coverageBasic,
            multiplier: 1.0,
            features: [
                { name: currentTexts.thirdPartyLiability, covered: true, limit: "1.000.000 MT" },
                { name: currentTexts.personalAccident, covered: true, limit: "100.000 MT" },
                { name: currentTexts.legalAssistance, covered: false, limit: "-" },
                { name: currentTexts.medicalExpenses, covered: false, limit: "-" },
                { name: currentTexts.propertyDamage, covered: false, limit: "-" }
            ]
        },
        {
            id: 'complete',
            name: currentTexts.complete,
            description: currentTexts.coverageComplete,
            multiplier: 1.5,
            features: [
                { name: currentTexts.thirdPartyLiability, covered: true, limit: "2.000.000 MT" },
                { name: currentTexts.personalAccident, covered: true, limit: "200.000 MT" },
                { name: currentTexts.legalAssistance, covered: true, limit: "500.000 MT" },
                { name: currentTexts.medicalExpenses, covered: true, limit: "100.000 MT" },
                { name: currentTexts.propertyDamage, covered: false, limit: "-" }
            ]
        },
        {
            id: 'premium',
            name: currentTexts.premium,
            description: currentTexts.coveragePremium,
            multiplier: 2.0,
            features: [
                { name: currentTexts.thirdPartyLiability, covered: true, limit: "5.000.000 MT" },
                { name: currentTexts.personalAccident, covered: true, limit: "500.000 MT" },
                { name: currentTexts.legalAssistance, covered: true, limit: "1.000.000 MT" },
                { name: currentTexts.medicalExpenses, covered: true, limit: "250.000 MT" },
                { name: currentTexts.propertyDamage, covered: true, limit: "500.000 MT" }
            ]
        }
    ];

    const features = [
        {
            icon: FaFileContract,
            text: currentTexts.feature1,
            description: "Atende aos requisitos legais"
        },
        {
            icon: FaUmbrella,
            text: currentTexts.feature2,
            description: "Protege seu patrimônio"
        },
        {
            icon: FaBalanceScale,
            text: currentTexts.feature3,
            description: "Suporte jurídico especializado"
        },
        {
            icon: FaShieldAlt,
            text: currentTexts.feature4,
            description: "Válido em todo o território nacional"
        }
    ];

    const recentInsurances = [
        {
            id: 1,
            vehicleType: currentTexts.car,
            coverage: currentTexts.complete,
            value: 350000,
            price: 15750,
            date: '2024-01-15',
            status: 'Ativo'
        },
        {
            id: 2,
            vehicleType: currentTexts.motorcycle,
            coverage: currentTexts.basic,
            value: 80000,
            price: 1600,
            date: '2024-01-10',
            status: 'Ativo'
        }
    ];

    const selectedVehicleData = vehicleTypes.find(v => v.id === vehicleType);
    const selectedCoverageData = coverageOptions.find(opt => opt.id === coverage);

    // Calcular preço
    const calculatePrice = () => {
        if (!vehicleValue || !selectedVehicleData || !selectedCoverageData || !duration) return 0;

        const value = parseFloat(vehicleValue);
        const basePremium = value * selectedVehicleData.baseRate;
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

    const isFormValid = vehicleType && vehicleValue && coverage && duration;

    return (
        <ClientLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-sm border mb-5 border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <FaUserFriends size={24} className="text-red-600" />
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

                            {/* Vehicle Configuration */}
                            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Dados do Veículo
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Vehicle Type */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            {currentTexts.vehicleType}
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {vehicleTypes.map((type) => {
                                                const IconComponent = type.icon;
                                                return (
                                                    <button
                                                        key={type.id}
                                                        onClick={() => setVehicleType(type.id)}
                                                        className={`flex flex-col items-center space-y-3 p-4 rounded-xl border-2 transition-all duration-300 ${vehicleType === type.id
                                                            ? 'border-red-500 bg-red-50 shadow-md'
                                                            : 'border-red-100 hover:border-red-300'
                                                            }`}
                                                    >
                                                        <IconComponent className={`text-2xl ${vehicleType === type.id ? 'text-red-600' : 'text-gray-400'
                                                            }`} />
                                                        <div className="text-center">
                                                            <h3 className="font-semibold text-gray-900">{type.name}</h3>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Vehicle Value */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            {currentTexts.vehicleValue} (MT)
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={vehicleValue}
                                                onChange={(e) => setVehicleValue(e.target.value)}
                                                placeholder={currentTexts.enterVehicleValue}
                                                className="w-full px-4 py-3 border-2 border-red-100 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-lg font-semibold"
                                                min="10000"
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
                                                {vehicleType && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Veículo:</span>
                                                        <span className="font-semibold">
                                                            {vehicleTypes.find(v => v.id === vehicleType)?.name}
                                                        </span>
                                                    </div>
                                                )}
                                                {vehicleValue && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Valor:</span>
                                                        <span className="font-semibold">{parseFloat(vehicleValue).toLocaleString()} MT</span>
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
                                                    <p className="font-semibold text-gray-900 truncate">{insurance.vehicleType}</p>
                                                    <p className="text-sm text-gray-600 truncate">
                                                        {insurance.coverage} • {insurance.value.toLocaleString()} MT
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
                                        <FaCar className="mx-auto text-gray-300 mb-3 text-3xl" />
                                        <p className="text-gray-500">{currentTexts.noRecentInsurances}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Coverage Options */}
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
                                    <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                                    {vehicleValue && selectedVehicleData && (
                                        <div className="bg-red-100 rounded-lg p-3">
                                            <div className="text-lg font-bold text-red-600">
                                                {((parseFloat(vehicleValue) * selectedVehicleData.baseRate * option.multiplier) / 12).toFixed(2)} MT
                                            </div>
                                            <div className="text-xs text-gray-600">por mês</div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    {option.features.map((feature, index) => (
                                        <div key={index} className="flex items-center justify-between text-sm">
                                            <span className={`${feature.covered ? 'text-gray-700' : 'text-gray-400'}`}>
                                                {feature.name}
                                            </span>
                                            <span className={`font-semibold ${feature.covered ? 'text-red-600' : 'text-gray-400'
                                                }`}>
                                                {feature.limit}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
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
                                        <span className="text-gray-600">Tipo de Veículo:</span>
                                        <span className="font-semibold">
                                            {vehicleTypes.find(v => v.id === vehicleType)?.name}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Valor do Veículo:</span>
                                        <span className="font-semibold">{parseFloat(vehicleValue).toLocaleString()} MT</span>
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

export default ClientThirdPartyInsurance;