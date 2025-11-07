import { Inter } from "next/font/google";
// import SidebarComponent from '@/components/sidebar'
import { cn } from "@/lib/utils";
// import './globals.css'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
  } from "@/components/ui/sidebar";
  import { SidebarLeft } from "@/components/sidebar-left";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <SidebarProvider>
    <SidebarLeft />
    <SidebarInset className="py-4">
           {children}
         </SidebarInset>
    </SidebarProvider>

  );
}
