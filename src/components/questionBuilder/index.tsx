import React from 'react'
import Styles from './styles.module.css';
import { IQuestion } from '@/common/interfaces/questions';

interface IQuestionBuilderProps {
    question: IQuestion
}

function QuestionBuilder({ question }: IQuestionBuilderProps) {
  return (
    <div className={Styles.questionContainer}>
        <div className={Styles.questionBody}>
            {question.qst_body}
        </div>
        <div className={Styles.anwersContainer}>
            <div className={Styles.answersRow}>
                <div className={Styles.answer}>
                    {question.qst_answer1}
                </div>
                <div className={Styles.answer}>
                    {question.qst_answer2}
                </div>
            </div>
            <div className={Styles.answersRow}>
                <div className={Styles.answer}>
                    {question.qst_answer3}
                </div>
                <div className={Styles.answer}>
                    {question.qst_answer4}
                </div>
            </div>
        </div>
        <div></div>
    </div>
  )
}

export default QuestionBuilder