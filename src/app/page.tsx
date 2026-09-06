
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Process from '../components/Process';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import About from '../components/About';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Page: React.FC = () => {
  return (
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
  );
};

export default Page;
