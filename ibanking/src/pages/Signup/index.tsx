// components/Signup.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    CiUser,
    CiMail,
    CiMobile3,
    CiCalendar,
    CiMapPin,
    CiBank,
    CiCircleCheck,
    CiFileOn,
    CiCreditCard1
} from "react-icons/ci";
import { IoCloudUpload } from "react-icons/io5";
import { TbBuildingBank } from "react-icons/tb";
import { Navbar } from '../../components/Navbar';

interface SignupProps {
    language: 'PT' | 'EN';
}

interface Document {
    id: string;
    type: string;
    file: File | null;
    name: string;
    uploaded: boolean;
}

const Signup: React.FC<SignupProps> = ({ language }) => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [accountType, setAccountType] = useState<'individual' | 'business'>('individual');
    const [accountNumber, setAccountNumber] = useState<string>('');
    const [cardCustomization, setCardCustomization] = useState<'simple' | 'personalized'>('simple');

    // Estado do formulário
    const [formData, setFormData] = useState({
        // Informações Pessoais
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
        nuib: '',
        nationality: '',

        // Endereço
        address: '',
        city: '',
        province: '',
        postalCode: '',

        // Informações da Empresa (se aplicável)
        companyName: '',
        companyNuit: '',
        companyActivity: '',
        companyAddress: '',

        // Informações da Conta
        accountType: 'current',
        initialDeposit: '',
        currency: 'MZN',
        
        // Personalização do Cartão
        cardName: '',
    });

    // Estado dos documentos
    const [documents, setDocuments] = useState<Document[]>([
        { id: '1', type: 'bi', file: null, name: '', uploaded: false },
        { id: '2', type: 'declaracao_bairro', file: null, name: '', uploaded: false },
        { id: '3', type: 'nuit', file: null, name: '', uploaded: false },
        { id: '4', type: 'declaracao_rendimento', file: null, name: '', uploaded: false },
    ]);

    const texts = {
        PT: {
            title: 'Abrir Conta Bancária',
            subtitle: 'Junte-se a nós e tenha acesso a serviços bancários completos',
            individualAccount: 'Conta Individual',
            businessAccount: 'Conta Empresarial',
            step1: 'Tipo de Conta',
            step2: 'Informações Pessoais',
            step3: 'Endereço',
            step4: 'Informações da Conta',
            step5: 'Documentos',
            step6: 'Finalização',
            next: 'Próximo',
            previous: 'Anterior',
            createAccount: 'Submeter pedido',
            loading: 'Processando...',
            success: 'Conta criada com sucesso!',

            // Tipos de conta
            accountType: 'Tipo de Conta',
            currentAccount: 'Conta Corrente',
            savingsAccount: 'Conta Poupança',
            individualDescription: 'Para uso pessoal e gestão financeira individual',
            businessDescription: 'Para empresas e profissionais independentes',

            // Personalização do Cartão
            cardCustomization: 'Personalização do Cartão',
            simpleCard: 'Cartão Simples',
            personalizedCard: 'Cartão Personalizado',
            simpleCardDescription: 'Nome padrão no cartão (primeiro e último nome)',
            personalizedCardDescription: 'Escolha o nome que aparece no seu cartão',
            cardName: 'Nome no Cartão',
            enterCardName: 'Digite o nome que deseja no cartão',
            cardNamePlaceholder: 'Ex: Maria Silva, Dr. João, Empresa XYZ',
            cardNameMaxLength: 'Máximo 20 caracteres',
            cardNameRequired: 'Nome do cartão é obrigatório para personalização',

            // Informações pessoais
            personalInfo: 'Informações Pessoais',
            firstName: 'Nome',
            lastName: 'Apelido',
            email: 'Email',
            phone: 'Telemóvel',
            birthDate: 'Data de Nascimento',
            nuib: 'Número Único de Identificação Bancária (NUIB)',
            nationality: 'Nacionalidade',
            mozambican: 'Moçambicana',
            foreign: 'Estrangeira',

            // Endereço
            addressInfo: 'Informações de Endereço',
            address: 'Morada',
            city: 'Cidade',
            province: 'Província',
            postalCode: 'Código Postal',

            // Informações da empresa
            companyInfo: 'Informações da Empresa',
            companyName: 'Nome da Empresa',
            companyNuit: 'NUIT da Empresa',
            companyActivity: 'Actividade Principal',
            companyAddress: 'Morada da Empresa',

            // Informações da conta
            accountInfo: 'Informações da Conta',
            initialDeposit: 'Depósito Inicial',
            currency: 'Moeda',
            mzn: 'Metical (MZN)',
            usd: 'Dólar Americano (USD)',

            // Documentos
            documents: 'Documentos Necessários',
            bi: 'Bilhete de Identidade (BI)',
            declaracaoBairro: 'Declaração do Bairro',
            nuit: 'Cartão do NUIT',
            declaracaoRendimento: 'Declaração de Rendimento',
            uploadDocument: 'Carregar Documento',
            dragDrop: 'Arraste e solte o ficheiro aqui ou',
            browse: 'procurar',
            supportedFormats: 'Formatos suportados: PDF, JPG, PNG (Máx. 5MB)',
            documentUploaded: 'Documento carregado',
            uploadError: 'Erro ao carregar documento',

            // Finalização
            finalization: 'Finalização da Conta',
            accountCreated: 'Inscrição efectuada!',
            accountNumber: 'Número de Referência',
            nextSteps: 'Próximos Passos',
            visitBranch: 'Visite uma das nossas agências para activar a sua conta',
            requiredDocuments: 'Leve os seguintes documentos:',
            biOriginal: 'BI Original',
            keepAccountNumber: 'Guarde o seu número de referência',
            printDetails: 'Imprimir Detalhes',

            // Validações
            requiredField: 'Campo obrigatório',
            invalidEmail: 'Email inválido',
            invalidPhone: 'Número de telemóvel inválido',
            minDeposit: 'Depósito mínimo: 500 MT',
            invalidnuib: 'NUIB inválido',
            invalidNUIT: 'NUIT inválido',
            documentRequired: 'Documento obrigatório',

            // Províncias de Moçambique
            provinces: {
                maputo: 'Maputo Cidade',
                maputoProvince: 'Maputo Província',
                gaza: 'Gaza',
                inhambane: 'Inhambane',
                sofala: 'Sofala',
                manica: 'Manica',
                tete: 'Tete',
                zambezia: 'Zambézia',
                nampula: 'Nampula',
                caboDelgado: 'Cabo Delgado',
                niassa: 'Niassa'
            },
        },
        EN: {
            title: 'Open Bank Account',
            subtitle: 'Join us and get access to complete banking services',
            individualAccount: 'Individual Account',
            businessAccount: 'Business Account',
            step1: 'Account Type',
            step2: 'Personal Information',
            step3: 'Address',
            step4: 'Account Information',
            step5: 'Documents',
            step6: 'Finalization',
            next: 'Next',
            previous: 'Previous',
            createAccount: 'Submit request',
            loading: 'Processing...',
            success: 'Account created successfully!',

            // Account types
            accountType: 'Account Type',
            currentAccount: 'Current Account',
            savingsAccount: 'Savings Account',
            individualDescription: 'For personal use and individual financial management',
            businessDescription: 'For companies and independent professionals',

            // Card Customization
            cardCustomization: 'Card Customization',
            simpleCard: 'Simple Card',
            personalizedCard: 'Personalized Card',
            simpleCardDescription: 'Standard name on card (first and last name)',
            personalizedCardDescription: 'Choose the name that appears on your card',
            cardName: 'Name on Card',
            enterCardName: 'Enter the name you want on the card',
            cardNamePlaceholder: 'Ex: Maria Silva, Dr. João, Company XYZ',
            cardNameMaxLength: 'Maximum 20 characters',
            cardNameRequired: 'Card name is required for personalization',

            // Personal information
            personalInfo: 'Personal Information',
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email',
            phone: 'Phone',
            birthDate: 'Birth Date',
            nuib: 'Tax Identification Number (NUIB)',
            nationality: 'Nationality',
            mozambican: 'Mozambican',
            foreign: 'Foreign',

            // Address
            addressInfo: 'Address Information',
            address: 'Address',
            city: 'City',
            province: 'Province',
            postalCode: 'Postal Code',

            // Company information
            companyInfo: 'Company Information',
            companyName: 'Company Name',
            companyNuit: 'Company NUIT',
            companyActivity: 'Main Activity',
            companyAddress: 'Company Address',

            // Account information
            accountInfo: 'Account Information',
            initialDeposit: 'Initial Deposit',
            currency: 'Currency',
            mzn: 'Metical (MZN)',
            usd: 'US Dollar (USD)',

            // Documents
            documents: 'Required Documents',
            bi: 'Identity Card (BI)',
            declaracaoBairro: 'Neighborhood Declaration',
            nuit: 'NUIT Card',
            declaracaoRendimento: 'Income Declaration',
            uploadDocument: 'Upload Document',
            dragDrop: 'Drag and drop file here or',
            browse: 'browse',
            supportedFormats: 'Supported formats: PDF, JPG, PNG (Max. 5MB)',
            documentUploaded: 'Document uploaded',
            uploadError: 'Error uploading document',

            // Finalization
            finalization: 'Account Finalization',
            accountCreated: 'Registration completed!',
            accountNumber: 'Reference Number',
            nextSteps: 'Next Steps',
            visitBranch: 'Visit one of our branches to activate your account',
            requiredDocuments: 'Bring the following documents:',
            biOriginal: 'Original ID',
            keepAccountNumber: 'Keep your Reference Number safe',
            printDetails: 'Print Details',

            // Validations
            requiredField: 'Required field',
            invalidEmail: 'Invalid email',
            invalidPhone: 'Invalid phone number',
            minDeposit: 'Minimum deposit: 500 MT',
            invalidnuib: 'Invalid NUIB',
            invalidNUIT: 'Invalid NUIT',
            documentRequired: 'Required document',

            // Mozambique provinces
            provinces: {
                maputo: 'Maputo City',
                maputoProvince: 'Maputo Province',
                gaza: 'Gaza',
                inhambane: 'Inhambane',
                sofala: 'Sofala',
                manica: 'Manica',
                tete: 'Tete',
                zambezia: 'Zambezia',
                nampula: 'Nampula',
                caboDelgado: 'Cabo Delgado',
                niassa: 'Niassa'
            },
        }
    };

    const t = texts[language];

    // Províncias de Moçambique
    const provinces = Object.values(t.provinces);

    // Validações

    const validatePhone = (phone: string) => {
        const phoneRegex = /^8[2-7][0-9]{7}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    };


    const validateNUIT = (nuit: string) => {
        return nuit.length === 9 && /^\d+$/.test(nuit);
    };

    // Atualizar dados do formulário
    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Manipular upload de documentos
    const handleDocumentUpload = (documentId: string, file: File) => {
        if (file.size > 5 * 1024 * 1024) {
            alert('File size too large. Maximum 5MB allowed.');
            return;
        }

        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            alert('Invalid file type. Please upload PDF, JPG, or PNG files.');
            return;
        }

        setDocuments(prev => prev.map(doc =>
            doc.id === documentId
                ? { ...doc, file, name: file.name, uploaded: true }
                : doc
        ));
    };

    const handleDrop = (documentId: string, e: React.DragEvent) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleDocumentUpload(documentId, files[0]);
        }
    };

    const handleFileInput = (documentId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleDocumentUpload(documentId, files[0]);
        }
    };

    // Validar passo atual
    const validateStep = (step: number) => {
        switch (step) {
            case 1:
                return true;

            case 2:
                if (!formData.firstName || !formData.lastName || !formData.phone || !formData.birthDate || !formData.nationality) {
                    alert(t.requiredField);
                    return false;
                }

                if (!validatePhone(formData.phone)) {
                    alert(t.invalidPhone);
                    return false;
                }
                return true;

            case 3:
                if (!formData.address || !formData.city || !formData.province) {
                    alert(t.requiredField);
                    return false;
                }
                if (accountType === 'business' && (!formData.companyName || !formData.companyNuit || !formData.companyActivity || !formData.companyAddress)) {
                    alert(t.requiredField);
                    return false;
                }
                if (accountType === 'business' && !validateNUIT(formData.companyNuit)) {
                    alert(t.invalidNUIT);
                    return false;
                }
                return true;

            case 4:
                if (!formData.initialDeposit || parseFloat(formData.initialDeposit) < 500) {
                    alert(t.minDeposit);
                    return false;
                }
                // Validar nome do cartão se for personalizado
                if (cardCustomization === 'personalized' && !formData.cardName.trim()) {
                    alert(t.cardNameRequired);
                    return false;
                }
                return true;

            case 5:
                const allDocumentsUploaded = documents.every(doc => doc.uploaded);
                if (!allDocumentsUploaded) {
                    alert(t.documentRequired);
                    return false;
                }
                return true;

            default:
                return true;
        }
    };

    // Navegação entre passos
    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 6));
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    // Gerar número de conta aleatório
    const generateAccountNumber = () => {
        const prefix = '001'; // Código do banco
        const branch = '0001'; // Código da agência
        const random = Math.floor(100000 + Math.random() * 900000); // 6 dígitos aleatórios
        return `${prefix}${branch}${random}`;
    };

    // Submeter formulário
    const handleSubmit = async () => {
        if (!validateStep(5)) return;

        setIsLoading(true);

        try {
            // Simular processamento
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Gerar número de conta
            const newAccountNumber = generateAccountNumber();
            setAccountNumber(newAccountNumber);

            // // Aqui você integraria com a API real do banco
            // console.log('Dados da conta:', {
            //     accountType,
            //     cardCustomization,
            //     cardName: cardCustomization === 'personalized' ? formData.cardName : `${formData.firstName} ${formData.lastName}`,
            //     ...formData,
            //     documents,
            //     accountNumber: newAccountNumber
            // });

            setCurrentStep(6); // Tela de finalização

        } catch (error) {
            console.error('Erro ao criar conta:', error);
            alert(language === 'PT' ? 'Erro ao criar conta' : 'Error creating account');
        } finally {
            setIsLoading(false);
        }
    };

    // Tela de finalização
    if (currentStep === 6) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center py-8 px-4">
                <div className="max-w-2xl w-full">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CiCircleCheck size={40} className="text-green-600" />
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                            {t.accountCreated}
                        </h1>

                        <div className="bg-gray-50 rounded-lg p-6 mb-6 text-center">
                            <p className="text-sm text-gray-600 mb-2">{t.accountNumber}</p>
                            <p className="text-3xl font-bold text-gray-900 tracking-wider">
                                {accountNumber}
                            </p>
                        </div>

                        <div className="space-y-4 mb-6">
                            <h3 className="font-semibold text-gray-900">{t.nextSteps}</h3>
                            <p className="text-gray-600">{t.visitBranch}</p>
                            
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <h4 className="font-medium text-yellow-800 mb-2">{t.requiredDocuments}:</h4>
                                <ul className="text-sm text-yellow-700 space-y-1">
                                    <li>• {t.biOriginal}</li>
                                </ul>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-700">
                                    <strong>{t.keepAccountNumber}</strong> - {language === 'PT' 
                                        ? 'Você precisará deste número para activar sua conta no balcão'
                                        : 'You will need this number to activate your account at the branch'}
                                </p>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={() => window.print()}
                                className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                            >
                                {t.printDetails}
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >
                                {language === 'PT' ? 'Ir para Início' : 'Go to Home'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar language={language} setLanguage={function (): void {
                throw new Error('Function not implemented.');
            } }  />
            <div className="min-h-screen bg-linear-to-br from-white to-gray-50 flex items-center justify-center py-8 px-4">
                <div className="max-w-4xl w-full">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-red-600 p-6 text-white">
                            <div className="flex items-center space-x-3 mb-4">
                                <TbBuildingBank size={32} />
                                <div>
                                    <h1 className="text-2xl font-bold">{t.title}</h1>
                                    <p className="text-red-100">{t.subtitle}</p>
                                </div>
                            </div>

                            {/* Progress Steps */}
                            <div className="flex justify-between items-center">
                                {[1, 2, 3, 4, 5].map(step => (
                                    <div key={step} className="flex items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === currentStep
                                            ? 'bg-white text-red-600'
                                            : step < currentStep
                                                ? 'bg-green-500 text-white'
                                                : 'bg-red-500 text-white'
                                            }`}>
                                            {step < currentStep ? <CiCircleCheck size={16} /> : step}
                                        </div>
                                        {step < 5 && (
                                            <div className={`w-12 h-1 mx-2 ${step < currentStep ? 'bg-green-500' : 'bg-red-400'
                                                }`} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Conteúdo do Formulário */}
                        <div className="p-8">
                            {/* Passo 1: Tipo de Conta */}
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.step1}</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <button
                                            onClick={() => setAccountType('individual')}
                                            className={`p-6 border-2 rounded-xl text-left transition-all ${accountType === 'individual'
                                                ? 'border-red-500 bg-red-50 text-red-700'
                                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                                }`}
                                        >
                                            <CiUser size={32} className="mb-3" />
                                            <h3 className="font-semibold text-lg mb-2">{t.individualAccount}</h3>
                                            <p className="text-sm text-gray-600">{t.individualDescription}</p>
                                        </button>

                                        <button
                                            onClick={() => setAccountType('business')}
                                            className={`p-6 border-2 rounded-xl text-left transition-all ${accountType === 'business'
                                                ? 'border-red-500 bg-red-50 text-red-700'
                                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                                }`}
                                        >
                                            <TbBuildingBank size={32} className="mb-3" />
                                            <h3 className="font-semibold text-lg mb-2">{t.businessAccount}</h3>
                                            <p className="text-sm text-gray-600">{t.businessDescription}</p>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Passo 2: Informações Pessoais */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.personalInfo}</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t.firstName} *
                                            </label>
                                            <div className="relative">
                                                <CiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                <input
                                                    type="text"
                                                    value={formData.firstName}
                                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t.lastName} *
                                            </label>
                                            <div className="relative">
                                                <CiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                <input
                                                    type="text"
                                                    value={formData.lastName}
                                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t.email}
                                            </label>
                                            <div className="relative">
                                                <CiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t.phone} *
                                            </label>
                                            <div className="relative">
                                                <CiMobile3 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                                    placeholder="82 123 4567"
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t.birthDate} *
                                            </label>
                                            <div className="relative">
                                                <CiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                <input
                                                    type="date"
                                                    value={formData.birthDate}
                                                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t.nuib} 
                                            </label>
                                            <div className="relative">
                                                <CiBank className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                <input
                                                    type="text"
                                                    value={formData.nuib}
                                                    onChange={(e) => handleInputChange('nuib', e.target.value)}
                                                    placeholder="123456789"
                                                    maxLength={9}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t.nationality} *
                                            </label>
                                            <select
                                                value={formData.nationality}
                                                onChange={(e) => handleInputChange('nationality', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                            >
                                                <option value="">{language === 'PT' ? 'Selecionar nacionalidade' : 'Select nationality'}</option>
                                                <option value="mozambican">{t.mozambican}</option>
                                                <option value="foreign">{t.foreign}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Passo 3: Endereço e Informações da Empresa */}
                            {currentStep === 3 && (
                                <div className="space-y-8">
                                    {/* Endereço Pessoal */}
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.addressInfo}</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t.address} *
                                                </label>
                                                <div className="relative">
                                                    <CiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                    <input
                                                        type="text"
                                                        value={formData.address}
                                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t.city} *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.city}
                                                    onChange={(e) => handleInputChange('city', e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t.province} *
                                                </label>
                                                <select
                                                    value={formData.province}
                                                    onChange={(e) => handleInputChange('province', e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                >
                                                    <option value="">{language === 'PT' ? 'Selecionar província' : 'Select province'}</option>
                                                    {provinces.map(province => (
                                                        <option key={province} value={province}>{province}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t.postalCode}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.postalCode}
                                                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Informações da Empresa (apenas para conta empresarial) */}
                                    {accountType === 'business' && (
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.companyInfo}</h2>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        {t.companyName} *
                                                    </label>
                                                    <div className="relative">
                                                        <TbBuildingBank className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                        <input
                                                            type="text"
                                                            value={formData.companyName}
                                                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        {t.companyNuit} *
                                                    </label>
                                                    <div className="relative">
                                                        <CiBank className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                        <input
                                                            type="text"
                                                            value={formData.companyNuit}
                                                            onChange={(e) => handleInputChange('companyNuit', e.target.value)}
                                                            placeholder="123456789"
                                                            maxLength={9}
                                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        {t.companyActivity} *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.companyActivity}
                                                        onChange={(e) => handleInputChange('companyActivity', e.target.value)}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                    />
                                                </div>

                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        {t.companyAddress} *
                                                    </label>
                                                    <div className="relative">
                                                        <CiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                        <input
                                                            type="text"
                                                            value={formData.companyAddress}
                                                            onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Passo 4: Informações da Conta */}
                            {currentStep === 4 && (
                                <div className="space-y-8">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.accountInfo}</h2>

                                    {/* Personalização do Cartão */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                            <CiCreditCard1 className="mr-2 text-red-600" size={24} />
                                            {t.cardCustomization}
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <button
                                                onClick={() => setCardCustomization('simple')}
                                                className={`p-6 border-2 rounded-xl text-left transition-all ${cardCustomization === 'simple'
                                                    ? 'border-red-500 bg-red-50 text-red-700'
                                                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                                    }`}
                                            >
                                                <CiCreditCard1 size={32} className="mb-3" />
                                                <h4 className="font-semibold text-lg mb-2">{t.simpleCard}</h4>
                                                <p className="text-sm text-gray-600">{t.simpleCardDescription}</p>
                                                <div className="mt-3 text-sm font-medium">
                                                    {language === 'PT' ? 'Nome padrão:' : 'Default name:'} {formData.firstName} {formData.lastName}
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => setCardCustomization('personalized')}
                                                className={`p-6 border-2 rounded-xl text-left transition-all ${cardCustomization === 'personalized'
                                                    ? 'border-red-500 bg-red-50 text-red-700'
                                                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                                    }`}
                                            >
                                                <CiCreditCard1 size={32} className="mb-3" />
                                                <h4 className="font-semibold text-lg mb-2">{t.personalizedCard}</h4>
                                                <p className="text-sm text-gray-600">{t.personalizedCardDescription}</p>
                                                <div className="mt-3 text-sm text-red-600 font-medium">
                                                    {t.cardNameMaxLength}
                                                </div>
                                            </button>
                                        </div>

                                        {/* Campo para nome personalizado do cartão */}
                                        {cardCustomization === 'personalized' && (
                                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                                    {t.cardName} *
                                                </label>
                                                <div className="relative">
                                                    <CiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                    <input
                                                        type="text"
                                                        value={formData.cardName}
                                                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                                                        placeholder={t.cardNamePlaceholder}
                                                        maxLength={20}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                    />
                                                </div>
                                                <div className="flex justify-between mt-2">
                                                    <p className="text-sm text-gray-500">{t.enterCardName}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {formData.cardName.length}/20 {language === 'PT' ? 'caracteres' : 'characters'}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Informações da Conta */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t.accountType} *
                                            </label>
                                            <select
                                                value={formData.accountType}
                                                onChange={(e) => handleInputChange('accountType', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                            >
                                                <option value="current">{t.currentAccount}</option>
                                                <option value="savings">{t.savingsAccount}</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t.currency} *
                                            </label>
                                            <select
                                                value={formData.currency}
                                                onChange={(e) => handleInputChange('currency', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                            >
                                                <option value="MZN">{t.mzn}</option>
                                                <option value="USD">{t.usd}</option>
                                            </select>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t.initialDeposit} *
                                            </label>
                                            <div className="relative">
                                                <CiBank className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                <input
                                                    type="number"
                                                    value={formData.initialDeposit}
                                                    onChange={(e) => handleInputChange('initialDeposit', e.target.value)}
                                                    min="500"
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                />
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">{t.minDeposit}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Passo 5: Documentos */}
                            {currentStep === 5 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.documents}</h2>

                                    <div className="grid grid-cols-1 gap-6">
                                        {documents.map((document) => (
                                            <div key={document.id} className="border border-gray-200 rounded-lg p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center space-x-3">
                                                        <CiFileOn size={24} className="text-gray-400" />
                                                        <div>
                                                            <h3 className="font-semibold text-gray-900">
                                                                {document.type === 'bi' && t.bi}
                                                                {document.type === 'declaracao_bairro' && t.declaracaoBairro}
                                                                {document.type === 'nuit' && t.nuit}
                                                                {document.type === 'declaracao_rendimento' && t.declaracaoRendimento}
                                                            </h3>
                                                            <p className="text-sm text-gray-500">{t.supportedFormats}</p>
                                                        </div>
                                                    </div>
                                                    {document.uploaded && (
                                                        <div className="flex items-center space-x-2 text-green-600">
                                                            <CiCircleCheck size={20} />
                                                            <span className="text-sm font-medium">{t.documentUploaded}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div
                                                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${document.uploaded
                                                        ? 'border-green-300 bg-green-50'
                                                        : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                                                        }`}
                                                    onDrop={(e) => handleDrop(document.id, e)}
                                                    onDragOver={(e) => e.preventDefault()}
                                                >
                                                    {document.uploaded ? (
                                                        <div>
                                                            <CiFileOn size={48} className="text-green-500 mx-auto mb-3" />
                                                            <p className="text-green-700 font-medium">{document.name}</p>
                                                            <button
                                                                type="button"
                                                                onClick={() => setDocuments(prev => prev.map(doc =>
                                                                    doc.id === document.id
                                                                        ? { ...doc, file: null, name: '', uploaded: false }
                                                                        : doc
                                                                ))}
                                                                className="text-red-600 text-sm mt-2 hover:text-red-700"
                                                            >
                                                                {language === 'PT' ? 'Remover' : 'Remove'}
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <IoCloudUpload size={48} className="text-gray-400 mx-auto mb-3" />
                                                            <p className="text-gray-600 mb-2">
                                                                {t.dragDrop} <span className="text-red-600 font-medium">{t.browse}</span>
                                                            </p>
                                                            <input
                                                                type="file"
                                                                id={`file-${document.id}`}
                                                                className="hidden"
                                                                onChange={(e) => handleFileInput(document.id, e)}
                                                                accept=".pdf,.jpg,.jpeg,.png"
                                                            />
                                                            <label
                                                                htmlFor={`file-${document.id}`}
                                                                className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-700 transition-colors"
                                                            >
                                                                {t.uploadDocument}
                                                            </label>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Navegação */}
                            <div className="flex justify-between mt-8">
                                <button
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {t.previous}
                                </button>

                                {currentStep < 5 ? (
                                    <button
                                        onClick={nextStep}
                                        className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                                    >
                                        {t.next}
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                <span>{t.loading}</span>
                                            </>
                                        ) : (
                                            <span>{t.createAccount}</span>
                                        )}
                                    </button>
                                )}
                            </div>

                            {/* Link para login */}
                            <div className="text-center mt-6">
                                <p className="text-gray-600">
                                    {language === 'PT' ? 'Já tem uma conta?' : 'Already have an account?'}{' '}
                                    <Link to="/signin" className="text-red-600 hover:text-red-700 font-medium">
                                        {language === 'PT' ? 'Faça login' : 'Login'}
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Signup;