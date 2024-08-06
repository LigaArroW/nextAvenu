'use client'


import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";


import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { Check } from "@/shared/assets/Check";
import { useLocale, useTranslations } from "next-intl";
import { IGeneral } from "@/types/core/generalFilters";
import { ISmooker } from "@/types/core/smooker";
import { IPiercing } from "@/types/model/piercing/piercing";
import { ITatoo } from "@/types/core/tatoo";
import { IEyesColor } from "@/types/core/eyesColor";
import { useHomeContext } from "../../Context/HomeProvider";

interface IPreferencesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  filters: Partial<IGeneral>
}

const PreferencesSelector: React.FC<IPreferencesSelectorProps> = ({ activeComponent, setActiveComponent, filters }) => {
  const { smookers, piercings, tatoos, eyesColors, setSmookers, setPiercings, setTatoos, setEyesColors } = useHomeContext()
  const t = useTranslations();
  const locale = useLocale();



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
        {(smookers.length + piercings.length + tatoos.length + eyesColors.length) > 0 ? (
          <div className={styles.group_count}>
            {smookers.length + piercings.length + tatoos.length + eyesColors.length}
          </div>
        ) : null}
      </div>
      <div className={styles.filters_list}>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.smoker")}</div>
          <div className={styles.filters_list}>
            {activeComponent === ComponentType.PreferencesSelector &&
              filters.smookers && filters.smookers.map((smooker: ISmooker) => (
                <div key={smooker.id} className={styles.filter_item}>
                  <label className={'checkbox'}>
                    <input type="checkbox" />
                    <span
                      className={`${'checkbox_mark'} ${smookers.includes(smooker.id) ? 'active' : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (smookers.includes(smooker.id)) {
                          return setSmookers(smookers.filter((id) => id !== smooker.id));
                        }
                        setSmookers([...smookers, smooker.id]);

                      }}
                    >
                      {smookers.includes(smooker.id) ? (
                        <Check fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={'text'}>
                      {locale === "ru" ? smooker.smooker : smooker.smooker_eng}
                    </div>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.piercing")}</div>
          <div className={styles.filters_list}>
            {activeComponent === ComponentType.PreferencesSelector &&
              filters.piercings && filters.piercings.map((piercing: IPiercing) => (
                <div key={piercing.id} className={styles.filter_item}>
                  <label className={'checkbox'}>
                    <input type="checkbox" />
                    <span
                      className={`${'checkbox_mark'} ${piercings.includes(piercing.id) ? 'active' : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {

                        if (piercings.includes(piercing.id)) {
                          return setPiercings(piercings.filter((id) => id !== piercing.id));
                        }
                        setPiercings([...piercings, piercing.id]);
                      }}
                    >
                      {piercings.includes(piercing.id) ? (
                        <Check fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={'text'}>
                      {locale === "ru" ? piercing.piercing : piercing.piercing_eng}
                    </div>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.tattoo")}</div>
          <div className={styles.filters_list}>
            {activeComponent === ComponentType.PreferencesSelector &&
              filters.tatoos && filters.tatoos.map((tatoo: ITatoo) => (
                <div key={tatoo.id} className={styles.filter_item}>
                  <label className={'checkbox'}>
                    <input type="checkbox" />
                    <span
                      className={`${'checkbox_mark'} ${tatoos.includes(tatoo.id) ? 'active' : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {

                        if (tatoos.includes(tatoo.id)) {
                          return setTatoos(tatoos.filter((id) => id !== tatoo.id));
                        }
                        setTatoos([...tatoos, tatoo.id]);
                      }}
                    >
                      {tatoos.includes(tatoo.id) ? (
                        <Check fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={'text'}>{locale === "ru" ? tatoo.tatoo : tatoo.tatoo_eng}</div>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.eyes_color")}</div>
          <div className={styles.filters_list}>
            {activeComponent === ComponentType.PreferencesSelector &&
              filters.eyes_colors && filters.eyes_colors.map((eyesColor: IEyesColor) => (
                <div key={eyesColor.id} className={styles.filter_item}>
                  <label className={'checkbox'}>
                    <input type="checkbox" />
                    <span
                      className={`${'checkbox_mark'} ${eyesColors.includes(eyesColor.id)
                        ? 'active'
                        : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {

                        if (eyesColors.includes(eyesColor.id)) {
                          return setEyesColors(eyesColors.filter((id) => id !== eyesColor.id));
                        }
                        setEyesColors([...eyesColors, eyesColor.id]);
                      }}
                    >
                      {eyesColors.includes(eyesColor.id) ? (
                        <Check fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={'text'}>
                      {locale === "ru" ? eyesColor.eyes_color : eyesColor.eyes_color_eng}
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

export default PreferencesSelector;
