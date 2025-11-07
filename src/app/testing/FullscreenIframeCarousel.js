"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// type IframeSource = {
//   title: string;
//   url: string;
// };

// type FullscreenIframeCarouselProps = {
//   sources: IframeSource[];
//   className?: string;
//   startIndex?: number;
// };

export default function FullscreenIframeCarousel({ sources, className, startIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(Math.min(Math.max(startIndex, 0), Math.max(0, sources.length - 1)));
  const iframeRef = useRef(null);

  const numSlides = sources.length;

  const goTo = useCallback((nextIndex) => {
    if (numSlides === 0) return;
    const wrapped = (nextIndex + numSlides) % numSlides;
    setActiveIndex(wrapped);
  }, [numSlides]);

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  const active = useMemo(() => sources[activeIndex], [sources, activeIndex]);

  return (
    <div className={`relative w-full h-[100dvh] overflow-hidden bg-black ${className ?? ""}`}>
      <iframe
        ref={iframeRef}
        key={active?.url}
        title={active?.title ?? "Embedded content"}
        src={active?.url}
        className="absolute inset-0 w-full h-full border-0"
        allow="fullscreen; autoplay; clipboard-read; clipboard-write; encrypted-media; picture-in-picture"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Controls */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-4">
        <button
          aria-label="Previous"
          onClick={goPrev}
          className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white ring-1 ring-white/20 backdrop-blur px-3 py-3 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path fillRule="evenodd" d="M15.53 4.47a.75.75 0 010 1.06L9.06 12l6.47 6.47a.75.75 0 11-1.06 1.06l-7-7a.75.75 0 010-1.06l7-7a.75.75 0 011.06 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          aria-label="Next"
          onClick={goNext}
          className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white ring-1 ring-white/20 backdrop-blur px-3 py-3 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path fillRule="evenodd" d="M8.47 19.53a.75.75 0 010-1.06L14.94 12 8.47 5.53a.75.75 0 011.06-1.06l7 7a.75.75 0 010 1.06l-7 7a.75.75 0 01-1.06 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      {numSlides > 1 && (
        <div className="pointer-events-none absolute bottom-4 left-0 right-0 mx-auto flex w-full items-center justify-center gap-2">
          {sources.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => goTo(idx)}
              className={`pointer-events-auto h-2 w-2 rounded-full transition ${idx === activeIndex ? "bg-white" : "bg-white/40 hover:bg-white/60"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}


