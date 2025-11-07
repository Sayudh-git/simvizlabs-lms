'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import useModuleProgress from '@/hooks/useModuleProgress';

const ModuleNavigation = ({ 
  courseId, 
  moduleId, 
  onModuleCompleted,
  className = "" 
}) => {
  const { toast } = useToast();
  const {
    isLoading,
    canNavigateNext,
    canNavigatePrev,
    isCurrentModuleCompleted,
    markModuleCompleted,
    navigateToNext,
    navigateToPrev,
    currentModuleIndex
  } = useModuleProgress(courseId, moduleId);

  const handleNextClick = () => {
    if (!canNavigateNext) {
      toast({
        title: "Module Locked",
        description: "Please complete the previous module before continuing.",
        variant: "warning",
      });
      return;
    }

    const success = navigateToNext();
    if (success) {
      toast({
        title: "Navigating to Next Module",
        description: "Moving to the next module...",
        variant: "default",
      });
    }
  };

  const handlePrevClick = () => {
    if (!canNavigatePrev) {
      toast({
        title: "Cannot Go Back",
        description: "This is the first module.",
        variant: "warning",
      });
      return;
    }

    const success = navigateToPrev();
    if (success) {
      toast({
        title: "Navigating to Previous Module",
        description: "Moving to the previous module...",
        variant: "default",
      });
    }
  };

  const handleMarkCompleted = () => {
    if (isCurrentModuleCompleted) {
      toast({
        title: "Already Completed",
        description: "This module is already marked as completed.",
        variant: "default",
      });
      return;
    }

    markModuleCompleted();
    
    // Call the callback if provided
    if (onModuleCompleted) {
      onModuleCompleted(currentModuleIndex);
    }

    toast({
      title: "Module Completed! 🎉",
      description: "Great job! You can now proceed to the next module.",
      variant: "success",
    });
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      {/* Module Status */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          {isCurrentModuleCompleted ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
          )}
          <span className="text-sm font-medium text-gray-700">
            Module {currentModuleIndex + 1}
          </span>
        </div>
        
        {isCurrentModuleCompleted && (
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            Completed
          </span>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center space-x-3">
        {/* Mark as Completed Button */}
        {!isCurrentModuleCompleted && (
          <Button
            onClick={handleMarkCompleted}
            variant="outline"
            size="sm"
            className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
          >
            Mark as Completed
          </Button>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-2">
          {/* Back Button */}
          <Button
            onClick={handlePrevClick}
            disabled={!canNavigatePrev}
            variant="outline"
            size="sm"
            className="flex items-center space-x-1"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>

          {/* Next Button */}
          <Button
            onClick={handleNextClick}
            disabled={!canNavigateNext}
            variant="default"
            size="sm"
            className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Lock Indicator for Next Module */}
      {!canNavigateNext && (
        <div className="flex items-center space-x-1 text-gray-500">
          <Lock className="h-4 w-4" />
          <span className="text-xs">Next module locked</span>
        </div>
      )}
    </div>
  );
};

export default ModuleNavigation;
