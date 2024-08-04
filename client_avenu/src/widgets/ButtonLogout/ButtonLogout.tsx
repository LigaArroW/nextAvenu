'use client'

import { removeAuthAction } from "@/lib/auth/authAction"
import { TokensRoles } from "@/lib/auth/authType"
import { Logout } from "@/shared/assets/Logout"

interface IButtonLogOutProps {
    tokenName: keyof typeof TokensRoles
    style?: string
}

const ButtonLogout: React.FC<IButtonLogOutProps> = ({ tokenName, style = '' }) => {



    return (
        <button className={style} onClick={() => removeAuthAction(tokenName)}>
            <Logout />
        </button>
    )
}

export default ButtonLogout