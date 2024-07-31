


import styles from "./Modal.module.sass";

import { ModalType } from "../Modals/ModalType";



import { Close as CloseIcon } from "../../assets/Close";
import { ArrowRight as ArrowRightIcon } from "../../assets/ArrowRight";
import { ArrowLeft as ArrowLeftIcon } from "../../assets/ArrowLeft";
import { IPhoto } from "@/types/model/photo/photo";

interface IPhotosViewerModalProps {
  photos?: IPhoto[];
  index?: number;
  setIndex?: React.Dispatch<React.SetStateAction<number>>;
}

const PhotosViewerModal: React.FC<IPhotosViewerModalProps> = ({ photos, index, setIndex }) => {


  return (
    <h1>asd</h1>
  );
};

export default PhotosViewerModal;
