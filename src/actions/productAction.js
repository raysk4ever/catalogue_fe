import * as actionTypes from "../types";
import ProductApi from '../api/product';

const addNewProduct = payload => {
    const result = ProductApi.addNewProduct(payload);
    return {
        type: actionTypes.productTypes.ADD_NEW_PRODUCT,
        payload: result
    }  
}

const getAllProducts = (query) => {
    const result = ProductApi.getAllProducts(query);
    return {
        type: actionTypes.productTypes.GET_ALL_PRODUCTS,
        payload: result
    }  
}

export default {
    addNewProduct,
    getAllProducts
}