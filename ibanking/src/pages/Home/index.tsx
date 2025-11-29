import { useState } from "react";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { HeroCarousel } from "../../components/HeroCarousel";
import { BankValues } from "../../components/BankValues";
import { BranchLocator } from "../../components/BranchLocator";

export function Home() {
  const [language, setLanguage] = useState<'PT' | 'EN' | 'ES' | 'FR' | 'DE' | 'IT' | 'NL' | 'ZH' | 'AR'>('PT');

  // Converte para apenas PT ou EN para componentes antigos
  const getCompatibleLanguage = (lang: string): 'PT' | 'EN' => {
    return lang === 'PT' ? 'PT' : 'EN';
  };

  return (
    <>
      <Navbar language={language} setLanguage={setLanguage} />
      <HeroCarousel language={getCompatibleLanguage(language)} />
      <BranchLocator language={getCompatibleLanguage(language)} />
      <BankValues language={getCompatibleLanguage(language)} />
      <Footer language={getCompatibleLanguage(language)} />
    </>
  );
}