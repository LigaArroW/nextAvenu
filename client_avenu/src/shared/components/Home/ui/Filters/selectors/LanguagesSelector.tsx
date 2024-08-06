'use client'

import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";

import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { Check } from "@/shared/assets/Check";
import { useLocale, useTranslations } from "next-intl";
import { IGeneral } from "@/types/core/generalFilters";
import { ILanguage } from "@/types/model/language/language";
import { useHomeContext } from "../../Context/HomeProvider";

interface ILanguagesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  filters: Partial<IGeneral>
}

const LanguagesSelector: React.FC<ILanguagesSelectorProps> = ({ activeComponent, setActiveComponent, filters }) => {
  const { languages, setLanguages } = useHomeContext()
  const t = useTranslations();

  const locale = useLocale();



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
        {languages.length > 0 ? <div className={styles.group_count}>{languages.length}</div> : null}
      </div>
      <div className={styles.filters_list}>
        {activeComponent === ComponentType.LanguagesSelector &&
          filters.languages && filters.languages.map((language: ILanguage) => (
            <div key={language.id} className={styles.filter_item}>
              <label className={'checkbox'}>
                <input type="checkbox" />
                <span
                  className={`${'checkbox_mark'} ${languages.includes(language.id) ? 'active' : ""
                    }`}
                  aria-hidden="true"
                  onClick={() => {

                    if (languages.includes(language.id)) {
                      return setLanguages(languages.filter((item) => item !== language.id));
                    }
                    setLanguages([...languages, language.id]);

                  }}
                >
                  {languages.includes(language.id) ? (
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
