'use client';
import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import ModuleSidebar from './sidebar';
import ModuleNavigation from '@/components/ModuleNavigation';
import useModuleProgress from '@/hooks/useModuleProgress';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import WormLoader from '@/app/components/WormLoader';

export default function ModulePage({ params }) {
  const router = useRouter();
  const pathname = usePathname();
  const paramsHook = React.use(params);
  const { toast } = useToast();
  
  const courseId = paramsHook.courses;
  const moduleId = paramsHook.module;

  const {
    isLoading,
    handleUnauthorizedAccess,
    currentModuleIndex
  } = useModuleProgress(courseId, moduleId);

  // Check for unauthorized access on component mount
  useEffect(() => {
    if (!isLoading && moduleId) {
      const accessCheck = handleUnauthorizedAccess(moduleId);
      
      if (accessCheck.unauthorized) {
        toast({
          title: "Access Restricted",
          description: accessCheck.message,
          variant: "warning",
        });
        
        // The hook will handle the redirect automatically
        return;
      }
    }
  }, [isLoading, moduleId, handleUnauthorizedAccess, toast]);

  // Handle module completion
  const handleModuleCompleted = (completedModuleIndex) => {
    console.log(`Module ${completedModuleIndex + 1} completed!`);
    // Additional logic can be added here if needed
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <WormLoader />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen">
      <ModuleSidebar>
        <div className="flex-1 flex flex-col">
          {/* Module Navigation Header */}
          <div className="border-b border-gray-200 bg-gray-50">
            <ModuleNavigation
              courseId={courseId}
              moduleId={moduleId}
              onModuleCompleted={handleModuleCompleted}
              className="mx-4 my-3"
            />
          </div>

          {/* Module Content Area */}
          <div className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Module {currentModuleIndex + 1} Content
                </h1>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 mb-6">
                    Welcome to Module {currentModuleIndex + 1}! This is where the module content will be displayed.
                  </p>
                  
                  {/* Sample content - replace with actual module content */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      Module Overview
                    </h3>
                    <p className="text-blue-800">
                      This module contains the essential learning materials for Module {currentModuleIndex + 1}.
                      Work through the content systematically to ensure you understand all concepts.
                    </p>
                  </div>

                  {/* Sample learning objectives */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Learning Objectives
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        Understand the key concepts of Module {currentModuleIndex + 1}
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        Apply the learned concepts in practical scenarios
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        Complete all module activities and assessments
                      </li>
                    </ul>
                  </div>

                  {/* Progress indicator */}
                  <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-900">Ready to Continue?</h4>
                        <p className="text-green-800 text-sm">
                          Use the navigation controls above to mark this module as completed and proceed to the next module.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModuleSidebar>
      
      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}
