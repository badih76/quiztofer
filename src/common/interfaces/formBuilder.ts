export interface IFormElement {
    name: string,
    label: string,
    type: string,
    placeHolder: string,
    hidden: boolean,
    data?: any
}

export type TFormState = 'none' | 'add' | 'edit';

export type TErrorFlags = {
  [key: string]: { err: boolean, msg: string}
  
}

export type TObjProps = {[key: string] : any};

export interface IFormProps {
    formElements: IFormElement[],
    formData: any,
    formTitle: string,
    formButtonsHandlers: IFormButtonsHandlers
}

export interface IFormButtonsHandlers {
    onAdd?: () => void,
    onEdit?: () => void,
    onSave: (data: any, action: string) => boolean,
    onCancel: () => void,
    onDelete?: () => void,
    editVisibility?: () => boolean
}