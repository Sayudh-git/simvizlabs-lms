import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset className="py-4">
        <SidebarTrigger />
        <div className="flex justify-center items-center h-full">
          Coming Soon
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
