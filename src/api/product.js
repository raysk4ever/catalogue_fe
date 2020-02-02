import axios from 'axios';

const addNewProduct = product =>{
    let url = 'http://localhost:5000/api/v1/product';
    return axios.post(url, product)
}

const getAllProducts = (query) =>{
    let url = 'http://localhost:5000/api/v1/product';
    if(query) url += query;
    console.log(url);   
    return axios.get(url);
}

export default {
    addNewProduct,
    getAllProducts
}