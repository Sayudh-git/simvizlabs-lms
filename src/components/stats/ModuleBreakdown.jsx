"use client";

import { useMemo, useRef, useState } from "react";

export default function ModuleBreakdown({ modules, activeModuleId, onSelect }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("progress-desc");
  const listRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = q ? modules.filter(m => m.title.toLowerCase().includes(q)) : modules.slice();
    switch (sort) {
      case "progress-asc":
        list.sort((a, b) => pct(a) - pct(b));
        break;
      case "progress-desc":
        list.sort((a, b) => pct(b) - pct(a));
        break;
      case "recent":
        list.sort((a, b) => new Date(b.lastActivityAt) - new Date(a.lastActivityAt));
        break;
      default:
        break;
    }
    return list;
  }, [modules, query, sort]);

  function pct(m) {
    return m.totalLessons === 0 ? 0 : Math.round((m.completedLessons / m.totalLessons) * 100);
  }

  function onKeyDown(e) {
    const items = listRef.current?.querySelectorAll("[data-item]");
    if (!items || items.length === 0) return;
    const currentIndex = Array.from(items).findIndex(el => el.getAttribute("data-id") === activeModuleId);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = items[Math.min(items.length - 1, currentIndex + 1)] ?? items[0];
      next.click();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = items[Math.max(0, currentIndex - 1)] ?? items[items.length - 1];
      prev.click();
    }
  }

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900  w-full lg:w-auto">
      <div className="px-4 sm:px-6 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
        <h3 className="text-sm font-semibold">Modules</h3>
        <div className="ml-auto flex items-center gap-2">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-8 rounded-md border border-zinc-200 dark:border-zinc-700 bg-transparent px-2 text-sm"
          />
          <select
            aria-label="Sort modules"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-8 rounded-md border border-zinc-200 dark:border-zinc-700 bg-transparent px-2 text-sm"
          >
            <option value="progress-desc">Progress ↓</option>
            <option value="progress-asc">Progress ↑</option>
            <option value="recent">Recent</option>
          </select>
        </div>
      </div>
      <ul ref={listRef} className="divide-y overflow-auto divide-zinc-200 dark:divide-zinc-800" onKeyDown={onKeyDown}>
        {filtered.map((m) => {
          const percent = pct(m);
          const isActive = m.id === activeModuleId;
          return (
            <li key={m.id}>
              <button
                data-item
                data-id={m.id}
                className={`w-full text-left px-4 sm:px-6 py-3 flex items-center justify-between gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition ${isActive ? "bg-zinc-50 dark:bg-zinc-800/50" : ""}`}
                onClick={() => onSelect?.(m)}
                aria-pressed={isActive}
              >
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {m.title}
                    {m.pass && <span className="inline-flex items-center rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-1.5 py-0.5 text-[10px]">Pass</span>}
                  </div>
                  <div className="text-xs text-zinc-500">{m.completedLessons}/{m.totalLessons} lessons • {new Date(m.lastActivityAt).toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{percent}%</div>
                  <div className={`text-xs ${m.score == null ? "text-zinc-500" : m.pass ? "text-emerald-600" : "text-rose-600"}`}>
                    {m.score == null ? "Not attempted" : `${m.score}%`}
                  </div>
                </div>
              </button>
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="px-4 sm:px-6 py-6 text-sm text-zinc-500">No modules found.</li>
        )}
      </ul>
    </div>
  );
}


