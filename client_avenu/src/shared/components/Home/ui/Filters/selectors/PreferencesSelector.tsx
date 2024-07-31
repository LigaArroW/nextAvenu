'use client'


import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";


import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { Check } from "@/shared/assets/Check";
import { useTranslations } from "next-intl";

interface IPreferencesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const PreferencesSelector: React.FC<IPreferencesSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const t = useTranslations();


  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.PreferencesSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.PreferencesSelector ? ComponentType.None : ComponentType.PreferencesSelector
          )
        }
      >
        {t("model.preferences")}
        {activeComponent === ComponentType.PreferencesSelector ? <ArrowUp /> : <ArrowDown fill="#1B1B1B" />}
        {/* {filter.smookers.length + filter.piercings.length + filter.tatoos.length + filter.eyesColors.length > 0 ? (
          <div className={styles.group_count}>
            {filter.smookers.length + filter.piercings.length + filter.tatoos.length + filter.eyesColors.length}
          </div>
        ) : null} */}
      </div>
      <div className={styles.filters_list}>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.smoker")}</div>
          <div className={styles.filters_list}>
            {/* {activeComponent === ComponentType.PreferencesSelector &&
              smookers.map((smooker: ISmooker) => (
                <div className={styles.filter_item}>
                  <label className={'checkbox'}>
                    <input type="checkbox" />
                    <span
                      className={`${'checkbox_mark'} ${filter.smookers.filter((item: number) => item === smooker.id).length > 0 ? 'active' : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (filter.smookers.filter((item: number) => item === smooker.id).length > 0) {
                          setFilter({
                            ...filter,
                            smookers: filter.smookers.filter((item: number) => item !== smooker.id),
                          });
                        } else {
                          setFilter({
                            ...filter,
                            smookers: [...filter.smookers, smooker.id],
                          });
                        }
                      }}
                    >
                      {filter.smookers.filter((item: number) => item === smooker.id).length > 0 ? (
                        <Check fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={'text'}>
                      {i18n.resolvedLanguage === "ru" ? smooker.smooker : smooker.smooker_eng}
                    </div>
                  </label>
                </div>
              ))} */}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.piercing")}</div>
          <div className={styles.filters_list}>
            {/* {activeComponent === ComponentType.PreferencesSelector &&
              piercings.map((piercing: IPiercing) => (
                <div className={styles.filter_item}>
                  <label className={'checkbox'}>
                    <input type="checkbox" />
                    <span
                      className={`${'checkbox_mark'} ${filter.piercings.filter((item: number) => item === piercing.id).length > 0 ? 'active' : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (filter.piercings.filter((item: number) => item === piercing.id).length > 0) {
                          setFilter({
                            ...filter,
                            piercings: filter.piercings.filter((item: number) => item !== piercing.id),
                          });
                        } else {
                          setFilter({
                            ...filter,
                            piercings: [...filter.piercings, piercing.id],
                          });
                        }
                      }}
                    >
                      {filter.piercings.filter((item: number) => item === piercing.id).length > 0 ? (
                        <CheckIcon fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={'text'}>
                      {i18n.resolvedLanguage === "ru" ? piercing.piercing : piercing.piercing_eng}
                    </div>
                  </label>
                </div>
              ))} */}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.tattoo")}</div>
          <div className={styles.filters_list}>
            {/* {activeComponent === ComponentType.PreferencesSelector &&
              tatoos.map((tatoo: ITatoo) => (
                <div className={styles.filter_item}>
                  <label className={'checkbox'}>
                    <input type="checkbox" />
                    <span
                      className={`${'checkbox_mark'} ${filter.tatoos.filter((item: number) => item === tatoo.id).length > 0 ? 'active' : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (filter.tatoos.filter((item: number) => item === tatoo.id).length > 0) {
                          setFilter({
                            ...filter,
                            tatoos: filter.tatoos.filter((item: number) => item !== tatoo.id),
                          });
                        } else {
                          setFilter({
                            ...filter,
                            tatoos: [...filter.tatoos, tatoo.id],
                          });
                        }
                      }}
                    >
                      {filter.tatoos.filter((item: number) => item === tatoo.id).length > 0 ? (
                        <CheckIcon fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={'text'}>{i18n.resolvedLanguage === "ru" ? tatoo.tatoo : tatoo.tatoo_eng}</div>
                  </label>
                </div>
              ))} */}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.eyes_color")}</div>
          <div className={styles.filters_list}>
            {/* {activeComponent === ComponentType.PreferencesSelector &&
              eyesColors.map((eyesColor: IEyesColor) => (
                <div className={styles.filter_item}>
                  <label className={'checkbox'}>
                    <input type="checkbox" />
                    <span
                      className={`${'checkbox_mark'} ${filter.eyesColors.filter((item: number) => item === eyesColor.id).length > 0
                          ? 'active'
                          : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (filter.eyesColors.filter((item: number) => item === eyesColor.id).length > 0) {
                          setFilter({
                            ...filter,
                            eyesColors: filter.eyesColors.filter((item: number) => item !== eyesColor.id),
                          });
                        } else {
                          setFilter({
                            ...filter,
                            eyesColors: [...filter.eyesColors, eyesColor.id],
                          });
                        }
                      }}
                    >
                      {filter.eyesColors.filter((item: number) => item === eyesColor.id).length > 0 ? (
                        <CheckIcon fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={'text'}>
                      {i18n.resolvedLanguage === "ru" ? eyesColor.eyes_color : eyesColor.eyes_color_eng}
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

export default PreferencesSelector;
