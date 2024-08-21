'use client'
import styles from '@/shared/styles/Header.module.sass';


import { User } from '@/shared/assets/User';
import HeaderNav from '../HeaderNav/HeaderNav';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import ButtonLogout from '@/widgets/ButtonLogout/ButtonLogout';
import LangSelect from '@/widgets/LangSelect/LangSelect';
import SearchModel from '@/widgets/SearchModel/SearchModel';
import Authorization from './Authorization/Authorization';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';


type token = {
    token?: string
    name?: string
}

interface IHeaderContentProps {
    customer: token | undefined
    agency: token | undefined
}


const HeaderContent: React.FC<IHeaderContentProps> = ({ agency, customer }) => {
    const t = useTranslations();
    const locale = useLocale();
    const [isNavigationMobileActive, setIsNavigationMobileActive] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.main_navigation}>
                <HeaderNav isNavigationMobileActive={isNavigationMobileActive} setIsNavigationMobileActive={setIsNavigationMobileActive}/>
                <div className={styles.user} onClick={() => setIsNavigationMobileActive(false)}>
                    <User />
                    {(customer || agency)
                        ?
                        <Link href={`/${locale}/profile`} className={styles.user_name} >{t("global.my_profile")}</Link>
                        :
                        <Authorization />
                    }
                    {customer?.name && <ButtonLogout tokenName='CustomerToken' style={styles.logout} modal />}
                    {agency?.name && <ButtonLogout tokenName='AgencyToken' style={styles.logout} modal />}
                </div>

            </div>
            <div className={styles.sub_navigation}>
                <SearchModel />
                <LangSelect />

            </div>
        </header>
    );
};

export default HeaderContent;