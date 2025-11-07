# Article Access Validation System

This document describes the implementation of article access validation middleware that prevents users from accessing articles out of sequence.

## Overview

The system implements sequential article unlocking where users must complete articles in order within each module. It includes:

- **Sequential Access Control**: Articles must be completed in order (1.0 → 1.0.1 → 1.0.1.1, etc.)
- **Access Validation**: Checks if previous article is completed before allowing access
- **User-Friendly Messages**: Clear feedback about what article needs to be completed
- **Automatic Redirects**: Redirects users to the appropriate article
- **Progress Persistence**: Stores completion status in localStorage

## Components Created

### 1. `useArticleAccess` Hook (`src/hooks/useArticleAccess.js`)

Custom hook that manages article access validation and navigation.

**Features:**
- Validates article access based on previous article completion
- Provides navigation functions for restricted access
- Integrates with localStorage for progress tracking
- Shows toast notifications for access attempts

**Key Functions:**
- `checkArticleAccess()` - Validates if current article is accessible
- `navigateToPreviousArticle()` - Navigate to the required previous article
- `navigateToFirstArticle()` - Navigate to the first article of the module
- `isArticleCompleted()` - Check if a specific article is completed

### 2. `ArticleAccessRestricted` Component (`src/components/ArticleAccessRestricted.jsx`)

Component displayed when article access is restricted.

**Features:**
- Clear explanation of why access is restricted
- Shows current article and required previous article
- Provides navigation buttons to resolve the restriction
- Visual indicators for article status
- Progress bar showing module completion

### 3. Integration in Subsection Page (`src/app/dashboard/[courses]/[module]/[subsection]/page.jsx`)

Enhanced the existing page with article access validation.

**Features:**
- Validates access before rendering content
- Shows restriction screen when access is denied
- Maintains existing functionality for accessible articles
- Integrates with existing course progress system

## How It Works

### 1. Access Validation Process

```javascript
// When user tries to access an article:
1. Get sorted list of articles in the module
2. Find current article index
3. If first article (index 0) → Allow access
4. If not first article → Check if previous article is completed
5. If previous not completed → Show restriction screen
6. If previous completed → Allow access
```

### 2. Article Completion Tracking

```javascript
// Articles are marked complete when:
- User visits an article (automatic completion)
- User completes a slideshow
- User finishes a quiz or exercise
- Manual completion via context actions

// Completion is stored as:
localStorage.setItem(`completedArticles_${courseId}`, JSON.stringify([
  "general_md1_1.0",
  "general_md1_1.0.1",
  // ... more completed articles
]));
```

### 3. Navigation Flow

```javascript
// Normal flow (sequential):
Article 1.0 (accessible) → Complete → 
Article 1.0.1 (accessible) → Complete → 
Article 1.0.1.1 (accessible)

// Restricted flow (out of order):
Try to access Article 1.0.1.1 → 
Check if 1.0.1 is completed → 
If not completed → Show restriction screen → 
Redirect to 1.0.1
```

## Usage Examples

### Basic Integration

```jsx
import useArticleAccess from '@/hooks/useArticleAccess';
import ArticleAccessRestricted from '@/components/ArticleAccessRestricted';

function MyPage({ courseId, moduleId, articleId, allArticles }) {
  const {
    isAccessGranted,
    isLoading,
    previousArticle,
    currentArticle,
    navigateToPreviousArticle,
    navigateToFirstArticle
  } = useArticleAccess(courseId, moduleId, articleId, allArticles);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAccessGranted) {
    return (
      <ArticleAccessRestricted
        currentArticle={currentArticle}
        previousArticle={previousArticle}
        onNavigateToPrevious={navigateToPreviousArticle}
        onNavigateToFirst={navigateToFirstArticle}
        courseId={courseId}
        moduleId={moduleId}
      />
    );
  }

  return <NormalArticleContent />;
}
```

### Manual Article Completion

