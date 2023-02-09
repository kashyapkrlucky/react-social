import React, { Component } from 'react';
import { UserContext } from "./Contexts/UserContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Dashboard from './Pages/Dashboard';
import PageNotFound from './Common/PageNotFound';

const user = JSON.parse(localStorage.getItem('user')) || {};

const router = createBrowserRouter([
    {
        path: "/",
        element: (user && user.id) ? <Dashboard /> : <SignUp />,
    },
    {
        path: "/sign-in",
        element: (user && user.id) ? <Dashboard /> : <SignIn />,
    },
    {
        path: "/dashboard",
        element: (user && user.id) ? <Dashboard /> : <SignIn />,
    },
    {
        path: "*",
        element: <PageNotFound/>,
    },
    
]);

export class App extends Component {
    setUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.setState({ user });
    }

    state = {
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { name: 'Guest' },
        setUser: this.setUser
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                <RouterProvider router={router} />
            </UserContext.Provider>
        )
    }
}

export default App
