'use client'
import { Save } from "@/shared/assets/Save";
import styles from "./ListUsers.module.sass";

import { useState } from "react";
import { IUser } from "@/types/user/user";
import { changePasswordUsers } from "@/lib/users/usersAction";

interface IListUsers {
    user: IUser
}

const ListUsers: React.FC<IListUsers> = ({ user }) => {

    const [password, setPassword] = useState<string>('');

    const handleSaveUser = async () => {
        if (user.password === password) {
            alert("Пароли не должны совпадать")
        } else {
            await changePasswordUsers({ login: user.login, password: password });
            setPassword('');

            alert("Пароль успешно изменен")
        }
    }

    return (
        <tr key={user.id}>
            {/* <td>{user.login}</td> */}
            <td><input type="text" value={user.login} disabled /></td>
            <td> <input type="text" min={6} value={password} onChange={(event) => setPassword(event.target.value)} /></td>
            <td>
                <button className={styles.buttons} disabled={password.length < 6 || password === ""} type="button" onClick={() => handleSaveUser()}>
                    <Save />
                </button>
            </td>
        </tr>
    )
}

export default ListUsers