"use client";

import { useMemo, useState } from "react";
import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import PerformanceCard from "@/components/stats/PerformanceCard";
import ModuleBreakdown from "@/components/stats/ModuleBreakdown";
import ModuleDetails from "@/components/stats/ModuleDetails";
import { useCourseStats } from "@/hooks/useCourseStats";

export default function Page() {
  const stats = useCourseStats();
  const [activeModuleId, setActiveModuleId] = useState(stats.modules[0]?.id);
  const activeModule = useMemo(() => stats.modules.find(m => m.id === activeModuleId) ?? stats.modules[0], [stats.modules, activeModuleId]);

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset className="py-4">
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between mb-4">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">Performance</h1>
          </div>

          <div className="flex flex-col gap-4">
  {/* Full-width PerformanceCard */}
  <div className="w-full">
    <PerformanceCard course={stats.course} />
  </div>
<div className=" flex lg:flex-row flex-col gap-4 ">
  {/* Sidebar ModuleBreakdown */}
  <div className="flex w-full lg:w-auto flex-col">
    <ModuleBreakdown
      modules={stats.modules}
      activeModuleId={activeModule?.id}
      onSelect={(m) => setActiveModuleId(m.id)}
    />
  </div>

  {/* Main ModuleDetails */}
  <div className="flex w-[100%]">
    {activeModule && <ModuleDetails module={activeModule} />}
  </div>
  </div>
</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}