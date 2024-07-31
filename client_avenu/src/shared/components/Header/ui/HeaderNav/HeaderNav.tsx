'use client';
import styles from '@/shared/styles/Header.module.sass';
import { useMedia } from 'react-use';
import { LinksList } from '../../linksList';
import { INavigationLink } from '@/types/main/navigationLink';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathName } from '@/shared/hooks/usePathName';
import LogoRedIcon from '@/shared/assets/logo.png';
import LogoIcon from '@/shared/assets/logo_white.png';
import Image from 'next/image';
import { useState } from 'react';
import { Menu } from '@/shared/assets/Menu';
import { Close } from '@/shared/assets/Close';
import Portal from '@/shared/components/ModalPortal/ModalPortal';
import LoginModal from '@/shared/components/Modals/LoginModal';
import { usePathname } from 'next/navigation';

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
                <Image src={LogoIcon} alt="logo" />
            </div>
            <ul
                className={`${!isMobile ? styles.navigation : styles.navigation_mobile} ${true ? styles.active : ""
                    }`}
            >
                {LinksList.map((link: INavigationLink) =>
                    link.is_for_modal ? (
                        <li
                            key={link.id}
                        // className={`${pathName === link.link_url ? styles.active : ""}`}
                        // onClick={() => handleContactUsOnClick(link.id)}
                        >
                            {t(`${link.link}`)}
                        </li>
                    ) : (
                        <Link
                            key={link.id}
                            className={`${pathName === link.link_url ? styles.active : ""}`}
                            href={`/${locale}${link.link_url === "/" ? "" : link.link_url}`}

                        // onClick={() => handleMobileLinkOnClick(link.id)}
                        >
                            {t(`${link.link}`)}
                        </Link>
                    )
                )}

                {isMobile && <Image src={LogoRedIcon} alt="logo" width={158} height={70} />}
            </ul>
            {/* {modalShow && (
                <Portal>
                    <LoginModal onClose={() => setModalShow(false)} />
                </Portal>
            )} */}
        </>


    );
};

export default HeaderNav;