'use client';

import { Person, removeUserAuthAction } from "@/lib/auth/authAction";
import { RolesUsersToTokenRoles, TokensRoles } from "@/lib/auth/authType";
import { deleteProfile } from "@/lib/users/usersAction";
import ConfirmMessageModal from "@/shared/components/Modals/ConfirmMessageModal";
import MessageModal from "@/shared/components/Modals/MessageModal";
import styles from '@/shared/styles/Profile.module.sass'
import { useTranslations } from "next-intl";
import { useState } from "react";

interface IDeleteProfile {

    person: Person
}

const DeleteProfile: React.FC<IDeleteProfile> = ({ person }) => {
    const t = useTranslations();
    const [isMessageModalShow, setIsMessageModalShow] = useState(false);
    const [isConfirmModalShow, setIsConfirmModalShow] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    const [iseDeleted, setIsDeleted] = useState(false);



    const handlerMessageOkOnClick = async () => {
        setIsConfirmModalShow(false);
        if (iseDeleted) {
            const token = person.roles === 'Agency' ? 'AgencyToken' : 'CustomerToken'
            await removeUserAuthAction(token);
        }
        setIsMessageModalShow(false);
    };

    const handlerConfirmDeleteOnClick = async (agencyId: number) => {
        console.log("🚀 ~ handlerConfirmDeleteOnClick ~ agencyId:", agencyId)
        setIsConfirmModalShow(false);
        const del = await deleteProfile({ agency_id: agencyId });
        console.log("🚀 ~ handlerConfirmDeleteOnClick ~ del:", del)
        if (del.success) {
            setIsMessageModalShow(true);
            setInfoMessage(t("profile.profile_has_been_deleted"));
            setIsDeleted(true);
        }
        if (!del.success) {
            setIsMessageModalShow(true);
            setInfoMessage(t("profile.profile_has_not_been_deleted"));
        }
    };

    return (
        <div className={styles.content}>
            <div className={styles.title}>{t("profile.deleting_a_profile")}</div>
            <div className={styles.main_info}>
                <div className={styles.item}>{t("profile.do_you_really_want_delete_account")}</div>
            </div>
            <button
                type="button"
                //  onClick={() => deleteProfile({ agency_id: profile.id })}
                onClick={() => setIsConfirmModalShow(true)}
            >
                {t("profile.delete_a_profile")}
            </button>
            {isMessageModalShow && <MessageModal
                text={infoMessage}
                buttonText={t("global.ok")}
                handlerButtonClick={handlerMessageOkOnClick}

            />}
            {isConfirmModalShow && <ConfirmMessageModal
                text={t("global.delete_profile_question")}
                okButtonText={t("global.delete")}
                handlerOkOnClick={() => handlerConfirmDeleteOnClick(Number(person._id))}
                cancelButtonText={t("global.cancel")}
                isShow={isConfirmModalShow}
                setIsShow={setIsConfirmModalShow}
            />}
        </div>
    );
};

export default DeleteProfile;