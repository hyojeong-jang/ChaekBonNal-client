import * as actions from '../constants/index';

export const initialState = {
    previous: [],
    list: [],
    imageUrl: '',
    quote: '',
    title: '',
    text: ''
};

export const bookReports = (state = initialState, action) => {
    switch (action.type) {
        case actions.BY_USER_PREFERENCE:
            return {
                ...state,
                list: action.bookReports
            };
        case actions.RECEIVE_IMAGE_DATA:
            return {
                ...state,
                imageUrl: action.url,
                quote: action.quote
            }
        case actions.TEMPORARY_STORAGE:
            return {
                ...state,
                title: action.title,
                text: action.text
            }
        default:
            return state;
    }
};
