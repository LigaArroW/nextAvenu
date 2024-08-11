'use client'


import { ComponentType } from "../ComponentType";


import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { Check as CheckIcon } from "@/shared/assets/Check";
import { ICountry } from "@/types/core/country";
import { IGeneral } from "@/types/core/generalFilters";
import { IBlockedCountry } from "@/types/model/blockedCountry/blockedCountry";
import { useTranslations, useLocale } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";

interface IBlockedCountriesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  filters: Partial<IGeneral>
}

const BlockedCountriesSelector: React.FC<IBlockedCountriesSelectorProps> = ({ activeComponent, setActiveComponent, filters }) => {
  const t = useTranslations();
  const countries = filters.countries || [];
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();

  const handlerCountryOnClick = (country: ICountry) => {
    if (
      model.blocked_countries.filter((blockedCountry: IBlockedCountry) => blockedCountry.country_id === country.id).length >
      0
    ) {
      setModel({
        ...model,
        blocked_countries: model.blocked_countries.filter(
          (blockedCountry: IBlockedCountry) => blockedCountry.country_id !== country.id
        ),
      });
    } else {
      setModel({
        ...model,
        blocked_countries: [...model.blocked_countries, { country_id: country.id, model_id: model.id } as IBlockedCountry],
      });
    }
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.BlockedCountriesSelector ? 'active' : ""
        }`}
    >
      <div className={`${'main'} ${'column'}`}>
        <div className={'label'}>{t("model.block_the_country")}</div>
        <div
          className={`${'dropdown_button'} ${'full_width'}`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.BlockedCountriesSelector
                ? ComponentType.None
                : ComponentType.BlockedCountriesSelector
            )
          }
        >
          {model.blocked_countries.length === 0
            ? t("global.not_selected")
            : `${t("global.selected")}: ` + model.blocked_countries.length}
          {activeComponent === ComponentType.BlockedCountriesSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={'description'}>{t("model.block_the_country_description")}</div>
      </div>
      <div
        className={`${'dropdown_container'} ${'full_width'} ${'column'} ${activeComponent === ComponentType.BlockedCountriesSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {countries.map((country: ICountry) => (
            <label key={country.id} className={'checkbox'}>
              <input type="checkbox" />
              <span
                className={`${'checkbox_mark'} ${model.blocked_countries.filter(
                  (blockedCountry: IBlockedCountry) => blockedCountry.country_id === country.id
                ).length > 0
                    ? 'active'
                    : ""
                  }`}
                aria-hidden="true"
                onClick={() => handlerCountryOnClick(country)}
              >
                {model.blocked_countries.filter(
                  (blockedCountry: IBlockedCountry) => blockedCountry.country_id === country.id
                ).length > 0 ? (
                  <CheckIcon fill="#98042D" />
                ) : null}
              </span>
              <div className={'text'}>
                {locale === "ru" ? country.country : country.country_eng}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockedCountriesSelector;
