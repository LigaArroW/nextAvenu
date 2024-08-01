'use client'

import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";


import { ArrowDown } from "@/shared/assets/ArrowDown";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { Check } from "@/shared/assets/Check";
import { useLocale, useTranslations } from "next-intl";
import { IGeneral } from "@/types/core/generalFilters";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import { IEthnicGroup } from "@/types/core/ethnicGroup";
import { INationality } from "@/types/core/nationality";

interface IEthnicGroupsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  handleSearch: (search: string, value: string) => void;
  filters: Partial<IGeneral>
}

const EthnicGroupsSelector: React.FC<IEthnicGroupsSelectorProps> = ({ activeComponent, setActiveComponent, filters, handleSearch }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const locale = useLocale();
  let filter = queryString.parse(searchParams.toString(), {
  });

  filter = typeof filter['ethnicGroups'] === 'string' ? { ethnicGroups: [filter['ethnicGroups']] } : filter
  filter = typeof filter['nationalities'] === 'string' ? { nationalities: [filter['nationalities']] } : filter

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
        {(filter.ethnicGroups ? filter.ethnicGroups.length : 0) + (filter.nationalities ? filter.nationalities.length : 0) > 0 ? (
          <div className={styles.group_count}>{(filter.ethnicGroups ? filter.ethnicGroups.length : 0) + (filter.nationalities ? filter.nationalities.length : 0)}</div>
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
                      className={`${'checkbox_mark'} ${(filter['ethnicGroups'] === ethnicGroup.id.toString() || filter['ethnicGroups']?.includes(ethnicGroup.id.toString()))
                        ? 'active'
                        : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {

                        handleSearch('ethnicGroups', ethnicGroup.id.toString())
                      }}
                    >
                      {(filter['ethnicGroups'] === ethnicGroup.id.toString() || filter['ethnicGroups']?.includes(ethnicGroup.id.toString())) ? (
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
                      className={`${'checkbox_mark'} ${(filter['nationalities'] === nationality.id.toString() || filter['nationalities']?.includes(nationality.id.toString()))
                        ? 'active'
                        : ""
                        }`}
                      aria-hidden="true"
                      onClick={() => {

                        handleSearch('nationalities', nationality.id.toString())
                      }}
                    >
                      {(filter['nationalities'] === nationality.id.toString() || filter['nationalities']?.includes(nationality.id.toString())) ? (
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
