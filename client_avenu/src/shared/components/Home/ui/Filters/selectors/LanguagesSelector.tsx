'use client'

import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";

import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { Check } from "@/shared/assets/Check";
import { useLocale, useTranslations } from "next-intl";
import { IGeneral } from "@/types/core/generalFilters";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import { ILanguage } from "@/types/model/language/language";

interface ILanguagesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  handleSearch: (search: string, value: string) => void;
  filters: Partial<IGeneral>
}

const LanguagesSelector: React.FC<ILanguagesSelectorProps> = ({ activeComponent, setActiveComponent, filters, handleSearch }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const filter = queryString.parse(searchParams.toString());


  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.LanguagesSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.LanguagesSelector ? ComponentType.None : ComponentType.LanguagesSelector
          )
        }
      >
        {t("model.languages")}
        {activeComponent === ComponentType.LanguagesSelector ? <ArrowUp /> : <ArrowDown fill="#1B1B1B" />}
        {filter.languages && filter.languages.length > 0 ? <div className={styles.group_count}>{filter.languages.length}</div> : null}
      </div>
      <div className={styles.filters_list}>
        {activeComponent === ComponentType.LanguagesSelector &&
          filters.languages && filters.languages.map((language: ILanguage) => (
            <div key={language.id} className={styles.filter_item}>
              <label className={'checkbox'}>
                <input type="checkbox" />
                <span
                  className={`${'checkbox_mark'} ${(filter['languages'] === language.id.toString() || filter['languages']?.includes(language.id.toString())) ? 'active' : ""
                    }`}
                  aria-hidden="true"
                  onClick={() => {

                    handleSearch('languages', language.id.toString())
                  }}
                >
                  {(filter['languages'] === language.id.toString() || filter['languages']?.includes(language.id.toString())) ? (
                    <Check fill="#98042D" />
                  ) : null}
                </span>
                <div className={'text'}>
                  {locale === "ru" ? language.language : language.language_eng}
                </div>
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LanguagesSelector;
