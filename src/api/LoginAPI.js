import api from './config';

const LoginAPI = (response) => {
    api.post('/login', { response })
    .then((response) => {
        localStorage.setItem('token', response.data.token)
    })
};

export default LoginAPI
