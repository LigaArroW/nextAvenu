import EmailLogin from "@/shared/components/EmailLogin/EmailLogin";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";


export async function generateMetadata() {
    const t = await getTranslations();

    return {
        title: ` ${t("global.enter_to_email")}`,
    };
}


export default function EmailLoginPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    return (
        <EmailLogin />
    )
}
