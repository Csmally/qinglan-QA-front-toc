import { AnswerType } from "@/types/fetchResponse";
import { createContext } from "react";

const TestCtx = createContext<{ answers: AnswerType[] }>({ answers: [] });

export { TestCtx };
