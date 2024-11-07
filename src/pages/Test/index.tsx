import { Button } from "antd-mobile";
import { memo, useCallback } from "react";
import styles from "./index.module.css";
import GroupOption from "./components/GroupOption";
import useUserInfoStore from "@/store/userInfoStore";

const TestPage: React.FC = () => {
  // http://localhost:8083/#/?templateId=1&customerId=1
  const { userInfo } = useUserInfoStore();
  const { template } = userInfo;
  const submitTest = useCallback(() => {}, []);
  const getGroupStartIndex = useCallback(
    (index: number) => {
      let result = 0;
      for (let i = 0; i < template.groupOptions.length; i++) {
        if (i > index - 1) {
          break;
        }
        result += template.groupOptions[i].questions.length;
      }
      return result;
    },
    [template.groupOptions]
  );
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        {template?.groupOptions?.map((groupOption, index) => (
          <GroupOption
            key={groupOption.id}
            groupOption={groupOption}
            groupStartIndex={getGroupStartIndex(index)}
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
  );
};

export default memo(TestPage);
