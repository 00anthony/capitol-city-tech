
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TechMarquee from '../components/TechMarquee';
import Process from '../components/Process';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import About from '../components/About';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import BackgroundEffects from '../components/BackgroundEffects';

const Page: React.FC = () => {
  return (
    <div className="relative">
      <BackgroundEffects />
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <Process />
        <Services />
        <Portfolio />
        <About />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Page;
