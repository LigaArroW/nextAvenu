'use client';




import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { IEthnicGroup } from "@/types/core/ethnicGroup";
import { IGeneral } from "@/types/core/generalFilters";
import { useTranslations, useLocale } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";
import { ComponentType } from "../ComponentType";

interface IEthnicGroupSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
  filters: Partial<IGeneral>
}

const EthnicGroupSelector: React.FC<IEthnicGroupSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart, filters }) => {
  const t = useTranslations();
  const ethnicGroups = filters.ethnic_groups || [];
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();




  const handlerEthnicGroupOnClick = (ethnicGroup: IEthnicGroup) => {
    setModel({ ...model, ethnic_group_id: ethnicGroup.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.EthnicGroupSelector ? 'active' : ""
        } ${isCheckStart && model.ethnic_group_id === -1 ? "wrong" : ""}`}
    >
      <div className={'main'}>
        <div className={'label'}>{t("model.ethnic_group")}</div>
        <div
          className={`${'dropdown_button'} ${isCheckStart && model.ethnic_group_id === -1 ? 'wrong' : ""
            }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.EthnicGroupSelector ? ComponentType.None : ComponentType.EthnicGroupSelector
            )
          }
        >
          {model.ethnic_group_id === -1
            ? ""
            : locale === "ru"
              ? ethnicGroups.find((ethnicGroup: IEthnicGroup) => ethnicGroup.id === model.ethnic_group_id)?.ethnic_group
              : ethnicGroups.find((ethnicGroup: IEthnicGroup) => ethnicGroup.id === model.ethnic_group_id)?.ethnic_group_eng}
          {activeComponent === ComponentType.EthnicGroupSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={'required'}>*</div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.EthnicGroupSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {ethnicGroups.map((ethnicGroup: IEthnicGroup) => (
            <div key={ethnicGroup.id} className={'dropdown_item'} onClick={() => handlerEthnicGroupOnClick(ethnicGroup)}>
              {locale === "ru" ? ethnicGroup.ethnic_group : ethnicGroup.ethnic_group_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EthnicGroupSelector;
