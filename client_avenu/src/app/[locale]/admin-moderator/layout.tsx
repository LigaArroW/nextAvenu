import { getAuthAction } from "@/lib/auth/authAction";
import { RolesUsers } from "@/lib/auth/authType";
import AdminHeader from "@/shared/components/Admin/ui/AdminHeader/AdminHeader";
import AdminLogin from "@/shared/components/Admin/AdminLogin";
import { LinksList } from "@/shared/components/Admin/linkList";
import styles from '@/shared/styles/Admin.module.sass'
import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";



export const metadata: Metadata = {
    title: "Панель Управления",
};


export default async function RootLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode,
    params: { locale: string }
}) {
    unstable_setRequestLocale(locale);
    const auth = await getAuthAction('AdminToken')
    const list = LinksList[auth.type]

    switch (auth.roles) {
        case RolesUsers.Admin:
            return (
                <div className={styles.wrapper_content}>
                    <AdminHeader list={list} tokenName="AdminToken"/>
                    {/* <AdminContent adminType={auth.type} /> */}
                    {children}
                </div>


            )
        case RolesUsers.None:
            return (
                <AdminLogin />
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
