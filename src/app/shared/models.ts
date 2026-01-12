export interface AnswerOption {
  id: number;
  label: string;
  isFlag?: boolean;
  points?: number;
}

export interface Section {
  order: string;
  title: string;
  questions: Question[];
}

export interface Question {
  order: string;
  title: string;
  type: 'multiple' | 'single';
  conditions?: Condition[];
  answers: AnswerOption[];
}

export interface Condition {
  answerId: number;
  type: ConditionTargetType;
  target: string;
}

export type ConditionTargetType = 'section' | 'question';
