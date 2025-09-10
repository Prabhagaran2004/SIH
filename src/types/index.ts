export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  stressLevel?: number;
}

export interface StressData {
  level: number;
  timestamp: Date;
  context: string;
}

export interface UserProfile {
  name: string;
  email: string;
  joinDate: Date;
  totalSessions: number;
  averageStressLevel: number;
  streakDays: number;
  favoriteActivity: string;
  goals: string[];
  achievements: string[];
}

export type PageType = "home" | "chat" | "videos" | "games" | "profile";
