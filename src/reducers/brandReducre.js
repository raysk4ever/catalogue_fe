import * as actionTypes from '../types';

const initState = {
    brands: [],
    brandCreatedSuccessMessage:""
}

const brandReducer = (state = initState, action) =>{
    switch(action.type){
        case actionTypes.brandtypes.ADD_NEW_BRAND: 
        return { ...state, brandCreatedSuccessMessage: action.payload.data.result}

        case actionTypes.brandtypes.GET_ALL_BRANDS: 
        const brandApiData = action.payload.data;
        const brands = brandApiData ? brandApiData.brands : [];
        return { ...state, brands }
    }

    return {...state}
}

export default brandReducer;