"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useEffect, useState } from "react";

export function BookmarkButton({
  path,
  contentId,
  contentType,
  title,
  moduleName,
  thumbnail,
  showLabel = false,
}) {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // 👈 ensures hydration-safe rendering

  // ✅ Load from localStorage after hydration
  useEffect(() => {
    try {
      const stored = localStorage.getItem("bookmarks");
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Failed to load bookmarks", e);
    } finally {
      setIsLoaded(true); // ✅ only render UI once loaded
    }
  }, []);

  const isBookmarked = bookmarks.some((b) => b.path === path);

  // ✅ Sync with localStorage when bookmarks change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  }, [bookmarks, isLoaded]);

  const handleToggle = () => {
    try {
      const stored = localStorage.getItem("bookmarks");
      const current = stored ? JSON.parse(stored) : [];

      const exists = current.some((b) => b.path === path);
      let updated;

      if (exists) {
        updated = current.filter((b) => b.path !== path);
      } else {
        updated = [
          ...current,
          {
            id: Date.now(),
            path,
            contentId,
            contentType,
            title,
            moduleName,
            thumbnail,
          },
        ];
      }

      setBookmarks(updated);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
    } catch (err) {
      console.error("Bookmark toggle failed:", err);
    }
  };

  // 🧩 Don’t render until bookmarks are loaded (avoids flicker/reset)
  if (!isLoaded) return null;

  return (
    <button
      onClick={handleToggle}
      className={`bg-transparent border-none hover:bg-transparent hover:border-none transition-colors ${
        isBookmarked
          ? "text-amber-500 hover:text-amber-600"
          : "text-gray-400 hover:text-gray-500"
      }`}
      title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
    >
      {isBookmarked ? (
        <BookmarkCheck className="w-4 h-4" />
      ) : (
        <Bookmark className="w-4 h-4" />
      )}
      {showLabel && (
        <span className="ml-1">{isBookmarked ? "Saved" : "Save"}</span>
      )}
    </button>
  );
}
