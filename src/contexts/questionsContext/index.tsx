'use client'
import { IQuestion } from "@/common/interfaces/questions";
import { ReactNode, createContext, useReducer } from "react"
import { questionsReducer } from "./reducer";

export enum QST_REDUCER_ACTION_TYPE {
    ADD_QUESTION,
    UPDATE_QUESTION,
    DELETE_QUESTION,
    POPULATE_QST_LIST,
    SET_SELECTED_QST
  }

export type QstPayload = {
    qst_id: number,
    
    qst_body: string,
    qst_category: number,

    qst_answer1: string,
    qst_answer2: string,
    qst_answer3: string,
    qst_answer4: string,
    
    qst_correctAnswer: number   
}

export type QstReducerAction = {
    type: QST_REDUCER_ACTION_TYPE,
    payload: {
        selectedQst?: IQuestion,
        qstList?: IQuestion[]
    }
}

export interface IQuestionsState {
    qstList: IQuestion[],
    selectedQst: IQuestion
}

export interface IQuestionsContext {
    state: IQuestionsState,
    setQstList: (payload: IQuestion[]) => void,
    setSelectedQst: (payload: QstPayload) => void,
    addQuestion: (payload: QstPayload) => void,
    updateQuestion: (payload: QstPayload) => void
}

const initQstState: IQuestionsState = {
    qstList: new Array<IQuestion>(),
    selectedQst: {
        qst_id: 0,
    
        qst_body: '',
        qst_category: 0,
    
        qst_answer1: '',
        qst_answer2: '',
        qst_answer3: '',
        qst_answer4: '',
        
        qst_correctAnswer: 0
    }
}

const initQstContext: IQuestionsContext = {
    state: initQstState,
    setQstList: () => {},
    setSelectedQst: () => {},
    addQuestion: () => {},
    updateQuestion: () => {}
}

interface ContextProps {
    children: ReactNode
}

export const QuestionsContext = createContext<IQuestionsContext>(initQstContext);

const QstContextProvider = (props: ContextProps) => {

    // create the state object and the dispatch() function to handle the state
    const [ state, dispatch ] = useReducer(questionsReducer, initQstState);

    // implement the setCategList() handler
    const setQstList = (payload: IQuestion[]) => {
        dispatch({
            type: QST_REDUCER_ACTION_TYPE.POPULATE_QST_LIST, 
            payload: { qstList: payload }
        })
    }

    // implement the setSelectedCateg() handler
    const setSelectedQst = (payload: any) => {
        dispatch({
            type: QST_REDUCER_ACTION_TYPE.SET_SELECTED_QST
            , payload: { selectedQst: payload }})
    }

    // implement the addCategory() handler
    const addQuestion = (payload: any) => {
        dispatch({
            type: QST_REDUCER_ACTION_TYPE.ADD_QUESTION
            , payload: { selectedQst: payload }
        })
    }

    const updateQuestion = (payload: any) => {
        dispatch({
            type: QST_REDUCER_ACTION_TYPE.UPDATE_QUESTION
            , payload: { selectedQst: payload }
        })
    }
    
    // return the provider object passing to it the state and the desired handlers
    // and pass the children in it
    
    return (
        <>
            <QuestionsContext.Provider value={{state, setQstList, setSelectedQst, addQuestion, updateQuestion }} >
                {props.children}
            </QuestionsContext.Provider>
        </>
    )
    
}

export default QstContextProvider;