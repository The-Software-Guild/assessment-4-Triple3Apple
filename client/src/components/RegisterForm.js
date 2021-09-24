import { useState } from "react";

const RegisterForm = ({ registerUser }) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegisterUser = (e) => {
        e.preventDefault();

        registerUser(username, email, password);

        resetUseStates();
    }

    const resetUseStates = () => {
        setUsername("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="register-form">
            <h1>Register Form</h1>

            <form id="register-user-form" onSubmit={(e) => handleRegisterUser(e)}>
                <div className="form-container">
                    <h3>Username: </h3>
                    <input
                        type="text"
                        id="username-input"
                        value={username}
                        minLength="3"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
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


                <input type="submit" value="Register" />
                {/* <button
                    id="add-user-btn"
                    type="submit"
                    onClick={(e) => handleRegisterUser(e)}
                >
                    Register
                </button> */}
            </form>


            {/* <button onClick={() => registerUser()}>Register</button> */}
        </div>
    )
}

export default RegisterForm
