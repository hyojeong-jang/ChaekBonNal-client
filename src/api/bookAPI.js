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
}

export const receiveMemberBookReport = async (userToken) => {
    const response = await api.get(`/users/${userToken}/book-reports`);
    return response.data.bookReports;
}

export const receiveNonMemberBookReport = async () => {
    const response = await api.get(`/non-member/book-reports`);
    return response.data.bookReports;
}

export const saveBookImage = async (userToken, url) => {
    const response = await api.post(`/users/${userToken}/writing/attaching-image`, {
        data: {
            url
        }
    });

    return response.data.imageUrl;
}

// export const saveBookImage = async (userToken, imageFile) => {
//     const data = new FormData();
//     data.append('image', imageFile);

    // const config = {
    //     method: 'POST',
    //     body: data,
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //       'Access-Control-Allow-Origin': '*'
    //     },
    // };

    // const response = await fetch(`http://localhost:4000/users/${userToken}/writing/attaching-image`,
    //     config
    // );

    // api.post(`/users/${userToken}/writing/attaching-image`,
    //     data, { headers: {
    //         'Content-Type': 'multipart/form-data'
    //     }
    // })
    // .then((res) => {
    //     console.log(res)
    // })
// }
