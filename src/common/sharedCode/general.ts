import { RefObject } from "react";

export const getFormFieldsValues = (form: RefObject<HTMLFormElement>) => {
    let formFieldsValues: {[k: string]: any} = {};
    
    for(let i=0; i<form.current!.elements!.length; i++) {
      let key = form!.current!.elements![i].getAttribute("aria-labelledby")!;
      let value = (form!.current!.elements![i] as HTMLInputElement).value;
      formFieldsValues[key] = value;
      
    }
    
    return formFieldsValues;
}

export const getDomainName = () => {
  const env = process.env.NODE_ENV;

    if(env == 'development') 
      return process.env.domain_dev!; 
    else 
      return process.env.domain!; 
} 

export const getResponseHeaders = () : any => {
  return process.env.headers;
}

export const getArrayOfObjValues = (obj: any) => {
  // get the keys names
  const keys = Object.getOwnPropertyNames(obj);

  // get the array of values of these keys
  const array = keys.map(k => obj[k]);

  return array;
}

export const generateRandomCode = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;

}