import { RECEIVE_SEARCH_DATA, SELECTED_BOOK } from '../constants/index';

export const initialState = {
    searchList: '',
    selected: {},
    category: ''
};

export const book = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_SEARCH_DATA:
            return {
                searchList: action.searchData 
            };
        case SELECTED_BOOK:
            return {
                selected: action.book,
                category: action.category
            }
        default:
            return state;
    }
};
