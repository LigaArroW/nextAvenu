'use client'

import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";


import { ArrowDown} from "@/shared/assets/ArrowDown";
import { ArrowUp} from "@/shared/assets/ArrowUp";
import { Check } from "@/shared/assets/Check";
import { useTranslations } from "next-intl";

interface IBreastsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const BreastsSelector: React.FC<IBreastsSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const  t= useTranslations();


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
        {activeComponent === ComponentType.BreastsSelector ? <ArrowUp/> : <ArrowDown fill="#1B1B1B" />}
        {/* {filter.breastSizes.length + filter.breastTypes.length > 0 && (
          <div className={styles.group_count}>{filter.breastSizes.length + filter.breastTypes.length}</div>
        )} */}
      </div>
      <div className={styles.filters_list}>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.breast_size")}</div>
          <div className={styles.filters_list}>
            {/* {activeComponent === ComponentType.BreastsSelector &&
              breastSizes.map((breastSize: IBreastSize) => (
                <div className={styles.filter_item}>
                  <label className={'checkbox'}>
                    <input type="checkbox" />
                    <span
                      className={`${'checkbox_mark'} ${
                        filter.breastSizes.filter((item: number) => item === breastSize.id).length > 0
                          ? 'active'
                          : ""
                      }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (filter.breastSizes.filter((item: number) => item === breastSize.id).length > 0) {
                          setFilter({
                            ...filter,
                            breastSizes: filter.breastSizes.filter((item: number) => item !== breastSize.id),
                          });
                        } else {
                          setFilter({
                            ...filter,
                            breastSizes: [...filter.breastSizes, breastSize.id],
                          });
                        }
                      }}
                    >
                      {filter.breastSizes.filter((item: number) => item === breastSize.id).length > 0 && (
                        <CheckIcon fill="#98042D" />
                      )}
                    </span>
                    <div className={'text'}>{breastSize.breast_size}</div>
                  </label>
                </div>
              ))} */}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.breast_type")}</div>
          <div className={styles.filters_list}>
            {/* {activeComponent === ComponentType.BreastsSelector &&
              breastTypes.map((breastType: IBreastType) => (
                <div className={styles.filter_item}>
                  <label className={'checkbox'}>
                    <input type="checkbox" />
                    <span
                      className={`${'checkbox_mark'} ${
                        filter.breastTypes.filter((item: number) => item === breastType.id).length > 0
                          ? 'active'
                          : ""
                      }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (filter.breastTypes.filter((item: number) => item === breastType.id).length > 0) {
                          setFilter({
                            ...filter,
                            breastTypes: filter.breastTypes.filter((item: number) => item !== breastType.id),
                          });
                        } else {
                          setFilter({
                            ...filter,
                            breastTypes: [...filter.breastTypes, breastType.id],
                          });
                        }
                      }}
                    >
                      {filter.breastTypes.filter((item: number) => item === breastType.id).length > 0 ? (
                        <CheckIcon fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={'text'}>
                      {i18n.resolvedLanguage === "ru" ? breastType.breast_type : breastType.breast_type_eng}
                    </div>
                  </label>
                </div>
              ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreastsSelector;
