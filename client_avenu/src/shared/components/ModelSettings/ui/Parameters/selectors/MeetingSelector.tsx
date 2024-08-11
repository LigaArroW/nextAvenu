'use client'
import { ComponentType } from "../ComponentType";


import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";

import { IGeneral } from "@/types/core/generalFilters";
import { IMeeting } from "@/types/core/meeting";
import { useTranslations, useLocale } from "next-intl";
import { useNewModelContext } from "../../Context/NewModel/NewModelProvider";

interface IMeetingSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  filters: Partial<IGeneral>
}

const MeetingSelector: React.FC<IMeetingSelectorProps> = ({ activeComponent, setActiveComponent, filters }) => {
  const t = useTranslations();
  const meetings = filters.meetings || [];
  const locale = useLocale();
  const { model, setModel } = useNewModelContext();

  const handlerMeetingOnClick = (meeting: IMeeting) => {
    setModel({ ...model, meeting_id: meeting.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${'dropdown'} ${activeComponent === ComponentType.MeetingSelector ? 'active' : ""}`}
    >
      <div className={'main'}>
        <div className={'label'}>{t("model.meeting_with")}</div>
        <div
          className={'dropdown_button'}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.MeetingSelector ? ComponentType.None : ComponentType.MeetingSelector
            )
          }
        >
          {model.meeting_id === -1
            ? ""
            : locale === "ru"
              ? meetings.find((meeting: IMeeting) => meeting.id === model.meeting_id)?.meeting
              : meetings.find((meeting: IMeeting) => meeting.id === model.meeting_id)?.meeting_eng}
          {activeComponent === ComponentType.MeetingSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
      </div>
      <div
        className={`${'dropdown_container'} ${activeComponent === ComponentType.MeetingSelector ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          {meetings.map((meeting: IMeeting) => (
            <div key={meeting.id} className={'dropdown_item'} onClick={() => handlerMeetingOnClick(meeting)}>
              {locale === "ru" ? meeting.meeting : meeting.meeting_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingSelector;
