'use client'
import { changePasswordAdmin } from "@/lib/superAdmin/superAdmin";
import { Save } from "@/shared/assets/Save";
import { IUser } from "@/types/user/user";
import { useState } from "react";
import styles from './ListAdmins.module.sass'

interface IListAdmins {
    user: IUser
}

const ListAdmins: React.FC<IListAdmins> = ({ user }) => {

    const [password, setPassword] = useState<string>('');

    const handleSaveUser = async () => {
        if (user.password === password) {
            alert("Пароли не должны совпадать")
        } else {
            await changePasswordAdmin({ login: user.login, password: password });
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
    );
};

export default ListAdmins;