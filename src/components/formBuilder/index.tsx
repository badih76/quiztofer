'use client'
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import Styles from './styles.module.css';

import React, { useState, useRef, useEffect} from 'react';

import { IFormElement, TFormState, TObjProps, TErrorFlags, IFormProps, IFormButtonsHandlers } from '@/common/interfaces/formBuilder';

import { formToObject, formToErrorFlagsObject, objectToForm } from './formBuilderUtils';

function FormBuilder({ formElements, formData, formTitle, formButtonsHandlers }: IFormProps) {
    const myForm = useRef<HTMLFormElement>(null);

    const initErrFlags: TErrorFlags = {};

    const [ formState, setFormState ] = useState<TFormState>('none'); 
    const [ connError, setConnError ] = useState(false);
  
    const [ errFlags, setErrFlags ] = useState<TErrorFlags>(initErrFlags);  

    

    const formAddButton = (funcAdd?: any | undefined) => {
        console.log('Adding');

        // clear all the fields
        formElements.forEach((e: IFormElement) => {
            ((myForm.current!.elements as HTMLFormControlsCollection).namedItem(e.name) as HTMLInputElement).value = e.type == 'text' ? '' : '0'; //formData[e.name];
        });

        setFormState('add');
        setErrFlags(formToErrorFlagsObject(myForm));

        // call the passed Add handler function
        if (typeof funcAdd !== 'undefined') funcAdd();
    }

    const formEditButton = (funcEdit?: any | undefined) => {
        console.log('Editing');

        setFormState('edit');
        setErrFlags(formToErrorFlagsObject(myForm));

        // call the passed Add handler function
        if (typeof funcEdit !== 'undefined') funcEdit();
    }

    const formSaveButton = (funcSave: any) => {
        setErrFlags(formToErrorFlagsObject(myForm));

        let frmEleValues = formToObject(myForm);

        console.log('frmEleValues: ', frmEleValues);

        let tempErrFlags = {...errFlags};
        let errExists = false;

        for (const [key, value] of Object.entries(frmEleValues)) {
            if (value == '' && (formState != 'add' && key != 'cat_id')) {
                tempErrFlags[key].err = true;
                tempErrFlags[key].msg = 'Value cannot be left blank';
                errExists = true;
            }
        }

        setErrFlags(tempErrFlags);

        // });
        // call the passed Add handler function
        if(!errExists) {
            funcSave(frmEleValues, formState);
            setFormState('none');
        }
    }

    const formCancelButton = (funcCancel?: any | undefined) => {
        setFormState('none');
        setErrFlags(formToErrorFlagsObject(myForm));

        // call the passed Add handler function
        if (typeof funcCancel !== 'undefined') funcCancel();

        objectToForm(formElements, myForm, formData);
    }

    const formDeleteButton = (funcDelete?: any | null) => {
        // clear all the fields
        // formElements.forEach((e: IFormElement) => {
        //     ((myForm.current!.elements as HTMLFormControlsCollection).namedItem(e.name) as HTMLInputElement).value = e.type == 'text' ? '' : '0'; //formData[e.name];
        // });

        setFormState('none');

        // call the passed Add handler function
        if (typeof funcDelete !== 'undefined') funcDelete();
    }

    useEffect(() => {        
        // Initialize the form elements error flags
        setErrFlags(formToErrorFlagsObject(myForm));

    }, []);

    useEffect(() => {        
        objectToForm(formElements, myForm, formData);

    }, [formData]);

  return (
    <>
        <div className={Styles.formContainer}>
            <Form ref={myForm}>
                <div style={{fontSize: "2em", marginBottom: "15px", textDecoration: "underline"}}>
                    <Form.Text>{formTitle}</Form.Text>
                </div>
                {
                    formElements.map((fe) => {
                        return (
                            <Form.Group controlId={fe.name} hidden={fe.hidden} style={{marginBottom: "20px"}} key={fe.name}>
                                <Form.Label style={{fontWeight: "bold"}}>{fe.label}</Form.Label>
                                {
                                    fe.type == "list" ? 
                                    <Form.Select aria-label="Default select example">
                                        <option value={' '}>Click to select a category from this list</option>
                                        {
                                            fe.data.map((d: any) => {
                                                return <option value={d.value} key={d.value}>{d.option}</option>
                                            })
                                        }
                                    </Form.Select>
                                    :
                                    <Form.Control type={fe.type} placeholder={fe.placeHolder} 
                                        readOnly={ formState == "none" ? true : false } />
                                    
                                }
                                {
                                    errFlags[fe.name] ? 
                                        <Form.Label style={{color: "red", fontSize: "0.9em"}}>
                                            { errFlags[fe.name].err ? errFlags[fe.name].msg : null}
                                        </Form.Label>
                                        : null
                                }
                            </Form.Group>
                        )
                    })
                }
            </Form>
        </div>
        <div className={Styles.buttonsPanel}>
            <ButtonGroup style={{width: "100%"}}>
                <Button variant="outline-primary"
                    onClick={() => {
                        if(formState == 'none')
                            formAddButton(formButtonsHandlers.onAdd);
                        else // save
                            formSaveButton(formButtonsHandlers.onSave);
                        }}
                >
                    {
                        formState == 'none' ? 'New' : 'Save'
                    }
                </Button>

                {
                    formState == 'none' && formData.cat_title ? 
                    <Button variant="outline-primary"
                        onClick={() => {
                            formEditButton(formButtonsHandlers.onEdit);
                            }}
                    >
                        Edit
                    </Button>
                    : null
                }
                
                <Button variant="outline-danger"
                    onClick={() => {formCancelButton(() => {})}}>
                    {
                        formState == 'none' ? 'Delete' : 'Cancel'
                    }
                </Button>
            </ButtonGroup>
        </div>
    </>
  )
}

export default FormBuilder;