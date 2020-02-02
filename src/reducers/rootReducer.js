import brandReducer from './brandReducre';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({brandReducer, categoryReducer, productReducer})

export default rootReducer;