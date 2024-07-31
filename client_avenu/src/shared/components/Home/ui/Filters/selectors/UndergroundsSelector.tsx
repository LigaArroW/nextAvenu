'use client'
import { useEffect, useState } from "react";


import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";


import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { Check } from "@/shared/assets/Check";
import { Search } from "@/shared/assets/Search";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import { IGeneral } from "@/types/core/generalFilters";
import { IUnderground } from "@/types/core/underground";

interface IUndergroundsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  handleSearch: (search: string, value: string) => void;
  filters: Partial<IGeneral>
}

const UndergroundsSelector: React.FC<IUndergroundsSelectorProps> = ({ activeComponent, setActiveComponent, filters, handleSearch }) => {
  // console.log("🚀 ~ filters:", filters.undergrounds)
  const t = useTranslations();
  const searchParams = useSearchParams();
  // console.log("🚀 ~ searchParams:", searchParams)
  const locale = useLocale();
  let filter = queryString.parse(searchParams.toString(), {
  });

  filter = typeof filter['undergrounds'] === 'string' ? { undergrounds: [filter['undergrounds']] } : filter



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
        {filter['undergrounds'] && filter['undergrounds'].length > 0 ? <div className={styles.group_count}>{filter['undergrounds'].length}</div> : null}
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
                   ${((typeof filter['undergrounds'] === 'string' && filter['undergrounds'] === underground.id.toString())
                      ||
                      (typeof filter['undergrounds'] === 'object' && filter['undergrounds'] && filter['undergrounds']?.filter((item) => item === underground.id.toString()).length > 0))
                      ? 'active'
                      : ""
                    }`}
                  aria-hidden="true"
                  onClick={() => {
                    handleSearch('undergrounds', underground.id.toString())
                  }}
                >
                  {(filter['undergrounds'] === underground.id.toString() || filter['undergrounds']?.includes(underground.id.toString())) ? (
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
