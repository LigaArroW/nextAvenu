'use client'
import { TokensRoles } from '@/lib/auth/authType'
import { usePathName } from '@/shared/hooks/usePathName'
import styles from '@/shared/styles/Admin.module.sass'
import { INavigationLink } from '@/types/main/navigationLink'
import ButtonLogout from '@/widgets/ButtonLogout/ButtonLogout'
import { useLocale } from 'next-intl'
import Link from 'next/link'
interface IAdminHeader {
    list: INavigationLink[]
    tokenName: keyof typeof TokensRoles
}

const AdminHeader: React.FC<IAdminHeader> = ({ list, tokenName }) => {
    const locale = useLocale()
    const pathName = usePathName()
    return (
        <header className={styles.header}>
            <div className={styles.navigation}>
                {list.map((link: INavigationLink) => (

                    <Link
                        href={`/${locale}${link.link_url === pathName ? "" : link.link_url}`}
                        key={link.id}
                        className={`${styles.navigation_item} ${pathName === link.link_url ? styles.active : ""}`}
                    >
                        {link.link}
                    </Link>


                ))}
            </div>
            <ButtonLogout tokenName={tokenName} style={styles.logout} />
        </header>
    )

}



export default AdminHeader
