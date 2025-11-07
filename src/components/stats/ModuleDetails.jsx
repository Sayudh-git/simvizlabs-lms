"use client";

import { useMemo, useState } from "react";
import ActivityChart from "@/components/stats/ActivityChart";

function formatMinutes(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export default function ModuleDetails({ module }) {
  const pct = useMemo(() => module.totalLessons === 0 ? 0 : Math.round((module.completedLessons / module.totalLessons) * 100), [module]);
  const [tab, setTab] = useState("overview");

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 w-full h-fit  sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{module.title}</h3>
          <p className="text-sm text-zinc-500 mt-1">{module.completedLessons}/{module.totalLessons} lessons • {pct}%</p>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-medium ${module.pass ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"}`}>
          {module.score == null ? "Not attempted" : module.pass ? "Pass" : "Fail"}
        </div>
      </div>

      <Tabs value={tab} onChange={setTab} />

      {tab === "overview" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <Stat label="Score" value={module.score == null ? "—" : `${module.score}%`} />
          <Stat label="Attempts" value={module.attempts} />
          <Stat label="Time Spent" value={formatMinutes(module.timeSpentMinutes)} />
          <Stat label="Last Activity" value={new Date(module.lastActivityAt).toLocaleDateString()} />
        </div>
      )}

      {tab === "activity" && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-2">Activity (last 14 days)</h4>
          <ActivityChart data={module.activityDays} variant="area" />
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="text-base font-semibold mt-1">{value}</div>
    </div>
  );
}

function Tabs({ value, onChange }) {
  return (
    <div className="mt-4 flex gap-1 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/70 w-max">
      <button
        className={`px-3 py-1.5 rounded-md text-sm transition ${value === "overview" ? "bg-white dark:bg-zinc-900 shadow" : "text-zinc-600 dark:text-zinc-300"}`}
        onClick={() => onChange("overview")}
      >
        Overview
      </button>
      <button
        className={`px-3 py-1.5 rounded-md text-sm transition ${value === "activity" ? "bg-white dark:bg-zinc-900 shadow" : "text-zinc-600 dark:text-zinc-300"}`}
        onClick={() => onChange("activity")}
      >
        Activity
      </button>
    </div>
  );
}

// InteractiveChart replaced with ActivityChart (Recharts)


