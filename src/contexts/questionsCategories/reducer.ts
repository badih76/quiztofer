import { IQstCaregories } from "@/common/interfaces/qstCategories";
import { CATEG_REDUCER_ACTION_TYPE, CategPayload, 
    CategReducerAction, IQstCategState } from './index';

export const qstCategReducer = (state: IQstCategState, action: CategReducerAction) : IQstCategState => {
    switch(action.type) {
        case CATEG_REDUCER_ACTION_TYPE.POPULATE_CATEG_LIST:            
            return { ...state, categList: action.payload!.categList!};
        
        case CATEG_REDUCER_ACTION_TYPE.ADD_CATEGORY:
            {
                let categList = state.categList;
                categList.push(action.payload.selectedCateg!);
                const newCategListSorted = categList.sort((a: IQstCaregories, b: IQstCaregories) => {
                    if (a.cat_title.toUpperCase() < b.cat_title.toUpperCase()) return -1;
                    else if (a.cat_title > b.cat_title) return 1;
                    else return 0;
                })
                return {...state, categList: newCategListSorted};
            }

        case CATEG_REDUCER_ACTION_TYPE.UPDATE_CATEGORY:
            {
                let categList = state.categList;
                
                let i = categList.findIndex((c) => {
                    return c.cat_id == action.payload.selectedCateg?.cat_id;
                })

                categList[i].cat_title = action.payload.selectedCateg?.cat_title!;
                categList[i].cat_description = action.payload.selectedCateg?.cat_description!;

                return {...state, categList, selectedCateg: action.payload.selectedCateg!};
            }

        case CATEG_REDUCER_ACTION_TYPE.DELETE_CATEGORY:
            return {...state};
        
        case CATEG_REDUCER_ACTION_TYPE.SET_SELECTED_CATEG:
            return {...state, selectedCateg: action.payload!.selectedCateg!};

        default: 
            return {...state};
    }
}