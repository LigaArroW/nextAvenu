'use client'

import { useTranslations } from 'next-intl'
import { useFormStatus } from 'react-dom'

interface IButtonSubmitForm {
    style?: string
}


const ButtonSubmitForm: React.FC<IButtonSubmitForm> = ({ style = '' }) => {
    const t = useTranslations()
    const { pending } = useFormStatus()

    return (
        <button type="submit" disabled={pending} className={style}>
            {t("global.send")}
        </button>
    )
}

export default ButtonSubmitForm