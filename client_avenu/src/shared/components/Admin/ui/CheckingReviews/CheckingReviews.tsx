import { ModelFeedbackStatus } from '@/enums/modelFeedbackStatus';
import { getModelFeedbacks } from '@/lib/models/getDataModel';
import { Dislike } from '@/shared/assets/Dislike';
import { Like } from '@/shared/assets/Like';
import { Rate } from '@/shared/assets/Rate';
import styles from '@/shared/styles/Admin.module.sass'
import { IModelFeedback } from '@/types/model/modelFeedback/modelFeedback';
import ButtonUpdateStatusFeedback from '@/widgets/ButtonUpdateStatus/ButtonUpdateStatusFeedback';
import { getTranslations } from 'next-intl/server';

interface ICheckingReviews {
    id: string
}



const CheckingReviews: React.FC<ICheckingReviews> = async ({ id }) => {
    const t = await getTranslations()
    const feedbacks = await getModelFeedbacks()

    let feedbackTmp: IModelFeedback[] = []
    if (
        Array.isArray(feedbacks) &&
        feedbacks.filter((modelFeedback: IModelFeedback) => modelFeedback.status === ModelFeedbackStatus.OnCheck).length > 0
    ) {
        feedbackTmp = feedbacks.filter(
            (modelFeedback: IModelFeedback) => modelFeedback.status === ModelFeedbackStatus.OnCheck
        );
    }



    return (
        <div className={styles.main_content}>
            <div className={styles.title}>{id}</div>
            {feedbackTmp.map((data) =>
                <div key={data.id} className={styles.container}>
                    <div className={styles.feedback_container}>
                        {data.parent_id === -1 ? (
                            <div className={styles.feedback_item}>
                                <div className={styles.head}>
                                    <div className={styles.avatar}>{data.name.substring(0, 1).toUpperCase()}</div>
                                    <div className={styles.head_info}>
                                        <div className={styles.main_info}>
                                            <div>{data.name}</div>
                                            <div>{new Date(data.create_date).toLocaleDateString()}</div>
                                        </div>
                                        <div className={styles.statuses}>
                                            <div className={styles.feedback_rate}>
                                                {Array(data.rate)
                                                    .fill(0)
                                                    .map((_value) => (
                                                        <Rate key={data.id} fill="#ffb237" />
                                                    ))}
                                            </div>
                                            {data.is_photo_real === 0 ? (
                                                <div className={styles.dislike}>
                                                    <Dislike />
                                                    {t("model.the_photo_is_not_hers")}
                                                </div>
                                            ) : null}
                                            {data.is_photo_real === 1 ? (
                                                <div className={styles.like}>
                                                    <Like />
                                                    {t("model.a_photo_of_her")}
                                                </div>
                                            ) : null}
                                            {data.is_only_one === 0 ? (
                                                <div className={styles.accepts}>{t("model.accepts_more_than_one")}</div>
                                            ) : null}
                                            {data.is_only_one === 1 ? (
                                                <div className={styles.accepts}>{t("model.accepts_one")}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.feedback_content}>{data.text}</div>
                                <div className={styles.divider} />
                                {
                                    data.user_data && JSON.parse(data.user_data) && Object.keys(JSON.parse(data.user_data)).map((key) =>
                                        <div key={key} className={styles.feedback_content}>{key}: {JSON.parse(data.user_data)[key]}</div>
                                    )
                                }
                            </div>
                        ) : (
                            <div className={`${styles.feedback_item} ${styles.feedback_answer}`}>
                                <div className={styles.head}>
                                    <div className={styles.avatar}>{data.name.substring(0, 1).toUpperCase()}</div>
                                    <div className={styles.head_info}>
                                        <div className={styles.main_info}>
                                            <div>{data!.name}</div>
                                            <div>{new Date(data!.create_date).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.feedback_content}>{data!.text}</div>
                            </div>
                        )}
                        <div className={styles.buttons}>
                            <ButtonUpdateStatusFeedback
                                text='Отказ'
                                status={ModelFeedbackStatus.Rejected}
                                model_feedback={data}
                            />
                            <ButtonUpdateStatusFeedback
                                text='Проверено'
                                status={ModelFeedbackStatus.Applyed}
                                model_feedback={data}
                            />
                   
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default CheckingReviews;