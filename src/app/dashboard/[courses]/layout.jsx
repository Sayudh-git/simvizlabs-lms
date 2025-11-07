import { Inter } from "next/font/google";
// import SidebarComponent from '@/components/sidebar'
import { cn } from "@/lib/utils";
// import './globals.css'

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
        <div className="flex h-screen">
           {children}
         </div>
  );
}
