"use client"
import React from "react";

// Temporary shim for ImageAudioCarousel to avoid module-not-found.
// This provides minimal UI so pages that expect slides won't crash.
export default function ImageAudioCarousel({
  tempSlides = [],
  onAllSlidesCompleted = () => {},
  onNextModule = () => {},
  courseId,
  moduleId,
  id,
  courseDetails,
}) {
  const [completed, setCompleted] = React.useState(false);

  const handleComplete = () => {
    setCompleted(true);
    try {
      onAllSlidesCompleted();
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Slides (temporary viewer)</h2>
      <p className="text-sm text-gray-600 mb-4">This is a temporary placeholder for the slideshow/player so the page can render while the full component is unavailable.</p>
      <div className="space-y-2 mb-4">
        {Array.isArray(tempSlides) && tempSlides.length > 0 ? (
          tempSlides.slice(0, 10).map((s, i) => (
            <div key={i} className="p-2 border rounded bg-gray-50">
              <strong>Slide {i + 1}:</strong> {s.title || s.caption || s.id || "(no title)"}
            </div>
          ))
        ) : (
          <div className="p-2 border rounded bg-gray-50">No slides available</div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleComplete}
          disabled={completed}
          className={`px-4 py-2 rounded ${completed ? 'bg-green-300 text-white' : 'bg-green-600 text-white hover:bg-green-700'}`}>
          {completed ? "Completed" : "Mark all slides complete"}
        </button>

        <button
          onClick={() => onNextModule?.()}
          className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-900"
        >
          Next module (placeholder)
        </button>
      </div>
    </div>
  );
}
