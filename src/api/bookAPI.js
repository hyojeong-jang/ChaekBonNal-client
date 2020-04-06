import api from './config';

export const saveBookReport = async ({
    userName,
    selectedBook,
    selectedCategory,
    text,
    title,
    quote
}) => {
    api.post(`users/${userName}/book-report`, {
        data: {
            selectedBook,
            selectedCategory,
            text,
            title,
            quote
        }
    })    
}