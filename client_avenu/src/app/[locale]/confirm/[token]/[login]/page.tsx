import RegisterConfirm from "@/shared/components/RegisterConfirm/RegisterConfirm";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export async function generateMetadata() {
    const t = await getTranslations();
    return {
        title: `${t("global.confirmation_of_registration")}`,
    };
}


export default async function ConfirmPage({ params: { locale, login, token } }: { params: { locale: string, login: string, token: string } }) {
    unstable_setRequestLocale(locale);



    if (!login || !token) {
        redirect(`/${locale}`);
    }
    const email = decodeURIComponent(login);


    return (
        <RegisterConfirm login={email} token={token} />
    )
}

