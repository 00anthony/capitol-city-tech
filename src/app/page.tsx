
import React from 'react';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Process from '@/components/sections/Process';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import About from '@/components/sections/About';
import Pricing from '@/components/sections/Pricing';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';
import { ConsultationFormProvider } from '@/context/ConsultationFormContext';

const Page: React.FC = () => {
  return (
    <ConsultationFormProvider>
      <div className="relative">
        <Navbar />
        <main>
          <Hero />
          <Process />
          <Services />
          <Portfolio />
          <About />
          <Pricing />
          <FAQ />
        </main>
        <Footer />
      </div>
    </ConsultationFormProvider>
  );
};

export default Page;
