'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';

const ArticleAccessRestricted = ({ 
  currentArticle, 
  previousArticle, 
  onNavigateToPrevious, 
  onNavigateToFirst,
  courseId,
  moduleId 
}) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
            <AlertCircle className="h-8 w-8 text-yellow-600" />
          </div>
          <CardTitle className="text-2xl text-gray-900">
            Article Access Restricted
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            You need to complete the previous article before accessing this one.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Current Article Info */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Article You're Trying to Access:</h3>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-red-500 rounded-full"></div>
              <span className="text-gray-700">
                <strong>{currentArticle?.title}</strong> (ID: {currentArticle?.id})
              </span>
            </div>
          </div>

          {/* Previous Article Info */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Complete This Article First:</h3>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">
                <strong>{previousArticle?.title}</strong> (ID: {previousArticle?.id})
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onNavigateToPrevious}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go to Previous Article
            </Button>
            
            <Button
              onClick={onNavigateToFirst}
              variant="outline"
              className="flex-1"
            >
              <Home className="h-4 w-4 mr-2" />
              Start from Beginning
            </Button>
          </div>

          {/* Help Text */}
          <div className="text-center text-sm text-gray-500">
            <p>
              Articles must be completed in order. Complete "{previousArticle?.title}" 
              to unlock access to "{currentArticle?.title}".
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Module Progress</span>
              <span>Complete articles in sequence</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleAccessRestricted;
