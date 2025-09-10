// AI Response logic with stress level calculation
export const analyzeStressLevel = (message: string): number => {
  const stressKeywords = {
    high: [
      "anxious",
      "overwhelmed",
      "panic",
      "stressed",
      "worried",
      "depressed",
      "exhausted",
      "hopeless",
    ],
    medium: [
      "tired",
      "frustrated",
      "confused",
      "uncertain",
      "bothered",
      "annoyed",
    ],
    low: ["calm", "relaxed", "happy", "peaceful", "content", "good", "better"],
  };

  let score = 5; // neutral
  const lowerMessage = message.toLowerCase();

  stressKeywords.high.forEach((keyword) => {
    if (lowerMessage.includes(keyword)) score += 2;
  });

  stressKeywords.medium.forEach((keyword) => {
    if (lowerMessage.includes(keyword)) score += 1;
  });

  stressKeywords.low.forEach((keyword) => {
    if (lowerMessage.includes(keyword)) score -= 1;
  });

  return Math.min(Math.max(score, 1), 10);
};

export const getAIResponse = (
  userMessage: string,
  stressLevel: number
): string => {
  const responses = {
    high: [
      "I hear that you're going through a really tough time. Remember, it's okay to feel overwhelmed - you're human. Let's take this one step at a time. Can you tell me what's weighing on you most right now?",
      "Your feelings are completely valid. When stress feels overwhelming, sometimes the best thing we can do is pause and breathe. Would you like to try a quick breathing exercise with me?",
      "I can sense you're carrying a heavy load. Remember, seeking support shows strength, not weakness. What's one small thing that usually brings you comfort?",
    ],
    medium: [
      "It sounds like you're dealing with some challenging feelings. That's completely normal - we all have those days. What's been on your mind lately?",
      "I understand you're feeling frustrated. Sometimes talking through our thoughts can help us see things more clearly. What would you like to explore together?",
      "Life can feel uncertain sometimes, and that's okay. You're taking a positive step by reaching out. How can I support you today?",
    ],
    low: [
      "I'm glad to hear you're feeling more positive! It's wonderful when we can find moments of peace. What's been going well for you?",
      "That's great to hear! Maintaining good mental health is just as important as celebrating the good times. How are you taking care of yourself?",
      "It sounds like you're in a good headspace. That's amazing! Is there anything you'd like to talk about or explore while you're feeling centered?",
    ],
  };

  const category =
    stressLevel >= 7 ? "high" : stressLevel >= 4 ? "medium" : "low";
  const categoryResponses = responses[category];
  return categoryResponses[
    Math.floor(Math.random() * categoryResponses.length)
  ];
};

export const getStressLevelColor = (level: number): string => {
  if (level >= 7) return "text-red-400";
  if (level >= 4) return "text-amber-400";
  return "text-emerald-400";
};

export const getStressLevelText = (level: number): string => {
  if (level >= 7) return "High Stress";
  if (level >= 4) return "Moderate Stress";
  return "Low Stress";
};
