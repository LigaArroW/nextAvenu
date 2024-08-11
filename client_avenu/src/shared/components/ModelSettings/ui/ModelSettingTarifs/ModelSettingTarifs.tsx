'use client'
import { Person } from "@/lib/auth/authAction";
import { useLocale, useTranslations } from "next-intl";
import styles from "./Tarifs.module.sass";
import pageStyles from '@/shared/styles/ModelSettings.module.sass'
import MessageModal from "@/shared/components/Modals/MessageModal";
import { ChangeEvent, useEffect, useState } from "react";
import { ITarif } from "@/types/model/tarif/tarif";

import { IWorkTime } from "@/types/model/workTime/workTime";
import { ComponentType } from "./ComponentType";
import { IGeneral } from "@/types/core/generalFilters";
import { useNewModelContext } from "../Context/NewModel/NewModelProvider";
import { IMeetingPlace } from "@/types/core/meetingPlace";
import { IWorkDuration } from "@/types/core/workDuration";
import { IDayOfWeek } from "@/types/core/dayOfWeek";
import { useMedia } from "react-use";
import { ICurrency } from "@/types/core/currency";
import { Check } from "@/shared/assets/Check";
import CurrenciesSelector from "./selectors/CurrenciesSelector";
import TimeSelector from "./selectors/TimeSelector";
import { updateModelCurrencyTimezone } from "@/lib/models/postDataModels";
import { addTarifs } from "@/lib/tarifs/tarifsAction";
import { addWorkTimes } from "@/lib/workTime/workTimeAction";
import { getModelOne } from "@/lib/models/getDataModel";

interface IModelSettingTarrifs {
    person: Person
    filters: Partial<IGeneral>

}

