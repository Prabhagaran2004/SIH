import React from "react";
import { Smile } from "lucide-react";

const GamesPage: React.FC = () => {
  const games = [
    {
      name: "Bubble Pop Therapy",
      icon: "🫧",
      description: "Pop bubbles to release tension and anxiety",
      difficulty: "Easy",
    },
    {
      name: "Pattern Matching",
      icon: "🧩",
      description: "Focus your mind with calming pattern games",
      difficulty: "Medium",
    },
    {
      name: "Virtual Pet Care",
      icon: "🐱",
      description: "Take care of a digital companion",
      difficulty: "Easy",
    },
    {
      name: "Zen Garden",
      icon: "🍃",
      description: "Create beautiful zen patterns in sand",
      difficulty: "Easy",
    },
    {
      name: "Color Therapy",
      icon: "🎨",
      description: "Paint and color to express emotions",
      difficulty: "Easy",
    },
    {
      name: "Memory Palace",
      icon: "🏛",
      description: "Build memory skills while relaxing",
      difficulty: "Hard",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">
          Stress Relief Games
        </h2>
        <p className="text-emerald-100">
          Engage in therapeutic activities designed to calm your mind and reduce
          stress
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-2xl group cursor-pointer"
          >
            <div className="text-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {game.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {game.name}
              </h3>
              <p className="text-emerald-200 text-sm mb-4">
                {game.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    game.difficulty === "Easy"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : game.difficulty === "Medium"
                      ? "bg-amber-500/20 text-amber-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {game.difficulty}
                </span>
                <Smile className="w-5 h-5 text-teal-300" />
              </div>
              <button className="w-full bg-gradient-to-r from-teal-500/80 to-emerald-500/80 hover:from-teal-600/80 hover:to-emerald-600/80 text-white py-2 rounded-xl transition-all duration-300">
                Play Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;
