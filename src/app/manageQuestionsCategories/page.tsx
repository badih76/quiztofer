import React from 'react';

import Styles from './page.module.css';
import { IQstCaregories } from '@/common/interfaces/qstCategories';

import CategoriesForm from '@/components/manageQuestionsCategories/CategoriesForm';
import CategoriesList from '@/components/manageQuestionsCategories/CategoriesList';
import CategContextProvider from '@/contexts/questionsCategories';

async function page() {
    
  return (
    <div>
        <div style={{color: "#ffdddd", marginBottom: "30px"}}>
            <h1>Manage Subjects</h1>
        </div>
        <div className={Styles.formContainer}>
            <CategContextProvider>
                <CategoriesList />            
                <CategoriesForm />
            </CategContextProvider>
        </div>
    </div>
  )
}

export default page;