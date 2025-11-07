'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const useModuleProgress = (courseId, moduleId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [canNavigateNext, setCanNavigateNext] = useState(false);
  const [canNavigatePrev, setCanNavigatePrev] = useState(false);
  const [isCurrentModuleCompleted, setIsCurrentModuleCompleted] = useState(false);
  const [lastVisitedModule, setLastVisitedModule] = useState(null);
  const [attemptedModule, setAttemptedModule] = useState(null);
  const router = useRouter();

  // Get module index from moduleId (assuming format like "md1", "md2", etc.)
  const getModuleIndex = (moduleId) => {
    if (!moduleId) return -1;
    const match = moduleId.match(/md(\d+)/);
    return match ? parseInt(match[1]) - 1 : -1; // Convert to 0-based index
  };

  const currentModuleIndex = getModuleIndex(moduleId);

  // Load progress from localStorage
  const loadProgress = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      const lastModule = localStorage.getItem(`userLastModule_${courseId}`);
      const attemptedModule = localStorage.getItem(`userAttemptedModule_${courseId}`);
      const completedModules = localStorage.getItem(`completedModules_${courseId}`);
      
      setLastVisitedModule(lastModule);
      setAttemptedModule(attemptedModule);
      
      if (completedModules) {
        const completed = JSON.parse(completedModules);
        const isCompleted = completed.includes(currentModuleIndex);
        setIsCurrentModuleCompleted(isCompleted);
        
        // Check if previous module is completed (for Next button)
        const prevModuleCompleted = currentModuleIndex === 0 || completed.includes(currentModuleIndex - 1);
        setCanNavigateNext(prevModuleCompleted);
        
        // Check if we can go back (not first module)
        setCanNavigatePrev(currentModuleIndex > 0);
      } else {
        // No completed modules, only first module is accessible
        setCanNavigateNext(currentModuleIndex === 0);
        setCanNavigatePrev(currentModuleIndex > 0);
        setIsCurrentModuleCompleted(false);
      }
    } catch (error) {
      console.error('Error loading module progress:', error);
    } finally {
      setIsLoading(false);
    }
  }, [courseId, currentModuleIndex]);

  // Save progress to localStorage
  const saveProgress = useCallback((key, value) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(`${key}_${courseId}`, value);
  }, [courseId]);

  // Mark module as completed
  const markModuleCompleted = useCallback(() => {
    if (typeof window === 'undefined' || currentModuleIndex < 0) return;

    try {
      const completedModules = localStorage.getItem(`completedModules_${courseId}`);
      let completed = completedModules ? JSON.parse(completedModules) : [];
      
      if (!completed.includes(currentModuleIndex)) {
        completed.push(currentModuleIndex);
        localStorage.setItem(`completedModules_${courseId}`, JSON.stringify(completed));
        setIsCurrentModuleCompleted(true);
        
        // Update navigation permissions
        setCanNavigateNext(true); // Can always go next after completing current module
        
        // Enable next module if it exists
        const nextModuleIndex = currentModuleIndex + 1;
        const totalModules = 5; // Assuming 5 modules total (md1-md5)
        if (nextModuleIndex < totalModules) {
          // Enable navigation to next module
          setCanNavigateNext(true);
        }
      }
    } catch (error) {
      console.error('Error marking module as completed:', error);
    }
  }, [courseId, currentModuleIndex]);

  // Check if user can access a specific module
  const canAccessModule = useCallback((targetModuleIndex) => {
    if (targetModuleIndex < 0) return false;
    if (targetModuleIndex === 0) return true; // First module is always accessible
    
    try {
      const completedModules = localStorage.getItem(`completedModules_${courseId}`);
      if (!completedModules) return false;
      
      const completed = JSON.parse(completedModules);
      return completed.includes(targetModuleIndex - 1); // Previous module must be completed
    } catch (error) {
      console.error('Error checking module access:', error);
      return false;
    }
  }, [courseId]);

  // Navigate to next module
  const navigateToNext = useCallback(() => {
    if (!canNavigateNext) return false;
    
    const nextModuleIndex = currentModuleIndex + 1;
    const nextModuleId = `md${nextModuleIndex + 1}`;
    
    // Save current module as last visited
    saveProgress('userLastModule', moduleId);
    
    // Navigate to next module
    router.push(`/dashboard/${courseId}/${nextModuleId}`);
    return true;
  }, [canNavigateNext, currentModuleIndex, courseId, moduleId, router, saveProgress]);

  // Navigate to previous module
  const navigateToPrev = useCallback(() => {
    if (!canNavigatePrev) return false;
    
    const prevModuleIndex = currentModuleIndex - 1;
    const prevModuleId = `md${prevModuleIndex + 1}`;
    
    // Save current module as last visited
    saveProgress('userLastModule', moduleId);
    
    // Navigate to previous module
    router.push(`/dashboard/${courseId}/${prevModuleId}`);
    return true;
  }, [canNavigatePrev, currentModuleIndex, courseId, moduleId, router, saveProgress]);

  // Handle unauthorized module access attempt
  const handleUnauthorizedAccess = useCallback((targetModuleId) => {
    const targetModuleIndex = getModuleIndex(targetModuleId);
    
    if (!canAccessModule(targetModuleIndex)) {
      // Save attempted module
      saveProgress('userAttemptedModule', targetModuleId);
      
      // Find the last completed module to redirect to
      try {
        const completedModules = localStorage.getItem(`completedModules_${courseId}`);
        let completed = completedModules ? JSON.parse(completedModules) : [];
        
        // Find the highest completed module index
        const highestCompleted = completed.length > 0 ? Math.max(...completed) : -1;
        const redirectModuleId = highestCompleted >= 0 ? `md${highestCompleted + 1}` : 'md1';
        
        // Redirect to the appropriate module
        router.push(`/dashboard/${courseId}/${redirectModuleId}`);
        
        return {
          unauthorized: true,
          redirectTo: redirectModuleId,
          message: 'Please complete the previous module before continuing.'
        };
      } catch (error) {
        console.error('Error handling unauthorized access:', error);
        router.push(`/dashboard/${courseId}/md1`);
        return {
          unauthorized: true,
          redirectTo: 'md1',
          message: 'Please complete the previous module before continuing.'
        };
      }
    }
    
    return { unauthorized: false };
  }, [canAccessModule, courseId, router, saveProgress]);

  // Load progress on mount and when dependencies change
  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  return {
    isLoading,
    canNavigateNext,
    canNavigatePrev,
    isCurrentModuleCompleted,
    lastVisitedModule,
    attemptedModule,
    markModuleCompleted,
    navigateToNext,
    navigateToPrev,
    canAccessModule,
    handleUnauthorizedAccess,
    getModuleIndex,
    currentModuleIndex
  };
};

export default useModuleProgress;
