import { useMemo } from "react";

function generateRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSampleModules(count) {
  return Array.from({ length: count }).map((_, index) => {
    const totalLessons = generateRandomInt(4, 12);
    const completedLessons = generateRandomInt(0, totalLessons);
    const attempts = generateRandomInt(0, 5);
    const score = attempts === 0 ? null : generateRandomInt(40, 100);
    const pass = typeof score === "number" ? score >= 70 : false;
    const timeSpentMinutes = generateRandomInt(5, 120);
    const activityDays = Array.from({ length: 14 }).map(() => generateRandomInt(0, 6));

    return {
      id: `module-${index + 1}`,
      title: `Module ${index + 1}`,
      totalLessons,
      completedLessons,
      attempts,
      score, // number or null
      pass,
      timeSpentMinutes,
      lastActivityAt: new Date(Date.now() - generateRandomInt(1, 14) * 24 * 60 * 60 * 1000).toISOString(),
      activityDays,
    };
  });
}

export function useCourseStats() {
  // Simulate fetching course performance data
  const data = useMemo(() => {
    const courseTitle = "Airbus A320 - Introduction";
    const modules = generateSampleModules(4);
    const totalModules = modules.length;
    const completedModules = modules.filter(m => m.completedLessons >= m.totalLessons).length;
    const totalLessons = modules.reduce((acc, m) => acc + m.totalLessons, 0);
    const completedLessons = modules.reduce((acc, m) => acc + m.completedLessons, 0);
    const progressPct = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);
    const lastActivityAt = modules
      .map(m => m.lastActivityAt)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];

    return {
      course: {
        id: "course-a320",
        title: courseTitle,
        progressPct,
        completedModules,
        totalModules,
        completedLessons,
        totalLessons,
        lastActivityAt,
      },
      modules,
    };
  }, []);

  return data;
}


