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
import { useHomeContext } from "../../Context/HomeProvider";

interface IOrientationsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  filters: Partial<IGeneral>;
}

const OrientationsSelector: React.FC<IOrientationsSelectorProps> = ({ activeComponent, setActiveComponent, filters }) => {
  const { orientations, setOrientations } = useHomeContext()
  const t = useTranslations();
  const locale = useLocale();


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
        {orientations.length > 0 ? <div className={styles.group_count}>{orientations.length}</div> : null}
      </div>
      <div className={styles.filters_list}>
        {activeComponent === ComponentType.OrientationsSelector &&
          filters.orientations && filters.orientations.map((orientation: IOrientation) => (
            <div key={orientation.id} className={styles.filter_item}>
              <label className={'checkbox'}>
                <input type="checkbox" />
                <span
                  className={`${'checkbox_mark'} ${orientations.includes(orientation.id)
                    ? 'active'
                    : ""
                    }`}
                  aria-hidden="true"
                  onClick={() => {
                    if (orientations.includes(orientation.id)) {
                      return setOrientations(orientations.filter((id) => id !== orientation.id))
                    }
                    setOrientations([...orientations, orientation.id])
                  }}
                >
                  {orientations.includes(orientation.id) ? (
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
