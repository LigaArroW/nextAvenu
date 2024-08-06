'use client'

import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";


import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { Check } from "@/shared/assets/Check";
import { useLocale, useTranslations } from "next-intl";
import { IGeneral } from "@/types/core/generalFilters";
import { ITrip } from "@/types/core/trip";
import { useHomeContext } from "../../Context/HomeProvider";

interface ITripsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  filters: Partial<IGeneral>
}

const TripsSelector: React.FC<ITripsSelectorProps> = ({ activeComponent, setActiveComponent, filters }) => {
  const { trips, setTrips } = useHomeContext()
  const t = useTranslations();
  const locale = useLocale();


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
        {trips.length > 0 ? <div className={styles.group_count}>{trips.length}</div> : null}
      </div>
      <div className={styles.filters_list}>
        {activeComponent === ComponentType.TripsSelector &&
          filters.trips && filters.trips.map((trip: ITrip) => (
            <div key={trip.id} className={styles.filter_item}>
              <label className={'checkbox'}>
                <input type="checkbox" />
                <span
                  className={`${'checkbox_mark'} ${trips.includes(trip.id)
                    ? 'active' : ""
                    }`}
                  aria-hidden="true"
                  onClick={() => {
                    if (trips.includes(trip.id)) {
                      return setTrips(trips.filter((item) => item !== trip.id))
                    }
                    setTrips(prev => [...prev, trip.id])

                  }}
                >
                  {trips.includes(trip.id) ? <Check fill="#98042D" /> : null}
                </span>
                <div className={'text'}>{locale === "ru" ? trip.trip : trip.trip_eng}</div>
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TripsSelector;
