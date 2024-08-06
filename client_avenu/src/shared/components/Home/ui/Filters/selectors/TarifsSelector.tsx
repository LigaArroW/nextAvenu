'use client'
import Slider from "react-slider";


import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";



import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { Check } from "@/shared/assets/Check";
import { useLocale, useTranslations } from "next-intl";
import { IGeneral } from "@/types/core/generalFilters";
import { IWorkDuration } from "@/types/core/workDuration";
import { useHomeContext } from "../../Context/HomeProvider";

interface ITarifsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  filters: Partial<IGeneral>
}


const TarifsSelector: React.FC<ITarifsSelectorProps> = ({ activeComponent, setActiveComponent, filters }) => {
  const { tarifs, setTarifs } = useHomeContext()
  const t = useTranslations();
  const locale = useLocale();



  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.TarifsSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.TarifsSelector ? ComponentType.None : ComponentType.TarifsSelector
          )
        }
      >
        {t("model.tariffs")}
        {activeComponent === ComponentType.TarifsSelector ? <ArrowUp /> : <ArrowDown fill="#1B1B1B" />}
        {tarifs.length > 0 ? <div className={styles.group_count}>{tarifs.length}</div> : null}
      </div>
      <div className={styles.filters_list}>
        {activeComponent === ComponentType.TarifsSelector &&
          filters.work_durations && filters.work_durations.slice(0, 2).map((workDuration: IWorkDuration) => (
            <div key={workDuration.id} style={{ width: "100%" }}>
              <div className={styles.group_sub_name}>
                <label className={'checkbox'}>
                  <input type="checkbox" />
                  <span
                    className={`${'checkbox_mark'} ${tarifs.filter((tarif: number[]) => tarif.includes(workDuration.id)).length > 0
                      ? 'active'
                      : ""
                      }`}
                    aria-hidden="true"
                    onClick={() => {
                      if (tarifs.filter((tarif: number[]) => tarif.includes(workDuration.id)).length > 0) {
                        return setTarifs(tarifs.filter((tarif: number[]) => !tarif.includes(workDuration.id)))
                      }
                      setTarifs([...tarifs, [workDuration.id, 0, 50000]])

                    }}
                  >
                    {tarifs.filter((tarif: number[]) => tarif.includes(workDuration.id)).length > 0 ? (
                      <Check fill="#98042D" />
                    ) : null}
                  </span>
                  <div className={'text'}>
                    {locale === "ru" ? workDuration.work_duration : workDuration.work_duration_eng}
                  </div>
                </label>
              </div>
              {
                tarifs.filter((tarif: number[]) => tarif.includes(workDuration.id)).length > 0 && (
                  <div className={styles.filters_list}>
                    <div className={styles.range_slider}>
                      <Slider
                        className={styles.slider}
                        value={[
                          tarifs.find((tarif: number[]) => tarif[0] === workDuration.id)![1],
                          tarifs.find((tarif: number[]) => tarif[0] === workDuration.id)![2],
                        ]}
                        // value={[Number(filter['minAge']) || 0, Number(filter['maxAge']) || 50000]}
                        min={0}
                        max={50000}
                        step={1}
                        pearling
                        markClassName={styles.mark}
                        thumbClassName={styles.thumb}
                        onChange={(selectedRange) => {
                          const tmpTarifs = tarifs.map((tarif: number[]) => {
                            if (tarif[0] === workDuration.id) {
                              return [workDuration.id, selectedRange[0], selectedRange[1]];
                            } else {
                              return tarif;
                            }
                          }) as number[][];
                          setTarifs(tmpTarifs)

                        }}
                      />
                    </div>
                    <div className={styles.slider_value}>

                      {`${t('global.from')} ${tarifs.find((tarif: number[]) => tarif[0] === workDuration.id)![1]} ${t('global.to')} ${tarifs.find((tarif: number[]) => tarif[0] === workDuration.id)![2]}`}


                    </div>
                  </div>
                )
              }
            </div>
          ))}
      </div>
    </div >
  );
};

export default TarifsSelector;
