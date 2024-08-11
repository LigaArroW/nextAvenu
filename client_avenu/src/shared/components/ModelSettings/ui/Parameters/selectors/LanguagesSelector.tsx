'use client'

import { ComponentType } from "../ComponentType";


import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { Check as CheckIcon } from "@/shared/assets/Check";
import { IGeneral } from "@/types/core/generalFilters";
import { useLocale, useTranslations } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";
import { ILanguage } from "@/types/model/language/language";
import { IModelLanguage } from "@/types/model/language/modelLanguage";

interface ILanguagesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  filters: Partial<IGeneral>
}

const LanguagesSelector: React.FC<ILanguagesSelectorProps> = ({ activeComponent, setActiveComponent, filters }) => {
  const t = useTranslations();
  const languages = filters.languages || [];
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();

  const handlerlanguageOnClick = (language: ILanguage) => {
    if (
      model.model_languages.filter((modelLanguage: IModelLanguage) => modelLanguage.language_id === language.id).length > 0
    ) {
      setModel({
        ...model,
        model_languages: model.model_languages.filter(
          (modelLanguage: IModelLanguage) => modelLanguage.language_id !== language.id
        ),
      });
    } else {
      setModel({
        ...model,
        model_languages: [...model.model_languages, { language_id: language.id, model_id: model.id } as IModelLanguage],
      });
    }
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.languagesSelector ? 'active' : ""
        }`}
    >
      <div className={'main'}>
        <div className={'label'}>{t("model.languages")}</div>
        <div
          className={'dropdown_button'}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.languagesSelector ? ComponentType.None : ComponentType.languagesSelector
            )
          }
        >
          {model.model_languages.length === 0
            ? t("global.not_selected")
            : `${t("global.selected")}: ` + model.model_languages.length}
          {activeComponent === ComponentType.languagesSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
      </div>

      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.languagesSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {languages.map((language: ILanguage) => (
            <label key={language.id} className={'checkbox'}>
              <input type="checkbox" />
              <span
                className={`${'checkbox_mark'} ${model.model_languages.filter((modelLanguage: IModelLanguage) => modelLanguage.language_id === language.id)
                  .length > 0
                  ? 'active'
                  : ""
                  }`}
                aria-hidden="true"
                onClick={() => handlerlanguageOnClick(language)}
              >
                {model.model_languages.filter((modelLanguage: IModelLanguage) => modelLanguage.language_id === language.id)
                  .length > 0 ? (
                  <CheckIcon fill="#98042D" />
                ) : null}
              </span>
              <div className={'text'}>
                {locale === "ru" ? language.language : language.language_eng}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguagesSelector;
