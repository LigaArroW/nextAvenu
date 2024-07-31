/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";


import styles from "./Modal.module.sass";

import MessageModal from "./MessageModal";
// import ContactUsContent from "../ContactUsContent/ContactUsContent";

import { ModalType } from "../Modals/ModalType";


import { Close as CloseIcon } from "../../assets/Close";

const ContactUsModal = () => {


  const [isMessageModalShow, setIsMessageModalShow] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");



 

  

  const handleMessageOkOnClick = () => {
    setIsMessageModalShow(false);
  };

  return (
    <div className={`${styles.modal} `}>
      <div
        className={`${styles.overlay} `}
        
      />
      <div className={styles.modal_content}>
        <div className={styles.modal_close} >
          <CloseIcon fill="#1B1B1B" />
        </div>
        {/* {modalType === ModalType.ContactUs ? <ContactUsContent /> : null} */}
      </div>
      {/* <MessageModal
        text={infoMessage}
        // buttonText={t("global.ok")}
        handlerButtonClick={handleMessageOkOnClick}
        isShow={isMessageModalShow}
      /> */}
    </div>
  );
};

export default ContactUsModal;
