import { useState } from "react";

const LoginForm = ({ loginUser }) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginUser = (e) => {
        e.preventDefault();

        loginUser(email, password);

        resetUseStates();
    }

    const resetUseStates = () => {
        setUsername("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="login-form">
            <h1>Login Form</h1>

            <form id="register-user-form" onSubmit={(e) => handleLoginUser(e)}>
                <div className="form-container">
                    <h3>Email: </h3>
                    <input
                        type="email"
                        id="email-input"
                        value={email}
                        minLength="7"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-container">
                    <h3>Password: </h3>
                    <input
                        type="text"
                        id="password-input"
                        value={password}
                        minLength="5"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default LoginForm
