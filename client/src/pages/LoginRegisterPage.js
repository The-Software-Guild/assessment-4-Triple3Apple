import React from 'react'
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const LoginRegisterPage = ({ loginUser, registerUser }) => {
    return (
        <div className="login-register-page">
            <RegisterForm registerUser={registerUser}></RegisterForm>
            <LoginForm loginUser={loginUser}></LoginForm>
        </div>
    )
}

export default LoginRegisterPage
