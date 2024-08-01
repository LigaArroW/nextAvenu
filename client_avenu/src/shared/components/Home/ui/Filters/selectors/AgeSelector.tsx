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
import { useEffect, useState } from "react";

interface IAgeSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  handleSearch: (search: string, value: string) => void;
  filters: Partial<IGeneral>
}

const AgeSelector: React.FC<IAgeSelectorProps> = ({ activeComponent, setActiveComponent, filters, handleSearch }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const filter = queryString.parse(searchParams.toString());

  useEffect(() => {
    if (!filter['minAge']) {
      handleSearch('minAge', '18')
    }
    if (!filter['maxAge']) {
      handleSearch('maxAge', '65')
    }
  }, [])

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
        {(filter['minAge'] && Number(filter['minAge']) > 18) || (filter['maxAge'] && Number(filter['maxAge']) < 65) ? <div className={styles.group_count} /> : null}

      </div>
      <div className={styles.filters_list}>
        <div className={styles.range_slider}>
          <Slider
            // marks={[18, 65]}
            className={styles.slider}
            // defaultValue={[18, 65]}
            markClassName={styles.mark}
            thumbClassName={styles.thumb}
            value={[Number(filter['minAge']) || 18, Number(filter['maxAge']) || 65]}
            // value={[minAgeState, maxAgeState]}
            min={18}
            max={65}
            minDistance={1}
            pearling
            // onChange={(selectedRange) => setFilter({ ...filter, minAge: selectedRange[0], maxAge: selectedRange[1] })}
            onChange={(selectedRange) => {
            

              if (selectedRange[0] !== Number(filter['minAge'])) {
                handleSearch('minAge', selectedRange[0].toString())
              }
              if (selectedRange[1] !== Number(filter['maxAge'])) {
                handleSearch('maxAge', selectedRange[1].toString())
              }
            }}
          // onAfterChange={(value) => {
          //   console.log(value, 'afterChange age selector');
          //   if (value[0] !== Number(filter['minAge'])) {
          //     handleSearch('minAge', value[0].toString())
          //   }
          //   if (value[1] !== Number(filter['maxAge'])) {
          //     handleSearch('maxAge', value[1].toString())
          //   }
          // }}
          />

        </div>
        <div className={styles.slider_value}>
          {`${t("global.from")} ${filter['minAge'] || 18} ${t("global.to")} ${filter['maxAge'] || 65}`}
        </div>
      </div>
    </div>
  );
};

export default AgeSelector;
