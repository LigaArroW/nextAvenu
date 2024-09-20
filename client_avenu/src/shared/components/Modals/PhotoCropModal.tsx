/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState } from "react";
import ReactCrop, { type Crop } from "react-image-crop";

import { getCroppedImg } from "@/shared/constant/croppedImage";
import { dataURIToBlob, resizeFile } from "@/shared/constant/imageResizer";
import styles from "./Modal.module.sass";


import { Close as CloseIcon } from "../../assets/Close";
import { useNewModelContext } from "../ModelSettings/ui/Context/NewModel/NewModelProvider";

import { useTranslations } from "next-intl";
import { uploadPublicPhoto } from "@/lib/photo/photoUpload";
import 'react-image-crop/dist/ReactCrop.css'
import { getModelOne } from "@/lib/models/getDataModel";

interface IPhotoCropModalProps {
  filename: string;
  closeModal: () => void;

}

const PhotoCropModal: React.FC<IPhotoCropModalProps> = ({ filename, closeModal }) => {
  const t = useTranslations();
  const { model, setModel } = useNewModelContext();
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, unit: "px", height: 80, width: 60 });
  const [imageSize, setImageSize] = useState([0, 0]);
  const [isButtonEnable, setIsButtonEnable] = useState(true);
  const [isLoad, setIsLoad] = useState(false);


  const handleCloseOnClick = () => {
    setImageSize([0, 0]);
    closeModal();
  };

  async function handleUploadPhoto() {
    setIsLoad(true);
    setIsButtonEnable(false);
    let image = document.getElementById("cropped-image") as HTMLImageElement;
    (image as any).crossOrigin = "anonymous";

    image && image.addEventListener("load", async () => {
      let file = (await getCroppedImg(image, crop, filename.replace("/media/photos/", ""))) as unknown as Blob;
      const tmpCompress = await resizeFile(file);
      const compressedFile = dataURIToBlob(tmpCompress);
      const upl = await uploadPublicPhoto({ files: [file, compressedFile], filename: filename, model_id: model.id });
      if (upl.success) {
        const models = await getModelOne(model.id.toString());
        models && setModel(models)
        closeModal();
        setIsButtonEnable(true);
        setIsLoad(false);
      }
    });

  }


  const handlerImageOnLoad = (event: any) => {
    var height = event.currentTarget.height;
    var width = event.currentTarget.width;
    var maxSize = window.innerWidth < 650 ? window.innerWidth - 90 : 500;
    if (height !== 0 && width !== 0) {
      setImageSize([height, width]);
      var cropHeight = 0;
      var cropWidth = 0;
      if (width < height) {
        if (width / height >= 0.75) {
          cropHeight = maxSize;
          cropWidth = maxSize * 0.75;
        } else {
          var scaleCoef = height / maxSize;
          cropWidth = width / scaleCoef;
          cropHeight = cropWidth / 0.75;
        }
      } else {
        var scaleCoef = width / maxSize;
        cropHeight = height / scaleCoef;
        cropWidth = cropHeight * 0.75;
      }
      setCrop({ x: 0, y: 0, unit: "px", height: cropHeight, width: cropWidth });
    } else {
      setCrop({ x: 0, y: 0, unit: "px", height: 80, width: 60 });
    }
  };



  return (
    <div className={`${styles.modal} ${true ? styles.active : ""}`}>
      {/* <div className={`${styles.modal} ${isModalShow && modalType === ModalType.PhotoCrop ? styles.active : ""}`}> */}
      <div
        className={`${styles.overlay} ${true ? styles.active : ""}`}
        // className={`${styles.overlay} ${isModalShow && modalType === ModalType.PhotoCrop ? styles.active : ""}`}
        onClick={handleCloseOnClick}
      />
      <div className={`${styles.modal_content} ${styles.photo_crop}`}>
        {isLoad && <div className={'spinner'}></div>}
        <div className={styles.modal_close} onClick={handleCloseOnClick}>
          <CloseIcon fill="#1B1B1B" />
        </div>
        <div className={styles.photo_crop_content}>
          <ReactCrop
            className={styles.image_crop}
            crop={crop}
            locked={true}
            keepSelection={true}
            onChange={(с) => setCrop(с)}
            style={{
              height:
                imageSize[0] > imageSize[1] ? `${window.innerWidth < 650 ? window.innerWidth - 90 : 500}px` : "auto",
              width:
                imageSize[1] >= imageSize[0]
                  ? `${window.innerWidth < 650 ? window.innerWidth - 90 : 500}px`
                  : "auto",
            }}
          >
            {/* {fileStatuses.uploadTmpPublicPhoto.status === ServerStatusType.Success ? ( */}
            <img
              className={styles.image_crop}
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}api/photos/tmp/${filename}`}
              // src={`/uploads/media/photos/tmp/${filename}`}
              id="cropped-image"
              onLoad={handlerImageOnLoad}
              style={{
                height:
                  imageSize[0] > imageSize[1]
                    ? `${window.innerWidth < 650 ? window.innerWidth - 90 : 500}px`
                    : "auto",
                width:
                  imageSize[1] >= imageSize[0]
                    ? `${window.innerWidth < 650 ? window.innerWidth - 90 : 500}px`
                    : "auto",
              }}
            />
            {/* ) : null} */}
          </ReactCrop>
          <button type="button" onClick={handleUploadPhoto} disabled={!isButtonEnable}>
            {t("global.save")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoCropModal;
