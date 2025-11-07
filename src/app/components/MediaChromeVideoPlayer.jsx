"use client";
import React from "react";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
  MediaCaptionsButton,
} from "media-chrome/react";
import NextAndPrevious from "./ImageAudioCarouselComponent/NextAndPrevious";
import {useSlidesMenu} from "@/hooks/useSlideMenu"
import SlidesMenu from "./ImageAudioCarouselComponent/SlidesMenu";
import FullScreenComponent from "./ImageAudioCarouselComponent/FullScreenComponent";
export default function MediaChromeVideoPlayer({
  data,
  goPrev,
  goNext,
  canNavigate,
  onVideoCompleted,
  isCompleted,
  slides,
  isFullscreen,
  isMenuOpen,
  setIsMenuOpen,
  index,
  isSlideCompleted,
  isSlideUnlocked,
  setIsFullscreen,
  markSlideAsCompleted,
  goToSlide,
  completedCount,
  totalSlides
}) {
  const videoRef = React.useRef(null);
  // const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [isVideoCompleted, setIsVideoCompleted] = React.useState(false);
  const [preserveFullscreen, setPreserveFullscreen] = React.useState(false);
  const containerRef = React.useRef(null);

  const toggleFullScreen = async () => {
    const el = containerRef.current;
    if (!el) return;
  
    const isFullscreenNow =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement;
  
    try {
      if (!isFullscreenNow) {
        if (el.requestFullscreen) await el.requestFullscreen();
        else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
        else if (el.msRequestFullscreen) await el.msRequestFullscreen();
      } else {
        if (document.exitFullscreen) await document.exitFullscreen();
        else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
        else if (document.msExitFullscreen) await document.msExitFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };
  

  React.useEffect(() => {
    const onFsChange = () => {
      const doc = document;
      const isFs = !!(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.msFullscreenElement
      );
      setIsFullscreen(isFs);
      
      // If fullscreen exits and we're in preserve mode, don't exit preserve mode
      // The preserve mode will be cleared only when fullscreen is successfully restored
      if (!isFs && preserveFullscreen) {
        // Fullscreen was exited, keep preserveFullscreen active
        // This will trigger the restoration effect
      } else if (!isFs) {
        // User manually exited fullscreen, make sure preserveFullscreen is off
        setPreserveFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
    document.addEventListener("msfullscreenchange", onFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
      document.removeEventListener("msfullscreenchange", onFsChange);
    };
  }, [preserveFullscreen]);

  // Restore fullscreen after navigation if preserveFullscreen is true
  React.useEffect(() => {
    if (preserveFullscreen && containerRef.current) {
      const element = containerRef.current;
      // Use a small delay to ensure the element is rendered
      const timeoutId = setTimeout(() => {
        if (element && !document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
          if (element.requestFullscreen) {
            element.requestFullscreen().catch(() => setPreserveFullscreen(false));
          } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
          } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
          }
        }
      }, 50);
      
      // Clear the timeout and reset flag if fullscreen is restored
      const checkInterval = setInterval(() => {
        if (document.fullscreenElement === element || document.webkitFullscreenElement === element || document.msFullscreenElement === element) {
          setPreserveFullscreen(false);
          clearInterval(checkInterval);
        }
      }, 10);
      
      return () => {
        clearTimeout(timeoutId);
        clearInterval(checkInterval);
      };
    }
  }, [preserveFullscreen, index]);

  // Handle video events for completion tracking
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnded = () => {
      setIsVideoCompleted(true);
      if (onVideoCompleted) {
        onVideoCompleted();
      }
    };

    const handleVideoPlay = () => {
      // Reset completion state when video starts playing
      setIsVideoCompleted(false);
    };

    video.addEventListener("ended", handleVideoEnded);
    video.addEventListener("play", handleVideoPlay);

    return () => {
      video.removeEventListener("ended", handleVideoEnded);
      video.removeEventListener("play", handleVideoPlay);
    };
  }, [onVideoCompleted]);

  // Check if video is completed (either from props or internal state)
  const videoCompleted = isCompleted || isVideoCompleted;

  // Wrapper functions to preserve fullscreen when navigating
  const handleGoPrev = () => {
    const wasFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    if (wasFullscreen) {
      setPreserveFullscreen(true);
    }
    goPrev();
  };

  const handleGoNext = () => {
    const wasFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    if (wasFullscreen) {
      setPreserveFullscreen(true);
    }
    goNext();
  };

  if (!data?.video_url) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-gray-500 bg-gray-100 rounded-lg">
        No video URL provided
      </div>
    );
  }

  return (
<div
  ref={containerRef}
  className={`relative w-full bg-black border-2 border-black rounded-t-sm mx-auto max-w-5xl min-w-5xl ${
    isFullscreen ? "fixed inset-0 z-[9999]" : ""
  }`}
>
      <MediaController className={`relative ${isFullscreen?"": "min-w-5xl max-w-5xl"}`}>
      <SlidesMenu
        containerRef={containerRef}
        isFullscreen={isFullscreen}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        slides={slides}
        index={index}
        completedCount={completedCount}
        totalSlides={totalSlides}
        isSlideCompleted={isSlideCompleted}
        isSlideUnlocked={isSlideUnlocked}
        markSlideAsCompleted={markSlideAsCompleted}
        goToSlide={goToSlide}
      />
        <video
          slot="media"
          src={data.video_url}
          ref={videoRef}
          className="w-full h-full "
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
        <MediaControlBar className="w-full bg-black absolute bottom-0">
          <MediaPlayButton />
          <MediaTimeRange />
          <MediaTimeDisplay showDuration />
          <MediaVolumeRange />
          <NextAndPrevious
            goPrev={handleGoPrev}
            goNext={handleGoNext}
            canNavigate={canNavigate || videoCompleted}
          />
          <FullScreenComponent toggleFullScreen={toggleFullScreen} isFullscreen={isFullscreen}/>
        </MediaControlBar>

        {/* Completion indicator overlay */}
        {videoCompleted && (
          <div className="absolute top-4 right-4 bg-green-500/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
            ✓ Completed
          </div>
        )}
      </MediaController>
    </div>
  );
}
