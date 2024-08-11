'use client'
import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { ComponentType } from "../ComponentType";
import { IGeneral } from "@/types/core/generalFilters";
import { IOrientation } from "@/types/core/orientation";
import { useLocale, useTranslations } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";
import { useState } from "react";

interface IOrientationSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
  filters: Partial<IGeneral>
}

const OrientationSelector: React.FC<IOrientationSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart, filters }) => {
  const t = useTranslations();
  const orientations = filters.orientations || [];
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();


  const handlerOrientationOnClick = (orientation: IOrientation) => {
    setModel({ ...model, orientation_id: orientation.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.OrientationSelector ? 'active' : ""
        } ${isCheckStart && model.orientation_id === -1 ? "wrong" : ""}`}
    >
      <div className={'main'}>
        <div className={'label'}>{t("model.orientation")}</div>
        <div
          className={`${'dropdown_button'} ${isCheckStart && model.orientation_id === -1 ? 'wrong' : ""
            }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.OrientationSelector ? ComponentType.None : ComponentType.OrientationSelector
            )
          }
        >
          {model.orientation_id === -1
            ? ""
            : locale === "ru"
              ? orientations.find((orientation: IOrientation) => orientation.id === model.orientation_id)?.orientation
              : orientations.find((orientation: IOrientation) => orientation.id === model.orientation_id)?.orientation_eng}
          {activeComponent === ComponentType.OrientationSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={'required'}>*</div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.OrientationSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {orientations.map((orientation: IOrientation) => (
            <div key={orientation.id} className={'dropdown_item'} onClick={() => handlerOrientationOnClick(orientation)}>
              {locale === "ru" ? orientation.orientation : orientation.orientation_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrientationSelector;
