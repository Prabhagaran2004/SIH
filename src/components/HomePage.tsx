import React from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Video, Gamepad2, Brain, Heart } from "lucide-react";
import type { PageType } from "../types";

interface HomePageProps {
  currentStressLevel: number;
  setCurrentPage: (page: PageType) => void;
  getStressLevelColor: (level: number) => string;
  getStressLevelText: (level: number) => string;
}

const HomePage: React.FC<HomePageProps> = ({
  currentStressLevel,
  setCurrentPage,
  getStressLevelColor,
  getStressLevelText,
}) => {
  const navigate = useNavigate();

  const handleNavigation = (page: PageType) => {
    setCurrentPage(page);
    navigate(`/${page}`);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-full w-24 h-24 mx-auto flex items-center justify-center border border-white/20">
          <Brain className="w-12 h-12 text-teal-300" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to MindEase
          </h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Your personal mental health companion. Share your thoughts, track
            your stress levels, and discover personalized ways to find peace and
            balance.
          </p>
        </div>
      </div>

      {/* Current Stress Level Card */}
      <div className="bg-white/3 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Current Stress Level
            </h3>
            <div className="flex items-center space-x-3">
              <span
                className={`text-2xl font-bold ${getStressLevelColor(
                  currentStressLevel
                )}`}
              >
                {currentStressLevel}/10
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStressLevelColor(
                  currentStressLevel
                )} bg-white/10`}
              >
                {getStressLevelText(currentStressLevel)}
              </span>
            </div>
          </div>
          <Heart
            className={`w-12 h-12 ${getStressLevelColor(currentStressLevel)}`}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <button
          onClick={() => handleNavigation("chat")}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 shadow-2xl group"
        >
          <MessageCircle className="w-12 h-12 text-teal-300 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-semibold text-white mb-2">
            AI Chat Support
          </h3>
          <p className="text-emerald-100">
            Talk to our AI companion about your feelings and get personalized
            support
          </p>
        </button>

        <button
          onClick={() => handleNavigation("videos")}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 shadow-2xl group"
        >
          <Video className="w-12 h-12 text-sage-300 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Relaxation Videos
          </h3>
          <p className="text-emerald-100">
            Watch calming videos designed to reduce stress and promote
            mindfulness
          </p>
        </button>

        <button
          onClick={() => handleNavigation("games")}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 shadow-2xl group"
        >
          <Gamepad2 className="w-12 h-12 text-emerald-300 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Stress Relief Games
          </h3>
          <p className="text-emerald-100">
            Play therapeutic games designed to help you relax and unwind
          </p>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
