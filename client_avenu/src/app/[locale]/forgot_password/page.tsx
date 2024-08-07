import ForgotPassword from "@/shared/components/ForgotPassword/ForgotPassword";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";



export async function generateMetadata() {
    const t = await getTranslations();
    return {
        title: `${t("global.password_recovery")}`,
    };
}

export default function ForgotPasswordPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    return (
        <ForgotPassword />
    )
}

