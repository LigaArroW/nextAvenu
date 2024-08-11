'use client'
import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { IGeneral } from "@/types/core/generalFilters";
import { IMeetingPlace } from "@/types/core/meetingPlace";
import { useTranslations, useLocale } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";

interface IMeetingPlaceSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
  filters: Partial<IGeneral>
}

const MeetingPlaceSelector: React.FC<IMeetingPlaceSelectorProps> = ({
  activeComponent,
  setActiveComponent,
  isCheckStart,
  filters
}) => {
  const t = useTranslations();
  const meetingPlaces = filters.meeting_places || [];
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();

  const handlerMeetingPlaceOnClick = (meetingPlace: IMeetingPlace) => {
    setModel({ ...model, meeting_place_id: meetingPlace.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.MeetingPlaceSelector ? 'active' : ""
        } ${isCheckStart && model.meeting_place_id === -1 ? "wrong" : ""}`}
    >
      <div className={'main'}>
        <div className={'label'}>
          {t("model.incall")}-{t("model.outcall")}
        </div>
        <div
          className={`${'dropdown_button'} ${isCheckStart && model.meeting_place_id === -1 ? 'wrong' : ""
            }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.MeetingPlaceSelector
                ? ComponentType.None
                : ComponentType.MeetingPlaceSelector
            )
          }
        >
          {model.meeting_place_id === -1
            ? ""
            : locale === "ru"
              ? meetingPlaces.find((meetingPlace: IMeetingPlace) => meetingPlace.id === model.meeting_place_id)?.meeting_place
              : meetingPlaces.find((meetingPlace: IMeetingPlace) => meetingPlace.id === model.meeting_place_id)
                ?.meeting_place_eng}
          {activeComponent === ComponentType.MeetingPlaceSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={'required'}>*</div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.MeetingPlaceSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {meetingPlaces.map((meetingPlace: IMeetingPlace) => (
            <div key={meetingPlace.id} className={'dropdown_item'} onClick={() => handlerMeetingPlaceOnClick(meetingPlace)}>
              {locale === "ru" ? meetingPlace.meeting_place : meetingPlace.meeting_place_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingPlaceSelector;
