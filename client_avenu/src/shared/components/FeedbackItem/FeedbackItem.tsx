import { useState } from "react";


import styles from "@/shared/styles/FeedbackItem.module.sass";



import { Rate as RateIcon } from "@/shared/assets/Rate";
import { Like as LikeIcon } from "@/shared/assets/Like";
import { Delete as DeleteIcon } from "@/shared/assets/Delete";
import { Dislike as DislikeIcon } from "@/shared/assets/Dislike";
import { IModelFeedback } from "@/types/model/modelFeedback/modelFeedback";
import { useTranslations } from "next-intl";
import { useNewModelContext } from "../ModelSettings/ui/Context/NewModel/NewModelProvider";
import { ModelFeedbackStatus } from "@/enums/modelFeedbackStatus";
import ConfirmMessageModal from "../Modals/ConfirmMessageModal";
import { deleteModelFeedback } from "@/lib/models/postDataModels";

interface IFeedbackItemProps {
  modelFeedback: IModelFeedback;
  isBordered: boolean;
  isModelSettings: boolean;
}

const FeedbackItem: React.FC<IFeedbackItemProps> = ({ modelFeedback, isBordered, isModelSettings }) => {
  const t = useTranslations();
  const [isConfirmModalShow, setIsConfirmModalShow] = useState(false);

  const handleConfirmDeleteOnClick = async () => {
    await deleteModelFeedback({ feedback: modelFeedback });
    setIsConfirmModalShow(false);
  };

  return (
    <>
      {modelFeedback.parent_id === -1 ? (
        <div className={`${styles.feedback_item} ${isBordered ? styles.bordered : ""}`}>
          <div className={styles.head}>
            <div className={styles.avatar}>{modelFeedback.name.substring(0, 1).toUpperCase()}</div>
            <div className={styles.head_info}>
              <div className={styles.main_info}>
                <div>{modelFeedback.name}</div>
                <div>{new Date(modelFeedback.create_date).toLocaleDateString()}</div>
              </div>
              <div className={styles.statuses}>
                <div className={styles.feedback_rate}>
                  {Array(modelFeedback.rate)
                    .fill(0)
                    .map((_value) => (
                      <RateIcon fill="#ffb237" key={modelFeedback.id} />
                    ))}
                </div>
                {modelFeedback.is_photo_real === 0 ? (
                  <div className={styles.dislike}>
                    <DislikeIcon />
                    {t("model.the_photo_is_not_hers")}
                  </div>
                ) : null}
                {modelFeedback.is_photo_real === 1 ? (
                  <div className={styles.like}>
                    <LikeIcon />
                    {t("model.a_photo_of_her")}
                  </div>
                ) : null}
                {modelFeedback.is_only_one === 0 ? (
                  <div className={styles.accepts}>{t("model.accepts_more_than_one")}</div>
                ) : null}
                {modelFeedback.is_only_one === 1 ? <div className={styles.accepts}>{t("model.accepts_one")}</div> : null}
              </div>
            </div>
          </div>
          <div className={styles.feedback_content}>{modelFeedback.text}</div>
        </div>
      ) : (
        <div
          className={`${styles.feedback_item} ${styles.feedback_answer} ${isModelSettings && modelFeedback.status === ModelFeedbackStatus.Applyed ? styles.applyed : ""
            } ${isModelSettings && modelFeedback.status === ModelFeedbackStatus.Rejected ? styles.rejected : ""} ${isModelSettings && modelFeedback.status === ModelFeedbackStatus.OnCheck ? styles.on_check : ""
            }`}
        >
          {isModelSettings ? (
            <button className={styles.delete_button} type="button" onClick={() => setIsConfirmModalShow(true)}>
              <DeleteIcon />
            </button>
          ) : null}
          {isModelSettings && modelFeedback.status === ModelFeedbackStatus.Rejected ? (
            <div className={styles.rejected}>{t("model.rejected_media")}</div>
          ) : null}
          {isModelSettings && modelFeedback.status === ModelFeedbackStatus.OnCheck ? (
            <div className={styles.on_check}>{t("model.awaiting_verification")}</div>
          ) : null}
          <div className={styles.feedback_connection} />
          <div className={styles.head}>
            <div className={styles.avatar}>{modelFeedback.name.substring(0, 1).toUpperCase()}</div>
            <div className={styles.head_info}>
              <div className={styles.main_info}>
                <div>{modelFeedback.name}</div>
                <div>{new Date(modelFeedback.create_date).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
          <div className={styles.feedback_content}>{modelFeedback.text}</div>
        </div>
      )}
      <ConfirmMessageModal
        text={t("global.delete_feedback_question")}
        okButtonText={t("global.delete")}
        handlerOkOnClick={handleConfirmDeleteOnClick}
        cancelButtonText={t("global.cancel")}
        isShow={isConfirmModalShow}
        setIsShow={setIsConfirmModalShow}
      />
    </>
  );
};

export default FeedbackItem;
