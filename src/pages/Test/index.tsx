import { Button } from "antd-mobile";
import { memo, useCallback, useMemo } from "react";
import styles from "./index.module.css";
import useUserInfoStore from "@/store/userInfoStore";
import { QuestionType } from "@/types/fetchResponse";
import Question from "./components/Question";

const TestPage: React.FC = () => {
  // http://localhost:8083/#/?templateId=1&customerId=1
  const { userInfo } = useUserInfoStore();
  const { template } = userInfo;
  const submitTest = useCallback(() => {}, []);
  const questions = useMemo(() => {
    const result: QuestionType[] = [];
    template?.groupOptions?.forEach(groupOption => {
      groupOption?.questions?.forEach(question => {
        result.push(question);
      })
    })
    return result;
  }, [template?.groupOptions]);
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        {questions.map((question, index) => (
          <Question key={question.id} question={question} questionIndex={index + 1} />
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
  );
};

export default memo(TestPage);
