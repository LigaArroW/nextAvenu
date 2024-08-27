
import styles from '@/shared/styles/UserAgreement.module.sass'
import { IPage } from '@/types/page/page';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import parse from "html-react-parser";
import { getPages } from '@/lib/pages/pagesAction';

export async function generateMetadata() {
    const t = await getTranslations();

    return {
        title: `${t("navigation.user_agreement")}`,
    };
}



export default async function UserAgreementPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const t = await getTranslations();
    const pages = await getPages();
    // console.log("🚀 ~ UserAgreementPage ~ pages:", pages)

    return (
        <div className={styles.content}>
            <div className={styles.title}>{t("navigation.user_agreement")}</div>
            <div className={styles.description}>
                {Array.isArray(pages) && pages.filter((page: IPage) => page.title === "Пользовательское соглашение").length > 0
                    ? locale === "ru"
                        ? parse(pages.find((page: IPage) => page.title === "Пользовательское соглашение")?.content!)
                        : parse(pages.find((page: IPage) => page.title === "Пользовательское соглашение")?.content_eng!)
                    : null}
            </div>
        </div>
    )
}
