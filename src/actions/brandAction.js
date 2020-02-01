import * as actionTypes from "../types";
import BrandApi from '../api/brand';

const addNewBrandAction = payload => {
    const result = BrandApi.addNewBrand(payload);
    return {
        type: actionTypes.brandtypes.ADD_NEW_BRAND,
        payload: result
    }  
}

const getAllBrandsAction = () => {
    const result = BrandApi.getAllBrands();
    return {
        type: actionTypes.brandtypes.GET_ALL_BRANDS,
        payload: result
    }  
}

export default {
    addNewBrandAction,
    getAllBrandsAction
}