import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MedicalDisclaimer } from './MedicalDisclaimer';

interface LayoutProps {
  children: ReactNode;
  showDisclaimer?: boolean;
}

export const Layout = ({ children, showDisclaimer = true }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {showDisclaimer && <MedicalDisclaimer className="mt-16" />}
      <main className={`flex-1 ${showDisclaimer ? '' : 'mt-16'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
