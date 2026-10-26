'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative h-svh">
      <video
        muted
        playsInline
        preload="none"
        className="block h-full w-full object-cover"
      ></video>

      <div className="loader text-white fixed inset-0 z-1000 flex flex-col items-center justify-center gap-10" style={{ background: 'linear-gradient(135deg, #0E7C86 0%, #0A5262 50%, #083244 100%)' }}>
        <Image
          src="/media/home/yohalogo.png"
          alt="Yoha Logo"
          width={160}
          height={160}
          className="h-32 w-auto object-contain"
          priority
        />

        <div className="bg-white/20 h-0.5 w-75 overflow-hidden rounded-full">
          <div
            className="loader-bar bg-white h-0.5 rounded-full"
            style={{ width: "0%" }}
          ></div>
        </div>

        <p className="heading-3 mt-4 text-white">0%</p>
      </div>

      <div className="absolute inset-0 flex items-end justify-center bg-transparent py-20 opacity-0 max-md:py-10">
   <h1 className="heading huge bg-gradient-to-r from-[#0E7C86] via-[#0A5262] to-[#083244] bg-clip-text text-transparent text-center text-[9.5vw] font-normal uppercase max-md:text-[17vw]">
  YOHART PROPERTIES
</h1>
      </div>
    </div>
  );
}
