import FAQ from "@/shared/components/FAQ/FAQ";
import { IFaq } from "@/types/faq/faq";
import { getTranslations } from "next-intl/server";



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

export default async function FAQPage() {
    const faqs: IFaq[] = await getFAQs();

    return (
        <FAQ faqs={faqs} />
    )
}