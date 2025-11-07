"use client";

import { useState } from "react";
import { useGetBookmarks } from "@/hooks/useBookmarks";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Loader2, FileText, Layers, Code2, Box, ChevronDown, ChevronUp } from "lucide-react";

export default function BookmarksPage() {
  const { data: bookmarks, isLoading } = useGetBookmarks();
  const [openModules, setOpenModules] = useState({});

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin h-6 w-6" />
      </div>
    );

  if (!bookmarks?.length)
    return (
      <p className="text-center text-muted-foreground mt-10">
        No bookmarks yet.
      </p>
    );

  // ✅ Group bookmarks by course_article_id
  const groupedByCourse = bookmarks.reduce((acc, item) => {
    const courseId = item.course_article_id;
    if (!acc[courseId]) acc[courseId] = [];
    acc[courseId].push(item);
    return acc;
  }, {} );

  return (
    <div className="p-6 space-y-10">
      {Object.entries(groupedByCourse).map(([courseId, courseItems]) => {
        const courseTitle = courseItems[0]?.course_title || "Untitled Course";
        const weightage = courseItems[0]?.weightage || 0;

        // 🚀 CORRECTED MODULE GROUPING LOGIC
        const modulesGrouped = {}; // Use plain object for compatibility with Object.entries
        
        courseItems.forEach((item) => {
          // Iterate over the articles within each item, as this is the unit we want to display/group.
          item.articles?.forEach((article) => {
            const fullModuleName = item.module_name;
            let groupingKey = "Module"; 

            // Robustly extract the module ID (e.g., 'md1') from the end of the string.
            if (fullModuleName) {
              const parts = fullModuleName.split(" - ");
              // The grouping key (ID) is the last element of the array.
              groupingKey = parts[parts.length - 1].trim() || "Module";
            }

            // Initialize the array for this grouping key if it doesn't exist.
            if (!modulesGrouped[groupingKey]) {
              modulesGrouped[groupingKey] = [];
            }
            
            // Push the required object structure: { bookmark: item, article: article }
            modulesGrouped[groupingKey].push({ bookmark: item, article });
          });
        });
        
        // Removed console.logs here

        return (
          <div key={courseId}>
            {/* Course Header */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-semibold">{courseTitle}</h2>
              <span className="text-sm text-muted-foreground">
                Weightage: {weightage}%
              </span>
            </div>

            <Separator className="mb-4" />

            {/* Modules */}
            {Object.entries(modulesGrouped).map(([moduleId, items]) => { // moduleId is now the clean ID (e.g., 'md1')
              const isOpen = openModules[moduleId] || false;
              
              // Find the original module name for display (e.g., "FMGS SYSTEM - md1").
              // This is a quick lookup; you might want a more efficient way if performance is critical.
              const firstItem = items[0]?.bookmark;
              const moduleDisplayName = firstItem ? firstItem.module_name.split(' - ')[0] + ' (' + moduleId + ')' : moduleId;


              return (
                <div key={moduleId} className="mb-4 border rounded-md">
                  {/* Module header */}
                  <div
                    className="flex items-center justify-between cursor-pointer p-3 bg-gray-100 hover:bg-gray-200 transition"
                    onClick={() =>
                      setOpenModules((prev) => ({ ...prev, [moduleId]: !isOpen }))
                    }
                  >
                    {/* Display the full module name or a formatted version */}
                    <span className="font-medium">{moduleDisplayName}</span>
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                  </div>

                  {/* Collapsible articles */}
                  {isOpen && (
                    <div className="p-3 space-y-3">
                      {items.map(({ bookmark, article }) => (
                        <Card
                          key={bookmark.id + article.id}
                          className="hover:shadow-lg transition"
                        >
                          <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-base font-medium flex items-center gap-2">
                              {getDocTypeIcon(article.doc_type)}
                              {article.title}
                            </CardTitle>
                          </CardHeader>

                          <CardContent>
                            <div className="text-sm text-muted-foreground mb-3">
                              Module ID: {moduleId}
                            </div>

                            <Link
                              href={bookmark.path}
                              className="text-blue-500 text-sm font-medium hover:underline"
                            >
                              Go to {article.doc_type}
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// ✅ Helper: pick icons for doc_type
function getDocTypeIcon(type) {
  switch (type) {
    case "slides":
      return <FileText className="h-4 w-4 text-blue-500" />;
    case "3d":
      return <Box className="h-4 w-4 text-purple-500" />;
    case "playground":
      return <Code2 className="h-4 w-4 text-green-500" />;
    default:
      return <Layers className="h-4 w-4 text-gray-400" />;
  }
}