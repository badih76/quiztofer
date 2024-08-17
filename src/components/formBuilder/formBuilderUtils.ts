import { TObjProps, TErrorFlags, IFormElement } from '@/common/interfaces/formBuilder';

export const formToObject = (form: React.RefObject<HTMLFormElement>): TObjProps => {
    let formInputControlles: TObjProps = {};

    Array.from(form.current!.elements).map((e) => {
        formInputControlles[e.id] = (e as HTMLInputElement).type == 'number' ? parseInt((e as HTMLInputElement).value) : (e as HTMLInputElement).value;
        console.log(e.id, (e as HTMLInputElement).value);
    });

    return formInputControlles;
}

export const formToErrorFlagsObject = (form: React.RefObject<HTMLFormElement>): TErrorFlags => {
    let formInputControlles: TErrorFlags = {};

    Array.from(form.current!.elements).map((e) => {
        formInputControlles[e.id] = { err: false, msg: ''};
    });

    return formInputControlles;
}

export const objectToForm = (formElements:IFormElement[], form: React.RefObject<HTMLFormElement>, objData: any) => {
    formElements.forEach((e: IFormElement) => {
        ((form.current!.elements as HTMLFormControlsCollection).namedItem(e.name) as HTMLInputElement).value = objData[e.name];
    })
}