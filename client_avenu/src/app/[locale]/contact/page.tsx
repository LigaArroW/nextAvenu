import ContactUs from "@/shared/components/ContactUs/ContactUs";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations();
    return {
        title: `${t("navigation.contact_us")}`,
    };
}


export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    return (
        <ContactUs />
    )
}
