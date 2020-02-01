import brandReducer from './brandReducre';
import categoryReducer from './categoryReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({brandReducer, categoryReducer})

export default rootReducer;