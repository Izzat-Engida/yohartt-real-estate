"use client";

import Image from "next/image";
import { useEffect } from "react";
const amenitiesVideo = "/media/home/amenities/amenities.mp4";
const businessVideo = "/media/home/business/business.mp4";
const heroMobileVideo = "/media/home/hero-m.webm";
const heroVideo = "/media/home/hero.mp4";
const locationVideo = "/media/home/location/location.mp4?v=2";
const residencesVideo = "/media/home/residences/interior.mp4";
const rootsVideo = "/media/home/roots/image1.mp4";

declare global {
  interface Window {
    __introDone?: boolean;
    __lenis: import("lenis").default | null;
  }
}

type Cleanup = () => void;
type EasingFunction = (t: number) => number;
type FrameCallback = (progress: number) => void;
type DoneCallback = () => void;


const SECTION_VIDEOS: Array<[string, string]> = [
  ["w-[200%]", amenitiesVideo],
  ["w-[180%]", businessVideo],
  ["w-[160%]", residencesVideo],
  ["w-[150%]", locationVideo],
  ["translate-y-1/10", rootsVideo],
];

const easeInOutQuad: EasingFunction = (t) =>
  t < 0.5
    ? 2 * t * t
    : 1 - Math.pow(-2 * t + 2, 2) / 2;

const easeOutQuad: EasingFunction = (t) =>
  1 - (1 - t) * (1 - t);

function animate(
  duration: number,
  easing: EasingFunction,
  onFrame: FrameCallback,
  onDone?: DoneCallback
): Cleanup {
  const start = performance.now();
  let raf = 0;

  const frame = (now: number): void => {
    const t = Math.min((now - start) / duration, 1);

    onFrame(easing(t));

    if (t < 1) {
      raf = requestAnimationFrame(frame);
    } else {
      onDone?.();
    }
  };

  raf = requestAnimationFrame(frame);

  return () => cancelAnimationFrame(raf);
}

