'use client'

import { useEffect, useState } from "react";
import InputMask from "react-input-mask";

import styles from "../ModelSettingsNew.module.sass";

import { ComponentType } from "../ComponentType";


import { Telegram as TelegramIcon } from "@/shared/assets/Telegram";
import { Whatsapp as WhatsappIcon } from "@/shared/assets/Whatsapp";
import { Wechat as WechatIcon } from "@/shared/assets/Wechat";
import { Botim as BotimIcon } from "@/shared/assets/Botim";
import { Plus as PlusIcon } from "@/shared/assets/Plus";
import { Close as CloseIcon } from "@/shared/assets/Close";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";
import { IContact } from "@/types/model/contact/contact";
import { useTranslations } from "next-intl";

interface IContactsSelectorProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
}

const ContactsSelector: React.FC<IContactsSelectorProps> = ({ setActiveComponent, isCheckStart }) => {
  const t = useTranslations();
  const { model, setModel } = useNewModelContext();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const emptyContacts = model.contacts.filter((contact: IContact) => contact.phone_number.length < 18);
    setIsButtonEnabled(emptyContacts.length === 0);
  }, [model]);

  const handleContactOnChange = (contact: IContact) => {
    const tmpContacts = model.contacts.map((contactTmp: IContact) => {
      if (contactTmp.id === contact.id) {
        return {
          ...contactTmp,
          phone_number: contact.phone_number,
          is_whatsapp_enable: contact.is_whatsapp_enable,
          is_telegram_enable: contact.is_telegram_enable,
          is_wechat_enable: contact.is_wechat_enable,
          is_botim_enable: contact.is_botim_enable,
        };
      } else return contactTmp;
    });
    setModel({ ...model, contacts: tmpContacts });
  };

  const handleAddContactOnClick = () => {
    setModel({
      ...model,
      contacts: [
        ...model.contacts,
        {
          id: model.contacts[model.contacts.length - 1].id + 1,
          phone_number: "",
          is_telegram_enable: false,
          is_whatsapp_enable: false,
          is_wechat_enable: false,
          is_botim_enable: false,
          model_id: model.id,
        } as IContact,
      ],
    });
  };

  const handleDelecteContactOnClick = (contact: IContact) => {
    setModel({
      ...model,
      contacts: model.contacts.filter((contactTmp: IContact) => contact.id != contactTmp.id),
    });
  };

  return (
    <div
      className={`${styles.contacts_container} ${isCheckStart && model.contacts[0].phone_number.length < 18 ? "wrong" : ""}`}
    >
      <div className={styles.contacts}>
        <div className={styles.phones_container}>
          <div className={styles.label}>{t("model.phones")}</div>
          {model.contacts.map((contact: IContact, index: number) => (
            <div key={index} className={styles.input}>
              <InputMask
                className={index === 0 && isCheckStart && contact.phone_number.length < 18 ? `${'wrong'}` : ""}
                placeholder=""
                type="text"
                mask="+7 (999) 999-99-99"
                // maskPlaceholder="0"
                maskChar={""}
                onChange={(event) => handleContactOnChange({ ...contact, phone_number: event.target.value.trim() })}
                value={contact.phone_number}
                onClick={() => setActiveComponent(ComponentType.None)}
              />
              {index === 0 && <div className={'required'}>*</div>}
            </div>
          ))}
        </div>
        <div className={styles.messengers_container}>
          <div className={styles.label}>{t("model.messengers")}</div>
          {model.contacts.map((contact: IContact, index: number) => (
            <div key={index} className={styles.messengers}>
              <div className={styles.messengers_list}>
                <div
                  title="Telegram"
                  className={styles.messenger}
                  onClick={() => handleContactOnChange({ ...contact, is_telegram_enable: !contact.is_telegram_enable })}
                >
                  <TelegramIcon isGray={!contact.is_telegram_enable} />
                </div>
                <div
                  title="WhatsApp"
                  className={styles.messenger}
                  onClick={() => handleContactOnChange({ ...contact, is_whatsapp_enable: !contact.is_whatsapp_enable })}
                >
                  <WhatsappIcon isGray={!contact.is_whatsapp_enable} />
                </div>
                <div
                  title="WeChat"
                  className={styles.messenger}
                  onClick={() => handleContactOnChange({ ...contact, is_wechat_enable: !contact.is_wechat_enable })}
                >
                  <WechatIcon isGray={!contact.is_wechat_enable} />
                </div>
                <div
                  title="Botim"
                  className={styles.messenger}
                  onClick={() => handleContactOnChange({ ...contact, is_botim_enable: !contact.is_botim_enable })}
                >
                  <BotimIcon isGray={!contact.is_botim_enable} />
                </div>
              </div>
              {index !== 0 && (
                <div className={styles.delete} onClick={() => handleDelecteContactOnClick(contact)}>
                  <CloseIcon fill="#1B1B1B" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <button type="button" onClick={handleAddContactOnClick} disabled={!isButtonEnabled}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default ContactsSelector;
