"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ExternalLink, Download, Star, Users, Award, Smartphone, Globe } from "lucide-react";
import { toast } from "sonner";

export default function FMSPage() {
  const handleAppStoreRedirect = () => {
    window.open('https://apps.apple.com/us/app/airbus-a320-fms/id6743235055', '_blank');
    toast.success("Redirecting to App Store...");
  };

  const appFeatures = [
    {
      icon: <Award className="h-6 w-6 text-blue-600" />,
      title: "Preflight Setup",
      description: "Industry-standard DIFRIPPS workflow to initialize and program the FMGC"
    },
    {
      icon: <Globe className="h-6 w-6 text-green-600" />,
      title: "Global Navigation Database",
      description: "Worldwide database of airports, SIDs, STARs, and airways"
    },
    {
      icon: <Smartphone className="h-6 w-6 text-purple-600" />,
      title: "Navigation Display",
      description: "PLAN, ARC, ROSE, NAV modes with full scroll capability"
    },
    {
      icon: <Users className="h-6 w-6 text-orange-600" />,
      title: "Live Flight Functionality",
      description: "Practice FMS features with holds, offsets, and waypoint programming"
    }
  ];

  const pricingPlans = [
    {
      name: "Monthly",
      price: "$29.99",
      period: "per month",
      popular: false
    },
    {
      name: "Annual",
      price: "$79.99",
      period: "per year",
      popular: true
    },
    {
      name: "Lifetime",
      price: "$49.99",
      period: "one-time",
      popular: false
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-blue-100 rounded-full">
            <Smartphone className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Airbus A320 FMS</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Master the A320 Flight Management System with integrated Navigation Display. 
          Professional-grade simulation for real-world airline operations.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge className="bg-green-100 text-green-800 px-3 py-1">
            <Star className="h-4 w-4 mr-1" />
            3.0 Rating
          </Badge>
          <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
            <Download className="h-4 w-4 mr-1" />
            Free Download
          </Badge>
          <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
            <Award className="h-4 w-4 mr-1" />
            iPad Optimized
          </Badge>
        </div>
      </div>

      <Separator />

      {/* App Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Professional FMS Training</h2>
          <p className="text-lg text-gray-600">
            Train like you fly. Build proficiency and confidence with a professional-grade A320 FMS simulation 
            designed for real-world airline operations.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700">Preflight Setup with DIFRIPPS workflow</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700">Live Flight Functionality and Navigation Display</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700">Global Navigation Database with SIDs/STARs</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700">Performance Initialization and PERF Pages</span>
            </div>
          </div>

          <Button 
            onClick={handleAppStoreRedirect}
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            Download from App Store
          </Button>
        </div>

        <div className="flex justify-center">
          <div className="relative">
            <div className="w-80 h-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-2xl flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">A320 FMS</h3>
                <p className="text-gray-600">Professional Training App</p>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {appFeatures.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900">Subscription Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`p-6 relative ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-3 py-1">Most Popular</Badge>
                </div>
              )}
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                <div className="space-y-1">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <p className="text-gray-600">{plan.period}</p>
                </div>
                <Button 
                  onClick={handleAppStoreRedirect}
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                >
                  Get Started
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* App Store Information */}
      <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">Download Now</h3>
            <p className="text-gray-600">
              Available on iPad, Mac, and Apple Vision. Take your pilot training to the next level 
              with professional-grade A320 FMS simulation.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Developer:</span>
                <span>SIMVIZ LABS LLC</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Size:</span>
                <span>271.8 MB</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Category:</span>
                <span>Education</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Compatibility:</span>
                <span>iPadOS 17.0+, macOS 14.0+, visionOS 1.0+</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={handleAppStoreRedirect}
              size="lg" 
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg"
            >
              <ExternalLink className="h-6 w-6 mr-3" />
              View on App Store
            </Button>
          </div>
        </div>
      </Card>

      {/* Footer Info */}
      <div className="text-center space-y-4">
        <p className="text-gray-600">
          Training and educational use only; not an FAA/EASA-approved flight simulator.
        </p>
        <div className="flex justify-center gap-6 text-sm text-gray-500">
          <a href="https://simvizlabs.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            Terms of Use
          </a>
          <a href="https://simvizlabs.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}
