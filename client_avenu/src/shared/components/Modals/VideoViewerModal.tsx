'use client';

import ReactPlayer from "react-player";
import { Close } from "@/shared/assets/Close";
import styles from "./Modal.module.sass";

import { IVideo } from "@/types/model/video/video";
import { useEffect } from "react";

interface IVideoViewerModalProps {
  video: IVideo;
  setVideo: React.Dispatch<React.SetStateAction<IVideo>>;
  onClose: () => void;
}

const VideoViewerModal: React.FC<IVideoViewerModalProps> = ({ setVideo, video, onClose }) => {




  const handleCloseOnClick = () => {
    setVideo({ id: -1 } as IVideo);
    onClose();
  };

  return (
    <div style={{ position: 'absolute' }}>
      <div
        className={`${styles.modal} ${styles.active} ${styles.video
          }`}
      >
        <div
          className={`${styles.overlay} ${styles.active}`}
          onClick={handleCloseOnClick}
        />
        <div className={`${styles.modal_content} ${styles.video_viewer}`}>
          <div className={styles.modal_close} onClick={handleCloseOnClick}>
            <Close fill="#FFFFFF" />
          </div>
          {video.id !== -1 ? (
            <div className={styles.video_viewer_container}>
              <ReactPlayer
                className={styles.video_player}
                url={`${process.env.NEXT_PUBLIC_BACKEND_URL}api/videos/${video.video_url.replace('/media/videos/', "")}`}
                controls
                playing={true}
                width={window.innerHeight < window.innerWidth ? "75vw" : "90vw"}
                height={window.innerHeight < window.innerWidth ? "75vh" : "45vh"}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default VideoViewerModal;
