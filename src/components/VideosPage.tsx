import React from "react";

const VideosPage: React.FC = () => {
  const videos = [
    {
      title: "Guided Meditation",
      duration: "10 min",
      category: "Mindfulness",
      thumbnail: "🧘‍♀",
    },
    {
      title: "Nature Sounds",
      duration: "15 min",
      category: "Relaxation",
      thumbnail: "🌲",
    },
    {
      title: "Breathing Exercise",
      duration: "5 min",
      category: "Anxiety Relief",
      thumbnail: "💨",
    },
    {
      title: "Progressive Muscle Relaxation",
      duration: "20 min",
      category: "Stress Relief",
      thumbnail: "💆‍♂",
    },
    {
      title: "Calming Visualizations",
      duration: "12 min",
      category: "Sleep Aid",
      thumbnail: "🌙",
    },
    {
      title: "Positive Affirmations",
      duration: "8 min",
      category: "Motivation",
      thumbnail: "✨",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">
          Relaxation Videos
        </h2>
        <p className="text-emerald-100">
          Choose from our curated collection of calming and therapeutic videos
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 shadow-2xl group cursor-pointer"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              {video.thumbnail}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {video.title}
            </h3>
            <div className="flex items-center justify-between mb-3">
              <span className="text-teal-300 text-sm">{video.category}</span>
              <span className="text-emerald-200 text-sm">{video.duration}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1 mb-4">
              <div className="bg-teal-400 h-1 rounded-full w-0 group-hover:w-full transition-all duration-700"></div>
            </div>
            <button className="w-full bg-teal-500/80 hover:bg-teal-600/80 text-white py-2 rounded-xl transition-colors">
              Play Video
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosPage;
