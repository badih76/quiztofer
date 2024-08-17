'use client'

import { IQuestion } from '@/common/interfaces/questions';
import React, { useContext, useEffect, useState } from 'react';

import { QuestionsContext } from '@/contexts/questionsContext';
import ListBuilder from '@/components/listBuilder';
import { getDomainName } from '@/common/sharedCode/general';


const QuestionsList: React.FunctionComponent =  () => {
  const qstContext = useContext(QuestionsContext);
  const [ fetchingData, setFetchingData ] = useState(true);


  const fetchData = (url: string, options: any) => {
    try {
      setFetchingData(true);

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

        let data: IQuestion[] = [];

        json.data.map((c: IQuestion) => {
          data.push(c);
        });

        const newQstListSorted = data.sort((a: IQuestion, b: IQuestion) => {
          if (a.qst_body.toUpperCase() < b.qst_body.toUpperCase()) return -1;
          else if (a.qst_body > b.qst_body) return 1;
          else return 0;
        });

        qstContext.setQstList(newQstListSorted as IQuestion[]);
        setFetchingData(false);
      })
      .catch(err => {
        console.log("Error: ", (err as any).message);
        qstContext.setQstList([]);
      });

    }
    catch(err) {
      console.log("Error: ", (err as any).message);
      qstContext.setQstList([]);

    }

  }

  const handleOnSelect = (e: any) => { 
    let selectedQst: IQuestion = Object.assign(qstContext.state!.qstList!.find((c: IQuestion) => {
      return c.qst_id == e;
    })!);        

    console.log(e);

    qstContext.setSelectedQst(selectedQst);
  
  }

  useEffect(() => {
    const domain = getDomainName();

    fetchData(domain + '/api/questions/manage', { method: 'get', cache: "force-cache" });
    
  }, []);

  return (
    
    <ListBuilder 
      data={qstContext.state.qstList} 
      label='qst_body' 
      value='qst_id' 
      showProgress={fetchingData}
      // width={"75%"}
      onSelect={handleOnSelect} />
    
  )
}

export default QuestionsList 