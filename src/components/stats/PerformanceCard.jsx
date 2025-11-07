"use client";

import { useEffect, useRef } from "react";
import { Progress } from "@/components/ui/progress";

export default function PerformanceCard({ course }) {
  const circleRef = useRef(null);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;
    const offset = circumference - (course.progressPct / 100) * circumference;
    circle.style.strokeDashoffset = String(offset);
  }, [course.progressPct, circumference]);

  return (
    <div className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-6 transition shadow-sm hover:shadow-md active:shadow">
      <div className="flex items-center justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight">{course.title}</h2>
          <p className="text-sm text-zinc-500 mt-1">
            {course.completedModules}/{course.totalModules} modules • {course.completedLessons}/{course.totalLessons} lessons
          </p>
          <div className="mt-4">
            <Progress value={course.progressPct} />
          </div>
          <div className="mt-4 text-sm text-zinc-500">
            Last activity: {new Date(course.lastActivityAt).toLocaleString()}
          </div>
        </div>

        <div className="shrink-0">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" strokeWidth="8" />
              <circle
                ref={circleRef}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="url(#grad)"
                strokeWidth="8"
                strokeLinecap="round"
                style={{ strokeDasharray: `${circumference} ${circumference}`, transition: "stroke-dashoffset 700ms ease" }}
              />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-xl font-bold">{course.progressPct}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


