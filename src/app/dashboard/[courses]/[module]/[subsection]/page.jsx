'use client'
import { useGetCourseDetails, useGetCourses  } from "@/hooks/useCourses";
import { useSearchParams, useRouter } from "next/navigation";
import Article from "@/app/components/Article";
import React, { useEffect, useRef } from "react";
import TestPlayer from "../component/Player";
import { SidebarTrigger } from "@/components/ui/sidebar";
import FigmaComponent from "../component/Figma";
import QuizComponent from "@/app/components/Quiz";
import Exercise from "@/app/components/Exercise";
import WormLoader from "@/app/components/WormLoader";
import ImageAudioCarousel from "@/app/components/ImageAudioCarousel";
import MediaChromeVideoPlayer from "@/app/components/MediaChromeVideoPlayer";
import { useCourseProgress } from "@/contexts/CourseProgressContext.jsx";
import useArticleAccess from "@/hooks/useArticleAccess";
import useNavigationState from "@/hooks/useNavigationState"
import ArticleAccessRestricted from "@/components/ArticleAccessRestricted";
import { timestampBasedSlides } from "@/tempData/slides";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import ThreeDModel from "../../../../components/ThreeDModel";
import NavigationButtons from '@/app/components/NavigationButtons';
import { markModuleCompleted } from "@/lib/courseProgress";

