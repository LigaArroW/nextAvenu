'use client'

import { Person } from "@/lib/auth/authAction";
import { IBlacklist } from "@/types/profile/blacklist/blacklist";

// import globalStyles from '@/shared/styles/Global.module.sass'

import styles from '@/shared/styles/Profile.module.sass'
import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Close } from "@/shared/assets/Close";
import { IBlacklistAccess } from "@/types/profile/blacklist/blacklistAccess";
import MessageModal from "@/shared/components/Modals/MessageModal";
import ConfirmMessageModal from "@/shared/components/Modals/ConfirmMessageModal";
import { deleteBlacklist } from "@/lib/blackList/blackList";
import { useRouter } from "next/navigation";


interface IBlackList {
    person: Person
    blacklist: IBlacklist[]
    blacklistAccess: IBlacklistAccess[]
}


const BlackList: React.FC<IBlackList> = ({ person, blacklist, blacklistAccess }) => {
    const t = useTranslations();
    const router = useRouter();
    const [agencyBlacklist, setAgencyBlacklist] = useState(blacklist);
    const [isConfirmModalShow, setIsConfirmModalShow] = useState(false);
    const [deletedBlacklistItem, setDeletedBlacklistItem] = useState(0);
    const [isMessageModalShow, setIsMessageModalShow] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");

    const handleDeleteOnClick = (blacklistItemId: number) => {
        setDeletedBlacklistItem(blacklistItemId);
        setIsConfirmModalShow(true);
    };


    const handlerOkOnClick = async (id: number) => {
        console.log(blacklist.length,'до удаления');
        const deleted = await deleteBlacklist({ id, agency_id: Number(person._id) });
        console.log("🚀 ~ handlerOkOnClick ~ deleted:", deleted)
        
        if (deleted.success) {
            setIsConfirmModalShow(false);
            console.log(blacklist.length,'после удаления');
            router.refresh();
        }
        if (!deleted.success) {
            setInfoMessage(deleted.error);
            setIsMessageModalShow(true);
        }
    }

    return (
        <div className={styles.content}>
            <div className={styles.title}>{t("profile.blacklist")}</div>
            <div className={`${styles.main_info} ${styles.full_width}`}>
                {agencyBlacklist.length > 0 && <div className={styles.agency}>{t("profile.this_agency")}</div>}
                {agencyBlacklist.length > 0 && (
                    <table className={'table'}>
                        <thead>
                            <tr className={'borderer'}>
                                <th style={{ width: "35%" }}>{t("profile.phone_number")}</th>
                                <th className={'borderer'} style={{ width: "65%" }}>
                                    {t("profile.description")}
                                </th>
                                <th className={'borderer'}>
                                    <Close fill="#FFFFFF" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {agencyBlacklist.map((blacklist_item: IBlacklist) => (
                                <tr key={blacklist_item.id}>
                                    <td style={{ width: "35%" }}>{blacklist_item.phone_number}</td>
                                    <td className={'borderer'} style={{ width: "65%" }}>
                                        {blacklist_item.description}
                                    </td>
                                    <td className={'borderer'}>
                                        <div className={'close'}
                                            onClick={() => handleDeleteOnClick(blacklist_item.id)}
                                        >
                                            <Close fill="#1B1B1B" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {blacklistAccess.map((access: IBlacklistAccess) => {
                    if (
                        access.access_to === Number(person._id) &&
                        blacklist.filter((blacklist_item: IBlacklist) => blacklist_item.agency_id === access.access_to).length > 0
                    ) {
                        return (
                            <div key={access.agency_id} className={`${styles.main_info} ${styles.full_width}`}>
                                <div className={styles.agency}>
                                    {t("profile.agency_with_id")} {String(access.agency_id).padStart(8, "0")}
                                </div>
                                <table className={'table'}>
                                    <thead>
                                        <tr className={'borderer'}>
                                            <th style={{ width: "35%" }}>{t("profile.phone_number")}</th>
                                            <th className={'borderer'} style={{ width: "65%" }}>
                                                {t("profile.description")}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {blacklist
                                            .filter((blacklist_item: IBlacklist) => blacklist_item.agency_id === access.agency_id)
                                            .map((blacklist_item: IBlacklist) => (
                                                <tr key={blacklist_item.id}>
                                                    <td style={{ width: "35%" }}>{blacklist_item.phone_number}</td>
                                                    <td className={'borderer'} style={{ width: "65%" }}>
                                                        {blacklist_item.description}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        );
                    }
                })}
            </div>
            {isMessageModalShow && <MessageModal
                text={infoMessage}
                buttonText={t("global.ok")}
                handlerButtonClick={() => setIsMessageModalShow(false)}
            // isShow={isMessageModalShow}
            />}
            <ConfirmMessageModal
                text={t("global.delete_blacklist_question")}
                okButtonText={t("global.delete")}
                handlerOkOnClick={() => handlerOkOnClick(deletedBlacklistItem)}
                cancelButtonText={t("global.cancel")}
                isShow={isConfirmModalShow}
                setIsShow={setIsConfirmModalShow}
            />
        </div>
    );
};

export default BlackList;