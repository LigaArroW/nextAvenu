
import { removeAuthAction } from '@/lib/auth/authAction'
import { Logout } from '@/shared/assets/Logout'
import styles from '@/shared/styles/Admin.module.sass'
import ButtonLogout from '@/widgets/ButtonLogout/ButtonLogout'


interface IAdminContent {
    adminType: number
}


const AdminContent: React.FC<IAdminContent> = ({ adminType }) => {
    return (
        <>
            {adminType === 0 ? (
                <header className={styles.header}>
                    <div className={styles.navigation}>
                        <div
                        // className={`${styles.navigation_item} ${activeHeaderLink === 0 ? styles.active : ""}`}
                        // onClick={() => { setActiveHeaderLink(0); history.pushState(null, '', '#0') }}
                        >
                            Верификация
                        </div>
                        <div
                        // className={`${styles.navigation_item} ${activeHeaderLink === 3 ? styles.active : ""}`}
                        // onClick={() => { setActiveHeaderLink(3); history.pushState(null, '', '#3') }}
                        >
                            Проверка отзывов
                        </div>
                        <div
                        // className={`${styles.navigation_item} ${activeHeaderLink === 4 ? styles.active : ""}`}
                        // onClick={() => { setActiveHeaderLink(4); history.pushState(null, '', '#4') }}
                        >
                            Все анкеты
                        </div>
                        <div
                        // className={`${styles.navigation_item} ${activeHeaderLink === 5 ? styles.active : ""}`}
                        // onClick={() => { setActiveHeaderLink(5); history.pushState(null, '', '#5') }}
                        >
                            Редактирование конфигурации
                        </div>
                        <div
                        // className={`${styles.navigation_item} ${activeHeaderLink === 6 ? styles.active : ""}`}
                        // onClick={() => { setActiveHeaderLink(6); history.pushState(null, '', '#6') }}
                        >
                            Аккаунты
                        </div>

                    </div>
                    <ButtonLogout tokenName={'AdminToken'} style={styles.logout} />
                    {/* <button className={styles.logout} onClick={() => removeAuthAction('AdminToken')}>
                        <Logout />
                    </button> */}
                </header>
            ) : (
                <header>
                    <div className={styles.navigation}>
                        <div
                        // className={`${styles.navigation_item} ${activeHeaderLink === 10 ? styles.active : ""}`}
                        // onClick={() => setActiveHeaderLink(10)}
                        >
                            FAQ
                        </div>
                        <div
                        // className={`${styles.navigation_item} ${activeHeaderLink === 11 ? styles.active : ""}`}
                        // onClick={() => setActiveHeaderLink(11)}
                        >
                            Страницы
                        </div>
                    </div>
                    <ButtonLogout tokenName={'AdminToken'} style={styles.logout} />
                    {/* <button className={styles.logout} onClick={() => removeAuthAction('AdminToken')}>
                        <Logout />
                    </button> */}
                </header>
            )}





        </>

    )
}

export default AdminContent