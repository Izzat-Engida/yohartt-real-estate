'use client';

import Image, { type StaticImageData } from 'next/image';
import { useState, useRef, useEffect } from 'react';
import amenityParking from '@/assets/home/amenities-options/parking.webp';
import amenityLobbies from '@/assets/home/amenities-options/lobbies.webp';
import amenityGreenery from '@/assets/home/amenities-options/Greenary.webp';
import amenityBalcony from '@/assets/home/amenities-options/balcony.webp';
import amenitySecurity from '@/assets/home/amenities-options/secuirty.webp';
import amenityElevator from '@/assets/home/amenities-options/elevator.webp';
import { Instrument_Serif } from 'next/font/google';

const amenitiesFont = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-amenities',
});

type Amenity = {
  name: string;
  label: string;
  description: string;
  image: StaticImageData;
  alt: string;
};

const amenities: Amenity[] = [
  {
    name: 'Parking',
    label: 'Dedicated Resident Parking',
    description:
      'The semi-basement and ground floors are entirely dedicated to resident parking, providing a total capacity for 14 cars.',
    image: amenityParking,
    alt: 'Dedicated resident parking in semi-basement and ground floors with 14 car capacity',
  },
  {
    name: 'Lobbies',
    label: 'Welcoming Entrance Lobbies',
    description:
      'Designated lobby areas on both the semi-basement and ground floors welcome residents and guests from both parking and pedestrian entrances.',
    image: amenityLobbies,
    alt: 'Designated entrance lobby areas on semi-basement and ground floors',
  },
  {
    name: 'Greenery',
    label: 'Greenery & Landscaping',
    description:
      'Thoughtfully planned green areas and planters on the ground level and first floor bring a calming touch of nature into the building.',
    image: amenityGreenery,
    alt: 'Greenery and landscaping with planters on ground and first floors',
  },
  {
    name: 'Balconies',
    label: 'Private Balconies',
    description:
      'Starting from the second floor upwards, the residential units feature spacious private balconies designed for open air and personal retreat.',
    image: amenityBalcony,
    alt: 'Spacious private balconies on residential floors',
  },
  {
    name: 'Security',
    label: 'Security & Utility Facilities',
    description:
      'A dedicated ground-floor Guard Space ensures on-site security and traffic management, complemented by practical garbage collection and utility rooms on the semi-basement level.',
    image: amenitySecurity,
    alt: 'Dedicated guard space and practical utility facilities',
  },
  {
    name: 'Elevators',
    label: 'Direct Elevator Access',
    description:
      'Modern elevator shafts service the residential floors directly from both the parking and entrance lobbies for seamless accessibility.',
    image: amenityElevator,
    alt: 'Modern elevator shafts servicing residential floors directly from lobbies',
  },
];

export function AmenitiesDetailsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeAmenity = amenities[activeIndex];

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % amenities.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + amenities.length) % amenities.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) {
      handleNext();
    } else if (distance < -40) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Center active tab horizontally on mobile
  useEffect(() => {
    if (tabsRef.current) {
      const activeBtn = tabsRef.current.querySelector<HTMLElement>('button.is-active');
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [activeIndex]);

  return (
    <section className={`amenities-details ${amenitiesFont.variable}`} aria-labelledby="amenities-details-title">
      {/* Tabs navigation */}
      <div
        ref={tabsRef}
        className="amenities-details__navigation"
        role="tablist"
        aria-label="Amenities"
      >
        {amenities.map((amenity, index) => {
          const tabId = `amenity-tab-${amenity.name.toLowerCase()}`;
          return (
            <button
              key={amenity.name}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls="amenities-details-panel"
              tabIndex={activeIndex === index ? 0 : -1}
              className={activeIndex === index ? 'is-active' : undefined}
              onClick={() => setActiveIndex(index)}
            >
              <span className="amenities-details__tab-text">{amenity.name}</span>
              {activeIndex === index && <em>{amenity.label}</em>}
            </button>
          );
        })}
      </div>

      {/* Visual Image Showcase with Swipe and Mobile Arrows */}
      <div
        className="amenities-details__visual"
        key={activeAmenity.name}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={activeAmenity.image}
          alt={activeAmenity.alt}
          fill
          sizes="(max-width: 899px) 100vw, 58vw"
          priority={activeIndex === 0}
        />

        {/* Mobile quick-nav arrows */}
        <button
          type="button"
          onClick={handlePrev}
          className="amenities-details__arrow amenities-details__arrow--prev"
          aria-label="Previous amenity"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="amenities-details__arrow amenities-details__arrow--next"
          aria-label="Next amenity"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Amenity description panel */}
      <div
        id="amenities-details-panel"
        className="amenities-details__content"
        role="tabpanel"
        aria-live="polite"
        aria-labelledby={`amenity-tab-${activeAmenity.name.toLowerCase()}`}
      >
        <div className="amenities-details__rule" />
        <p className="amenities-details__label">{activeAmenity.label}</p>
        <p className="amenities-details__description">{activeAmenity.description}</p>
      </div>

      {/* Mobile indicator dots */}
      <div className="amenities-details__dots-mobile" aria-hidden="true">
        {amenities.map((_, i) => (
          <span
            key={i}
            className={`amenities-details__dot ${activeIndex === i ? 'is-active' : ''}`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>

      {/* Desktop watermark title */}
      <h2 id="amenities-details-title" className="amenities-details__title">
        AMENITIES
      </h2>
    </section>
  );
}