export default function Intro() {
  useEffect(() => {
    const cleanups: Cleanup[] = [];

    // 1–4: loader and hero video.
    const hero = document.querySelector<HTMLVideoElement>(
      "video.block.h-full.w-full.object-cover"
    );

    const loader = document.querySelector<HTMLElement>(".loader");

    const bar = document.querySelector<HTMLElement>(
      ".loader .loader-bar"
    );

    const percent = document.querySelector<HTMLElement>(
      ".loader p.heading-3"
    );

    const revealTitle = (): void => {
      const title = document.querySelector<HTMLElement>(
        "div.flex.items-end.opacity-0"
      );

      if (!title) return;

      const h1 = title.querySelector<HTMLHeadingElement>("h1");

      if (!h1) return;

      if (!h1.dataset.split) {
        const text = h1.textContent ?? "";
        h1.textContent = "";

        const fragment = document.createDocumentFragment();

        [...text].forEach((ch, i) => {
          const span = document.createElement("span");

          span.textContent = ch === " " ? "\u00A0" : ch;
          span.style.display = "inline-block";
          span.style.opacity = "0";
          span.style.transform = "translateY(2rem)";

          span.style.transition =
            `opacity .9s cubic-bezier(0.215, 0.61, 0.355, 1) ${i * 50}ms,` +
            ` transform .9s cubic-bezier(0.215, 0.61, 0.355, 1) ${i * 50}ms`;

          fragment.appendChild(span);
        });

        h1.appendChild(fragment);
        h1.dataset.split = "1";
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          title.style.transition = "opacity .8s ease-out";
          title.style.opacity = "1";

          Array.from(h1.children).forEach((child) => {
            if (!(child instanceof HTMLElement)) return;

            child.style.opacity = "1";
            child.style.transform = "translateY(0)";
          });
        });
      });
    };

    // When the hero video ends, glide on to the next section by itself, unless
    // the visitor has already started scrolling or interacting with the page.
    let interacted = false;
    let advanceTimer = 0;
    const markInteracted = (): void => {
      interacted = true;
      window.clearTimeout(advanceTimer);
    };
    const interactionEvents = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    interactionEvents.forEach((type) =>
      window.addEventListener(type, markInteracted, { passive: true })
    );
    cleanups.push(() => {
      window.clearTimeout(advanceTimer);
      interactionEvents.forEach((type) =>
        window.removeEventListener(type, markInteracted)
      );
    });

    const autoAdvance = (): void => {
      if (interacted || document.hidden || window.scrollY > 4) return;
      if (document.body.hasAttribute("data-menu-open")) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const next = Array.from(
        document.querySelectorAll<HTMLElement>("#about, #about-mobile")
      ).find((element) => element.offsetHeight > 0);
      if (!next) return;

      // Land a little way into the intro, where its first screen has faded in.
      const distance = Math.max(0, next.offsetHeight - window.innerHeight);
      const target =
        next.getBoundingClientRect().top + window.scrollY + Math.round(distance * 0.1);

      if (window.__lenis) {
        window.__lenis.scrollTo(target, {
          duration: 2.8,
          easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
        });
      } else {
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    };

    if (hero) {
      hero.muted = true;
      hero.loop = false;

      const targetSrc = window.matchMedia("(max-width: 600px)").matches
        ? heroMobileVideo
        : heroVideo;

      // Only assign src and load if not already set to this source
      if (!hero.src || !hero.src.endsWith(targetSrc)) {
        hero.src = targetSrc;
        hero.load();
      }

      const onEnded = (): void => {
        revealTitle();
        // Give the title a moment to finish appearing first.
        window.clearTimeout(advanceTimer);
        advanceTimer = window.setTimeout(autoAdvance, 1600);
      };

      const onTimeUpdate = (): void => {
        if (hero.duration && hero.currentTime >= hero.duration - 0.25) {
          revealTitle();
        }
      };

      hero.addEventListener("ended", onEnded);
      hero.addEventListener("timeupdate", onTimeUpdate);

      cleanups.push(() => {
        hero.removeEventListener("ended", onEnded);
        hero.removeEventListener("timeupdate", onTimeUpdate);
      });
    }

    const finish = (): void => {
      if (hero) {
        hero.loop = false;
        if (hero.ended || (hero.duration && hero.currentTime >= hero.duration - 0.25)) {
          revealTitle();
        } else {
          hero.play().catch(() => {
            // Autoplay blocked by browser - show title immediately
            revealTitle();
          });
        }
      } else {
        revealTitle();
      }

      // Resume Lenis, which ScrollAnimations initially creates stopped.
      window.__introDone = true;
      window.dispatchEvent(new Event("intro:done"));
    };

    if (loader && bar && percent) {
      cleanups.push(
        animate(
          2000,
          easeInOutQuad,
          (v) => {
            const n = Math.round(v * 100);

            bar.style.width = `${n}%`;

            // Update the percentage while preserving the existing markup.
            if (percent.firstChild) {
              percent.firstChild.nodeValue = `${n}%`;
            }
          },
          () => {
            cleanups.push(
              animate(
                500,
                easeOutQuad,
                (v) => {
                  if (loader) {
                    loader.style.opacity = String(1 - v);
                  }
                },
                () => {
                  if (loader) {
                    loader.style.display = "none";
                  }

                  finish();
                }
              )
            );
          }
        )
      );
    } else {
      // No loader in the markup.
      finish();
    }

    // 5: Lazy-load section videos when they approach the viewport.
    for (const [frag, src] of SECTION_VIDEOS) {
      const videos = document.querySelectorAll<HTMLVideoElement>(
        `video[class*="${frag}"]`
      );

      videos.forEach((video) => {
        const io = new IntersectionObserver(
          ([entry]) => {
            if (!entry?.isIntersecting) return;

            io.disconnect();

            video.muted = true;
            video.src = src;
            video.load();

            video.play().catch(() => {
              // Autoplay may be blocked by the browser.
            });
          },
          {
            rootMargin: "400px",
          }
        );

        io.observe(video);

        cleanups.push(() => {
          io.disconnect();
        });
      });
    }

    return () => {
      cleanups.forEach((cleanup) => {
        cleanup();
      });
    };
  }, []);

  // The loading screen. It sits above the menu bar and is faded out and
  // hidden by the effect above once loading finishes.
  return (
    <div
      className="loader fixed inset-0 z-[2000] flex flex-col items-center justify-center gap-10 text-[#AD824B]"
      style={{
        background:
          'linear-gradient(135deg, #FDFBEF 0%, #F8F2E7 55%, #EFE7D8 100%)',
      }}
    >
      <Image
        src="/media/home/yohartload.png"
        alt="Yoha Logo"
        width={200}
        height={200}
        className="h-50 w-auto object-contain"
        priority
      />

      <div className="h-0.5 w-75 overflow-hidden rounded-full bg-[#AD824B]/20">
        <div
          className="loader-bar h-0.5 rounded-full bg-[#AD824B] shadow-[0_0_12px_rgba(173,130,75,0.5)]"
          style={{ width: "0%" }}
        ></div>
      </div>

      <p className="heading-3 mt-4 text-[#AD824B]">0%</p>
    </div>
  );
}
