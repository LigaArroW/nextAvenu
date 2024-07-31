/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";




import styles from "./Modal.module.sass";

import { ModalType } from "../Modals/ModalType";

import { Close as CloseIcon } from "../../assets/Close";

interface IPhotoCropModalProps {
  filename: string;
}

const PhotoCropModal: React.FC<IPhotoCropModalProps> = ({ filename }) => {
 
  // const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, unit: "px", height: 80, width: 60 });
  const [imageSize, setImageSize] = useState([0, 0]);
  const [isButtonEnable, setIsButtonEnable] = useState(true);





  


  

  return (
  <>asd</>
  );
};

export default PhotoCropModal;
