import React from 'react'
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const LoginRegisterPage = ({ loginUser, registerUser, registerErrorMsg, loginErrorMsg }) => {
    return (
        <div className="login-register-page">
            <RegisterForm registerUser={registerUser} registerErrorMsg={registerErrorMsg}></RegisterForm>
            <LoginForm loginUser={loginUser} loginErrorMsg={loginErrorMsg}></LoginForm>
        </div>
    )
}

export default LoginRegisterPage
