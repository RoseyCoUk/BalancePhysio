export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface SampleQuestion {
  question: string;
  category: string;
}

export interface QuestionCategory {
  title: string;
  emoji: string;
  description: string;
  questions: string[];
}