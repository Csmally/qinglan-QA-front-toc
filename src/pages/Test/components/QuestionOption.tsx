import { QuestionOptionType } from "@/types/fetchResponse";
import { memo, useCallback, useContext } from "react";
import styles from "../index.module.css";
import { TestCtx } from "../utils/ctx";

interface QuestionOptionPropsType {
  questionOption: QuestionOptionType;
  currentSelectOption: number;
  setCurrentSelectOption: any;
  questionId: number;
}
const QuestionOption: React.FC<QuestionOptionPropsType> = (props) => {
  const {
    questionOption,
    currentSelectOption,
    setCurrentSelectOption,
    questionId,
  } = props;
  const { answers } = useContext(TestCtx);
  const selectOption = useCallback(() => {
    const singleAnswer = answers.find(
      (answer) => answer.questionId === questionId
    )!;
    singleAnswer.questionAnswerId = questionOption.id;
    setCurrentSelectOption(questionOption.id);
  }, [answers, questionId, questionOption.id, setCurrentSelectOption]);
  return (
    <div onClick={selectOption} className={styles.optionBox}>
      {currentSelectOption === questionOption.id && (
        <div className={styles.optionselect}></div>
      )}
      <div className={styles.optionShowText}>{questionOption.showText}</div>
    </div>
  );
};

export default memo(QuestionOption);
