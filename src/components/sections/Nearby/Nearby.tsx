'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

import aerodrom from '@/assets/home/around/aerodrom.webp';
import airportCity from '@/assets/home/around/airportcity.webp';
import hangar from '@/assets/home/around/hangar.webp';
import savremena from '@/assets/home/around/savremena.webp';
import tosin from '@/assets/home/around/tosin.webp';
import west from '@/assets/home/around/west.webp';

type Place = {
  name: string;
  car: string;
  walk: string | null;
  description: string;
  image: StaticImageData;
};


const PLACES: Place[] = [
  {
    name: 'Railway Station',
    car: '1 min',
    walk: '3 min',
    description:
      'Tošin Bunar is a railway station located in the municipality of Novi Beograd. It is served by BG Voz. The railroad continues to Zemun in one direction, and New Belgrade and Old Belgrade in the other direction. Tošin Bunar railway station consists of 2 railway tracks with 2 side platforms.',
    image: tosin,
  },
  {
    name: 'Savremena Elementary School',
    car: '1 min',
    walk: '2 min',
    description:
      "Savremena Elementary School is a part of an education system unique in the region, with over 20 years' experience. It was built on the foundation of Savremena International School, whose results serve as the best proof of their leadership position at all levels of education.",
    image: savremena,
  },
  {
    name: 'West 65',
    car: '1 min',
    walk: '3 min',
    description:
      "West 65 is a modern residential and business complex located in New Belgrade's Block 65, known for its luxury apartments, shopping center, and a 155-meter skyscraper tower. The complex includes multiple residential buildings, pedestrian areas, restaurants, shops, and recreational facilities, all positioned in a well-connected part of the city.",
    image: west,
  },
  {
    name: 'Airport City',
    car: '2 min',
    walk: '4 min',
    description:
      'Airport City Belgrade is the largest business and commercial complex in Belgrade. It consists mainly of modern office buildings that host international companies, restaurants, cafes, shops, and other business-related services. Developed as one of the first modern business parks in Serbia, Airport City has become an important corporate and economic hub in Belgrade.',
    image: airportCity,
  },
  {
    name: 'Hangar Food Market',
    car: '2 min',
    walk: '4 min',
    description:
      'Hangar Food Market at Airport City Belgrade is a modern food and social hub that brings together a variety of local and international cuisines in one vibrant space. With its contemporary design and lively atmosphere, it has become a popular destination for business meetings, casual dining, and after-work gatherings.',
    image: hangar,
  },
  {
    name: 'Airport Nikola Tesla',
    car: '9 min',
    walk: null,
    description:
      "Nikola Tesla Airport, officially Belgrade Nikola Tesla Airport, is the main international airport in Serbia. It serves as the country's busiest airport and the primary hub for Air Serbia, connecting Belgrade with destinations across Europe, Middle East, North America, and other regions. Named after the famous Serbian-American inventor Nikola Tesla, the airport has undergone major modernization and expansion in recent years to support growing passenger traffic.",
    image: aerodrom,
  },
];

function CarIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-golden h-10 w-10"
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
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-golden h-10 w-10"
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
  const [marker, setMarker] = useState({ top: 0, height: 0 });
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

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

  return (
    <section id="Around">
      <div className="trigger relative flex min-h-screen flex-col items-stretch pt-20 pb-30 max-xl:py-10 max-lg:pt-0 max-lg:pb-20 max-md:pb-10">
        <div className="reveal-content wrapper h-full max-lg:w-full">
          <div className="w-1/3 max-xl:w-5/12 max-lg:w-full">
            <p className="kicker uppercase">What&apos;s around</p>

            <div className="list border-b-golden/40 relative border-b pt-12 pb-15">
              <div
                className="bg-accent pointer-events-none absolute top-0 -left-4 w-0.5 transition-all duration-300"
                style={{
                  height: `${marker.height}px`,
                  transform: `translateY(${marker.top}px)`,
                  opacity: 1,
                }}
              />
              {PLACES.map((place, index) => (
                <div
                  key={place.name}
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={activeIndex === index}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setActiveIndex(index);
                    }
                  }}
                  className="group relative cursor-default overflow-hidden"
                >
                  <p className="heading-2 text-golden pt-4 pb-4 leading-none transition group-hover:-translate-y-full">
                    {place.name}
                  </p>
                  <span className="heading-2 absolute left-0 h-full w-full italic transition-all group-hover:top-4 top-[120%]">
                    {place.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="relative mt-8 min-h-[15rem]">
              {PLACES.map((place, index) => (
                <div
                  key={place.name}
                  className="absolute inset-0 transition-opacity"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    pointerEvents: activeIndex === index ? 'auto' : 'none',
                    transitionDuration: '220ms',
                    transitionDelay: '0ms',
                  }}
                  aria-hidden={activeIndex !== index}
                >
                  <p className="kicker mb-4 uppercase">{place.name}</p>
                  <div className="divide-golden/40 flex divide-x">
                    <div className="paragraph flex items-center gap-2 pr-4">
                      <CarIcon /> {place.car}
                    </div>
                    {place.walk ? (
                      <div className="paragraph flex items-center gap-2 pl-4">
                        <WalkIcon /> {place.walk}
                      </div>
                    ) : null}
                  </div>
                  <p className="paragraph mt-4">{place.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal-image relative z-10 mt-10 w-full overflow-hidden bg-inherit aspect-[4/3] lg:absolute lg:top-1/2 lg:right-0 lg:mt-0 lg:w-[70vw] lg:-translate-y-1/2 lg:aspect-video lg:max-xl:w-[60vw] rounded-[1.25rem]">
          <svg
            className="absolute inset-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'visible', pointerEvents: 'none', position: 'absolute' }}
            aria-hidden="true"
          >
            <defs>
              <filter id="feathered-mask-filter">
                <feGaussianBlur stdDeviation="24" />
              </filter>
              <mask id="feathered-mask">
                <rect
                  x="70"
                  y="70"
                  width="calc(100% - 140px)"
                  height="calc(100% - 140px)"
                  rx="30"
                  ry="30"
                  fill="white"
                  filter="url(#feathered-mask-filter)"
                />
              </mask>
            </defs>
          </svg>
          <div
            className="absolute inset-0"
            style={{
              mask: 'url(#feathered-mask)',
              WebkitMask: 'url(#feathered-mask)',
            }}
          >
            {PLACES.map((place, index) => (
              <Image
                key={place.name}
                src={place.image}
                alt={place.name}
                fill
                sizes="(min-width: 1121px) 70vw, 100vw"
                className="object-cover transition-opacity duration-500"
                style={{ opacity: activeIndex === index ? 1 : 0 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
