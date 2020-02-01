import axios from 'axios';

const addNewCategory = (name = "testing") =>{
    const url = 'http://localhost:5000/api/v1/category';
    return axios.post(url, {name})
}

const getAllCategories = () =>{
    const url = 'http://localhost:5000/api/v1/category';
    return axios.get(url);
}

export default {
    addNewCategory,
    getAllCategories
}