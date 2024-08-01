'use client'


import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";


import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { Check } from "@/shared/assets/Check";
import { IMeetingPlace } from "@/types/core/meetingPlace";
import { useLocale, useTranslations } from "next-intl";
import { IGeneral } from "@/types/core/generalFilters";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import { IServiceCategory } from "@/types/core/serviceCategory";
import { IService } from "@/types/core/service";

interface IServicesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  handleSearch: (search: string, value: string) => void;
  filters: Partial<IGeneral>
}

const ServicesSelector: React.FC<IServicesSelectorProps> = ({ activeComponent, setActiveComponent, filters, handleSearch }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const filter = queryString.parse(searchParams.toString());


  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.ServicesSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.ServicesSelector ? ComponentType.None : ComponentType.ServicesSelector
          )
        }
      >
        {t("model.services")}
        {activeComponent === ComponentType.ServicesSelector ? <ArrowUp /> : <ArrowDown fill="#1B1B1B" />}
        {(filter.services ? filter.services.length : 0) + (filter.meetingPlaces ? filter.meetingPlaces.length : 0) > 0 ? (
          <div className={styles.group_count}>{(filter.services ? filter.services.length : 0) + (filter.meetingPlaces ? filter.meetingPlaces.length : 0)}</div>
        ) : null}
      </div>
      <div className={styles.filters_list}>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{`${t("model.incall")}-${t("model.outcall")}`}</div>
          <div className={styles.filters_list}>
            {activeComponent === ComponentType.ServicesSelector &&
              filters.meeting_places && filters.meeting_places
                .filter(
                  (meetingPlace: IMeetingPlace) =>
                    meetingPlace.meeting_place === "Аппартаменты" || meetingPlace.meeting_place === "Выезд"
                )
                .map((meetingPlace: IMeetingPlace) => (
                  <div key={meetingPlace.id} className={styles.filter_item}>
                    <label className={'checkbox'}>
                      <input type="checkbox" />
                      <span
                        className={`${'checkbox_mark'} ${(filter['meetingPlaces'] === meetingPlace.id.toString() || filter['meetingPlaces']?.includes(meetingPlace.id.toString()))
                          ? 'active'
                          : ""
                          }`}
                        aria-hidden="true"
                        onClick={() => {

                          handleSearch('meetingPlaces', meetingPlace.id.toString())
                        }}
                      >
                        {(filter['meetingPlaces'] === meetingPlace.id.toString() || filter['meetingPlaces']?.includes(meetingPlace.id.toString())) ? (
                          <Check fill="#98042D" />
                        ) : null}
                      </span>
                      <div className={'text'}>
                        {locale === "ru" ? meetingPlace.meeting_place : meetingPlace.meeting_place_eng}
                      </div>
                    </label>
                  </div>
                ))}
          </div>
        </div>
        {activeComponent === ComponentType.ServicesSelector &&
          filters.service_categories && filters.service_categories.map((serviceCategory: IServiceCategory) => (
            <div key={serviceCategory.id} style={{ width: "100%" }}>
              <div className={styles.group_sub_name}>
                {locale === "ru" ? serviceCategory.service_category : serviceCategory.service_category_eng}
              </div>
              <div className={styles.filters_list}>
                {serviceCategory.services.map((service: IService) => (
                  <div key={service.id} className={styles.filter_item}>
                    <label className={'checkbox'}>
                      <input type="checkbox" />
                      <span
                        className={`${'checkbox_mark'} ${(filter['services'] === service.id.toString() || filter['services']?.includes(service.id.toString())) ? 'active' : ""
                          }`}
                        aria-hidden="true"
                        onClick={() => {
                          handleSearch('services', service.id.toString())
                        }}
                      >
                        {(filter['services'] === service.id.toString() || filter['services']?.includes(service.id.toString())) ? (
                          <Check fill="#98042D" />
                        ) : null}
                      </span>
                      <div className={'text'}>
                        {locale === "ru" ? service.service : service.service_eng}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ServicesSelector;
