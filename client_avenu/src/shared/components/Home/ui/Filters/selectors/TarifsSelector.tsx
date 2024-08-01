'use client'
import Slider from "react-slider";


import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";



import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { Check } from "@/shared/assets/Check";
import { useLocale, useTranslations } from "next-intl";
import { IGeneral } from "@/types/core/generalFilters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { IWorkDuration } from "@/types/core/workDuration";
import { useEffect, useState } from "react";
import { deleteSearchParam } from "@/shared/constant/searchParamsChange";

interface ITarifsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  handleSearch: (search: string, value: string) => void;
  filters: Partial<IGeneral>
}


const TarifsSelector: React.FC<ITarifsSelectorProps> = ({ activeComponent, setActiveComponent, filters, handleSearch }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const locale = useLocale();
  let filter = queryString.parse(searchParams.toString());
  const [tarifs, setTarifs] = useState<string[]>([])
  const router = useRouter()
  const pathname = usePathname()

  filter = typeof filter['tarifs'] === 'string' ? { tarifs: [filter['tarifs']] } : filter





  useEffect(() => {
    // console.log("🚀 ~ tarifs:", tarifs);
    if ((!tarifs.includes('1'))) {

      if (filter['minPrice1']) {
        const query = deleteSearchParam('minPrice1')
        router.replace(`${pathname}?${query}`)
      }
      if (filter['maxPrice1']) {
        const query = deleteSearchParam('maxPrice1')
        router.replace(`${pathname}?${query}`)
      }
    }

    if ((!tarifs.includes('2'))) {
      if (filter['minPrice2']) {
        // handleSearch('minPrice2', '0')
        const query = deleteSearchParam('minPrice2')
        router.replace(`${pathname}?${query}`)
      }
      if (filter['maxPrice2']) {
        const query = deleteSearchParam('maxPrice2')
        router.replace(`${pathname}?${query}`)
      }
    }
    // if (!filter['minPrice1']) {
    //   handleSearch('minPrice1', '0')
    // }
    // if (!filter['maxPrice']) {
    //   handleSearch('maxPrice', '50000')
    // }
    // if (!filter['minPrice2']) {
    //   handleSearch('minPrice2', '0')
    // }
    // if (!filter['maxPrice2']) {
    //   handleSearch('maxPrice2', '50000')
    // }
  }, [filter, pathname, router, tarifs])





    const handleActive = (id: string) => {

      if (filter['tarifs'] && !filter['tarifs'].includes(id)) {
        setTarifs(prev => prev.filter(el => el !== id))
      }
      if (filter['tarifs'] && filter['tarifs'].includes(id)) {
        if (tarifs.includes(id)) return
        setTarifs(prev => [...prev, id])
      }


    }




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
        {filter.tarifs && filter.tarifs.length > 0 ? <div className={styles.group_count}>{filter.tarifs.length}</div> : null}
      </div>
      <div className={styles.filters_list}>
        {activeComponent === ComponentType.TarifsSelector &&
          filters.work_durations && filters.work_durations.slice(0, 2).map((workDuration: IWorkDuration) => (
            <div key={workDuration.id} style={{ width: "100%" }}>
              <div className={styles.group_sub_name}>
                <label className={'checkbox'}>
                  <input type="checkbox" />
                  <span
                    className={`${'checkbox_mark'} ${(filter['tarifs'] === workDuration.id.toString() || filter['tarifs']?.includes(workDuration.id.toString()))
                      ? 'active'
                      : ""
                      }`}
                    aria-hidden="true"
                    onClick={() => {




                      // (filter['tarifs'] === workDuration.id.toString() || filter['tarifs']?.includes(workDuration.id.toString()))
                      //   ? setTarifs(tarifs.filter((tarif: string) => tarif !== workDuration.id.toString()))
                      //   :
                      //   setTarifs([...tarifs, workDuration.id.toString()])
                      // if (!tarifs.includes(workDuration.id.toString())) {
                      //   setTarifs([...tarifs, workDuration.id.toString()])
                      // }
                      handleSearch('tarifs', workDuration.id.toString())
                      handleActive(workDuration.id.toString())
                    }}
                  >
                    {(filter['tarifs'] === workDuration.id.toString() || filter['tarifs']?.includes(workDuration.id.toString())) ? (
                      <Check fill="#98042D" />
                    ) : null}
                  </span>
                  <div className={'text'}>
                    {locale === "ru" ? workDuration.work_duration : workDuration.work_duration_eng}
                  </div>
                </label>
              </div>
              {filter['tarifs'] && Array.isArray(filter.tarifs) && filter['tarifs'].includes(workDuration.id.toString()) && (
                <div className={styles.filters_list}>
                  <div className={styles.range_slider}>
                    <Slider
                      className={styles.slider}
                      // value={[
                      //   filter.tarifs.find((tarif: number[]) => tarif[0] === workDuration.id)![1],
                      //   filter.tarifs.find((tarif: number[]) => tarif[0] === workDuration.id)![2],
                      // ]}
                      value={[Number(filter[`minPrice${workDuration.id}`]) || 0,
                      Number(filter[`maxPrice${workDuration.id}`]) || 50000]}
                      // value={[Number(filter['minAge']) || 0, Number(filter['maxAge']) || 50000]}
                      min={0}
                      max={50000}
                      step={100}
                      pearling
                      markClassName={styles.mark}
                      thumbClassName={styles.thumb}
                      onChange={(selectedRange) => {
                        console.log(filter[`minPrice${workDuration.id}`], 'filter[`minPrice${workDuration.id}`]');

                        // console.log(filter['tarifs'] && Array.isArray(filter.tarifs) && filter['tarifs'].find((tarif) => tarif === workDuration.id.toString()), 'selectedRange', selectedRange);

                        const active = filter['tarifs'] && Array.isArray(filter.tarifs) && filter['tarifs'].find((tarif) => tarif === workDuration.id.toString())
                        console.log("🚀 ~ active:", active)
                        console.log(active ? selectedRange[0].toString() : '0', 'selectedRange[0]');

                        if (selectedRange[0] !== Number(filter[`minPrice${workDuration.id}`])) {
                          return handleSearch(`minPrice${workDuration.id}`, selectedRange[0].toString())
                        }
                        if (selectedRange[1] !== Number(filter[`maxPrice${workDuration.id}`])) {
                          return handleSearch(`maxPrice${workDuration.id}`, selectedRange[1].toString())
                        }
                        // filter['tarifs'].find((tarif) => tarif === workDuration.id.toString())

                        // const tmpTarifs = filter.tarifs.map((tarif: number[]) => {
                        //   if (tarif[0] === workDuration.id) {
                        //     return [workDuration.id, selectedRange[0], selectedRange[1]];
                        //   } else {
                        //     return tarif;
                        //   }
                        // }) as number[][];
                        // setFilter({ ...filter, tarifs: tmpTarifs });
                      }}
                    />
                  </div>
                  <div className={styles.slider_value}>
                    {/* {`${t("global.from")} ${filter.tarifs.find((tarif: number[]) => tarif[0] === workDuration.id)![1]} ${t(
                      "global.to"
                    )} ${filter.tarifs.find((tarif: number[]) => tarif[0] === workDuration.id)![2]}`} */}

                    {`${t('global.from')} ${filter[`minPrice${workDuration.id}`] || 0} ${t('global.to')} ${filter[`maxPrice${workDuration.id}`] || 50000}`}


                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TarifsSelector;
