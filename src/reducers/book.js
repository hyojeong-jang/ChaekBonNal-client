import { RECEIVE_SEARCH_DATA } from '../constants/index';

export const initialState = {
    info: ''
};

export const book = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_SEARCH_DATA:
            return {
                info: action.searchData 
            };
        default:
            return state;
    }
};
