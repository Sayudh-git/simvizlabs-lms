"use client"
import { Slider } from "@/components/ui/slider"
import { Volume2, VolumeX } from "lucide-react"
import { useState } from "react"
export default function SliderVolume({volume,setVolume}) {
   return (
    <div className="flex items-center space-x-4 w-[60%]">
      {volume[0] === 0 ? (
        <VolumeX className="h-5 w-5 text-muted-foreground" />
      ) : (
        <Volume2 className="h-5 w-5 text-muted-foreground" />
      )}
      <Slider
        value={volume}
        onValueChange={setVolume}
        max={100}
        step={1}
        className="flex-1"
      />
      <span className="text-sm font-medium min-w-[3ch] text-right">
        {volume[0]}
      </span>
    </div>
  )
}