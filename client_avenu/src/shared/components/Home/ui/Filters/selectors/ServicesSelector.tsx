'use client'


import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";


import { ArrowDown  } from "@/shared/assets/ArrowDown";
import { ArrowUp  } from "@/shared/assets/ArrowUp";
import { Check } from "@/shared/assets/Check";
import { IMeetingPlace } from "@/types/core/meetingPlace";
import { useTranslations } from "next-intl";

interface IServicesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const ServicesSelector: React.FC<IServicesSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const  t= useTranslations();


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
        {/* {filter.services.length + filter.meetingPlaces.length > 0 ? (
          <div className={styles.group_count}>{filter.services.length + filter.meetingPlaces.length}</div>
        ) : null} */}
      </div>
      <div className={styles.filters_list}>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{`${t("model.incall")}-${t("model.outcall")}`}</div>
          <div className={styles.filters_list}>
            {/* {activeComponent === ComponentType.ServicesSelector &&
              meetingPlaces
                .filter(
                  (meetingPlace: IMeetingPlace) =>
                    meetingPlace.meeting_place === "Аппартаменты" || meetingPlace.meeting_place === "Выезд"
                )
                .map((meetingPlace: IMeetingPlace) => (
                  <div className={styles.filter_item}>
                    <label className={'checkbox'}>
                      <input type="checkbox" />
                      <span
                        className={`${'checkbox_mark'} ${
                          filter.meetingPlaces.filter((item: number) => item === meetingPlace.id).length > 0
                            ? 'active'
                            : ""
                        }`}
                        aria-hidden="true"
                        onClick={() => {
                          if (filter.meetingPlaces.filter((item: number) => item === meetingPlace.id).length > 0) {
                            setFilter({
                              ...filter,
                              meetingPlaces: filter.meetingPlaces.filter((item: number) => item !== meetingPlace.id),
                            });
                          } else {
                            setFilter({
                              ...filter,
                              meetingPlaces: [...filter.meetingPlaces, meetingPlace.id],
                            });
                          }
                        }}
                      >
                        {filter.meetingPlaces.filter((item: number) => item === meetingPlace.id).length > 0 ? (
                          <Check fill="#98042D" />
                        ) : null}
                      </span>
                      <div className={'text'}>
                        {i18n.resolvedLanguage === "ru" ? meetingPlace.meeting_place : meetingPlace.meeting_place_eng}
                      </div>
                    </label>
                  </div>
                ))} */}
          </div>
        </div>
        {/* {activeComponent === ComponentType.ServicesSelector &&
          serviceCategories.map((serviceCategory: IServiceCategory) => (
            <div style={{ width: "100%" }}>
              <div className={styles.group_sub_name}>
                {i18n.resolvedLanguage === "ru" ? serviceCategory.service_category : serviceCategory.service_category_eng}
              </div>
              <div className={styles.filters_list}>
                {serviceCategory.services.map((service: IService) => (
                  <div className={styles.filter_item}>
                    <label className={'checkbox'}>
                      <input type="checkbox" />
                      <span
                        className={`${'checkbox_mark'} ${
                          filter.services.filter((item: number) => item === service.id).length > 0 ? 'active' : ""
                        }`}
                        aria-hidden="true"
                        onClick={() => {
                          if (filter.services.filter((item: number) => item === service.id).length > 0) {
                            setFilter({
                              ...filter,
                              services: filter.services.filter((item: number) => item !== service.id),
                            });
                          } else {
                            setFilter({
                              ...filter,
                              services: [...filter.services, service.id],
                            });
                          }
                        }}
                      >
                        {filter.services.filter((item: number) => item === service.id).length > 0 ? (
                          <CheckIcon fill="#98042D" />
                        ) : null}
                      </span>
                      <div className={'text'}>
                        {i18n.resolvedLanguage === "ru" ? service.service : service.service_eng}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))} */}
      </div>
    </div>
  );
};

export default ServicesSelector;
