/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";



import { ComponentType } from "../ComponentType";
/**
 * 
 * 
 * 
@/shared/assets/
 */

import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { Search as SearchIcon } from "@/shared/assets/Search";
import { useLocale, useTranslations } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";
import { IGeneral } from "@/types/core/generalFilters";
import { IDistrict } from "@/types/core/district";

interface IDistrictSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  filters: Partial<IGeneral>
}

const DistrictSelector: React.FC<IDistrictSelectorProps> = ({ activeComponent, setActiveComponent, filters }) => {
  const t = useTranslations();
  const districts = filters.districts || [];
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();


  const [filteredDistricts, setFilteredDistricts] = useState(districts);
  const [searchedDistrict, setSearchedDistrict] = useState("");

  useEffect(() => {
    if (searchedDistrict.trim().length === 0) {
      setFilteredDistricts(districts);
    } else {
      setFilteredDistricts(
        districts.filter(
          (district: IDistrict) =>
            district.district.toLowerCase().startsWith(searchedDistrict.toLowerCase()) ||
            district.district_eng.toLowerCase().startsWith(searchedDistrict.toLowerCase())
        )
      );
    }
  }, [searchedDistrict]);

  useEffect(() => {
    const usedName = locale === "ru" ? 'district' : 'district_eng'
    const districtsSorted = [...districts].sort((a, b) => a[usedName].localeCompare(b[usedName]))
    setFilteredDistricts(districtsSorted);
  }, [districts]);

  const handlerDropdownButtonOnClick = () => {
    if (filteredDistricts.length > 0)
      setActiveComponent(
        activeComponent === ComponentType.DistrictSelector ? ComponentType.None : ComponentType.DistrictSelector
      );
  };

  const handlerDistrictOnClick = (district: IDistrict) => {
    setModel({ ...model, district_id: district.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.DistrictSelector ? 'active' : ""}`}
    >
      <div className={'main'}>
        <div className={'label'}>{t("global.district")}</div>
        <div className={'dropdown_button'} onClick={handlerDropdownButtonOnClick}>
          {model.district_id === -1
            ? ""
            : locale === "ru"
              ? districts.find((district: IDistrict) => district.id === model.district_id)?.district
              : districts.find((district: IDistrict) => district.id === model.district_id)?.district_eng}
          {activeComponent === ComponentType.DistrictSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.DistrictSelector ? 'active' : ""
          }`}
      >
        <div className={'search_input'}>
          <input
            type="name"
            placeholder={t("global.district_search")}
            value={searchedDistrict}
            onChange={(event) => setSearchedDistrict(event.target.value)}
          />
          <SearchIcon fill="#98042D" />
        </div>
        <div className={'dropdown_list'}>
          {filteredDistricts.map((district: IDistrict) => (
            <div key={district.id} className={'dropdown_item'} onClick={() => handlerDistrictOnClick(district)}>
              {locale === "ru" ? district.district : district.district_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DistrictSelector;
