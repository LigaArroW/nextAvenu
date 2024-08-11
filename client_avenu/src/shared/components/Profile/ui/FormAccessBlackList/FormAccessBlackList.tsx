'use client'
import { addAccessBlackListAction } from '@/lib/forms/blacklist/addAccessBlackListAction';
import ConfirmMessageModal from '@/shared/components/Modals/ConfirmMessageModal';
import MessageModal from '@/shared/components/Modals/MessageModal';
import styles from '@/shared/styles/Profile.module.sass'
import ButtonSubmitForm from '@/widgets/ButtonSubmitForm/ButtonSubmitForm';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';



const FormAccessBlackList = ({ id }: { id: string }) => {
    const t = useTranslations();
    const [accessTo, setAccessTo] = useState("");
    const [infoMessage, setInfoMessage] = useState("");
    const [isMessageModalShow, setIsMessageModalShow] = useState(false);
    const [state, formAction] = useFormState(addAccessBlackListAction, {
        'success': false,
        'message': ''
    });

    useEffect(() => {
        if (state.success) {
            setInfoMessage(state.message);
            setIsMessageModalShow(true);
        }
        if (!state.success && state.message) {
            setInfoMessage("profile.invalid_agency_id");
            setIsMessageModalShow(true);
        }


    }, [state.message, state.success])




    return (
        <form action={formAction}>
            <div className={styles.input_field}>
                {t("profile.agency_id")}
                <input type="hidden" name='id' value={id} />
                <input
                    placeholder=""
                    type="text"
                    required
                    name="access_to"
                    // minLength={8}
                    // maxLength={8}
                    onChange={(event) => setAccessTo(event.target.value.trim())}
                    value={accessTo}
                />
                <div className={'required'}>*</div>
            </div>
            <ButtonSubmitForm
                text="global.save"
                disabled={accessTo.length < 1}
            />

            {isMessageModalShow && <MessageModal
                text={infoMessage}
                buttonText={t("global.ok")}
                handlerButtonClick={() => setIsMessageModalShow(false)}

            />}

        </form>
    );
};

export default FormAccessBlackList;