'use client';

import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// import ReCAPTCHA from "react-google-recaptcha";

// import { useActions } from "../../hooks/useActions";
// import { useTypedSelector } from "../../hooks/useTypedSelector";

import styles from "./LoginContent.module.sass";
import { useTranslations } from "next-intl";
// import { ProfileApi } from "@/api/profile/profile.api";
import { useRouter } from "next/navigation";
import LoginContainer from "./ui/LoginContainer";
import RegistrationContainer from "./ui/RegistrationContainer";

// import { ModalType } from "../Modals/ModalType";
// import { ServerStatusType } from "../../enums/serverStatusType";
// import { initServerStatus } from "../../types/main/serverStatus";

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
