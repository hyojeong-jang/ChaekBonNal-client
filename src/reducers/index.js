import { combineReducers } from 'redux';
import { user } from '../reducers/user';
import { book } from '../reducers/book';

const reducer = combineReducers({
    user,
    book
});

export default reducer
