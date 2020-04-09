import api from './config';

export const getUserData = async (userToken) => {
    const response = await api.get(`/users/${userToken}`);
    return response.data.userData;
};
