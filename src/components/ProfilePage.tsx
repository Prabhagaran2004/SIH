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
} from "lucide-react";
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
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `I've completed ${userProfile.totalSessions} mental health sessions with an average stress level of ${userProfile.averageStressLevel}/10! Check out MindEase: ${window.location.href}`
      );
      alert("Progress shared to clipboard!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-lg rounded-full w-16 h-16 flex items-center justify-center border border-white/20">
              <User className="w-8 h-8 text-teal-300" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {userProfile.name}
              </h2>
              <p className="text-emerald-200">{userProfile.email}</p>
              <p className="text-emerald-300 text-sm">
                Member since {userProfile.joinDate.toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 rounded-xl text-white hover:bg-white/20 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-teal-500/80 backdrop-blur-sm hover:bg-teal-600/80 text-white px-4 py-2 rounded-xl transition-colors flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>{isEditing ? "Cancel" : "Edit"}</span>
            </button>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 mb-4">
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

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl text-center">
          <Calendar className="w-8 h-8 text-teal-300 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-white">
            {userProfile.totalSessions}
          </h3>
          <p className="text-emerald-200">Total Sessions</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl text-center">
          <Target className="w-8 h-8 text-emerald-300 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-white">
            {userProfile.averageStressLevel}/10
          </h3>
          <p className="text-emerald-200">Avg Stress Level</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl text-center">
          <Award className="w-8 h-8 text-amber-300 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-white">
            {userProfile.streakDays}
          </h3>
          <p className="text-emerald-200">Day Streak</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl text-center">
          <User className="w-8 h-8 text-purple-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">
            {userProfile.favoriteActivity}
          </h3>
          <p className="text-emerald-200">Favorite Activity</p>
        </div>
      </div>

      {/* Goals and Achievements */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Target className="w-6 h-6 text-teal-300 mr-2" />
            Current Goals
          </h3>
          <div className="space-y-3">
            {userProfile.goals.map((goal, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-emerald-200">{goal}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Award className="w-6 h-6 text-amber-300 mr-2" />
            Achievements
          </h3>
          <div className="space-y-3">
            {userProfile.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center">
                  <Award className="w-3 h-3 text-amber-300" />
                </div>
                <span className="text-emerald-200">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid md:grid-cols-3 gap-6">
        <button
          onClick={exportData}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-2xl group"
        >
          <Download className="w-8 h-8 text-blue-300 mx-auto mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold text-white mb-2">Export Data</h3>
          <p className="text-emerald-200 text-sm">
            Download your profile and session data
          </p>
        </button>

        <button
          onClick={shareProgress}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-2xl group"
        >
          <Share2 className="w-8 h-8 text-green-300 mx-auto mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold text-white mb-2">
            Share Progress
          </h3>
          <p className="text-emerald-200 text-sm">
            Share your mental health journey
          </p>
        </button>

        <button className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:bg-red-500/20 transition-all duration-300 transform hover:scale-105 shadow-2xl group">
          <LogOut className="w-8 h-8 text-red-300 mx-auto mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold text-white mb-2">Sign Out</h3>
          <p className="text-emerald-200 text-sm">
            Securely log out of your account
          </p>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
