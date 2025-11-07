"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { SidebarLeft } from "@/components/sidebar-left";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetCourses } from "@/hooks/useCourses";
import WormLoader from "../components/WormLoader";
import {  useCourseProgress } from "@/contexts/CourseProgressContext";
import { getPercentageCompleted } from "@/lib/courseProgress";

// const coursesData = [
//   {
//     title: "Introduction to FMS",
//     progress: 65,
//     currentModule: "FMS Operations",
//     status: "Active",
//     image: "/assets/logo.svg",
//     path: "/dashboard/general",
//   },
//   {
//     title: "Boeing 737",
//     progress: 0,
//     currentModule: "FMS Operations",
//     status: "Locked",
//     image: "/assets/logo.svg",
//     path: "/dashboard/boeing_737",
//   },
//   {
//     title: "Airbus A320",
//     progress: 20,
//     currentModule: "Introduction",
//     status: "Active",
//     image: "/assets/logo.svg",
//     path: "/dashboard/airbus_a320",
//   },
//   {
//     title: "Boeing 747",
//     progress: 0,
//     currentModule: "Introduction",
//     status: "Locked",
//     image: "/assets/logo.svg",
//     path: "/dashboard/boeing_747",
//   },
// ];



const quickAccess = [
  { title: "FMS Simulator", icon: "/assets/live.svg" ,url:"fms"},
  { title: "Certificates", icon: "/assets/doc_black.svg" ,url:"certificates"},
  { title: "Bookmarks", icon: "/assets/quiz_black.svg",url:"bookmarks" },
];

export default function HomePage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  // Fetch courses using the custom hook
   const { data, isLoading, error } = useGetCourses({ limit: 10, page: 1 });

  if (isLoading) return <div className="flex justify-center items-center h-screen"><WormLoader/></div>;
  if (error) return <div>Error: {error.message}</div>;

  // useEffect(() => {
  //   // Simulate loading courses data
  //   setCourses(coursesData);
  // }, []);

  const handleNavigation=(url)=>{
    router.push(`quickaccess/${url}`);
  }

  const handleContinueLearning = (courseId) => {
    router.push(`/dashboard/${courseId}`);  };

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset className="py-4">
        <div className="top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Image
              src="/assets/college_logo.svg"
              alt="Logo"
              width={45}
              height={45}
              className="pt-4"
            />
            <div className="mt-4">
              <div>
                <h3 className="md:text-xl lg:text-3xl flex">
                  Welcome to SimVizLabs
                </h3>
              </div>
              <div>
                <p className="font-extralight sm:text-md lg:text-lg text-gray-500 uppercase">
                  Spartan College of Aeronautics and Technology
                </p>
              </div>
            </div>
            {/* <div className="flex justify-end gap-2">
              <a
                href="/sign-in"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Login
              </a>
              <a
                href="/sign-up"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Signup
              </a>
            </div> */}
          </div>
        </div>

        <div className="p-6 grid gap-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">Your Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {data?.map((course, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-shadow cursor-pointer border min-w-[200px] border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={course.image?course.image:"/assets/logo.svg"}
                      alt={course.short_heading}
                      width={40}
                      height={40}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{course.short_heading}</h3>
                      <span
                        className={`text-sm px-2 py-1 capitalize rounded-full inline-block mt-1 ${
                          course.status === "Active" ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800 "
                        }`}
                      >
                        {course.status ? course.status:"Locked"}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {course.progress?course.progress:getPercentageCompleted(course.c_id,course.modules.length)}%
                      </div>
                      <div className="text-sm text-gray-500">Completed</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>
                        {course.status === "active"
                          ? "Current Module:"
                          : "First Chapter:"}
                      </span>
                      <span className="font-medium capitalize">
                        {course.currentModule? course.currentModule : course.status}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress?course.progress:getPercentageCompleted(course.c_id,course.modules.length)}%` }}
                      ></div>
                    </div>
                    <button
                      onClick={() => handleContinueLearning(course.c_id)}
                      className={`w-full py-3 px-4 rounded-xl text-white font-medium transition-colors duration-200 ${
                         course.status === "active"
                          ?
                           "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
                          : "bg-gray-400 cursor-not-allowed"
                      }
                          `}
                      disabled={course.status !== "active"}
                    >
                      {course.status == "active"
                        ? "Continue Learning"
                        : "Coming Soon"}
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Quick Access</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickAccess.map((item, index) => (
                <Card
                  key={index}
                  className="p-4 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                  onClick={()=>handleNavigation(item.url)}
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={24}
                    height={24}
                  />
                  <span className="font-medium">{item.title}</span>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Announcements & News</h2>
            <Card className="p-6">
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold">
                    Live Session: Advanced FMS Operations
                  </h3>
                  <p className="text-gray-600">Tomorrow at 1400Z (UTC)</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold">New Module Released</h3>
                  <p className="text-gray-600">
                    Boeing 737 RNAV Approaches now available
                  </p>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
