import { useState } from "react";

const LoginForm = ({ loginUser, loginErrorMsg }) => {

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
            <h1>Existing Users</h1>

            <form id="register-user-form" onSubmit={(e) => handleLoginUser(e)}>
                <div className="form-container">
                    {/* <h3>Email: </h3> */}
                    <input
                        type="email"
                        id="email-input"
                        value={email}
                        minLength="7"
                        placeholder="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-container">
                    {/* <h3>Password: </h3> */}
                    <input
                        type="text"
                        id="password-input"
                        value={password}
                        minLength="5"
                        placeholder="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="btn-container">
                    <input className="submit-btn" type="submit" value="Login" />
                </div>

                <p className="error-text">{loginErrorMsg}</p>
            </form>
        </div>
    )
}

export default LoginForm
