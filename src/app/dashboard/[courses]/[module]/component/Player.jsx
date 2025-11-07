"use client";
import React from "react";
import Player from "next-video/player";
import { data as moduleData } from "../sidebar.jsx";
import { redirect, usePathname, useSearchParams } from "next/navigation.js";
import { SidebarTrigger } from "@/components/ui/sidebar.jsx";
// Dynamically import the component to ensure server-side rendering issues are avoided.
// const VideoAmbient = dynamic(() => import("../hooks/VideoPlayer"), {
//   ssr: false,
// });
import { ChevronRight, ChevronLeft } from "lucide-react";
import MuxPlayer from '@mux/mux-player-react';

export default function TestPlayer({ data, onVideoCompleted, isCompleted }) {
  const [isVideoCompleted, setIsVideoCompleted] = React.useState(false);
  const muxPlayerRef = React.useRef(null);

  // Handle video completion
  React.useEffect(() => {
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

    // Add event listeners to MuxPlayer
    const muxPlayer = muxPlayerRef.current;
    if (muxPlayer) {
      muxPlayer.addEventListener("ended", handleVideoEnded);
      muxPlayer.addEventListener("play", handleVideoPlay);
    }

    return () => {
      if (muxPlayer) {
        muxPlayer.removeEventListener("ended", handleVideoEnded);
        muxPlayer.removeEventListener("play", handleVideoPlay);
      }
    };
  }, [onVideoCompleted]);

  // Check if video is completed
  const videoCompleted = isCompleted || isVideoCompleted;
   

  return (
    <div className="flex flex-1 flex-col px-4 py-8 text-[#344054] pt-0 overflow-hidden w-full">
      {data.content.map((item, index) => {
        return (      <div>
      <div className="w-full text-center flex justify-center">
        <div className="w-full justify-center flex flex-col lg:relative lg:left-2 ">
          <div className="text-start py-4 font-semibold text-xl">
                <div>{data.title}</div>
              </div>
            <div className="relative">
              <MuxPlayer
                ref={muxPlayerRef}
                playbackId={item.videoString[0].videoUrl}
                metadata={{
                  video_title: 'Input Fields on the INIT A Page (Part 1)',
                  viewer_user_id: 'Placeholder (optional)',
                }}
                accentColor="#046aff"
                primaryColor="#53d5fd"
              />
              
              {/* Completion indicator overlay */}
              {videoCompleted && (
                <div className="absolute top-4 right-4 bg-green-500/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  ✓ Completed
                </div>
              )}
            </div>
          {/* <Player
            className="justify-start rounded-xl w-full"
                src={
                  item.videoString[0].videoUrl}
            poster={ item.videoString[0]?.poster}
            blurDataURL={item.videoString[0]?.blurDataURL}
          /> */}
        </div>
      </div>
      {item.videoString[0]?.transcript && <div className="mt-5">
        <h4 className="font-bold text-2xl">Transcript</h4>
        <hr className="my-2" />
        <p className="">
         {item.videoString[0]?.transcript}
        </p>
        </div>}
        </div>)
      })}
    </div>
  );
}
