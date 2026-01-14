export interface Section {
  sectionId: string;
  label: string;
  questions: Question[];
}

export interface Question {
  questionId: string;
  label: string;
  type: QuestionType;
  conditions?: Condition[];
  answers: AnswerOption[];
}
export interface AnswerOption {
  answerId: number;
  label: string;
  isFlag?: boolean;
  comment?: string;
  points?: number;
}

export interface Condition {
  answerId: number | null;
  type: ConditionTargetType;
  target: string;
}

export type ConditionTargetType = 'section' | 'question' | null;

export type CreateAction =
  | { type: 'section' }
  | { type: 'question'; questionType: QuestionType };

export type QuestionType =
  | 'short-text'
  | 'long-text'
  | 'drop-down'
  | 'multiple'
  | 'check-boxes'
  | 'date'
  | 'document';

