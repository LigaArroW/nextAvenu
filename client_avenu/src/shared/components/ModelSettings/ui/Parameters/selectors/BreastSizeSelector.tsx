'use client'

import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { IBreastSize } from "@/types/core/breastSize";
import { IGeneral } from "@/types/core/generalFilters";
import { useTranslations, useLocale } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";

interface IBreastSizeSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
  filters: Partial<IGeneral>
}

const BreastSizeSelector: React.FC<IBreastSizeSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart, filters }) => {
  const t = useTranslations();
  const breastSizes = filters.breast_sizes || [];
  const { model, setModel } = useNewModelContext();

  const handlerBreastSizeOnClick = (breastSize: IBreastSize) => {
    setModel({ ...model, breast_size_id: breastSize.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.BreastSizeSelector ? 'active' : ""
        } ${isCheckStart && model.breast_size_id === -1 ? "wrong" : ""}`}
    >
      <div className={'main'}>
        <div className={'label'}>{t("model.breast_size")}</div>
        <div
          className={`${'dropdown_button'} ${isCheckStart && model.breast_size_id === -1 ? 'wrong' : ""
            }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.BreastSizeSelector ? ComponentType.None : ComponentType.BreastSizeSelector
            )
          }
        >
          {model.breast_size_id === -1
            ? ""
            : breastSizes.find((breastSize: IBreastSize) => breastSize.id === model.breast_size_id)?.breast_size}
          {activeComponent === ComponentType.BreastSizeSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={'required'}>*</div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.BreastSizeSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {breastSizes.map((breastSize: IBreastSize) => (
            <div key={breastSize.id} className={'dropdown_item'} onClick={() => handlerBreastSizeOnClick(breastSize)}>
              {breastSize.breast_size}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreastSizeSelector;
