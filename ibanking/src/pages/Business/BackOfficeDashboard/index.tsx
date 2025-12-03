// pages/BackOfficeSystem.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  FaSearch,
  FaUser,
  FaLock,
  FaUnlock,
  FaCreditCard,
  FaTrash,
  FaHistory,
  FaEye,
  FaPrint,
  FaUserCheck,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaBan,
  FaShieldAlt,
  FaCog,
  FaChartBar,
  FaFileAlt,
  FaDownload,
  FaFilter,
  FaBell,
  FaChevronDown,
  FaChevronRight,
  FaCamera,
  FaIdCard,
  FaHome,
  FaPhone,
  FaEnvelope,
  FaBirthdayCake,
  FaUserFriends,
  FaBriefcase,
  FaMoneyBillWave,
  FaExchangeAlt,
  FaKey,
  FaUserShield,
  FaClipboardCheck,
  FaTasks,
  FaUsers
} from 'react-icons/fa';
import { TbTransfer } from 'react-icons/tb';

interface BackOfficeSystemProps {
  language: 'PT' | 'EN';
}

interface Client {
  id: string;
  fullName: string;
  documentNumber: string;
  birthDate: string;
  nationality: string;
  address: string;
  phone: string;
  email: string;
  profession: string;
  employer: string;
  mothersName: string;
  fathersName: string;
  maritalStatus: string;
  taxNumber: string;
  photo?: string;
  accountNumber: string;
  nib: string;
  lastLogin: string;
  lastPasswordChange: string;
  accountStatus: string;
  verificationLevel: string;
  assignedManager?: string;
  accountSince: string;
  balance: number;
  cards: Card[];
  loans?: Loan[];
  transactions: Transaction[];
  documents: Document[];
}

interface Card {
  id: string;
  number: string;
  type: string;
  status: string;
  expiry: string;
  dailyLimit: number;
  monthlyLimit: number;
}

interface Loan {
  id: string;
  type: string;
  amount: number;
  remaining: number;
  installments: number;
  status: string;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
  description: string;
  status: string;
  failureReason?: string;
}

interface Document {
  id: string;
  type: string;
  number: string;
  issueDate: string;
  expiryDate?: string;
}

interface AuditLog {
  id: string;
  operator: string;
  action: string;
  timestamp: string;
  client: string;
  details: string;
  reason: string;
}

interface PendingApproval {
  id: number;
  type: string;
  client: string;
  date: string;
  priority: string;
}

interface TodayActivity {
  id: number;
  type: string;
  client: string;
  time: string;
  status: string;
}

interface UrgentAlert {
  id: number;
  type: string;
  message: string;
  priority: string;
}

interface Texts {
  // Títulos
  title: string;
  subtitle: string;
  dashboard: string;
  clientSearch: string;
  approvals: string;
  audit: string;
  
  // Pesquisa
  searchPlaceholder: string;
  searchClient: string;
  clearSearch: string;
  
  // Dashboard
  welcome: string;
  pendingApprovals: string;
  todaysActivities: string;
  urgentAlerts: string;
  systemHealth: string;
  
  // Ficha do Cliente
  clientFile: string;
  personalInfo: string;
  accountStatus: string;
  productsServices: string;
  recentActivity: string;
  securityInfo: string;
  auditHistory: string;
  
  // Dados Pessoais
  fullName: string;
  documentNumber: string;
  birthDate: string;
  nationality: string;
  address: string;
  phone: string;
  email: string;
  profession: string;
  employer: string;
  mothersName: string;
  fathersName: string;
  maritalStatus: string;
  taxNumber: string;
  
  // Status da Conta
  lastLogin: string;
  lastPasswordChange: string;
  accountStatusTitle: string;
  verificationLevel: string;
  assignedManager: string;
  accountSince: string;
  
  // Operações
  operations: string;
  blockAccount: string;
  unblockAccount: string;
  closeAccount: string;
  resetPassword: string;
  manageCards: string;
  viewMovements: string;
  issueCheck: string;
  viewDocuments: string;
  addNote: string;
  
  // Cartões
  cardManagement: string;
  blockCard: string;
  deleteCard: string;
  requestCard: string;
  cardNumber: string;
  cardType: string;
  cardStatus: string;
  expiryDate: string;
  dailyLimit: string;
  monthlyLimit: string;
  
  // Transações
  transactions: string;
  failedTransactions: string;
  transactionHistory: string;
  transactionType: string;
  transactionAmount: string;
  transactionDate: string;
  transactionDescription: string;
  failureReason: string;
  allTransactions: string;
  completed: string;
  pending: string;
  failed: string;
  
  // Auditoria
  auditLog: string;
  auditorName: string;
  action: string;
  timestamp: string;
  details: string;
  accessedData: string;
  reason: string;
  
  // Botões
  confirm: string;
  cancel: string;
  save: string;
  print: string;
  export: string;
  filter: string;
  view: string;
  edit: string;
  delete: string;
  back: string;
  
  // Status
  active: string;
  blocked: string;
  suspended: string;
  closed: string;
  pendingApproval: string;
  
