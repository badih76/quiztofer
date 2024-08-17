'use client'

import React, { useContext, useEffect, useRef, useState } from 'react';
import Styles from '@/app/manageQuestionsCategories/page.module.css';
import { QstCategContext } from '@/contexts/questionsCategories';
import { IFormButtonsHandlers, IFormElement } from '@/common/interfaces/formBuilder';
import FormBulder from '@/components/formBuilder';
import { IQstCaregories } from '@/common/interfaces/qstCategories';
import { getDomainName } from '@/common/sharedCode/general';

const CategoriesForm:React.FunctionComponent = () => {
    const categContext = useContext(QstCategContext);
    const { selectedCateg } = categContext.state;
    
    const formElements: IFormElement[] = [
        {
            name: "cat_id",
            label: "Subject ID",
            type: "number",
            placeHolder: "Subject ID - auto-generated",
            hidden: true
        },
        {
            name: "cat_title",
            label: "Subject Title",
            type: "text",
            placeHolder: "Subject Title",
            hidden: false
        },
        {
            name: "cat_description",
            label: "Subject Description",
            type: "text",
            placeHolder: "Subject Description",
            hidden: false
        },
    ]

    const formbuttonsHandlers: IFormButtonsHandlers = {
        onAdd: function () { console.log('onAdd')},
        onSave: function (data: IQstCaregories, action: string): boolean {
            const domain = getDomainName();

            try {

                console.log("Save: ", data, action);

                fetch(domain + "/api/qstCategories",
                    {
                        "method": "POST",
                        "body": JSON.stringify({ data, action })
                    }
                )
                .then (res => {
                    console.log("Save Res: ", res);
                })

                if(action == 'add') categContext.addCategory(data);
                else categContext.updateCategory(data);
                return true;
            }
            catch(err) {
                return false;
            }
        },
        onCancel: function (): void {
            throw new Error('Function not implemented.');
        }
    }

  return (
    <div className={Styles.categoriesForm}>
        <FormBulder formElements={formElements} 
            formData={selectedCateg} 
            formTitle='Subject Properties'
            formButtonsHandlers={formbuttonsHandlers}/>
    </div>
  )
}

export default CategoriesForm