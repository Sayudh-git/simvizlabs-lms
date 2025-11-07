// Debug utilities for course progress
// This file can be imported in development to help debug course progress

import { getCourseProgress, getCourseProgressById, getLastAccessedCourse } from './courseProgress';

/**
 * Debug function to log all course progress
 */
export const debugCourseProgress = () => {
  if (typeof window === 'undefined') {
    console.log('Course Progress Debug: Running on server side');
    return;
  }
  
  const allProgress = getCourseProgress();
  console.log('=== Course Progress Debug ===');
  console.log('All Progress:', allProgress);
  
  Object.entries(allProgress).forEach(([courseId, progress]) => {
    console.log(`Course ${courseId}:`, {
      lastModuleId: progress.lastModuleId,
      lastArticleId: progress.lastArticleId,
      timestamp: new Date(progress.timestamp).toLocaleString()
    });
  });
  
  const lastCourse = getLastAccessedCourse();
  console.log('Last Accessed Course:', lastCourse);
  console.log('============================');
};

/**
 * Debug function to log progress for a specific course
 * @param {string} courseId - The course ID to debug
 */
export const debugCourseProgressById = (courseId) => {
  if (typeof window === 'undefined') {
    console.log('Course Progress Debug: Running on server side');
    return;
  }
  
  const progress = getCourseProgressById(courseId);
  console.log(`=== Course Progress Debug for ${courseId} ===`);
  console.log('Progress:', progress);
  if (progress) {
    console.log('Last Module ID:', progress.lastModuleId);
    console.log('Last Article ID:', progress.lastArticleId);
    console.log('Last Accessed:', new Date(progress.timestamp).toLocaleString());
  } else {
    console.log('No progress found for this course');
  }
  console.log('==========================================');
};

// Make debug functions available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.debugCourseProgress = debugCourseProgress;
  window.debugCourseProgressById = debugCourseProgressById;
}

