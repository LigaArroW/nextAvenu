'use client'


import { IBlockedCountry } from "@/types/model/blockedCountry/blockedCountry";
import { IContact } from "@/types/model/contact/contact";
import { IModelLanguage } from "@/types/model/language/modelLanguage";
import { IModel } from "@/types/model/model/model";
import { IModelFeedback } from "@/types/model/modelFeedback/modelFeedback";
import { IModelProposalPlace } from "@/types/model/modelProposalPlace/modelProposalPlace";
import { IModelService } from "@/types/model/modelService/modelService";
import { IPhoto } from "@/types/model/photo/photo";
import { IModelPiercing } from "@/types/model/piercing/modelPiercing";
import { ITarif } from "@/types/model/tarif/tarif";
import { IVideo } from "@/types/model/video/video";
import { IWorkTime } from "@/types/model/workTime/workTime";
import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState } from "react";



export function initModel(): IModel {
    const defaults = {
        id: -1,
        agency_id: -1,
        name: "",
        about_self: "",
        age: 0,
        type_id: -1,
        height: 0,
        weight: 0,
        country_id: 1,
        city_id: 4,
        district_id: -1,
        underground_id: -1,
        orientation_id: -1,
        meeting_id: -1,
        ethnic_group_id: -1,
        hair_color_id: -1,
        hair_size_id: -1,
        breast_size_id: -1,
        breast_type_id: -1,
        meeting_place_id: -1,
        nationality_id: -1,
        trip_id: -1,
        tatoo_id: -1,
        smooker_id: -1,
        eyes_color_id: -1,
        pubis_hair_id: -1,
        contacts: [
            {
                id: 0,
                phone_number: "",
                is_telegram_enable: false,
                is_whatsapp_enable: false,
                is_wechat_enable: false,
                is_botim_enable: false,
            } as IContact,
        ] as IContact[],
        photos: [] as IPhoto[],
        videos: [] as IVideo[],
        model_piercings: [] as IModelPiercing[],
        blocked_countries: [] as IBlockedCountry[],
        model_languages: [] as IModelLanguage[],
        is_vip: false,
        is_pornstar: -1,
        is_enable: false,
        is_enable_by_moderator: true,
        currency_id: 1,
        tarifs: [] as ITarif[],
        time_zone: -100,
        work_times: [] as IWorkTime[],
        model_services: [] as IModelService[],
        last_online: new Date(),
        is_verified: false,
        create_date: new Date(),
        is_payed: false,
        last_position_update: new Date(),
        model_feedbacks: [] as IModelFeedback[],
        model_proposal_places: [] as IModelProposalPlace[],
        positionsUpLeft: 6,
    };

    return {
        ...defaults,
    };
}
interface INewModelContext {
    model: IModel
    setModel: Dispatch<SetStateAction<IModel>>
}



interface INewModelProviderProps {
    children: React.ReactNode
    initialModel: IModel | undefined
}

const NewModelContext = createContext<INewModelContext>({} as INewModelContext);
export const useNewModelContext = () => useContext(NewModelContext);

export const NewModelProvider: FC<INewModelProviderProps> = ({ children, initialModel }) => {
    const [model, setModel] = useState<IModel>(initialModel || initModel())


    const reset = () => {
        setModel(initModel())
    }

    return <NewModelContext.Provider value={{ model, setModel }}>{children}</NewModelContext.Provider>




};