```javascript
// Mark an article as completed
const markArticleCompleted = (courseId, moduleId, articleId) => {
  const articleKey = `${courseId}_${moduleId}_${articleId}`;
  const completed = JSON.parse(localStorage.getItem(`completedArticles_${courseId}`) || '[]');
  
  if (!completed.includes(articleKey)) {
    completed.push(articleKey);
    localStorage.setItem(`completedArticles_${courseId}`, JSON.stringify(completed));
  }
};
```

## Testing the System

### Test Page: `/test-article-access`

1. **Clear Progress**: Reset all article completion status
2. **Try Sequential Access**: Access articles in order (should work)
3. **Try Out-of-Order Access**: Access articles out of sequence (should be restricted)
4. **Mark Articles Complete**: Use test buttons to mark articles as completed
5. **Verify Access**: Confirm previously restricted articles become accessible

### Manual Testing Steps

1. Navigate to `/dashboard/general/md1/md1?id=1.0` (should work - first article)
2. Try `/dashboard/general/md1/md1?id=1.0.1.1` (should be restricted - requires 1.0.1)
3. Complete article 1.0.1 through normal navigation
4. Try accessing 1.0.1.1 again (should now work)

## localStorage Keys

The system uses the following localStorage keys:

- `completedArticles_{courseId}` - Array of completed article keys
- Article keys follow format: `{courseId}_{moduleId}_{articleId}`

## Error Handling

- **Article Not Found**: Gracefully handles non-existent articles
- **localStorage Errors**: Includes try-catch blocks for localStorage operations
- **Navigation Failures**: Provides fallback behavior for failed navigation
- **Invalid Data**: Handles malformed article IDs or missing data

## Integration with Existing Systems

### CourseProgressContext
- Uses existing `markArticleCompleted` function
- Integrates with existing progress tracking
- Maintains compatibility with module-level progress

### Toast Notifications
- Shows access restriction warnings
- Provides feedback for navigation actions
- Integrates with existing toast system

### Router Integration
- Uses Next.js router for navigation
- Maintains URL structure and parameters
- Handles dynamic route parameters

## Customization Options

### Access Rules
```javascript
// Modify access validation logic in useArticleAccess.js
const checkArticleAccess = () => {
  // Custom logic for determining article access
  // Can be modified for different access patterns
};
```

### Restriction Messages
```jsx
// Customize restriction screen in ArticleAccessRestricted.jsx
<CardTitle className="text-2xl text-gray-900">
  Custom Access Restriction Title
</CardTitle>
```

### Completion Requirements
```javascript
// Modify completion requirements
const isArticleCompleted = (courseId, moduleId, articleId) => {
  // Custom completion logic
  // Can include time-based requirements, quiz scores, etc.
};
```

## Performance Considerations

- **localStorage Operations**: Minimized and cached where possible
- **Article Sorting**: Done once per module load
- **Access Validation**: Only runs when article changes
- **Navigation**: Debounced to prevent rapid navigation attempts

## Future Enhancements

1. **Time-Based Requirements**: Require minimum time spent on articles
2. **Quiz Integration**: Require passing quiz scores for completion
3. **Progress Analytics**: Track user navigation patterns
4. **Flexible Sequences**: Support for non-linear article dependencies
5. **API Integration**: Replace localStorage with backend API calls

## Troubleshooting

### Common Issues

1. **Articles Not Loading**
   - Check if courseDetails and allArticles are properly loaded
   - Verify article IDs match the expected format

2. **Access Always Restricted**
   - Check localStorage for completed articles
   - Verify article sorting logic

3. **Navigation Not Working**
   - Ensure router is properly imported and configured
   - Check for JavaScript errors in console

### Debug Commands

```javascript
// Check completed articles
console.log(localStorage.getItem('completedArticles_general'));

// Clear all progress
localStorage.removeItem('completedArticles_general');

// Mark specific article complete
const completed = JSON.parse(localStorage.getItem('completedArticles_general') || '[]');
completed.push('general_md1_1.0');
localStorage.setItem('completedArticles_general', JSON.stringify(completed));
```

This system provides robust article access control while maintaining a smooth user experience and clear feedback about progression requirements.
