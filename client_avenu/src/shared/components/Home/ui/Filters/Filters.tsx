'use client'

import { useEffect, useState } from "react";
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
import { IGeneral } from "@/types/core/generalFilters";
import { useHomeContext } from "../Context/HomeProvider";
import { useMainContext } from "@/widgets/Contex/MainProvider";


import styles from "./Filters.module.sass";

interface IFiltersProps {
  generalfields: Partial<IGeneral>
}

const Filters: React.FC<IFiltersProps> = ({ generalfields }) => {
  const t = useTranslations();
  const [activeComponent, setActiveComponent] = useState(ComponentType.None);
  const [isFiltersSet, setIsFiltersSet] = useState(false);
  const isMobile = useMedia("(max-width: 1200px)");
  const { resetContext: resetMainContext, searchedModel } = useMainContext()
  const { resetContext,
    breastSizes,
    breastTypes,
    cities,
    countries,
    districts,
    ethnicGroups,
    eyesColors,
    hairColors,
    hairSizes,
    languages,
    meetingPlaces,
    nationalities,
    modelTypes,
    orientations,
    piercings,
    pubisHairs,
    tatoos,
    trips,
    undergrounds,
    tarifs,
    minAge,
    maxAge,
    minWeight,
    maxWeight,
    minHeight,
    maxHeight,
    isFiltersActive,
    setIsFiltersActive
  } = useHomeContext()




  useEffect(() => {
    var count =
      breastSizes.length +
      breastTypes.length +
      cities.length +
      countries.length +
      districts.length +
      ethnicGroups.length +
      eyesColors.length +
      hairColors.length +
      hairSizes.length +
      meetingPlaces.length +
      languages.length +
      modelTypes.length +
      nationalities.length +
      orientations.length +
      piercings.length +
      piercings.length +
      pubisHairs.length +
      tatoos.length +
      trips.length +
      undergrounds.length +
      tarifs.length;
    setIsFiltersSet(
      count > 0 ||
      minAge !== 18 ||
      maxAge !== 65 ||
      minHeight !== 150 ||
      maxHeight !== 220 ||
      minWeight !== 40 ||
      maxWeight !== 125 ||
      searchedModel !== ""
    );

  }, [breastSizes.length, breastTypes.length, cities.length, countries.length, districts.length, ethnicGroups.length, eyesColors.length, hairColors.length, hairSizes.length, languages.length, maxAge, maxHeight, maxWeight, meetingPlaces.length, minAge, minHeight, minWeight, modelTypes.length, nationalities.length, orientations.length, piercings.length, pubisHairs.length, searchedModel, tarifs.length, tatoos.length, trips.length, undergrounds.length])



  return (
    <div className={styles.filters_wrapper + " " + (isFiltersActive ? styles.active : styles.mobile)}>
      <div className={styles.filters_header}>
        <Filter />
        {t("global.filter")}
        {isFiltersSet ? (
          <button type="button" onClick={() => { resetContext(), resetMainContext() }}>
            {t("global.clear")}
          </button>
        ) : null}
      </div>
      <ModelTypesSelector filters={generalfields} />
      <OrientationsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} filters={generalfields} />
      {/*<CountriesSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <CitiesSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />*/}
      <DistrictsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} filters={generalfields} />
      <UndergroundsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} filters={generalfields} />
      <AgeSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} filters={generalfields} />
      <HairsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} filters={generalfields} />
      <TarifsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} filters={generalfields} />
      <BreastsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} filters={generalfields} />
      <TripsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} filters={generalfields} />
      <WeightSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} filters={generalfields} />
      <HeightSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <ServicesSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} filters={generalfields} />
      <EthnicGroupsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} filters={generalfields} />
      <LanguagesSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} filters={generalfields} />
      <PreferencesSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} filters={generalfields} />
      {isFiltersActive && isMobile && (
        <div className={styles.close} onClick={() => setIsFiltersActive(false)}>
          <Close fill="#1B1B1B" />
          {t("global.close")}
        </div>
      )}
    </div>
  );
};

export default Filters;
