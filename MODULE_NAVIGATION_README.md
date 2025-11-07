# Module-Based Navigation Control System

This document describes the implementation of a module-based navigation control system for the Next.js/React course platform.

## Overview

The system implements progressive module unlocking where users must complete modules in sequence. It includes:

- **Next/Back Navigation**: Buttons that enable/disable based on module completion status
- **Module Gating**: Prevents access to modules that haven't been unlocked
- **Progress Persistence**: Stores completion status in localStorage
- **Toast Notifications**: User feedback for navigation attempts and completion status
- **Clean Architecture**: Modular React components with custom hooks

## Components Created

### 1. `useModuleProgress` Hook (`src/hooks/useModuleProgress.js`)

Custom hook that manages module progress state and localStorage persistence.

**Features:**
- Tracks module completion status
- Manages navigation permissions
- Handles unauthorized access attempts
- Provides navigation functions
- Persists progress in localStorage

**Key Functions:**
- `markModuleCompleted()` - Mark current module as completed
- `navigateToNext()` - Navigate to next module
- `navigateToPrev()` - Navigate to previous module
- `canAccessModule()` - Check if user can access specific module
- `handleUnauthorizedAccess()` - Handle blocked access attempts

### 2. `ModuleNavigation` Component (`src/components/ModuleNavigation.jsx`)

Reusable navigation component with Next/Back buttons and completion logic.

**Features:**
- Dynamic button states (enabled/disabled)
- Module completion tracking
- Toast notifications
- Visual completion indicators
- Responsive design

### 3. Toast Notification System

**Components:**
- `src/components/ui/toast.jsx` - Toast component with variants
- `src/hooks/use-toast.jsx` - Toast state management hook
- `src/components/ui/toaster.jsx` - Toast container component
- `src/components/ui/badge.jsx` - Badge component for status indicators

**Toast Variants:**
- `default` - Standard notifications
- `success` - Completion confirmations
- `warning` - Access restrictions
- `destructive` - Error messages

### 4. Module Page Component (`src/app/dashboard/[courses]/[module]/page.jsx`)

Main module page that integrates navigation control.

**Features:**
- Automatic access validation
- Module content display
- Integration with existing sidebar
- Progress tracking
- Toast notifications

### 5. Test Page (`src/app/test-module-navigation/page.jsx`)

Comprehensive testing interface for the module navigation system.

**Features:**
- Direct navigation to any module
- Progress management controls
- Testing instructions
- Current state display

## Integration with Existing System

### Updated Components

1. **Providers** (`src/app/providers.js`)
   - Added `Toaster` component for global toast notifications

2. **CourseProgressContext** (`src/contexts/CourseProgressContext.jsx`)
   - Added `canAccessModule()` function
   - Enhanced `markModuleCompleted()` to sync with new system
   - Updated cleanup functions to include new localStorage keys

## localStorage Keys

The system uses the following localStorage keys:

- `completedModules_{courseId}` - Array of completed module indices
- `userLastModule_{courseId}` - Last visited module ID
- `userAttemptedModule_{courseId}` - Module user tried to access (for analytics)

## Usage Examples

### Basic Module Navigation

```jsx
import ModuleNavigation from '@/components/ModuleNavigation';

function ModulePage({ courseId, moduleId }) {
  const handleModuleCompleted = (moduleIndex) => {
    console.log(`Module ${moduleIndex + 1} completed!`);
  };

  return (
    <ModuleNavigation
      courseId={courseId}
      moduleId={moduleId}
      onModuleCompleted={handleModuleCompleted}
    />
  );
}
```

### Using the Hook Directly

```jsx
import useModuleProgress from '@/hooks/useModuleProgress';

function MyComponent({ courseId, moduleId }) {
  const {
    canNavigateNext,
    canNavigatePrev,
    markModuleCompleted,
    navigateToNext
  } = useModuleProgress(courseId, moduleId);

  return (
    <div>
      <button 
        disabled={!canNavigateNext}
        onClick={navigateToNext}
      >
        Next Module
      </button>
    </div>
  );
}
```

### Toast Notifications

```jsx
import { useToast } from '@/hooks/use-toast';

function MyComponent() {
  const { toast } = useToast();

  const showSuccess = () => {
    toast({
      title: "Success!",
      description: "Module completed successfully.",
      variant: "success",
    });
  };

  return <button onClick={showSuccess}>Complete Module</button>;
}
```

## Testing the System

1. **Navigate to Test Page**: `/test-module-navigation`
2. **Start with Module 1**: Should be accessible without restrictions
3. **Mark as Completed**: Use the "Mark as Completed" button
4. **Test Next Button**: Should become enabled after completion
5. **Test Module Gating**: Try accessing Module 3 directly - should show warning
6. **Test Back Navigation**: Back button should be disabled on Module 1

## Module Structure

The system assumes modules follow this naming convention:
- Module 1: `md1`
- Module 2: `md2`
- Module 3: `md3`
- etc.

Module indices are 0-based internally but displayed as 1-based to users.

## Error Handling

- **Unauthorized Access**: Shows warning toast and redirects to appropriate module
- **Invalid Module IDs**: Gracefully handles malformed module identifiers
- **localStorage Errors**: Includes try-catch blocks for localStorage operations
- **Navigation Failures**: Provides fallback behavior for failed navigation

## Future Enhancements

1. **API Integration**: Replace localStorage with backend API calls
2. **Analytics**: Track user progress and navigation patterns
3. **Module Dependencies**: Support for non-sequential module dependencies
4. **Progress Persistence**: Cloud sync for cross-device progress
5. **Module Prerequisites**: More complex completion requirements

## Troubleshooting

### Common Issues

1. **Toast Notifications Not Showing**
   - Ensure `Toaster` component is included in providers
   - Check that `useToast` hook is properly imported

2. **Navigation Not Working**
   - Verify module IDs follow the expected format (`md1`, `md2`, etc.)
   - Check localStorage for existing progress data

3. **Module Access Issues**
   - Clear localStorage to reset progress
   - Verify module index calculations are correct

### Debug Commands

```javascript
// Check current progress
console.log(localStorage.getItem('completedModules_general'));

// Clear all progress
localStorage.removeItem('completedModules_general');
localStorage.removeItem('userLastModule_general');
localStorage.removeItem('userAttemptedModule_general');
```

## Performance Considerations

- **localStorage Operations**: Minimized and batched where possible
- **Re-renders**: Used `useCallback` and `useMemo` to prevent unnecessary re-renders
- **Toast Management**: Limited to 1 toast at a time to prevent UI clutter
- **Navigation**: Debounced to prevent rapid navigation attempts

This system provides a robust foundation for module-based course navigation with room for future enhancements and integrations.
