import { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles/index.module.css";
import { Button, Input, Toast, Picker } from "antd-mobile";
import { fetchLogin } from "@/services";
import useGlobalFuncStore from "@/store/globalFuncStore";
import request from "@/utils/request";
import useUserInfoStore from "@/store/userInfoStore";

const gradeClassData = [
  [
    { value: "1", label: "一年级" },
    { value: "2", label: "二年级" },
    { value: "3", label: "三年级" },
    { value: "4", label: "四年级" },
    { value: "5", label: "五年级" },
    { value: "6", label: "六年级" },
    { value: "7", label: "初中一年级" },
    { value: "8", label: "初中二年级" },
    { value: "9", label: "初中三年级" },
    { value: "10", label: "高中一年级" },
    { value: "11", label: "高中二年级" },
    { value: "12", label: "高中三年级" },
  ],
  [
    { value: "1", label: "1班" },
    { value: "2", label: "2班" },
    { value: "3", label: "3班" },
    { value: "4", label: "4班" },
    { value: "5", label: "5班" },
    { value: "6", label: "6班" },
    { value: "7", label: "7班" },
    { value: "8", label: "8班" },
    { value: "9", label: "9班" },
    { value: "10", label: "10班" },
    { value: "11", label: "11班" },
    { value: "12", label: "12班" },
    { value: "13", label: "13班" },
    { value: "14", label: "14班" },
    { value: "15", label: "15班" },
  ],
];

const LoginPage: React.FC = () => {
  const location = useLocation();
  const pathParams = new URLSearchParams(location.search);
  const templateId = pathParams.get("templateId") || "";
  const customerId = pathParams.get("customerId") || "";
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [gradeValue, setGradeValue] = useState("");
  const [classValue, setClassValue] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useUserInfoStore();
  const { setGlobalFunc } = useGlobalFuncStore();
  useEffect(() => {
    setGlobalFunc({ globalNavigate: navigate });
  }, []);
  const changeAccount = useCallback((value: any) => {
    setAccount(value);
  }, []);
  const changePassWord = useCallback((value: any) => {
    setPassword(value);
  }, []);
  const loginHandle = useCallback(async () => {
    if (!account) {
      Toast.show({ content: "请输入账号" });
      return;
    }
    if (!password) {
      Toast.show({ content: "请输入密码" });
      return;
    }
    if (!gradeValue || !classValue) {
      Toast.show({ content: "请选择班级" });
      return;
    }
    const { code, data } = await fetchLogin({
      templateId,
      customerId,
      gradeValue,
      classValue,
      account,
      password,
      from: "2",
    });
    if (code === 0) {
      setUserInfo(data);
      const { token } = data;
      if (token) {
        request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        delete request.defaults.headers.common["Authorization"];
      }
      navigate("/desc", { replace: true });
    }
  }, [
    account,
    classValue,
    customerId,
    gradeValue,
    navigate,
    password,
    setUserInfo,
    templateId,
  ]);
  const getGradeClassShowText = useCallback((): string => {
    if (!gradeValue || !classValue) {
      return "请选择班级 >";
    }
    const gradeText =
      gradeClassData[0].find((i) => i.value === gradeValue)?.label || "";
    const classText =
      gradeClassData[1].find((i) => i.value === classValue)?.label || "";
    return gradeText + classText;
  }, [classValue, gradeValue]);
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <Input
          value={account}
          placeholder="请输入账号"
          style={{
            "--color": "#ffffff",
            "--font-size": "1.3rem",
          }}
          className={styles.inputContainer}
          onChange={changeAccount}
        />
        <Input
          value={password}
          placeholder="请输入密码"
          style={{
            "--color": "#ffffff",
            "--font-size": "1.3rem",
          }}
          className={styles.inputContainer}
          onChange={changePassWord}
        />
        <div className={styles.chooseClass} onClick={() => setVisible(true)}>
          {getGradeClassShowText()}
        </div>
        <Button
          color="default"
          onClick={loginHandle}
          style={{
            "--background-color": "#000000",
            "--text-color": "#ffffff",
            "--border-style": "none",
          }}
        >
          登录
        </Button>
        <Picker
          columns={gradeClassData}
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          value={[gradeValue, classValue]}
          onConfirm={(v: any) => {
            setGradeValue(v[0]);
            setClassValue(v[1]);
          }}
        />
      </div>
      <div className={styles.poweredBy}>Powered By onelight.ink</div>
    </div>
  );
};

export default memo(LoginPage);
