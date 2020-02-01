import axios from 'axios';

const addNewBrand = (name = "testing") =>{
    const url = 'http://localhost:5000/api/v1/brand';
    return axios.post(url, {name})
}

const getAllBrands = () =>{
    const url = 'http://localhost:5000/api/v1/brand';
    return axios.get(url);
}

export default {
    addNewBrand,
    getAllBrands
}