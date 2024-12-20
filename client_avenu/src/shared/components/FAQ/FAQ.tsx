'use client'
import styles from '@/shared/styles/Faq.module.sass';
import { IFaq } from "@/types/faq/faq";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import parse from "html-react-parser";
import { ArrowUp } from '@/shared/assets/ArrowUp';
import { ArrowDown } from '@/shared/assets/ArrowDown';


interface IFAQ {
    faqs: IFaq[]
}


const FAQ: React.FC<IFAQ> = ({ faqs }) => {
    const t = useTranslations();
    const [openedQuestions, setOpenedQuestions] = useState([] as number[]);
    const locale = useLocale();




    const handleFaqItemOnClick = (faq_id: number) => {
        if (openedQuestions.includes(faq_id)) {
            setOpenedQuestions(openedQuestions.filter((item: number) => item !== faq_id));
        } else {
            setOpenedQuestions([...openedQuestions, faq_id]);
        }
    };
    return (
        <div className={styles.content}>
            <div className={styles.title}>{t("global.faq")}</div>
            <div className={styles.faq_list}>
                {Array.isArray(faqs) && faqs.length > 0
                    ? faqs.map((faq: IFaq) => (
                        <div key={faq.id} className={styles.faq_item} onClick={() => handleFaqItemOnClick(faq.id)}>
                            <div className={styles.question}>
                                {locale === "ru" ? faq.question : faq.question_eng}
                                {openedQuestions.includes(faq.id) ? <ArrowUp /> : <ArrowDown fill="#1B1B1B" />}
                            </div>
                            <div className={`${styles.answer} ${openedQuestions.includes(faq.id) ? styles.active : ""}`}>
                                {locale === "ru" ? parse(faq.answer) : parse(faq.answer_eng)}
                            </div>
                        </div>
                    ))
                    : null}
            </div>
        </div>
    );
};

export default FAQ;