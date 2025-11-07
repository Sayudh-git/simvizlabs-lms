'use client';
import React from 'react';

export default function NavigationButtons({
  canNavigatePrev,
  canNavigateNext,
  onNavigatePrev,
  onNavigateNext,
  nextLabel = 'NEXT',
  prevLabel = 'BACK',
  isPresent
}) {
  return (
    <div className="flex justify-between">
      {isPresent.prev ?<button
        className="mr-0.5 border hover:bg-gray-300 text-black font-bold py-1.5 px-6 rounded-lg disabled:text-gray-300 disabled:hover:bg-white disabled:cursor-not-allowed"
        disabled={!canNavigatePrev}
        onClick={onNavigatePrev}
      >
        {prevLabel}
      </button>:""}
      {isPresent.next?<button
        className="ml-0.5 border bg-blue-700 text-white font-bold py-1.5 px-6 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
        // disabled={!canNavigateNext}
        onClick={onNavigateNext}
      >
        {nextLabel}
      </button>:""}
    </div>
  );
}