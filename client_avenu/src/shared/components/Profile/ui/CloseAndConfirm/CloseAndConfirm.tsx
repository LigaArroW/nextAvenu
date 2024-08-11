'use client'

import { deleteBlacklist, deleteBlacklistAccess } from "@/lib/blackList/blackList";
import { Close } from "@/shared/assets/Close";
import ConfirmMessageModal from "@/shared/components/Modals/ConfirmMessageModal";
import MessageModal from "@/shared/components/Modals/MessageModal";
import { useTranslations } from "next-intl";
import { useState } from "react";


interface ICloseAndConfirm {
    personId: string
    id: number
    access?: boolean
}


const CloseAndConfirm: React.FC<ICloseAndConfirm> = ({ id, personId, access = false }) => {
    const t = useTranslations()
    const [isConfirmModalShow, setIsConfirmModalShow] = useState(false);
    const [deletedBlacklistItem, setDeletedBlacklistItem] = useState(0);
    const [isMessageModalShow, setIsMessageModalShow] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");

    const handleDeleteOnClick = (blacklistItemId: number) => {
        setDeletedBlacklistItem(blacklistItemId);
        setIsConfirmModalShow(true);
    };


    const handlerOkOnClick = async (id: number) => {

        const deleted = access ? await deleteBlacklistAccess({ id, agency_id: Number(personId) }) : await deleteBlacklist({ id, agency_id: Number(personId) });


        if (deleted.success) {
            setIsConfirmModalShow(false);

        }
        if (!deleted.success) {
            setInfoMessage(deleted.error);
            setIsMessageModalShow(true);
        }
    }


    return (
        <td className={'borderer'}>
            <div className={'close'}
                onClick={() => handleDeleteOnClick(id)}
            >
                <Close fill="#1B1B1B" />
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
        </td>
    );
};

export default CloseAndConfirm;