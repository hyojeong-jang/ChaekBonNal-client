import api from './config';

export const saveBookReport = async ({
    userName,
    selectedBook,
    selectedCategory,
    imageUrl,
    text,
    title,
    quote
}) => {

    const response = await api.post(`/users/${userName}/book-report`, {
        data: {
            selectedBook,
            selectedCategory,
            imageUrl,
            text,
            title,
            quote
        }
    })  
    return response.data;
};

export const receiveMemberBookReport = async (userToken) => {
    const response = await api.get(`/users/${userToken}/book-reports`);
    return response.data.bookReports;
};

export const receiveNonMemberBookReport = async () => {
    const response = await api.get(`/non-member/book-reports`);
    return response.data.bookReports;
};

export const saveBookImage = async (userToken, file) => {
    const formData = new FormData();
    formData.append('photo', file);

    const response = await api.post(`/users/${userToken}/writing/attaching-image`,
        formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data.imageUrl;
};

export const findOndBookReport = async (id) => {
    const response = await api.get(`/book-reports/${id}`);
    return response.data.bookReport;
};

export const saveBookmark = async (userToken, reportId, isBookmarked) => {
    const response = await api.put(`/book-reports/${reportId}/users/${userToken}/bookmark`, { isBookmarked });

    return response.data.isBookmarked;
};