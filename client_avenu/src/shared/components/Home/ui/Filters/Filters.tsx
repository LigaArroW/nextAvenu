'use client'

import { useEffect, useState } from "react";


import styles from "./Filters.module.sass";

import ModelTypesSelector from "./selectors/ModelTypesSelector";
import DistrictsSelector from "./selectors/DistrictsSelector";
import UndergroundsSelector from "./selectors/UndergroundsSelector";
import HairsSelector from "./selectors/HairsSelector";
import BreastsSelector from "./selectors/BreastsSelector";
import TripsSelector from "./selectors/TripsSelector";
import WeightSelector from "./selectors/WeightSelector";
import HeightSelector from "./selectors/HeightSelector";
import ServicesSelector from "./selectors/ServicesSelector";
import EthnicGroupsSelector from "./selectors/EthnicGroupsSelector";
import LanguagesSelector from "./selectors/LanguagesSelector";
import PreferencesSelector from "./selectors/PreferencesSelector";
import AgeSelector from "./selectors/AgeSelector";
import TarifsSelector from "./selectors/TarifsSelector";
import OrientationsSelector from "./selectors/OrientationSelector";

import { ComponentType } from "./ComponentType";


import { Filter } from "@/shared/assets/Filter";
import { Close } from "@/shared/assets/Close";
import { useTranslations } from "next-intl";
import { useMedia } from "react-use";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { searchParamsChange } from "@/shared/constant/searchParamsChange";
import { IGeneral } from "@/types/core/generalFilters";

interface IFiltersProps {
  isFiltersActive?: boolean;
  setIsFiltersActive?: React.Dispatch<React.SetStateAction<boolean>>;
  generalfields: Partial<IGeneral>
}

const Filters: React.FC<IFiltersProps> = ({ isFiltersActive, setIsFiltersActive, generalfields }) => {
  const t = useTranslations();
  const [activeComponent, setActiveComponent] = useState(ComponentType.None);
  const [isFiltersSet, setIsFiltersSet] = useState(false);
  const isMobile = useMedia("(max-width: 1200px)");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  useEffect(() => {
    const query = queryString.parse(searchParams.toString());
    const keys = Object.keys(query);
    if (keys.length > 1) {
      setIsFiltersSet(true);
    } else {
      setIsFiltersSet(false);
    }


  }, [searchParams])


  const handleSearchParams = (search: string, value: string) => {
    const query = searchParamsChange(search, value);
    const updatedPathname = `${pathname}?${query}`;
    // return router.replace(updatedPathname);
    router.replace(updatedPathname, { scroll: false });

  }


  return (
    <div className={styles.filters_wrapper + " " + (isFiltersActive ? styles.active : styles.mobile)}>
      <div className={styles.filters_header}>
        <Filter />
        {t("global.filter")}
        {isFiltersSet ? (
          <button type="button" onClick={() => router.replace(pathname)}>
            {t("global.clear")}
          </button>
        ) : null}
      </div>
      <ModelTypesSelector handleSearch={handleSearchParams} filters={generalfields} />
      <OrientationsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} filters={generalfields} handleSearch={handleSearchParams} />
      {/*<CountriesSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <CitiesSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />*/}
      <DistrictsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} handleSearch={handleSearchParams} filters={generalfields} />
      <UndergroundsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} handleSearch={handleSearchParams} filters={generalfields}  />
      <AgeSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} handleSearch={handleSearchParams} filters={generalfields}/>
      <HairsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <TarifsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <BreastsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <TripsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <WeightSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <HeightSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <ServicesSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <EthnicGroupsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <LanguagesSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <PreferencesSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      {isFiltersActive && isMobile && (
        // <div className={styles.close} onClick={() => setIsFiltersActive(false)}>
        <div className={styles.close} >
          <Close fill="#1B1B1B" />
          {t("global.close")}
        </div>
      )}
    </div>
  );
};

export default Filters;
