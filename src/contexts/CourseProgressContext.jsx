'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  getCourseProgress, 
  saveCourseProgress, 
  getCourseProgressById,
  clearCourseProgress,
  getProgressDetails,
  updateProgressDetails,
  markArticleCompleted as markArticleCompletedUtil,
  markModuleCompleted as markModuleCompletedUtil,
  markSlideshowCompleted as markSlideshowCompletedUtil,
  clearProgressDetails,
} from '@/lib/courseProgress';

const CourseProgressContext = createContext();

export const useCourseProgress = () => {
  const context = useContext(CourseProgressContext);
  if (!context) {
    throw new Error('useCourseProgress must be used within a CourseProgressProvider');
  }
  return context;
};

export const CourseProgressProvider = ({ children }) => {
  const [courseProgress, setCourseProgress] = useState({});
  const [completedModules, setCompletedModules] = useState({});
  const [completedArticles, setCompletedArticles] = useState({});
  const [completedSlideshows, setCompletedSlideshows] = useState({});
  // const [percntCompleted, setPercntCompleted] = useState(0);

  // Initialize from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const progress = getCourseProgress();
      setCourseProgress(progress);
      
      // Initialize completed modules, articles, and slideshows from localStorage
      const completedModulesData = {};
      const completedArticlesData = {};
      const completedSlideshowsData = {};
      const progressDetails = getProgressDetails();
      // const percntCompletedData = getPercentageCompleted();
      console.log("progressDetails", progressDetails);
      
      Object.keys(progress).forEach(courseId => {
        const details = progressDetails.find(detail => detail.moduleId === courseId);
        console.log("details", details);
        if (details) {
          completedModulesData[courseId] = details.completedModules || [];
          completedArticlesData[courseId] = details.completedArticles || [];
          completedSlideshowsData[courseId] = details.completedSlideshows || [];
        }
      });
      // setPercntCompleted(percntCompletedData);
      setCompletedModules(completedModulesData);
      setCompletedArticles(completedArticlesData);
      setCompletedSlideshows(completedSlideshowsData);
    }
  }, []);

  // Check if all articles in a module are completed and mark module as completed
  const checkAndMarkModuleCompleted = useCallback((courseId, moduleId, allArticles) => {
    const moduleArticles = allArticles.filter(article => article.module_id === moduleId);
    if (moduleArticles.length === 0) return;
    
    const moduleArticleKeys = moduleArticles.map(article => `${courseId}_${moduleId}_${article.id}`);
    
    // Calculate module index from moduleId (e.g., "md1" -> 0, "md2" -> 1)
    const getModuleIndex = (moduleId) => {
      if (!moduleId) return -1;
      const match = String(moduleId).match(/md(\d+)/);
      return match ? parseInt(match[1]) - 1 : -1; // Convert to 0-based index
    };
    
    const moduleIndex = getModuleIndex(moduleId);
    if (moduleIndex < 0) {
      console.warn("checkAndMarkModuleCompleted: invalid moduleId", moduleId);
      return;
    }
    
    // Use functional update to get current state
    setCompletedArticles(prev => {
      const completedModuleArticles = prev[courseId] || [];
      
      // Check if all articles in the module are completed
      const allCompleted = moduleArticleKeys.every(articleKey => completedModuleArticles.includes(articleKey));
      console.log("AllcompletedORNot",allCompleted)
      
      if (allCompleted) {
        // Mark module as completed - update state immediately
        setCompletedModules(prevModules => {
          const newCompleted = { ...prevModules };
          if (!newCompleted[courseId]) {
            newCompleted[courseId] = [];
          }
          if (!newCompleted[courseId].includes(moduleIndex)) {
            newCompleted[courseId] = [...newCompleted[courseId], moduleIndex];
            
            // Use centralized utility to update localStorage
            markModuleCompletedUtil(courseId, moduleIndex);
            
            // Also save as userLastModule for the new navigation system
            localStorage.setItem(`userLastModule_${courseId}`, `md${moduleIndex + 1}`);
          }
          return newCompleted;
        });
      }
      
      return prev; // Return unchanged state
    });
  }, []);

  // Mark an article as completed
  const markArticleCompleted = useCallback((courseId, moduleId, articleId, allArticles = null) => {
    if (typeof window === 'undefined') return;
    
    const articleKey = `${courseId}_${moduleId}_${articleId}`;
    
    // Update completed articles and save to localStorage in one operation
    setCompletedArticles(prev => {
      const newCompleted = { ...prev };
      if (!newCompleted[courseId]) {
        newCompleted[courseId] = [];
      }
      if (!newCompleted[courseId].includes(articleKey)) {
        newCompleted[courseId] = [...newCompleted[courseId], articleKey];
        
        // Use centralized utility to update localStorage
        markArticleCompletedUtil(courseId, moduleId, articleId);
        
        // If allArticles is provided, check if module should be marked as completed immediately
        // We need to check after state update, so we use the updated newCompleted array
        if (allArticles) {
          const moduleArticles = allArticles.filter(article => article.module_id === moduleId);
          const moduleArticleKeys = moduleArticles.map(article => `${courseId}_${moduleId}_${article.id}`);
          const completedModuleArticles = newCompleted[courseId] || [];
          const allCompleted = moduleArticleKeys.every(articleKey => completedModuleArticles.includes(articleKey));
          
          if (allCompleted) {
            // Calculate module index
            const getModuleIndex = (moduleId) => {
              if (!moduleId) return -1;
              const match = String(moduleId).match(/md(\d+)/);
              return match ? parseInt(match[1]) - 1 : -1;
            };
            const moduleIndex = getModuleIndex(moduleId);
            
            if (moduleIndex >= 0) {
              // Mark module as completed immediately
              setCompletedModules(prevModules => {
                const newCompletedModules = { ...prevModules };
                if (!newCompletedModules[courseId]) {
                  newCompletedModules[courseId] = [];
                }
                if (!newCompletedModules[courseId].includes(moduleIndex)) {
                  newCompletedModules[courseId] = [...newCompletedModules[courseId], moduleIndex];
                  markModuleCompletedUtil(courseId, moduleIndex);
                  localStorage.setItem(`userLastModule_${courseId}`, `md${moduleIndex + 1}`);
                }
                return newCompletedModules;
              });
            }
          }
        }
      }
      return newCompleted;
    });
    
    // Save course progress
    saveCourseProgress(courseId, moduleId, articleId);
    
    // Update course progress state
    setCourseProgress(prev => ({
      ...prev,
      [courseId]: {
        lastModuleId: moduleId,
        lastArticleId: articleId,
        timestamp: Date.now()
      }
    }));
  }, []);

  // Mark a module as completed
  const markModuleCompleted = useCallback((courseId, moduleIndex) => {
    if (typeof window === 'undefined') return;
    
    setCompletedModules(prev => {
      const newCompleted = { ...prev };
      if (!newCompleted[courseId]) {
        newCompleted[courseId] = [];
      }
      if (!newCompleted[courseId].includes(moduleIndex)) {
        newCompleted[courseId] = [...newCompleted[courseId], moduleIndex];
        
        // Use centralized utility to update localStorage
        markModuleCompletedUtil(courseId, moduleIndex);
        
        // Also save as userLastModule for the new navigation system
        localStorage.setItem(`userLastModule_${courseId}`, `md${moduleIndex + 1}`);
      }
      return newCompleted;
    });
  }, []);

  // Check if an article is completed
  const isArticleCompleted = useCallback((courseId, moduleId, articleId) => {
    const articleKey = `${courseId}_${moduleId}_${articleId}`;
    return completedArticles[courseId]?.includes(articleKey) || false;
  }, [completedArticles]);

  // Check if a module is completed
  const isModuleCompleted = useCallback((courseId, moduleIndex) => {
    return completedModules[courseId]?.includes(moduleIndex) || false;
  }, [completedModules]);

  // Check if a module is unlocked (always return true - unlock functionality removed)
  const isModuleUnlocked = useCallback((courseId, moduleIndex) => {
    return true;
  }, []);

  // Check if an article is unlocked (always return true - unlock functionality removed)
  const isArticleUnlocked = useCallback((courseId, moduleIndex) => {
    return true;
  }, []);

  // Mark a slideshow as completed
  const markSlideshowCompleted = useCallback((courseId, moduleId, articleId) => {
    if (typeof window === 'undefined') return;
    
    const slideshowKey = `${courseId}_${moduleId}_${articleId}`;
    
    setCompletedSlideshows(prev => {
      const newCompleted = { ...prev };
      if (!newCompleted[courseId]) {
        newCompleted[courseId] = [];
      }
      if (!newCompleted[courseId].includes(slideshowKey)) {
        newCompleted[courseId] = [...newCompleted[courseId], slideshowKey];
        
        // Use centralized utility to update localStorage
        markSlideshowCompletedUtil(courseId, moduleId, articleId);
      }
      return newCompleted;
    });
  }, []);

  // Check if a slideshow is completed
  const isSlideshowCompleted = useCallback((courseId, moduleId, articleId) => {
    const slideshowKey = `${courseId}_${moduleId}_${articleId}`;
    return completedSlideshows[courseId]?.includes(slideshowKey) || false;
  }, [completedSlideshows]);

  // Get completed modules for a course
  const getCompletedModules = useCallback((courseId) => {
    return completedModules[courseId] || [];
  }, [completedModules]);

  // Get completed articles for a course
  const getCompletedArticles = useCallback((courseId) => {
    return completedArticles[courseId] || [];
  }, [completedArticles]);

  // Check if user can access a specific module (always return true - unlock functionality removed)
  const canAccessModule = useCallback((courseId, moduleIndex) => {
    return true;
  }, []);

  // Clear progress for a course
  const clearCourseProgressData = useCallback((courseId) => {
    if (typeof window !== 'undefined') {
      clearCourseProgress(courseId);
      
      // Use centralized utility to clear progress details
      clearProgressDetails(courseId);
      
      // Keep legacy cleanup for backward compatibility
      localStorage.removeItem(`completedModules_${courseId}`);
      localStorage.removeItem(`completedArticles_${courseId}`);
      localStorage.removeItem(`completedSlideshows_${courseId}`);
      localStorage.removeItem(`userLastModule_${courseId}`);
      localStorage.removeItem(`userAttemptedModule_${courseId}`);
    }
    
    setCourseProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[courseId];
      return newProgress;
    });
    
    setCompletedModules(prev => {
      const newCompleted = { ...prev };
      delete newCompleted[courseId];
      return newCompleted;
    });
    
    setCompletedArticles(prev => {
      const newCompleted = { ...prev };
      delete newCompleted[courseId];
      return newCompleted;
    });
    
    setCompletedSlideshows(prev => {
      const newCompleted = { ...prev };
      delete newCompleted[courseId];
      return newCompleted;
    });
  }, []);

  // Get the next available article in a module or first article of next module
  const getNextAvailableArticle = useCallback((courseId, moduleId, currentArticleId, allArticles) => {
    const moduleArticles = allArticles.filter(article => article.module_id === moduleId);
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

    const currentIndex = sortedArticles.findIndex(article => String(article.id) === String(currentArticleId));
    
    // Return the next article if it exists within the current module
    if (currentIndex < sortedArticles.length - 1) {
      return sortedArticles[currentIndex + 1];
    }
    
    // If we're at the last article of the current module, check for next module
    const nextModuleArticle = getNextModuleFirstArticle(courseId, moduleId, allArticles);
    return nextModuleArticle;
  }, []);

  // Helper function to get the first article of the next module
  const getNextModuleFirstArticle = useCallback(
    (courseId, currentModuleId, allArticles) => {
      if (!currentModuleId) {
        console.warn("getNextModuleFirstArticle: currentModuleId is missing");
        return null;
      }
  
      // Extract module number safely
      const currentModuleNumber = parseInt(
        String(currentModuleId).replace("md", ""),
        10
      );
  
      if (isNaN(currentModuleNumber)) {
        console.warn("getNextModuleFirstArticle: invalid moduleId", currentModuleId);
        return null;
      }
  
      const nextModuleNumber = currentModuleNumber + 1;
      const nextModuleId = `md${nextModuleNumber}`;
  
      // Find articles in the next module
      const nextModuleArticles = allArticles.filter(
        (article) => article.module_id === nextModuleId
      );
  
      if (nextModuleArticles.length === 0) {
        return null; // No next module exists
      }
  
      // Sort articles by hierarchical id (e.g. 1.7 < 1.10 < 1.11)
      const sortedNextModuleArticles = [...nextModuleArticles].sort((a, b) => {
        const aParts = a.id.split(".").map(Number);
        const bParts = b.id.split(".").map(Number);
  
        for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
          const aVal = aParts[i] || 0;
          const bVal = bParts[i] || 0;
          if (aVal !== bVal) return aVal - bVal;
        }
        return 0;
      });
  
      return sortedNextModuleArticles[0];
    },
    []
  );

  // Get the previous available article in a module
  const getPreviousAvailableArticle = useCallback((courseId, moduleId, currentArticleId, allArticles) => {
    const moduleArticles = allArticles.filter(article => article.module_id === moduleId);
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

    const currentIndex = sortedArticles.findIndex(article => String(article.id) === String(currentArticleId));
    
    // Return the previous article if it exists (simple sequential navigation)
    if (currentIndex > 0) {
      return sortedArticles[currentIndex - 1];
    }
    
    return null;
  }, []);

  const value = {
    courseProgress,
    completedModules,
    completedArticles,
    completedSlideshows,
    // percntCompleted,
    markArticleCompleted,
    markModuleCompleted,
    markSlideshowCompleted,
    checkAndMarkModuleCompleted,
    isArticleCompleted,
    isModuleCompleted,
    isModuleUnlocked,
    isArticleUnlocked,
    isSlideshowCompleted,
    getCompletedModules,
    getCompletedArticles,
    canAccessModule,
    clearCourseProgressData,
    getNextAvailableArticle,
    getPreviousAvailableArticle
  };

  return (
    <CourseProgressContext.Provider value={value}>
      {children}
    </CourseProgressContext.Provider>
  );
};
