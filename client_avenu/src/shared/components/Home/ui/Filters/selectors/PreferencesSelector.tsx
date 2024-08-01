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
import { ISmooker } from "@/types/core/smooker";
import { IPiercing } from "@/types/model/piercing/piercing";
import { ITatoo } from "@/types/core/tatoo";
import { IEyesColor } from "@/types/core/eyesColor";

interface IPreferencesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  handleSearch: (search: string, value: string) => void;
  filters: Partial<IGeneral>
}

const PreferencesSelector: React.FC<IPreferencesSelectorProps> = ({ activeComponent, setActiveComponent, filters, handleSearch }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const filter = queryString.parse(searchParams.toString());


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
        {(filter.smookers ? filter.smookers.length : 0) + (filter.piercings ? filter.piercings.length : 0) + (filter.tatoos ? filter.tatoos.length : 0) + (filter.eyesColors ? filter.eyesColors.length : 0) > 0 ? (
          <div className={styles.group_count}>
            {(filter.smookers ? filter.smookers.length : 0) + (filter.piercings ? filter.piercings.length : 0) + (filter.tatoos ? filter.tatoos.length : 0) + (filter.eyesColors ? filter.eyesColors.length : 0)}
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
                      className={`${'checkbox_mark'} ${(filter['smookers'] === smooker.id.toString() || filter['smookers']?.includes(smooker.id.toString())) ? 'active' : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {

                        handleSearch('smookers', smooker.id.toString())
                      }}
                    >
                      {(filter['smookers'] === smooker.id.toString() || filter['smookers']?.includes(smooker.id.toString())) ? (
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
                      className={`${'checkbox_mark'} ${(filter['piercings'] === piercing.id.toString() || filter['piercings']?.includes(piercing.id.toString())) ? 'active' : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {

                        handleSearch('piercings', piercing.id.toString())
                      }}
                    >
                      {(filter['piercings'] === piercing.id.toString() || filter['piercings']?.includes(piercing.id.toString())) ? (
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
                      className={`${'checkbox_mark'} ${(filter['tatoos'] === tatoo.id.toString() || filter['tatoos']?.includes(tatoo.id.toString())) ? 'active' : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {

                        handleSearch('tatoos', tatoo.id.toString())
                      }}
                    >
                      {(filter['tatoos'] === tatoo.id.toString() || filter['tatoos']?.includes(tatoo.id.toString())) ? (
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
                      className={`${'checkbox_mark'} ${(filter['eyesColors'] === eyesColor.id.toString() || filter['eyesColors']?.includes(eyesColor.id.toString()))
                        ? 'active'
                        : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {

                        handleSearch('eyesColors', eyesColor.id.toString())
                      }}
                    >
                      {(filter['eyesColors'] === eyesColor.id.toString() || filter['eyesColors']?.includes(eyesColor.id.toString())) ? (
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
