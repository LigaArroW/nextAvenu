'use client'

import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { IGeneral } from "@/types/core/generalFilters";
import { useTranslations, useLocale } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";

interface IPornstarSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
  filters: Partial<IGeneral>
}

const PornstarSelector: React.FC<IPornstarSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart, filters }) => {
  const t = useTranslations();
  const { model, setModel } = useNewModelContext();

  const handlerPornstarOnClick = (isPornstar: boolean) => {
    setModel({ ...model, is_pornstar: isPornstar ? 1 : 0 });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.PornstarSelector ? 'active' : ""
        } ${isCheckStart && model.is_pornstar === -1 ? "wrong" : ""}`}
    >
      <div className={'main'}>
        <div className={'label'}>{t("model.are_you_pornstar")}</div>
        <div
          className={`${'dropdown_button'} ${isCheckStart && model.is_pornstar === -1 ? 'wrong' : ""}`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.PornstarSelector ? ComponentType.None : ComponentType.PornstarSelector
            )
          }
        >
          {model.is_pornstar === 0 && t("global.no")}
          {model.is_pornstar === 1 && t("global.yes")}
          {activeComponent === ComponentType.PornstarSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={'required'}>*</div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.PornstarSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          <div className={'dropdown_item'} onClick={() => handlerPornstarOnClick(false)}>
            {t("global.no")}
          </div>
          <div className={'dropdown_item'} onClick={() => handlerPornstarOnClick(true)}>
            {t("global.yes")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PornstarSelector;
