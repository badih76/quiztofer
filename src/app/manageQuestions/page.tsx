import React from 'react';

import Styles from './page.module.css';
import { IQuestion } from '@/common/interfaces/questions';

import QuestionForm from '@/components/manageQuestions/QuestionForm';
import QuestionsList from '@/components/manageQuestions/QuestionsList';
import QstContextProvider, { QuestionsContext } from '@/contexts/questionsContext';
// import { Q } from '@/contexts/questionsContext';

async function page() {
    
  return (
    <div>
        <div style={{color: "#ffdddd", marginBottom: "30px"}}>
            <h1>Manage Questions</h1>
        </div>
        <div className={Styles.formContainer}>
            <QstContextProvider>
              <QuestionsList />
              <QuestionForm />
            </QstContextProvider>

        </div>
    </div>
  )
}

export default page;