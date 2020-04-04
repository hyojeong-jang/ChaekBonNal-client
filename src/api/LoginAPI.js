import api from './config';

const LoginAPI = async (response) => {
    const res = await api.post('/login', { response });

    localStorage.setItem('token', res.data.token);
    return res.data.userData;
};

export default LoginAPI
