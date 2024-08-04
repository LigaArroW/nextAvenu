'use client'

import { useTranslations } from 'next-intl'
import { useFormStatus } from 'react-dom'

interface IButtonSubmitForm {
    style?: string
    text?: string
    disabled?: boolean
}


const ButtonSubmitForm: React.FC<IButtonSubmitForm> = ({ style = '', text = "global.send", disabled }) => {
    const t = useTranslations()
    const { pending } = useFormStatus()



    return (
        <button type="submit" disabled={disabled || pending} className={style}>
            {t(text)}
        </button>
    )
}

export default ButtonSubmitForm