
import LoginContent from '@/shared/components/LoginContent/LoginContent'
import styles from '@/shared/components/Modals/Modal.module.sass'
import { Modal, ModalBody, ModalContent } from '@nextui-org/modal'
import { unstable_setRequestLocale } from 'next-intl/server';


export default async function LoginModalPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    return (
        // <Modal isOpen={true}>
        //     <ModalContent>
        //         <ModalBody>
        //             <LoginContent />
        //         </ModalBody>
        //     </ModalContent>
        // </Modal>
        <div className={`${styles.modal} ${styles.active}`}>
            <div className={`${styles.overlay} ${styles.active}`} />
            <div className={styles.modal_content}>
                <div className={styles.modal_close} />
                <div className={styles.modal_title}>Вход</div>
                <div className={styles.modal_subtitle}>Вход в аккаунт</div>
                <div className={styles.content}>
                    <LoginContent />
                </div>
            </div>
        </div>
        // <></>
    )
}