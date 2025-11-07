// Course Progress Management using localStorage
// Format: { courseId: { lastModuleId: string, lastArticleId: string, timestamp: number } }

import { useGetCourses } from "@/hooks/useCourses";

const COURSE_PROGRESS_KEY = 'courseProgress';
const PROGRESS_DETAILS_KEY = 'progressDetails';

/**
 * Get all course progress from localStorage
 * @returns {Object} Course progress object
 */
export const getCourseProgress = () => {
  if (typeof window === 'undefined') return {};
  
  try {
    const progress = localStorage.getItem(COURSE_PROGRESS_KEY);
    return progress ? JSON.parse(progress) : {};
  } catch (error) {
    console.error('Error reading course progress from localStorage:', error);
    return {};
  }
};

/**
 * Save progress for a specific course
 * @param {string} courseId - The course ID
 * @param {string} moduleId - The module ID
 * @param {string} articleId - The article ID (optional)
 */
export const saveCourseProgress = (courseId, moduleId, articleId = null) => {
  if (typeof window === 'undefined') return;
  
  try {
    const progress = getCourseProgress();
    progress[courseId] = {
      lastModuleId: moduleId,
      lastArticleId: articleId,
      timestamp: Date.now()
    };
    localStorage.setItem(COURSE_PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving course progress to localStorage:', error);
  }
};

/**
 * Get progress for a specific course
 * @param {string} courseId - The course ID
 * @returns {Object|null} Course progress object or null if not found
 */
export const getCourseProgressById = (courseId) => {
  const progress = getCourseProgress();
  return progress[courseId] || null;
};

/**
 * Get the last accessed course (most recent timestamp)
 * @returns {string|null} Course ID of the last accessed course
 */
export const getLastAccessedCourse = () => {
  const progress = getCourseProgress();
  let lastCourse = null;
  let lastTimestamp = 0;
  
  Object.entries(progress).forEach(([courseId, courseProgress]) => {
    if (courseProgress.timestamp > lastTimestamp) {
      lastTimestamp = courseProgress.timestamp;
      lastCourse = courseId;
    }
  });
  
  return lastCourse;
};

/**
 * Clear progress for a specific course
 * @param {string} courseId - The course ID
 */
export const clearCourseProgress = (courseId) => {
  if (typeof window === 'undefined') return;
  
  try {
    const progress = getCourseProgress();
    delete progress[courseId];
    localStorage.setItem(COURSE_PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error clearing course progress from localStorage:', error);
  }
};

/**
 * Clear all course progress
 */
export const clearAllCourseProgress = () => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(COURSE_PROGRESS_KEY);
  } catch (error) {
    console.error('Error clearing all course progress from localStorage:', error);
  }
};

// ===== PROGRESS DETAILS FUNCTIONS =====

/**
 * Get all progress details from localStorage
 * @returns {Array} Array of progress detail objects
 */
export const getProgressDetails = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    const progressDetails = localStorage.getItem(PROGRESS_DETAILS_KEY);
    return progressDetails ? JSON.parse(progressDetails) : [];
  } catch (error) {
    console.error('Error reading progress details from localStorage:', error);
    return [];
  }
};

/**
 * Get progress details for a specific course
 * @param {string} courseId - The course ID
 * @returns {Object|null} Progress details object or null if not found
 */
export const getProgressDetailsByCourseId = (courseId) => {
  const progressDetails = getProgressDetails();
  return progressDetails.find(detail => detail.moduleId === courseId) || null;
};

/**
 * Update progress details for a specific course
 * @param {string} courseId - The course ID
 * @param {Object} updates - Object containing updates for completedModules, completedArticles, completedSlideshows
 */
export const updateProgressDetails = (courseId, updates) => {
  if (typeof window === 'undefined') return;
  
  try {
    const progressDetails = getProgressDetails();
    const existingDetailIndex = progressDetails.findIndex(detail => detail.moduleId === courseId);
    
    if (existingDetailIndex >= 0) {
      // Update existing course details
      progressDetails[existingDetailIndex] = {
        ...progressDetails[existingDetailIndex],
        ...updates
      };
    } else {
      // Create new course details
      progressDetails.push({
        moduleId: courseId,
        completedModules: [],
        completedArticles: [],
        completedSlideshows: [],
        ...updates
      });
    }
    
    localStorage.setItem(PROGRESS_DETAILS_KEY, JSON.stringify(progressDetails));
  } catch (error) {
    console.error('Error updating progress details in localStorage:', error);
  }
};

