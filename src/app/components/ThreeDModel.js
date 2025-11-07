import React, { useEffect, useRef } from 'react';

const ThreeDModel = ({data, onModelCompleted}) => {
  const iframeRef = useRef(null);
  const completionTriggered = useRef(false);
  const interactionTimer = useRef(null);

  // Track user interaction with the 3D model
  useEffect(() => {
    const handleInteraction = () => {
      if (completionTriggered.current || !onModelCompleted) return;
      
      // Clear any existing timer
      if (interactionTimer.current) {
        clearTimeout(interactionTimer.current);
      }
      
      // Set a timer to mark as completed after 10 seconds of interaction
      interactionTimer.current = setTimeout(() => {
        if (!completionTriggered.current) {
          completionTriggered.current = true;
          onModelCompleted();
        }
      }, 5000); // 10 seconds
    };

    const iframe = iframeRef.current;
    if (iframe) {
      // Listen for various interaction events
      iframe.addEventListener('load', handleInteraction);
      iframe.addEventListener('click', handleInteraction);
      iframe.addEventListener('mousemove', handleInteraction);
      iframe.addEventListener('keydown', handleInteraction);
      
      return () => {
        if (interactionTimer.current) {
          clearTimeout(interactionTimer.current);
        }
        iframe.removeEventListener('load', handleInteraction);
        iframe.removeEventListener('click', handleInteraction);
        iframe.removeEventListener('mousemove', handleInteraction);
        iframe.removeEventListener('keydown', handleInteraction);
      };
    }
  }, [onModelCompleted]);

  return (
    <div className="flex items-center justify-center ">
      <div className="sketchfab-embed-wrapper ">
        <iframe
          ref={iframeRef}
          title="(Airbus A320) Airplane Cockpit"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking="true"
          execution-while-out-of-viewport="true"
          execution-while-not-rendered="true"
          web-share="true"
          src={data.content[0].playground}
          style={{ width: '80vw', height: '80vh' }}
        ></iframe>
      </div>
    </div>
  );
};

export default ThreeDModel;