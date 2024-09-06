'use client'
import { Person } from "@/lib/auth/authAction";
import { useLocale, useTranslations } from "next-intl";
import styles from "./Services.module.sass";
import pageStyles from '@/shared/styles/ModelSettings.module.sass'
import { Check as CheckIcon } from "@/shared/assets/Check";
import { useEffect, useState } from "react";
import { IModelService } from "@/types/model/modelService/modelService";
import { useNewModelContext } from "../Context/NewModel/NewModelProvider";
import { IServiceCategory } from "@/types/core/serviceCategory";
import { IGeneral } from "@/types/core/generalFilters";
import { IService } from "@/types/core/service";
import MessageModal from "@/shared/components/Modals/MessageModal";
import { ICurrency } from "@/types/core/currency";
import { addModelServices } from "@/lib/services/servicesAction";
import { getModelOne } from "@/lib/models/getDataModel";


interface IModelSettingServices {
    person: Person
    filters: Partial<IGeneral>
}


const ModelSettingServices: React.FC<IModelSettingServices> = ({ person, filters }) => {
    const t = useTranslations()
    const locale = useLocale()
    const { model, setModel } = useNewModelContext()
    const serviceCategories = filters.service_categories || []
    const currencies = filters.currencies || []
    const [modelServices, setModelServices] = useState([] as IModelService[]);
    const [isMessageModalShow, setIsMessageModalShow] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");


    useEffect(() => {
        var tmpServices = [] as IModelService[];
        serviceCategories.map((serviceCategory: IServiceCategory) =>
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
                } as IModelService)
            )
        );
        setModelServices(tmpServices);
    }, [model]);

    const handleChangeModelService = (modelService: IModelService) => {
        const tmpModelServices = modelServices.map((tmpModelService: IModelService) => {
            if (tmpModelService.id === modelService.id) {
                return {
                    ...tmpModelService,
                    price: modelService.price,
                } as IModelService;
            } else return tmpModelService;
        });
        setModelServices(tmpModelServices);
        setModel({
            ...model,
            model_services: tmpModelServices.filter((modelService: IModelService) => modelService.price > -1),
        });
    };

    const handleChangeModelServicePrice = (event: React.ChangeEvent<HTMLInputElement>, modelService: IModelService) => {
        handleChangeModelService({
            ...modelService,
            price:
                Number.isNaN(Number(event.target.value)) || Number(event.target.value) < 0
                    ? modelService.price
                    : Number(event.target.value),
        });
    };

    const handleSaveClick = async () => {
        const addModal = await addModelServices({ model_id: model.id, model_services: model.model_services });
        if (addModal.success) {
            setInfoMessage(t("global.data_successfully_updated"));
            setIsMessageModalShow(true);
            window.scrollTo({ top: 0 });
            const models = await getModelOne(model.id.toString());
            models && setModel(models)
        }
        if (!addModal.success) {
            setInfoMessage(addModal.error);
            setIsMessageModalShow(true);
        }


    };

    return (
        <div className={pageStyles.content}>
            <div className={pageStyles.title}>{t("model.services")}</div>
            <div className={styles.info}>
                {t("model.to_indicate_extra_charge")} <span>0</span>
            </div>
            <div className={styles.services_container}>
                {serviceCategories.map((serviceCategory: IServiceCategory) => (
                    <div key={serviceCategory.id} className={styles.services_group}>
                        <div className={styles.services_category}>
                            {locale === "ru" ? serviceCategory.service_category : serviceCategory.service_category_eng}
                        </div>
                        <div className={styles.services_list}>
                            {modelServices
                                .filter((modelService: IModelService) => modelService.category_id === serviceCategory.id)
                                .map((modelService: IModelService) => (
                                    <div key={modelService.id} className={styles.service}>
                                        <div className={styles.check_part}>
                                            <label className={'checkbox'}>
                                                <input type="checkbox" />
                                                <span
                                                    className={`${'checkbox_mark'} ${'white'} ${modelService.price > -1 ? 'active' : ""
                                                        }`}
                                                    aria-hidden="true"
                                                    onClick={() =>
                                                        handleChangeModelService({ ...modelService, price: modelService.price > -1 ? -1 : 0 })
                                                    }
                                                >
                                                    {modelService.price > -1 && <CheckIcon fill="#98042D" />}
                                                </span>
                                                <div className={`text ${styles.text}`}>
                                                    {locale === "ru"
                                                        ? serviceCategory.services.find((service: IService) => service.id === modelService.service_id)
                                                            ?.service
                                                        : serviceCategory.services.find((service: IService) => service.id === modelService.service_id)
                                                            ?.service_eng}
                                                </div>
                                            </label>
                                        </div>
                                        {modelService.price > -1 && (
                                            <div className={styles.input_part}>
                                                {
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        value={modelService.price}
                                                        onChange={(event) => handleChangeModelServicePrice(event, modelService)}
                                                    />
                                                }
                                                {currencies.find((currency: ICurrency) => currency.id === model.currency_id)?.symbol}
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
            <button type="button" onClick={handleSaveClick}>
                {t("global.save")}
            </button>
            {isMessageModalShow && <MessageModal
                text={infoMessage}
                buttonText={t("global.ok")}
                handlerButtonClick={() => setIsMessageModalShow(false)}
            // isShow={isMessageModalShow}
            />}
        </div>
    );
};

export default ModelSettingServices;