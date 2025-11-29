// pages/ClientBeneficiaries.tsx
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
import { ClientLayout } from '../../../components/ClientLayout';

interface ClientBeneficiariesProps {
    language: 'PT' | 'EN';
}

interface Beneficiary {
    id: string;
    name: string;
    accountNumber: string;
    nib: string;
    bank: string;
    email?: string;
    phone?: string;
    createdAt: string;
    lastUsed?: string;
}

const ClientBeneficiaries: React.FC<ClientBeneficiariesProps> = ({ language }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);
    const [copiedField, setCopiedField] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Estado para o formulário
    const [formData, setFormData] = useState({
        name: '',
        accountNumber: '',
        nib: '',
        bank: 'UBA Moçambique',
        email: '',
        phone: ''
    });

    const currentTexts = {
        PT: {
            title: "Beneficiários",
            subtitle: "Gerir a sua lista de beneficiários para transferências rápidas",
            searchPlaceholder: "Pesquisar beneficiários...",
            addBeneficiary: "Adicionar Beneficiário",
            editBeneficiary: "Editar Beneficiário",
            deleteBeneficiary: "Eliminar Beneficiário",
            name: "Nome Completo",
            accountNumber: "Número da Conta",
            nib: "NIB",
            bank: "Banco",
            email: "Email (Opcional)",
            phone: "Telefone (Opcional)",
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
            invalidNIB: "NIB deve ter 21 dígitos",
            invalidAccount: "Número de conta inválido",
            successAdd: "Beneficiário adicionado com sucesso!",
            successEdit: "Beneficiário atualizado com sucesso!",
            successDelete: "Beneficiário eliminado com sucesso!",
            banks: {
                uba: "UBA Moçambique",
                bci: "BCI",
                standard: "Standard Bank",
                millennium: "Millennium BIM",
                absa: "Absa Bank",
                other: "Outro Banco"
            }
        },
        EN: {
            title: "Beneficiaries",
            subtitle: "Manage your beneficiaries list for quick transfers",
            searchPlaceholder: "Search beneficiaries...",
            addBeneficiary: "Add Beneficiary",
            editBeneficiary: "Edit Beneficiary",
            deleteBeneficiary: "Delete Beneficiary",
            name: "Full Name",
            accountNumber: "Account Number",
            nib: "NIB",
            bank: "Bank",
            email: "Email (Optional)",
            phone: "Phone (Optional)",
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
            invalidNIB: "NIB must have 21 digits",
            invalidAccount: "Invalid account number",
            successAdd: "Beneficiary added successfully!",
            successEdit: "Beneficiary updated successfully!",
            successDelete: "Beneficiary deleted successfully!",
            banks: {
                uba: "UBA Mozambique",
                bci: "BCI",
                standard: "Standard Bank",
                millennium: "Millennium BIM",
                absa: "Absa Bank",
                other: "Other Bank"
            }
        }
    }[language];

    // Dados de exemplo
    const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
        {
            id: '1',
            name: 'Maria Santos',
            accountNumber: '1234567890123',
            nib: '000800000123456789012',
            bank: 'UBA Moçambique',
            email: 'maria.santos@email.com',
            phone: '+258841234567',
            createdAt: '2024-01-15',
            lastUsed: '2024-01-18'
        },
        {
            id: '2',
            name: 'João Silva',
            accountNumber: '9876543210987',
            nib: '000800000987654321098',
            bank: 'BCI',
            phone: '+258821234567',
            createdAt: '2024-01-10',
            lastUsed: '2024-01-17'
        },
        {
            id: '3',
            name: 'Ana Pereira',
            accountNumber: '4567890123456',
            nib: '000800000456789012345',
            bank: 'Millennium BIM',
            email: 'ana.pereira@email.com',
            createdAt: '2024-01-05'
        }
    ]);

    const banks = [
        { value: 'UBA Moçambique', label: currentTexts.banks.uba },
        { value: 'BCI', label: currentTexts.banks.bci },
        { value: 'Standard Bank', label: currentTexts.banks.standard },
        { value: 'Millennium BIM', label: currentTexts.banks.millennium },
        { value: 'Absa Bank', label: currentTexts.banks.absa },
        { value: 'Other', label: currentTexts.banks.other }
    ];

    const filteredBeneficiaries = beneficiaries.filter(beneficiary =>
        beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        beneficiary.accountNumber.includes(searchTerm) ||
        beneficiary.nib.includes(searchTerm)
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
            accountNumber: '',
            nib: '',
            bank: 'UBA Moçambique',
            email: '',
            phone: ''
        });
        setShowAddModal(true);
    };

    const handleEdit = (beneficiary: Beneficiary) => {
        setSelectedBeneficiary(beneficiary);
        setFormData({
            name: beneficiary.name,
            accountNumber: beneficiary.accountNumber,
            nib: beneficiary.nib,
            bank: beneficiary.bank,
            email: beneficiary.email || '',
            phone: beneficiary.phone || ''
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
            // Em uma aplicação real, aqui faria a chamada à API
            alert(currentTexts.successDelete);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validações
        if (!formData.name.trim() || !formData.accountNumber.trim() || !formData.nib.trim()) {
            alert(currentTexts.requiredField);
            setIsSubmitting(false);
            return;
        }

        if (formData.nib.length !== 21) {
            alert(currentTexts.invalidNIB);
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
                            ...formData,
                            lastUsed: new Date().toISOString().split('T')[0]
                        }
                        : b
                ));
                alert(currentTexts.successEdit);
            } else {
                // Adicionar novo
                const newBeneficiary: Beneficiary = {
                    id: Date.now().toString(),
                    ...formData,
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
                                                {currentTexts.accountNumber}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {currentTexts.nib}
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
                                                        {beneficiary.email && (
                                                            <div className="text-sm text-gray-500">
                                                                {beneficiary.email}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-sm text-gray-900 font-mono">
                                                            {beneficiary.accountNumber}
                                                        </span>
                                                        <button
                                                            onClick={() => handleCopy(beneficiary.accountNumber, `account-${beneficiary.id}`)}
                                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                                        >
                                                            {copiedField === `account-${beneficiary.id}` ? (
                                                                <FaCheck className="text-green-500" size={14} />
                                                            ) : (
                                                                <FaCopy size={14} />
                                                            )}
                                                        </button>
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
                                                    {beneficiary.bank}
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
                        <div className="bg-white rounded-lg max-w-md w-full p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                {selectedBeneficiary ? currentTexts.editBeneficiary : currentTexts.addBeneficiary}
                            </h3>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentTexts.name} *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    {/* Account Number */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentTexts.accountNumber} *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.accountNumber}
                                            onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                                            placeholder="000800000123456789012"
                                            maxLength={21}
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">21 dígitos</p>
                                    </div>

                                    {/* Bank */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentTexts.bank} *
                                        </label>
                                        <select
                                            value={formData.bank}
                                            onChange={(e) => handleInputChange('bank', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        >
                                            {banks.map(bank => (
                                                <option key={bank.value} value={bank.value}>
                                                    {bank.label}
                                                </option>
                                            ))}
                                        </select>
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
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentTexts.phone}
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        />
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
                                <p className="text-sm text-gray-600">{selectedBeneficiary.accountNumber}</p>
                                <p className="text-sm text-gray-600">{selectedBeneficiary.bank}</p>
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
        </ClientLayout>
    );
};

export default ClientBeneficiaries;