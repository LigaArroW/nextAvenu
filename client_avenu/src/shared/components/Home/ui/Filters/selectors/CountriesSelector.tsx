'use client'


import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";


import { ArrowDown} from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { Check } from "@/shared/assets/Check";
import { useTranslations } from "next-intl";

interface ICountriesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const CountriesSelector: React.FC<ICountriesSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const  t = useTranslations();


  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.CountriesSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.CountriesSelector ? ComponentType.None : ComponentType.CountriesSelector
          )
        }
      >
        {t("global.country")}
        {activeComponent === ComponentType.CountriesSelector ? <ArrowUp /> : <ArrowDown fill="#1B1B1B" />}
        {/* {filter.countries.length > 0 ? <div className={styles.group_count}>{filter.countries.length}</div> : null} */}
      </div>
      <div className={styles.filters_list}>
        {/* {activeComponent === ComponentType.CountriesSelector &&
          countries.map((country: ICountry) => (
            <div className={styles.filter_item}>
              <label className={'checkbox'}>
                <input type="checkbox" />
                <span
                  className={`${'checkbox_mark'} ${
                    filter.countries.filter((item: number) => item === country.id).length > 0 ? 'active' : ""
                  }`}
                  aria-hidden="true"
                  onClick={() => {
                    if (filter.countries.filter((item: number) => item === country.id).length > 0) {
                      setFilter({
                        ...filter,
                        countries: filter.countries.filter((item: number) => item !== country.id),
                        selectedCity: { id: -1 } as ICity,
                        selectedCountry: { id: -1 } as ICountry,
                      });
                    } else {
                      setFilter({
                        ...filter,
                        countries: [...filter.countries, country.id],
                        selectedCity: { id: -1 } as ICity,
                        selectedCountry: { id: -1 } as ICountry,
                      });
                    }
                  }}
                >
                  {filter.countries.filter((item: number) => item === country.id).length > 0 ? (
                    <CheckIcon fill="#98042D" />
                  ) : null}
                </span>
                <div className={'text'}>
                  {i18n.resolvedLanguage === "ru" ? country.country : country.country_eng}
                </div>
              </label>
            </div>
          ))} */}
      </div>
    </div>
  );
};

export default CountriesSelector;
