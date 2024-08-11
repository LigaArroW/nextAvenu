
import { Person } from '@/lib/auth/authAction';
import { RolesUsers } from '@/lib/auth/authType';
import { Check } from '@/shared/assets/Check';
import styles from '@/shared/styles/Profile.module.sass'
import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';

interface IMainProfile {
    person: Person
}


const MainProfile: React.FC<IMainProfile> = async ({ person }) => {
    const t = await getTranslations();
    const locale = await getLocale();

    return (
        <div className={styles.content}>
            {person.roles === RolesUsers.Agency && <Link className={styles.addvertise_button}
                href={`/${locale}/profile/model_settings/parameters/new`}
            //  onClick={() => navigate("/model_settings/new")}
            >
                {t("profile.add_advertisement")}
            </Link>}
            <div className={styles.title}>{t("profile.basic_information")}</div>
            <div className={styles.main_info}>
                <div className={styles.item}>
                    <div className={styles.label}>{t("profile.agency_id")}</div>
                    <div className={styles.value}>{String(person._id)}</div>
                </div>
                {person.roles === RolesUsers.Agency ? (
                    <div className={styles.item}>
                        <div className={styles.label}>{t("profile.balance")}</div>
                        <div className={styles.value}>
                            {person.balance} {t("profile.coins")}
                        </div>
                        <button className={styles.balance_button} type="button">
                            {t("profile.deposit")}
                        </button>
                    </div>
                ) : null}
                <div />
                <div className={styles.notification}>
                    <div className={styles.checkbox}>
                        <Check fill="#1B1B1B" />
                    </div>
                    {t("profile.want_to_recieve_news")}
                </div>
                <div className={styles.notification}>
                    <div className={styles.checkbox}>
                        <Check fill="#1B1B1B" />
                    </div>
                    {t("profile.notification_inactivity")}
                </div>
            </div>
        </div>
    );
};

export default MainProfile;