import { Close } from "@/shared/assets/Close";
import { IProfile } from "@/types/profile/profile/profile";
import { getTranslations } from "next-intl/server";
import styles from '@/shared/styles/Profile.module.sass'
import { getBlacklistAccess } from "@/lib/blackList/blackList";
import { Person } from "@/lib/auth/authAction";
import { IBlacklistAccess } from "@/types/profile/blacklist/blacklistAccess";
import CloseAndConfirm from "../../CloseAndConfirm/CloseAndConfirm";
import FormAccessBlackList from "../../FormAccessBlackList/FormAccessBlackList";

interface IAccessToBlackList {
    person: Person
}

const AccessToBlackList: React.FC<IAccessToBlackList> = async ({ person }) => {
    const t = await getTranslations();
    const filteredAccessToBlacklist: IBlacklistAccess[] = await getBlacklistAccess({ agency_id: Number(person._id) })
    return (
        <div className={styles.content}>
            {filteredAccessToBlacklist.length > 0 && <div className={styles.title}>{t("profile.access_to_the_blacklist")}</div>}
            {filteredAccessToBlacklist.length > 0 && (
                <div className={`${styles.main_info} ${styles.full_width}`}>
                    <table className={'table'}>
                        <thead>
                            <tr className={'borderer'}>
                                <th style={{ width: "100%" }}>{t("profile.agency_id")}</th>
                                <th className={'borderer'}>
                                    <Close fill="#FFFFFF" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAccessToBlacklist.map((access: IBlacklistAccess) => (
                                <tr key={access.id}>
                                    <td style={{ width: "100%" }}>{String(access.access_to)}</td>
                                    <CloseAndConfirm personId={person._id} id={access.id} access />
                                    {/* <td className={'borderer'}>
                                        <div className={'close'} 
                                        // onClick={() => handleDeleteOnClick(access.id)}
                                        >
                                            <Close fill="#1B1B1B" />
                                        </div>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div />
                </div>
            )}
            <div className={styles.content}>
                <div className={styles.title}>{t("profile.provide_access_to_the_blacklist")}</div>
                <div className={styles.main_info}>
                    <FormAccessBlackList id={person._id} />
             
                </div>
            </div>
       
        </div>
    );
};

export default AccessToBlackList;