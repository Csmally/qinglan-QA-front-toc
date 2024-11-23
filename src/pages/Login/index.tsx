import { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles/index.module.css";
import { Button, Input, Toast } from "antd-mobile";
import { fetchLogin } from "@/services";
import useGlobalFuncStore from "@/store/globalFuncStore";
import request from "@/utils/request";
import useUserInfoStore from "@/store/userInfoStore";

const LoginPage: React.FC = () => {
  const location = useLocation();
  const pathParams = new URLSearchParams(location.search);
  const templateId = pathParams.get("templateId") || "";
  const customerId = pathParams.get("customerId") || "";
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
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
    const { code, data } = await fetchLogin({
      templateId,
      customerId,
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
  }, [account, customerId, navigate, password, setUserInfo, templateId]);
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.logContainer}>
          <div className={styles.logoimg}></div>
          <div className={styles.companyName}>万籁亿光科技有限公司</div>
        </div>
        <Input
          value={account}
          placeholder="请输入账号"
          className={styles.inputContainer}
          onChange={changeAccount}
        />
        <Input
          value={password}
          placeholder="请输入密码"
          className={styles.inputContainer}
          onChange={changePassWord}
        />
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
      </div>
      <div className={styles.poweredBy}>Powered By onelight.ink</div>
    </div>
  );
};

export default memo(LoginPage);
