'use client'
import { useTranslations } from 'next-intl';
import styles from '../RegisterContent.module.sass'
import { ProfileType } from '@/enums/profileType';
import { useState } from 'react';
import { Check } from '@/shared/assets/Check';
import ButtonSubmitForm from '@/widgets/ButtonSubmitForm/ButtonSubmitForm';
import { useFormState } from 'react-dom';
import { registerAction } from '@/lib/forms/register/registerAction';
import { useRouter } from 'next/navigation';


const RegistrationContainer = () => {
    const t = useTranslations();
    const router = useRouter();
    const [type, setType] = useState(ProfileType.Agency);
    const [isTermsApplyChecked, setIsTermsApplyChecked] = useState(false);
    const [isPersonalDataApplyChecked, setIsPersonalDataApplyChecked] = useState(false);
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");
    const [state, formAction] = useFormState(registerAction, {
        'success': false,
        'message': '',
    });


    const handleSetIsTermsApplyedOnClick = () => {
        setIsTermsApplyChecked(!isTermsApplyChecked);
    };

    const handleSetIsPersonalDataApplyedOnClick = () => {
        setIsPersonalDataApplyChecked(!isPersonalDataApplyChecked);
    };
    return (
        <>
            {!state.success && <form className={styles.form} action={formAction}>
                <div className={styles.radio_group_container}>
                    <div className={styles.label}>{t("profile.type")}</div>
                    <div className={styles.radio_group}>
                        <div className={styles.item}>
                            <div
                                className={`${styles.button} ${type === ProfileType.Agency ? styles.active : ""}`}
                                onClick={() => setType(ProfileType.Agency)}
                            />
                            <div className={styles.item_text}>
                                {t("profile.agency")}
                                <p>Хочу добавить анкету</p>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div
                                className={`${styles.button} ${type === ProfileType.Guest ? styles.active : ""}`}
                                onClick={() => setType(ProfileType.Guest)}
                            />
                            <div className={styles.item_text}>
                                {t("profile.guest")}
                                <p>Хочу оставить комментарий к анкете</p>
                            </div>

                        </div>
                    </div>
                </div>
                <div className={styles.input_field}>
                    {t("global.email_address")}
                    <input placeholder="" type="email"
                        required
                        name="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value.trim())}
                    />
                </div>
                <div className={styles.input_field}>
                    {t("global.password")}
                    <input
                        placeholder=""
                        type="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value.trim())}
                        minLength={6}
                    />
                </div>
                {/* {errorForm !== "" ? <div className={styles.error}>{t(`${errorForm}`)}</div> : null} */}
                {!state.success && state.message && <div className={styles.error}>{t(state.message)}</div>}
                <div>
                    <input type="hidden" name="type" value={type} />
                </div>
                <label className={styles.checkbox}>
                    <input type="checkbox" className={styles.type_checkbox} />
                    <span
                        className={`${styles.checkbox_mark} ${styles.white} ${isTermsApplyChecked ? styles.active : " "
                            }`}
                        aria-hidden="true"
                        onClick={handleSetIsTermsApplyedOnClick}
                    >
                        {isTermsApplyChecked && <Check fill="#98042D" />}
                    </span>
                    <div className={styles.text}>
                        {t("global.i_have_read")} <span>Terms and Conditions, Privacy policy</span>
                    </div>
                </label>
                <label className={styles.checkbox}>
                    <input type="checkbox" className={styles.type_checkbox} />
                    <span
                        className={`${styles.checkbox_mark} ${styles.white} ${isPersonalDataApplyChecked ? styles.active : " "
                            }`}
                        aria-hidden="true"
                        onClick={handleSetIsPersonalDataApplyedOnClick}
                    >
                        {isPersonalDataApplyChecked && <Check fill="#98042D" />}
                    </span>
                    <div className={styles.text}>{t("global.i_agree")}</div>
                </label>
                {/* <button type="submit" >
                    {t("global.complete_registration")}
                </button> */}
                <ButtonSubmitForm
                    disabled={(isPersonalDataApplyChecked && isTermsApplyChecked && login !== '' && password !== '') ? false : true}
                    text="global.complete_registration"

                />
            </form>}

            {state.success && (
                <>
                    <div className={styles.success_content}>
                        <div className={styles.success_title}>{t("global.thanks_for_register")}</div>
                        <div className={styles.success_description}>{t("global.confirmation_email_was_send")}</div>
                    </div>
                    <div className={styles.bottom_content}>
                        {t("global.if_email_has_not_recieved")}
                        <div className={styles.contact_us} onClick={() => router.back()}>
                            {t("navigation.contact_us").toLowerCase()}
                        </div>
                    </div>
                </>
            )}
            {/* <div className={styles.authorization} >
                {t("global.authorization")}
            </div> */}


        </>
    );
};

export default RegistrationContainer;