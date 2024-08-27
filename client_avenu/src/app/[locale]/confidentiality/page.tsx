
import styles from '@/shared/styles/Confidentiality.module.sass';
import { IPage } from '@/types/page/page';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import parse from "html-react-parser";
import { getPages } from '@/lib/pages/pagesAction';

export async function generateMetadata() {
    const t = await getTranslations();

    return {
        title: `${t("navigation.confidentiality")}`,
    };
}




export default async function ConfidentialityPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const t = await getTranslations();
    const pages = await getPages();

    return (
        <div className={styles.content}>
            <div className={styles.title}>{t("navigation.confidentiality")}</div>
            <div className={styles.description}>
                {Array.isArray(pages) && pages.filter((page: IPage) => page.title === "Конфиденциальность").length > 0
                    ? locale === "ru"
                        ? parse(pages.find((page: IPage) => page.title === "Конфиденциальность")?.content!)
                        : parse(pages.find((page: IPage) => page.title === "Конфиденциальность")?.content_eng!)
                    : null}
            </div>
        </div>
    )
}
