import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import LoginRegisterPage from './LoginRegisterPage';
import MainPage from './MainPage';
import AddIssuePage from './AddIssuePage';
import MyIssuesPage from './MyIssuesPage';
import { Route, Switch, useHistory } from 'react-router-dom';
import axios from "axios";


const PageRoutes = () => {

    const history = useHistory();

    // const [addIssue, { data, loading, error }] = useMutation(CREATE_ISSUE);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        localStorage.setItem('jwt_token', '');
    }, []);

    const registerUser = (username, email, password) => {
        console.log('registering user');

        axios
            .post('/auth/register', { username: username, password: password, email: email })
            .then((res) => {
                console.log(res.data);
                // save to local storage
                localStorage.setItem('jwt_token', res.data.token);
                console.log(res.data.status);
                setIsLoggedIn(true);
                history.push('/main');
            })
            .catch((error) => {
                console.log(error);
                setIsLoggedIn(false);
            });

    }

    const loginUser = (email, password) => {
        console.log('logging in user');

        axios
            .post('/auth/login', { password: password, email: email })
            .then((res) => {
                console.log(res.data);
                // save to local storage
                localStorage.setItem('jwt_token', res.data.token);
                console.log(res.data.status);
                console.log('LOG IN SUCCESS');
                setIsLoggedIn(true);
                history.push('/main');
            })
            .catch((error) => {
                console.log(error);
                console.log('LOG IN FAIL');
                setIsLoggedIn(false);
            });

        setIsLoggedIn(true);

    }

    const logOut = () => {
        setIsLoggedIn(false);
        localStorage.setItem('jwt_token', '');
    }

    return (
        <div>
            <NavBar isLoggedIn={isLoggedIn} logOut={logOut}></NavBar>
            <Route exact path="/" >
                <LoginRegisterPage
                    loginUser={loginUser}
                    registerUser={registerUser}>
                </LoginRegisterPage>
            </Route>
            <Route exact path="/main">
                <MainPage isLoggedIn={isLoggedIn}></MainPage>
            </Route>
            <Route exact path="/addissue">
                <AddIssuePage isLoggedIn={isLoggedIn} /*createNewIssue={console.log()}*/></AddIssuePage>
            </Route>
            <Route exact path="/myissues">
                <MyIssuesPage isLoggedIn={isLoggedIn}></MyIssuesPage>
            </Route>
        </div>
    )
}

export default PageRoutes
