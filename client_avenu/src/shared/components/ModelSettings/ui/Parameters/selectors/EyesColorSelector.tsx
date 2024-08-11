'use client'

import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { IEyesColor } from "@/types/core/eyesColor";
import { IGeneral } from "@/types/core/generalFilters";
import { useTranslations, useLocale } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";

interface IEyesColorSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
  filters: Partial<IGeneral>
}

const EyesColorSelector: React.FC<IEyesColorSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart, filters }) => {
  const t = useTranslations();
  const eyesColors = filters.eyes_colors || [];
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();

  const handlerEyesColorOnClick = (eyesColor: IEyesColor) => {
    setModel({ ...model, eyes_color_id: eyesColor.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.EyesColorSelector ? 'active' : ""
        } ${isCheckStart && model.eyes_color_id === -1 ? "wrong" : ""}`}
    >
      <div className={'main'}>
        <div className={'label'}>{t("model.eyes_color")}</div>
        <div
          className={`${'dropdown_button'} ${isCheckStart && model.eyes_color_id === -1 ? 'wrong' : ""
            }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.EyesColorSelector ? ComponentType.None : ComponentType.EyesColorSelector
            )
          }
        >
          {model.eyes_color_id === -1
            ? ""
            : locale === "ru"
              ? eyesColors.find((eyesColor: IEyesColor) => eyesColor.id === model.eyes_color_id)?.eyes_color
              : eyesColors.find((eyesColor: IEyesColor) => eyesColor.id === model.eyes_color_id)?.eyes_color_eng}
          {activeComponent === ComponentType.EyesColorSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={'required'}>*</div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.EyesColorSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {eyesColors.map((eyesColor: IEyesColor) => (
            <div key={eyesColor.id} className={'dropdown_item'} onClick={() => handlerEyesColorOnClick(eyesColor)}>
              {locale === "ru" ? eyesColor.eyes_color : eyesColor.eyes_color_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EyesColorSelector;
