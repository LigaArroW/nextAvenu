

import styles from "./Modal.module.sass";


interface IUpdatePositionInfoModalProps {
  agency_id: number;
  model_id: number;
  handlerButtonClick: Function;
}

function useFocus<T extends HTMLElement = HTMLElement>() {
  // const ref = useRef<T>(null);
  // const setFocus = () => ref?.current?.focus?.();
  // return [ref, setFocus] as const;
}

const UpdatePositionInfoModal: React.FC<IUpdatePositionInfoModalProps> = () => {






  return (
    <div className={`${styles.modal} ${styles.info} ${styles.active}`}>
      <div className={`${styles.overlay} ${styles.active}`} />
      adas
    </div>
  );
};

export default UpdatePositionInfoModal;
