'use client';
import React from 'react';
import ModuleNavigation from './ModuleNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ModuleNavigationDemo = ({ courseId = 'general', moduleId = 'md1' }) => {
  const handleModuleCompleted = (moduleIndex) => {
    console.log(`Module ${moduleIndex + 1} completed!`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Module Navigation Demo</CardTitle>
          <CardDescription>
            This demonstrates the module-based navigation control system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Course ID: {courseId}</Badge>
              <Badge variant="outline">Module ID: {moduleId}</Badge>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h4 className="font-semibold mb-2">Navigation Component:</h4>
              <ModuleNavigation
                courseId={courseId}
                moduleId={moduleId}
                onModuleCompleted={handleModuleCompleted}
              />
            </div>
            
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>Features:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Next/Back navigation buttons with proper state management</li>
                <li>Module completion tracking with localStorage persistence</li>
                <li>Access control - prevents jumping ahead to locked modules</li>
                <li>Toast notifications for user feedback</li>
                <li>Visual indicators for completion status</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleNavigationDemo;
