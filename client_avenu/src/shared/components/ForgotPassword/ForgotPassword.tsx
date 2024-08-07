'use client';

import { forgotPasswordAction } from "@/lib/forms/forgotPasswordAction/forgotPasswordAction";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import styles from '@/shared/styles/ForgotPassword.module.sass'
import ButtonSubmitForm from "@/widgets/ButtonSubmitForm/ButtonSubmitForm";
import MessageModal from "../Modals/MessageModal";

const ForgotPassword = () => {
    const t = useTranslations();
    const [email, setEmail] = useState("");
    const [isMessageModalShow, setIsMessageModalShow] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    const [state, formAction] = useFormState(forgotPasswordAction, {
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
            <div className={styles.title}>{t("global.password_recovery")}</div>
            <div className={styles.description}>{t("global.password_recovery_description")}</div>
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

export default ForgotPassword;