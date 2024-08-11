'use client'

import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { IGeneral } from "@/types/core/generalFilters";
import { useTranslations, useLocale } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";

interface IWeightSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
  filters: Partial<IGeneral>
}

const WeightSelector: React.FC<IWeightSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart, filters }) => {
  const t = useTranslations();
  const { model, setModel } = useNewModelContext();



  const handlerWeightOnClick = (weight: number) => {
    setModel({ ...model, weight });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.WeightSelector ? 'active' : ""} ${isCheckStart && model.weight === 0 ? "wrong" : ""
        }`}
    >
      <div className={'main'}>
        <div className={'label'}>
          {t("model.weight")} ({t("model.kg")})
        </div>
        <div
          className={`${'dropdown_button'} ${isCheckStart && model.weight === 0 ? 'wrong' : ""}`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.WeightSelector ? ComponentType.None : ComponentType.WeightSelector
            )
          }
        >
          {model.weight === 0 ? "" : model.weight}
          {activeComponent === ComponentType.WeightSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={'required'}>*</div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.WeightSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {Array(86)
            .fill(1)
            .map((_value, index: number) => (
              <div key={index} className={'dropdown_item'} onClick={() => handlerWeightOnClick(index + 40)}>
                {index + 40}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WeightSelector;
