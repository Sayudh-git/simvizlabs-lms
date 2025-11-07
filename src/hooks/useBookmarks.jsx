"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios"; // adjust your import path

// Function to fetch bookmarks from the backend
const fetchBookmarks = async () => {
  const stored = localStorage.getItem("bookmarks");
  const bookmarks = stored ? JSON.parse(stored) : [];

  const { data } = await axiosInstance.post("/course-details/bookmark", {
    bookmarks,
  });

  return data; // React Query stores this in cache
};

// Hook to use inside components
export const useGetBookmarks = () => {
  const [enabled, setEnabled] = useState(false);

  // Enable query only after hydration (client side)
  useEffect(() => {
    setEnabled(true);
  }, []);

  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: fetchBookmarks,
    enabled, // ensures localStorage is available
    staleTime: 1000 * 60 * 5, // optional: cache for 5 mins
    retry: false, // optional: avoid retry spam
  });
};
