'use client'
import styles from '@/shared/styles/Footer.module.sass';

import { INavigationLink } from '@/types/main/navigationLink';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathName } from '@/shared/hooks/usePathName';
import { LinksList } from '../../linksList';
const FooterNav = () => {
    const t = useTranslations();
    const pathName = usePathName();
    const locale = useLocale();

    return (
        <ul className={styles.navigation}>
            {LinksList.map((link: INavigationLink) =>
                link.is_for_modal ? (
                    <li key={link.id}
                        className={`${pathName === link.link_url ? styles.active : ""}`}
                    // onClick={() => handleContactUsOnClick(link.id)}
                    >
                        <div className={styles.item}>{t(`${link.link}`)}</div>
                    </li>
                ) : (
                    <Link
                        key={link.id}
                        className={`${pathName === link.link_url ? styles.active : ""}`}
                        href={`/${locale}${link.link_url === "/" ? "" : link.link_url}`}

                    // onClick={() => setActiveHeaderLink(link.id)}
                    >
                        <div className={styles.item}>{t(`${link.link}`)}</div>
                    </Link>
                )
            )}
        </ul >
    );
};

export default FooterNav;