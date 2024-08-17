'use client'

import { IQstCaregories } from '@/common/interfaces/qstCategories';
import React, { useContext, useEffect, useState } from 'react';

import { QstCategContext } from '@/contexts/questionsCategories';
import ListBuilder from '@/components/listBuilder';
import { getDomainName } from '@/common/sharedCode/general';


const CategoriesList: React.FunctionComponent =  () => {
  const categContext = useContext(QstCategContext);
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

        let data: IQstCaregories[] = [];

        json.data.map((c: IQstCaregories) => {
          data.push(c);
        });

        const newCategListSorted = data.sort((a: IQstCaregories, b: IQstCaregories) => {
          if (a.cat_title.toUpperCase() < b.cat_title.toUpperCase()) return -1;
          else if (a.cat_title > b.cat_title) return 1;
          else return 0;
        });

        categContext.setCategList(newCategListSorted as IQstCaregories[]);
        setFetchingData(false);
      })
      .catch(err => {
        console.log("Error: ", (err as any).message);
        categContext.setCategList([]);
      });

    }
    catch(err) {
      console.log("Error: ", (err as any).message);
      categContext.setCategList([]);

    }

  }

  const handleOnSelect = (e: any) => { 
    let selectedCateg: IQstCaregories = Object.assign(categContext.state!.categList!.find((c: IQstCaregories) => {
      return c.cat_id == e;
    })!);        

    categContext.setSelectedCateg(selectedCateg);
  
  }

  useEffect(() => {
    const domain = getDomainName();

    fetchData(domain + '/api/qstCategories', { method: 'get', cache: "force-cache" });
    
  }, []);

  return (
      <ListBuilder 
        data={categContext.state.categList} 
        label='cat_title' 
        value='cat_id' 
        showProgress={fetchingData}
        width="30%"
        onSelect={handleOnSelect} />

  )
}

export default CategoriesList 