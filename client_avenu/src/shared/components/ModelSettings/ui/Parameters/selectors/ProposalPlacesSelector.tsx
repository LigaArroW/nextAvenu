'use client'


import { ComponentType } from "../ComponentType";


import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { Check as CheckIcon } from "@/shared/assets/Check";
import { IGeneral } from "@/types/core/generalFilters";
import { IProposalPlace } from "@/types/core/proposalPlace";
import { IModelProposalPlace } from "@/types/model/modelProposalPlace/modelProposalPlace";
import { useTranslations, useLocale } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";

interface IProposalPlacesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  filters: Partial<IGeneral>
}

const ProposalPlacesSelector: React.FC<IProposalPlacesSelectorProps> = ({ activeComponent, setActiveComponent, filters }) => {
  const t = useTranslations();
  const proposalPlaces = filters.proposal_places || [];
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();

  const handlerProposalPlaceOnClick = (proposalPlace: IProposalPlace) => {
    if (
      model.model_proposal_places.filter(
        (modelProposalPlace: IModelProposalPlace) => modelProposalPlace.place_id === proposalPlace.id
      ).length > 0
    ) {
      setModel({
        ...model,
        model_proposal_places: model.model_proposal_places.filter(
          (modelProposalPlace: IModelProposalPlace) => modelProposalPlace.place_id !== proposalPlace.id
        ),
      });
    } else {
      setModel({
        ...model,
        model_proposal_places: [
          ...model.model_proposal_places,
          { place_id: proposalPlace.id, model_id: model.id } as IModelProposalPlace,
        ],
      });
    }
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.ProposalPlacesSelector ? 'active' : ""
        }`}
    >
      <div className={`${'main'}`}>
        <div className={'label'}>{t("model.departure_to")}</div>
        <div
          className={'dropdown_button'}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.ProposalPlacesSelector
                ? ComponentType.None
                : ComponentType.ProposalPlacesSelector
            )
          }
        >
          {model.model_proposal_places.length === 0
            ? t("global.not_selected_s")
            : `${t("global.selected")}: ` + model.model_proposal_places.length}
          {activeComponent === ComponentType.ProposalPlacesSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.ProposalPlacesSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {proposalPlaces.map((proposalPlace: IProposalPlace) => (
            <label key={proposalPlace.id} className={'checkbox'}>
              <input type="checkbox" />
              <span
                className={`${'checkbox_mark'} ${model.model_proposal_places.filter(
                  (modelProposalPlace: IModelProposalPlace) => modelProposalPlace.place_id === proposalPlace.id
                ).length > 0
                  ? 'active'
                  : ""
                  }`}
                aria-hidden="true"
                onClick={() => handlerProposalPlaceOnClick(proposalPlace)}
              >
                {model.model_proposal_places.filter(
                  (modelProposalPlace: IModelProposalPlace) => modelProposalPlace.place_id === proposalPlace.id
                ).length > 0 ? (
                  <CheckIcon fill="#98042D" />
                ) : null}
              </span>
              <div className={'text'}>
                {locale === "ru" ? proposalPlace.place : proposalPlace.place_eng}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProposalPlacesSelector;
