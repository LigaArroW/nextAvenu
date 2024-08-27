import { getFaqs } from "@/lib/faq/faqAction";
import FAQ from "@/shared/components/FAQ/FAQ";
import { IFaq } from "@/types/faq/faq";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";



export async function generateMetadata() {
    const t = await getTranslations();
    return {
        title: `${t("navigation.faq")}`,
    };
}



export default async function FAQPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);


    return (
        <FAQ  />
    )
}
