import { QuestionType } from "@/types/fetchResponse";
import { memo, useState } from "react";
import QuestionOption from "./QuestionOption";
import styles from "../index.module.css";

interface QuestionPropsType {
  question: QuestionType;
  questionIndex: number;
  isNoSelectQuestion: boolean;
}

const Question: React.FC<QuestionPropsType> = (props) => {
  const { question, questionIndex, isNoSelectQuestion } = props;
  const [currentSelectOption, setCurrentSelectOption] = useState(-1);
  return (
    <div
      className={
        isNoSelectQuestion
          ? styles.errorQuestionContainer
          : styles.questionContainer
      }
      id={`question-dom-${question.id}`}
    >
      <div
        className={styles.questionName}
      >{`${questionIndex}、${question.questionName}`}</div>
      <div className={styles.optionContainer}>
        {question?.questionOptions?.map((questionOption) => (
          <QuestionOption
            questionId={question.id}
            questionOption={questionOption}
            key={questionOption.id}
            currentSelectOption={currentSelectOption}
            setCurrentSelectOption={setCurrentSelectOption}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(Question);
