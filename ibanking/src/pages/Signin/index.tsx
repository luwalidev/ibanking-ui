// pages/SignIn.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { texts } from '../../translations/signinTexts';

export function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [language] = useState<'PT' | 'EN'>('PT');
    const [userType, setUserType] = useState<'individual' | 'business'>('individual');


    const currentTexts = texts[language];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            if (userType === 'business') {
                navigate('/panel');
            } else {
                navigate('/mypanel');
            }
        }, 1500);
    };

    return (
        <>
            <Navbar language={language} setLanguage={function (): void {
                throw new Error('Function not implemented.');
            }} />
            <div className="bg-linear-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden min-h-screen flex items-center justify-center">
                {/* Background com gradiente animado */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/30 to-red-900/20 animate-gradient-x"></div>

                {/* Partículas de fundo */}
                <div className="absolute inset-0">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 4}s`
                            }}
                        />
                    ))}
                </div>

                {/* Main Content - Container mais compacto */}
                <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                        {/* Text Content - Left Side */}
                        <div className="text-center lg:text-left">
                            <div className="space-y-6 max-w-lg mx-auto lg:mx-0">
                                {/* Hero Text */}
                                <div className="space-y-4">
                                    <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                        <span className="text-white/80 text-sm font-medium">
                                            {language === 'PT' ? 'Bem-vindo de volta' : 'Welcome back'}
                                        </span>
                                    </div>

                                    <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                                        {currentTexts.title}
                                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                                            {userType === 'business' ?
                                                (language === 'PT' ? 'Empresarial' : 'Business') :
                                                (language === 'PT' ? 'Pessoal' : 'Personal')
                                            }
                                        </span>
                                    </h1>

                                    <p className="text-lg text-gray-300 leading-relaxed">
                                        {currentTexts.subtitle}
                                    </p>
                                </div>

                                {/* Features Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                                    {currentTexts.features.slice(0, 4).map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-3 group">
                                            <div className="shrink-0 w-8 h-8 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg flex items-center justify-center group-hover:from-red-500/30 group-hover:to-red-600/30 transition-all duration-300 backdrop-blur-sm border border-white/5">
                                                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-200 text-sm font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Form Container - Right Side com dimensões fixas */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="w-full max-w-md">
                                {/* Glass Morphism Card com altura máxima */}
                                <div className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden max-h-[600px]">

                                    {/* Header compacto */}
                                    <div className="p-6 text-center border-b border-white/10">
                                        <div className="flex justify-center mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-14 h-14 rounded-xl flex items-center justify-center">
                                                    <img
                                                        src="/bank-logo.png"
                                                        alt="UBA Moçambique"
                                                        className="w-14 h-14 object-contain"
                                                    />
                                                </div>
                                                <div className="text-left">
                                                    <div className="text-white font-bold text-lg">UBA Moçambique</div>
                                                    <div className="text-gray-300 text-xs">{language === 'PT' ? 'Banking Digital' : 'Digital Banking'}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <h2 className="text-xl font-bold text-white mb-3">
                                            {language === 'PT' ? 'Acesso à Conta' : 'Account Access'}
                                        </h2>

                                        {/* User Type Selector */}
                                        <div className="bg-white/5 rounded-xl p-1 inline-flex">
                                            <button
                                                type="button"
                                                onClick={() => setUserType('individual')}
                                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${userType === 'individual'
                                                    ? 'bg-white text-gray-900 shadow-md'
                                                    : 'text-white/70 hover:text-white'
                                                    }`}
                                            >
                                                {language === 'PT' ? 'Particular' : 'Individual'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setUserType('business')}
                                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${userType === 'business'
                                                    ? 'bg-white text-gray-900 shadow-md'
                                                    : 'text-white/70 hover:text-white'
                                                    }`}
                                            >
                                                {language === 'PT' ? 'Empresa' : 'Business'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Login Form compacto */}
                                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                        {/* Email Field */}
                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                {currentTexts.email}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm pr-12 text-sm"
                                                    placeholder={language === 'PT' ? 'seu@email.com' : 'your@email.com'}
                                                    required
                                                />
                                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Password Field */}
                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                {currentTexts.password}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm pr-12 text-sm"
                                                    placeholder={language === 'PT' ? 'Sua senha' : 'Your password'}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors duration-300"
                                                >
                                                    {showPassword ? (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Forgot Password */}
                                        <div className="text-right pb-2">
                                            <button
                                                type="button"
                                                className="text-red-400 hover:text-red-300 text-xs font-medium transition-colors duration-300"
                                            >
                                                {language === 'PT' ? 'Esqueceu a senha?' : 'Forgot password?'}
                                            </button>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-lg font-bold hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg border border-red-500/50 text-sm"
                                        >
                                            <div className="relative z-10 flex items-center justify-center">
                                                {isLoading ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                                        {currentTexts.signingIn}
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>{currentTexts.signIn}</span>
                                                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                        </svg>
                                                    </>
                                                )}
                                            </div>
                                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                        </button>

                                        {/* Divider */}
                                        <div className="relative flex items-center py-3">
                                            <div className="flex-grow border-t border-white/10"></div>
                                            <span className="flex-shrink mx-3 text-gray-400 text-xs">{language === 'PT' ? 'ou' : 'or'}</span>
                                            <div className="flex-grow border-t border-white/10"></div>
                                        </div>

                                        {/* Sign Up Link */}
                                        <div className="text-center pt-2">
                                            <p className="text-gray-400 text-xs">
                                                {currentTexts.noAccount}{' '}
                                                <button
                                                    type="button"
                                                    onClick={() => navigate('/signup')}
                                                    className="text-red-400 hover:text-white font-semibold transition-colors duration-300 hover:underline underline-offset-2"
                                                >
                                                    {currentTexts.signUp}
                                                </button>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}