'use client';


import styles from '@/shared/styles/LoginAfterEmail.module.sass'
import MessageModal from '../Modals/MessageModal';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Login } from '@/lib/forms/login/loginAction';
import { useRouter } from 'next/navigation';


interface IEmailAfterEmailProps {
    email: string;
    token: string;
}


const EmailAfterEmail: React.FC<IEmailAfterEmailProps> = ({ email, token }) => {
    const t = useTranslations();
    const router = useRouter();
    const locale = useLocale();
    const [infoMessage, setInfoMessage] = useState("");
    const [isMessageModalShow, setIsMessageModalShow] = useState(false);
    const [text, setText] = useState(t("global.link_verify"));

    useEffect(() => {
        const loginData = async () => {
            const login = await Login({ login: email, password: token, email: true });
            if (login.success) {
                return router.push(`/${locale}/profile`)
            }
            if (!login.success) {
                setText(login.message);
                setInfoMessage(t("global.link_unavailable"));
                setIsMessageModalShow(true);
            }


        }


        loginData();


    }, [email, locale, router, t, token])


    return (
        <div className={styles.content}>
            <div className={styles.title}>{t("global.auth_to_email")}</div>
            <div className={styles.description}>
                {/* {t("global.link_unavailable")} */}
                {text}
            </div>
            {isMessageModalShow && <MessageModal
                text={infoMessage}
                buttonText={t("global.ok")}
                handlerButtonClick={() => setIsMessageModalShow(false)}
            // isShow={isMessageModalShow}
            />}
        </div>
    );
};

export default EmailAfterEmail;