import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { IoBusinessOutline } from "react-icons/io5";
import { CiLogin, CiUser } from "react-icons/ci";
import { IoLanguage, IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { navbarTexts } from '../../translations/navbarTexts';

// Interface para as props
interface NavbarProps {
    language: 'PT' | 'EN' | 'ES' | 'FR' | 'DE' | 'IT' | 'NL' | 'ZH' | 'AR';
    setLanguage: (language: 'PT' | 'EN' | 'ES' | 'FR' | 'DE' | 'IT' | 'NL' | 'ZH' | 'AR') => void;
}

const Navbar: React.FC<NavbarProps> = ({ language, setLanguage }) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
    const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
    const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

    const languageDropdownRef = useRef<HTMLDivElement>(null);
    const themeDropdownRef = useRef<HTMLDivElement>(null);
    const countryDropdownRef = useRef<HTMLDivElement>(null);

    const handleRedirect = () => navigate('/signin');
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleLanguageDropdown = () => setLanguageDropdownOpen(!languageDropdownOpen);
    const toggleThemeDropdown = () => setThemeDropdownOpen(!themeDropdownOpen);
    const toggleCountryDropdown = () => setCountryDropdownOpen(!countryDropdownOpen);

    const currentTexts = navbarTexts[language];

    const languages = [
        { code: 'PT' as const, name: 'Português', flag: '🇵🇹' },
        { code: 'EN' as const, name: 'English', flag: '🇺🇸' },
        { code: 'ES' as const, name: 'Español', flag: '🇪🇸' },
        { code: 'FR' as const, name: 'Français', flag: '🇫🇷' },
        { code: 'DE' as const, name: 'Deutsch', flag: '🇩🇪' },
        { code: 'IT' as const, name: 'Italiano', flag: '🇮🇹' },
        { code: 'NL' as const, name: 'Nederlands', flag: '🇳🇱' },
        { code: 'ZH' as const, name: '中文 (Chinês)', flag: '🇨🇳' },
        { code: 'AR' as const, name: 'العربية (Árabe)', flag: '🇸🇦' }
    ];

    const countries = [
        { code: 'BJ', name: 'Benin', flag: '🇧🇯' },
        { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
        { code: 'CM', name: 'Cameroon', flag: '🇨🇲' },
        { code: 'TD', name: 'Chad', flag: '🇹🇩' },
        { code: 'CG', name: 'Congo Brazzaville', flag: '🇨🇬' },
        { code: 'CD', name: 'Congo DRC', flag: '🇨🇩' },
        { code: 'CI', name: 'Cote d\'Ivoire', flag: '🇨🇮' },
        { code: 'GA', name: 'Gabon', flag: '🇬🇦' },
        { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
        { code: 'GN', name: 'Guinea', flag: '🇬🇳' },
        { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
        { code: 'LR', name: 'Liberia', flag: '🇱🇷' },
        { code: 'MZ', name: 'Mozambique', flag: '🇲🇿' },
        { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
        { code: 'SN', name: 'Senegal', flag: '🇸🇳' },
        { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱' },
        { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
        { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
        { code: 'ZM', name: 'Zambia', flag: '🇿🇲' }
    ];

    // Estado para o país selecionado
    const [selectedCountry, setSelectedCountry] = useState('MZ');

    const handleCountrySelect = (countryCode: string) => {
        setSelectedCountry(countryCode);
        setCountryDropdownOpen(false);
    };

    // Estado para o tema - inicializar com base no localStorage ou preferência do sistema
    const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || saved === 'light') {
            return saved;
        }
        return 'light';
    });

    // Usar useMemo para recalcular os temas quando o idioma mudar
    const themes = React.useMemo(() => [
        { id: 'light' as const, name: currentTexts.light, icon: <IoSunnyOutline size={16} /> },
        { id: 'dark' as const, name: currentTexts.dark, icon: <IoMoonOutline size={16} /> },
        { id: 'auto' as const, name: currentTexts.auto, icon: <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-gray-600 rounded-full" /> }
    ], [currentTexts]);

    const handleLanguageSelect = (langCode: 'PT' | 'EN' | 'ES' | 'FR' | 'DE' | 'IT' | 'NL' | 'ZH' | 'AR') => {
        setLanguage(langCode);
        setLanguageDropdownOpen(false);
    };

    // Função para aplicar o tema
    const applyTheme = (themeId: 'light' | 'dark' | 'auto') => {
        const html = document.documentElement;

        if (themeId === 'dark') {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else if (themeId === 'light') {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            // Auto mode - usar preferência do sistema
            localStorage.setItem('theme', 'auto');
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }
        }
    };

    const handleThemeSelect = (themeId: 'light' | 'dark' | 'auto') => {
        setTheme(themeId);
        setThemeDropdownOpen(false);
        applyTheme(themeId);
    };

    // Inicializar tema ao carregar o componente
    useEffect(() => {
        applyTheme(theme);
    }, []);

    // Escutar mudanças na preferência do sistema quando em modo auto
    useEffect(() => {
        if (theme === 'auto') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => {
                applyTheme('auto');
            };

            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [theme]);

    // Fechar dropdowns quando clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
                setLanguageDropdownOpen(false);
            }
            if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
                setThemeDropdownOpen(false);
            }
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
                setCountryDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <nav className="bg-white dark:bg-gray-900 border-b-4 border-red-400 dark:border-red-600 shadow-lg transition-colors duration-300">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    {/* Top Bar */}
                    <div className="flex justify-end items-center h-8 bg-gray-100 dark:bg-gray-800 px-4 rounded-b-2xl">
                        <div className="flex items-center space-x-4 text-xs">
                            {/* Country Dropdown */}
                            <div className="relative" ref={countryDropdownRef}>
                                <button
                                    onClick={toggleCountryDropdown}
                                    className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-red-400 dark:hover:text-red-400 transition-colors duration-300"
                                >
                                    <span className="text-sm">{countries.find(c => c.code === selectedCountry)?.flag}</span>
                                    <span className="font-medium">{countries.find(c => c.code === selectedCountry)?.name}</span>
                                    <svg
                                        className={`w-3 h-3 ml-1 transition-transform duration-200 ${countryDropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Country Dropdown Menu */}
                                {countryDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 rounded-lg z-50 max-h-80 overflow-y-auto">
                                        <div className="py-2">
                                            {countries.map((country) => (
                                                <button
                                                    key={country.code}
                                                    onClick={() => handleCountrySelect(country.code)}
                                                    className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-left transition-colors duration-200 ${selectedCountry === country.code
                                                            ? 'bg-red-50 dark:bg-red-900/20 text-red-400'
                                                            : 'text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-400'
                                                        }`}
                                                >
                                                    <span className="text-base">{country.flag}</span>
                                                    <span>{country.name}</span>
                                                    {selectedCountry === country.code && (
                                                        <svg className="w-4 h-4 ml-auto text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Theme Dropdown */}
                            <div className="relative" ref={themeDropdownRef}>
                                <button
                                    onClick={toggleThemeDropdown}
                                    className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-red-400 dark:hover:text-red-400 transition-colors duration-300"
                                >
                                    {theme === 'light' ? <IoSunnyOutline size={14} /> :
                                        theme === 'dark' ? <IoMoonOutline size={14} /> :
                                            <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-gray-600 rounded-full" />}
                                    <span className="font-medium">{themes.find(t => t.id === theme)?.name}</span>
                                    <svg
                                        className={`w-3 h-3 ml-1 transition-transform duration-200 ${themeDropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Theme Dropdown Menu */}
                                {themeDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 rounded-lg z-50">
                                        <div className="py-2">
                                            {themes.map((themeOption) => (
                                                <button
                                                    key={themeOption.id}
                                                    onClick={() => handleThemeSelect(themeOption.id)}
                                                    className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-left transition-colors duration-200 ${theme === themeOption.id
                                                            ? 'bg-red-50 dark:bg-red-900/20 text-red-400'
                                                            : 'text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-400'
                                                        }`}
                                                >
                                                    {themeOption.icon}
                                                    <span>{themeOption.name}</span>
                                                    {theme === themeOption.id && (
                                                        <svg className="w-4 h-4 ml-auto text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Language Dropdown */}
                            <div className="relative" ref={languageDropdownRef}>
                                <button
                                    onClick={toggleLanguageDropdown}
                                    className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-red-400 dark:hover:text-red-400 transition-colors duration-300"
                                >
                                    <IoLanguage size={14} />
                                    <span className="font-medium">{currentTexts.language}</span>
                                    <svg
                                        className={`w-3 h-3 ml-1 transition-transform duration-200 ${languageDropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Language Dropdown Menu */}
                                {languageDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 rounded-lg z-50 max-h-80 overflow-y-auto">
                                        <div className="py-2">
                                            {languages.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => handleLanguageSelect(lang.code)}
                                                    className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-left transition-colors duration-200 ${language === lang.code
                                                            ? 'bg-red-50 dark:bg-red-900/20 text-red-400'
                                                            : 'text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-400'
                                                        }`}
                                                >
                                                    <span className="text-base">{lang.flag}</span>
                                                    <span>{lang.name}</span>
                                                    {language === lang.code && (
                                                        <svg className="w-4 h-4 ml-auto text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <NavLink to="/mypanel" className="text-gray-600 dark:text-gray-300 hover:text-red-400 dark:hover:text-red-400 transition-colors duration-300">
                                {currentTexts.login}
                            </NavLink>
                        </div>
                    </div>

                    {/* Main Navigation */}
                    <div className="relative px-9 flex h-20 items-center justify-between">
                        {/* Logo */}
                        <div className="flex flex-1 items-center justify-start">
                            <a href='/' className="flex items-center">
                                <div className="flex shrink-0 items-center">
                                    <img className="h-9 w-auto mb-1" src="/bank-logo.png" alt="UBA Moçambique" />
                                </div>
                            </a>
                        </div>

                        {/* Main navigation for larger screens */}
                        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
                            <div className="flex space-x-1 flex-nowrap whitespace-nowrap">
                                {/* Personal Dropdown */}
                                <div className="relative group">
                                    <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors duration-300">
                                        <CiUser size={18} />
                                        {currentTexts.personal}
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                        <div className="py-2">
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.accounts}
                                            </NavLink>
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.cards}
                                            </NavLink>
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.loans}
                                            </NavLink>
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.investments}
                                            </NavLink>
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.insurance}
                                            </NavLink>
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.digital}
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>

                                {/* Business Dropdown */}
                                <div className="relative group">
                                    <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors duration-300">
                                        <IoBusinessOutline size={18} />
                                        {currentTexts.business}
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                        <div className="py-2">
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.businessAccounts}
                                            </NavLink>
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.businessLoans}
                                            </NavLink>
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.treasury}
                                            </NavLink>
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.trade}
                                            </NavLink>
                                            <NavLink to="#" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-400 border-l-4 border-transparent hover:border-red-400 transition-all duration-300">
                                                {currentTexts.cardsBusiness}
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>

                                {/* Direct links */}
                                <NavLink to="#" className="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors duration-300">
                                    {currentTexts.private}
                                </NavLink>
                                <NavLink to="#" className="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors duration-300">
                                    {currentTexts.simulator}
                                </NavLink>
                                <NavLink to="#" className="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors duration-300">
                                    {currentTexts.about}
                                </NavLink>
                                <NavLink to="#" className="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors duration-300">
                                    {currentTexts.contact}
                                </NavLink>
                            </div>
                        </div>

                        {/* CTA Button and Mobile menu */}
                        <div className="flex items-center space-x-4">
                            {/* Sign Up Button */}
                            <div className="hidden sm:flex">
                                <button
                                    onClick={handleRedirect}
                                    className='flex items-center gap-2 rounded-lg bg-red-500 dark:bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 dark:hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors duration-300'
                                >
                                    <CiLogin size={18} />
                                    {currentTexts.signup}
                                </button>
                            </div>

                            {/* Mobile menu button */}
                            <div className="lg:hidden">
                                <button
                                    type="button"
                                    onClick={toggleMenu}
                                    className="relative inline-flex items-center justify-center rounded-lg p-2 text-red-400 dark:text-red-300 hover:bg-red-600 dark:hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 transition-colors duration-300"
                                    aria-controls="mobile-menu"
                                    aria-expanded={menuOpen}
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {menuOpen ? (
                                        <svg className="block h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        <svg className="block h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="lg:hidden border-t border-red-200 dark:border-red-800 bg-white dark:bg-gray-900" id="mobile-menu">
                        <div className="px-2 pb-3 pt-2 space-y-1">
                            {/* Country Selection in Mobile Menu */}
                            <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">País / Country</div>
                                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                                    {countries.map((country) => (
                                        <button
                                            key={country.code}
                                            onClick={() => {
                                                handleCountrySelect(country.code);
                                                setMenuOpen(false);
                                            }}
                                            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${selectedCountry === country.code
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-400'
                                                }`}
                                        >
                                            <span>{country.flag}</span>
                                            <span className="text-xs">{country.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Theme Selection in Mobile Menu */}
                            <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">{currentTexts.theme}</div>
                                <div className="grid grid-cols-3 gap-2">
                                    {themes.map((themeOption) => (
                                        <button
                                            key={themeOption.id}
                                            onClick={() => {
                                                handleThemeSelect(themeOption.id);
                                                setMenuOpen(false);
                                            }}
                                            className={`flex flex-col items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${theme === themeOption.id
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-400'
                                                }`}
                                        >
                                            {themeOption.icon}
                                            <span className="text-xs">{themeOption.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Language Selection in Mobile Menu */}
                            <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">{currentTexts.language}</div>
                                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                handleLanguageSelect(lang.code);
                                                setMenuOpen(false);
                                            }}
                                            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${language === lang.code
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-400'
                                                }`}
                                        >
                                            <span>{lang.flag}</span>
                                            <span className="text-xs">{lang.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Resto do mobile menu... */}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export { Navbar };