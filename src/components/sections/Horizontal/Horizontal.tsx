import Image from "next/image";

import horizontal from "@/assets/home/horizontal/horizontal.webp";
import cloud1 from "@/assets/home/horizontal/1.webp";
import cloud2 from "@/assets/home/horizontal/2.webp";
import cloud3 from "@/assets/home/horizontal/3.webp";

export default function Horizontal() {
  return (
    <section
      id="Horizontal"
      className="relative z-1 overflow-clip"
    >
      <div className="trigger relative flex h-screen w-full items-center">
        <div className="bg-vanilla reveal absolute top-0 left-0 z-10 h-full w-1/2" />

        <div className="bg-vanilla reveal absolute top-0 right-0 z-10 h-full w-1/2" />

      
        <Image
          src={horizontal}
          alt="Horizontal"
          priority={false}
          className="horizontal-image h-full w-auto max-w-none object-cover will-change-transform"
          sizes="100vw"
        />

        <div className="horizontal-markers pointer-events-none absolute top-0 left-0 z-20 h-full will-change-transform">

             <Image
            src={cloud1}
            alt="Cloud"
            className="cloud1 absolute bottom-0 left-0 h-auto w-395 max-w-none -translate-x-1/2 translate-y-1/2 object-cover max-xl:left-1/10 max-xl:w-350 max-lg:left-1/5 max-lg:w-220 max-md:w-180"
            sizes="(max-width: 768px) 720px, (max-width: 1024px) 880px, 1580px"
          />

         
          <Image
            src={cloud2}
            alt="Cloud"
            className="cloud2 absolute bottom-0 left-1/2 h-auto w-550 max-w-none -translate-x-1/2 translate-y-1/2 object-cover max-xl:w-450 max-lg:w-280 max-md:bottom-1/4 max-md:w-220"
            sizes="(max-width: 768px) 880px, (max-width: 1024px) 1120px, 2217px"
          />

         
          <Image
            src={cloud3}
            alt="Cloud"
            className="cloud3 absolute top-0 right-0 h-auto w-465 max-w-none translate-x-1/2 -translate-y-1/2 object-cover max-xl:w-400 max-lg:w-250 max-md:w-200"
            sizes="(max-width: 768px) 800px, (max-width: 1024px) 1000px, 1858px"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-30 h-screen w-full">
          <h2 className="heading text-sand hero absolute top-40 left-1/2 w-full -translate-x-1/2 text-center uppercase max-xl:top-30 max-xl:text-[7.5rem] max-lg:text-[4.25rem] max-md:top-16 max-md:text-[3.25rem]">
            View from above
          </h2>
        </div>
      </div>
    </section>
  );
}
