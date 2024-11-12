import { AnswerType, LoginResDataType } from "@/types/fetchResponse";
import request from "@/utils/request";

interface FetchLoginParamsType {
  templateId: string;
  customerId: string;
  account: string;
  password: string;
  from: string;
}

interface FetchAddAnswerParamsType {
  templateId: number;
  customerId: number;
  classId: number;
  studentId: number;
  answers: AnswerType[];
}

const fetchLogin = (
  params: FetchLoginParamsType
): Promise<ResDataType<LoginResDataType>> => {
  return request.post("login", params);
};

const fetchAddAnswer = (
  params: FetchAddAnswerParamsType
): Promise<ResDataType<any>> => {
  return request.post("addAnswer/add", params);
};

export { fetchLogin, fetchAddAnswer };
