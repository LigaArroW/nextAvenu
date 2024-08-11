'use client';



import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { IGeneral } from "@/types/core/generalFilters";
import { useLocale, useTranslations } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";

interface IAgeSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
  filters: Partial<IGeneral>
}

const AgeSelector: React.FC<IAgeSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart, filters }) => {
  const t = useTranslations();
  const { model, setModel } = useNewModelContext();



  const handlerAgeOnClick = (age: number) => {
    setModel({ ...model, age });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.AgeSelector ? 'active' : ""} ${isCheckStart && model.age === 0 ? "wrong" : ""
        }`}
    >
      <div className={'main'}>
        <div className={'label'}>{t("model.age")}</div>
        <div
          className={`${'dropdown_button'} ${isCheckStart && model.age === 0 ? 'wrong' : ""}`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.AgeSelector ? ComponentType.None : ComponentType.AgeSelector
            )
          }
        >
          {model.age === 0 ? "" : model.age}
          {activeComponent === ComponentType.AgeSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={'required'}>*</div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.AgeSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {Array(48)
            .fill(1)
            .map((_value, index: number) => (
              <div key={index} className={'dropdown_item'} onClick={() => handlerAgeOnClick(index + 18)}>
                {index + 18}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AgeSelector;
