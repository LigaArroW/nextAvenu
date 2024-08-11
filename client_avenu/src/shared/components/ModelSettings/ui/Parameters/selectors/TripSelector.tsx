'use client'

import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { IGeneral } from "@/types/core/generalFilters";
import { ITrip } from "@/types/core/trip";
import { useTranslations, useLocale } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";

interface ITripSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
  filters: Partial<IGeneral>
}

const TripSelector: React.FC<ITripSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart, filters }) => {
  const t = useTranslations();
  const trips = filters.trips || [];
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();

  const handlerTripOnClick = (trip: ITrip) => {
    setModel({ ...model, trip_id: trip.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.TripSelector ? 'active' : ""} ${isCheckStart && model.trip_id === -1 ? "wrong" : ""
        }`}
    >
      <div className={'main'}>
        <div className={'label'}>{t("model.trips")}</div>
        <div
          className={`${'dropdown_button'} ${isCheckStart && model.trip_id === -1 ? 'wrong' : ""}`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.TripSelector ? ComponentType.None : ComponentType.TripSelector
            )
          }
        >
          {model.trip_id === -1
            ? ""
            : locale === "ru"
              ? trips.find((trip: ITrip) => trip.id === model.trip_id)?.trip
              : trips.find((trip: ITrip) => trip.id === model.trip_id)?.trip_eng}
          {activeComponent === ComponentType.TripSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={'required'}>*</div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.TripSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {trips.map((trip: ITrip) => (
            <div key={trip.id} className={'dropdown_item'} onClick={() => handlerTripOnClick(trip)}>
              {locale === "ru" ? trip.trip : trip.trip_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripSelector;
