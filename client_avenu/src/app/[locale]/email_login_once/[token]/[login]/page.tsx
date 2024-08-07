import { Login } from "@/lib/forms/login/loginAction";
import EmailAfterEmail from "@/shared/components/EmailLogin/EmailAfterEmail";
import RegisterConfirm from "@/shared/components/RegisterConfirm/RegisterConfirm";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export async function generateMetadata() {
    const t = await getTranslations();
    return {
        title: `${t("global.auth_to_email")}`,
    };
}


export default async function EmailLoginOncePage({ params: { locale, login, token } }: { params: { locale: string, login: string, token: string } }) {
    unstable_setRequestLocale(locale);



    if (!login || !token) {
        redirect(`/${locale}`);
    }
    const email = decodeURIComponent(login);


    return (
        <EmailAfterEmail email={email} token={token} />
    )
}

