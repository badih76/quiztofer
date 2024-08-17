'use client'

import React, { useContext, useEffect, useRef, useState } from 'react';
import Styles from '@/app/manageQuestions/page.module.css';
import { QuestionsContext } from '@/contexts/questionsContext';
import { IFormButtonsHandlers, IFormElement } from '@/common/interfaces/formBuilder';
import FormBulder from '@/components/formBuilder';
import { IQuestion } from '@/common/interfaces/questions';
import { getDomainName } from '@/common/sharedCode/general';
import { IQstCaregories } from '@/common/interfaces/qstCategories';

const QuestionForm:React.FunctionComponent = () => {
    const qstContext = useContext(QuestionsContext);
    const { selectedQst } = qstContext.state;
    
    const formElementsTemplate: IFormElement[] = [
        {
            name: "qst_id",
            label: "Question ID",
            type: "number",
            placeHolder: "Question ID - auto-generated",
            hidden: true
        },
        {
            name: "qst_body",
            label: "Question Body",
            type: "text",
            placeHolder: "Question Body",
            hidden: false
        },
        {
            name: "qst_category",
            label: "Question Category",
            type: "list",
            placeHolder: "Question Category",
            data: [],
            hidden: false
        },
        {
            name: "qst_answer1",
            label: "Answer Option 1",
            type: "text",
            placeHolder: "Answer Option 1",
            hidden: false
        },
        {
            name: "qst_answer2",
            label: "Answer Option 2",
            type: "text",
            placeHolder: "Answer Option 2",
            hidden: false
        },
        {
            name: "qst_answer3",
            label: "Answer Option 3",
            type: "text",
            placeHolder: "Answer Option 3",
            hidden: false
        },
        {
            name: "qst_answer4",
            label: "Answer Option 4",
            type: "text",
            placeHolder: "Answer Option 4",
            hidden: false
        },
        {
            name: "qst_correctAnswer",
            label: "Correct Answer Number",
            type: "number",
            placeHolder: "The Correct Answer Number",
            hidden: false
        },
        
    ]

    const [ categData, setCategData ] = useState<any>([]);
    const [ formElements, setFormElements ] = useState<IFormElement[]>(formElementsTemplate);

    const formbuttonsHandlers: IFormButtonsHandlers = {
        onAdd: function () { console.log('onAdd')},
        onSave: function (data: IQuestion, action: string): boolean {
            const domain = getDomainName();

            try {

                console.log("Save: ", data, action);

                fetch(domain + "/api/questions/manage",
                    {
                        "method": "POST",
                        "body": JSON.stringify({ data, action })
                    }
                )
                .then (res => {
                    console.log("Save Res: ", res);
                })

                if(action == 'add') qstContext.addQuestion(data);
                else qstContext.updateQuestion(data);
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

    const fetchData = (url: string, options: any) => {
        try {
        //   setFetchingData(true);
    
          const res = fetch(url,
            {
            method: 'get',
            cache: "no-cache"
            })
          .then( res => {
            return res.json();
          })
          .then (json => {
            if(json.returnedStatus == 500) throw new Error(json.error);
    
            let data: IQstCaregories[] = [];
    
            json.data.map((c: IQstCaregories) => {
              data.push(c);
            });
    
            const newCategListSorted = data.sort((a: IQstCaregories, b: IQstCaregories) => {
              if (a.cat_title.toUpperCase() < b.cat_title.toUpperCase()) return -1;
              else if (a.cat_title > b.cat_title) return 1;
              else return 0;
            });

            const newCategData = newCategListSorted.map((c: IQstCaregories) => {
                return { option: c.cat_title, value: c.cat_id }
            });
    
            console.log(newCategData);
            setCategData(newCategData);
            
            // setFetchingData(false);
          })
          .catch(err => {
            console.log("Error: ", (err as any).message);
            
          });
    
        }
        catch(err) {
          console.log("Error: ", (err as any).message);
    
        }
    
    }

    useEffect(() => {
        const domain = getDomainName();

        fetchData(domain + '/api/qstCategories', { method: 'get', cache: "force-cache" });
    
    }, []);

    useEffect(() => {
        formElementsTemplate[2].data = categData;
        setFormElements(formElementsTemplate);
    }, [ categData ])

  return (
    <div className={Styles.questionForm}>
        <FormBulder formElements={formElements} 
            formData={selectedQst} 
            formTitle='Question Properties'
            formButtonsHandlers={formbuttonsHandlers}/>
    </div>
  )
}

export default QuestionForm