/**
 * Check if an article is completed
 * @param {string} courseId - The course ID
 * @param {string} moduleId - The module ID
 * @param {string} articleId - The article ID
 * @returns {boolean} True if article is completed
 */
export const isArticleCompleted = (courseId, moduleId, articleId) => {
  const courseDetails = getProgressDetailsByCourseId(courseId);
  if (!courseDetails || !courseDetails.completedArticles) return false;
  
  const articleKey = `${courseId}_${moduleId}_${articleId}`;
  return courseDetails.completedArticles.includes(articleKey);
};

/**
 * Check if a module is completed
 * @param {string} courseId - The course ID
 * @param {number} moduleIndex - The module index
 * @returns {boolean} True if module is completed
 */
export const isModuleCompleted = (courseId, moduleIndex) => {
  const courseDetails = getProgressDetailsByCourseId(courseId);
  if (!courseDetails || !courseDetails.completedModules) return false;
  
  return courseDetails.completedModules.includes(moduleIndex);
};

/**
 * Check if a slideshow is completed
 * @param {string} courseId - The course ID
 * @param {string} moduleId - The module ID
 * @param {string} articleId - The article ID
 * @returns {boolean} True if slideshow is completed
 */
export const isSlideshowCompleted = (courseId, moduleId, articleId) => {
  const courseDetails = getProgressDetailsByCourseId(courseId);
  if (!courseDetails || !courseDetails.completedSlideshows) return false;
  
  const slideshowKey = `${courseId}_${moduleId}_${articleId}`;
  return courseDetails.completedSlideshows.includes(slideshowKey);
};

/**
 * Mark an article as completed
 * @param {string} courseId - The course ID
 * @param {string} moduleId - The module ID
 * @param {string} articleId - The article ID
 */
export const markArticleCompleted = (courseId, moduleId, articleId) => {
  const courseDetails = getProgressDetailsByCourseId(courseId);
  const articleKey = `${courseId}_${moduleId}_${articleId}`;
  
  let completedArticles = courseDetails?.completedArticles || [];
  if (!completedArticles.includes(articleKey)) {
    completedArticles = [...completedArticles, articleKey];
    updateProgressDetails(courseId, { completedArticles });
  }
};

/**
 * Mark a module as completed
 * @param {string} courseId - The course ID
 * @param {number} moduleIndex - The module index
 */
export const markModuleCompleted = (courseId, moduleIndex) => {
  const courseDetails = getProgressDetailsByCourseId(courseId);
  let completedModules = courseDetails?.completedModules || [];
  
  if (!completedModules.includes(moduleIndex)) {
    completedModules = [...completedModules, moduleIndex];
    updateProgressDetails(courseId, { completedModules });
  }
};

/**
 * Mark a slideshow as completed
 * @param {string} courseId - The course ID
 * @param {string} moduleId - The module ID
 * @param {string} articleId - The article ID
 */
export const markSlideshowCompleted = (courseId, moduleId, articleId) => {
  const courseDetails = getProgressDetailsByCourseId(courseId);
  const slideshowKey = `${courseId}_${moduleId}_${articleId}`;
  
  let completedSlideshows = courseDetails?.completedSlideshows || [];
  if (!completedSlideshows.includes(slideshowKey)) {
    completedSlideshows = [...completedSlideshows, slideshowKey];
    updateProgressDetails(courseId, { completedSlideshows });
  }
};

/**
 * Clear progress details for a specific course
 * @param {string} courseId - The course ID
 */
export const clearProgressDetails = (courseId) => {
  if (typeof window === 'undefined') return;
  
  try {
    const progressDetails = getProgressDetails();
    const filteredDetails = progressDetails.filter(detail => detail.moduleId !== courseId);
    localStorage.setItem(PROGRESS_DETAILS_KEY, JSON.stringify(filteredDetails));
  } catch (error) {
    console.error('Error clearing progress details from localStorage:', error);
  }
};

/**
 * Clear all progress details
 */
export const clearAllProgressDetails = () => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(PROGRESS_DETAILS_KEY);
  } catch (error) {
    console.error('Error clearing all progress details from localStorage:', error);
  }
};


export const getPercentageCompleted = (courseId, totalModules) =>{
  const courseDetails = getProgressDetailsByCourseId(courseId);

  if (!courseDetails || !courseDetails.completedModules) return 0;

  const completedCount = courseDetails.completedModules.length;
  return totalModules === 0 ? 0 : Math.round((completedCount / totalModules) * 100);
}
