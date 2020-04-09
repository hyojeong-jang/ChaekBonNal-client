import * as actions from '../constants/index';

export const initialState = {
    list: [],
    image: '',
    quote: '',
    title: '',
    text: '',
    dataUrl: ''
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
                image: action.url
            }
        case actions.DRAFTS:
            return {
                ...state,
                title: action.title,
                text: action.text
            }
        case actions.DRAFTS_IMAGE:
            return {
                ...state,
                dataUrl: action.dataUrl
            }
        case actions.RECEIVE_DETECTED_TEXT:
            return {
                ...state,
                quote: action.detectedText
            }
        default:
            return state;
    }
};
