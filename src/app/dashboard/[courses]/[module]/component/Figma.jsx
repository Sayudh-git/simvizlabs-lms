"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { data as moduleData } from "../sidebar";
import { useEffect, useState } from "react";
export default function FigmaComponent({data}) {
  console.log(data,"data");
 
  return (
    <div className="flex flex-1 flex-col bg-white text-[#344054] pt-0 overflow-hidden w-full">
      <h1 className="text-2xl font-bold">Live Playground</h1>
      {/* Main content - Figma embedding */}
      <main className="flex-grow p-4">
        <div className="w-full h-[calc(100vh-50px)] bg-gray-100 rounded-lg overflow-hidden">
          <iframe
            src={data.content[0].playground}
            className="w-full h-full"
            allowFullScreen
            title="Figma Design"
          />
        </div>
      </main>

      {/* Footer - Text content */}
      <footer className="p-4 bg-background border-t">
        <p className="text-sm text-muted-foreground">
          This is the Live Playground where you can interact with Figma designs.
          Use the navigation buttons above to move between different screens or
          components. The Figma embed above showcases the current design, and
          you can interact with it directly in this view.
        </p>
      </footer>
    </div>
  );
}
