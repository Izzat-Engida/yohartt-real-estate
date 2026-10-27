'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

import mapBase from '@/assets/home/around/axonometric-map.webp';
import britishEmbassyImg from '@/assets/home/around/british-embassy.jpg';
import centuryMallImg from '@/assets/home/around/century-mall.jpg';
import megenagnaTransitImg from '@/assets/home/around/megenagna-transit.jpg';
import zefmeshMallImg from '@/assets/home/around/zefmesh-mall.jpg';
import boleAirportImg from '@/assets/home/around/bole-airport.jpg';

type Place = {
  id: string;
  name: string;
  car: string;
  walk: string | null;
  description: string;
  image: StaticImageData;
  hasArrow?: boolean;
  pin: {
    x: number; // percentage on map image
    y: number; // percentage on map image
    labelOffset?: { x: number; y: number };
  };
};

const PLACES: Place[] = [
  {
    id: 'british-embassy',
    name: 'British Embassy',
    car: '1 min',
    walk: '3 min',
    description:
      'The historic Embassy of the United Kingdom in Addis Ababa is situated directly adjacent to the site along Comoros Street, featuring lush diplomatic parklands, top-tier security, and mature green tree canopies.',
    image: britishEmbassyImg,
    pin: { x: 64.8, y: 46.9, labelOffset: { x: 0, y: 26 } },
  },
  {
    id: 'century-mall',
    name: 'Century Mall',
    car: '3 min',
    walk: '8 min',
    description:
      "One of Megenagna's premier modern commercial destinations, hosting a multi-screen cinema, international retail boutiques, vibrant cafes, and family entertainment amenities.",
    image: centuryMallImg,
    pin: { x: 70.9, y: 56.1, labelOffset: { x: 0, y: 26 } },
  },
  {
    id: 'megenagna-transit',
    name: 'Megenagna Transit Hub',
    car: '4 min',
    walk: '10 min',
    description:
      "Addis Ababa's vital eastern transit interchange, seamlessly connecting the East-West Light Rail Transit (LRT) network with key city bus corridors, rapid taxis, and direct routes toward Bole and Kazanchis.",
    image: megenagnaTransitImg,
    pin: { x: 23.6, y: 72.7, labelOffset: { x: 0, y: 26 } },
  },
  {
    id: 'zefmesh-mall',
    name: 'Zefmesh Grand Mall',
    car: '4 min',
    walk: '12 min',
    description:
      'A bustling multi-level shopping and commercial center at the center of Megenagna, housing hundreds of specialty retailers, electronics stores, banking hubs, and traditional dining options.',
    image: zefmeshMallImg,
    pin: { x: 72.4, y: 70.3, labelOffset: { x: 0, y: 26 } },
  },
  {
    id: 'bole-airport',
    name: 'Bole International Airport',
    car: '12 min',
    walk: null,
    description:
      "Ethiopia's primary international gateway and Africa's premier aviation hub, offering nonstop international flights worldwide, reachable in 12 minutes via the Megenagna-Bole corridor.",
    image: boleAirportImg,
    hasArrow: true,
    pin: { x: 17.8, y: 47.6, labelOffset: { x: 0, y: 26 } },
  },
];

function CarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-[#AD824B]"
      aria-hidden="true"
    >
      <path
        d="M34 17.25H30.3125L24.8125 11.75C24.6667 11.6042 24.4844 11.4844 24.2656 11.3906C24.0469 11.2969 23.8229 11.25 23.5938 11.25H9.53125C9.23958 11.25 8.96354 11.3229 8.70312 11.4688C8.44271 11.6146 8.23958 11.8021 8.09375 12.0312L4.375 17.5938C4.33333 17.6354 4.30208 17.6927 4.28125 17.7656C4.26042 17.8385 4.25 17.9167 4.25 18V24C4.25 24.4792 4.42187 24.8906 4.76562 25.2344C5.10938 25.5781 5.52083 25.75 6 25.75H8.3125C8.5 26.6042 8.9375 27.3177 9.625 27.8906C10.3125 28.4635 11.1042 28.75 12 28.75C12.8958 28.75 13.6875 28.4688 14.375 27.9062C15.0625 27.3437 15.4896 26.6354 15.6562 25.7812L15.6875 25.75H24.3125C24.5 26.6042 24.9375 27.3177 25.625 27.8906C26.3125 28.4635 27.1042 28.75 28 28.75C28.8958 28.75 29.6875 28.4688 30.375 27.9062C31.0625 27.3437 31.4896 26.6354 31.6562 25.7812L31.6875 25.75H34C34.4792 25.75 34.8906 25.5781 35.2344 25.2344C35.5781 24.8906 35.75 24.4792 35.75 24V19C35.75 18.5208 35.5781 18.1094 35.2344 17.7656C34.8906 17.4219 34.4792 17.25 34 17.25ZM9.3125 12.875C9.35417 12.8333 9.39062 12.8021 9.42188 12.7812C9.45312 12.7604 9.48958 12.75 9.53125 12.75H23.5938C23.6146 12.75 23.6406 12.7552 23.6719 12.7656C23.7031 12.776 23.7292 12.7917 23.75 12.8125L28.1875 17.25H6.40625L9.3125 12.875ZM12 27.25C11.375 27.25 10.8438 27.0313 10.4062 26.5938C9.96875 26.1562 9.75 25.625 9.75 25C9.75 24.375 9.96875 23.8438 10.4062 23.4062C10.8438 22.9687 11.375 22.75 12 22.75C12.625 22.75 13.1562 22.9687 13.5938 23.4062C14.0313 23.8438 14.25 24.375 14.25 25C14.25 25.625 14.0313 26.1562 13.5938 26.5938C13.1562 27.0313 12.625 27.25 12 27.25ZM28 27.25C27.375 27.25 26.8438 27.0313 26.4062 26.5938C25.96875 26.1562 25.75 25.625 25.75 25C25.75 24.375 25.96875 23.8438 26.4062 23.4062C26.8438 22.9687 27.375 22.75 28 22.75C28.625 22.75 29.1562 22.9687 29.5938 23.4062C30.0313 23.8438 30.25 24.375 30.25 25C30.25 25.625 30.0313 26.1562 29.5938 26.5938C29.1562 27.0313 28.625 27.25 28 27.25ZM34.25 24C34.25 24.0625 34.224 24.1198 34.1719 24.1719C34.1198 24.224 34.0625 24.25 34 24.25H31.6875C31.5 23.3958 31.0625 22.6823 30.375 22.1094C29.6875 21.5365 28.8958 21.25 28 21.25C27.1042 21.25 26.3125 21.5312 25.625 22.0938C24.9375 22.6563 24.5104 23.3646 24.3438 24.2188L24.3125 24.25H15.6875C15.5 23.3958 15.0625 22.6823 14.375 22.1094C13.6875 21.5365 12.8958 21.25 12 21.25C11.1042 21.25 10.3125 21.5312 9.625 22.0938C8.9375 22.6563 8.51042 23.3646 8.34375 24.2188L8.3125 24.25H6C5.9375 24.25 5.88021 24.224 5.82812 24.1719C5.77604 24.1198 5.75 24.0625 5.75 24V18.75H34C34.0625 18.75 34.1198 18.776 34.1719 18.8281C34.224 18.8802 34.25 18.9375 34.25 19V24Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WalkIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-[#AD824B]"
      aria-hidden="true"
    >
      <path
        d="M19.1216 11.4286C19.1216 10.4821 19.4595 9.67411 20.1351 9.00446C20.8108 8.33482 21.6261 8 22.5811 8C23.536 8 24.3513 8.33482 25.027 9.00446C25.7027 9.67411 26.0405 10.4821 26.0405 11.4286C26.0405 12.375 25.7027 13.183 25.027 13.8527C24.3513 14.5223 23.536 14.8571 22.5811 14.8571C21.6261 14.8571 20.8108 14.5223 20.1351 13.8527C19.4595 13.183 19.1216 12.375 19.1216 11.4286ZM28.6351 20.8571C27.0856 20.8571 25.8829 20.558 25.027 19.9598C24.1712 19.3616 23.3649 18.6875 22.6081 17.9375C22.4099 17.7411 22.2117 17.5446 22.0135 17.3482C21.8153 17.1518 21.6171 16.9643 21.4189 16.7857C20.4279 15.9286 19.3198 15.5714 18.0946 15.7143C16.8874 15.875 15.7523 16.2232 14.6892 16.7589C13.6261 17.2946 12.7162 17.8661 11.9595 18.4732C11.2207 19.0804 10.8153 19.4196 10.7432 19.4911C10.6712 19.5625 10.6126 19.6518 10.5676 19.7589C10.5225 19.8661 10.5 19.9732 10.5 20.0804C10.5 20.3304 10.5811 20.5357 10.7432 20.6964C10.9054 20.8571 11.1126 20.9375 11.3649 20.9375C11.473 20.9375 11.5766 20.9196 11.6757 20.8839C11.7748 20.8482 11.8604 20.7946 11.9324 20.7232C12.4189 20.2946 12.9279 19.8884 13.4595 19.5045C13.991 19.1205 14.5541 18.7679 15.1486 18.4464L15.2297 18.3929C15.9685 18 16.6532 17.7277 17.2838 17.5759C17.9144 17.4241 18.482 17.3929 18.9865 17.4821L13.1486 30.7946C13.1126 30.8482 13.0901 30.9062 13.0811 30.9688C13.0721 31.0312 13.0676 31.0893 13.0676 31.1429C13.0676 31.3214 13.1171 31.4821 13.2162 31.625C13.3153 31.7679 13.4369 31.8661 13.5811 31.9196C13.6351 31.9554 13.6892 31.9777 13.7432 31.9866C13.7973 31.9955 13.8604 32 13.9324 32C14.1126 32 14.2748 31.9509 14.4189 31.8527C14.5631 31.7545 14.6622 31.6339 14.7162 31.4911L18.3649 23.2143L21.7162 25.5714V31.1429C21.7162 31.375 21.8018 31.5759 21.973 31.7455C22.1441 31.9152 22.3468 32 22.5811 32C22.8153 32 23.018 31.9152 23.1892 31.7455C23.3604 31.5759 23.4459 31.375 23.4459 31.1429V25.1429C23.4459 25 23.4144 24.8661 23.3514 24.7411C23.2883 24.6161 23.2027 24.5179 23.0946 24.4464L19.0676 21.6071L20.527 18.2857C20.6532 18.4107 20.7883 18.5446 20.9324 18.6875C21.0766 18.8304 21.2297 18.9732 21.3919 19.1161C22.1487 19.8839 23.0676 20.6518 24.1486 21.4196C25.2297 22.1875 26.7252 22.5714 28.6351 22.5714C28.8694 22.5714 29.0721 22.4866 29.2432 22.317C29.4144 22.1473 29.5 21.9464 29.5 21.7143C29.5 21.4821 29.4144 21.2813 29.2432 21.1116C29.0721 20.942 28.8694 20.8571 28.6351 20.8571Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function NearbySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const [marker, setMarker] = useState({ top: 0, height: 0 });
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const hoveredPinRef = useRef<number | null>(null);
  const tiltFrameRef = useRef<number | null>(null);

  // Mouse tilt parallax state
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, transX: 0, transY: 0 });

  // The preview card is shared between pins so two photos can never overlap.
  const previewIndex = hoveredPin ?? activeIndex;
  const previewPlace = PLACES[previewIndex];
  const isPreviewOpen = hoveredPin !== null;
  // Left-side pins sit next to the text column, so anchor their card to the
  // right of the pin instead of centring it under the copy.
  const alignPreviewLeft = previewPlace.pin.x < 30;

  // Keep the ref in sync immediately so the parallax stops before the next frame,
  // otherwise the map can slide out from under the cursor and change the hovered pin.
  const setPinHover = useCallback((index: number | null) => {
    hoveredPinRef.current = index;
    setHoveredPin(index);
  }, []);

  const updateMarker = useCallback(() => {
    const item = itemRefs.current[activeIndex];
    if (!item) return;
    setMarker({ top: item.offsetTop, height: item.offsetHeight });
  }, [activeIndex]);

  useEffect(() => {
    updateMarker();
    window.addEventListener('resize', updateMarker);
    return () => window.removeEventListener('resize', updateMarker);
  }, [updateMarker]);

  useEffect(() => {
    return () => {
      if (tiltFrameRef.current !== null) cancelAnimationFrame(tiltFrameRef.current);
    };
  }, []);

  // Handle interactive 3D mouse parallax follow
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Freeze the map while a pin is hovered so the pin cannot move away from the pointer.
    if (hoveredPinRef.current !== null) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = mapContainerRef.current;
    if (!container) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (tiltFrameRef.current !== null) return;
    tiltFrameRef.current = requestAnimationFrame(() => {
      tiltFrameRef.current = null;
      if (hoveredPinRef.current !== null) return;

      const rect = container.getBoundingClientRect();
      const nx = (clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const ny = (clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      setTilt({
        rotateX: -ny * 7,
        rotateY: nx * 9,
        transX: nx * 18,
        transY: ny * 12,
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (tiltFrameRef.current !== null) {
      cancelAnimationFrame(tiltFrameRef.current);
      tiltFrameRef.current = null;
    }
    setTilt({ rotateX: 0, rotateY: 0, transX: 0, transY: 0 });
    setPinHover(null);
  }, [setPinHover]);

  return (
    <section id="Around" className="relative z-1 overflow-hidden bg-[#FCFAF0] py-20 max-lg:py-12">
      <div className="trigger relative flex min-h-[95vh] flex-col items-stretch">
        <div className="reveal-content wrapper relative z-10 flex h-full max-lg:flex-col">
          {/* Left Column: Typography List & Info Card */}
          <div className="relative z-30 w-5/12 pt-6 max-xl:w-1/2 max-lg:w-full">
            <p
              className="kicker uppercase"
              style={{
                color: '#AD824B',
                letterSpacing: '0.08em',
                fontWeight: 500,
                fontSize: '0.9rem',
              }}
            >
              What&apos;s around
            </p>

            {/* Places List */}
            <div className="list relative border-b border-[#AD824B]/30 pt-8 pb-10">
              {/* Active Marker Indicator */}
              <div
                className="pointer-events-none absolute top-0 -left-4 w-0.5 transition-all duration-300"
                style={{
                  height: `${marker.height}px`,
                  transform: `translateY(${marker.top}px)`,
                  backgroundColor: '#AD824B',
                  opacity: 1,
                }}
              />
              {PLACES.map((place, index) => {
                const isCurrent = activeIndex === index;
                const isHovered = hoveredPin === index;
                return (
                  <div
                    key={place.id}
                    ref={(element) => {
                      itemRefs.current[index] = element;
                    }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isCurrent}
                    onMouseEnter={() => {
                      setActiveIndex(index);
                      setPinHover(index);
                    }}
                    onMouseLeave={() => setPinHover(null)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setActiveIndex(index);
                      }
                    }}
                    className="group relative cursor-pointer overflow-hidden py-2"
                  >
                    <p
                      className="heading-2 leading-tight transition duration-300 group-hover:-translate-y-full"
                      style={{
                        fontFamily: 'var(--font-editorialOld), Cormorant Garamond, Bodoni Moda, serif',
                        color: isCurrent || isHovered ? '#AD824B' : '#a68150',
                        fontWeight: 400,
                        fontSize: 'clamp(2rem, 3.2vw, 3.25rem)',
                        opacity: isCurrent || isHovered ? 1 : 0.8,
                      }}
                    >
                      {place.name}
                    </p>
                    <span
                      className="heading-2 absolute left-0 top-full w-full leading-tight italic transition-all duration-300 group-hover:top-2"
                      style={{
                        fontFamily: 'var(--font-editorialOld), Cormorant Garamond, Bodoni Moda, serif',
                        color: '#AD824B',
                        fontWeight: 400,
                        fontSize: 'clamp(2rem, 3.2vw, 3.25rem)',
                      }}
                    >
                      {place.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Selected Place Details Card */}
            <div className="relative mt-8 min-h-[14rem]">
              {PLACES.map((place, index) => (
                <div
                  key={place.id}
                  className="absolute inset-0 transition-all duration-300"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    pointerEvents: activeIndex === index ? 'auto' : 'none',
                    transform: activeIndex === index ? 'translateY(0)' : 'translateY(8px)',
                  }}
                  aria-hidden={activeIndex !== index}
                >
                  <p
                    className="kicker mb-3 uppercase"
                    style={{
                      color: '#AD824B',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      fontSize: '0.875rem',
                    }}
                  >
                    {place.name}
                  </p>
                  <div className="flex divide-x divide-[#AD824B]/30 pb-3">
                    <div
                      className="paragraph flex items-center gap-2 pr-4 text-sm font-medium"
                      style={{ color: '#4a4435' }}
                    >
                      <CarIcon /> {place.car} drive
                    </div>
                    {place.walk ? (
                      <div
                        className="paragraph flex items-center gap-2 pl-4 text-sm font-medium"
                        style={{ color: '#4a4435' }}
                      >
                        <WalkIcon /> {place.walk} walk
                      </div>
                    ) : null}
                  </div>
                  <p className="paragraph mt-2 text-sm leading-relaxed" style={{ color: '#6b6350' }}>
                    {place.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Area: Authentic 3D Axonometric Map with Interactive Mouse Follow */}
          <div
            ref={mapContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative flex-1 select-none max-lg:mt-8 max-lg:min-h-[500px] lg:absolute lg:inset-y-0 lg:right-0 lg:w-[68vw]"
            style={{ perspective: 1200 }}
          >
            {/* 3D Map Plane with Mouse Follow Transform */}
            <div
              className="relative h-full w-full transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translate3d(${tilt.transX}px, ${tilt.transY}px, 0)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Axonometric Vector Map Texture */}
              <div className="relative h-full w-full">
                <Image
                  src={mapBase}
                  alt="Axonometric Perspective Map of Megenagna and British Embassy area"
                  fill
                  priority
                  sizes="(min-width: 1121px) 68vw, 100vw"
                  className="pointer-events-none object-contain object-right-bottom"
                />
              </div>

              {/* CENTER LOCATION BADGE: Yohartt Tower · Behind British Embassy Megenagna */}
              <div
                className="pointer-events-none absolute z-20 flex flex-col items-center"
                style={{
                  left: '46.9%',
                  top: '54.8%',
                  transform: 'translate(-50%, -100%) translateZ(28px)',
                }}
              >
                {/* Floating Badge */}
                <div className="flex items-center gap-2 rounded-lg border border-[#a88956] bg-[#7d6342] px-3.5 py-2 shadow-xl">
                  {/* Yohartt Emblem */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#ecd7ba]"
                  >
                    <path
                      d="M12 2L15 8H9L12 2Z M7 9L12 7L17 9L12 18L7 9Z M12 18V22"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <p className="text-[11px] font-bold tracking-wider text-[#FCFAF0] uppercase">
                      Yohartt Tower
                    </p>
                    <p className="text-[9px] text-[#e8dac7] font-medium">
                      Behind British Embassy
                    </p>
                  </div>
                </div>
                {/* Vertical Pole */}
                <div className="h-6 w-0.5 bg-[#7d6342]" />
              </div>

              {/* 5 Interactive Pins with Pin-Point Accuracy */}
              {PLACES.map((place, idx) => {
                const isHovered = hoveredPin === idx;

                return (
                  <div
                    key={`pin-${place.id}`}
                    className="pointer-events-none absolute z-30 flex flex-col items-center"
                    style={{
                      left: `${place.pin.x}%`,
                      top: `${place.pin.y}%`,
                      transform: 'translate(-50%, -50%) translateZ(20px)',
                    }}
                  >
                    {/* Directional arrow for Airport */}
                    {place.hasArrow && (
                      <div className="absolute -left-7 top-0 text-[#9c7a4b] text-sm font-bold animate-pulse">
                        ←
                      </div>
                    )}

                    {/* Only the pin head is interactive, so labels near the list
                        cannot steal the hover from a pin. */}
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label={place.name}
                      aria-pressed={activeIndex === idx}
                      onMouseEnter={() => {
                        setActiveIndex(idx);
                        setPinHover(idx);
                      }}
                      onMouseLeave={() => setPinHover(null)}
                      onFocus={() => setActiveIndex(idx)}
                      onClick={() => setActiveIndex(idx)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          setActiveIndex(idx);
                        }
                      }}
                      className="pointer-events-auto relative -m-3 flex cursor-pointer items-center justify-center rounded-full p-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#AD824B]"
                    >
                      {isHovered && (
                        <div className="absolute h-9 w-9 animate-ping rounded-full border border-[#AD824B] opacity-60" />
                      )}
                      <div
                        className={`h-5 w-5 rounded-full border-2 border-[#FCFAF0] shadow-md transition-all duration-300 ${
                          isHovered ? 'scale-125 bg-[#7a5828]' : 'bg-[#9c7a4b]'
                        }`}
                      />
                    </div>

                    {/* Vertical Stem */}
                    <div className="h-4 w-0.5 bg-[#9c7a4b]" />
                    {/* Base Foot */}
                    <div className="h-0.5 w-2 bg-[#9c7a4b]" />

                    {/* Label below Pin */}
                    <p
                      className="mt-1.5 max-w-[125px] text-center text-[11px] font-medium leading-tight select-none transition-colors duration-200"
                      style={{
                        color: isHovered ? '#604218' : '#8a7352',
                        fontWeight: isHovered ? 700 : 500,
                        fontFamily: 'var(--font-editorialOld), Georgia, serif',
                      }}
                    >
                      {place.name}
                    </p>
                  </div>
                );
              })}

              {/* One shared preview card. Rendering a single card keeps the photo
                  in sync with the hovered pin and avoids overlapping ghost cards. */}
              <div
                className="pointer-events-none absolute z-50 w-56"
                style={{
                  left: `${previewPlace.pin.x}%`,
                  top: `${previewPlace.pin.y}%`,
                  opacity: isPreviewOpen ? 1 : 0,
                  transform: `translate(${alignPreviewLeft ? '0' : '-50%'}, calc(-100% - 30px)) scale(${
                    isPreviewOpen ? 1 : 0.94
                  })`,
                  transformOrigin: alignPreviewLeft ? '0% 100%' : '50% 100%',
                  transition:
                    'transform 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease-out',
                }}
                aria-hidden={!isPreviewOpen}
              >
                <div className="overflow-hidden rounded-xl border border-[#AD824B]/35 bg-[#FAF6EE] p-2 shadow-2xl backdrop-blur-md">
                  {/* Location Photo — stacked images cross-fade in one place */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#ded3bd]">
                    {PLACES.map((place, index) => (
                      <Image
                        key={`preview-${place.id}`}
                        src={place.image}
                        alt={place.name}
                        fill
                        sizes="224px"
                        aria-hidden={index !== previewIndex}
                        className={`object-cover transition-opacity duration-300 ${
                          index === previewIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    ))}
                  </div>
                  {/* Title & Travel Badge */}
                  <div className="pt-2 px-1 text-center">
                    <p
                      className="flex min-h-[2rem] items-center justify-center text-xs font-semibold leading-tight text-[#4a3b23]"
                      style={{
                        fontFamily: 'var(--font-editorialOld), Georgia, serif',
                      }}
                    >
                      {previewPlace.name}
                    </p>
                    <p className="mt-0.5 text-[10.5px] font-medium text-[#7a6442]">
                      🚗 {previewPlace.car} drive{' '}
                      {previewPlace.walk ? ` · 🚶 ${previewPlace.walk} walk` : ''}
                    </p>
                  </div>
                  {/* Pointer Beak */}
                  <div
                    className="absolute -bottom-2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-[#AD824B]/35 bg-[#FAF6EE]"
                    style={{ left: alignPreviewLeft ? '8px' : '50%' }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