export default function Page({params}) {
  const router = useRouter();
  const searchparams = useSearchParams();
  const paramsHook = React.use(params);
  const courseId = paramsHook.courses;
  const moduleId = paramsHook.module;
  const id = searchparams.get("id");
  
  // Use refs to track if operations have been performed
  const articleMarkedRef = useRef(false);
  const moduleCheckedRef = useRef(false);
  // const [allSlidesCompleted, setAllSlidesCompleted] = React.useState(false);
  const {
    data: courses,
    isLoading: isCoursesLoading,
    error: coursesError,
  } = useGetCourses();

  const {
    data: courseDetails,
    isLoading: isDetailsLoading,
    error: detailsError,
  } = useGetCourseDetails(courseId);

  // Article access validation
  const {
    isAccessGranted,
    isLoading: isAccessLoading,
    previousArticle,
    currentArticle,
    navigateToPreviousArticle,
    navigateToFirstArticle
  } = useArticleAccess(courseId, moduleId, id, courseDetails?.[0]?.articles, courses);

  const {
    currentIndex,
    nextArticle,
    prevArticle,
    canNavigateNext,
    canNavigatePrev,
    isSlideshow,
    allSlidesCompleted,
    moduleArticles,
    filteredArticleData,
    handleNextModule,
    setAllSlidesCompleted,
    markCurrentCompleted,
    markArticleCompleted,
    handleNavigation
  } = useNavigationState({ courseId, moduleId, id, courseDetails });
  


  // Use Context API for course progress management
  const { 
    // markArticleCompleted,
    // isArticleUnlocked,
    // getNextAvailableArticle,
    // getPreviousAvailableArticle,
    // isModuleUnlocked,
    // checkAndMarkModuleCompleted,
    // // markSlideshowCompleted,
    // isSlideshowCompleted
  } = useCourseProgress();
  
  // Handle when all slides in slideshow are completed
  const handleAllSlidesCompleted = React.useCallback(() => {
    setAllSlidesCompleted(true);
    // Mark the slideshow and article as completed when all slides are done
    if (courseId && moduleId && id) {
      markCurrentCompleted();
      // markSlideshowCompleted(courseId, moduleId, id);
      // markArticleCompleted(courseId, moduleId, id);
    }
  }, [courseId, moduleId, id,markCurrentCompleted]);

  // Handle next module navigation


  

  // const handleNextModule = React.useCallback(() => {
  //   // Check if courseDetails is available
  //   if (!courseDetails || !courseDetails[0] || !courseDetails[0].articles) {
  //     console.log("Course details not available yet");
  //     return;
  //   }
    
  //   const nextArticle = getNextAvailableArticle(courseId, moduleId, id, courseDetails[0].articles);
  //   if (nextArticle && nextArticle.module_id !== moduleId) {
  //     // Navigate to the next module
  //     router.push(`/dashboard/${courseId}/${nextArticle.module_id}/${nextArticle.module_id}?id=${nextArticle.id}`);
  //   } else {
  //     // No next module available, just exit
  //     router.push(`/dashboard/${courseId}`);
  //   }
  // }, [courseDetails, courseId, moduleId, id, getNextAvailableArticle, router]);
  
  // Save progress when component loads (only if access is granted)
  useEffect(() => {
    if (courseId && moduleId && id && !articleMarkedRef.current && isAccessGranted && courseDetails) {
      const currentArticle = courseDetails[0]?.articles?.find(article => String(article.id) === String(id));
      
      if (currentArticle) {
        // Handle completion based on doc_type
        switch (currentArticle.doc_type) {
          case "article":
          case "3d":
            // Don't mark as completed automatically - wait for user to actually complete
            // This should be handled by the respective components when user finishes reading/interacting
            break;
          case "slides":
            // Don't mark as completed - wait for all slides to be completed
            // This is handled by the ImageAudioCarousel component
            break;
          case "video":
          case "videoplayer":
            // Don't mark as completed - wait for video to finish
            // This will be handled by the video component
            break;
          case "quiz":
            // Don't mark as completed - wait for quiz submission and result
            // This will be handled by the quiz component
            break;
          case "exercise":
          case "playground":
            // Don't mark as completed - wait for completion
            // This will be handled by the respective components
            break;
          default:
            // For unknown types, don't mark as completed automatically
            // Let the respective components handle completion
            break;
        }
      }
    }
  }, [courseId, moduleId, id, markArticleCompleted, isAccessGranted, courseDetails]);

  // Check for module completion when course details are loaded
  // useEffect(() => {
  //   if (courseDetails && courseDetails[0] && courseDetails[0].articles && courseId && moduleId && !moduleCheckedRef.current) {
  //     checkAndMarkModuleCompleted(courseId, moduleId, courseDetails[0].articles);
  //     moduleCheckedRef.current = true;
  //   }
  // }, [courseDetails, courseId, moduleId, checkAndMarkModuleCompleted]);

  // Check if slideshow was already completed
  // useEffect(() => {
  //   if (courseId && moduleId && id) {
  //     const wasCompleted = isSlideshowCompleted(courseId, moduleId, id);
  //     setAllSlidesCompleted(wasCompleted);
  //   }
  // }, [courseId, moduleId, id, isSlideshowCompleted]);

  // Show toast for module transition
  // useEffect(() => {
  //   if (courseDetails && courseDetails[0] && courseDetails[0].articles) {
  //     const nextArticle = getNextAvailableArticle(courseId, moduleId, id, courseDetails[0].articles);
  //     if (nextArticle && nextArticle.module_id !== moduleId) {
  //       toast.success(`Next: Moving to ${nextArticle.module_id.toUpperCase()}`, {
  //         description: nextArticle.title,
  //         duration: 4000,
  //         position:'top-right'
  //       });
  //     }
  //   }
  // }, [courseDetails, courseId, moduleId, id, getNextAvailableArticle]);

  if (isCoursesLoading || isDetailsLoading || isAccessLoading) {
    return <div className="flex justify-center items-center h-screen"><WormLoader /></div>;
  }

  // Show access restriction screen if access is not granted
  if (!isAccessGranted && courseDetails && courses) {
    return (
      <ArticleAccessRestricted
        currentArticle={currentArticle}
        previousArticle={previousArticle}
        onNavigateToPrevious={navigateToPreviousArticle}
        onNavigateToFirst={navigateToFirstArticle}
        courseId={courseId}
        moduleId={moduleId}
      />
    );
  }

  if (courseDetails && courses) {
    // const moduleArticles = courseDetails[0].articles.filter(article => article.module_id === moduleId);
    // const sortedArticles = moduleArticles.sort((a, b) => {
    //   const aParts = a.id.split('.').map(Number);
    //   const bParts = b.id.split('.').map(Number);
    //   for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    //     const aVal = aParts[i] || 0;
    //     const bVal = bParts[i] || 0;
    //     if (aVal !== bVal) return aVal - bVal;
    //   }
    //   return 0;
    // });

    // const currentIndex = sortedArticles.findIndex(article => String(article.id) === String(id));
    
    // Get next and previous articles using Context API
    // const nextArticle = getNextAvailableArticle(courseId, moduleId, id, courseDetails[0].articles);
    // const prevArticle = getPreviousAvailableArticle(courseId, moduleId, id, courseDetails[0].articles);
    
    // const filteredArticleData = moduleArticles.filter((article) => String(article.id) === String(id) && article.doc_type!="article");
    
    // For slideshow content, only enable next if all slides are completed
    // const isSlideshow = filteredArticleData[0]?.doc_type === "slides";
    // const canNavigateNext = isSlideshow ? allSlidesCompleted : !!nextArticle;
    // const canNavigatePrev = !!prevArticle;
    const courseTitle = courses.find((course) => course.c_id === courseId);
    const moduleTitle = courseTitle.modules.find((module) => module.id === moduleId);
    console.log(courseTitle,"courseTitle");
    console.log(moduleTitle,"moduleTitle");
    // console.log(courseDetails,"courseDetails");
    // console.log(filteredArticleData,"filteredArticleData");
    


    return (
      <>
        <Toaster />
        <div className="flex flex-1 flex-col px-4 py-8 text-[#344054] pt-0 overflow-hidden w-full">
        <div className="flex flex-row align-middle items-center mt-5">
          <SidebarTrigger className="" />
          <div className="flex justify-between w-full items-center align-middle">
            <h1 className="text-4xl font-bold my-3">{moduleTitle?.title}</h1>
            <div className="mx-12">

<NavigationButtons
  canNavigatePrev={canNavigatePrev}
  canNavigateNext={canNavigateNext}
  onNavigatePrev={() => handleNavigation(prevArticle?.id, prevArticle?.doc_type)}
  onNavigateNext={() => handleNavigation(nextArticle?.id, nextArticle?.doc_type)}
  nextLabel={nextArticle?.module_id !== moduleId ? 'NEXT MODULE' : 'NEXT'}
  isPresent={{prev:true,next:true}}
/>            </div>
          </div>
        </div>
        <hr className="mb-5" />
        
        {/* Show slideshow completion status */}
        {isSlideshow && (
          <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                {allSlidesCompleted ? (
                  <span className="flex items-center">
                    All slides completed! You can now proceed to the next section.
                  </span>
                ) : (
                  <span className="flex items-center">
                   Complete all slides to proceed to the next section.
                  </span>
                )}
              </span>
            </div>
          </div>
        )}

        
        {(() => {
          switch (filteredArticleData[0]?.doc_type) {
            case "article":
              return <Article 
                article={filteredArticleData[0]} 
                onArticleCompleted={() => markArticleCompleted(courseId, moduleId, id, courseDetails?.[0]?.articles || null)}
              />;
            case "3d":
              return <ThreeDModel 
                data={filteredArticleData[0]}
                onModelCompleted={() => markArticleCompleted(courseId, moduleId, id, courseDetails?.[0]?.articles || null)}
              />;
            case "videoplayer":
              return <TestPlayer 
                data={filteredArticleData[0]} 
                onVideoCompleted={() => markArticleCompleted(courseId, moduleId, id, courseDetails?.[0]?.articles || null)}
                isCompleted={false}
              />;
            case "video":
              return <MediaChromeVideoPlayer 
                data={filteredArticleData[0]} 
                onVideoCompleted={() => markArticleCompleted(courseId, moduleId, id, courseDetails?.[0]?.articles || null)}
                isCompleted={false}
              />;
            case "playground":
              return <FigmaComponent data={filteredArticleData[0]} />;
            case "quiz":
              return <QuizComponent 
                data={filteredArticleData[0]} 
                onQuizCompleted={() => markArticleCompleted(courseId, moduleId, id, courseDetails?.[0]?.articles || null)}
              />;
            case "exercise":
              return <Exercise data={filteredArticleData[0]} />;
            case "slides":
              return <ImageAudioCarousel 
                tempSlides={timestampBasedSlides} 
                onAllSlidesCompleted={handleAllSlidesCompleted} 
                onNextModule={handleNextModule}  
                courseId={courseId} 
                moduleId={moduleId} 
                id={id} 
                courseDetails={courseDetails}
              />
            default:
              return null;
          }
        })()}
        </div>
      </>
    );
  }
}
