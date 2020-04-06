import api from './config';

export const saveBookReport = async ({
    userName,
    selectedBook,
    selectedCategory,
    text,
    title,
    quote
}) => {
    const result = await api.post(`/users/${userName}/book-report`, {
        data: {
            selectedBook,
            selectedCategory,
            text,
            title,
            quote
        }
    })  
    return result.data;
}

export const receiveMemberBookReport = async (userToken) => {
    const bookReports = await api.get(`/users/${userToken}/book-reports`);
    return bookReports.data.bookReports;
}

export const receiveNonMemberBookReport = async () => {
    const bookReports = await api.get(`/non-member/book-reports`);
    return bookReports.data.bookReports;
}