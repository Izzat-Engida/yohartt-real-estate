'use client';

// The video always fills the screen edge to edge. On windows wider than the
// video (most laptop browser windows) a strip has to come off the top and
// bottom: it is split so the sky above the roof goes first and the rest comes
// off the bottom of the road, keeping the whole building in view. Phones crop
// the sides instead, framed on the tower, which sits a little right of centre.
export default function Hero() {
  return (
    <div className="relative h-svh bg-[#F7F1E4]">
      <video
        muted
        playsInline
        preload="auto"
        className="block h-full w-full object-cover object-[54%_40%]"
      ></video>

      <div className="absolute inset-0 flex items-end justify-center bg-transparent py-15 opacity-0 max-md:py-10">
   <h1 className="heading huge bg-gradient-to-r from-[#87622F] via-[#AD824B] to-[#D9B87F] bg-clip-text text-transparent text-center text-[9.5vw] font-normal uppercase max-md:text-[17vw]">
  YOHART PROPERTIES
</h1>
      </div>
    </div>
  );
}
