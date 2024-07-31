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

interface IAgeSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  handleSearch: (search: string, value: string) => void;
  filters: Partial<IGeneral>
}

const AgeSelector: React.FC<IAgeSelectorProps> = ({ activeComponent, setActiveComponent, filters, handleSearch }) => {
  console.log("🚀 ~ filters:", Object.keys(filters))
  const t = useTranslations();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const filter = queryString.parse(searchParams.toString());


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
        {/* {filter.minAge > 18 || filter.maxAge < 65 ? <div className={styles.group_count} /> : null} */}
      </div>
      <div className={styles.filters_list}>
        <div className={'range_slider'}>
          <Slider
            className={'slider'}
            // value={[filter.minAge, filter.maxAge]}
            min={18}
            max={65}
          // onChange={(selectedRange) => setFilter({ ...filter, minAge: selectedRange[0], maxAge: selectedRange[1] })}
          />
        </div>
        <div className={styles.slider_value}>
          {/* {`${t("global.from")} ${filter.minAge} ${t("global.to")} ${filter.maxAge}`} */}
        </div>
      </div>
    </div>
  );
};

export default AgeSelector;
