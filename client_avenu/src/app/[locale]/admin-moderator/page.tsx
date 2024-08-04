import { getAuthAction } from "@/lib/auth/authAction";
import AdminContent from "@/shared/components/Admin/AdminContent";
import AdminLogin from "@/shared/components/Admin/AdminLogin";
import { unstable_setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";
// import { verify } from "jsonwebtoken";
export async function generateMetadata() {

    return {
        title: "Панель Управления",
    };
}





export default async function AdminModeratorPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const auth = await getAuthAction('AdminToken')

    if (!auth) {
        return (
            <AdminLogin />
        )
    }
    
    return (
        <AdminContent adminType={auth.type}/>
    )
}