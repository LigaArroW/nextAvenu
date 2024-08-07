import { Login } from "@/lib/forms/login/loginAction";
import ChangePassword from "@/shared/components/ChangePassword/ChangePassword";
import EmailAfterEmail from "@/shared/components/EmailLogin/EmailAfterEmail";
import RegisterConfirm from "@/shared/components/RegisterConfirm/RegisterConfirm";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export async function generateMetadata() {
    const t = await getTranslations();
    return {
        title: `${t("global.password_change")}`,
    };
}


export default async function ChangePasswordPage({ params: { locale, login, token } }: { params: { locale: string, login: string, token: string } }) {
    unstable_setRequestLocale(locale);



    if (!login || !token) {
        redirect(`/${locale}`);
    }
    const email = decodeURIComponent(login);


    return (
        <ChangePassword email={email} token={token} />
    )
}

