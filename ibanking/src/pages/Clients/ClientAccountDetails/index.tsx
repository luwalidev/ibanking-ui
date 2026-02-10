// pages/ClientAccountDetails.tsx
import React, { useState } from 'react';
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaIdCard,
    FaBuilding,
    FaMoneyBillWave,
    FaCreditCard,
    FaFileAlt,
    FaEdit,
    FaPrint
} from 'react-icons/fa';
import { ClientLayout } from '../../../components/ClientLayout';
import { TbBuildingBank, TbCurrencyDollar } from 'react-icons/tb';
import { CiBank } from 'react-icons/ci';

interface ClientAccountDetailsProps {
    language: 'PT' | 'EN';
}

const ClientAccountDetails: React.FC<ClientAccountDetailsProps> = ({ language }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'documents'>('overview');

    // Dados do cliente - em produção, viriam de uma API
    const clientData = {
        // Informações Pessoais
        personalInfo: {
            fullName: 'João Paulo Silva',
            firstName: 'João',
            lastName: 'Paulo',
            email: 'joao.paulo@email.com',
            phone: '+258 84 123 4567',
            birthDate: '15/04/1985',
            nationality: 'Moçambicana',
            nuib: '123456789',
            maritalStatus: 'Casado',
            profession: 'Engenheiro'
        },
        
        // Endereço
        address: {
            street: 'Av. 25 de Setembro, 1234',
            city: 'Maputo',
            province: 'Maputo Cidade',
            postalCode: '1100',
            neighborhood: 'Central'
        },
        
        // Informações da Conta
        accountInfo: {
            accountNumber: '0010001123456',
            accountType: 'Conta Corrente',
            accountStatus: 'Ativa',
            openingDate: '15/01/2024',
            currency: 'MZN',
            currentBalance: 25.450,
            availableBalance: 24.950,
            cardNumber: '**** **** **** 5678',
            cardType: 'Visa Platinum',
            cardStatus: 'Ativo',
            cardExpiry: '12/2026',
            cardLimit: 50.000
        },
        
        // Documentos
        documents: [
            { id: '1', type: 'BI', name: 'bilhete_identidade.pdf', uploadDate: '15/01/2024', status: 'approved' as const },
            { id: '2', type: 'NUIT', name: 'cartao_nuit.jpg', uploadDate: '15/01/2024', status: 'approved' as const },
            { id: '3', type: 'Declaração de Rendimento', name: 'declaracao_rendimento.pdf', uploadDate: '15/01/2024', status: 'approved' as const },
            { id: '4', type: 'Comprovativo de Endereço', name: 'comprovativo_endereco.pdf', uploadDate: '16/01/2024', status: 'pending' as const }
        ]
    };

    const texts = {
        PT: {
            title: 'Detalhes da Conta',
            subtitle: 'Gerencie sua conta e visualize suas informações',
            overview: 'Visão Geral',
            documents: 'Documentos',
            personalInfo: 'Informações Pessoais',
            addressInfo: 'Endereço',
            fullName: 'Nome Completo',
            email: 'Email',
            phone: 'Telemóvel',
            birthDate: 'Data de Nascimento',
            nationality: 'Nacionalidade',
            nuib: 'NUIB',
            maritalStatus: 'Estado Civil',
            profession: 'Profissão',
            street: 'Rua/Avenida',
            city: 'Cidade',
            province: 'Província',
            postalCode: 'Código Postal',
            neighborhood: 'Bairro',
            accountNumber: 'Número da Conta',
            accountType: 'Tipo de Conta',
            accountStatus: 'Estado da Conta',
            openingDate: 'Data de Abertura',
            currency: 'Moeda',
            currentBalance: 'Saldo Actual',
            availableBalance: 'Saldo Disponível',
            cardNumber: 'Número do Cartão',
            cardType: 'Tipo do Cartão',
            cardStatus: 'Estado do Cartão',
            cardExpiry: 'Validade do Cartão',
            cardLimit: 'Limite do Cartão',
            documentName: 'Nome do Documento',
            documentType: 'Tipo',
            uploadDate: 'Data de Upload',
            status: 'Estado',
            approved: 'Aprovado',
            pending: 'Pendente',
            rejected: 'Rejeitado',
            active: 'Ativa',
            inactive: 'Inactiva',
            blocked: 'Bloqueada',
            download: 'Baixar',
            upload: 'Carregar',
            edit: 'Editar',
            delete: 'Eliminar',
            editProfile: 'Editar Perfil',
            printDetails: 'Imprimir Detalhes',
            requestCard: 'Solicitar Cartão',
            changeLimits: 'Alterar Limites',
            contactSupport: 'Contactar Suporte'
        },
        EN: {
            title: 'Account Details',
            subtitle: 'Manage your account and view your information',
            overview: 'Overview',
            documents: 'Documents',
            personalInfo: 'Personal Information',
            addressInfo: 'Address',
            fullName: 'Full Name',
            email: 'Email',
            phone: 'Phone',
            birthDate: 'Birth Date',
            nationality: 'Nationality',
            nuib: 'NUIB',
            maritalStatus: 'Marital Status',
            profession: 'Profession',
            street: 'Street/Avenue',
            city: 'City',
            province: 'Province',
            postalCode: 'Postal Code',
            neighborhood: 'Neighborhood',
            accountNumber: 'Account Number',
            accountType: 'Account Type',
            accountStatus: 'Account Status',
            openingDate: 'Opening Date',
            currency: 'Currency',
            currentBalance: 'Current Balance',
            availableBalance: 'Available Balance',
            cardNumber: 'Card Number',
            cardType: 'Card Type',
            cardStatus: 'Card Status',
            cardExpiry: 'Card Expiry',
            cardLimit: 'Card Limit',
            documentName: 'Document Name',
            documentType: 'Type',
            uploadDate: 'Upload Date',
            status: 'Status',
            approved: 'Approved',
            pending: 'Pending',
            rejected: 'Rejected',
            active: 'Active',
            inactive: 'Inactive',
            blocked: 'Blocked',
            download: 'Download',
            upload: 'Upload',
            edit: 'Edit',
            delete: 'Delete',
            editProfile: 'Edit Profile',
            printDetails: 'Print Details',
            requestCard: 'Request Card',
            changeLimits: 'Change Limits',
            contactSupport: 'Contact Support'
        }
    }[language];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'rejected':
            case 'blocked':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat(language === 'PT' ? 'pt-MZ' : 'en-US', {
            style: 'currency',
            currency: clientData.accountInfo.currency
        }).format(amount);
    };

    const handleEditProfile = () => {
        // Lógica para editar perfil
        console.log('Editar perfil');
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <ClientLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <TbBuildingBank size={24} className="text-red-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{texts.title}</h1>
                                <p className="text-gray-600">{texts.subtitle}</p>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={handleEditProfile}
                                className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center space-x-2"
                            >
                                <FaEdit size={16} />
                                <span>{texts.editProfile}</span>
                            </button>
                            <button
                                onClick={handlePrint}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                            >
                                <FaPrint size={16} />
                                <span>{texts.printDetails}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8">
                            {(['overview', 'documents'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${activeTab === tab
                                            ? 'border-red-500 text-red-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {texts[tab]}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Content based on active tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Balance Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-xl shadow p-6 text-white">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                                        <CiBank size={24} />
                                    </div>
                                    <span className="text-sm opacity-90">{texts.currentBalance}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {clientData.accountInfo.currency === 'MZN' ? (
                                        <HiOutlineCurrencyDollar size={28} />
                                    ) : (
                                        <TbCurrencyDollar size={28} />
                                    )}
                                    <h2 className="text-3xl font-bold">{formatCurrency(clientData.accountInfo.currentBalance)}</h2>
                                </div>
                                <p className="text-sm opacity-90 mt-2">{texts.availableBalance}: {formatCurrency(clientData.accountInfo.availableBalance)}</p>
                            </div>

                            <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <FaCreditCard size={20} className="text-blue-600" />
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(clientData.accountInfo.cardStatus)}`}>
                                        {clientData.accountInfo.cardStatus}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{texts.cardType}</h3>
                                <p className="text-gray-600">{clientData.accountInfo.cardNumber}</p>
                                <p className="text-sm text-gray-500 mt-2">{texts.cardExpiry}: {clientData.accountInfo.cardExpiry}</p>
                            </div>

                            <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <FaMoneyBillWave size={20} className="text-green-600" />
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(clientData.accountInfo.accountStatus)}`}>
                                        {clientData.accountInfo.accountStatus}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{texts.accountType}</h3>
                                <p className="text-gray-600">{clientData.accountInfo.accountNumber}</p>
                                <p className="text-sm text-gray-500 mt-2">{texts.openingDate}: {clientData.accountInfo.openingDate}</p>
                            </div>
                        </div>

                        {/* Personal Information and Address */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                        <FaUser className="text-red-600" />
                                        <span>{texts.personalInfo}</span>
                                    </h3>
                                    <button
                                        onClick={handleEditProfile}
                                        className="text-sm text-red-600 hover:text-red-700 flex items-center space-x-1"
                                    >
                                        <FaEdit size={14} />
                                        <span>{texts.edit}</span>
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FaUser className="text-gray-600" size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500">{texts.fullName}</p>
                                            <p className="font-medium text-gray-900">{clientData.personalInfo.fullName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FaEnvelope className="text-gray-600" size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500">{texts.email}</p>
                                            <p className="font-medium text-gray-900">{clientData.personalInfo.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FaPhone className="text-gray-600" size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500">{texts.phone}</p>
                                            <p className="font-medium text-gray-900">{clientData.personalInfo.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FaCalendarAlt className="text-gray-600" size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500">{texts.birthDate}</p>
                                            <p className="font-medium text-gray-900">{clientData.personalInfo.birthDate}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FaIdCard className="text-gray-600" size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500">{texts.nuib}</p>
                                            <p className="font-medium text-gray-900">{clientData.personalInfo.nuib}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                        <FaMapMarkerAlt className="text-red-600" />
                                        <span>{texts.addressInfo}</span>
                                    </h3>
                                    <button
                                        onClick={handleEditProfile}
                                        className="text-sm text-red-600 hover:text-red-700 flex items-center space-x-1"
                                    >
                                        <FaEdit size={14} />
                                        <span>{texts.edit}</span>
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FaMapMarkerAlt className="text-gray-600" size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500">{texts.street}</p>
                                            <p className="font-medium text-gray-900">{clientData.address.street}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FaBuilding className="text-gray-600" size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500">{texts.city}</p>
                                            <p className="font-medium text-gray-900">{clientData.address.city}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FaBuilding className="text-gray-600" size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">{texts.province}</p>
                                            <p className="font-medium text-gray-900">{clientData.address.province}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FaMapMarkerAlt className="text-gray-600" size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">{texts.neighborhood}</p>
                                            <p className="font-medium text-gray-900">{clientData.address.neighborhood}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'documents' && (
                    <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">{texts.documents}</h3>
                            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                                {texts.upload}
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {texts.documentName}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {texts.documentType}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {texts.uploadDate}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {texts.status}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {clientData.documents.map((document) => (
                                        <tr key={document.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-3">
                                                    <FaFileAlt className="text-gray-400" size={20} />
                                                    <div className="font-medium text-gray-900">{document.name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                {document.type}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                {document.uploadDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(document.status)}`}>
                                                    {texts[document.status]}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button className="text-red-600 hover:text-red-900 mr-3">
                                                    {texts.download}
                                                </button>
                                                <button className="text-gray-600 hover:text-gray-900">
                                                    {texts.delete}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Ações Rápidas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <button className="p-4 border border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors text-left">
                            <div className="p-2 bg-red-100 rounded-lg w-fit mb-3">
                                <FaCreditCard className="text-red-600" size={20} />
                            </div>
                            <h4 className="font-medium text-gray-900">{texts.requestCard}</h4>
                            <p className="text-sm text-gray-600 mt-1">Solicitar novo cartão</p>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors text-left">
                            <div className="p-2 bg-red-100 rounded-lg w-fit mb-3">
                                <FaMoneyBillWave className="text-red-600" size={20} />
                            </div>
                            <h4 className="font-medium text-gray-900">{texts.changeLimits}</h4>
                            <p className="text-sm text-gray-600 mt-1">Ajustar limites da conta</p>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors text-left">
                            <div className="p-2 bg-red-100 rounded-lg w-fit mb-3">
                                <FaEdit className="text-red-600" size={20} />
                            </div>
                            <h4 className="font-medium text-gray-900">{texts.editProfile}</h4>
                            <p className="text-sm text-gray-600 mt-1">Actualizar informações</p>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors text-left">
                            <div className="p-2 bg-red-100 rounded-lg w-fit mb-3">
                                <FaEnvelope className="text-red-600" size={20} />
                            </div>
                            <h4 className="font-medium text-gray-900">{texts.contactSupport}</h4>
                            <p className="text-sm text-gray-600 mt-1">Fale com o nosso suporte</p>
                        </button>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
};

export default ClientAccountDetails;