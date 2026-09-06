'use client'
import React, { createContext, useContext, useState } from 'react';
import ConsultationForm from '@/components/ConsultationForm';

interface ConsultationFormContextValue {
  openForm: () => void;
  closeForm: () => void;
}

const ConsultationFormContext = createContext<ConsultationFormContextValue | null>(null);

/**
 * Provides a single, shared "book a consultation" modal for the whole page.
 * Any CTA anywhere in the tree can call useConsultationForm().openForm()
 * instead of each component managing its own modal instance/state.
 */
export const ConsultationFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ConsultationFormContext.Provider value={{ openForm: () => setIsOpen(true), closeForm: () => setIsOpen(false) }}>
      {children}
      <ConsultationForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ConsultationFormContext.Provider>
  );
};

export const useConsultationForm = () => {
  const ctx = useContext(ConsultationFormContext);
  if (!ctx) throw new Error('useConsultationForm must be used within a ConsultationFormProvider');
  return ctx;
};
