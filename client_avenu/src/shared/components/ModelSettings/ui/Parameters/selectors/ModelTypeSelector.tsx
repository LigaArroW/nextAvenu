'use client'

import { IGeneral } from "@/types/core/generalFilters";
import { ComponentType } from "../ComponentType";
import { useLocale, useTranslations } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";
import { IModelType } from "@/types/core/modelType";


interface IModelTypeSelectorProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  filters: Partial<IGeneral>
}

const ModelTypeSelector: React.FC<IModelTypeSelectorProps> = ({ setActiveComponent, filters }) => {
  const t = useTranslations();
  const modelTypes = filters.model_types || [];
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();

  return (
    <div className={'radio_group_container'} onClick={() => setActiveComponent(ComponentType.None)}>
      <div className={'label'}>{t("model.model_type")}</div>
      {modelTypes !== null && modelTypes.length > 0 && (
        <div className={'radio_group'}>
          {modelTypes.map((modelType: IModelType) => (
            <div key={modelType.id} className={'item'}>
              <div
                className={`${'button'} ${modelType.id === model.type_id ? 'active' : ""}`}
                onClick={() => setModel({ ...model, type_id: modelType.id })}
              />
              {locale === "ru" ? modelType.type : modelType.type_eng}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelTypeSelector;
