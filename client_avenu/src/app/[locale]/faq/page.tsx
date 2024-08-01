import FAQ from "@/shared/components/FAQ/FAQ";
import { IFaq } from "@/types/faq/faq";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";



export async function generateMetadata() {
    const t = await getTranslations();
    return {
        title: `${t("navigation.faq")}`,
    };
}


async function getFAQs() {
    const responce = await fetch('http://localhost:8001/api/faqs', { cache: 'force-cache' });

    return responce.json();
}

export default async function FAQPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const faqs: IFaq[] = await getFAQs();

    return (
        <FAQ faqs={faqs} />
    )
}