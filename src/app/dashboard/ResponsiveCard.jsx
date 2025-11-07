"use client";
import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Youtube } from "lucide-react";
import { FileText } from "lucide-react";
import { FileQuestion } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { saveCourseProgress } from "@/lib/courseProgress";

export default function ResponsiveCard({ details, path }) {
  const router = useRouter();
  const handleModuleClick = () => {
    // Save progress when user clicks on a module
    saveCourseProgress(path, details.id, details.entry);
    router.push(`/dashboard/${path}/${details.id}/article?id=${details.entry}`);
  };

  return (
    <div>
    <Card
      className="w-full overflow-hidden mt-3 cursor-pointer border-2 shadow-sm hidden sm:block"
      onClick={handleModuleClick}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Left side - Image (30% width on larger screens) */}
        <div className="w-full sm:w-[40%] sm:h-fit md:h-auto ">
          <Image
            src={`/course/airbus_a320/thumbnail/${details.thumbnail}.png`}
            alt="Card image"
            width={1080}
            height={1080}
            className="md:w-full md:h-full object-fill"
          />
        </div>

        {/* Right side - Content (70% width on larger screens) */}
        <div className="w-full sm:w-[60%] flex flex-col sm:px-1 md:px-2 lg:px-5 py-[calc(7em-80px)]">
          {/* Top section - Heading */}
          <CardContent className="flex-grow p-0">
            <h2 className="text-2xl font-bold truncate">{details.title}</h2>
          </CardContent>

          {/* Bottom section - Completed icon */}
          <div className="flex items-center align-middle justify-end">
            <div className="flex flex-row space-x-4 items-center justify-between w-full text-[#667085]">
              <div className="flex flex-row space-x-6 mt-4">
                <div className="flex items-center">
                  <div className="flex gap-1">
                    <Image
                      src="/assets/lesson_black.svg"
                      alt="Lesson"
                      width={20}
                      height={20}
                    />
                    <p className="font-semibold">{details.timing?details.timing:0}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex gap-1">
                    <Image
                      src="/assets/doc_black.svg"
                      alt="Quiz"
                      width={20}
                      height={20}
                    />
                    <p className="font-semibold">{details.quizzes?details.quizzes:0}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex gap-1">
                    <Image
                      src="/assets/quiz_black.svg"
                      alt="Quiz"
                      width={20}
                      height={20}
                    />{" "}
                    <p className="font-semibold">{details.docs?details.docs:0}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex  justify-center text-white">
              {details.completed && (
                <Check className="w-5 h-5 bg-green-500 rounded-full" />
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>

    <div className="block sm:hidden w-full">
      <div
        className={cn(
          "group w-full cursor-pointer overflow-hidden relative card h-80 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
          `bg-[url(/contentSidePosterLeft.png)] bg-cover`,
          // Preload hover image by setting it in a pseudo-element
          "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
          "transition-all duration-500"
        )}
        onClick={handleModuleClick}
      >
        <div className="text relative z-50">
          <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
          {details.title}
          </h1>
          <p className="font-normal text-base text-gray-50 relative my-4">
          <div className="flex items-center align-middle justify-end">
            <div className="flex flex-row space-x-4 items-center justify-between w-full text-[#667085]">
              <div className="flex flex-row space-x-6 mt-4">
                <div className="flex items-center">
                  <div className="flex gap-1">
                    <Image
                      src="/assets/lesson_black.svg"
                      alt="Lesson"
                      width={20}
                      height={20}
                    />
                    <p className="font-semibold">08:48</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex gap-1">
                    <Image
                      src="/assets/doc_black.svg"
                      alt="Quiz"
                      width={20}
                      height={20}
                    />
                    <p className="font-semibold">3</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex gap-1">
                    <Image
                      src="/assets/quiz_black.svg"
                      alt="Quiz"
                      width={20}
                      height={20}
                    />{" "}
                    <p className="font-semibold">2</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex  justify-center text-white">
              {details.completed && (
                <Check className="w-5 h-5 bg-green-500 rounded-full" />
              )}
            </div>
          </div>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}
