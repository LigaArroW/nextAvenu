'use client'


import { ViewType } from "../ViewType";


import { Filter } from "../../../../assets/Filter";
import { Grid } from "../../../../assets/Grid";
import { List } from "../../../../assets/List";
import { Close } from "../../../../assets/Close";
import { useTranslations } from "next-intl";
import { useMedia } from "react-use";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useSearchFilter } from "@/shared/hooks/useSeachFilter";
import { ISearchFilter } from "@/types/model/filter/filter";
import { IModel } from "@/types/model/model/model";
import { IGeneral } from "@/types/core/generalFilters";
import HomeModel from "@/shared/components/HomeModel/HomeModel";
import { useHomeContext } from "../Context/HomeProvider";
import { calcIsNew } from "@/shared/constant/calcIsNew";
import { IMeetingPlace } from "@/types/core/meetingPlace";
import { ITarif } from "@/types/model/tarif/tarif";
import { useMainContext } from "@/widgets/Contex/MainProvider";

import styles from "./Models.module.sass";

interface IModelsProps {
  // isFiltersActive: boolean;
  // setIsFiltersActive: React.Dispatch<React.SetStateAction<boolean>>;
  forModerator: boolean;
  models: IModel[]
  generalfields: Partial<IGeneral>
}

const Models: React.FC<IModelsProps> = ({ forModerator, models, generalfields }) => {
  // const [viewType, setViewType] = useState(ViewType.ListView);
  const t = useTranslations()
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMedia("(max-width: 1200px)");
  const [viewModelList, setViewModelList] = useState<IModel[]>([]);
  // const SeachFilter: Partial<ISearchFilter> = useSearchFilter();
  const countModelsOnPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const {
    viewType,
    setViewType,
    isFiltersActive,
    setIsFiltersActive,
    minAge,
    maxAge,
    minWeight,
    maxWeight,
    minHeight,
    maxHeight,
    districts,
    meetingPlaces,
    undergrounds,
    modelTypes,
    orientations,
    hairColors,
    hairSizes,
    pubisHairs,
    breastSizes,
    breastTypes,
    nationalities,
    trips,
    languages,
    tatoos,
    smookers,
    eyesColors,
    piercings,
    ethnicGroups,
    services,
    tarifs,
    resetContext
  } = useHomeContext()

  const { searchedModel, resetContext: resetMainContext } = useMainContext()



  useEffect(() => {

    setViewModelList(
      models.filter((model: IModel) =>
        (forModerator ? true : model.is_enable_by_moderator) &&
        (forModerator ? true : model.photos.length && model.photos.length > 0) &&
        (forModerator ? true : model.is_enable_by_moderator) &&
        model.name.toLowerCase().startsWith(searchedModel.toLowerCase() || "") &&
        model.age >= minAge &&
        model.age <= maxAge &&
        model.weight >= minWeight &&
        model.weight <= maxWeight &&
        model.height >= minHeight &&
        model.height <= maxHeight &&
        (districts.length > 0 ? districts?.includes(model.district_id) : true) &&
        (undergrounds.length > 0 ? undergrounds?.includes(model.underground_id) : true) &&
        (modelTypes.length > 0 ? modelTypes?.includes(model.type_id) : true) &&
        (hairColors.length > 0 ? hairColors?.includes(model.hair_color_id) : true) &&
        (hairSizes.length > 0 ? hairSizes?.includes(model.hair_size_id) : true) &&
        (pubisHairs.length > 0 ? pubisHairs?.includes(model.pubis_hair_id) : true) &&
        (breastSizes.length > 0 ? breastSizes?.includes(model.breast_size_id) : true) &&
        (breastTypes.length > 0 ? breastTypes?.includes(model.breast_type_id) : true) &&
        (trips.length > 0 ? trips?.includes(model.trip_id) : true) &&
        (ethnicGroups.length > 0 ? ethnicGroups?.includes(model.ethnic_group_id) : true) &&
        (nationalities.length > 0 ? nationalities?.includes(model.nationality_id) : true) &&
        (smookers.length > 0 ? smookers?.includes(model.smooker_id) : true) &&
        (tatoos.length > 0 ? tatoos?.includes(model.tatoo_id) : true) &&
        (eyesColors.length > 0 ? eyesColors?.includes(model.eyes_color_id) : true) &&
        (orientations.length > 0 ? orientations?.includes(model.orientation_id) : true) &&
        (services.length > 0 && Array.isArray(services) ? services.every((service) =>
          model.model_services.map(model_service => model_service.service_id).includes(service)) : true) &&
        (piercings.length > 0 && Array.isArray(piercings) ? piercings.every((piercing) =>
          model.model_piercings.map(model_piercing => model_piercing.piercing_id).includes(piercing)) : true) &&
        (languages.length > 0 && Array.isArray(languages) ? languages.every((language) =>
          model.model_languages.map(model_language => model_language.language_id).includes(language)) : true) &&
        (meetingPlaces === undefined ||
          orientations.length === 0 ||
          generalfields.meeting_places && generalfields.meeting_places.find((meetingPlace: IMeetingPlace) => meetingPlace.id === model.meeting_place_id)!
            .meeting_place === "Аппартаменты + Выезд"
          ? true
          : meetingPlaces.includes(model.meeting_place_id)) &&
        (tarifs !== undefined && tarifs.length > 0
          ? tarifs.filter(
            (tarif: number[]) =>
              model.tarifs.map((modelTarif: ITarif) => modelTarif.work_duration_id).includes(tarif[0]) &&
              model.tarifs.find((modelTarif: ITarif) => modelTarif.work_duration_id === tarif[0])!.price >= tarif[1] &&
              model.tarifs.find((modelTarif: ITarif) => modelTarif.work_duration_id === tarif[0])!.price <= tarif[2]
          ).length === tarifs.length
          : true) &&
        (modelTypes !== undefined &&
          modelTypes.length > 0 &&
          modelTypes.includes(modelTypes.length + 1)
          ? calcIsNew(model.create_date)
          : true) &&
        (modelTypes !== undefined &&
          modelTypes.length > 0 &&
          modelTypes.includes(modelTypes.length + 2)
          ? model.is_verified
          : true)


      )
    )

  }, [breastSizes, breastTypes, districts, ethnicGroups, eyesColors, forModerator, generalfields.meeting_places, hairColors, hairSizes, languages, maxAge, maxHeight, maxWeight, meetingPlaces, minAge, minHeight, minWeight, modelTypes, models, nationalities, orientations, piercings, pubisHairs, searchedModel, services, smookers, tarifs, tatoos, trips, undergrounds])





  return (
    <div className={styles.models_wrapper}>
      <div className={styles.toggles}>
        <div
          className={styles.toggle}
          onClick={() => setViewType(viewType === ViewType.ListView ? ViewType.GridView : ViewType.ListView)}
        >
          {viewType === ViewType.GridView ? <Grid /> : <List />}
          {!isMobile && (viewType === ViewType.ListView ? t("global.list_view") : t("global.grid_view"))}
        </div>
        {isMobile && (
          <>
            <div className={styles.toggle} onClick={() => setIsFiltersActive(!isFiltersActive)}>
              <Filter />
              {t("global.filter")}
            </div>
            {isFiltersActive && <button type="button" className={styles.close} onClick={() => { resetContext(), resetMainContext() }}>
              <Close fill="#FFFFFF" />
            </button>}
            {/* {isFiltersSet ? (
              <button type="button" className={styles.close} onClick={() => setFilter(initFilter())}>
                <Close fill="#FFFFFF" />
              </button>
            ) : null} */}
          </>
        )}
      </div>
      <div className={`${styles.models} ${viewType === ViewType.ListView ? styles.list : styles.grid}`}>
        {viewModelList && viewModelList
          .slice((currentPage - 1) * countModelsOnPage, (currentPage - 1) * countModelsOnPage + countModelsOnPage)
          .map((model: IModel) => (
            <HomeModel key={model.id} model={model} viewType={viewType} forModerator={forModerator} filterList={generalfields} />
          ))
        }


      </div>

    </div>
  );
};

export default Models;
