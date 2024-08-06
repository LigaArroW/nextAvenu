'use client'
import Slider from "react-slider";


import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";

import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { useTranslations } from "next-intl";
import { IGeneral } from "@/types/core/generalFilters";
import { useHomeContext } from "../../Context/HomeProvider";

interface IWeightSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  filters: Partial<IGeneral>
}

const WeightSelector: React.FC<IWeightSelectorProps> = ({ activeComponent, setActiveComponent, filters }) => {
  const { minWeight, maxWeight, setMaxWeight, setMinWeight } = useHomeContext()
  const t = useTranslations();


  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.WeightSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.WeightSelector ? ComponentType.None : ComponentType.WeightSelector
          )
        }
      >
        {t("model.weight")}
        {activeComponent === ComponentType.WeightSelector ? <ArrowUp /> : <ArrowDown fill="#1B1B1B" />}
        {minWeight > 40 || maxWeight < 125 ? <div className={styles.group_count} /> : null}
      </div>
      <div className={styles.filters_list}>
        <div className={styles.range_slider}>
          <Slider
            className={styles.slider}
            markClassName={styles.mark}
            thumbClassName={styles.thumb}
            value={[minWeight, maxWeight]}
            min={40}
            max={125}
            minDistance={1}
            pearling
            onChange={(selectedRange) => {
              setMinWeight(selectedRange[0])
              setMaxWeight(selectedRange[1])
            }}
          />
        </div>
        <div className={styles.slider_value}>
          {`${t("global.from")} ${minWeight} ${t("global.to")} ${maxWeight} ${t("model.kg")}`}
        </div>
      </div>
    </div>
  );
};

export default WeightSelector;
