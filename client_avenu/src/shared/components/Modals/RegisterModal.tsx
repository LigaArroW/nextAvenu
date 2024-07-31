


import styles from "./Modal.module.sass";

import MessageModal from "./MessageModal";


import { ModalType } from "../Modals/ModalType";


import { Close as CloseIcon } from "../../assets/Close";

const RegisterModal = () => {



  return (
    <h1>Register Modal</h1>
    // <div className={`${styles.modal} ${isModalShow && modalType === ModalType.Registration ? styles.active : ""}`}>
    //   <div
    //     className={`${styles.overlay} ${isModalShow && modalType === ModalType.Registration ? styles.active : ""}`}
    //     onClick={handleCloseOnClick}
    //   />
    //   <div className={styles.modal_content}>
    //     <div className={styles.modal_close} onClick={handleCloseOnClick}>
    //       <CloseIcon fill="#1B1B1B" />
    //     </div>
    //     {modalType === ModalType.Registration ? <RegisterContent /> : null}
    //   </div>
    //   <MessageModal
    //     text={t(`${errorMessage}`)}
    //     buttonText={t("global.ok")}
    //     handlerButtonClick={() => setIsMessageModalShow(false)}
    //     isShow={isMessageModalShow}
    //   />
    // </div>
  );
};

export default RegisterModal;
