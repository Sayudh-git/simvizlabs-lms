"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Download, Eye, Calendar, Award, User } from "lucide-react";
import { toast } from "sonner";

export default function CertificatesPage() {
  // Sample course data - replace with your actual course data
  const courses = [
    // {
    //   c_id: "general",
    //   short_heading: "Introduction to FMS",
    //   title: "Flight Management System Fundamentals",
    //   image: "/assets/logo.svg",
    //   status: "Active"
    // },
    {
      c_id: "airbus_a320",
      short_heading: "Airbus A320",
      title: "Airbus A320 Flight Operations",
      image: "/assets/logo.svg",
      status: "Active"
    },
    // {
    //   c_id: "boeing_737",
    //   short_heading: "Boeing 737",
    //   title: "Boeing 737 Flight Operations",
    //   image: "/assets/logo.svg",
    //   status: "Active"
    // }
  ];

  const handleDownloadCertificate = (courseName) => {
    try {
      // Create a temporary link element to trigger download
      const link = document.createElement('a');
      link.href = '/certificate/certficate.png';
      link.download = `${courseName.replace(/\s+/g, '_')}_Certificate.png`;
      link.target = '_blank';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Certificate download started!");
    } catch (error) {
      console.error('Error downloading certificate:', error);
      toast.error("Failed to download certificate. Please try again.");
    }
  };

  const handleViewCertificate = () => {
    // Open certificate in new tab
    window.open('/certificate/certficate.png', '_blank');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Award className="h-8 w-8 text-yellow-600" />
          <h1 className="text-3xl font-bold">Certificates</h1>
        </div>
        <p className="text-gray-600">
          Download your course completion certificates
        </p>
      </div>

      <Separator />

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
            <Card key={course.c_id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Course Image and Title */}
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Image
                      src={course.image || "/assets/logo.svg"}
                      alt={course.short_heading}
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-green-500 text-white">
                        <Award className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{course.short_heading}</h3>
                    <p className="text-sm text-gray-600 truncate">{course.title}</p>
                  </div>
                </div>

                {/* Course Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Completed: {new Date().toLocaleDateString()}</span>
                  </div>
                  {/* <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>Student: John Doe</span>
                  </div> */}
                </div>

                {/* Progress Bar */}
                {/* <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-full"></div>
                  </div>
                </div> */}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handleViewCertificate}
                    variant="outline"
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button
                    onClick={() => handleDownloadCertificate(course.short_heading)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

      {/* Footer Info */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-3">
          <Award className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-medium text-blue-900">About Certificates</h4>
            <p className="text-sm text-blue-700">
              Download your course completion certificates. All certificates are available for download 
              and can be viewed in a new tab.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
