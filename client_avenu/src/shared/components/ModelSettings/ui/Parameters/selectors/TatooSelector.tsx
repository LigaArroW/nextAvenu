'use client';


import { IGeneral } from "@/types/core/generalFilters";
import { ITatoo } from "@/types/core/tatoo";
import { useTranslations, useLocale } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";

import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";

interface ITatooSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
  filters: Partial<IGeneral>
}

const TatooSelector: React.FC<ITatooSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart, filters }) => {
  const t = useTranslations();
  const tatoos = filters.tatoos || [];
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();

  const handlerTatooOnClick = (tatoo: ITatoo) => {
    setModel({ ...model, tatoo_id: tatoo.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.TatooSelector ? 'active' : ""} ${isCheckStart && model.tatoo_id === -1 ? "wrong" : ""
        }`}
    >
      <div className={'main'}>
        <div className={'label'}>{t("model.tattoo")}</div>
        <div
          className={`${'dropdown_button'} ${isCheckStart && model.tatoo_id === -1 ? 'wrong' : ""}`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.TatooSelector ? ComponentType.None : ComponentType.TatooSelector
            )
          }
        >
          {model.tatoo_id === -1
            ? ""
            : locale === "ru"
              ? tatoos.find((tatoo: ITatoo) => tatoo.id === model.tatoo_id)?.tatoo
              : tatoos.find((tatoo: ITatoo) => tatoo.id === model.tatoo_id)?.tatoo_eng}
          {activeComponent === ComponentType.TatooSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={'required'}>*</div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.TatooSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {tatoos.map((tatoo: ITatoo) => (
            <div key={tatoo.id} className={'dropdown_item'} onClick={() => handlerTatooOnClick(tatoo)}>
              {locale === "ru" ? tatoo.tatoo : tatoo.tatoo_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TatooSelector;
