import { QuestionType } from "@/types/fetchResponse";
import { memo } from "react";
import QuestionOption from "./QuestionOption";
import styles from "../index.module.css";

interface QuestionPropsType {
  question: QuestionType;
  questionIndex: number;
}

const Question: React.FC<QuestionPropsType> = (props) => {
  const { question, questionIndex } = props;
  return (
    <div className={styles.questionContainer}>
      <div className={styles.questionName}>{`${questionIndex}、${question.questionName}`}</div>
      <div className={styles.optionContainer}>
        {question?.questionOptions?.map((questionOption) => (
          <QuestionOption
            questionOption={questionOption}
            key={questionOption.id}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(Question);
