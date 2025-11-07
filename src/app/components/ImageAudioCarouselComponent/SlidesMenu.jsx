// import React from 'react'
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// export const SlidesMenuComp = ({isMenuOpen,
//     setIsMenuOpen,
//     isFullScreen,
//     setFullScreen,
//     completedSlides,
//     setCompletedSlides,
//     isSlideUnlocked,
//     isSlideCompleted,
//     markSlideAsCompleted}) => {
//   return ( <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
//                 <SheetTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="absolute top-4 left-4 bg-black/70 text-white hover:bg-black/90 rounded-full p-2 backdrop-blur-sm z-10"
//                   >
//                     <MenuIcon className="h-5 w-5" />
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent container={isFullscreen ?containerRef.current:undefined} side="left" className="w-[400px] sm:w-[540px] bg-white">
//                   <SheetHeader>
//                     <SheetTitle className="flex items-center justify-between">
//                       <span>Slides Menu</span>
//                     </SheetTitle>
//                   </SheetHeader>
                  
//                   <div className="mt-6 space-y-4">
//                     {/* Progress Summary */}
//                     <div className="bg-gray-50 rounded-lg p-4">
//                       <div className="flex items-center justify-between mb-2">
//                         <h3 className="font-semibold text-gray-900">Progress</h3>
//                         <span className="text-sm text-gray-600">
//                           {completedCount} / {totalSlides} completed
//                         </span>
//                       </div>
//                       <Progress 
//                         value={(completedCount / totalSlides) * 100} 
//                         className="h-2 [&>div]:bg-green-500"
//                       />
//                       <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
//                         <span>Current: Slide {index + 1}</span>
//                         <span>{Math.round((completedCount / totalSlides) * 100)}% Complete</span>
//                       </div>
//                     </div>

//                     {/* Mark Current Slide Complete Button */}
//                     {!isSlideCompleted(index) && (
//                       <Button
//                         onClick={() => markSlideAsCompleted(index)}
//                         className="w-full bg-green-600 hover:bg-green-700 text-white"
//                       >
//                         <CheckCircle className="h-4 w-4 mr-2" />
//                         Mark Current Slide Complete
//                       </Button>
//                     )}

//                     {/* Slides List */}
//                     <div className="space-y-2">
//                       <h4 className="font-semibold text-gray-900">All Slides</h4>
//                       <div className="space-y-1 max-h-96 overflow-y-auto">
//                         {slides.map((slide, slideIndex) => {
//                           const isCompleted = isSlideCompleted(slideIndex);
//                           const isUnlocked = isSlideUnlocked(slideIndex);
//                           const isCurrent = slideIndex === index;
                          
//                           return (
//                             <div
//                               key={slideIndex}
//                               className={`flex items-center p-3 rounded-lg border transition-colors ${
//                                 isCurrent 
//                                   ? "bg-blue-50 border-blue-200" 
//                                   : isUnlocked 
//                                     ? "bg-white border-gray-200 hover:bg-gray-50 cursor-pointer" 
//                                     : "bg-gray-50 border-gray-200 cursor-not-allowed opacity-60"
//                               }`}
//                               onClick={() => isUnlocked && goToSlide(slideIndex)}
//                             >
//                               {/* Status Icon */}
//                               <div className="flex-shrink-0 mr-3">
//                                 {isCompleted ? (
//                                   <CheckCircle className="h-5 w-5 text-green-500" />
//                                 ) : isCurrent ? (
//                                   <Play className="h-5 w-5 text-blue-500" />
//                                 ) : isUnlocked ? (
//                                   <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
//                                 ) : (
//                                   <Lock className="h-5 w-5 text-gray-400" />
//                                 )}
//                               </div>

