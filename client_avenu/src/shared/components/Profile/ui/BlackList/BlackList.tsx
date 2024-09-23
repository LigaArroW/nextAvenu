
import { Person } from "@/lib/auth/authAction";
import { IBlacklist } from "@/types/profile/blacklist/blacklist";

// import globalStyles from '@/shared/styles/Global.module.sass'

import styles from '@/shared/styles/Profile.module.sass'


import { Close } from "@/shared/assets/Close";
import { IBlacklistAccess } from "@/types/profile/blacklist/blacklistAccess";
import { getTranslations } from "next-intl/server";
import { getAllBlacklist, getBlacklist, getBlacklistAccess } from "@/lib/blackList/blackList";
import CloseAndConfirm from "../CloseAndConfirm/CloseAndConfirm";


interface IBlackList {
    person: Person
}


const BlackList: React.FC<IBlackList> = async ({ person }) => {
    const t = await getTranslations();
    const blacklist = await getBlacklist({ agency_id: Number(person._id) })
    const blackListAccess = await getBlacklistAccess({ agency_id: Number(person._id) })
    const allBlackList = await getAllBlacklist()
    
    return (
        <div className={styles.content}>
            <div className={styles.title}>{t("profile.blacklist")}</div>
            <div className={`${styles.main_info} ${styles.full_width}`}>
                {blacklist.length > 0 && <div className={styles.agency}>{t("profile.this_agency")}</div>}
                {blacklist.length > 0 && (
                    <table className={'table'}>
                        <thead>
                            <tr className={'borderer'}>
                                <th style={{ width: "35%" }}>{t("profile.phone_number")}</th>
                                <th className={'borderer'} style={{ width: "65%" }}>
                                    {t("profile.description")}
                                </th>
                                <th className={'borderer'}>
                                    <Close fill="#FFFFFF" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {blacklist.map((blacklist_item: IBlacklist) => (
                                <tr key={blacklist_item.id}>
                                    <td style={{ width: "35%" }}>{blacklist_item.phone_number}</td>
                                    <td className={'borderer'} style={{ width: "65%" }}>
                                        {blacklist_item.description}
                                    </td>
                                    <CloseAndConfirm personId={person._id} id={blacklist_item.id} />

                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {blackListAccess.map((access: IBlacklistAccess) => {
                    if (
                        access.access_to === Number(person._id) &&
                        allBlackList.filter((blacklist_item: IBlacklist) => blacklist_item.agency_id === access.access_to).length > 0
                    ) {
                        return (
                            <div key={access.agency_id} className={`${styles.main_info} ${styles.full_width}`}>
                                <div className={styles.agency}>
                                    {t("profile.agency_with_id")} {String(access.agency_id)}
                                </div>
                                <table className={'table'}>
                                    <thead>
                                        <tr className={'borderer'}>
                                            <th style={{ width: "35%" }}>{t("profile.phone_number")}</th>
                                            <th className={'borderer'} style={{ width: "65%" }}>
                                                {t("profile.description")}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allBlackList
                                            .filter((blacklist_item: IBlacklist) => blacklist_item.agency_id === access.agency_id)
                                            .map((blacklist_item: IBlacklist) => (
                                                <tr key={blacklist_item.id}>
                                                    <td style={{ width: "35%" }}>{blacklist_item.phone_number}</td>
                                                    <td className={'borderer'} style={{ width: "65%" }}>
                                                        {blacklist_item.description}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default BlackList;