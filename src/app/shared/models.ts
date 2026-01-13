export interface Section {
  sectionId: string;
  label: string;
  questions: Question[];
}

export interface Question {
  questionId: string;
  label: string;
  type: 'multiple' | 'checkboxes' | 'short-text' | 'long-text' | 'dropdown' | 'date' | 'document';
  conditions?: Condition[];
  answers: AnswerOption[];
}
export interface AnswerOption {
  answerId: number;
  label: string;
  isFlag?: boolean;
  points?: number;
}

export interface Condition {
  answerId: number;
  type: ConditionTargetType;
  target: string;
}

export type ConditionTargetType = 'section' | 'question';
