export interface VocabWord {
  word: string;
  chinese: string;
  sentence: string;
  category: string;
  grade: number; // 1-6 for elementary grades
}

export type Tab = 'tts' | 'vocab' | 'game';
