'use client'
import styles from '@/shared/styles/Header.module.sass';

import {  useTranslations } from "next-intl";

import {useState } from 'react';
import ModalLogin from './ModalLogin';


const Authorization = () => {
    const t = useTranslations()

    const [showModal, setShowModal] = useState(false)




    return (
        <>
            <p className={styles.user_name} onClick={() => setShowModal(true)} >{t("global.authorization")}</p>
            {showModal && <ModalLogin setShowModal={() => setShowModal(false)} />}
        </>
    );
};

export default Authorization;