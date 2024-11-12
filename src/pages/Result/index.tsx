import { memo } from "react";
import Lottie from "react-lottie";
import animationData from "./result-animation.json";
import styles from "./index.module.css";

const defaultOptions = {
  loop: false, // 是否循环播放
  autoplay: true, // 是否自动播放
  animationData: animationData, // 动画数据
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice", // 设置画面适配方式
  },
};

const ResultPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Lottie options={defaultOptions} height={400} width={400} />
      <div className={styles.desc}>完成测试</div>
    </div>
  );
};

export default memo(ResultPage);
