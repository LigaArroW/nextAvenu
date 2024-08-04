

import { unstable_setRequestLocale } from "next-intl/server";

import styles from '@/shared/styles/SuperAdmin.module.sass'

import { getProfilesAdmins } from "@/lib/superAdmin/superAdmin";
import { IUser } from "@/types/user/user";
import ListAdmins from "@/shared/components/SuperAdmin/ui/ListAdmins/ListAdmins";


export async function generateMetadata() {

    return {
        title: "Панель Управления Супер Администратора",
    };
}

interface IAccounts {

    success: boolean
    users: IUser[]

}


export default async function SuperAdminModeratorPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    const admins: IAccounts = await getProfilesAdmins()


    return (
        <div className={styles.main_content}>
            <div className={styles.title}>Список пользователей</div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Имя пользователя</th>
                            <th>Пароль</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.users && admins.users.length > 0
                            ? admins.users.map((user) => {
                                return <ListAdmins key={user.id} user={user} />
                            }) : <div className={styles.users}><h1>Пользователи не найдены</h1></div>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}