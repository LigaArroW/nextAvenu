import styles from '@/shared/styles/Header.module.sass';


import { User } from '@/shared/assets/User';
import { Logout } from '@/shared/assets/Logout';
import HeaderNav from '../HeaderNav/HeaderNav';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';


const HeaderContent = async () => {
    const t = await getTranslations();
    return (
        <header className={styles.header}>
            <div className={styles.main_navigation}>
                <HeaderNav />
                <div className={styles.user}>
                    <User />
                    {/* <div className={styles.user_name} >
                        {false ? t("global.my_profile") : t("global.authorization")}
                    </div>
                    {false && (
                        <button className={styles.logout}>
                            <Logout />
                        </button>
                    )} */}
                    <Link href={'/ru/login'} className={styles.user_name} >{t("global.authorization")}</Link>
                </div>

                {/* {modalShow && (
                    <Portal>
                        <LoginModal onClose={() => setModalShow(false)} />
                    </Portal>
                )} */}

            </div>
            <div className={styles.sub_navigation}>
                {/* {activeLink < 4 && activeLink !== -1 ? (
    <Search activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
) : (
    <div></div>
)}
{activeLink >= 4 && <div></div>}
{windowSize.innerWidth > 1200 && (
    <LanguageSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
)}
{windowSize.innerWidth < 1201 && activeComponent !== ComponentType.Search && (
    <LanguageSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
)} */}
            </div>
        </header>
    );
};

export default HeaderContent;