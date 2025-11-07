'use client';
import React from 'react';
import { useCourseProgress } from '@/contexts/CourseProgressContext';

export default function TestProgressPage() {
  const {
    completedModules,
    completedArticles,
    completedSlideshows,
    markArticleCompleted,
    markModuleCompleted,
    markSlideshowCompleted,
    isModuleUnlocked,
    isModuleCompleted,
    isArticleCompleted,
    isSlideshowCompleted,
    clearCourseProgressData,
    getCompletedModules,
    getCompletedArticles
  } = useCourseProgress();

  const testCourseId = 'test_course';
  const testModuleId = 'test_module';

  const handleMarkArticleCompleted = () => {
    markArticleCompleted(testCourseId, testModuleId, 'test_article_1');
  };

  const handleMarkModuleCompleted = () => {
    markModuleCompleted(testCourseId, 0);
  };

  const handleMarkSlideshowCompleted = () => {
    markSlideshowCompleted(testCourseId, testModuleId, 'test_slideshow_1');
  };

  const handleClearProgress = () => {
    clearCourseProgressData(testCourseId);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Course Progress Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
          <div className="space-y-3">
            <button
              onClick={handleMarkArticleCompleted}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Mark Article Completed
            </button>
            <button
              onClick={handleMarkModuleCompleted}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Mark Module Completed
            </button>
            <button
              onClick={handleMarkSlideshowCompleted}
              className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Mark Slideshow Completed
            </button>
            <button
              onClick={handleClearProgress}
              className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear Progress
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Current State</h2>
          <div className="space-y-3 text-sm">
            <div>
              <strong>Completed Modules:</strong>
              <pre className="bg-gray-100 p-2 rounded mt-1 overflow-auto">
                {JSON.stringify(completedModules, null, 2)}
              </pre>
            </div>
            <div>
              <strong>Completed Articles:</strong>
              <pre className="bg-gray-100 p-2 rounded mt-1 overflow-auto">
                {JSON.stringify(completedArticles, null, 2)}
              </pre>
            </div>
            <div>
              <strong>Completed Slideshows:</strong>
              <pre className="bg-gray-100 p-2 rounded mt-1 overflow-auto">
                {JSON.stringify(completedSlideshows, null, 2)}
              </pre>
            </div>
            <div>
              <strong>Module 0 Unlocked:</strong> {isModuleUnlocked(testCourseId, 0) ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>Module 0 Completed:</strong> {isModuleCompleted(testCourseId, 0) ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>Article Completed:</strong> {isArticleCompleted(testCourseId, testModuleId, 'test_article_1') ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>Slideshow Completed:</strong> {isSlideshowCompleted(testCourseId, testModuleId, 'test_slideshow_1') ? 'Yes' : 'No'}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">How the System Works:</h3>
        <ul className="text-yellow-700 space-y-1 text-sm">
          <li>• Articles are marked as completed when you visit them</li>
          <li>• Modules are unlocked only when the previous module is completed</li>
          <li>• Next/Previous buttons are disabled when no more articles are available</li>
          <li>• For slideshows, NEXT button is only enabled when ALL slides are completed</li>
          <li>• Progress is automatically saved to localStorage</li>
          <li>• The sidebar shows completion status with icons (✓ for completed, 🔒 for locked)</li>
        </ul>
      </div>
    </div>
  );
}
