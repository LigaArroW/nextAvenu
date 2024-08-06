'use client'

import { removeAuthAction, removeUserAuthAction } from "@/lib/auth/authAction"
import { TokensRoles } from "@/lib/auth/authType"
import { Logout } from "@/shared/assets/Logout"
import Portal from "@/shared/components/ModalPortal/ModalPortal"
import ConfirmMessageModal from "@/shared/components/Modals/ConfirmMessageModal"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface IButtonLogOutProps {
    tokenName: keyof typeof TokensRoles
    style?: string
    modal?: boolean
}

const ButtonLogout: React.FC<IButtonLogOutProps> = ({ tokenName, style = '', modal = false }) => {
    const router = useRouter()
    const locale = useLocale()
    const t = useTranslations();
    const [modalShow, setModalShow] = useState(false);
    const [confim, setConfirm] = useState(false);


    useEffect(() => {
        if (confim) {
            removeUserAuthAction(tokenName)
            router.refresh()
            // router.push(`/${locale}`)
        }
    }, [confim])

    const handleLogout = () => {
        if (!modal) {
            removeAuthAction(tokenName)
            router.push(`/${locale}`)
        }
        setModalShow(true)
    }

    return (
        <>
            <button className={style} onClick={handleLogout}>
                <Logout />
            </button>
            {modalShow &&
                <Portal>
                    <ConfirmMessageModal
                        text={t("global.logout_question")}
                        okButtonText={t("global.logout")}
                        handlerOkOnClick={() => {
                            setConfirm(true)
                            setModalShow(false)
                        }}
                        cancelButtonText={t("global.cancel")}
                        isShow={modalShow}
                        setIsShow={setModalShow}
                    />
                </Portal>

            }
        </>
    )
}

export default ButtonLogout