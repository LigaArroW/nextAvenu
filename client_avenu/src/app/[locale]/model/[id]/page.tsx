import Model from "@/shared/components/Model/Model";
import { filtredFields } from "@/shared/constant/filtredFields";
import { IDayOfWeek } from "@/types/core/dayOfWeek";
import { IGeneral } from "@/types/core/generalFilters";
import { IMeetingPlace } from "@/types/core/meetingPlace";
import { IService } from "@/types/core/service";
import { IServiceCategory } from "@/types/core/serviceCategory";
import { IWorkDuration } from "@/types/core/workDuration";
import { IModel } from "@/types/model/model/model";
import { IModelService } from "@/types/model/modelService/modelService";
import { ITarif } from "@/types/model/tarif/tarif";
import { IWorkTime } from "@/types/model/workTime/workTime";
import { button } from "@nextui-org/theme";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { revalidateTag } from "next/cache";
import { title } from "process";




export async function generateStaticParams() {

    const models = await fetch('http://localhost:8001/api/models', {
        method: 'GET',
        next: { revalidate: 10 },
    }).then((res) => res.json());

    return models.map((model: IModel) => ({
        id: String(model.id),
        // id: String(model.id).padStart(8, "0"),
    }))


}

export async function generateMetadata({ params: { id } }: { params: { id: string } }) {
    // const t = await getTranslations();
    // const models = await fetch(`http://localhost:8001/api/models`)
    //     .then((res) => res.json());
    // const model: IModel = models.find((model: IModel) => model.id === Number(id));
    const model = await getModel(id)
    return {
        title: `${model.name} (${model.age})` || "Модель не найдена",
        // title: `${t("navigation.home")} | ${t("navigation.all_models")}`,
    };
}




export default async function ModelPage({ params: { id, locale } }: { params: { id: string, locale: string } }) {
    unstable_setRequestLocale(locale);
    let tmpServices = [] as IModelService[]
    let tmpWorkTimes = [] as IWorkTime[];
    let tmpTarifs = [] as ITarif[];
    const filtredFields: Partial<IGeneral> = await getFiltredFields()
    const model = await getModel(id)
    // console.log(filtredFields.service_categories);

    if (filtredFields.service_categories && filtredFields.service_categories.length > 0 && model.model_services) {
        filtredFields.service_categories.map((serviceCategory: IServiceCategory) =>
            serviceCategory.services.map((service: IService) =>
                tmpServices.push({
                    id:
                        model.model_services.filter((modelService: IModelService) => modelService.service_id === service.id).length > 0
                            ? model.model_services.find((modelService: IModelService) => modelService.service_id === service.id)!.id
                            : model.model_services.length === 0
                                ? service.id
                                : Math.max(...model.model_services.map((modelService: IModelService) => modelService.id)) + service.id,
                    category_id: serviceCategory.id,
                    service_id: service.id,
                    model_id: model.id,
                    price:
                        model.model_services.filter((modelService: IModelService) => modelService.service_id === service.id).length > 0
                            ? model.model_services.find((modelService: IModelService) => modelService.service_id === service.id)!.price
                            : -1,
                })
            ))

    }

    if (filtredFields.days_of_week && filtredFields.days_of_week.length > 0 && model.work_times) {
        filtredFields.days_of_week.map((dayOfWeek: IDayOfWeek) =>
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
                        is_all_day: false,
                    })
            ));

    }

    if (filtredFields.meeting_places && filtredFields.meeting_places.length > 0 && filtredFields.work_durations && filtredFields.work_durations.length > 0 && model.tarifs) {
        const meetingPlace = filtredFields.meeting_places.find((meetingPlace: IMeetingPlace) => meetingPlace.id === model.meeting_place_id)
        filtredFields.meeting_places.map((meetingPlace: IMeetingPlace) => {
            filtredFields.work_durations && filtredFields.work_durations.map((workDuration: IWorkDuration) => {
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
        })
        meetingPlace?.meeting_place == "Аппартаменты" || meetingPlace?.meeting_place == "Выезд"
            ? tmpTarifs.filter((tariff: ITarif) => tariff.meeting_place_id === meetingPlace?.id)
            : tmpTarifs.filter((tariff: ITarif) => tariff.meeting_place_id !== meetingPlace?.id)

    }

   


    return (
        <Model />

    )
}


interface FiltredFields {
    [key: string]: [];
}

const getModel = async (id: string) => {
    const models = await fetch(`http://localhost:8001/api/models`)
        .then((res) => res.json());
    const model: IModel = models.find((model: IModel) => model.id === Number(id));

    return model;
}


const getFiltredFields = async (): Promise<FiltredFields> => {
    const responseJsons: FiltredFields = {};

    await Promise.all(
        filtredFields.map(async (field) => {

            const response = await fetch(`http://localhost:8001/api/${field}`, {
                method: 'GET',
                cache: 'force-cache',
            });
            const json = await response.json();

            responseJsons[field] = json;
        })
    );

    return responseJsons;
};