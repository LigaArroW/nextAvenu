'use client';

import { useTranslations } from "next-intl";
import { useMainContext } from "../Contex/MainProvider";
import styles from './Search.module.sass';
import { Search } from "@/shared/assets/Search";
import { Close } from "@/shared/assets/Close";

import { useState } from "react";


const SearchModel = () => {
    const t = useTranslations();
    const { searchedModel, setSeachedModel, resetContext } = useMainContext();
    const [isActive, setIsActive] = useState(false);
    const handlerCloseOnClick = () => {
        setIsActive(!isActive)
        setSeachedModel('')
        resetContext()
    };

    return (
        <div className={`${styles.search} ${isActive ? styles.active : ""}`}>
            <div className={styles.search_input}>
                <input
                    type="name"
                    placeholder={t("global.search")}
                    value={searchedModel}
                    onChange={(event) =>
                        setSeachedModel(event.target.value.trim().length === 0 ? "" : event.target.value)
                    }
                />
                <div className={styles.search_icon}>
                    <Search fill="#98042D" />
                </div>
                <div
                    className={styles.close}
                    onClick={() =>
                        setIsActive(false)
                        // setActiveComponent(activeComponent === ComponentType.Search ? ComponentType.None : ComponentType.Search)
                    }
                >
                    <Close fill="#FFFFFF" />
                </div>
            </div>
            <div className={styles.search_label} onClick={handlerCloseOnClick}>
                <Search fill="#FFFFFF" />
                {/* <WindowsInner innerWidth="1200" maxMinWidth="min"> */}
                <div className={styles.search_link}>{t("global.search")}</div>
                {/* </WindowsInner> */}
                {/* {windowSize.innerWidth > 1200 && <div className={styles.search_link}>{t("global.search")}</div>} */}
            </div>
        </div>
    );
};

export default SearchModel;