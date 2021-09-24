import { useState, useEffect } from "react";

const RegisterForm = ({ registerUser, registerErrorMsg }) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegisterUser = (e) => {
        e.preventDefault();

        registerUser(username, email, password);

        console.log(registerErrorMsg);

        resetUseStates();
    }

    const resetUseStates = () => {
        setUsername("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="register-form">
            <h1>Join the Climate Action!</h1>

            <form id="register-user-form" onSubmit={(e) => handleRegisterUser(e)}>
                <div className="form-container">
                    <input
                        type="text"
                        id="username-input"
                        value={username}
                        minLength="3"
                        placeholder="username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-container">
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


                {/* <input type="submit" value="Register" /> */}

                <div className="btn-container">
                    <input className="submit-btn" type="submit" value="Register" />
                </div>
                <p className="error-text">{registerErrorMsg}</p>
            </form>
        </div>
    )
}

export default RegisterForm
