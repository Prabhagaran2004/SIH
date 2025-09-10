import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  MessageCircle,
  Video,
  Gamepad2,
  User,
  Brain,
} from "lucide-react";
import type { PageType } from "../types";

interface NavigationProps {
  setCurrentPage: (page: PageType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home" as PageType, icon: Home, label: "Home", path: "/home" },
    {
      id: "chat" as PageType,
      icon: MessageCircle,
      label: "Chat",
      path: "/chat",
    },
    { id: "videos" as PageType, icon: Video, label: "Videos", path: "/videos" },
    { id: "games" as PageType, icon: Gamepad2, label: "Games", path: "/games" },
  ];

  const handleNavigation = (page: PageType, path: string) => {
    setCurrentPage(page);
    navigate(path);
  };

  const handleProfileClick = () => {
    setCurrentPage("profile");
    navigate("/profile");
  };

  const getCurrentPage = (): PageType => {
    const path = location.pathname;
    switch (path) {
      case "/home":
        return "home";
      case "/chat":
        return "chat";
      case "/videos":
        return "videos";
      case "/games":
        return "games";
      case "/profile":
        return "profile";
      default:
        return "home";
    }
  };

  const activePage = getCurrentPage();

  return (
    <nav className="relative z-10 p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-lg rounded-full w-12 h-12 flex items-center justify-center border border-white/20">
              <Brain className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MindEase</h1>
              <p className="text-xs text-emerald-200">
                Mental Health Companion
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex justify-center space-x-6">
            {navItems.map(({ id, icon: Icon, label, path }) => (
              <button
                key={id}
                onClick={() => handleNavigation(id, path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-2xl transition-all duration-300 ${
                  activePage === id
                    ? "bg-white/20 text-white shadow-lg scale-105"
                    : "text-emerald-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium hidden md:block">{label}</span>
              </button>
            ))}
          </div>

          {/* Profile Button */}
          <button
            onClick={handleProfileClick}
            className={`flex items-center space-x-2 px-4 py-2 rounded-2xl transition-all duration-300 ${
              activePage === "profile"
                ? "bg-white/20 text-white shadow-lg scale-105"
                : "text-emerald-200 hover:text-white hover:bg-white/10"
            }`}
          >
            <User className="w-5 h-5" />
            <span className="font-medium hidden md:block">Profile</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
