
import styles from '@/shared/styles/Footer.module.sass';
import { getTranslations } from 'next-intl/server';
import LogoRedIcon from "@/shared/assets/logo.png";
import Image from 'next/image';
import FooterNav from '../FooterNav/FooterNav';


const FooterContent = async () => {
    const t = await getTranslations();
    return (
        <footer className={styles.footer}>
            <div className={styles.navigation_wrapper}>
                <Image src={LogoRedIcon} alt="logo" />
                <FooterNav />
            </div>
            <div className={styles.bottom_content}>
                <div className={styles.copyright}>{`©${new Date().getFullYear()} Copyright by ${process.env.REACT_APP_SITE_NAME}`}</div>
                <div className={styles.warning_info}>{t("navigation.footer_description")}</div>
            </div>

        </footer>
    );
};

export default FooterContent;