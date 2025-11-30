// components/ClientNotificationPreferences.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiBellOn, CiMail, CiMobile3, CiLock, CiCalendar, CiMoneyBill } from "react-icons/ci";
import { ClientLayout } from '../../../components/ClientLayout';

interface ClientNotificationPreferences {
    enabled: boolean;
    email: boolean;
    sms: boolean;
    transactionAlerts: boolean;
    balanceAlerts: boolean;
    dueDateAlerts: boolean;
    securityAlerts: boolean;
}

interface ClientNotificationPreferencesProps {
    language: 'PT' | 'EN';
}

const ClientNotificationPreferences: React.FC<ClientNotificationPreferencesProps> = ({ language }) => {

    const navigate = useNavigate();

    const [preferences, setPreferences] = useState<ClientNotificationPreferences>({
        enabled: false,
        email: false,
        sms: false,
        transactionAlerts: true,
        balanceAlerts: true,
        dueDateAlerts: true,
        securityAlerts: true
    });

    // Carregar preferências do localStorage
    useEffect(() => {
        const savedPrefs = localStorage.getItem('businessNotificationPrefs');
        if (savedPrefs) {
            setPreferences(JSON.parse(savedPrefs));
        }
    }, []);

    // Salvar preferências
    const savePreferences = (newPrefs: ClientNotificationPreferences) => {
        setPreferences(newPrefs);
        localStorage.setItem('businessNotificationPrefs', JSON.stringify(newPrefs));
    };

    const handleToggleEnabled = () => {
        const newPrefs = {
            ...preferences,
            enabled: !preferences.enabled
        };
        savePreferences(newPrefs);
    };

    const handleToggleChannel = (channel: 'email' | 'sms') => {
        const newPrefs = {
            ...preferences,
            [channel]: !preferences[channel]
        };

        // Se ambos os canais estiverem desativados, desativar notificações
        if (channel === 'email' && !newPrefs.sms && !newPrefs.email) {
            newPrefs.enabled = false;
        } else if (channel === 'sms' && !newPrefs.sms && !newPrefs.email) {
            newPrefs.enabled = false;
        } else {
            newPrefs.enabled = true;
        }

        savePreferences(newPrefs);
    };

    const handleToggleAlertType = (type: keyof ClientNotificationPreferences) => {
        const newPrefs = {
            ...preferences,
            [type]: !preferences[type]
        };
        savePreferences(newPrefs);
    };

    const handleSave = () => {
        // Aqui você pode adicionar lógica para salvar no backend
        alert(language === 'PT' ? 'Preferências salvas com sucesso!' : 'Preferences saved successfully!');
        navigate('/business');
    };

    return (
        <>
            <ClientLayout>
                <div className="max-w-6xl mx-auto space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        {/* Header */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <CiBellOn size={24} className="text-red-600" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        {language === 'PT' ? 'Alertas e Notificações' : 'Alerts and Notifications'}
                                    </h1>
                                    <p className="text-gray-600">
                                        {language === 'PT'
                                            ? 'Gerencie as suas preferências de notificação'
                                            : 'Manage your notification preferences'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Coluna Principal */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Ativação de Notificações */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {language === 'PT' ? 'Ativar Notificações' : 'Enable Notifications'}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {language === 'PT'
                                                    ? 'Receba alertas importantes sobre a sua conta empresarial'
                                                    : 'Receive important alerts about your business account'}
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleToggleEnabled}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.enabled ? 'bg-red-600' : 'bg-gray-200'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.enabled ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                {/* Canais de Notificação */}
                                {preferences.enabled && (
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                            {language === 'PT' ? 'Canais de Notificação' : 'Notification Channels'}
                                        </h3>

                                        <div className="space-y-4">
                                            {/* Email */}
                                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-blue-100 rounded-lg">
                                                        <CiMail size={20} className="text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {language === 'PT' ? 'Email' : 'Email'}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {language === 'PT'
                                                                ? 'Receba notificações por email'
                                                                : 'Receive notifications by email'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleToggleChannel('email')}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.email ? 'bg-red-600' : 'bg-gray-200'
                                                        }`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.email ? 'translate-x-6' : 'translate-x-1'
                                                            }`}
                                                    />
                                                </button>
                                            </div>

                                            {/* SMS */}
                                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-green-100 rounded-lg">
                                                        <CiMobile3 size={20} className="text-green-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">SMS</p>
                                                        <p className="text-sm text-gray-600">
                                                            {language === 'PT'
                                                                ? 'Receba notificações por SMS'
                                                                : 'Receive notifications by SMS'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleToggleChannel('sms')}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.sms ? 'bg-red-600' : 'bg-gray-200'
                                                        }`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.sms ? 'translate-x-6' : 'translate-x-1'
                                                            }`}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Tipos de Alertas */}
                                {preferences.enabled && (preferences.email || preferences.sms) && (
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                            {language === 'PT' ? 'Tipos de Alertas' : 'Alert Types'}
                                        </h3>

                                        <div className="space-y-4">
                                            {/* Transações */}
                                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-purple-100 rounded-lg">
                                                        <CiMoneyBill size={20} className="text-purple-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {language === 'PT' ? 'Alertas de Transações' : 'Transaction Alerts'}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {language === 'PT'
                                                                ? 'Notificações sobre transações realizadas'
                                                                : 'Notifications about completed transactions'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleToggleAlertType('transactionAlerts')}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.transactionAlerts ? 'bg-red-600' : 'bg-gray-200'
                                                        }`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.transactionAlerts ? 'translate-x-6' : 'translate-x-1'
                                                            }`}
                                                    />
                                                </button>
                                            </div>

                                            {/* Saldo */}
                                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-yellow-100 rounded-lg">
                                                        <CiMoneyBill size={20} className="text-yellow-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {language === 'PT' ? 'Alertas de Saldo' : 'Balance Alerts'}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {language === 'PT'
                                                                ? 'Notificações sobre o saldo da conta'
                                                                : 'Notifications about account balance'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleToggleAlertType('balanceAlerts')}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.balanceAlerts ? 'bg-red-600' : 'bg-gray-200'
                                                        }`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.balanceAlerts ? 'translate-x-6' : 'translate-x-1'
                                                            }`}
                                                    />
                                                </button>
                                            </div>

                                            {/* Vencimentos */}
                                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-orange-100 rounded-lg">
                                                        <CiCalendar size={20} className="text-orange-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {language === 'PT' ? 'Alertas de Vencimentos' : 'Due Date Alerts'}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {language === 'PT'
                                                                ? 'Lembretes de pagamentos e vencimentos'
                                                                : 'Payment and due date reminders'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleToggleAlertType('dueDateAlerts')}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.dueDateAlerts ? 'bg-red-600' : 'bg-gray-200'
                                                        }`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.dueDateAlerts ? 'translate-x-6' : 'translate-x-1'
                                                            }`}
                                                    />
                                                </button>
                                            </div>

                                            {/* Segurança */}
                                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-red-100 rounded-lg">
                                                        <CiLock size={20} className="text-red-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {language === 'PT' ? 'Alertas de Segurança' : 'Security Alerts'}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {language === 'PT'
                                                                ? 'Notificações sobre atividades de segurança'
                                                                : 'Notifications about security activities'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleToggleAlertType('securityAlerts')}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.securityAlerts ? 'bg-red-600' : 'bg-gray-200'
                                                        }`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.securityAlerts ? 'translate-x-6' : 'translate-x-1'
                                                            }`}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Resumo */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        {language === 'PT' ? 'Resumo' : 'Summary'}
                                    </h3>

                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">
                                                {language === 'PT' ? 'Estado' : 'Status'}
                                            </span>
                                            <span className={`font-medium ${preferences.enabled ? 'text-green-600' : 'text-gray-600'
                                                }`}>
                                                {preferences.enabled
                                                    ? (language === 'PT' ? 'Ativo' : 'Active')
                                                    : (language === 'PT' ? 'Inativo' : 'Inactive')
                                                }
                                            </span>
                                        </div>

                                        {preferences.enabled && (
                                            <>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Email</span>
                                                    <span className={`font-medium ${preferences.email ? 'text-green-600' : 'text-gray-600'
                                                        }`}>
                                                        {preferences.email ? '✓' : '✗'}
                                                    </span>
                                                </div>

                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">SMS</span>
                                                    <span className={`font-medium ${preferences.sms ? 'text-green-600' : 'text-gray-600'
                                                        }`}>
                                                        {preferences.sms ? '✓' : '✗'}
                                                    </span>
                                                </div>

                                                <div className="pt-3 border-t border-gray-200">
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        {language === 'PT' ? 'Alertas ativos:' : 'Active alerts:'}
                                                    </p>
                                                    <div className="space-y-1">
                                                        {preferences.transactionAlerts && (
                                                            <p className="text-sm text-green-600">• {language === 'PT' ? 'Transações' : 'Transactions'}</p>
                                                        )}
                                                        {preferences.balanceAlerts && (
                                                            <p className="text-sm text-green-600">• {language === 'PT' ? 'Saldo' : 'Balance'}</p>
                                                        )}
                                                        {preferences.dueDateAlerts && (
                                                            <p className="text-sm text-green-600">• {language === 'PT' ? 'Vencimentos' : 'Due Dates'}</p>
                                                        )}
                                                        {preferences.securityAlerts && (
                                                            <p className="text-sm text-green-600">• {language === 'PT' ? 'Segurança' : 'Security'}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Ações */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <div className="space-y-3">
                                        <button
                                            onClick={handleSave}
                                            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
                                        >
                                            {language === 'PT' ? 'Guardar Alterações' : 'Save Changes'}
                                        </button>

                                        <button
                                            onClick={() => navigate('/business')}
                                            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                        >
                                            {language === 'PT' ? 'Cancelar' : 'Cancel'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ClientLayout>
        </>
    );
};

export default ClientNotificationPreferences;