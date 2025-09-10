import React from "react";
import { MessageCircle, Send } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  stressLevel?: number;
}

interface ChatPageProps {
  messages: ChatMessage[];
  inputMessage: string;
  setInputMessage: (message: string) => void;
  sendMessage: () => void;
  currentStressLevel: number;
  getStressLevelColor: (level: number) => string;
  isTyping: boolean;
}

const ChatPage: React.FC<ChatPageProps> = ({
  messages,
  inputMessage,
  setInputMessage,
  sendMessage,
  currentStressLevel,
  getStressLevelColor,
  isTyping,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-4">AI Chat Support</h2>
        <div className="flex items-center justify-between mb-4">
          <p className="text-emerald-100">
            Share your thoughts and feelings in a safe space
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-emerald-200">Stress Level:</span>
            <span
              className={`font-bold ${getStressLevelColor(currentStressLevel)}`}
            >
              {currentStressLevel}/10
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-teal-300 mx-auto mb-4 opacity-50" />
              <p className="text-emerald-200">
                Start a conversation with our AI companion
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.isUser
                    ? "bg-teal-500/80 text-white backdrop-blur-sm"
                    : "bg-white/10 text-white backdrop-blur-sm border border-white/20"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-teal-300 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-teal-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-teal-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-white/20">
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Share what's on your mind..."
              className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-emerald-200 focus:outline-none focus:border-teal-400"
            />
            <button
              onClick={sendMessage}
              className="bg-teal-500/80 backdrop-blur-sm hover:bg-teal-600/80 text-white p-3 rounded-2xl transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
