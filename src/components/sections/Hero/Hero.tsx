'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mql = window.matchMedia('(max-width: 768px)');
    const updatePoster = () => {
      video.poster = mql.matches
        ? '/media/home/hero-poster-m.webp'
        : '/media/home/hero-poster.webp';
    };
    updatePoster();
    mql.addEventListener('change', updatePoster);
    return () => mql.removeEventListener('change', updatePoster);
  }, []);

  return (
    <div data-hero className="relative h-svh overflow-hidden bg-[#F7F1E4]">
      <video
        ref={videoRef}
        data-hero-video
        muted
        playsInline
        preload="auto"
        poster="/media/home/hero-poster.webp"
        className="block h-full w-full object-cover object-[54%_40%] max-md:object-center"
      ></video>

      <div className="absolute inset-0 flex items-end justify-center bg-transparent py-15 opacity-0 max-md:py-10">
   <h1 className="heading huge bg-gradient-to-r from-[#87622F] via-[#AD824B] to-[#D9B87F] bg-clip-text text-transparent text-center text-[9.5vw] font-normal uppercase max-md:text-[17vw]">
  YOHART PROPERTIES
</h1>
      </div>
    </div>
  );
}
