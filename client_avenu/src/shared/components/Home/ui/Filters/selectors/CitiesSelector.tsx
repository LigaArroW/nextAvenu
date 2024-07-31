'use client'
import { useEffect, useState } from "react";


import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";


import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { Check } from "@/shared/assets/Check";
import { Search } from "@/shared/assets/Search";
import { useTranslations } from "next-intl";
import { ICity } from "@/types/core/city";

interface ICitiesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const CitiesSelector: React.FC<ICitiesSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const t = useTranslations();

  const [filteredCities, setFilteredCities] = useState([] as ICity[]);
  const [searchedCity, setSearchedCity] = useState("");

  useEffect(() => {
    if (searchedCity.trim().length === 0) {
      setFilteredCities([] as ICity[]);
    } else {
      // setFilteredCities(
      //   cities.filter(
      //     (city: ICity) =>
      //       (filter.countries.length === 0 ? true : filter.countries.includes(city.country_id)) &&
      //       (searchedCity.trim() === ""
      //         ? true
      //         : city.city.toLowerCase().startsWith(searchedCity.trim().toLowerCase()) ||
      //         city.city_eng.toLowerCase().startsWith(searchedCity.trim().toLowerCase()))
      //   )
      // );
    }
  }, [ searchedCity]);

  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.CitiesSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.CitiesSelector ? ComponentType.None : ComponentType.CitiesSelector
          )
        }
      >
        {t("global.city")}
        {activeComponent === ComponentType.CitiesSelector ? <ArrowUp /> : <ArrowDown fill="#1B1B1B" />}
        {/* {filter.cities.length > 0 ? <div className={styles.group_count}>{filter.cities.length}</div> : null} */}
      </div>
      <div className={styles.filters_list}>
        <div className={'search_input'}>
          <input
            type="name"
            placeholder={t("global.city_search")}
            value={searchedCity}
            onChange={(event) => setSearchedCity(event.target.value)}
          />
          <Search fill="#98042D" />
        </div>
        {/* {activeComponent === ComponentType.CitiesSelector &&
          filteredCities.map((city: ICity) => (
            <div className={styles.filter_item}>
              <label className={'checkbox'}>
                <input type="checkbox" />
                <span
                  className={`${'checkbox_mark'} ${filter.cities.filter((item: number) => item === city.id).length > 0 ? 'active' : ""
                    }`}
                  aria-hidden="true"
                  onClick={() => {
                    if (filter.cities.filter((item: number) => item === city.id).length > 0) {
                      setFilter({
                        ...filter,
                        cities: filter.cities.filter((item: number) => item !== city.id),
                        selectedCity: { id: -1 } as ICity,
                        selectedCountry: { id: -1 } as ICountry,
                      });
                    } else {
                      setFilter({
                        ...filter,
                        cities: [...filter.cities, city.id],
                        selectedCity: { id: -1 } as ICity,
                        selectedCountry: { id: -1 } as ICountry,
                      });
                    }
                  }}
                >
                  {filter.cities.filter((item: number) => item === city.id).length > 0 ? <CheckIcon fill="#98042D" /> : null}
                </span>
                <div className={'text'}>{i18n.resolvedLanguage === "ru" ? city.city : city.city_eng}</div>
              </label>
            </div>
          ))} */}
      </div>
    </div>
  );
};

export default CitiesSelector;
