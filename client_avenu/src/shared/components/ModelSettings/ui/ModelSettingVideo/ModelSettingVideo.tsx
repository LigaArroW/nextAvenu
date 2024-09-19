'use client'

import { useTranslations } from "next-intl";
import { useNewModelContext } from "../Context/NewModel/NewModelProvider";
import styles from "./Videos.module.sass";
import pageStyles from '@/shared/styles/ModelSettings.module.sass'
import { Person } from "@/lib/auth/authAction";
import { IVideo } from "@/types/model/video/video";
import { VideoStatus } from "@/enums/videoStatus";
import { Delete } from "@/shared/assets/Delete";
import { useRef, useState } from "react";
import { uploadPublicVideo } from "@/lib/photo/photoUpload";
import { deleteVideo } from "@/lib/video/videoAction";
import { Video } from "@/shared/assets/Video";
import ConfirmMessageModal from "@/shared/components/Modals/ConfirmMessageModal";
import MessageModal from "@/shared/components/Modals/MessageModal";
import { getModel, getModelOne } from "@/lib/models/getDataModel";
import { IModel } from "@/types/model/model/model";

interface IModelSettingVideo {
    person: Person
}

const ModelSettingVideo: React.FC<IModelSettingVideo> = ({ person }) => {
    const t = useTranslations()
    const { model, setModel } = useNewModelContext()
    const publicVideoPicker = useRef<HTMLInputElement>(null);
    const [deletedVideo, setDeletedVideo] = useState({ id: -1 } as IVideo);
    const [isConfirmModalShow, setIsConfirmModalShow] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    const [isMessageModalShow, setIsMessageModalShow] = useState(false);
    const [videoDuration, setVideoDuration] = useState(0);
    const [progress, setVideoProgress] = useState(-1);

    const handlePublicVideoOnChange = async (event: any) => {
        var video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = function () {
            window.URL.revokeObjectURL(video.src);
            setVideoDuration(video.duration);
        };
        console.log(videoDuration);
        video.src = URL.createObjectURL(event.target.files[0]);
        if (event.target.files[0].size / 1024 / 1024 > 100) {
            setInfoMessage(t("model.video_not_accepted"));
            setIsMessageModalShow(true);
        } else {
            const fileNameArr = event.target.files[0].name.split(".");
            const fileNameStr = String(model.id) + "mvb" + String(Date.now()) + "." + fileNameArr[fileNameArr.length - 1];
            const upl = await uploadPublicVideo({
                filename: fileNameStr,
                file: event.target.files[0],
                model_id: model.id,
                onUploadProgress: (data: any) => {
                    setVideoProgress(Math.round(100 * (data.loaded / data.total!)));
                },
            });

            if (upl.success) {
                setVideoProgress(-1);
                // const models = await getModelOne(model.id.toString());
                // models && setModel(models)
                const models = await getModel({ profile_id: Number(person._id) }) as IModel[]
                const modelAnother = models.find(m => m.id === model.id)
                modelAnother && setModel(modelAnother)
            }

            if (!upl.success) {
                setVideoProgress(-1);
            }
        }
        event.target.value = "";
    };

    const handleDeleteOnClick = (video: IVideo) => {
        setDeletedVideo(video);
        setIsConfirmModalShow(true);
    };

    const handleConfirmDeleteOnClick = async () => {
        const del = await deleteVideo({ video: deletedVideo });
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


    return (
        <div className={pageStyles.content}>
            <div className={`${pageStyles.title} ${pageStyles.media}`}>{t("model.videos")}</div>
            <div className={styles.info}>
                <div className={styles.info_item}>
                    {`${t("model.accepted_video_formats")}: `}
                    <span>.mkv, .mp4, .mov</span>
                </div>
                <div className={styles.info_item}>
                    {`${t("model.maximum_video_size")}: `} <span>100{t("model.mb")}</span>
                </div>
                <div className={styles.info_item}>
                    {`${t("model.maximum_video_duration")}: `} <span>5 {t("model.minutes")}</span>
                </div>
                <div className={styles.info_item}>
                    {`${t("model.minimum_video_duration")}: `} <span>10 {t("model.seconds")}</span>
                </div>
            </div>
            <div className={styles.videos_container}>
                <div className={styles.videos_wrapper}>
                    {model.videos.map((video: IVideo) => (
                        <div
                            key={video.id}
                            className={`${styles.video_item} ${video.status === VideoStatus.OnCheck ? styles.on_check : ""} ${video.status === VideoStatus.Rejected ? styles.rejected : ""
                                }`}
                        >
                            <video
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}api/videos/${video.video_url.replace('/media/videos/', "")}`}
                                //  src={`/uploads${video.video_url}`}

                                autoPlay={false} />
                            {video.status === VideoStatus.OnCheck ? (
                                <div className={styles.check_video}>{t("model.awaiting_verification")}</div>
                            ) : null}
                            {video.status === VideoStatus.Rejected ? (
                                <div className={styles.rejected_video}>{t("model.rejected_media")}</div>
                            ) : null}
                            <button className={styles.delete_button} type="button" onClick={() => handleDeleteOnClick(video)}>
                                <Delete />
                            </button>
                        </div>
                    ))}
                    {model.videos.filter((video: IVideo) => video.status > VideoStatus.Rejected).length > 29 ? null : (
                        <>
                            <input
                                type="file"
                                id="file"
                                onChange={handlePublicVideoOnChange}
                                accept="video/mp4, video/mov, video/mkv, video/avi"
                                ref={publicVideoPicker}
                            />
                            <div
                                className={styles.add}
                                onClick={() => {
                                    if (publicVideoPicker.current !== null && progress === -1) {
                                        publicVideoPicker.current!.click();
                                    }
                                }}
                            >
                                <Video />
                                {progress === -1 ? t("model.select_a_video") : `${t("model.loading")}... (${progress}%)`}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <ConfirmMessageModal
                text={t("global.delete_video_question")}
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

export default ModelSettingVideo;
