'use client'

import styles from "./Models.module.sass";

// import HomeModel from "../../../components/HomeModel/HomeModel";

import { ViewType } from "./ViewType";

// import { IModel } from "../../../types/model/model/model";
// import { initFilter } from "../../../types/model/filter/initFilter";
// import { IModelService } from "../../../types/model/modelService/modelService";
// import { IModelPiercing } from "../../../types/model/piercing/modelPiercing";
// import { IMeetingPlace } from "../../../types/core/meetingPlace";
// import { ITarif } from "../../../types/model/tarif/tarif";
// import { IModelLanguage } from "../../../types/model/language/modelLanguage";

import { Filter } from "../../../assets/Filter";
import { Grid } from "../../../assets/Grid";
import { List } from "../../../assets/List";
import { Close } from "../../../assets/Close";
import { useTranslations } from "next-intl";
import { useMedia } from "react-use";
import { useState } from "react";
import { initFilter } from "@/types/model/filter/initFilter";

interface IModelsProps {
  // isFiltersActive: boolean;
  // setIsFiltersActive: React.Dispatch<React.SetStateAction<boolean>>;
  forModerator: boolean;
}

const Models: React.FC<IModelsProps> = ({forModerator}) => {
  const [viewType, setViewType] = useState(ViewType.ListView);
  const t = useTranslations()


  

  const isMobile = useMedia("(max-width: 1200px)");



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
            {isFiltersSet ? (
              <button type="button" className={styles.close} onClick={() => setFilter(initFilter())}>
                <Close fill="#FFFFFF" />
              </button>
            ) : null}
          </>
        )}
      </div>


    </div>
  );
};

export default Models;
