"use client";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Powered by banner */}
        <div className="text-center mb-12">
          <div className="inline-block bg-white rounded-full px-6 py-2 shadow-sm border border-gray-100 mb-8">
            <p className="text-gray-600 text-sm">
              Powered by <span className="font-semibold">Together AI</span>.
              Used by <span className="font-semibold">600k+ users</span>.
            </p>
          </div>
          <h1 className="text-[3.5rem] font-bold tracking-tight text-[#2D3648] leading-tight">
            What <span className="text-primary">viral post</span> do you want to
            create?
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.05)] border border-gray-100 p-6">
          <div className="flex flex-col gap-4">
            {/* Input Area */}
            <div className="relative">
              <input
                type="text"
                placeholder="Build me a budgeting app..."
                className="w-full px-4 py-4 text-gray-700 bg-transparent border-0 focus:ring-0 focus:outline-none text-lg placeholder-gray-400"
              />
            </div>

            {/* Controls Row */}
            <div className="flex items-center gap-3 border-t pt-4">
              <select className="bg-transparent border rounded-lg px-3 py-2 text-sm text-gray-600 focus:ring-blue-500 focus:border-blue-500">
                <option>Gwen 2.5 Coder 32B</option>
              </select>
              <select className="bg-transparent border rounded-lg px-3 py-2 text-sm text-gray-600 focus:ring-blue-500 focus:border-blue-500">
                <option>High quality [slower]</option>
              </select>
              <button className="ml-auto flex items-center gap-2 border rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Attach
              </button>
              <button className="bg-blue-500 text-white rounded-lg px-5 py-2 text-sm hover:bg-blue-600 transition-colors font-medium">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-8 justify-center">
          {[
            "Quiz app",
            "SaaS Landing page",
            "Pomodoro Timer",
            "Blog app",
            "Flashcard app",
            "Timezone dashboard",
          ].map((item) => (
            <button
              key={item}
              className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-600 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
