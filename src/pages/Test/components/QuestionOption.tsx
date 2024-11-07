import { QuestionOptionType } from "@/types/fetchResponse";
import { memo } from "react";
import styles from "../index.module.css";

const QuestionOption: React.FC<{ questionOption: QuestionOptionType }> = (
  props
) => {
  const { questionOption } = props;
  return (
    <div className={styles.singleOptionBox}>{questionOption.showText}</div>
  );
};

export default memo(QuestionOption);
