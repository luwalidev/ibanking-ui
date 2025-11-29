import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { SignIn } from '../pages/Signin';


// Componentes do Cliente
import { ClientDashboard } from '../pages/Clients/ClientsDashboard';
import ClientRecharges from '../pages/Clients/ClientRecharges';
import ClientServicePayments from '../pages/Clients/ClientServicePayments';
import ClientMovements from '../pages/Clients/ClientMovements';
import ClientExtract from '../pages/Clients/ClientExtract';
import PrepaidCards from '../pages/Clients/PrepaidCards';

// Componentes do Business
import BusinessDashboard from '../pages/Business/BusinessDashboard';
import BusinessMultipleTransfers from '../pages/Business/BusinessMultipleTransfers';
import BusinessNationalTransfers from '../pages/Business/BusinessNationalTransfers';
import NotificationPreferences from '../components/NotificationPreferences';
import DigitalWalletPayment from '../components/DigitalWalletPayment';
import TransactionAuthorization from '../components/TransactionAuthorization';
import ScheduledTransfers from '../pages/Business/ScheduledTransfers';
import CheckManagement from '../pages/Business/CheckManagement';
import CreditCards from '../pages/Business/CreditCards';

// Componentes Compartilhados
import NotFound from '../pages/NotFound';
import Signup from '../pages/Signup';
import ClientGenericPage from '../pages/Clients/ClientComingSoon';
import ClientNationalTransfers from '../pages/Clients/ClientNationalTransfers';
import ClientMultipleTransfers from '../pages/Clients/ClientMultipleTransfers';
import BusinessGenericPage from '../pages/Business/BusinessComingSoon';
import BusinessServicePayments from '../pages/Business/BusinessServicePayments';
import ClientDigitalWalletPayment from '../pages/Clients/ClientDigitalWalletPayment';
import BusinessMovements from '../pages/Business/BusinessMovements';
import BusinessExtract from '../pages/Business/BusinessExtract';
import ClientCards from '../pages/Clients/ClientCards';
import ClientInvestments from '../pages/Clients/ClientInvestments';
import BusinessInternationalTransfers from '../pages/Business/BusinessInternationalTransfers';
import BusinessMyAccountsTransfers from '../pages/Business/BusinessMyAccountsTransfers';
import ClientInternationalTransfers from '../pages/Clients/ClientInternationalTransfers';
import ClientMyAccountsTransfers from '../pages/Clients/ClientMyAccountsTransfers';
import BusinessSameBankTransfers from '../pages/Business/BusinessSameBankTransfers';
import ClientSameBankTransfers from '../pages/Clients/ClientSameBankTransfers';
import ClientBeneficiaries from '../pages/Clients/ClientBeneficiaries';
import BackOfficeDashboard from '../pages/Business/BackOfficeDashboard';
import ClientSavingsCreate from '../pages/Clients/ClientSavingsCreate';
import ClientFixedDeposit from '../pages/Clients/ClientFixedDeposit';
import ClientTravelInsurance from '../pages/Clients/ClientTravelInsurance';
import ClientThirdPartyInsurance from '../pages/Clients/ClientThirdPartyInsurance';
import ClientOtherInsurance from '../pages/Clients/ClientOtherInsurance';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Rotas Públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<Signup language="PT" />} />

                {/* =========================================== */}
                {/* ROTAS DO CLIENTE */}
                {/* =========================================== */}

                {/* Dashboard */}
                <Route path="/mypanel" element={<ClientDashboard />} />

                {/* Contas */}
                <Route path="/client/accounts" element={<ClientGenericPage language="PT" />} />

                {/* Transferências */}
                <Route path="/client/transfers/national" element={<ClientNationalTransfers />} />

                <Route path="/client/transfers/multiple" element={<ClientMultipleTransfers />} />
                <Route path="/client/transfers/digital-wallet" element={<ClientDigitalWalletPayment language="PT" />} />
                <Route path="/client/transfers/scheduled" element={<ClientGenericPage language="PT" />} />

                {/* Pagamentos */}
                <Route path="/client/payments" element={<ClientGenericPage language="PT" />} />
                <Route path="/client/payments/services" element={<ClientServicePayments language="PT" />} />

                {/* Cartões */}
                <Route path="/client/cards" element={<ClientCards language="PT" />} />

                {/* Recargas */}
                <Route path="/client/recharges" element={<ClientRecharges language="PT" />} />

                {/* Empréstimos */}
                <Route path="/client/loans" element={<ClientGenericPage language="PT" />} />

                {/* Investimentos */}
                <Route path="/client/investments" element={<ClientInvestments language={'PT'} />} />

                {/* Seguros */}
                <Route path="/client/insurance" element={<ClientGenericPage language="PT" />} />

                {/* Outros Serviços */}
                <Route path="/client/prepaid-cards" element={<PrepaidCards language="PT" />} />
                <Route path="/client/extract" element={<ClientExtract language="PT" />} />
                <Route path="/business/extract" element={<BusinessExtract language="PT" />} />


                {/* Movimentos e Extratos */}
                <Route path="/client/movements" element={<ClientMovements language="PT" />} />
                <Route path="/business/movements" element={<BusinessMovements language="PT" />} />

                {/* Configurações */}
                <Route path="/client/profile" element={<ClientGenericPage language="PT" />} />
                <Route path="/client/security" element={<ClientGenericPage language="PT" />} />
                <Route path="/client/settings" element={<ClientGenericPage language="PT" />} />

                {/* Seguros */}
                <Route path="/client/insurance/travel" element={<ClientTravelInsurance language="PT" />} />
                <Route path="/client/insurance/third-party" element={<ClientThirdPartyInsurance language="PT" />} />
                <Route path="/client/insurance/other" element={<ClientOtherInsurance language="PT" />} />

                {/* Poupança */}
                <Route path="/client/savings/create" element={<ClientSavingsCreate language="PT" />} />
                <Route path="/client/savings/fixed-deposit" element={<ClientFixedDeposit language="PT" />} />

                {/* Beneficiario */}
                <Route path="/client/beneficiaries" element={<ClientBeneficiaries language="PT" />} />

                {/* BackOffs */}
                <Route path="/business/backOffs" element={<BackOfficeDashboard language="PT" />} />

                {/* =========================================== */}
                {/* ROTAS DO BUSINESS */}
                {/* =========================================== */}

                {/* Dashboard */}
                <Route path="/panel" element={<BusinessDashboard />} />

                {/* Gestão da Empresa */}
                <Route path="/business/company/management" element={<BusinessGenericPage language="PT" />} />
                <Route path="/business/company/current-accounts" element={<BusinessGenericPage language="PT" />} />

                {/* Transferências */}
                <Route path="/business/transfers/national" element={<BusinessNationalTransfers />} />

                <Route path="/business/transfers/international" element={<BusinessInternationalTransfers />} />
                <Route path="/client/transfers/international" element={<ClientInternationalTransfers />} />
                <Route path="/business/transfers/same-bank" element={<BusinessSameBankTransfers />} />
                <Route path="/client/transfers/same-bank" element={<ClientSameBankTransfers />} />
                <Route path="/business/transfers/my-accounts" element={<BusinessMyAccountsTransfers />} />
                <Route path="/client/transfers/my-accounts" element={<ClientMyAccountsTransfers />} />

                <Route path="/business/transfers/multiple" element={<BusinessMultipleTransfers />} />
                <Route path="/business/transfers/digital-wallet" element={<DigitalWalletPayment language="PT" />} />
                <Route path="/business/transfers/debt-conversion" element={<BusinessGenericPage language="PT" />} />
                <Route path="/business/scheduled-transfers" element={<ScheduledTransfers language="PT" />} />

                {/* Pagamentos */}
                <Route path="/business/payments/suppliers" element={<BusinessGenericPage language="PT" />} />
                <Route path="/business/payments/salaries" element={<BusinessGenericPage language="PT" />} />
                <Route path="/business/payments/services" element={<BusinessServicePayments language="PT" />} />
                <Route path="/business/payments/state" element={<BusinessGenericPage language="PT" />} />
                <Route path="/business/payments/schedule" element={<BusinessGenericPage language="PT" />} />
                <Route path="/business/payments/direct-debits" element={<BusinessGenericPage language="PT" />} />
                <Route path="/business/payments/forex" element={<BusinessGenericPage language="PT" />} />
                <Route path="/business/payments/bulk" element={<BusinessGenericPage language="PT" />} />

                {/* Cartões */}
                <Route path="/business/cards" element={<BusinessGenericPage language="PT" />} />
                <Route path="/business/credit-cards" element={<CreditCards language="PT" />} />
                <Route path="/business/prepaid-cards" element={<BusinessGenericPage language="PT" />} />

                {/* Outros Serviços */}
                <Route path="/business/check-management" element={<CheckManagement language="PT" />} />
                <Route path="/business/savings" element={<BusinessGenericPage language="PT" />} />
                <Route path="/business/financing" element={<BusinessGenericPage language="PT" />} />
                <Route path="/business/operators" element={<BusinessGenericPage language="PT" />} />
                <Route path="/business/products" element={<BusinessGenericPage language="PT" />} />
                <Route path="/business/topup" element={<BusinessGenericPage language="PT" />} />

                {/* Faturação e Relatórios */}
                <Route path="/business/invoicing" element={<BusinessGenericPage language="PT" />} />
                <Route path="/business/reports" element={<BusinessGenericPage language="PT" />} />

                {/* Configurações */}
                <Route path="/business/profile" element={<BusinessGenericPage language="PT" />} />
                <Route path="/business/security" element={<BusinessGenericPage language="PT" />} />
                <Route path="/business/settings" element={<BusinessGenericPage language="PT" />} />
                <Route path="/business/notifications" element={<NotificationPreferences language="PT" />} />
                <Route path="/business/authorization" element={<TransactionAuthorization language="PT" />} />

                {/* =========================================== */}
                {/* ROTAS GLOBAIS */}
                {/* =========================================== */}

                <Route path="/comingsoon" element={<BusinessGenericPage language="PT" />} />

                {/* Rota 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;