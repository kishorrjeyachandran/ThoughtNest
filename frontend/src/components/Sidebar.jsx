import { useState } from "react";

import {
  Home,
  Sparkles,
  Flame,
  PenSquare,
  FileText,
  User,
  Search,
  FilePenLine,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  Moon,
  Sun,
  Bookmark,
  History,
  Bell,
  Settings,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  useTheme,
} from "../context/ThemeContext";

function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const { theme, toggleTheme } =
    useTheme();

  const [search, setSearch] =
    useState("");

  const navItems = [
    {
      name: "Home",
      icon: Home,
      path: "/",
    },
    
    {
      name: "Feed",
      icon: Sparkles,
      path: "/feed",
    },
    {
      name: "Notifications",
      icon: Bell,
      path: "/notifications",
    },
    {
      name: "Trending",
      icon: Flame,
      path: "/trending",
    },
    {
      name: "Articles",
      icon: FileText,
      path: "/articles",
    },
    {
      name: "Bookmarks",
      icon: Bookmark,
      path: "/bookmarks",
    },
    {
      name: "History",
      icon: History,
      path: "/history",
    },
    {
  name: "Drafts",
  icon: FilePenLine,
  path: "/drafts",
},
    {
      name: "Write",
      icon: PenSquare,
      path: "/create",
    },
    {
      name: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/search?q=${search}`);
  };

  return (
    <aside
      className={`
        h-screen
        bg-[#F5F5F5] dark:bg-[#202020]
        border-r border-[#E5E5E5] dark:border-[#2B2B2B]
        fixed left-0 top-0
        flex flex-col
        transition-all duration-300
        z-50
        text-black dark:text-white
        ${collapsed ? "w-[78px]" : "w-[260px]"}
      `}
    >

      {/* Top */}
      <div
        className="
          h-14
          border-b border-[#E5E5E5]
          dark:border-[#2B2B2B]
          flex items-center justify-between
          px-4
        "
      >

        {!collapsed && (
          <Link
            to="/"
            className="
              text-[15px]
              font-semibold
              whitespace-nowrap
            "
          >
            ThoughtNest
          </Link>
        )}

        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
          className="
            w-8 h-8 rounded-md
            hover:bg-[#EAEAEA]
            dark:hover:bg-[#2A2A2A]
            flex items-center justify-center
            transition
          "
        >

          {collapsed ? (
            <PanelLeftOpen size={17} />
          ) : (
            <PanelLeftClose size={17} />
          )}

        </button>

      </div>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="px-3 pt-4"
      >

        <div
          className="
            w-full h-9 rounded-md
            bg-[#ECECEC]
            dark:bg-[#2A2A2A]
            flex items-center gap-3
            px-3
          "
        >

          <Search
            size={17}
            className="
              text-[#707070]
              dark:text-[#9B9B9B]
            "
          />

          {!collapsed && (

            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                bg-transparent
                outline-none
                text-sm
                w-full
                text-black
                dark:text-white
                placeholder:text-[#707070]
                dark:placeholder:text-[#9B9B9B]
              "
            />

          )}

        </div>

      </form>

      {/* Navigation */}
      <nav className="mt-3 px-3 flex flex-col gap-1">

        {navItems.map((item) => {
          const Icon = item.icon;

          const active =
            location.pathname ===
            item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`
                h-9 rounded-md
                flex items-center gap-3
                px-3 text-sm
                transition
                ${
                  active
                    ? "bg-[#EAEAEA] dark:bg-[#2A2A2A] text-black dark:text-white"
                    : "text-[#707070] dark:text-[#9B9B9B] hover:bg-[#EAEAEA] dark:hover:bg-[#2A2A2A] hover:text-black dark:hover:text-white"
                }
              `}
            >

              <Icon size={17} />

              {!collapsed && (
                <span className="whitespace-nowrap">
                  {item.name}
                </span>
              )}

            </Link>
          );
        })}

      </nav>

      {/* Bottom */}
      <div className="mt-auto px-3 pb-4 space-y-1">

        {/* Settings */}
        <Link
          to="/settings"
          className="
            w-full h-9 rounded-md
            hover:bg-[#EAEAEA]
            dark:hover:bg-[#2A2A2A]
            flex items-center gap-3
            px-3 text-sm
            text-[#707070]
            dark:text-[#9B9B9B]
            hover:text-black
            dark:hover:text-white
            transition
          "
        >

          <Settings size={17} />

          {!collapsed && (
            <span>
              Settings
            </span>
          )}

        </Link>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="
            w-full h-9 rounded-md
            hover:bg-[#EAEAEA]
            dark:hover:bg-[#2A2A2A]
            flex items-center gap-3
            px-3 text-sm
            text-[#707070]
            dark:text-[#9B9B9B]
            hover:text-black
            dark:hover:text-white
            transition
          "
        >

          {theme === "dark" ? (
            <Sun size={17} />
          ) : (
            <Moon size={17} />
          )}

          {!collapsed && (
            <span>
              {theme === "dark"
                ? "Light Mode"
                : "Dark Mode"}
            </span>
          )}

        </button>

        {/* Logout */}
        {user && (

          <button
            onClick={logout}
            className="
              w-full h-9 rounded-md
              hover:bg-red-500/10
              flex items-center gap-3
              px-3 text-sm
              text-red-400
              transition
            "
          >

            <LogOut size={17} />

            {!collapsed && (
              <span>
                Logout
              </span>
            )}

          </button>

        )}

      </div>

    </aside>
  );
}

export default Sidebar;