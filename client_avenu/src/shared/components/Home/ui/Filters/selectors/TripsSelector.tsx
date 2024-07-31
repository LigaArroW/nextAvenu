'use client'

import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";


import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp  } from "@/shared/assets/ArrowUp";
import { Check  } from "@/shared/assets/Check";
import { useTranslations } from "next-intl";

interface ITripsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const TripsSelector: React.FC<ITripsSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const  t= useTranslations();


  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.TripsSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.TripsSelector ? ComponentType.None : ComponentType.TripsSelector
          )
        }
      >
        {t("model.trips")}
        {activeComponent === ComponentType.TripsSelector ? <ArrowUp /> : <ArrowDown fill="#1B1B1B" />}
        {/* {filter.trips.length > 0 ? <div className={styles.group_count}>{filter.trips.length}</div> : null} */}
      </div>
      <div className={styles.filters_list}>
        {/* {activeComponent === ComponentType.TripsSelector &&
          trips.map((trip: ITrip) => (
            <div className={styles.filter_item}>
              <label className={'checkbox'}>
                <input type="checkbox" />
                <span
                  className={`${'checkbox_mark'} ${
                    filter.trips.filter((item: number) => item === trip.id).length > 0 ? 'active' : ""
                  }`}
                  aria-hidden="true"
                  onClick={() => {
                    if (filter.trips.filter((item: number) => item === trip.id).length > 0) {
                      setFilter({
                        ...filter,
                        trips: filter.trips.filter((item: number) => item !== trip.id),
                      });
                    } else {
                      setFilter({
                        ...filter,
                        trips: [...filter.trips, trip.id],
                      });
                    }
                  }}
                >
                  {filter.trips.filter((item: number) => item === trip.id).length > 0 ? <Check fill="#98042D" /> : null}
                </span>
                <div className={'text'}>{i18n.resolvedLanguage === "ru" ? trip.trip : trip.trip_eng}</div>
              </label>
            </div>
          ))} */}
      </div>
    </div>
  );
};

export default TripsSelector;
