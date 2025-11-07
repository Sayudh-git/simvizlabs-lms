'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

export default function TestModuleNavigation() {
  const router = useRouter();
  const { toast } = useToast();

  const handleNavigateToModule = (courseId, moduleId) => {
    router.push(`/dashboard/${courseId}/${moduleId}`);
  };

  const handleClearProgress = () => {
    if (typeof window !== 'undefined') {
      // Clear all progress for testing
      localStorage.removeItem('completedModules_general');
      localStorage.removeItem('userLastModule_general');
      localStorage.removeItem('userAttemptedModule_general');
      
      toast({
        title: "Progress Cleared",
        description: "All module progress has been reset for testing.",
        variant: "success",
      });
    }
  };

  const handleShowProgress = () => {
    if (typeof window !== 'undefined') {
      const completedModules = localStorage.getItem('completedModules_general');
      const lastModule = localStorage.getItem('userLastModule_general');
      const attemptedModule = localStorage.getItem('userAttemptedModule_general');
      
      toast({
        title: "Current Progress",
        description: `Completed: ${completedModules || 'None'}, Last: ${lastModule || 'None'}, Attempted: ${attemptedModule || 'None'}`,
        variant: "default",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Module Navigation Test Page
          </h1>
          <p className="text-gray-600">
            Test the module-based navigation control system. Try accessing different modules to see the gating behavior.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Course Modules</CardTitle>
              <CardDescription>
                Navigate to different modules to test the progression system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => handleNavigateToModule('general', 'md1')}
                className="w-full justify-start"
                variant="outline"
              >
                Module 1 - Introduction to FMS
              </Button>
              <Button
                onClick={() => handleNavigateToModule('general', 'md2')}
                className="w-full justify-start"
                variant="outline"
              >
                Module 2 - MCDU Menu Pages
              </Button>
              <Button
                onClick={() => handleNavigateToModule('general', 'md3')}
                className="w-full justify-start"
                variant="outline"
              >
                Module 3 - Advanced Features
              </Button>
              <Button
                onClick={() => handleNavigateToModule('general', 'md4')}
                className="w-full justify-start"
                variant="outline"
              >
                Module 4 - Advanced Topics
              </Button>
              <Button
                onClick={() => handleNavigateToModule('general', 'md5')}
                className="w-full justify-start"
                variant="outline"
              >
                Module 5 - Departure Pages
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Controls</CardTitle>
              <CardDescription>
                Manage test data and view current progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={handleShowProgress}
                className="w-full"
                variant="secondary"
              >
                Show Current Progress
              </Button>
              <Button
                onClick={handleClearProgress}
                className="w-full"
                variant="destructive"
              >
                Clear All Progress
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>How to Test</CardTitle>
            <CardDescription>
              Follow these steps to test the module navigation system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="mt-1">1</Badge>
                <div>
                  <h4 className="font-semibold">Start with Module 1</h4>
                  <p className="text-sm text-gray-600">
                    Click on Module 1 to access it. This should work without restrictions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="mt-1">2</Badge>
                <div>
                  <h4 className="font-semibold">Mark Module as Completed</h4>
                  <p className="text-sm text-gray-600">
                    Use the "Mark as Completed" button to complete the current module.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="mt-1">3</Badge>
                <div>
                  <h4 className="font-semibold">Test Next Button</h4>
                  <p className="text-sm text-gray-600">
                    The Next button should become enabled after completing the current module.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="mt-1">4</Badge>
                <div>
                  <h4 className="font-semibold">Test Module Gating</h4>
                  <p className="text-sm text-gray-600">
                    Try accessing Module 3 directly without completing Module 2. You should see a warning toast and be redirected.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="mt-1">5</Badge>
                <div>
                  <h4 className="font-semibold">Test Back Navigation</h4>
                  <p className="text-sm text-gray-600">
                    The Back button should be disabled on the first module and enabled on subsequent modules.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Expected Behavior</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Only Module 1 should be accessible initially</li>
            <li>• Next button should be disabled until current module is completed</li>
            <li>• Back button should be disabled on Module 1</li>
            <li>• Attempting to access locked modules should show warning toast</li>
            <li>• Progress should persist in localStorage across page reloads</li>
          </ul>
        </div>
      </div>
      
      <Toaster />
    </div>
  );
}
