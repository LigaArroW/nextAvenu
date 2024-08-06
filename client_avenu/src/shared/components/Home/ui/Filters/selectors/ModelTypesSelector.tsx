'use client'

import { useLocale, useTranslations } from "next-intl";

import styles from "../Filters.module.sass";


import { Check } from "@/shared/assets/Check";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import { IGeneral } from "@/types/core/generalFilters";
import { IModelType } from "@/types/core/modelType";
import { useHomeContext } from "../../Context/HomeProvider";

interface IModelTypesSelectorProps {
  filters: Partial<IGeneral>
}


const ModelTypesSelector: React.FC<IModelTypesSelectorProps> = ({ filters }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const { modelTypes, setModelTypes } = useHomeContext()

  const filter = queryString.parse(searchParams.toString());


  return (
    <div className={`${styles.filters_group} ${styles.active}`}>
      <div className={styles.filters_list}>
        <div className={styles.filter_item}>
          <label className={
            'checkbox'}>
            <input type="checkbox" />
            <span
              className={`${'checkbox_mark'} ${(modelTypes.includes(7))
                ? 'active'
                : ""
                }`}
              aria-hidden="true"
              onClick={() => {
                if (modelTypes.includes(7)) {
                  return setModelTypes(prev => prev.filter(el => el !== 7))
                }
                setModelTypes(prev => [...prev, 7])
                // handleSearch('modelTypes', '7')
              }}
            >

              {(modelTypes.includes(7)) ? <Check fill="#98042D" /> : null}
            </span>
            <div className={
              'text'}>{t("navigation.new")}</div>
          </label>
        </div>

        <div className={styles.filter_item}>
          <label className={
            'checkbox'}>
            <input type="checkbox" />
            <span
              className={`${'checkbox_mark'} ${(modelTypes.includes(8))
                ? 'active'
                : ""
                }`}
              aria-hidden="true"
              onClick={() => {

                if (modelTypes.includes(8)) {
                  return setModelTypes(prev => prev.filter(el => el !== 8))
                }
                setModelTypes(prev => [...prev, 8])
              }}
            >
              {(modelTypes.includes(8)) ? <Check fill="#98042D" /> : null}
            </span>
            <div className={
              'text'}>{t("navigation.verified")}</div>
          </label>
        </div>
        {filters.model_types && filters.model_types.map((modelType: IModelType) => (
          <div key={modelType.id} className={styles.filter_item}>
            <label className={
              'checkbox'}>
              <input type="checkbox" />
              <span
                className={`${'checkbox_mark'}
                 ${(modelTypes.includes(modelType.id))
                    ?
                    'active' : ""
                  }`}
                aria-hidden="true"
                onClick={() => {
                  if (modelTypes.includes(modelType.id)) {
                    return setModelTypes(prev => prev.filter(el => el !== modelType.id))
                  }
                  setModelTypes(prev => [...prev, modelType.id])
                }}
              >
                {(modelTypes.includes(modelType.id)) ? (
                  <Check fill="#98042D" />
                ) : null}
              </span>
              <div className={
                'text'}>{locale === "ru" ? modelType.type : modelType.type_eng}</div>
            </label>
          </div>
        ))

        }
      </div>
    </div>
  );
};

export default ModelTypesSelector;
