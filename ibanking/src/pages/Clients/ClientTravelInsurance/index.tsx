// pages/ClientTravelInsurance.tsx
import React, { useState } from 'react';
import {
    FaPlane,
    FaUmbrellaBeach,
    FaShieldAlt,
    FaHeartbeat,
    FaSuitcase,
    FaGlobeAmericas,
    FaHistory,
    FaCheckCircle,
    FaClock,
    FaUserFriends
} from 'react-icons/fa';
import { ClientLayout } from '../../../components/ClientLayout';

interface ClientTravelInsuranceProps {
    language: 'PT' | 'EN';
}

const ClientTravelInsurance: React.FC<ClientTravelInsuranceProps> = ({ language }) => {
    const [tripType, setTripType] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [travelers, setTravelers] = useState<string>('1');
    const [coverage, setCoverage] = useState<string>('basic');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const currentTexts = {
        PT: {
            title: "Seguro de Viagem",
            subtitle: "Viaje com segurança e tranquilidade",
            tripType: "Tipo de Viagem",
            destination: "Destino",
            dates: "Datas da Viagem",
            startDate: "Data de Ida",
            endDate: "Data de Volta",
            travelers: "Viajantes",
            coverage: "Cobertura",
            totalPrice: "Preço Total",
            createInsurance: "Contratar Seguro",
            processing: "Processando...",
            success: "Seguro contratado com sucesso!",
            recentInsurances: "Seguros Recentes",
            noRecentInsurances: "Nenhum seguro recente",
            continue: "Continuar",
            cancel: "Cancelar",
            confirm: "Confirmar Contratação",
            selectTripType: "Selecione o tipo de viagem",
            enterDestination: "Digite o destino",
            selectDates: "Selecione as datas",
            selectTravelers: "Número de viajantes",
            selectCoverage: "Selecione a cobertura",
            confirmMessage: "Confirme os detalhes do seu seguro",
            leisure: "Lazer/Turismo",
            business: "Negócios",
            student: "Estudo",
            basic: "Básica",
            complete: "Completa",
            premium: "Premium",
            coverageDetails: "Detalhes da Cobertura",
            medicalExpenses: "Despesas Médicas",
            tripCancellation: "Cancelamento de Viagem",
            lostLuggage: "Bagagem Extraviada",
            personalAccident: "Acidente Pessoal",
            travelAssistance: "Assistência em Viagem",
            coverageBasic: "Cobertura essencial para viagens nacionais",
            coverageComplete: "Proteção ampla para viagens internacionais",
            coveragePremium: "Proteção máxima com serviços exclusivos",
            features: "Porque Escolher Nosso Seguro?",
            feature1: "Cobertura Global",
            feature2: "Assistência 24/7",
            feature3: "Processos Rápidos",
            feature4: "Preços Competitivos"
        },
        EN: {
            title: "Travel Insurance",
            subtitle: "Travel with safety and peace of mind",
            tripType: "Trip Type",
            destination: "Destination",
            dates: "Travel Dates",
            startDate: "Departure Date",
            endDate: "Return Date",
            travelers: "Travelers",
            coverage: "Coverage",
            totalPrice: "Total Price",
            createInsurance: "Get Insurance",
            processing: "Processing...",
            success: "Insurance purchased successfully!",
            recentInsurances: "Recent Insurances",
            noRecentInsurances: "No recent insurances",
            continue: "Continue",
            cancel: "Cancel",
            confirm: "Confirm Purchase",
            selectTripType: "Select trip type",
            enterDestination: "Enter destination",
            selectDates: "Select dates",
            selectTravelers: "Number of travelers",
            selectCoverage: "Select coverage",
            confirmMessage: "Confirm your insurance details",
            leisure: "Leisure/Tourism",
            business: "Business",
            student: "Study",
            basic: "Basic",
            complete: "Complete",
            premium: "Premium",
            coverageDetails: "Coverage Details",
            medicalExpenses: "Medical Expenses",
            tripCancellation: "Trip Cancellation",
            lostLuggage: "Lost Luggage",
            personalAccident: "Personal Accident",
            travelAssistance: "Travel Assistance",
            coverageBasic: "Essential coverage for domestic trips",
            coverageComplete: "Comprehensive protection for international trips",
            coveragePremium: "Maximum protection with exclusive services",
            features: "Why Choose Our Insurance?",
            feature1: "Global Coverage",
            feature2: "24/7 Assistance",
            feature3: "Fast Processes",
            feature4: "Competitive Prices"
        }
    }[language];

    const tripTypes = [
        {
            id: 'leisure',
            name: currentTexts.leisure,
            icon: FaUmbrellaBeach,
            description: "Viagens de turismo e lazer"
        },
        {
            id: 'business',
            name: currentTexts.business,
            icon: FaUserFriends,
            description: "Viagens corporativas"
        },
        {
            id: 'student',
            name: currentTexts.student,
            icon: FaClock,
            description: "Intercâmbio e estudos"
        }
    ];

    const coverageOptions = [
        {
            id: 'basic',
            name: currentTexts.basic,
            description: currentTexts.coverageBasic,
            pricePerDay: 2.5,
            features: [
                { name: currentTexts.medicalExpenses, covered: true, limit: "50.000 MT" },
                { name: currentTexts.tripCancellation, covered: true, limit: "25.000 MT" },
                { name: currentTexts.lostLuggage, covered: true, limit: "5.000 MT" },
                { name: currentTexts.personalAccident, covered: false, limit: "-" },
                { name: currentTexts.travelAssistance, covered: false, limit: "-" }
            ]
        },
        {
            id: 'complete',
            name: currentTexts.complete,
            description: currentTexts.coverageComplete,
            pricePerDay: 4.0,
            features: [
                { name: currentTexts.medicalExpenses, covered: true, limit: "100.000 MT" },
                { name: currentTexts.tripCancellation, covered: true, limit: "50.000 MT" },
                { name: currentTexts.lostLuggage, covered: true, limit: "10.000 MT" },
                { name: currentTexts.personalAccident, covered: true, limit: "25.000 MT" },
                { name: currentTexts.travelAssistance, covered: true, limit: "Ilimitada" }
            ]
        },
        {
            id: 'premium',
            name: currentTexts.premium,
            description: currentTexts.coveragePremium,
            pricePerDay: 6.5,
            features: [
                { name: currentTexts.medicalExpenses, covered: true, limit: "250.000 MT" },
                { name: currentTexts.tripCancellation, covered: true, limit: "100.000 MT" },
                { name: currentTexts.lostLuggage, covered: true, limit: "25.000 MT" },
                { name: currentTexts.personalAccident, covered: true, limit: "50.000 MT" },
                { name: currentTexts.travelAssistance, covered: true, limit: "Ilimitada" }
            ]
        }
    ];

    const features = [
        {
            icon: FaGlobeAmericas,
            text: currentTexts.feature1,
            description: "Cobertura em mais de 150 países"
        },
        {
            icon: FaClock,
            text: currentTexts.feature2,
            description: "Suporte emergencial 24 horas"
        },
        {
            icon: FaCheckCircle,
            text: currentTexts.feature3,
            description: "Pagamento em até 48 horas"
        },
        {
            icon: FaShieldAlt,
            text: currentTexts.feature4,
            description: "Melhor custo-benefício do mercado"
        }
    ];

    const recentInsurances = [
        {
            id: 1,
            destination: "Portugal",
            coverage: currentTexts.complete,
            travelers: 2,
            price: 560,
            date: '2024-01-15',
            status: 'Ativo'
        },
        {
            id: 2,
            destination: "África do Sul",
            coverage: currentTexts.basic,
            travelers: 1,
            price: 180,
            date: '2024-01-10',
            status: 'Ativo'
        }
    ];

    const selectedCoverageData = coverageOptions.find(opt => opt.id === coverage);

    // Calcular preço
    const calculatePrice = () => {
        if (!startDate || !endDate || !selectedCoverageData || !travelers) return 0;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

        return days * selectedCoverageData.pricePerDay * parseInt(travelers);
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

    const isFormValid = tripType && destination && startDate && endDate && travelers && coverage;

    return (
        <ClientLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-sm border mb-5 border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <FaPlane size={24} className="text-red-600" />
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

                            {/* Trip Configuration */}
                            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Configurar Sua Viagem
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Trip Type */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            {currentTexts.tripType}
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {tripTypes.map((type) => {
                                                const IconComponent = type.icon;
                                                return (
                                                    <button
                                                        key={type.id}
                                                        onClick={() => setTripType(type.id)}
                                                        className={`flex flex-col items-center space-y-3 p-4 rounded-xl border-2 transition-all duration-300 ${tripType === type.id
                                                            ? 'border-red-500 bg-red-50 shadow-md'
                                                            : 'border-red-100 hover:border-red-300'
                                                            }`}
                                                    >
                                                        <IconComponent className={`text-2xl ${tripType === type.id ? 'text-red-600' : 'text-gray-400'
                                                            }`} />
                                                        <div className="text-center">
                                                            <h3 className="font-semibold text-gray-900">{type.name}</h3>
                                                            <p className="text-xs text-gray-600 mt-1">{type.description}</p>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Destination */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            {currentTexts.destination}
                                        </label>
                                        <input
                                            type="text"
                                            value={destination}
                                            onChange={(e) => setDestination(e.target.value)}
                                            placeholder={currentTexts.enterDestination}
                                            className="w-full px-4 py-3 border-2 border-red-100 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                        />
                                    </div>

                                    {/* Dates */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            {currentTexts.startDate}
                                        </label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-red-100 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            {currentTexts.endDate}
                                        </label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-red-100 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                        />
                                    </div>

                                    {/* Travelers */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            {currentTexts.travelers}
                                        </label>
                                        <select
                                            value={travelers}
                                            onChange={(e) => setTravelers(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-red-100 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                        >
                                            {[1, 2, 3, 4, 5, 6].map(num => (
                                                <option key={num} value={num}>
                                                    {num} {num === 1 ? 'viajante' : 'viajantes'}
                                                </option>
                                            ))}
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
                                                {tripType && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Tipo:</span>
                                                        <span className="font-semibold">
                                                            {tripTypes.find(t => t.id === tripType)?.name}
                                                        </span>
                                                    </div>
                                                )}
                                                {destination && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Destino:</span>
                                                        <span className="font-semibold">{destination}</span>
                                                    </div>
                                                )}
                                                {travelers && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Viajantes:</span>
                                                        <span className="font-semibold">{travelers}</span>
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
                                                    <p className="font-semibold text-gray-900 truncate">{insurance.destination}</p>
                                                    <p className="text-sm text-gray-600 truncate">
                                                        {insurance.coverage} • {insurance.travelers} viajantes
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
                                        <FaPlane className="mx-auto text-gray-300 mb-3 text-3xl" />
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
                                    <div className="bg-red-100 rounded-lg p-3">
                                        <div className="text-2xl font-bold text-red-600">
                                            {option.pricePerDay} MT
                                        </div>
                                        <div className="text-xs text-gray-600">por dia/pessoa</div>
                                    </div>
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
                                        <span className="text-gray-600">Tipo de Viagem:</span>
                                        <span className="font-semibold">
                                            {tripTypes.find(t => t.id === tripType)?.name}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Destino:</span>
                                        <span className="font-semibold">{destination}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Viajantes:</span>
                                        <span className="font-semibold">{travelers}</span>
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

export default ClientTravelInsurance;