const ModelSettingTarifs: React.FC<IModelSettingTarrifs> = ({ person, filters }) => {
    const t = useTranslations();
    const locale = useLocale()
    const { model, setModel } = useNewModelContext();
    const [activeComponent, setActiveComponent] = useState(ComponentType.None);
    const [modelTarifs, setModelTarifs] = useState([] as ITarif[]);
    const [modelWorkTimes, setModelWorkTimes] = useState([] as IWorkTime[]);
    const [activeTimeSelector, setActiveTimeSelector] = useState(-1);
    const [isMessageModalShow, setIsMessageModalShow] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    const isNotMobile = useMedia('(min-width: 1500px)');


    useEffect(() => {
        const meetingPlace = filters.meeting_places && filters.meeting_places.find((meetingPlace: IMeetingPlace) => meetingPlace.id === model.meeting_place_id);
        var tmpTarifs = [] as ITarif[];
        if (filters.meeting_places && filters.meeting_places.length > 0 && filters.work_durations && filters.work_durations.length > 0 && model.id > 0)
            filters.meeting_places && filters.meeting_places.map((meetingPlace: IMeetingPlace) => {
                filters.work_durations && filters.work_durations.map((workDuration: IWorkDuration) => {
                    tmpTarifs.push(
                        model.tarifs.filter(
                            (tariff: ITarif) => tariff.meeting_place_id === meetingPlace.id && tariff.work_duration_id === workDuration.id
                        ).length > 0
                            ? (model.tarifs.find(
                                (tariff: ITarif) =>
                                    tariff.meeting_place_id === meetingPlace.id && tariff.work_duration_id === workDuration.id
                            ) as ITarif)
                            : ({
                                id:
                                    model.tarifs.length === 0
                                        ? (meetingPlace.id + 10) * (workDuration.id + 1) + workDuration.id
                                        : Math.max(...model.tarifs.map((tarif: ITarif) => tarif.id)) +
                                        (meetingPlace.id + 10) * (workDuration.id + 1) +
                                        workDuration.id,
                                meeting_place_id: meetingPlace.id,
                                work_duration_id: workDuration.id,
                                price: 0,
                                model_id: model.id,
                            } as ITarif)
                    );
                });
            });
        setModelTarifs(
            meetingPlace?.meeting_place == "Аппартаменты" || meetingPlace?.meeting_place == "Выезд"
                ? tmpTarifs.filter((tariff: ITarif) => tariff.meeting_place_id === meetingPlace?.id)
                : tmpTarifs.filter((tariff: ITarif) => tariff.meeting_place_id !== meetingPlace?.id)
        );
    }, [model]);

    useEffect(() => {
        var tmpWorkTimes = [] as IWorkTime[];

        if (filters.days_of_week && filters.days_of_week.length > 0 && model.work_times) {
            filters.days_of_week.map((dayOfWeek: IDayOfWeek) => {
                tmpWorkTimes.push(
                    model.work_times.filter(
                        (workTime: IWorkTime) => workTime.model_id === model.id && workTime.day_of_week_id === dayOfWeek.id
                    ).length > 0
                        ? (model.work_times.find(
                            (workTime: IWorkTime) => workTime.model_id === model.id && workTime.day_of_week_id === dayOfWeek.id
                        ) as IWorkTime)
                        : ({
                            id:
                                model.work_times.length === 0
                                    ? dayOfWeek.id
                                    : Math.max(...model.work_times.map((workTime: IWorkTime) => workTime.id)) + dayOfWeek.id,
                            time_start: "",
                            time_end: "",
                            model_id: model.id,
                            day_of_week_id: dayOfWeek.id,
                        } as IWorkTime)
                );
            });
        }
        setModelWorkTimes(tmpWorkTimes);
    }, [model]);

    const handleChangeTariff = (event: ChangeEvent<HTMLInputElement>, tariff: ITarif) => {
        const tmpTarifs = modelTarifs.map((tmpTariff: ITarif) => {
            if (tariff.id === tmpTariff.id) {
                return {
                    ...tmpTariff,
                    price:
                        Number.isNaN(Number(event.target.value)) || Number(event.target.value) < 0
                            ? tmpTariff.price
                            : Number(event.target.value),
                };
            } else return tmpTariff;
        });
        setModelTarifs(tmpTarifs);

        setModel({ ...model, tarifs: tmpTarifs.filter((tariff: ITarif) => tariff.price > 0) });
    };

    const handleChangeWorkTime = (workTime: IWorkTime) => {
        const tmpWorkTimes = modelWorkTimes.map((tmpWorkTime: IWorkTime) => {
            if (tmpWorkTime.id === workTime.id) {
                return {
                    ...tmpWorkTime,
                    time_start: workTime.time_start,
                    time_end: workTime.time_end,
                    is_all_day: workTime.is_all_day ? true : false,
                } as IWorkTime;
            } else return tmpWorkTime;
        });

        setModelWorkTimes(tmpWorkTimes);
        setModel({
            ...model,
            work_times: tmpWorkTimes,
        });
    };

    const handleUpdateModelCurrencyTimezone = async () => {
        const upd = await updateModelCurrencyTimezone({ model_id: model.id, currency_id: model.currency_id, time_zone: model.time_zone })

        if (upd.success) {
            const tarif = await addTarifs({ model_id: model.id, tarifs: model.tarifs });
            const work = await addWorkTimes({
                model_id: model.id,
                work_times: model.work_times.filter(
                    (workTime: IWorkTime) => (workTime.time_end !== "" && workTime.time_start !== "") || workTime.is_all_day
                ),
            });
            if (tarif.success && work.success) {

                setInfoMessage(t("global.data_successfully_updated"));
                setIsMessageModalShow(true);
                window.scrollTo({ top: 0 });
                const models = await getModelOne(model.id.toString());
                models && setModel(models)
            } else {
                setInfoMessage(tarif.success ? work.message : tarif.message);
                setIsMessageModalShow(true);
                window.scrollTo({ top: 0 });
                const models = await getModelOne(model.id.toString());
                models && setModel(models)

            }
        }
    }


    return (
        <div className={pageStyles.content}>
            <div className={pageStyles.content}>
                <div className={pageStyles.title}>{t("model.tariffs")}</div>
                <div className={styles.tarifs_container}>
                    <div className={styles.item}>
                        <CurrenciesSelector
                            activeComponent={activeComponent}
                            setActiveComponent={setActiveComponent}
                            setActiveTimeSelector={setActiveTimeSelector}
                            filters={filters}
                        />
                    </div>
                    <div className={`${styles.item} ${isNotMobile ? styles.full_width : ""}`}>

                        {isNotMobile ? (
                            <table>
                                <thead>
                                    <tr className={styles.header}>
                                        <td className={styles.row_header} />
                                        {filters.work_durations && filters.work_durations.map((workDuration: IWorkDuration) => (
                                            <td key={workDuration.id} className={styles.column_header}>
                                                {locale === "ru" ? workDuration.work_duration : workDuration.work_duration_eng}
                                            </td>
                                        ))}
                                        <td className={styles.currency} />
                                    </tr>
                                </thead>
                                <tbody>
                                    {filters.meeting_places && filters.meeting_places.map(
                                        (meetingPlace: IMeetingPlace) =>
                                            modelTarifs.filter((tarif: ITarif) => tarif.meeting_place_id === meetingPlace.id).length > 0 && (
                                                <tr key={meetingPlace.id}>
                                                    <td className={styles.row_header}>
                                                        {locale === "ru" ? meetingPlace.meeting_place : meetingPlace.meeting_place_eng}
                                                    </td>
                                                    {modelTarifs
                                                        .filter((tarif: ITarif) => tarif.meeting_place_id === meetingPlace.id)
                                                        .map((tariff: ITarif) => (
                                                            <td key={tariff.id}>
                                                                <input
                                                                    type="text"
                                                                    placeholder=""
                                                                    value={tariff.price > 0 ? tariff.price : ""}
                                                                    onClick={() => setActiveComponent(ComponentType.None)}
                                                                    onChange={(event) => handleChangeTariff(event, tariff)}
                                                                />
                                                            </td>
                                                        ))}
                                                    <td className={styles.currency}>
                                                        {filters.currencies && filters.currencies.find((currency: ICurrency) => currency.id === model.currency_id)?.symbol}
                                                    </td>
                                                </tr>
                                            )
                                    )}
                                </tbody>
                            </table>
                        ) : (
                            <table>
                                <thead>
                                    <tr className={styles.header}>
                                        <td className={styles.row_header} />
                                        {filters.meeting_places && filters.meeting_places.map(
                                            (meetingPlace: IMeetingPlace) =>
                                                modelTarifs.filter((tarif: ITarif) => tarif.meeting_place_id === meetingPlace.id).length > 0 && (
                                                    <td key={meetingPlace.id} className={styles.column_header}>{meetingPlace.meeting_place}</td>
                                                )
                                        )}
                                        <td className={styles.currency} />
                                    </tr>
                                </thead>
                                <tbody>
                                    {filters.work_durations && filters.work_durations.map((workDuration: IWorkDuration) => (
                                        <tr key={workDuration.id}>
                                            <td className={styles.row_header}>{workDuration.work_duration}</td>
                                            {filters.meeting_places && filters.meeting_places.map(
                                                (meetingPlace: IMeetingPlace) =>
                                                    modelTarifs.filter(
                                                        (tarif: ITarif) =>
                                                            tarif.meeting_place_id === meetingPlace.id && tarif.work_duration_id === workDuration.id
                                                    ).length > 0 && (
                                                        <td key={meetingPlace.id}>
                                                            <input
                                                                type="text"
                                                                placeholder=""
                                                                value={
                                                                    modelTarifs.find(
                                                                        (tarif: ITarif) =>
                                                                            tarif.meeting_place_id === meetingPlace.id && tarif.work_duration_id === workDuration.id
                                                                    )!.price > 0
                                                                        ? modelTarifs.find(
                                                                            (tarif: ITarif) =>
                                                                                tarif.meeting_place_id === meetingPlace.id &&
                                                                                tarif.work_duration_id === workDuration.id
                                                                        )!.price
                                                                        : ""
                                                                }
                                                                onClick={() => setActiveComponent(ComponentType.None)}
                                                                onChange={(event) =>
                                                                    handleChangeTariff(
                                                                        event,
                                                                        modelTarifs.find(
                                                                            (tarif: ITarif) =>
                                                                                tarif.meeting_place_id === meetingPlace.id &&
                                                                                tarif.work_duration_id === workDuration.id
                                                                        )!
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                    )
                                            )}
                                            <td className={styles.currency}>
                                                {filters.currencies && filters.currencies.find((currency: ICurrency) => currency.id === model.currency_id)?.symbol}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
            <div className={pageStyles.content}>
                <div className={pageStyles.title}>{t("model.working_hours")}</div>
                <div className={styles.tarifs_container}>
                    <div className={`${styles.item} ${styles.full_width}`}>
                        <table className={styles.work_times}>
                            <thead>
                                <tr className={styles.header}>
                                    <td className={styles.row_header} />
                                    <td className={styles.column_header}>{t("global.from")}</td>
                                    <td className={styles.column_header}>{t("global.before")}</td>
                                    <td className={styles.all_day}>{t("model.all_day")}</td>
                                </tr>
                            </thead>
                            <tbody>
                                {modelWorkTimes.map((workTime: IWorkTime, index: number) => (
                                    <tr key={workTime.id}>
                                        <td className={styles.row_header}>
                                            {locale === "ru"
                                                ? filters.days_of_week && filters.days_of_week.find((dayOfWeek: IDayOfWeek) => dayOfWeek.id === workTime.day_of_week_id)?.day_of_week
                                                : filters.days_of_week && filters.days_of_week.find((dayOfWeek: IDayOfWeek) => dayOfWeek.id === workTime.day_of_week_id)
                                                    ?.day_of_week_eng}
                                        </td>
                                        <td>
                                            {!workTime.is_all_day && (
                                                <div className={styles.time_selector_container}>
                                                    <TimeSelector
                                                        setActiveComponent={setActiveComponent}
                                                        selectorId={(index + 1) * 2}
                                                        activeTimeSelector={activeTimeSelector}
                                                        setActiveTimeSelector={setActiveTimeSelector}
                                                        workTime={workTime}
                                                        onSelect={handleChangeWorkTime}
                                                    />
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            {!workTime.is_all_day && (
                                                <div className={styles.time_selector_container}>
                                                    <TimeSelector
                                                        setActiveComponent={setActiveComponent}
                                                        selectorId={(index + 1) * 2 + 1}
                                                        activeTimeSelector={activeTimeSelector}
                                                        setActiveTimeSelector={setActiveTimeSelector}
                                                        workTime={workTime}
                                                        onSelect={handleChangeWorkTime}
                                                    />
                                                </div>
                                            )}
                                        </td>
                                        <td className={`${styles.all_day} ${styles.checkbox}`}>
                                            <label className={`${'checkbox'} ${'empty'}`}>
                                                <input type="checkbox" />
                                                <span
                                                    className={`${'checkbox_mark'} ${'white'} ${workTime.is_all_day ? 'active' : ""
                                                        }`}
                                                    aria-hidden="true"
                                                    onClick={() =>
                                                        handleChangeWorkTime({
                                                            ...workTime,
                                                            is_all_day: !workTime.is_all_day,
                                                            time_start: "",
                                                            time_end: "",
                                                        })
                                                    }
                                                >
                                                    {workTime.is_all_day ? <Check fill="#98042D" /> : ""}
                                                </span>
                                            </label>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() =>
                        handleUpdateModelCurrencyTimezone()
                        // updateModelCurrencyTimezone({ model_id: model.id, currency_id: model.currency_id, time_zone: model.time_zone })
                    }
                >
                    {t("global.save")}
                </button>
            </div>
            {isMessageModalShow && <MessageModal
                text={infoMessage}
                buttonText={t("global.ok")}
                handlerButtonClick={() => setIsMessageModalShow(false)}
            />}
        </div>
    );
};

export default ModelSettingTarifs;