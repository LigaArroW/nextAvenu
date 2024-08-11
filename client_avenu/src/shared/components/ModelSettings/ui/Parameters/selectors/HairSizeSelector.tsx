'use client'


import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { IGeneral } from "@/types/core/generalFilters";
import { IHairSize } from "@/types/core/hairSize";
import { useTranslations, useLocale } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";

interface IHairSizeSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
  filters: Partial<IGeneral>
}

const HairSizeSelector: React.FC<IHairSizeSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart, filters }) => {
  const t = useTranslations();
  const hairSizes = filters.hair_sizes || [];
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();

  const handlerHairSizeOnClick = (hairSize: IHairSize) => {
    setModel({ ...model, hair_size_id: hairSize.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.HairSizeSelector ? 'active' : ""
        } ${isCheckStart && model.hair_size_id === -1 ? "wrong" : ""}`}
    >
      <div className={'main'}>
        <div className={'label'}>{t("model.hair_size")}</div>
        <div
          className={`${'dropdown_button'} ${isCheckStart && model.hair_size_id === -1 ? 'wrong' : ""
            }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.HairSizeSelector ? ComponentType.None : ComponentType.HairSizeSelector
            )
          }
        >
          {model.hair_size_id === -1
            ? ""
            : locale === "ru"
              ? hairSizes.find((hairSize: IHairSize) => hairSize.id === model.hair_size_id)?.hair_size
              : hairSizes.find((hairSize: IHairSize) => hairSize.id === model.hair_size_id)?.hair_size_eng}
          {activeComponent === ComponentType.HairSizeSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={'required'}>*</div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.HairSizeSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {hairSizes.map((hairSize: IHairSize) => (
            <div key={hairSize.id} className={'dropdown_item'} onClick={() => handlerHairSizeOnClick(hairSize)}>
              {locale === "ru" ? hairSize.hair_size : hairSize.hair_size_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HairSizeSelector;
