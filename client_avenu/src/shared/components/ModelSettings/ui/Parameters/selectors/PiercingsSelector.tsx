'use client'

import i18n from "@/i18n";
import { ComponentType } from "../ComponentType";


import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { Check as CheckIcon } from "@/shared/assets/Check";
import { IGeneral } from "@/types/core/generalFilters";
import { IModelPiercing } from "@/types/model/piercing/modelPiercing";
import { IPiercing } from "@/types/model/piercing/piercing";
import { useTranslations, useLocale } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";

interface IPiercingsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
  filters: Partial<IGeneral>
}

const PiercingsSelector: React.FC<IPiercingsSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart, filters }) => {
  const t = useTranslations();
  const piercings = filters.piercings || [];
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();

  const handlerPiercingOnClick = (piercing: IPiercing) => {
    if (
      model.model_piercings.filter((modelPiercing: IModelPiercing) => modelPiercing.piercing_id === piercing.id).length > 0
    ) {
      setModel({
        ...model,
        model_piercings: model.model_piercings.filter(
          (modelPiercing: IModelPiercing) => modelPiercing.piercing_id !== piercing.id
        ),
      });
    } else {
      if (
        piercing.id === 1 ||
        model.model_piercings.filter((modelPiercing: IModelPiercing) => modelPiercing.piercing_id === 1).length > 0
      ) {
        setModel({
          ...model,
          model_piercings: [{ piercing_id: piercing.id, model_id: model.id } as IModelPiercing],
        });
      } else {
        setModel({
          ...model,
          model_piercings: [...model.model_piercings, { piercing_id: piercing.id, model_id: model.id } as IModelPiercing],
        });
      }
    }
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.PiercingsSelector ? 'active' : ""
        } ${isCheckStart && model.model_piercings.length === 0 ? "wrong" : ""}`}
    >
      <div className={'main'}>
        <div className={'label'}>{t("model.piercing")}</div>
        <div
          className={`${'dropdown_button'} ${isCheckStart && model.model_piercings.length === 0 ? 'wrong' : ""
            }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.PiercingsSelector ? ComponentType.None : ComponentType.PiercingsSelector
            )
          }
        >
          {model.model_piercings.length === 0
            ? t("global.not_selected")
            : `${t("global.selected")}: ` + model.model_piercings.length}
          {activeComponent === ComponentType.PiercingsSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={'required'}>*</div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.PiercingsSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {piercings.map((piercing: IPiercing) => (
            <label key={piercing.id} className={'checkbox'}>
              <input type="checkbox" />
              <span
                className={`${'checkbox_mark'} ${model.model_piercings.filter((modelPiercing: IModelPiercing) => modelPiercing.piercing_id === piercing.id)
                    .length > 0
                    ? 'active'
                    : ""
                  }`}
                aria-hidden="true"
                onClick={() => handlerPiercingOnClick(piercing)}
              >
                {model.model_piercings.filter((modelPiercing: IModelPiercing) => modelPiercing.piercing_id === piercing.id)
                  .length > 0 ? (
                  <CheckIcon fill="#98042D" />
                ) : null}
              </span>
              <div className={'text'}>
                {locale === "ru" ? piercing.piercing : piercing.piercing_eng}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PiercingsSelector;
