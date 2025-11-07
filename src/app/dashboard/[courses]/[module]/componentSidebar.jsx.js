// "use client";
// import * as React from "react";
// import {
//   BadgeCheck,
//   Bell,
//   BookOpen,
//   Bot,
//   ChevronRight,
//   ChevronsUpDown,
//   Command,
//   CreditCard,
//   Frame,
//   LifeBuoy,
//   LogOut,
//   Map,
//   PieChart,
//   Send,
//   Settings2,
//   Sparkles,
//   SquareTerminal,
//   Trash2,
//   Layers,
//   Code,
// } from "lucide-react";
// import { usePathname } from "next/navigation";
// import { useIsMobile } from "./hooks/use-mobile.js";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarInset,
//   SidebarMenu,
//   SidebarMenuAction,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { redirect } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { useSearchParams } from "next/navigation.js";
// import Image from "next/image.js";
// import { useGetCourseDetails, useGetCourses } from "@/hooks/useCourses.js";

// // contains the linkage of all the paths
// export const data = {
//   courses: [
//     {
//       subpathid: "c1",
//       subpath: "/dashboard/general",
//       modules: [
//         {
//           id: "md1",
//           title: "Introduction to FMS",
//           icon: Layers,
//           subsections: [
//             {
//               id: "1.0",
//               title: "Overview of FMS",
//               path: "/md1/article?id=1.0",
//               nextPath: "/md1/article?id=1.1",
//             },
//             {
//               id: "1.0.1",
//               title: "Basic Concepts",
//               path: "/md1/article?id=1.0.1",
//               prevPath: "/md1/article?id=1.0",
//               nextPath: "/md1/article?id=1.0.2",
//             },
//             {
//               id: "1.0.1.1",
//               title: "Navigation Principles",
//               path: "/md1/article?id=1.0.1.1",
//               prevPath: "/md1/article?id=1.0.1",
//               nextPath: "/md1/article?id=1.0.1.2",
//             },
//             {
//               id: "1.0.1.2",
//               title: "System Architecture",
//               path: "/md1/article?id=1.0.1.2",
//               prevPath: "/md1/article?id=1.0.1.1",
//               nextPath: "/md1/article?id=1.0.2",
//             },
//             {
//               id: "1.0.2",
//               title: "Advanced Features",
//               path: "/md1/article?id=1.0.2",
//               prevPath: "/md1/article?id=1.0.1.2",
//               nextPath: "/md1/article?id=1.1",
//             },
//             {
//               id: "1.1",
//               title: "FMC and ACARS Relationship",
//               path: "/md1/article?id=1.1",
//               prevPath: "/md1/article?id=1.0.2",
//               nextPath: "/md1/videoplayer",
//             },
//             {
//               id: "videoplayer",
//               title: "Video Lesson",
//               path: "/md1/videoplayer",
//               prevPath: "/md1/article?id=1.1",
//               nextPath: "/md1/playground",
//             },
//             {
//               id: "playground",
//               title: "Live Prototype",
//               path: "/md1/playground",
//               prevPath: "/md1/videoplayer",
//               nextPath: "/md1/quiz",
//             },
//             {
//               id: "quiz",
//               title: "Quizzes",
//               path: "/md1/quiz",
//               prevPath: "/md1/playground",
//               nextPath: "/md2/article?id=2.0",
//             },
//           ],
//         },
//         {
//           id: "md2",
//           title: "Preflight Planning",
//           icon: Layers,
//           subsections: [
//             {
//               id: "2.0",
//               title: "Setting Up the Preflight Phase",
//               path: "/md2/article?id=2.0",
//               nextPath: "/md2/article?id=2.1",
//             },
//             {
//               id: "2.0.1",
//               title: "Route Planning",
//               path: "/md2/article?id=2.0.1",
//               prevPath: "/md2/article?id=2.0",
//               nextPath: "/md2/article?id=2.0.2",
//             },
//             {
//               id: "2.0.1.1",
//               title: "Waypoint Selection",
//               path: "/md2/article?id=2.0.1.1",
//               prevPath: "/md2/article?id=2.0.1",
//               nextPath: "/md2/article?id=2.0.1.2",
//             },
//             {
//               id: "2.0.1.2",
//               title: "Route Optimization",
//               path: "/md2/article?id=2.0.1.2",
//               prevPath: "/md2/article?id=2.0.1.1",
//               nextPath: "/md2/article?id=2.0.2",
//             },
//             {
//               id: "2.0.2",
//               title: "Weather Analysis",
//               path: "/md2/article?id=2.0.2",
//               prevPath: "/md2/article?id=2.0.1.2",
//               nextPath: "/md2/article?id=2.1",
//             },
//             {
//               id: "2.1",
//               title: "Programming the Route",
//               path: "/md2/article?id=2.1",
//               prevPath: "/md2/article?id=2.0.2",
//               nextPath: "/md2/article?id=2.2",
//             },
//             {
//               id: "2.2",
//               title: "Fuel and Weight Management",
//               path: "/md2/article?id=2.2",
//               prevPath: "/md2/article?id=2.1",
//               nextPath: "/md2/videoplayer",
//             },
//             {
//               id: "videoplayer",
//               title: "Video Lesson",
//               path: "/md2/videoplayer",
//               prevPath: "/md2/article?id=2.2",
//               nextPath: "/md2/playground",
//             },
//             {
//               id: "playground",
//               title: "Live Prototype",
//               path: "/md2/playground",
//               prevPath: "/md2/videoplayer",
//               nextPath: "/md2/quiz",
//             },
//             {
//               id: "quiz",
//               title: "Quizzes",
//               path: "/md2/quiz",
//               prevPath: "/md2/playground",
//             },
//           ],
//         },
//         {
//           id: "md3",
//           title: "In-Flight Procedures",
//           icon: Layers,
//           subsections: [
//             {
//               id: "3.0",
//               title: "FPL page & LNAV/VNAV Exercises",
//               path: "/md3/article?id=3.0",
//               nextPath: "/md3/article?id=3.1",
//             },
//             {
//               id: "3.1",
//               title: "Real-Time Communication with ACARS",
//               path: "/md3/article?id=3.1",
//               prevPath: "/md3/article?id=3.0",
//               nextPath: "/md3/article?id=3.2",
//             },
//             {
//               id: "3.2",
//               title: "Adjusting Flight Parameters",
//               path: "/md3/article?id=3.2",
//               prevPath: "/md3/article?id=3.1",
//               nextPath: "/md3/article?id=3.3",
//             },
//             {
//               id: "3.3",
//               title: "RNP and RNAV in the 121 world",
//               path: "/md3/article?id=3.3",
//               prevPath: "/md3/article?id=3.2",
//               nextPath: "/md3/article?id=3.4",
//             },
//             {
//               id: "3.4",
//               title: "Approaches",
//               path: "/md3/article?id=3.4",
//               prevPath: "/md3/article?id=3.3",
//               nextPath: "/md3/videoplayer",
//             },
//             {
//               id: "videoplayer",
//               title: "Video Lesson",
//               path: "/md3/videoplayer",
//               prevPath: "/md3/article?id=3.4",
//               nextPath: "/md3/playground",
//             },
//             {
//               id: "playground",
//               title: "Live Prototype",
//               path: "/md3/playground",
//               prevPath: "/md3/videoplayer",
//               nextPath: "/md3/quiz",
//             },
//             {
//               id: "quiz",
//               title: "Quizzes",
//               path: "/md3/quiz",
//               prevPath: "/md3/playground",
//             },
//           ],
//         },
//         {
//           id: "md4",
//           title: "Handling In-Flight Scenarios",
//           icon: Layers,
//           subsections: [
//             {
//               id: "4.0",
//               title: "Diversions and Alternate Airports",
//               path: "/md4/article?id=4.0",
//               nextPath: "/md4/article?id=4.1",
//             },
//             {
//               id: "4.1",
//               title: "Emergency Procedures (Optional)",
//               path: "/md4/article?id=4.1",
//               prevPath: "/md4/article?id=4.0",
//               nextPath: "/md4/videoplayer",
//             },
//             {
//               id: "videoplayer",
//               title: "Video Lesson",
//               path: "/md4/videoplayer",
//               prevPath: "/md4/article?id=4.1",
//               nextPath: "/md4/playground",
//             },
//             {
//               id: "playground",
//               title: "Live Prototype",
//               path: "/md4/playground",
//               prevPath: "/md4/videoplayer",
//               nextPath: "/md4/quiz",
//             },
//             {
//               id: "quiz",
//               title: "Quizzes",
//               path: "/md4/quiz",
//               prevPath: "/md4/playground",
//             },
//           ],
//         },
//         {
//           id: "md5",
//           title: "Airline-Specific Procedures (Optional)",
//           icon: Layers,
//           subsections: [
//             {
//               id: "5.0",
//               title: "General",
//               path: "/md5/article?id=5.0",
//               nextPath: "/md5/videoplayer",
//             },
//             {
//               id: "videoplayer",
//               title: "Video Lesson",
//               path: "/md5/videoplayer",
//               prevPath: "/md5/article?id=5.0",
//               nextPath: "/md5/playground",
//             },
//             {
//               id: "playground",
//               title: "Live Prototype",
//               path: "/md5/playground",
//               prevPath: "/md5/videoplayer",
//               nextPath: "/md5/quiz",
//             },
//             {
//               id: "quiz",
//               title: "Quizzes",
//               path: "/md5/quiz",
//               prevPath: "/md5/playground",
//             },
//           ],
//         },
//         {
//           id: "md6",
//           title: "Troubleshooting and Advanced Features",
//           icon: Layers,
//           subsections: [
//             {
//               id: "6.0",
//               title: "Troubleshooting Basics",
//               path: "/md6/article?id=6.0",
//               nextPath: "/md6/videoplayer",
//             },
//             {
//               id: "videoplayer",
//               title: "Video Lesson",
//               path: "/md6/videoplayer",
//               prevPath: "/md6/article?id=6.0",
//               nextPath: "/md6/playground",
//             },
//             {
//               id: "playground",
//               title: "Live Prototype",
//               path: "/md6/playground",
//               prevPath: "/md6/videoplayer",
//               nextPath: "/md6/quiz",
//             },
//             {
//               id: "quiz",
//               title: "Quizzes",
//               path: "/md6/quiz",
//               prevPath: "/md6/playground",
//             },
//           ],
//         },
//       ],
//     },
//     {
//       subpathid: "c2",
//       subpath: "/dashboard/airbus_a320",
//       modules: [
//         {
//           id: "md1",
//           title: "General",
//           icon: Layers,
//           subsections: [
//             {
//               id: "1.0",
//               title: "Overview",
//               path: "/md1/article?id=1.0",
//               nextPath: "/md1/article?id=1.1",
//             },
//             {
//               id: "1.0.1",
//               title: "System Components",
//               path: "/md1/article?id=1.0.1",
//               prevPath: "/md1/article?id=1.0",
//               nextPath: "/md1/article?id=1.0.2",
//             },
//             {
//               id: "1.0.1.1",
//               title: "Hardware Overview",
//               path: "/md1/article?id=1.0.1.1",
//               prevPath: "/md1/article?id=1.0.1",
//               nextPath: "/md1/article?id=1.0.1.2",
//             },
//             {
//               id: "1.0.1.2",
//               title: "Software Architecture",
//               path: "/md1/article?id=1.0.1.2",
//               prevPath: "/md1/article?id=1.0.1.1",
//               nextPath: "/md1/article?id=1.0.2",
//             },
//             {
//               id: "1.0.2",
//               title: "System Integration",
//               path: "/md1/article?id=1.0.2",
//               prevPath: "/md1/article?id=1.0.1.2",
//               nextPath: "/md1/article?id=1.1",
//             },
//             {
//               id: "1.1",
//               title: "Components",
//               path: "/md1/article?id=1.1",
//               prevPath: "/md1/article?id=1.0.2",
//               nextPath: "/md1/videoplayer",
//             },
//             {
//               id: "videoplayer",
//               title: "Video Lesson",
//               path: "/md1/videoplayer",
//               prevPath: "/md1/article?id=1.1",
//               nextPath: "/md1/playground",
//             },
//             {
//               id: "playground",
//               title: "Live Prototype",
//               path: "/md1/playground",
//               prevPath: "/md1/videoplayer",
//               nextPath: "/md1/quiz",
//             },
//             {
//               id: "quiz",
//               title: "Quizzes",
//               path: "/md1/quiz",
//               prevPath: "/md1/playground",
//               nextPath: "/md1/exercise",
//             },
//             {
//               id: "exercise",
//               title: "OFP Instruction Exercise",
//               path: "/md1/exercise",
//               prevPath: "/md1/quiz",
//               nextPath: "/md2/article?id=2.0",
//             },
//           ],
//         },
//         {
//           id: "md2",
//           title: "MCDU Menu Pages",
//           icon: Layers,
//           subsections: [
//             {
//               id: "2.0",
//               title: "INIT/Route Selection Page",
//               path: "/md2/article?id=2.0",
//               nextPath: "/md2/article?id=2.1",
//             },
//             {
//               id: "2.1",
//               title: "IRS INIT",
//               path: "/md2/article?id=2.1",
//               prevPath: "/md2/article?id=2.0",
//               nextPath: "/md2/article?id=2.2",
//             },
//             {
//               id: "2.2",
//               title: "Wind Page functionality",
//               path: "/md2/article?id=2.2",
//               prevPath: "/md2/article?id=2.1",
//               // nextPath: "/md3/article?id=1.0",
//             },
//             // {
//             //   id: "videoplayer",
//             //   title: "Video Lesson",
//             //   path: "/md1/videoplayer",
//             //   prevPath: "/md1/article?id=1.1",
//             //   nextPath: "/md1/playground",
//             // },
//             // {
//             //   id: "playground",
//             //   title: "Live Prototype",
//             //   path: "/md1/playground",
//             //   prevPath: "/md1/videoplayer",
//             //   nextPath: "/md1/quiz",
//             // },
//             // {
//             //   id: "quiz",
//             //   title: "Quizzes",
//             //   path: "/md1/quiz",
//             //   prevPath: "/md1/playground",
//             //   nextPath: "/md1/exercise",
//             // },
//             // {
//             //   id: "exercise",
//             //   title: "OFP Exercise",
//             //   path: "md1/exercise",
//             //   prevPath: "/md1/quiz",
//             //   nextPath: "/md2/article?id=2.0",
//             // },
//           ],
//         },
//         {
//           id: "md3",
//           title: "INIT Page A Functions",
//           icon: Layers,
//           subsections: [
//             {
//               id: "3.0",
//               title: "Lateral Navigation",
//               path: "/md3/article?id=3.0",
//               // nextPath: "/md4/article?id=3.0",
//             },
//             // {
//             //   id: "videoplayer",
//             //   title: "Video Lesson",
//             //   path: "/md1/videoplayer",
//             //   prevPath: "/md1/article?id=1.1",
//             //   nextPath: "/md1/playground",
//             // },
//             // {
//             //   id: "playground",
//             //   title: "Live Prototype",
//             //   path: "/md1/playground",
//             //   prevPath: "/md1/videoplayer",
//             //   nextPath: "/md1/quiz",
//             // },
//             // {
//             //   id: "quiz",
//             //   title: "Quizzes",
//             //   path: "/md1/quiz",
//             //   prevPath: "/md1/playground",
//             //   nextPath: "/md1/exercise",
//             // },
//             // {
//             //   id: "exercise",
//             //   title: "OFP Exercise",
//             //   path: "md1/exercise",
//             //   prevPath: "/md1/quiz",
//             //   nextPath: "/md2/article?id=2.0",
//             // },
//           ],
//         },
//         {
//           id: "md4",
//           title: "Lateral Revision Pages",
//           icon: Layers,
//           subsections: [
//             {
//               id: "4.0",
//               title: "Runway and SID",
//               path: "/md4/article?id=4.0",
//               nextPath: "/md4/article?id=4.1",
//             },
//             {
//               id: "4.1",
//               title: "STAR's Selection",
//               path: "/md4/article?id=4.1",
//               prevPath: "/md4/article?id=4.0",
//               // nextPath: "/md5/article?id=4.2",
//             },
//             // {
//             //   id: "videoplayer",
//             //   title: "Video Lesson",
//             //   path: "/md1/videoplayer",
//             //   prevPath: "/md1/article?id=1.1",
//             //   nextPath: "/md1/playground",
//             // },
//             // {
//             //   id: "playground",
//             //   title: "Live Prototype",
//             //   path: "/md1/playground",
//             //   prevPath: "/md1/videoplayer",
//             //   nextPath: "/md1/quiz",
//             // },
//             // {
//             //   id: "quiz",
//             //   title: "Quizzes",
//             //   path: "/md1/quiz",
//             //   prevPath: "/md1/playground",
//             //   nextPath: "/md1/exercise",
//             // },
//             // {
//             //   id: "exercise",
//             //   title: "OFP Exercise",
//             //   path: "md1/exercise",
//             //   prevPath: "/md1/quiz",
//             //   nextPath: "/md2/article?id=2.0",
//             // },
//           ],
//         },
//         {
//           id: "md5",
//           title: "Deprature Pages",
//           icon: Layers,
//           subsections: [
//             {
//               id: "5.0",
//               title: "Dep Menu",
//               path: "/md5/article?id=5.0",
//               nextPath: "/md5/article?id=5.1",
//             },
//             {
//               id: "5.1",
//               title: "STAR's Selection",
//               path: "/md5/article?id=5.1",
//               // prevPath:"/md5/article?id=1.0",
//               // nextPath: "/md/article?id=1.0",
//             },
//           ],
//         },
//       ],
//     },
//   ],
//   navSecondary: [
//     {
//       title: "Support",
//       url: "#",
//       icon: LifeBuoy,
//     },
//     {
//       title: "Feedback",
//       url: "#",
//       icon: Send,
//     },
//   ],
// };

