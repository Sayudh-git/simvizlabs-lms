'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

export default function TestArticleAccess() {
  const router = useRouter();
  const { toast } = useToast();

  const handleNavigateToArticle = (courseId, moduleId, articleId) => {
    router.push(`/dashboard/${courseId}/${moduleId}/${moduleId}?id=${articleId}`);
  };

  const handleClearProgress = () => {
    if (typeof window !== 'undefined') {
      // Clear article progress for testing
      localStorage.removeItem('completedArticles_general');
      
      toast({
        title: "Progress Cleared",
        description: "All article progress has been reset for testing.",
        variant: "success",
      });
    }
  };

  const handleMarkArticleComplete = (articleId) => {
    if (typeof window !== 'undefined') {
      try {
        const completedArticles = localStorage.getItem('completedArticles_general');
        let completed = completedArticles ? JSON.parse(completedArticles) : [];
        
        const articleKey = `general_md1_${articleId}`;
        if (!completed.includes(articleKey)) {
          completed.push(articleKey);
          localStorage.setItem('completedArticles_general', JSON.stringify(completed));
          
          toast({
            title: "Article Marked Complete",
            description: `Article ${articleId} has been marked as completed.`,
            variant: "success",
          });
        }
      } catch (error) {
        console.error('Error marking article complete:', error);
      }
    }
  };

  const handleShowProgress = () => {
    if (typeof window !== 'undefined') {
      const completedArticles = localStorage.getItem('completedArticles_general');
      
      toast({
        title: "Current Progress",
        description: `Completed Articles: ${completedArticles || 'None'}`,
        variant: "default",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Article Access Validation Test
          </h1>
          <p className="text-gray-600">
            Test the article access validation system. Try accessing articles out of order to see the restriction behavior.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Module 1 Articles</CardTitle>
              <CardDescription>
                Navigate to different articles to test access validation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => handleNavigateToArticle('general', 'md1', '1.0')}
                className="w-full justify-start"
                variant="outline"
              >
                Article 1.0 - Overview of FMS
              </Button>
              <Button
                onClick={() => handleNavigateToArticle('general', 'md1', '1.0.1')}
                className="w-full justify-start"
                variant="outline"
              >
                Article 1.0.1 - Basic Concepts
              </Button>
              <Button
                onClick={() => handleNavigateToArticle('general', 'md1', '1.0.1.1')}
                className="w-full justify-start"
                variant="outline"
              >
                Article 1.0.1.1 - Navigation Principles
              </Button>
              <Button
                onClick={() => handleNavigateToArticle('general', 'md1', '1.0.1.2')}
                className="w-full justify-start"
                variant="outline"
              >
                Article 1.0.1.2 - System Architecture
              </Button>
              <Button
                onClick={() => handleNavigateToArticle('general', 'md1', '1.0.2')}
                className="w-full justify-start"
                variant="outline"
              >
                Article 1.0.2 - Advanced Features
              </Button>
              <Button
                onClick={() => handleNavigateToArticle('general', 'md1', '1.1')}
                className="w-full justify-start"
                variant="outline"
              >
                Article 1.1 - FMC and ACARS Relationship
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
              
              <div className="border-t pt-3">
                <h4 className="font-semibold mb-2">Mark Articles Complete:</h4>
                <div className="space-y-2">
                  <Button
                    onClick={() => handleMarkArticleComplete('1.0')}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Mark 1.0 Complete
                  </Button>
                  <Button
                    onClick={() => handleMarkArticleComplete('1.0.1')}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Mark 1.0.1 Complete
                  </Button>
                  <Button
                    onClick={() => handleMarkArticleComplete('1.0.1.1')}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Mark 1.0.1.1 Complete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>How to Test Article Access Validation</CardTitle>
            <CardDescription>
              Follow these steps to test the article access restriction system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="mt-1">1</Badge>
                <div>
                  <h4 className="font-semibold">Clear Progress</h4>
                  <p className="text-sm text-gray-600">
                    Click "Clear All Progress" to reset the article completion status.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="mt-1">2</Badge>
                <div>
                  <h4 className="font-semibold">Try Accessing Article 1.0.1</h4>
                  <p className="text-sm text-gray-600">
                    Try accessing Article 1.0.1 directly. It should work since 1.0 is the first article.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="mt-1">3</Badge>
                <div>
                  <h4 className="font-semibold">Try Accessing Article 1.0.1.1</h4>
                  <p className="text-sm text-gray-600">
                    Try accessing Article 1.0.1.1 directly. You should see the access restriction screen saying you need to complete 1.0.1 first.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="mt-1">4</Badge>
                <div>
                  <h4 className="font-semibold">Mark Previous Article Complete</h4>
                  <p className="text-sm text-gray-600">
                    Use the "Mark Articles Complete" buttons to mark the required previous article as completed.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="mt-1">5</Badge>
                <div>
                  <h4 className="font-semibold">Try Access Again</h4>
                  <p className="text-sm text-gray-600">
                    Now try accessing the previously restricted article. It should work and show the normal content.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Expected Behavior</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• First article (1.0) should always be accessible</li>
            <li>• Subsequent articles require previous article completion</li>
            <li>• Access restriction screen shows clear message about required article</li>
            <li>• Toast notifications provide feedback for navigation attempts</li>
            <li>• Automatic redirect to previous article after 2 seconds</li>
            <li>• Progress persists in localStorage across page reloads</li>
          </ul>
        </div>
      </div>
      
      <Toaster />
    </div>
  );
}
