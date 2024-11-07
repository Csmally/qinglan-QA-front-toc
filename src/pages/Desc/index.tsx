import useUserInfoStore from "@/store/userInfoStore";
import { Button } from "antd-mobile";
import { memo, useCallback } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

const DescPage: React.FC = () => {
  const { userInfo } = useUserInfoStore();
  const { template } = userInfo;
  const navigate = useNavigate();
  const startTest = useCallback(() => {
    navigate("/test", { replace: true });
  }, [navigate]);
  return (
    <div className={styles.container}>
      <div className={styles.name}>{template.name}</div>
      <div className={styles.mainContainer}>
        <div className={styles.title}>测验说明：</div>
        <div>{template.desc}</div>
      </div>
      <div className={styles.btnContainer}>
        <Button
          color="default"
          onClick={startTest}
          style={{
            "--background-color": "#000000",
            "--text-color": "#ffffff",
            "--border-style": "none",
          }}
        >
          开始测试
        </Button>
      </div>
    </div>
  );
};

export default memo(DescPage);
