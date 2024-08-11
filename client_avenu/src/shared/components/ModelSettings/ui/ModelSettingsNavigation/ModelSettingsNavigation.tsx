'use client'
import styles from '@/shared/styles/ModelSettingsNavgation.module.sass'
import LinksList from "./linksList";
import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useMedia } from 'react-use';
import { usePathname } from 'next/navigation';
import { usePathName } from '@/shared/hooks/usePathName';

interface IModelSettingsNavigation {

    isNew: boolean
    modelId: string
}


const ModelSettingsNavigation: React.FC<IModelSettingsNavigation> = ({ isNew, modelId }) => {
    const t = useTranslations();
    const locale = useLocale();
    const isMobile = useMedia('(max-width: 600px)');
    const pathName = usePathName();

    return (
        <div className={styles.page_navigation}>

            {isNew ? (
                <div className={`${styles.link} ${styles.active}`}>
                    {t('model.parameters')}
                </div>
            ) : (
                <>
                    {LinksList.map((link, index) => (
                        <React.Fragment key={link.id}>
                            <Link
                                href={`/${locale}${link.link_url}/${modelId}`}
                                className={`${styles.link} ${`${pathName}` === `${link.link_url}/${modelId}` ? styles.active : ""} ${index && (isMobile || (!isMobile && index !== 4)) ? styles.bordered : ""
                                    }`}

                            >
                                {t(`${link.link}`)}

                            </Link>
                        </React.Fragment>
                    ))}

                </>
            )}

        </div>
    );
};

export default ModelSettingsNavigation;