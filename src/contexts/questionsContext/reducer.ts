import { IQuestion } from "@/common/interfaces/questions";
import { QST_REDUCER_ACTION_TYPE, QstPayload, 
    QstReducerAction, IQuestionsState } from './index';

export const questionsReducer = (state: IQuestionsState, action: QstReducerAction) : IQuestionsState => {
    switch(action.type) {
        case QST_REDUCER_ACTION_TYPE.POPULATE_QST_LIST:            
            return { ...state, qstList: action.payload!.qstList!};
        
        case QST_REDUCER_ACTION_TYPE.ADD_QUESTION:
            {
                let qstList = state.qstList;
                qstList.push(action.payload.selectedQst!);
                const newQstListSorted = qstList.sort((a: IQuestion, b: IQuestion) => {
                    if (a.qst_body.toUpperCase() < b.qst_body.toUpperCase()) return -1;
                    else if (a.qst_body > b.qst_body) return 1;
                    else return 0;
                })
                return {...state, qstList: newQstListSorted};
            }

        case QST_REDUCER_ACTION_TYPE.UPDATE_QUESTION:
            {
                let qstList = state.qstList;
                
                let i = qstList.findIndex((c) => {
                    return c.qst_body == action.payload.selectedQst?.qst_body;
                })

                qstList[i].qst_body = action.payload.selectedQst?.qst_body!;
                qstList[i].qst_category = action.payload.selectedQst?.qst_category!;
                qstList[i].qst_answer1 = action.payload.selectedQst?.qst_answer1!;
                qstList[i].qst_answer2 = action.payload.selectedQst?.qst_answer2!;
                qstList[i].qst_answer3 = action.payload.selectedQst?.qst_answer3!;
                qstList[i].qst_answer4 = action.payload.selectedQst?.qst_answer4!;
                qstList[i].qst_correctAnswer = action.payload.selectedQst?.qst_correctAnswer!;

                return {...state, qstList, selectedQst: action.payload.selectedQst!};
            }

        case QST_REDUCER_ACTION_TYPE.DELETE_QUESTION:
            return {...state};
        
        case QST_REDUCER_ACTION_TYPE.SET_SELECTED_QST:
            return {...state, selectedQst: action.payload!.selectedQst!};

        default: 
            return {...state};
    }
}