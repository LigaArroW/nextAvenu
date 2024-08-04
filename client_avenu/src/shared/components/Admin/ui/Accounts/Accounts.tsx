import { getProfilesUsers } from "@/lib/users/usersAction";
import styles from '@/shared/styles/Admin.module.sass'
import { IUser } from "@/types/user/user";
import ListUsers from "./ListUser/ListUser";


interface IAccounts {

    success: boolean
    users: IUser[]

}


const Accounts = async () => {
    const users: IAccounts = await getProfilesUsers()

    return (
        <div className={styles.main_content}>
            <div className={styles.title}>Список пользователей</div>
            <>
                <table>
                    <thead>
                        <tr>
                            <th>Имя пользователя</th>
                            <th>Пароль</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.users && users.users.length > 0
                            ? users.users.map((user) => {
                                return <ListUsers key={user.id} user={user} />
                            }) : <tr className={styles.users}><td>Пользователи не найдены</td></tr>}
                    </tbody>
                </table>
            </>
        </div>
    );
};

export default Accounts;