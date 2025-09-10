import React, { useState } from "react";
import {
  User,
  Calendar,
  Target,
  Award,
  Settings,
  LogOut,
  Download,
  Share2,
  Moon,
  Sun,
  TrendingUp,
  Activity,
  Brain,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import type { UserProfile } from "../types";

interface ProfilePageProps {
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  userProfile,
  setUserProfile,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSave = () => {
    setUserProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(userProfile);
    setIsEditing(false);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(userProfile, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mindease-profile.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const shareProgress = () => {
    if (navigator.share) {
      navigator.share({
        title: "My MindEase Progress",
        text: `I've completed ${userProfile.totalSessions} mental health sessions with an average stress level of ${userProfile.averageStressLevel}/10!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(
        `I've completed ${userProfile.totalSessions} mental health sessions with an average stress level of ${userProfile.averageStressLevel}/10! Check out MindEase: ${window.location.href}`
      );
      alert("Progress shared to clipboard!");
    }
  };

  // Chart data for the dashboard
  const stressProgressData = [
    { week: "Week 1", stress: 0, sessions: 3 },
    { week: "Week 2", stress: 6.8, sessions: 4 },
    { week: "Week 3", stress: 4.1, sessions: 5 },
    { week: "Week 4", stress: 2.5, sessions: 6 },
    { week: "Week 5", stress: 4.9, sessions: 7 },
    { week: "Week 6", stress: 7.9, sessions: 8 },
  ];

  const activityData = [
    { name: "Meditation", sessions: 18, color: "#06b6d4" },
    { name: "Chat AI", sessions: 15, color: "#10b981" },
    { name: "Videos", sessions: 8, color: "#8b5cf6" },
    { name: "Games", sessions: 6, color: "#f59e0b" },
  ];

  const wellnessData = [
    {
      category: "Stress Level",
      current: userProfile.averageStressLevel,
      max: 10,
    },
    { category: "Session Frequency", current: 8, max: 10 },
    { category: "Goal Progress", current: 7, max: 10 },
    { category: "Consistency", current: userProfile.streakDays / 3, max: 10 },
    { category: "Engagement", current: 9, max: 10 },
  ];

  const monthlyProgressData = [
    { month: "Jan", sessions: 12, avgStress: 6.8 },
    { month: "Feb", sessions: 15, avgStress: 6.2 },
    { month: "Mar", sessions: 18, avgStress: 5.5 },
    { month: "Apr", sessions: 22, avgStress: 4.8 },
    { month: "May", sessions: 20, avgStress: 4.2 },
    { month: "Jun", sessions: 25, avgStress: 3.9 },
  ];

  const COLORS = {
    primary: "#06b6d4",
    secondary: "#10b981",
    accent: "#8b5cf6",
    warning: "#f59e0b",
  };

  return (
    <div className="space-y-6">
      {/* Profile Header - Condensed */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-lg rounded-full w-12 h-12 flex items-center justify-center border border-white/20">
              <User className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {userProfile.name}
              </h2>
              <p className="text-emerald-200 text-sm">
                {userProfile.totalSessions} sessions • {userProfile.streakDays}{" "}
                day streak
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 p-2 rounded-xl text-white hover:bg-white/20 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-teal-500/80 backdrop-blur-sm hover:bg-teal-600/80 text-white px-3 py-2 rounded-xl transition-colors flex items-center space-x-1"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden md:block">
                {isEditing ? "Cancel" : "Edit"}
              </span>
            </button>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-emerald-200 text-sm mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2 text-white placeholder-emerald-200"
                />
              </div>
              <div>
                <label className="block text-emerald-200 text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2 text-white placeholder-emerald-200"
                />
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={handleSave}
                className="bg-emerald-500/80 hover:bg-emerald-600/80 text-white px-4 py-2 rounded-xl transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Analytics Dashboard */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Stress Level Progress */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-6 h-6 text-teal-300 mr-2" />
            <h3 className="text-xl font-bold text-white">
              Stress Level Progress
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={stressProgressData}>
              <defs>
                <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={COLORS.primary}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={COLORS.primary}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis dataKey="week" tick={{ fill: "#a7f3d0", fontSize: 12 }} />
              <YAxis tick={{ fill: "#a7f3d0", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Area
                type="monotone"
                dataKey="stress"
                stroke={COLORS.primary}
                fillOpacity={1}
                fill="url(#stressGradient)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Distribution */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
          <div className="flex items-center mb-4">
            <Activity className="w-6 h-6 text-emerald-300 mr-2" />
            <h3 className="text-xl font-bold text-white">
              Activity Distribution
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={activityData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="sessions"
              >
                {activityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Legend wrapperStyle={{ color: "#a7f3d0", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Wellness Radar & Monthly Progress */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Wellness Assessment Radar */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 text-purple-300 mr-2" />
            <h3 className="text-xl font-bold text-white">
              Wellness Assessment
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={wellnessData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis
                dataKey="category"
                tick={{ fill: "#a7f3d0", fontSize: 10 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 10]}
                tick={{ fill: "#a7f3d0", fontSize: 10 }}
                tickCount={6}
              />
              <Radar
                name="Current Level"
                dataKey="current"
                stroke={COLORS.accent}
                fill={COLORS.accent}
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Sessions Bar Chart */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6 text-amber-300 mr-2" />
            <h3 className="text-xl font-bold text-white">Monthly Progress</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyProgressData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis dataKey="month" tick={{ fill: "#a7f3d0", fontSize: 12 }} />
              <YAxis tick={{ fill: "#a7f3d0", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Bar
                dataKey="sessions"
                fill={COLORS.warning}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-xl text-center">
          <Calendar className="w-6 h-6 text-teal-300 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-white">
            {userProfile.totalSessions}
          </h3>
          <p className="text-emerald-200 text-sm">Total Sessions</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-xl text-center">
          <Target className="w-6 h-6 text-emerald-300 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-white">
            {userProfile.averageStressLevel}/10
          </h3>
          <p className="text-emerald-200 text-sm">Avg Stress Level</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-xl text-center">
          <Award className="w-6 h-6 text-amber-300 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-white">
            {userProfile.streakDays}
          </h3>
          <p className="text-emerald-200 text-sm">Day Streak</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-xl text-center">
          <User className="w-6 h-6 text-purple-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-white">
            {userProfile.favoriteActivity}
          </h3>
          <p className="text-emerald-200 text-sm">Favorite Activity</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={exportData}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-xl group"
        >
          <Download className="w-6 h-6 text-blue-300 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="text-sm font-semibold text-white mb-1">Export Data</h3>
          <p className="text-emerald-200 text-xs">
            Download your profile and session data
          </p>
        </button>

        <button
          onClick={shareProgress}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-xl group"
        >
          <Share2 className="w-6 h-6 text-green-300 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="text-sm font-semibold text-white mb-1">
            Share Progress
          </h3>
          <p className="text-emerald-200 text-xs">
            Share your mental health journey
          </p>
        </button>

        <button className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:bg-red-500/20 transition-all duration-300 transform hover:scale-105 shadow-xl group">
          <LogOut className="w-6 h-6 text-red-300 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="text-sm font-semibold text-white mb-1">Sign Out</h3>
          <p className="text-emerald-200 text-xs">
            Securely log out of your account
          </p>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
