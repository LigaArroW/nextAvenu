'use client'

import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";


import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { Check } from "@/shared/assets/Check";
import { useLocale, useTranslations } from "next-intl";
import { IGeneral } from "@/types/core/generalFilters";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import { IOrientation } from "@/types/core/orientation";

interface IOrientationsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  filters: Partial<IGeneral>;
  handleSearch: (search: string, value: string) => void;
}

const OrientationsSelector: React.FC<IOrientationsSelectorProps> = ({ activeComponent, setActiveComponent, filters, handleSearch }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const filter = queryString.parse(searchParams.toString());
 
  
  return (
    <div
      className={`${styles.filters_group} ${activeComponent === ComponentType.OrientationsSelector ? styles.active : ""}`}
    >
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.OrientationsSelector ? ComponentType.None : ComponentType.OrientationsSelector
          )
        }
      >
        {t("model.orientation")}
        {activeComponent === ComponentType.OrientationsSelector ? <ArrowUp /> : <ArrowDown fill="#1B1B1B" />}
        {filter['orientations'] && filter['orientations'].length > 0 ? <div className={styles.group_count}>{filter['orientations'].length}</div> : null}
      </div>
      <div className={styles.filters_list}>
        {activeComponent === ComponentType.OrientationsSelector &&
          filters.orientations && filters.orientations.map((orientation: IOrientation) => (
            <div key={orientation.id} className={styles.filter_item}>
              <label className={'checkbox'}>
                <input type="checkbox" />
                <span
                  className={`${'checkbox_mark'} ${(filter['orientations'] === orientation.id.toString() || filter['orientations']?.includes(orientation.id.toString()))
                    ? 'active'
                    : ""
                    }`}
                  aria-hidden="true"
                  onClick={() => {

                    handleSearch('orientations', orientation.id.toString())
                  }}
                >
                  {(filter['orientations'] === orientation.id.toString() || filter['orientations']?.includes(orientation.id.toString())) ? (
                    <Check fill="#98042D" />
                  ) : null}
                </span>
                <div className={'text'}>
                  {locale === "ru" ? orientation.orientation : orientation.orientation_eng}
                </div>
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrientationsSelector;
