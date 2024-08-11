'use client';

import { useTranslations } from "next-intl";
import { useNewModelContext } from "../Context/NewModel/NewModelProvider";
import pageStyles from '@/shared/styles/ModelSettings.module.sass'
import styles from "./Photos.module.sass";
import { IPhoto } from "@/types/model/photo/photo";
import { PhotoStatus } from "@/enums/photoStatus";
import { PhotoType } from "@/enums/photoType";
import { Close } from "@/shared/assets/Close";
import { Delete } from "@/shared/assets/Delete";
import { Image as ImageIcon } from "@/shared/assets/Image";
import ConfirmMessageModal from "@/shared/components/Modals/ConfirmMessageModal";
import MessageModal from "@/shared/components/Modals/MessageModal";
import { useMedia } from "react-use";
import { useRef, useState } from "react";

import Image from "next/image";
import PhotoCropModal from "@/shared/components/Modals/PhotoCropModal";
import { uploadCheckPhoto, uploadTmpPublicPhoto } from "@/lib/photo/photoUpload";
import { deletePhoto, updateMainPhoto } from "@/lib/photo/photoAction";
import { getModel, getModelOne, getModelsAgency } from "@/lib/models/getDataModel";
import { Person } from "@/lib/auth/authAction";


interface IModelSettingPhotos {
    person: Person
}

