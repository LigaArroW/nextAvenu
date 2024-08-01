'use client'

import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";


import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { Check } from "@/shared/assets/Check";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import { IGeneral } from "@/types/core/generalFilters";
import { IHairColor } from "@/types/core/hairColor";
import { IHairSize } from "@/types/core/hairSize";
import { IPubisHair } from "@/types/core/pubisHair";

interface IHairsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  handleSearch: (search: string, value: string) => void;
  filters: Partial<IGeneral>
}

const HairsSelector: React.FC<IHairsSelectorProps> = ({ activeComponent, setActiveComponent, filters, handleSearch }) => {

  const t = useTranslations();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const filter = queryString.parse(searchParams.toString());


  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.HairsSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.HairsSelector ? ComponentType.None : ComponentType.HairsSelector
          )
        }
      >
        {t("model.hairs")}
        {activeComponent === ComponentType.HairsSelector ? <ArrowUp /> : <ArrowDown fill="#1B1B1B" />}
        {(filter.hairSizes ? filter.hairSizes.length : 0) + (filter.hairColors ? filter.hairColors.length : 0) + (filter.pubisHairs ? filter.pubisHairs.length : 0) > 0 ? (
          <div className={styles.group_count}>
            {(filter.hairSizes ? filter.hairSizes.length : 0) + (filter.hairColors ? filter.hairColors.length : 0) + (filter.pubisHairs ? filter.pubisHairs.length : 0)}
          </div>
        ) : null}
      </div>
      <div className={styles.filters_list}>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.hair_color")}</div>
          <div className={styles.filters_list}>
            {activeComponent === ComponentType.HairsSelector &&
              filters.hair_colors && filters.hair_colors.map((hairColor: IHairColor) => (
                <div key={hairColor.id} className={styles.filter_item}>
                  <label className={'checkbox'}>
                    <input type="checkbox" />
                    <span
                      className={`${'checkbox_mark'} ${(filter['hairColors'] === hairColor.id.toString() || filter['hairColors']?.includes(hairColor.id.toString()))
                        ? 'active'
                        : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {
                        handleSearch('hairColors', hairColor.id.toString())
                      }}
                    >
                      {(filter['hairColors'] === hairColor.id.toString() || filter['hairColors']?.includes(hairColor.id.toString())) ? (
                        <Check fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={'text'}>
                      {locale === "ru" ? hairColor.hair_color : hairColor.hair_color_eng}
                    </div>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.hair_size")}</div>
          <div className={styles.filters_list}>
            {activeComponent === ComponentType.HairsSelector &&
              filters.hair_sizes && filters.hair_sizes.map((hairSize: IHairSize) => (
                <div key={hairSize.id} className={styles.filter_item}>
                  <label className={'checkbox'}>
                    <input type="checkbox" />
                    <span
                      className={`${'checkbox_mark'} ${(filter['hairSizes'] === hairSize.id.toString() || filter['hairSizes']?.includes(hairSize.id.toString())) ? 'active' : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {
                        handleSearch('hairSizes', hairSize.id.toString())
                      }}
                    >
                      {(filter['hairSizes'] === hairSize.id.toString() || filter['hairSizes']?.includes(hairSize.id.toString())) ? (
                        <Check fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={'text'}>
                      {locale === "ru" ? hairSize.hair_size : hairSize.hair_size_eng}
                    </div>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.pubic_hair")}</div>
          <div className={styles.filters_list}>
            {activeComponent === ComponentType.HairsSelector &&
              filters.pubis_hairs && filters.pubis_hairs.map((pubisHair: IPubisHair) => (
                <div key={pubisHair.id} className={styles.filter_item}>
                  <label className={'checkbox'}>
                    <input type="checkbox" />
                    <span
                      className={`${'checkbox_mark'} ${(filter['pubisHairs'] === pubisHair.id.toString() || filter['pubisHairs']?.includes(pubisHair.id.toString()))
                        ? 'active'
                        : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {
                        handleSearch('pubisHairs', pubisHair.id.toString())
                      }}
                    >
                      {(filter['pubisHairs'] === pubisHair.id.toString() || filter['pubisHairs']?.includes(pubisHair.id.toString())) ? (
                        <Check fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={'text'}>
                      {locale === "ru" ? pubisHair.pubis_hair : pubisHair.pubis_hair_eng}
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

export default HairsSelector;
