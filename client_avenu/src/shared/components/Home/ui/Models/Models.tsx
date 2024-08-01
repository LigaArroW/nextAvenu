'use client'

import styles from "./Models.module.sass";

// import HomeModel from "../../../components/HomeModel/HomeModel";

import { ViewType } from "../ViewType";

// import { IModel } from "../../../types/model/model/model";
// import { initFilter } from "../../../types/model/filter/initFilter";
// import { IModelService } from "../../../types/model/modelService/modelService";
// import { IModelPiercing } from "../../../types/model/piercing/modelPiercing";
// import { IMeetingPlace } from "../../../types/core/meetingPlace";
// import { ITarif } from "../../../types/model/tarif/tarif";
// import { IModelLanguage } from "../../../types/model/language/modelLanguage";

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

interface IModelsProps {
  // isFiltersActive: boolean;
  // setIsFiltersActive: React.Dispatch<React.SetStateAction<boolean>>;
  forModerator: boolean;
  models: IModel[]
  generalfields: Partial<IGeneral>
}

const Models: React.FC<IModelsProps> = ({ forModerator, models, generalfields }) => {
  const [viewType, setViewType] = useState(ViewType.ListView);
  const t = useTranslations()
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMedia("(max-width: 1200px)");
  const [viewModelList, setViewModelList] = useState<IModel[]>([]);
  const [isFiltersActive, setIsFiltersActive] = useState(false);
  const SeachFilter: Partial<ISearchFilter> = useSearchFilter();
  const countModelsOnPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const newViewType = searchParams.get("viewType");
    if (newViewType) {
      const existingSearchParams = new URLSearchParams(window.location.search);
      existingSearchParams.set("viewType", viewType.toString());
      const updatedSearchQuery = existingSearchParams.toString();
      const updatedPathname = `${pathname}?${updatedSearchQuery}`;
      router.replace(updatedPathname);
    } else {
      router.replace(pathname + '?viewType=' + viewType.toString());
    }

  }, [pathname, router, searchParams, viewType])

  useEffect(() => {

    setViewModelList(
      models.filter((model: IModel) =>
        (forModerator ? true : model.is_enable_by_moderator) &&
        (forModerator ? true : model.photos.length && model.photos.length > 0) &&
        (forModerator ? true : model.is_enable_by_moderator) &&
        model.name.toLowerCase().startsWith(SeachFilter.searchedModel?.toLowerCase() || "") &&
        model.age >= (SeachFilter.minAge ? Number(SeachFilter?.minAge) : 18) &&
        model.age <= (SeachFilter.maxAge ? Number(SeachFilter?.maxAge) : 60) &&
        model.weight >= (SeachFilter.minWeight ? Number(SeachFilter.minWeight) : 40) &&
        model.weight <= (SeachFilter.maxWeight ? Number(SeachFilter.maxWeight) : 125) &&
        model.height >= (SeachFilter.minHeight ? Number(SeachFilter.minHeight) : 150) &&
        model.height <= (SeachFilter.maxHeight ? Number(SeachFilter.maxHeight) : 220) &&
        (SeachFilter.districts && SeachFilter.districts.length > 0 ? SeachFilter.districts?.includes(model.district_id.toString()) : true) &&
        (SeachFilter.undergrounds && SeachFilter.undergrounds.length > 0 ? SeachFilter.undergrounds?.includes(model.underground_id.toString()) : true) &&
        (SeachFilter.modelTypes && SeachFilter.modelTypes.length > 0 ? SeachFilter.modelTypes?.includes(model.type_id.toString()) : true) &&
        (SeachFilter.hairColors && SeachFilter.hairColors.length > 0 ? SeachFilter.hairColors?.includes(model.hair_color_id.toString()) : true) &&
        (SeachFilter.hairSizes && SeachFilter.hairSizes.length > 0 ? SeachFilter.hairSizes?.includes(model.hair_size_id.toString()) : true) &&
        (SeachFilter.pubisHairs && SeachFilter.pubisHairs.length > 0 ? SeachFilter.pubisHairs?.includes(model.pubis_hair_id.toString()) : true) &&
        (SeachFilter.breastSizes && SeachFilter.breastSizes.length > 0 ? SeachFilter.breastSizes?.includes(model.breast_size_id.toString()) : true) &&
        (SeachFilter.breastTypes && SeachFilter.breastTypes.length > 0 ? SeachFilter.breastTypes?.includes(model.breast_type_id.toString()) : true) &&
        (SeachFilter.trips && SeachFilter.trips.length > 0 ? SeachFilter.trips?.includes(model.trip_id.toString()) : true) &&
        (SeachFilter.ethnicGroups && SeachFilter.ethnicGroups.length > 0 ? SeachFilter.ethnicGroups?.includes(model.ethnic_group_id.toString()) : true) &&
        (SeachFilter.nationalities && SeachFilter.nationalities.length > 0 ? SeachFilter.nationalities?.includes(model.nationality_id.toString()) : true) &&
        (SeachFilter.smookers && SeachFilter.smookers.length > 0 ? SeachFilter.smookers?.includes(model.smooker_id.toString()) : true) &&
        (SeachFilter.tatoos && SeachFilter.tatoos.length > 0 ? SeachFilter.tatoos?.includes(model.tatoo_id.toString()) : true) &&
        (SeachFilter.eyesColors && SeachFilter.eyesColors.length > 0 ? SeachFilter.eyesColors?.includes(model.eyes_color_id.toString()) : true) &&
        (SeachFilter.orientations && SeachFilter.orientations.length > 0 ? SeachFilter.orientations?.includes(model.orientation_id.toString()) : true) &&
        (SeachFilter.services && SeachFilter.services.length > 0 && Array.isArray(SeachFilter.services) ? SeachFilter.services.every((service) =>
          model.model_services.map(model_service => model_service.service_id.toString()).includes(service)) : true) &&
        (SeachFilter.piercings && SeachFilter.piercings.length > 0 && Array.isArray(SeachFilter.piercings) ? SeachFilter.piercings.every((piercing) =>
          model.model_piercings.map(model_piercing => model_piercing.piercing_id.toString()).includes(piercing)) : true) &&
        (SeachFilter.languages && SeachFilter.languages.length > 0 && Array.isArray(SeachFilter.languages) ? SeachFilter.languages.every((language) =>
          model.model_languages.map(model_language => model_language.language_id.toString()).includes(language)) : true) &&
        (SeachFilter.meetingPlaces === undefined || SeachFilter.orientations?.length === 0 ||
          (generalfields.meeting_places && generalfields.meeting_places.find((meetingPlace) => meetingPlace.id === model.meeting_place_id))!
            .meeting_place === 'Аппартаменты + Выезд'
          ? true
          : SeachFilter.meetingPlaces.includes(model.meeting_place_id.toString())) &&
        (SeachFilter.modelTypes !== undefined && SeachFilter.modelTypes.length > 0 && SeachFilter.modelTypes.includes(model.type_id.toString()) ? calcIsNew(model.create_date) : true)


      )
    )

  }, [searchParams])

  const calcIsNew = (create_date: Date) => {
    var now = new Date();
    var createDate = new Date(create_date);
    var difference = Math.abs(now.getTime() - createDate.getTime()) / (1000 * 60 * 60 * 24);
    return difference <= 7;
  };
  
  

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
            <button type="button" className={styles.close} onClick={() => router.replace(pathname)}>
              <Close fill="#FFFFFF" />
            </button>
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
