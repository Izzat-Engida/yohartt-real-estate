import { EnquiryProvider } from '@/components/EnquiryContext';
import { ContactSection } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import {
  About,
  DeliveredSection,
  Marquee,
  ProcessSection,
  TowerSection,
  WhySection,
} from '@/components/sections/HomeSections';

export default function HomePage() {
  return (
    <EnquiryProvider>
      <Hero />
      <Marquee />
      <About />
      <TowerSection />
      <ProcessSection />
      <DeliveredSection />
      <WhySection />
      <ContactSection />
    </EnquiryProvider>
  );
}
