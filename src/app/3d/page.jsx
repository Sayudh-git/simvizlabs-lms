import React from 'react'

const page = () => {
  return (
          <div className="sketchfab-embed-wrapper">
      <iframe
        title="(Airbus A320) Airplane Cockpit"
        frameBorder="0"
        allowFullScreen
         webkitAllowFullScreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking="true"
        execution-while-out-of-viewport="true"
        execution-while-not-rendered="true"
        web-share="true"
        src="https://sketchfab.com/models/feaa475ce5824121be0380a42987007f/embed"
        style={{ width: '100%', height: '480px' }}
      ></iframe>
      
    </div>

   )
}

export default page