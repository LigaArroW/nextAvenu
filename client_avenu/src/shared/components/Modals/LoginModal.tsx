'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";

// import { useActions } from "../../hooks/useActions";
// import { useTypedSelector } from "../../hooks/useTypedSelector";

import styles from "./Modal.module.sass";

import MessageModal from "./MessageModal";

// import LoginContent from "../LoginContent/LoginContent";

import { ModalType } from "../Modals/ModalType";
// import { ServerStatusType } from "../../enums/serverStatusType";
// import { initServerStatus } from "../../types/main/serverStatus";

// import { Close as CloseIcon } from "../../assets/Close";
import useOutsideClick from "@/shared/hooks/useOutsideClick";
import { Close } from "@/shared/assets/Close";
import LoginContent from "../LoginContent/LoginContent";

interface ILoginModalProps {
  onClose: () => void;
}

const RegisterModal: React.FC<ILoginModalProps> = ({ onClose }) => {
  const [loginContent, setLoginContent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onClose);
  // const { t } = useTranslation();
  // const { setIsNoScroll, setIsModalShow, setModalType, setProfileStatuses, getModels } = useActions();
  // const profile = useTypedSelector((state) => state.profileReducer.profile);
  // const profileStatuses = useTypedSelector((state) => state.profileReducer.serverStatuses);
  // const isModalShow = useTypedSelector((state) => state.mainReducer.isModalShow);
  // const modalType = useTypedSelector((state) => state.mainReducer.modalType);
  // const [errorMessage, setErrorMessage] = useState("");
  // const [isMessageModalShow, setIsMessageModalShow] = useState(false);

  // useEffect(() => {
  //   setIsNoScroll(isModalShow);
  // }, [isModalShow]);

  // useEffect(() => {
  //   if (modalType === ModalType.Authorization && profileStatuses.login.status === ServerStatusType.Success) {
  //     handleCloseOnClick();
  //   }
  //   if (modalType === ModalType.Authorization && profileStatuses.login.status === ServerStatusType.Error) {
  //     if (profileStatuses.login.error !== "global.invalid_username") {
  //       setErrorMessage(profileStatuses.login.error);
  //       setProfileStatuses({ ...profileStatuses, login: initServerStatus() });
  //       setIsMessageModalShow(true);
  //     }
  //   }
  // }, [profileStatuses]);

  // const handleCloseOnClick = () => {
  //   getModels({ profile_id: profile.id });
  //   setIsModalShow(false);
  //   setModalType(ModalType.None);
  //   setProfileStatuses({ ...profileStatuses, login: initServerStatus() });
  // };

  return (
    <>
      <div className={`${styles.modal} ${true ? styles.active : ""}`} >
        <div
          className={`${styles.overlay} ${true ? styles.active : ""}`}
        />
        <div className={styles.modal_content} ref={ref}>
          <div className={styles.modal_close} onClick={onClose}>
            <Close fill="#1B1B1B" />
          </div>
          {/* <LoginContent registerContent={() => setLoginContent(true)} modalClose={onClose}/> */}
        </div>
      </div>
      {
        loginContent && (
          <h1>hello</h1>
        )
      }
    </>
  )


  // return (
  //   <div className={`${styles.modal} ${isModalShow && modalType === ModalType.Authorization ? styles.active : ""}`}>
  //     <div
  //       className={`${styles.overlay} ${isModalShow && modalType === ModalType.Authorization ? styles.active : ""}`}
  //       onClick={handleCloseOnClick}
  //     />
  //     <div className={styles.modal_content}>
  //       <div className={styles.modal_close} onClick={handleCloseOnClick}>
  //         <CloseIcon fill="#1B1B1B" />
  //       </div>
  //       {modalType === ModalType.Authorization ? <LoginContent /> : null}
  //     </div>
  //     <MessageModal
  //       text={t(`${errorMessage}`)}
  //       buttonText={t("global.ok")}
  //       handlerButtonClick={() => setIsMessageModalShow(false)}
  //       isShow={isMessageModalShow}
  //     />
  //   </div>
  // );
};

export default RegisterModal;
