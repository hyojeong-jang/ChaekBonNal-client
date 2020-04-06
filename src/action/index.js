import * as types from '../constants/index'

export const receiveUserData = (userData) => ({
    type: types.RECEIVE_USER_DATA,
    userData
});

export const receiveSearchResult = (searchData) => ({
    type: types.RECEIVE_SEARCH_DATA,
    searchData
})

export const selectedBook = (book, category) => ({
    type: types.SELECTED_BOOK,
    book,
    category
})

export const byUserPreference = (bookReports) => ({
    type: types.BY_USER_PREFERENCE,
    bookReports
})
