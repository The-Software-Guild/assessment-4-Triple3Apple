import NavBar from './components/NavBar';
import LoginRegisterPage from './pages/LoginRegisterPage';
import MainPage from './pages/MainPage';
import AddIssuePage from './pages/AddIssuePage';
import MyIssuesPage from './pages/MyIssuesPage';
import { Route, Switch, useHistory } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import axios from "axios";
import { useState, useEffect } from 'react';
import './styles/App.css';

const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
        graphqlErrors.map(({ message, location, path }) => {
            console.log(`Graphql error ${message}`)
        });
    }
});


const link = from([
    errorLink,
    new HttpLink({ uri: '/graphql' })
]);

// new below
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('jwt_token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

// new below
const client = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache()
});

function App() {

    const history = useHistory();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [userId, setUserId] = useState('');
    const [registerErrorMsg, setRegisterErrorMsg] = useState("");
    const [loginErrorMsg, setLoginErrorMsg] = useState("");

    useEffect(() => {
        localStorage.setItem('jwt_token', '');
        setUserId('');
        setRegisterErrorMsg('');
        setLoginErrorMsg('');
    }, []);

    const registerUser = (username, email, password) => {
        console.log('registering user');

        axios
            .post('/auth/register', { username: username, password: password, email: email })
            .then((res) => {
                console.log(res.data);

                // save userId
                console.log('saving user id: ' + res.data.user._id);
                setUserId(res.data.user._id);

                // save to local storage
                localStorage.setItem('jwt_token', res.data.token);
                console.log(res.data.status);
                setIsLoggedIn(true);
                resetRegisterErrorMsg();
                history.push('/main');
            })
            .catch((error) => {
                console.log('returning error msg....');
                setRegisterErrorMsg('Invalid username/email');
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

                // save userId
                console.log('saving user id: ' + res.data.user._id);
                setUserId(res.data.user._id);

                // save to local storage
                localStorage.setItem('jwt_token', res.data.token);
                console.log(res.data.status);
                console.log('LOG IN SUCCESS');
                resetLoginErrorMsg();
                setIsLoggedIn(true);
                history.push('/main');
            })
            .catch((error) => {
                console.log(error);
                console.log('LOG IN FAIL');
                setLoginErrorMsg('Invalid username/email');
                setIsLoggedIn(false);
                return error;
            });

        setIsLoggedIn(true);

    }

    const logOut = () => {
        setIsLoggedIn(false);
        localStorage.setItem('jwt_token', '');
    }

    const resetRegisterErrorMsg = () => {
        setRegisterErrorMsg('');
    }
    const resetLoginErrorMsg = () => {
        setLoginErrorMsg('');
    }

    return (
        <ApolloProvider client={client}>
            <div className="App">

                <NavBar isLoggedIn={isLoggedIn} logOut={logOut}></NavBar>
                <div className="page-content">
                    <Switch>
                        <Route exact path="/" >
                            <LoginRegisterPage
                                loginUser={loginUser}
                                registerUser={registerUser}
                                registerErrorMsg={registerErrorMsg}
                                loginErrorMsg={loginErrorMsg}
                            >
                            </LoginRegisterPage>
                        </Route>
                        <Route exact path="/main">
                            <MainPage isLoggedIn={isLoggedIn} client={client} userId={userId}></MainPage>
                        </Route>
                        <Route exact path="/addissue">
                            <AddIssuePage isLoggedIn={isLoggedIn}></AddIssuePage>
                        </Route>
                        <Route exact path="/myissues">
                            <MyIssuesPage isLoggedIn={isLoggedIn} client={client} userId={userId}></MyIssuesPage>
                        </Route>
                    </Switch>
                    <div className="bg-image"></div>
                    <div className="bg-green"></div>
                </div>
                {/* <Switch>
                    <Route exact path="/" >
                        <LoginRegisterPage
                            loginUser={loginUser}
                            registerUser={registerUser}
                            registerErrorMsg={registerErrorMsg}
                            loginErrorMsg={loginErrorMsg}
                        >
                        </LoginRegisterPage>
                    </Route>
                    <Route exact path="/main">
                        <MainPage isLoggedIn={isLoggedIn} client={client} userId={userId}></MainPage>
                    </Route>
                    <Route exact path="/addissue">
                        <AddIssuePage isLoggedIn={isLoggedIn}></AddIssuePage>
                    </Route>
                    <Route exact path="/myissues">
                        <MyIssuesPage isLoggedIn={isLoggedIn} client={client} userId={userId}></MyIssuesPage>
                    </Route>
                </Switch> */}

            </div>
        </ApolloProvider>
    );
}

export default App;
