'use client'

import { IModel } from "@/types/model/model/model";
import styles from '@/shared/styles/ProfileModel.module.sass'
import { getProposals } from "@/lib/proposal/proposalAction";
import { useLocale, useTranslations } from "next-intl";
import { PhotoStatus } from "@/enums/photoStatus";
import Image from "next/image";
import { IPhoto } from "@/types/model/photo/photo";
import { ModalType } from "@/shared/components/Modals/ModalType";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Close } from "@/shared/assets/Close";
import { PhotoType } from "@/enums/photoType";
import { Edit } from "@/shared/assets/Edit";
import { PhotoCamera } from "@/shared/assets/PhotoCamera";
import { Warning } from "@/shared/assets/Warning";
import { VideoCamera } from "@/shared/assets/VideoCamera";
import { IVideo } from "@/types/model/video/video";
import { VideoStatus } from "@/enums/videoStatus";
import { TarifTag } from "@/shared/assets/TarifTag";
import { Service } from "@/shared/assets/Service";
import { Statistics } from "@/shared/assets/Statistics";
import { Feedback } from "@/shared/assets/Feedback";
import { IModelFeedback } from "@/types/model/modelFeedback/modelFeedback";
import { Order } from "@/shared/assets/Order";
import { Delete } from "@/shared/assets/Delete";
import ConfirmMessageModal from "@/shared/components/Modals/ConfirmMessageModal";
import MessageModal from "@/shared/components/Modals/MessageModal";
import UpdatePositionInfoModal from "@/shared/components/Modals/UpdatePositionInfoModal";
import { deleteModel, updateModelEnable } from "@/lib/models/postDataModels";
import { IProposal } from "@/types/proposal/proposal";
import { ITarif } from "@/types/model/tarif/tarif";
import { ProposalStatus } from "@/enums/proposalStatus";
import { IProposalView } from "@/types/proposal/proposalView";
import Link from "next/link";
import { Person } from "@/lib/auth/authAction";
import { getModelOne, getModels } from "@/lib/models/getDataModel";
import { getPositionsUp } from "@/lib/verification/verificationAction";


interface IProfileModel {
    proposals: IProposal[]
    proposalViews: IProposalView[]
    model: IModel
    person: Person
    setPositionUp: Dispatch<SetStateAction<any[]>>
}

