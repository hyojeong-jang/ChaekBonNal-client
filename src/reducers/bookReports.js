import { BY_USER_PREFERENCE } from '../constants/index';

export const initialState = {
    previous: [],
    list: []
};

export const bookReports = (state = initialState, action) => {
    switch (action.type) {
        case BY_USER_PREFERENCE:
            return {
                list: action.bookReports
            };
        default:
            return state;
    }
};
