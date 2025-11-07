import { useCourseProgress } from "@/contexts/CourseProgressContext";
import {useState,useEffect,useCallback} from "react";
import { useRouter } from "next/navigation";
import { timestampBasedSlides } from "@/tempData/slides";
const useNavigationState=({courseId,moduleId,id,courseDetails})=>{
  const router = useRouter();

    const {
        getNextAvailableArticle,
        getPreviousAvailableArticle,
        isSlideshowCompleted,
        markArticleCompleted,
        checkAndMarkModuleCompleted,
        markSlideshowCompleted
       } = useCourseProgress();

      const moduleArticles = courseDetails?.[0]?.articles?.filter(article => article.module_id === moduleId) || [];
      

      const sortedArticles = moduleArticles.sort((a, b) => {
        const aParts = a.id.split('.').map(Number);
        const bParts = b.id.split('.').map(Number);
        for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
          const aVal = aParts[i] || 0;
          const bVal = bParts[i] || 0;
          if (aVal !== bVal) return aVal - bVal;
        }
        return 0;
      });
    
      const currentIndex = sortedArticles.findIndex(article => String(article.id) === String(id));
      const nextArticle = getNextAvailableArticle(courseId, moduleId, id, courseDetails?.[0]?.articles || []);
      const prevArticle = getPreviousAvailableArticle(courseId, moduleId, id, courseDetails?.[0]?.articles || []);
    
      const filteredArticleData = sortedArticles.filter(
        article => String(article.id) === String(id) && article.doc_type !== "article"
      );

     
      const isSlideshow = filteredArticleData[0]?.doc_type === "slides";
      const wasCompleted = isSlideshowCompleted(courseId, moduleId, id);
      const [allSlidesCompleted, setAllSlidesCompleted] = useState(wasCompleted);    
      const canNavigateNext = isSlideshow ? allSlidesCompleted : !!nextArticle;
      const canNavigatePrev = !!prevArticle;

      const handleNextModule = useCallback(() => {
        if (!nextArticle) return router.push(`/dashboard/${courseId}`);
      
        if (nextArticle.module_id !== moduleId) {
          router.push(`/dashboard/${courseId}/${nextArticle.module_id}/${nextArticle.module_id}?id=${nextArticle.id}`);
        } else {
          router.push(`/dashboard/${courseId}/${moduleId}/${moduleId}?id=${nextArticle.id}`);
        }
      }, [nextArticle, courseId, moduleId, router]);
      
      const markCurrentCompleted = () => {
        if (courseId && moduleId && id) {
          if (isSlideshow) markSlideshowCompleted(courseId, moduleId, id);
          markArticleCompleted(courseId, moduleId, id, courseDetails?.[0]?.articles || null);
        }
      };

      useEffect(() => {
        if (courseDetails?.[0]?.articles && courseId && moduleId) {
          checkAndMarkModuleCompleted(courseId, moduleId, courseDetails[0].articles);
        }
      }, [courseDetails, courseId, moduleId]);
      

      const handleNavigation = (newId=id, doc_type) => {
        // Mark article as completed before navigating
        markArticleCompleted(courseId, moduleId, newId, courseDetails?.[0]?.articles || null);
        
        // Check if we're navigating to the next article and if it's in a different module
        if (newId === nextArticle?.id && nextArticle?.module_id !== moduleId) {
          // Navigate to the next module
          router.push(`/dashboard/${courseId}/${nextArticle.module_id}/${nextArticle.module_id}?id=${newId}`);
        } else {
          // Stay in current module
          router.push(`/dashboard/${courseId}/${moduleId}/${moduleId}?id=${newId}`);
        }
      };
      
      return {
        currentIndex,
        nextArticle,
        prevArticle,
        canNavigateNext,
        moduleArticles,
        canNavigatePrev,
        isSlideshow,
        allSlidesCompleted,
        setAllSlidesCompleted,
        handleNextModule,
        markCurrentCompleted,
        markArticleCompleted,
        handleNavigation,
        filteredArticleData,
         };
    }
        
export default useNavigationState