const ModelSettingPhotos: React.FC<IModelSettingPhotos> = ({ person }) => {
    const t = useTranslations();
    const { model, setModel } = useNewModelContext()
    const checkPhotoPicker = useRef<HTMLInputElement>(null);
    const publicPhotoPicker = useRef<HTMLInputElement>(null);
    const isMobile = useMedia("(max-width: 1200px)");
    const [filename, setFilename] = useState("");
    const [deletedPhoto, setDeletedPhoto] = useState({ id: -1 } as IPhoto);
    const [isConfirmModalShow, setIsConfirmModalShow] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    const [isMessageModalShow, setIsMessageModalShow] = useState(false);
    const [checkPhotoProgress, setCheckPhotoProgress] = useState(-1);
    const [publicPhotoProgress, setPublicPhotoProgress] = useState(-1);
    const [photoCropModal, setPhotoCropModal] = useState(false)


    const handleCheckOnChange = async (event: any) => {
        uploadCheckPhoto({
            file: event.target.files[0],
            model_id: model.id,
            onUploadProgress: (data: any) => {
                setCheckPhotoProgress(Math.round(100 * (data.loaded / data.total!)));
            },
        });
        event.target.value = "";
    };

    const handlePublicOnChange = async (event: any) => {
        const fileNameArr = event.target.files[0].name.split(".");
        const fileNameStr = String(model.id) + "mpb" + String(Date.now()) + "." + fileNameArr[fileNameArr.length - 1];
        setFilename(fileNameStr);
        const upl = await uploadTmpPublicPhoto({
            file: event.target.files[0],
            filename: fileNameStr,
            onUploadProgress: (data: any) => {
                setPublicPhotoProgress(Math.round(100 * (data.loaded / data.total!)));
            },
        });
        if (upl.success) {
            setPhotoCropModal(true)
            setCheckPhotoProgress(-1)
            setPublicPhotoProgress(-1)
        }
        if (!upl.success) {
            setPublicPhotoProgress(-1);
            setCheckPhotoProgress(-1);
        }

        event.target.value = "";
    };

    const handleDeleteOnClick = (photo: IPhoto) => {
        setDeletedPhoto(photo);
        setIsConfirmModalShow(true);
    };

    const handleConfirmDeleteOnClick = async () => {
        const del = await deletePhoto({ photo: deletedPhoto });

        if (!del.success) {
            setInfoMessage(del.message);
            setIsMessageModalShow(true);
        }

        if (del.success) {
            const models = await getModelOne(model.id.toString());
            models && setModel(models)
        }

        setIsConfirmModalShow(false);
    };

    const handleChangeMainPhoto = async (photo: IPhoto) => {
        await updateMainPhoto({ model_id: model.id, photo_id: photo.id });
        const models = await getModelOne(model.id.toString());
        models && setModel(models)
    };


    return (
        <div className={pageStyles.content}>
            <div className={`${pageStyles.title} ${pageStyles.media}`}>
                {isMobile && !model.is_verified ? (
                    <div className={pageStyles.no_check + " " + pageStyles.disabled}>
                        <Close fill="#8B8B8B" />
                        {t("model.not_verified")}
                    </div>
                ) : null}
                {t("model.photos")}
                {isMobile && !model.is_verified ? (
                    <div className={pageStyles.no_check}>
                        <Close fill="#8B8B8B" />
                        {t("model.not_verified")}
                    </div>
                ) : null}
            </div>
            <div className={styles.photos_container}>
                {!model.is_verified &&
                    model.photos.filter((photo: IPhoto) => photo.status === PhotoStatus.OnCheck && photo.type === PhotoType.CheckPhoto)
                        .length === 0 ? (
                    <>
                        <input
                            type="file"
                            id="file"
                            onChange={handleCheckOnChange}
                            accept="image/png, image/jpeg"
                            ref={checkPhotoPicker}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                if (checkPhotoPicker.current !== null && checkPhotoProgress === -1) {
                                    checkPhotoPicker.current!.click();
                                }
                            }}
                        >
                            {checkPhotoProgress === -1
                                ? t("model.get_the_verified_status")
                                : `${t("model.loading")}... (${checkPhotoProgress}%)`}
                        </button>
                    </>
                ) : null}
                {model.photos.filter((photo: IPhoto) => photo.type === PhotoType.CheckPhoto && photo.status < PhotoStatus.Applyed)
                    .length > 0 ? (
                    <div className={styles.container}>
                        {t("model.photo_for_verification")}
                        <div className={styles.photos_wrapper}>
                            {model.photos
                                .filter((photo: IPhoto) => photo.type === PhotoType.CheckPhoto && photo.status < PhotoStatus.Applyed)
                                .sort((photoOne: IPhoto, photoTwo: IPhoto) => (Number(photoOne.id) > Number(photoTwo.id) ? 1 : -1))
                                .map((photo: IPhoto) => (
                                    <div
                                        key={photo.id}
                                        className={`${styles.photo_item} ${photo.is_main ? styles.main : ""} ${photo.status === PhotoStatus.OnCheck ? styles.on_check : ""
                                            } ${photo.status === PhotoStatus.Rejected ? styles.rejected : ""}`}
                                    >
                                        {/* <img src={`/uploads${photo.photo_url}`} alt="" /> */}
                                        <Image
                                            src={`http://localhost:8001/api/photos/${(photo.photo_url)?.split('/')[3]}`}
                                            alt=""
                                            width={300}
                                            height={500}
                                        />
                                        {photo.status === PhotoStatus.OnCheck ? (
                                            <div className={styles.check_photo}>{t("model.awaiting_verification")}</div>
                                        ) : null}
                                        {photo.status === PhotoStatus.Rejected ? (
                                            <div className={styles.rejected_photo}>{t("model.rejected_verification")}</div>
                                        ) : null}
                                        <button className={styles.delete_button} type="button" onClick={() => handleDeleteOnClick(photo)}>
                                            <Delete />
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                ) : null}
                <div className={styles.container}>
                    {t("model.public_photo")}
                    <div className={styles.photos_wrapper}>
                        {model.photos
                            .filter((photo: IPhoto) => photo.type === PhotoType.PublicPhoto)
                            .sort((photoOne: IPhoto, photoTwo: IPhoto) => (Number(photoOne.id) > Number(photoTwo.id) ? 1 : -1))
                            .map((photo: IPhoto) => (
                                <div
                                    key={photo.id}
                                    className={`${styles.photo_item} ${photo.is_main ? styles.main : ""} ${photo.status === PhotoStatus.OnCheck ? styles.on_check : ""
                                        } 
                } ${photo.status === PhotoStatus.Rejected ? styles.rejected : ""}`}
                                >
                                    {/* <img src={`/uploads${photo.photo_url}`} alt="" /> */}
                                    <Image
                                        src={`http://localhost:8001/api/photos/${(photo.photo_url)?.split('/')[3]}`}
                                        alt=""
                                        width={300}
                                        height={500}
                                    />
                                    {photo.is_main && photo.status === PhotoStatus.Applyed ? (
                                        <div className={styles.main_photo}>{t("model.the_main_photo")}</div>
                                    ) : null}
                                    {!photo.is_main && photo.status === PhotoStatus.Applyed ? (
                                        <button type="button" onClick={() => handleChangeMainPhoto(photo)}>
                                            {t("model.make_the_main_photo")}
                                        </button>
                                    ) : null}
                                    {photo.status === PhotoStatus.OnCheck ? (
                                        <div className={styles.check_photo}>{t("model.awaiting_verification")}</div>
                                    ) : null}
                                    {photo.status === PhotoStatus.Rejected ? (
                                        <div className={styles.rejected_photo}>{t("model.rejected_media")}</div>
                                    ) : null}
                                    <button className={styles.delete_button} type="button" onClick={() => handleDeleteOnClick(photo)}>
                                        <Delete />
                                    </button>
                                </div>
                            ))}
                        {model.photos.filter((photo: IPhoto) => photo.type === PhotoType.PublicPhoto).length > 30 ? null : (
                            <>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={handlePublicOnChange}
                                    accept="image/png, image/jpeg"
                                    ref={publicPhotoPicker}
                                />
                                <div
                                    className={styles.add}
                                    onClick={() => {
                                        if (publicPhotoPicker.current !== null && publicPhotoProgress === -1) {
                                            publicPhotoPicker.current!.click();
                                        }
                                    }}
                                >
                                    <ImageIcon />
                                    {publicPhotoProgress === -1
                                        ? t("model.select_a_photo")
                                        : `${t("model.loading")}... (${publicPhotoProgress}%)`}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {photoCropModal && <PhotoCropModal filename={filename} closeModal={() => setPhotoCropModal(false)} />}
            <ConfirmMessageModal
                text={t("global.delete_photo_question")}
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
        </div>
    );
};

export default ModelSettingPhotos;