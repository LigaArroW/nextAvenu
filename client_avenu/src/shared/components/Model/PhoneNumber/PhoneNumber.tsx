'use client'

import { Phone } from "@/shared/assets/Phone";
import { changePhoneNumber } from "@/shared/constant/changePhoneNumber";
import { IContact } from "@/types/model/contact/contact";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface IPhoneNumber {
    contact: IContact
    phone: string
    phone_show: string
}


const PhoneNumber: React.FC<IPhoneNumber> = ({ contact, phone, phone_show }) => {
    const t = useTranslations();
    const [showedPhoneNumbers, setShowedPhoneNumbers] = useState([] as number[]);

    const handleShowPhoneNumberClick = (contact_id: number) => {
        setShowedPhoneNumbers([...showedPhoneNumbers, contact_id]);
    };

    const makeHiddenPhoneNumber = (phoneNumber: string) => {
        var replacedStr = phoneNumber.substring(9, 15);
        return phoneNumber.replace(replacedStr, "XXX-XX");
    };



    return (
        <>
            {
                showedPhoneNumbers.filter((item: number) => item === contact.id).length > 0 && (
                    <div className={phone}>
                        <Phone />
                        <a
                            className={`${phone}`}
                            href={`tel:+${changePhoneNumber(contact.phone_number)}`}
                            onClick={(event) => event?.stopPropagation()}
                        >
                            {contact.phone_number}
                        </a>
                    </div>
                )
            }
            {
                showedPhoneNumbers.filter((item: number) => item === contact.id).length === 0 && (
                    <div className={phone}>
                        <Phone />
                        {makeHiddenPhoneNumber(contact.phone_number)}
                        <div
                            className={phone_show}
                            onClick={() => handleShowPhoneNumberClick(contact.id)}
                            title={t("model.show_the_number")}
                        >
                            [{t("global.show")}]
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default PhoneNumber