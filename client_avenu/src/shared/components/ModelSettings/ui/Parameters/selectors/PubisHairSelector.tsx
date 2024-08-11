'use client'


import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { IGeneral } from "@/types/core/generalFilters";
import { IPubisHair } from "@/types/core/pubisHair";
import { useTranslations, useLocale } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";

interface IPubisHairSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
  filters: Partial<IGeneral>
}

const PubisHairSelector: React.FC<IPubisHairSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart, filters }) => {
  const t = useTranslations();
  const pubisHairs = filters.pubis_hairs || [];
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();

  const handlerPubisHairOnClick = (pubisHair: IPubisHair) => {
    setModel({ ...model, pubis_hair_id: pubisHair.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.PubisHairSelector ? 'active' : ""
        } ${isCheckStart && model.pubis_hair_id === -1 ? "wrong" : ""}`}
    >
      <div className={'main'}>
        <div className={'label'}>{t("model.pubic_hair")}</div>
        <div
          className={`${'dropdown_button'} ${isCheckStart && model.pubis_hair_id === -1 ? 'wrong' : ""
            }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.PubisHairSelector ? ComponentType.None : ComponentType.PubisHairSelector
            )
          }
        >
          {model.pubis_hair_id === -1
            ? ""
            : locale === "ru"
              ? pubisHairs.find((pubisHair: IPubisHair) => pubisHair.id === model.pubis_hair_id)?.pubis_hair
              : pubisHairs.find((pubisHair: IPubisHair) => pubisHair.id === model.pubis_hair_id)?.pubis_hair_eng}
          {activeComponent === ComponentType.PubisHairSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={'required'}>*</div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.PubisHairSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {pubisHairs.map((pubisHair: IPubisHair) => (
            <div key={pubisHair.id} className={'dropdown_item'} onClick={() => handlerPubisHairOnClick(pubisHair)}>
              {locale === "ru" ? pubisHair.pubis_hair : pubisHair.pubis_hair_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PubisHairSelector;
