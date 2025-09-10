import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import ChatPage from "./components/ChatPage";
import VideosPage from "./components/VideosPage";
import GamesPage from "./components/GamesPage";
import ProfilePage from "./components/ProfilePage";
import Navigation from "./components/Navigation";
import Background from "./components/Background";
import type { ChatMessage, PageType, UserProfile } from "./types";
import {
  analyzeStressLevel,
  getAIResponse,
  getStressLevelColor,
  getStressLevelText,
} from "./utils";

const MentalHealthApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentStressLevel, setCurrentStressLevel] = useState(5);
  const [isTyping, setIsTyping] = useState(false);

  // Sample user profile data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    joinDate: new Date("2024-01-15"),
    totalSessions: 47,
    averageStressLevel: 4.2,
    streakDays: 12,
    favoriteActivity: "Meditation",
    goals: [
      "Reduce daily stress to under 4/10",
      "Complete 50 total sessions",
      "Maintain 30-day streak",
      "Try all relaxation videos",
    ],
    achievements: [
      "First Session Complete",
      "7-Day Streak",
      "Stress Reducer",
      "Video Explorer",
      "Game Master",
    ],
  });

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    const stressLevel = analyzeStressLevel(inputMessage);
    setCurrentStressLevel(stressLevel);

    // const newStressData: StressData = {
    //   level: stressLevel,
    //   timestamp: new Date(),
    //   context: inputMessage.substring(0, 50),
    // };

    // setStressHistory((prev) => [...prev, newStressData]);
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputMessage, stressLevel),
        isUser: false,
        timestamp: new Date(),
        stressLevel: stressLevel,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900">
        <Background />

        <Navigation setCurrentPage={setCurrentPage} />

        {/* Main Content */}
        <main className="relative z-10 container mx-auto px-6 pb-12">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
              path="/home"
              element={
                <HomePage
                  currentStressLevel={currentStressLevel}
                  setCurrentPage={setCurrentPage}
                  getStressLevelColor={getStressLevelColor}
                  getStressLevelText={getStressLevelText}
                />
              }
            />
            <Route
              path="/chat"
              element={
                <ChatPage
                  messages={messages}
                  inputMessage={inputMessage}
                  setInputMessage={setInputMessage}
                  sendMessage={sendMessage}
                  currentStressLevel={currentStressLevel}
                  getStressLevelColor={getStressLevelColor}
                  isTyping={isTyping}
                />
              }
            />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route
              path="/profile"
              element={
                <ProfilePage
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                />
              }
            />
          </Routes>

          {/* Conditional rendering for non-routed navigation (fallback) */}
          {!window.location.pathname.startsWith("/") && (
            <>
              {currentPage === "home" && (
                <HomePage
                  currentStressLevel={currentStressLevel}
                  setCurrentPage={setCurrentPage}
                  getStressLevelColor={getStressLevelColor}
                  getStressLevelText={getStressLevelText}
                />
              )}
              {currentPage === "chat" && (
                <ChatPage
                  messages={messages}
                  inputMessage={inputMessage}
                  setInputMessage={setInputMessage}
                  sendMessage={sendMessage}
                  currentStressLevel={currentStressLevel}
                  getStressLevelColor={getStressLevelColor}
                  isTyping={isTyping}
                />
              )}
              {currentPage === "videos" && <VideosPage />}
              {currentPage === "games" && <GamesPage />}
              {currentPage === "profile" && (
                <ProfilePage
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                />
              )}
            </>
          )}
        </main>
      </div>
    </Router>
  );
};

export default MentalHealthApp;
