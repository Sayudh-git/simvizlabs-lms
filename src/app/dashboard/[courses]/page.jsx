"use client";
import { SidebarLeft } from "@/components/sidebar-left";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Plane, Youtube } from "lucide-react";
import Image from "next/image";
import React from "react";
// import data from "../data";
import ResponsiveCard from "../ResponsiveCard";
import { Progress } from "@/components/ui/progress";
import { FileText } from "lucide-react";
import { FileQuestion } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useGetCourses } from "@/hooks/useCourses";
import WormLoader from "@/app/components/WormLoader";
import RichText from "../../../components/RichText/index";
import {
  getCourseProgressById,
  getPercentageCompleted,
} from "@/lib/courseProgress";

export default function Page({ params }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [courseProgress, setCourseProgress] = useState(null);
  const paramsHook = React.use(params);

  // Load course progress on component mount
  useEffect(() => {
    setIsClient(true);
    const progress = getCourseProgressById(paramsHook.courses);
    setCourseProgress(progress);
  }, [paramsHook.courses]);

  const { data, isLoading, isError } = useGetCourses();
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <WormLoader />
      </div>
    );

  if (isError) {
    return <div>Error loading data</div>;
  }

  const filteredData = data.filter((item) =>
    React.use(params).courses.includes(item.c_id)
  );

  const handleResumeCourse = () => {
    if (courseProgress) {
      // Resume from the last saved position
      router.push(
        `/dashboard/${paramsHook.courses}/${courseProgress.lastModuleId}/article?id=${courseProgress.lastArticleId}`
      );
    } else {
      // If no progress, start from the first module
      const firstModule = filteredData[0]?.modules?.[0];
      if (firstModule) {
        router.push(
          `/dashboard/${paramsHook.courses}/${firstModule.id}/article?id=${firstModule.entry}`
        );
      }
    }
  };

  console.log("Filtered Data:", filteredData);

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
                <h3 className="text-3xl flex">Hello Olivia</h3>
              </div>
              <div>
                <p className="font-extralight text-gray-500 uppercase">
                  Spartan College of Aeronautics and Technology
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 mt-2 flex-col   p-4">
          {/* course details */}
          <div className="mx-auto   w-full rounded-xl">
            <div className="relative">
              <Image
                src={"/MainBackground.svg"}
                alt="Background"
                className="w-full object-cover rounded-xl"
                layout="fill"
              />
              <div className="relative top-0 left-0 right-0 bottom-0 flex flex-col items-start justify-center text-white p-4">
                <p>COURSE</p>
                <h1 className="text-left text-2xl md:text-xl sm:text-lg font-bold">
                  {filteredData[0].full_heading}
                </h1>
                <div className="flex items-center space-x-2 mt-2">
                  <Image
                    src="/assets/logo_white.svg"
                    alt="Plane"
                    width={20}
                    height={20}
                    className="mr-1"
                  />
                  <span>SimVizLabs LLC</span>
                </div>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-between w-full mt-4 md:text-sm">
                  <div className="flex flex-col w-full md:w-[50%]">
                    <div className="flex flex-row space-x-4 mt-4 w-full md:w-[60%] justify-between">
                      <div className="flex items-center space-x-1">
                        <Image
                          src="/assets/lesson.svg"
                          alt="Lesson"
                          width={20}
                          height={20}
                          className="mr-1"
                        />
                        <div className="text-center text-xs font-semibold">
                          {filteredData[0].modules.length}{" "}
                          <span className="font-thin">Modules</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Image
                          src="/assets/quiz.svg"
                          alt="quiz"
                          width={20}
                          height={20}
                          className="mr-1"
                        />
                        <div className="text-center text-xs font-semibold">
                          {0} <span className="font-thin">quizzes</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Image
                          src="/assets/progress.svg"
                          alt="progress"
                          width={20}
                          height={20}
                          className="mr-1"
                        />
                        <div className="text-center text-xs font-semibold">
                          {getPercentageCompleted(
                            filteredData[0].c_id,
                            filteredData[0].modules.length
                          )}
                          % <span className="font-thin">Completed</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress
                        value={getPercentageCompleted(
                          filteredData[0].c_id,
                          filteredData[0].modules.length
                        )}
                        className="w-full h-2 md:h-3 rounded-lg bg-white [&>div]:bg-blue-500 "
                      />
                      <div className="flex justify-between text-xs md:text-sm mt-1"></div>
                    </div>
                  </div>
                  <div className="flex item-baseline items-center">
                    <button
                      className="bg-blue-600 hover:bg-blue-800 text-white font-bold px-6 rounded-xl bg-opacity-80 h-[2.75rem] w-full md:w-[12rem]"
                      onClick={handleResumeCourse}
                    >
                      <div className="opacity-100">
                        {courseProgress ? "RESUME COURSE" : "START COURSE"}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto   relative w-full rounded-xl  ">
            {/* course description */}
            <div className="mt-5 flex gap-y-5 flex-col">
              <div>
                <div className="mt-4 mb-2 font-semibold text-[#344054] opacity-50">
                  COURSE DESCRIPTION
                </div>
                <article>
                  {filteredData[0].description && (
                    <RichText
                      className="width-[100%]"
                      data={filteredData[0].description}
                      enableGutter={false}
                    />
                  )}
                  {/* {filteredData[0].description?.map((item, index) => {
                    return <p className="mb-4" key={index}>{item}</p>;
                  })} */}
                </article>
              </div>
              {/* <div>
                <div className="mt-4 mb-2 font-semibold text-[#344054] opacity-50">
                  KEY TOPICS:
                </div>
                {filteredData[0].keyTopics && <RichText data={filteredData[0].keyTopics} enableGutter={false} />}
              </div> */}
            </div>
            {/*  modules */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredData[0].modules.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <h1 className="font-bold uppercase my-2 text-[#344054] opacity-50">
                    {`MODULE ${item.id[item.id.length - 1]}`}
                  </h1>
                  <strong className="font-bold text-2xl text-[#344054] truncate">
                    {item.heading}
                  </strong>
                  <ResponsiveCard details={item} path={paramsHook.courses} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
