

import { useEffect, useState } from "react";


import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "@/shared/assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "@/shared/assets/ArrowUp";
import { IWorkTime } from "@/types/model/workTime/workTime";
import { useTranslations } from "next-intl";


interface ITimeSelector {
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  selectorId: number;
  activeTimeSelector: number;
  setActiveTimeSelector: React.Dispatch<React.SetStateAction<number>>;
  workTime: IWorkTime;
  onSelect: Function;
}

const TimeSelector: React.FC<ITimeSelector> = ({
  setActiveComponent,
  selectorId,
  activeTimeSelector,
  setActiveTimeSelector,
  workTime,
  onSelect,
}) => {
  const t = useTranslations();
  const [isTimeStart, setIsTimeStart] = useState(false);
  const [extraNum, setExtraNum] = useState(0);
  const [listLength, setListLength] = useState(47);

  useEffect(() => {
    setIsTimeStart(selectorId % 2 === 0);
    setExtraNum(selectorId % 2 === 0 ? 2 : 3);
    if (selectorId % 2 === 0 && workTime.time_end !== "") {
      const timeArr = workTime.time_end.split(":");
      setListLength((Number(timeArr[0]) + 1) * 2 + (timeArr[1] === "00" ? 0 : 1) - 2);
    } else if (selectorId % 2 === 1 && workTime.time_start !== "") {
      const timeArr = workTime.time_start.split(":");
      setExtraNum(3 + (Number(timeArr[0]) + 1) * 2 + (timeArr[1] === "00" ? 0 : 1) - 2);
      setListLength(47 - (Number(timeArr[0]) + 1) * 2 + (timeArr[1] === "00" ? 0 : 1) + 2);
    } else {
      setListLength(47);
    }
  }, [selectorId, workTime]);

  const handlerDropdownButtonOnClick = () => {
    setActiveComponent(ComponentType.None);
    setActiveTimeSelector(activeTimeSelector === selectorId ? -1 : selectorId);
  };

  const handlerEmptyTimeOnClick = () => {
    const tmpWorkTime = {
      ...workTime,
      time_start: isTimeStart ? "" : workTime.time_start,
      time_end: !isTimeStart ? "" : workTime.time_end,
    };
    onSelect(tmpWorkTime);
    setActiveTimeSelector(-1);
  };

  const handlerTimeOnClick = (index: number) => {
    const selectedTime =
      (index + extraNum) % 2 === 0
        ? String((index + extraNum) / 2 - 1).padStart(2, "0") + ":00"
        : String(Number(Number((index + extraNum) / 2 - 1).toFixed(0)) - 1).padStart(2, "0") + ":30";
    const tmpWorkTime = {
      ...workTime,
      time_start: isTimeStart ? selectedTime : workTime.time_start,
      time_end: !isTimeStart ? selectedTime : workTime.time_end,
    };
    onSelect(tmpWorkTime);
    setActiveTimeSelector(-1);
  };

  return (
    <div className={`${'dropdown'} ${activeTimeSelector === selectorId ? 'active' : ""}`}>
      <div className={'main'}>
        <div className={`${'dropdown_button'} ${'full_width'}`} onClick={handlerDropdownButtonOnClick}>
          {isTimeStart && workTime.time_start}
          {!isTimeStart && workTime.time_end}
          {activeTimeSelector === selectorId ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
      </div>
      <div
        className={`${'dropdown_container'} ${'full_width'} ${activeTimeSelector === selectorId ? 'active' : ""
          }`}
      >
        <div className={'dropdown_list'}>
          <div className={'dropdown_item'} onClick={handlerEmptyTimeOnClick}>
            {t("global.not_selected_s")}
          </div>
          {Array(listLength)
            .fill(1)
            .map((_value, index: number) => (
              <div key={index} className={'dropdown_item'} onClick={() => handlerTimeOnClick(index)}>
                {(index + extraNum) % 2 === 0
                  ? String((index + extraNum) / 2 - 1).padStart(2, "0") + ":00"
                  : String(Number(Number((index + extraNum) / 2 - 1).toFixed(0)) - 1).padStart(2, "0") + ":30"}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;
