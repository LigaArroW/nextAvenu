'use client'

import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";


import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { Check } from "@/shared/assets/Check";
import { useLocale, useTranslations } from "next-intl";
import { IGeneral } from "@/types/core/generalFilters";
import { IBreastSize } from "@/types/core/breastSize";
import { IBreastType } from "@/types/core/breastType";
import { useHomeContext } from "../../Context/HomeProvider";

interface IBreastsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  filters: Partial<IGeneral>
}

const BreastsSelector: React.FC<IBreastsSelectorProps> = ({ activeComponent, setActiveComponent, filters }) => {
  const { breastSizes, breastTypes, setBreastSizes, setBreastTypes } = useHomeContext()
  const t = useTranslations();
  const locale = useLocale();


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

        {(breastSizes.length + breastTypes.length) > 0 && (
          <div className={styles.group_count}>{(breastSizes.length + breastTypes.length)}</div>
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
                      className={`${'checkbox_mark'} ${breastSizes.includes(breastSize.id)
                        ? 'active'
                        : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (breastSizes.includes(breastSize.id)) {
                          return setBreastSizes(breastSizes.filter((id) => id !== breastSize.id))
                        }

                        setBreastSizes([...breastSizes, breastSize.id])
                      }}
                    >
                      {breastSizes.includes(breastSize.id) && (
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
                      className={`${'checkbox_mark'} ${breastTypes.includes(breastType.id)
                        ? 'active'
                        : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (breastTypes.includes(breastType.id)) {
                          return setBreastTypes(breastTypes.filter((id) => id !== breastType.id))
                        }

                        setBreastTypes([...breastTypes, breastType.id])
                      }}
                    >
                      {breastTypes.includes(breastType.id) ? (
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
