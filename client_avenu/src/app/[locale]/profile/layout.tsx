import { getAuthAction, getAuthDataUserAction } from "@/lib/auth/authAction";
import { RolesUsers } from "@/lib/auth/authType";
import AdminHeader from "@/shared/components/Admin/ui/AdminHeader/AdminHeader";
import AdminLogin from "@/shared/components/Admin/AdminLogin";
import { LinksList } from "@/shared/components/Admin/linkList";
import styles from '@/shared/styles/Profile.module.sass'
import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProfileNavigation from "@/shared/components/Profile/ui/ProfileNavigation/ProfileNavigation";
import { getModels } from "@/lib/models/getDataModel";



// export const metadata: Metadata = {
//     title: "Панель Управления",
// };


export default async function RootLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode,
    params: { locale: string }
}) {
    unstable_setRequestLocale(locale);
    const customerToken = cookies().get('CustomerToken')?.value
    const agencyToken = cookies().get('AgencyToken')?.value
    if (!customerToken && !agencyToken) {
        redirect(`/${locale}`)
    }

    const models = await getModels()
    const person = await getAuthDataUserAction()

    const user = person.roles === RolesUsers.Customer ? person : person.roles === RolesUsers.Agency ? person : undefined

    if (!user) {
        redirect(`/${locale}`)
    }
    
    return (
        <div className={styles.wrapper_content}>
            <ProfileNavigation person={user} models={models} />
            {children}
        </div>
    )



    // switch (auth.roles) {
    //     case RolesUsers.Admin:
    //         return (
    //             <div className={styles.wrapper_content}>
    //                 <AdminHeader list={list} tokenName="AdminToken" />
    //                 {/* <AdminContent adminType={auth.type} /> */}
    //                 {children}
    //             </div>


    //         )
    //     case RolesUsers.None:
    //         return (
    //             <AdminLogin />
    //         )

    // }


}
