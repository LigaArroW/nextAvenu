
import styles from '@/shared/styles/Confidentiality.module.sass';
import { IPage } from '@/types/page/page';
import { getTranslations } from 'next-intl/server';
import parse from "html-react-parser";

export async function generateMetadata() {
    const t = await getTranslations();

    return {
        title: `${t("navigation.confidentiality")}`,
    };
}


const getPage = async () => {
    const responce = await fetch('http://localhost:8001/api/pages', { cache: 'force-cache' });
    return responce.json();
}

export default async function ConfidentialityPage({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations();
    const pages = await getPage();

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