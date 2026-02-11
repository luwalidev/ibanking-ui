// pages/BusinessBeneficiaries.tsx
import React, { useState } from 'react';
import {
    FaSearch,
    FaPlus,
    FaEdit,
    FaTrash,
    FaUserFriends,
    FaCopy,
    FaCheck
} from 'react-icons/fa';
import { BusinessLayout } from '../../../components/BusinessLayout';

interface BusinessBeneficiariesProps {
    language: 'PT' | 'EN';
}

interface Beneficiary {
    id: string;
    name: string;
    nib: string;
    email: string;
    department: string;
    position: string;
    baseSalary: number;
    bankName: string;
    createdAt: string;
    lastUsed?: string;
}

const BusinessBeneficiaries: React.FC<BusinessBeneficiariesProps> = ({ language }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);
    const [copiedField, setCopiedField] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Estado para o formulário - Campos alinhados com BusinessSalaryPayments
    const [formData, setFormData] = useState({
        name: '',
        nib: '',
        email: '',
        department: '',
        position: '',
        baseSalary: '',
        bankName: 'UBA Moçambique'
    });

    const currentTexts = {
        PT: {
            title: "Beneficiários",
            subtitle: "Gerir a sua lista de beneficiários para pagamentos de salários",
            searchPlaceholder: "Pesquisar beneficiários...",
            addBeneficiary: "Adicionar Beneficiário",
            editBeneficiary: "Editar Beneficiário",
            deleteBeneficiary: "Eliminar Beneficiário",
            name: "Nome Completo",
            nib: "NIB",
            email: "Email",
            department: "Departamento",
            position: "Cargo",
            baseSalary: "Montante (MZN)",
            bank: "Banco",
            save: "Guardar",
            cancel: "Cancelar",
            delete: "Eliminar",
            confirmDelete: "Tem a certeza que deseja eliminar este beneficiário?",
            noBeneficiaries: "Nenhum beneficiário encontrado",
            addFirstBeneficiary: "Adicionar o seu primeiro beneficiário",
            copy: "Copiar",
            copied: "Copiado!",
            lastUsed: "Última utilização",
            created: "Adicionado em",
            actions: "Ações",
            requiredField: "Campo obrigatório",
            invalidNIB: "NIB deve ter pelo menos 20 caracteres",
            invalidEmail: "Email inválido",
            successAdd: "Beneficiário adicionado com sucesso!",
            successEdit: "Beneficiário atualizado com sucesso!",
            successDelete: "Beneficiário eliminado com sucesso!",
            banks: {
                uba: "UBA Moçambique",
                standard: "Standard Bank",
                bci: "BCI",
                millennium: "Millennium BIM",
                absa: "Absa Bank",
                other: "Outro Banco"
            }
        },
        EN: {
            title: "Beneficiaries",
            subtitle: "Manage your beneficiaries list for salary payments",
            searchPlaceholder: "Search beneficiaries...",
            addBeneficiary: "Add Beneficiary",
            editBeneficiary: "Edit Beneficiary",
            deleteBeneficiary: "Delete Beneficiary",
            name: "Full Name",
            nib: "NIB",
            email: "Email",
            department: "Department",
            position: "Position",
            baseSalary: "Base Salary (MZN)",
            bank: "Bank",
            save: "Save",
            cancel: "Cancel",
            delete: "Delete",
            confirmDelete: "Are you sure you want to delete this beneficiary?",
            noBeneficiaries: "No beneficiaries found",
            addFirstBeneficiary: "Add your first beneficiary",
            copy: "Copy",
            copied: "Copied!",
            lastUsed: "Last used",
            created: "Added on",
            actions: "Actions",
            requiredField: "Required field",
            invalidNIB: "NIB must have at least 20 characters",
            invalidEmail: "Invalid email",
            successAdd: "Beneficiary added successfully!",
            successEdit: "Beneficiary updated successfully!",
            successDelete: "Beneficiary deleted successfully!",
            banks: {
                uba: "UBA Mozambique",
                standard: "Standard Bank",
                bci: "BCI",
                millennium: "Millennium BIM",
                absa: "Absa Bank",
                other: "Other Bank"
            }
        }
    }[language];

    // Dados de exemplo - Alinhados com BusinessSalaryPayments
    const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
        {
            id: '1',
            name: 'João Carlos Silva',
            nib: 'PT50 1234 5678 9012 3456 7890',
            email: 'joao.silva@empresa.com',
            department: 'TI',
            position: 'Desenvolvedor Sênior',
            baseSalary: 85000,
            bankName: 'UBA Moçambique',
            createdAt: '2024-01-15',
            lastUsed: '2024-01-18'
        },
        {
            id: '2',
            name: 'Maria Fernanda Santos',
            nib: 'PT50 9876 5432 1098 7654 3210',
            email: 'maria.santos@empresa.com',
            department: 'Financeiro',
            position: 'Contadora',
            baseSalary: 75000,
            bankName: 'Standard Bank',
            createdAt: '2024-01-10',
            lastUsed: '2024-01-17'
        },
        {
            id: '3',
            name: 'Pedro Augusto Pereira',
            nib: 'PT50 1111 2222 3333 4444 5555',
            email: 'pedro.pereira@empresa.com',
            department: 'Vendas',
            position: 'Gerente Comercial',
            baseSalary: 95000,
            bankName: 'BCI',
            createdAt: '2024-01-05',
            lastUsed: '2024-01-16'
        },
        {
            id: '4',
            name: 'Ana Beatriz Costa',
            nib: 'PT50 6666 7777 8888 9999 0000',
            email: 'ana.costa@empresa.com',
            department: 'RH',
            position: 'Especialista em RH',
            baseSalary: 65000,
            bankName: 'UBA Moçambique',
            createdAt: '2024-01-20'
        },
        {
            id: '5',
            name: 'Carlos Eduardo Lima',
            nib: 'PT50 5555 4444 3333 2222 1111',
            email: 'carlos.lima@empresa.com',
            department: 'Marketing',
            position: 'Gestor de Marketing',
            baseSalary: 70000,
            bankName: 'Standard Bank',
            createdAt: '2024-01-18'
        }
    ]);

    const banks = [
        { value: 'UBA Moçambique', label: currentTexts.banks.uba },
        { value: 'Standard Bank', label: currentTexts.banks.standard },
        { value: 'BCI', label: currentTexts.banks.bci },
        { value: 'Millennium BIM', label: currentTexts.banks.millennium },
        { value: 'Absa Bank', label: currentTexts.banks.absa },
        { value: 'Other', label: currentTexts.banks.other }
    ];

    const filteredBeneficiaries = beneficiaries.filter(beneficiary =>
        beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        beneficiary.nib.toLowerCase().includes(searchTerm.toLowerCase()) ||
        beneficiary.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        beneficiary.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        beneficiary.position.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(''), 2000);
    };

    const handleAdd = () => {
        setSelectedBeneficiary(null);
        setFormData({
            name: '',
            nib: '',
            email: '',
            department: '',
            position: '',
            baseSalary: '',
            bankName: 'UBA Moçambique'
        });
        setShowAddModal(true);
    };

    const handleEdit = (beneficiary: Beneficiary) => {
        setSelectedBeneficiary(beneficiary);
        setFormData({
            name: beneficiary.name,
            nib: beneficiary.nib,
            email: beneficiary.email,
            department: beneficiary.department,
            position: beneficiary.position,
            baseSalary: beneficiary.baseSalary.toString(),
            bankName: beneficiary.bankName
        });
        setShowAddModal(true);
    };

    const handleDelete = (beneficiary: Beneficiary) => {
        setSelectedBeneficiary(beneficiary);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (selectedBeneficiary) {
            setBeneficiaries(prev => prev.filter(b => b.id !== selectedBeneficiary.id));
            setShowDeleteModal(false);
            setSelectedBeneficiary(null);
            alert(currentTexts.successDelete);
        }
    };

    const validateEmail = (email: string): boolean => {
        if (!email) return true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validações
        if (!formData.name.trim() || !formData.nib.trim()) {
            alert(currentTexts.requiredField);
            setIsSubmitting(false);
            return;
        }

        if (formData.nib.length < 20) {
            alert(currentTexts.invalidNIB);
            setIsSubmitting(false);
            return;
        }

        if (!validateEmail(formData.email)) {
            alert(currentTexts.invalidEmail);
            setIsSubmitting(false);
            return;
        }

        // Simular processamento
        setTimeout(() => {
            if (selectedBeneficiary) {
                // Editar
                setBeneficiaries(prev => prev.map(b =>
                    b.id === selectedBeneficiary.id
                        ? {
                            ...b,
                            name: formData.name,
                            nib: formData.nib,
                            email: formData.email,
                            department: formData.department,
                            position: formData.position,
                            baseSalary: parseFloat(formData.baseSalary) || 0,
                            bankName: formData.bankName,
                            lastUsed: new Date().toISOString().split('T')[0]
                        }
                        : b
                ));
                alert(currentTexts.successEdit);
            } else {
                // Adicionar novo
                const newBeneficiary: Beneficiary = {
                    id: Date.now().toString(),
                    name: formData.name,
                    nib: formData.nib,
                    email: formData.email,
                    department: formData.department,
                    position: formData.position,
                    baseSalary: parseFloat(formData.baseSalary) || 0,
                    bankName: formData.bankName,
                    createdAt: new Date().toISOString().split('T')[0]
                };
                setBeneficiaries(prev => [...prev, newBeneficiary]);
                alert(currentTexts.successAdd);
            }

            setShowAddModal(false);
            setIsSubmitting(false);
            setSelectedBeneficiary(null);
        }, 1000);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString(language === 'PT' ? 'pt-PT' : 'en-US', options);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat(language === 'PT' ? 'pt-PT' : 'en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    return (
        <BusinessLayout>
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
                            <button
                                onClick={handleAdd}
                                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                <FaPlus size={16} />
                                <span>{currentTexts.addBeneficiary}</span>
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder={currentTexts.searchPlaceholder}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Beneficiaries List */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        {filteredBeneficiaries.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {currentTexts.name}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {currentTexts.nib}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {currentTexts.department}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {currentTexts.position}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {currentTexts.baseSalary}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {currentTexts.bank}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {currentTexts.lastUsed}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {currentTexts.actions}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredBeneficiaries.map((beneficiary) => (
                                            <tr key={beneficiary.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {beneficiary.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {beneficiary.email}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-sm text-gray-900 font-mono">
                                                            {beneficiary.nib}
                                                        </span>
                                                        <button
                                                            onClick={() => handleCopy(beneficiary.nib, `nib-${beneficiary.id}`)}
                                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                                        >
                                                            {copiedField === `nib-${beneficiary.id}` ? (
                                                                <FaCheck className="text-green-500" size={14} />
                                                            ) : (
                                                                <FaCopy size={14} />
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {beneficiary.department}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {beneficiary.position}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                    MZN {formatCurrency(beneficiary.baseSalary)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {beneficiary.bankName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {beneficiary.lastUsed ? formatDate(beneficiary.lastUsed) : '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleEdit(beneficiary)}
                                                            className="text-blue-600 hover:text-blue-900 transition-colors"
                                                        >
                                                            <FaEdit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(beneficiary)}
                                                            className="text-red-600 hover:text-red-900 transition-colors"
                                                        >
                                                            <FaTrash size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <FaUserFriends className="mx-auto text-gray-300 mb-4" size={48} />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    {searchTerm ? currentTexts.noBeneficiaries : currentTexts.addFirstBeneficiary}
                                </h3>
                                {!searchTerm && (
                                    <button
                                        onClick={handleAdd}
                                        className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        {currentTexts.addBeneficiary}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Add/Edit Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                {selectedBeneficiary ? currentTexts.editBeneficiary : currentTexts.addBeneficiary}
                            </h3>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Name */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentTexts.name} *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            placeholder="João Carlos Silva"
                                            required
                                        />
                                    </div>

                                    {/* NIB */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentTexts.nib} *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.nib}
                                            onChange={(e) => handleInputChange('nib', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            placeholder="PT50 1234 5678 9012 3456 7890"
                                            minLength={20}
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            {language === 'PT' ? 'Mínimo 20 caracteres' : 'Minimum 20 characters'}
                                        </p>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentTexts.email}
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            placeholder="funcionario@empresa.com"
                                        />
                                    </div>

                                    {/* Department */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentTexts.department}
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.department}
                                            onChange={(e) => handleInputChange('department', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            placeholder="TI"
                                        />
                                    </div>

                                    {/* Position */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentTexts.position} 
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.position}
                                            onChange={(e) => handleInputChange('position', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            placeholder="Desenvolvedor Sênior"
                                        />
                                    </div>

                                    {/* Base Salary */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentTexts.baseSalary}
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.baseSalary}
                                            onChange={(e) => handleInputChange('baseSalary', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            placeholder="85000.00"
                                            step="0.01"
                                            min="0"
                                        />
                                    </div>

                                    {/* Bank */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentTexts.bank}
                                        </label>
                                        <select
                                            value={formData.bankName}
                                            onChange={(e) => handleInputChange('bankName', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        >
                                            {banks.map(bank => (
                                                <option key={bank.value} value={bank.value}>
                                                    {bank.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                                    >
                                        {currentTexts.cancel}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-400 transition-colors"
                                    >
                                        {isSubmitting ? '...' : currentTexts.save}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && selectedBeneficiary && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-md w-full p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                {currentTexts.deleteBeneficiary}
                            </h3>

                            <p className="text-gray-600 mb-6">
                                {currentTexts.confirmDelete}
                            </p>

                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                <p className="font-medium text-gray-900">{selectedBeneficiary.name}</p>
                                <p className="text-sm text-gray-600">
                                    {selectedBeneficiary.department} • {selectedBeneficiary.position}
                                </p>
                                <p className="text-sm text-gray-600">{selectedBeneficiary.nib}</p>
                                <p className="text-sm text-gray-600">{selectedBeneficiary.email}</p>
                                <p className="text-sm text-gray-600 font-medium">
                                    MZN {formatCurrency(selectedBeneficiary.baseSalary)}
                                </p>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                                >
                                    {currentTexts.cancel}
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
                                >
                                    {currentTexts.delete}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </BusinessLayout>
    );
};

export default BusinessBeneficiaries;