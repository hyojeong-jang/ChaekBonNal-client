import api from './config';

export const bookSearchAPI = async (userName, word) => {
    const bookInfo = await api.get(`users/${userName}/writing/book-search/${word}`);
    return bookInfo.data.result;
}

export const isbnAPI = async (userName, isbn) => {
    const isbnInfo = await api.get(`users/${userName}/writing/isbn-search/${isbn}`);
    return isbnInfo.data.result;
}
