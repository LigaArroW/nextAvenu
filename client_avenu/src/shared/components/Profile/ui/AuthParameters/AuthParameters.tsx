'use client'

import { Person } from "@/lib/auth/authAction";
import MessageModal from "@/shared/components/Modals/MessageModal";
import styles from '@/shared/styles/Profile.module.sass'
import { useTranslations } from "next-intl";
import ButtonSubmitForm from "@/widgets/ButtonSubmitForm/ButtonSubmitForm";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { updateProfileAction } from "@/lib/forms/updateProfile/updateProfileAction";

interface IAuthParameters {
    person: Person

}


const AuthParameters: React.FC<IAuthParameters> = ({ person }) => {
    const t = useTranslations();
    const [email, setEmail] = useState(person.login);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isModalShow, setIsModalShow] = useState(false);
    const ref = useRef<HTMLFormElement>(null)
    const [state, formAction] = useFormState(updateProfileAction, {
        'success': false,
        'message': ''
    });


    useEffect(() => {
        if (state.success) {
            setPassword('')
            setNewPassword('')
            setIsModalShow(true)
        }

    }, [state.success])


    return (
        <div className={styles.content}>
            <div className={styles.title}>{t("profile.login_options")}</div>
            <div className={styles.main_info}>
                <form action={formAction} ref={ref}>
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
                    <div className={styles.input_field}>
                        <div className={styles.label}>{t("global.current_password")}</div>
                        <input
                            placeholder=""
                            type="password"
                            name="password"
                            required
                            onChange={(event) => setPassword(event.target.value.trim())}
                            value={password}
                            minLength={6}
                        />
                        <div className={styles.required}>*</div>
                    </div>
                    <input type="hidden" name="id" value={Number(person._id)} />
                    <div className={styles.input_field}>
                        <div className={styles.label}>{t("global.new_password")}</div>
                        <input
                            placeholder=""
                            type="password"
                            name="newPassword"
                            required
                            onChange={(event) => setNewPassword(event.target.value.trim())}
                            value={newPassword}
                            minLength={6}
                        />
                        <div className={styles.required}>*</div>
                    </div>
                    {!state.success && state.message && <div className={styles.info_message}>{t(state.message)}</div>}
                    <ButtonSubmitForm
                        text="global.save"
                        disabled={(email.length < 2 || password.length < 6 || newPassword.length < 6) ? true : false}
                    />
                </form>
            </div>
            {isModalShow && <MessageModal
                text={state.message}
                buttonText={t("global.ok")}
                handlerButtonClick={() => setIsModalShow(false)}

            />}
        </div>
    );
};

export default AuthParameters;