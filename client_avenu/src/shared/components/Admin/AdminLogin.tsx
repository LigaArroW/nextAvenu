'use client'

import { adminAuthAction } from '@/lib/forms/admin/adminAuthAction';
import styles from '@/shared/styles/Admin.module.sass'
import ButtonSubmitForm from '@/widgets/ButtonSubmitForm/ButtonSubmitForm';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useFormState } from 'react-dom';

const Admin = () => {
    const t = useTranslations();
    const [passwordState, setPasswordState] = useState("");
    const [state, formAction] = useFormState(adminAuthAction, {
        'success': false,
        'message': ''
    });

    return (
        <div style={{ overflow: 'hidden', width: '100%' }}>
            <div className={styles.wrapper_content}>

                <div className={styles.content}>
                    <div className={styles.title}>Авторизация</div>
                    <form action={formAction}>
                        <input
                            placeholder={t("global.login")}
                            type="login"
                            required
                            name='login'
                        // onChange={(event) => setLogin(event.target.value.trim())}
                        // value={loginStr}
                        />
                        <input
                            placeholder={t("global.password")}
                            type="password"
                            name='password'
                            required
                            onChange={(event) => setPasswordState(event.target.value.trim())}
                            value={passwordState}
                        // minLength={6}
                        />
                        {!state.success && state.message && <div className={styles.error}>{state.message}</div>}
                        {state.success && <div className={styles.success}>{t("global.authorization")}</div>}
                        {/* {errorForm !== "" ? <div className={styles.error}>{t(errorForm)}</div> : null} */}
                        {/* <button type="submit" disabled={!isButtonEnabled}>
                            {t("global.enter")}
                        </button> */}
                        <ButtonSubmitForm text="global.enter" disabled={passwordState.length < 6} />
                    </form>
                </div>

            </div>
        </div>
    )
}


export default Admin
