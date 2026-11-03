import Image from 'next/image';
import amenitiesDesktop from "@/assets/home/amenities/amenities-bg.webp";
import amenitiesMobile from "@/assets/home/amenities/amenities-m.jpg";

export default function Amenities() {
  return (
    <section id="Amenities" className="relative z-1">
      <div className="trigger relative flex min-h-screen w-full items-stretch overflow-clip">
        {/* Desktop background */}
        <Image 
          src={amenitiesDesktop} 
          alt="Amenities" 
          priority
          sizes="(min-width: 768px) 100vw, 1px"
          className="background absolute top-1/3 h-[calc(100%+20rem)] w-full -translate-y-1/2 object-cover object-[38%_50%] max-md:hidden" 
        />
        {/* Mobile background */}
        <Image 
          src={amenitiesMobile} 
          alt="Amenities" 
          priority
          sizes="(max-width: 767px) 100vw, 1px"
          className="background absolute top-1/3 h-[calc(100%+20rem)] w-full -translate-y-1/2 object-cover object-center hidden max-md:block" 
        />
        <div className="wrapper relative z-1 flex items-stretch justify-between gap-10 max-lg:flex-col-reverse">

          <div className="flex w-7/12 flex-col items-start justify-end py-30 max-xl:w-1/2 max-lg:w-full max-lg:pt-20 max-lg:pb-8 max-md:py-8">
            <h2 className="hero text-cream-dark whitespace-nowrap uppercase max-xl:text-[8rem] max-lg:text-[6.5rem] max-md:text-[3rem]">
              Amenities
            </h2>
          </div>

       
          <div className="flex w-1/3 flex-col items-end justify-between py-30 max-xl:w-5/12 max-lg:w-2/3 max-lg:items-start max-lg:pt-15 max-lg:pb-5 max-md:w-full max-md:pt-10 max-md:pb-5">
            
            <p className="paragraph text-sand font-semibold text-2xl max-lg:w-full">
              Thoughtfully planned living with dedicated resident parking across semi-basement and ground levels, welcoming entrance lobbies, green spaces, private balconies, and round-the-clock security facilities designed for modern urban comfort.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
