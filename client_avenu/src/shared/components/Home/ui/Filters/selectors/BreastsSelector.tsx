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
import { IBreastSize } from "@/types/core/breastSize";
import { IBreastType } from "@/types/core/breastType";

interface IBreastsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  handleSearch: (search: string, value: string) => void;
  filters: Partial<IGeneral>
}

const BreastsSelector: React.FC<IBreastsSelectorProps> = ({ activeComponent, setActiveComponent, filters, handleSearch }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const filter = queryString.parse(searchParams.toString());


  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.BreastsSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.BreastsSelector ? ComponentType.None : ComponentType.BreastsSelector
          )
        }
      >
        {t("model.breast")}
        {activeComponent === ComponentType.BreastsSelector ? <ArrowUp /> : <ArrowDown fill="#1B1B1B" />}

        {(filter.breastSizes ? filter.breastSizes.length : 0) + (filter.breastTypes ? filter.breastTypes.length : 0) > 0 && (
          <div className={styles.group_count}>{(filter.breastSizes ? filter.breastSizes.length : 0) + (filter.breastTypes ? filter.breastTypes.length : 0)}</div>
        )}
      </div>
      <div className={styles.filters_list}>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.breast_size")}</div>
          <div className={styles.filters_list}>
            {activeComponent === ComponentType.BreastsSelector &&
              filters.breast_sizes && filters.breast_sizes.map((breastSize: IBreastSize) => (
                <div key={breastSize.id} className={styles.filter_item}>
                  <label className={'checkbox'}>
                    <input type="checkbox" />
                    <span
                      className={`${'checkbox_mark'} ${(filter['breastSizes'] === breastSize.id.toString() || filter['breastSizes']?.includes(breastSize.id.toString()))
                        ? 'active'
                        : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {
                        handleSearch("breastSizes", breastSize.id.toString());
                      }}
                    >
                      {(filter['breastSizes'] === breastSize.id.toString() || filter['breastSizes']?.includes(breastSize.id.toString())) && (
                        <Check fill="#98042D" />
                      )}
                    </span>
                    <div className={'text'}>{breastSize.breast_size}</div>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.breast_type")}</div>
          <div className={styles.filters_list}>
            {activeComponent === ComponentType.BreastsSelector &&
              filters.breast_types && filters.breast_types.map((breastType: IBreastType) => (
                <div key={breastType.id} className={styles.filter_item}>
                  <label className={'checkbox'}>
                    <input type="checkbox" />
                    <span
                      className={`${'checkbox_mark'} ${(filter['breastTypes'] === breastType.id.toString() || filter['breastTypes']?.includes(breastType.id.toString()))
                          ? 'active'
                          : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {
                        handleSearch("breastTypes", breastType.id.toString());
                      }}
                    >
                      {(filter['breastTypes'] === breastType.id.toString() || filter['breastTypes']?.includes(breastType.id.toString())) ? (
                        <Check fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={'text'}>
                      {locale === "ru" ? breastType.breast_type : breastType.breast_type_eng}
                    </div>
                  </label>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreastsSelector;
