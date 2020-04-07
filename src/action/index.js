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

export const receiveImageData = (url, quote) => ({
   type: types.RECEIVE_IMAGE_DATA,
   url,
   quote
});

export const temporaryStorage = (text, title) => ({
    type: types.TEMPORARY_STORAGE,
    text,
    title
})
