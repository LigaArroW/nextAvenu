'use client'

import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";


import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { Check } from "@/shared/assets/Check";
import { useLocale, useTranslations } from "next-intl";
import { IGeneral } from "@/types/core/generalFilters";
import { IEthnicGroup } from "@/types/core/ethnicGroup";
import { INationality } from "@/types/core/nationality";
import { useHomeContext } from "../../Context/HomeProvider";

interface IEthnicGroupsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  filters: Partial<IGeneral>
}

const EthnicGroupsSelector: React.FC<IEthnicGroupsSelectorProps> = ({ activeComponent, setActiveComponent, filters }) => {
  const { ethnicGroups, nationalities, setEthnicGroups, setNationalities } = useHomeContext()
  const t = useTranslations();
  const locale = useLocale();


  return (
    <div
      className={`${styles.filters_group} ${activeComponent === ComponentType.EthnicGroupsSelector ? styles.active : ""}`}
    >
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.EthnicGroupsSelector ? ComponentType.None : ComponentType.EthnicGroupsSelector
          )
        }
      >
        {`${t("model.ethnic_group")}/${t("model.nationality")}`}
        {activeComponent === ComponentType.EthnicGroupsSelector ? <ArrowUp /> : <ArrowDown fill="#1B1B1B" />}
        {(ethnicGroups.length + nationalities.length) > 0 ? (
          <div className={styles.group_count}>{ethnicGroups.length + nationalities.length}</div>
        ) : null}
      </div>
      <div className={styles.filters_list}>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.ethnic_group")}</div>
          <div className={styles.filters_list}>
            {activeComponent === ComponentType.EthnicGroupsSelector &&
              filters.ethnic_groups && filters.ethnic_groups.map((ethnicGroup: IEthnicGroup) => (
                <div key={ethnicGroup.id} className={styles.filter_item}>
                  <label className={'checkbox'}>
                    <input type="checkbox" />
                    <span
                      className={`${'checkbox_mark'} ${ethnicGroups.includes(ethnicGroup.id)
                        ? 'active'
                        : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (ethnicGroups.includes(ethnicGroup.id)) {
                          return setEthnicGroups(ethnicGroups.filter((item) => item !== ethnicGroup.id))
                        }
                        setEthnicGroups([...ethnicGroups, ethnicGroup.id])


                      }}
                    >
                      {ethnicGroups.includes(ethnicGroup.id) ? (
                        <Check fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={'text'}>
                      {locale === "ru" ? ethnicGroup.ethnic_group : ethnicGroup.ethnic_group_eng}
                    </div>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.nationality")}</div>
          <div className={styles.filters_list}>
            {activeComponent === ComponentType.EthnicGroupsSelector &&
              filters.nationalities && filters.nationalities.map((nationality: INationality) => (
                <div key={nationality.id} className={styles.filter_item}>
                  <label className={'checkbox'}>
                    <input type="checkbox" />
                    <span
                      className={`${'checkbox_mark'} ${nationalities.includes(nationality.id)
                        ? 'active'
                        : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (nationalities.includes(nationality.id)) {
                          return setNationalities(nationalities.filter((item) => item !== nationality.id))
                        }
                        setNationalities([...nationalities, nationality.id])
                      }}
                    >
                      {nationalities.includes(nationality.id) ? (
                        <Check fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={'text'}>
                      {locale === "ru" ? nationality.nationality : nationality.nationality_eng}
                    </div>
                  </label>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthnicGroupsSelector;
