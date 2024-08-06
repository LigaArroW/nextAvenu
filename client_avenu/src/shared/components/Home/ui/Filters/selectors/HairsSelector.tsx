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
import { useHomeContext } from "../../Context/HomeProvider";

interface IHairsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  filters: Partial<IGeneral>
}

const HairsSelector: React.FC<IHairsSelectorProps> = ({ activeComponent, setActiveComponent, filters }) => {
  const { hairSizes, hairColors, pubisHairs, setHairColors, setHairSizes, setPubisHairs } = useHomeContext()
  const t = useTranslations();
  // const searchParams = useSearchParams();
  const locale = useLocale();
  // const filter = queryString.parse(searchParams.toString());


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
        {(hairSizes.length + hairColors.length + pubisHairs.length) > 0 ? (
          <div className={styles.group_count}>
            {(hairSizes.length + hairColors.length + pubisHairs.length)}
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
                      className={`${'checkbox_mark'} ${hairColors.includes(hairColor.id)
                        ? 'active'
                        : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (hairColors.includes(hairColor.id)) {
                          return setHairColors(hairColors.filter((item) => item !== hairColor.id))
                        }

                        setHairColors([...hairColors, hairColor.id])
                      }}
                    >
                      {hairColors.includes(hairColor.id) ? (
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
                      className={`${'checkbox_mark'} ${hairSizes.includes(hairSize.id) ? 'active' : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (hairSizes.includes(hairSize.id)) {
                          return setHairSizes(hairSizes.filter((item) => item !== hairSize.id))
                        }

                        setHairSizes([...hairSizes, hairSize.id])
                      }}
                    >
                      {hairSizes.includes(hairSize.id) ? (
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
                      className={`${'checkbox_mark'} ${pubisHairs.includes(pubisHair.id)
                        ? 'active'
                        : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (pubisHairs.includes(pubisHair.id)) {
                          return setPubisHairs(pubisHairs.filter((item) => item !== pubisHair.id))
                        }

                        setPubisHairs([...pubisHairs, pubisHair.id])
                      }}
                    >
                      {pubisHairs.includes(pubisHair.id) ? (
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
