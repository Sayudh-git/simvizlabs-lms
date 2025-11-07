"use client";
import * as React from "react";
import {
   ChevronRight,
   LifeBuoy,
   Send,
   Layers,
   ChevronDown,
  Lock,
  CheckCircle,
 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useIsMobile } from "./hooks/use-mobile.js";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation.js";
import Image from "next/image.js";
import { useGetCourseDetails, useGetCourses } from "@/hooks/useCourses.js";
import WormLoader from "@/app/components/WormLoader.js";
import { useCourseProgress } from "@/contexts/CourseProgressContext.jsx";
import { Progress } from "@/components/ui/progress";
import {BookmarkButton} from "@/app/components/bookmark/BookmarkButton.jsx"


export const NestedSidebar = ({
  courseDetails,
  allCourseDetails,
  activeId,
  setActiveId,
  pathname,
  id,
  courseId,
  moduleId,
  moduleIndex = 0,
}) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { 
    isModuleUnlocked, 
    isModuleCompleted, 
    isArticleCompleted,
    markArticleCompleted 
  } = useCourseProgress();
  
  console.log(courseId,moduleId,id,"courseId,moduleId");

  if(courseDetails.module_id !== moduleId){
    return null;
  }

  const children = allCourseDetails.filter(
    (details) =>
      details.parentId === courseDetails.id 
  );
  const isActive = activeId === courseDetails.id;
  
  // Determine if this module is unlocked using Context API (always unlocked)
  const isUnlocked = true; // Always true - unlock functionality removed
  const isCompleted = isModuleCompleted(courseId, moduleIndex);
  const isArticleCompletedState = isArticleCompleted(courseId, moduleId, courseDetails.id);
  const handleNavigate = () => {
    setActiveId(courseDetails.id);
    const tempPath=`/dashboard/${courseId}/${courseDetails.module_id}/${courseDetails.doc_type || "article"}?id=${courseDetails.id}`
    router.push(tempPath);
  };

  return (
    <Collapsible  onClick={(e) => {
      e.stopPropagation(); // stop from navigating
      setOpen(!open);
    }} open={open} onOpenChange={setOpen} className="pl-2" key={courseDetails.id+"-"+moduleId}>
      <div
        className={`flex px-1 mt-1 items-center justify-between py-1 rounded-md ${
          isArticleCompletedState ? "cursor-pointer" : "cursor-pointer"
        } ${
          isActive
            ? "bg-[#e0e0e0] font-extrabold"
            : "hover:bg-[#d3d3d3]"
        }`}
      >
        {/* Icon based on completion status */}
        {isArticleCompletedState ? (
          <CheckCircle size={12} className="mr-2 text-green-500" />
        ) : (
          <div className="w-3 h-3 mr-2 rounded-full border border-gray-400" />
        )}
        
        {/* Clicking this span navigates */}
        <span
          className={`text-sm font-light w-full ${
            !isArticleCompletedState ? "" : "text-black"
          }`}
          onClick={handleNavigate}
        >
          {courseDetails.title}
        </span>

        <BookmarkButton variant="outline" path={`/dashboard/${courseId}/${courseDetails.module_id}/${courseDetails.doc_type || "article"}?id=${courseDetails.id}`}/>

        {/* Clicking chevron toggles children */}
        {children.length > 0 && (
          <ChevronDown
            className={`ml-2 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            size={16}
          />
        )}
      </div>

      {children.length > 0 && (
        <CollapsibleContent className="space-y-1 mt-1">
          {children.map((child) => (
            <NestedSidebar
              key={child.id}
              courseDetails={child}
              allCourseDetails={allCourseDetails}
              activeId={activeId}
              setActiveId={setActiveId}
              pathname={pathname}
              id={id}
              courseId={courseId}
              moduleId={moduleId}
              moduleIndex={moduleIndex}
            />
          ))}
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};
// contains the linkage of all the paths
export const data = {
  courses: [
    {
      subpathid: "c1",
      subpath: "/dashboard/general",
      modules: [
        {
          id: "md1",
          title: "Introduction to FMS",
          icon: Layers,
          subsections: [
            {
              id: "1.0",
              title: "Overview of FMS",
              path: "/md1/article?id=1.0",
              nextPath: "/md1/article?id=1.1",
            },
            {
              id: "1.0.1",
              title: "Basic Concepts",
              path: "/md1/article?id=1.0.1",
              prevPath: "/md1/article?id=1.0",
              nextPath: "/md1/article?id=1.0.2",
            },
            {
              id: "1.0.1.1",
              title: "Navigation Principles",
              path: "/md1/article?id=1.0.1.1",
              prevPath: "/md1/article?id=1.0.1",
              nextPath: "/md1/article?id=1.0.1.2",
            },
            {
              id: "1.0.1.2",
              title: "System Architecture",
              path: "/md1/article?id=1.0.1.2",
              prevPath: "/md1/article?id=1.0.1.1",
              nextPath: "/md1/article?id=1.0.2",
            },
            {
              id: "1.0.2",
              title: "Advanced Features",
              path: "/md1/article?id=1.0.2",
              prevPath: "/md1/article?id=1.0.1.2",
              nextPath: "/md1/article?id=1.1",
            },
            {
              id: "1.1",
              title: "FMC and ACARS Relationship",
              path: "/md1/article?id=1.1",
              prevPath: "/md1/article?id=1.0.2",
              nextPath: "/md1/videoplayer",
            },
            {
              id: "videoplayer",
              title: "Video Lesson",
              path: "/md1/videoplayer",
              prevPath: "/md1/article?id=1.1",
              nextPath: "/md1/playground",
            },
            {
              id: "playground",
              title: "Live Prototype",
              path: "/md1/playground",
              prevPath: "/md1/videoplayer",
              nextPath: "/md1/quiz",
            },
            {
              id: "quiz",
              title: "Quizzes",
              path: "/md1/quiz",
              prevPath: "/md1/playground",
              nextPath: "/md2/article?id=2.0",
            },
          ],
        },
        {
          id: "md2",
          title: "Preflight Planning",
          icon: Layers,
          subsections: [
            {
              id: "2.0",
              title: "Setting Up the Preflight Phase",
              path: "/md2/article?id=2.0",
              nextPath: "/md2/article?id=2.1",
            },
            {
              id: "2.0.1",
              title: "Route Planning",
              path: "/md2/article?id=2.0.1",
              prevPath: "/md2/article?id=2.0",
              nextPath: "/md2/article?id=2.0.2",
            },
            {
              id: "2.0.1.1",
              title: "Waypoint Selection",
              path: "/md2/article?id=2.0.1.1",
              prevPath: "/md2/article?id=2.0.1",
              nextPath: "/md2/article?id=2.0.1.2",
            },
            {
              id: "2.0.1.2",
              title: "Route Optimization",
              path: "/md2/article?id=2.0.1.2",
              prevPath: "/md2/article?id=2.0.1.1",
              nextPath: "/md2/article?id=2.0.2",
            },
            {
              id: "2.0.2",
              title: "Weather Analysis",
              path: "/md2/article?id=2.0.2",
              prevPath: "/md2/article?id=2.0.1.2",
              nextPath: "/md2/article?id=2.1",
            },
            {
              id: "2.1",
              title: "Programming the Route",
              path: "/md2/article?id=2.1",
              prevPath: "/md2/article?id=2.0.2",
              nextPath: "/md2/article?id=2.2",
            },
            {
              id: "2.2",
              title: "Fuel and Weight Management",
              path: "/md2/article?id=2.2",
              prevPath: "/md2/article?id=2.1",
              nextPath: "/md2/videoplayer",
            },
            {
              id: "videoplayer",
              title: "Video Lesson",
              path: "/md2/videoplayer",
              prevPath: "/md2/article?id=2.2",
              nextPath: "/md2/playground",
            },
            {
              id: "playground",
              title: "Live Prototype",
              path: "/md2/playground",
              prevPath: "/md2/videoplayer",
              nextPath: "/md2/quiz",
            },
            {
              id: "quiz",
              title: "Quizzes",
              path: "/md2/quiz",
              prevPath: "/md2/playground",
            },
          ],
        },
        {
          id: "md3",
          title: "In-Flight Procedures",
          icon: Layers,
          subsections: [
            {
              id: "3.0",
              title: "FPL page & LNAV/VNAV Exercises",
              path: "/md3/article?id=3.0",
              nextPath: "/md3/article?id=3.1",
            },
            {
              id: "3.1",
              title: "Real-Time Communication with ACARS",
              path: "/md3/article?id=3.1",
              prevPath: "/md3/article?id=3.0",
              nextPath: "/md3/article?id=3.2",
            },
            {
              id: "3.2",
              title: "Adjusting Flight Parameters",
              path: "/md3/article?id=3.2",
              prevPath: "/md3/article?id=3.1",
              nextPath: "/md3/article?id=3.3",
            },
            {
              id: "3.3",
              title: "RNP and RNAV in the 121 world",
              path: "/md3/article?id=3.3",
              prevPath: "/md3/article?id=3.2",
              nextPath: "/md3/article?id=3.4",
            },
            {
              id: "3.4",
              title: "Approaches",
              path: "/md3/article?id=3.4",
              prevPath: "/md3/article?id=3.3",
              nextPath: "/md3/videoplayer",
            },
            {
              id: "videoplayer",
              title: "Video Lesson",
              path: "/md3/videoplayer",
              prevPath: "/md3/article?id=3.4",
              nextPath: "/md3/playground",
            },
            {
              id: "playground",
              title: "Live Prototype",
              path: "/md3/playground",
              prevPath: "/md3/videoplayer",
              nextPath: "/md3/quiz",
            },
            {
              id: "quiz",
              title: "Quizzes",
              path: "/md3/quiz",
              prevPath: "/md3/playground",
            },
          ],
        },
        {
          id: "md4",
          title: "Handling In-Flight Scenarios",
          icon: Layers,
          subsections: [
            {
              id: "4.0",
              title: "Diversions and Alternate Airports",
              path: "/md4/article?id=4.0",
              nextPath: "/md4/article?id=4.1",
            },
            {
              id: "4.1",
              title: "Emergency Procedures (Optional)",
              path: "/md4/article?id=4.1",
              prevPath: "/md4/article?id=4.0",
              nextPath: "/md4/videoplayer",
            },
            {
              id: "videoplayer",
              title: "Video Lesson",
              path: "/md4/videoplayer",
              prevPath: "/md4/article?id=4.1",
              nextPath: "/md4/playground",
            },
            {
              id: "playground",
              title: "Live Prototype",
              path: "/md4/playground",
              prevPath: "/md4/videoplayer",
              nextPath: "/md4/quiz",
            },
            {
              id: "quiz",
              title: "Quizzes",
              path: "/md4/quiz",
              prevPath: "/md4/playground",
            },
          ],
        },
        {
          id: "md5",
          title: "Airline-Specific Procedures (Optional)",
          icon: Layers,
          subsections: [
            {
              id: "5.0",
              title: "General",
              path: "/md5/article?id=5.0",
              nextPath: "/md5/videoplayer",
            },
            {
              id: "videoplayer",
              title: "Video Lesson",
              path: "/md5/videoplayer",
              prevPath: "/md5/article?id=5.0",
              nextPath: "/md5/playground",
            },
            {
              id: "playground",
              title: "Live Prototype",
              path: "/md5/playground",
              prevPath: "/md5/videoplayer",
              nextPath: "/md5/quiz",
            },
            {
              id: "quiz",
              title: "Quizzes",
              path: "/md5/quiz",
              prevPath: "/md5/playground",
            },
          ],
        },
        {
          id: "md6",
          title: "Troubleshooting and Advanced Features",
          icon: Layers,
          subsections: [
            {
              id: "6.0",
              title: "Troubleshooting Basics",
              path: "/md6/article?id=6.0",
              nextPath: "/md6/videoplayer",
            },
            {
              id: "videoplayer",
              title: "Video Lesson",
              path: "/md6/videoplayer",
              prevPath: "/md6/article?id=6.0",
              nextPath: "/md6/playground",
            },
            {
              id: "playground",
              title: "Live Prototype",
              path: "/md6/playground",
              prevPath: "/md6/videoplayer",
              nextPath: "/md6/quiz",
            },
            {
              id: "quiz",
              title: "Quizzes",
              path: "/md6/quiz",
              prevPath: "/md6/playground",
            },
          ],
        },
      ],
    },
    {
      subpathid: "c2",
      subpath: "/dashboard/airbus_a320",
      modules: [
        {
          id: "md1",
          title: "General",
          icon: Layers,
          subsections: [
            {
              id: "1.0",
              title: "Overview",
              path: "/md1/article?id=1.0",
              nextPath: "/md1/article?id=1.1",
            },
            {
              id: "1.0.1",
              title: "System Components",
              path: "/md1/article?id=1.0.1",
              prevPath: "/md1/article?id=1.0",
              nextPath: "/md1/article?id=1.0.2",
            },
            {
              id: "1.0.1.1",
              title: "Hardware Overview",
              path: "/md1/article?id=1.0.1.1",
              prevPath: "/md1/article?id=1.0.1",
              nextPath: "/md1/article?id=1.0.1.2",
            },
            {
              id: "1.0.1.2",
              title: "Software Architecture",
              path: "/md1/article?id=1.0.1.2",
              prevPath: "/md1/article?id=1.0.1.1",
              nextPath: "/md1/article?id=1.0.2",
            },
            {
              id: "1.0.2",
              title: "System Integration",
              path: "/md1/article?id=1.0.2",
              prevPath: "/md1/article?id=1.0.1.2",
              nextPath: "/md1/article?id=1.1",
            },
            {
              id: "1.1",
              title: "Components",
              path: "/md1/article?id=1.1",
              prevPath: "/md1/article?id=1.0.2",
              nextPath: "/md1/videoplayer",
            },
            {
              id: "videoplayer",
              title: "Video Lesson",
              path: "/md1/videoplayer",
              prevPath: "/md1/article?id=1.1",
              nextPath: "/md1/playground",
            },
            {
              id: "playground",
              title: "Live Prototype",
              path: "/md1/playground",
              prevPath: "/md1/videoplayer",
              nextPath: "/md1/quiz",
            },
            {
              id: "quiz",
              title: "Quizzes",
              path: "/md1/quiz",
              prevPath: "/md1/playground",
              nextPath: "/md1/exercise",
            },
            {
              id: "exercise",
              title: "OFP Instruction Exercise",
              path: "/md1/exercise",
              prevPath: "/md1/quiz",
              nextPath: "/md2/article?id=2.0",
            },
          ],
        },
        {
          id: "md2",
          title: "MCDU Menu Pages",
          icon: Layers,
          subsections: [
            {
              id: "2.0",
              title: "INIT/Route Selection Page",
              path: "/md2/article?id=2.0",
              nextPath: "/md2/article?id=2.1",
            },
            {
              id: "2.1",
              title: "IRS INIT",
              path: "/md2/article?id=2.1",
              prevPath: "/md2/article?id=2.0",
              nextPath: "/md2/article?id=2.2",
            },
            {
              id: "2.2",
              title: "Wind Page functionality",
              path: "/md2/article?id=2.2",
              prevPath: "/md2/article?id=2.1",
              // nextPath: "/md3/article?id=1.0",
            },
            // {
            //   id: "videoplayer",
            //   title: "Video Lesson",
            //   path: "/md1/videoplayer",
            //   prevPath: "/md1/article?id=1.1",
            //   nextPath: "/md1/playground",
            // },
            // {
            //   id: "playground",
            //   title: "Live Prototype",
            //   path: "/md1/playground",
            //   prevPath: "/md1/videoplayer",
            //   nextPath: "/md1/quiz",
            // },
            // {
            //   id: "quiz",
            //   title: "Quizzes",
            //   path: "/md1/quiz",
            //   prevPath: "/md1/playground",
            //   nextPath: "/md1/exercise",
            // },
            // {
            //   id: "exercise",
            //   title: "OFP Exercise",
            //   path: "md1/exercise",
            //   prevPath: "/md1/quiz",
            //   nextPath: "/md2/article?id=2.0",
            // },
          ],
        },
        {
          id: "md3",
          title: "INIT Page A Functions",
          icon: Layers,
          subsections: [
            {
              id: "3.0",
              title: "Lateral Navigation",
              path: "/md3/article?id=3.0",
              // nextPath: "/md4/article?id=3.0",
            },
            // {
            //   id: "videoplayer",
            //   title: "Video Lesson",
            //   path: "/md1/videoplayer",
            //   prevPath: "/md1/article?id=1.1",
            //   nextPath: "/md1/playground",
            // },
            // {
            //   id: "playground",
            //   title: "Live Prototype",
            //   path: "/md1/playground",
            //   prevPath: "/md1/videoplayer",
            //   nextPath: "/md1/quiz",
            // },
            // {
            //   id: "quiz",
            //   title: "Quizzes",
            //   path: "/md1/quiz",
            //   prevPath: "/md1/playground",
            //   nextPath: "/md1/exercise",
            // },
            // {
            //   id: "exercise",
            //   title: "OFP Exercise",
            //   path: "md1/exercise",
            //   prevPath: "/md1/quiz",
            //   nextPath: "/md2/article?id=2.0",
            // },
          ],
        },
        {
          id: "md4",
          title: "Lateral Revision Pages",
          icon: Layers,
          subsections: [
            {
              id: "4.0",
              title: "Runway and SID",
              path: "/md4/article?id=4.0",
              nextPath: "/md4/article?id=4.1",
            },
            {
              id: "4.1",
              title: "STAR's Selection",
              path: "/md4/article?id=4.1",
              prevPath: "/md4/article?id=4.0",
              // nextPath: "/md5/article?id=4.2",
            },
            // {
            //   id: "videoplayer",
            //   title: "Video Lesson",
            //   path: "/md1/videoplayer",
            //   prevPath: "/md1/article?id=1.1",
            //   nextPath: "/md1/playground",
            // },
            // {
            //   id: "playground",
            //   title: "Live Prototype",
            //   path: "/md1/playground",
            //   prevPath: "/md1/videoplayer",
            //   nextPath: "/md1/quiz",
            // },
            // {
            //   id: "quiz",
            //   title: "Quizzes",
            //   path: "/md1/quiz",
            //   prevPath: "/md1/playground",
            //   nextPath: "/md1/exercise",
            // },
            // {
            //   id: "exercise",
            //   title: "OFP Exercise",
            //   path: "md1/exercise",
            //   prevPath: "/md1/quiz",
            //   nextPath: "/md2/article?id=2.0",
            // },
          ],
        },
        {
          id: "md5",
          title: "Deprature Pages",
          icon: Layers,
          subsections: [
            {
              id: "5.0",
              title: "Dep Menu",
              path: "/md5/article?id=5.0",
              nextPath: "/md5/article?id=5.1",
            },
            {
              id: "5.1",
              title: "STAR's Selection",
              path: "/md5/article?id=5.1",
              // prevPath:"/md5/article?id=1.0",
              // nextPath: "/md/article?id=1.0",
            },
          ],
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export default function ModuleSidebar({ children }) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const pathname = usePathname();
  const courseId=pathname.split("/")[2];
  const [activeId, setActiveId] = React.useState(null);
  
  // Use Context API for course progress management
  const { 
    getCompletedModules,
    markModuleCompleted,
    isModuleUnlocked,
    isModuleCompleted,
    isArticleCompleted
  } = useCourseProgress();
  
  // Get completed modules for this course
  const completedModules = getCompletedModules(courseId);

  // Helper function to get module index from moduleId (e.g., "md1" -> 0, "md2" -> 1)
  const getModuleIndex = (moduleId) => {
    if (!moduleId) return -1;
    const match = String(moduleId).match(/md(\d+)/);
    return match ? parseInt(match[1]) - 1 : -1; // Convert to 0-based index
  };

  // Function to calculate module progress
  const calculateModuleProgress = (moduleId) => {
    if (!courseDetails || !courseDetails[0] || !courseDetails[0].articles) return 0;
    
    // Get all articles for this module
    const moduleArticles = courseDetails[0].articles.filter(
      article => article.module_id === moduleId && article.doc_type !== "article"
    );
    
    if (moduleArticles.length === 0) return 0;
    
  // Count completed articles in this module
    const completedCount = moduleArticles.filter(article => 
      isArticleCompleted(courseId, moduleId, article.id)
    ).length;
    
    return Math.round((completedCount / moduleArticles.length) * 100);
  };

  const {
    data: courses,
    isLoading: isCoursesLoading,
    error: coursesError,
  } = useGetCourses();

  const {
    data: courseDetails,
    isLoading: isDetailsLoading,
    error: detailsError,
  } = useGetCourseDetails(courseId);

  function compareIds(id1, id2) {
    const parts1 = id1.split('.').map(Number);
    const parts2 = id2.split('.').map(Number);
  
    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const diff = (parts1[i] || 0) - (parts2[i] || 0);
      if (diff !== 0) return diff;
    }
    return 0;
  }
  
  
  
  if (isCoursesLoading || isDetailsLoading) {
  return <div className="flex justify-center items-center h-screen"><WormLoader/></div>;
  }
  console.log(courseDetails,"courseDetails");
  const filteredCourses=courses.filter((course)=>course.c_id===courseId && course.doc_type!="article");
  console.log(filteredCourses,"filteredCourses");
  // console.log(courseDetails,"courseDetails");
  const filteredCourseDetails = courseDetails[0].articles.sort((a, b) => compareIds(a.id, b.id)).filter((details)=>(details.parentId==='null' || details.parentId===null || details.parentId===undefined) && details.doc_type!="article");
 console.log(JSON.stringify(filteredCourseDetails),"filteredCourseDetails");
  // console.log(filteredCourseDetails,"filteredCourseDetails");

  return (
    <SidebarProvider className="--sidebar-width: 20rem">
      <Sidebar variant="inset">
        <SidebarHeader>
          <SidebarMenuButton
            className="w-fit px-1.5"
            onClick={() => router.push("/home")}
          >
            <Image
              src="/assets/logo.svg"
              alt="Logo"
              width={35}
              height={35}
              fetchPriority="high"
            />
          </SidebarMenuButton>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="md:text-3xl">{filteredCourses[0].full_heading}</SidebarGroupLabel>
            <SidebarMenu>
  {filteredCourses[0].modules.map((module) => (
    <Collapsible
      key={module.id}
      asChild
      defaultOpen={pathname.split("/")[3] === module.id}
      className="group/collapsible"
    >
      <div>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={module.title}
            className={`h-fit w-full data-[active=true]:bg-[#e9e9e9] ${pathname.split("/")[3] === module.id ? "bg-[hsl(196.62deg 17.69% 88.33% / 76%)] text-sidebar-accent-foreground" : ""}`}
            isActive={pathname.split("/")[3] === module.id}
          >
            {module.icon && <module.icon />}
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-semibold">
                {module.heading}
              </span>
              {/* Progress bar for module */}
              <div className="mt-1 w-full">
                <Progress 
                  value={calculateModuleProgress(module.id)} 
                  className="h-1.5 [&>div]:bg-green-500"
                />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">
                    {calculateModuleProgress(module.id)}% Complete
                  </span>
                  {isModuleCompleted(courseId, getModuleIndex(module.id)) && (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  )}
                </div>
              </div>
            </div>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          {filteredCourseDetails.map((coursedetails, index) => (
               <NestedSidebar
                key={coursedetails.id}
                courseDetails={coursedetails}
                allCourseDetails={courseDetails[0].articles}
                activeId={id}
                setActiveId={setActiveId}
                pathname={pathname}
                id={id}
                courseId={courseId}
                moduleId={module.id}
                moduleIndex={index}
              />
           ))}
        </CollapsibleContent>
      </div>
    </Collapsible>
  ))}
</SidebarMenu>

          </SidebarGroup>
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                {data.navSecondary.map((item) => (
                  <SidebarMenuItem key={item.title}>

                    <SidebarMenuButton asChild size="sm">
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        {/* <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={data.user.avatar}
                        alt={data.user.name}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {data.user.name}
                      </span>
                      <span className="truncate text-xs">
                        {data.user.email}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={data.user.avatar}
                          alt={data.user.name}
                        />
                        <AvatarFallback className="rounded-lg">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {data.user.name}
                        </span>
                        <span className="truncate text-xs">
                          {data.user.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Sparkles />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter> */}
      </Sidebar>
      <SidebarInset className="h-fit shadow-none">{children}</SidebarInset>
    </SidebarProvider>
  );
}