// export default function ModuleSidebar({ children }) {
//   const isMobile = useIsMobile();
//   const searchParams = useSearchParams();
//   // const id = searchParams.get("id");
//   const pathname = usePathname();
//   const courseId=pathname.split("/")[2];
//   console.log(pathname.split("/"),courseId);
//   // const [filteredData, setFilteredData] = React.useState([]);

//   const {
//     data: courses,
//     isLoading: isCoursesLoading,
//     error: coursesError,
//   } = useGetCourses();

//   const {
//     data: courseDetails,
//     isLoading: isDetailsLoading,
//     error: detailsError,
//   } = useGetCourseDetails(courseId);

//   console.log(courses, "details",courseDetails);
  
//   if (isCoursesLoading || isDetailsLoading) {
//     return <div>Loading...</div>;
//     // return null;
//   }

//   return (
//     <SidebarProvider>
//       <Sidebar variant="inset">
//         <SidebarHeader>
//           <SidebarMenuButton
//             className="w-fit px-1.5"
//             onClick={() => redirect("/home")}
//           >
//             <Image
//               src="/assets/logo.svg"
//               alt="Logo"
//               width={35}
//               height={35}
//               fetchPriority="high"
//             />
//           </SidebarMenuButton>
//         </SidebarHeader>
//         <SidebarContent>
//           <SidebarGroup>
//             <SidebarGroupLabel>Platform</SidebarGroupLabel>
//             <SidebarMenu>
//               {courses[0].modules.map((module) => (
//                 <Collapsible
//                   key={module.id}
//                   asChild
//                   defaultOpen={pathname.split("/")[3] === module.id}
//                   className="group/collapsible"
//                 >
//                   <SidebarMenuItem>
//                     <CollapsibleTrigger asChild>
//                       <SidebarMenuButton
//                         tooltip={module.title}
//                         className="h-fit w-full"
//                       >
//                         {module.icon && <module.icon />}
//                         <span className="text-sm font-semibold">
//                           {module.heading}
//                         </span>
//                         <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                       </SidebarMenuButton>
//                     </CollapsibleTrigger>
//                     <CollapsibleContent>
//                       <SidebarMenuSub>
//                         {courseDetails[0].articles.map((subItem, index) => {

