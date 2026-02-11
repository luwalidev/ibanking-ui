// pages/BusinessSalaryPayments.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BusinessLayout } from '../../../components/BusinessLayout';
import { CiCalendar, CiRepeat } from "react-icons/ci";

interface Beneficiary {
    id: string;
    nib: string;
    name: string;
    email: string;
    department: string;
    position: string;
    baseSalary: number;
    bankName: string;
}

interface TransferItem {
    id: string;
    nib: string;
    name: string;
    amount: string;
    description: string;
    email: string;
    department: string;
    position: string;
    status: 'pending' | 'valid' | 'error';
    error?: string;
    selectedBeneficiaryId?: string;
}

interface RecurringSettings {
    isRecurring: boolean;
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    startDate: string;
    endDate?: string;
    numberOfOccurrences?: number;
}

interface DocumentOptions {
    includeConsolidated: boolean;
    includeIndividual: boolean;
    sendToBeneficiaries: boolean;
    includePayslip: boolean;
}

const BusinessSalaryPayments: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fromAccount: '',
        salaryPeriod: '',
        paymentDate: new Date().toISOString().split('T')[0],
        scheduled: false,
        scheduleDate: '',
        includeTaxes: true,
        includeBenefits: true
    });
    const [transfers, setTransfers] = useState<TransferItem[]>([]);
    const [showImportModal, setShowImportModal] = useState(false);
    const [showBeneficiariesModal, setShowBeneficiariesModal] = useState(false);
    const [, setShowEmailModal] = useState(false);
    const [showDocumentModal, setShowDocumentModal] = useState(false);
    const [emailData, setEmailData] = useState({
        email: '',
        subject: 'Extrato de Pagamento de Salários',
        message: ''
    });
    const [, setEmailSent] = useState(false);
    const [documentOptions, setDocumentOptions] = useState<DocumentOptions>({
        includeConsolidated: true,
        includeIndividual: true,
        sendToBeneficiaries: false,
        includePayslip: true
    });

    // Estado para configurações recorrentes
    const [recurringSettings, setRecurringSettings] = useState<RecurringSettings>({
        isRecurring: false,
        frequency: 'monthly',
        startDate: new Date().toISOString().split('T')[0],
        numberOfOccurrences: 1
    });

    // Dados estáticos de beneficiários para preenchimento automático
    const staticBeneficiaries: Beneficiary[] = [
        {
            id: '1',
            nib: 'PT50 1234 5678 9012 3456 7890',
            name: 'João Carlos Silva',
            email: 'joao.silva@empresa.com',
            department: 'TI',
            position: 'Desenvolvedor Sênior',
            baseSalary: 85000,
            bankName: 'UBA Moçambique'
        },
        {
            id: '2',
            nib: 'PT50 9876 5432 1098 7654 3210',
            name: 'Maria Fernanda Santos',
            email: 'maria.santos@empresa.com',
            department: 'Financeiro',
            position: 'Contadora',
            baseSalary: 75000,
            bankName: 'Standard Bank'
        },
        {
            id: '3',
            nib: 'PT50 1111 2222 3333 4444 5555',
            name: 'Pedro Augusto Pereira',
            email: 'pedro.pereira@empresa.com',
            department: 'Vendas',
            position: 'Gerente Comercial',
            baseSalary: 95000,
            bankName: 'BCI'
        },
        {
            id: '4',
            nib: 'PT50 6666 7777 8888 9999 0000',
            name: 'Ana Beatriz Costa',
            email: 'ana.costa@empresa.com',
            department: 'RH',
            position: 'Especialista em RH',
            baseSalary: 65000,
            bankName: 'UBA Moçambique'
        },
        {
            id: '5',
            nib: 'PT50 5555 4444 3333 2222 1111',
            name: 'Carlos Eduardo Lima',
            email: 'carlos.lima@empresa.com',
            department: 'Marketing',
            position: 'Gestor de Marketing',
            baseSalary: 70000,
            bankName: 'Standard Bank'
        },
        {
            id: '6',
            nib: 'PT50 9999 8888 7777 6666 5555',
            name: 'Sofia Isabel Mendes',
            email: 'sofia.mendes@empresa.com',
            department: 'Operações',
            position: 'Supervisor de Operações',
            baseSalary: 80000,
            bankName: 'BCI'
        },
        {
            id: '7',
            nib: 'PT50 7777 9999 1111 3333 5555',
            name: 'Miguel Ângelo Rodrigues',
            email: 'miguel.rodrigues@empresa.com',
            department: 'Logística',
            position: 'Coordenador de Logística',
            baseSalary: 72000,
            bankName: 'UBA Moçambique'
        },
        {
            id: '8',
            nib: 'PT50 2222 4444 6666 8888 0000',
            name: 'Luísa Helena Oliveira',
            email: 'luisa.oliveira@empresa.com',
            department: 'Jurídico',
            position: 'Advogada Corporativa',
            baseSalary: 90000,
            bankName: 'Standard Bank'
        }
    ];

    const accounts = [
        { id: '1', name: 'Conta Salários Empresa', number: 'PT50 1234 5678 9012 3456 7890', balance: 1250000.75 },
        { id: '2', name: 'Conta Operações', number: 'PT50 1234 5678 9012 3456 7891', balance: 25420.15 },
    ];

    // Períodos salariais (mantido para uso interno, mas removido da UI)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEmailData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDocumentOptionChange = (option: keyof DocumentOptions, value: boolean) => {
        setDocumentOptions(prev => ({
            ...prev,
            [option]: value
        }));
    };

    // Atualizar configurações recorrentes
    const updateRecurringSettings = (field: keyof RecurringSettings, value: any) => {
        setRecurringSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Adicionar beneficiário da lista
    const addBeneficiaryFromList = (beneficiary: Beneficiary) => {
        const newTransfer: TransferItem = {
            id: Date.now().toString(),
            nib: beneficiary.nib,
            name: beneficiary.name,
            amount: beneficiary.baseSalary.toString(),
            description: `Pagamento Mensal`,
            email: beneficiary.email,
            department: beneficiary.department,
            position: beneficiary.position,
            status: 'pending',
            selectedBeneficiaryId: beneficiary.id
        };

        // Validar após adicionar
        setTimeout(() => {
            handleTransferChange(newTransfer.id, 'nib', beneficiary.nib);
        }, 100);

        setTransfers(prev => [...prev, newTransfer]);
        setShowBeneficiariesModal(false);
    };

    const handleManualAdd = () => {
        const newTransfer: TransferItem = {
            id: Date.now().toString(),
            nib: '',
            name: '',
            amount: '',
            description: `Pagamento Mensal`,
            email: '',
            department: '',
            position: '',
            status: 'pending'
        };
        setTransfers(prev => [...prev, newTransfer]);
    };

    const handleTransferChange = (id: string, field: string, value: string) => {
        setTransfers(prev => prev.map(transfer => {
            if (transfer.id === id) {
                const updated = { ...transfer, [field]: value };

                // Atualizar automaticamente se o beneficiário for selecionado
                if (field === 'selectedBeneficiaryId' && value) {
                    const beneficiary = staticBeneficiaries.find(b => b.id === value);
                    if (beneficiary) {
                        updated.nib = beneficiary.nib;
                        updated.name = beneficiary.name;
                        updated.email = beneficiary.email;
                        updated.department = beneficiary.department;
                        updated.position = beneficiary.position;
                        updated.amount = beneficiary.baseSalary.toString();
                    }
                }

                if (field === 'nib' || field === 'amount' || field === 'email') {
                    if (updated.nib && updated.amount) {
                        const nibValid = updated.nib.length >= 20;
                        const amountValid = !isNaN(parseFloat(updated.amount)) && parseFloat(updated.amount) > 0;
                        const emailValid = !updated.email || validateEmail(updated.email);

                        if (nibValid && amountValid && emailValid) {
                            updated.status = 'valid';
                            updated.error = undefined;
                        } else {
                            updated.status = 'error';
                            if (!nibValid) updated.error = 'NIB inválido';
                            else if (!amountValid) updated.error = 'Valor inválido';
                            else if (!emailValid) updated.error = 'Email inválido';
                        }
                    } else {
                        updated.status = 'pending';
                        updated.error = undefined;
                    }
                }

                return updated;
            }
            return transfer;
        }));
    };

    // Validação de email
    const validateEmail = (email: string): boolean => {
        if (!email) return true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const removeTransfer = (id: string) => {
        setTransfers(prev => prev.filter(transfer => transfer.id !== id));
    };

    const handleFileUpload = (file: File) => {
        if (!file.name.match(/\.(xlsx|xls|csv)$/)) {
            alert('Por favor, selecione um arquivo Excel ou CSV válido.');
            return;
        }

        // Mock data para demonstração
        const mockTransfers: TransferItem[] = [
            {
                id: '1',
                nib: 'PT50 9876 5432 1098 7654 3210',
                name: 'João Carlos Silva',
                amount: '85000.00',
                description: `Pagamento Mensal`,
                email: 'joao.silva@empresa.com',
                department: 'TI',
                position: 'Desenvolvedor Sênior',
                status: 'valid'
            },
            {
                id: '2',
                nib: 'PT50 1111 2222 3333 4444 5555',
                name: 'Maria Fernanda Santos',
                amount: '75000.00',
                description: `Pagamento Mensal`,
                email: 'maria.santos@empresa.com',
                department: 'Financeiro',
                position: 'Contadora',
                status: 'valid'
            },
            {
                id: '3',
                nib: 'PT50 6666 7777 8888 9999 0000',
                name: 'Pedro Augusto Pereira',
                amount: '95000.00',
                description: `Pagamento Mensal`,
                email: 'pedro.pereira@empresa.com',
                department: 'Vendas',
                position: 'Gerente Comercial',
                status: 'valid'
            }
        ];

        setTransfers(mockTransfers);
        setShowImportModal(false);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const getTotalAmount = () => {
        return transfers
            .filter(t => t.status === 'valid')
            .reduce((total, transfer) => total + parseFloat(transfer.amount || '0'), 0);
    };

    const getValidTransfers = () => {
        return transfers.filter(t => t.status === 'valid');
    };

    const handleNext = () => {
        if (step === 1 && transfers.length > 0 && getValidTransfers().length > 0 && formData.fromAccount) {
            setStep(2);
        } else if (step === 2) {
            setTimeout(() => {
                setStep(3);
            }, 3000);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleNewBatch = () => {
        setStep(1);
        setTransfers([]);
        setFormData({
            fromAccount: '',
            salaryPeriod: '',
            paymentDate: new Date().toISOString().split('T')[0],
            scheduled: false,
            scheduleDate: '',
            includeTaxes: true,
            includeBenefits: true
        });
        setEmailSent(false);
        setEmailData({
            email: '',
            subject: 'Extrato de Pagamento de Salários',
            message: ''
        });
        setDocumentOptions({
            includeConsolidated: true,
            includeIndividual: true,
            sendToBeneficiaries: false,
            includePayslip: true
        });
        setRecurringSettings({
            isRecurring: false,
            frequency: 'monthly',
            startDate: new Date().toISOString().split('T')[0],
            numberOfOccurrences: 1
        });
    };

    const generateBatchReference = () => {
        return `SAL_${Date.now()}`;
    };

    // Gerar folha de pagamento consolidada
    const generateConsolidatedDocument = () => {
        const batchRef = generateBatchReference();
        const totalAmount = getTotalAmount();
        const validTransfers = getValidTransfers();
        const account = accounts.find(acc => acc.id === formData.fromAccount);

        const documentContent = `
            FOLHA DE PAGAMENTO
            ================================================
            
            DADOS DO PAGAMENTO:
            ------------------
            Referência: ${batchRef}
            Data de Processamento: ${new Date().toLocaleDateString('pt-PT')} ${new Date().toLocaleTimeString('pt-PT')}
            Conta Origem: ${account?.name}
            Número da Conta: ${account?.number}
            Total de Beneficiários: ${validTransfers.length}
            Valor Total: MZN ${totalAmount.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            Tipo: ${recurringSettings.isRecurring ? `Pagamento Recorrente (${recurringSettings.frequency})` : 'Pagamento Único'}
            
            ${recurringSettings.isRecurring ? `
            CONFIGURAÇÃO RECORRENTE:
            -----------------------
            Frequência: ${recurringSettings.frequency}
            Data de Início: ${new Date(recurringSettings.startDate).toLocaleDateString('pt-PT')}
            ${recurringSettings.numberOfOccurrences ? `Número de Ocorrências: ${recurringSettings.numberOfOccurrences}` : ''}
            ${recurringSettings.endDate ? `Data de Fim: ${new Date(recurringSettings.endDate).toLocaleDateString('pt-PT')}` : ''}
            ` : ''}
            
            LISTA DE BENEFICIÁRIOS:
            ----------------------
            ${validTransfers.map((transfer, index) => `
            ${index + 1}. ${transfer.name}
               Departamento: ${transfer.department}
               Cargo: ${transfer.position}
               NIB: ${transfer.nib}
               Email: ${transfer.email || 'Não informado'}
               Montante: MZN ${parseFloat(transfer.amount).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
               Status: ✅ Processado
            `).join('')}
            
            RESUMO FINANCEIRO:
            -----------------
            Valor Total: MZN ${totalAmount.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            Saldo Anterior: MZN ${account?.balance.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            Saldo Posterior: MZN ${((account?.balance || 0) - totalAmount).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            
            ================================================
            UBA Moçambique Business - Energias renováveis, S.A
            Sistema de Pagamento de Salários
            Data de Emissão: ${new Date().toLocaleDateString('pt-PT')}
        `;

        return { content: documentContent, batchRef };
    };

    // Gerar holerite individual
    const generateIndividualPayslips = () => {
        const batchRef = generateBatchReference();
        const account = accounts.find(acc => acc.id === formData.fromAccount);
        
        return getValidTransfers().map(transfer => {
            const amount = parseFloat(transfer.amount);

            const documentContent = `
                COMPROVATIVO DE PAGAMENTO
                ========================================
                
                DADOS DO BENEFICIÁRIO:
                ---------------------
                Nome: ${transfer.name}
                Departamento: ${transfer.department}
                Cargo: ${transfer.position}
                NIB: ${transfer.nib}
                Banco: ${staticBeneficiaries.find(b => b.nib === transfer.nib)?.bankName || 'Não informado'}
                
                DADOS DO PAGAMENTO:
                ------------------
                Data de Pagamento: ${new Date().toLocaleDateString('pt-PT')}
                Referência: ${batchRef}
                Comprovativo: PAG${Date.now()}_${transfer.id}
                
                REMETENTE:
                ----------
                Empresa: Sua Empresa LDA
                Conta Empresa: ${account?.number}
                Banco: UBA Moçambique
                
                DETALHAMENTO DE VALORES:
                -----------------------
                Montante: MZN ${amount.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                
                INFORMAÇÕES:
                ------------
                Tipo: ${recurringSettings.isRecurring ? `Pagamento Recorrente (${recurringSettings.frequency})` : 'Pagamento Único'}
                Status: ✅ Processado com Sucesso
                Data do Processo: ${new Date().toLocaleDateString('pt-PT')}
                
                ${recurringSettings.isRecurring ? `
                PRÓXIMO PAGAMENTO:
                -----------------
                Data: ${new Date(recurringSettings.startDate).toLocaleDateString('pt-PT')}
                Frequência: ${recurringSettings.frequency}
                ` : ''}
                
                ========================================
                UBA Moçambique Business - Energias renováveis, S.A
                Este documento serve como comprovativo oficial.
                Para questões ou correções, contacte o departamento responsável.
            `;

            return {
                transfer,
                content: documentContent,
                fileName: `comprovativo_${transfer.name.replace(/\s+/g, '_')}_${batchRef}.txt`
            };
        });
    };

    // Download da folha de pagamento consolidada
    const downloadConsolidatedDocument = () => {
        const { content, batchRef } = generateConsolidatedDocument();
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `folha_pagamento_${batchRef}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('Folha de pagamento consolidada descarregada com sucesso!');
    };

    // Download de todos os holerites individuais
    const downloadAllIndividualPayslips = () => {
        const individualPayslips = generateIndividualPayslips();
        
        individualPayslips.forEach(payslip => {
            const blob = new Blob([payslip.content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = payslip.fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });

        alert(`${individualPayslips.length} comprovativos individuais descarregados com sucesso!`);
    };

    // Enviar documentos por email
    const handleSendDocuments = () => {
        if (!emailData.email && !documentOptions.sendToBeneficiaries) {
            alert('Por favor, insira um endereço de email ou selecione "Enviar para Beneficiários".');
            return;
        }

        // Simular envio de documentos
        setTimeout(() => {
            const consolidated = generateConsolidatedDocument();
            const individualPayslips = generateIndividualPayslips();
            
            let emailMessage = `Documentos enviados:\n\n`;
            
            if (documentOptions.includeConsolidated) {
                emailMessage += `• Folha de Pagamento Consolidada (${consolidated.batchRef})\n`;
            }
            
            if (documentOptions.includeIndividual && documentOptions.includePayslip) {
                emailMessage += `• ${individualPayslips.length} Comprovativos Individuais\n`;
            }
            
            if (documentOptions.sendToBeneficiaries) {
                const employeesWithEmail = individualPayslips.filter(payslip => payslip.transfer.email);
                emailMessage += `• Enviado para ${employeesWithEmail.length} Beneficiários com email\n`;
            }

            setEmailSent(true);
            setShowEmailModal(false);
            alert(`Documentos enviados com sucesso!\n\n${emailMessage}`);
        }, 2000);
    };

    // Enviar comprovativos para Beneficiários
    const sendToEmployees = () => {
        const individualPayslips = generateIndividualPayslips();
        const payslipsWithEmail = individualPayslips.filter(payslip => payslip.transfer.email);
        
        if (payslipsWithEmail.length === 0) {
            alert('Nenhum funcionário tem email registado para envio.');
            return;
        }

        // Simular envio para Beneficiários
        setTimeout(() => {
            alert(`Comprovativos enviados para ${payslipsWithEmail.length} Beneficiários!`);
        }, 2000);
    };

    // Componente Modal Reutilizável
    const Modal = ({ isOpen, onClose, title, children }: {
        isOpen: boolean;
        onClose: () => void;
        title: string;
        children: React.ReactNode;
    }) => {
        if (!isOpen) return null;

        return (
            <div
                className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-[rgba(0,0,0,0.35)] backdrop-blur-sm"
                onClick={onClose}
            >
                <div
                    className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        );
    };

    return (
        <BusinessLayout>
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Pagamento de Salários</h1>
                            <p className="text-gray-600 mt-1">Execute pagamentos de salários para múltiplos Beneficiários</p>
                        </div>
                        <button
                            onClick={() => navigate('/panel')}
                            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                        >
                            Voltar ao Dashboard
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Conteúdo Principal */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            {/* Progress Steps */}
                            <div className="flex items-center justify-between mb-8">
                                {[1, 2, 3].map((stepNumber) => (
                                    <div key={stepNumber} className="flex items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= stepNumber
                                            ? 'bg-red-600 text-white'
                                            : 'bg-gray-200 text-gray-500'
                                            }`}>
                                            {stepNumber}
                                        </div>
                                        {stepNumber < 3 && (
                                            <div className={`w-16 h-1 mx-2 ${step > stepNumber ? 'bg-red-600' : 'bg-gray-200'
                                                }`} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Step 1: Adicionar Beneficiários */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold text-gray-900">Adicionar Beneficiários</h2>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => setShowBeneficiariesModal(true)}
                                                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                <span>Selecionar Beneficiários</span>
                                            </button>
                                            <button
                                                onClick={() => setShowImportModal(true)}
                                                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <span>Importar do Excel</span>
                                            </button>
                                        </div>
                                    </div>

                                    {transfers.length === 0 ? (
                                        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-2xl">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Comece a adicionar Beneficiários</h3>
                                            <p className="text-gray-600 mb-4">Selecione Beneficiários da lista ou importe de um ficheiro Excel</p>
                                            <div className="flex justify-center space-x-4">
                                                <button
                                                    onClick={() => setShowBeneficiariesModal(true)}
                                                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                                                >
                                                    Selecionar Beneficiários
                                                </button>
                                                <button
                                                    onClick={handleManualAdd}
                                                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                                >
                                                    Adicionar Manualmente
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {/* Formulário de Beneficiários */}
                                            <div className="space-y-4">
                                                {transfers.map((transfer, index) => (
                                                    <div
                                                        key={transfer.id}
                                                        className={`p-4 rounded-xl border-2 transition-colors ${transfer.status === 'valid'
                                                            ? 'border-green-200 bg-green-50'
                                                            : transfer.status === 'error'
                                                                ? 'border-red-200 bg-red-50'
                                                                : 'border-gray-200'
                                                            }`}
                                                    >
                                                        <div className="flex items-start justify-between mb-3">
                                                            <div className="flex items-center space-x-3">
                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${transfer.status === 'valid'
                                                                    ? 'bg-green-100 text-green-600'
                                                                    : transfer.status === 'error'
                                                                        ? 'bg-red-100 text-red-600'
                                                                        : 'bg-gray-100 text-gray-600'
                                                                    }`}>
                                                                    {index + 1}
                                                                </div>
                                                                <div>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Nome do funcionário"
                                                                        value={transfer.name}
                                                                        onChange={(e) => handleTransferChange(transfer.id, 'name', e.target.value)}
                                                                        className="font-semibold bg-transparent border-none focus:ring-0 p-0 placeholder-gray-400"
                                                                    />
                                                                    <div className="flex space-x-4 mt-1">
                                                                        <input
                                                                            type="text"
                                                                            placeholder="Departamento"
                                                                            value={transfer.department}
                                                                            onChange={(e) => handleTransferChange(transfer.id, 'department', e.target.value)}
                                                                            className="text-sm text-gray-600 bg-transparent border-none focus:ring-0 p-0 placeholder-gray-400"
                                                                        />
                                                                        <input
                                                                            type="text"
                                                                            placeholder="Cargo"
                                                                            value={transfer.position}
                                                                            onChange={(e) => handleTransferChange(transfer.id, 'position', e.target.value)}
                                                                            className="text-sm text-gray-600 bg-transparent border-none focus:ring-0 p-0 placeholder-gray-400"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => removeTransfer(transfer.id)}
                                                                className="text-gray-400 hover:text-red-600 transition-colors"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">NIB *</label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="PT50 XXXX XXXX XXXX XXXX XXXX"
                                                                    value={transfer.nib}
                                                                    onChange={(e) => handleTransferChange(transfer.id, 'nib', e.target.value)}
                                                                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 ${transfer.status === 'error' ? 'border-red-300' : 'border-gray-300'
                                                                        }`}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Montante (MZN) *</label>
                                                                <input
                                                                    type="number"
                                                                    placeholder="0,00"
                                                                    step="0.01"
                                                                    value={transfer.amount}
                                                                    onChange={(e) => handleTransferChange(transfer.id, 'amount', e.target.value)}
                                                                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 ${transfer.status === 'error' ? 'border-red-300' : 'border-gray-300'
                                                                        }`}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Email (para comprovativo)</label>
                                                                <input
                                                                    type="email"
                                                                    placeholder="funcionario@empresa.com"
                                                                    value={transfer.email}
                                                                    onChange={(e) => handleTransferChange(transfer.id, 'email', e.target.value)}
                                                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                                                                />
                                                                {transfer.email && !validateEmail(transfer.email) && (
                                                                    <p className="text-red-500 text-xs mt-1">Email inválido</p>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                                                <input
                                                                    type="text"
                                                                    value={transfer.description}
                                                                    onChange={(e) => handleTransferChange(transfer.id, 'description', e.target.value)}
                                                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                                                                />
                                                            </div>
                                                        </div>

                                                        {transfer.error && (
                                                            <div className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                <span>{transfer.error}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}

                                                <button
                                                    onClick={handleManualAdd}
                                                    className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-red-300 hover:text-red-600 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    <span className="font-semibold">Adicionar Outro Funcionário</span>
                                                </button>
                                            </div>

                                            {/* Configurações Recorrentes */}
                                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                                    <CiRepeat className="mr-2 text-red-600" size={20} />
                                                    Pagamento Recorrente
                                                </h3>

                                                <div className="space-y-4">
                                                    <label className="flex items-center space-x-3 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={recurringSettings.isRecurring}
                                                            onChange={(e) => updateRecurringSettings('isRecurring', e.target.checked)}
                                                            className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                                                        />
                                                        <span className="font-medium text-gray-900">Tornar este pagamento recorrente</span>
                                                    </label>

                                                    {recurringSettings.isRecurring && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                    Frequência *
                                                                </label>
                                                                <select
                                                                    value={recurringSettings.frequency}
                                                                    onChange={(e) => updateRecurringSettings('frequency', e.target.value)}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                                >
                                                                    <option value="monthly">Mensal</option>
                                                                    <option value="weekly">Semanal</option>
                                                                    <option value="biweekly">Quinzenal</option>
                                                                    <option value="quarterly">Trimestral</option>
                                                                </select>
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                    Data de Início *
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
                                                                    Número de Pagamentos
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    value={recurringSettings.numberOfOccurrences}
                                                                    onChange={(e) => updateRecurringSettings('numberOfOccurrences', parseInt(e.target.value) || 1)}
                                                                    min="1"
                                                                    max="120"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                    Data de Fim
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

                                            {/* Botões de Navegação */}
                                            <div className="flex space-x-4 pt-6 border-t border-gray-200">
                                                <button
                                                    onClick={() => navigate('/panel')}
                                                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    onClick={handleNext}
                                                    disabled={getValidTransfers().length === 0 || !formData.fromAccount}
                                                    className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    Continuar ({getValidTransfers().length} Beneficiários)
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 2: Confirmação */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Confirmar Pagamento de Salários</h2>

                                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Conta de Origem:</span>
                                            <span className="font-semibold">
                                                {accounts.find(acc => acc.id === formData.fromAccount)?.name}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Número de Beneficiários:</span>
                                            <span className="font-semibold">{getValidTransfers().length}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Valor Total:</span>
                                            <span className="font-semibold text-red-600 text-lg">
                                                MZN {getTotalAmount().toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                        {recurringSettings.isRecurring && (
                                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                                                <div className="flex items-center text-orange-800 mb-2">
                                                    <CiRepeat className="mr-2" size={16} />
                                                    <span className="font-medium">Pagamento Recorrente</span>
                                                </div>
                                                <div className="text-sm text-orange-700 space-y-1">
                                                    <div>Frequência: {recurringSettings.frequency}</div>
                                                    <div>Data de Início: {new Date(recurringSettings.startDate).toLocaleDateString('pt-PT')}</div>
                                                    {recurringSettings.numberOfOccurrences && (
                                                        <div>Número de Pagamentos: {recurringSettings.numberOfOccurrences}</div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="font-semibold text-gray-900">Beneficiários a receber:</h3>
                                        {getValidTransfers().map((transfer) => (
                                            <div key={transfer.id} className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg">
                                                <div>
                                                    <div className="font-medium">{transfer.name}</div>
                                                    <div className="text-sm text-gray-500">{transfer.department} - {transfer.position}</div>
                                                    <div className="text-xs text-gray-400">{transfer.nib}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-semibold">MZN {parseFloat(transfer.amount).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</div>
                                                    <div className="text-sm text-gray-500">{transfer.description}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex space-x-4">
                                        <button
                                            onClick={handleBack}
                                            className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                        >
                                            Voltar
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                        >
                                            Confirmar Pagamentos
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Sucesso */}
                            {step === 3 && (
                                <div className="text-center space-y-6">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pagamentos Processados!</h2>
                                        <p className="text-gray-600">
                                            O pagamento para <strong>{getValidTransfers().length} Beneficiários</strong> no valor total de{' '}
                                            <strong>MZN {getTotalAmount().toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</strong> foi processado com sucesso.
                                        </p>
                                        {recurringSettings.isRecurring && (
                                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mt-3 inline-block">
                                                <div className="flex items-center text-orange-800">
                                                    <CiRepeat className="mr-2" size={16} />
                                                    <span className="font-medium">Pagamento Recorrente Configurado</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Referência do Lote:</span>
                                            <span className="font-mono">{generateBatchReference()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Data:</span>
                                            <span>{new Date().toLocaleDateString('pt-PT')} {new Date().toLocaleTimeString('pt-PT')}</span>
                                        </div>
                                        {recurringSettings.isRecurring && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Próximo Pagamento:</span>
                                                <span>{new Date(recurringSettings.startDate).toLocaleDateString('pt-PT')}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Opções de Documentos */}
                                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Documentos e Comprovativos</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            {/* Folha de Pagamento Consolidada */}
                                            <button
                                                onClick={downloadConsolidatedDocument}
                                                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors text-left"
                                            >
                                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">Folha de Pagamento</div>
                                                    <div className="text-sm text-gray-600">Documento único consolidado</div>
                                                </div>
                                            </button>

                                            {/* Comprovativos Individuais */}
                                            <button
                                                onClick={downloadAllIndividualPayslips}
                                                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                                            >
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">Comprovativos Individuais</div>
                                                    <div className="text-sm text-gray-600">{getValidTransfers().length} comprovativos separados</div>
                                                </div>
                                            </button>
                                        </div>

                                        {/* Opções de Envio */}
                                        <div className="border-t pt-4">
                                            <button
                                                onClick={() => setShowDocumentModal(true)}
                                                className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-green-300 hover:text-green-600 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span className="font-semibold">Enviar Documentos por Email</span>
                                            </button>
                                        </div>

                                        {/* Enviar para Beneficiários */}
                                        {getValidTransfers().some(t => t.email) && (
                                            <div className="mt-4">
                                                <button
                                                    onClick={sendToEmployees}
                                                    className="w-full flex items-center justify-center space-x-2 p-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>Enviar Comprovativos para Beneficiários</span>
                                                </button>
                                                <p className="text-xs text-gray-500 text-center mt-2">
                                                    {getValidTransfers().filter(t => t.email).length} Beneficiários receberão o comprovativo por email
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => navigate('/panel')}
                                            className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                        >
                                            Voltar ao Dashboard
                                        </button>
                                        <button
                                            onClick={handleNewBatch}
                                            className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                        >
                                            Novo Pagamento
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - APENAS Conta de Origem */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Configurações do Pagamento */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurações do Pagamento</h3>
                            
                            {/* Conta de Origem - ÚNICO CAMPO QUE RESTA */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Conta de Origem *
                                </label>
                                <select
                                    name="fromAccount"
                                    value={formData.fromAccount}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                >
                                    <option value="">Selecione a conta</option>
                                    {accounts.map(account => (
                                        <option key={account.id} value={account.id}>
                                            {account.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Programar pagamento - Mantido */}
                            <div className="space-y-3">
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        name="scheduled"
                                        checked={formData.scheduled}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                                    />
                                    <span className="text-sm text-gray-700">
                                        Programar pagamento
                                    </span>
                                </label>

                                {formData.scheduled && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Data de Execução
                                        </label>
                                        <input
                                            type="date"
                                            name="scheduleDate"
                                            value={formData.scheduleDate}
                                            onChange={handleInputChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Resumo */}
                        {step === 1 && transfers.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo da Folha</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total de Beneficiários:</span>
                                        <span className="font-semibold">{transfers.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Válidos para pagamento:</span>
                                        <span className="font-semibold text-green-600">{getValidTransfers().length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Com Erros:</span>
                                        <span className="font-semibold text-red-600">
                                            {transfers.filter(t => t.status === 'error').length}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Com Email:</span>
                                        <span className="font-semibold text-blue-600">
                                            {transfers.filter(t => t.email).length}
                                        </span>
                                    </div>
                                    {recurringSettings.isRecurring && (
                                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
                                            <div className="text-xs text-orange-800 text-center">
                                                Pagamento Recorrente
                                            </div>
                                        </div>
                                    )}
                                    <div className="border-t pt-3">
                                        <div className="flex justify-between text-lg">
                                            <span className="font-semibold">Total:</span>
                                            <span className="font-bold text-red-600">
                                                MZN {getTotalAmount().toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de Importação */}
            <Modal isOpen={showImportModal} onClose={() => setShowImportModal(false)} title="Importar do Excel">
                <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                            Selecione um ficheiro Excel (.xlsx, .xls) ou CSV
                        </p>
                        <input
                            type="file"
                            id="file-upload-modal"
                            accept=".xlsx,.xls,.csv"
                            onChange={handleFileInput}
                            className="hidden"
                        />
                        <label
                            htmlFor="file-upload-modal"
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold cursor-pointer hover:bg-red-700 transition-colors"
                        >
                            Selecionar Ficheiro
                        </label>
                    </div>

                    <div className="bg-red-50 rounded-lg p-3">
                        <h4 className="font-semibold text-red-900 text-sm mb-1">Formato esperado:</h4>
                        <p className="text-red-700 text-xs">
                            Colunas: Nome, NIB (25 caracteres), Email, Departamento, Cargo, Montante
                        </p>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={() => setShowImportModal(false)}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => {
                                alert('Template para folha de pagamento descarregado!');
                            }}
                            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                        >
                            Descarregar Template
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Modal de Seleção de Beneficiários */}
            <Modal isOpen={showBeneficiariesModal} onClose={() => setShowBeneficiariesModal(false)} title="Selecionar Beneficiários">
                <div className="space-y-4">
                    <div className="max-h-96 overflow-y-auto space-y-2">
                        {staticBeneficiaries.map(beneficiary => (
                            <div 
                                key={beneficiary.id}
                                className="p-3 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors cursor-pointer"
                                onClick={() => addBeneficiaryFromList(beneficiary)}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-medium text-gray-900">{beneficiary.name}</div>
                                        <div className="text-sm text-gray-600">
                                            {beneficiary.department} • {beneficiary.position}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            NIB: {beneficiary.nib}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold text-green-600">
                                            MZN {beneficiary.baseSalary.toLocaleString('pt-PT')}
                                        </div>
                                        <div className="text-xs text-gray-500">{beneficiary.bankName}</div>
                                    </div>
                                </div>
                                <div className="mt-2 text-xs text-blue-600">
                                    {beneficiary.email}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-blue-700 text-sm">
                            <strong>Total de Beneficiários:</strong> {staticBeneficiaries.length}
                            <br />
                            <span className="text-xs">Clique em um funcionário para adicionar à lista de pagamentos</span>
                        </p>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={() => setShowBeneficiariesModal(false)}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Fechar
                        </button>
                        <button
                            onClick={() => {
                                // Adicionar todos os Beneficiários
                                staticBeneficiaries.forEach(beneficiary => addBeneficiaryFromList(beneficiary));
                                setShowBeneficiariesModal(false);
                            }}
                            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                            Adicionar Todos
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Modal de Documentos */}
            <Modal isOpen={showDocumentModal} onClose={() => setShowDocumentModal(false)} title="Enviar Documentos por Email">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email de Destino
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={emailData.email}
                            onChange={handleEmailChange}
                            placeholder="rh@empresa.com"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Assunto
                        </label>
                        <input
                            type="text"
                            name="subject"
                            value={emailData.subject}
                            onChange={handleEmailChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mensagem (Opcional)
                        </label>
                        <textarea
                            name="message"
                            value={emailData.message}
                            onChange={handleEmailChange}
                            placeholder="Adicione uma mensagem personalizada..."
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Opções de Documentos */}
                    <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Documentos a Incluir:</h4>
                        
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={documentOptions.includeConsolidated}
                                onChange={(e) => handleDocumentOptionChange('includeConsolidated', e.target.checked)}
                                className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                            />
                            <div>
                                <span className="font-medium text-gray-900">Folha de Pagamento Consolidada</span>
                                <p className="text-xs text-gray-500">Documento único com todos os pagamentos</p>
                            </div>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={documentOptions.includeIndividual && documentOptions.includePayslip}
                                onChange={(e) => {
                                    handleDocumentOptionChange('includeIndividual', e.target.checked);
                                    handleDocumentOptionChange('includePayslip', e.target.checked);
                                }}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <div>
                                <span className="font-medium text-gray-900">Comprovativos Individuais</span>
                                <p className="text-xs text-gray-500">{getValidTransfers().length} comprovativos separados</p>
                            </div>
                        </label>

                        {getValidTransfers().some(t => t.email) && (
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={documentOptions.sendToBeneficiaries}
                                    onChange={(e) => handleDocumentOptionChange('sendToBeneficiaries', e.target.checked)}
                                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                                />
                                <div>
                                    <span className="font-medium text-gray-900">Enviar para Beneficiários</span>
                                    <p className="text-xs text-gray-500">
                                        {getValidTransfers().filter(t => t.email).length} Beneficiários receberão comprovativo
                                    </p>
                                </div>
                            </label>
                        )}
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={() => setShowDocumentModal(false)}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSendDocuments}
                            disabled={!emailData.email && !documentOptions.sendToBeneficiaries}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            Enviar Documentos
                        </button>
                    </div>
                </div>
            </Modal>

        </BusinessLayout>
    );
};

export default BusinessSalaryPayments;