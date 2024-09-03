'use client';

import {  useState } from "react";


import styles from "./LoginContent.module.sass";
import { useTranslations } from "next-intl";
import LoginContainer from "./ui/LoginContainer";
import RegistrationContainer from "./ui/RegistrationContainer";


interface ILoginContentProps {
  onClose?: () => void
}

const LoginContent: React.FC<ILoginContentProps> = ({ onClose = () => { } }) => {
  const t = useTranslations();
  const [isLogin, setIsLogin] = useState(true);



  return (

    <div className={styles.content}>
      <div className={styles.title}>{isLogin ? t("global.authorization") : t("global.registration")}</div>
      {isLogin ? <LoginContainer closeModal={() => onClose()} /> : <RegistrationContainer />}
      <div className={styles.register} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? t("global.registration") : t("global.authorization")}
      </div>
    </div>

  )

};

export default LoginContent;
