'use client'


import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { IBreastType } from "@/types/core/breastType";
import { IGeneral } from "@/types/core/generalFilters";
import { useTranslations, useLocale } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";

interface IBreastTypeSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
  filters: Partial<IGeneral>
}

const BreastTypeSelector: React.FC<IBreastTypeSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart, filters }) => {
  const t = useTranslations();
  const breastTypes = filters.breast_types || [];
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();

  const handlerBreastTypeOnClick = (breastType: IBreastType) => {
    setModel({ ...model, breast_type_id: breastType.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.BreastTypeSelector ? 'active' : ""
        } ${isCheckStart && model.breast_type_id === -1 ? "wrong" : ""}`}
    >
      <div className={'main'}>
        <div className={'label'}>{t("model.breast_type")}</div>
        <div
          className={`${'dropdown_button'} ${isCheckStart && model.breast_type_id === -1 ? 'wrong' : ""
            }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.BreastTypeSelector ? ComponentType.None : ComponentType.BreastTypeSelector
            )
          }
        >
          {model.breast_type_id === -1
            ? ""
            : locale === "ru"
              ? breastTypes.find((breastType: IBreastType) => breastType.id === model.breast_type_id)?.breast_type
              : breastTypes.find((breastType: IBreastType) => breastType.id === model.breast_type_id)?.breast_type_eng}
          {activeComponent === ComponentType.BreastTypeSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={'required'}>*</div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.BreastTypeSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {breastTypes.map((breastType: IBreastType) => (
            <div key={breastType.id} className={'dropdown_item'} onClick={() => handlerBreastTypeOnClick(breastType)}>
              {locale === "ru" ? breastType.breast_type : breastType.breast_type_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreastTypeSelector;
