'use client'


import { contactUsAction } from '@/lib/forms/contactUsAction';
import styles from '@/shared/styles/ContactUs.module.sass'
import ButtonSubmitForm from '@/widgets/ButtonSubmitForm/ButtonSubmitForm';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import Portal from '../ModalPortal/ModalPortal';
import MessageModal from '../Modals/MessageModal';

const ContactUs = () => {
  const t = useTranslations();
  const ref = useRef<HTMLFormElement>(null)
  const [showModal, setShowModal] = useState(false);


  const [state, formAction] = useFormState(contactUsAction, {
    'success': false,
    'message': ''
  });

  useEffect(() => {
    if (state.success) {
      ref.current?.reset()
      setShowModal(true)
    }
  }, [state.success])


  return (
    <div className={styles.wrapper_content}>
      <div className={styles.content}>
        <div className={styles.title}>{t("navigation.contact_us")}</div>
        <form action={(event) => {
          formAction(event)

        }}
          ref={ref}
        >
          <div className={styles.input_field}>
            {t("global.name")}
            <input
              placeholder=""
              type="name"
              required
              name='name'
              min={3}

            />
            <div className={styles.required}>*</div>
          </div>
          <div className={styles.input_field}>
            {t("global.email_address")}
            <input
              placeholder=""
              type="email"
              required
              name='email'

            />
            <div className={styles.required}>*</div>
          </div>
          <div className={styles.textarea_field}>
            <div className={styles.label}>{t("global.message")}</div>
            <textarea
              placeholder=""
              required
              name='message'


            />
            <div className={styles.required}>*</div>
          </div>
          {!state.success && state.message && <div className={styles.message}>{t(state.message)}</div>}
          <ButtonSubmitForm />
        </form>
      </div>
      {showModal && <Portal>
        <MessageModal
          text={state.message}
          buttonText={t("global.ok")}
          handlerButtonClick={() => setShowModal(false)}
        />
      </Portal>}



    </div>
  );
};

export default ContactUs;
