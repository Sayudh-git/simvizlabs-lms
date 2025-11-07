import Image from 'next/image';
import React from 'react';

function GradientCard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-start relative overflow-hidden sm:py-12">
      <div className="">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
             <Image src={"/topic1Chapter.png"} width={200} height={200} />
            <div className="space-y-2">
              <p className="text-slate-800">Learn how to make a glowing gradient background!</p>
              <a
                href="https://braydoncoyer.dev/blog/tailwind-gradients-how-to-make-a-glowing-gradient-background"
                className="block text-indigo-400 group-hover:text-slate-800 transition duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Article →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradientCard;
