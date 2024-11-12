interface SingleStudentType {
  id?: number;
  name: string;
  account: string;
  password: string;
  classId?: number;
}

interface LoginResDataType {
  id: number;
  account: string;
  name?: string;
  password: string;
  sex?: string;
  token?: string;
  template: TemplateType;
  classBelong?: ClassType;
  customerBelong?: CustomerType;
}

interface ClassType {
  id: number;
  class: string;
  classText: string;
  customerId: number;
  grade: string;
  gradeText: string;
}

interface CustomerType {
  id: number;
  desc: string;
  name: string;
  templateId: number;
}

interface TemplateType {
  id: number;
  name: string;
  desc: string;
  groupOptions: GroupOptionType[];
}

interface GroupOptionType {
  id: number;
  showText: string;
  templateId: number;
  value: string;
  questions: QuestionType[];
}

interface QuestionType {
  id: number;
  groupOptionId: number;
  isJudge: boolean;
  questionName: string;
  questionOptions: QuestionOptionType[];
}

interface QuestionOptionType {
  id: number;
  questionId: number;
  showText: string;
  value: string;
}

interface AnswerType {
  studentId: number;
  templateId: number;
  questionId: number;
  groupOptionId: number;
  answerId?: number;
}

export {
  SingleStudentType,
  LoginResDataType,
  TemplateType,
  GroupOptionType,
  QuestionType,
  QuestionOptionType,
  ClassType,
  CustomerType,
  AnswerType,
};
