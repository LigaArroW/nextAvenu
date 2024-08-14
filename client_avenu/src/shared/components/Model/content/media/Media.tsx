'use client';

import { IModel } from "@/types/model/model/model";
import { useTranslations } from "next-intl";
import styles from '@/shared/styles/Model.module.sass'
import Slider from "react-slick";
import { ArrowLeft } from "@/shared/assets/ArrowLeft";
import { useEffect, useRef, useState } from "react";
import { IVideo } from "@/types/model/video/video";
import { IPhoto } from "@/types/model/photo/photo";
import { PhotoType } from "@/enums/photoType";
import { PhotoStatus } from "@/enums/photoStatus";
import Image from "next/image";
import { ArrowRight } from "@/shared/assets/ArrowRight";
import { Verifyed } from "@/shared/assets/Verifyed";
import { VideoStatus } from "@/enums/videoStatus";
import PhotosViewerModal from "@/shared/components/Modals/PhotosViewerModal";
import VideoViewerModal from "@/shared/components/Modals/VideoViewerModal";

import './slick.css';
import './slick-theme.css';
import Portal from "@/shared/components/ModalPortal/ModalPortal";
// import '../../../../../../node_modules/react-slick/'

interface IMediaProps {
  model: IModel
  photos: string[] | undefined
}

const Media: React.FC<IMediaProps> = ({ model, photos }) => {
  const t = useTranslations();
  const [videosLenght, setVideosLength] = useState(0);
  const [activePhoto, setActivePhoto] = useState(-1);
  const [activeVideo, setActiveVideo] = useState({ id: -1 } as IVideo);
  const slider = useRef<Slider | null>(null);

  const [isModalShow, setIsModalShow] = useState(false);
  const [isVideoModalShow, setIsVideoModalShow] = useState(false);

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "50px",
    slidesToShow: 1,
    swipeToSlide: true,
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: false,
  };

  useEffect(() => {
    setVideosLength(model.videos.filter((video: IVideo) => video.status === VideoStatus.Applyed).length);
  }, [model.videos])

  const handlerViewPhotoOnClick = (index: number) => {
    // setModalType(ModalType.PhotosViewer);
    setActivePhoto(index);
    setIsModalShow(true);
  };

  const handlerViewVideoOnClick = (video: IVideo) => {
    // setModalType(ModalType.VideoViewer);
    setIsVideoModalShow(true);
    setActiveVideo(video);

  };



  return (
    // <div className={styles.media}>
    <>
      <div className={styles.slider}>
        <div
          className={`${styles.action} ${styles.prev}`}
          onClick={(event) => {
            event.stopPropagation();
            slider?.current?.slickPrev();
          }}
        >
          <ArrowLeft />
        </div>
        <Slider ref={slider} {...settings}>
          {photos && photos
            // .filter((photo: IPhoto) => photo.type === PhotoType.PublicPhoto && photo.status === PhotoStatus.Applyed)
            .map((photo: string, index: number) => (
              <div key={index} className={styles.photo_container}>
                {/* <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}api/photos/${(photo.photo_url)?.split('/')[3]}`} alt="" /> */}

                <Image
                  src={photo}
                  // src={`${process.env.NEXT_PUBLIC_BACKEND_URL}api/photos/${(photo.photo_url)?.split('/')[3]}`}
                  alt=""
                  // fill
                  // objectFit="contain"
                  width={500}
                  height={200}
                  priority
                  onClick={() => handlerViewPhotoOnClick(index)}

                />


              </div>
            ))}
        </Slider>
        {model.is_verified &&
          model.photos.filter((photo: IPhoto) => photo.type === PhotoType.CheckPhoto && photo.status === PhotoStatus.Applyed)
            .length > 0 ? (
          <div className={styles.photo_verified}>{`${t("model.photo_verified")} ${new Date(
            model.photos
              .filter((photo: IPhoto) => photo.type === PhotoType.CheckPhoto && photo.status === PhotoStatus.Applyed)
              .sort((photoOne: IPhoto, photoTwo: IPhoto) =>
                Number(photoOne.id) < Number(photoTwo.id) ? 1 : -1
              )[0].update_date
          ).toLocaleDateString()}`}</div>
        ) : null}
        <div
          className={`${styles.action} ${styles.next}`}
          onClick={(event) => {
            event.stopPropagation();
            slider?.current?.slickNext();
          }}
        >
          <ArrowRight />
        </div>
      </div>
      {model.is_verified ? (
        <div className={styles.verified}>
          <Verifyed />
        </div>
      ) : null}
      <div className={styles.media_content}>
        {t("model.photos_sub")}: {photos?.length}
        {photos && photos.length > 4 && (
          <div className={styles.content}>
            {photos && photos
              // .filter((photo: IPhoto) => photo.type === PhotoType.PublicPhoto && photo.status === PhotoStatus.Applyed)
              .slice(0, 3)
              .map((photo: string, index: number) => (
                <Image
                  key={index}
                  src={photo}
                  // src={`${process.env.NEXT_PUBLIC_BACKEND_URL}api/photos/${(photo.photo_url)?.split('/')[3]}`}
                  alt=""
                  // fill
                  // objectFit="contain"
                  className={styles.content_item}
                  width={110}
                  height={150}
                  priority
                  onClick={() => handlerViewPhotoOnClick(index)}

                />

              ))}
            <div className={styles.more_content_item} >
              <div className={styles.more_content_item} onClick={() => handlerViewPhotoOnClick(3)}>
                <Image

                  src={photos && photos[3]}
                  // src={`${process.env.NEXT_PUBLIC_BACKEND_URL}api/photos/${(photo.photo_url)?.split('/')[3]}`}
                  alt=""

                  className={styles.content_item}
                  width={500}
                  height={200}
                  priority
                // onClick={() => handlerViewPhotoOnClick(index)}

                />
                <div className={styles.more_content}>
                  {t("model.still")} {photos && photos.length - 3}
                </div>
              </div>
            </div>
          </div>
        )}
        {photos && photos.length < 5 && (
          <div className={styles.content}>
            {photos && photos
              .map((photo: string, index: number) => (

                <Image
                  key={index}
                  src={photo}
                  alt=""

                  className={styles.content_item}
                  width={110}
                  height={150}
                  priority
                  onClick={() => handlerViewPhotoOnClick(index)}

                />


              ))}
          </div>
        )}
      </div>
      {model.videos.length > 0 && (
        <div className={styles.media_content}>
          {t("model.videos")}: {videosLenght}
          <div className={styles.content}>
            {model.videos
              .filter((video: IVideo) => video.status === VideoStatus.Applyed)
              .map((video: IVideo) => (
                <video
                  key={video.id}
                  className={`${styles.content_item} ${styles.video}`}
                  // src={`/uploads${video.video_url}`}
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}api/videos/${video.video_url.replace('/media/videos/', "")}`}
                  autoPlay={false}
                  onClick={() => handlerViewVideoOnClick(video)}
                />
              ))}
          </div>
        </div>
      )}
      {photos && photos.length > 0 && isModalShow && (
        <Portal>
          <PhotosViewerModal
            photos={photos}
            index={activePhoto}
            setIndex={setActivePhoto}
            onClose={setIsModalShow}
          />
        </Portal>
      )}

      {videosLenght > 0 && isVideoModalShow &&
        <VideoViewerModal
          video={activeVideo}
          setVideo={setActiveVideo}
          onClose={() => setIsVideoModalShow(false)}
        />}
    </>
    // </div>
  );
};

export default Media;
