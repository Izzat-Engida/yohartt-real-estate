'use client';

import { useEffect, useRef } from 'react';

// The video always fills the screen.
// - Windows wider than the video (most laptop browser windows) show the whole
//   frame, roof to street. The strips left and right show the frame's own
//   edges mirrored outward and blurred, drawn on a small canvas behind it, and
//   the video's side edges fade into them (see .hero-video in hero.css).
// - Narrower screens (phones, squarer monitors) crop the sides instead,
//   framed on the tower, which sits a little right of centre.
const WIDE = '(min-aspect-ratio: 16/9)';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fillRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = fillRef.current;
    const ctx = canvas?.getContext('2d');
    if (!video || !canvas || !ctx) return;

    const wide = window.matchMedia(WIDE);

    // Low resolution is enough: the canvas is blurred heavily anyway.
    const fitCanvas = (): void => {
      const box = canvas.getBoundingClientRect();
      canvas.width = 96;
      canvas.height = Math.max(1, Math.round((96 * box.height) / Math.max(1, box.width)));
    };

    const draw = (): void => {
      if (!wide.matches || video.readyState < 2 || !video.videoWidth) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const fw = (ch * video.videoWidth) / video.videoHeight;
      const fx = (cw - fw) / 2;

      ctx.drawImage(video, fx, 0, fw, ch);
      // Mirror copies either side, so each strip continues the frame's edge.
      ctx.save();
      ctx.translate(fx * 2, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, fx, 0, fw, ch);
      ctx.restore();
      ctx.save();
      ctx.translate((fx + fw) * 2, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, fx + fw, 0, fw, ch);
      ctx.restore();
    };

    let raf = 0;
    const loop = (): void => {
      draw();
      if (!video.paused && !video.ended) raf = requestAnimationFrame(loop);
    };
    const onPlay = (): void => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    };
    const onResize = (): void => {
      fitCanvas();
      draw();
    };

    fitCanvas();
    draw();

    video.addEventListener('play', onPlay);
    video.addEventListener('loadeddata', draw);
    video.addEventListener('seeked', draw);
    video.addEventListener('pause', draw);
    window.addEventListener('resize', onResize);
    wide.addEventListener('change', onResize);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('loadeddata', draw);
      video.removeEventListener('seeked', draw);
      video.removeEventListener('pause', draw);
      window.removeEventListener('resize', onResize);
      wide.removeEventListener('change', onResize);
    };
  }, []);

  return (
    <div className="relative h-svh overflow-hidden bg-[#F7F1E4]">
      <canvas
        ref={fillRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-125 blur-xl"
      />

      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="hero-video relative block h-full w-full object-cover object-[54%_0%]"
      ></video>

      <div className="absolute inset-0 flex items-end justify-center bg-transparent py-15 opacity-0 max-md:py-10">
   <h1 className="heading huge bg-gradient-to-r from-[#87622F] via-[#AD824B] to-[#D9B87F] bg-clip-text text-transparent text-center text-[9.5vw] font-normal uppercase max-md:text-[17vw]">
  YOHART PROPERTIES
</h1>
      </div>
    </div>
  );
}
