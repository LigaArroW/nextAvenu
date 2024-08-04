import { getAuthAction } from "@/lib/auth/authAction";
import { RolesUsers } from "@/lib/auth/authType";
import AdminHeader from "@/shared/components/Admin/ui/AdminHeader/AdminHeader";
import AdminLogin from "@/shared/components/Admin/AdminLogin";
import { LinksList } from "@/shared/components/Admin/linkList";
import styles from '@/shared/styles/Admin.module.sass'
import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import { LinksListSuper } from "@/shared/components/SuperAdmin/linkListSuper";
import SuperAdminLogin from "@/shared/components/SuperAdmin/SuperAdminLogin";



export const metadata: Metadata = {
    title: "Панель Управления Супер Администратора",
};


export default async function RootLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode,
    params: { locale: string }
}) {
    unstable_setRequestLocale(locale);
    const auth = await getAuthAction('SuperAdminToken')
    const list = LinksListSuper

    switch (auth.roles) {
        case RolesUsers.SuperAdmin:
            return (
                <div className={styles.wrapper_content}>
                    <AdminHeader list={list} tokenName="SuperAdminToken"/>
                    {/* <AdminContent adminType={auth.type} /> */}
                    {children}
                </div>


            )
        case RolesUsers.None:
            return (
                <SuperAdminLogin />
            )

    }

    // if (!auth) {
    //     return (
    //         <AdminLogin />
    //     )
    // }

    // return (
    //     <>
    //         <AdminHeader type={auth.type}/>
    //         aaaa
    //         <AdminContent adminType={auth.type} />
    //         {children}
    //     </>
    // )
}
