import { useEffect, useState } from "react";


import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";


import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { Check } from "@/shared/assets/Check";
import { Search } from "@/shared/assets/Search";
import { useLocale, useTranslations } from "next-intl";
import { IDistrict } from "@/types/core/district";
import { IGeneral } from "@/types/core/generalFilters";
import { useHomeContext } from "../../Context/HomeProvider";

interface IDistrictsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  filters: Partial<IGeneral>
}

const DistrictsSelector: React.FC<IDistrictsSelectorProps> = ({ activeComponent, setActiveComponent, filters }) => {
  const { districts, setDistricts } = useHomeContext()
  const t = useTranslations();
  const locale = useLocale();

  const [filteredDistricts, setFilteredDistricts] = useState([] as IDistrict[]);
  const [searchedDistrict, setSearchedDistrict] = useState("");

  useEffect(() => {
    const usedName = locale === "ru" ? 'district' : 'district_eng'
    const districtsSorted = [...filters.districts!].sort((a, b) => a[usedName].localeCompare(b[usedName]))
    setFilteredDistricts(
      districtsSorted.filter(
        (district: IDistrict) =>
        (searchedDistrict.trim() === ""
          ? true
          : district[usedName].toLowerCase().startsWith(searchedDistrict.trim().toLowerCase()))
      )

    );
  }, [filters.cities, filters.districts, locale, searchedDistrict]);

  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.DistrictsSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.DistrictsSelector ? ComponentType.None : ComponentType.DistrictsSelector
          )
        }
      >
        {t("global.district")}
        {activeComponent === ComponentType.DistrictsSelector ? <ArrowUp /> : <ArrowDown fill="#1B1B1B" />}
        {districts.length > 0 ? <div className={styles.group_count}>{districts.length}</div> : null}
      </div>
      <div className={styles.filters_list}>
        <div className={styles.search_input}>
          <input
            type="name"
            placeholder={t("global.district_search")}
            value={searchedDistrict}
            onChange={(event) => setSearchedDistrict(event.target.value)}
          />
          <Search fill="#98042D" />
        </div>
        {activeComponent === ComponentType.DistrictsSelector &&
          filteredDistricts.map((district: IDistrict) => (
            <div key={district.id} className={styles.filter_item}>
              <label className={'checkbox'}>
                <input type="checkbox" />
                <span
                  className={`${'checkbox_mark'} ${districts.includes(district.id) ? 'active' : ""
                    }`}
                  aria-hidden="true"
                  onClick={() => {
                    if (districts.includes(district.id)) {
                      return setDistricts(districts.filter((item) => item !== district.id))
                    }
                    setDistricts([...districts, district.id])

                  }}
                >
                  {districts.includes(district.id) ? (
                    <Check fill="#98042D" />
                  ) : null}
                </span>
                <div className={'text'}>
                  {locale === "ru" ? district.district : district.district_eng}
                </div>
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DistrictsSelector;
