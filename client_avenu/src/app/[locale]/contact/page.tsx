import ContactUs from "@/shared/components/ContactUs/ContactUs";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";


export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    return (
        <ContactUs />
    )
}
