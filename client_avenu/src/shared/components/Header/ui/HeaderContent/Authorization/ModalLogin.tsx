'use client';

import styles from '@/shared/components/Modals/Modal.module.sass'
import { Close } from "@/shared/assets/Close";
import { useRouter } from "next/navigation";
import LoginContent from '@/shared/components/LoginContent/LoginContent'

interface IModalLogin {
    setShowModal: () => void
}


const ModalLogin: React.FC<IModalLogin> = ({ setShowModal }) => {



    return (
        <div className={`${styles.modal}  ${styles.active}`}>
            <div className={`${styles.overlay} ${styles.active}`} onClick={() => setShowModal()} />
            <div className={styles.modal_content} >
                <div className={styles.modal_close} onClick={() => setShowModal()}>
                    <Close fill="#1B1B1B" />
                </div>
                <div className={styles.content}>
                    <LoginContent onClose={() => setShowModal()} />

                </div>
            </div>
        </div>
    )
}

export default ModalLogin