import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import LoginRegisterPage from './LoginRegisterPage';
import MainPage from './MainPage';
import AddIssuePage from './AddIssuePage';
import MyIssuesPage from './MyIssuesPage';
import { Route, Switch, useHistory } from 'react-router-dom';
import { LOAD_ISSUES } from '../graphql/Queries';
import { useQuery, gql } from '@apollo/client';

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

import axios from "axios";


const PageRoutes = () => {

    const history = useHistory();

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

    // Mutations
    // const [addIssue, { data, loading, error }] = useMutation(CREATE_ISSUE);

    // Queries
    const { error, loading, issuesData } = useQuery(LOAD_ISSUES);
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
                console.log(`res.data.token: ${res.data.token}\n`);
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
            {/* //     <ApolloProvider client={client}> */}
            <NavBar isLoggedIn={isLoggedIn} logOut={logOut}></NavBar>
            <Route exact path="/" >
                <LoginRegisterPage
                    loginUser={loginUser}
                    registerUser={registerUser}>
                </LoginRegisterPage>
            </Route>
            <Route exact path="/main">
                <MainPage isLoggedIn={isLoggedIn} issuesQuery={LOAD_ISSUES} issuesData={issuesData}></MainPage>
            </Route>
            <Route exact path="/addissue">
                <AddIssuePage isLoggedIn={isLoggedIn} /*createNewIssue={console.log()}*/></AddIssuePage>
            </Route>
            <Route exact path="/myissues">
                <MyIssuesPage isLoggedIn={isLoggedIn}></MyIssuesPage>
            </Route>
            {/* // </ApolloProvider> */}
        </div>
    )
}

export default PageRoutes
