import styles from '@/shared/styles/Header.module.sass';


import { User } from '@/shared/assets/User';
import HeaderNav from '../HeaderNav/HeaderNav';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import ButtonLogout from '@/widgets/ButtonLogout/ButtonLogout';
import LangSelect from '@/widgets/LangSelect/LangSelect';
import SearchModel from '@/widgets/SearchModel/SearchModel';


type token = {
    token?: string
    name?: string
}

interface IHeaderContentProps {
    customer: token | undefined
    agency: token | undefined
}


const HeaderContent: React.FC<IHeaderContentProps> = async ({ agency, customer }) => {
    const t = await getTranslations();
    const locale = await getLocale();

    return (
        <header className={styles.header}>
            <div className={styles.main_navigation}>
                <HeaderNav />
                <div className={styles.user}>
                    <User />
                    {(customer || agency)
                        ?
                        <Link href={`/${locale}/profile`} className={styles.user_name} >{t("global.my_profile")}</Link>
                        :
                        <Link href={`/${locale}/login`} className={styles.user_name} >{t("global.authorization")}</Link>
                    }
                    {customer?.name && <ButtonLogout tokenName='CustomerToken' style={styles.logout} modal />}
                    {agency?.name && <ButtonLogout tokenName='AgencyToken' style={styles.logout} modal />}
                </div>

            </div>
            <div className={styles.sub_navigation}>
                <SearchModel />
                <LangSelect />
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