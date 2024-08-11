/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from "react";


import { ComponentType } from "../ComponentType";


import { ArrowDown as ArrowDownIcon } from "../../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../../assets/ArrowUp";
import { Search as SearchIcon } from "../../../../../assets/Search";
import { IGeneral } from "@/types/core/generalFilters";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";
import { useLocale, useTranslations } from "next-intl";
import { IUnderground } from "@/types/core/underground";

interface IUndergroundSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  filters: Partial<IGeneral>
}

const UndergroundSelector: React.FC<IUndergroundSelectorProps> = ({ activeComponent, setActiveComponent, filters }) => {
  const t = useTranslations();
  const undergrounds = filters.undergrounds || [];
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();
  const [filteredUndergrounds, setFilteredUndergrounds] = useState(undergrounds);
  const [searchedDistrict, setsearchedDistrict] = useState("");

  useEffect(() => {
    if (searchedDistrict.trim().length === 0) {
      setFilteredUndergrounds(undergrounds);
    } else {
      setFilteredUndergrounds(
        undergrounds.filter(
          (underground: IUnderground) =>
            underground.underground.toLowerCase().startsWith(searchedDistrict.toLowerCase()) ||
            underground.underground_eng.toLowerCase().startsWith(searchedDistrict.toLowerCase())
        )
      );
    }
  }, [searchedDistrict]);

  useEffect(() => {
    const usedName = locale === "ru" ? 'underground' : 'underground_eng'
    const undergroundsSorted = [...undergrounds].sort((a, b) => a[usedName].localeCompare(b[usedName]))
    setFilteredUndergrounds(undergroundsSorted);
  }, [undergrounds]);

  const handlerDropdownButtonOnClick = () => {
    if (filteredUndergrounds.length > 0)
      setActiveComponent(
        activeComponent === ComponentType.UndergroundSelector ? ComponentType.None : ComponentType.UndergroundSelector
      );
  };

  const handlerUndergroundOnClick = (underground: IUnderground) => {
    setModel({ ...model, underground_id: underground.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.UndergroundSelector ? 'active' : ""
        }`}
    >
      <div className={'main'}>
        <div className={'label'}>{t("global.underground")}</div>
        <div className={'dropdown_button'} onClick={handlerDropdownButtonOnClick}>
          {model.underground_id === -1
            ? ""
            : locale === "ru"
              ? undergrounds.find((underground: IUnderground) => underground.id === model.underground_id)?.underground
              : undergrounds.find((underground: IUnderground) => underground.id === model.underground_id)?.underground_eng}
          {activeComponent === ComponentType.UndergroundSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.UndergroundSelector ? 'active' : ""
          }`}
      >
        <div className={'search_input'}>
          <input
            type="name"
            placeholder={t("global.underground_search")}
            value={searchedDistrict}
            onChange={(event) => setsearchedDistrict(event.target.value)}
          />
          <SearchIcon fill="#98042D" />
        </div>
        <div className={'dropdown_list'}>
          {filteredUndergrounds.map((underground: IUnderground) => (
            <div key={underground.id} className={'dropdown_item'} onClick={() => handlerUndergroundOnClick(underground)}>
              {locale === "ru" ? underground.underground : underground.underground_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UndergroundSelector;
