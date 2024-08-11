'use client'
import { Person } from "@/lib/auth/authAction";
import styles from "./Feedbacks.module.sass";
import pageStyles from '@/shared/styles/ModelSettings.module.sass'
import { useTranslations } from "next-intl";
import { useNewModelContext } from "../Context/NewModel/NewModelProvider";
import { useState } from "react";
import { initModelFeedback } from "@/types/model/modelFeedback/initModelFeedback";
import { IModelFeedback } from "@/types/model/modelFeedback/modelFeedback";
import { ModelFeedbackStatus } from "@/enums/modelFeedbackStatus";
import FeedbackItem from "@/shared/components/FeedbackItem/FeedbackItem";
import { addModelFeedback } from "@/lib/models/postDataModels";
import { getModelOne } from "@/lib/models/getDataModel";


interface IModelSettingFeedbacks {
    person: Person
}

const ModelSettingFeedbacks: React.FC<IModelSettingFeedbacks> = ({ person }) => {
    const t = useTranslations()
    const { model, setModel } = useNewModelContext()
    const [addFeedbackActive, setAddFeedbackActive] = useState(-1);
    const [feedback, setFeedback] = useState(initModelFeedback());

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (feedback.text.trim().length !== 0) {
            const addFeedback = await addModelFeedback({ model_feedback: { ...feedback, model_id: model.id, is_from_model: true, name: model.name } });
            if (addFeedback.success) {
                const models = await getModelOne(model.id.toString());
                models && setModel(models)
            }
            if (!addFeedback.success) {
                const models = await getModelOne(model.id.toString());
                models && setModel(models)
                setAddFeedbackActive(-1);
            }
        }
    };

    const getFeedbackAnswer = (feedback: IModelFeedback) => {
        if (
            model.model_feedbacks.filter((modelFeedback: IModelFeedback) => modelFeedback.parent_id === feedback.id).length > 0
        ) {
            return model.model_feedbacks.find((modelFeedback: IModelFeedback) => modelFeedback.parent_id === feedback.id)!;
        } else {
            return null;
        }
    };

    return (
        <div className={pageStyles.content}>
            <div className={pageStyles.title}>{t("model.feedbacks")}</div>
            {model.model_feedbacks.filter((modelFeedback: IModelFeedback) => modelFeedback.status === ModelFeedbackStatus.Applyed)
                .length > 0 ? (
                <div className={styles.feedbacks_list}>
                    {model.model_feedbacks
                        .filter(
                            (modelFeedback: IModelFeedback) =>
                                modelFeedback.status === ModelFeedbackStatus.Applyed && modelFeedback.parent_id === -1
                        )
                        .map((modelFeedback: IModelFeedback, index: number) => (
                            <>
                                <FeedbackItem modelFeedback={modelFeedback} isBordered={index !== 0} isModelSettings={true} />
                                {getFeedbackAnswer(modelFeedback) !== null ? (
                                    <FeedbackItem
                                        modelFeedback={getFeedbackAnswer(modelFeedback)!}
                                        isBordered={index !== 0}
                                        isModelSettings={true}
                                    />
                                ) : (
                                    <>
                                        {addFeedbackActive !== modelFeedback.id ? (
                                            <button
                                                type="button"
                                                className={styles.add_feedback}
                                                onClick={() => setAddFeedbackActive(modelFeedback.id)}
                                            >
                                                {t("model.add_a_feedback")}
                                            </button>
                                        ) : (
                                            <form onSubmit={handleSubmit} className={styles.feedback_form}>
                                                <textarea
                                                    placeholder={t("model.feedback_warning")}
                                                    onChange={(event) =>
                                                        setFeedback({ ...feedback, text: event.target.value, parent_id: modelFeedback.id })
                                                    }
                                                    value={feedback.text}
                                                />
                                                <div className={styles.buttons}>
                                                    <button className={styles.cancel} type="button" onClick={() => setAddFeedbackActive(-1)}>
                                                        {t("global.cancel")}
                                                    </button>
                                                    <button type="submit" disabled={feedback.text.trim().length === 0}>
                                                        {t("global.send")}
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </>
                                )}
                            </>
                        ))}
                </div>
            ) : null}
        </div>
    );
};

export default ModelSettingFeedbacks;