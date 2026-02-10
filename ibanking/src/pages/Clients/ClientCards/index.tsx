// pages/ClientCards.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiCreditCard1, CiCalendar, CiLock } from "react-icons/ci";
import { ClientLayout } from '../../../components/ClientLayout';

interface ClientCardsProps {
    language: 'PT' | 'EN';
}

const ClientCards: React.FC<ClientCardsProps> = ({ language }) => {
    const navigate = useNavigate();
    const [selectedCardType, setSelectedCardType] = useState<string>('');
    const [currentStep, setCurrentStep] = useState<'selection' | 'form' | 'success'>('selection');
    const [formData, setFormData] = useState({
        cardDesign: 'standard',
        deliveryOption: 'branch',
        pinOption: 'email',
        contactless: true,
        onlinePurchases: true,
        atmWithdrawals: true,
        termsAccepted: false
    });

    const currentTexts = {
        PT: {
            selectCardType: 'Selecione o Tipo de Cartão',
            cardDesign: 'Design do Cartão',
            deliveryOptions: 'Opções de Entrega',
            securitySettings: 'Configurações de Segurança',
            features: 'Funcionalidades',
            standardDesign: 'Design Padrão',
            premiumDesign: 'Design Premium',
            goldDesign: 'Design Ouro',
            branchPickup: 'Recolha no Balcão',
            expressPickup: 'Recolha Expresso',
            pinViaEmail: 'PIN via Email',
            pinViaPost: 'PIN via Correio',
            contactlessPayments: 'Pagamentos Contactless',
            onlinePurchases: 'Compras Online',
            atmWithdrawals: 'Levantamentos ATM',
            monthlyLimit: 'Limite Mensal',
            currency: 'Moeda',
            selectDesign: 'Selecione o design do seu cartão',
            selectDelivery: 'Selecione a opção de entrega',
            deliveryNote: 'Disponível em 5-7 dias úteis',
            expressNote: 'Disponível em 24-48 horas',
            pinMethod: 'Método de recebimento do PIN',
            featuresDescription: 'Selecione as funcionalidades que deseja ativar',
            monthlyLimitDescription: 'Defina o limite mensal do cartão',
            currencyDescription: 'Selecione a moeda do cartão',
            requiredFields: 'Campos obrigatórios',
            acceptTerms: 'Aceito os termos e condições',
            reviewRequest: 'Rever Pedido',
            submitRequest: 'Submeter Pedido',
            cancel: 'Cancelar',
            estimatedDelivery: 'Entrega Estimada',
            cardNumber: 'Número do Cartão',
            expiryDate: 'Data de Validade',
            cvv: 'CVV',
            cardPreview: 'Pré-visualização do Cartão',
            requestSuccess: 'Pedido Submetido com Sucesso',
            requestSuccessDescription: 'O seu pedido de cartão foi submetido com sucesso. Receberá uma confirmação por email.',
            goBack: 'Voltar aos Cartões',
            continueShopping: 'Continuar',
            backToSelection: 'Voltar à seleção de cartões',
            requestNewCard: 'Solicitar Novo Cartão',
            requestCardDescription: 'Escolha o tipo de cartão que deseja solicitar',
            cardTypes: [
                {
                    id: 'debit',
                    title: 'Cartão Débito',
                    description: 'Vinculado à sua conta corrente',
                    icon: '💳',
                    color: 'bg-blue-50 text-blue-600',
                    features: ['Vinculado à sua conta corrente', 'Pagamentos em todo o mundo', 'Seguro e protegido'],
                    formTitle: 'Solicitar Cartão Débito',
                    formDescription: 'Solicite o seu cartão de débito vinculado à sua conta'
                },
                {
                    id: 'credit',
                    title: 'Cartão Crédito',
                    description: 'Com limite pré-aprovado',
                    icon: '💰',
                    color: 'bg-green-50 text-green-600',
                    features: ['Limite até 50.000 MZN', 'Pagamento flexível', 'Programa de recompensas'],
                    formTitle: 'Solicitar Cartão Crédito',
                    formDescription: 'Solicite um cartão de crédito com limite pré-aprovado'
                },
                {
                    id: 'prepaid',
                    title: 'Cartão Pré-pago',
                    description: 'Para melhor controlo de gastos',
                    icon: '🔄',
                    color: 'bg-purple-50 text-purple-600',
                    features: ['Controlo total de gastos', 'Recarregável online', 'Ideal para orçamentos'],
                    formTitle: 'Solicitar Cartão Pré-pago',
                    formDescription: 'Solicite um cartão pré-pago para melhor controlo de gastos'
                },
                {
                    id: 'virtual',
                    title: 'Cartão Virtual',
                    description: 'Para compras online seguras',
                    icon: '🌐',
                    color: 'bg-orange-50 text-orange-600',
                    features: ['Imediatamente disponível', 'Seguro para compras online', 'Pode ser bloqueado a qualquer momento'],
                    formTitle: 'Solicitar Cartão Virtual',
                    formDescription: 'Solicite um cartão virtual para compras online seguras'
                }
            ],
            designOptions: [
                { id: 'standard', name: 'Padrão', color: 'from-blue-500 to-blue-600', description: 'Design clássico do banco' },
                { id: 'premium', name: 'Premium', color: 'from-purple-500 to-purple-600', description: 'Acabamento em relevo' },
                { id: 'gold', name: 'Ouro', color: 'from-yellow-500 to-yellow-600', description: 'Design premium dourado' }
            ]
        },
        EN: {
            selectCardType: 'Select Card Type',
            cardDesign: 'Card Design',
            deliveryOptions: 'Delivery Options',
            securitySettings: 'Security Settings',
            features: 'Features',
            standardDesign: 'Standard Design',
            premiumDesign: 'Premium Design',
            goldDesign: 'Gold Design',
            branchPickup: 'Branch Pickup',
            expressPickup: 'Express Pickup',
            pinViaEmail: 'PIN via Email',
            pinViaPost: 'PIN via Post',
            contactlessPayments: 'Contactless Payments',
            onlinePurchases: 'Online Purchases',
            atmWithdrawals: 'ATM Withdrawals',
            monthlyLimit: 'Monthly Limit',
            currency: 'Currency',
            selectDesign: 'Select your card design',
            selectDelivery: 'Select delivery option',
            deliveryNote: 'Available in 5-7 business days',
            expressNote: 'Available in 24-48 hours',
            pinMethod: 'PIN receiving method',
            featuresDescription: 'Select the features you want to enable',
            monthlyLimitDescription: 'Set the card monthly limit',
            currencyDescription: 'Select the card currency',
            requiredFields: 'Required fields',
            acceptTerms: 'I accept the terms and conditions',
            reviewRequest: 'Review Request',
            submitRequest: 'Submit Request',
            cancel: 'Cancel',
            estimatedDelivery: 'Estimated Delivery',
            cardNumber: 'Card Number',
            expiryDate: 'Expiry Date',
            cvv: 'CVV',
            cardPreview: 'Card Preview',
            requestSuccess: 'Request Submitted Successfully',
            requestSuccessDescription: 'Your card request has been submitted successfully. You will receive a confirmation email.',
            goBack: 'Back to Cards',
            continueShopping: 'Continue',
            backToSelection: 'Back to card selection',
            requestNewCard: 'Request New Card',
            requestCardDescription: 'Choose the type of card you want to request',
            cardTypes: [
                {
                    id: 'debit',
                    title: 'Debit Card',
                    description: 'Linked to your current account',
                    icon: '💳',
                    color: 'bg-blue-50 text-blue-600',
                    features: ['Linked to your current account', 'Payments worldwide', 'Safe and protected'],
                    formTitle: 'Request Debit Card',
                    formDescription: 'Request your debit card linked to your account'
                },
                {
                    id: 'credit',
                    title: 'Credit Card',
                    description: 'With pre-approved limit',
                    icon: '💰',
                    color: 'bg-green-50 text-green-600',
                    features: ['Limit up to 50,000 MZN', 'Flexible payment', 'Rewards program'],
                    formTitle: 'Request Credit Card',
                    formDescription: 'Request a credit card with pre-approved limit'
                },
                {
                    id: 'prepaid',
                    title: 'Prepaid Card',
                    description: 'For better spending control',
                    icon: '🔄',
                    color: 'bg-purple-50 text-purple-600',
                    features: ['Full spending control', 'Online rechargeable', 'Ideal for budgets'],
                    formTitle: 'Request Prepaid Card',
                    formDescription: 'Request a prepaid card for better spending control'
                },
                {
                    id: 'virtual',
                    title: 'Virtual Card',
                    description: 'For secure online shopping',
                    icon: '🌐',
                    color: 'bg-orange-50 text-orange-600',
                    features: ['Immediately available', 'Secure for online shopping', 'Can be blocked anytime'],
                    formTitle: 'Request Virtual Card',
                    formDescription: 'Request a virtual card for secure online shopping'
                }
            ],
            designOptions: [
                { id: 'standard', name: 'Standard', color: 'from-blue-500 to-blue-600', description: 'Classic bank design' },
                { id: 'premium', name: 'Premium', color: 'from-purple-500 to-purple-600', description: 'Embossed finish' },
                { id: 'gold', name: 'Gold', color: 'from-yellow-500 to-yellow-600', description: 'Premium gold design' }
            ]
        }
    }[language];

    const [] = useState(false);

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simular submissão do pedido
        setCurrentStep('success');
    };

    // Função para selecionar tipo de cartão
    const handleCardTypeSelect = (cardType: string) => {
        setSelectedCardType(cardType);
        setCurrentStep('form');
    };

    // Obter o cartão selecionado
    const selectedCard = currentTexts.cardTypes.find(card => card.id === selectedCardType);

    // STEP 1: Seleção do tipo de cartão
    if (currentStep === 'selection') {
        return (
            <ClientLayout>
                <div className="max-w-6xl mx-auto space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        {/* Header da Página */}
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <CiCreditCard1 size={24} className="text-red-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {currentTexts.requestNewCard}
                                </h1>
                                <p className="text-gray-600">
                                    {currentTexts.requestCardDescription}
                                </p>
                            </div>
                        </div>

                        {/* Seleção de Tipo de Cartão */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {currentTexts.cardTypes.map((cardType) => (
                                <button
                                    key={cardType.id}
                                    onClick={() => handleCardTypeSelect(cardType.id)}
                                    className="flex flex-col p-6 rounded-xl border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200 text-left group"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${cardType.color}`}>
                                            {cardType.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 text-lg group-hover:text-red-600">
                                                {cardType.title}
                                            </h3>
                                            <p className="text-gray-600 mt-1">
                                                {cardType.description}
                                            </p>
                                            <ul className="mt-3 space-y-1">
                                                {cardType.features.map((feature, index) => (
                                                    <li key={index} className="flex items-center space-x-2 text-sm text-gray-500">
                                                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <span className="text-red-600 font-medium text-sm group-hover:text-red-700">
                                            {language === 'PT' ? 'Solicitar este cartão →' : 'Request this card →'}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Botão Voltar */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                            >
                                {language === 'PT' ? 'Voltar' : 'Back'}
                            </button>
                        </div>
                    </div>
                </div>
            </ClientLayout>
        );
    }

    // STEP 3: Sucesso
    if (currentStep === 'success') {
        return (
            <ClientLayout>
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <CiCreditCard1 size={24} className="text-green-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{selectedCard?.formTitle}</h1>
                                <p className="text-gray-600">{selectedCard?.formDescription}</p>
                            </div>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {currentTexts.requestSuccess}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {currentTexts.requestSuccessDescription}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button
                                    onClick={() => navigate('/client/cards')}
                                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                                >
                                    {currentTexts.goBack}
                                </button>
                                <button
                                    onClick={() => navigate('/mypanel')}
                                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                >
                                    {currentTexts.continueShopping}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ClientLayout>
        );
    }

    // STEP 2: Formulário (apenas se tiver um cartão selecionado)
    if (currentStep === 'form' && selectedCard) {
        return (
            <ClientLayout>
                <div className="max-w-6xl mx-auto space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        {/* Header da Página */}
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <CiCreditCard1 size={24} className="text-red-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{selectedCard.formTitle}</h1>
                                <p className="text-gray-600">{selectedCard.formDescription}</p>
                            </div>
                        </div>

                        {/* Botão para voltar à seleção de tipo */}
                        <div className="mb-6">
                            <button
                                onClick={() => setCurrentStep('selection')}
                                className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>{currentTexts.backToSelection}</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Formulário */}
                            <div className="lg:col-span-2 space-y-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Design do Cartão */}
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                            <CiCreditCard1 className="mr-2" />
                                            {currentTexts.cardDesign}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4">{currentTexts.selectDesign}</p>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {currentTexts.designOptions.map((design) => (
                                                <label key={design.id} className="cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="cardDesign"
                                                        value={design.id}
                                                        checked={formData.cardDesign === design.id}
                                                        onChange={(e) => handleInputChange('cardDesign', e.target.value)}
                                                        className="hidden"
                                                    />
                                                    <div className={`border-2 rounded-xl p-4 transition-all ${formData.cardDesign === design.id
                                                            ? 'border-red-500 bg-red-50'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                        }`}>
                                                        <div className={`w-full h-24 rounded-lg bg-gradient-to-r ${design.color} mb-3 flex items-center justify-center text-white font-bold`}>
                                                            {design.name}
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="font-medium text-gray-900">{design.name}</p>
                                                            <p className="text-gray-500 text-sm mt-1">{design.description}</p>
                                                        </div>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Opções de Entrega */}
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                            <CiCalendar className="mr-2" />
                                            {currentTexts.deliveryOptions}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4">{currentTexts.selectDelivery}</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <label className="cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="deliveryOption"
                                                    value="branch"
                                                    checked={formData.deliveryOption === 'branch'}
                                                    onChange={(e) => handleInputChange('deliveryOption', e.target.value)}
                                                    className="hidden"
                                                />
                                                <div className={`border-2 rounded-xl p-4 transition-all ${formData.deliveryOption === 'branch'
                                                        ? 'border-red-500 bg-red-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                    }`}>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="font-medium text-gray-900">{currentTexts.branchPickup}</p>
                                                            <p className="text-gray-500 text-sm">{currentTexts.deliveryNote}</p>
                                                        </div>
                                                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                                            {formData.deliveryOption === 'branch' && (
                                                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </label>

                                            <label className="cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="deliveryOption"
                                                    value="express"
                                                    checked={formData.deliveryOption === 'express'}
                                                    onChange={(e) => handleInputChange('deliveryOption', e.target.value)}
                                                    className="hidden"
                                                />
                                                <div className={`border-2 rounded-xl p-4 transition-all ${formData.deliveryOption === 'express'
                                                        ? 'border-red-500 bg-red-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                    }`}>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="font-medium text-gray-900">{currentTexts.expressPickup}</p>
                                                            <p className="text-gray-500 text-sm">{currentTexts.expressNote}</p>
                                                        </div>
                                                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                                            {formData.deliveryOption === 'express' && (
                                                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Configurações de Segurança */}
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                            <CiLock className="mr-2" />
                                            {currentTexts.securitySettings}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4">{currentTexts.pinMethod}</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <label className="cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="pinOption"
                                                    value="email"
                                                    checked={formData.pinOption === 'email'}
                                                    onChange={(e) => handleInputChange('pinOption', e.target.value)}
                                                    className="hidden"
                                                />
                                                <div className={`border-2 rounded-xl p-4 transition-all ${formData.pinOption === 'email'
                                                        ? 'border-red-500 bg-red-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                    }`}>
                                                    <div className="text-center">
                                                        <p className="font-medium text-gray-900">
                                                            {currentTexts.pinViaEmail}
                                                        </p>
                                                        <p className="text-gray-500 text-sm mt-1">
                                                            {language === 'PT' ? 'Envio imediato' : 'Immediate delivery'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </label>

                                            <label className="cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="pinOption"
                                                    value="post"
                                                    checked={formData.pinOption === 'post'}
                                                    onChange={(e) => handleInputChange('pinOption', e.target.value)}
                                                    className="hidden"
                                                />
                                                <div className={`border-2 rounded-xl p-4 transition-all ${formData.pinOption === 'post'
                                                        ? 'border-red-500 bg-red-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                    }`}>
                                                    <div className="text-center">
                                                        <p className="font-medium text-gray-900">
                                                            {currentTexts.pinViaPost}
                                                        </p>
                                                        <p className="text-gray-500 text-sm mt-1">
                                                            {language === 'PT' ? 'Envio em 3-5 dias' : 'Delivery in 3-5 days'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Funcionalidades */}
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                            {currentTexts.features}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4">{currentTexts.featuresDescription}</p>
                                        <div className="space-y-3">
                                            {[
                                                { key: 'contactless', label: currentTexts.contactlessPayments },
                                                { key: 'onlinePurchases', label: currentTexts.onlinePurchases },
                                                { key: 'atmWithdrawals', label: currentTexts.atmWithdrawals }
                                            ].map((feature) => (
                                                <label key={feature.key} className="flex items-center space-x-3 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData[feature.key as keyof typeof formData] as boolean}
                                                        onChange={(e) => handleInputChange(feature.key, e.target.checked)}
                                                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                                                    />
                                                    <span className="text-gray-900">{feature.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Termos e Condições */}
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.termsAccepted}
                                                onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                                                className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                                            />
                                            <span className="text-gray-900">
                                                {currentTexts.acceptTerms}
                                                <a href="#" className="text-red-600 hover:text-red-700 ml-1">
                                                    {language === 'PT' ? '(ler termos)' : '(read terms)'}
                                                </a>
                                            </span>
                                        </label>
                                    </div>

                                    {/* Botões de Ação */}
                                    <div className="flex flex-col sm:flex-row gap-3 pt-6">
                                        <button
                                            type="submit"
                                            disabled={!formData.termsAccepted}
                                            className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        >
                                            {currentTexts.submitRequest}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep('selection')}
                                            className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                        >
                                            {currentTexts.cancel}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Sidebar - Resumo e Características */}
                            <div className="space-y-6">
                                {/* Resumo do Cartão */}
                                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white">
                                    <h3 className="font-semibold mb-4">{currentTexts.cardPreview}</h3>
                                    <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <p className="text-red-100 text-sm">{currentTexts.cardNumber}</p>
                                                <p className="font-mono text-lg">•••• •••• •••• ••••</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-red-100 text-sm">{currentTexts.expiryDate}</p>
                                                <p className="font-mono">••/••</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-red-100 text-sm">{language === 'PT' ? 'Titular' : 'Cardholder'}</p>
                                                <p className="font-medium">João Paulo</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-red-100 text-sm">CVV</p>
                                                <p className="font-mono">•••</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Características do Cartão */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h3 className="font-semibold text-gray-900 mb-4">
                                        {language === 'PT' ? 'Características' : 'Features'}
                                    </h3>
                                    <ul className="space-y-3">
                                        {selectedCard.features.map((feature: string, index: number) => (
                                            <li key={index} className="flex items-center space-x-3">
                                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                <span className="text-gray-700 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Informações de Entrega */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h3 className="font-semibold text-gray-900 mb-4">
                                        {currentTexts.estimatedDelivery}
                                    </h3>
                                    <div className="flex items-center space-x-3">
                                        <CiCalendar className="text-gray-400" />
                                        <div>
                                            <p className="text-gray-900 font-medium">
                                                {formData.deliveryOption === 'branch'
                                                    ? currentTexts.deliveryNote
                                                    : currentTexts.expressNote
                                                }
                                            </p>
                                            <p className="text-gray-500 text-sm">
                                                {formData.deliveryOption === 'branch'
                                                    ? currentTexts.branchPickup
                                                    : currentTexts.expressPickup
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ClientLayout>
        );
    }

    // Fallback: voltar para seleção
    return (
        <ClientLayout>
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        {language === 'PT' ? 'Erro ao carregar a página' : 'Error loading page'}
                    </h2>
                    <button
                        onClick={() => setCurrentStep('selection')}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                        {language === 'PT' ? 'Voltar à seleção' : 'Back to selection'}
                    </button>
                </div>
            </div>
        </ClientLayout>
    );
};

export default ClientCards;