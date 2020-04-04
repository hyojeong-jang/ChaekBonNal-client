import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { GoogleLogin } from 'react-google-login';
import LoginAPI from '../api/LoginAPI';

import { receiveUserData } from '../action/index';


const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const responseGoogle = async (response) => {
        const res = await LoginAPI(response);
        const hasChoosenCategory = await res.choosen_category.length;

        if (hasChoosenCategory) {
            history.push('/');
        } else {
            history.push(`/choose-category/?user=${res.name}`);
        }
        dispatch(receiveUserData(res));
    };

    const loginFailed = () => {
        history.push('/login');
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
    };
    
    return (
        <>
            <Link to='/'>
                <h1>책본날</h1>
            </Link>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                onSuccess={responseGoogle}
                onFailure={loginFailed}
            />
        </>
    );
};

export default Login
