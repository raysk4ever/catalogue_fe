import * as actionTypes from "../types";
import CategoryApi from '../api/category';

const addNewCategory = payload => {
    const result = CategoryApi.addNewCategory(payload);
    return {
        type: actionTypes.categoryTypes.ADD_NEW_CATEGORY,
        payload: result
    }  
}

const getAllCategoriesAction = () => {
    const result = CategoryApi.getAllCategories();
    return {
        type: actionTypes.categoryTypes.GET_ALL_CATEGORIES,
        payload: result
    }  
}

export default {
    addNewCategory,
    getAllCategoriesAction
}