const ProfileModel: React.FC<IProfileModel> = ({ model, proposals, proposalViews, person, setPositionUp }) => {

    const t = useTranslations();
    const locale = useLocale()
    const [isModelEnable, setIsModelEnable] = useState(model.is_enable);
    const [isConfirmModalShow, setIsConfirmModalShow] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    const [isMessageModalShow, setIsMessageModalShow] = useState(false);
    const [isOrdersNew, setIsOrdersNew] = useState(false);
    const [isModalShow, setIsModalShow] = useState(false);




    useEffect(() => {
        let modelProposals = [] as IProposal[];
        if (
            model.tarifs.length !== 0 &&
            model.tarifs.filter((tarif: ITarif) => tarif.work_duration_id === 2 && tarif.meeting_place_id === 2).length !== 0
        ) {
            const tarif = model.tarifs.find((tarif: ITarif) => tarif.work_duration_id === 2 && tarif.meeting_place_id === 2);
            modelProposals = proposals.filter(
                (proposal: IProposal) =>
                    proposal.status === ProposalStatus.Applyed &&
                    proposal.min_price < tarif!.price &&
                    proposal.max_price > tarif!.price
            );
        }
        const modelProposalsViews = proposalViews.filter((proposalView: IProposalView) => proposalView.model_id === model.id);
        if (modelProposals.length === 0) {
            setIsOrdersNew(false);
        } else {
            if (modelProposalsViews.length === 0) {
                setIsOrdersNew(true);
            } else {
                modelProposals.forEach((proposal: IProposal) => {
                    if (
                        modelProposalsViews.filter((proposalView: IProposalView) => proposalView.proposal_id === proposal.id).length ===
                        0
                    ) {
                        setIsOrdersNew(true);
                    }
                });
            }
        }
    }, [proposals]);


    useEffect(() => {
        const data = async () => {
            const res = await updateModelEnable({ model_id: model.id, is_enable: isModelEnable });
        }

        if (model.is_enable !== isModelEnable) {

            data();
        }

    }, [isModelEnable, model.id, model.is_enable]);

    const handleConfirmDeleteOnClick = async () => {
        const del = await deleteModel({ model: model });

        if (!del.success) {
            setInfoMessage(del.message);
            setIsMessageModalShow(true);
        }
        if (del.success) {
            setIsConfirmModalShow(false);
        }


    };



    const handlerSetModelEnable = () => {
        if (
            model.photos.filter((photo: IPhoto) => photo.status === PhotoStatus.Applyed && photo.type === PhotoType.PublicPhoto)
                .length > 0 &&
            model.tarifs.length > 0 &&
            model.model_services.length > 0
        ) {
            setIsModelEnable(true);
        } else {
            setInfoMessage(t("model.model_enable_message"));
            setIsMessageModalShow(true);
        }
    };


    const handleCapchaClick = async () => {
        const { data } = await getPositionsUp({ agency_id: Number(person._id) })
        setPositionUp(data)
        const mod = await getModelOne(model.id.toString())

        if (mod) {
            model.last_position_update = mod.last_position_update

        }

        setIsModalShow(false)

    }

    return (
        <div className={styles.model}>
            <div className={`${styles.part} ${styles.left}`}>
                {/* <img
                    className={styles.model_photo}
                    src={`/uploads${model.photos.find((photo: IPhoto) => photo.is_main && photo.status === PhotoStatus.Applyed)?.photo_url
                        }`}
                    alt=""
                /> */}
                <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}api/photos/${(model.photos.find((photo: IPhoto) => photo.is_main && photo.status === PhotoStatus.Applyed)?.photo_url)?.split('/')[3]}`}
                    alt=""
                    className={styles.model_photo}
                    width={500}
                    height={500}
                />

                <div>{t("model.last_position_update")}</div>
                <div>{new Date(model.last_position_update).toLocaleDateString() + ' ' + new Date(model.last_position_update).toLocaleTimeString()}</div>
                <div className={styles.part_bottom}>
                    <button
                        type="button"
                        disabled={model.positionsUpLeft < 1}
                        onClick={() => {
                            // setModalType(ModalType.UpdatePositionInfo);
                            setIsModalShow(true);
                        }}
                    >
                        {t("model.improve_position")}
                    </button>
                </div>
                <div>{t("model.update_this_hour_left") + ' ' + (model.positionsUpLeft !== undefined ? model.positionsUpLeft : 6)}</div>
            </div>
            <div className={`${styles.part} ${styles.right}`}>
                <div className={styles.main}>
                    <div className={styles.name}>{model.name}</div>
                    {!model.is_payed ? (
                        <div className={styles.no_check}>
                            <Close fill="#8B8B8B" />
                            {t("model.not_paid_for")}
                        </div>
                    ) : null}
                </div>
                {
                    model.is_enable_by_moderator
                        ? <div className={styles.toggle_wrapper}>
                            <div
                                className={`${styles.toggle} ${!isModelEnable ? styles.active : ""}`}
                                onClick={() => setIsModelEnable(false)}
                            >
                                {t("model.turned_off")}
                            </div>
                            <div className={`${styles.toggle} ${isModelEnable ? styles.active : ""}`} onClick={handlerSetModelEnable}>
                                {t("model.turned_on")}
                            </div>
                        </div>
                        : <div className={`${styles.toggle_wrapper} ${styles.toggle_wrapper_disabled}`} title={t("profile.profile_disabled_by_moderator")}>
                            <div className={`${styles.toggle} ${styles.active}`}>
                                {t("model.turned_off")}
                            </div>
                            <div className={styles.toggle}>
                                {t("model.turned_on")}
                            </div>
                        </div>
                }
                <div className={styles.links}>
                    <Link
                        className={styles.link}
                        href={`/${locale}/profile/model_settings/parameters/${model.id}`}
                    >
                        <Edit />
                        {t("model.edit_profile")}
                    </Link>
                    <Link
                        className={styles.link}
                        href={`/${locale}/profile/model_settings/photos/${model.id}`}
                    >
                        <PhotoCamera />
                        {t("model.photos")}
                        {model.photos.filter(
                            (photo: IPhoto) => photo.status > PhotoStatus.Rejected && photo.type === PhotoType.PublicPhoto
                        ).length === 0 ? (
                            <div className={styles.warning}>
                                <Warning />
                            </div>
                        ) : null}
                    </Link>
                    <Link
                        className={styles.link}
                        href={`/${locale}/profile/model_settings/videos/${model.id}`}
                    >
                        <VideoCamera />
                        {t("model.videos")}
                        {model.videos.filter((video: IVideo) => video.status > VideoStatus.Rejected).length === 0 ? (
                            <div className={styles.warning}>
                                <Warning />
                            </div>
                        ) : null}
                    </Link>
                    <Link
                        className={styles.link}
                        href={`/${locale}/profile/model_settings/tariffs/${model.id}`}
                    >
                        <TarifTag />
                        {t("model.tariffs")}
                        {model.tarifs.length === 0 ? (
                            <div className={styles.warning}>
                                <Warning />
                            </div>
                        ) : null}
                    </Link>
                    <Link
                        className={styles.link}
                        href={`/${locale}/profile/model_settings/services/${model.id}`}
                    >
                        <Service />
                        {t("model.services")}
                        {model.model_services.length === 0 ? (
                            <div className={styles.warning}>
                                <Warning />
                            </div>
                        ) : null}
                    </Link>
                    <Link
                        className={styles.link}
                        href={`/${locale}/profile/model_settings/statistics/${model.id}`}
                    >
                        <Statistics />
                        {t("model.statistics")}
                    </Link>
                    <Link
                        className={styles.link}
                        href={`/${locale}/profile/model_settings/feedbacks/${model.id}`}
                    >
                        <Feedback />
                        {t("model.feedbacks")}
                        {model.model_feedbacks.filter((modelFeedback: IModelFeedback) => !modelFeedback.is_viewed).length > 0 ? (
                            <div className={styles.warning}>
                                <Warning />
                            </div>
                        ) : null}
                    </Link>
                    <Link
                        className={styles.link}
                        href={`/${locale}/profile/model_settings/orders/${model.id}`}
                    >
                        <Order />
                        {t("model.orders")}
                        {isOrdersNew ? (
                            <div className={styles.warning}>
                                <Warning />
                            </div>
                        ) : null}
                    </Link>
                </div>
                <div className={styles.main}>
                    <div className={styles.id}>ID: {String(model.id).padStart(8, "0")}</div>
                    <button className={styles.delete_button} type="button" onClick={() => setIsConfirmModalShow(true)}>
                        <Delete />
                    </button>
                </div>
            </div>
            <ConfirmMessageModal
                text={t("global.delete_model_question")}
                okButtonText={t("global.delete")}
                handlerOkOnClick={handleConfirmDeleteOnClick}
                cancelButtonText={t("global.cancel")}
                isShow={isConfirmModalShow}
                setIsShow={setIsConfirmModalShow}
            />
            {isMessageModalShow && <MessageModal
                text={infoMessage}
                buttonText={t("global.ok")}
                handlerButtonClick={() => setIsMessageModalShow(false)}

            />}
            {isModalShow && <UpdatePositionInfoModal handlerButtonClick={handleCapchaClick} agency_id={model.agency_id} model_id={model.id} person={person} />}
        </div>
    );
};

export default ProfileModel;




