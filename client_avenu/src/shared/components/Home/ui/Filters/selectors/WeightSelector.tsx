'use client'
import Slider from "react-slider";


import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";

import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import { IGeneral } from "@/types/core/generalFilters";
import { useEffect } from "react";

interface IWeightSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  handleSearch: (search: string, value: string) => void;
  filters: Partial<IGeneral>
}

const WeightSelector: React.FC<IWeightSelectorProps> = ({ activeComponent, setActiveComponent, filters, handleSearch }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const filter = queryString.parse(searchParams.toString());


  useEffect(() => {
    if (!filter['minWeight']) {
      handleSearch('minWeight', '40')
    }
    if (!filter['maxWeight']) {
      handleSearch('maxWeight', '125')
    }
  }, [])

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
        {(filter['minWeight'] && Number(filter['minWeight']) > 40) || (filter['maxWeight'] && Number(filter['maxWeight']) < 125) ? <div className={styles.group_count} /> : null}
        {/* {filter.minWeight > 40 || filter.maxWeight < 125 ? <div className={styles.group_count} /> : null} */}
      </div>
      <div className={styles.filters_list}>
        <div className={styles.range_slider}>
          <Slider
            className={styles.slider}
            markClassName={styles.mark}
            thumbClassName={styles.thumb}
            // value={[filter.minWeight, filter.maxWeight]}
            value={[Number(filter['minWeight']) || 40, Number(filter['maxWeight']) || 125]}
            min={40}
            max={125}
            minDistance={1}
            pearling

            // onChange={(selectedRange) => setFilter({ ...filter, minWeight: selectedRange[0], maxWeight: selectedRange[1] })}
            onChange={(selectedRange) => {
              if (selectedRange[0] !== Number(filter['minWeight'])) {
                handleSearch('minWeight', selectedRange[0].toString())
              }
              if (selectedRange[1] !== Number(filter['maxWeight'])) {
                handleSearch('maxWeight', selectedRange[1].toString())
              }
            }}
          />
        </div>
        <div className={styles.slider_value}>
          {`${t("global.from")} ${filter['minWeight'] || 40} ${t("global.to")} ${filter['maxWeight'] || 125} ${t("model.kg")}`}
        </div>
      </div>
    </div>
  );
};

export default WeightSelector;
