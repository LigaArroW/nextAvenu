'use client';

import styles from '@/shared/components/Modals/Modal.module.sass'
import { Close } from "@/shared/assets/Close";
import { useRouter } from "next/navigation";
import LoginContent from '@/shared/components/LoginContent/LoginContent'
const ModalLogin = () => {
    const router = useRouter();
    return (
        <div className={`${styles.modal} ${styles.info} ${styles.active}`}>
            <div className={`${styles.overlay} ${styles.active}`} onClick={() => router.back()} />
            <div className={styles.modal_content}>
                <div className={styles.modal_close} onClick={() => router.back()}>
                    <Close fill="#1B1B1B" />
                </div>
                <div className={styles.content}>
                    <LoginContent />

                </div>
            </div>
        </div>
    )
}

export default ModalLogin