'use client'



import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { IGeneral } from "@/types/core/generalFilters";
import { useLocale, useTranslations } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";

interface IHeightSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
  filters: Partial<IGeneral>
}

const HeightSelector: React.FC<IHeightSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart, filters }) => {
  const t = useTranslations();
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();



  const handlerHeightOnClick = (height: number) => {
    setModel({ ...model, height });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.HeightSelector ? 'active' : ""} ${isCheckStart && model.height === 0 ? "wrong" : ""
        }`}
    >
      <div className={'main'}>
        <div className={'label'}>
          {t("model.height")} ({t("model.cm")})
        </div>
        <div
          className={`${'dropdown_button'} ${isCheckStart && model.height === 0 ? 'wrong' : ""}`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.HeightSelector ? ComponentType.None : ComponentType.HeightSelector
            )
          }
        >
          {model.height === 0 ? "" : model.height}
          {activeComponent === ComponentType.HeightSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={'required'}>*</div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.HeightSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {Array(71)
            .fill(1)
            .map((_value, index: number) => (
              <div key={index} className={'dropdown_item'} onClick={() => handlerHeightOnClick(index + 150)}>
                {index + 150}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HeightSelector;
