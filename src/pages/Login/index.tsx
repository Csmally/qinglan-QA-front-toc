import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/index.module.css";
import { Button, Input, Toast } from 'antd-mobile';
import { fetchLogin } from "@/services";
import useGlobalFuncStore from "@/store/globalFuncStore";
import request from "@/utils/request";
import useUserInfoStore from "@/store/userInfoStore";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useUserInfoStore();
  const { setGlobalFunc } = useGlobalFuncStore();
  useEffect(() => {
    setGlobalFunc({ globalNavigate: navigate });
  }, []);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const changeAccount = useCallback((value: any) => {
    setAccount(value);
  }, []);
  const changePassWord = useCallback((value: any) => {
    setPassword(value);
  }, []);
  const loginHandle = useCallback(async () => {
    if (!account) {
        Toast.show({content: "请输入账号"});
      return;
    }
    if (!password) {
        Toast.show({content: "请输入密码"});
      return;
    }
    const { code, data } = await fetchLogin({
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
    //   navigate(`/page/${PAGE_PATH.HOME}`, { replace: true });
    }
  }, [account, password, setUserInfo]);
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <Input
          value={account}
          placeholder="请输入账号"
          style={{
            '--color': '#ffffff',
            '--font-size': '1.3rem',
          }}
          className={styles.inputContainer}
          onChange={changeAccount}
        />
        <Input
          value={password}
          placeholder="请输入密码"
          style={{
            '--color': '#ffffff',
            '--font-size': '1.3rem',
          }}
          className={styles.inputContainer}
          onChange={changePassWord}
        />
        <div className={styles.chooseClass}>{'请选择班级 >'}</div>
        <Button
            color="default"
            onClick={loginHandle}
            style={{
                '--background-color': '#000000',
                '--text-color': '#ffffff',
                '--border-style': 'none',
            }}>
          登录
        </Button>
      </div>
      <div className={styles.poweredBy}>Powered By onelight.ink</div>
    </div>
  );
};

export default memo(LoginPage);
