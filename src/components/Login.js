import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { GoogleLogin } from 'react-google-login';
import LoginAPI from '../api/LoginAPI';

import { receiveUserData } from '../action/index';


const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    // const authorizedUser = useSelector(state => state.authorization);

    const responseGoogle = async (response) => {
        let res = await LoginAPI(response);
        await history.push('/');
        await dispatch(receiveUserData(res));
    };

    const loginFailed = async () => {
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
        await history.push('/login');
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

// [] 로그인 완료 시 메인페이지로 라우팅
// [o] 스토어에 정보 디스패치

export default Login
