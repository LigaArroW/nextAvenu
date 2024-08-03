'use client';

import styles from '@/shared/components/Modals/Modal.module.sass'
import { Close } from "@/shared/assets/Close";
import { useRouter } from "next/navigation";
import ContactUs from "@/shared/components/ContactUs/ContactUs";
const ModalContact = () => {
    const router = useRouter();
    return (
        <div className={`${styles.modal} ${styles.info} ${styles.active}`}>
            <div className={`${styles.overlay} ${styles.active}`} onClick={() => router.back()} />
            <div className={styles.modal_content}>
                <div className={styles.modal_close} onClick={() => router.back()}>
                    <Close fill="#1B1B1B" />
                </div>
                <div className={styles.content}>
                    <ContactUs />

                </div>
            </div>
        </div>
    )
}


export default ModalContact