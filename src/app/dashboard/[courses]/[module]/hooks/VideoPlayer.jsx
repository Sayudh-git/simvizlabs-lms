import { useEffect, useRef } from "react";

const VideoAmbient = () => {
  const canvasRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !playerRef.current) return;

    const canvas = canvasRef.current;
    const ambientCtx = canvas.getContext("2d");
    ambientCtx.filter = "blur(40px)";

    const player = playerRef.current;
    const video = player.media.nativeEl;

    const poster = new Image();
    poster.src = player.poster;

    const updateDimensions = () => {
      const width = video.videoWidth / 4;
      const height = video.videoHeight / 4;

      canvas.width = width;
      canvas.height = height;
      ambientCtx.filter = "blur(40px)";
      ambientCtx.drawImage(poster, 0, 0, width, height);
    };

    const paintCanvas = () => {
      if (video.paused || video.ended) return;
      ambientCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
      video.requestVideoFrameCallback(paintCanvas);
    };

    video.addEventListener("loadedmetadata", updateDimensions);
    video.addEventListener("play", paintCanvas);

    // Cleanup on unmount
    return () => {
      video.removeEventListener("loadedmetadata", updateDimensions);
      video.removeEventListener("play", paintCanvas);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full absolute" width="320" height="180"></canvas>
      <mux-player
        ref={playerRef}
        className="w-full aspect-video p-5"
        stream-type="on-demand"
        playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      ></mux-player>
    </div>
  );
};

export default VideoAmbient;
