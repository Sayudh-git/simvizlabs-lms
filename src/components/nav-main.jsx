"use client";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";
export function NavMain({ items }) {
  const router = useRouter();
  const checkdata = ["stats", "inbox", "video"];

  const handleNavigation = (url) => {
    router.push(url);
  };

  return (
    <>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={item.isActive}>
              <div
                className="cursor-pointer"
                onClick={() => handleNavigation(item.url)}
              >
                <Image src={item.icon} alt={item.title} width={20} height={20} />
                <span>{item.title}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </>
  );
}
