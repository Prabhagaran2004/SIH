import React from "react";

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-900 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-800 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      <div className="absolute top-40 left-1/2 w-80 h-80 bg-green-900 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-bounce"></div>
    </div>
  );
};

export default Background;
