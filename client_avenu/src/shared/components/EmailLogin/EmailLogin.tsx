'use client';
import { useTranslations } from "next-intl";


import styles from '@/shared/styles/LoginEmail.module.sass'
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { emailLoginAction } from "@/lib/forms/emailLogin/emailLoginAction";
import ButtonSubmitForm from "@/widgets/ButtonSubmitForm/ButtonSubmitForm";
import MessageModal from "../Modals/MessageModal";


const EmailLogin = () => {
    const t = useTranslations();
    const [email, setEmail] = useState("");
    const [isMessageModalShow, setIsMessageModalShow] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    const [state, formAction] = useFormState(emailLoginAction, {
        'success': false,
        'message': ''
    });

    useEffect(() => {
        if (state.success) {
            setInfoMessage(state.message);
            setIsMessageModalShow(true);
        }
    }, [state])


    return (
        <div className={styles.content}>
            <div className={styles.title}>{t("global.auth_to_email")}</div>
            <div className={styles.description}>{t("emails.auth_to_email_description")}</div>
            <form action={formAction}>
                <div className={styles.input_field}>
                    <div className={styles.label}>{t("global.email_address")}</div>
                    <input
                        placeholder=""
                        type="email"
                        name="email"
                        required
                        onChange={(event) => setEmail(event.target.value.trim())}
                        value={email}
                    />
                    <div className={styles.required}>*</div>
                </div>
                {/* <button type="submit" disabled={!isButtonEnabled}>
                    {t("global.continue")}
                </button> */}
                <ButtonSubmitForm text="global.continue" disabled={email.length === 0 ? true : false} />
            </form>
            {isMessageModalShow && <MessageModal
                text={infoMessage}
                buttonText={t("global.ok")}
                handlerButtonClick={() => setIsMessageModalShow(false)}
            // isShow={isMessageModalShow}
            />}
        </div>
    );
};

export default EmailLogin;