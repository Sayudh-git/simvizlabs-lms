"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function formatData(days) {
  return days.map((v, i) => ({ day: i + 1, minutes: v }));
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const p = payload[0];
    return (
      <div className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs shadow">
        <div className="font-medium">Day {label}</div>
        <div className="text-zinc-600 dark:text-zinc-300">{p.value} min</div>
      </div>
    );
  }
  return null;
}

export default function ActivityChart({ data, variant = "area", height = 260 }) {
  const rows = formatData(data);
  const grid = <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />;
  const xAxis = <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />;
  const yAxis = <YAxis tickLine={false} axisLine={false} width={28} tick={{ fontSize: 12 }} />;

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-2 bg-white dark:bg-zinc-900">
      <ResponsiveContainer width="100%" height={height}>
        {variant === "bar" ? (
          <BarChart data={rows} margin={{ left: 8, right: 8, top: 12, bottom: 0 }}>
            {grid}
            {xAxis}
            {yAxis}
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,0.06)" }} />
            <Bar dataKey="minutes" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : (
          <AreaChart data={rows} margin={{ left: 8, right: 8, top: 12, bottom: 0 }}>
            {grid}
            {xAxis}
            {yAxis}
            <Tooltip content={<CustomTooltip />} />
            <defs>
              <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="minutes" stroke="#6366f1" fillOpacity={1} fill="url(#colorMinutes)" />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}


