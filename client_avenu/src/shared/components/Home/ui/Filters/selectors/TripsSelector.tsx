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
import { ITrip } from "@/types/core/trip";

interface ITripsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  handleSearch: (search: string, value: string) => void;
  filters: Partial<IGeneral>
}

const TripsSelector: React.FC<ITripsSelectorProps> = ({ activeComponent, setActiveComponent, filters, handleSearch }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const filter = queryString.parse(searchParams.toString());


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
        {filter.trips && filter.trips.length > 0 ? <div className={styles.group_count}>{filter.trips.length}</div> : null}
      </div>
      <div className={styles.filters_list}>
        {activeComponent === ComponentType.TripsSelector &&
          filters.trips && filters.trips.map((trip: ITrip) => (
            <div key={trip.id} className={styles.filter_item}>
              <label className={'checkbox'}>
                <input type="checkbox" />
                <span
                  className={`${'checkbox_mark'} ${(filter['trips'] === trip.id.toString() || filter['trips']?.includes(trip.id.toString()))
                    ? 'active' : ""
                    }`}
                  aria-hidden="true"
                  onClick={() => {

                    handleSearch('trips', trip.id.toString())
                  }}
                >
                  {(filter['trips'] === trip.id.toString() || filter['trips']?.includes(trip.id.toString())) ? <Check fill="#98042D" /> : null}
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
