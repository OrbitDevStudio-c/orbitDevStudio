import type { ReactNode } from 'react';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full">
      <div className="relative flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
