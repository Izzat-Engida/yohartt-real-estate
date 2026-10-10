'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { enquiryInterests } from '@/data/site';

type EnquiryState = {
  floor: string;
  interest: string;
  setFloor: (floor: string) => void;
  setInterest: (interest: string) => void;
};

const EnquiryContext = createContext<EnquiryState | null>(null);

/** Shares the chosen floor/interest between the floor explorer and the contact form. */
export function EnquiryProvider({
  initialInterest = enquiryInterests[0],
  children,
}: {
  initialInterest?: string;
  children: ReactNode;
}) {
  const [floor, setFloor] = useState('');
  const [interest, setInterest] = useState(initialInterest);
  const value = useMemo(() => ({ floor, interest, setFloor, setInterest }), [floor, interest]);
  return <EnquiryContext value={value}>{children}</EnquiryContext>;
}

export function useEnquiry(): EnquiryState {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error('useEnquiry must be used inside <EnquiryProvider>');
  return ctx;
}
