import React from 'react';
import { GoogleLogin } from 'react-google-login';
import LoginAPI from '../api/LoginAPI';

const Login = () => {
    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            redirectUri='/'
        />
    );
}

const responseGoogle = (response) => {
    LoginAPI(response);
}

export default Login

// [o] 리액트 환경변수 설정 -> 클라이언트에 키는 저장하면 안됨
// [o] 구글 로그인 버튼 활성화
// [o] 로그인 이후 유저 정보와 함께 POST: '/login' 요청
