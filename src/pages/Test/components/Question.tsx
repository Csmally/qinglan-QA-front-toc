import { QuestionType } from "@/types/fetchResponse";
import { memo } from "react";
import QuestionOption from "./QuestionOption";
import styles from "../index.module.css";

interface QuestionPropsType {
  question: QuestionType;
  groupStartIndex: number;
  selfIndex: number;
}

const Question: React.FC<QuestionPropsType> = (props) => {
  const { question, groupStartIndex, selfIndex } = props;
  return (
    <div className={styles.questionContainer}>
      <div className={styles.questionName}>{`${
        groupStartIndex + selfIndex + 1
      }、${question.questionName}`}</div>
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
