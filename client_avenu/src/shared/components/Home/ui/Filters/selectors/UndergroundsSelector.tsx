'use client'
import { useEffect, useState } from "react";


import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";


import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { Check } from "@/shared/assets/Check";
import { Search } from "@/shared/assets/Search";
import { useLocale, useTranslations } from "next-intl";
import { IGeneral } from "@/types/core/generalFilters";
import { IUnderground } from "@/types/core/underground";
import { useHomeContext } from "../../Context/HomeProvider";

interface IUndergroundsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  filters: Partial<IGeneral>
}

const UndergroundsSelector: React.FC<IUndergroundsSelectorProps> = ({ activeComponent, setActiveComponent, filters }) => {
  const { undergrounds, setUndergrounds } = useHomeContext()
  const t = useTranslations();
  const locale = useLocale();




  const [filteredUndergrounds, setFilteredUndergrounds] = useState([] as IUnderground[]);
  const [searchedUnderground, setSearchedUnderground] = useState("");

  useEffect(() => {
    const usedName = locale === "ru" ? 'underground' : 'underground_eng'

    const undergroundsSorted = [...filters.undergrounds!].sort((a, b) => a[usedName].localeCompare(b[usedName]))
    setFilteredUndergrounds(
      undergroundsSorted.filter(
        (underground: IUnderground) =>
        (searchedUnderground.trim() === ""
          ? true
          : underground[usedName].toLowerCase().startsWith(searchedUnderground.trim().toLowerCase()))
      )

    );

  }, [filters.undergrounds, locale, searchedUnderground]);

  return (
    <div
      className={`${styles.filters_group} ${activeComponent === ComponentType.UndergroundsSelector ? styles.active : ""}`}
    >
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.UndergroundsSelector ? ComponentType.None : ComponentType.UndergroundsSelector
          )
        }
      >
        {t("global.underground")}
        {activeComponent === ComponentType.UndergroundsSelector ? <ArrowUp /> : <ArrowDown fill="#1B1B1B" />}
        {undergrounds.length > 0 ? <div className={styles.group_count}>{undergrounds.length}</div> : null}
      </div>
      <div className={styles.filters_list}>
        <div className={styles.search_input}>
          <input
            type="name"
            placeholder={t("global.underground_search")}
            value={searchedUnderground}
            onChange={(event) => setSearchedUnderground(event.target.value)}
          />
          <Search fill="#98042D" />
        </div>
        {activeComponent === ComponentType.UndergroundsSelector &&
          filteredUndergrounds.map((underground: IUnderground) => (

            <div key={underground.id} className={styles.filter_item}>
              <label className={'checkbox'}>
                <input type="checkbox" />
                <span

                  className={`${'checkbox_mark'}
                   ${undergrounds.includes(underground.id)
                      ? 'active'
                      : ""
                    }`}
                  aria-hidden="true"
                  onClick={() => {
                    if (undergrounds.includes(underground.id)) {
                      return setUndergrounds(undergrounds.filter((id) => id !== underground.id))
                    }

                    setUndergrounds([...undergrounds, underground.id])
                  }}
                >
                  {undergrounds.includes(underground.id) ? (
                    <Check fill="#98042D" />
                  ) : null}
                </span>
                <div className={'text'}>
                  {locale === "ru" ? underground.underground : underground.underground_eng}
                </div>
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UndergroundsSelector;
