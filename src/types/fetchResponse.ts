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
  classId?: number;
  template: TemplateType;
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

export {
  SingleStudentType,
  LoginResDataType,
  TemplateType,
  GroupOptionType,
  QuestionType,
  QuestionOptionType,
};
