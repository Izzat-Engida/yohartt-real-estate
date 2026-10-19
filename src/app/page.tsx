import { EnquiryProvider } from '@/components/EnquiryContext';
import { ContactSection } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import {
  About,
  DeliveredSection,
  ProcessSection,
  TowerSection,
  WhySection,
} from '@/components/sections/HomeSections';

export default function HomePage() {
  return (
    <EnquiryProvider>
      <Hero />
      <About />
      <TowerSection />
      <ProcessSection />
      <DeliveredSection />
      <WhySection />
      <ContactSection />
    </EnquiryProvider>
  );
}
