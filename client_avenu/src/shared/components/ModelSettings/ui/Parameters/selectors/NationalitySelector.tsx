'use client'


import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { IGeneral } from "@/types/core/generalFilters";
import { INationality } from "@/types/core/nationality";
import { useTranslations, useLocale } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";

interface INationalitySelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
  filters: Partial<IGeneral>
}

const NationalitySelector: React.FC<INationalitySelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart, filters }) => {
  const t = useTranslations();
  const nationalities = filters.nationalities || [];
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();

  const handlerNationalityOnClick = (nationality: INationality) => {
    setModel({ ...model, nationality_id: nationality.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.NationalitySelector ? 'active' : ""
        } ${isCheckStart && model.nationality_id === -1 ? "wrong" : ""}`}
    >
      <div className={'main'}>
        <div className={'label'}>{t("model.nationality")}</div>
        <div
          className={`${'dropdown_button'} ${isCheckStart && model.nationality_id === -1 ? 'wrong' : ""
            }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.NationalitySelector ? ComponentType.None : ComponentType.NationalitySelector
            )
          }
        >
          {model.nationality_id === -1
            ? ""
            : locale === "ru"
              ? nationalities.find((nationality: INationality) => nationality.id === model.nationality_id)?.nationality
              : nationalities.find((nationality: INationality) => nationality.id === model.nationality_id)?.nationality_eng}
          {activeComponent === ComponentType.NationalitySelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={'required'}>*</div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.NationalitySelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {nationalities.map((nationality: INationality) => (
            <div key={nationality.id} className={'dropdown_item'} onClick={() => handlerNationalityOnClick(nationality)}>
              {locale === "ru" ? nationality.nationality : nationality.nationality_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NationalitySelector;
