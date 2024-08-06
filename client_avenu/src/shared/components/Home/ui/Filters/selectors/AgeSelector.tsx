'use client'

import Slider from "react-slider";

import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";

import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { useTranslations } from "next-intl";
import { IGeneral } from "@/types/core/generalFilters";
import { useHomeContext } from "../../Context/HomeProvider";

interface IAgeSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  filters: Partial<IGeneral>
}

const AgeSelector: React.FC<IAgeSelectorProps> = ({ activeComponent, setActiveComponent, filters }) => {
  const { minAge, maxAge, setMaxAge, setMinAge } = useHomeContext()
  const t = useTranslations();



  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.AgeSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(activeComponent === ComponentType.AgeSelector ? ComponentType.None : ComponentType.AgeSelector)
        }
      >
        {t("model.age")}
        {activeComponent === ComponentType.AgeSelector ? <ArrowUp /> : <ArrowDown fill="#1B1B1B" />}
        {minAge > 18 || maxAge < 65 ? <div className={styles.group_count} /> : null}

      </div>
      <div className={styles.filters_list}>
        <div className={styles.range_slider}>
          <Slider
            className={styles.slider}
            markClassName={styles.mark}
            thumbClassName={styles.thumb}
            value={[minAge, maxAge]}
            min={18}
            max={65}
            minDistance={1}
            pearling
            onChange={(selectedRange) => {
              setMinAge(selectedRange[0])
              setMaxAge(selectedRange[1])


            }}

          />

        </div>
        <div className={styles.slider_value}>
          {`${t("global.from")} ${minAge} ${t("global.to")} ${maxAge}`}
        </div>
      </div>
    </div>
  );
};

export default AgeSelector;
