import { FullscreenIcon, Maximize, Minimize } from 'lucide-react'
import React from 'react'

export default function FullScreenComponent({toggleFullScreen, isFullscreen}) {
  return (
    <div>
        <button
    onClick={toggleFullScreen}
    className="px-3 py-2 rounded-md "
    title={isFullscreen ? "Exit fullscreen" : "Enter FullScreen"}
  >
    {isFullscreen ?<Minimize/> : <Maximize/>}
  </button></div>
  )
}