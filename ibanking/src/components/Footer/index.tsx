import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import { navbarTexts } from '../../translations/navbarTexts';
import { footerTexts } from '../../translations/footerTexts';

interface FooterProps {
  language: 'PT' | 'EN';
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const currentTexts = navbarTexts[language];


  const currentFooterTexts = footerTexts[language];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center mb-4">
              <img className="h-8 w-auto mr-3" src="/bank-logo.png" alt="UBA Moçambique" />
              {/* <span className="text-xl font-bold text-red-400">{currentTexts.company}</span> */}
            </div>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              {currentFooterTexts.description}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-300">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-300">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-red-400 border-b border-white pb-2">
              {currentFooterTexts.quickLinks}
            </h3>
            <ul className="space-y-3">
              <li>
                <NavLink to="/about" className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-sm">
                  {currentTexts.about}
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-sm">
                  {currentTexts.contact}
                </NavLink>
              </li>
              <li>
                <NavLink to="/news" className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-sm">
                  {currentFooterTexts.news}
                </NavLink>
              </li>
              <li>
                <NavLink to="/careers" className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-sm">
                  {currentFooterTexts.careers}
                </NavLink>
              </li>
              <li>
                <NavLink to="/support" className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-sm">
                  {currentFooterTexts.support}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-red-400 border-b border-white pb-2">
              {currentFooterTexts.services}
            </h3>
            <ul className="space-y-3">
              <li>
                <NavLink to="/particulares/contas" className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-sm">
                  {currentTexts.accounts}
                </NavLink>
              </li>
              <li>
                <NavLink to="/particulares/cartoes" className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-sm">
                  {currentTexts.cards}
                </NavLink>
              </li>
              <li>
                <NavLink to="/particulares/creditos" className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-sm">
                  {currentTexts.loans}
                </NavLink>
              </li>
              <li>
                <NavLink to="/particulares/investimentos" className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-sm">
                  {currentTexts.investments}
                </NavLink>
              </li>
              <li>
                <NavLink to="/empresas/contas" className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-sm">
                  {currentTexts.businessAccounts}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-red-400 border-b border-white pb-2">
              {currentFooterTexts.contact}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="shrink-0 mt-1">
                  <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-300 text-sm">{currentFooterTexts.address}</p>
              </div>
              
              <div className="flex items-center">
                <div className="shrink-0">
                  <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-300 text-sm">{currentFooterTexts.phone}</p>
              </div>
              
              <div className="flex items-center">
                <div className="shrink-0">
                  <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-300 text-sm">{currentFooterTexts.email}</p>
              </div>

              {/* Horário de Atendimento */}
              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <h4 className="text-red-400 font-semibold text-sm mb-2">
                  {language === 'PT' ? 'Horário de Atendimento' : 'Customer Service Hours'}
                </h4>
                <p className="text-gray-300 text-xs">
                  {language === 'PT' ? 'Seg-Sex: 8h-20h | Sáb: 9h-13h' : 'Mon-Fri: 8AM-8PM | Sat: 9AM-1PM'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400 text-xs">
                &copy; {new Date().getFullYear()} UBA Moçambique. {currentFooterTexts.rights}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {currentFooterTexts.licensed}
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <NavLink to="/privacy" className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-xs">
                {currentFooterTexts.privacy}
              </NavLink>
              <NavLink to="/terms" className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-xs">
                {currentFooterTexts.terms}
              </NavLink>
              <NavLink to="/cookies" className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-xs">
                {currentFooterTexts.cookies}
              </NavLink>
              <NavLink to="/compliance" className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-xs">
                {currentFooterTexts.compliance}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };