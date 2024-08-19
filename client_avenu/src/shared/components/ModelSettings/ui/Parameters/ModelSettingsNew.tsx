/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Person } from "@/lib/auth/authAction";
import { useEffect, useState } from "react";
import { ComponentType } from "./ComponentType";
import { useLocale, useTranslations } from "next-intl";
import styles from "./ModelSettingsNew.module.sass"
import pageStyles from '@/shared/styles/ModelSettings.module.sass'
import { useNewModelContext } from "../Context/NewModel/NewModelProvider";
import MessageModal from "../../../Modals/MessageModal";
import ContactsSelector from "./selectors/ContactsSelector";
import DistrictSelector from "./selectors/DistrictSelector";
import { IGeneral } from "@/types/core/generalFilters";
import UndergroundSelector from "./selectors/UndergroundSelector";
import ModelTypeSelector from "./selectors/ModelTypeSelector";
import OrientationSelector from "./selectors/OrientationSelector";
import MeetingSelector from "./selectors/MeetingSelector";
import AgeSelector from "./selectors/AgeSelector";
import HeightSelector from "./selectors/HeightSelector";
import WeightSelector from "./selectors/WeightSelector";
import EthnicGroupSelector from "./selectors/EthnicGroupSelector";
import HairColorSelector from "./selectors/HairColorSelector";
import HairSizeSelector from "./selectors/HairSizeSelector";
import BreastSizeSelector from "./selectors/BreastSizeSelector";
import BreastTypeSelector from "./selectors/BreastTypeSelector";
import MeetingPlaceSelector from "./selectors/MeetingPlaceSelector";
import ProposalPlacesSelector from "./selectors/ProposalPlacesSelector";
import NationalitySelector from "./selectors/NationalitySelector";
import TripSelector from "./selectors/TripSelector";
import LanguagesSelector from "./selectors/LanguagesSelector";
import TatooSelector from "./selectors/TatooSelector";
import PiercingsSelector from "./selectors/PiercingsSelector";
import SmookerSelector from "./selectors/SmookerSelector";
import EyesColorSelector from "./selectors/EyesColorSelector";
import PubisHairSelector from "./selectors/PubisHairSelector";
import PornstarSelector from "./selectors/PornstarSelector";
import BlockedCountriesSelector from "./selectors/BlockedCountriesSelector";
import { IContact } from "@/types/model/contact/contact";
import { IModel } from "@/types/model/model/model";
import ButtonSubmitForm from "@/widgets/ButtonSubmitForm/ButtonSubmitForm";
import { addModel, updateModel } from "@/lib/models/postDataModels";
import { useRouter } from "next/navigation";



interface IModelSettingsNew {
    person: Person
    filters: Partial<IGeneral>
    isNew: boolean
}


const ModelSettingsNew: React.FC<IModelSettingsNew> = ({ person, filters, isNew }) => {
    const { model, setModel } = useNewModelContext();
    const t = useTranslations();
    const router = useRouter();
    const locale = useLocale()
    const modelTypes = filters.model_types || [];
    const [activeComponent, setActiveComponent] = useState(ComponentType.None);
    const [isCheckStart, setIsCheckStart] = useState(false);
    const [isMessageModalShow, setIsMessageModalShow] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);



    useEffect(() => {
        setIsSaveEnabled(
            model.name !== "" &&
            model.country_id > -1 &&
            model.city_id > -1 &&
            model.contacts.filter((contact: IContact) => contact.phone_number.length < 18).length === 0 &&
            model.orientation_id > -1 &&
            model.age > 17 &&
            model.height > 149 &&
            model.weight > 39 &&
            model.ethnic_group_id > -1 &&
            model.hair_color_id > -1 &&
            model.hair_size_id > -1 &&
            model.breast_size_id > -1 &&
            model.breast_type_id > -1 &&
            model.meeting_place_id > -1 &&
            model.nationality_id > -1 &&
            model.trip_id > -1 &&
            model.tatoo_id > -1 &&
            model.model_piercings.length > 0 &&
            model.smooker_id > -1 &&
            model.eyes_color_id > -1 &&
            model.pubis_hair_id > -1 &&
            model.is_pornstar > -1
        );
    }, [model]);

    useEffect(() => {
        if (model.type_id === -1) {
            setModel({ ...model, type_id: modelTypes.length > 0 ? modelTypes[0].id : -1 });
        }
    }, [modelTypes, model]);

    useEffect(() => {
        if (isCheckStart) {
            var wrongs = document.getElementsByClassName("wrong");
            if (wrongs.length > 0) {
                window.scrollTo({ top: (wrongs[0] as HTMLElement).offsetTop - 50, behavior: "smooth" });
                setInfoMessage(t("model.fill_fields"));
                setIsMessageModalShow(true);
            }
        }
    }, [isCheckStart]);


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setActiveComponent(ComponentType.None);
        if (isSaveEnabled) {
            if (isNew) {
                setModel({ ...model, agency_id: Number(person._id) });
                if (model.id > 0) {
                    const update = await updateModel({ model });
                    if (update.success) {
                        router.push(`/${locale}/profile/model_settings/parameters/${model.id}`);
                    }
                    if (!update.success) {
                        setInfoMessage(update.message)
                        setIsMessageModalShow(true);
                    }
                } else {
                    const add = await addModel({ model: { ...model, agency_id: Number(person._id) } });
                    if (add.success) {
                        router.push(`/${locale}/profile/model_settings/photos/${add.model_id}`);
                    }
                    if (!add.success) {
                        setInfoMessage(add.message)
                        setIsMessageModalShow(true);
                    }
                    // authMe();
                }
            } else {
                if (model.id > 0) {
                    const update = await updateModel({ model });
                    if (update.success) {
                        router.push(`/${locale}/profile/model_settings/parameters/${model.id}`);
                    }
                    if (!update.success) {
                        setInfoMessage(update.message)
                        setIsMessageModalShow(true);
                    }
                }
            }
        } else {
            if (!isCheckStart) {
                setIsCheckStart(true);
            } else {
                var wrongs = document.getElementsByClassName("wrong");
                if (wrongs.length > 0) {
                    console.log(wrongs.length);
                    window.scrollTo({ top: (wrongs[0] as HTMLElement).offsetTop - 50, behavior: "smooth" });
                    setInfoMessage(t("model.fill_fields"));
                    setIsMessageModalShow(true);
                }
            }
        }
    };

    return (
        <div className={pageStyles.content}>
            <div className={pageStyles.title}>
                {model.id < 0 ? t("global.add") : t("global.edit")} {t("model.advertisement_edit")}
            </div>
            <div className={styles.parameters}>
                {model.id > 0 ? (
                    <div className={styles.main_parameter}>
                        <div className={styles.item}>
                            <div className={styles.label}>{t("model.advertisement_id")}</div>
                            <div className={styles.value}>{String(model.id)}</div>
                        </div>
                    </div>
                ) : null}
                <form className={styles.parameters}
                    onSubmit={handleSubmit}
                >
                    <div className={`${isCheckStart && model.name.trim() === "" ? "wrong" : ""} ${styles.main_parameter}`}>
                        <div className={styles.input_field}>
                            <div className={styles.label}>{t("global.name")}</div>
                            <input
                                className={isCheckStart && model.name.trim() === "" ? `${'wrong'}` : ""}
                                placeholder=""
                                type="name"
                                onChange={(event) => setModel({ ...model, name: event.target.value })}
                                value={model.name}
                                onClick={() => setActiveComponent(ComponentType.None)}
                            />
                            <div className={'required'}>*</div>
                        </div>
                    </div>
                    <div className={styles.main_parameter}>
                        <div className={styles.textarea_field}>
                            <div className={styles.label}>{t("model.about_me")}</div>
                            <textarea
                                placeholder=""
                                onChange={(event) => setModel({ ...model, about_self: event.target.value })}
                                value={model.about_self}
                                onClick={() => setActiveComponent(ComponentType.None)}
                            />
                        </div>
                    </div>
                    <ContactsSelector setActiveComponent={setActiveComponent} isCheckStart={isCheckStart} />
                    <div className={styles.item}>
                        <DistrictSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} filters={filters} />
                    </div>
                    <div className={styles.item}>
                        <UndergroundSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} filters={filters} />
                    </div>
                    <ModelTypeSelector setActiveComponent={setActiveComponent} filters={filters} />
                    <div className={styles.item}>
                        <OrientationSelector
                            activeComponent={activeComponent}
                            setActiveComponent={setActiveComponent}
                            isCheckStart={isCheckStart}
                            filters={filters}
                        />
                    </div>
                    <div className={styles.item}>
                        <MeetingSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} filters={filters} />
                    </div>
                    <div className={styles.item}>
                        <AgeSelector
                            activeComponent={activeComponent}
                            setActiveComponent={setActiveComponent}
                            isCheckStart={isCheckStart}
                            filters={filters}
                        />
                    </div>
                    <div className={styles.item}>
                        <HeightSelector
                            activeComponent={activeComponent}
                            setActiveComponent={setActiveComponent}
                            isCheckStart={isCheckStart}
                            filters={filters}
                        />
                    </div>
                    <div className={styles.item}>
                        <WeightSelector
                            activeComponent={activeComponent}
                            setActiveComponent={setActiveComponent}
                            isCheckStart={isCheckStart}
                            filters={filters}
                        />
                    </div>
                    <div className={styles.item}>
                        <EthnicGroupSelector
                            activeComponent={activeComponent}
                            setActiveComponent={setActiveComponent}
                            isCheckStart={isCheckStart}
                            filters={filters}
                        />
                    </div>
                    <div className={styles.item}>
                        <HairColorSelector
                            activeComponent={activeComponent}
                            setActiveComponent={setActiveComponent}
                            isCheckStart={isCheckStart}
                            filters={filters}
                        />
                    </div>
                    <div className={styles.item}>
                        <HairSizeSelector
                            activeComponent={activeComponent}
                            setActiveComponent={setActiveComponent}
                            isCheckStart={isCheckStart}
                            filters={filters}
                        />
                    </div>
                    <div className={styles.item}>
                        <BreastSizeSelector
                            activeComponent={activeComponent}
                            setActiveComponent={setActiveComponent}
                            isCheckStart={isCheckStart}
                            filters={filters}
                        />
                    </div>
                    <div className={styles.item}>
                        <BreastTypeSelector
                            activeComponent={activeComponent}
                            setActiveComponent={setActiveComponent}
                            isCheckStart={isCheckStart}
                            filters={filters}
                        />
                    </div>
                    <div className={styles.item}>
                        <MeetingPlaceSelector
                            activeComponent={activeComponent}
                            setActiveComponent={setActiveComponent}
                            isCheckStart={isCheckStart}
                            filters={filters}
                        />
                    </div>
                    <div className={styles.item}>
                        <ProposalPlacesSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} filters={filters} />
                    </div>
                    <div className={styles.item}>
                        <NationalitySelector
                            activeComponent={activeComponent}
                            setActiveComponent={setActiveComponent}
                            isCheckStart={isCheckStart}
                            filters={filters}
                        />
                    </div>
                    <div className={styles.item}>
                        <TripSelector
                            activeComponent={activeComponent}
                            setActiveComponent={setActiveComponent}
                            isCheckStart={isCheckStart}
                            filters={filters}
                        />
                    </div>
                    <div className={styles.item}>
                        <LanguagesSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} filters={filters} />
                    </div>
                    <div className={styles.item}>
                        <TatooSelector
                            activeComponent={activeComponent}
                            setActiveComponent={setActiveComponent}
                            isCheckStart={isCheckStart}
                            filters={filters}
                        />
                    </div>
                    <div className={styles.item}>
                        <PiercingsSelector
                            activeComponent={activeComponent}
                            setActiveComponent={setActiveComponent}
                            isCheckStart={isCheckStart}
                            filters={filters}
                        />
                    </div>
                    <div className={styles.item}>
                        <SmookerSelector
                            activeComponent={activeComponent}
                            setActiveComponent={setActiveComponent}
                            isCheckStart={isCheckStart}
                            filters={filters}
                        />
                    </div>
                    <div className={styles.item}>
                        <EyesColorSelector
                            activeComponent={activeComponent}
                            setActiveComponent={setActiveComponent}
                            isCheckStart={isCheckStart}
                            filters={filters}
                        />
                    </div>
                    <div className={styles.item}>
                        <PubisHairSelector
                            activeComponent={activeComponent}
                            setActiveComponent={setActiveComponent}
                            isCheckStart={isCheckStart}
                            filters={filters}
                        />
                    </div>
                    <div className={styles.item}>
                        <PornstarSelector
                            activeComponent={activeComponent}
                            setActiveComponent={setActiveComponent}
                            isCheckStart={isCheckStart}
                            filters={filters}
                        />
                    </div>
                    <div className={styles.item}>
                        <BlockedCountriesSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} filters={filters} />
                    </div>
                    <div className={styles.main_parameter}>
                        <ButtonSubmitForm
                            text="global.save"
                        />
                        {/* <button type="submit">{t("global.save")}</button> */}
                    </div>
                </form>
            </div>
            {isMessageModalShow && <MessageModal
                text={infoMessage}
                buttonText={t("global.ok")}
                handlerButtonClick={() => setIsMessageModalShow(false)}

            />}
        </div>
    );
};

export default ModelSettingsNew;