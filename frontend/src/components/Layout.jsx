import {
  useState,
} from "react";

import Sidebar from "./Sidebar";

function Layout({
  children,
  title,
}) {
  const [collapsed, setCollapsed] =
    useState(false);

  return (
    <div
      className="
        min-h-screen
        bg-white dark:bg-[#191919]
        text-black dark:text-white
        transition-colors duration-300
      "
    >

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main */}
      <main
        className={`
          transition-all duration-300
          min-h-screen
          ${
            collapsed
              ? "ml-[78px]"
              : "ml-[260px]"
          }
        `}
      >

        {/* Top Bar */}
        <header
          className="
            h-14
            border-b border-[#E5E5E5]
            dark:border-[#2B2B2B]
            flex items-center
            px-10
            sticky top-0
            bg-white/80 dark:bg-[#191919]/80
            backdrop-blur-md
            z-40
          "
        >

          <h1
            className="
              text-[15px]
              text-[#707070]
              dark:text-[#9B9B9B]
            "
          >
            {title}
          </h1>

        </header>

        {/* Content */}
        <div className="px-6 md:px-10 py-10">
          {children}
        </div>

      </main>

    </div>
  );
}

export default Layout;