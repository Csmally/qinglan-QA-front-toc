import { GroupOptionType } from "@/types/fetchResponse";
import { memo } from "react";
import Question from "./Question";

interface GroupOptionPropsType {
  groupOption: GroupOptionType;
  groupStartIndex: number;
}
const GroupOption: React.FC<GroupOptionPropsType> = (props) => {
  const { groupOption, groupStartIndex } = props;
  return (
    <>
      {groupOption?.questions?.map((question, index) => (
        <Question
          key={question.id}
          question={question}
          groupStartIndex={groupStartIndex}
          selfIndex={index}
        />
      ))}
    </>
  );
};

export default memo(GroupOption);
