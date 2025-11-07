"use client";
import React from "react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";

import { useRouter } from "next/navigation";

export function NavSecondary({ items, ...props }) {
  const router = useRouter();

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <button
                  onClick={() => {
                    console.log("Button clicked:", item.title);
                    router.push(item.url);
                  }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-md"
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={20}
                    height={20}
                  />
                  <span>{item.title}</span>
                </button>
              </SidebarMenuButton>
              {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
            </SidebarMenuItem>
          ))}
          <hr />
          <div className="my-2 px-2 flex items-center gap-4 cursor-pointer">
            <Image
              src="/assets/profile_icon.jpeg"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            {/* <span className="text-sm font-semibold text-gray-600">Olivia</span> */}
            <SignOutButton className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
              <strong>Logout</strong>
              </SignOutButton>
          </div>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
