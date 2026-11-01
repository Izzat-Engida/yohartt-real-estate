'use client';

// The loading screen lives in the Intro component, so this section can be
// pinned while the next one slides over it.
export default function Hero() {
  return (
    <div className="relative h-svh bg-[#F7F1E4]">
      <video
        muted
        playsInline
        preload="auto"
        className="block h-full w-full object-cover"
      ></video>

      <div className="absolute inset-0 flex items-end justify-center bg-transparent py-15 opacity-0 max-md:py-10">
   <h1 className="heading huge bg-gradient-to-r from-[#87622F] via-[#AD824B] to-[#D9B87F] bg-clip-text text-transparent text-center text-[9.5vw] font-normal uppercase max-md:text-[17vw]">
  YOHART PROPERTIES
</h1>
      </div>
    </div>
  );
}
