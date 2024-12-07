"use client";
import EditorBody from "@/components/editor/body/Body.editor.comp";
import React, { Suspense, useState, useEffect } from "react";
import MainSidebar from "@/components/editor/sidebar/Main.comp";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EditorNavbar from "@/components/editor/navbar/Editor-Navbar.comp";

function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden ">
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <EditorNavbar />
        <div
          className={`fixed top-[63px] left-0 h-[calc(100vh-63px)] z-30 transition-all duration-300 ease-in-out ${
            isCollapsed ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <MainSidebar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </div>
        <main
          className={`flex-1 max-h-full p-5 bg-slate-100 overflow-hidden overflow-y-scroll main-bgs relative transition-all duration-300 ease-in-out ${
            isCollapsed ? "ml-0" : "md:ml-[390px]"
          }`}
        >
          <div className="mt-2 w-full">
            <EditorBody />
          </div>
        </main>
      </div>
      <button
        className={`fixed bottom-4 bg-primary text-white p-2 rounded-full shadow-lg z-40 transition-all duration-200 ease-in-out ${
          isMobile ? "right-4" : isCollapsed ? "left-4" : "left-[394px]"
        }`}
        onClick={toggleSidebar}
      >
        {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
      </button>
    </div>
  );
}

export default Dashboard;
