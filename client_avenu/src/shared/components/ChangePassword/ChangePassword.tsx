'use client'

import styles from '@/shared/styles/ForgotPassword.module.sass'
import { useLocale, useTranslations } from 'next-intl';
import MessageModal from '../Modals/MessageModal';
import ButtonSubmitForm from '@/widgets/ButtonSubmitForm/ButtonSubmitForm';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { ChangePasswordAction } from '@/lib/forms/changePassword/changePasswordAction';
import { Login } from '@/lib/forms/login/loginAction';
import { useRouter } from 'next/navigation';

interface IChangePasswordProps {
    email: string
    token: string
}

const ChangePassword: React.FC<IChangePasswordProps> = ({ email, token }) => {
    const t = useTranslations();
    const router = useRouter();
    const locale = useLocale();
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [isMessageModalShow, setIsMessageModalShow] = useState(false);
    const [state, formAction] = useFormState(ChangePasswordAction, {
        'success': false,
        'message': ''
    });


    const handleMessageOkOnClick = async () => {
        const login = await Login({ login: email, password: token, email: true })
        setIsMessageModalShow(false)
        if (login.success) {
            router.push(`/${locale}/profile`)
        }

    }

    return (
        <div className={styles.content}>
            <div className={styles.title}>{t("global.password_recovery")}</div>
            <div className={styles.description}>{t("global.password_change")}</div>
            <form action={formAction}>
                <div className={styles.input_field}>
                    <div className={styles.label}>{t("global.new_password")}</div>
                    <input
                        placeholder=""
                        type="password"
                        name='password'
                        required
                        onChange={(event) => setPassword(event.target.value.trim())}
                        value={password}
                        minLength={6}
                    />
                    <div className={styles.required}>*</div>
                </div>
                <input type="hidden" value={email} name="email" />
                <input type="hidden" value={token} name="token" />
                <div className={styles.input_field}>
                    <div className={styles.label}>{t("global.new_password")}</div>
                    <input
                        placeholder=""
                        type="password"
                        name='repeatPassword'
                        required
                        onChange={(event) => setRepeatPassword(event.target.value.trim())}
                        value={repeatPassword}
                        minLength={6}
                    />
                    <div className={styles.required}>*</div>
                </div>
                {/* <button type="submit" disabled={!isButtonEnabled}>
                    {t("global.save")}
                </button> */}
                {!state.success && state.message && <div className={styles.error}>{t(state.message)}</div>}
                <ButtonSubmitForm
                    text="global.save"
                    disabled={(password.length < 6 || repeatPassword.length < 6) ? true : false}
                />
            </form>
            {state.success && <MessageModal
                text={t("global.password_was_changed1")}
                buttonText={t("global.ok")}
                handlerButtonClick={handleMessageOkOnClick}
            // isShow={isMessageModalShow}
            />}
        </div>
    );
};

export default ChangePassword;