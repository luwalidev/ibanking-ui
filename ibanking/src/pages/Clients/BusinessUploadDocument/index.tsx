// pages/BusinessDocumentUpload.tsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BusinessLayout } from '../../../components/BusinessLayout';
import { 
    CiTrash, 
    CiViewList, 
    CiSearch, 
    CiFileOn,
    CiFolderOn,
    CiClock1 as CiClock,
    CiWarning
} from "react-icons/ci";
import { AiOutlineCloudUpload, AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { 
    FaFilePdf, 
    FaFileImage, 
    FaFileWord, 
    FaFileExcel, 
    FaFileArchive,
    FaFileAlt 
} from "react-icons/fa";

// Interfaces
interface DocumentFile {
    id: string;
    name: string;
    size: number;
    type: string;
    uploadDate: string;
    status: 'pending' | 'analyzing' | 'approved' | 'rejected';
    category: DocumentCategory;
    description: string;
    file?: File;
}

type DocumentCategory = 
    | 'international_transfer'
    | 'partner_update'
    | 'personal_data'
    | 'identification'
    | 'income_proof'
    | 'address_proof'
    | 'other_services';

interface DocumentCategoryInfo {
    value: DocumentCategory;
    label: string;
    icon: React.ReactNode;
    description: string;
    requiredDocuments: string[];
    color: string;
}

const BusinessDocumentUpload: React.FC = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Estados
    const [documents, setDocuments] = useState<DocumentFile[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | ''>('');
    const [documentDescription, setDocumentDescription] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'analyzing' | 'approved' | 'rejected'>('all');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<DocumentFile | null>(null);
    const [showDocumentDetail, setShowDocumentDetail] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    // Categorias de Documentos
    const documentCategories: DocumentCategoryInfo[] = [
        {
            value: 'international_transfer',
            label: 'Transferência Internacional',
            icon: <CiFolderOn className="text-blue-600" size={24} />,
            description: 'Documentos para solicitação de transferências internacionais',
            requiredDocuments: ['Passaporte/Visto', 'Comprovativo de Residência', 'Declaração de Origem de Fundos'],
            color: 'blue'
        },
        {
            value: 'partner_update',
            label: 'Dados dos Sócios',
            icon: <CiFolderOn className="text-green-600" size={24} />,
            description: 'Atualização de informações dos sócios da empresa',
            requiredDocuments: ['Documento de Identificação', 'Contrato Social Atualizado', 'Declaração de Sócios'],
            color: 'green'
        },
        {
            value: 'personal_data',
            label: 'Dados Pessoais',
            icon: <CiFolderOn className="text-purple-600" size={24} />,
            description: 'Atualização de informações pessoais do titular',
            requiredDocuments: ['Documento de Identificação', 'Comprovativo de Morada', 'Foto Recente'],
            color: 'purple'
        },
        {
            value: 'identification',
            label: 'Documentos de Identificação',
            icon: <CiFolderOn className="text-orange-600" size={24} />,
            description: 'Substituição ou atualização de documentos de identificação',
            requiredDocuments: ['Novo Documento de Identificação', 'Documento Anterior', 'Declaração de Alteração'],
            color: 'orange'
        },
        {
            value: 'income_proof',
            label: 'Comprovativos de Rendimentos',
            icon: <CiFolderOn className="text-red-600" size={24} />,
            description: 'Comprovativos de rendimentos e fontes de renda',
            requiredDocuments: ['Últimos 3 Recibos de Vencimento', 'Declaração de IRS', 'Extratos Bancários'],
            color: 'red'
        },
        {
            value: 'address_proof',
            label: 'Comprovativos de Morada',
            icon: <CiFolderOn className="text-yellow-600" size={24} />,
            description: 'Documentos que comprovem a morada atual',
            requiredDocuments: ['Fatura de Utilidade Pública', 'Contrato de Arrendamento', 'Documento de Propriedade'],
            color: 'yellow'
        },
        {
            value: 'other_services',
            label: 'Outros Serviços Bancários',
            icon: <CiFolderOn className="text-gray-600" size={24} />,
            description: 'Documentos para outros serviços bancários',
            requiredDocuments: ['Documentação Específica', 'Identificação', 'Formulário de Solicitação'],
            color: 'gray'
        }
    ];

    // Handlers
    const handleFileUpload = (files: FileList | null) => {
        if (!files) return;
        if (!selectedCategory) {
            alert('Por favor, selecione uma categoria para o documento.');
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        const totalFiles = files.length;
        let uploaded = 0;

        const newDocuments: DocumentFile[] = Array.from(files).map(file => ({
            id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: file.name,
            size: file.size,
            type: file.type,
            uploadDate: new Date().toISOString(),
            status: 'pending',
            category: selectedCategory as DocumentCategory,
            description: documentDescription || 'Sem descrição',
            file: file
        }));

        // Simular progresso de upload
        const interval = setInterval(() => {
            uploaded += 1;
            const progress = Math.min((uploaded / totalFiles) * 100, 100);
            setUploadProgress(progress);
            
            if (uploaded >= totalFiles) {
                clearInterval(interval);
                setDocuments(prev => [...prev, ...newDocuments]);
                setDocumentDescription('');
                setShowUploadModal(false);
                setIsUploading(false);
                setUploadProgress(0);
                
                // Simular análise automática dos documentos
                newDocuments.forEach((doc, index) => {
                    setTimeout(() => {
                        setDocuments(prev => prev.map(d => 
                            d.id === doc.id ? { ...d, status: 'analyzing' } : d
                        ));
                    }, 3000 + (index * 1000));

                    setTimeout(() => {
                        setDocuments(prev => prev.map(d => 
                            d.id === doc.id ? { ...d, status: Math.random() > 0.2 ? 'approved' : 'rejected' } : d
                        ));
                    }, 6000 + (index * 1000));
                });
            }
        }, 500);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileUpload(e.dataTransfer.files);
    };

    const handleRemoveDocument = (id: string) => {
        if (window.confirm('Tem certeza que deseja remover este documento?')) {
            setDocuments(prev => prev.filter(doc => doc.id !== id));
        }
    };

    const getStatusColor = (status: DocumentFile['status']) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'analyzing': return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'approved': return 'bg-green-100 text-green-800 border-green-300';
            case 'rejected': return 'bg-red-100 text-red-800 border-red-300';
            default: return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const getStatusIcon = (status: DocumentFile['status']) => {
        switch (status) {
            case 'pending': return <CiClock className="text-yellow-600" size={20} />;
            case 'analyzing': return <CiClock className="text-blue-600" size={20} />;
            case 'approved': return <AiOutlineCheck className="text-green-600" size={20} />;
            case 'rejected': return <AiOutlineClose className="text-red-600" size={20} />;
            default: return null;
        }
    };

    const getStatusLabel = (status: DocumentFile['status']) => {
        switch (status) {
            case 'pending': return 'Pendente';
            case 'analyzing': return 'Em Análise';
            case 'approved': return 'Aprovado';
            case 'rejected': return 'Rejeitado';
            default: return status;
        }
    };

    const getFileIcon = (fileType: string) => {
        if (fileType.includes('pdf')) return <FaFilePdf className="text-red-600" size={24} />;
        if (fileType.includes('image')) return <FaFileImage className="text-green-600" size={24} />;
        if (fileType.includes('word') || fileType.includes('document')) return <FaFileWord className="text-blue-600" size={24} />;
        if (fileType.includes('excel') || fileType.includes('sheet')) return <FaFileExcel className="text-green-700" size={24} />;
        if (fileType.includes('zip') || fileType.includes('rar')) return <FaFileArchive className="text-yellow-600" size={24} />;
        return <FaFileAlt className="text-gray-600" size={24} />;
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getCategoryLabel = (category: DocumentCategory) => {
        const cat = documentCategories.find(c => c.value === category);
        return cat ? cat.label : category;
    };

    const getCategoryColor = (category: DocumentCategory) => {
        const cat = documentCategories.find(c => c.value === category);
        return cat ? cat.color : 'gray';
    };

    const getFilteredDocuments = () => {
        let filtered = documents;
        
        if (searchTerm) {
            filtered = filtered.filter(doc => 
                doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                getCategoryLabel(doc.category).toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (filterStatus !== 'all') {
            filtered = filtered.filter(doc => doc.status === filterStatus);
        }
        
        return filtered;
    };

    const handleViewDocument = (doc: DocumentFile) => {
        setSelectedDocument(doc);
        setShowDocumentDetail(true);
    };

    const getDocumentStats = () => {
        const total = documents.length;
        const pending = documents.filter(d => d.status === 'pending').length;
        const analyzing = documents.filter(d => d.status === 'analyzing').length;
        const approved = documents.filter(d => d.status === 'approved').length;
        const rejected = documents.filter(d => d.status === 'rejected').length;
        return { total, pending, analyzing, approved, rejected };
    };

    const stats = getDocumentStats();

    // Componente Modal Reutilizável
    const Modal = ({ isOpen, onClose, title, children, size = 'md' }: {
        isOpen: boolean;
        onClose: () => void;
        title: string;
        children: React.ReactNode;
        size?: 'sm' | 'md' | 'lg' | 'xl';
    }) => {
        if (!isOpen) return null;

        const sizeClasses = {
            sm: 'max-w-md',
            md: 'max-w-lg',
            lg: 'max-w-2xl',
            xl: 'max-w-4xl'
        };

        return (
            <div
                className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-[rgba(0,0,0,0.35)] backdrop-blur-sm"
                onClick={onClose}
            >
                <div
                    className={`bg-white rounded-2xl p-6 w-full ${sizeClasses[size]} shadow-2xl max-h-[90vh] overflow-y-auto`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <AiOutlineClose size={24} />
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
                            <h1 className="text-2xl font-bold text-gray-900">Upload de Documentos</h1>
                            <p className="text-gray-600 mt-1">
                                Submeta documentos para solicitações e atualizações de serviços bancários
                            </p>
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
                        {/* Estatísticas */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
                                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                                <div className="text-sm text-gray-600">Total</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-yellow-100 p-4 text-center">
                                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                                <div className="text-sm text-yellow-600">Pendentes</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4 text-center">
                                <div className="text-2xl font-bold text-blue-600">{stats.analyzing}</div>
                                <div className="text-sm text-blue-600">Em Análise</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-green-100 p-4 text-center">
                                <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
                                <div className="text-sm text-green-600">Aprovados</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-red-100 p-4 text-center">
                                <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
                                <div className="text-sm text-red-600">Rejeitados</div>
                            </div>
                        </div>

                        {/* Área de Upload Rápido */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-900">Upload Rápido</h2>
                                <button
                                    onClick={() => setShowUploadModal(true)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
                                >
                                    <AiOutlineCloudUpload size={20} />
                                    Novo Upload
                                </button>
                            </div>

                            <div
                                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                                    isDragging 
                                        ? 'border-red-500 bg-red-50' 
                                        : 'border-gray-300 hover:border-red-400 hover:bg-gray-50'
                                }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                        <AiOutlineCloudUpload className="text-red-600" size={32} />
                                    </div>
                                    <div>
                                        <p className="text-gray-700 font-medium">
                                            Arraste e solte seus documentos aqui
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            ou clique para selecionar arquivos
                                        </p>
                                        <p className="text-gray-400 text-xs mt-2">
                                            Formatos suportados: PDF, JPG, PNG, DOC, XLS, ZIP (máx. 10MB)
                                        </p>
                                    </div>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    className="hidden"
                                    onChange={(e) => handleFileUpload(e.target.files)}
                                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.zip,.rar"
                                />
                            </div>
                        </div>

                        {/* Lista de Documentos */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Meus Documentos</h2>
                                
                                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                    <div className="relative flex-1 sm:min-w-[200px]">
                                        <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Buscar documentos..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        />
                                    </div>
                                    
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value as any)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                    >
                                        <option value="all">Todos os Status</option>
                                        <option value="pending">Pendentes</option>
                                        <option value="analyzing">Em Análise</option>
                                        <option value="approved">Aprovados</option>
                                        <option value="rejected">Rejeitados</option>
                                    </select>
                                </div>
                            </div>

                            {documents.length === 0 ? (
                                <div className="text-center py-12">
                                    <CiFileOn className="text-gray-300 mx-auto" size={48} />
                                    <p className="text-gray-500 mt-2">Nenhum documento enviado ainda</p>
                                    <p className="text-gray-400 text-sm">
                                        Clique em "Novo Upload" para começar
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {getFilteredDocuments().map((doc) => (
                                        <div
                                            key={doc.id}
                                            className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-red-200 hover:bg-red-50/30 transition-all cursor-pointer"
                                            onClick={() => handleViewDocument(doc)}
                                        >
                                            <div className="flex items-center gap-4">
                                                {getFileIcon(doc.type)}
                                                <div>
                                                    <p className="font-medium text-gray-900">{doc.name}</p>
                                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                                        <span>{formatFileSize(doc.size)}</span>
                                                        <span>•</span>
                                                        <span>{getCategoryLabel(doc.category)}</span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1">
                                                            {getStatusIcon(doc.status)}
                                                            <span className={getStatusColor(doc.status)}>
                                                                {getStatusLabel(doc.status)}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleViewDocument(doc);
                                                    }}
                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    <CiViewList size={20} className="text-gray-500" />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemoveDocument(doc.id);
                                                    }}
                                                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                                                >
                                                    <CiTrash size={20} className="text-red-500" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Informações Úteis */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações</h3>
                            <div className="space-y-3 text-sm text-gray-600">
                                <div className="flex items-start gap-2">
                                    <CiClock className="text-blue-500 mt-0.5 flex-shrink-0" />
                                    <p>Tempo médio de análise: 24-48h</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CiWarning className="text-yellow-500 mt-0.5 flex-shrink-0" />
                                    <p>Documentos devem estar legíveis e atualizados</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <AiOutlineCheck className="text-green-500 mt-0.5 flex-shrink-0" />
                                    <p>Formatos aceitos: PDF, JPG, PNG, DOC, XLS, ZIP</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <AiOutlineClose className="text-red-500 mt-0.5 flex-shrink-0" />
                                    <p>Tamanho máximo: 10MB por arquivo</p>
                                </div>
                            </div>
                        </div>

                        {/* Categorias Rápidas */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorias</h3>
                            <div className="space-y-2">
                                {documentCategories.map((cat) => (
                                    <button
                                        key={cat.value}
                                        onClick={() => {
                                            setSelectedCategory(cat.value);
                                            setShowUploadModal(true);
                                        }}
                                        className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                                    >
                                        <div className="flex items-center gap-3">
                                            {cat.icon}
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{cat.label}</p>
                                                <p className="text-xs text-gray-500 truncate">{cat.description}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Upload */}
            <Modal isOpen={showUploadModal} onClose={() => !isUploading && setShowUploadModal(false)} title="Upload de Documentos" size="lg">
                <div className="space-y-4">
                    {/* Categoria */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Categoria do Documento *
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value as DocumentCategory)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            disabled={isUploading}
                        >
                            <option value="">Selecione uma categoria</option>
                            {documentCategories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Descrição */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Descrição (Opcional)
                        </label>
                        <textarea
                            value={documentDescription}
                            onChange={(e) => setDocumentDescription(e.target.value)}
                            placeholder="Adicione uma descrição para o documento..."
                            rows={2}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            disabled={isUploading}
                        />
                    </div>

                    {/* Área de Upload */}
                    <div
                        className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                            isDragging 
                                ? 'border-red-500 bg-red-50' 
                                : 'border-gray-300 hover:border-red-400'
                        } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div className="flex flex-col items-center gap-3">
                            <AiOutlineCloudUpload size={40} className="text-gray-400" />
                            <div>
                                <p className="text-gray-600">
                                    {isUploading ? 'Enviando arquivos...' : 'Arraste arquivos ou clique para selecionar'}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    PDF, JPG, PNG, DOC, XLS, ZIP (máx. 10MB)
                                </p>
                            </div>
                            <input
                                type="file"
                                multiple
                                className="hidden"
                                onChange={(e) => handleFileUpload(e.target.files)}
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.zip,.rar"
                                disabled={isUploading}
                            />
                        </div>
                    </div>

                    {/* Progresso */}
                    {isUploading && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Enviando...</span>
                                <span>{Math.round(uploadProgress)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-red-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Documentos Requeridos */}
                    {selectedCategory && (
                        <div className="bg-blue-50 rounded-lg p-4">
                            <p className="text-sm font-medium text-blue-900 mb-2">
                                Documentos normalmente solicitados:
                            </p>
                            <ul className="text-sm text-blue-800 space-y-1">
                                {documentCategories
                                    .find(c => c.value === selectedCategory)
                                    ?.requiredDocuments.map((doc, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <AiOutlineCheck size={16} className="text-blue-600" />
                                            {doc}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}

                    <div className="flex space-x-3 pt-4 border-t">
                        <button
                            onClick={() => setShowUploadModal(false)}
                            className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                            disabled={isUploading}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                            disabled={isUploading || !selectedCategory}
                        >
                            <AiOutlineCloudUpload size={20} />
                            Selecionar Arquivos
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Modal de Detalhes do Documento */}
            <Modal isOpen={showDocumentDetail} onClose={() => setShowDocumentDetail(false)} title="Detalhes do Documento" size="lg">
                {selectedDocument && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            {getFileIcon(selectedDocument.type)}
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900">{selectedDocument.name}</p>
                                <p className="text-sm text-gray-500">
                                    {formatFileSize(selectedDocument.size)} • {new Date(selectedDocument.uploadDate).toLocaleString('pt-PT')}
                                </p>
                            </div>
                            <div className={`px-3 py-1 rounded-full border ${getStatusColor(selectedDocument.status)}`}>
                                {getStatusLabel(selectedDocument.status)}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Categoria</p>
                                <p className="font-medium">{getCategoryLabel(selectedDocument.category)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Descrição</p>
                                <p className="font-medium">{selectedDocument.description}</p>
                            </div>
                        </div>

                        {selectedDocument.status === 'rejected' && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-red-800">
                                    <CiWarning size={20} />
                                    <p className="font-medium">Documento Rejeitado</p>
                                </div>
                                <p className="text-sm text-red-700 mt-1">
                                    O documento não atende aos requisitos necessários. Por favor, verifique a legibilidade e atualize o documento.
                                </p>
                            </div>
                        )}

                        {selectedDocument.status === 'approved' && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 text-green-800">
                                        <AiOutlineCheck size={20} />
                                        <p className="font-medium">Documento Aprovado</p>
                                    </div>
                                    <p className="text-sm text-green-700 mt-1">
                                        O documento foi validado e aprovado pela nossa equipa.
                                    </p>
                                </div>
                        )}

                        <div className="flex space-x-3 pt-4 border-t">
                            <button
                                onClick={() => setShowDocumentDetail(false)}
                                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                            >
                                Fechar
                            </button>
                            {selectedDocument.status === 'rejected' && (
                                <button
                                    onClick={() => {
                                        setShowDocumentDetail(false);
                                        setShowUploadModal(true);
                                        setSelectedCategory(selectedDocument.category);
                                    }}
                                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                >
                                    Reenviar Documento
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </BusinessLayout>
    );
};

export default BusinessDocumentUpload;