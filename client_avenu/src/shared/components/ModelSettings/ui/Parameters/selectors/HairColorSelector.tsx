'use client'

import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { IGeneral } from "@/types/core/generalFilters";
import { useLocale, useTranslations } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";
import { IHairColor } from "@/types/core/hairColor";

interface IHairColorSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
  filters: Partial<IGeneral>
}

const HairColorSelector: React.FC<IHairColorSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart, filters }) => {
  const t = useTranslations();
  const hairColors = filters.hair_colors || [];
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();


  const handlerHairColorOnClick = (hairColor: IHairColor) => {
    setModel({ ...model, hair_color_id: hairColor.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.HairColorSelector ? 'active' : ""
        } ${isCheckStart && model.hair_color_id === -1 ? "wrong" : ""}`}
    >
      <div className={'main'}>
        <div className={'label'}>{t("model.hair_color")}</div>
        <div
          className={`${'dropdown_button'} ${isCheckStart && model.hair_color_id === -1 ? 'wrong' : ""
            }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.HairColorSelector ? ComponentType.None : ComponentType.HairColorSelector
            )
          }
        >
          {model.hair_color_id === -1
            ? ""
            : locale === "ru"
              ? hairColors.find((hairColor: IHairColor) => hairColor.id === model.hair_color_id)?.hair_color
              : hairColors.find((hairColor: IHairColor) => hairColor.id === model.hair_color_id)?.hair_color_eng}
          {activeComponent === ComponentType.HairColorSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={'required'}>*</div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.HairColorSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {hairColors.map((hairColor: IHairColor) => (
            <div key={hairColor.id} className={'dropdown_item'} onClick={() => handlerHairColorOnClick(hairColor)}>
              {locale === "ru" ? hairColor.hair_color : hairColor.hair_color_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HairColorSelector;
