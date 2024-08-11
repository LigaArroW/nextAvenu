'use client';

import { IModel } from "@/types/model/model/model";
import styles from "./Feedback.module.sass";
import { useTranslations } from "next-intl";
import { ModelFeedbackStatus } from "@/enums/modelFeedbackStatus";
import FeedbackItem from "@/shared/components/FeedbackItem/FeedbackItem";
import MessageModal from "@/shared/components/Modals/MessageModal";
import { initModelFeedback } from "@/types/model/modelFeedback/initModelFeedback";
import { IModelFeedback } from "@/types/model/modelFeedback/modelFeedback";
import { useEffect, useState } from "react";
import { ComponentType } from "./ComponentType";
import { Rate } from "@/shared/assets/Rate";
import { ArrowUp } from "@/shared/assets/ArrowUp";
import { ArrowDown } from "@/shared/assets/ArrowDown";
import { addModelFeedback } from "@/lib/models/postDataModels";
import { Person } from "@/lib/auth/authAction";
import { RolesUsers } from "@/lib/auth/authType";



interface IFeedbackProps {
  model: IModel;
  person: Person
}

const Feedback: React.FC<IFeedbackProps> = ({ model, person }) => {
  const t = useTranslations()
  const [feedback, setFeedback] = useState(initModelFeedback());
  const [activeComponent, setActiveComponent] = useState(ComponentType.None);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [isFormActive, setIsFormActive] = useState(false);


  useEffect(() => {
    setIsButtonEnabled(feedback.name.trim().length !== 0 && feedback.text.trim().length !== 0 && feedback.rate > 0);
  }, [feedback]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (feedback.name.trim().length !== 0 && feedback.text.trim().length !== 0 && feedback.rate > 0) {
      const resp = await addModelFeedback({ model_feedback: { ...feedback, model_id: model.id } });
      if (resp.success) {
        setFeedback(initModelFeedback());
        setInfoMessage(t("model.thanks_for_feedback"));
        setIsMessageModalShow(true);
        setIsFormActive(false);
      }
      if (!resp.success) {
        setInfoMessage(resp.message);
        setIsMessageModalShow(true);
      }
    }
  };

  const getFeedbackAnswer = (feedback: IModelFeedback) => {
    if (
      model.model_feedbacks.filter(
        (modelFeedback: IModelFeedback) =>
          modelFeedback.parent_id === feedback.id && modelFeedback.status === ModelFeedbackStatus.Applyed
      ).length > 0
    ) {
      return model.model_feedbacks.find(
        (modelFeedback: IModelFeedback) =>
          modelFeedback.parent_id === feedback.id && modelFeedback.status === ModelFeedbackStatus.Applyed
      )!;
    } else {
      return null;
    }
  };

  const rateOnClick = (rate: number) => {
    setActiveComponent(ComponentType.None);
    setFeedback({ ...feedback, rate: rate });
  };

  const handlerPhotoRealOnClick = (value: number) => {
    setFeedback({ ...feedback, is_photo_real: value });
    setActiveComponent(ComponentType.None);
  };

  const handlerOnlyOneOnClick = (value: number) => {
    setFeedback({ ...feedback, is_only_one: value });
    setActiveComponent(ComponentType.None);
  };

  const handlerAddFeedbackOnClick = () => {
    if (person.token === "" || person.roles !== RolesUsers.Customer) {
      setInfoMessage(t("model.feedback_guest"));
      setIsMessageModalShow(true);
    } else {
      setIsFormActive(true);
    }
  };


  return (
    <div className={styles.feedbacks}>
      {`${t("model.feedbacks")} (${model.model_feedbacks.filter(
        (modelFeedback: IModelFeedback) =>
          modelFeedback.status === ModelFeedbackStatus.Applyed && !modelFeedback.is_from_model
      ).length
        })`}
      <div className={styles.feedbacks_wrapper}>
        <div
          className={`${styles.feedbacks_info} ${model.model_feedbacks.filter(
            (modelFeedback: IModelFeedback) => modelFeedback.status === ModelFeedbackStatus.Applyed
          ).length > 0
            ? styles.bordered
            : ""
            }`}
        >
          {model.model_feedbacks.filter(
            (modelFeedback: IModelFeedback) => modelFeedback.status === ModelFeedbackStatus.Applyed
          ).length === 0 ? (
            t("model.there_are_not_feedbacks")
          ) : (
            <div className={styles.feedbacks_rate}>
              <Rate fill="#ffb237" />
              {`${t("model.average_rating")}: ${(
                model.model_feedbacks
                  .filter(
                    (modelFeedback: IModelFeedback) =>
                      modelFeedback.status === ModelFeedbackStatus.Applyed && !modelFeedback.is_from_model
                  )
                  .reduce((accumulator, current) => accumulator + current.rate, 0) /
                model.model_feedbacks.filter(
                  (modelFeedback: IModelFeedback) =>
                    modelFeedback.status === ModelFeedbackStatus.Applyed && !modelFeedback.is_from_model
                ).length
              ).toFixed(2)}`}
            </div>
          )}
          {!isFormActive ? <button onClick={handlerAddFeedbackOnClick}>{t("model.add_a_feedback")}</button> : null}
          <form onSubmit={handleSubmit} className={isFormActive ? styles.active : ""}>
            <div className={styles.input_field}>
              <div className={styles.label}>{t("global.name")}</div>
              <input
                placeholder=""
                type="name"
                required
                onChange={(event) => setFeedback({ ...feedback, name: event.target.value.trim() })}
                value={feedback.name}
                onClick={() => setActiveComponent(ComponentType.None)}
              />
              <div className={'required'}>*</div>
            </div>
            <div className={styles.rate_field}>
              <div className={styles.label}>{t("model.rate")}</div>
              <div className={styles.rate}>
                {Array(5)
                  .fill(0)
                  .map((_value, index) => (
                    <div key={index} className={styles.rate_item} onClick={() => rateOnClick(index + 1)}>
                      <Rate fill={feedback.rate > index ? "#98042D" : "#E1E2E7"} />
                    </div>
                  ))}
              </div>
            </div>
            <div
              className={`${'dropdown'} ${activeComponent === ComponentType.PhotoRealSelector ? 'active' : ""
                }`}
            >
              <div className={'main'}>
                <div className={'label'}>{t("model.a_photo_of_her")}?</div>
                <div
                  className={`${'dropdown_button'} ${styles.dropdown_button}`}
                  onClick={() =>
                    setActiveComponent(
                      activeComponent === ComponentType.PhotoRealSelector
                        ? ComponentType.None
                        : ComponentType.PhotoRealSelector
                    )
                  }
                >
                  {feedback.is_photo_real === -1
                    ? ""
                    : feedback.is_photo_real === 0
                      ? t("model.the_photo_is_not_hers")
                      : t("model.a_photo_of_her")}
                  {activeComponent === ComponentType.PhotoRealSelector ? <ArrowUp /> : <ArrowDown fill="#1B1B1B" />}
                </div>
              </div>
              <div
                className={`${'dropdown_container'} ${activeComponent === ComponentType.PhotoRealSelector ? 'active' : ""
                  } ${styles.dropdown_container}`}
              >
                <div className={'dropdown_list'}>
                  <div className={'dropdown_item'} onClick={() => handlerPhotoRealOnClick(-1)}>
                    {t("global.not_selected_s")}
                  </div>
                  <div className={'dropdown_item'} onClick={() => handlerPhotoRealOnClick(0)}>
                    {t("model.the_photo_is_not_hers")}
                  </div>
                  <div className={'dropdown_item'} onClick={() => handlerPhotoRealOnClick(1)}>
                    {t("model.a_photo_of_her")}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${'dropdown'} ${activeComponent === ComponentType.OnlyOneSelector ? 'active' : ""
                }`}
            >
              <div className={'main'}>
                <div className={'label'}>{t("model.accepts_one")}?</div>
                <div
                  className={`${'dropdown_button'} ${styles.dropdown_button}`}
                  onClick={() =>
                    setActiveComponent(
                      activeComponent === ComponentType.OnlyOneSelector ? ComponentType.None : ComponentType.OnlyOneSelector
                    )
                  }
                >
                  {feedback.is_only_one === -1
                    ? ""
                    : feedback.is_only_one === 0
                      ? t("model.accepts_more_than_one")
                      : t("model.accepts_one")}
                  {activeComponent === ComponentType.OnlyOneSelector ? <ArrowUp /> : <ArrowDown fill="#1B1B1B" />}
                </div>
              </div>
              <div
                className={`${'dropdown_container'} ${activeComponent === ComponentType.OnlyOneSelector ? 'active' : ""
                  } ${styles.dropdown_container}`}
              >
                <div className={'dropdown_list'}>
                  <div className={'dropdown_item'} onClick={() => handlerOnlyOneOnClick(-1)}>
                    {t("global.not_selected_s")}
                  </div>
                  <div className={'dropdown_item'} onClick={() => handlerOnlyOneOnClick(0)}>
                    {t("model.accepts_more_than_one")}
                  </div>
                  <div className={'dropdown_item'} onClick={() => handlerOnlyOneOnClick(1)}>
                    {t("model.accepts_one")}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.textarea_field}>
              <div className={styles.label}>{t("model.feedback")}</div>
              <textarea
                placeholder={t("model.feedback_warning")}
                onChange={(event) => setFeedback({ ...feedback, text: event.target.value })}
                value={feedback.text}
                onClick={() => setActiveComponent(ComponentType.None)}
              />
              <div className={'required'}>*</div>
            </div>
            <div className={styles.buttons}>
              <button className={styles.cancel} type="button" onClick={() => setIsFormActive(false)}>
                {t("global.cancel")}
              </button>
              <button type="submit" disabled={!isButtonEnabled}>
                {t("global.send")}
              </button>
            </div>
          </form>
        </div>
        {model.model_feedbacks.filter(
          (modelFeedback: IModelFeedback) => modelFeedback.status === ModelFeedbackStatus.Applyed
        ).length > 0 ? (
          <div className={styles.feedbacks_list}>
            {model.model_feedbacks
              .filter(
                (modelFeedback: IModelFeedback) =>
                  modelFeedback.status === ModelFeedbackStatus.Applyed && modelFeedback.parent_id === -1
              )
              .map((modelFeedback: IModelFeedback, index: number) => (
                <>
                  <FeedbackItem modelFeedback={modelFeedback} isBordered={index !== 0} isModelSettings={false} />
                  {getFeedbackAnswer(modelFeedback) !== null ? (
                    <FeedbackItem
                      modelFeedback={getFeedbackAnswer(modelFeedback)!}
                      isBordered={index !== 0}
                      isModelSettings={false}
                    />
                  ) : null}
                </>
              ))}
          </div>
        ) : null}
      </div>
      {isMessageModalShow && <MessageModal
        text={infoMessage}
        buttonText={t("global.ok")}
        handlerButtonClick={() => setIsMessageModalShow(false)}

      />}
    </div>
  );
};

export default Feedback;
