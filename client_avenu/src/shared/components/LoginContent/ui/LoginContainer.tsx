'use client'


import { useEffect, useRef, useState } from "react";
import styles from "../LoginContent.module.sass";
import { useLocale, useTranslations } from "next-intl";
import ReCAPTCHA from "react-google-recaptcha";
import ButtonSubmitForm from "@/widgets/ButtonSubmitForm/ButtonSubmitForm";
import { useFormState } from "react-dom";
import { loginAction, VerifyGoogle } from "@/lib/forms/login/loginAction";
import { usePathname, useRouter } from "next/navigation";


interface ILoginContainerProps {
    closeModal?: () => void
}


const LoginContainer: React.FC<ILoginContainerProps> = ({ closeModal = () => { } }) => {
    const t = useTranslations();
    const router = useRouter();
    const locale = useLocale();
    const pathname = usePathname();
    const [loginText, setLoginText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [errorForm, setErrorForm] = useState('');
    // const [state, formAction] = useFormState(loginAction, {
    //     'success': false,
    //     'message': ''
    // });

    const reCaptchaRef = useRef<ReCAPTCHA>(null);

    const recaptcha = async () => {
        if (reCaptchaRef.current) {
            const token = await reCaptchaRef.current.executeAsync();
            if (token) {
                await VerifyGoogle(token) as any;
            }
            reCaptchaRef.current.reset();
        }
        // router.push(`/${locale}/profile`)
    }


    // useEffect(() => {
    //     if (state.success) {
    //         // recaptcha()
    //         router.push(`/${locale}/profile`)
    //         console.log("🚀 ~ LoginContainer ~ state.success:", state.success);
    //         // closeModal()

    //     }
    // }, [state.success])
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        recaptcha()
        const login = await loginAction({ login: loginText, password: passwordText })

        if (login.success) {
            router.push(`/${locale}/profile`)
            closeModal()
        }
        if (!login.success) {
            setErrorForm(login.message)
        }

    }

    return (
        <form
            // action={async (formData) => {
            //     await formAction(formData)
            //     recaptcha()

            // }}
            onSubmit={handleSubmit}
        >

            <ReCAPTCHA
                ref={reCaptchaRef}
                size="invisible"
                sitekey={process.env.NEXT_PUBLIC_REACT_APP_RECAPTCHA_KEY!}
                onChange={() => { }} />
            <input
                placeholder={t("global.login")}
                type="email"
                required
                name="login"
                value={loginText}
                onChange={(event) => setLoginText(event.target.value.trim())}
            // onChange={(event) => setEmail(event.target.value.trim())}
            // value={email}
            />
            <input
                placeholder={t("global.password")}
                type="password"
                required
                value={passwordText}
                onChange={(event) => setPasswordText(event.target.value.trim())}
                name="password"
                // onChange={(event) => setPassword(event.target.value.trim())}
                // value={password}
                minLength={6}
            />
            {errorForm !== "" ? <div className={styles.error}>{errorForm}</div> : null}
            <div className={styles.forgot_password} onClick={() => { router.push(`/${locale}/forgot_password`) }}>
                {t("global.forgot_your_password")}?
            </div>
            <ButtonSubmitForm
                disabled={(loginText !== '' && passwordText.length >= 6) ? false : true}
                text="global.enter"
            />
            <button type="button" onClick={() => { router.push(`/${locale}/email_login`) }} >
                {t('global.enter_to_email')}
            </button>
        </form>
    );
};

export default LoginContainer;