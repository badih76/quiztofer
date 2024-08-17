'use client'
import { IQstCaregories } from "@/common/interfaces/qstCategories";
import { ReactNode, createContext, useReducer } from "react"
import { qstCategReducer } from "./reducer";

export enum CATEG_REDUCER_ACTION_TYPE {
    ADD_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    POPULATE_CATEG_LIST,
    SET_SELECTED_CATEG
  }

export type CategPayload = {
    cat_id: number,
    cat_title: string,
    cat_description: string    
}

export type CategReducerAction = {
    type: CATEG_REDUCER_ACTION_TYPE,
    payload: {
        selectedCateg?: IQstCaregories,
        categList?: IQstCaregories[]
    }
}

export interface IQstCategState {
    categList: IQstCaregories[],
    selectedCateg: IQstCaregories
}

export interface IQstCategContext {
    state: IQstCategState,
    setCategList: (payload: IQstCaregories[]) => void,
    setSelectedCateg: (payload: CategPayload) => void,
    addCategory: (payload: CategPayload) => void,
    updateCategory: (payload: CategPayload) => void
}

const initCategState: IQstCategState = {
    categList: new Array<IQstCaregories>(),
    selectedCateg: {
       cat_id: 0,
       cat_title: '',
       cat_description: ''
    }
}

const initCategContext: IQstCategContext = {
    state: initCategState,
    setCategList: () => {},
    setSelectedCateg: () => {},
    addCategory: () => {},
    updateCategory: () => {}
}

interface ContextProps {
    children: ReactNode
}

export const QstCategContext = createContext<IQstCategContext>(initCategContext);

const CategContextProvider = (props: ContextProps) => {

    // create the state object and the dispatch() function to handle the state
    const [ state, dispatch ] = useReducer(qstCategReducer, initCategState);

    // implement the setCategList() handler
    const setCategList = (payload: IQstCaregories[]) => {
        dispatch({
            type: CATEG_REDUCER_ACTION_TYPE.POPULATE_CATEG_LIST, payload: {
                categList: payload
            }
        })
    }

    // implement the setSelectedCateg() handler
    const setSelectedCateg = (payload: any) => {
        dispatch({
            type: CATEG_REDUCER_ACTION_TYPE.SET_SELECTED_CATEG
            , payload: { selectedCateg: payload }})
    }

    // implement the addCategory() handler
    const addCategory = (payload: any) => {
        dispatch({
            type: CATEG_REDUCER_ACTION_TYPE.ADD_CATEGORY
            , payload: { selectedCateg: payload }
        })
    }

    const updateCategory = (payload: any) => {
        dispatch({
            type: CATEG_REDUCER_ACTION_TYPE.UPDATE_CATEGORY
            , payload: { selectedCateg: payload }
        })
    }
    
    // return the provider object passing to it the state and the desired handlers
    // and pass the children in it
    
    return (
        <>
            <QstCategContext.Provider value={{state, setCategList, setSelectedCateg, addCategory, updateCategory }} >
                {props.children}
            </QstCategContext.Provider>
        </>
    )
    
}

export default CategContextProvider;