//                           if(subItem.module_id!=module.id){
//                             return null;
//                           }

//                          return  (<SidebarMenuButton
//                             key={index}
//                             className={`text-sm font-light h-fit rounded-lg px-2 py-1 hover:bg-gray-300 ${
//                               pathname.split("/")[3] === module.id &&
//                               pathname.split("/")[4] === subItem.id &&
//                               (subItem.subid == undefined ||
//                                 subItem.subid == searchParams.get("id")) &&
//                               "bg-gray-200"
//                             }`}
//                             onClick={() => {
//                               return redirect(
//                                 ``
//                               );
//                             }}
//                           >
//                             {subItem.title}
//                           </SidebarMenuButton>)}
//                         )}
//                       </SidebarMenuSub>
//                     </CollapsibleContent>
//                   </SidebarMenuItem>
//                 </Collapsible>
//               ))}
//             </SidebarMenu>
//           </SidebarGroup>
//           <SidebarGroup className="mt-auto">
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {data.navSecondary.map((item) => (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton asChild size="sm">
//                       <a href={item.url}>
//                         <item.icon />
//                         <span>{item.title}</span>
//                       </a>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         </SidebarContent>
//         {/* <SidebarFooter>
//           <SidebarMenu>
//             <SidebarMenuItem>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <SidebarMenuButton
//                     size="lg"
//                     className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
//                   >
//                     <Avatar className="h-8 w-8 rounded-lg">
//                       <AvatarImage
//                         src={data.user.avatar}
//                         alt={data.user.name}
//                       />
//                       <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//                     </Avatar>
//                     <div className="grid flex-1 text-left text-sm leading-tight">
//                       <span className="truncate font-semibold">
//                         {data.user.name}
//                       </span>
//                       <span className="truncate text-xs">
//                         {data.user.email}
//                       </span>
//                     </div>
//                     <ChevronsUpDown className="ml-auto size-4" />
//                   </SidebarMenuButton>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent
//                   className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
//                   side={isMobile ? "bottom" : "right"}
//                   align="end"
//                   sideOffset={4}
//                 >
//                   <DropdownMenuLabel className="p-0 font-normal">
//                     <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
//                       <Avatar className="h-8 w-8 rounded-lg">
//                         <AvatarImage
//                           src={data.user.avatar}
//                           alt={data.user.name}
//                         />
//                         <AvatarFallback className="rounded-lg">
//                           CN
//                         </AvatarFallback>
//                       </Avatar>
//                       <div className="grid flex-1 text-left text-sm leading-tight">
//                         <span className="truncate font-semibold">
//                           {data.user.name}
//                         </span>
//                         <span className="truncate text-xs">
//                           {data.user.email}
//                         </span>
//                       </div>
//                     </div>
//                   </DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuGroup>
//                     <DropdownMenuItem>
//                       <Sparkles />
//                       Upgrade to Pro
//                     </DropdownMenuItem>
//                   </DropdownMenuGroup>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuGroup>
//                     <DropdownMenuItem>
//                       <BadgeCheck />
//                       Account
//                     </DropdownMenuItem>
//                     <DropdownMenuItem>
//                       <CreditCard />
//                       Billing
//                     </DropdownMenuItem>
//                     <DropdownMenuItem>
//                       <Bell />
//                       Notifications
//                     </DropdownMenuItem>
//                   </DropdownMenuGroup>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem>
//                     <LogOut />
//                     Log out
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </SidebarMenuItem>
//           </SidebarMenu>
//         </SidebarFooter> */}
//       </Sidebar>
//       <SidebarInset className="h-fit shadow-none">{children}</SidebarInset>
//     </SidebarProvider>
//   );
// }
