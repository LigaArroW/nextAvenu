'use client'

import Slider from "react-slider";


import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";

import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { useTranslations } from "next-intl";
import { useHomeContext } from "../../Context/HomeProvider";

interface IHeightSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const HeightSelector: React.FC<IHeightSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { minHeight, maxHeight, setMaxHeight, setMinHeight } = useHomeContext()
  const t = useTranslations();


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
        {activeComponent === ComponentType.HeightSelector ? <ArrowUp /> : <ArrowDown fill="#1B1B1B" />}
        {minHeight > 150 || maxHeight < 220 ? <div className={styles.group_count} /> : null}
      </div>
      <div className={styles.filters_list}>
        <div className={styles.range_slider}>
          <Slider
            className={styles.slider}
            markClassName={styles.mark}
            thumbClassName={styles.thumb}
            value={[minHeight, maxHeight]}
            pearling
            min={150}
            max={220}
            onChange={(selectedRange) => {
              setMinHeight(selectedRange[0])
              setMaxHeight(selectedRange[1])
            }}
          />
        </div>
        <div className={styles.slider_value}>
          {`${t("global.from")} ${minHeight} ${t("global.to")} ${maxHeight} ${t("model.cm")}`}
        </div>
      </div>
    </div>
  );
};

export default HeightSelector;
