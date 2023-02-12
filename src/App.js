import React, { Component } from 'react';
import { UserContext } from "./Contexts/UserContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Dashboard from './Pages/Dashboard';
import PageNotFound from './Pages/PageNotFound';
import Profile from './Pages/Profile';
import Friends from './Pages/Friends';
import Groups from './Pages/Groups';

const user = JSON.parse(localStorage.getItem('user')) || {};

// const router = createBrowserRouter(
//     user && user.id ?
//         [
//             { path: "/dashboard", element: <Dashboard /> },
//             { path: "/profile", element: <Profile /> },
//             { path: "/friends", element: <Friends /> },
//             { path: "/groups", element: <Groups /> },
//             { path: "*", element: <PageNotFound /> },
//         ] : [
//             { path: "/", element: <SignUp /> },
//             { path: "/sign-in", element: <SignIn /> },
//             { path: "*", element: <PageNotFound /> },
//         ]
// );

export class App extends Component {
    setUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.setState({ user });
    }
    router = createBrowserRouter(
        user && user.id ?
            [
                { path: "/", element: <Dashboard /> },
                { path: "/sign-out", element: <SignIn /> },
                { path: "dashboard", element: <Dashboard /> },
                { path: "profile", element: <Profile />, children: [
                    { path: ':userId', element: <Profile />}
                ]},
                { path: "friends", element: <Friends /> },
                { path: "groups", element: <Groups /> },
                { path: "*", element: <PageNotFound /> },
            ] : [
                { path: "/", element: <SignIn /> },
                { path: "sign-up", element: <SignUp /> },
                { path: "dashboard", element: <Dashboard /> },
                { path: "*", element: <PageNotFound /> },
            ]
    );
    state = {
        user: user,
        setUser: this.setUser
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                <RouterProvider router={this.router} />
            </UserContext.Provider>
        )
    }
}

export default App
