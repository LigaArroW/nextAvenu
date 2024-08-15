'use client';
import styles from '@/shared/styles/Header.module.sass';
import { useMedia } from 'react-use';
import { LinksList } from '../../linksList';
import { INavigationLink } from '@/types/main/navigationLink';
import Link from 'next/link';
import { useLocale, useTranslations} from 'next-intl';
import { usePathName } from '@/shared/hooks/usePathName';
import LogoRedIcon from '@/shared/assets/logo.png';
import LogoIcon from '@/shared/assets/logo_white.png';
import Image from 'next/image';
import { useState } from 'react';
import { Menu } from '@/shared/assets/Menu';
import { Close } from '@/shared/assets/Close';


const HeaderNav = () => {
    const t = useTranslations();
    const pathName = usePathName();
    const locale = useLocale();
    const isMobile = useMedia('(max-width: 1201px)', false);
    const [isNavigationMobileActive, setIsNavigationMobileActive] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const handleMenuOnClick = () => {
        // setIsNoScroll(!isNoScroll);
        setIsNavigationMobileActive(!isNavigationMobileActive);
    };


    return (
        <>
            {isMobile && (
                <div className={styles.menu_button} onClick={handleMenuOnClick}>
                    {!isNavigationMobileActive ? <Menu /> : <Close fill="#FFFFFF" />}
                    {!isNavigationMobileActive ? t("global.menu") : t("global.close")}
                </div>
            )}

            <div className={styles.logo}>
                <Image src={LogoIcon} alt="logo" priority />
            </div>
            <ul
                className={`${!isMobile ? styles.navigation : styles.navigation_mobile} ${isNavigationMobileActive ? styles.active : ""
                    }`}
            >
                {LinksList.map((link: INavigationLink) =>
                    link.is_for_modal ? (
                        <li
                            key={link.id}

                        >
                            {t(`${link.link}`)}
                        </li>
                    ) : (
                        <Link
                            key={link.id}
                            className={`${pathName === link.link_url ? styles.active : ""}`}
                            href={`/${locale}${link.link_url === "/" ? "/" : link.link_url}`}
                            scroll={false}
                            onClick={() => setIsNavigationMobileActive(false)}
                        >
                            {t(`${link.link}`)}
                        </Link>
                    )
                )}

                {isMobile && <Image src={LogoRedIcon} alt="logo" width={158} height={70} />}
            </ul>
        
        </>


    );
};

export default HeaderNav;