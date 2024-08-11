

import { IGeneral } from "@/types/core/generalFilters";


import { ComponentType } from "../ComponentType";


import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { ICurrency } from "@/types/core/currency";
import { useTranslations, useLocale } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";

interface ICurrenciesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  setActiveTimeSelector: React.Dispatch<React.SetStateAction<number>>;
  filters: Partial<IGeneral>
}

const CurrenciesSelector: React.FC<ICurrenciesSelectorProps> = ({
  activeComponent,
  setActiveComponent,
  setActiveTimeSelector,
  filters
}) => {

  const t = useTranslations();
  const currencies = filters.currencies || [];
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();



  const handlerDropdownButtonOnClick = () => {
    setActiveTimeSelector(-1);
    setActiveComponent(
      activeComponent === ComponentType.CurrenciesSelector ? ComponentType.None : ComponentType.CurrenciesSelector
    );
  };

  const handlerCurrencyOnClick = (currency: ICurrency) => {
    setModel({ ...model, currency_id: currency.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.CurrenciesSelector ? 'active' : ""
        }`}
    >
      <div className={'main'}>
        <div className={'label'}>{t("model.currency")}</div>
        <div className={'dropdown_button'} onClick={handlerDropdownButtonOnClick}>
          {model.currency_id === -1
            ? ""
            : currencies.find((currency: ICurrency) => currency.id === model.currency_id)?.currency +
            " (" +
            currencies.find((currency: ICurrency) => currency.id === model.currency_id)?.symbol +
            ")"}
          {activeComponent === ComponentType.CurrenciesSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
          <div className={'required'}>*</div>
        </div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.CurrenciesSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {currencies.map((currency: ICurrency) => (
            <div key={currency.id} className={'dropdown_item'} onClick={() => handlerCurrencyOnClick(currency)}>
              {currency.currency + " (" + currency.symbol + ")"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrenciesSelector;
