import { Button, Toast } from "antd-mobile";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./index.module.css";
import useUserInfoStore from "@/store/userInfoStore";
import { AnswerType, QuestionType } from "@/types/fetchResponse";
import Question from "./components/Question";
import { TestCtx } from "./utils/ctx";

const TestPage: React.FC = () => {
  // http://localhost:8083/#/?templateId=1&customerId=1
  const { userInfo } = useUserInfoStore();
  const timer = useRef<any>();
  const [noSelectQuestionId, setNoSelectQuestionId] = useState(-1);
  const { template } = userInfo;
  const submitTest = useCallback(() => {
    for (let i = 0; i < answers.current.length; i++) {
      if (!answers.current[i].answerId) {
        Toast.show({ content: "请完成全部题目后提交" });
        const questionDom = document.getElementById(
          `question-dom-${answers.current[i].questionId}`
        );
        setNoSelectQuestionId(answers.current[i].questionId);
        if (timer.current) {
          clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
          setNoSelectQuestionId(-1);
        }, 3000);
        if (questionDom) {
          questionDom.scrollIntoView({
            behavior: "smooth",
          });
        }
        return;
      }
    }
    console.log("9898answers", answers.current);
  }, []);
  const questions = useMemo(() => {
    const result: QuestionType[] = [];
    template?.groupOptions?.forEach((groupOption) => {
      groupOption?.questions?.forEach((question) => {
        result.push(question);
      });
    });
    return result;
  }, [template?.groupOptions]);
  const initAnswers: AnswerType[] = questions.map((question) => ({
    studentId: userInfo.id,
    templateId: template.id,
    questionId: question.id,
    groupOptionId: question.groupOptionId,
  }));
  const answers = useRef(initAnswers);
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  return (
    <TestCtx.Provider value={{ answers: answers.current }}>
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          {questions.map((question, index) => (
            <Question
              key={question.id}
              question={question}
              questionIndex={index + 1}
              isNoSelectQuestion={noSelectQuestionId === question.id}
            />
          ))}
        </div>
        <div className={styles.btnContainer}>
          <Button
            color="default"
            onClick={submitTest}
            style={{
              "--background-color": "#000000",
              "--text-color": "#ffffff",
              "--border-style": "none",
            }}
          >
            提交
          </Button>
        </div>
      </div>
    </TestCtx.Provider>
  );
};

export default memo(TestPage);
