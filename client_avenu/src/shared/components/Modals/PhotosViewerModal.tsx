'use client';


import styles from "./Modal.module.sass";

import { ModalType } from "../Modals/ModalType";



import { Close } from "../../assets/Close";
import { ArrowRight } from "../../assets/ArrowRight";
import { ArrowLeft } from "../../assets/ArrowLeft";
import { IPhoto } from "@/types/model/photo/photo";
import { useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";

import '../../components/Model/content/media/slick.css';
import '../../components/Model/content/media/slick-theme.css';

interface IPhotosViewerModalProps {
  photos?: IPhoto[] | string[];
  index?: number;
  setIndex?: React.Dispatch<React.SetStateAction<number>>;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const PhotosViewerModal: React.FC<IPhotosViewerModalProps> = ({ photos, index, setIndex, onClose }) => {


  const slider = useRef<Slider | null>(null);
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "50px",
    slidesToShow: 1,
    swipeToSlide: true,
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: false,
    initialSlide: index !== -1 ? index : 0,
    afterChange: (index: number) => {
      setIndex && setIndex(index);
    },
  };

  return (
    <div
      // className={`${styles.modal} ${isModalShow && modalType === ModalType.PhotosViewer ? styles.active : ""} ${
      className={`${styles.modal} ${styles.active} ${styles.photos
        }`}
    >
      <div
        className={`${styles.overlay} ${styles.active}`}

        onClick={() => onClose(false)}
      />
      <div className={`${styles.modal_content} ${styles.photos_viewer}`}  >

        <div className={styles.modal_close} onClick={() => onClose(false)}>
          <Close fill="#FFFFFF" />
        </div>
        {index !== -1 ? (
          <div className={styles.photos_viewer_container} >
            <div className={`${styles.button} ${styles.prev}`} onClick={() => slider?.current?.slickPrev()}>
              <ArrowLeft />
            </div>
            <div
              className={styles.slider}
              style={{
                height: window.innerWidth > window.innerHeight / 1.333 ? "calc(100vh - 30px)" : "",
                width:
                  window.innerWidth > window.innerHeight / 1.333
                    ? "calc((100vh - 30px) * 0.65)"
                    : "calc(100vw - 30px)",
              }}
            >
              <Slider ref={slider} {...settings}>
                {photos && photos.map((photo: string | IPhoto) => (
                  <div key={typeof photo === "string" ? photo : photo.id}>
                    {/* <Image
                           src={photo}
                           alt=""
                           width={500}
                           height={500}
                      
                        /> */}
                    <img
                      src={typeof photo === "string" ? photo : `${process.env.NEXT_PUBLIC_BACKEND_URL}api/photos/${(photo.photo_url)?.split('/')[3]}`}
                      alt=""
                      style={{
                        height: window.innerWidth > window.innerHeight / 1.333 ? "calc(100vh - 30px)" : "auto",
                        width: window.innerWidth > window.innerHeight / 1.333 ? "auto" : "calc(100vw - 30px)",
                      }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
            {/*photos.map((photo: IPhoto, mapIndex: number) => (
              <img
                src={photo.photo_url}
                className={mapIndex === index ? styles.active : ""}
                alt=""
                style={{
                  height: windowSize.innerWidth > windowSize.innerHeight / 1.333 ? "calc(100vh - 30px)" : "auto",
                  width: windowSize.innerWidth > windowSize.innerHeight / 1.333 ? "auto" : "calc(100vw - 30px)",
                }}
              />
              ))*/}
            <div className={`${styles.button} ${styles.next}`} onClick={() => slider?.current?.slickNext()}>
              <ArrowRight />
            </div>
            <div className={styles.count}>{`${index ? index + 1 : 1} / ${photos && photos.length}`}</div>
          </div>
        ) : null
        }
      </div >
    </div >
  );
};

export default PhotosViewerModal;
