import * as actionTypes from '../types';

const initState = {
    products: [],
    productCreatedSuccessMessage:""
}

const productReducer = (state = initState, action) =>{
    switch(action.type){
        case actionTypes.productTypes.ADD_NEW_PRODUCT:
        return { ...state, productCreatedSuccessMessage: action.payload.data.result}

        case actionTypes.productTypes.GET_ALL_PRODUCTS: 
        console.log(`product get called`, action.payload)
        const productApiData = action.payload.data;
        const products = productApiData ? productApiData.products : [];
        return { ...state, products }
    }

    return {...state}
}

export default productReducer;