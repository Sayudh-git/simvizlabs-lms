'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { isArticleCompleted } from '@/lib/courseProgress';

const useArticleAccess = (courseId, moduleId, currentArticleId, allArticles, courseData) => {
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [previousArticle, setPreviousArticle] = useState(null);
  const [currentArticle, setCurrentArticle] = useState(null);
  const router = useRouter();
  const { toast } = useToast();

  // Get module articles sorted by ID
  const getSortedModuleArticles = useCallback((articles, moduleId) => {
    if (!articles || !moduleId) return [];
    
    const moduleArticles = articles.filter(article => article.module_id === moduleId);
    
    return moduleArticles.sort((a, b) => {
      const aParts = a.id.split('.').map(Number);
      const bParts = b.id.split('.').map(Number);
      for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        const aVal = aParts[i] || 0;
        const bVal = bParts[i] || 0;
        if (aVal !== bVal) return aVal - bVal;
      }
      return 0;
    });
  }, []);

  // Check article access (always grant access - unlock functionality removed)
  const checkArticleAccess = useCallback(() => {
    if (!courseId || !moduleId || !currentArticleId || !allArticles) {
      setIsLoading(false);
      return;
    }

    const sortedArticles = getSortedModuleArticles(allArticles, moduleId);
    const currentIndex = sortedArticles.findIndex(article => String(article.id) === String(currentArticleId));
    
    if (currentIndex === -1) {
      // Article not found
      setIsAccessGranted(false);
      setIsLoading(false);
      return;
    }

    const current = sortedArticles[currentIndex];
    setCurrentArticle(current);

    // Always grant access - unlock functionality removed
    setIsAccessGranted(true);
    setPreviousArticle(null);
    setIsLoading(false);
  }, [courseId, moduleId, currentArticleId, allArticles, getSortedModuleArticles]);

  // Check access on mount and when dependencies change
  useEffect(() => {
    checkArticleAccess();
  }, [checkArticleAccess]);

  // Navigate to previous article
  const navigateToPreviousArticle = useCallback(() => {
    if (previousArticle) {
      router.push(`/dashboard/${courseId}/${moduleId}/${moduleId}?id=${previousArticle.id}`);
    }
  }, [previousArticle, courseId, moduleId, router]);

  // Navigate to first article of module
  const navigateToFirstArticle = useCallback(() => {
    const sortedArticles = getSortedModuleArticles(allArticles, moduleId);
    if (sortedArticles.length > 0) {
      const firstArticle = sortedArticles[0];
      router.push(`/dashboard/${courseId}/${moduleId}/${moduleId}?id=${firstArticle.id}`);
    }
  }, [allArticles, moduleId, courseId, getSortedModuleArticles, router]);

  return {
    isAccessGranted,
    isLoading,
    previousArticle,
    currentArticle,
    navigateToPreviousArticle,
    navigateToFirstArticle,
    checkArticleAccess
  };
};

export default useArticleAccess;
