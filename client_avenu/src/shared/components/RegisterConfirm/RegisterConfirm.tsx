'use client'

import { Login } from '@/lib/forms/login/loginAction';
import { registerConfirmAction } from '@/lib/forms/register/registerAction';
import styles from '@/shared/styles/RegisterConfirm.module.sass';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IRegisterConfirmProps {
    login: string
    token: string
}


const RegisterConfirm: React.FC<IRegisterConfirmProps> = ({ login, token }) => {
    const t = useTranslations();
    const [error, setError] = useState('')
    const router = useRouter()
    const locale = useLocale();

    const handleConfimr = async () => {
        const data = await registerConfirmAction({ login, token })
        if (data.success) {
            const fetchLogin = await Login({ login, password: token, email: true })

            if (fetchLogin.success) {
                router.push(`/${locale}/profile`)
            }
            setError(data.message)
        }
    }


    return (

        <div className={styles.content}>
            <div className={styles.title}>{t(error)}</div>
            <button onClick={handleConfimr}>
                {t("global.complete_registration")}
            </button>
        </div>

    );
};

export default RegisterConfirm;