import * as actionTypes from '../types';

const initState = {
    categories: [],
    categoryCreatedSuccessMessage:""
}

const categoryReducer = (state = initState, action) =>{
    switch(action.type){
        case actionTypes.categoryTypes.ADD_NEW_CATEGORY: 
        return { ...state, brandCreatedSuccessMessage: action.payload.data.result}
        
        case actionTypes.categoryTypes.GET_ALL_CATEGORIES: 
        const categoryApiDate = action.payload.data;
        const categories = categoryApiDate ? categoryApiDate.categories : [];
        return { ...state, categories }
    }

    return {...state}
}

export default categoryReducer;