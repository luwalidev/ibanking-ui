// pages/BusinessAccountDetails.tsx
import React, { useState } from 'react';
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaIdCard,
    FaBuilding,
    FaMoneyBillWave,
    FaCreditCard,
    FaFileAlt,
    FaEdit,
    FaPrint,
    FaUsers,
    FaSignature,
    FaBriefcase,
    FaGlobe,
    FaShieldAlt
} from 'react-icons/fa';
import { BusinessLayout } from '../../../components/BusinessLayout';
import { TbCurrencyDollar } from 'react-icons/tb';
import { CiBank } from 'react-icons/ci';

interface BusinessAccountDetailsProps {
    language: 'PT' | 'EN';
}

const BusinessAccountDetails: React.FC<BusinessAccountDetailsProps> = ({ language }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'signatories'>('overview');

    // Dados da empresa - em produção, viriam de uma API
    const businessData = {
        // Informações da Empresa
        companyInfo: {
            companyName: 'Energias Renováveis, S.A',
            tradingName: 'Energias Renováveis',
            companyNuit: '501234567',
            businessActivity: 'Produção e Distribuição de Energia Renovável',
            legalForm: 'Sociedade Anónima',
            registrationDate: '10/03/2018',
            registrationNumber: '9876543210',
            sector: 'Energia',
            numberOfEmployees: 150,
            annualRevenue: '25.000.000 MT',
            website: 'www.energiasrenovaveis.co.mz'
        },

        // Contacto da Empresa
        contactInfo: {
            email: 'geral@energiasrenovaveis.co.mz',
            phone: '+258 84 999 8888',
            fax: '+258 21 999 888',
            address: 'Av. 25 de Setembro, 3456',
            city: 'Maputo',
            province: 'Maputo Cidade',
            postalCode: '1102',
            neighborhood: 'Polana'
        },

        // Representante Legal
        legalRepresentative: {
            fullName: 'Joaquim Armando',
            position: 'Administrador Delegado',
            email: 'joaquim.armando@energiasrenovaveis.co.mz',
            phone: '+258 82 777 6666',
            birthDate: '15/08/1975',
            nationality: 'Moçambicana',
            nuib: '501234567',
            identificationNumber: '987654321012A'
        },

        // Informações da Conta Empresarial
        accountInfo: {
            accountNumber: '0010001012345',
            accountType: 'Conta Corrente Empresarial',
            accountStatus: 'Ativa',
            openingDate: '15/02/2024',
            currency: 'MZN',
            currentBalance: 1250000,
            availableBalance: 1200000,
            overdraftLimit: 500000,
            monthlyAverageBalance: 850000,
            cardNumber: '**** **** **** 1234',
            cardType: 'Visa Business Platinum',
            cardStatus: 'Ativo',
            cardExpiry: '12/2026',
            cardLimit: 250.000
        },

        // Assinantes Autorizados
        signatories: [
            {
                id: 1,
                name: 'Joaquim Armando',
                position: 'Administrador Delegado',
                email: 'joaquim.armando@energiasrenovaveis.co.mz',
                phone: '+258 82 777 6666',
                signatureLimit: 'Ilimitado',
                authorizationLevel: 'Total',
                status: 'active' as const,
                canAuthorizeTransfers: true,
                canApprovePayments: true,
                canManageUsers: true
            },
            {
                id: 2,
                name: 'Ana Margarida Silva',
                position: 'Directora Financeira',
                email: 'ana.silva@energiasrenovaveis.co.mz',
                phone: '+258 84 555 4444',
                signatureLimit: '750.000 MT',
                authorizationLevel: 'Alto',
                status: 'active' as const,
                canAuthorizeTransfers: true,
                canApprovePayments: true,
                canManageUsers: true
            },
            {
                id: 3,
                name: 'Carlos Alberto Santos',
                position: 'Director de Operações',
                email: 'carlos.santos@energiasrenovaveis.co.mz',
                phone: '+258 86 333 2222',
                signatureLimit: '500.000 MT',
                authorizationLevel: 'Alto',
                status: 'active' as const,
                canAuthorizeTransfers: true,
                canApprovePayments: true,
                canManageUsers: false
            },
            {
                id: 4,
                name: 'Maria Fernanda Costa',
                position: 'Contadora Chefe',
                email: 'maria.costa@energiasrenovaveis.co.mz',
                phone: '+258 85 111 0000',
                signatureLimit: '250.000 MT',
                authorizationLevel: 'Médio',
                status: 'active' as const,
                canAuthorizeTransfers: false,
                canApprovePayments: true,
                canManageUsers: false
            },
            {
                id: 5,
                name: 'Pedro Miguel Rocha',
                position: 'Gestor de Projectos',
                email: 'pedro.rocha@energiasrenovaveis.co.mz',
                phone: '+258 87 999 8888',
                signatureLimit: '100.000 MT',
                authorizationLevel: 'Baixo',
                status: 'active' as const,
                canAuthorizeTransfers: false,
                canApprovePayments: false,
                canManageUsers: false
            }
        ],

        // Documentos Empresariais
        documents: [
            { id: '1', type: 'Registo Comercial', name: 'registo_comercial.pdf', uploadDate: '15/01/2024', status: 'approved' as const },
            { id: '2', type: 'Certificado de NUIT', name: 'certificado_nuit.pdf', uploadDate: '15/01/2024', status: 'approved' as const },
            { id: '3', type: 'Estatutos da Empresa', name: 'estatutos_empresa.pdf', uploadDate: '15/01/2024', status: 'approved' as const },
            { id: '4', type: 'Declaração de Início de Actividade', name: 'declaracao_inicio.pdf', uploadDate: '15/01/2024', status: 'approved' as const },
            { id: '5', type: 'BI do Representante Legal', name: 'bi_representante.pdf', uploadDate: '15/01/2024', status: 'approved' as const },
            { id: '6', type: 'Certificado de Registo de Empregadores', name: 'certificado_empregadores.pdf', uploadDate: '16/01/2024', status: 'pending' as const },
            { id: '7', type: 'Balancetes do Último Ano', name: 'balancetes_2023.pdf', uploadDate: '16/01/2024', status: 'pending' as const }
        ]
    };

    const texts = {
        PT: {
            title: 'Detalhes da Conta Empresarial',
            subtitle: 'Gerencie a conta da sua empresa e visualize todas as informações',
            overview: 'Visão Geral',
            documents: 'Documentos',
            signatories: 'Assinantes',
            companyInfo: 'Informações da Empresa',
            contactInfo: 'Contacto da Empresa',
            legalRepresentative: 'Representante Legal',
            accountDetails: 'Detalhes da Conta',
            companyName: 'Nome da Empresa',
            tradingName: 'Nome Comercial',
            companyNuit: 'NUIT da Empresa',
            businessActivity: 'Actividade Principal',
            legalForm: 'Forma Jurídica',
            registrationDate: 'Data de Registo',
            registrationNumber: 'Número de Registo',
            sector: 'Sector de Actividade',
            numberOfEmployees: 'Número de Funcionários',
            annualRevenue: 'Receita Anual',
            website: 'Website',
            email: 'Email',
            phone: 'Telefone',
            fax: 'Fax',
            address: 'Morada',
            city: 'Cidade',
            province: 'Província',
            postalCode: 'Código Postal',
            neighborhood: 'Bairro',
            fullName: 'Nome Completo',
            position: 'Cargo',
            birthDate: 'Data de Nascimento',
            nationality: 'Nacionalidade',
            nuib: 'NUIB',
            identificationNumber: 'Número de Identificação',
            accountNumber: 'Número da Conta',
            accountType: 'Tipo de Conta',
            accountStatus: 'Estado da Conta',
            openingDate: 'Data de Abertura',
            currency: 'Moeda',
            currentBalance: 'Saldo Actual',
            availableBalance: 'Saldo Disponível',
            overdraftLimit: 'Limite de Descoberto',
            monthlyAverageBalance: 'Saldo Médio Mensal',
            cardNumber: 'Número do Cartão',
            cardType: 'Tipo do Cartão',
            cardStatus: 'Estado do Cartão',
            cardExpiry: 'Validade do Cartão',
            cardLimit: 'Limite do Cartão',
            signatoryName: 'Nome do Assinante',
            signatoryPosition: 'Cargo',
            signatoryEmail: 'Email',
            signatoryPhone: 'Telefone',
            signatureLimit: 'Limite de Assinatura',
            authorizationLevel: 'Nível de Autorização',
            status: 'Estado',
            canAuthorizeTransfers: 'Autoriza Transferências',
            canApprovePayments: 'Aprova Pagamentos',
            canManageUsers: 'Gere Utilizadores',
            documentName: 'Nome do Documento',
            documentType: 'Tipo',
            uploadDate: 'Data de Upload',
            approved: 'Aprovado',
            pending: 'Pendente',
            rejected: 'Rejeitado',
            active: 'Activo',
            inactive: 'Inactivo',
            blocked: 'Bloqueado',
            download: 'Baixar',
            upload: 'Carregar',
            edit: 'Editar',
            delete: 'Eliminar',
            editProfile: 'Editar Perfil',
            printDetails: 'Imprimir Detalhes',
            requestCard: 'Solicitar Cartão',
            changeLimits: 'Alterar Limites',
            contactSupport: 'Contactar Suporte',
            addSignatory: 'Adicionar Assinante',
            viewAllSignatories: 'Ver Todos os Assinantes',
            total: 'Total',
            yes: 'Sim',
            no: 'Não',
            unlimited: 'Ilimitado',
            authorizationLevels: {
                total: 'Total',
                high: 'Alto',
                medium: 'Médio',
                low: 'Baixo'
            }
        },
        EN: {
            title: 'Business Account Details',
            subtitle: 'Manage your company account and view all information',
            overview: 'Overview',
            documents: 'Documents',
            signatories: 'Signatories',
            companyInfo: 'Company Information',
            contactInfo: 'Company Contact',
            legalRepresentative: 'Legal Representative',
            accountDetails: 'Account Details',
            companyName: 'Company Name',
            tradingName: 'Trading Name',
            companyNuit: 'Company NUIT',
            businessActivity: 'Main Activity',
            legalForm: 'Legal Form',
            registrationDate: 'Registration Date',
            registrationNumber: 'Registration Number',
            sector: 'Business Sector',
            numberOfEmployees: 'Number of Employees',
            annualRevenue: 'Annual Revenue',
            website: 'Website',
            email: 'Email',
            phone: 'Phone',
            fax: 'Fax',
            address: 'Address',
            city: 'City',
            province: 'Province',
            postalCode: 'Postal Code',
            neighborhood: 'Neighborhood',
            fullName: 'Full Name',
            position: 'Position',
            birthDate: 'Birth Date',
            nationality: 'Nationality',
            nuib: 'NUIB',
            identificationNumber: 'Identification Number',
            accountNumber: 'Account Number',
            accountType: 'Account Type',
            accountStatus: 'Account Status',
            openingDate: 'Opening Date',
            currency: 'Currency',
            currentBalance: 'Current Balance',
            availableBalance: 'Available Balance',
            overdraftLimit: 'Overdraft Limit',
            monthlyAverageBalance: 'Monthly Average Balance',
            cardNumber: 'Card Number',
            cardType: 'Card Type',
            cardStatus: 'Card Status',
            cardExpiry: 'Card Expiry',
            cardLimit: 'Card Limit',
            signatoryName: 'Signatory Name',
            signatoryPosition: 'Position',
            signatoryEmail: 'Email',
            signatoryPhone: 'Phone',
            signatureLimit: 'Signature Limit',
            authorizationLevel: 'Authorization Level',
            status: 'Status',
            canAuthorizeTransfers: 'Can Authorize Transfers',
            canApprovePayments: 'Can Approve Payments',
            canManageUsers: 'Can Manage Users',
            documentName: 'Document Name',
            documentType: 'Type',
            uploadDate: 'Upload Date',
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
            contactSupport: 'Contact Support',
            addSignatory: 'Add Signatory',
            viewAllSignatories: 'View All Signatories',
            total: 'Total',
            yes: 'Yes',
            no: 'No',
            unlimited: 'Unlimited',
            authorizationLevels: {
                total: 'Total',
                high: 'High',
                medium: 'Medium',
                low: 'Low'
            }
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
            currency: businessData.accountInfo.currency
        }).format(amount);
    };

    const handleEditProfile = () => {
        // Lógica para editar perfil
        console.log('Editar perfil empresarial');
    };

    const handlePrint = () => {
        window.print();
    };

    const getAuthorizationLevelColor = (level: string) => {
        switch (level.toLowerCase()) {
            case 'total':
                return 'bg-purple-100 text-purple-800';
            case 'alto':
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'médio':
            case 'medium':
                return 'bg-blue-100 text-blue-800';
            case 'baixo':
            case 'low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <BusinessLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <FaBuilding size={24} className="text-red-600" />
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
                            {(['overview', 'documents', 'signatories'] as const).map((tab) => (
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
                            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow p-6 text-white">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                                        <CiBank size={24} />
                                    </div>
                                    <span className="text-sm opacity-90">{texts.currentBalance}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {businessData.accountInfo.currency === 'MZN' ? (
                                        <HiOutlineCurrencyDollar size={28} />
                                    ) : (
                                        <TbCurrencyDollar size={28} />
                                    )}
                                    <h2 className="text-3xl font-bold">{formatCurrency(businessData.accountInfo.currentBalance)}</h2>
                                </div>
                                <p className="text-sm opacity-90 mt-2">{texts.availableBalance}: {formatCurrency(businessData.accountInfo.availableBalance)}</p>
                            </div>

                            <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <FaCreditCard size={20} className="text-blue-600" />
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(businessData.accountInfo.cardStatus)}`}>
                                        {businessData.accountInfo.cardStatus}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{texts.cardType}</h3>
                                <p className="text-gray-600">{businessData.accountInfo.cardNumber}</p>
                                <p className="text-sm text-gray-500 mt-2">{texts.cardExpiry}: {businessData.accountInfo.cardExpiry}</p>
                                <p className="text-sm text-gray-500">{texts.cardLimit}: {formatCurrency(businessData.accountInfo.cardLimit)}</p>
                            </div>

                            <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <FaMoneyBillWave size={20} className="text-green-600" />
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(businessData.accountInfo.accountStatus)}`}>
                                        {businessData.accountInfo.accountStatus}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{texts.accountType}</h3>
                                <p className="text-gray-600">{businessData.accountInfo.accountNumber}</p>
                                <p className="text-sm text-gray-500 mt-2">{texts.openingDate}: {businessData.accountInfo.openingDate}</p>
                                <p className="text-sm text-gray-500">{texts.overdraftLimit}: {formatCurrency(businessData.accountInfo.overdraftLimit)}</p>
                            </div>
                        </div>

                        {/* Company Information */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Company Information */}
                            <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                        <FaBuilding className="text-blue-600" />
                                        <span>{texts.companyInfo}</span>
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
                                            <FaBuilding className="text-gray-600" size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500">{texts.companyName}</p>
                                            <p className="font-medium text-gray-900">{businessData.companyInfo.companyName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FaBriefcase className="text-gray-600" size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500">{texts.tradingName}</p>
                                            <p className="font-medium text-gray-900">{businessData.companyInfo.tradingName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FaIdCard className="text-gray-600" size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500">{texts.companyNuit}</p>
                                            <p className="font-medium text-gray-900">{businessData.companyInfo.companyNuit}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FaBriefcase className="text-gray-600" size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500">{texts.businessActivity}</p>
                                            <p className="font-medium text-gray-900">{businessData.companyInfo.businessActivity}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FaGlobe className="text-gray-600" size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500">{texts.website}</p>
                                            <p className="font-medium text-gray-900">{businessData.companyInfo.website}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Company Contact */}
                            <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                        <FaMapMarkerAlt className="text-blue-600" />
                                        <span>{texts.contactInfo}</span>
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
                                            <p className="text-sm text-gray-500">{texts.address}</p>
                                            <p className="font-medium text-gray-900">{businessData.contactInfo.address}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FaEnvelope className="text-gray-600" size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500">{texts.email}</p>
                                            <p className="font-medium text-gray-900">{businessData.contactInfo.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FaPhone className="text-gray-600" size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500">{texts.phone}</p>
                                            <p className="font-medium text-gray-900">{businessData.contactInfo.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FaBuilding className="text-gray-600" size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">{texts.city}</p>
                                            <p className="font-medium text-gray-900">{businessData.contactInfo.city}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FaBuilding className="text-gray-600" size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">{texts.province}</p>
                                            <p className="font-medium text-gray-900">{businessData.contactInfo.province}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Legal Representative */}
                            <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                        <FaUser className="text-blue-600" />
                                        <span>{texts.legalRepresentative}</span>
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
                                            <p className="font-medium text-gray-900">{businessData.legalRepresentative.fullName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FaBriefcase className="text-gray-600" size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500">{texts.position}</p>
                                            <p className="font-medium text-gray-900">{businessData.legalRepresentative.position}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FaEnvelope className="text-gray-600" size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500">{texts.email}</p>
                                            <p className="font-medium text-gray-900">{businessData.legalRepresentative.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FaPhone className="text-gray-600" size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500">{texts.phone}</p>
                                            <p className="font-medium text-gray-900">{businessData.legalRepresentative.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FaIdCard className="text-gray-600" size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500">{texts.nuib}</p>
                                            <p className="font-medium text-gray-900">{businessData.legalRepresentative.nuib}</p>
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
                                    {businessData.documents.map((document) => (
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

                {activeTab === 'signatories' && (
                    <div className="space-y-6">
                        {/* Signatories Summary */}
                        <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{texts.signatories}</h3>
                                    <p className="text-sm text-gray-600">
                                        {businessData.signatories.length} {texts.total} • {
                                            businessData.signatories.filter(s => s.status === 'active').length
                                        } {texts.active}
                                    </p>
                                </div>
                                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center space-x-2">
                                    <FaUser size={14} />
                                    <span>{texts.addSignatory}</span>
                                </button>
                            </div>

                            {/* Signatories Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {businessData.signatories.map((signatory) => (
                                    <div key={signatory.id} className="border border-gray-200 rounded-lg p-6 hover:border-red-300 hover:shadow-sm transition-all">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className={`p-2 rounded-lg ${signatory.status === 'active' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                                                    <FaUser className={signatory.status === 'active' ? 'text-green-600' : 'text-yellow-600'} size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{signatory.name}</h4>
                                                    <p className="text-sm text-gray-600">{signatory.position}</p>
                                                </div>
                                            </div>
                                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(signatory.status)}`}>
                                                {texts[signatory.status]}
                                            </span>
                                        </div>

                                        <div className="space-y-3 mb-4">
                                            <div className="flex items-center space-x-2 text-sm">
                                                <FaEnvelope className="text-gray-400" size={14} />
                                                <span className="text-gray-600">{signatory.email}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm">
                                                <FaPhone className="text-gray-400" size={14} />
                                                <span className="text-gray-600">{signatory.phone}</span>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-gray-600">{texts.signatureLimit}:</span>
                                                <span className="font-medium text-gray-900">
                                                    {signatory.signatureLimit === 'Ilimitado' || signatory.signatureLimit === 'Unlimited'
                                                        ? texts.unlimited
                                                        : signatory.signatureLimit}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">{texts.authorizationLevel}:</span>
                                                <span className={`px-2 py-1 text-xs rounded-full ${getAuthorizationLevelColor(signatory.authorizationLevel)}`}>
                                                    {signatory.authorizationLevel}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className="flex items-center space-x-2">
                                                <FaShieldAlt className={`text-sm ${signatory.canAuthorizeTransfers ? 'text-green-500' : 'text-gray-300'}`} />
                                                <span className={`${signatory.canAuthorizeTransfers ? 'text-green-700' : 'text-gray-400'}`}>
                                                    {texts.canAuthorizeTransfers}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <FaSignature className={`text-sm ${signatory.canApprovePayments ? 'text-green-500' : 'text-gray-300'}`} />
                                                <span className={`${signatory.canApprovePayments ? 'text-green-700' : 'text-gray-400'}`}>
                                                    {texts.canApprovePayments}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <FaUsers className={`text-sm ${signatory.canManageUsers ? 'text-green-500' : 'text-gray-300'}`} />
                                                <span className={`${signatory.canManageUsers ? 'text-green-700' : 'text-gray-400'}`}>
                                                    {texts.canManageUsers}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex space-x-2 mt-4">
                                            <button className="flex-1 text-red-600 border border-red-600 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm">
                                                {texts.edit}
                                            </button>
                                            <button className="flex-1 text-gray-600 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                                {signatory.status === 'active' ? texts.blocked : texts.delete}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Signatories Permissions Table */}
                        <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Permissões dos Assinantes</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {texts.signatoryName}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {texts.authorizationLevel}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {texts.canAuthorizeTransfers}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {texts.canApprovePayments}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {texts.canManageUsers}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {texts.signatureLimit}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {businessData.signatories.map((signatory) => (
                                            <tr key={signatory.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{signatory.name}</div>
                                                    <div className="text-sm text-gray-500">{signatory.position}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${getAuthorizationLevelColor(signatory.authorizationLevel)}`}>
                                                        {signatory.authorizationLevel}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${signatory.canAuthorizeTransfers ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                        {signatory.canAuthorizeTransfers ? texts.yes : texts.no}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${signatory.canApprovePayments ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                        {signatory.canApprovePayments ? texts.yes : texts.no}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${signatory.canManageUsers ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                        {signatory.canManageUsers ? texts.yes : texts.no}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {signatory.signatureLimit === 'Ilimitado' || signatory.signatureLimit === 'Unlimited'
                                                        ? texts.unlimited
                                                        : signatory.signatureLimit}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Ações Rápidas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
                            <div className="p-2 bg-blue-100 rounded-lg w-fit mb-3">
                                <FaCreditCard className="text-blue-600" size={20} />
                            </div>
                            <h4 className="font-medium text-gray-900">{texts.requestCard}</h4>
                            <p className="text-sm text-gray-600 mt-1">Solicitar cartão empresarial</p>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
                            <div className="p-2 bg-blue-100 rounded-lg w-fit mb-3">
                                <FaMoneyBillWave className="text-blue-600" size={20} />
                            </div>
                            <h4 className="font-medium text-gray-900">{texts.changeLimits}</h4>
                            <p className="text-sm text-gray-600 mt-1">Ajustar limites da conta</p>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
                            <div className="p-2 bg-blue-100 rounded-lg w-fit mb-3">
                                <FaUsers className="text-blue-600" size={20} />
                            </div>
                            <h4 className="font-medium text-gray-900">{texts.addSignatory}</h4>
                            <p className="text-sm text-gray-600 mt-1">Adicionar novo assinante</p>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
                            <div className="p-2 bg-blue-100 rounded-lg w-fit mb-3">
                                <FaEnvelope className="text-blue-600" size={20} />
                            </div>
                            <h4 className="font-medium text-gray-900">{texts.contactSupport}</h4>
                            <p className="text-sm text-gray-600 mt-1">Fale com suporte empresarial</p>
                        </button>
                    </div>
                </div>
            </div>
        </BusinessLayout>
    );
};

export default BusinessAccountDetails;