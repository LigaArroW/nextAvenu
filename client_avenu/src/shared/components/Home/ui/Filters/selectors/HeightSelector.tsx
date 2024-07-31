'use client'

import Slider from "react-slider";


import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";

import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { useTranslations } from "next-intl";

interface IHeightSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const HeightSelector: React.FC<IHeightSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const  t  = useTranslations();


  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.HeightSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.HeightSelector ? ComponentType.None : ComponentType.HeightSelector
          )
        }
      >
        {t("model.height")}
        {activeComponent === ComponentType.HeightSelector ? <ArrowUp/> : <ArrowDown fill="#1B1B1B" />}
        {/* {filter.minHeight > 150 || filter.maxHeight < 220 ? <div className={styles.group_count} /> : null} */}
      </div>
      <div className={styles.filters_list}>
        <div className={'range_slider'}>
          <Slider
            className={'slider'}
            // value={[filter.minHeight, filter.maxHeight]}
            min={150}
            max={220}
            // onChange={(selectedRange) => setFilter({ ...filter, minHeight: selectedRange[0], maxHeight: selectedRange[1] })}
          />
        </div>
        <div className={styles.slider_value}>
          {/* {`${t("global.from")} ${filter.minHeight} ${t("global.to")} ${filter.maxHeight} ${t("model.cm")}`} */}
        </div>
      </div>
    </div>
  );
};

export default HeightSelector;
