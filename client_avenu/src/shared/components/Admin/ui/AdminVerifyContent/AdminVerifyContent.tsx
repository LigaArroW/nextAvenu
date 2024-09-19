'use client'

import styles from '@/shared/styles/Admin.module.sass'
import ModelInfo from '../ModelInfo/ModelInfo';
import Image from "next/image";
import ButtonUpdateStatus from '@/widgets/ButtonUpdateStatus/ButtonUpdateStatusPhoto';
import { PhotoStatus } from '@/enums/photoStatus';
import { IPhoto } from '@/types/model/photo/photo';
import { IModel } from '@/types/model/model/model';
import { useState } from 'react';
import Portal from '@/shared/components/ModalPortal/ModalPortal';
import PhotosViewerModal from '@/shared/components/Modals/PhotosViewerModal';

interface IAdminVerifyContent {
    data: IPhoto
    idx: number
    model: IModel[]
    modelPhoto: IPhoto[][]
    children: React.ReactNode
}

const AdminVerifyContent: React.FC<IAdminVerifyContent> = ({ data, idx, model, modelPhoto, children }) => {
    const [showModal, setShowModal] = useState(false)
    const [activeModel, setActiveModel] = useState(-1)
    const [activePhoto, setActivePhoto] = useState(-1)

    return (
        <>
            <div key={data.id} className={styles.container}>
                <div className={styles.photo_container}>
                    {/* <img src={`/uploads${data.photo_url}`} alt="" /> */}
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}api/check_photos/${(data.photo_url)?.split('/')[3]}`}
                        alt=""
                        width={500}
                        height={500}
                        onClick={() => { setShowModal(true); setActiveModel(idx), setActivePhoto(idx) }}
                    />

                    <div className={styles.buttons}>

                        <ButtonUpdateStatus text="Отказ"
                            photo={data}
                            status={PhotoStatus.Rejected}
                        />
                        <ButtonUpdateStatus text="Проверено"
                            photo={data}
                            status={PhotoStatus.Applyed}
                        />

                    </div>

                </div>
                <div className={styles.model_photos_container}>
                    О себе
                    {model[idx] !== undefined && model[idx].about_self !== undefined ? (
                        <>
                            <textarea
                                placeholder=""
                                // onChange={(event) => setFilteredModels({ ...model, about_self: event.target.value })}
                                value={model[idx].about_self}
                                disabled
                            />
                            {/* <ModelInfo data={model[idx]} /> */}
                            {children}
                            {/* <ModelInfo data={model[idx]}></ModelInfo> */}
                        </>
                    ) : null}
                    Другие фото анкеты
                    <div className={styles.photos}>
                        {modelPhoto[idx] && modelPhoto[idx].length > 0 && modelPhoto[idx].map((photo: IPhoto, index: number) => (
                            // <img
                            //     key={photo.id}
                            //     src={`${process.env.NEXT_PUBLIC_BACKEND_URL}api/photos/${(photo.photo_url)?.split('/')[3]}`}
                            //     alt=""
                            //     // onClick={() => { handlerViewPhotoOnClick(index); setActiveModel(idx) }}
                            // />
                            <Image
                                key={photo.id}
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}api/photos/${(photo.photo_url)?.split('/')[3]}`}
                                alt=""
                                width={100}
                                height={160}
                                onClick={() => { setShowModal(true); setActiveModel(idx), setActivePhoto(idx) }}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {showModal && modelPhoto[activeModel] && modelPhoto[activeModel].length > 0 && <Portal>
                <PhotosViewerModal photos={modelPhoto[activeModel]} index={activePhoto} setIndex={setActivePhoto} onClose={() => setShowModal(false)} />
            </Portal>}
        </>
    );
};

export default AdminVerifyContent;
