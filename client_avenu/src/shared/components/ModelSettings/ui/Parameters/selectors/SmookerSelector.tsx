'use client'


import { ComponentType } from "../ComponentType";


import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { IGeneral } from "@/types/core/generalFilters";
import { ISmooker } from "@/types/core/smooker";
import { useTranslations, useLocale } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";

interface ISmookerSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
  filters: Partial<IGeneral>
}

const SmookerSelector: React.FC<ISmookerSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart, filters }) => {
  const t = useTranslations();
  const smookers = filters.smookers || [];
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();

  const handlerSmookerOnClick = (smooker: ISmooker) => {
    setModel({ ...model, smooker_id: smooker.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.SmookerSelector ? 'active' : ""} ${isCheckStart && model.smooker_id === -1 ? "wrong" : ""
        }`}
    >
      <div className={'main'}>
        <div className={'label'}>{t("model.smoker")}</div>
        <div
          className={`${'dropdown_button'} ${isCheckStart && model.smooker_id === -1 ? 'wrong' : ""}`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.SmookerSelector ? ComponentType.None : ComponentType.SmookerSelector
            )
          }
        >
          {model.smooker_id === -1
            ? ""
            : locale === "ru"
              ? smookers.find((smooker: ISmooker) => smooker.id === model.smooker_id)?.smooker
              : smookers.find((smooker: ISmooker) => smooker.id === model.smooker_id)?.smooker_eng}
          {activeComponent === ComponentType.SmookerSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={'required'}>*</div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.SmookerSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {smookers.map((smooker: ISmooker) => (
            <div key={smooker.id} className={'dropdown_item'} onClick={() => handlerSmookerOnClick(smooker)}>
              {locale === "ru" ? smooker.smooker : smooker.smooker_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmookerSelector;
