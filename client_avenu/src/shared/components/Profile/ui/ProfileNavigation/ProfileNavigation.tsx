'use client'
import { useLocale, useTranslations } from 'next-intl';
import styles from './ProfileNavigation.module.sass'
import LinksList from './linksList';
import { usePathName } from '@/shared/hooks/usePathName';
import { IProfileLink } from '@/types/main/profileLink';
import { useMedia } from 'react-use';
import { IModel } from '@/types/model/model/model';
import { Person } from '@/lib/auth/authAction';
import { RolesUsers } from '@/lib/auth/authType';
import React from 'react';
import Link from 'next/link';

interface IProfileNavigation {
    person: Person
    models: IModel[]
}

const ProfileNavigation: React.FC<IProfileNavigation> = ({ person, models }) => {
    const t = useTranslations();
    const locale = useLocale();
    const pathName = usePathName();
    const isMobile = useMedia('(max-width: 1201px)', false);


    return (
        <div className={styles.page_navigation}>
            <div className={styles.navigation_main}>
                {LinksList.map((group, index) => (
                    <React.Fragment key={group.links[0].link}>
                        {(person.roles === RolesUsers.Agency ||
                            (person.roles === RolesUsers.Customer &&
                                group.links.filter((link: IProfileLink) => !link.is_only_for_agency).length > 0))
                            ? (
                                <div className={`${styles.navigation_group} ${group.links.length === 1 ? styles.bordered : ""}`}>
                                    <div className={`${styles.name} ${group.links.length === 1 ? styles.bordered : ""}`}>
                                        <div
                                            className={`${styles.link} ${group.links.filter((link) => link.link_url === pathName).length === 1 ? styles.active : ""
                                                }`}
                                        // onClick={() => {
                                        //     if (!(!isMobile && group.links.length !== 1)) {
                                        //         handleNavigateClick(group.links[0].id);
                                        //     }
                                        // }}
                                        >
                                            {group.group !== "" ? (
                                                t(`${group.group}`)
                                            ) : (
                                                <>
                                                    <Link
                                                        className={styles.link}
                                                        style={{ textDecoration: 'none', color: '#1b1b1b' }}
                                                        href={`/${locale}` + group.links[0].link_url}
                                                    >
                                                        {t(`${group.links[0].link}`)}
                                                        <div className={styles.count}>
                                                            {models.filter((model: IModel) => model.agency_id === Number(person._id)).length}
                                                        </div>
                                                    </Link>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {!isMobile && group.links.length > 1 && (
                                        <div
                                            className={`${styles.list} ${group.links.filter((link) => link.link_url === pathName).length === 1 ? styles.active : ""
                                                }`}
                                        >
                                            {group.links.map((link, index) => (
                                                <Link
                                                    href={`/${locale}` + link.link_url}
                                                    key={index}
                                                    className={`${styles.link} ${link.link_url === pathName ? styles.active : ""} ${index === 1 ? styles.bordered : ""
                                                        }`}
                                                // onClick={() => handleNavigateClick(link.id)}
                                                >
                                                    {t(`${link.link}`)}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : null}
                    </React.Fragment>
                ))}
            </div>
            {isMobile &&
                LinksList.filter((group) => group.links.filter((link) => link.link_url === pathName).length > 0)[0].links.length >
                1 && (
                    <div className={styles.mobile_list}>
                        {LinksList.filter((group) => group.links.filter((link) => link.link_url === pathName).length > 0)[0].links.map(
                            (link, index) => (
                                <Link
                                    href={`/${locale}` + link.link_url}
                                    key={link.id}
                                    className={`${styles.link} ${link.link_url === pathName ? styles.active : ""} ${index === 1 ? styles.bordered : ""
                                        }`}
                                // onClick={() => handleNavigateClick(link.id)}
                                >
                                    {t(`${link.link}`)}
                                </Link>
                            )
                        )}
                    </div>
                )}
        </div>
    );
};

export default ProfileNavigation;