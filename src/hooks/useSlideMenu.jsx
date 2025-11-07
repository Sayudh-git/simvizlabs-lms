// const { markSlideshowCompleted } = require("@/lib/courseProgress");
// import React from "react";
// import {useState,useEffect} from "react";

// const useSlideMenu=()=>{
//     const [isMenuOpen, setIsMenuOpen] =useState(false);
//     const [isFullScreen,setFullScreen]=useState(false);
//     const [completedSlides, setCompletedSlides] = useState(() => {
//         const saved = localStorage.getItem("completedSlides");
//         return saved ? new Set(JSON.parse(saved)) : new Set();
//       });

//       const markSlideAsCompleted = (slideIndex) => {
//         setCompletedSlides(prev => {
//           const newCompleted = new Set([...prev, slideIndex]);
//           return newCompleted;
//         });
//       };

//       const isSlideCompleted = (slideIndex) => {
//         return completedSlides.has(slideIndex);
//       };

//       const isSlideUnlocked = (slideIndex) => {
//         return slideIndex === 0 || isSlideCompleted(slideIndex - 1);
//       };

//       return {
//         isMenuOpen,
//         setIsMenuOpen,
//         isFullScreen,
//         setFullScreen,
//         completedSlides,
//         setCompletedSlides,
//         isSlideUnlocked,
//         isSlideCompleted,
//         markSlideAsCompleted
//       }
// }


//  export default useSlideMenu;



// hooks/useSlidesMenu.js
import React, { useMemo } from "react";
import {useState,useEffect,useCallback} from "react";
export function useSlidesMenu({ slides = [], initialIndex = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [completedSlides, setCompletedSlides] = useState(() => {
    // Don't persist completion state across page refreshes
    return new Set();
  });
  const [index, setIndex] = React.useState(initialIndex);

  const totalSlides = slides.length;
  const completedCount = useMemo(()=>completedSlides.size,[completedSlides]);

  const isSlideCompleted = useCallback(
    (i) => completedSlides.has(i),
    [completedSlides]
  );

  const isSlideUnlocked = useCallback(
    (i) => true, // Always unlocked - unlock functionality removed
    []
  );


  const markSlideAsCompleted = useCallback((i) => {
    setCompletedSlides((prev) => {
      const updated = new Set(prev);
      updated.add(i);
      // Don't persist completion state across page refreshes
      return updated;
    });
  }, []);

  const goToSlide = useCallback(
    (i) => {
      setIndex(i);
    },
    []
  );

  // Removed localStorage persistence for completion state
  // useEffect(() => {
  //   localStorage.setItem("completedSlides", JSON.stringify([...completedSlides]));
  // }, [completedSlides])

  // Removed automatic marking of slides as completed when viewed
  // Completion should only happen when user actually completes the slide
  // useEffect(() => {
  //   if (index >= 0 && !completedSlides.has(index)) {
  //     markSlideAsCompleted(index);
  //   }
  // }, [index, completedSlides, markSlideAsCompleted])


  return {
    // states
    index,
    isMenuOpen,
    completedSlides,
    totalSlides,
    completedCount,

    // setters
    setIsMenuOpen,
    setIndex,
    markSlideAsCompleted,

    // utils
    goToSlide,
    isSlideCompleted,
    isSlideUnlocked,
  };
}