//                               {/* Slide Info */}
//                               <div className="flex-1 min-w-0">
//                                 <div className="flex items-center justify-between">
//                                   <h5 className={`text-sm font-medium truncate ${
//                                     isCurrent ? "text-blue-900" : isUnlocked ? "text-gray-900" : "text-gray-500"
//                                   }`}>
//                                     {slide.title || `Slide ${slideIndex + 1}`}
//                                   </h5>
//                                   <span className={`text-xs px-2 py-1 rounded-full ${
//                                     isCurrent 
//                                       ? "bg-blue-100 text-blue-800" 
//                                       : isCompleted 
//                                         ? "bg-green-100 text-green-800"
//                                         : "bg-gray-100 text-gray-600"
//                                   }`}>
//                                     {slideIndex + 1}
//                                   </span>
//                                 </div>
//                                 {slide.caption && (
//                                   <p className="text-xs text-gray-500 mt-1 truncate">
//                                     {slide.caption}
//                                   </p>
//                                 )}
//                               </div>

//                               {/* Navigation Arrow */}
//                               {isUnlocked && !isCurrent && (
//                                 <ChevronRight className="h-4 w-4 text-gray-400 ml-2" />
//                               )}
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   </div>
//                 </SheetContent>
//               </Sheet>
//   )
// }


// components/SlidesMenu.jsx
"use client";
import React, { useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Menu as MenuIcon, Play, ChevronRight } from "lucide-react";

export default function SlidesMenu({
  containerRef,
  isFullscreen,
  isMenuOpen,
  setIsMenuOpen,
  slides,
  index,
  completedCount,
  totalSlides,
  isSlideCompleted,
  isSlideUnlocked,
  markSlideAsCompleted,
  goToSlide,
}) {


  // const totalSlides=useMemo(()=>slides.length,[slides]);

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 left-4 bg-black/70 text-white hover:bg-black/90 rounded-full p-2 backdrop-blur-sm z-10"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        container={isFullscreen ? containerRef.current : undefined}
        side="left"
        className="w-[400px] sm:w-[540px] bg-white"
      >
        <SheetHeader>
          <SheetTitle>Slides Menu</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Progress Section */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Progress</h3>
              <span className="text-sm text-gray-600">
                {completedCount} / {totalSlides} completed
              </span>
            </div>
            <Progress
              value={(completedCount / totalSlides) * 100}
              className="h-2 [&>div]:bg-green-500"
            />
            <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
              <span>Current: Slide {index + 1}</span>
              <span>{Math.round((completedCount / totalSlides) * 100)}% Complete</span>
            </div>
          </div>

          {/* Mark Slide Complete */}
          {!isSlideCompleted(index) && (
            <Button
              onClick={() => markSlideAsCompleted(index)}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark Current Slide Complete
            </Button>
          )}

          {/* Slides List */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900">All Slides</h4>
            <div className="space-y-1 h-[66vh] overflow-y-auto">
              {slides.map((slide, slideIndex) => {
                const isCompleted = isSlideCompleted(slideIndex);
                const isCurrent = slideIndex === index;

                return (
                  <div
                    key={slideIndex}
                    className={`flex items-center p-3 rounded-lg border transition-colors ${
                      isCurrent
                        ? "bg-blue-50 border-blue-200"
                        : "bg-white border-gray-200 hover:bg-gray-50 cursor-pointer"
                    }`}
                    onClick={() => goToSlide(slideIndex)}
                  >
                    <div className="flex-shrink-0 mr-3">
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : isCurrent ? (
                        <Play className="h-5 w-5 text-blue-500" />
                      ) : (
                        <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h5
                          className={`text-sm font-medium truncate ${
                            isCurrent
                              ? "text-blue-900"
                              : "text-gray-900"
                          }`}
                        >
                          {slide.title || `Slide ${slideIndex + 1}`}
                        </h5>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            isCurrent
                              ? "bg-blue-100 text-blue-800"
                              : isCompleted
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {slideIndex + 1}
                        </span>
                      </div>
                      {slide.caption && (
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {slide.caption}
                        </p>
                      )}
                    </div>
                    {!isCurrent && (
                      <ChevronRight className="h-4 w-4 text-gray-400 ml-2" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
