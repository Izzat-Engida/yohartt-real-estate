import Intro from '@/components/Preloader';
import { EnquiryProvider } from '@/components/EnquiryContext';
import Header from '@/components/Header';
import ScrollAnimations from "./ScrollAnimations";
import { PointerFx } from '@/components/PointerFx';
import Overlays from '@/components/sections/Overlays';
import Hero from '@/components/sections/Hero/Hero';
import  About  from '@/components/sections/About/About';
import AboutMobile from '@/components/sections/About/AboutMobile';
import Location from '@/components/sections/Location/Location'
import { NearbySection } from '@/components/sections/Nearby/Nearby';
import { ProcessSection } from '@/components/sections/Process/Process';
import Residences from "@/components/sections/Residences/Residences";
import { TowerSection } from '@/components/sections/Tower/Tower';
import BusinessSpaces from "@/components/sections/Business/Business";
import Roots from '@/components/sections/Roots/Roots';
import RootsMobile from '@/components/sections/Roots/RootsMobile';
import Amenities from '@/components/sections/Amenities/Amenities';
import Horizontal from '@/components/sections/Horizontal/Horizontal';
import Footer from '@/components/sections/Footer/Footer';
import {AmenitiesDetailsSection} from "@/components/sections/Amenities/AmenitiesDetails";
import Installment from '@/components/sections/Installment';

export default function Page(){
    return (
        <>
        <Intro/>
        <Header/>
        <PointerFx/>
        <EnquiryProvider>
        <div className="w-full">
        <main className="min-h-screen w-full">
        <div className="overflow-x-clip">
        <Hero/>
        <About/>
       <AboutMobile/>
        <Location/>
        <NearbySection/>
      
        <Residences/>
        <TowerSection />
        <BusinessSpaces/>
        <Roots/>
        <RootsMobile />
        <Amenities/>
        <AmenitiesDetailsSection/>
        <Horizontal/>
        <Installment/>
        </div>
        <Footer />
        </main>
        </div>
        </EnquiryProvider>
        <Overlays/>
        <ScrollAnimations/>
        </>
    )
}
