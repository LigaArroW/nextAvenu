'use client'

import { useLocale, useTranslations } from "next-intl";

import styles from "../Filters.module.sass";


import { Check } from "@/shared/assets/Check";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import { IGeneral } from "@/types/core/generalFilters";
import { IModelType } from "@/types/core/modelType";

interface IModelTypesSelectorProps {
  handleSearch: (search: string, value: string) => void;
  filters: Partial<IGeneral>
}


const ModelTypesSelector: React.FC<IModelTypesSelectorProps> = ({ handleSearch, filters }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const filter = queryString.parse(searchParams.toString());
  

  return (
    <div className={`${styles.filters_group} ${styles.active}`}>
      <div className={styles.filters_list}>
        <div className={styles.filter_item}>
          <label className={
            'checkbox'}>
            <input type="checkbox" />
            <span
              className={`${'checkbox_mark'} ${(filter['modelTypes'] === '7' || filter['modelTypes']?.includes('7'))
                ? 'active'
                : ""
                }`}
              aria-hidden="true"
              onClick={() => {
                
                handleSearch('modelTypes', '7')
              }}
            >

              {(filter['modelTypes'] === '7' || filter['modelTypes']?.includes('7')) ? <Check fill="#98042D" /> : null}
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
              className={`${'checkbox_mark'} ${(filter['modelTypes'] === '8' || filter['modelTypes']?.includes('8'))
                ? 'active'
                : ""
                }`}
              aria-hidden="true"
              onClick={() => {
                
                // if (filter === '8') {
                //   return handleSearch('modelTypes', '', 'delete')
                // }
                // SetSearchParametrs('modelTypes', '1')
                handleSearch('modelTypes', '8')
              }}
            >
              {(filter['modelTypes'] === '8' || filter['modelTypes']?.includes('8')) ? <Check fill="#98042D" /> : null}
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
                className={`${'checkbox_mark'} ${(filter['modelTypes'] === modelType.id.toString() || filter['modelTypes']?.includes(modelType.id.toString())) ?
                  'active' : ""
                  }`}
                aria-hidden="true"
                onClick={() => {
                  
                  handleSearch('modelTypes', modelType.id.toString())
                }}
              >
                {(filter['modelTypes'] === modelType.id.toString() || filter['modelTypes']?.includes(modelType.id.toString())) ? (
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
