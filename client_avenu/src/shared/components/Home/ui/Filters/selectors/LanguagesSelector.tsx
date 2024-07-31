'use client'

import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";

import { ArrowDown  } from "@/shared/assets/ArrowDown";
import { ArrowUp  } from "@/shared/assets/ArrowUp";
import { Check  } from "@/shared/assets/Check";
import { useTranslations } from "next-intl";

interface ILanguagesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const LanguagesSelector: React.FC<ILanguagesSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const t = useTranslations();


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
        {/* {filter.languages.length > 0 ? <div className={styles.group_count}>{filter.languages.length}</div> : null} */}
      </div>
      <div className={styles.filters_list}>
        {/* {activeComponent === ComponentType.LanguagesSelector &&
          languages.map((language: ILanguage) => (
            <div className={styles.filter_item}>
              <label className={'checkbox'}>
                <input type="checkbox" />
                <span
                  className={`${'checkbox_mark'} ${filter.languages.filter((item: number) => item === language.id).length > 0 ? 'active' : ""
                    }`}
                  aria-hidden="true"
                  onClick={() => {
                    if (filter.languages.filter((item: number) => item === language.id).length > 0) {
                      setFilter({
                        ...filter,
                        languages: filter.languages.filter((item: number) => item !== language.id),
                      });
                    } else {
                      setFilter({
                        ...filter,
                        languages: [...filter.languages, language.id],
                      });
                    }
                  }}
                >
                  {filter.languages.filter((item: number) => item === language.id).length > 0 ? (
                    <CheckIcon fill="#98042D" />
                  ) : null}
                </span>
                <div className={'text'}>
                  {i18n.resolvedLanguage === "ru" ? language.language : language.language_eng}
                </div>
              </label>
            </div>
          ))} */}
      </div>
    </div>
  );
};

export default LanguagesSelector;
