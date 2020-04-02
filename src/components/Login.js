import googleLogin, { GoogleLogin } from 'react-google-login';

const Login = (props) => {
    const { onLogin } = props;
    return (
        <GoogleLogin
            clientId={process.env.GOOGLE_CLIENT_ID}
            buttonText='Google Login'
            onSuccess={}
            onFailure={}
        />
    );
}