  // Mensagens
  confirmBlock: string;
  confirmUnblock: string;
  confirmClose: string;
  confirmReset: string;
  enterReason: string;
  reasonRequired: string;
  searchRequired: string;
  loading: string;
  noClientSelected: string;
  noTransactions: string;
  noAuditLogs: string;
  selectAccount: string;
}

const BackOfficeSystem: React.FC<BackOfficeSystemProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showClientDetails, setShowClientDetails] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [showBlockModal, setShowBlockModal] = useState<boolean>(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState<boolean>(false);
  const [showCardModal, setShowCardModal] = useState<boolean>(false);
  const [cardAction, setCardAction] = useState<'block' | 'delete' | 'request'>('block');
  
  const blockReasonRef = useRef<HTMLTextAreaElement>(null);
  const resetReasonRef = useRef<HTMLTextAreaElement>(null);
  const cardReasonRef = useRef<HTMLTextAreaElement>(null);
  const cardNumberRef = useRef<HTMLSelectElement>(null);

  const [pendingApprovals] = useState<PendingApproval[]>([
    { id: 1, type: 'LOAN_APPROVAL', client: 'Maria Santos', date: '2024-01-18', priority: 'high' },
    { id: 2, type: 'ACCOUNT_OPENING', client: 'João Silva', date: '2024-01-18', priority: 'medium' },
    { id: 3, type: 'LIMIT_INCREASE', client: 'Ana Pereira', date: '2024-01-17', priority: 'high' },
  ]);

  const texts: { PT: Texts; EN: Texts } = {
    PT: {
      // Títulos
      title: "Sistema Backoffice Bancário",
      subtitle: "Gestão e auditoria de clientes",
      dashboard: "Dashboard",
      clientSearch: "Pesquisa de Clientes",
      approvals: "Aprovações Pendentes",
      audit: "Auditoria",
      
      // Pesquisa
      searchPlaceholder: "Pesquisar por BI, conta, nome, email...",
      searchClient: "Pesquisar Cliente",
      clearSearch: "Limpar",
      
      // Dashboard
      welcome: "Bem-vindo, Operador",
      pendingApprovals: "Aprovações Pendentes",
      todaysActivities: "Atividades de Hoje",
      urgentAlerts: "Alertas Urgentes",
      systemHealth: "Saúde do Sistema",
      
      // Ficha do Cliente
      clientFile: "Ficha do Cliente",
      personalInfo: "Informações Pessoais",
      accountStatusTitle: "Estado da Conta",
      productsServices: "Produtos e Serviços",
      recentActivity: "Atividade Recente",
      securityInfo: "Informações de Segurança",
      auditHistory: "Histórico de Auditoria",
      
      // Dados Pessoais
      fullName: "Nome Completo",
      documentNumber: "Número do BI/Passaporte",
      birthDate: "Data de Nascimento",
      nationality: "Nacionalidade",
      address: "Morada",
      phone: "Telefone",
      email: "Email",
      profession: "Profissão",
      employer: "Empregador",
      mothersName: "Nome da Mãe",
      fathersName: "Nome do Pai",
      maritalStatus: "Estado Civil",
      taxNumber: "NIF",
      
      // Status da Conta
      lastLogin: "Último Login",
      lastPasswordChange: "Última Alteração de Password",
      accountStatus: "Estado da Conta",
      verificationLevel: "Nível de Verificação",
      assignedManager: "Gestor Atribuído",
      accountSince: "Cliente desde",
      
      // Operações
      operations: "Operações",
      blockAccount: "Bloquear Conta",
      unblockAccount: "Desbloquear Conta",
      closeAccount: "Encerrar Conta",
      resetPassword: "Reset Password",
      manageCards: "Gerir Cartões",
      viewMovements: "Ver Movimentos",
      issueCheck: "Emitir Cheque",
      viewDocuments: "Ver Documentos",
      addNote: "Adicionar Nota",
      
      // Cartões
      cardManagement: "Gestão de Cartões",
      blockCard: "Bloquear Cartão",
      deleteCard: "Eliminar Cartão",
      requestCard: "Pedir Cartão",
      cardNumber: "Número do Cartão",
      cardType: "Tipo",
      cardStatus: "Estado",
      expiryDate: "Validade",
      dailyLimit: "Limite Diário",
      monthlyLimit: "Limite Mensal",
      
      // Transações
      transactions: "Transações",
      failedTransactions: "Transações com Falha",
      transactionHistory: "Histórico de Transações",
      transactionType: "Tipo",
      transactionAmount: "Valor",
      transactionDate: "Data",
      transactionDescription: "Descrição",
      failureReason: "Motivo da Falha",
      allTransactions: "Todas",
      completed: "Concluídas",
      pending: "Pendentes",
      failed: "Falhadas",
      
      // Auditoria
      auditLog: "Log de Auditoria",
      auditorName: "Operador",
      action: "Ação",
      timestamp: "Data/Hora",
      details: "Detalhes",
      accessedData: "Dados Acessados",
      reason: "Motivo",
      
      // Botões
      confirm: "Confirmar",
      cancel: "Cancelar",
      save: "Guardar",
      print: "Imprimir",
      export: "Exportar",
      filter: "Filtrar",
      view: "Ver",
      edit: "Editar",
      delete: "Eliminar",
      back: "Voltar",
      
      // Status
      active: "Ativo",
      blocked: "Bloqueado",
      suspended: "Suspenso",
      closed: "Encerrado",
      pendingApproval: "Aprovação Pendente",
      
      // Mensagens
      confirmBlock: "Confirmar Bloqueio da Conta?",
      confirmUnblock: "Confirmar Desbloqueio da Conta?",
      confirmClose: "Confirmar Encerramento da Conta?",
      confirmReset: "Confirmar Reset da Password?",
      enterReason: "Digite o motivo...",
      reasonRequired: "Motivo obrigatório",
      searchRequired: "Pesquise um cliente primeiro",
      loading: "Carregando...",
      noClientSelected: "Nenhum cliente selecionado",
      noTransactions: "Nenhuma transação encontrada",
      noAuditLogs: "Nenhum registo de auditoria",
      selectAccount: "Selecionar conta"
    },
    EN: {
      // Titles
      title: "Bank Backoffice System",
      subtitle: "Client management and auditing",
      dashboard: "Dashboard",
      clientSearch: "Client Search",
      approvals: "Pending Approvals",
      audit: "Audit",
      
      // Search
      searchPlaceholder: "Search by ID, account, name, email...",
      searchClient: "Search Client",
      clearSearch: "Clear",
      
      // Dashboard
      welcome: "Welcome, Operator",
      pendingApprovals: "Pending Approvals",
      todaysActivities: "Today's Activities",
      urgentAlerts: "Urgent Alerts",
      systemHealth: "System Health",
      
      // Client File
      clientFile: "Client File",
      personalInfo: "Personal Information",
      accountStatusTitle: "Account Status",
      productsServices: "Products & Services",
      recentActivity: "Recent Activity",
      securityInfo: "Security Information",
      auditHistory: "Audit History",
      
      // Personal Data
      fullName: "Full Name",
      documentNumber: "ID/Passport Number",
      birthDate: "Birth Date",
      nationality: "Nationality",
      address: "Address",
      phone: "Phone",
      email: "Email",
      profession: "Profession",
      employer: "Employer",
      mothersName: "Mother's Name",
      fathersName: "Father's Name",
      maritalStatus: "Marital Status",
      taxNumber: "Tax Number",
      
      // Account Status
      lastLogin: "Last Login",
      lastPasswordChange: "Last Password Change",
      accountStatus: "Account Status",
      verificationLevel: "Verification Level",
      assignedManager: "Assigned Manager",
      accountSince: "Client since",
      
      // Operations
      operations: "Operations",
      blockAccount: "Block Account",
      unblockAccount: "Unblock Account",
      closeAccount: "Close Account",
      resetPassword: "Reset Password",
      manageCards: "Manage Cards",
      viewMovements: "View Movements",
      issueCheck: "Issue Check",
      viewDocuments: "View Documents",
      addNote: "Add Note",
      
      // Cards
      cardManagement: "Card Management",
      blockCard: "Block Card",
      deleteCard: "Delete Card",
      requestCard: "Request Card",
      cardNumber: "Card Number",
      cardType: "Type",
      cardStatus: "Status",
      expiryDate: "Expiry Date",
      dailyLimit: "Daily Limit",
      monthlyLimit: "Monthly Limit",
      
      // Transactions
      transactions: "Transactions",
      failedTransactions: "Failed Transactions",
      transactionHistory: "Transaction History",
      transactionType: "Type",
      transactionAmount: "Amount",
      transactionDate: "Date",
      transactionDescription: "Description",
      failureReason: "Failure Reason",
      allTransactions: "All",
      completed: "Completed",
      pending: "Pending",
      failed: "Failed",
      
      // Audit
      auditLog: "Audit Log",
      auditorName: "Operator",
      action: "Action",
      timestamp: "Timestamp",
      details: "Details",
      accessedData: "Accessed Data",
      reason: "Reason",
      
      // Buttons
      confirm: "Confirm",
      cancel: "Cancel",
      save: "Save",
      print: "Print",
      export: "Export",
      filter: "Filter",
      view: "View",
      edit: "Edit",
      delete: "Delete",
      back: "Back",
      
      // Status
      active: "Active",
      blocked: "Blocked",
      suspended: "Suspended",
      closed: "Closed",
      pendingApproval: "Pending Approval",
      
      // Messages
      confirmBlock: "Confirm Account Block?",
      confirmUnblock: "Confirm Account Unblock?",
      confirmClose: "Confirm Account Closure?",
      confirmReset: "Confirm Password Reset?",
      enterReason: "Enter reason...",
      reasonRequired: "Reason required",
      searchRequired: "Search for a client first",
      loading: "Loading...",
      noClientSelected: "No client selected",
      noTransactions: "No transactions found",
      noAuditLogs: "No audit logs found",
      selectAccount: "Select account"
    }
  };

  const currentTexts = texts[language];

  // Dados de exemplo do cliente
  const sampleClients: Client[] = [
    {
      id: '1',
      fullName: 'Maria dos Santos',
      documentNumber: '123456789LA123',
      birthDate: '1985-06-15',
      nationality: 'Moçambicana',
      address: 'Av. 25 de Setembro, 1234 - Maputo',
      phone: '+258841234567',
      email: 'maria.santos@email.com',
      profession: 'Engenheira Civil',
      employer: 'Construtora Nacional Lda',
      mothersName: 'Ana Joaquina dos Santos',
      fathersName: 'José António dos Santos',
      maritalStatus: 'Casada',
      taxNumber: '123456789',
      photo: '/women.jpg',
      accountNumber: '1234567890123',
      nib: '000800000123456789012',
      lastLogin: '2024-01-18 14:30:25',
      lastPasswordChange: '2024-01-05 09:15:00',
      accountStatus: 'active',
      verificationLevel: 'Alto',
      assignedManager: 'Carlos Mendes',
      accountSince: '2018-03-15',
      balance: 12500.50,
      cards: [
        { id: '1', number: '**** **** **** 1234', type: 'Débito', status: 'active', expiry: '12/25', dailyLimit: 50000, monthlyLimit: 1000000 },
        { id: '2', number: '**** **** **** 5678', type: 'Crédito', status: 'active', expiry: '10/26', dailyLimit: 100000, monthlyLimit: 5000000 }
      ],
      loans: [
        { id: '1', type: 'Pessoal', amount: 50000, remaining: 25000, installments: 24, status: 'active' },
        { id: '2', type: 'Automóvel', amount: 300000, remaining: 150000, installments: 60, status: 'active' }
      ],
      transactions: [
        { id: '1', type: 'transfer', amount: 1500.00, date: '2024-01-18 14:30', description: 'Transferência para João Silva', status: 'completed' },
        { id: '2', type: 'payment', amount: 350.50, date: '2024-01-18 13:15', description: 'Pagamento de Electricidade', status: 'completed' },
        { id: '3', type: 'withdrawal', amount: 500.00, date: '2024-01-18 12:00', description: 'Levantamento ATM', status: 'completed' },
        { id: '4', type: 'transfer', amount: 2000.00, date: '2024-01-18 11:30', description: 'Transferência Internacional', status: 'failed', failureReason: 'Saldo insuficiente' },
        { id: '5', type: 'payment', amount: 125.75, date: '2024-01-18 10:45', description: 'Pagamento de Água', status: 'failed', failureReason: 'Conta destino inválida' }
      ],
      documents: [
        { id: '1', type: 'BI', number: '123456789LA123', issueDate: '2020-05-15', expiryDate: '2030-05-15' },
        { id: '2', type: 'Passaporte', number: 'AB123456', issueDate: '2022-08-20', expiryDate: '2032-08-20' },
        { id: '3', type: 'Comprovativo Morada', number: 'CM/2023/1234', issueDate: '2023-01-10' }
      ]
    }
  ];

  // Simulação de log de auditoria
  const sampleAuditLogs: AuditLog[] = [
    { id: '1', operator: 'João Operador', action: 'VIEW_CLIENT', timestamp: '2024-01-18 15:30:00', client: 'Maria dos Santos', details: 'Visualizou ficha completa do cliente', reason: 'Consulta de movimentações' },
    { id: '2', operator: 'Ana Operadora', action: 'RESET_PASSWORD', timestamp: '2024-01-18 14:15:00', client: 'Carlos Mendes', details: 'Reset da password do cliente', reason: 'Cliente esqueceu password' },
    { id: '3', operator: 'Pedro Operador', action: 'BLOCK_CARD', timestamp: '2024-01-18 13:45:00', client: 'João Silva', details: 'Bloqueou cartão 1234', reason: 'Cartão perdido' },
    { id: '4', operator: 'João Operador', action: 'VIEW_TRANSACTIONS', timestamp: '2024-01-18 12:30:00', client: 'Maria dos Santos', details: 'Visualizou transações dos últimos 30 dias', reason: 'Análise de movimentações' }
  ];

  // Dados do dashboard
  const dashboardMetrics = {
    totalClients: 15427,
    activeClients: 14892,
    pendingApprovals: 23,
    todayAudits: 156,
    failedTransactions: 8,
    supportTickets: 12,
    systemUptime: '99.98%'
  };

  const todaysActivities: TodayActivity[] = [
    { id: 1, type: 'PASSWORD_RESET', client: 'Maria Santos', time: '14:30', status: 'completed' },
    { id: 2, type: 'CARD_BLOCK', client: 'João Silva', time: '13:15', status: 'completed' },
    { id: 3, type: 'ACCOUNT_REVIEW', client: 'Ana Pereira', time: '11:45', status: 'pending' },
    { id: 4, type: 'LOAN_APPROVAL', client: 'Carlos Mendes', time: '10:20', status: 'in-progress' }
  ];

  const urgentAlerts: UrgentAlert[] = [
    { id: 1, type: 'FRAUD_ALERT', message: 'Transação suspeita detectada', priority: 'high' },
    { id: 2, type: 'SYSTEM_ALERT', message: 'API de pagamentos com alta latência', priority: 'medium' },
    { id: 3, type: 'COMPLIANCE_ALERT', message: 'Documento expirado requer atenção', priority: 'high' }
  ];

  useEffect(() => {
    // Carregar logs de auditoria
    setAuditLogs(sampleAuditLogs);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Simulação de busca
      const foundClient = sampleClients.find(client => 
        client.documentNumber.includes(searchTerm) ||
        client.accountNumber.includes(searchTerm) ||
        client.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.includes(searchTerm)
      );
      
      if (foundClient) {
        setSelectedClient(foundClient);
        setShowClientDetails(true);
        
        // Registrar na auditoria
        const auditEntry: AuditLog = {
          id: (auditLogs.length + 1).toString(),
          operator: 'Operador Atual',
          action: 'SEARCH_CLIENT',
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          client: foundClient.fullName,
          details: `Pesquisou cliente: ${foundClient.documentNumber}`,
          reason: 'Consulta de cliente'
        };
        setAuditLogs([auditEntry, ...auditLogs]);
      }
    }
  };

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setShowClientDetails(true);
    
    // Registrar na auditoria
    const auditEntry: AuditLog = {
      id: (auditLogs.length + 1).toString(),
      operator: 'Operador Atual',
      action: 'VIEW_CLIENT',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      client: client.fullName,
      details: 'Visualizou ficha completa do cliente',
      reason: 'Consulta de informações'
    };
    setAuditLogs([auditEntry, ...auditLogs]);
  };

  const handleBlockUnblockAccount = () => {
    if (!selectedClient || !blockReasonRef.current) return;
    
    const reason = blockReasonRef.current.value || 'Razão não especificada';
    
    // Registrar na auditoria
    const action = selectedClient.accountStatus === 'active' ? 'BLOCK_ACCOUNT' : 'UNBLOCK_ACCOUNT';
    const auditEntry: AuditLog = {
      id: (auditLogs.length + 1).toString(),
      operator: 'Operador Atual',
      action: action,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      client: selectedClient.fullName,
      details: `${selectedClient.accountStatus === 'active' ? 'Bloqueou' : 'Desbloqueou'} conta do cliente`,
      reason: reason
    };
    setAuditLogs([auditEntry, ...auditLogs]);
    
    // Atualizar status do cliente
    setSelectedClient({
      ...selectedClient,
      accountStatus: selectedClient.accountStatus === 'active' ? 'blocked' : 'active'
    });
    
    setShowBlockModal(false);
  };

  const handleResetPassword = () => {
    if (!selectedClient || !resetReasonRef.current) return;
    
    const reason = resetReasonRef.current.value || 'Razão não especificada';
    
    // Registrar na auditoria
    const auditEntry: AuditLog = {
      id: (auditLogs.length + 1).toString(),
      operator: 'Operador Atual',
      action: 'RESET_PASSWORD',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      client: selectedClient.fullName,
      details: 'Reset da password do cliente',
      reason: reason
    };
    setAuditLogs([auditEntry, ...auditLogs]);
    
    setShowResetPasswordModal(false);
    
    // Em produção, aqui enviaria para o backend
    alert(language === 'PT' ? 
      'Password resetada com sucesso! Nova password enviada por email.' :
      'Password reset successfully! New password sent by email.'
    );
  };

  const handleCardAction = () => {
    if (!selectedClient || !cardReasonRef.current) return;
    
    const reason = cardReasonRef.current.value || 'Razão não especificada';
    const cardNumber = cardNumberRef.current?.value || '';
    
    const actionTexts = {
      block: { action: 'BLOCK_CARD', detail: 'Bloqueou cartão' },
      delete: { action: 'DELETE_CARD', detail: 'Eliminou cartão' },
      request: { action: 'REQUEST_CARD', detail: 'Solicitou novo cartão' }
    };
    
    const { action, detail } = actionTexts[cardAction];
    
    // Registrar na auditoria
    const auditEntry: AuditLog = {
      id: (auditLogs.length + 1).toString(),
      operator: 'Operador Atual',
      action: action,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      client: selectedClient.fullName,
      details: `${detail} ${cardNumber}`,
      reason: reason
    };
    setAuditLogs([auditEntry, ...auditLogs]);
    
    setShowCardModal(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'PT' ? 'pt-PT' : 'en-US', {
      style: 'currency',
      currency: 'MZN'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString(language === 'PT' ? 'pt-PT' : 'en-US');
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'active':
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800 border border-green-200`;
      case 'blocked':
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800 border border-red-200`;
      case 'suspended':
        return `${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`;
      case 'pending':
        return `${baseClasses} bg-red-100 text-red-800 border border-red-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-medium";
    switch (priority) {
      case 'high':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'low':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'active':
        return currentTexts.active;
      case 'blocked':
        return currentTexts.blocked;
      case 'suspended':
        return currentTexts.suspended;
      case 'completed':
        return currentTexts.completed;
      case 'pending':
        return currentTexts.pending;
      case 'failed':
        return currentTexts.failed;
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3">
                <img
                  src="/bank-logo.png"
                  alt="Banco Logo"
                  className="h-10 w-auto"
                />
                <div className="h-8 w-px bg-gray-300"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-red-600">{currentTexts.title}</h1>
                <p className="text-gray-600">{currentTexts.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <FaBell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">OP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Sistema de Abas */}
        <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['dashboard', 'clientSearch', 'approvals', 'audit'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    if (tab !== 'clientSearch') {
                      setShowClientDetails(false);
                    }
                  }}
                  className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {currentTexts[tab as keyof Texts]}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Conteúdo Principal */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Mensagem de Boas-vindas */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-sm p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{currentTexts.welcome}</h2>
              <p className="opacity-90">Último login: Hoje às 09:15</p>
            </div>

            {/* Métricas Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Clientes</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.totalClients.toLocaleString()}</p>
                  </div>
                  <FaUsers className="text-red-500 text-xl" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Clientes Ativos</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.activeClients.toLocaleString()}</p>
                  </div>
                  <FaUserCheck className="text-green-500 text-xl" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Aprovações Pendentes</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.pendingApprovals}</p>
                  </div>
                  <FaClipboardCheck className="text-yellow-500 text-xl" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Transações Falhadas</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.failedTransactions}</p>
                  </div>
                  <FaExclamationTriangle className="text-red-500 text-xl" />
                </div>
              </div>
            </div>

            {/* Grid Principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Aprovações Pendentes */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">{currentTexts.pendingApprovals}</h2>
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      {pendingApprovals.length} {currentTexts.pending.toLowerCase()}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {pendingApprovals.map((approval) => (
                      <div key={approval.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${approval.priority === 'high' ? 'bg-red-100' : approval.priority === 'medium' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                            <FaClipboardCheck className={approval.priority === 'high' ? 'text-red-600' : approval.priority === 'medium' ? 'text-yellow-600' : 'text-red-600'} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{approval.client}</p>
                            <p className="text-sm text-gray-600">{approval.type.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={getPriorityBadge(approval.priority)}>
                            {approval.priority}
                          </span>
                          <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                            {currentTexts.view}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Atividades de Hoje */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">{currentTexts.todaysActivities}</h2>
                  <div className="space-y-3">
                    {todaysActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-sm text-gray-900">{activity.client}</span>
                        </div>
                        <div className="text-sm text-gray-600">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alertas Urgentes */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">{currentTexts.urgentAlerts}</h2>
                  <div className="space-y-3">
                    {urgentAlerts.map((alert) => (
                      <div key={alert.id} className="p-3 border rounded-lg hover:shadow-sm transition-shadow" 
                        style={{ 
                          borderColor: alert.priority === 'high' ? '#fecaca' : alert.priority === 'medium' ? '#fef3c7' : '#dbeafe',
                          backgroundColor: alert.priority === 'high' ? '#fef2f2' : alert.priority === 'medium' ? '#fffbeb' : '#eff6ff'
                        }}>
                        <div className="flex items-start space-x-2">
                          <FaExclamationTriangle className={alert.priority === 'high' ? 'text-red-500' : 'text-yellow-500'} />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                            <p className="text-xs text-gray-600 mt-1">Prioridade: {alert.priority}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'clientSearch' && (
          <div className="space-y-6">
            {/* Barra de Pesquisa */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={currentTexts.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSearch}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center space-x-2"
                  >
                    <FaSearch />
                    <span>{currentTexts.searchClient}</span>
                  </button>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedClient(null);
                      setShowClientDetails(false);
                    }}
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                  >
                    {currentTexts.clearSearch}
                  </button>
                </div>
              </div>
              
              {/* Exemplo de clientes para teste */}
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-3">Exemplos para teste:</p>
                <div className="flex flex-wrap gap-2">
                  {sampleClients.map((client) => (
                    <button
                      key={client.id}
                      onClick={() => handleViewClient(client)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                    >
                      {client.fullName} - {client.documentNumber}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Detalhes do Cliente */}
            {showClientDetails && selectedClient && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                {/* Cabeçalho da Ficha */}
                <div className="bg-gradient-to-r from-red-50 to-red-100 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        {selectedClient.photo ? (
                          <img src={selectedClient.photo} alt={selectedClient.fullName} className="w-16 h-16 rounded-full border-4 border-white" />
                        ) : (
                          <div className="w-16 h-16 bg-red-600 rounded-full border-4 border-white flex items-center justify-center">
                            <FaUser className="text-white text-2xl" />
                          </div>
                        )}
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${selectedClient.accountStatus === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{selectedClient.fullName}</h2>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-600">{selectedClient.documentNumber}</span>
                          <span className={getStatusBadge(selectedClient.accountStatus)}>
                            {getStatusText(selectedClient.accountStatus)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{formatCurrency(selectedClient.balance)}</p>
                      <p className="text-sm text-gray-600">{selectedClient.accountNumber}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                  {/* Coluna Esquerda - Informações e Operações */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Informações Pessoais */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FaUser className="mr-2 text-red-600" />
                        {currentTexts.personalInfo}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600">{currentTexts.fullName}</label>
                          <p className="mt-1 text-gray-900">{selectedClient.fullName}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">{currentTexts.documentNumber}</label>
                          <p className="mt-1 text-gray-900 font-mono">{selectedClient.documentNumber}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">{currentTexts.birthDate}</label>
                          <p className="mt-1 text-gray-900">{formatDate(selectedClient.birthDate).split(',')[0]}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">{currentTexts.nationality}</label>
                          <p className="mt-1 text-gray-900">{selectedClient.nationality}</p>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-600">{currentTexts.address}</label>
                          <p className="mt-1 text-gray-900">{selectedClient.address}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">{currentTexts.phone}</label>
                          <p className="mt-1 text-gray-900">{selectedClient.phone}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">{currentTexts.email}</label>
                          <p className="mt-1 text-gray-900">{selectedClient.email}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">{currentTexts.profession}</label>
                          <p className="mt-1 text-gray-900">{selectedClient.profession}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">{currentTexts.employer}</label>
                          <p className="mt-1 text-gray-900">{selectedClient.employer}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">{currentTexts.mothersName}</label>
                          <p className="mt-1 text-gray-900">{selectedClient.mothersName}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">{currentTexts.fathersName}</label>
                          <p className="mt-1 text-gray-900">{selectedClient.fathersName}</p>
                        </div>
                      </div>
                    </div>

                    {/* Produtos e Serviços */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FaMoneyBillWave className="mr-2 text-red-600" />
                        {currentTexts.productsServices}
                      </h3>
                      
                      {/* Cartões */}
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-3">{currentTexts.cardManagement}</h4>
                        <div className="space-y-3">
                          {selectedClient.cards.map((card) => (
                            <div key={card.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <FaCreditCard className="text-red-600" />
                                <div>
                                  <p className="font-medium text-gray-900">{card.number}</p>
                                  <p className="text-sm text-gray-600">{card.type} • Expira: {card.expiry}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={getStatusBadge(card.status)}>
                                  {getStatusText(card.status)}
                                </span>
                                <button className="text-red-600 hover:text-red-800 p-1">
                                  <FaBan size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Empréstimos */}
                      {selectedClient.loans && selectedClient.loans.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Empréstimos</h4>
                          <div className="space-y-3">
                            {selectedClient.loans.map((loan) => (
                              <div key={loan.id} className="p-3 bg-white border border-gray-200 rounded-lg">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium text-gray-900">{loan.type}</p>
                                    <p className="text-sm text-gray-600">{formatCurrency(loan.amount)} • {loan.installments} parcelas</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium text-gray-900">{formatCurrency(loan.remaining)}</p>
                                    <p className="text-sm text-gray-600">Restante</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Coluna Direita - Operações e Status */}
                  <div className="space-y-6">
                    {/* Status da Conta */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FaShieldAlt className="mr-2 text-red-600" />
                        {currentTexts.accountStatusTitle}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600">{currentTexts.lastLogin}</label>
                          <p className="mt-1 text-gray-900">{formatDate(selectedClient.lastLogin)}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">{currentTexts.lastPasswordChange}</label>
                          <p className="mt-1 text-gray-900">{formatDate(selectedClient.lastPasswordChange)}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">{currentTexts.verificationLevel}</label>
                          <p className="mt-1 text-gray-900">{selectedClient.verificationLevel}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">{currentTexts.assignedManager}</label>
                          <p className="mt-1 text-gray-900">{selectedClient.assignedManager || 'Não atribuído'}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">{currentTexts.accountSince}</label>
                          <p className="mt-1 text-gray-900">{formatDate(selectedClient.accountSince).split(',')[0]}</p>
                        </div>
                      </div>
                    </div>

                    {/* Operações */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FaCog className="mr-2 text-red-600" />
                        {currentTexts.operations}
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setShowBlockModal(true)}
                          className={`p-3 rounded-lg border flex flex-col items-center justify-center space-y-2 transition-colors ${selectedClient.accountStatus === 'active'
                              ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
                              : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                            }`}
                        >
                          {selectedClient.accountStatus === 'active' ? <FaLock /> : <FaUnlock />}
                          <span className="text-sm font-medium">
                            {selectedClient.accountStatus === 'active' ? currentTexts.blockAccount : currentTexts.unblockAccount}
                          </span>
                        </button>
                        
                        <button
                          onClick={() => setShowResetPasswordModal(true)}
                          className="p-3 rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors flex flex-col items-center justify-center space-y-2"
                        >
                          <FaKey />
                          <span className="text-sm font-medium">{currentTexts.resetPassword}</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            setCardAction('block');
                            setShowCardModal(true);
                          }}
                          className="p-3 rounded-lg border border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors flex flex-col items-center justify-center space-y-2"
                        >
                          <FaCreditCard />
                          <span className="text-sm font-medium">{currentTexts.blockCard}</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            setCardAction('request');
                            setShowCardModal(true);
                          }}
                          className="p-3 rounded-lg border border-green-200 bg-green-50 text-green-700 hover:bg-green-100 transition-colors flex flex-col items-center justify-center space-y-2"
                        >
                          <FaCreditCard />
                          <span className="text-sm font-medium">{currentTexts.requestCard}</span>
                        </button>
                        
                        <button className="p-3 rounded-lg border border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors flex flex-col items-center justify-center space-y-2">
                          <FaExchangeAlt />
                          <span className="text-sm font-medium">{currentTexts.viewMovements}</span>
                        </button>
                        
                        <button className="p-3 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors flex flex-col items-center justify-center space-y-2">
                          <FaPrint />
                          <span className="text-sm font-medium">{currentTexts.issueCheck}</span>
                        </button>
                      </div>
                    </div>

                    {/* Transações Recentes */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FaHistory className="mr-2 text-red-600" />
                        {currentTexts.recentActivity}
                      </h3>
                      <div className="space-y-3">
                        {selectedClient.transactions.slice(0, 5).map((transaction) => (
                          <div key={transaction.id} className="flex items-center justify-between p-2 hover:bg-white rounded transition-colors">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                              <p className="text-xs text-gray-600">{formatDate(transaction.date)}</p>
                              {transaction.failureReason && (
                                <p className="text-xs text-red-600 mt-1">
                                  <FaExclamationTriangle className="inline mr-1" />
                                  {transaction.failureReason}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className={`text-sm font-medium ${transaction.status === 'failed' ? 'text-red-600' : 'text-gray-900'}`}>
                                {formatCurrency(transaction.amount)}
                              </p>
                              <span className={`text-xs px-2 py-1 rounded ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' : transaction.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {getStatusText(transaction.status)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">{currentTexts.auditLog}</h2>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <FaFilter size={14} />
                    <span>{currentTexts.filter}</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <FaDownload size={14} />
                    <span>{currentTexts.export}</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {currentTexts.timestamp}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {currentTexts.auditorName}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {currentTexts.action}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {currentTexts.details}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {currentTexts.reason}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(log.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-2">
                            <FaUserShield className="text-red-600" size={14} />
                          </div>
                          {log.operator}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${log.action.includes('VIEW') ? 'bg-red-100 text-red-800' : log.action.includes('RESET') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {log.action.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.client}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {log.details}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {log.reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {auditLogs.length === 0 && (
              <div className="text-center py-12">
                <FaHistory className="mx-auto text-gray-400 text-4xl mb-4" />
                <p className="text-gray-500">{currentTexts.noAuditLogs}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal de Bloqueio/Desbloqueio */}
      {showBlockModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedClient.accountStatus === 'active' ? currentTexts.confirmBlock : currentTexts.confirmUnblock}
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 border">
              <p className="font-medium text-gray-900">{selectedClient.fullName}</p>
              <p className="text-sm text-gray-600">{selectedClient.documentNumber}</p>
              <p className="text-sm text-gray-600">{selectedClient.accountNumber}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentTexts.reason} *
              </label>
              <textarea
                ref={blockReasonRef}
                placeholder={currentTexts.enterReason}
                rows={3}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowBlockModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-400 transition-colors"
              >
                {currentTexts.cancel}
              </button>
              <button
                onClick={handleBlockUnblockAccount}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                {currentTexts.confirm}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Reset de Password */}
      {showResetPasswordModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentTexts.confirmReset}</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 border">
              <p className="font-medium text-gray-900">{selectedClient.fullName}</p>
              <p className="text-sm text-gray-600">{selectedClient.email}</p>
              <p className="text-sm text-gray-600">{selectedClient.phone}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentTexts.reason} *
              </label>
              <textarea
                ref={resetReasonRef}
                placeholder={currentTexts.enterReason}
                rows={3}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowResetPasswordModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-400 transition-colors"
              >
                {currentTexts.cancel}
              </button>
              <button
                onClick={handleResetPassword}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                {currentTexts.confirm}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Gestão de Cartões */}
      {showCardModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {cardAction === 'block' ? currentTexts.blockCard : 
               cardAction === 'delete' ? currentTexts.deleteCard : currentTexts.requestCard}
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 border">
              <p className="font-medium text-gray-900">{selectedClient.fullName}</p>
              <p className="text-sm text-gray-600">{selectedClient.accountNumber}</p>
            </div>
            
            {cardAction !== 'request' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentTexts.cardNumber} *
                </label>
                <select
                  ref={cardNumberRef}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">{currentTexts.selectAccount}</option>
                  {selectedClient.cards.map((card) => (
                    <option key={card.id} value={card.number}>{card.number} ({card.type})</option>
                  ))}
                </select>
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentTexts.reason} *
              </label>
              <textarea
                ref={cardReasonRef}
                placeholder={currentTexts.enterReason}
                rows={3}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCardModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-400 transition-colors"
              >
                {currentTexts.cancel}
              </button>
              <button
                onClick={handleCardAction}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${cardAction === 'delete' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
              >
                {cardAction === 'block' ? currentTexts.blockCard : 
                 cardAction === 'delete' ? currentTexts.deleteCard : currentTexts.requestCard}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackOfficeSystem;